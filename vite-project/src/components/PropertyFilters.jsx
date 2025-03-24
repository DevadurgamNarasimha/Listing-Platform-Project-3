import React, { useState } from 'react';
import { useFilterContext } from '../context/useFilterContext';

const PropertyFilters = () => {
  const { filters, updateFilters, resetFilters } = useFilterContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [minPrice, setMinPrice] = useState(filters.priceRange.min);
  const [maxPrice, setMaxPrice] = useState(filters.priceRange.max);
  const [minArea, setMinArea] = useState(filters.squareFootage.min);
  const [maxArea, setMaxArea] = useState(filters.squareFootage.max);

  const propertyTypes = [
    { id: 'apartment', label: 'Apartment', icon: '🏢' },
    { id: 'house', label: 'House', icon: '🏠' },
    { id: 'condo', label: 'Condo', icon: '🏙️' },
    { id: 'townhouse', label: 'Townhouse', icon: '🏘️' },
    { id: 'penthouse', label: 'Penthouse', icon: '🌇' },
    { id: 'studio', label: 'Studio', icon: '🏛️' }
  ];

  const bedroomOptions = [0, 1, 2, 3, 4, 5];
  const bathroomOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4];

  const amenityOptions = [
    { id: 'pool', label: 'Swimming Pool', icon: '🏊' },
    { id: 'gym', label: 'Gym', icon: '💪' },
    { id: 'parking', label: 'Parking', icon: '🚗' },
    { id: 'elevator', label: 'Elevator', icon: '🔼' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'garden', label: 'Garden', icon: '🌳' },
    { id: 'balcony', label: 'Balcony', icon: '☀️' },
    { id: 'fireplace', label: 'Fireplace', icon: '🔥' },
    { id: 'aircon', label: 'Air Conditioning', icon: '❄️' },
    { id: 'pet-friendly', label: 'Pet Friendly', icon: '🐾' },
    { id: 'laundry', label: 'Laundry', icon: '👕' },
    { id: 'furnished', label: 'Furnished', icon: '🛋️' }
  ];

  const handlePropertyTypeChange = (type) => {
    let newTypes;
    if (filters.propertyType.includes(type)) {
      newTypes = filters.propertyType.filter(t => t !== type);
    } else {
      newTypes = [...filters.propertyType, type];
    }
    updateFilters({ propertyType: newTypes });
  };

  const handleBedroomChange = (count) => {
    let newBedrooms;
    if (filters.bedrooms.includes(count)) {
      newBedrooms = filters.bedrooms.filter(b => b !== count);
    } else {
      newBedrooms = [...filters.bedrooms, count];
    }
    updateFilters({ bedrooms: newBedrooms });
  };

  const handleBathroomChange = (count) => {
    let newBathrooms;
    if (filters.bathrooms.includes(count)) {
      newBathrooms = filters.bathrooms.filter(b => b !== count);
    } else {
      newBathrooms = [...filters.bathrooms, count];
    }
    updateFilters({ bathrooms: newBathrooms });
  };

  const handleAmenityChange = (amenity) => {
    let newAmenities;
    if (filters.amenities.includes(amenity)) {
      newAmenities = filters.amenities.filter(a => a !== amenity);
    } else {
      newAmenities = [...filters.amenities, amenity];
    }
    updateFilters({ amenities: newAmenities });
  };

  const handlePriceRangeApply = () => {
    updateFilters({
      priceRange: { min: minPrice, max: maxPrice }
    });
  };

  const handleSquareFootageApply = () => {
    updateFilters({
      squareFootage: { min: minArea, max: maxArea }
    });
  };

  const handleLocationChange = (e) => {
    updateFilters({
      location: {
        ...filters.location,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleStatusChange = (status) => {
    updateFilters({ status });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    
    if (filters.propertyType.length > 0) count++;
    if (filters.bedrooms.length > 0) count++;
    if (filters.bathrooms.length > 0) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.location.city || filters.location.zipCode) count++;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 2000000) count++;
    if (filters.squareFootage.min > 0 || filters.squareFootage.max < 10000) count++;
    if (filters.status !== 'all') count++;
    
    return count;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Collapsible Header */}
      <div 
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          <h2 className="text-xl font-semibold">Filters</h2>
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isCollapsed ? '' : 'transform rotate-180'}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Filter Content */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-100">
          {/* Status */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
              <span className="mr-2">Status</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </h3>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filters.status === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleStatusChange('all')}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filters.status === 'for-sale'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleStatusChange('for-sale')}
              >
                For Sale
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filters.status === 'for-rent'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleStatusChange('for-rent')}
              >
                For Rent
              </button>
            </div>
          </div>

          {/* Property Type */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Property Type</h3>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map(type => (
                <button
                  key={type.id}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.propertyType.includes(type.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handlePropertyTypeChange(type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
              <span className="mr-2">Price Range</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Min Price</label>
                  <input
                    type="number"
                    min="0"
                    max={maxPrice}
                    value={minPrice}
                    onChange={e => setMinPrice(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Max Price</label>
                  <input
                    type="number"
                    min={minPrice}
                    max="10000000"
                    value={maxPrice}
                    onChange={e => setMaxPrice(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={handlePriceRangeApply}
                className="self-end px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Apply
              </button>
              <div className="relative pt-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>${filters.priceRange.min.toLocaleString()}</span>
                  <span>${filters.priceRange.max.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Bedrooms</h3>
            <div className="flex flex-wrap gap-2">
              {bedroomOptions.map(count => (
                <button
                  key={count}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.bedrooms.includes(count)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleBedroomChange(count)}
                >
                  {count === 0 ? 'Studio' : count}
                </button>
              ))}
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.bedrooms.includes(6)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleBedroomChange(6)}
              >
                6+
              </button>
            </div>
          </div>

          {/* Bathrooms */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Bathrooms</h3>
            <div className="flex flex-wrap gap-2">
              {bathroomOptions.map(count => (
                <button
                  key={count}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.bathrooms.includes(count)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleBathroomChange(count)}
                >
                  {count}
                </button>
              ))}
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.bathrooms.includes(5)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleBathroomChange(5)}
              >
                5+
              </button>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              {amenityOptions.map(amenity => (
                <div key={amenity.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`amenity-${amenity.id}`}
                    checked={filters.amenities.includes(amenity.id)}
                    onChange={() => handleAmenityChange(amenity.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`amenity-${amenity.id}`}>{amenity.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Location</h3>
            <div className="space-y-3">
              <div>
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={filters.location.city}
                  onChange={handleLocationChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block mb-1">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={filters.location.zipCode}
                  onChange={handleLocationChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter zip code"
                />
              </div>
            </div>
          </div>

          {/* Square Footage */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
              <span className="mr-2">Square Footage</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Min Area (ft²)</label>
                  <input
                    type="number"
                    min="0"
                    max={maxArea}
                    value={minArea}
                    onChange={e => setMinArea(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Max Area (ft²)</label>
                  <input
                    type="number"
                    min={minArea}
                    max="50000"
                    value={maxArea}
                    onChange={e => setMaxArea(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={handleSquareFootageApply}
                className="self-end px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Apply
              </button>
              <div className="relative pt-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{filters.squareFootage.min.toLocaleString()} ft²</span>
                  <span>{filters.squareFootage.max.toLocaleString()} ft²</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Reset All
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;