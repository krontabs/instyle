"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP, sectionReveal } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { translations } from "@/lib/translations";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = translations[lang].experience;

  useGSAP(
    () => {
      if (ref.current) sectionReveal(ref.current, ".anim");
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section ref={ref} id="experience" className="bg-ivory-deep py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 md:grid-cols-2 md:px-8">
        <div className="anim relative mx-auto aspect-square w-full max-w-[480px] overflow-hidden">
          <Image
            src="/images/salon-reception.jpg"
            alt="InStyle reception in black and white — marble wall, gold lettering and a designer art figure"
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover"
          />
          <div className="absolute inset-0 border-2 border-gold/60 m-4 pointer-events-none" />
        </div>

        <div>
          <p className="anim mb-4 text-[11px] tracking-[0.32em] text-gold-deep uppercase">
            {t.eyebrow}
          </p>
          <h2 className="anim font-display text-3xl leading-tight text-ink md:text-4xl">
            {t.h2}
          </h2>
          <p className="anim mt-5 max-w-lg text-base font-light leading-relaxed text-stone">
            {t.body}
          </p>
          <ul className="mt-9 space-y-6">
            {t.points.map((p) => (
              <li key={p.title} className="anim flex gap-5">
                <span className="mt-1 h-px w-9 shrink-0 bg-gold" aria-hidden />
                <div>
                  <h3 className="font-display text-lg text-ink">{p.title}</h3>
                  <p className="mt-1 text-sm font-light text-stone">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
