import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'What is a TikTok video downloader?',
      answer: 'A TikTok video downloader is an online utility that allows creators and users to retrieve public, permitted videos from TikTok links and download available media formats directly to their local device for offline viewing or editing.',
    },
    {
      question: 'How do I download a TikTok video?',
      answer: 'Simply copy the video link from TikTok (e.g., tap "Share" > "Copy link"), paste it into the QuickTok search input at the top of the page, and click Download. Once processed, select your preferred video or audio format.',
    },
    {
      question: "Why isn't my TikTok URL working?",
      answer: "Common reasons include: the video might be set to private or deleted by its creator, the link might be a user profile link rather than a video link, or regional access limitations might apply. Make sure your link matches one of our supported formats such as tiktok.com/@user/video/id, vm.tiktok.com, or vt.tiktok.com.",
    },
    {
      question: 'Can I download private TikTok videos?',
      answer: 'No. QuickTok strictly respects privacy settings, authentication requirements, and access controls. We cannot and do not bypass paywalls, private account locks, or DRM restrictions.',
    },
    {
      question: 'Which formats are supported?',
      answer: 'Depending on availability from the underlying media stream, QuickTok supports high-definition MP4 video (without watermarks when supplied by the stream) as well as MP3 audio streams when separated audio tracks are present.',
    },
    {
      question: 'Why is a download unavailable?',
      answer: 'Downloads can be temporarily unavailable if the video creator has restricted distribution, if the video has been taken down, or if the underlying media streaming provider is undergoing maintenance or reached temporary rate limits.',
    },
    {
      question: 'Does the website save my videos?',
      answer: 'No. QuickTok does not permanently store user videos on its servers. All media is temporarily buffered and streamed directly from upstream to your browser session. Once your download is complete, nothing is retained on our disks.',
    },
    {
      question: 'Can I use the downloader on Android?',
      answer: 'Yes! QuickTok is built with a responsive mobile-first architecture. On Android, open Google Chrome or your default browser, paste the link, and downloaded files will automatically appear in your "Downloads" folder and Gallery.',
    },
    {
      question: 'Can I use it on iPhone?',
      answer: 'Yes! On iOS (iPhone or iPad running iOS 13+), open Safari, paste the TikTok link, and tap download. Safari will prompt you to save the file into your "Files" app or camera roll.',
    },
    {
      question: 'Is downloading TikTok content legal?',
      answer: 'Downloading video content is generally permitted for personal use, provided you own the content or have express permission from the copyright owner. You should never redistribute, monetize, or re-upload content that does not belong to you without appropriate licensing or authorization.',
    },
  ];

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="text-center">
        <span className="text-[10px] font-bold tracking-wider text-rose-500 uppercase dark:text-rose-400">
          Got Questions?
        </span>
        <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-1 max-w-xl text-[11px] text-slate-600 sm:text-xs dark:text-[#b8bec9]">
          Everything you need to know about QuickTok and supported video processing.
        </p>
      </div>

      <div className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-[#15181d]">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={faq.question} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-50 sm:p-6 dark:hover:bg-[#101217]"
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

              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm leading-relaxed text-slate-600 dark:text-[#b8bec9]">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
