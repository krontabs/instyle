"use client";

import { useRef } from "react";
import { useGSAP, sectionReveal } from "@/lib/gsap";

const team = [
  {
    name: "Jade",
    role: "Color specialist",
    bio: "Known for icy blondes and seamless balayage — the colorist behind many of the transformations on our wall.",
    initial: "J",
  },
  {
    name: "The InStyle team",
    role: "Cutters & stylists",
    bio: "A small team with big portfolios, treating every head of hair as a commission. Tell us your vibe — we'll match you.",
    initial: "IS",
  },
];

export default function Stylists() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (ref.current) sectionReveal(ref.current, ".anim");
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="stylists" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="anim mb-4 text-[11px] tracking-[0.32em] text-gold-deep uppercase">
          Stylists
        </p>
        <h2 className="anim font-display max-w-lg text-3xl leading-tight text-ink md:text-4xl">
          The artists behind the chair
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2">
          {team.map((t) => (
            <article
              key={t.name}
              className="anim flex gap-6 border border-marble bg-ivory-deep p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-18px_rgba(30,28,24,0.25)]"
            >
              <div
                className="arch flex h-20 w-16 shrink-0 items-end justify-center border-2 border-gold bg-marble pb-2 font-display text-xl text-gold-deep"
                aria-hidden
              >
                {t.initial}
              </div>
              <div>
                <h3 className="font-display text-xl text-ink">{t.name}</h3>
                <p className="text-[12px] tracking-[0.2em] text-gold-deep uppercase">
                  {t.role}
                </p>
                <p className="mt-3 text-sm font-light leading-relaxed text-stone">
                  {t.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
