
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validateURL } from '@/utils/validation';
import { AlertTriangle, Check, XCircle, Globe, Shield, Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const AdAnalyzer = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'website' | 'image'>('website');
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (urlError) {
      const validation = validateURL(e.target.value);
      setUrlError(validation.isValid ? '' : validation.message || '');
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG)",
        variant: "destructive"
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleAnalyzeWebsite = () => {
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
    
    setIsVerifying(true);
    
    // Simulate website analysis
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
      
      setIsVerifying(false);
    }, 2000);
  };
  
  const handleAnalyzeImage = () => {
    if (!uploadedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image to analyze",
        variant: "destructive"
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate image analysis
    setTimeout(() => {
      setResult({
        isScam: Math.random() > 0.5,
        confidence: Math.floor(Math.random() * 30) + 70,
        details: {
          brand: {
            name: 'Example Brand',
            isVerified: Math.random() > 0.3
          },
          domain: {
            age: Math.random() > 0.5 ? '2 years' : '3 days',
            suspicious: Math.random() > 0.5
          },
          content: {
            hasUnrealisticClaims: Math.random() > 0.7,
            hasPressureTactics: Math.random() > 0.6,
            hasPoorGrammar: Math.random() > 0.8
          },
          contact: {
            hasValidContactInfo: Math.random() > 0.4
          }
        },
        warnings: [
          'Unrealistic discount claims',
          'Missing contact information',
          'Poor image quality compared to official brand photos'
        ].filter(() => Math.random() > 0.5)
      });
      
      setIsVerifying(false);
    }, 2000);
  };
  
  const handleAnalyze = () => {
    if (activeTab === 'website') {
      handleAnalyzeWebsite();
    } else {
      handleAnalyzeImage();
    }
  };
  
  return (
    <Card className="shadow-lg border-0 overflow-hidden w-full max-w-3xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-500/20 pb-6">
        <CardTitle className="text-2xl font-display flex items-center">
          <Shield className="mr-2 h-6 w-6 text-blue-500" />
          Ad & Website Analysis Tool
        </CardTitle>
        <CardDescription>
          Verify the legitimacy of clothing stores and social media advertisements
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs 
          defaultValue="website" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'website' | 'image')}
          className="mb-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="website" className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Website Analysis
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center">
              <ImageIcon className="mr-2 h-4 w-4" />
              Image Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="website" className="mt-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Enter website URL (e.g., www.example.com)"
                  value={url}
                  onChange={handleUrlChange}
                  className={cn(
                    "pl-10 h-11 transition-all", 
                    urlError ? "border-red-500" : ""
                  )}
                />
              </div>
              <Button 
                onClick={handleAnalyze} 
                disabled={isVerifying} 
                className="h-11 min-w-[120px] transition-all"
              >
                {isVerifying ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing
                  </span>
                ) : (
                  <span className="flex items-center">
                    Analyze
                  </span>
                )}
              </Button>
            </div>
            {urlError && (
              <p className="text-red-500 text-sm mt-2 animate-fade-in">{urlError}</p>
            )}
          </TabsContent>
          
          <TabsContent value="image" className="mt-4">
            <div className="space-y-4">
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                  uploadedImage ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-primary hover:bg-gray-50"
                )}
                onClick={() => document.getElementById('imageUpload')?.click()}
              >
                <input
                  id="imageUpload"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/jpg"
                  className="hidden"
                />
                
                {uploadedImage ? (
                  <div className="space-y-4">
                    <div className="w-full max-h-64 overflow-hidden rounded-md mx-auto">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded ad" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm text-gray-500">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-base font-medium">
                        Drop image here or click to upload
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload screenshots of ads to verify legitimacy
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleAnalyze} 
                disabled={isVerifying || !uploadedImage}
                className="w-full h-11"
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Analyze Ad Image
                  </span>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {result && activeTab === 'website' && (
          <div className="mt-8 animate-fade-in">
            <div className={cn(
              "rounded-lg p-6 mb-6 flex items-center",
              result.trustworthy ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
            )}>
              {result.trustworthy ? (
                <Check className="h-10 w-10 text-green-500 mr-4 flex-shrink-0" />
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
            
            {result.details.suspiciousElements.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Warning Signs:</h4>
                <ul className="space-y-2">
                  {result.details.suspiciousElements.map((element: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="h-5 w-5 mr-3 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{element}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {result && activeTab === 'image' && (
          <div className="mt-8 animate-fade-in">
            <div className={cn(
              "flex items-center p-4 rounded-lg mb-6",
              result.isScam 
                ? "bg-red-50 border border-red-100 text-red-800" 
                : "bg-green-50 border border-green-100 text-green-800"
            )}>
              {result.isScam ? (
                <AlertTriangle className="h-6 w-6 mr-3 text-red-500" />
              ) : (
                <Shield className="h-6 w-6 mr-3 text-green-500" />
              )}
              <div>
                <h3 className="text-lg font-medium">
                  {result.isScam 
                    ? `Warning: Potential Fake ${result.details.brand.name} Ad` 
                    : `Verification Passed: Legitimate ${result.details.brand.name} Ad`}
                </h3>
                <p className="text-sm opacity-90">
                  {result.isScam 
                    ? `Our system detected suspicious elements with ${result.confidence}% confidence.` 
                    : `Our system found no suspicious elements with ${result.confidence}% confidence.`}
                </p>
              </div>
            </div>
            
            {result.warnings && result.warnings.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Warning Signs:</h4>
                <ul className="space-y-2">
                  {result.warnings.map((warning: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <XCircle className="h-5 w-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 border-t flex flex-col items-start p-6">
        <p className="text-sm text-gray-600">
          <strong>Remember:</strong> This tool helps identify potentially fraudulent websites and ads, but always research brands thoroughly before making a purchase decision.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AdAnalyzer;
