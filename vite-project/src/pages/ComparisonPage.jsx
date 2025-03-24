import React from 'react';
import PropertyComparisonTable from '../components/PropertyComparisonTable';
import { Link } from 'react-router-dom';
import { useComparisonContext } from '../context/useComparisonContext';

const ComparisonPage = () => {
  const { comparisonList } = useComparisonContext();

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Comparison</h1>
          <p className="text-gray-600">
            Compare {comparisonList.length === 0 ? 'properties' : `${comparisonList.length} ${comparisonList.length === 1 ? 'property' : 'properties'}`} side by side to make the best decision
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link 
            to="/search" 
            className="inline-flex items-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse More Properties
          </Link>
        </div>
      </div>

      {/* Comparison Table */}
      <PropertyComparisonTable />

      {/* Helpful Tips Section */}
      {comparisonList.length > 0 && (
        <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tips for Comparing Properties
          </h3>
          <ul className="text-blue-700 space-y-2 ml-7 list-disc">
            <li>Focus on properties within the same area for a fair comparison</li>
            <li>Consider the price per square foot to evaluate value</li>
            <li>Pay attention to property age and recent renovations</li>
            <li>Compare neighborhood amenities and nearby services</li>
            <li>Use the print option to save your comparison for later reference</li>
          </ul>
        </div>
      )}

      {/* Recently Viewed Section - could be expanded in future */}
      {comparisonList.length === 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Not sure what to compare?</h2>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center space-x-4 text-center">
              <div className="flex-1 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="font-medium text-gray-800 mb-1">Search Properties</h3>
                <p className="text-sm text-gray-500 mb-3">Find homes that match your criteria</p>
                <Link to="/search" className="text-blue-600 text-sm font-medium hover:underline">
                  Start Searching
                </Link>
              </div>
              
              <div className="flex-1 p-4 border-l border-r border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h3 className="font-medium text-gray-800 mb-1">Check Favorites</h3>
                <p className="text-sm text-gray-500 mb-3">Compare properties you've saved</p>
                <Link to="/favorites" className="text-blue-600 text-sm font-medium hover:underline">
                  View Favorites
                </Link>
              </div>
              
              <div className="flex-1 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                </svg>
                <h3 className="font-medium text-gray-800 mb-1">Featured Properties</h3>
                <p className="text-sm text-gray-500 mb-3">Explore our top recommendations</p>
                <Link to="/" className="text-blue-600 text-sm font-medium hover:underline">
                  View Featured
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonPage; 