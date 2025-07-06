import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, CreditCard, Bell, Shield, HelpCircle, Star, Gift, Settings, LogOut, ChevronRight, Droplets, Recycle, Edit, Calendar, TrendingUp, Clock, Package, Building, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    memberSince: 'January 2024',
    totalOrders: 67,
    loyaltyPoints: 1840,
    ecoScore: 94,
    subscriptionActive: true,
    preferredSupplier: 'AquaPure Solutions'
  };

  const usageStats = [
    { label: 'This Month', value: '8 orders', icon: <Calendar size={16} className="text-blue-600" /> },
    { label: 'Avg Delivery', value: '9 mins', icon: <Clock size={16} className="text-green-600" /> },
    { label: 'Favorite', value: '20L Jars', icon: <Package size={16} className="text-purple-600" /> },
    { label: 'Saved', value: '₹340', icon: <TrendingUp size={16} className="text-yellow-600" /> },
  ];

  const quickActions = [
    {
      id: 'subscription',
      icon: <Calendar size={20} className="text-blue-600" />,
      title: 'Manage Subscription',
      subtitle: 'Daily delivery active',
      action: () => alert('Manage your daily water delivery subscription'),
      badge: 'ACTIVE'
    },
    {
      id: 'bulk_orders',
      icon: <Building size={20} className="text-blue-600" />,
      title: 'Bulk Orders (Office)',
      subtitle: 'Corporate discounts available',
      action: () => alert('Setup bulk orders for your office'),
    },
    {
      id: 'usage_analytics',
      icon: <TrendingUp size={20} className="text-blue-600" />,
      title: 'Usage Analytics',
      subtitle: 'Track your consumption patterns',
      action: () => alert('View your water consumption analytics'),
    },
  ];

  const menuItems = [
    {
      id: 'addresses',
      icon: <MapPin size={20} className="text-blue-600" />,
      title: 'My Addresses',
      subtitle: 'Manage delivery addresses',
      action: () => console.log('Navigate to addresses'),
    },
    {
      id: 'payments',
      icon: <CreditCard size={20} className="text-blue-600" />,
      title: 'Payment Methods',
      subtitle: 'Cards, UPI, and wallets',
      action: () => console.log('Navigate to payments'),
    },
    {
      id: 'notifications',
      icon: <Bell size={20} className="text-blue-600" />,
      title: 'Smart Notifications',
      subtitle: 'AI reminders and delivery alerts',
      action: () => console.log('Navigate to notifications'),
    },
    {
      id: 'loyalty',
      icon: <Gift size={20} className="text-blue-600" />,
      title: 'Loyalty Program',
      subtitle: `${user.loyaltyPoints} points available`,
      action: () => console.log('Navigate to loyalty'),
    },
    {
      id: 'privacy',
      icon: <Shield size={20} className="text-blue-600" />,
      title: 'Privacy & Security',
      subtitle: 'Account security settings',
      action: () => console.log('Navigate to privacy'),
    },
    {
      id: 'help',
      icon: <HelpCircle size={20} className="text-blue-600" />,
      title: 'Help & Support',
      subtitle: '24/7 AI + human support',
      action: () => console.log('Navigate to help'),
    },
    {
      id: 'settings',
      icon: <Settings size={20} className="text-blue-600" />,
      title: 'App Settings',
      subtitle: 'Voice search, notifications, theme',
      action: () => console.log('Navigate to settings'),
    },
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
      <div className="bg-white px-6 pt-16 pb-5 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <button className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
          <Edit size={20} className="text-blue-600" />
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white mx-6 mt-6 rounded-2xl p-5 shadow-md">
        <div className="flex items-center mb-4">
          <div className="relative">
            <img src={user.profileImage} alt={user.name} className="w-20 h-20 rounded-full" />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-3 border-white">
              <Droplets size={16} className="text-white" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{user.email}</p>
            <p className="text-sm text-gray-600 mb-2">{user.phone}</p>
            <div className="flex items-center">
              <p className="text-xs text-gray-500 mr-2">Member since {user.memberSince}</p>
              {user.subscriptionActive && (
                <div className="flex items-center bg-green-600 px-2 py-1 rounded-xl">
                  <Zap size={12} className="text-white mr-1" />
                  <span className="text-white text-xs font-bold">PREMIUM</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="flex justify-between px-6 mt-4 gap-2">
        {usageStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-3 flex-1 shadow-md">
            <div className="mb-2">{stat.icon}</div>
            <p className="text-sm font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-xs text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Stats */}
      <div className="flex justify-between px-6 mt-4">
        <div className="bg-white rounded-xl p-4 flex-1 mx-1 shadow-md">
          <p className="text-xl font-bold text-gray-900 mb-1">{user.totalOrders}</p>
          <p className="text-xs text-gray-600">Total Orders</p>
        </div>
        <div className="bg-white rounded-xl p-4 flex-1 mx-1 shadow-md">
          <p className="text-xl font-bold text-gray-900 mb-1">{user.loyaltyPoints}</p>
          <p className="text-xs text-gray-600">Loyalty Points</p>
        </div>
        <div className="bg-white rounded-xl p-4 flex-1 mx-1 shadow-md">
          <div className="flex items-center mb-1">
            <p className="text-xl font-bold text-gray-900 mr-1">{user.ecoScore}</p>
            <Recycle size={16} className="text-green-600" />
          </div>
          <p className="text-xs text-gray-600">Eco Score</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="w-full bg-white rounded-2xl p-4 mb-3 flex items-center shadow-md"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
              {action.icon}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center mb-1">
                <h4 className="text-base font-medium text-gray-900 flex-1">{action.title}</h4>
                {action.badge && (
                  <div className="bg-green-600 px-2 py-1 rounded-lg">
                    <span className="text-white text-xs font-bold">{action.badge}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600">{action.subtitle}</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        ))}
      </div>

      {/* Recent Achievement */}
      <div className="bg-white mx-6 mt-6 rounded-2xl p-4 flex items-center shadow-md">
        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
          <Star size={20} className="text-yellow-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-base font-semibold text-gray-900 mb-1">Eco Champion</h4>
          <p className="text-xs text-gray-600 leading-4">
            You've returned 75+ empty jars this month! You're in the top 5% of eco-friendly users.
          </p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white mx-6 mt-6 rounded-2xl shadow-md">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`w-full flex items-center p-4 ${
              index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
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
        <p className="text-xs text-gray-500">AquaLink v2.0.0 - AI Enhanced Edition</p>
      </div>
    </div>
  );
}