"use client";

import React from "react";
import Script from "next/script";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

/** Dynamically load the pure-Leaflet map (no SSR) */
const RadiusMap = dynamic(() => import("./components/RadiusMap"), {
  ssr: false,
});

/** Brand */
const BRAND = {
  primaryDark: "#0047FF",
  primary: "#00D1FF",
  accent: "#FF5A1F",
  bg: "#000000",
};

/** Business */
const COMPANY_NAME = "Hawthorne HVAC and Repair, LLC";
const OWNER_NAME = "Brian James";
const PHONE_DISPLAY = "(608) 608-0995";
const PHONE_E164 = "+16086080995";
const EMAIL = "brian@hawthorne-hvacrepair.com";
const LICENSE_LINE = "WI HVAC #791-HVACCONT • Insured";
const PAYMENT_LINE = "Cash, Check, Card, Mobile payments";
const TAGLINE =
  "Owner-Operated • Emergency line open 24 hours (after-hours visits when available)";

const HOURS: Record<string, string> = {
  Mon: "7:00 AM – 5:00 PM",
  Tue: "7:00 AM – 5:00 PM",
  Wed: "7:00 AM – 5:00 PM",
  Thu: "7:00 AM – 5:00 PM",
  Fri: "7:00 AM – 5:00 PM",
  Sat: "Emergency line open 24 hours",
  Sun: "Emergency line open 24 hours",
};

const SERVICE_AREAS = [
  "Madison, WI",
  "Monona, WI",
  "Sun Prairie, WI",
  "Deforest, WI",
  "Fitchburg, WI",
];

const SERVICES: { icon: string; title: string; desc: string }[] = [
  {
    icon: "🔥",
    title: "Heating Equipment Maintenance",
    desc: "Seasonal tune-ups to keep heat reliable and safe.",
  },
  {
    icon: "🔥",
    title: "Heating Equipment Repair",
    desc: "No-heat issues, diagnostics, parts replacement.",
  },
  {
    icon: "🔥",
    title: "Heating Equipment Installation",
    desc: "High-efficiency furnaces and safe installs.",
  },
  {
    icon: "❄️",
    title: "Cooling Equipment Maintenance",
    desc: "Coil cleaning, checks, and performance tuning.",
  },
  {
    icon: "❄️",
    title: "Cooling Equipment Repair",
    desc: "Warm-air, leaks, and control problems fixed.",
  },
  {
    icon: "❄️",
    title: "Cooling Equipment Installation",
    desc: "Proper sizing and pro AC installs.",
  },
  // Not sure / other option
  {
    icon: "❓",
    title: "Not sure / Something else",
    desc: "Describe the issue and I’ll help you figure out the right service.",
  },
];

const CORE_SERVICES = SERVICES.filter(
  (s) => s.title !== "Not sure / Something else"
);
const OTHER_SERVICE = SERVICES.find(
  (s) => s.title === "Not sure / Something else"
);

const BRANDS = ["Carrier", "Trane", "Lennox", "Goodman", "Rheem"];

/** Shared container */
const CONTAINER = "mx-auto max-w-7xl px-6 sm:px-8";

