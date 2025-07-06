import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'customer' as 'customer' | 'supplier'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await signup(formData.email, formData.password, formData.fullName, formData.userType);
      alert('Account created successfully!');
      navigate(formData.userType === 'supplier' ? '/supplier/dashboard' : '/');
    } catch (error) {
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-600">Join AquaLink today</p>
      </div>

      <div className="px-6 overflow-y-auto">
        {/* User Type Selection */}
        <div className="mb-6">
          <p className="text-base font-semibold text-gray-900 mb-3">I want to:</p>
          <div className="flex gap-3">
            <button
              onClick={() => updateFormData('userType', 'customer')}
              className={`flex-1 flex items-center justify-center bg-white py-4 px-4 rounded-2xl border-2 shadow-md ${
                formData.userType === 'customer' ? 'border-blue-600 bg-blue-600' : 'border-gray-200'
              }`}
            >
              <User size={20} className={formData.userType === 'customer' ? 'text-white' : 'text-gray-600'} />
              <span className={`ml-2 text-sm font-semibold ${
                formData.userType === 'customer' ? 'text-white' : 'text-gray-600'
              }`}>
                Order Water
              </span>
            </button>
            
            <button
              onClick={() => updateFormData('userType', 'supplier')}
              className={`flex-1 flex items-center justify-center bg-white py-4 px-4 rounded-2xl border-2 shadow-md ${
                formData.userType === 'supplier' ? 'border-blue-600 bg-blue-600' : 'border-gray-200'
              }`}
            >
              <User size={20} className={formData.userType === 'supplier' ? 'text-white' : 'text-gray-600'} />
              <span className={`ml-2 text-sm font-semibold ${
                formData.userType === 'supplier' ? 'text-white' : 'text-gray-600'
              }`}>
                Supply Water
              </span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <div className="flex items-center bg-white rounded-2xl px-4 py-1 shadow-md">
              <User size={20} className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                className="flex-1 py-4 text-base text-gray-900 bg-transparent outline-none"
                autoCapitalize="words"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center bg-white rounded-2xl px-4 py-1 shadow-md">
              <Mail size={20} className="text-gray-500 mr-3" />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="flex-1 py-4 text-base text-gray-900 bg-transparent outline-none"
                autoCapitalize="none"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center bg-white rounded-2xl px-4 py-1 shadow-md">
              <Phone size={20} className="text-gray-500 mr-3" />
              <input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="flex-1 py-4 text-base text-gray-900 bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center bg-white rounded-2xl px-4 py-1 shadow-md">
              <Lock size={20} className="text-gray-500 mr-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
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

          <div className="mb-4">
            <div className="flex items-center bg-white rounded-2xl px-4 py-1 shadow-md">
              <Lock size={20} className="text-gray-500 mr-3" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                className="flex-1 py-4 text-base text-gray-900 bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="p-1"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold mb-6 mt-4 disabled:opacity-60 shadow-lg"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
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

          <div className="text-center mb-6">
            <span className="text-gray-600 text-sm">Already have an account? </span>
            <Link to="/login" className="text-blue-600 text-sm font-semibold">
              Sign in
            </Link>
          </div>

          <div className="pb-8">
            <p className="text-xs text-gray-500 text-center leading-5">
              By creating an account, you agree to our{' '}
              <span className="text-blue-600 font-medium">Terms of Service</span> and{' '}
              <span className="text-blue-600 font-medium">Privacy Policy</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}