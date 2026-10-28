import React from 'react';

export type AdSize = '320x50' | '728x90' | '160x300' | '160x600' | '468x60' | '300x250';

interface AdConfig {
  key: string;
  width: number;
  height: number;
}

const AD_CONFIGS: Record<AdSize, AdConfig> = {
  '320x50': {
    key: '1c544ab435f8dfb0329b168f4114a4b3',
    width: 320,
    height: 50,
  },
  '728x90': {
    key: 'ea4b3db24328c9c7f13a1568882317cc',
    width: 728,
    height: 90,
  },
  '160x300': {
    key: 'cf1e6bb5689bf9c5c4af77234cbeab7c',
    width: 160,
    height: 300,
  },
  '160x600': {
    key: '810bf70958269a42138417912b455f6e',
    width: 160,
    height: 600,
  },
  '468x60': {
    key: '33837984dc254e6f4de68fa8865302cc',
    width: 468,
    height: 60,
  },
  '300x250': {
    key: '4bad8883ac860828de7af0f4083198c0',
    width: 300,
    height: 250,
  },
};

interface AdBannerProps {
  size: AdSize;
  className?: string;
  label?: boolean;
}

export const AdBanner: React.FC<AdBannerProps> = ({ size, className = '', label = true }) => {
  const config = AD_CONFIGS[size];
  if (!config) return null;

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '${config.key}',
      'format' : 'iframe',
      'height' : ${config.height},
      'width' : ${config.width},
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://bicea.org/22/${config.key}"></script>
</body>
</html>`;

  return (
    <div className={`flex flex-col items-center justify-center my-4 overflow-hidden ${className}`}>
      {label && (
        <span className="text-[10px] tracking-wider text-[#a48695] uppercase mb-1 font-sans">
          Advertisement
        </span>
      )}
      <div 
        className="flex items-center justify-center bg-pink-50/50 rounded-lg overflow-hidden border border-pink-100/60 shadow-xs max-w-full"
        style={{ width: `${config.width}px`, height: `${config.height}px` }}
      >
        <iframe
          title={`Adsterra Ad ${size}`}
          srcDoc={htmlContent}
          width={config.width}
          height={config.height}
          style={{ width: `${config.width}px`, height: `${config.height}px`, border: 'none', overflow: 'hidden' }}
          scrolling="no"
          loading="lazy"
        />
      </div>
    </div>
  );
};
