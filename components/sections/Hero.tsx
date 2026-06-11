"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP, SplitText, EASE } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { translations } from "@/lib/translations";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { lang } = useLang();
  const t = translations[lang].hero;

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 2) v.style.opacity = "1";
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-fade", { autoAlpha: 0, y: 24 });
        gsap.set(".hero-h1", { visibility: "visible" });

        const split = SplitText.create(".hero-h1", {
          type: "lines",
          mask: "lines",
        });

        // Line masks clip descenders (g, y); restore the intact heading
        // once the entrance has played.
        const tl = gsap.timeline({
          defaults: { ease: EASE },
          onComplete: () => split.revert(),
        });
        tl.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.09,
        }).to(
          ".hero-fade",
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.45"
        );

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".anim", { visibility: "visible" });
        videoRef.current?.pause();
      });
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-ivory"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-out"
        src="/videos/salon-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden
        onLoadedData={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ivory/85 via-ivory/55 to-ivory/10"
        aria-hidden
      />
      <div className="absolute inset-0 bg-ivory/25 md:hidden" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ivory/60 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ivory/55 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-32 md:px-8 md:pt-36">
        <div className="max-w-xl">
          <p className="anim hero-fade mb-5 text-[11px] font-normal tracking-[0.32em] text-gold-deep uppercase">
            {t.eyebrow}
          </p>
          <h1
            key={lang}
            className="anim hero-h1 font-display text-[2.6rem] leading-[1.14] text-ink md:text-[clamp(2.4rem,4.4vw,3.9rem)]"
          >
            {t.h1}
          </h1>
          <p className="anim hero-fade mt-6 max-w-md text-base font-normal leading-relaxed text-ink/75 md:text-lg">
            {t.sub}
          </p>
          <div className="anim hero-fade mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#book"
              className="whitespace-nowrap bg-ink px-8 py-4 text-[12px] tracking-[0.24em] text-ivory uppercase transition-transform duration-200 hover:scale-[1.04] hover:bg-gold-deep"
            >
              {t.cta}
            </a>
            <a
              href="#services"
              className="group relative text-[13px] tracking-[0.2em] text-ink uppercase"
            >
              {t.ctaSecondary}
              <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold transition-all duration-300 group-hover:h-[2px]" />
            </a>
          </div>
          <p className="anim hero-fade mt-12 text-[12px] font-normal tracking-[0.14em] text-ink/65">
            {t.trust}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
}
