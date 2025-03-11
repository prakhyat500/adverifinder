
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateEmail, validatePassword, validateName } from '@/utils/validation';
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { AuthService, LoginCredentials, SignUpCredentials } from '@/services/auth.service';

interface AuthFormProps {
  type: 'login' | 'signup';
  className?: string;
}

interface FormField {
  value: string;
  error: string;
  touched: boolean;
}

const AuthForm = ({ type, className }: AuthFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formState, setFormState] = useState({
    name: { value: '', error: '', touched: false },
    email: { value: '', error: '', touched: false },
    password: { value: '', error: '', touched: false }
  });
  
  const updateField = (field: string, value: string) => {
    let error = '';
    
    if (field === 'email') {
      const result = validateEmail(value);
      if (!result.isValid) error = result.message || '';
    } else if (field === 'password') {
      const result = validatePassword(value);
      if (!result.isValid) error = result.message || '';
    } else if (field === 'name' && type === 'signup') {
      const result = validateName(value);
      if (!result.isValid) error = result.message || '';
    }
    
    setFormState(prev => ({
      ...prev,
      [field]: { 
        value, 
        error, 
        touched: true 
      }
    }));
  };
  
  const validateForm = () => {
    let isValid = true;
    const newFormState = { ...formState };
    
    // Validate email
    const emailResult = validateEmail(formState.email.value);
    if (!emailResult.isValid) {
      newFormState.email.error = emailResult.message || '';
      newFormState.email.touched = true;
      isValid = false;
    }
    
    // Validate password
    const passwordResult = validatePassword(formState.password.value);
    if (!passwordResult.isValid) {
      newFormState.password.error = passwordResult.message || '';
      newFormState.password.touched = true;
      isValid = false;
    }
    
    // Validate name for signup
    if (type === 'signup') {
      const nameResult = validateName(formState.name.value);
      if (!nameResult.isValid) {
        newFormState.name.error = nameResult.message || '';
        newFormState.name.touched = true;
        isValid = false;
      }
    }
    
    setFormState(newFormState);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      let response;
      
      if (type === 'login') {
        const credentials: LoginCredentials = {
          email: formState.email.value,
          password: formState.password.value
        };
        
        response = await AuthService.login(credentials);
      } else {
        const credentials: SignUpCredentials = {
          name: formState.name.value,
          email: formState.email.value,
          password: formState.password.value
        };
        
        response = await AuthService.signUp(credentials);
      }
      
      if (response.success) {
        toast({
          title: type === 'login' ? "Welcome back!" : "Account created!",
          description: type === 'login' 
            ? "You've successfully logged in to your account." 
            : "Your account has been created successfully.",
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Authentication Error",
          description: response.error,
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
    <Card className={cn("w-full max-w-md mx-auto shadow-lg animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-display">
          {type === 'login' ? 'Welcome Back' : 'Create an Account'}
        </CardTitle>
        <CardDescription>
          {type === 'login' 
            ? 'Sign in to your account to continue' 
            : 'Sign up for AdVeriFinder to spot fake ads'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formState.name.value}
                onChange={(e) => updateField('name', e.target.value)}
                className={formState.name.error && formState.name.touched ? 'border-red-500' : ''}
              />
              {formState.name.error && formState.name.touched && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">{formState.name.error}</p>
              )}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formState.email.value}
              onChange={(e) => updateField('email', e.target.value)}
              className={formState.email.error && formState.email.touched ? 'border-red-500' : ''}
            />
            {formState.email.error && formState.email.touched && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">{formState.email.error}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={type === 'signup' ? 'Create a secure password' : 'Enter your password'}
                value={formState.password.value}
                onChange={(e) => updateField('password', e.target.value)}
                className={formState.password.error && formState.password.touched ? 'border-red-500 pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formState.password.error && formState.password.touched && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">{formState.password.error}</p>
            )}
          </div>
          
          {type === 'login' && (
            <div className="text-sm">
              <a 
                href="#" 
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          )}
          
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
            ) : (
              <span className="flex items-center">
                {type === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-sm text-center text-gray-500">
          {type === 'login' ? "Don't have an account? " : "Already have an account? "}
          <a 
            href={type === 'login' ? '/signup' : '/login'} 
            className="text-primary hover:text-primary/80 hover:underline transition-colors"
          >
            {type === 'login' ? 'Sign Up' : 'Sign In'}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
