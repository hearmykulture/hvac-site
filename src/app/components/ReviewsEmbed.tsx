"use client";
import Script from "next/script";

const ELFSIGHT_APP_CLASS = "elfsight-app-b7e45f12-7999-4957-af33-4934125e3bcd";

export default function ReviewsEmbed({
  className = "",
}: {
  className?: string;
}) {
  return (
    <>
      {/* Load Elfsight once on the client */}
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
      />
      {/* The widget container Elfsight looks for */}
      <div
        className={`${ELFSIGHT_APP_CLASS} ${className}`}
        data-elfsight-app-lazy
      />
    </>
  );
}
