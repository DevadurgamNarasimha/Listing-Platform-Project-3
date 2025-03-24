import React from 'react';
import PropertyFilters from '../components/PropertyFilters';
import PropertyCard from '../components/PropertyCard';
import { useNavigate } from 'react-router-dom';

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
];

const HomePage = () => {
  const navigate = useNavigate();

  const handlePropertyClick = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Property</h1>
        <p className="text-xl text-gray-600">Browse through thousands of properties for sale and rent</p>
      </div>
      
      <PropertyFilters />
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onClick={() => handlePropertyClick(property.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-16 bg-gray-50 rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Our Platform?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4 text-4xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">Browse thousands of properties across various locations and budgets.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4 text-4xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Filters</h3>
            <p className="text-gray-600">Find exactly what you're looking for with our detailed search filters.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 mb-4 text-4xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Virtual Tours</h3>
            <p className="text-gray-600">Experience properties from the comfort of your home with our virtual tours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 