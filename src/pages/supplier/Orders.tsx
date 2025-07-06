import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, Package, MapPin, Phone, Eye, MoreVertical } from 'lucide-react';

export default function SupplierOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Orders', count: 156 },
    { id: 'pending', label: 'Pending', count: 8 },
    { id: 'in_progress', label: 'In Progress', count: 12 },
    { id: 'completed', label: 'Completed', count: 136 },
  ];

  const orders = [
    {
      id: '#AQ001240',
      customer: 'Rajesh Kumar',
      phone: '+91 9876543210',
      items: [
        { name: '20L Water Jar', quantity: 2, price: 100 }
      ],
      total: 100,
      status: 'pending',
      orderTime: '10:30 AM',
      deliveryAddress: 'HSR Layout, Sector 2, Bangalore - 560102',
      paymentMethod: 'UPI',
      orderDate: 'Today',
      usage: 'Home'
    },
    {
      id: '#AQ001239',
      customer: 'Priya Sharma',
      phone: '+91 9876543211',
      items: [
        { name: '1L Bottle', quantity: 24, price: 240 }
      ],
      total: 240,
      status: 'in_progress',
      orderTime: '09:15 AM',
      deliveryAddress: 'Koramangala, 4th Block, Bangalore - 560034',
      paymentMethod: 'Cash on Delivery',
      orderDate: 'Today',
      usage: 'Party'
    },
    {
      id: '#AQ001238',
      customer: 'Amit Patel',
      phone: '+91 9876543212',
      items: [
        { name: '500ml Bottle', quantity: 48, price: 192 }
      ],
      total: 192,
      status: 'completed',
      orderTime: '08:45 AM',
      deliveryAddress: 'Whitefield, ITPL Main Road, Bangalore - 560066',
      paymentMethod: 'Card',
      orderDate: 'Today',
      usage: 'Office'
    },
    {
      id: '#AQ001237',
      customer: 'Sneha Reddy',
      phone: '+91 9876543213',
      items: [
        { name: '20L Water Jar', quantity: 1, price: 50 },
        { name: '1L Bottle', quantity: 12, price: 120 }
      ],
      total: 170,
      status: 'completed',
      orderTime: '07:30 AM',
      deliveryAddress: 'Indiranagar, 100 Feet Road, Bangalore - 560038',
      paymentMethod: 'UPI',
      orderDate: 'Today',
      usage: 'Home'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'in_progress':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={14} className="text-yellow-600" />;
      case 'in_progress':
        return <Package size={14} className="text-blue-600" />;
      case 'completed':
        return <CheckCircle size={14} className="text-green-600" />;
      default:
        return <Clock size={14} className="text-gray-600" />;
    }
  };

  const getUsageColor = (usage: string) => {
    switch (usage.toLowerCase()) {
      case 'home':
        return 'text-green-600 bg-green-100';
      case 'office':
        return 'text-blue-600 bg-blue-100';
      case 'party':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Management</h1>
        
        <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-1">
          <Search size={20} className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-3 text-base text-gray-900 bg-transparent outline-none"
          />
          <button className="p-2">
            <Filter size={20} className="text-blue-600" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="px-6 py-2">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-4 mb-4 shadow-md">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-1">{order.id}</h3>
                <p className="text-xs text-gray-600">{order.orderDate} • {order.orderTime}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center px-2 py-1 rounded-lg ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="text-xs font-medium ml-1">
                    {order.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <button className="p-1">
                  <MoreVertical size={16} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{order.customer}</h4>
                <div className="flex items-center">
                  <Phone size={12} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-600">{order.phone}</span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-lg ${getUsageColor(order.usage)}`}>
                <span className="text-xs font-medium">{order.usage}</span>
              </div>
            </div>

            <div className="flex items-start mb-3">
              <MapPin size={14} className="text-gray-500 mr-2 mt-1" />
              <p className="text-xs text-gray-600 flex-1">{order.deliveryAddress}</p>
            </div>

            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-900 mb-2">Items:</p>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-900">{item.name} x{item.quantity}</span>
                  <span className="text-sm font-medium text-gray-900">₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center py-3 border-t border-gray-200 mb-3">
              <div className="flex-1">
                <p className="text-xs text-gray-600">{order.paymentMethod}</p>
                <p className="text-sm font-bold text-green-600">Total: ₹{order.total}</p>
              </div>
              
              <div className="flex gap-2">
                <button className="bg-blue-50 px-3 py-2 rounded-lg flex items-center">
                  <Eye size={14} className="text-blue-600 mr-1" />
                  <span className="text-xs text-blue-600 font-medium">View</span>
                </button>
                
                {order.status === 'pending' && (
                  <button className="bg-green-600 px-3 py-2 rounded-lg flex items-center">
                    <CheckCircle size={14} className="text-white mr-1" />
                    <span className="text-xs text-white font-medium">Accept</span>
                  </button>
                )}
                
                {order.status === 'in_progress' && (
                  <button className="bg-blue-600 px-3 py-2 rounded-lg flex items-center">
                    <Package size={14} className="text-white mr-1" />
                    <span className="text-xs text-white font-medium">Complete</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}