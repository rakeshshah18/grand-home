import './App.css';
import Sidebar from './components/sidebar/sidebar';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: '270px' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
