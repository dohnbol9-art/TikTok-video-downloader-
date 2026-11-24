import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Globe,
  Sun,
  Moon,
  BookOpen,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  LandingPageData,
  ENGLISH_GUIDE_LINKS,
  INTL_LINKS,
} from '../seo/landingPages';
import { Footer } from './Footer';
import { LegalModal } from './LegalModal';

interface LandingPageViewProps {
  page: LandingPageData;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ page }) => {
  const { theme, toggleTheme } = useTheme();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  useEffect(() => {
    document.documentElement.lang = page.lang;
    document.documentElement.dir = page.dir;
    return () => {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    };
  }, [page.lang, page.dir]);

  return (
    <div
      dir={page.dir}
      className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b0d10] dark:text-white flex flex-col font-sans"
    >
      {/* Matching QuickTok Top Bar */}
      <header className="sticky top-0 z-50 w-full glass">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 shadow-sm shadow-rose-500/20 transition-transform group-hover:scale-105">
              <svg
                className="h-4 w-4 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 2L3 14h7v8l11-12h-8l0-8z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Quick<span className="text-rose-500">Tok</span>
            </span>
          </a>

          <div className="flex items-center gap-2.5">
            <a
              href="/#downloader"
              className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-rose-700"
            >
              <span>{page.ctaLabel}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-all hover:bg-slate-100 dark:border-[#252a33] dark:text-[#b8bec9] dark:hover:bg-[#15181d]"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Breadcrumb + Hero */}
        <section className="mx-auto max-w-4xl px-4 pt-6 pb-6 sm:px-6 sm:pt-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"
          >
            <a href="/" className="font-medium hover:text-rose-500">
              {page.homeLabel}
            </a>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate font-semibold text-slate-700 dark:text-slate-200">
              {page.h1}
            </span>
          </nav>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-[#15181d]">
            <div className="text-[10px] font-bold tracking-wider text-rose-500 uppercase dark:text-rose-400">
              {page.kicker}
            </div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
              {page.h1}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-[#b8bec9]">
              {page.intro}
            </p>

            {/* Primary CTA Connecting Directly to Existing Downloader */}
            <div className="mt-6 flex flex-col gap-3 rounded-xl border border-rose-200/80 bg-rose-50/70 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-rose-900/50 dark:bg-rose-950/30">
              <p className="text-xs text-slate-700 sm:text-sm dark:text-slate-200">
                {page.ctaSubtext}
              </p>
              <a
                href="/#downloader"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-rose-600 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-rose-500/20 transition-all hover:brightness-110 sm:text-sm"
              >
                <span>{page.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Step-by-step Guide */}
        <section className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            {page.stepsHeading}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {page.steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#15181d]"
              >
                <span className="font-mono text-2xl font-extrabold text-rose-500">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-[#b8bec9]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Content Sections */}
        <section className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6">
          {page.sections.map((section) => (
            <article
              key={section.heading}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#15181d]"
            >
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-[#b8bec9]">
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 text-xs text-slate-700 sm:text-sm dark:text-[#b8bec9]">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>

        {/* Genuine FAQs */}
        <section className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            {page.faqHeading}
          </h2>
          <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-[#15181d]">
            {page.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={faq.question} className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-[#101217]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-rose-500' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={
                      isOpen
                        ? 'px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-[#b8bec9]'
                        : 'hidden'
                    }
                    aria-hidden={!isOpen}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contextual Internal Links */}
        <section className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#15181d]">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
              {page.relatedHeading}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {page.relatedLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 transition-colors hover:border-rose-400 dark:border-slate-800 dark:bg-[#0b0d10]"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
                      {link.label}
                    </div>
                    {link.description && (
                      <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                        {link.description}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-rose-500" />
                </a>
              ))}
            </div>

            {/* All Guides & Languages Strip */}
            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-xs dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
                  <BookOpen className="h-3.5 w-3.5 text-rose-500" />
                  Guides:
                </span>
                {ENGLISH_GUIDE_LINKS.map((g) => (
                  <a
                    key={g.href}
                    href={g.href}
                    className={`rounded-md px-2 py-1 transition-colors ${
                      g.href === page.slug
                        ? 'bg-rose-600 font-semibold text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-rose-500 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {g.label}
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
                  <Globe className="h-3.5 w-3.5 text-rose-500" />
                  Languages:
                </span>
                <a
                  href="/"
                  className="rounded-md bg-slate-100 px-2 py-1 text-slate-600 hover:text-rose-500 dark:bg-slate-800 dark:text-slate-300"
                >
                  English
                </a>
                {INTL_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`rounded-md px-2 py-1 transition-colors ${
                      l.href === page.slug
                        ? 'bg-rose-600 font-semibold text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-rose-500 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenLegal={(type) => setLegalModalType(type)} />

      <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
    </div>
  );
};
