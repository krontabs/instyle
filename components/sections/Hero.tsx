"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, SplitText, EASE } from "@/lib/gsap";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-fade", { autoAlpha: 0, y: 24 });
        gsap.set(".hero-arch-main, .hero-arch-side", {
          visibility: "visible",
          clipPath: "inset(100% 0% 0% 0%)",
        });
        gsap.set(".hero-h1", { visibility: "visible" });

        const split = SplitText.create(".hero-h1", {
          type: "lines",
          mask: "lines",
        });

        const tl = gsap.timeline({ defaults: { ease: EASE } });
        tl.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.09,
        })
          .to(
            ".hero-fade",
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
            "-=0.45"
          )
          .to(
            ".hero-arch-main",
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "expo.out" },
            0.35
          )
          .to(
            ".hero-arch-side",
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "expo.out" },
            0.55
          );

        gsap.to(".hero-arch-main", {
          y: -28,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-arch-side", {
          y: 22,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".anim", { visibility: "visible", clearProps: "clipPath" });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden bg-ivory pt-28 md:pt-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-16 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:pb-24">
        <div>
          <p className="anim hero-fade mb-5 text-[11px] font-normal tracking-[0.32em] text-gold-deep uppercase">
            Seasons Place · City of Industry
          </p>
          <h1 className="anim hero-h1 font-display text-[2.6rem] leading-[1.08] text-ink md:text-[clamp(2.4rem,4.4vw,3.9rem)]">
            Leave looking like the best version of you.
          </h1>
          <p className="anim hero-fade mt-6 max-w-md text-base font-light leading-relaxed text-stone md:text-lg">
            Precision cuts, dimensional color and silk-finish treatments in a
            marble-and-gold studio — open every day, 10:30 to 7.
          </p>
          <div className="anim hero-fade mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#book"
              className="whitespace-nowrap bg-ink px-8 py-4 text-[12px] tracking-[0.24em] text-ivory uppercase transition-transform duration-200 hover:scale-[1.04] hover:bg-gold-deep"
            >
              Reserve your chair
            </a>
            <a
              href="#services"
              className="group relative text-[13px] tracking-[0.2em] text-ink uppercase"
            >
              View services
              <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold transition-all duration-300 group-hover:h-[2px]" />
            </a>
          </div>
          <p className="anim hero-fade mt-12 text-[12px] font-light tracking-[0.14em] text-stone">
            Open 7 days &nbsp;·&nbsp; Walk-ins welcome, appointments first
            &nbsp;·&nbsp; Inside Seasons Place
          </p>
        </div>

        <div className="relative flex justify-center gap-5 md:justify-end">
          <div className="anim hero-arch-main arch relative h-[340px] w-[230px] overflow-hidden border-2 border-gold md:h-[440px] md:w-[290px]">
            <Image
              src="/images/salon-mirrors.jpg"
              alt="Gold arched mirrors and marble walls inside InStyle Hair Salon"
              fill
              sizes="(max-width: 768px) 230px, 290px"
              className="object-cover"
              loading="eager"
              preload
            />
          </div>
          <div className="anim hero-arch-side arch relative mt-16 hidden h-[330px] w-[210px] overflow-hidden border-2 border-gold lg:block">
            <Image
              src="/images/result-blonde-bob.jpg"
              alt="Platinum blonde bob styled at InStyle, in front of the gold salon logo"
              fill
              sizes="210px"
              className="object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </section>
  );
}
