
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Log In | AdVeriFinder';
    
    return () => {
      document.title = 'AdVeriFinder';
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-6 py-24">
        <div className="w-full">
          <AuthForm type="login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
