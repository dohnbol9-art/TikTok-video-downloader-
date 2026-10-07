import React from 'react';

export interface Banner320x50AdProps {
  className?: string;
  showLabel?: boolean;
}

export const Banner320x50Ad: React.FC<Banner320x50AdProps> = ({
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
      width: 320px;
      height: 50px;
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
      'key' : '2409cad9e3afbc00e5d8196d4ec53cb5',
      'format' : 'iframe',
      'height' : 50,
      'width' : 320,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://www.highrevenueformat.com/2409cad9e3afbc00e5d8196d4ec53cb5/invoke.js"></script>
</body>
</html>`;

  return (
    <section
      aria-label="320x50 Advertisement"
      className={`mx-auto my-6 flex w-full max-w-full flex-col items-center justify-center overflow-hidden px-4 ${className}`}
    >
      {showLabel && (
        <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Advertisement
        </span>
      )}
      <div
        className="flex items-center justify-center overflow-hidden transition-all"
        style={{
          width: '320px',
          height: '50px',
          maxWidth: '100%',
        }}
      >
        <iframe
          title="Advertisement 320x50"
          width={320}
          height={50}
          style={{
            width: '320px',
            height: '50px',
            maxWidth: '100%',
            border: 'none',
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }}
          scrolling="no"
          srcDoc={adHtml}
        />
      </div>
    </section>
  );
};
