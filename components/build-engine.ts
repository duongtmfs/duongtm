type Flags = { enabled: boolean; paused: boolean; touring: boolean };
type Point = { x: number; y: number };
type Run = {
  target: HTMLElement;
  agent: HTMLElement;
  box: HTMLElement;
  from: Point;
  started: number;
  contentDuration: number;
  letters?: { front: Text; tail: HTMLElement; full: string };
};
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (n: number) => n * n * (3 - 2 * n);
const readSession = () => {
  try {
    const play = sessionStorage.getItem("portfolio-tour") === "yes";
    return play;
  } catch {
    return false;
  }
};

export function startBuild(notify: (state: Flags) => void) {
  const root = document.documentElement;
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>("[data-build]"),
  );
  const agents = Array.from(document.querySelectorAll<HTMLElement>(".agent"));
  const boxes = Array.from(document.querySelectorAll<HTMLElement>(".wire"));
  const hero = document.getElementById("intro")!;
  const pending = new Set(elements);
  const visible = new Set<HTMLElement>();
  const running = new Map<HTMLElement, Run>();
  const positions = new Map<HTMLElement, Point>();
  const states: Flags = {
    enabled: root.classList.contains("build-mode"),
    paused: false,
    touring: readSession(),
  };
  root.dataset.engine = "ready";
  let frame = 0,
    clock = 0,
    last = performance.now(),
    nextStart = 350,
    rotation = 0;
  let tourElapsed = -650,
    expectedScroll = window.scrollY,
    tourStarted = false;
  let destroyed = false;
  let consumeTourRequest = states.touring;

  function publish() {
    root.classList.toggle("paused", states.paused);
    root.classList.toggle("touring", states.touring);
    notify({ ...states });
  }
  function finish(target: HTMLElement) {
    const run = running.get(target);
    if (run) {
      if (run.letters) {
        run.letters.front.data = run.letters.full;
        run.letters.tail.remove();
      }
      run.agent.style.opacity = "0";
      run.box.style.visibility = "hidden";
      running.delete(target);
    }
    target.style.removeProperty("clip-path");
    target.style.removeProperty("opacity");
    target.style.removeProperty("scale");
    target.dataset.built = "true";
    pending.delete(target);
    visible.delete(target);
  }
  function stopTour() {
    if (states.touring) {
      states.touring = false;
      publish();
    }
  }
  function onScroll() {
    if (
      states.touring &&
      tourStarted &&
      Math.abs(window.scrollY - expectedScroll) > 3
    )
      stopTour();
    for (const target of pending) {
      const rect = target.getBoundingClientRect();
      if (rect.height > 0 && rect.bottom <= 0) finish(target);
    }
  }
  function start(target: HTMLElement, agent: HTMLElement) {
    const box = boxes[agents.indexOf(agent)];
    const run: Run = {
      target,
      agent,
      box,
      started: clock,
      from: positions.get(agent) ?? {
        x: innerWidth * 0.5,
        y: innerHeight + 16,
      },
      contentDuration:
        target.dataset.build === "type"
          ? Math.min(
              1750,
              Math.max(400, (target.textContent?.length ?? 0) * 17),
            )
          : 420,
    };
    box.querySelector("span")!.textContent =
      target.dataset.label ??
      (target.dataset.build === "type" ? "Text" : "Layout");
    if (target.dataset.build === "type") {
      const front = Array.from(target.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      ) as Text | undefined;
      if (front) {
        const full = front.data;
        const tail = document.createElement("span");
        tail.style.visibility = "hidden";
        tail.textContent = full;
        front.after(tail);
        front.data = "";
        run.letters = { front, tail, full };
      }
    }
    running.set(target, run);
    agent.style.opacity = "1";
  }
  function paint(run: Run) {
    const { target, agent, box } = run;
    const elapsed = clock - run.started;
    const rect = target.getBoundingClientRect();
    if (rect.bottom < 0 || !rect.width) {
      finish(target);
      return;
    }
    const glide = ease(clamp(elapsed / 320));
    const drag = ease(clamp((elapsed - 320) / 330));
    const reveal = clamp((elapsed - 650) / run.contentDuration);
    const x = run.from.x + (rect.left - run.from.x) * glide + rect.width * drag;
    const y = run.from.y + (rect.top - run.from.y) * glide + rect.height * drag;
    const point = {
      x: Math.min(innerWidth - 70, Math.max(0, x)),
      y: Math.min(innerHeight - 20, y),
    };
    positions.set(agent, point);
    agent.style.transform =
      "translate3d(" + point.x + "px," + point.y + "px,0)";
    if (elapsed > 320) {
      box.style.visibility = "visible";
      box.style.transform =
        "translate3d(" + rect.left + "px," + rect.top + "px,0)";
      box.style.width = rect.width * drag + "px";
      box.style.height = rect.height * drag + "px";
      box.style.opacity = String(1 - reveal);
    }
    if (elapsed >= 650) {
      target.dataset.built = "revealing";
      if (run.letters) {
        const { front, full, tail } = run.letters;
        const count = Math.floor(reveal * full.length);
        if (front.length !== count) {
          front.data = full.slice(0, count);
          tail.textContent = full.slice(count);
        }
      } else if (target.dataset.build === "wipe") {
        target.style.clipPath =
          "inset(0 " + 100 * (1 - ease(reveal)) + "% 0 0)";
      } else {
        target.style.opacity = String(ease(reveal));
        target.style.scale = String(0.975 + 0.025 * ease(reveal));
      }
    }
    if (reveal === 1) finish(target);
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        if (!pending.has(target)) continue;
        if (
          entry.boundingClientRect.height > 0 &&
          entry.boundingClientRect.bottom <= 0
        )
          finish(target);
        else if (entry.isIntersecting) visible.add(target);
        else visible.delete(target);
      }
      wake();
    },
    { rootMargin: "0px 0px 12% 0px" },
  );
  function schedule() {
    if (running.size >= 6 || clock < nextStart) return;
    const heroOnScreen = hero.getBoundingClientRect().bottom > 0;
    for (const target of pending) {
      if (
        running.has(target) ||
        (!visible.has(target) && !(heroOnScreen && hero.contains(target)))
      )
        continue;
      if (target.offsetWidth === 0) {
        finish(target);
        continue;
      }
      const count = innerWidth <= 720 ? 6 : agents.length;
      const busy = new Set(Array.from(running.values(), (r) => r.agent));
      for (let n = 0; n < count; n++) {
        const agent = agents[rotation++ % count];
        if (busy.has(agent)) continue;
        start(target, agent);
        nextStart = clock + 80;
        return;
      }
    }
  }
  function tour(dt: number) {
    if (
      states.enabled &&
      Array.from(pending).some((target) => hero.contains(target))
    )
      return;
    tourElapsed += dt;
    if (tourElapsed < 0) return;
    tourStarted = true;
    const distance = Math.max(0, root.scrollHeight - innerHeight);
    const duration = Math.max(10000, distance * 11);
    const t = clamp(tourElapsed / duration);
    const ramp = 0.08;
    const covered =
      t < ramp
        ? (t * t) / (2 * ramp)
        : t > 1 - ramp
          ? 1 - ramp - ((1 - t) * (1 - t)) / (2 * ramp)
          : t - ramp / 2;
    expectedScroll = Math.round((distance * covered) / (1 - ramp));
    window.scrollTo({ top: expectedScroll, behavior: "instant" });
    if (t === 1) stopTour();
  }
  function tick(now: number) {
    frame = 0;
    if (destroyed || states.paused) return;
    if (consumeTourRequest) {
      try {
        sessionStorage.removeItem("portfolio-tour");
      } catch {}
      consumeTourRequest = false;
    }
    const dt = Math.min(now - last, 64);
    last = now;
    clock += dt;
    if (clock > 260) root.classList.remove("booting");
    if (states.enabled) {
      schedule();
      running.forEach(paint);
    }
    if (states.touring) tour(dt);
    if (
      states.touring ||
      running.size ||
      (states.enabled &&
        (visible.size ||
          clock < 1000 ||
          (hero.getBoundingClientRect().bottom > 0 &&
            Array.from(pending).some((t) => hero.contains(t)))))
    )
      frame = requestAnimationFrame(tick);
  }
  function wake() {
    if (!destroyed && !frame && !states.paused) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }
  function toggleAgents() {
    states.enabled = !states.enabled;
    states.paused = false;
    // An explicit toggle replaces the URL override for subsequent reloads.
    const url = new URL(location.href);
    if (url.searchParams.has("agents")) {
      url.searchParams.delete("agents");
      history.replaceState(history.state, "", url);
    }
    try {
      localStorage.setItem("portfolio-agents", states.enabled ? "on" : "off");
    } catch {}
    root.classList.toggle("build-mode", states.enabled);
    root.classList.remove("booting");
    if (!states.enabled) elements.forEach(finish);
    else {
      for (const target of elements) {
        const rect = target.getBoundingClientRect();
        if (rect.bottom <= 0) continue;
        delete target.dataset.built;
        pending.add(target);
        observer.unobserve(target);
        observer.observe(target);
      }
    }
    publish();
    wake();
  }
  function pause() {
    if (!states.enabled && !states.touring) return;
    states.paused = !states.paused;
    publish();
    wake();
  }
  function toggleTour() {
    if (states.touring) {
      stopTour();
      return;
    }
    try {
      sessionStorage.setItem("portfolio-tour", "yes");
    } catch {
      states.touring = true;
      states.paused = false;
      tourElapsed = -650;
      tourStarted = false;
      window.scrollTo({ top: 0, behavior: "instant" });
      publish();
      wake();
      return;
    }
    history.scrollRestoration = "manual";
    const url = new URL(location.href);
    url.hash = "";
    history.replaceState(history.state, "", url);
    window.scrollTo({ top: 0, behavior: "instant" });
    location.reload();
  }
  function keyboard(e: KeyboardEvent) {
    if (
      e.altKey ||
      e.ctrlKey ||
      e.metaKey ||
      e.repeat ||
      (e.target as HTMLElement).matches(
        "input, textarea, select, [contenteditable=true]",
      )
    )
      return;
    const key = e.key.toLowerCase();
    if (key === "t") toggleTour();
    else if (key === "p") pause();
    else if (key === "a") toggleAgents();
    else if (
      [
        "escape",
        "arrowup",
        "arrowdown",
        "pageup",
        "pagedown",
        "home",
        "end",
        " ",
      ].includes(key)
    )
      stopTour();
  }
  if (states.touring) window.scrollTo({ top: 0, behavior: "instant" });
  if (!states.enabled) elements.forEach(finish);
  elements.forEach((el) => observer.observe(el));
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("wheel", stopTour, { passive: true });
  window.addEventListener("touchmove", stopTour, { passive: true });
  window.addEventListener("keydown", keyboard);
  onScroll();
  publish();
  wake();
  return {
    toggleAgents,
    toggleTour,
    pause,
    destroy() {
      destroyed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", stopTour);
      window.removeEventListener("touchmove", stopTour);
      window.removeEventListener("keydown", keyboard);
      [...running.keys()].forEach(finish);
      elements.forEach((t) => delete t.dataset.built);
      delete root.dataset.engine;
    },
  };
}
