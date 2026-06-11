"use client";

import { useRef } from "react";
import { useGSAP, sectionReveal } from "@/lib/gsap";
import { site } from "@/lib/site";

export default function Visit() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (ref.current) sectionReveal(ref.current, ".anim");
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="visit" className="bg-ivory py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 md:grid-cols-2 md:px-8">
        <div>
          <p className="anim mb-4 text-[11px] tracking-[0.32em] text-gold-deep uppercase">
            Visit
          </p>
          <h2 className="anim font-display text-3xl leading-tight text-ink md:text-4xl">
            Find us at Seasons Place
          </h2>
          <div className="anim mt-8 space-y-6 text-stone">
            <div>
              <p className="text-[12px] tracking-[0.2em] text-gold-deep uppercase">
                Address
              </p>
              <p className="mt-1 text-base font-light text-ink">
                {site.address}
              </p>
              <p className="mt-1 text-sm font-light">
                Inside the Seasons Place plaza — free parking right outside.
              </p>
            </div>
            <div>
              <p className="text-[12px] tracking-[0.2em] text-gold-deep uppercase">
                Hours
              </p>
              <p className="mt-1 text-base font-light text-ink">{site.hours}</p>
            </div>
            <div>
              <p className="text-[12px] tracking-[0.2em] text-gold-deep uppercase">
                Email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 inline-block text-base font-light text-ink underline decoration-gold underline-offset-4 hover:text-gold-deep"
              >
                {site.email}
              </a>
            </div>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-ink px-7 py-3.5 text-[12px] tracking-[0.24em] text-ivory uppercase transition-transform duration-200 hover:scale-[1.04] hover:bg-gold-deep"
            >
              Get directions
            </a>
          </div>
        </div>

        <div className="anim relative h-[320px] w-full overflow-hidden border border-marble md:h-[420px]">
          <iframe
            src={site.mapsEmbed}
            title="Map showing InStyle Hair Salon at Seasons Place, City of Industry"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
