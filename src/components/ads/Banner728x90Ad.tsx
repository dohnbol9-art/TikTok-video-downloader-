import React from 'react';

export interface Banner728x90AdProps {
  className?: string;
  showLabel?: boolean;
}

export const Banner728x90Ad: React.FC<Banner728x90AdProps> = ({
  className = '',
  showLabel = true,
}) => {
  const adHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      width: 728px;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : 'bbc77ec8a3b25a80ab8c32f45a41f201',
      'format' : 'iframe',
      'height' : 90,
      'width' : 728,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://www.highrevenueformat.com/bbc77ec8a3b25a80ab8c32f45a41f201/invoke.js"></script>
</body>
</html>`;

  return (
    <section
      aria-label="Leaderboard Advertisement"
      className={`mx-auto my-6 flex w-full max-w-full flex-col items-center justify-center overflow-hidden px-2 ${className}`}
    >
      {showLabel && (
        <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-[#8b93a1]">
          Advertisement
        </span>
      )}
      <div
        className="flex items-center justify-center overflow-hidden max-w-full transition-all"
        style={{
          width: '728px',
          height: '90px',
        }}
      >
        <iframe
          title="Advertisement 728x90"
          width={728}
          height={90}
          style={{
            width: '728px',
            height: '90px',
            border: 'none',
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }}
          scrolling="no"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
          referrerPolicy="no-referrer-when-downgrade"
          srcDoc={adHtml}
        />
      </div>
    </section>
  );
};
