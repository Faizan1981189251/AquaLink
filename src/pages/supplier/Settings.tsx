import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Store, Bell, CreditCard, Shield, HelpCircle, Settings as SettingsIcon, LogOut, ChevronRight, Clock, Package, DollarSign, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function SupplierSettings() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    payments: true,
    marketing: false,
  });

  const [businessSettings, setBusinessSettings] = useState({
    autoAcceptOrders: false,
    instantDelivery: true,
    bulkOrdersOnly: false,
  });

  const supplierInfo = {
    businessName: 'AquaPure Solutions',
    ownerName: 'Rajesh Kumar',
    email: 'rajesh@aquapure.com',
    phone: '+91 9876543210',
    address: 'HSR Layout, Bangalore',
    rating: 4.8,
    totalOrders: 1250,
    joinedDate: 'January 2023'
  };

  const menuSections = [
    {
      title: 'Business Management',
      items: [
        {
          id: 'business_profile',
          icon: <Store size={20} className="text-blue-600" />,
          title: 'Business Profile',
          subtitle: 'Update business information',
          action: () => console.log('Navigate to business profile'),
        },
        {
          id: 'inventory',
          icon: <Package size={20} className="text-blue-600" />,
          title: 'Inventory Management',
          subtitle: 'Manage stock and pricing',
          action: () => console.log('Navigate to inventory'),
        },
        {
          id: 'delivery_zones',
          icon: <MapPin size={20} className="text-blue-600" />,
          title: 'Delivery Zones',
          subtitle: 'Set delivery areas and charges',
          action: () => console.log('Navigate to delivery zones'),
        },
        {
          id: 'operating_hours',
          icon: <Clock size={20} className="text-blue-600" />,
          title: 'Operating Hours',
          subtitle: 'Set business hours',
          action: () => console.log('Navigate to operating hours'),
        },
      ]
    },
    {
      title: 'Financial',
      items: [
        {
          id: 'payments',
          icon: <CreditCard size={20} className="text-blue-600" />,
          title: 'Payment Settings',
          subtitle: 'Bank details and payment methods',
          action: () => console.log('Navigate to payments'),
        },
        {
          id: 'pricing',
          icon: <DollarSign size={20} className="text-blue-600" />,
          title: 'Pricing & Offers',
          subtitle: 'Set prices and create offers',
          action: () => console.log('Navigate to pricing'),
        },
      ]
    },
    {
      title: 'Account & Support',
      items: [
        {
          id: 'account',
          icon: <User size={20} className="text-blue-600" />,
          title: 'Account Settings',
          subtitle: 'Personal information and security',
          action: () => console.log('Navigate to account'),
        },
        {
          id: 'privacy',
          icon: <Shield size={20} className="text-blue-600" />,
          title: 'Privacy & Security',
          subtitle: 'Data and security settings',
          action: () => console.log('Navigate to privacy'),
        },
        {
          id: 'help',
          icon: <HelpCircle size={20} className="text-blue-600" />,
          title: 'Help & Support',
          subtitle: 'FAQs and customer service',
          action: () => console.log('Navigate to help'),
        },
      ]
    }
  ];

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/welcome');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      {/* Business Info Card */}
      <div className="bg-white mx-6 mt-6 rounded-2xl p-5 shadow-md">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <Store size={24} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900 mb-1">{supplierInfo.businessName}</h2>
            <p className="text-sm text-gray-600 mb-1">{supplierInfo.ownerName}</p>
            <p className="text-xs text-gray-500">{supplierInfo.email}</p>
          </div>
        </div>
        
        <div className="flex justify-between pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 mb-1">{supplierInfo.rating}</p>
            <p className="text-xs text-gray-600">Rating</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 mb-1">{supplierInfo.totalOrders}</p>
            <p className="text-xs text-gray-600">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 mb-1">2+</p>
            <p className="text-xs text-gray-600">Years Active</p>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white mx-6 mt-6 rounded-2xl p-4 shadow-md">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Notification Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Bell size={20} className="text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">New Orders</p>
                <p className="text-xs text-gray-600">Get notified of new orders</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.newOrders}
                onChange={(e) => setNotifications(prev => ({ ...prev, newOrders: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Package size={20} className="text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Order Updates</p>
                <p className="text-xs text-gray-600">Status changes and delivery updates</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.orderUpdates}
                onChange={(e) => setNotifications(prev => ({ ...prev, orderUpdates: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <DollarSign size={20} className="text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Payment Notifications</p>
                <p className="text-xs text-gray-600">Payment confirmations and settlements</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.payments}
                onChange={(e) => setNotifications(prev => ({ ...prev, payments: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Business Settings */}
      <div className="bg-white mx-6 mt-6 rounded-2xl p-4 shadow-md">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Business Settings</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <SettingsIcon size={20} className="text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Auto Accept Orders</p>
                <p className="text-xs text-gray-600">Automatically accept new orders</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={businessSettings.autoAcceptOrders}
                onChange={(e) => setBusinessSettings(prev => ({ ...prev, autoAcceptOrders: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock size={20} className="text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Instant Delivery</p>
                <p className="text-xs text-gray-600">Offer same-day delivery service</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={businessSettings.instantDelivery}
                onChange={(e) => setBusinessSettings(prev => ({ ...prev, instantDelivery: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mt-6 px-6">
          <h3 className="text-base font-semibold text-gray-900 mb-3">{section.title}</h3>
          <div className="bg-white rounded-2xl shadow-md">
            {section.items.map((item, itemIndex) => (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full flex items-center p-4 ${
                  itemIndex < section.items.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  {item.icon}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-base font-medium text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600">{item.subtitle}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full bg-white mx-6 mt-6 rounded-2xl p-4 flex items-center justify-center shadow-md"
      >
        <LogOut size={20} className="text-red-600 mr-2" />
        <span className="text-base font-medium text-red-600">Logout</span>
      </button>

      {/* App Version */}
      <div className="text-center py-6 mb-6">
        <p className="text-xs text-gray-500">AquaLink Supplier v1.0.0</p>
      </div>
    </div>
  );
}