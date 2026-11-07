"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Bot, Clapperboard, Pause, Play, Square } from "lucide-react";
import { startBuild } from "./build-engine";

const names = [
  "Scout",
  "Layout",
  "Typeset",
  "Motion",
  "QA",
  "Deploy",
  "Copy",
  "Lint",
  "Index",
  "Render",
  "Palette",
  "Review",
];
const hues = ["#ff776c", "#a4bdd8", "#e2bc91", "#b7c4a4", "#e5aca7", "#bebec8"];

export default function BuildControls() {
  const engine = useRef<ReturnType<typeof startBuild> | null>(null);
  const [state, setState] = useState({
    enabled: true,
    paused: false,
    touring: false,
  });
  useEffect(() => {
    const controller = startBuild(setState);
    engine.current = controller;
    return () => {
      controller.destroy();
      engine.current = null;
    };
  }, []);
  return (
    <>
      <div className="boot" aria-hidden="true">
        <i /> Initializing agents
      </div>
      <div className="overlay" aria-hidden="true">
        {names.map((name, i) => (
          <div key={name}>
            <div className="wire">
              <span />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div
              className="agent"
              style={
                { "--agent-color": hues[i % hues.length] } as CSSProperties
              }
            >
              <svg width="17" height="20" viewBox="0 0 17 20">
                <path
                  d="M1 1l14 10-7 1-3 6z"
                  fill="var(--agent-color)"
                  stroke="#151515"
                />
              </svg>
              <span className="agent-tag">
                <b className="bot-head">
                  <i />
                  <i />
                </b>
                {name}
              </span>
            </div>
          </div>
        ))}
      </div>
      <aside className="dock" aria-label="Animation controls">
        <button
          disabled={!state.enabled && !state.touring}
          aria-pressed={state.paused}
          title="Pause or resume animation (P)"
          onClick={() => engine.current?.pause()}
        >
          {state.paused ? <Play /> : <Pause />}
          {state.paused ? "Resume" : "Pause"}
        </button>
        <button
          aria-pressed={state.enabled}
          title="Toggle robot agents (A)"
          onClick={() => engine.current?.toggleAgents()}
        >
          <Bot />
          Agents <i className={state.enabled ? "on" : ""} />
        </button>
        <button
          aria-pressed={state.touring}
          title="Start or stop guided tour (T)"
          onClick={() => engine.current?.toggleTour()}
        >
          {state.touring ? <Square /> : <Clapperboard />}
          {state.touring ? "Stop tour" : "Tour"}
        </button>
      </aside>
    </>
  );
}
