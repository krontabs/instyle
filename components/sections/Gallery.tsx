"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP, sectionReveal } from "@/lib/gsap";

const photos = [
  {
    src: "/images/salon-mirrors.jpg",
    alt: "Gold arched mirrors lining a marble wall at InStyle",
    w: "w-[280px] md:w-[340px]",
    h: "h-[360px] md:h-[440px]",
  },
  {
    src: "/images/salon-noir-room.jpg",
    alt: "A client in the black-and-gold styling room at InStyle",
    w: "w-[260px] md:w-[300px]",
    h: "h-[360px] md:h-[440px]",
  },
  {
    src: "/images/result-blonde-bob.jpg",
    alt: "Platinum blonde precision bob, color and cut by Jade",
    w: "w-[260px] md:w-[300px]",
    h: "h-[360px] md:h-[440px]",
  },
  {
    src: "/images/salon-reception.jpg",
    alt: "InStyle reception with marble walls and designer art figure",
    w: "w-[280px] md:w-[340px]",
    h: "h-[360px] md:h-[440px]",
  },
  {
    src: "/images/salon-art-toys.png",
    alt: "Designer art toys and styling products on the retail counter",
    w: "w-[240px] md:w-[280px]",
    h: "h-[360px] md:h-[440px]",
  },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (ref.current)
        sectionReveal(ref.current, ".anim", { stagger: 0.12, start: "top 75%" });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="gallery" className="bg-ivory-deep py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="anim mb-4 text-[11px] tracking-[0.32em] text-gold-deep uppercase">
          Gallery
        </p>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="anim font-display text-3xl leading-tight text-ink md:text-4xl">
            Inside the studio
          </h2>
          <p className="anim max-w-sm text-sm font-light leading-relaxed text-stone">
            The marble, the gold arches, the art. Then come sit for the real
            thing.
          </p>
        </div>
      </div>

      <div
        className="anim flex gap-6 overflow-x-auto px-5 pb-6 md:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        role="region"
        aria-label="Salon photo gallery, scrolls horizontally"
        tabIndex={0}
      >
        {photos.map((p, i) => (
          <figure
            key={p.src}
            className={`relative shrink-0 ${p.w} ${p.h} ${i % 2 === 1 ? "mt-8" : ""} overflow-hidden ${i % 2 === 0 ? "arch border-2 border-gold" : ""}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 768px) 280px, 340px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
