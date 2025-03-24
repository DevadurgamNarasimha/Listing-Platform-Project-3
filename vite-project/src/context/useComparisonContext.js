import { useContext } from 'react';
import { ComparisonContext } from './comparisonContextApi';

// Custom hook to use the comparison context
export const useComparisonContext = () => {
  const context = useContext(ComparisonContext);
  
  if (context === undefined) {
    throw new Error('useComparisonContext must be used within a ComparisonProvider');
  }
  
  return context;
}; 