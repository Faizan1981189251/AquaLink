import React, { useState } from 'react';
import { 
  Droplets, 
  MapPin, 
  Search, 
  Bell, 
  Star, 
  Zap, 
  Shield, 
  Recycle,
  Clock,
  Mic,
  RotateCcw,
  Plus,
  Minus,
  ShoppingCart,
  Timer,
  Leaf,
  Package,
  Bot,
  ScanLine,
  Volume2,
  Brain
} from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [quickOrderCounts, setQuickOrderCounts] = useState({
    jar20L: 0,
    bottle1L: 0,
    bottle500ml: 0
  });

  const quickOrderItems = [
    { 
      id: 'jar20L', 
      name: '20L Jar', 
      price: 50, 
      icon: <Droplets size={24} className="text-white" />,
      color: 'bg-blue-600',
      estimatedStock: 2,
      avgConsumption: '1 jar/week'
    },
    { 
      id: 'bottle1L', 
      name: '1L Bottles', 
      price: 10, 
      icon: <Package size={24} className="text-white" />,
      color: 'bg-green-600',
      estimatedStock: 8,
      avgConsumption: '12 bottles/week'
    },
    { 
      id: 'bottle500ml', 
      name: '500ml Bottles', 
      price: 4, 
      icon: <Package size={24} className="text-white" />,
      color: 'bg-purple-600',
      estimatedStock: 15,
      avgConsumption: '20 bottles/week'
    }
  ];

  const nearbySuppliers = [
    {
      id: 1,
      name: 'AquaPure Solutions',
      distance: '0.8 km',
      rating: 4.8,
      deliveryTime: '8-12 min',
      image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: true,
      price: '₹25/jar',
      expressDelivery: true,
      available: true,
      qualityScore: 9.2,
    },
    {
      id: 2,
      name: 'Crystal Water Co.',
      distance: '1.2 km',
      rating: 4.6,
      deliveryTime: '10-15 min',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      certified: true,
      price: '₹22/jar',
      expressDelivery: false,
      available: true,
      qualityScore: 8.7,
    }
  ];

  const recentOrders = [
    {
      id: 1,
      items: '2x 20L Jars',
      supplier: 'AquaPure Solutions',
      date: '2 days ago',
      total: 100
    },
    {
      id: 2,
      items: '24x 1L Bottles',
      supplier: 'Crystal Water Co.',
      date: '1 week ago',
      total: 240
    }
  ];

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('20 liter water jar');
      alert('Voice Search: Found "20 liter water jar"');
    }, 2000);
  };

  const updateQuickOrderCount = (itemId: string, change: number) => {
    setQuickOrderCounts(prev => ({
      ...prev,
      [itemId]: Math.max(0, prev[itemId] + change)
    }));
  };

  const handleQuickOrder = () => {
    const totalItems = Object.values(quickOrderCounts).reduce((sum, count) => sum + count, 0);
    if (totalItems === 0) {
      alert('No Items: Please select items to order');
      return;
    }

    const orderSummary = quickOrderItems
      .filter(item => quickOrderCounts[item.id] > 0)
      .map(item => `${quickOrderCounts[item.id]}x ${item.name}`)
      .join(', ');

    alert(`1-Click Order Confirmed!\n\n${orderSummary}\n\nEstimated delivery: 8-12 minutes\nSupplier: AquaPure Solutions`);
    setQuickOrderCounts({ jar20L: 0, bottle1L: 0, bottle500ml: 0 });
  };

  const handleReorder = (order: any) => {
    if (confirm(`Reorder ${order.items} from ${order.supplier}?\n\nTotal: ₹${order.total}`)) {
      alert('Order Placed! Estimated delivery: 8-12 minutes');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pt-16 pb-6 rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1">
            <p className="text-sm text-white/80 mb-1">Good Morning</p>
            <h1 className="text-xl font-semibold text-white">John Doe</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </button>
            <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center relative">
              <Bell size={24} className="text-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-white">2</span>
              </div>
            </button>
          </div>
        </div>

        <div className="mb-5">
          <div className="flex items-center mb-1">
            <MapPin size={16} className="text-white mr-2" />
            <p className="text-xs text-white/80">Delivering to: Home</p>
          </div>
          <p className="text-sm font-medium text-white">123 Main Street, Bangalore</p>
        </div>

        <div className="flex items-center bg-white rounded-2xl px-4 py-1 mb-3">
          <Search size={20} className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search for water suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-3 text-base text-gray-900 bg-transparent outline-none"
          />
          <button 
            onClick={handleVoiceSearch}
            className={`w-9 h-9 rounded-full flex items-center justify-center ${
              isListening ? 'bg-red-600' : 'bg-blue-50'
            }`}
          >
            <Mic size={20} className={isListening ? "text-white" : "text-blue-600"} />
          </button>
        </div>

        <div className="flex items-center justify-center bg-white/10 rounded-xl py-2 px-4">
          <Timer size={16} className="text-white mr-2" />
          <span className="text-white text-xs font-semibold">10-Minute Express Delivery Available</span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex justify-between px-6 mt-5 gap-3">
        <button className="flex-1 flex items-center justify-center bg-white py-4 rounded-2xl shadow-md">
          <Volume2 size={20} className="text-blue-600 mr-2" />
          <span className="text-xs font-semibold text-gray-900">Voice Order</span>
        </button>
        
        <button className="flex-1 flex items-center justify-center bg-white py-4 rounded-2xl shadow-md">
          <ScanLine size={20} className="text-green-600 mr-2" />
          <span className="text-xs font-semibold text-gray-900">Scan & Order</span>
        </button>
        
        <button className="flex-1 flex items-center justify-center bg-white py-4 rounded-2xl shadow-md">
          <Bot size={20} className="text-purple-600 mr-2" />
          <span className="text-xs font-semibold text-gray-900">AI Assistant</span>
        </button>
      </div>

      {/* AI Stock Reminder */}
      <div className="bg-yellow-100 mx-6 mt-5 rounded-2xl p-4 flex items-center border-l-4 border-yellow-500">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
          <Brain size={20} className="text-yellow-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-yellow-800 mb-1">AI Stock Alert</h3>
          <p className="text-xs text-yellow-800 mb-1">Your 20L Jars might run out in 2 days</p>
          <p className="text-xs text-yellow-700">Last order: 3 days ago • 89% confidence</p>
        </div>
        <button 
          onClick={() => alert('Quick Order: Order 2x 20L Jars now?')}
          className="bg-yellow-600 px-3 py-2 rounded-lg"
        >
          <span className="text-white text-xs font-semibold">Order Now</span>
        </button>
      </div>

      {/* 1-Click Quick Order */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">1-Click Quick Order</h2>
        <div className="flex justify-between mb-4">
          {quickOrderItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 flex-1 mx-1 shadow-md">
              <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mb-2`}>
                {item.icon}
              </div>
              <h3 className="text-xs font-semibold text-gray-900 text-center mb-1">{item.name}</h3>
              <p className="text-sm font-bold text-green-600 text-center mb-1">₹{item.price}</p>
              <p className="text-xs text-gray-500 text-center mb-3">Stock: ~{item.estimatedStock} days</p>
              
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => updateQuickOrderCount(item.id, -1)}
                  className="w-7 h-7 bg-white rounded-md flex items-center justify-center"
                >
                  <Minus size={16} className="text-gray-600" />
                </button>
                
                <span className="flex-1 text-center text-sm font-semibold text-gray-900">
                  {quickOrderCounts[item.id]}
                </span>
                
                <button
                  onClick={() => updateQuickOrderCount(item.id, 1)}
                  className="w-7 h-7 bg-white rounded-md flex items-center justify-center"
                >
                  <Plus size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={handleQuickOrder}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center shadow-lg"
        >
          <ShoppingCart size={20} className="mr-2" />
          Order in 1-Click
        </button>
      </div>

      {/* Quick Reorder */}
      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Reorder</h2>
          <button className="text-sm text-blue-600 font-medium">View All</button>
        </div>
        
        {recentOrders.map((order) => (
          <button 
            key={order.id} 
            onClick={() => handleReorder(order)}
            className="w-full bg-white rounded-2xl p-4 mb-3 flex items-center shadow-md"
          >
            <div className="flex-1 text-left">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{order.items}</h3>
              <p className="text-xs text-gray-600 mb-1">{order.supplier}</p>
              <p className="text-xs text-gray-500">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-green-600 mb-2">₹{order.total}</p>
              <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
                <RotateCcw size={16} className="text-blue-600 mr-1" />
                <span className="text-xs text-blue-600 font-medium">Reorder</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* AI-Matched Suppliers */}
      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">AI-Matched Quality Suppliers</h2>
          <button className="text-sm text-blue-600 font-medium">See All</button>
        </div>
        
        {nearbySuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-2xl p-4 mb-3 flex items-center shadow-md">
            <img src={supplier.image} alt={supplier.name} className="w-15 h-15 rounded-full mr-4" />
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <h3 className="text-base font-semibold text-gray-900 flex-1 mr-2">{supplier.name}</h3>
                {supplier.certified && (
                  <Shield size={16} className="text-green-600" />
                )}
              </div>
              <div className="flex items-center mb-1">
                <Star size={12} className="text-yellow-500 mr-1" />
                <span className="text-xs text-gray-600 mr-2">{supplier.rating}</span>
                <span className="text-xs text-gray-600">• {supplier.distance}</span>
              </div>
              <p className="text-xs text-green-600 font-medium mb-1">{supplier.deliveryTime}</p>
              <div className="bg-green-50 px-2 py-1 rounded-lg inline-block">
                <span className="text-xs text-green-600 font-semibold">Quality Score: {supplier.qualityScore}/10</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-green-600 mb-2">{supplier.price}</p>
              <button className="bg-blue-600 px-4 py-2 rounded-xl">
                <span className="text-white text-xs font-semibold">Order</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Eco Impact */}
      <div className="px-6 mt-6 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center mb-4">
            <Leaf size={24} className="text-green-600 mr-2" />
            <h2 className="text-base font-semibold text-gray-900">Your Eco Impact</h2>
          </div>
          <div className="flex justify-between mb-4">
            <div className="text-center">
              <p className="text-xl font-bold text-green-600 mb-1">18</p>
              <p className="text-xs text-gray-600">Jars Returned</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-600 mb-1">360</p>
              <p className="text-xs text-gray-600">Points Earned</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-600 mb-1">₹90</p>
              <p className="text-xs text-gray-600">Eco Savings</p>
            </div>
          </div>
          <button className="w-full bg-green-600 py-3 rounded-xl">
            <span className="text-white text-sm font-semibold">Setup Daily Subscription</span>
          </button>
        </div>
      </div>
    </div>
  );
}