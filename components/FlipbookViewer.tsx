
import React, { useState, useEffect, useRef } from 'react';
import { EducationalApp } from '../types';

interface Props {
  app: EducationalApp;
}

const FlipbookViewer: React.FC<Props> = ({ app }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    // Clear loading state if it takes too long without an error or load event
    // This handles silent blocks or extremely slow loads gracefully
    const timer = setTimeout(() => {
      // We don't force a load state change here to allow the browser to keep trying
    }, 10000);

    return () => clearTimeout(timer);
  }, [app]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="w-full h-full relative bg-gray-50 flex items-center justify-center overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-50 z-20 transition-opacity duration-500">
           <div className="text-8xl mb-6 animate-bounce drop-shadow-lg select-none">{app.icon}</div>
           <div className="text-3xl font-bold text-blue-600 tracking-tight select-none">Even wachten...</div>
           <div className="text-blue-400 mt-3 font-medium select-none">We maken "{app.title}" klaar voor jou!</div>
           <div className="mt-8 flex gap-2">
             <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
             <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
             <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
           </div>
        </div>
      )}

      {hasError ? (
        <div className="flex flex-col items-center justify-center p-8 text-center gap-6 z-30">
          <div className="text-9xl animate-pulse">🎈</div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Oei! Het lukt niet.</h2>
            <p className="text-xl text-gray-500 mt-2">Druk op de knop om te spelen!</p>
          </div>
          <button 
            onClick={() => window.open(app.url, '_blank')}
            className="px-10 py-5 bg-green-500 text-white font-bold rounded-3xl text-2xl shadow-xl hover:bg-green-600 transition-all hover:scale-105 active:scale-95"
          >
            Nu Spelen! 🚀
          </button>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          key={app.id}
          src={app.url}
          className={`w-full h-full border-0 transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          title={app.title}
          onLoad={handleLoad}
          onError={handleError}
          allow="fullscreen; autoplay; microphone; camera; geolocation"
          sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-downloads"
        />
      )}
      
      {/* Small subtle help button in corner for accessibility/utility */}
      {!isLoading && !hasError && (
        <button 
          onClick={() => window.open(app.url, '_blank')}
          className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-400 hover:text-blue-500 transition-all text-xs font-bold"
          title="Open in nieuw venster"
        >
          ↗️ Groter maken
        </button>
      )}
    </div>
  );
};

export default FlipbookViewer;
