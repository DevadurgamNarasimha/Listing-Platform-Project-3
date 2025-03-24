import React, { useState } from 'react';
import { FilterContext } from './FilterContextAPI';

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    propertyType: [],
    priceRange: { min: 0, max: 2000000 },
    bedrooms: [],
    bathrooms: [],
    amenities: [],
    location: {
      city: '',
      zipCode: '',
      coordinates: null,
      radius: 10 // in km
    },
    squareFootage: { min: 0, max: 5000 }
  });

  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  // Update filters function
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Reset filters function
  const resetFilters = () => {
    setFilters({
      propertyType: [],
      priceRange: { min: 0, max: 2000000 },
      bedrooms: [],
      bathrooms: [],
      amenities: [],
      location: {
        city: '',
        zipCode: '',
        coordinates: null,
        radius: 10
      },
      squareFootage: { min: 0, max: 5000 }
    });
    setSortBy('newest');
  };

  return (
    <FilterContext.Provider value={{
      filters,
      updateFilters,
      resetFilters,
      sortBy,
      setSortBy,
      viewMode,
      setViewMode
    }}>
      {children}
    </FilterContext.Provider>
  );
}; 