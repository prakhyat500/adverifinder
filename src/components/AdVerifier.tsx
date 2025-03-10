
import { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { validateURL } from '@/utils/validation';
import { AlertTriangle, Check, XCircle, Globe, Shield, Upload, Instagram, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface VerificationResult {
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
  timestamp: string;
  imageUrl?: string;
}

const AdVerifier = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG)",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleVerify = () => {
    if (uploadMethod === 'url') {
      const validation = validateURL(url);
      if (!validation.isValid) {
        setUrlError(validation.message || 'Please enter a valid URL');
        return;
      }
      setUrlError('');
    } else if (!uploadedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image to verify",
        variant: "destructive"
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate API verification
    setTimeout(() => {
      // Simulate fake ad detection with a random result
      const isFake = Math.random() > 0.4; // Higher chance of fake for demonstration
      const brandNames = ['FashionChic', 'UrbanThreads', 'LuxeWear', 'StylePlus', 'TrendyFits'];
      const randomBrand = brandNames[Math.floor(Math.random() * brandNames.length)];
      
      // Save to history in localStorage
      const newResult: VerificationResult = {
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
        timestamp: new Date().toISOString(),
        imageUrl: uploadedImage || undefined
      };
      
      // Save to localStorage history
      const history = JSON.parse(localStorage.getItem('adVerificationHistory') || '[]');
      history.unshift(newResult);
      localStorage.setItem('adVerificationHistory', JSON.stringify(history.slice(0, 10))); // Keep last 10 items
      
      // Save last result
      localStorage.setItem('lastVerificationResult', JSON.stringify(newResult));
      
      setResult(newResult);
      setIsVerifying(false);
      
      // Show toast notification
      toast({
        title: isFake ? "Potential Fake Ad Detected" : "Verification Passed",
        description: isFake 
          ? `This appears to be a fake ${randomBrand} ad with ${newResult.confidence}% confidence.`
          : `This appears to be a legitimate ${randomBrand} ad.`,
        variant: isFake ? "destructive" : "default"
      });
    }, 2500);
  };
  
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const switchUploadMethod = (method: 'url' | 'file') => {
    setUploadMethod(method);
    setResult(null);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-pink-500/10 to-purple-500/10">
          <CardTitle className="text-2xl font-display flex items-center">
            <Instagram className="mr-2 h-6 w-6 text-pink-500" />
            Instagram Ad Verification Tool
          </CardTitle>
          <CardDescription>
            Verify the authenticity of clothing brand ads you see on Instagram
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex space-x-4 mb-6">
            <Button
              variant={uploadMethod === 'url' ? 'default' : 'outline'}
              onClick={() => switchUploadMethod('url')}
              className="flex-1"
            >
              <Globe className="mr-2 h-4 w-4" />
              Verify by URL
            </Button>
            <Button
              variant={uploadMethod === 'file' ? 'default' : 'outline'}
              onClick={() => switchUploadMethod('file')}
              className="flex-1"
            >
              <Image className="mr-2 h-4 w-4" />
              Verify by Image
            </Button>
          </div>

          {uploadMethod === 'url' ? (
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="https://www.instagram.com/p/example-post/"
                  value={url}
                  onChange={handleUrlChange}
                  className={cn(
                    "pl-10 h-11 transition-all", 
                    urlError ? "border-red-500" : ""
                  )}
                />
              </div>
              <Button 
                onClick={handleVerify} 
                disabled={isVerifying} 
                className="h-11 min-w-[120px] transition-all"
              >
                {isVerifying ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying
                  </span>
                ) : (
                  <span className="flex items-center">
                    Verify
                  </span>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/jpg"
                className="hidden"
              />
              
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                  uploadedImage ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-primary hover:bg-gray-50"
                )}
                onClick={triggerFileUpload}
              >
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
                        Supports JPEG and PNG (max 5MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleVerify} 
                disabled={isVerifying || !uploadedImage}
                className="w-full h-11"
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Verify this Instagram Ad
                  </span>
                )}
              </Button>
            </div>
          )}
          
          {urlError && (
            <p className="text-red-500 text-sm mt-2 animate-fade-in">{urlError}</p>
          )}
          
          {result && (
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
              
              {result.warnings.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Warning Signs:</h4>
                  <ul className="space-y-2">
                    {result.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="h-5 w-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Detailed Analysis</h4>
                <div className="space-y-4">
                  <AnalysisItem 
                    title="Brand Name" 
                    value={result.details.brand.name}
                    status={result.details.brand.isVerified}
                  />
                  <AnalysisItem 
                    title="Instagram Account Age" 
                    value={result.details.domain.age}
                    status={!result.details.domain.suspicious}
                  />
                  <AnalysisItem 
                    title="Unrealistic Claims" 
                    value={result.details.content.hasUnrealisticClaims ? "Detected" : "Not Detected"}
                    status={!result.details.content.hasUnrealisticClaims}
                  />
                  <AnalysisItem 
                    title="Pressure Tactics" 
                    value={result.details.content.hasPressureTactics ? "Detected" : "Not Detected"}
                    status={!result.details.content.hasPressureTactics}
                  />
                  <AnalysisItem 
                    title="Grammar & Spelling" 
                    value={result.details.content.hasPoorGrammar ? "Issues Found" : "No Issues"}
                    status={!result.details.content.hasPoorGrammar}
                  />
                  <AnalysisItem 
                    title="Contact Information" 
                    value={result.details.contact.hasValidContactInfo ? "Valid" : "Missing/Invalid"}
                    status={result.details.contact.hasValidContactInfo}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 border-t flex flex-col items-start p-6">
          <p className="text-sm text-gray-600">
            <strong>Remember:</strong> This tool helps identify potentially fake Instagram clothing ads, but always research brands thoroughly before making a purchase decision.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

interface AnalysisItemProps {
  title: string;
  value: string;
  status: boolean;
}

const AnalysisItem = ({ title, value, status }: AnalysisItemProps) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
    <span className="font-medium text-sm">{title}</span>
    <div className="flex items-center">
      <span className={cn(
        "text-sm mr-2",
        status ? "text-green-600" : "text-red-600"
      )}>
        {value}
      </span>
      {status ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-red-500" />
      )}
    </div>
  </div>
);

export default AdVerifier;
