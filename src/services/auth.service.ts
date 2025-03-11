
import { supabase } from '@/lib/supabase';

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
    console.log('Sending signup request to Supabase:', { email, name });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;
      console.log('Signup response from Supabase:', data);
      
      // Store auth state in localStorage for persistence
      if (data.user) {
        localStorage.setItem('isAuthenticated', 'true');
      }
      
      return { success: true, data };
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to create account',
      };
    }
  },

  async login({ email, password }: LoginCredentials) {
    console.log('Sending login request to Supabase:', { email });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      console.log('Login response from Supabase:', data);
      
      // Store auth state in localStorage for persistence
      if (data.user) {
        localStorage.setItem('isAuthenticated', 'true');
      }
      
      return { success: true, data };
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
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear auth state from localStorage
      localStorage.removeItem('isAuthenticated');
      
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
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      // Update localStorage based on current session
      if (data.user) {
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        localStorage.removeItem('isAuthenticated');
      }
      
      return { success: true, user: data.user };
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
