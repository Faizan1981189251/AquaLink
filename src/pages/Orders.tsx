import React, { useState } from 'react';
import { Package, Clock, CheckCircle, Truck, MapPin, Phone, Star, RotateCcw, Navigation, MessageCircle, Zap } from 'lucide-react';

export default function Orders() {
  const [activeTab, setActiveTab] = useState('active');

  const tabs = [
    { id: 'active', label: 'Active', count: 2 },
    { id: 'completed', label: 'Completed', count: 15 },
    { id: 'cancelled', label: 'Cancelled', count: 1 },
  ];

  const activeOrders = [
    {
      id: 1,
      orderNumber: '#AQ001234',
      supplier: 'AquaPure Solutions',
      supplierImage: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      status: 'out_for_delivery',
      statusText: 'Out for Delivery',
      items: [
        { name: '20L Water Jar', quantity: 2, price: 100 }
      ],
      total: 100,
      orderTime: '2 hours ago',
      estimatedDelivery: '5-8 mins',
      deliveryAddress: '123 Main Street, Bangalore',
      deliveryPerson: 'Rajesh Kumar',
      deliveryPhone: '+91 9876543210',
      deliveryPersonImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
      expressDelivery: true,
      trackingSteps: [
        { step: 'Order Placed', completed: true, time: '2:30 PM' },
        { step: 'Preparing', completed: true, time: '2:45 PM' },
        { step: 'Out for Delivery', completed: true, time: '3:15 PM' },
        { step: 'Delivered', completed: false, time: '' }
      ]
    },
    {
      id: 2,
      orderNumber: '#AQ001235',
      supplier: 'Crystal Water Co.',
      supplierImage: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      status: 'preparing',
      statusText: 'Preparing',
      items: [
        { name: '1L Bottles', quantity: 24, price: 240 }
      ],
      total: 240,
      orderTime: '1 hour ago',
      estimatedDelivery: '12-15 mins',
      deliveryAddress: '123 Main Street, Bangalore',
      expressDelivery: false,
      trackingSteps: [
        { step: 'Order Placed', completed: true, time: '3:00 PM' },
        { step: 'Preparing', completed: true, time: '3:10 PM' },
        { step: 'Out for Delivery', completed: false, time: '' },
        { step: 'Delivered', completed: false, time: '' }
      ]
    }
  ];

  const completedOrders = [
    {
      id: 4,
      orderNumber: '#AQ001230',
      supplier: 'Himalayan Springs',
      supplierImage: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop',
      status: 'delivered',
      statusText: 'Delivered',
      items: [
        { name: '20L Water Jar', quantity: 3, price: 150 }
      ],
      total: 150,
      orderTime: '1 day ago',
      deliveryTime: 'Delivered at 4:30 PM',
      deliveryAddress: '123 Main Street, Bangalore',
      rating: 4.5,
      canReorder: true,
      actualDeliveryTime: '9 minutes',
      expressDelivery: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'preparing':
        return 'text-yellow-600 bg-yellow-100';
      case 'out_for_delivery':
        return 'text-blue-600 bg-blue-100';
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
        return <Package size={14} className="text-yellow-600" />;
      case 'out_for_delivery':
        return <Navigation size={14} className="text-blue-600" />;
      case 'delivered':
        return <CheckCircle size={14} className="text-green-600" />;
      default:
        return <Clock size={14} className="text-gray-600" />;
    }
  };

  const renderActiveOrder = (order: any) => (
    <div key={order.id} className="bg-white rounded-2xl p-4 mb-4 shadow-md border-l-4 border-blue-600">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <h3 className="text-base font-semibold text-gray-900 mr-2">{order.orderNumber}</h3>
            {order.expressDelivery && (
              <div className="flex items-center bg-red-600 px-2 py-1 rounded-lg">
                <Zap size={10} className="text-white mr-1" />
                <span className="text-white text-xs font-bold">EXPRESS</span>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-600">{order.orderTime}</p>
        </div>
        <div className={`flex items-center px-2 py-1 rounded-lg ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          <span className="text-xs font-medium ml-1">{order.statusText}</span>
        </div>
      </div>

      <div className="flex items-center mb-3">
        <img src={order.supplierImage} alt={order.supplier} className="w-10 h-10 rounded-full mr-3" />
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">{order.supplier}</h4>
          <div className="flex items-center">
            <MapPin size={12} className="text-gray-500 mr-1" />
            <p className="text-xs text-gray-600">{order.deliveryAddress}</p>
          </div>
        </div>
      </div>

      <div className="mb-3">
        {order.items.map((item: any, index: number) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-sm text-gray-900">{item.name} x{item.quantity}</span>
            <span className="text-sm font-medium text-gray-900">₹{item.price}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center py-3 border-t border-gray-200 mb-3">
        <span className="text-base font-semibold text-gray-900">Total</span>
        <span className="text-base font-bold text-green-600">₹{order.total}</span>
      </div>

      {order.status === 'out_for_delivery' && (
        <div className="bg-green-50 rounded-xl p-3 mb-3">
          <div className="flex items-center">
            <img src={order.deliveryPersonImage} alt={order.deliveryPerson} className="w-10 h-10 rounded-full mr-3" />
            <div className="flex-1">
              <h5 className="text-sm font-medium text-gray-900">{order.deliveryPerson}</h5>
              <p className="text-xs text-green-600 font-semibold">Arriving in {order.estimatedDelivery}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => alert(`Calling ${order.deliveryPhone}...`)}
                className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center"
              >
                <Phone size={16} className="text-blue-600" />
              </button>
              <button className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center">
                <MessageCircle size={16} className="text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-3">
        <h5 className="text-sm font-semibold text-gray-900 mb-3">Order Progress</h5>
        <div className="pl-2">
          {order.trackingSteps.map((step: any, index: number) => (
            <div key={index} className="flex items-start">
              <div className="flex flex-col items-center mr-3">
                <div className={`w-2 h-2 rounded-full ${
                  step.completed ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
                {index < order.trackingSteps.length - 1 && (
                  <div className={`w-0.5 h-5 ${
                    step.completed ? 'bg-blue-600' : 'bg-gray-300'
                  } mt-1`} />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className={`text-xs ${
                  step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}>
                  {step.step}
                </p>
                {step.time && (
                  <p className="text-xs text-gray-500 mt-1">{step.time}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {order.status === 'out_for_delivery' && (
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center">
            <Navigation size={16} className="mr-2" />
            <span className="text-xs font-medium">Live Track</span>
          </button>
        )}
        <button className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl flex items-center justify-center">
          <Phone size={16} className="mr-2" />
          <span className="text-xs font-medium">Support</span>
        </button>
      </div>
    </div>
  );

  const renderCompletedOrder = (order: any) => (
    <div key={order.id} className="bg-white rounded-2xl p-4 mb-4 shadow-md">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <h3 className="text-base font-semibold text-gray-900 mr-2">{order.orderNumber}</h3>
            {order.expressDelivery && (
              <div className="flex items-center bg-green-600 px-2 py-1 rounded-lg">
                <Zap size={10} className="text-white mr-1" />
                <span className="text-white text-xs font-bold">EXPRESS</span>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-600">{order.orderTime}</p>
        </div>
        <div className={`flex items-center px-2 py-1 rounded-lg ${getStatusColor(order.status)}`}>
          <CheckCircle size={14} className="text-green-600 mr-1" />
          <span className="text-xs font-medium">{order.statusText}</span>
        </div>
      </div>

      <div className="flex items-center mb-3">
        <img src={order.supplierImage} alt={order.supplier} className="w-10 h-10 rounded-full mr-3" />
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">{order.supplier}</h4>
          <p className="text-xs text-gray-600 mb-1">{order.deliveryTime}</p>
          <p className="text-xs text-green-600 font-semibold">
            Delivered in {order.actualDeliveryTime}
          </p>
        </div>
      </div>

      <div className="mb-3">
        {order.items.map((item: any, index: number) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-sm text-gray-900">{item.name} x{item.quantity}</span>
            <span className="text-sm font-medium text-gray-900">₹{item.price}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center py-3 border-t border-gray-200 mb-3">
        <span className="text-base font-semibold text-gray-900">Total</span>
        <span className="text-base font-bold text-green-600">₹{order.total}</span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Star size={14} className="text-yellow-500 mr-1" />
          <span className="text-xs text-gray-600">{order.rating}</span>
        </div>
        <button className="bg-blue-50 px-4 py-2 rounded-xl flex items-center">
          <RotateCcw size={14} className="text-blue-600 mr-1" />
          <span className="text-xs text-blue-600 font-medium">Reorder</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-sm text-gray-600 mt-1">Track your water deliveries</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium mr-3 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="px-6 py-2">
        {activeTab === 'active' && activeOrders.map(renderActiveOrder)}
        {activeTab === 'completed' && completedOrders.map(renderCompletedOrder)}
        {activeTab === 'cancelled' && (
          <div className="text-center py-12">
            <Package size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-base text-gray-500">No cancelled orders</p>
          </div>
        )}
      </div>
    </div>
  );
}