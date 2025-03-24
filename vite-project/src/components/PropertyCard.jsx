import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/useFavoritesContext';
import { useComparisonContext } from '../context/useComparisonContext';

const PropertyCard = ({ property }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInComparison, addToComparison, removeFromComparison } = useComparisonContext();
  
  const isPropertyFavorite = isFavorite(property.id);
  const isPropertyInComparison = isInComparison(property.id);

  // Format price with comma separators and handle rental properties
  const formatPrice = () => {
    if (!property.price) return 'Price on Request';
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(property.price);
    
    return property.status === 'for-rent' 
      ? `${formattedPrice}/mo` 
      : formattedPrice;
  };

  // Handle comparison toggle
  const handleComparisonToggle = () => {
    if (isPropertyInComparison) {
      removeFromComparison(property.id);
    } else {
      addToComparison(property);
    }
  };

  return (
    <div className="group property-card relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {/* Property image with gradient overlay */}
        <Link to={`/property/${property.id}`}>
          <div className="relative h-full w-full">
            <img 
              src={property.images[0]} 
              alt={property.title} 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
          </div>
        </Link>

        {/* New/Featured badges */}
        <div className="absolute left-4 top-4 flex gap-2">
          {property.isNew && (
            <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
              NEW
            </span>
          )}
          {property.featured && (
            <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
              FEATURED
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(property)}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-md transition-transform duration-200 hover:scale-110 hover:bg-white"
          aria-label={isPropertyFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isPropertyFavorite ? "#ef4444" : "none"}
            stroke={isPropertyFavorite ? "#ef4444" : "currentColor"}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={isPropertyFavorite ? 0 : 1.5}
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Price tag - now overlaid on the image at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <span className="text-2xl font-bold text-white drop-shadow-md">
            {formatPrice()}
          </span>
        </div>
      </div>

      {/* Property details */}
      <div className="p-4">
        <Link to={`/property/${property.id}`} className="group-hover:text-blue-600">
          <h3 className="text-lg font-bold leading-tight transition-colors">{property.title}</h3>
        </Link>
        
        <p className="mt-1 flex items-center text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {property.location}
        </p>

        {/* Property features */}
        <div className="mt-3 flex justify-between gap-2 text-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>
              {property.type}
            </span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            <span>
              {property.bedrooms} <span className="hidden sm:inline">bed</span><span className="inline sm:hidden">b</span>
            </span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>
              {property.bathrooms} <span className="hidden sm:inline">bath</span><span className="inline sm:hidden">b</span>
            </span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            <span>
              {property.area} <span className="hidden sm:inline">sq ft</span><span className="inline sm:hidden">ft²</span>
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex w-full items-center justify-between">
          <Link 
            to={`/property/${property.id}`}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            View Details
          </Link>
          
          <button
            onClick={handleComparisonToggle}
            className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
              isPropertyInComparison
                ? 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ${isPropertyInComparison ? 'text-blue-600' : 'text-gray-500'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>{isPropertyInComparison ? 'Added' : 'Compare'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;