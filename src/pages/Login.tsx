import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Store } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'supplier'>('customer');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password, userType);
      navigate(userType === 'supplier' ? '/supplier/dashboard' : '/');
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md mb-6"
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your account</p>
      </div>

      {/* User Type Selection */}
      <div className="px-6 mb-6">
        <p className="text-base font-semibold text-gray-900 mb-3">I am a:</p>
        <div className="flex gap-3">
          <button
            onClick={() => setUserType('customer')}
            className={`flex-1 flex items-center justify-center bg-white py-4 px-4 rounded-2xl border-2 shadow-md ${
              userType === 'customer' ? 'border-blue-600 bg-blue-600' : 'border-gray-200'
            }`}
          >
            <User size={20} className={userType === 'customer' ? 'text-white' : 'text-gray-600'} />
            <span className={`ml-2 text-sm font-semibold ${
              userType === 'customer' ? 'text-white' : 'text-gray-600'
            }`}>
              Customer
            </span>
          </button>
          
          <button
            onClick={() => setUserType('supplier')}
            className={`flex-1 flex items-center justify-center bg-white py-4 px-4 rounded-2xl border-2 shadow-md ${
              userType === 'supplier' ? 'border-blue-600 bg-blue-600' : 'border-gray-200'
            }`}
          >
            <Store size={20} className={userType === 'supplier' ? 'text-white' : 'text-gray-600'} />
            <span className={`ml-2 text-sm font-semibold ${
              userType === 'supplier' ? 'text-white' : 'text-gray-600'
            }`}>
              Water Supplier
            </span>
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="px-6">
        <div className="mb-4">
          <div className="flex items-center bg-white rounded-2xl px-4 py-1 shadow-md">
            <Mail size={20} className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 py-4 text-base text-gray-900 bg-transparent outline-none"
              autoCapitalize="none"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center bg-white rounded-2xl px-4 py-1 shadow-md">
            <Lock size={20} className="text-gray-500 mr-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 py-4 text-base text-gray-900 bg-transparent outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1"
            >
              {showPassword ? (
                <EyeOff size={20} className="text-gray-500" />
              ) : (
                <Eye size={20} className="text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div className="text-right mb-8">
          <button type="button" className="text-blue-600 text-sm font-medium">
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold mb-6 disabled:opacity-60 shadow-lg"
        >
          {loading ? 'Signing in...' : `Sign In as ${userType === 'customer' ? 'Customer' : 'Supplier'}`}
        </button>

        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or continue with</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="flex gap-3 mb-8">
          <button
            type="button"
            className="flex-1 bg-white py-4 rounded-2xl font-medium shadow-md"
          >
            Google
          </button>
          <button
            type="button"
            className="flex-1 bg-white py-4 rounded-2xl font-medium shadow-md"
          >
            Facebook
          </button>
        </div>

        <div className="text-center">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <Link to="/signup" className="text-blue-600 text-sm font-semibold">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}