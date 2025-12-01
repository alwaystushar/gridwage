"use client";

import HeroSection from "./comp/HeroSection";
import { useLang } from "../i18n/LanguageContext";

function PageWrapper({ children }) {
  const { lang } = useLang();

  return <div dir={lang === "ar" ? "rtl" : "ltr"}>{children}</div>;
}

function HomeContent() {
  return <HeroSection />;
}

export default function HomePage() {
  return (
    <PageWrapper>
      <HomeContent />
    </PageWrapper>
  );
}
