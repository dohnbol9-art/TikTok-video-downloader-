import React from 'react';

export interface Banner300x250AdProps {
  className?: string;
  showLabel?: boolean;
}

export const Banner300x250Ad: React.FC<Banner300x250AdProps> = ({
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
      width: 300px;
      height: 250px;
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
      'key' : '9a118f9349b12043c7b15ea55969f5fd',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://www.highrevenueformat.com/9a118f9349b12043c7b15ea55969f5fd/invoke.js"></script>
</body>
</html>`;

  return (
    <section
      aria-label="300x250 Advertisement"
      className={`mx-auto my-8 flex w-full max-w-full flex-col items-center justify-center overflow-hidden px-4 ${className}`}
    >
      {showLabel && (
        <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Advertisement
        </span>
      )}
      <div
        className="flex items-center justify-center overflow-hidden transition-all"
        style={{
          width: '300px',
          height: '250px',
          maxWidth: '100%',
        }}
      >
        <iframe
          title="Advertisement 300x250"
          width={300}
          height={250}
          style={{
            width: '300px',
            height: '250px',
            maxWidth: '100%',
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
