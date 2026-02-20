import './App.css';
import Sidebar from './components/sidebar/sidebar';
import Home from './components/pages/home/Home';
import Dashboard from './components/dashboard/dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import About from './components/pages/about/about';
import OurProject from './components/pages/home/ourProject';
import Blogs from './components/pages/blogs/blogs';
import GetInTouch from './components/pages/contacts/getInTouch';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 992);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/projects" element={<OurProject />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact-us" element={<GetInTouch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
