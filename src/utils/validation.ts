
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) return { isValid: false, message: 'Email is required' };
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return { isValid: false, message: 'Please enter a valid email address' };
  
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) return { isValid: false, message: 'Password is required' };
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }
  
  // Check if password has at least one uppercase letter, one lowercase letter, and one number
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  if (!hasUppercase || !hasLowercase || !hasNumber) {
    return { 
      isValid: false, 
      message: 'Password must include uppercase, lowercase letters and numbers' 
    };
  }
  
  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name) return { isValid: false, message: 'Name is required' };
  
  if (name.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters' };
  }
  
  return { isValid: true };
};

export const validateURL = (url: string): ValidationResult => {
  if (!url) return { isValid: false, message: 'URL is required' };
  
  try {
    new URL(url);
    return { isValid: true };
  } catch (error) {
    return { isValid: false, message: 'Please enter a valid URL' };
  }
};
