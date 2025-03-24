import React, { useState } from 'react';
import { useFilterContext } from '../context/useFilterContext';
import PriceRangeSlider from './PriceRangeSlider';
import { LocationIcon, PriceIcon } from './icons'; // Assuming you save the icons in an icons.js file

const SearchFilter = () => {
  const { filters, updateFilters, resetFilters } = useFilterContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa', 'Land', 'Commercial'];
  const bedroomOptions = ['Studio', '1', '2', '3', '4', '5+'];
  const bathroomOptions = ['1', '1.5', '2', '2.5', '3', '3.5+'];
  const amenities = [
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'garden', label: 'Garden' },
    { id: 'garage', label: 'Garage' },
    { id: 'gym', label: 'Gym' },
    { id: 'security', label: 'Security System' },
    { id: 'ac', label: 'Air Conditioning' },
    { id: 'furnished', label: 'Furnished' },
    { id: 'waterfront', label: 'Waterfront' },
    { id: 'pets', label: 'Pet Friendly' },
    { id: 'elevator', label: 'Elevator' }
  ];

  const handlePropertyTypeChange = (type) => {
    const updatedTypes = filters.propertyType.includes(type)
      ? filters.propertyType.filter(item => item !== type)
      : [...filters.propertyType, type];
    
    updateFilters({ propertyType: updatedTypes });
  };

  const handleBedroomChange = (bedroom) => {
    const updatedBedrooms = filters.bedrooms.includes(bedroom)
      ? filters.bedrooms.filter(item => item !== bedroom)
      : [...filters.bedrooms, bedroom];
    
    updateFilters({ bedrooms: updatedBedrooms });
  };

  const handleBathroomChange = (bathroom) => {
    const updatedBathrooms = filters.bathrooms.includes(bathroom)
      ? filters.bathrooms.filter(item => item !== bathroom)
      : [...filters.bathrooms, bathroom];
    
    updateFilters({ bathrooms: updatedBathrooms });
  };

  const handleAmenityChange = (amenityId) => {
    const updatedAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter(item => item !== amenityId)
      : [...filters.amenities, amenityId];
    
    updateFilters({ amenities: updatedAmenities });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ 
      location: {
        ...filters.location,
        [name]: value
      }
    });
  };

  const handlePriceChange = (priceRange) => {
    updateFilters({ priceRange });
  };

  const handleAreaChange = (squareFootage) => {
    updateFilters({ squareFootage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleReset = () => {
    resetFilters();
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 border border-gray-200">
      {/* Filter Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800">Advanced Filters</h3>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-blue-600 focus:outline-none transition-colors duration-200"
        >
          {isExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Collapsible Filter Content */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Property Type Section */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-3 border-b pb-2">Property Type</h4>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handlePropertyTypeChange(type)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border border-gray-200 
                      ${filters.propertyType.includes(type) 
                        ? 'bg-blue-500 text-white border-transparent' 
                        : 'bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-3 border-b pb-2">Location</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <LocationIcon />
                  <input
                    type="text"
                    name="city"
                    value={filters.location.city}
                    onChange={handleLocationChange}
                    placeholder="City"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex items-center">
                  <PriceIcon />
                  <input
                    type="text"
                    name="zipCode"
                    value={filters.location.zipCode}
                    onChange={handleLocationChange}
                    placeholder="Zip Code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="radius"
                    min="1"
                    max="50"
                    value={filters.location.radius}
                    onChange={handleLocationChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 min-w-12">{filters.location.radius} km</span>
                </div>
              </div>
            </div>

            {/* Price Range Section */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-3 border-b pb-2">Price Range</h4>
              <div className="px-2">
                <PriceRangeSlider
                  min={0}
                  max={2000000}
                  value={filters.priceRange}
                  onChange={handlePriceChange}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${filters.priceRange.min.toLocaleString()}</span>
                  <span>${filters.priceRange.max.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Bedrooms Section */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-3 border-b pb-2">Bedrooms</h4>
              <div className="flex flex-wrap gap-2">
                {bedroomOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleBedroomChange(option)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border border-gray-200 
                      ${filters.bedrooms.includes(option) 
                        ? 'bg-blue-500 text-white border-transparent' 
                        : 'bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms Section */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-3 border-b pb-2">Bathrooms</h4>
              <div className="flex flex-wrap gap-2">
                {bathroomOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleBathroomChange(option)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border border-gray-200 
                      ${filters.bathrooms.includes(option) 
                        ? 'bg-blue-500 text-white border-transparent' 
                        : 'bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Area/Sq. Ft Section */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-3 border-b pb-2">Square Footage</h4>
              <div className="px-2">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">Min</label>
                    <input
                      type="number"
                      value={filters.squareFootage.min}
                      onChange={(e) => handleAreaChange({ ...filters.squareFootage, min: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      min="0"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">Max</label>
                    <input
                      type="number"
                      value={filters.squareFootage.max}
                      onChange={(e) => handleAreaChange({ ...filters.squareFootage, max: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      min="0"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Square feet</p>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="mt-8">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-3 border-b pb-2">Amenities</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {amenities.map(amenity => (
                <label key={amenity.id} className="flex items-center space-x-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id={amenity.id}
                      checked={filters.amenities.includes(amenity.id)}
                      onChange={() => handleAmenityChange(amenity.id)}
                      className="opacity-0 absolute h-5 w-5 cursor-pointer"
                    />
                    <div className={`border-2 rounded-md w-5 h-5 flex flex-shrink-0 justify-center items-center transition-colors duration-200 
                      ${filters.amenities.includes(amenity.id) 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'border-gray-300 group-hover:border-blue-300'}`}
                    >
                      <svg className={`fill-current w-3 h-3 text-white pointer-events-none ${filters.amenities.includes(amenity.id) ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 20 20">
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-gray-700">{amenity.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 bg-white hover:bg-gray-50 transition-colors font-medium flex items-center space-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset</span>
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm 
                transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'} 
                flex items-center space-x-1`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Apply Filters</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Summary of Active Filters - Always Visible */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Active filters:</span>
          
          {filters.propertyType.length === 0 && 
           filters.bedrooms.length === 0 && 
           filters.bathrooms.length === 0 && 
           filters.amenities.length === 0 && 
           !filters.location.city && 
           !filters.location.zipCode && 
           filters.priceRange.min === 0 && 
           filters.priceRange.max === 2000000 && 
           filters.squareFootage.min === 0 && 
           filters.squareFootage.max === 5000 ? (
            <span className="text-sm text-gray-500 italic">None</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {filters.propertyType.map(type => (
                <div key={type} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                  {type}
                  <button 
                    onClick={() => handlePropertyTypeChange(type)}
                    className="ml-1 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-600 hover:text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Show only if custom price range */}
              {(filters.priceRange.min > 0 || filters.priceRange.max < 2000000) && (
                <div className="bg-green-100 text-green-80 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                  ${filters.priceRange.min.toLocaleString()} - ${filters.priceRange.max.toLocaleString()}
                </div>
              )}

              {/* Other active filters */}
              {/* Add similar badges for bedrooms, bathrooms, etc. */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter; 