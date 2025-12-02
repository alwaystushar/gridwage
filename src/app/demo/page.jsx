"use client";

import Link from "next/link";
import DirectionWrapper from "../DirectionWrapper";

export default function DemoPage() {
  return (
    <DirectionWrapper>
      <main className="pt-[8vw] pb-[6vw] px-[4vw] md:px-[12vw] bg-white text-[#111] min-h-screen">
        <section className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-[#7b46ff]">
            Preview
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold">
            GridWage demo experience
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We are putting the finishing touches on our interactive product
            walkthrough. In the meantime you can explore our{" "}
            <Link href="/product/eor" className="text-[#7b46ff] underline">
              product pages
            </Link>{" "}
            or{" "}
            <a
              href="mailto:hello@gridwage.com"
              className="text-[#7b46ff] underline"
            >
              contact us
            </a>{" "}
            for a guided session.
          </p>
        </section>
      </main>
    </DirectionWrapper>
  );
}

