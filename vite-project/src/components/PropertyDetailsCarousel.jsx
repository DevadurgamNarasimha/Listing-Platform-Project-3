import React, { useState, useEffect, useCallback } from 'react';

const PropertyDetailsCarousel = ({ images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentImageIndex]);

  // Image navigation functions
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  // Handle keyboard navigation in fullscreen mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, nextImage, prevImage]);

  // Jump to specific image
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Handle touch events for swiping on mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {/* Main image container */}
      <div 
        className={`relative overflow-hidden ${
          isFullscreen 
            ? 'h-screen flex items-center justify-center' 
            : 'h-[400px] md:h-[500px] rounded-xl bg-gray-100'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Current image */}
        <img 
          src={images[currentImageIndex]} 
          alt={`${title} - image ${currentImageIndex + 1}`}
          className={`w-full h-full object-contain transition-opacity duration-300 ${isFullscreen ? 'max-h-screen' : 'object-cover'}`}
          onLoad={() => setIsLoading(false)}
          style={{ opacity: isLoading ? 0 : 1 }}
        />
        
        {/* Image navigation arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button 
            onClick={prevImage}
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-800 transition-transform duration-200 hover:scale-110 focus:outline-none"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextImage}
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-800 transition-transform duration-200 hover:scale-110 focus:outline-none"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Image counter and fullscreen toggle */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
          <button 
            onClick={toggleFullscreen}
            className="bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition-colors focus:outline-none"
            aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Thumbnail navigation - Only show if not in fullscreen and has multiple images */}
      {!isFullscreen && images.length > 1 && (
        <div className="mt-4 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2">
            {images.map((image, index) => (
              <div 
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${
                  currentImageIndex === index 
                    ? 'ring-2 ring-blue-500 opacity-100 scale-105' 
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen backdrop */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-40" onClick={toggleFullscreen}></div>
      )}
    </div>
  );
};

export default PropertyDetailsCarousel; 