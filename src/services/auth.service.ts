
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
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
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
      return { success: true, user: data.user };
    } catch (error: any) {
      console.error('Error getting current user:', error.message);
      return { success: false, user: null };
    }
  },

  async isAuthenticated() {
    const { success, user } = await this.getCurrentUser();
    return success && !!user;
  }
};
