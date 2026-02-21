import './App.css';
import Sidebar from './components/sidebar/sidebar';
import Home from './components/pages/home/Home';
import Dashboard from './components/dashboard/dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import About from './components/pages/about/about';
import OurProject from './components/pages/home/ourProject';
import Blogs from './components/pages/blogs/blogs';
import GetInTouch from './components/pages/contacts/getInTouch';
import SidebarSetting from './components/sidebar/SidebarSetting';
import PageBuilder from './components/pages/dynamicPage/PageBuilder';
import DynamicPageView from './components/pages/dynamicPage/DynamicPageView';

// Auth Imports
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 992);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Show sidebar only if user is logged in
  const showSidebar = user !== null;

  return (
    <div className="App">
      {showSidebar && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className={`main-content ${showSidebar && sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

          {/* Protected Admin Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/about-us" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><OurProject /></ProtectedRoute>} />
          <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
          <Route path="/contact-us" element={<ProtectedRoute><GetInTouch /></ProtectedRoute>} />
          <Route path="/sidebar-setting" element={<ProtectedRoute><SidebarSetting /></ProtectedRoute>} />
          <Route path="/page-builder" element={<ProtectedRoute><PageBuilder /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Default Dynamic View - Keep public as per user get route preference */}
          <Route path="/*" element={<DynamicPageView />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
