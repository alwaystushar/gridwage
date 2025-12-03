

export async function generateStaticParams() {
  return [
    { slug: "eor" },
    { slug: "payroll" },
    { slug: "compliance" },
  ];
}

import { useMemo } from "react";
import DirectionWrapper from "../../DirectionWrapper";
import Link from "next/link";

const productCopy = {
  eor: {
    title: "Employer of Record",
    summary:
      "Hire full-time teammates in 120+ countries without opening new entities. We handle contracts, onboarding, and compliant benefits.",
  },
  payroll: {
    title: "Global Payroll",
    summary:
      "Automate multi-currency payroll with unified approvals, local tax handling, and transparent funding timelines.",
  },
  compliance: {
    title: "Compliance Suite",
    summary:
      "Centralise labour-law workflows, right-to-work documentation, and real-time risk alerts across every market.",
  },
};

export default function ProductDetail({ params }) {
  const details = useMemo(() => {
    const fallbackName =
      params?.slug?.replace(/-/g, " ") ?? "Product";

    return (
      productCopy[params?.slug] ?? {
        title: fallbackName.replace(/\b\w/g, (c) => c.toUpperCase()),
        summary:
          "We are preparing in-depth documentation for this product. Reach out below and we will prioritise your use case.",
      }
    );
  }, [params?.slug]);

  return (
    <DirectionWrapper>
      <main className="pt-[8vw] pb-[6vw] px-[4vw] md:px-[12vw] bg-white min-h-screen">
        <section className="max-w-4xl mx-auto space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-[#7b46ff]">
            Product Overview
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold">
            {details.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            {details.summary}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/demo"
              className="rounded-full border px-6 py-3 text-[#7b46ff] font-medium"
            >
              Book a demo
            </Link>

            <a
              href="mailto:hello@gridwage.com"
              className="rounded-full border px-6 py-3 text-gray-900 font-medium"
            >
              Talk to sales
            </a>
          </div>
        </section>
      </main>
    </DirectionWrapper>
  );
}
