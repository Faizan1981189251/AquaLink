import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Calendar, BarChart3, PieChart } from 'lucide-react';

export default function SupplierAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' },
  ];

  const monthlyData = {
    totalEarnings: 45600,
    totalOrders: 342,
    avgOrderValue: 133,
    newCustomers: 28,
    earningsGrowth: 12.5,
    ordersGrowth: 8.3,
    customerGrowth: 15.2,
  };

  const dailyEarnings = [
    { day: 'Mon', amount: 1200 },
    { day: 'Tue', amount: 1800 },
    { day: 'Wed', amount: 1500 },
    { day: 'Thu', amount: 2200 },
    { day: 'Fri', amount: 1900 },
    { day: 'Sat', amount: 2800 },
    { day: 'Sun', amount: 2100 },
  ];

  const productBreakdown = [
    { name: '20L Jars', percentage: 65, amount: 29640, color: '#2563EB' },
    { name: '1L Bottles', percentage: 25, amount: 11400, color: '#059669' },
    { name: '500ml Bottles', percentage: 10, amount: 4560, color: '#F59E0B' },
  ];

  const usageBreakdown = [
    { name: 'Home', percentage: 70, orders: 239, color: '#059669' },
    { name: 'Office', percentage: 20, orders: 68, color: '#2563EB' },
    { name: 'Party/Events', percentage: 10, orders: 35, color: '#7C3AED' },
  ];

  const maxEarning = Math.max(...dailyEarnings.map(d => d.amount));

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Analytics & Reports</h1>
        
        <div className="flex gap-2 overflow-x-auto">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedPeriod === period.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="flex flex-wrap px-6 mt-5 gap-3">
        <div className="bg-white rounded-2xl p-4 flex-1 min-w-[45%] shadow-md">
          <div className="flex justify-between items-center mb-3">
            <DollarSign size={20} className="text-green-600" />
            <div className="flex items-center bg-green-100 px-2 py-1 rounded-lg">
              <TrendingUp size={12} className="text-green-600 mr-1" />
              <span className="text-xs text-green-600 font-semibold">+{monthlyData.earningsGrowth}%</span>
            </div>
          </div>
          <p className="text-xl font-bold text-gray-900 mb-1">₹{monthlyData.totalEarnings.toLocaleString()}</p>
          <p className="text-xs text-gray-600">Total Earnings</p>
        </div>

        <div className="bg-white rounded-2xl p-4 flex-1 min-w-[45%] shadow-md">
          <div className="flex justify-between items-center mb-3">
            <Package size={20} className="text-blue-600" />
            <div className="flex items-center bg-blue-100 px-2 py-1 rounded-lg">
              <TrendingUp size={12} className="text-blue-600 mr-1" />
              <span className="text-xs text-blue-600 font-semibold">+{monthlyData.ordersGrowth}%</span>
            </div>
          </div>
          <p className="text-xl font-bold text-gray-900 mb-1">{monthlyData.totalOrders}</p>
          <p className="text-xs text-gray-600">Total Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-4 flex-1 min-w-[45%] shadow-md">
          <div className="flex justify-between items-center mb-3">
            <BarChart3 size={20} className="text-purple-600" />
            <div className="flex items-center bg-purple-100 px-2 py-1 rounded-lg">
              <TrendingUp size={12} className="text-purple-600 mr-1" />
              <span className="text-xs text-purple-600 font-semibold">+5.2%</span>
            </div>
          </div>
          <p className="text-xl font-bold text-gray-900 mb-1">₹{monthlyData.avgOrderValue}</p>
          <p className="text-xs text-gray-600">Avg Order Value</p>
        </div>

        <div className="bg-white rounded-2xl p-4 flex-1 min-w-[45%] shadow-md">
          <div className="flex justify-between items-center mb-3">
            <Users size={20} className="text-red-600" />
            <div className="flex items-center bg-red-100 px-2 py-1 rounded-lg">
              <TrendingUp size={12} className="text-red-600 mr-1" />
              <span className="text-xs text-red-600 font-semibold">+{monthlyData.customerGrowth}%</span>
            </div>
          </div>
          <p className="text-xl font-bold text-gray-900 mb-1">{monthlyData.newCustomers}</p>
          <p className="text-xs text-gray-600">New Customers</p>
        </div>
      </div>

      {/* Daily Earnings Chart */}
      <div className="bg-white mx-6 mt-5 rounded-2xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-900">Daily Earnings</h2>
          <button className="flex items-center">
            <Calendar size={16} className="text-blue-600 mr-1" />
            <span className="text-xs text-blue-600 font-medium">View Details</span>
          </button>
        </div>
        
        <div className="h-32">
          <div className="flex items-end justify-between h-24 px-2">
            {dailyEarnings.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-4 rounded-t mb-2 ${
                    item.amount === maxEarning ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  style={{ height: `${(item.amount / maxEarning) * 80}px` }}
                />
                <span className="text-xs text-gray-600">{item.day}</span>
                <span className="text-xs text-gray-500">₹{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Breakdown */}
      <div className="bg-white mx-6 mt-5 rounded-2xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-gray-900">Product Performance</h2>
          <PieChart size={20} className="text-blue-600" />
        </div>
        
        {productBreakdown.map((product, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: product.color }}
                />
                <span className="text-sm font-medium text-gray-900">{product.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">{product.percentage}%</span>
                <p className="text-xs text-gray-600">₹{product.amount.toLocaleString()}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full"
                style={{ 
                  width: `${product.percentage}%`,
                  backgroundColor: product.color 
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Usage Analysis */}
      <div className="bg-white mx-6 mt-5 rounded-2xl p-4 shadow-md">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Usage Analysis</h2>
        
        {usageBreakdown.map((usage, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: usage.color }}
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">{usage.name}</span>
                  <p className="text-xs text-gray-600">{usage.orders} orders</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-900">{usage.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full"
                style={{ 
                  width: `${usage.percentage}%`,
                  backgroundColor: usage.color 
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Summary */}
      <div className="bg-white mx-6 mt-5 mb-6 rounded-2xl p-4 shadow-md">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Monthly Summary</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-600 mb-1">Best Day</p>
            <p className="text-sm font-bold text-gray-900 mb-1">Saturday</p>
            <p className="text-xs text-gray-500">₹2,800 earned</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-600 mb-1">Top Product</p>
            <p className="text-sm font-bold text-gray-900 mb-1">20L Jars</p>
            <p className="text-xs text-gray-500">65% of sales</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-600 mb-1">Growth Rate</p>
            <p className="text-sm font-bold text-gray-900 mb-1">+12.5%</p>
            <p className="text-xs text-gray-500">vs last month</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-600 mb-1">Customer Retention</p>
            <p className="text-sm font-bold text-gray-900 mb-1">78%</p>
            <p className="text-xs text-gray-500">repeat customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}