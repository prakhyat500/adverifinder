
import { supabase } from '@/lib/supabase';

export interface VerificationRequest {
  url?: string;
  imageData?: string;
}

export interface VerificationResult {
  id: string;
  isScam: boolean;
  confidence: number;
  warnings: string[];
  details: {
    domain: {
      age: string;
      suspicious: boolean;
    };
    content: {
      hasUnrealisticClaims: boolean;
      hasPressureTactics: boolean;
      hasPoorGrammar: boolean;
    };
    contact: {
      hasValidContactInfo: boolean;
    };
    brand: {
      name: string;
      isVerified: boolean;
    };
  };
  imageUrl?: string;
  createdAt: string;
  userId: string;
}

export const AdService = {
  async verifyAd({ url, imageData }: VerificationRequest) {
    console.log('Starting ad verification process:', { url, hasImage: !!imageData });
    try {
      // For now, we'll simulate the verification process
      // In a real implementation, you would call an AI service or backend API
      
      // If imageData is provided, we would upload it to Supabase storage
      let imageUrl;
      if (imageData) {
        console.log('Preparing to upload image to Supabase storage');
        // Extract the base64 data (remove the prefix like "data:image/png;base64,")
        const base64Data = imageData.split(',')[1];
        if (!base64Data) throw new Error('Invalid image data');
        
        // Generate a unique filename
        const fileName = `ad-images/${Date.now()}.png`;
        
        // Upload to Supabase storage
        console.log('Uploading image to bucket: ad-verifications');
        const { data, error } = await supabase.storage
          .from('ad-verifications')
          .upload(fileName, Buffer.from(base64Data, 'base64'), {
            contentType: 'image/png',
          });
          
        if (error) throw error;
        console.log('Image uploaded successfully:', data);
        
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('ad-verifications')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
        console.log('Image public URL:', imageUrl);
      }
      
      // Simulate API verification with a random result
      const isFake = Math.random() > 0.4; // Higher chance of fake for demonstration
      const brandNames = ['FashionChic', 'UrbanThreads', 'LuxeWear', 'StylePlus', 'TrendyFits'];
      const randomBrand = brandNames[Math.floor(Math.random() * brandNames.length)];
      
      // Get current user
      console.log('Getting current user from Supabase');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      console.log('Current user:', user.id);
      
      // Create the verification result
      const verificationResult: Omit<VerificationResult, 'id'> = {
        isScam: isFake,
        confidence: Math.floor(isFake ? 75 + Math.random() * 20 : 15 + Math.random() * 30),
        warnings: isFake 
          ? [
              'Suspicious Instagram account age',
              'Unrealistic discount claims',
              'Similar designs to original brand',
              'Poor customer reviews',
              'Missing contact information'
            ].slice(0, Math.floor(Math.random() * 3) + 1)
          : [],
        details: {
          domain: {
            age: isFake ? '2 weeks' : '3 years',
            suspicious: isFake
          },
          content: {
            hasUnrealisticClaims: isFake,
            hasPressureTactics: isFake && Math.random() > 0.5,
            hasPoorGrammar: isFake && Math.random() > 0.3
          },
          contact: {
            hasValidContactInfo: !isFake
          },
          brand: {
            name: randomBrand,
            isVerified: !isFake
          }
        },
        imageUrl,
        createdAt: new Date().toISOString(),
        userId: user.id
      };
      
      // Save the verification result to the database
      console.log('Saving verification result to Supabase');
      const { data, error } = await supabase
        .from('ad_verifications')
        .insert([verificationResult])
        .select('*')
        .single();
        
      if (error) throw error;
      console.log('Verification result saved:', data);
      
      return { 
        success: true, 
        result: data as VerificationResult 
      };
    } catch (error: any) {
      console.error('Error verifying ad:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to verify ad',
      };
    }
  },
  
  async getUserVerifications() {
    console.log('Fetching user verification history');
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      console.log('Current user:', user.id);
      
      const { data, error } = await supabase
        .from('ad_verifications')
        .select('*')
        .eq('userId', user.id)
        .order('createdAt', { ascending: false });
        
      if (error) throw error;
      console.log('Verification history fetched:', data?.length, 'records');
      
      return { 
        success: true, 
        verifications: data as VerificationResult[] 
      };
    } catch (error: any) {
      console.error('Error getting user verifications:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to get verifications',
        verifications: []
      };
    }
  }
};
