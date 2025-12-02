"use client";

import React, { useEffect, useRef, useState, forwardRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { GlobeIcon } from "./GlobeIcon";
import { useLang } from "../i18n/LanguageContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const isRTL = lang === "ar";
  const dir = isRTL ? "rtl" : "ltr";
  const slideDir = isRTL ? "100%" : "-100%";

  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const headerRef = useRef(null);
  const navRef = useRef(null);
  const aboutRef = useRef(null);
  const productsRefWrap = useRef(null);
  const solutionsRefWrap = useRef(null);
  const pricingRef = useRef(null);
  const blogsRef = useRef(null);
  const indicatorRef = useRef(null);
  const productsRef = useRef(null);
  const solutionsRef = useRef(null);
  const langRef = useRef(null);
  const overlayRef = useRef(null);
  const mobileRef = useRef(null);

  const burgerTop = useRef(null);
  const burgerMid = useRef(null);
  const burgerBot = useRef(null);

  const slideBurgerTop = useRef(null);
  const slideBurgerMid = useRef(null);
  const slideBurgerBot = useRef(null);

  const products = [
    {
      id: "eor",
      title: "Employer of Record",
      desc: "Hire full-time employees globally without entities.",
      href: "/product/eor",
      icon: "👔",
      span: "col-span-3",
    },
    {
      id: "payroll",
      title: "Global Payroll",
      desc: "Automated payroll in 80+ countries with compliance.",
      href: "/product/payroll",
      icon: "💸",
      span: "col-span-5",
    },
    {
      id: "comp",
      title: "Compliance Suite",
      desc: "Local labour law & tax compliance made simple.",
      href: "/product/compliance",
      icon: "🛡️",
      span: "col-span-4",
    },
  ];

  const solutions = [
    {
      id: "hiring",
      title: "Global Hiring",
      desc: "Hire globally with compliant local contracts.",
      href: "/solution/hiring",
      icon: "🌍",
      span: "col-span-3",
    },
    {
      id: "contractor",
      title: "Contractor Management",
      desc: "Onboard, manage, and pay contractors globally.",
      href: "/solution/contractors",
      icon: "🧾",
      span: "col-span-5",
    },
    {
      id: "relocation",
      title: "Employee Relocation",
      desc: "Seamless international employee mobility.",
      href: "/solution/relocation",
      icon: "🚚",
      span: "col-span-4",
    },
  ];

  

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  useEffect(() => {
    function handleDocPointer(e) {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("pointerdown", handleDocPointer);
    return () => document.removeEventListener("pointerdown", handleDocPointer);
  }, []);

  useEffect(() => {
    if (mobileRef.current) gsap.set(mobileRef.current, { x: slideDir });
    if (overlayRef.current)
      gsap.set(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
      });

    [
      burgerTop,
      burgerMid,
      burgerBot,
      slideBurgerTop,
      slideBurgerMid,
      slideBurgerBot,
    ].forEach((r) => {
      if (r.current) gsap.set(r.current, { transformOrigin: "50% 50%" });
    });
  }, [slideDir]);

  useEffect(() => {
    function animatePanelIn(panel) {
      if (!panel) return;
      panel.style.display = "block";
      gsap.fromTo(
        panel,
        { opacity: 0, y: -6, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.26, ease: "power2.out" }
      );
      const cards = panel.querySelectorAll(".gw-dropdown-item");
      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 6, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.32,
            ease: "power2.out",
            delay: 0.06,
          }
        );
      }
    }

    function animatePanelOut(panel) {
      if (!panel) return;
      gsap.to(panel, {
        opacity: 0,
        y: -6,
        scale: 0.98,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => (panel.style.display = "none"),
      });
    }

    openMenu === "products"
      ? animatePanelIn(productsRef.current)
      : animatePanelOut(productsRef.current);
    openMenu === "solutions"
      ? animatePanelIn(solutionsRef.current)
      : animatePanelOut(solutionsRef.current);
    openMenu === "lang"
      ? animatePanelIn(langRef.current)
      : animatePanelOut(langRef.current);
  }, [openMenu]);

  useEffect(() => {
    if (!mobileRef.current || !overlayRef.current) return;

    const mobileItemsSelector = "[data-mobile-item]";
    const items = mobileRef.current.querySelectorAll(mobileItemsSelector);
    const logo = mobileRef.current.querySelector("img");
    const tagline = mobileRef.current.querySelector("p");

    const easeFast = "power2.out";
    const easeSmooth = "power3.inOut";

    // Get elements in specific order: About, Products, Solutions, Pricing, Blogs, Language, Try Demo
    const allItems = mobileRef.current.querySelectorAll('[data-mobile-item]');
    const allHeaders = mobileRef.current.querySelectorAll('[data-mobile-accordion-header]');
    const contents = mobileRef.current.querySelectorAll('[data-mobile-accordion-content]');
    
    // Build ordered array: About (item 0), Products header, Solutions header, Pricing (item 1), Blogs (item 2), Language header, Try Demo
    const orderedNodes = [];
    
    // Add About Us (first item)
    if (allItems[0]) orderedNodes.push(allItems[0]);
    
    // Add Products header (first accordion)
    if (allHeaders[0]) orderedNodes.push(allHeaders[0]);
    
    // Add Solutions header (second accordion)
    if (allHeaders[1]) orderedNodes.push(allHeaders[1]);
    
    // Add Pricing (second item)
    if (allItems[1]) orderedNodes.push(allItems[1]);
    
    // Add Blogs (third item)
    if (allItems[2]) orderedNodes.push(allItems[2]);
    
    // Add Language header (third accordion)
    if (allHeaders[2]) orderedNodes.push(allHeaders[2]);
    
    // Add Try Demo link (last element in nav, should be a Link)
    const navElement = mobileRef.current.querySelector('nav');
    if (navElement) {
      const demoLink = navElement.querySelector('a[href="/demo"]');
      if (demoLink) orderedNodes.push(demoLink);
    }

    // Reset accordion content heights
    contents.forEach((c) => {
      gsap.set(c, { height: 0, opacity: 0 });
    });

    if (mobileOpen) {
      /** OVERLAY **/
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.35,
        ease: easeFast,
      });

      /** MAIN MENU SLIDE **/
      gsap.to(mobileRef.current, {
        x: 0,
        duration: 0.55,
        ease: easeSmooth,
      });

      /** HAMBURGER → X */
      const tlBurger = gsap.timeline({ defaults: { duration: 0.32, ease: easeSmooth } });

      if (burgerTop.current) tlBurger.to(burgerTop.current, { y: 7, rotate: 45 }, 0);
      if (burgerMid.current) tlBurger.to(burgerMid.current, { x: -8, y: 8, rotate: -45, scaleX: 0.4 }, 0);
      if (burgerBot.current) tlBurger.to(burgerBot.current, { y: -7, rotate: -45, scaleX: 1.5 }, 0);

      if (slideBurgerTop.current) tlBurger.to(slideBurgerTop.current, { y: 7, rotate: 45 }, 0);
      if (slideBurgerMid.current) tlBurger.to(slideBurgerMid.current, { x: -8, y: 8, rotate: -45, scaleX: 0.4 }, 0);
      if (slideBurgerBot.current) tlBurger.to(slideBurgerBot.current, { y: -7, rotate: -45, scaleX: 1.5 }, 0);

      // Animate ordered nodes one-by-one (fade up) - START AFTER MENU FULLY OPENS
      if (orderedNodes.length) {
        gsap.fromTo(
          orderedNodes,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            delay: 0.55,
            stagger: { each: 0.08, from: "start" },
            duration: 0.32,
            ease: easeFast,
          }
        );
      }

      document.body.style.overflow = "hidden";

    } else {
      /** FADE DOWN ITEMS THEN SLIDE OUT **/
      const tl = gsap.timeline({ defaults: { ease: easeFast } });

      // Fade down in reverse order (Try Demo → Language → Blogs → Pricing → Solutions → Products → About)
      if (orderedNodes.length) {
        tl.to(orderedNodes, { y: 12, opacity: 0, stagger: { each: 0.08, from: "end" }, duration: 0.28 }, 0);
      }

      // overlay fade and then slide menu
      tl.to(
        overlayRef.current,
        { opacity: 0, pointerEvents: "none", duration: 0.28 },
        0
      )
        .to(
          mobileRef.current,
          { x: slideDir, duration: 0.45, ease: easeSmooth },
          "+=0.06"
        );

      /** X → HAMBURGER **/
      const tlBurger = gsap.timeline({ defaults: { duration: 0.32, ease: easeSmooth } });

      if (burgerTop.current) tlBurger.to(burgerTop.current, { y: 0, rotate: 0 }, 0);
      if (burgerMid.current) tlBurger.to(burgerMid.current, { x: 0, y: 0, rotate: 0, scaleX: 1 }, 0);
      if (burgerBot.current) tlBurger.to(burgerBot.current, { y: 0, rotate: 0, scaleX: 1 }, 0);

      if (slideBurgerTop.current) tlBurger.to(slideBurgerTop.current, { y: 0, rotate: 0 }, 0);
      if (slideBurgerMid.current) tlBurger.to(slideBurgerMid.current, { x: 0, y: 0, rotate: 0, scaleX: 1 }, 0);
      if (slideBurgerBot.current) tlBurger.to(slideBurgerBot.current, { y: 0, rotate: 0, scaleX: 1 }, 0);

      document.body.style.overflow = "auto";
      setMobileDropdown(null);
    }
  }, [mobileOpen, slideDir]);


  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  const chooseLanguage = (lng) => {
    setLang(lng);
    closeAll();
  };

  const pathname = usePathname();

  const getActiveKeyFromPath = (p) => {
    if (!p) return null;
    if (p.startsWith("/about")) return "about";
    if (p.startsWith("/product") || p.startsWith("/products")) return "products";
    if (p.startsWith("/solution") || p.startsWith("/solutions")) return "solutions";
    if (p.startsWith("/pricing")) return "pricing";
    if (p.startsWith("/blogs") || p.startsWith("/blog")) return "blogs";
    return null;
  };

  const refsByKey = {
    about: aboutRef,
    products: productsRefWrap,
    solutions: solutionsRefWrap,
    pricing: pricingRef,
    blogs: blogsRef,
  };

  const updateIndicator = (key) => {
    // don't show indicator for products and solutions
    if (!key || key === "products" || key === "solutions") {
      if (indicatorRef.current) {
        indicatorRef.current.style.opacity = 0;
      }
      return;
    }

    const wrap = navRef.current;
    const targetRef = refsByKey[key];
    if (!wrap || !targetRef || !targetRef.current) {
      if (indicatorRef.current) {
        indicatorRef.current.style.opacity = 0;
      }
      return;
    }

    const wrapRect = wrap.getBoundingClientRect();
    const rect = targetRef.current.getBoundingClientRect();
    const width = rect.width;

    if (indicatorRef.current) {
      indicatorRef.current.style.opacity = 1;
      indicatorRef.current.style.width = `${width}px`;
      
      if (isRTL) {
        // RTL: position from right
        const right = wrapRect.right - rect.right + wrap.scrollLeft;
        indicatorRef.current.style.right = `${right}px`;
        indicatorRef.current.style.left = "auto";
        indicatorRef.current.style.transform = "none";
      } else {
        // LTR: position from left
        const left = rect.left - wrapRect.left + wrap.scrollLeft;
        indicatorRef.current.style.left = `${left}px`;
        indicatorRef.current.style.right = "auto";
        indicatorRef.current.style.transform = "none";
      }
    }
  };

  useLayoutEffect(() => {
    const key = getActiveKeyFromPath(pathname);
    updateIndicator(key);
  }, [pathname, isRTL]);

  useEffect(() => {
    const onResize = () => {
      const key = getActiveKeyFromPath(pathname);
      updateIndicator(key);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname, isRTL]);

  const activeKey = getActiveKeyFromPath(pathname);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-white">
        <div
          ref={headerRef}
          className="grid items-center grid-cols-12 px-[3vw] py-[1.3vw]"
          style={{ direction: dir }}
        >
          <div className="flex items-center col-span-3">
            <Link href="/">
              <img
                src="/fav.svg"
                alt="GridWage"
                className="w-[3.6vw] rounded-[0.7vw]"
              />
            </Link>
          </div>

          <nav
            ref={navRef}
            className="hidden md:flex col-span-6 justify-center gap-[3vw] relative"
          >
            <span ref={aboutRef} className="inline-block" onClick={() => updateIndicator('about')}>
              <Link href="/about" className={`text-[1.05vw] hover:text-black transition-colors ${activeKey === 'about' ? 'text-[#7b46ff] font-semibold' : ''}`}>
                {t?.nav_about ?? "About Us"}
              </Link>
            </span>

            <span ref={productsRefWrap} className="inline-block">
              <DesktopMega
                label={t?.nav_products ?? "Products"}
                isRTL={isRTL}
                open={openMenu === "products"}
                onClick={() =>
                  setOpenMenu(openMenu === "products" ? null : "products")
                }
                ref={productsRef}
                items={products}
              />
            </span>

            <span ref={solutionsRefWrap} className="inline-block">
              <DesktopMega
                label={t?.nav_solutions ?? "Solutions"}
                isRTL={isRTL}
                open={openMenu === "solutions"}
                onClick={() =>
                  setOpenMenu(openMenu === "solutions" ? null : "solutions")
                }
                ref={solutionsRef}
                items={solutions}
              />
            </span>

            <span ref={pricingRef} className="inline-block" onClick={() => updateIndicator('pricing')}>
              <Link href="/pricing" className={`text-[1.05vw] hover:text-black transition-colors ${activeKey === 'pricing' ? 'text-[#7b46ff] font-semibold' : ''}`}>
                {t?.nav_pricing ?? "Pricing"}
              </Link>
            </span>

            <span ref={blogsRef} className="inline-block" onClick={() => updateIndicator('blogs')}>
              <Link href="/blogs" className={`text-[1.05vw] hover:text-black transition-colors ${activeKey === 'blogs' ? 'text-[#7b46ff] font-semibold' : ''}`}>
                {t?.nav_blogs ?? "Blogs"}
              </Link>
            </span>

            <div
              ref={indicatorRef}
              className="absolute bottom-[-0.3vw] h-[0.2vw] bg-[#7b46ff]"
              style={{
                width: 0,
                transition: "right 320ms cubic-bezier(.2,.9,.2,1), left 320ms cubic-bezier(.2,.9,.2,1), width 320ms cubic-bezier(.2,.9,.2,1), opacity 200ms",
                opacity: 0,
              }}
            />
          </nav>

          <div className="col-span-9 md:col-span-3 flex justify-end items-center gap-[2vw]">
            <div className="hidden md:flex items-center gap-[1.2vw]">
              <div className="relative inline-block">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === "lang" ? null : "lang")
                  }
                  className="rounded-full border p-[0.45vw] flex items-center justify-center"
                >
                  <GlobeIcon className="w-[1.2vw] h-[1.2vw]" />
                </button>

                <div
                  ref={langRef}
                  className="absolute bg-white rounded-lg shadow-xl py-[0.6vw] px-[1vw]"
                  style={{
                    display: "none",
                    top: "3vw",
                    minWidth: "11vw",
                    right: isRTL ? "auto" : 0,
                    left: isRTL ? 0 : "auto",
                    zIndex: 2000,
                  }}
                >
                  <button
                    className="block w-full text-left py-[0.5vw] text-[1vw]"
                    onClick={() => chooseLanguage("en")}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    className="block w-full text-left py-[0.5vw] text-[1vw]"
                    onClick={() => chooseLanguage("ar")}
                  >
                    🇸🇦 العربية
                  </button>
                  <button
                    className="block w-full text-left py-[0.5vw] text-[1vw]"
                    onClick={() => chooseLanguage("es")}
                  >
                    🇪🇸 Español
                  </button>
                </div>
              </div>

              <Link
                href="/demo"
                className="rounded-full border px-[1.2vw] py-[0.55vw] text-[1.05vw]"
                style={{ borderColor: "#7b46ff", color: "#7b46ff" }}
              >
                Try demo
              </Link>
            </div>


          </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 opacity-0 pointer-events-none bg-black/40 md:hidden"
        onClick={() => setMobileOpen(false)}
        style={{ zIndex: 48 }}
      />

      <div
        ref={mobileRef}
        className="fixed top-0 bg-white md:hidden w-screen h-screen overflow-y-auto p-[6vw]"
        style={{
          zIndex: 9999,
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
          <div
            className="flex items-center gap-[3vw] mt-[3vw] mb-[4vw]"
          >
          <img
            src="/fav.svg"
            alt="GridWage"
            className="w-[12vw] h-[12vw] rounded-[0.8vw]"
          />
          <div>
            <h3
              className="text-[6vw] m-0 font-bold"
            >
              GridWage
            </h3>
            <p
              className="text-[3.2vw] m-0 text-[#666]"
            >
              {t?.tagline ?? "Global payroll & EOR"}
            </p>
          </div>
        </div>


        <nav
          className="flex flex-col gap-[5.5vw]"
        >
          <a
            data-mobile-item
            href="/about"
            className="text-[5.2vw]"
            style={{ color: activeKey === "about" ? "#7b46ff" : "#111" }}
          >
            {t?.nav_about ?? "About Us"}
          </a>

          <MobileAccordion
            title={t?.nav_products ?? "Products"}
            isActive={activeKey === "products"}
            items={products}
            open={mobileDropdown === "products"}
            toggle={() =>
              setMobileDropdown((p) => (p === "products" ? null : "products"))
            }
            animateAccordion={(ref, open) => {
              if (!ref) return;
              if (open) {
                gsap.fromTo(
                  ref,
                  { height: 0, opacity: 0 },
                  {
                    height: "auto",
                    opacity: 1,
                    duration: 0.34,
                    ease: "power2.out",
                  }
                );
                gsap.fromTo(
                  ref.querySelectorAll("a"),
                  { y: 6, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    stagger: 0.06,
                    duration: 0.28,
                    ease: "power2.out",
                  }
                );
              } else {
                gsap.to(ref, {
                  height: 0,
                  opacity: 0,
                  duration: 0.28,
                  ease: "power2.in",
                });
              }
            }}
          />

          <MobileAccordion
            title={t?.nav_solutions ?? "Solutions"}
            isActive={activeKey === "solutions"}
            items={solutions}
            open={mobileDropdown === "solutions"}
            toggle={() =>
              setMobileDropdown((p) => (p === "solutions" ? null : "solutions"))
            }
            animateAccordion={(ref, open) => {
              if (!ref) return;
              if (open) {
                gsap.fromTo(
                  ref,
                  { height: 0, opacity: 0 },
                  {
                    height: "auto",
                    opacity: 1,
                    duration: 0.34,
                    ease: "power2.out",
                  }
                );
                gsap.fromTo(
                  ref.querySelectorAll("a"),
                  { y: 6, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    stagger: 0.06,
                    duration: 0.28,
                    ease: "power2.out",
                  }
                );
              } else {
                gsap.to(ref, {
                  height: 0,
                  opacity: 0,
                  duration: 0.28,
                  ease: "power2.in",
                });
              }
            }}
          />

          <a data-mobile-item href="/pricing" className="text-[5.2vw]" style={{ color: activeKey === "pricing" ? "#7b46ff" : "#111" }}>
            {t?.nav_pricing ?? "Pricing"}
          </a>
          <a data-mobile-item href="/blogs" className="text-[5.2vw]" style={{ color: activeKey === "blogs" ? "#7b46ff" : "#111" }}>
            {t?.nav_blogs ?? "Blogs"}
          </a>

          <MobileAccordion
            title={t?.language ?? "Language"}
            items={[
              {
                key: "en",
                label: "🇺🇸 English",
                action: () => {
                  chooseLanguage("en");
                },
              },
              {
                key: "ar",
                label: "🇸🇦 العربية",
                action: () => {
                  chooseLanguage("ar");
                },
              },
              {
                key: "es",
                label: "🇪🇸 Español",
                action: () => {
                  chooseLanguage("es");
                },
              },
            ]}
            open={mobileDropdown === "lang"}
            toggle={() =>
              setMobileDropdown((p) => (p === "lang" ? null : "lang"))
            }
            animateAccordion={(ref, open) => {
              if (!ref) return;
              if (open) {
                gsap.fromTo(
                  ref,
                  { height: 0, opacity: 0 },
                  {
                    height: "auto",
                    opacity: 1,
                    duration: 0.34,
                    ease: "power2.out",
                  }
                );
                gsap.fromTo(
                  ref.querySelectorAll("button"),
                  { y: 6, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    stagger: 0.06,
                    duration: 0.28,
                    ease: "power2.out",
                  }
                );
              } else {
                gsap.to(ref, {
                  height: 0,
                  opacity: 0,
                  duration: 0.28,
                  ease: "power2.in",
                });
              }
            }}
            isLang
          />

          <Link
            href="/demo"
            className="inline-block mt-[6vw] px-[4vw] py-[1.2vw] rounded-full border text-[4.2vw] text-center"
            style={{ 
              borderColor: "#7b46ff", 
              color: "#7b46ff",
            }}
          >
            Try demo
          </Link>
        </nav>

      </div>
            <button
              className="md:hidden! fixed w-[7vw] h-[7vw] flex items-center justify-center bg-white rounded-full"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              style={{
                top: "1.3vw",
                right: isRTL ? "auto" : "3vw",
                left: isRTL ? "3vw" : "auto",
                zIndex: 10000,
              }}
            >
              <svg width="7vw" height="7vw" viewBox="0 0 24 24" fill="currentColor">
                <rect ref={burgerTop} x="3" y="6" width="18" height="2" rx="1" />
                <rect ref={burgerMid} x="11" y="11" width="10" height="2" rx="1" />
                <rect ref={burgerBot} x="15" y="16" width="6" height="2" rx="1" />
              </svg>
            </button>
    </>
  );
}