/* ----- UI bits (bigger pills / consistent tokens) ----- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-white/90 ring-1 ring-white/15 backdrop-blur">
      {children}
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white text-gray-900 px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/10">
      {children}
    </span>
  );
}

function SectionTitle({
  overline,
  title,
  sub,
}: {
  overline?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {overline && (
        <div className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
          {overline}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base text-white/70">{sub}</p>}
    </div>
  );
}

function PhoneCTA({ className = "" }: { className?: string }) {
  return (
    <a
      href={`tel:${PHONE_E164}`}
      data-analytics="click_to_call"
      className={
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white shadow-md ring-1 ring-white/20 transition active:scale-[.98] " +
        className
      }
      style={{
        background: `linear-gradient(90deg, ${BRAND.primaryDark}, ${BRAND.primary})`,
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="opacity-90"
      >
        <path
          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.12.9.33 1.77.63 2.6a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.48-1.48a2 2 0 012.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0122 16.92z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
      <span>Call Now • {PHONE_DISPLAY}</span>
    </a>
  );
}

function TextCTA({ className = "" }: { className?: string }) {
  return (
    <a
      href={`sms:${PHONE_E164}`}
      data-analytics="tap_text_us"
      className={
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-gray-900 bg-white ring-1 ring-black/10 shadow transition active:scale-[.98] " +
        className
      }
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="opacity-90"
      >
        <path
          d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4v8z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
      <span>Text Us</span>
    </a>
  );
}

function KeyStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs tracking-wide text-white/70">{label}</div>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/10 p-6 transition hover:bg-white/[0.14]">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-white text-lg">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/80">{desc}</p>
      <a
        href="#contact"
        className="mt-4 inline-block text-sm font-semibold text-white/90 underline underline-offset-4 decoration-white/30"
      >
        Request Service →
      </a>
    </div>
  );
}

/* Hours cards — center day label + hours, fix wrapping */
function HoursTable() {
  return (
    <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 md:grid-cols-4">
      {Object.entries(HOURS).map(([day, hours]) => {
        const isWeekend = day === "Sat" || day === "Sun";
        return (
          <div
            key={day}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center"
          >
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                color: isWeekend ? BRAND.accent : "rgba(255,255,255,0.72)",
              }}
            >
              {day}
            </span>
            <span className="mt-2 text-sm leading-snug text-white/85">
              {hours}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ----- Elfsight Reviews Embed (no Place ID needed) ----- */
const ELFSIGHT_APP_CLASS = "elfsight-app-b7e45f12-7999-4957-af33-4934125e3bcd";
function ReviewsEmbed({ className = "" }: { className?: string }) {
  return (
    <>
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
      />
      <div
        className={`${ELFSIGHT_APP_CLASS} ${className}`}
        data-elfsight-app-lazy
      />
    </>
  );
}

/* ----- Page ----- */

export default function Page() {
  return (
    <main
      className="min-h-screen text-white"
      style={{ backgroundColor: BRAND.bg }}
    >
      {/* Top strip */}
      <div className="w-full bg-black/60 ring-1 ring-white/10">
        <div
          className={`${CONTAINER} flex items-center justify-between gap-4 py-2.5 text-sm`}
        >
          <div className="flex flex-wrap items-center gap-3 text-white/75">
            <Badge>Owner-Operated</Badge>
            <Badge>Emergency Line 24/7</Badge>
            <Badge>Licensed & Insured</Badge>
            <Badge>Upfront Pricing</Badge>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <a
              href={`tel:${PHONE_E164}`}
              className="font-semibold text-white/85 hover:text-white"
            >
              {PHONE_DISPLAY}
            </a>
            <span className="text-white/40">•</span>
            <a
              href={`sms:${PHONE_E164}`}
              className="text-white/85 hover:text-white"
            >
              Text Us
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/40 ring-1 ring-white/10 backdrop-blur supports-[backdrop-filter]:bg-black/35">
        <div className={`${CONTAINER} flex items-center justify-between py-3`}>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt={COMPANY_NAME}
              className="h-12 w-12 md:h-14 md:w-14 rounded-xl object-contain"
            />
            <div className="text-lg md:text-xl font-bold">{COMPANY_NAME}</div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            <a href="#services" className="hover:text-white">
              Services
            </a>
            <a href="#areas" className="hover:text-white">
              Service Areas
            </a>
            <a href="#reviews" className="hover:text-white">
              Reviews
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <TextCTA />
            <PhoneCTA />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background: `radial-gradient(1200px 600px at 10% -10%, ${BRAND.primaryDark}, transparent),
                         radial-gradient(900px 450px at 90% -20%, ${BRAND.accent}, transparent)`,
          }}
        />
        <div className={`${CONTAINER} relative pb-20 pt-14 sm:pb-28 sm:pt-18`}>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm ring-1 ring-white/15">
                <span className="opacity-85">{TAGLINE}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Fast, Reliable <span style={{ color: BRAND.accent }}>HVAC</span>{" "}
                Service
              </h1>
              <p className="mt-4 max-w-xl text-white/80">
                Talk directly with {OWNER_NAME}. Heating &amp; cooling
                maintenance, repairs, and installs.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PhoneCTA />
                <TextCTA />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Pill>
                  <span className="mr-2" style={{ color: BRAND.accent }}>
                    ●
                  </span>
                  {LICENSE_LINE}
                </Pill>
                <Pill>Payments: {PAYMENT_LINE}</Pill>
              </div>

              <p className="mt-4 text-sm text-white/70">
                Emergency calls available dependent on staffing. I’ll text back
                with an ETA if I’m on a job.
              </p>
            </div>

            <div>
              <div className="relative rounded-3xl border border-white/10 bg-white/10 p-2">
                <div className="grid aspect-video w-full place-items-center rounded-2xl bg-gradient-to-br from-white/10 to-white/0 px-6 text-center text-white/70">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em]">
                      Project Showcase
                    </div>
                    <div className="mt-2 text-2xl font-bold">
                      Furnace + AC Replacement
                    </div>
                    <div className="mt-2 text-sm">
                      (Swap with real photos later)
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-4">
                <KeyStat label="Years Serving" value="10+" />
                <KeyStat label="5-Star Reviews" value="200+" />
                <KeyStat label="Avg. Response" value="< 2 hrs" />
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="mt-12">
            <div className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-white/60">
              We service all major brands
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-white/70">
              {BRANDS.map((b) => (
                <span key={b} className="text-sm">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-12">
        <div className={CONTAINER}>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                "You’ll talk to the owner",
                "No call center—just me, start to finish.",
              ],
              [
                "On-time, tidy work",
                "Boot covers, clean workspace, clear explanations.",
              ],
              ["Straight prices", "Options first, surprise fees never."],
            ].map(([h, s]) => (
              <div
                key={h}
                className="rounded-2xl border border-white/10 bg-white/10 p-6"
              >
                <h3 className="font-semibold text-white">{h}</h3>
                <p className="mt-2 text-sm text-white/80">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className={CONTAINER}>
          <SectionTitle
            overline="What I do"
            title="Heating, Cooling & More"
            sub="Transparent pricing and tidy work—every time."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((s) => (
              <ServiceCard
                key={s.title}
                icon={<span>{s.icon}</span>}
                title={s.title}
                desc={s.desc}
              />
            ))}
            {/* Center the "Not sure / Something else" card on desktop */}
            <div className="hidden lg:block" />
            {OTHER_SERVICE && (
              <ServiceCard
                icon={<span>{OTHER_SERVICE.icon}</span>}
                title={OTHER_SERVICE.title}
                desc={OTHER_SERVICE.desc}
              />
            )}
            <div className="hidden lg:block" />
          </div>

          {/* Ribbons */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <h3 className="text-xl font-bold">
                <span style={{ color: BRAND.accent }}>Emergency Line</span> •
                24/7
              </h3>
              <p className="mt-2 text-white/80">
                Emergency calls available dependent on staffing. Call or text
                and I’ll advise ETA and next steps.
              </p>
              <div className="mt-4 flex gap-3">
                <PhoneCTA />
                <TextCTA />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <h3 className="text-xl font-bold" style={{ color: BRAND.accent }}>
                Payment Options
              </h3>
              <p className="mt-2 text-white/80">{PAYMENT_LINE}</p>
              <a
                href="#contact"
                className="mt-4 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 ring-1 ring-black/10"
              >
                Request an estimate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section id="areas" className="py-20">
        <div className={CONTAINER}>
          <SectionTitle
            overline="Where I go"
            title="Service Areas"
            sub="Add or remove towns as needed."
          />
        </div>
        <div className={`${CONTAINER} mt-10 grid gap-6 md:grid-cols-2`}>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {SERVICE_AREAS.map((area) => (
                <li
                  key={area}
                  className="rounded-lg bg-white/15 px-4 py-3 text-white/85"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Live radius map (Leaflet) */}
          <RadiusMap
            center={[43.082617, -89.439355]}
            radiusKm={50}
            title="Primary service radius (~50 km)"
            className="h-[260px] md:h-[320px] rounded-2xl overflow-hidden border border-white/10"
          />
        </div>
      </section>

      {/* Reviews (Elfsight) */}
      <section id="reviews" className="py-20">
        <div className={CONTAINER}>
          <SectionTitle overline="Word of mouth" title="What customers say" />
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/10 p-4">
            {/* Prevent layout shift before widget hydrates */}
            <ReviewsEmbed className="min-h-[380px]" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className={CONTAINER}>
          <SectionTitle overline="Answers" title="HVAC FAQ" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              [
                "Do you offer free estimates?",
                "Yes—on new system installs and major repairs.",
              ],
              [
                "Do you service all brands?",
                "Most major brands including Carrier, Trane, Lennox, Goodman, and more.",
              ],
              [
                "After-hours emergency?",
                "Emergency line is open 24/7; after-hours visits when available.",
              ],
              [
                "Maintenance plans?",
                "Seasonal tune-ups help avoid breakdowns and keep warranties valid.",
              ],
            ].map(([q, a]) => (
              <details
                key={q}
                className="rounded-2xl border border-white/10 bg-white/10 p-6 open:bg-white/[0.14]"
              >
                <summary className="list-none cursor-pointer font-semibold text-white">
                  {q}
                </summary>
                <p className="mt-2 text-sm text-white/80">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className={CONTAINER}>
          <SectionTitle
            overline="Book now"
            title="Get a fast quote"
            sub={`Call, text, or send the form—${OWNER_NAME} will reply quickly.`}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Form submitted — wire this to Formspree/Netlify or your API later."
                  );
                }}
                className="grid gap-4"
              >
                <label className="grid gap-1 text-sm">
                  <span className="text-white/85">Name</span>
                  <input
                    required
                    placeholder="Your name"
                    className="h-11 rounded-2xl bg-white px-4 text-gray-900 ring-1 ring-black/10"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="text-white/85">Phone</span>
                  <input
                    required
                    placeholder={PHONE_DISPLAY}
                    className="h-11 rounded-2xl bg-white px-4 text-gray-900 ring-1 ring-black/10"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="text-white/85">Service</span>
                  <select className="h-11 rounded-2xl bg-white px-4 text-gray-900 ring-1 ring-black/10">
                    {SERVICES.map((s) => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="text-white/85">Message</span>
                  <textarea
                    rows={5}
                    placeholder="Tell me what's going on"
                    className="rounded-2xl bg-white px-4 py-3 text-gray-900 ring-1 ring-black/10"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="text-white/85">Photo (optional)</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="h-11 rounded-2xl bg-white px-4 text-gray-900 ring-1 ring-black/10"
                  />
                </label>
                <div className="mt-1 flex gap-3">
                  <button className="inline-flex justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 ring-1 ring-black/10">
                    Send
                  </button>
                  <TextCTA />
                </div>
                <div className="text-xs text-white/70">
                  Or email{" "}
                  <a className="underline" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </div>
              </form>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <h3 className="text-xl font-bold">Contact</h3>
              <div className="mt-3 text-white/85">
                <div>{COMPANY_NAME}</div>
                <div>Madison, WI 53714</div>
              </div>
              <div className="mt-3 text-white/85">
                <div>
                  Phone:{" "}
                  <a className="underline" href={`tel:${PHONE_E164}`}>
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div>
                  Email:{" "}
                  <a className="underline" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold">Hours</h4>
                <div className="mt-3">
                  <HoursTable />
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold">Licensing</h4>
                <p className="mt-2 text-white/80">{LICENSE_LINE}</p>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold">Payments</h4>
                <p className="mt-2 text-white/80">{PAYMENT_LINE}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/30">
        <div className={`${CONTAINER} grid gap-8 py-12 text-sm md:grid-cols-4`}>
          <div>
            <div className="mb-2 font-bold">{COMPANY_NAME}</div>
            <p className="text-white/70">
              Local, owner-operated heating &amp; cooling.
            </p>
          </div>
          <div>
            <div className="mb-2 font-semibold">Company</div>
            <ul className="space-y-1 text-white/70">
              <li>
                <a href="#services" className="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-white">
                  Service Areas
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-2 font-semibold">Get Help</div>
            <ul className="space-y-1 text-white/70">
              <li>Emergency line: 24/7</li>
              <li>Payments: {PAYMENT_LINE}</li>
            </ul>
          </div>
          <div>
            <div className="mb-2 font-semibold">Call or Text</div>
            <div className="flex gap-3">
              <TextCTA />
              <PhoneCTA />
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </div>
      </footer>

      {/* Sticky mobile call/text bar */}
      <div className="fixed inset-x-0 bottom-3 px-4 md:hidden">
        <div className="mx-auto max-w-md rounded-2xl bg-black/60 backdrop-blur ring-1 ring-white/20 shadow-lg">
          <div className="grid grid-cols-2 gap-2 p-2">
            <TextCTA />
            <PhoneCTA />
          </div>
        </div>
      </div>
    </main>
  );
}
