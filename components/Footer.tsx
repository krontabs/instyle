"use client";

import { site } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang].footer;

  return (
    <footer className="border-t border-gold/30 bg-ink py-12 text-ivory">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 text-center md:px-8">
        <p className="font-display text-lg tracking-[0.35em]">IN STYLE</p>
        <p className="text-sm font-light text-ivory/70">{t.tagline}</p>
        <p className="text-[13px] font-light text-ivory/60">
          {site.address} · {t.hours}
        </p>
        <p className="text-[12px] font-light text-ivory/40">
          © {new Date().getFullYear()} InStyle Hair Salon. {t.rights}
        </p>
      </div>
    </footer>
  );
}
