
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Shield, Eye, EyeOff, Check, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@/services/auth.service';

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', check: (pass: string) => pass.length >= 8 },
    { id: 'uppercase', label: 'Contains uppercase letter', check: (pass: string) => /[A-Z]/.test(pass) },
    { id: 'lowercase', label: 'Contains lowercase letter', check: (pass: string) => /[a-z]/.test(pass) },
    { id: 'number', label: 'Contains a number', check: (pass: string) => /[0-9]/.test(pass) },
  ];
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Sign Up | Trust Trend';
    
    return () => {
      document.title = 'Trust Trend';
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    // Validate password requirements
    const passesRequirements = passwordRequirements.every(req => req.check(formData.password));
    if (!passesRequirements) {
      toast({
        title: "Error",
        description: "Password does not meet all requirements",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await AuthService.signUp({
        name: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      if (response.success) {
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Sign Up Failed",
          description: response.error || "Failed to create account",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-6 py-24 bg-gradient-to-b from-blue-50 to-indigo-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Shield size={28} />
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-900">Trust Trend</h1>
            <p className="text-gray-600 mt-2">Create your account to get started</p>
          </div>
          
          <Card className="w-full shadow-lg animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl font-display">Create an Account</CardTitle>
              <CardDescription>
                Sign up to start using Trust Trend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  <div className="mt-2 space-y-2">
                    {passwordRequirements.map(req => (
                      <div key={req.id} className="flex items-center">
                        {req.check(formData.password) ? (
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <X className="h-4 w-4 text-gray-300 mr-2" />
                        )}
                        <span className={`text-xs ${req.check(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`pr-10 ${
                        formData.confirmPassword && 
                        formData.password !== formData.confirmPassword ? 
                        'border-red-500' : ''
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formData.confirmPassword && 
                   formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-6" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing
                    </span>
                  ) : "Create Account"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <a 
                  href="/login" 
                  className="text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  Log In
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
