import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/useFavoritesContext';
import PropertyCard from '../components/PropertyCard';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();
  const [selectedProperties, setSelectedProperties] = useState([]);
  
  const handlePropertyClick = (id) => {
    navigate(`/property/${id}`);
  };

  const handleSelectProperty = (id) => {
    setSelectedProperties(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(propId => propId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleCompareClick = () => {
    if (selectedProperties.length >= 2) {
      navigate('/compare');
    }
  };

  const handleRemoveAll = () => {
    if (window.confirm('Are you sure you want to remove all properties from your favorites?')) {
      favorites.forEach(property => removeFromFavorites(property.id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Favorites</h1>
          <p className="text-gray-600">You have {favorites.length} saved properties</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          {selectedProperties.length >= 2 && (
            <button 
              onClick={handleCompareClick} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Compare Selected ({selectedProperties.length})
            </button>
          )}
          
          {favorites.length > 0 && (
            <button 
              onClick={handleRemoveAll} 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-200"
            >
              Remove All
            </button>
          )}
        </div>
      </div>
      
      {favorites.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Favorite Properties Yet</h2>
          <p className="text-gray-600 mb-6">Start browsing and save properties that interest you.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Browse Properties
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(property => (
            <div key={property.id} className="relative">
              <div className="absolute top-3 left-3 z-10">
                <input
                  type="checkbox"
                  id={`select-${property.id}`}
                  checked={selectedProperties.includes(property.id)}
                  onChange={() => handleSelectProperty(property.id)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <PropertyCard 
                property={property} 
                onClick={() => handlePropertyClick(property.id)}
                onRemoveFavorite={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(property.id);
                }}
                showRemoveButton
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Selection guidance */}
      {favorites.length > 0 && selectedProperties.length < 2 && (
        <div className="mt-8 p-4 bg-blue-50 rounded-md text-blue-800">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-0.5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <p>
              Select at least 2 properties to compare them side by side.
              {selectedProperties.length === 1 ? ' You\'ve selected 1 property so far.' : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage; 