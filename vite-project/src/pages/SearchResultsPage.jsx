import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';

// Sample property data
const sampleProperties = [
  {
    id: 1,
    title: "Modern Apartment with City View",
    location: "Downtown, New York",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "apartment",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    description: "Stunning modern apartment with panoramic city views, featuring hardwood floors, stainless steel appliances, and a spacious balcony.",
    amenities: ["Elevator", "Gym", "Parking", "Air Conditioning", "Heating", "Washer/Dryer"],
    isNew: true,
  },
  {
    id: 2,
    title: "Spacious Family Home",
    location: "Suburbs, Chicago",
    price: 3800,
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    type: "house",
    images: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    description: "Beautiful family home in a quiet neighborhood with a large backyard, modern kitchen, and finished basement.",
    amenities: ["Garage", "Backyard", "Fireplace", "Central Heating", "Central Air", "Dishwasher"],
    isNew: false,
  },
  {
    id: 3,
    title: "Downtown Loft",
    location: "Arts District, Los Angeles",
    price: 2200,
    bedrooms: 1,
    bathrooms: 1,
    area: 950,
    type: "loft",
    images: [
      "https://images.unsplash.com/photo-1560448075-57d0285fc803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80",
    ],
    description: "Industrial-style loft with high ceilings, exposed brick walls, and modern finishes in the heart of the Arts District.",
    amenities: ["Elevator", "Rooftop Deck", "Pet Friendly", "In-unit Laundry", "Security System"],
    isNew: true,
  },
  {
    id: 4,
    title: "Luxury Beachfront Condo",
    location: "Miami Beach, FL",
    price: 5500,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: "condo",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    description: "Stunning beachfront condo with unobstructed ocean views, featuring a gourmet kitchen, marble bathrooms, and a large balcony.",
    amenities: ["Swimming Pool", "Hot Tub", "Gym", "24/7 Security", "Valet Parking", "Private Beach Access"],
    isNew: false,
  },
  {
    id: 5,
    title: "Cozy Studio Apartment",
    location: "Downtown, Seattle",
    price: 1800,
    bedrooms: 0,
    bathrooms: 1,
    area: 550,
    type: "studio",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2339&q=80",
      "https://images.unsplash.com/photo-1583845112203-29329902332e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    ],
    description: "Charming studio apartment in the heart of downtown Seattle, perfect for singles or couples. Features modern finishes and great natural light.",
    amenities: ["Elevator", "Laundry Facilities", "Bike Storage", "Rooftop Lounge", "Close to Transit"],
    isNew: true,
  },
  {
    id: 6,
    title: "Victorian Townhouse",
    location: "Historic District, Boston",
    price: 4200,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2100,
    type: "townhouse",
    images: [
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    ],
    description: "Beautifully restored Victorian townhouse with original hardwood floors, high ceilings, and modern updates in Boston's historic district.",
    amenities: ["Private Garden", "Fireplace", "Period Details", "Updated Kitchen", "Basement Storage"],
    isNew: false,
  },
  {
    id: 7,
    title: "Mountain View Cabin",
    location: "Aspen, Colorado",
    price: 3900,
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    type: "cabin",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2765&q=80",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    description: "Rustic yet luxurious cabin with breathtaking mountain views, hot tub, and easy access to ski slopes and hiking trails.",
    amenities: ["Hot Tub", "Fireplace", "Mountain Views", "Ski Storage", "Deck", "BBQ Grill"],
    isNew: false,
  },
  {
    id: 8,
    title: "Contemporary Penthouse",
    location: "Financial District, San Francisco",
    price: 7800,
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
    type: "penthouse",
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7ddd0d03d62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    description: "Stunning penthouse with floor-to-ceiling windows offering panoramic views of the city and bay. Features gourmet kitchen and private terrace.",
    amenities: ["Concierge", "Private Terrace", "Wine Cellar", "Smart Home System", "Private Elevator", "Gym Access"],
    isNew: true,
  },
];

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  // Initial data load
  useEffect(() => {
    // In a real app, this would be an API call with the search parameters
    setProperties(sampleProperties);
  }, []);

  // Apply filters from URL params
  useEffect(() => {
    if (properties.length === 0) return;

    let filtered = [...properties];
    
    // Get filters from URL
    const searchQuery = searchParams.get('q')?.toLowerCase();
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedrooms = searchParams.get('bedrooms');
    const propertyType = searchParams.get('type');
    
    // Apply filters
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchQuery) || 
        property.location.toLowerCase().includes(searchQuery)
      );
    }
    
    if (minPrice) {
      filtered = filtered.filter(property => property.price >= parseInt(minPrice));
    }
    
    if (maxPrice) {
      filtered = filtered.filter(property => property.price <= parseInt(maxPrice));
    }
    
    if (bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(bedrooms));
    }
    
    if (propertyType) {
      filtered = filtered.filter(property => property.type === propertyType);
    }

    // Apply sorting
    filtered = sortProperties(filtered, sortOption);
    
    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchParams, properties, sortOption]);

  const sortProperties = (propertiesToSort, option) => {
    switch (option) {
      case 'price-high':
        return [...propertiesToSort].sort((a, b) => b.price - a.price);
      case 'price-low':
        return [...propertiesToSort].sort((a, b) => a.price - b.price);
      case 'newest':
        return [...propertiesToSort].sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
      default:
        return propertiesToSort;
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handlePropertyClick = (id) => {
    navigate(`/property/${id}`);
  };

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Results</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Refine Your Search</h2>
            <PropertyFilters />
          </div>
        </aside>
        <main className="lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-gray-600 font-medium">
              Showing <span className="font-semibold">{filteredProperties.length}</span> properties
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-600 whitespace-nowrap">Sort by:</label>
                <select 
                  id="sort" 
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="price-low">Price (Low to High)</option>
                </select>
              </div>
              
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}
                  onClick={() => handleViewModeChange('grid')}
                  aria-label="Grid view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                </button>
                <button 
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-blue-600' : 'text-gray-600'}`}
                  onClick={() => handleViewModeChange('list')}
                  aria-label="List view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search filters to find more properties.</p>
            </div>
          )}
          
          
          {filteredProperties.length > 0 && (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-6"
            }>
              {currentProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onClick={() => handlePropertyClick(property.id)}
                  listView={viewMode === 'list'}
                />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {filteredProperties.length > propertiesPerPage && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-l-md border border-gray-300 ${
                    currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  
                  if (
                    pageNumber === 1 || 
                    pageNumber === totalPages || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`px-3 py-2 border-t border-b border-gray-300 ${
                          currentPage === pageNumber 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  
                  // Add ellipsis
                  if (
                    (pageNumber === currentPage - 2 && pageNumber > 1) || 
                    (pageNumber === currentPage + 2 && pageNumber < totalPages)
                  ) {
                    return (
                      <span key={pageNumber} className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-700">
                        ...
                      </span>
                    );
                  }
                  
                  return null;
                })}
                
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-r-md border border-gray-300 ${
                    currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResultsPage; 