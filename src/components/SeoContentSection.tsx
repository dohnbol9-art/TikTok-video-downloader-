import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Zap,
  Smartphone,
  Monitor,
  Music,
  Film,
  Globe,
  HelpCircle,
  FileCheck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';

interface LanguageGuide {
  code: string;
  name: string;
  flag: string;
  title: string;
  subtitle: string;
  steps: string[];
  keywords: string[];
}

const LANGUAGE_GUIDES: LanguageGuide[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    title: 'Download TikTok Videos Without Watermark in HD',
    subtitle: 'Free online tool to save TikTok videos in Full HD 1080p MP4 or convert viral TikTok sounds to MP3 on any mobile phone, tablet, or desktop.',
    steps: [
      'Copy the TikTok video link from the TikTok app or website.',
      'Paste the URL into the QuickTok search box above and tap Download.',
      'Select 1080p HD (No Watermark) or MP3 Audio to save the file instantly.'
    ],
    keywords: ['tiktok video downloader', 'download tiktok video', 'tiktok downloader without watermark', 'tiktok to mp4', 'tiktok mp3']
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    title: 'Descargar Videos de TikTok Sin Marca de Agua Gratis',
    subtitle: 'El mejor descargador de videos de TikTok online en español. Guarda videos de TikTok en alta definición Full HD 1080p MP4 o extrae audio en MP3 sin marca de agua ni logotipo.',
    steps: [
      'Abre TikTok y copia el enlace del video que deseas descargar (Compartir > Copiar enlace).',
      'Pega el enlace en el buscador de QuickTok arriba y haz clic en Descargar.',
      'Elige Descargar en HD sin marca de agua o Audio MP3 para guardarlo en tu teléfono o PC.'
    ],
    keywords: ['descargar videos de tiktok', 'descargar tiktok sin marca de agua', 'bajar videos de tiktok', 'descargador de tiktok', 'tiktok a mp3']
  },
  {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷',
    title: 'Baixar Vídeo do TikTok Sem Marca d\'Água em HD',
    subtitle: 'Ferramenta online gratuita para baixar vídeos do TikTok em Full HD sem logotipo e converter músicas do TikTok para MP3 no celular ou computador.',
    steps: [
      'Abra o aplicativo TikTok e copie o link do vídeo que deseja salvar.',
      'Cole a URL na barra de pesquisa do QuickTok e clique em Baixar.',
      'Selecione a versão Sem Marca d\'Água (1080p MP4) ou Áudio MP3 para salvar.'
    ],
    keywords: ['baixar video do tiktok', 'baixar video do tiktok sem marca d água', 'salvar video do tiktok', 'baixador de tiktok', 'tiktok mp3']
  },
  {
    code: 'id',
    name: 'Bahasa Indonesia',
    flag: '🇮🇩',
    title: 'Download Video TikTok Tanpa Watermark Kualitas HD',
    subtitle: 'Layanan online gratis tercepat untuk download video TikTok tanpa watermark / tanpa logo dalam resolusi Full HD MP4 dan konversi audio TikTok ke MP3.',
    steps: [
      'Buka aplikasi TikTok, pilih video favorit, lalu klik Bagikan dan Salin Tautan.',
      'Tempel link TikTok ke kolom input QuickTok di atas dan klik Unduh.',
      'Pilih format Video Tanpa Watermark (1080p) atau Lagu MP3 untuk disimpan ke galeri.'
    ],
    keywords: ['download video tiktok', 'download video tiktok tanpa watermark', 'unduh video tiktok', 'tiktok downloader tanpa tanda air', 'savefrom tiktok']
  },
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    title: 'Télécharger Vidéo TikTok Sans Filigrane en Haute Définition',
    subtitle: 'Téléchargez gratuitement vos vidéos TikTok préférées en MP4 1080p Full HD sans logo TikTok et convertissez les musiques virales en MP3.',
    steps: [
      'Ouvrez l\'application TikTok, cliquez sur Partager puis Copier le lien.',
      'Collez le lien dans la boîte de téléchargement QuickTok ci-dessus et validez.',
      'Sélectionnez Télécharger sans filigrane ou MP3 pour enregistrer le fichier.'
    ],
    keywords: ['telecharger video tiktok', 'telecharger video tiktok sans filigrane', 'enregistrer video tiktok', 'convertisseur tiktok mp3']
  },
  {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪',
    title: 'TikTok Video Downloaden Ohne Wasserzeichen in HD',
    subtitle: 'Kostenloser Online TikTok Downloader. Videos ohne TikTok-Logo in kristallklarem Full HD 1080p MP4 speichern oder als MP3 Musikdatei extrahieren.',
    steps: [
      'TikTok App öffnen, gewünschtes Video auswählen und auf Link kopieren tippen.',
      'Fügen Sie die URL oben in die QuickTok Eingabemaske ein und klicken Sie auf Download.',
      'Wählen Sie MP4 ohne Wasserzeichen oder MP3 Audio zum sofortigen Speichern.'
    ],
    keywords: ['tiktok video downloaden', 'tiktok video herunterladen ohne wasserzeichen', 'tiktok mp3 konverter', 'tiktok video speichern']
  },
  {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    title: 'Tải Video TikTok Không Logo Watermark Full HD Miễn Phí',
    subtitle: 'Công cụ tải video TikTok không dính logo, không hình mờ trực tuyến tốt nhất. Tải video MP4 Full HD 1080p và nhạc chuông TikTok MP3 nhanh chóng.',
    steps: [
      'Mở ứng dụng TikTok, chọn video bạn muốn tải, nhấn Chia sẻ và chọn Sao chép liên kết.',
      'Dán link video TikTok vào thanh tìm kiếm QuickTok ở trên và nhấn Tải về.',
      'Chọn định dạng Không Logo (HD 1080p) hoặc File Nhạc MP3 để lưu về máy.'
    ],
    keywords: ['tải video tiktok không logo', 'download video tiktok', 'tải video tiktok', 'tiktok mp3', 'tải nhạc tiktok']
  },
  {
    code: 'tr',
    name: 'Türkçe',
    flag: '🇹🇷',
    title: 'TikTok Video İndir - Filigransız ve Logosuz HD MP4',
    subtitle: 'TikTok videolarını filigransız, logosuz ve yüksek kaliteli Full HD 1080p olarak indirin. TikTok şarkılarını MP3 olarak kolayca cihazınıza kaydedin.',
    steps: [
      'TikTok uygulamasında videoyu açın, Paylaş butonuna basıp Bağlantıyı Kopyala seçeneğini tıklayın.',
      'Kopyaladığınız bağlantıyı QuickTok arama kutusuna yapıştırın ve İndir\'e tıklayın.',
      'Filigransız HD Video veya MP3 Ses formatını seçerek telefonunuza veya bilgisayarınıza indirin.'
    ],
    keywords: ['tiktok video indir', 'tiktok filigransız video indir', 'tiktok video indirme', 'tiktok mp3 dönüştürücü', 'tiktok video kaydet']
  },
  {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦',
    title: 'تحميل فيديو تيك توك بدون علامة مائية بجودة عالية HD',
    subtitle: 'أفضل موقع مجاني لتنزيل مقاطع تيك توك بدون شعار وبدقة Full HD 1080p MP4 وتحويل مقاطع الصوت والموسيقى إلى ملفات MP3 بسرعة فائقة.',
    steps: [
      'افتح تطبيق تيك توك، اضغط على مشاركة ثم اختر نسخ الرابط.',
      'الصق الرابط في مربع البحث الخاص بموقع QuickTok بالأعلى واضغط على تحميل.',
      'اختر تحميل بدون علامة مائية أو حفظ الصوت MP3 لحفظه في جهازك فوراً.'
    ],
    keywords: ['تحميل فيديو تيك توك', 'تنزيل تيك توك بدون علامة مائية', 'تحميل تيك توك mp3', 'برنامج تنزيل تيك توك']
  }
];

