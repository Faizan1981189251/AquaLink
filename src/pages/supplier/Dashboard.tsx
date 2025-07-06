import React, { useState } from 'react';
import { DollarSign, Package, TrendingUp, Users, Clock, CheckCircle, AlertCircle, Calendar, Eye, Bell, Zap, Navigation, MessageCircle } from 'lucide-react';

export default function SupplierDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
  ];

  const todayStats = {
    totalOrders: 32,
    totalEarnings: 2450,
    pendingOrders: 5,
    completedOrders: 27,
    avgOrderValue: 77,
    newCustomers: 8,
    expressOrders: 18,
    avgDeliveryTime: '9 mins'
  };

  const liveOrders = [
    {
      id: '#AQ001240',
      customer: 'Rajesh Kumar',
      items: '2x 20L Jars',
      amount: 100,
      status: 'out_for_delivery',
      time: '5 mins ago',
      address: 'HSR Layout, Bangalore',
      deliveryPerson: 'Amit Singh',
      estimatedDelivery: '3 mins',
      expressOrder: true,
      customerPhone: '+91 9876543210'
    },
    {
      id: '#AQ001241',
      customer: 'Priya Sharma',
      items: '24x 1L Bottles',
      amount: 240,
      status: 'preparing',
      time: '8 mins ago',
      address: 'Koramangala, Bangalore',
      expressOrder: false,
      customerPhone: '+91 9876543211'
    },
    {
      id: '#AQ001242',
      customer: 'Amit Patel',
      items: '1x 20L Jar',
      amount: 50,
      status: 'pending',
      time: '2 mins ago',
      address: 'Whitefield, Bangalore',
      expressOrder: true,
      customerPhone: '+91 9876543212'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'preparing':
        return 'text-blue-600 bg-blue-100';
      case 'out_for_delivery':
        return 'text-green-600 bg-green-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={14} className="text-yellow-600" />;
      case 'preparing':
        return <Package size={14} className="text-blue-600" />;
      case 'out_for_delivery':
        return <Navigation size={14} className="text-green-600" />;
      case 'delivered':
        return <CheckCircle size={14} className="text-green-600" />;
      default:
        return <AlertCircle size={14} className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 pt-16 pb-6">
        <div className="flex justify-between items-center mb-5">
          <div className="flex-1">
            <p className="text-sm text-white/80 mb-1">Good Morning</p>
            <h1 className="text-xl font-semibold text-white">AquaPure Solutions</h1>
          </div>
          <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center relative">
            <Bell size={24} className="text-white" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-white">5</span>
            </div>
          </button>
        </div>

        <div className="flex justify-between">
          <div className="text-center">
            <p className="text-lg font-bold text-white mb-1">₹{todayStats.totalEarnings}</p>
            <p className="text-xs text-white/80">Today's Earnings</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white mb-1">{todayStats.totalOrders}</p>
            <p className="text-xs text-white/80">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white mb-1">{todayStats.avgDeliveryTime}</p>
            <p className="text-xs text-white/80">Avg Delivery</p>
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-white mx-6 mt-5 rounded-xl p-1 flex shadow-md">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => setSelectedPeriod(period.id)}
            className={`flex-1 py-2 text-center rounded-lg text-sm font-medium ${
              selectedPeriod === period.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-600'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Enhanced Stats Grid */}
      <div className="flex flex-wrap px-6 mt-5 gap-3">
        <div className="bg-white rounded-2xl p-4 flex-1 min-w-[45%] shadow-md">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <DollarSign size={24} className="text-green-600" />
          </div>
          <p className="text-xl font-bold text-gray-900 mb-1">₹{todayStats.totalEarnings}</p>
          <p className="text-xs text-gray-600 mb-1">Total Earnings</p>
          <p className="text-xs text-green-600">+18% from yesterday</p>
        </div>

        <div className="bg-white rounded-2xl p-4 flex-1 min-w-[45%] shadow-md">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <Package size={24} className="text-blue-600" />
          </div>
          <p className="text-xl font-bold text-gray-900 mb-1">{todayStats.totalOrders}</p>
          <p className="text-xs text-gray-600 mb-1">Total Orders</p>
          <p className="text-xs text-green-600">+12% from yesterday</p>
        </div>

        <div className="bg-white rounded-2xl p-4 flex-1 min-w-[45%] shadow-md">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3">
            <Zap size={24} className="text-red-600" />
          </div>
          <p className="text-xl font-bold text-gray-900 mb-1">{todayStats.expressOrders}</p>
          <p className="text-xs text-gray-600 mb-1">Express Orders</p>
          <p className="text-xs text-gray-600">10-min delivery</p>
        </div>

        <div className="bg-white rounded-2xl p-4 flex-1 min-w-[45%] shadow-md">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
            <Users size={24} className="text-purple-600" />
          </div>
          <p className="text-xl font-bold text-gray-900 mb-1">{todayStats.newCustomers}</p>
          <p className="text-xs text-gray-600 mb-1">New Customers</p>
          <p className="text-xs text-green-600">+3 from yesterday</p>
        </div>
      </div>

      {/* Live Order Management */}
      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Live Order Management</h2>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
            <span className="text-xs font-semibold text-red-600">LIVE</span>
          </div>
        </div>

        {liveOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-4 mb-3 shadow-md border-l-4 border-blue-600">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <h3 className="text-sm font-semibold text-gray-900 mr-2">{order.id}</h3>
                  {order.expressOrder && (
                    <div className="flex items-center bg-red-600 px-2 py-1 rounded-lg">
                      <Zap size={10} className="text-white mr-1" />
                      <span className="text-white text-xs font-bold">EXPRESS</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-900 font-medium">{order.customer}</p>
                <p className="text-xs text-gray-600">{order.time}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-green-600 mb-1">₹{order.amount}</p>
                <div className={`flex items-center px-2 py-1 rounded-lg ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="text-xs font-medium ml-1">
                    {order.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-900 mb-1">{order.items}</p>
              <p className="text-xs text-gray-600">{order.address}</p>
            </div>

            {order.status === 'out_for_delivery' && (
              <div className="bg-green-50 rounded-xl p-3 mb-3">
                <p className="text-xs text-green-600 font-medium">
                  Delivery: {order.deliveryPerson} • ETA: {order.estimatedDelivery}
                </p>
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              {order.status === 'pending' && (
                <>
                  <button 
                    onClick={() => alert(`Accept order ${order.id}?`)}
                    className="flex items-center bg-green-600 px-3 py-2 rounded-lg"
                  >
                    <CheckCircle size={14} className="text-white mr-1" />
                    <span className="text-xs text-white font-medium">Accept</span>
                  </button>
                  <button 
                    onClick={() => alert('Auto-assign nearest delivery person?')}
                    className="flex items-center bg-blue-50 px-3 py-2 rounded-lg"
                  >
                    <Navigation size={14} className="text-blue-600 mr-1" />
                    <span className="text-xs text-blue-600 font-medium">Auto-Assign</span>
                  </button>
                </>
              )}
              
              {order.status === 'preparing' && (
                <button 
                  onClick={() => alert('Mark order as ready for delivery?')}
                  className="flex items-center bg-blue-600 px-3 py-2 rounded-lg"
                >
                  <Package size={14} className="text-white mr-1" />
                  <span className="text-xs text-white font-medium">Mark Ready</span>
                </button>
              )}

              {order.status === 'out_for_delivery' && (
                <button 
                  onClick={() => alert('View live delivery tracking')}
                  className="flex items-center bg-green-600 px-3 py-2 rounded-lg"
                >
                  <Navigation size={14} className="text-white mr-1" />
                  <span className="text-xs text-white font-medium">Live Track</span>
                </button>
              )}

              <button 
                onClick={() => alert(`Call customer at ${order.customerPhone}?`)}
                className="flex items-center bg-gray-100 px-3 py-2 rounded-lg"
              >
                <MessageCircle size={14} className="text-gray-600 mr-1" />
                <span className="text-xs text-gray-600 font-medium">Contact</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Status Overview */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Performance</h2>
        <div className="flex justify-between">
          <div className="bg-white rounded-xl p-3 flex-1 mx-1 shadow-md">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <p className="text-base font-bold text-gray-900 mb-1">{todayStats.pendingOrders}</p>
            <p className="text-xs text-gray-600">Pending</p>
          </div>

          <div className="bg-white rounded-xl p-3 flex-1 mx-1 shadow-md">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <Package size={20} className="text-blue-600" />
            </div>
            <p className="text-base font-bold text-gray-900 mb-1">8</p>
            <p className="text-xs text-gray-600">Preparing</p>
          </div>

          <div className="bg-white rounded-xl p-3 flex-1 mx-1 shadow-md">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <Navigation size={20} className="text-green-600" />
            </div>
            <p className="text-base font-bold text-gray-900 mb-1">12</p>
            <p className="text-xs text-gray-600">Out for Delivery</p>
          </div>

          <div className="bg-white rounded-xl p-3 flex-1 mx-1 shadow-md">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <p className="text-base font-bold text-gray-900 mb-1">{todayStats.completedOrders}</p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex gap-3">
          <button className="flex-1 bg-white py-4 rounded-xl flex items-center justify-center shadow-md">
            <Calendar size={20} className="text-blue-600 mr-2" />
            <span className="text-xs font-medium text-blue-600">Manage Inventory</span>
          </button>
          <button className="flex-1 bg-white py-4 rounded-xl flex items-center justify-center shadow-md">
            <TrendingUp size={20} className="text-blue-600 mr-2" />
            <span className="text-xs font-medium text-blue-600">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
}