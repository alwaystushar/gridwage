"use client";

import { useMemo } from "react";
import DirectionWrapper from "../../DirectionWrapper";

const solutionCopy = {
  hiring: {
    title: "Global Hiring",
    summary:
      "Launch in new markets with locally compliant contracts, onboarding templates, and benefits that feel native.",
    bullets: [
      "Entity-free hiring in 120+ countries",
      "Localized offer letter builder",
      "Unified approvals for finance and legal",
    ],
  },
  contractors: {
    title: "Contractor Management",
    summary:
      "Onboard, pay, and organise contractors with automated tax forms and payout tracking.",
    bullets: [
      "Smart contracts with misclassification guardrails",
      "Mass payouts to 180 currencies",
      "Built-in expense reviews",
    ],
  },
  relocation: {
    title: "Employee Relocation",
    summary:
      "Visa support, housing stipends, and compliance workflows to move talent globally.",
    bullets: [
      "Immigration partner network",
      "Benefit stipends in local currency",
      "Centralised document vault",
    ],
  },
};

export default function SolutionDetail({ params }) {
  const details = useMemo(() => {
    const fallbackTitle =
      params?.slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ??
      "Solution";

    return (
      solutionCopy[params?.slug] ?? {
        title: fallbackTitle,
        summary:
          "We are finalising detailed playbooks for this solution. Share your requirements so we can tailor the rollout.",
        bullets: [
          "Outline your workforce goals",
          "Receive a tailored launch plan",
          "Collaborate with our compliance team",
        ],
      }
    );
  }, [params?.slug]);

  return (
    <DirectionWrapper>
      <main className="pt-[8vw] pb-[6vw] px-[4vw] md:px-[12vw] bg-white min-h-screen">
        <section className="max-w-4xl mx-auto space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-[#7b46ff]">
            Solution Blueprint
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold">{details.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {details.summary}
          </p>
          <ul className="space-y-3 text-base text-gray-700 list-disc pl-6">
            {details.bullets?.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>
      </main>
    </DirectionWrapper>
  );
}

