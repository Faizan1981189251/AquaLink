import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Shield, Clock, Zap } from 'lucide-react';

export default function Suppliers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'certified', label: 'Certified' },
    { id: 'nearby', label: 'Nearby' },
    { id: 'fastest', label: 'Fastest' },
    { id: 'cheapest', label: 'Cheapest' },
  ];

  const suppliers = [
    {
      id: 1,
      name: 'AquaPure Solutions',
      distance: '0.8 km',
      rating: 4.8,
      reviews: 1250,
      deliveryTime: '15-30 min',
      image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: true,
      price: '₹25/jar',
      tags: ['Premium Quality', 'Fast Delivery'],
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Crystal Water Co.',
      distance: '1.2 km',
      rating: 4.6,
      reviews: 890,
      deliveryTime: '20-35 min',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: true,
      price: '₹22/jar',
      tags: ['Eco-Friendly', 'Bulk Orders'],
      availability: 'Available'
    },
    {
      id: 3,
      name: 'Pure Drop Waters',
      distance: '1.5 km',
      rating: 4.7,
      reviews: 654,
      deliveryTime: '25-40 min',
      image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: false,
      price: '₹20/jar',
      tags: ['Budget Friendly', 'Local Supplier'],
      availability: 'Available'
    },
    {
      id: 4,
      name: 'Himalayan Springs',
      distance: '2.1 km',
      rating: 4.9,
      reviews: 2100,
      deliveryTime: '30-45 min',
      image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: true,
      price: '₹30/jar',
      tags: ['Natural Spring', 'Premium'],
      availability: 'Available'
    },
    {
      id: 5,
      name: 'Fresh Flow Water',
      distance: '2.8 km',
      rating: 4.5,
      reviews: 432,
      deliveryTime: '35-50 min',
      image: 'https://images.pexels.com/photos/1187766/pexels-photo-1187766.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: false,
      price: '₹18/jar',
      tags: ['Affordable', 'RO Purified'],
      availability: 'Busy'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Water Suppliers</h1>
        <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-1">
          <Search size={20} className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-3 text-base text-gray-900 bg-transparent outline-none"
          />
          <button className="p-2">
            <Filter size={20} className="text-blue-600" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">{suppliers.length} suppliers found</span>
        <button className="flex items-center bg-blue-50 px-3 py-2 rounded-xl">
          <MapPin size={16} className="text-blue-600 mr-1" />
          <span className="text-xs text-blue-600 font-medium">Map View</span>
        </button>
      </div>

      {/* Suppliers List */}
      <div className="px-6 py-2">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-2xl p-4 mb-4 flex shadow-md">
            <img src={supplier.image} alt={supplier.name} className="w-15 h-15 rounded-full mr-4" />
            
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-base font-semibold text-gray-900 flex-1">{supplier.name}</h3>
                {supplier.certified && (
                  <Shield size={16} className="text-green-600 ml-2" />
                )}
              </div>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-4">
                  <Star size={12} className="text-yellow-500 mr-1" />
                  <span className="text-xs text-gray-600">{supplier.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({supplier.reviews})</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={12} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-600">{supplier.distance}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {supplier.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 rounded-lg text-xs text-gray-600 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-600 mr-3">{supplier.deliveryTime}</span>
                  <div className={`px-2 py-1 rounded-lg ${
                    supplier.availability === 'Available' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    <span className="text-xs font-medium">{supplier.availability}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-base font-bold text-green-600 mr-3">{supplier.price}</span>
                  <button className="bg-blue-600 px-4 py-2 rounded-xl flex items-center">
                    <span className="text-white text-xs font-semibold mr-1">Order</span>
                    <Zap size={14} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}