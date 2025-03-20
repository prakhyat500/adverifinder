
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Index from './pages/Index';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Features from './pages/Features';
import NotFound from './pages/NotFound';
import Reviews from './pages/Reviews';
import WebsiteAnalyzer from './pages/WebsiteAnalyzer';
import VirtualTryOn from './pages/VirtualTryOn';
import AIStyler from './pages/AIStyler';
import Shop from './pages/Shop';
import UserProfile from './pages/UserProfile';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/analyzer" element={<WebsiteAnalyzer />} />
        <Route path="/try-on" element={<VirtualTryOn />} />
        <Route path="/styler" element={<AIStyler />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
