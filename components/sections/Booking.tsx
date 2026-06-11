"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useGSAP, sectionReveal } from "@/lib/gsap";
import {
  bookingServices,
  bookingTimes,
  stylists,
  site,
  PREFILL_EVENT,
} from "@/lib/site";

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
    { scope: ref }
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
        setErrorMsg(
          json.error ??
            `Something went wrong sending your request. Please try again, or email us at ${site.email}.`
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        `Something went wrong sending your request. Please try again, or email us at ${site.email}.`
      );
    }
  }

  return (
    <section ref={ref} id="book" className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="anim mb-4 text-center text-[11px] tracking-[0.32em] text-gold uppercase">
          Reservations
        </p>
        <h2 className="anim font-display text-center text-3xl leading-tight text-ivory md:text-4xl">
          Book your appointment
        </h2>
        <p className="anim mx-auto mt-4 max-w-lg text-center text-sm font-light leading-relaxed text-ivory/70">
          Tell us what you&apos;d like and when works for you — we&apos;ll
          confirm by email or text, usually within a few hours.
        </p>

        {status === "success" ? (
          <div
            className="mt-12 border border-gold/50 bg-ivory/[0.04] p-10 text-center"
            role="status"
          >
            <span
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold"
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
              Request received
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm font-light leading-relaxed text-ivory/70">
              Keep an eye on your phone or inbox — we usually reply within a
              few hours during opening times.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-7 text-[12px] tracking-[0.2em] text-gold uppercase underline-offset-4 hover:underline"
            >
              Make another request
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="anim mt-12 grid grid-cols-1 gap-6 border border-ivory/15 bg-ivory-deep p-7 sm:grid-cols-2 md:p-10"
          >
            <div>
              <label htmlFor="bk-name" className={labelClass}>
                Your name <span className="text-gold-deep">*</span>
              </label>
              <input
                id="bk-name"
                name="name"
                type="text"
                required
                maxLength={120}
                autoComplete="name"
                placeholder="Jane Lee"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="bk-contact" className={labelClass}>
                Phone or email <span className="text-gold-deep">*</span>
              </label>
              <input
                id="bk-contact"
                name="contact"
                type="text"
                required
                maxLength={160}
                autoComplete="email"
                placeholder="However you'd like us to confirm"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="bk-service" className={labelClass}>
                Service <span className="text-gold-deep">*</span>
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
                  Choose a service
                </option>
                {bookingServices.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bk-stylist" className={labelClass}>
                Preferred stylist
              </label>
              <select
                id="bk-stylist"
                name="stylist"
                defaultValue={stylists[0]}
                className={inputClass}
              >
                {stylists.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bk-date" className={labelClass}>
                Preferred date <span className="text-gold-deep">*</span>
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
                Preferred time <span className="text-gold-deep">*</span>
              </label>
              <select
                id="bk-time"
                name="time"
                required
                defaultValue=""
                className={inputClass}
              >
                <option value="" disabled>
                  Choose a time
                </option>
                {bookingTimes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="bk-notes" className={labelClass}>
                Notes
              </label>
              <textarea
                id="bk-notes"
                name="notes"
                rows={3}
                maxLength={2000}
                placeholder="Anything we should know — hair length, inspo photos coming, first visit…"
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
                {status === "sending" ? "Sending…" : "Request appointment"}
              </button>
              <p className="mt-4 text-[12px] font-light text-stone">
                No payment, no commitment — this is just a request. We confirm
                every appointment personally before it's set.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
