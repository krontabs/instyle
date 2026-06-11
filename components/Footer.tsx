"use client";

import { site } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang];

  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#experience", label: t.nav.experience },
    { href: "#stylists", label: t.nav.stylists },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#visit", label: t.nav.visit },
    { href: "#book", label: t.nav.bookNow },
  ];

  return (
    <footer className="border-t border-gold/30 bg-ink pb-10 pt-16 text-ivory">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 md:grid-cols-[1.3fr_1fr_0.7fr] md:px-8">
        <div>
          <p className="font-display text-3xl tracking-[0.3em] md:text-4xl">
            IN STYLE
          </p>
          <p className="mt-3 font-display text-lg italic text-gold">
            {t.footer.tagline}
          </p>
        </div>

        <div className="space-y-4 text-sm font-light text-ivory/70">
          <div>
            <p className="text-[11px] tracking-[0.26em] text-gold uppercase">
              {t.visit.addressLabel}
            </p>
            <p className="mt-1.5">{site.address}</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.26em] text-gold uppercase">
              {t.visit.hoursLabel}
            </p>
            <p className="mt-1.5">{t.visit.hours}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2.5" aria-label="Footer">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="w-fit text-[12px] tracking-[0.2em] text-ivory/60 uppercase transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-ivory/10 px-5 pt-6 md:px-8">
        <p className="text-center text-[12px] font-light text-ivory/40">
          © {new Date().getFullYear()} InStyle Hair Salon. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
