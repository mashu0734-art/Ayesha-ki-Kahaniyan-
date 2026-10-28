import React, { useEffect, useRef } from 'react';

export const NativeBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adContainerRef.current) return;

    // Check if script already loaded in container
    const existingScript = adContainerRef.current.querySelector('script[src*="6f70866fb662b52767c07dfe77d35fcf"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://bicea.org/21/6f70866fb662b52767c07dfe77d35fcf';
      adContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto my-6 px-2 overflow-hidden ${className}`}>
      <div className="text-center mb-1.5">
        <span className="text-[10px] tracking-wider text-[#a48695] uppercase font-sans">
          Recommended For You • اسپانسرڈ کہانیاں
        </span>
      </div>
      <div 
        ref={adContainerRef}
        className="w-full min-h-[140px] bg-white rounded-2xl p-4 border border-[#f1cbd9] shadow-xs flex flex-col items-center justify-center transition-all"
      >
        <div id="container-6f70866fb662b52767c07dfe77d35fcf" className="w-full"></div>
      </div>
    </div>
  );
};
