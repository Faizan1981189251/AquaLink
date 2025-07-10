import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Suppliers from './pages/Suppliers';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import SupplierDashboard from './pages/supplier/Dashboard';
import SupplierOrders from './pages/supplier/Orders';
import SupplierAnalytics from './pages/supplier/Analytics';
import SupplierSettings from './pages/supplier/Settings';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppRoutes() {
  const { user, userType } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    );
  }

  if (userType === 'supplier') {
    return (
      <Layout userType="supplier">
        <Routes>
          <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
          <Route path="/supplier/orders" element={<SupplierOrders />} />
          <Route path="/supplier/analytics" element={<SupplierAnalytics />} />
          <Route path="/supplier/settings" element={<SupplierSettings />} />
          <Route path="*" element={<Navigate to="/supplier/dashboard" replace />} />
        </Routes>
      </Layout>
    );
  }

  return (
    <Layout userType="customer">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  useEffect(() => {
    // Ensure CSS is loaded
    document.body.classList.add('loaded');
    document.body.classList.remove('loading');
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen full-height water-gradient">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;