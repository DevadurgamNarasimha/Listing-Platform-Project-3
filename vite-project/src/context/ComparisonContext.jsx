import React, { useState, useEffect } from "react";
import { ComparisonContext } from './comparisonContextApi';

// Create the provider component
export const ComparisonProvider = ({ children }) => {
  // Get comparison list from local storage or initialize as empty array
  const [comparisonList, setComparisonList] = useState(() => {
    const savedComparisonList = localStorage.getItem('comparisonList');
    return savedComparisonList ? JSON.parse(savedComparisonList) : [];
  });

  // Maximum number of properties that can be compared at once
  const MAX_COMPARISON_ITEMS = 4;

  // Save to local storage whenever the comparison list changes
  useEffect(() => {
    localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
  }, [comparisonList]);

  // Check if a property is in the comparison list
  const isInComparison = (propertyId) => {
    return comparisonList.some(property => property.id === propertyId);
  };

  // Add a property to the comparison list
  const addToComparison = (property) => {
    if (isInComparison(property.id)) {
      return; // Already in comparison list
    }

    if (comparisonList.length >= MAX_COMPARISON_ITEMS) {
      alert(`You can only compare up to ${MAX_COMPARISON_ITEMS} properties at once.`);
      return;
    }

    setComparisonList(prevList => [...prevList, property]);
  };

  // Remove a property from the comparison list
  const removeFromComparison = (propertyId) => {
    setComparisonList(prevList => 
      prevList.filter(property => property.id !== propertyId)
    );
  };

  // Clear the entire comparison list
  const clearComparisonList = () => {
    setComparisonList([]);
  };

  // Context value
  const contextValue = {
    comparisonList,
    isInComparison,
    addToComparison,
    removeFromComparison,
    clearComparisonList,
    maxComparisonItems: MAX_COMPARISON_ITEMS
  };

  return (
    <ComparisonContext.Provider value={contextValue}>
      {children}
    </ComparisonContext.Provider>
  );
}; 