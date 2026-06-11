"use client";

import { useRef } from "react";
import { useGSAP, sectionReveal } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { translations } from "@/lib/translations";

const initials = ["JA", "JO", "RY", "AN"];

export default function Stylists() {
  const ref = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = translations[lang].stylists;

  useGSAP(
    () => {
      if (ref.current) sectionReveal(ref.current, ".anim");
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section ref={ref} id="stylists" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="anim mb-4 text-[11px] tracking-[0.32em] text-gold-deep uppercase">
          {t.eyebrow}
        </p>
        <h2 className="anim font-display max-w-lg text-3xl leading-tight text-ink md:text-4xl">
          {t.h2}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2">
          {t.team.map((m, i) => (
            <article
              key={m.name}
              className="anim flex gap-6 border border-marble bg-ivory-deep p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-18px_rgba(30,28,24,0.25)]"
            >
              <div
                className="arch flex h-20 w-16 shrink-0 items-end justify-center border-2 border-gold bg-marble pb-2 font-display text-xl text-gold-deep"
                aria-hidden
              >
                {initials[i]}
              </div>
              <div>
                <h3 className="font-display text-xl text-ink">{m.name}</h3>
                <p className="text-[12px] tracking-[0.2em] text-gold-deep uppercase">
                  {m.role}
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-stone">
                  {m.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
