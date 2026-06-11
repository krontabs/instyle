"use client";

import { useRef } from "react";
import { useGSAP, sectionReveal } from "@/lib/gsap";
import { services, PREFILL_EVENT } from "@/lib/site";

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (ref.current) sectionReveal(ref.current, ".anim", { stagger: 0.08 });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="services" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="anim mb-4 text-[11px] tracking-[0.32em] text-gold-deep uppercase">
          The service menu
        </p>
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="anim font-display max-w-md text-3xl leading-tight text-ink md:text-4xl">
            Every appointment begins in the chair, not the chart.
          </h2>
          <p className="anim max-w-sm text-sm font-light leading-relaxed text-stone">
            A consultation comes first — your hair, your face shape, your
            routine. Pricing is quoted up front, before a single snip.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="anim group border-t-2 border-gold bg-ivory-deep p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-18px_rgba(30,28,24,0.25)]"
            >
              <h3 className="font-display text-xl text-ink">{s.title}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-stone">
                {s.blurb}
              </p>
              <a
                href="#book"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent(PREFILL_EVENT, { detail: s.booking })
                  )
                }
                className="mt-5 inline-block text-[12px] tracking-[0.2em] text-gold-deep uppercase transition-colors group-hover:text-ink"
              >
                Book this →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
