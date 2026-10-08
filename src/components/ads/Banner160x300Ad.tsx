import React from 'react';

export interface Banner160x300AdProps {
  className?: string;
  showLabel?: boolean;
}

export const Banner160x300Ad: React.FC<Banner160x300AdProps> = ({
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
      width: 160px;
      height: 300px;
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
      'key' : 'bc5e69de8ae2c467aac21d2e72af7bab',
      'format' : 'iframe',
      'height' : 300,
      'width' : 160,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://www.highrevenueformat.com/bc5e69de8ae2c467aac21d2e72af7bab/invoke.js"></script>
</body>
</html>`;

  return (
    <div
      aria-label="Skyscraper Advertisement"
      className={`flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      {showLabel && (
        <span className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-[#8b93a1]">
          Ad
        </span>
      )}
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{
          width: '160px',
          height: '300px',
        }}
      >
        <iframe
          title="Advertisement 160x300"
          width={160}
          height={300}
          style={{
            width: '160px',
            height: '300px',
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
    </div>
  );
};
