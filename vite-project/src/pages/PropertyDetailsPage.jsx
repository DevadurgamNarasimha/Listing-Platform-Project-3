import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../context/useFavoritesContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Sample property data (would come from an API in a real application)
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
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    description: "Stunning modern apartment with panoramic city views, featuring hardwood floors, stainless steel appliances, and a spacious balcony. This newly renovated unit offers an open floor plan with abundant natural light. The building includes a fitness center, rooftop lounge, and 24-hour doorman service. Located in a vibrant neighborhood with easy access to restaurants, shops, and public transportation.",
    amenities: ["Elevator", "Gym", "Parking", "Air Conditioning", "Heating", "Washer/Dryer"],
    isNew: true,
    coordinates: [40.7128, -74.0060], // New York coordinates
    nearbyPlaces: [
      { name: "Central Park", type: "park", distance: "1.2 miles" },
      { name: "Metropolitan Museum", type: "culture", distance: "0.8 miles" },
      { name: "Whole Foods Market", type: "grocery", distance: "0.3 miles" },
      { name: "Public School 123", type: "education", distance: "0.5 miles" },
      { name: "Downtown Medical Center", type: "medical", distance: "0.7 miles" },
    ],
    agentInfo: {
      name: "Sarah Johnson",
      phone: "(212) 555-1234",
      email: "sarah.johnson@realestateagency.com",
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    floorPlan: "https://cdn.mos.cms.futurecdn.net/pZvj5e3aESS2zXQqft2ZZ7.jpg",
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
    coordinates: [41.8781, -87.6298], // Chicago coordinates
    nearbyPlaces: [
      { name: "Lincoln Park", type: "park", distance: "1.5 miles" },
      { name: "Local High School", type: "education", distance: "0.7 miles" },
      { name: "Neighborhood Market", type: "grocery", distance: "0.4 miles" },
    ],
    agentInfo: {
      name: "Michael Chen",
      phone: "(312) 555-6789",
      email: "michael.chen@realestateagency.com",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    floorPlan: "https://www.homestratosphere.com/wp-content/uploads/2019/02/floor-plan-craftsman-feb7-870x580.jpg",
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
    coordinates: [34.0522, -118.2437], // Los Angeles coordinates
    nearbyPlaces: [
      { name: "Modern Art Gallery", type: "culture", distance: "0.2 miles" },
      { name: "Organic Market", type: "grocery", distance: "0.5 miles" },
      { name: "Downtown Park", type: "park", distance: "0.7 miles" },
    ],
    agentInfo: {
      name: "Jessica Rodriguez",
      phone: "(213) 555-9876",
      email: "jessica.rodriguez@realestateagency.com",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
    },
    floorPlan: "https://assets.architecturaldesigns.com/plan_assets/325002884/original/23543JD_1_1553613011.gif",
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
    coordinates: [25.7617, -80.1918], // Miami coordinates
    nearbyPlaces: [
      { name: "South Beach", type: "recreation", distance: "0.1 miles" },
      { name: "Ocean Drive Restaurants", type: "dining", distance: "0.3 miles" },
      { name: "Luxury Shopping Mall", type: "shopping", distance: "0.8 miles" },
    ],
    agentInfo: {
      name: "Robert Thompson",
      phone: "(305) 555-4321",
      email: "robert.thompson@realestateagency.com",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    floorPlan: "https://www.decorilla.com/online-decorating/wp-content/uploads/2021/12/Luxurious-Modern-Floor-Plans-With-Pool.jpg",
  },
];

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I\'m interested in this property and would like more information.',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Fetch property data
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProperty = sampleProperties.find(p => p.id === parseInt(id));
    setProperty(foundProperty);
  }, [id]);

  if (!property) {
    return <div className="container mx-auto px-4 py-8">Loading property details...</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would be an API call to send the inquiry
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Property Title and Basic Info */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <p className="text-xl text-gray-600 mb-2">{property.location}</p>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span>{property.bedrooms} Beds</span>
            <span>•</span>
            <span>{property.bathrooms} Baths</span>
            <span>•</span>
            <span>{property.area} sq ft</span>
          </div>
        </div>
        <div className="flex flex-col items-end mt-4 md:mt-0">
          <span className="text-3xl font-bold text-blue-600">${property.price}/month</span>
          <button 
            onClick={handleFavoriteToggle}
            className={`mt-2 flex items-center space-x-1 px-3 py-1 rounded-full border ${isFavorite(property.id) ? 'bg-red-100 text-red-600 border-red-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill={isFavorite(property.id) ? "currentColor" : "none"}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isFavorite(property.id) ? 0 : 1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span>{isFavorite(property.id) ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
      
      {/* Image Gallery */}
      <div className="relative mb-10 rounded-xl overflow-hidden bg-gray-100 h-[400px] md:h-[500px]">
        <img 
          src={property.images[currentImageIndex]} 
          alt={`${property.title} - image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Image Navigation */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button 
            onClick={prevImage}
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-800"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextImage}
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-800"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {property.images.length}
        </div>
      </div>
      
      {/* Two Column Layout for Details and Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details - 2 columns */}
        <div className="lg:col-span-2">
          {/* Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About this property</h2>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </section>
          
          {/* Amenities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </section>
          
          {/* Floor Plan */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Floor Plan</h2>
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <img 
                src={property.floorPlan} 
                alt={`Floor plan for ${property.title}`}
                className="w-full h-auto"
              />
            </div>
          </section>
          
          {/* Location and Map */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Location</h2>
            <div className="bg-gray-100 rounded-xl overflow-hidden h-[400px] mb-4">
              <MapContainer 
                center={property.coordinates} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={property.coordinates}>
                  <Popup>
                    {property.title} <br /> {property.location}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            
            {/* Nearby Places */}
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Nearby Places</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {property.nearbyPlaces.map((place, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">{place.name}</p>
                    <p className="text-gray-500 text-sm">{place.type} • {place.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        {/* Contact Form and Agent Info - 1 column */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 sticky top-4">
            {formSubmitted ? (
              <div className="text-center py-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-green-500 mx-auto mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Inquiry Sent!</h3>
                <p className="text-gray-600 mb-4">Thanks for your interest. The agent will contact you shortly.</p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="text-blue-600 font-medium"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact the Agent</h2>
                
                {/* Agent Info */}
                <div className="flex items-center space-x-3 mb-6">
                  <img 
                    src={property.agentInfo.photo} 
                    alt={property.agentInfo.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{property.agentInfo.name}</h3>
                    <p className="text-gray-500 text-sm">{property.agentInfo.phone}</p>
                    <p className="text-gray-500 text-sm">{property.agentInfo.email}</p>
                  </div>
                </div>
                
                {/* Contact Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your name"
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your email"
                    />
                    {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your phone number"
                    />
                    {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-md ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                    ></textarea>
                    {formErrors.message && <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
                  >
                    Contact Agent
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage; 