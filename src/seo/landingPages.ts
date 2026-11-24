export interface SeoSectionBlock {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface SeoStep {
  title: string;
  description: string;
}

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface InternalLinkItem {
  label: string;
  href: string;
  description?: string;
}

export interface LandingPageData {
  slug: string; // e.g. '/tiktok-downloader-without-watermark' or '/es/'
  outputPath: string; // relative to dist/, e.g. 'tiktok-downloader-without-watermark.html' or 'es/index.html'
  category: 'guide' | 'intl';
  lang: string;
  dir: 'ltr' | 'rtl';
  ogLocale: string;
  title: string;
  description: string;
  canonicalUrl: string;
  kicker: string;
  h1: string;
  intro: string;
  ctaLabel: string;
  ctaSubtext: string;
  homeLabel: string;
  stepsHeading: string;
  steps: SeoStep[];
  sections: SeoSectionBlock[];
  faqHeading: string;
  faqs: SeoFaq[];
  relatedHeading: string;
  relatedLinks: InternalLinkItem[];
  schemaType: 'WebPage' | 'Article';
}

export const SITE_ORIGIN = 'https://www.quicktok.online';

export const HREFLANG_LOCALES: Array<{ code: string; href: string; label: string }> = [
  { code: 'en', href: `${SITE_ORIGIN}/`, label: 'English' },
  { code: 'es', href: `${SITE_ORIGIN}/es/`, label: 'Español' },
  { code: 'pt', href: `${SITE_ORIGIN}/pt/`, label: 'Português' },
  { code: 'fr', href: `${SITE_ORIGIN}/fr/`, label: 'Français' },
  { code: 'de', href: `${SITE_ORIGIN}/de/`, label: 'Deutsch' },
  { code: 'ar', href: `${SITE_ORIGIN}/ar/`, label: 'العربية' },
  { code: 'id', href: `${SITE_ORIGIN}/id/`, label: 'Bahasa Indonesia' },
];

export const ENGLISH_GUIDE_LINKS: InternalLinkItem[] = [
  { label: 'TikTok Downloader Without Watermark', href: '/tiktok-downloader-without-watermark' },
  { label: 'TikTok Video Downloader HD', href: '/tiktok-video-downloader-hd' },
  { label: 'TikTok to MP3 Converter', href: '/tiktok-to-mp3' },
  { label: 'Download TikTok Videos on iPhone', href: '/download-tiktok-videos-iphone' },
  { label: 'Download TikTok Videos on Android', href: '/download-tiktok-videos-android' },
  { label: 'How to Download TikTok Videos', href: '/how-to-download-tiktok-videos' },
  { label: 'TikTok MP4 Downloader', href: '/tiktok-mp4-downloader' },
];

export const INTL_LINKS: InternalLinkItem[] = [
  { label: 'Español', href: '/es/' },
  { label: 'Português', href: '/pt/' },
  { label: 'Français', href: '/fr/' },
  { label: 'Deutsch', href: '/de/' },
  { label: 'العربية', href: '/ar/' },
  { label: 'Bahasa Indonesia', href: '/id/' },
];

export const LANDING_PAGES: LandingPageData[] = [
  // =========================================================================
  // TASK 1: 7 DEDICATED ENGLISH SEO LANDING PAGES
  // =========================================================================
  {
    slug: '/tiktok-downloader-without-watermark',
    outputPath: 'tiktok-downloader-without-watermark.html',
    category: 'guide',
    lang: 'en',
    dir: 'ltr',
    ogLocale: 'en_US',
    title: 'TikTok Downloader Without Watermark Free HD - QuickTok',
    description:
      'Download TikTok videos without watermark in crisp MP4 quality using QuickTok. Paste any public TikTok link to save clean videos online on phone or desktop.',
    canonicalUrl: `${SITE_ORIGIN}/tiktok-downloader-without-watermark`,
    kicker: 'Clean Watermark-Free Saves',
    h1: 'TikTok Downloader Without Watermark',
    intro:
      'Save publicly accessible TikTok videos in clean MP4 format without the floating TikTok logo or creator username overlay. QuickTok works directly in your mobile or desktop browser with zero software installation.',
    ctaLabel: 'Open QuickTok Downloader',
    ctaSubtext: 'Paste your TikTok URL on the QuickTok tool to fetch watermark-free MP4 options.',
    homeLabel: 'Home',
    stepsHeading: 'How to Download a TikTok Video Without Watermark',
    steps: [
      {
        title: 'Copy the public TikTok link',
        description:
          'Open TikTok on your phone or browser, tap Share on a public video you have permission to save, and choose Copy Link.',
      },
      {
        title: 'Paste the URL into QuickTok',
        description:
          'Open the QuickTok downloader, paste the link (tiktok.com, vm.tiktok.com, or vt.tiktok.com), and click Download Now.',
      },
      {
        title: 'Select No Watermark MP4',
        description:
          'Choose the 1080p HD (No Watermark) or Standard Quality option when provided by the media stream to save the clean video.',
      },
    ],
    sections: [
      {
        heading: 'Why Use a Watermark-Free TikTok Video Downloader?',
        paragraphs: [
          'When you save a clip directly inside the TikTok mobile app, the platform overlays a bouncing logo and username across multiple corners of the frame. For creators archiving their own original edits, teachers preparing classroom references, or editors compiling permitted footage, those moving overlays obscure visual details and captions.',
          'QuickTok retrieves the clean upstream MP4 stream whenever it is available on public posts—without cropping the edges of the video or stretching the aspect ratio.',
        ],
        bullets: [
          'Preserves original aspect ratio and framing without artificial edge cropping',
          'Works with full desktop links and mobile short links (vm.tiktok.com, vt.tiktok.com)',
          'Supports single-video saves as well as multi-link Batch Mode processing',
          'Streams directly to your browser without permanently storing copies on QuickTok servers',
        ],
      },
      {
        heading: 'Supported Formats and Privacy Boundaries',
        paragraphs: [
          'QuickTok processes only publicly accessible TikTok URLs. Private accounts, friends-only posts, deleted clips, or videos restricted by creator download settings or DRM are not accessible.',
          'Once a public link is processed, you can save the clean MP4 video file or extract the original audio track as an MP3 file whenever a separated audio stream is available.',
        ],
      },
    ],
    faqHeading: 'Watermark-Free TikTok Download FAQs',
    faqs: [
      {
        question: 'Does QuickTok crop or blur the TikTok watermark?',
        answer:
          'No. QuickTok never blurs or crops your video. Instead, it requests the clean unwatermarked MP4 stream directly when supplied by the public media provider.',
      },
      {
        question: 'Can I remove a watermark from a video already saved in my camera roll?',
        answer:
          'QuickTok works from the original TikTok video link rather than editing an existing local file. Paste the public TikTok URL into QuickTok to fetch the clean MP4 stream.',
      },
      {
        question: 'Do I need to log in or install an extension?',
        answer:
          'No account registration, password, or browser extension is required. QuickTok runs directly in Chrome, Safari, Edge, and other modern browsers.',
      },
      {
        question: 'Can I download multiple watermark-free videos at once?',
        answer:
          'Yes. Switch to Batch Mode on the QuickTok downloader to queue multiple public TikTok URLs one per line.',
      },
    ],
    relatedHeading: 'Related TikTok Download Guides',
    relatedLinks: [
      { label: 'TikTok Video Downloader HD (1080p)', href: '/tiktok-video-downloader-hd', description: 'Save Full HD MP4 streams' },
      { label: 'TikTok MP4 Downloader', href: '/tiktok-mp4-downloader', description: 'Universal MP4 compatibility' },
      { label: 'Download on iPhone (Safari)', href: '/download-tiktok-videos-iphone', description: 'iOS Files & Photos guide' },
      { label: 'Download on Android (Chrome)', href: '/download-tiktok-videos-android', description: 'Save straight to Gallery' },
    ],
    schemaType: 'WebPage',
  },

  {
    slug: '/tiktok-video-downloader-hd',
    outputPath: 'tiktok-video-downloader-hd.html',
    category: 'guide',
    lang: 'en',
    dir: 'ltr',
    ogLocale: 'en_US',
    title: 'TikTok Video Downloader HD 1080p Online Free - QuickTok',
    description:
      'Save public TikTok videos in Full HD 1080p MP4 resolution with QuickTok. Fast browser-based TikTok HD video downloader with zero app installation required.',
    canonicalUrl: `${SITE_ORIGIN}/tiktok-video-downloader-hd`,
    kicker: 'High-Definition Media',
    h1: 'TikTok Video Downloader in Full HD 1080p',
    intro:
      'Preserve crisp detail, readable captions, and smooth motion when saving public TikTok videos. QuickTok prioritizes the highest-resolution 1080p HD MP4 stream offered by the source video.',
    ctaLabel: 'Download HD TikTok Video Now',
    ctaSubtext: 'Go straight to the QuickTok tool to check available HD 1080p streams.',
    homeLabel: 'Home',
    stepsHeading: 'How to Save TikTok Videos in HD Quality',
    steps: [
      {
        title: 'Copy the TikTok video URL',
        description:
          'Find the public TikTok post you want to archive, tap Share, and select Copy Link.',
      },
      {
        title: 'Process the link in QuickTok',
        description:
          'Paste the URL into the QuickTok downloader input and click Download Now to retrieve available stream qualities.',
      },
      {
        title: 'Pick 1080p HD (No Watermark)',
        description:
          'Click Download next to the 1080p HD option to stream the high-definition MP4 file directly to your device.',
      },
    ],
    sections: [
      {
        heading: 'HD 1080p vs. Standard Quality: What Determines Resolution?',
        paragraphs: [
          'The maximum downloadable resolution depends on how the creator originally uploaded and encoded the video on TikTok. When an original Full HD (1080p) stream is exposed by the upstream media server, QuickTok displays the 1080p HD option alongside a smaller Standard Quality MP4 option for slower connections.',
          'QuickTok streams the source MP4 directly to your browser without server-side re-encoding, so clarity and frame rate remain faithful to the upstream file.',
        ],
        bullets: [
          'Prioritizes 1080p HD MP4 streams whenever available from source media',
          'Includes a Standard Quality MP4 option when smaller file sizes are preferred',
          'Shows estimated file size before you start downloading',
          'Real-time transfer progress and speed feedback during browser streaming',
        ],
      },
      {
        heading: 'HD Playback on Mobile and Desktop',
        paragraphs: [
          'Downloaded MP4 files use standard H.264/AAC compatibility that opens smoothly in Apple Photos, Android Gallery, Windows Media Player, QuickTime, VLC, and major video editing tools.',
        ],
      },
    ],
    faqHeading: 'HD TikTok Video Downloader FAQs',
    faqs: [
      {
        question: 'Why do some TikTok videos not have a 1080p HD file?',
        answer:
          'If the original creator uploaded or recorded the clip at 720p or lower, only the highest available resolution from TikTok can be retrieved. QuickTok does not artificially upscale low-resolution videos.',
      },
      {
        question: 'Is there an extra fee for HD 1080p downloads?',
        answer:
          'No. Both 1080p HD and Standard Quality options are 100% free on QuickTok with no account or subscription needed.',
      },
      {
        question: 'Does HD downloading work on mobile browsers?',
        answer:
          'Yes. Both Android (Chrome, Samsung Internet) and iPhone/iPad (Safari on iOS 13+) support Full HD MP4 downloads through QuickTok.',
      },
      {
        question: 'Can I batch process multiple HD TikTok links?',
        answer:
          'Yes. Switch to Batch Mode in the QuickTok downloader to queue multiple URLs and trigger HD downloads conveniently.',
      },
    ],
    relatedHeading: 'Explore More QuickTok Guides',
    relatedLinks: [
      { label: 'TikTok Downloader Without Watermark', href: '/tiktok-downloader-without-watermark' },
      { label: 'TikTok MP4 Downloader', href: '/tiktok-mp4-downloader' },
      { label: 'TikTok to MP3 Converter', href: '/tiktok-to-mp3' },
      { label: 'How to Download TikTok Videos', href: '/how-to-download-tiktok-videos' },
    ],
    schemaType: 'WebPage',
  },

  {
    slug: '/tiktok-to-mp3',
    outputPath: 'tiktok-to-mp3.html',
    category: 'guide',
    lang: 'en',
    dir: 'ltr',
    ogLocale: 'en_US',
    title: 'TikTok to MP3 Converter & Audio Downloader - QuickTok',
    description:
      'Extract and download original audio from public TikTok videos as MP3 files online. Fast, free TikTok MP3 downloader for mobile, iPhone, Android, and PC.',
    canonicalUrl: `${SITE_ORIGIN}/tiktok-to-mp3`,
    kicker: 'Audio & Music Extraction',
    h1: 'TikTok to MP3 Audio Downloader',
    intro:
      'Save original sounds, voiceovers, and background audio tracks from public TikTok videos in portable MP3 format—directly in your browser without desktop converter software.',
    ctaLabel: 'Convert TikTok to MP3 Now',
    ctaSubtext: 'Paste any public TikTok video link into QuickTok to access the MP3 audio option.',
    homeLabel: 'Home',
    stepsHeading: 'How to Convert a TikTok Video to MP3',
    steps: [
      {
        title: 'Copy the TikTok video link',
        description:
          'Open the TikTok video containing the audio or sound you want to save, tap Share, and tap Copy Link.',
      },
      {
        title: 'Paste the link into QuickTok',
        description:
          'Insert the link on QuickTok and click Download Now to inspect available video and audio streams.',
      },
      {
        title: 'Download Original Audio (MP3)',
        description:
          'Select the Original Audio (HQ) MP3 card and click Download to save the audio file straight to your device.',
      },
    ],
    sections: [
      {
        heading: 'Fast Browser-Based TikTok MP3 Extraction',
        paragraphs: [
          'When a TikTok post includes an exposed audio stream, QuickTok lists an Original Audio (HQ) MP3 option right below the MP4 video formats. You do not need to download a full video file first and convert it manually in another app.',
          'MP3 files work universally across Android music players, Apple Files, desktop audio editors, podcast tools, and car audio systems.',
        ],
        bullets: [
          'Direct MP3 audio stream output when separated audio is provided by the source',
          'Clean `.mp3` filename including creator handle and video ID',
          'Works on iPhone Safari, Android Chrome, Windows, macOS, and Linux',
          'Zero server-side permanent audio file storage',
        ],
      },
      {
        heading: 'Respecting Creator & Music Copyright',
        paragraphs: [
          'Only download TikTok audio for personal listening, offline reference of your own uploads, or projects where you hold explicit permission or licensing rights from the audio owner.',
        ],
      },
    ],
    faqHeading: 'TikTok to MP3 FAQs',
    faqs: [
      {
        question: 'Where do downloaded TikTok MP3 files go on my phone?',
        answer:
          'On Android, MP3 files are saved to your Downloads folder and appear in your Files or Music app. On iPhone and iPad, Safari saves MP3 files to the Downloads folder inside the Apple Files app.',
      },
      {
        question: 'Why is the MP3 option sometimes unavailable for a video?',
        answer:
          'QuickTok displays the MP3 download button whenever the upstream stream supplies a dedicated audio track. If a creator disabled audio reuse or the upstream source lacks a separate music URL, only available video streams are shown.',
      },
      {
        question: 'Can I also download the video as MP4 from the same link?',
        answer:
          'Yes. QuickTok displays both the MP4 video options and the MP3 audio option together after processing a single link.',
      },
      {
        question: 'Is QuickTok TikTok to MP3 free to use?',
        answer:
          'Yes. Extracting available MP3 audio streams on QuickTok is free with no login or daily limit.',
      },
    ],
    relatedHeading: 'More QuickTok Tools & Guides',
    relatedLinks: [
      { label: 'TikTok MP4 Downloader', href: '/tiktok-mp4-downloader' },
      { label: 'TikTok Downloader Without Watermark', href: '/tiktok-downloader-without-watermark' },
      { label: 'Download TikTok on iPhone', href: '/download-tiktok-videos-iphone' },
      { label: 'Download TikTok on Android', href: '/download-tiktok-videos-android' },
    ],
    schemaType: 'WebPage',
  },

  {
    slug: '/download-tiktok-videos-iphone',
    outputPath: 'download-tiktok-videos-iphone.html',
    category: 'guide',
    lang: 'en',
    dir: 'ltr',
    ogLocale: 'en_US',
    title: 'Download TikTok Videos on iPhone (iOS Safari) - QuickTok',
    description:
      'Learn how to download TikTok videos on iPhone and iPad using Safari without watermark. Save MP4 files to iOS Files or Photos with QuickTok free online.',
    canonicalUrl: `${SITE_ORIGIN}/download-tiktok-videos-iphone`,
    kicker: 'iOS & iPadOS Guide',
    h1: 'Download TikTok Videos on iPhone & iPad',
    intro:
      'Save public TikTok videos directly on your iPhone or iPad using Safari—no third-party App Store downloads or Shortcuts configuration required.',
    ctaLabel: 'Open QuickTok in Safari',
    ctaSubtext: 'Works natively on iOS 13 and newer with Apple Files and Photos support.',
    homeLabel: 'Home',
    stepsHeading: 'How to Save TikTok Videos on iPhone (iOS 13+)',
    steps: [
      {
        title: 'Copy the video link in the TikTok app',
        description:
          'Tap the Share icon on the TikTok video and tap Copy Link.',
      },
      {
        title: 'Open QuickTok in Safari and paste the link',
        description:
          'Visit www.quicktok.online in Safari, tap the URL box (or the Paste button), and tap Download Now.',
      },
      {
        title: 'Save to Files or Phone Photos Gallery',
        description:
          'Tap Download on 1080p HD (No Watermark) and confirm Download in Safari, or tap Save to Phone Gallery to open the iOS Share Sheet and select Save Video.',
      },
    ],
    sections: [
      {
        heading: 'Two Ways to Save Into Your iPhone Photos Library',
        paragraphs: [
          'Apple handles browser downloads slightly differently from Android. When you tap Download in Safari, iOS saves the `.mp4` file inside the Downloads folder of the built-in Files app. You can also use QuickTok’s "Save to Phone Gallery" button, which uses the native iOS Share Sheet when supported.',
        ],
        bullets: [
          'Method 1 (Native Share Sheet): Tap "Save to Phone Gallery" on QuickTok, then tap "Save Video" to store directly in Apple Photos.',
          'Method 2 (Safari Downloads): Tap "Download" in the Safari prompt, tap the blue download arrow in Safari’s address bar, open the video, tap Share, and choose "Save Video".',
        ],
      },
      {
        heading: 'Tips for Smooth iPhone & iPad Downloads',
        paragraphs: [
          'Use Apple Safari rather than an in-app browser (such as tapping a link inside another social app) so iOS download prompts and Share Sheet file saving work reliably.',
          'If Safari opens the video in a player tab instead of downloading, tap the Share icon at the bottom of Safari and choose "Save to Files".',
        ],
      },
    ],
    faqHeading: 'iPhone & iPad TikTok Download FAQs',
    faqs: [
      {
        question: 'Do I need an iOS Shortcut or App Store app to use QuickTok?',
        answer:
          'No. On iPhone and iPad running iOS 13 or newer, Safari includes a built-in download manager that works directly with QuickTok.',
      },
      {
        question: 'Where do Safari downloads go on iPhone?',
        answer:
          'By default, Safari stores downloaded MP4 and MP3 files inside the Files app under iCloud Drive > Downloads (or On My iPhone > Downloads).',
      },
      {
        question: 'How do I move a downloaded TikTok video to Camera Roll?',
        answer:
          'Open the video in the Files app (or use QuickTok’s Save to Phone Gallery button), tap the Share icon in the bottom corner, and select Save Video.',
      },
      {
        question: 'Can I save TikTok MP3 audio on iPhone?',
        answer:
          'Yes. Tap Download on the MP3 option in Safari to save the audio track into your iPhone Files app.',
      },
    ],
    relatedHeading: 'Other Device & Format Guides',
    relatedLinks: [
      { label: 'Download TikTok Videos on Android', href: '/download-tiktok-videos-android' },
      { label: 'How to Download TikTok Videos', href: '/how-to-download-tiktok-videos' },
      { label: 'TikTok Downloader Without Watermark', href: '/tiktok-downloader-without-watermark' },
      { label: 'TikTok to MP3 Converter', href: '/tiktok-to-mp3' },
    ],
    schemaType: 'Article',
  },

  {
    slug: '/download-tiktok-videos-android',
    outputPath: 'download-tiktok-videos-android.html',
    category: 'guide',
    lang: 'en',
    dir: 'ltr',
    ogLocale: 'en_US',
    title: 'Download TikTok Videos on Android Free HD - QuickTok',
    description:
      'Save TikTok videos without watermark directly to your Android phone Gallery in MP4 or MP3. Works in Chrome and Samsung Internet with no APK required.',
    canonicalUrl: `${SITE_ORIGIN}/download-tiktok-videos-android`,
    kicker: 'Android Browser Guide',
    h1: 'Download TikTok Videos on Android',
    intro:
      'Save public TikTok videos and MP3 audio straight to your Android phone’s Downloads folder and Gallery using Chrome, Samsung Internet, or Firefox—without installing any APK.',
    ctaLabel: 'Download on Android Now',
    ctaSubtext: 'Mobile-optimized buttons and fast MP4 streaming built for Android devices.',
    homeLabel: 'Home',
    stepsHeading: 'How to Download TikTok Videos on Android',
    steps: [
      {
        title: 'Copy the TikTok video link',
        description:
          'Open the TikTok Android app, tap Share on the video you want to save, and tap Copy Link.',
      },
      {
        title: 'Open QuickTok in Chrome or Samsung Internet',
        description:
          'Go to www.quicktok.online, tap Paste (or long-press the input box and tap Paste), then tap Download Now.',
      },
      {
        title: 'Save MP4 or MP3 to your phone',
        description:
          'Tap Download on 1080p HD (No Watermark) or Original Audio (MP3). The file saves straight into your Android Downloads folder and Gallery.',
      },
    ],
    sections: [
      {
        heading: 'Why Browser Downloading Beats Unverified Android APKs',
        paragraphs: [
          'Installing unknown APK downloader apps can expose your Android phone to unnecessary permissions, intrusive background services, or malware. QuickTok operates 100% inside your standard Android browser with zero permissions beyond standard file saving.',
          'Once a file finishes downloading, Android media indexing automatically displays `.mp4` videos inside your Downloads album in Google Photos, Samsung Gallery, or your device File Manager.',
        ],
        bullets: [
          'Compatible with Google Chrome, Samsung Internet, Firefox, Brave, and Edge on Android',
          'Supports both Single Link and multi-URL Batch Mode',
          'Includes 1-tap "Save to Phone Gallery" sharing integration on supported Android browsers',
          'Local browser Download History lets you revisit recent downloads without server tracking',
        ],
      },
      {
        heading: 'Troubleshooting Android Downloads',
        paragraphs: [
          'If your browser asks for storage permission the first time you save a file, tap Allow so Chrome can write the `.mp4` or `.mp3` into `/Downloads/`.',
          'If a pasted link fails validation, verify that you copied an individual video link (`vm.tiktok.com/...` or `tiktok.com/@user/video/...`) rather than a creator profile URL.',
        ],
      },
    ],
    faqHeading: 'Android TikTok Downloader FAQs',
    faqs: [
      {
        question: 'Where are downloaded TikTok videos stored on Android?',
        answer:
          'Downloaded MP4 videos are stored in your device internal storage under the Downloads folder and normally appear automatically inside Samsung Gallery or Google Photos.',
      },
      {
        question: 'Do I need to install an Android app to use QuickTok?',
        answer:
          'No app or APK installation is required. QuickTok works directly inside Chrome, Samsung Internet, and other mobile browsers.',
      },
      {
        question: 'Can I download TikTok sounds as MP3 on Android?',
        answer:
          'Yes. When an audio stream is available for the video, QuickTok provides an Original Audio (HQ) MP3 button that saves straight to your Downloads folder.',
      },
      {
        question: 'Why did my Paste button show a Ctrl+V / long-press message?',
        answer:
          'Some Android browsers block automatic clipboard reading until you grant permission. Simply tap inside the URL box, long-press, and choose Paste.',
      },
    ],
    relatedHeading: 'More QuickTok Tutorials',
    relatedLinks: [
      { label: 'Download TikTok Videos on iPhone', href: '/download-tiktok-videos-iphone' },
      { label: 'TikTok Downloader Without Watermark', href: '/tiktok-downloader-without-watermark' },
      { label: 'TikTok Video Downloader HD', href: '/tiktok-video-downloader-hd' },
      { label: 'TikTok to MP3 Converter', href: '/tiktok-to-mp3' },
    ],
    schemaType: 'Article',
  },

  {
    slug: '/how-to-download-tiktok-videos',
    outputPath: 'how-to-download-tiktok-videos.html',
    category: 'guide',
    lang: 'en',
    dir: 'ltr',
    ogLocale: 'en_US',
    title: 'How to Download TikTok Videos Online Step-by-Step - QuickTok',
    description:
      'Complete guide on how to download public TikTok videos in MP4 without watermark or MP3 audio on any device. Fast 3-step instructions and error fixes.',
    canonicalUrl: `${SITE_ORIGIN}/how-to-download-tiktok-videos`,
    kicker: 'Complete User Manual',
    h1: 'How to Download TikTok Videos Online',
    intro:
      'A clear, step-by-step guide to saving publicly available TikTok videos and audio using QuickTok on desktop, iPhone, and Android—including Batch Mode and error troubleshooting.',
    ctaLabel: 'Start Downloading on QuickTok',
    ctaSubtext: 'Single link and Batch Mode available free on the QuickTok homepage.',
    homeLabel: 'Home',
    stepsHeading: 'Three Simple Steps to Download Any Public TikTok Video',
    steps: [
      {
        title: 'Locate and copy a supported TikTok link',
        description:
          'Open TikTok, choose a public video you are authorized to save, click Share, and copy the video URL (`tiktok.com/@user/video/...`, `vm.tiktok.com/...`, or `vt.tiktok.com/...`).',
      },
      {
        title: 'Choose Single Link or Batch Mode on QuickTok',
        description:
          'Paste a single URL or switch to Batch Mode to enter multiple TikTok links (one per line), then click Download Now or Process Links.',
      },
      {
        title: 'Select your format and save',
        description:
          'Pick 1080p HD (No Watermark), Standard Quality MP4, or Original Audio MP3. Your browser streams the file directly to your device.',
      },
    ],
    sections: [
      {
        heading: 'Using Batch Mode for Multiple TikTok Videos',
        paragraphs: [
          'If you need to archive several permitted clips at once, switch from Single Link to Batch Mode (Multi) at the top of the QuickTok downloader card. Paste one TikTok link per line and click Process Links.',
          'QuickTok processes links in controlled batches, lets you select or deselect individual results, and offers a One-Click Download queue with brief pauses so your browser does not block multiple file prompts.',
        ],
      },
      {
        heading: 'Common Error Messages and How to Fix Them',
        paragraphs: [
          'If a link fails to process, check the most frequent causes below before retrying:',
        ],
        bullets: [
          'Private or deleted video: QuickTok only accesses public posts and cannot bypass private account permissions or deleted uploads.',
          'Profile or hashtag link pasted: Ensure the URL points to a specific video post rather than a creator profile page.',
          'Regional or provider rate limits: If an upstream media provider experiences temporary load, wait a moment and retry.',
        ],
      },
    ],
    faqHeading: 'Step-by-Step Downloading FAQs',
    faqs: [
      {
        question: 'Which TikTok URL formats does QuickTok support?',
        answer:
          'QuickTok accepts standard desktop links (www.tiktok.com/@username/video/id) as well as short mobile share URLs such as vm.tiktok.com and vt.tiktok.com.',
      },
      {
        question: 'Is there a limit on how many videos I can download?',
        answer:
          'QuickTok does not impose a daily subscription cap or paywall, though standard network rate limits help keep the service stable for all visitors.',
      },
      {
        question: 'Where is my Download History stored?',
        answer:
          'Your Download History is stored strictly inside your own browser localStorage and is never synced or uploaded to QuickTok servers. You can clear it anytime.',
      },
      {
        question: 'Is downloading TikTok videos legal?',
        answer:
          'Downloading is intended for personal archiving of your own videos or content for which you have express permission from the copyright holder. Always respect creator rights and platform rules.',
      },
    ],
    relatedHeading: 'Dedicated QuickTok Guides',
    relatedLinks: [
      { label: 'TikTok Downloader Without Watermark', href: '/tiktok-downloader-without-watermark' },
      { label: 'TikTok Video Downloader HD', href: '/tiktok-video-downloader-hd' },
      { label: 'TikTok MP4 Downloader', href: '/tiktok-mp4-downloader' },
      { label: 'TikTok to MP3 Converter', href: '/tiktok-to-mp3' },
    ],
    schemaType: 'Article',
  },

  {
    slug: '/tiktok-mp4-downloader',
    outputPath: 'tiktok-mp4-downloader.html',
    category: 'guide',
    lang: 'en',
    dir: 'ltr',
    ogLocale: 'en_US',
    title: 'TikTok MP4 Downloader Free Online Converter - QuickTok',
    description:
      'Convert and download TikTok videos to standard MP4 format without watermark. Compatible with Windows, macOS, Android, iPhone, and video editors.',
    canonicalUrl: `${SITE_ORIGIN}/tiktok-mp4-downloader`,
    kicker: 'Universal Video Format',
    h1: 'TikTok MP4 Video Downloader',
    intro:
      'Save public TikTok videos directly as standard `.mp4` video files for universal playback across phones, computers, smart TVs, and editing software.',
    ctaLabel: 'Download TikTok MP4 Now',
    ctaSubtext: 'Supports both 1080p HD MP4 and lightweight Standard Quality MP4 streams.',
    homeLabel: 'Home',
    stepsHeading: 'How to Save TikTok Videos as MP4',
    steps: [
      {
        title: 'Copy the TikTok link',
        description:
          'Copy the URL of any public TikTok video from the app or web browser.',
      },
      {
        title: 'Paste it in QuickTok',
        description:
          'Paste the URL into the QuickTok downloader and click Download Now.',
      },
      {
        title: 'Choose HD or Standard MP4',
        description:
          'Select 1080p HD (No Watermark) MP4 for maximum clarity or Standard Quality MP4 for faster saving and smaller file size.',
      },
    ],
    sections: [
      {
        heading: 'Why MP4 Is the Best Format for Saved TikTok Videos',
        paragraphs: [
          'MP4 (MPEG-4 Part 14) is supported natively by iOS Photos, Android Gallery, macOS QuickTime, Windows Media Player, and every modern web browser. Unlike proprietary containers, MP4 files require no codec packs or conversion tools before playing or editing.',
          'QuickTok fetches direct MP4 streams and assigns a clean `.mp4` filename containing the creator handle and video ID so organized archives are effortless.',
        ],
        bullets: [
          'Standard `.mp4` MIME-validated downloads (guards against broken HTML responses)',
          'Choice between 1080p HD and Standard Quality MP4 options',
          'Real-time transfer progress percentage and MB/s speed indicator',
          'Works seamlessly across Windows, macOS, Linux, iOS, and Android',
        ],
      },
    ],
    faqHeading: 'TikTok MP4 Downloader FAQs',
    faqs: [
      {
        question: 'Are QuickTok downloads true MP4 video files?',
        answer:
          'Yes. QuickTok validates media MIME types and binary stream sizes before saving files with a `.mp4` extension.',
      },
      {
        question: 'Can I choose between HD MP4 and smaller MP4 sizes?',
        answer:
          'When both formats are provided by the upstream video source, QuickTok displays both 1080p HD and Standard Quality MP4 cards along with file sizes.',
      },
      {
        question: 'Will QuickTok MP4 files open in editing apps?',
        answer:
          'Yes. Standard MP4 files open directly in CapCut, Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve, and iMovie.',
      },
      {
        question: 'Can I extract just MP3 audio instead of an MP4 video?',
        answer:
          'Yes. Visit our TikTok to MP3 option or select Original Audio (HQ) MP3 from the download results card.',
      },
    ],
    relatedHeading: 'Related Resources',
    relatedLinks: [
      { label: 'TikTok Video Downloader HD', href: '/tiktok-video-downloader-hd' },
      { label: 'TikTok Downloader Without Watermark', href: '/tiktok-downloader-without-watermark' },
      { label: 'TikTok to MP3 Converter', href: '/tiktok-to-mp3' },
      { label: 'How to Download TikTok Videos', href: '/how-to-download-tiktok-videos' },
    ],
    schemaType: 'WebPage',
  },

  // =========================================================================
  // TASK 2: 6 TRANSLATED INTERNATIONAL SEO LANDING PAGES
  // =========================================================================
  {
    slug: '/es/',
    outputPath: 'es/index.html',
    category: 'intl',
    lang: 'es',
    dir: 'ltr',
    ogLocale: 'es_ES',
    title: 'Descargar Videos de TikTok Sin Marca de Agua - QuickTok',
    description:
      'Descargador de videos de TikTok gratis online. Guarda videos de TikTok sin marca de agua en MP4 Full HD o extrae audio MP3 rápido en Android, iPhone y PC.',
    canonicalUrl: `${SITE_ORIGIN}/es/`,
    kicker: 'Herramienta Gratuita Online',
    h1: 'Descargar Videos de TikTok Sin Marca de Agua',
    intro:
      'QuickTok es una herramienta web gratuita para descargar videos públicos de TikTok sin marca de agua en formato MP4 Full HD o guardar el audio original en MP3 directamente desde tu navegador en móvil o computadora.',
    ctaLabel: 'Ir al Descargador QuickTok',
    ctaSubtext: 'Pega el enlace de TikTok en la herramienta principal para descargar al instante.',
    homeLabel: 'Inicio',
    stepsHeading: 'Cómo Descargar Videos de TikTok en 3 Pasos',
    steps: [
      {
        title: 'Copia el enlace del video en TikTok',
        description:
          'Abre la aplicación o sitio web de TikTok, busca un video público que tengas permiso para guardar, pulsa Compartir y selecciona Copiar enlace.',
      },
      {
        title: 'Pega la URL en QuickTok',
        description:
          'Accede al descargador principal de QuickTok, pega el enlace (tiktok.com, vm.tiktok.com o vt.tiktok.com) y pulsa Descargar ahora.',
      },
      {
        title: 'Elige el formato MP4 o MP3',
        description:
          'Selecciona 1080p HD (Sin Marca de Agua), Calidad Estándar o Audio Original (MP3) para guardar el archivo en tu dispositivo.',
      },
    ],
    sections: [
      {
        heading: 'Características del Descargador QuickTok en Español',
        paragraphs: [
          'A diferencia de las aplicaciones que requieren instalaciones o cuentas, QuickTok funciona directamente en Chrome, Safari, Firefox y Edge. El sistema transmite el flujo multimedia en tiempo real sin almacenar copias de tus videos en nuestros servidores.',
        ],
        bullets: [
          'Videos en MP4 Full HD 1080p sin marca de agua ni logotipo de TikTok cuando está disponible',
          'Conversión directa a audio MP3 para guardar sonidos y música original',
          'Modo por lotes (Batch Mode) para procesar múltiples enlaces de TikTok a la vez',
          'Compatible con Android (Chrome, Samsung Internet), iPhone/iPad (Safari iOS 13+) y PC/Mac',
        ],
      },
      {
        heading: 'Dónde Se Guardan los Videos en Tu Dispositivo',
        paragraphs: [
          'En teléfonos Android y computadoras Windows o Mac, los archivos MP4 y MP3 se guardan automáticamente en la carpeta Descargas y aparecen en tu Galería. En iPhone e iPad, Safari guarda el archivo en la app Archivos o puedes usar el botón Guardar en la Galería.',
        ],
      },
    ],
    faqHeading: 'Preguntas Frecuentes sobre QuickTok',
    faqs: [
      {
        question: '¿Es gratis descargar videos de TikTok con QuickTok?',
        answer:
          'Sí, QuickTok es gratuito, no solicita registro ni contraseñas y funciona directamente desde el navegador.',
      },
      {
        question: '¿Se pueden descargar videos de cuentas privadas de TikTok?',
        answer:
          'No. QuickTok respeta estrictamente la privacidad y solo procesa videos públicos accesibles sin restricciones ni bloqueo DRM.',
      },
      {
        question: '¿Funciona en iPhone y Android?',
        answer:
          'Sí. En Android funciona en Chrome o Samsung Internet guardando el archivo en Descargas. En iPhone (iOS 13+) funciona en Safari guardando en Archivos o Fotos.',
      },
      {
        question: '¿QuickTok guarda una copia de los videos descargados?',
        answer:
          'No. Los archivos se transmiten directamente al navegador del usuario y no se almacenan permanentemente en nuestros servidores.',
      },
    ],
    relatedHeading: 'Guías e Idiomas Disponibles',
    relatedLinks: [
      { label: 'QuickTok Principal (English)', href: '/' },
      { label: 'Português', href: '/pt/' },
      { label: 'Français', href: '/fr/' },
      { label: 'Deutsch', href: '/de/' },
    ],
    schemaType: 'WebPage',
  },

  {
    slug: '/pt/',
    outputPath: 'pt/index.html',
    category: 'intl',
    lang: 'pt',
    dir: 'ltr',
    ogLocale: 'pt_BR',
    title: "Baixar Vídeo do TikTok Sem Marca d'Água em HD - QuickTok",
    description:
      "Baixe vídeos do TikTok sem marca d'água gratuitamente em MP4 Full HD ou converta para áudio MP3 online. Funciona no iPhone, Android e computador.",
    canonicalUrl: `${SITE_ORIGIN}/pt/`,
    kicker: 'Ferramenta Online Gratuita',
    h1: "Baixar Vídeo do TikTok Sem Marca d'Água",
    intro:
      "Com o QuickTok você pode baixar vídeos públicos do TikTok sem marca d'água em alta definição MP4 (1080p HD) ou salvar apenas o áudio em MP3 direto no navegador, sem precisar instalar aplicativos.",
    ctaLabel: 'Abrir Downloader QuickTok',
    ctaSubtext: 'Cole o link do vídeo do TikTok na página principal para iniciar o download.',
    homeLabel: 'Início',
    stepsHeading: 'Como Baixar Vídeos do TikTok em 3 Passos Simples',
    steps: [
      {
        title: 'Copie o link do vídeo no TikTok',
        description:
          'Abra o aplicativo ou site do TikTok, encontre um vídeo público autorizado, toque em Compartilhar e selecione Copiar link.',
      },
      {
        title: 'Cole o link no QuickTok',
        description:
          'Acesse o downloader do QuickTok, cole a URL (tiktok.com, vm.tiktok.com ou vt.tiktok.com) e clique em Baixar.',
      },
      {
        title: 'Escolha MP4 HD ou MP3',
        description:
          "Selecione a opção 1080p HD (Sem Marca d'Água), Qualidade Padrão MP4 ou Áudio Original MP3 para salvar no seu aparelho.",
      },
    ],
    sections: [
      {
        heading: 'Recursos do QuickTok para Baixar TikTok',
        paragraphs: [
          'O QuickTok foi desenvolvido para funcionar de forma rápida e segura no navegador de qualquer smartphone ou computador. Não armazenamos cópias dos seus vídeos em nossos servidores: a transmissão ocorre diretamente para o seu dispositivo.',
        ],
        bullets: [
          "Download de vídeos MP4 em Full HD 1080p sem o logotipo do TikTok quando disponível",
          'Extração de música e áudio original do TikTok para formato MP3',
          'Modo em Lote (Batch Mode) para processar vários links de uma só vez',
          'Compatível com Android (Chrome), iPhone/iPad (Safari iOS 13+), Windows e Mac',
        ],
      },
      {
        heading: 'Onde Ficam Salvos os Vídeos Baixados?',
        paragraphs: [
          'No Android e no PC/Mac, o vídeo MP4 ou áudio MP3 vai direto para a pasta Downloads e aparece na Galeria do celular. No iPhone, o Safari salva na pasta Downloads do app Arquivos, podendo ser salvo no Rolo da Câmera.',
        ],
      },
    ],
    faqHeading: 'Perguntas Frequentes (FAQ)',
    faqs: [
      {
        question: 'O QuickTok é realmente gratuito?',
        answer:
          'Sim, você pode baixar vídeos públicos do TikTok gratuitamente, sem cadastro, assinatura ou instalação de software.',
      },
      {
        question: 'Consigo baixar vídeos de contas privadas?',
        answer:
          'Não. O QuickTok respeita as configurações de privacidade e direitos autorais, processando apenas publicações abertas ao público.',
      },
      {
        question: 'Como salvar vídeos do TikTok no iPhone?',
        answer:
          'Abra o QuickTok no navegador Safari (iOS 13+), cole o link do vídeo e toque em baixar. Depois, use a opção Salvar Vídeo para enviar à sua biblioteca de Fotos.',
      },
      {
        question: 'É possível baixar apenas a música em MP3?',
        answer:
          'Sim. Quando a faixa de áudio separada estiver disponível no vídeo, o QuickTok exibe o botão de download em MP3.',
      },
    ],
    relatedHeading: 'Outros Idiomas e Guias',
    relatedLinks: [
      { label: 'QuickTok Principal (English)', href: '/' },
      { label: 'Español', href: '/es/' },
      { label: 'Français', href: '/fr/' },
      { label: 'Bahasa Indonesia', href: '/id/' },
    ],
    schemaType: 'WebPage',
  },

  {
    slug: '/fr/',
    outputPath: 'fr/index.html',
    category: 'intl',
    lang: 'fr',
    dir: 'ltr',
    ogLocale: 'fr_FR',
    title: 'Télécharger Vidéo TikTok Sans Filigrane Gratuit - QuickTok',
    description:
      "Téléchargez gratuitement vos vidéos TikTok sans filigrane en MP4 HD ou convertissez l'audio en MP3 en ligne. Compatible iPhone, Android, Mac et PC.",
    canonicalUrl: `${SITE_ORIGIN}/fr/`,
    kicker: 'Outil En Ligne Gratuit',
    h1: 'Télécharger une Vidéo TikTok Sans Filigrane',
    intro:
      'QuickTok vous permet d’enregistrer des vidéos TikTok publiques sans filigrane en haute définition MP4 (jusqu’à 1080p HD) ou d’extraire la piste audio au format MP3 directement depuis votre navigateur.',
    ctaLabel: 'Accéder au Téléchargeur QuickTok',
    ctaSubtext: 'Collez votre lien TikTok sur l’outil principal pour obtenir le fichier MP4 ou MP3.',
    homeLabel: 'Accueil',
    stepsHeading: 'Comment Télécharger une Vidéo TikTok en 3 Étapes',
    steps: [
      {
        title: 'Copiez le lien de la vidéo TikTok',
        description:
          'Ouvrez TikTok sur mobile ou ordinateur, sélectionnez une vidéo publique autorisée, appuyez sur Partager puis sur Copier le lien.',
      },
      {
        title: 'Collez le lien dans QuickTok',
        description:
          'Collez l’URL (tiktok.com, vm.tiktok.com ou vt.tiktok.com) dans le champ de QuickTok et cliquez sur Télécharger.',
      },
      {
        title: 'Choisissez le format MP4 ou MP3',
        description:
          'Sélectionnez 1080p HD (Sans Filigrane), Qualité Standard MP4 ou Audio Original MP3 pour lancer l’enregistrement.',
      },
    ],
    sections: [
      {
        heading: 'Pourquoi Utiliser QuickTok en Français ?',
        paragraphs: [
          'QuickTok fonctionne sans installation d’application tierce ni création de compte. Les flux vidéo et audio sont transmis directement vers votre appareil sans conservation permanente sur nos serveurs.',
        ],
        bullets: [
          'Téléchargement MP4 sans logo ni nom d’utilisateur superposé lorsque le flux source le propose',
          'Extraction audio directe au format MP3 pour sauvegarder sons et musiques',
          'Mode groupé (Batch Mode) pour analyser plusieurs liens TikTok simultanément',
          'Compatible Safari sur iPhone/iPad (iOS 13+), Chrome sur Android, Windows et macOS',
        ],
      },
      {
        heading: 'Emplacement des Fichiers Téléchargés',
        paragraphs: [
          'Sur Android, PC et Mac, les vidéos s’enregistrent dans votre dossier Téléchargements et apparaissent dans la Galerie. Sur iPhone, Safari enregistre le fichier dans l’app Fichiers, avec possibilité d’enregistrer directement dans Photos.',
        ],
      },
    ],
    faqHeading: 'Questions Fréquentes (FAQ)',
    faqs: [
      {
        question: 'Le téléchargement sur QuickTok est-il gratuit ?',
        answer:
          'Oui. QuickTok est entièrement gratuit et utilisable directement dans votre navigateur sans inscription.',
      },
      {
        question: 'Puis-je enregistrer des vidéos TikTok privées ?',
        answer:
          'Non. QuickTok respecte la confidentialité des utilisateurs et ne permet jamais de contourner les comptes privés ou protections DRM.',
      },
      {
        question: 'Comment enregistrer une vidéo TikTok sur iPhone ?',
        answer:
          'Ouvrez QuickTok dans Safari (iOS 13+), collez le lien, puis choisissez Télécharger ou Save to Phone Gallery pour ajouter la vidéo à vos Photos.',
      },
      {
        question: 'QuickTok conserve-t-il mes vidéos ?',
        answer:
          'Non. Aucun fichier vidéo ni historique personnel n’est stocké de façon permanente sur nos serveurs.',
      },
    ],
    relatedHeading: 'Autres Langues & Guides',
    relatedLinks: [
      { label: 'QuickTok Accueil (English)', href: '/' },
      { label: 'Español', href: '/es/' },
      { label: 'Deutsch', href: '/de/' },
      { label: 'Português', href: '/pt/' },
    ],
    schemaType: 'WebPage',
  },

  {
    slug: '/de/',
    outputPath: 'de/index.html',
    category: 'intl',
    lang: 'de',
    dir: 'ltr',
    ogLocale: 'de_DE',
    title: 'TikTok Video Downloaden Ohne Wasserzeichen HD - QuickTok',
    description:
      'TikTok Videos kostenlos ohne Wasserzeichen als Full HD MP4 oder MP3 Audio online herunterladen. Funktioniert direkt im Browser auf iPhone, Android & PC.',
    canonicalUrl: `${SITE_ORIGIN}/de/`,
    kicker: 'Kostenloses Online-Tool',
    h1: 'TikTok Video Downloaden Ohne Wasserzeichen',
    intro:
      'Mit QuickTok speichern Sie öffentlich zugängliche TikTok-Videos ohne Wasserzeichen in Full-HD-1080p-MP4-Qualität oder laden den Originalton als MP3-Audiodatei direkt im Browser herunter.',
    ctaLabel: 'Zum QuickTok Downloader',
    ctaSubtext: 'Fügen Sie Ihren TikTok-Link im Haupt-Downloader ein, um MP4 oder MP3 zu speichern.',
    homeLabel: 'Startseite',
    stepsHeading: 'TikTok Videos in 3 Schritten herunterladen',
    steps: [
      {
        title: 'TikTok-Link kopieren',
        description:
          'Öffnen Sie TikTok auf dem Smartphone oder im Web, tippen Sie bei einem öffentlichen Video auf Teilen und wählen Sie Link kopieren.',
      },
      {
        title: 'URL bei QuickTok einfügen',
        description:
          'Fügen Sie den Link (tiktok.com, vm.tiktok.com oder vt.tiktok.com) in das QuickTok-Eingabefeld ein und klicken Sie auf Download.',
      },
      {
        title: 'MP4 HD oder MP3 auswählen',
        description:
          'Wählen Sie 1080p HD (Ohne Wasserzeichen), Standard-MP4 oder Original Audio (MP3), um die Datei direkt auf Ihrem Gerät zu speichern.',
      },
    ],
    sections: [
      {
        heading: 'Vorteile des QuickTok Online-Downloaders',
        paragraphs: [
          'QuickTok läuft ohne Software-Installation oder Registrierung direkt im Browser. Alle Medien werden in Echtzeit gestreamt und niemals dauerhaft auf unseren Servern gespeichert.',
        ],
        bullets: [
          'Saubere MP4-Videos in Full HD 1080p ohne TikTok-Logo, sofern vom Stream bereitgestellt',
          'MP3-Audio-Extraktion für virale Sounds und Originalmusik',
          'Batch-Modus (Mehrfach-Download) für mehrere TikTok-Links gleichzeitig',
          'Optimiert für Android (Chrome), iPhone/iPad (Safari ab iOS 13), Windows, macOS und Linux',
        ],
      },
      {
        heading: 'Speicherort auf Smartphone und Computer',
        paragraphs: [
          'Unter Android sowie auf Windows- und Mac-Computern landen heruntergeladene Dateien direkt im Downloads-Ordner und erscheinen in der Galerie. Auf dem iPhone speichert Safari die Datei in der Dateien-App, von wo aus Sie sie in Fotos sichern können.',
        ],
      },
    ],
    faqHeading: 'Häufig gestellte Fragen (FAQ)',
    faqs: [
      {
        question: 'Ist QuickTok komplett kostenlos?',
        answer:
          'Ja. QuickTok ist ein kostenloses Web-Tool ohne Anmeldung, Abonnement oder versteckte Gebühren.',
      },
      {
        question: 'Kann man private TikTok-Videos herunterladen?',
        answer:
          'Nein. QuickTok respektiert Privatsphäre-Einstellungen, Urheberrechte sowie DRM-Schutz und verarbeitet ausschließlich öffentlich zugängliche Videos.',
      },
      {
        question: 'Funktioniert der Downloader auf dem iPhone?',
        answer:
          'Ja. Öffnen Sie QuickTok ab iOS 13 einfach in Apple Safari, fügen Sie den Link ein und sichern Sie das Video in der Dateien- oder Fotos-App.',
      },
      {
        question: 'Werden meine Videos auf dem Server gespeichert?',
        answer:
          'Nein. Mediendaten werden direkt an Ihren Browser weitergeleitet und nicht dauerhaft auf unseren Servern abgelegt.',
      },
    ],
    relatedHeading: 'Weitere Sprachen & Anleitungen',
    relatedLinks: [
      { label: 'QuickTok Startseite (English)', href: '/' },
      { label: 'Français', href: '/fr/' },
      { label: 'Español', href: '/es/' },
      { label: 'Português', href: '/pt/' },
    ],
    schemaType: 'WebPage',
  },

  {
    slug: '/ar/',
    outputPath: 'ar/index.html',
    category: 'intl',
    lang: 'ar',
    dir: 'rtl',
    ogLocale: 'ar_AR',
    title: 'تحميل فيديو تيك توك بدون علامة مائية مجاناً - QuickTok',
    description:
      'أداة مجانية لتحميل فيديوهات تيك توك بدون علامة مائية بصيغة MP4 عالية الدقة HD أو حفظ الصوت MP3 مباشرة عبر المتصفح على الأندرويد والآيفون والكمبيوتر.',
    canonicalUrl: `${SITE_ORIGIN}/ar/`,
    kicker: 'أداة مجانية عبر المتصفح',
    h1: 'تحميل فيديو تيك توك بدون علامة مائية',
    intro:
      'يتيح لك موقع QuickTok حفظ مقاطع تيك توك العامة بدون علامة مائية بجودة عالية Full HD 1080p بصيغة MP4 أو استخراج الصوت الأصلي بصيغة MP3 مباشرة عبر المتصفح دون الحاجة لتثبيت أي تطبيقات.',
    ctaLabel: 'الانتقال إلى أداة التحميل QuickTok',
    ctaSubtext: 'الصق رابط تيك توك في الأداة الرئيسية لبدء التحميل فوراً.',
    homeLabel: 'الرئيسية',
    stepsHeading: 'كيفية تحميل فيديو تيك توك في 3 خطوات بسيطة',
    steps: [
      {
        title: 'انسخ رابط فيديو تيك توك',
        description:
          'افتح تطبيق أو موقع تيك توك، واختر مقطعاً عاماً تملك صلاحية حفظه، ثم اضغط على مشاركة واختر نسخ الرابط.',
      },
      {
        title: 'الصق الرابط في موقع QuickTok',
        description:
          'توجه إلى أداة التحميل في QuickTok والصق الرابط (tiktok.com أو vm.tiktok.com أو vt.tiktok.com) ثم اضغط تحميل.',
      },
      {
        title: 'اختر صيغة MP4 HD أو MP3',
        description:
          'اختر الجودة العالية 1080p HD (بدون علامة مائية) أو الجودة القياسية MP4 أو الصوت الأصلي MP3 لحفظ الملف على جهازك.',
      },
    ],
    sections: [
      {
        heading: 'مميزات أداة QuickTok لتحميل تيك توك',
        paragraphs: [
          'تم تصميم QuickTok ليعمل بسرعة وأمان مباشرة داخل متصفح الهاتف أو الكمبيوتر بدون تسجيل حساب وبدون تخزين أي نسخ من الفيديوهات على خوادمنا.',
        ],
        bullets: [
          'تحميل مقاطع MP4 بدقة تصل إلى 1080p Full HD بدون شعار تيك توك عند توفرها من المصدر',
          'إمكانية حفظ الصوت الأصلي والموسيقى بصيغة MP3 عالية الجودة',
          'دعم الوضع المتعدد (Batch Mode) لمعالجة عدة روابط في وقت واحد',
          'متوافق مع هواتف أندرويد (Chrome) والآيفون والآيباد (Safari iOS 13+) وأجهزة الكمبيوتر',
        ],
      },
      {
        heading: 'أين يتم حفظ المقاطع بعد التحميل؟',
        paragraphs: [
          'على هواتف أندرويد وأجهزة الكمبيوتر، تُحفظ الملفات تلقائياً داخل مجلد التنزيلات (Downloads) وتظهر في الاستوديو. أما على الآيفون والآيباد فيتم حفظها في تطبيق الملفات (Files) مع خيار الحفظ في ألبوم الصور.',
        ],
      },
    ],
    faqHeading: 'الأسئلة الشائعة',
    faqs: [
      {
        question: 'هل خدمة QuickTok مجانية بالكامل؟',
        answer:
          'نعم، يمكنك استخدام الأداة مجاناً عبر المتصفح بدون اشتراكات أو تسجيل حساب.',
      },
      {
        question: 'هل يمكن تحميل فيديوهات الحسابات الخاصة؟',
        answer:
          'لا. يحترم الموقع إعدادات الخصوصية وحقوق النشر ولا يدعم تحميل المقاطع الخاصة أو المحمية.',
      },
      {
        question: 'كيف أحفظ الفيديو في ألبوم الصور على الآيفون؟',
        answer:
          'استخدم متصفح Safari على نظام iOS 13 أو أحدث، ثم اضغط تحميل أو زر الحفظ في ألبوم الهاتف واختر حفظ الفيديو.',
      },
      {
        question: 'هل يحتفظ الموقع بنسخة من الفيديو؟',
        answer:
          'لا، يتم تمرير البث مباشرة إلى متصفحك ولا يتم الاحتفاظ بأي ملفات على خوادمنا.',
      },
    ],
    relatedHeading: 'لغات وأدلة أخرى',
    relatedLinks: [
      { label: 'QuickTok الرئيسية (English)', href: '/' },
      { label: 'Español', href: '/es/' },
      { label: 'Français', href: '/fr/' },
      { label: 'Bahasa Indonesia', href: '/id/' },
    ],
    schemaType: 'WebPage',
  },

  {
    slug: '/id/',
    outputPath: 'id/index.html',
    category: 'intl',
    lang: 'id',
    dir: 'ltr',
    ogLocale: 'id_ID',
    title: 'Download Video TikTok Tanpa Watermark HD Gratis - QuickTok',
    description:
      'Download video TikTok tanpa watermark dalam format MP4 Full HD atau simpan audio MP3 secara gratis dan cepat melalui browser di Android, iPhone, dan PC.',
    canonicalUrl: `${SITE_ORIGIN}/id/`,
    kicker: 'Alat Online Gratis',
    h1: 'Download Video TikTok Tanpa Watermark',
    intro:
      'QuickTok adalah layanan web gratis untuk mengunduh video TikTok publik tanpa watermark dalam resolusi Full HD 1080p MP4 atau mengonversi suara menjadi file audio MP3 langsung dari browser HP maupun laptop.',
    ctaLabel: 'Buka Pengunduh QuickTok',
    ctaSubtext: 'Tempel tautan TikTok di halaman utama QuickTok untuk langsung menyimpan video.',
    homeLabel: 'Beranda',
    stepsHeading: 'Cara Download Video TikTok Tanpa Watermark',
    steps: [
      {
        title: 'Salin tautan video TikTok',
        description:
          'Buka aplikasi atau situs TikTok, pilih video publik yang ingin disimpan, ketuk Bagikan lalu pilih Salin Tautan.',
      },
      {
        title: 'Tempel URL ke QuickTok',
        description:
          'Buka halaman utama QuickTok, tempel tautan (`tiktok.com`, `vm.tiktok.com`, atau `vt.tiktok.com`), lalu klik Download Now.',
      },
      {
        title: 'Pilih format MP4 HD atau MP3',
        description:
          'Pilih opsi 1080p HD (No Watermark), MP4 Standar, atau Audio Asli MP3 untuk menyimpan file langsung ke perangkat Anda.',
      },
    ],
    sections: [
      {
        heading: 'Keunggulan Pengunduh TikTok QuickTok',
        paragraphs: [
          'Anda tidak perlu memasang aplikasi APK tambahan atau membuat akun. QuickTok mengalirkan media langsung ke browser Anda tanpa menyimpan salinan video secara permanen di server kami.',
        ],
        bullets: [
          'Video MP4 Full HD 1080p bersih tanpa logo atau username TikTok jika tersedia dari sumber',
          'Dukungan unduh musik dan suara latar TikTok dalam format MP3',
          'Mode Batch untuk memproses beberapa tautan TikTok sekaligus',
          'Berjalan lancar di Chrome Android, Safari iPhone (iOS 13+), Windows, dan macOS',
        ],
      },
      {
        heading: 'Lokasi Penyimpanan File di HP dan Komputer',
        paragraphs: [
          'Di HP Android dan PC/Mac, video MP4 atau audio MP3 otomatis tersimpan di folder Downloads dan tampil di Galeri. Di iPhone atau iPad, Safari menyimpan file ke aplikasi Files dan dapat langsung disimpan ke Galeri Foto.',
        ],
      },
    ],
    faqHeading: 'Pertanyaan Umum (FAQ)',
    faqs: [
      {
        question: 'Apakah download video TikTok di QuickTok gratis?',
        answer:
          'Ya, QuickTok sepenuhnya gratis digunakan melalui browser tanpa perlu login, aplikasi tambahan, atau biaya langganan.',
      },
      {
        question: 'Apakah video dari akun TikTok privat bisa diunduh?',
        answer:
          'Tidak. QuickTok menghormati privasi pengguna dan hak cipta sehingga hanya memproses tautan video publik.',
      },
      {
        question: 'Bagaimana cara menyimpan video TikTok ke Galeri iPhone?',
        answer:
          'Gunakan Safari di iOS 13 atau versi lebih baru, ketuk tombol Download atau Save to Phone Gallery, lalu pilih Save Video agar masuk ke aplikasi Photos.',
      },
      {
        question: 'Apakah QuickTok menyimpan video yang saya unduh?',
        answer:
          'Tidak. Semua media dialirkan secara real-time ke browser Anda dan tidak disimpan di server QuickTok.',
      },
    ],
    relatedHeading: 'Bahasa & Panduan Lainnya',
    relatedLinks: [
      { label: 'QuickTok Utama (English)', href: '/' },
      { label: 'Español', href: '/es/' },
      { label: 'Português', href: '/pt/' },
      { label: 'العربية', href: '/ar/' },
    ],
    schemaType: 'WebPage',
  },
];

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const cleaned = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  return cleaned;
}

export function findLandingPageByPath(pathname: string): LandingPageData | undefined {
  const normalized = normalizePathname(pathname);
  return LANDING_PAGES.find((page) => {
    const pageNoTrailing = page.slug.endsWith('/') ? page.slug.slice(0, -1) : page.slug;
    const reqNoTrailing = normalized.endsWith('/') && normalized !== '/' ? normalized.slice(0, -1) : normalized;
    return pageNoTrailing === reqNoTrailing;
  });
}
