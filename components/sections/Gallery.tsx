"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, sectionReveal } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { translations } from "@/lib/translations";

const spacePhotos = [
  {
    src: "/images/salon-mirrors.jpg",
    alt: "Gold arched mirrors lining a marble wall at InStyle",
  },
  {
    src: "/images/salon-noir-room.jpg",
    alt: "A client in the black-and-gold styling room at InStyle",
  },
  {
    src: "/images/salon-reception.jpg",
    alt: "InStyle reception with marble walls and designer art figure",
  },
  {
    src: "/images/salon-art-toys.png",
    alt: "Designer art toys and styling products on the retail counter",
  },
];

const workPhotos = [
  {
    src: "/images/result-blonde-bob.jpg",
    alt: "Platinum blonde precision bob, color and cut by Jade",
    tag: { en: "Color & cut", zh: "染发与剪发" },
  },
  {
    src: "/images/work-before-after-waves.jpg",
    alt: "Before and after: shoulder-length hair transformed into long soft waves",
    tag: { en: "Extensions & waves", zh: "接发与卷度" },
  },
  {
    src: "/images/work-silver-bob.jpg",
    alt: "Silver-lavender two-tone bob being finished in the studio",
    tag: { en: "Fashion color", zh: "时尚色" },
  },
  {
    src: "/images/work-rose-brown-layers.jpg",
    alt: "Rose-brown layered cut with face-framing waves",
    tag: { en: "Cut & styling", zh: "剪发与造型" },
  },
  {
    src: "/images/work-pink-lob.jpg",
    alt: "Soft pink shoulder-length cut in an InStyle robe",
    tag: { en: "Fashion color", zh: "时尚色" },
  },
  {
    src: "/images/work-mens-cuts.jpg",
    alt: "Four men's haircut transformations — fades and textured crops",
    tag: { en: "Men's cuts", zh: "男士剪发" },
  },
  {
    src: "/images/work-caramel-waves.jpg",
    alt: "Caramel blonde waves with curtain bangs",
    tag: { en: "Color & waves", zh: "染发与卷度" },
  },
  {
    src: "/images/work-color-correction.jpg",
    alt: "Color correction before and after — brassy tones to smooth ash brown",
    tag: { en: "Color correction", zh: "颜色修正" },
  },
  {
    src: "/images/work-honey-blonde.jpg",
    alt: "Long honey blonde hair, freshly colored at the salon",
    tag: { en: "Balayage", zh: "挑染" },
  },
  {
    src: "/images/work-dark-layers.jpg",
    alt: "Dark layered mid-length cut with soft movement",
    tag: { en: "Cut & treatment", zh: "剪发与护理" },
  },
];

type Photo = {
  src: string;
  alt: string;
  tag?: { en: string; zh: string };
};

function Strip({
  photos,
  label,
  lang,
  reverse = false,
}: {
  photos: Photo[];
  label: string;
  lang: "en" | "zh";
  reverse?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // A single sequence must be wider than any viewport for a seamless
  // loop; short lists are doubled before duplication.
  const seq = photos.length < 6 ? [...photos, ...photos] : photos;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        container.style.overflowX = "hidden";
        const tween = gsap.fromTo(
          track,
          { xPercent: reverse ? -50 : 0 },
          {
            xPercent: reverse ? 0 : -50,
            ease: "none",
            duration: seq.length * 7,
            repeat: -1,
          }
        );

        const pause = () => tween.pause();
        const resume = () => tween.resume();
        container.addEventListener("mouseenter", pause);
        container.addEventListener("mouseleave", resume);
        return () => {
          container.removeEventListener("mouseenter", pause);
          container.removeEventListener("mouseleave", resume);
          tween.kill();
        };
      });
    },
    { scope: containerRef }
  );

  const renderSeq = (ariaHidden: boolean) => (
    <div
      className="flex shrink-0 gap-6 pr-6"
      aria-hidden={ariaHidden || undefined}
    >
      {seq.map((p, i) => (
        <figure
          key={`${p.src}-${i}`}
          className={`group relative h-[320px] w-[240px] shrink-0 md:h-[400px] md:w-[300px] ${i % 2 === 1 ? "mt-6" : ""} overflow-hidden ${i % 2 === 0 ? "arch border-2 border-gold" : ""}`}
        >
          <Image
            src={p.src}
            alt={ariaHidden ? "" : p.alt}
            fill
            sizes="(max-width: 768px) 240px, 300px"
            className="object-cover"
          />
          {p.tag && (
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-ink/75 via-ink/30 to-transparent pb-5 pt-14 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-[11px] tracking-[0.26em] text-gold uppercase">
                {p.tag[lang]}
              </span>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );

  return (
    <div className="mt-10">
      <p className="anim mx-auto mb-5 flex max-w-6xl items-center gap-4 px-5 md:px-8">
        <span className="text-[11px] tracking-[0.28em] text-stone uppercase">
          {label}
        </span>
        <span className="h-px flex-1 bg-gold/40" aria-hidden />
      </p>
      <div
        ref={containerRef}
        className="anim overflow-x-auto pb-6"
        aria-label={label}
      >
        <div ref={trackRef} className="flex w-max">
          {renderSeq(false)}
          {renderSeq(true)}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const { lang } = useLang();
  const t = translations[lang].gallery;

  useGSAP(
    () => {
      if (ref.current)
        sectionReveal(ref.current, ".anim", { stagger: 0.12, start: "top 75%" });
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section ref={ref} id="gallery" className="bg-ivory-deep py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="anim mb-4 text-[11px] tracking-[0.32em] text-gold-deep uppercase">
          {t.eyebrow}
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="anim font-display text-3xl leading-tight text-ink md:text-4xl">
            {t.h2}
          </h2>
          <p className="anim max-w-sm text-sm font-light leading-relaxed text-stone">
            {t.sub}
          </p>
        </div>
      </div>

      <Strip photos={workPhotos} label={t.workLabel} lang={lang} />
      <Strip photos={spacePhotos} label={t.spaceLabel} lang={lang} reverse />
    </section>
  );
}
