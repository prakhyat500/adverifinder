
export interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const AuthService = {
  async signUp({ email, password, name }: SignUpCredentials) {
    try {
      // Mock signup without backend
      console.log('Mock signup:', { email, name });
      
      // Store auth state in localStorage for persistence
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ email, name }));
      
      return { 
        success: true, 
        data: { 
          user: { email, name } 
        } 
      };
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to create account',
      };
    }
  },

  async login({ email, password }: LoginCredentials) {
    try {
      // Mock login without backend
      console.log('Mock login:', { email });
      
      // For demo purposes, accept any credentials
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ email }));
      
      return { 
        success: true, 
        data: { 
          user: { email } 
        } 
      };
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      return {
        success: false,
        error: error.message || 'Invalid email or password',
      };
    }
  },

  async logout() {
    try {
      // Clear auth state from localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      
      return { success: true };
    } catch (error: any) {
      console.error('Error logging out:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to log out',
      };
    }
  },

  async getCurrentUser() {
    try {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const userJson = localStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
      
      return { success: true, user };
    } catch (error: any) {
      console.error('Error getting current user:', error.message);
      localStorage.removeItem('isAuthenticated');
      return { success: false, user: null };
    }
  },

  async isAuthenticated() {
    const { success, user } = await this.getCurrentUser();
    return success && !!user;
  }
};
