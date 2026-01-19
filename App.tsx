
import React, { useState, useCallback, useEffect } from 'react';
import { DEFAULT_APPS } from './constants';
import { EducationalApp } from './types';
import NavigationShelf from './components/NavigationShelf';
import FlipbookViewer from './components/FlipbookViewer';

const App: React.FC = () => {
  const [apps] = useState<EducationalApp[]>(DEFAULT_APPS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % apps.length);
  }, [apps.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + apps.length) % apps.length);
  }, [apps.length]);

  const handleSelect = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable full-screen mode: ${e.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="flex flex-col h-screen bg-blue-50 select-none">
      {/* Header */}
      {!isFullscreen && (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="text-4xl">📖</div>
            <h1 className="text-2xl font-bold text-blue-600">Kleuter Flipboek</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-bold">
              {currentIndex + 1} / {apps.length}
            </span>
            <button 
              onClick={toggleFullscreen}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
              title="Volledig Scherm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </header>
      )}

      {/* Main View Area */}
      <main className="flex-1 flex flex-col md:flex-row relative overflow-hidden p-4 gap-4">
        {/* Navigation Arrows for desktop/tablet */}
        <div className="hidden md:flex items-center">
          <button 
            onClick={handlePrev}
            className="w-20 h-20 rounded-full bg-white shadow-lg border-4 border-blue-400 flex items-center justify-center text-4xl text-blue-500 hover:scale-110 active:scale-95 transition-transform"
          >
            ⬅️
          </button>
        </div>

        {/* The Flipbook Viewer */}
        <div className="flex-1 bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-white relative perspective-1000">
          <FlipbookViewer app={apps[currentIndex]} />
        </div>

        <div className="hidden md:flex items-center">
          <button 
            onClick={handleNext}
            className="w-20 h-20 rounded-full bg-white shadow-lg border-4 border-blue-400 flex items-center justify-center text-4xl text-blue-500 hover:scale-110 active:scale-95 transition-transform"
          >
            ➡️
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between gap-4">
           <button 
            onClick={handlePrev}
            className="flex-1 py-4 rounded-2xl bg-white shadow-md border-2 border-blue-300 flex items-center justify-center text-3xl"
          >
            ⬅️
          </button>
          <button 
            onClick={handleNext}
            className="flex-1 py-4 rounded-2xl bg-white shadow-md border-2 border-blue-300 flex items-center justify-center text-3xl"
          >
            ➡️
          </button>
        </div>
      </main>

      {/* App Selection Shelf */}
      {!isFullscreen && (
        <NavigationShelf 
          apps={apps} 
          activeIndex={currentIndex} 
          onSelect={handleSelect} 
        />
      )}
    </div>
  );
};

export default App;
