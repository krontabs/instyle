"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { translations } from "@/lib/translations";

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLang();
  const t = translations[lang].nav;

  const links = [
    { href: "#services", label: t.services },
    { href: "#experience", label: t.experience },
    { href: "#stylists", label: t.stylists },
    { href: "#gallery", label: t.gallery },
    { href: "#visit", label: t.visit },
  ];

  useGSAP(
    () => {
      gsap.to(ref.current, {
        backgroundColor: "rgba(250, 248, 244, 0.92)",
        borderBottomColor: "rgba(180, 154, 104, 0.35)",
        backdropFilter: "blur(8px)",
        duration: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          start: "60 top",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref }
  );

  const langToggle = (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="flex h-11 items-center gap-1.5 px-2 text-[12px] tracking-[0.12em] text-stone transition-colors hover:text-ink"
      aria-label={
        lang === "en" ? "切换到中文" : "Switch to English"
      }
    >
      <span className={lang === "en" ? "text-ink" : ""}>EN</span>
      <span className="text-gold" aria-hidden>
        /
      </span>
      <span className={lang === "zh" ? "text-ink" : ""}>中文</span>
    </button>
  );

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 md:px-8">
        <a
          href="#top"
          className="whitespace-nowrap font-display text-lg tracking-[0.35em] text-ink"
          aria-label="InStyle Hair Salon — back to top"
        >
          IN STYLE
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative whitespace-nowrap text-[13px] font-light tracking-[0.14em] text-stone uppercase transition-colors hover:text-ink"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          {langToggle}
          <a
            href="#book"
            className="whitespace-nowrap bg-ink px-5 py-2.5 text-[12px] tracking-[0.18em] text-ivory uppercase transition-transform duration-200 hover:scale-[1.04] hover:bg-gold-deep"
          >
            {t.bookNow}
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          {langToggle}
          <a
            href="#book"
            className="whitespace-nowrap bg-ink px-4 py-2.5 text-[11px] tracking-[0.16em] text-ivory uppercase"
          >
            {t.book}
          </a>
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-6 bg-ink transition-transform duration-200 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-ink transition-transform duration-200 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-marble bg-ivory px-5 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm tracking-[0.16em] text-stone uppercase"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="mt-3 inline-block bg-ink px-6 py-3 text-[12px] tracking-[0.18em] text-ivory uppercase"
          >
            {t.bookNow}
          </a>
        </div>
      )}
    </header>
  );
}
