
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';
import { Instagram } from 'lucide-react';

const Login = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Log In | InstaAdVerifier';
    
    return () => {
      document.title = 'InstaAdVerifier';
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-6 py-24 bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="w-full">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 text-pink-600 mb-4">
              <Instagram size={28} />
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-900">InstaAdVerifier</h1>
            <p className="text-gray-600 mt-2">Protect yourself from fake clothing ads on Instagram</p>
          </div>
          <AuthForm type="login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
