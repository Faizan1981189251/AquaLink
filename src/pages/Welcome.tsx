import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Zap, Shield, Recycle, Waves, Clock, Star } from 'lucide-react';

export default function Welcome() {
  const features = [
    {
      icon: <Droplets size={24} className="text-blue-500" />,
      title: 'Pure Quality',
      description: 'Certified water suppliers with guaranteed purity'
    },
    {
      icon: <Zap size={24} className="text-blue-500" />,
      title: 'Lightning Fast',
      description: '10-minute express delivery with live tracking'
    },
    {
      icon: <Shield size={24} className="text-blue-500" />,
      title: 'Trusted Network',
      description: 'Verified suppliers with transparent reviews'
    },
    {
      icon: <Recycle size={24} className="text-blue-500" />,
      title: 'Eco Rewards',
      description: 'Earn points for returning empty containers'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700">
      {/* Header */}
      <div className="text-center pt-16 pb-10">
        <div className="relative inline-block mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
            <Droplets size={40} className="text-white" />
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
            <Waves size={24} className="text-white/60" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">Welcome to AquaLink</h1>
        <p className="text-xl text-white/90">Your trusted water delivery partner</p>
      </div>

      {/* Features */}
      <div className="px-6 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 mb-4 flex items-center shadow-lg">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
              {feature.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust indicators */}
      <div className="bg-white mx-6 rounded-2xl p-4 mb-8 shadow-lg">
        <div className="flex justify-around text-center">
          <div className="flex items-center">
            <Clock size={16} className="text-green-600 mr-2" />
            <span className="text-sm font-semibold text-gray-900">10-min delivery</span>
          </div>
          <div className="flex items-center">
            <Shield size={16} className="text-green-600 mr-2" />
            <span className="text-sm font-semibold text-gray-900">Quality assured</span>
          </div>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 mr-2" />
            <span className="text-sm font-semibold text-gray-900">4.8★ rated</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-6 pb-8">
        <Link
          to="/signup"
          className="block w-full bg-white text-blue-600 text-center py-4 rounded-2xl font-semibold mb-4 shadow-lg hover:shadow-xl transition-shadow"
        >
          Get Started
        </Link>
        
        <Link
          to="/login"
          className="block w-full text-white text-center py-4 font-medium"
        >
          I already have an account
        </Link>
      </div>
    </div>
  );
}