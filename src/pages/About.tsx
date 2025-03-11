
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Instagram, AlertTriangle, CheckCircle } from 'lucide-react';

const About = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'About | InstaAdVerifier';
    
    return () => {
      document.title = 'InstaAdVerifier';
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-pink-100 text-pink-600 mb-4">
              <Shield size={28} />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900">About InstaAdVerifier</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Helping you identify and avoid fake clothing advertisements on Instagram
            </p>
          </div>
          
          <div className="space-y-8">
            <Card className="border-0 shadow-md animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Instagram className="h-5 w-5 mr-2 text-pink-500" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  InstaAdVerifier was created to protect online shoppers from fraudulent clothing advertisements that have become increasingly common on Instagram. Our mission is to provide a reliable tool that helps users verify the legitimacy of clothing brands and advertisements before making purchases.
                </p>
                <p className="text-gray-600 mt-4">
                  With the rise of drop-shipping scams and fake designer stores, many people have lost money to non-existent products, poor quality items, or outright fraud. We aim to reduce these incidents by giving users the information they need to make informed decisions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our verification system analyzes Instagram clothing ads through multiple factors:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600">
                  <li>Domain age and reputation assessment</li>
                  <li>Content analysis for unrealistic claims and pressure tactics</li>
                  <li>Contact information validation</li>
                  <li>Brand verification against our database of legitimate retailers</li>
                  <li>Visual analysis of advertisement images</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  After analysis, we provide a detailed report with our assessment and specific warnings about potential issues we've identified.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Shopping Safely Online
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  When shopping from Instagram ads, we recommend these additional safety measures:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600">
                  <li>Always verify the store has secure payment methods (look for HTTPS)</li>
                  <li>Check for clear return and refund policies</li>
                  <li>Look for customer reviews on external platforms</li>
                  <li>Use payment methods with buyer protection (credit cards, PayPal)</li>
                  <li>Be wary of prices that seem too good to be true</li>
                  <li>Watch out for poor grammar and spelling on the website</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
