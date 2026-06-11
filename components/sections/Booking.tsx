"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useGSAP, sectionReveal } from "@/lib/gsap";
import {
  bookingServices,
  bookingTimes,
  stylists,
  PREFILL_EVENT,
} from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { translations } from "@/lib/translations";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full border border-marble bg-ivory px-4 py-3.5 text-[15px] font-light text-ink placeholder:text-stone/60 focus:border-gold transition-colors";
const labelClass =
  "mb-1.5 block text-[12px] tracking-[0.18em] text-stone uppercase";

export default function Booking() {
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [today, setToday] = useState<string>();
  const [service, setService] = useState("");
  const { lang } = useLang();
  const t = translations[lang].booking;

  useEffect(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    setToday(d.toISOString().split("T")[0]);

    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (bookingServices.includes(detail)) {
        setService(detail);
        setStatus("idle");
      }
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  useGSAP(
    () => {
      if (ref.current) sectionReveal(ref.current, ".anim", { stagger: 0.06 });
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true }
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("success");
        setService("");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.error && lang === "en" ? json.error : t.error);
      }
    } catch {
      setStatus("error");
      setErrorMsg(t.error);
    }
  }

  return (
    <section ref={ref} id="book" className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="anim mb-4 text-center text-[11px] tracking-[0.32em] text-gold uppercase">
          {t.eyebrow}
        </p>
        <h2 className="anim font-display text-center text-3xl leading-tight text-ivory md:text-4xl">
          {t.h2}
        </h2>
        <p className="anim mx-auto mt-4 max-w-lg text-center text-sm font-light leading-relaxed text-ivory/70">
          {t.sub}
        </p>

        {status === "success" ? (
          <div
            className="mt-12 border border-gold/50 bg-ivory/[0.04] p-10 text-center"
            role="status"
          >
            <span
              className="arch mx-auto flex h-16 w-14 items-end justify-center border border-gold pb-3 text-gold"
              aria-hidden
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10.5l4 4 8-9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="font-display mt-5 text-2xl text-ivory">
              {t.successTitle}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm font-light leading-relaxed text-ivory/70">
              {t.successSub}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-7 text-[12px] tracking-[0.2em] text-gold uppercase underline-offset-4 hover:underline"
            >
              {t.another}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="anim mt-12 grid grid-cols-1 gap-6 border border-ivory/15 bg-ivory-deep p-7 sm:grid-cols-2 md:p-10"
          >
            <div>
              <label htmlFor="bk-name" className={labelClass}>
                {t.name} <span className="text-gold-deep">*</span>
              </label>
              <input
                id="bk-name"
                name="name"
                type="text"
                required
                maxLength={120}
                autoComplete="name"
                placeholder={t.namePlaceholder}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="bk-contact" className={labelClass}>
                {t.contact} <span className="text-gold-deep">*</span>
              </label>
              <input
                id="bk-contact"
                name="contact"
                type="text"
                required
                maxLength={160}
                autoComplete="email"
                placeholder={t.contactPlaceholder}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="bk-service" className={labelClass}>
                {t.service} <span className="text-gold-deep">*</span>
              </label>
              <select
                id="bk-service"
                name="service"
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={inputClass}
              >
                <option value="" disabled>
                  {t.chooseService}
                </option>
                {bookingServices.map((s) => (
                  <option key={s} value={s}>
                    {t.serviceOptions[s] ?? s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bk-stylist" className={labelClass}>
                {t.stylist}
              </label>
              <select
                id="bk-stylist"
                name="stylist"
                defaultValue={stylists[0]}
                className={inputClass}
              >
                {stylists.map((s) => (
                  <option key={s} value={s}>
                    {s === "No preference" ? t.noPreference : s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bk-date" className={labelClass}>
                {t.date} <span className="text-gold-deep">*</span>
              </label>
              <input
                id="bk-date"
                name="date"
                type="date"
                required
                min={today}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="bk-time" className={labelClass}>
                {t.time} <span className="text-gold-deep">*</span>
              </label>
              <select
                id="bk-time"
                name="time"
                required
                defaultValue=""
                className={inputClass}
              >
                <option value="" disabled>
                  {t.chooseTime}
                </option>
                {bookingTimes.map((tm) => (
                  <option key={tm} value={tm}>
                    {t.timeOptions[tm] ?? tm}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="bk-notes" className={labelClass}>
                {t.notes}
              </label>
              <textarea
                id="bk-notes"
                name="notes"
                rows={3}
                maxLength={2000}
                placeholder={t.notesPlaceholder}
                className={inputClass}
              />
            </div>

            <div className="hidden" aria-hidden>
              <label htmlFor="bk-company">Company</label>
              <input
                id="bk-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {status === "error" && (
              <p
                className="sm:col-span-2 border border-red-800/40 bg-red-50 px-4 py-3 text-sm text-red-900"
                role="alert"
              >
                {errorMsg}
              </p>
            )}

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-ink px-8 py-4 text-[12px] tracking-[0.24em] text-ivory uppercase transition-all duration-200 hover:scale-[1.01] hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? t.sending : t.submit}
              </button>
              <p className="mt-4 text-[12px] font-light text-stone">
                {t.reassurance}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
