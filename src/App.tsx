import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import OrganizationProfile from './pages/OrganizationProfile';
import ProjectDetails from './pages/ProjectDetails';
import CreateProject from './pages/CreateProject';
import CreateNonProfitProfile from './pages/CreateNonProfitProfile';
import Projects from './pages/Projects';
import Organizations from './pages/Organizations';
import UserProfile from './pages/UserProfile';
import Propose from './pages/Propose';
import About from './pages/About';
import Leaderboard from './pages/Leaderboard';
import Stake from './pages/Stake';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/organization/:id" element={<OrganizationProfile />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/create-profile" element={<CreateNonProfitProfile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/propose" element={<Propose />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/stake" element={<Stake />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;