const DesktopMega = forwardRef(function DesktopMega(
  { label, isRTL, open, onClick, items },
  ref
) {
  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        className="flex items-center gap-[0.6vw] text-[1.05vw]"
      >
        {label}
        <ChevronDown
          className="w-[1vw] h-[1vw]"
          style={{
            transition: "0.25s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <div
        ref={ref}
        className="absolute bg-white shadow-xl rounded-xl p-[1.4vw]"
        style={{
          display: "none",
          top: "3vw",
          minWidth: "40vw",
          left: isRTL ? "auto" : 0,
          right: isRTL ? 0 : "auto",
          zIndex: 2000,
        }}
      >
        <div className="grid grid-cols-12 gap-[1.2vw]">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`${item.span} block p-[1vw] rounded-lg hover:bg-gray-50 gw-dropdown-item`}
            >
              <div className="flex gap-[1vw]">
                <div
                  className="w-[3vw] h-[3vw] flex items-center justify-center rounded-[0.7vw] bg-[#f2f2ff] text-[2.3vw]"
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-[1.05vw] font-semibold">
                    {item.title}
                  </div>
                  <div className="text-[0.9vw] text-gray-600">
                    {item.desc}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});

function MobileAccordion({
  title,
  items,
  open,
  toggle,
  animateAccordion,
  isLang = false,
  isActive = false,
}) {
  const contentRef = useRef(null);

  useEffect(() => {
    animateAccordion?.(contentRef.current, open);
  }, [open, animateAccordion]);

  return (
    <div>
      <button
        data-mobile-accordion-header
        onClick={toggle}
        className="w-full flex justify-between text-[5vw]"
        style={{
          color: isActive ? "#7b46ff" : "inherit",
          fontWeight: isActive ? 700 : "inherit",
        }}
      >
        {title}
        <ChevronDown
          className="w-[5vw] h-[5vw]"
          style={{
            transition: "0.25s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <div ref={contentRef} data-mobile-accordion-content className="h-0 overflow-hidden opacity-0">
        <div className="mt-[3vw] ml-[4vw] flex flex-col gap-[4vw]">
          {items.map((it) =>
            isLang ? (
              <button key={it.key} onClick={it.action} className="text-[4.2vw]">
                {it.label}
              </button>
            ) : (
              <Link key={it.id} href={it.href} className="text-[4.2vw]">
                {it.title}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
