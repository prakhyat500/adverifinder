
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Shield, AlertTriangle, CheckCircle, ExternalLink, Search, Globe, Clock, CreditCard, Mail, Phone } from 'lucide-react';

const WebsiteAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    trustworthy: boolean;
    score: number;
    details: {
      domainAge: string;
      securePayment: boolean;
      contactInfo: boolean;
      returnPolicy: boolean;
      reviews: string;
      suspiciousElements: string[];
    };
  }>(null);
  
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = 'Website Analyzer | Trust Trend';
    return () => {
      document.title = 'Trust Trend';
    };
  }, []);
  
  const handleAnalyze = () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a website URL to analyze",
        variant: "destructive",
      });
      return;
    }
    
    // Simple URL validation
    if (!url.match(/^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // In a real application, this would make an API request
    // For demo purposes, we'll simulate the analysis with a timeout
    setTimeout(() => {
      // Simulating different responses based on the URL
      if (url.includes('scam') || url.includes('fake')) {
        setResult({
          trustworthy: false,
          score: 25,
          details: {
            domainAge: '2 days',
            securePayment: false,
            contactInfo: false,
            returnPolicy: false,
            reviews: 'None found',
            suspiciousElements: [
              'Very new domain',
              'No secure payment options',
              'Missing contact information',
              'No return policy',
              'Unrealistic discounts (90% off)'
            ]
          }
        });
      } else if (url.includes('suspicious')) {
        setResult({
          trustworthy: false,
          score: 45,
          details: {
            domainAge: '3 months',
            securePayment: true,
            contactInfo: false,
            returnPolicy: true,
            reviews: 'Limited, mixed reviews',
            suspiciousElements: [
              'Relatively new domain',
              'Missing contact information',
              'Unusual website design'
            ]
          }
        });
      } else {
        setResult({
          trustworthy: true,
          score: 85,
          details: {
            domainAge: '5+ years',
            securePayment: true,
            contactInfo: true,
            returnPolicy: true,
            reviews: 'Numerous positive reviews',
            suspiciousElements: []
          }
        });
      }
      
      setIsAnalyzing(false);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Search size={28} />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Website Trustworthiness Analyzer</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Verify the legitimacy of clothing websites before making purchases
            </p>
          </div>
          
          <Card className="mb-10 shadow-md">
            <CardHeader>
              <CardTitle>Analyze a Website</CardTitle>
              <CardDescription>
                Enter the URL of a clothing store website to check its trustworthiness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter website URL (e.g., www.example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="h-12 px-6 lg:w-auto"
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {result && (
            <div className="animate-fade-in">
              <div className={`rounded-lg p-6 mb-6 flex items-center ${
                result.trustworthy ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
              }`}>
                {result.trustworthy ? (
                  <CheckCircle className="h-10 w-10 text-green-500 mr-4 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-10 w-10 text-red-500 mr-4 flex-shrink-0" />
                )}
                <div>
                  <h2 className={`text-xl font-semibold ${result.trustworthy ? 'text-green-800' : 'text-red-800'}`}>
                    {result.trustworthy ? 'Trustworthy Website' : 'Suspicious Website - Exercise Caution'}
                  </h2>
                  <p className={`mt-1 ${result.trustworthy ? 'text-green-700' : 'text-red-700'}`}>
                    Trust Score: {result.score}/100 - {
                      result.score < 40 ? 'High Risk' : 
                      result.score < 70 ? 'Moderate Risk' : 
                      'Low Risk'
                    }
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-blue-500" />
                      Website Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <span className="block text-sm font-medium">Domain Age</span>
                          <span className={`text-sm ${
                            result.details.domainAge.includes('days') || result.details.domainAge.includes('month') 
                              ? 'text-amber-600' 
                              : 'text-green-600'
                          }`}>
                            {result.details.domainAge}
                          </span>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <CreditCard className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <span className="block text-sm font-medium">Secure Payment</span>
                          <span className={`text-sm ${result.details.securePayment ? 'text-green-600' : 'text-red-600'}`}>
                            {result.details.securePayment ? 'Available' : 'Not available'}
                          </span>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <span className="block text-sm font-medium">Contact Information</span>
                          <span className={`text-sm ${result.details.contactInfo ? 'text-green-600' : 'text-red-600'}`}>
                            {result.details.contactInfo ? 'Available' : 'Not available'}
                          </span>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <ExternalLink className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <span className="block text-sm font-medium">Return Policy</span>
                          <span className={`text-sm ${result.details.returnPolicy ? 'text-green-600' : 'text-red-600'}`}>
                            {result.details.returnPolicy ? 'Available' : 'Not available'}
                          </span>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <Star className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <span className="block text-sm font-medium">Reviews</span>
                          <span className="text-sm text-gray-600">{result.details.reviews}</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                      Risk Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result.details.suspiciousElements.length > 0 ? (
                      <ul className="space-y-2">
                        {result.details.suspiciousElements.map((element, index) => (
                          <li key={index} className="flex items-start">
                            <div className="h-5 w-5 flex items-center justify-center mr-3 text-red-500">⚠️</div>
                            <span className="text-sm">{element}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">No significant risk factors detected.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800">Our Recommendation</h3>
                    <p className="mt-1 text-blue-700">
                      {result.trustworthy 
                        ? 'This website appears to be legitimate based on our analysis. However, always exercise your judgment when making purchases online.'
                        : 'We recommend caution when considering purchases from this website. Multiple risk factors have been identified that may indicate a potentially fraudulent operation.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default WebsiteAnalyzer;
