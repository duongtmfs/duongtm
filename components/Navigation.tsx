"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { email, sections } from "../app/content";

export function Brand() {
  return (
    <a
      href="#intro"
      aria-label="Tong Minh Duong, back to top"
      className="brand"
    >
      <svg
        width="34"
        height="29"
        viewBox="0 0 41 32"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M1 4h8v24H1zM13 4h7l8 14v10h-7L13 14zM32 4h8v24h-8z" />
      </svg>
      <span>TONG MINH DUONG</span>
    </a>
  );
}
export default function Navigation() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="masthead">
      <div data-build="pop" data-label="Identity">
        <Brand />
      </div>
      <nav
        aria-label="Main navigation"
        id="primary-nav"
        className={open ? "primary-nav opened" : "primary-nav"}
        data-build="pop"
        data-label="Navigation"
      >
        {sections.map((s) => (
          <a
            key={s}
            href={"#" + s.toLowerCase()}
            onClick={() => setOpen(false)}
          >
            {s}
          </a>
        ))}
      </nav>
      <a
        data-build="pop"
        data-label="Contact"
        className="contact-link"
        href={"mailto:" + email}
      >
        GET IN TOUCH <ArrowUpRight size={15} />
      </a>
      <button
        className="menu-btn"
        aria-controls="primary-nav"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
