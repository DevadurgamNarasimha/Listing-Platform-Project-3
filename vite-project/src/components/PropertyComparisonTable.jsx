import React from 'react';
import { Link } from 'react-router-dom';
import { useComparisonContext } from '../context/useComparisonContext';

const PropertyComparisonTable = () => {
  const { comparisonList, removeFromComparison } = useComparisonContext();

  // Function to format price with K or M for thousands/millions
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    } else {
      return `$${price}`;
    }
  };

  // All possible amenities across all properties
  const getAllAmenities = () => {
    const allAmenities = new Set();
    comparisonList.forEach(property => {
      if (property.amenities && Array.isArray(property.amenities)) {
        property.amenities.forEach(amenity => allAmenities.add(amenity));
      }
    });
    return Array.from(allAmenities).sort();
  };

  // All possible features for comparison
  const features = [
    { id: 'price', label: 'Price', render: (property) => formatPrice(property.price) },
    { id: 'location', label: 'Location', render: (property) => property.location },
    { id: 'type', label: 'Property Type', render: (property) => property.propertyType || property.type || 'N/A' },
    { id: 'bedrooms', label: 'Bedrooms', render: (property) => property.bedrooms || 'N/A' },
    { id: 'bathrooms', label: 'Bathrooms', render: (property) => property.bathrooms || 'N/A' },
    { id: 'area', label: 'Square Footage', render: (property) => `${property.squareFootage || property.area || 'N/A'} sqft` },
    { id: 'status', label: 'Status', render: (property) => property.status === 'for-rent' ? 'For Rent' : 'For Sale' },
  ];

  if (comparisonList.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No Properties to Compare</h3>
        <p className="text-gray-600 mb-6">Add properties to your comparison list to see how they stack up against each other.</p>
        <Link to="/search" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-all duration-200">
          Browse Properties
        </Link>
      </div>
    );
  }

  const amenities = getAllAmenities();

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40 sticky left-0 bg-gray-50 z-10">
                Feature
              </th>
              {comparisonList.map((property, index) => (
                <th key={index} className="px-6 py-4 text-center min-w-[250px]">
                  <div className="relative">
                    <button 
                      onClick={() => removeFromComparison(property.id)}
                      className="absolute top-0 right-0 text-gray-400 hover:text-red-600 transition-colors p-1"
                      aria-label={`Remove ${property.title} from comparison`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <div className="mb-2">
                      <img 
                        src={property.images[0]} 
                        alt={property.title}
                        className="w-full h-40 object-cover rounded-md"
                      />
                    </div>
                    <Link to={`/property/${property.id}`} className="text-lg font-semibold text-blue-600 hover:underline block mb-1">
                      {property.title}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Main Features */}
            {features.map((feature) => (
              <tr key={feature.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-100">
                  {feature.label}
                </td>
                {comparisonList.map((property, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                    {feature.render(property)}
                  </td>
                ))}
              </tr>
            ))}

            {/* Amenities Section Header */}
            <tr className="bg-blue-50">
              <td colSpan={comparisonList.length + 1} className="px-6 py-3 text-left text-sm font-semibold text-blue-900">
                Amenities
              </td>
            </tr>

            {/* Amenities */}
            {amenities.map((amenity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-100">
                  {amenity}
                </td>
                {comparisonList.map((property, propIndex) => (
                  <td key={propIndex} className="px-6 py-4 whitespace-nowrap text-center">
                    {property.amenities && property.amenities.includes(amenity) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sticky footer with action buttons */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Comparing {comparisonList.length} properties</span>
          <div className="flex space-x-3">
            <Link 
              to="/search" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Add More Properties
            </Link>
            <button 
              onClick={() => window.print()}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyComparisonTable; 