export const SeoContentSection: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<string>('en');

  // Synchronize hash with active language for international SEO links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const matched = LANGUAGE_GUIDES.find((l) => l.code === hash);
      if (matched) {
        setSelectedLang(matched.code);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const activeGuide =
    LANGUAGE_GUIDES.find((l) => l.code === selectedLang) || LANGUAGE_GUIDES[0];

  const handleSelectLang = (code: string) => {
    setSelectedLang(code);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `#${code}`);
    }
  };

  return (
    <section id="guide" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-[#15181d]">
        
        {/* 1. Main SEO Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-3.5 py-1 text-xs font-bold text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Global Media Downloader</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            TikTok Video Downloader Without Watermark in HD
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-[#b8bec9] leading-relaxed">
            <strong>QuickTok</strong> is the world\'s premier free online <strong>TikTok video downloader</strong>, engineered to extract pristine <strong>Full HD 1080p MP4</strong> videos and original studio-quality <strong>MP3 audio</strong> streams directly from TikTok servers without watermarks, user overlays, or compression artifacts.
          </p>
        </div>

        {/* 2. Worldwide Multi-Language Regional Guide (High Traffic Intent) */}
        <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/50 to-amber-50/30 p-5 sm:p-7 dark:border-rose-900/30 dark:from-rose-950/20 dark:to-[#171a21] mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white shadow-sm">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Worldwide User Guide & International Support
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select your preferred language for instant localized instructions
                </p>
              </div>
            </div>

            {/* Language Quick Pills */}
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="International Guides">
              {LANGUAGE_GUIDES.map((lang) => {
                const isActive = lang.code === selectedLang;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLang(lang.code)}
                    role="tab"
                    aria-selected={isActive}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-500/20'
                        : 'bg-white/80 text-slate-700 hover:bg-white hover:text-slate-950 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Localized Content Box */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#12151a]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {activeGuide.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-[#b8bec9] leading-relaxed">
                  {activeGuide.subtitle}
                </p>
              </div>
              <span className="shrink-0 text-2xl">{activeGuide.flag}</span>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeGuide.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800/60 dark:bg-[#171a21]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-[11px] font-bold text-white">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* Keyword tags for search indexing */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="font-semibold text-slate-500 dark:text-slate-400">Top searches:</span>
              {activeGuide.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Core Feature Grid with Semantic Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500 dark:text-white">
              <Film className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Download TikTok Video Without Watermark
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-[#b8bec9] leading-relaxed">
                Remove the bouncing TikTok watermark logo and creator username overlay cleanly. QuickTok accesses raw source streams directly so your downloaded MP4 video contains zero blur, zero crop, and no artificial logos.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500 dark:text-white">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Ultra-Fast 1080p Full HD Downloads
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-[#b8bec9] leading-relaxed">
                Enjoy line-speed streaming without artificial wait times, queues, or speed throttling. QuickTok delivers original bitrates and high dynamic color gamut up to Full HD 1080p and 60fps where available.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500 dark:text-white">
              <Music className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                TikTok to MP3 Audio Converter
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-[#b8bec9] leading-relaxed">
                Heard a viral background music track or audio clip? QuickTok automatically separates the audio stream, allowing you to convert and save high-bitrate MP3 music files directly to your device with one click.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500 dark:text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                100% Free & Unlimited Usage
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-[#b8bec9] leading-relaxed">
                No credit cards, no login, and no subscriptions. QuickTok is completely free forever with no daily download caps, intrusive software requirements, or account restrictions.
              </p>
            </div>
          </div>

        </div>

        {/* 4. Comparison Table: QuickTok vs Other Downloaders (Authority & High Trust) */}
        <div className="mb-12 border-t border-slate-100 pt-10 dark:border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why QuickTok Outperforms Other TikTok Downloaders
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Honest technical comparison of resolution, formats, and privacy standards
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/70 text-slate-800 dark:bg-slate-800/60 dark:text-slate-200">
                <tr>
                  <th className="p-3.5 sm:p-4 font-bold">Feature</th>
                  <th className="p-3.5 sm:p-4 font-bold text-rose-600 dark:text-rose-400">QuickTok Downloader</th>
                  <th className="p-3.5 sm:p-4 font-bold text-slate-500">Standard Downloaders</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-white">Maximum Video Resolution</td>
                  <td className="p-3.5 sm:p-4 font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-500" /> Full HD 1080p Original
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-500">Often limited to 720p or 480p</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-white">Watermark Removal Quality</td>
                  <td className="p-3.5 sm:p-4 font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-500" /> 100% Clean Clean Stream
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-500">Often blurs or crops edges</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-white">MP3 Music Audio Extraction</td>
                  <td className="p-3.5 sm:p-4 font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-500" /> 320kbps High Bitrate MP3
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-500">Not supported or low bitrate</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-white">Mobile Device Support</td>
                  <td className="p-3.5 sm:p-4 font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-500" /> iOS (Safari) + Android Chrome
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-500">Often forces app installs</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-white">Download Limits & Pricing</td>
                  <td className="p-3.5 sm:p-4 font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-500" /> 100% Free & Unlimited
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-500">Daily caps or paid tiers</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3.5 sm:p-4 font-medium text-slate-900 dark:text-white">Registration & Account</td>
                  <td className="p-3.5 sm:p-4 font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-500" /> No signup required
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-500">Requires login or email</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Device Compatibility Guide (Targeting long-tail search intent) */}
        <div className="border-t border-slate-100 pt-10 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-8">
            How to Download TikTok Videos on Any Device
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-[#0b0d10]">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="h-5 w-5 text-rose-500" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">iPhone & iPad (iOS 13+)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Open Safari, paste the TikTok link into QuickTok, and tap Download. Safari will automatically prompt you to save the file. Open your Files app or tap Share &gt; Save Video to move it straight to your Photos Gallery.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-[#0b0d10]">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="h-5 w-5 text-rose-500" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Android Smartphones</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Compatible with Google Chrome, Samsung Internet, and Firefox. Paste the TikTok URL, click Download, and your MP4 video or MP3 audio file will instantly be saved in your Downloads folder and Gallery.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-[#0b0d10]">
              <div className="flex items-center gap-3 mb-3">
                <Monitor className="h-5 w-5 text-rose-500" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">PC, Mac & Chromebook</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Works in all desktop web browsers (Chrome, Edge, Safari, Brave, Opera). Simply copy any desktop TikTok link (tiktok.com/@username/video/id) and save high-speed MP4 files directly to your computer.
              </p>
            </div>

          </div>
        </div>

        {/* 6. Benefits Checklist */}
        <div className="mt-10 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 p-6">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            Why Creators & Viewers Worldwide Choose QuickTok Video Downloader:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-[#b8bec9]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>No watermark on Full HD 1080p MP4 videos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Instant TikTok to MP3 audio conversion</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Unlimited downloads with 0 subscription fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Privacy protected: No data or files kept on servers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Works directly in browser without installing apps</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0" />
              <span>Supports vm.tiktok.com, vt.tiktok.com and desktop links</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
