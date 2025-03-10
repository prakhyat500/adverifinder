
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { validateURL } from '@/utils/validation';
import { ChevronRight, AlertTriangle, Check, XCircle, Globe, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  };
}

const AdVerifier = () => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (urlError) {
      const validation = validateURL(e.target.value);
      setUrlError(validation.isValid ? '' : validation.message || '');
    }
  };
  
  const handleVerify = () => {
    const validation = validateURL(url);
    if (!validation.isValid) {
      setUrlError(validation.message || 'Please enter a valid URL');
      return;
    }
    
    setUrlError('');
    setIsVerifying(true);
    
    // Simulate API verification
    setTimeout(() => {
      // Simulate fake ad detection with a random result
      const isFake = Math.random() > 0.5;
      
      setResult({
        isScam: isFake,
        confidence: Math.floor(isFake ? 75 + Math.random() * 20 : 15 + Math.random() * 30),
        warnings: isFake 
          ? [
              'Domain registered recently',
              'Unrealistic claims detected',
              'Poor grammar and spelling',
              'Missing contact information'
            ].slice(0, Math.floor(Math.random() * 3) + 1)
          : [],
        details: {
          domain: {
            age: isFake ? '2 days' : '3 years',
            suspicious: isFake
          },
          content: {
            hasUnrealisticClaims: isFake,
            hasPressureTactics: isFake && Math.random() > 0.5,
            hasPoorGrammar: isFake && Math.random() > 0.3
          },
          contact: {
            hasValidContactInfo: !isFake
          }
        }
      });
      
      setIsVerifying(false);
    }, 2500);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <CardTitle className="text-2xl font-display">Ad Verification Tool</CardTitle>
          <CardDescription>
            Enter the URL of an advertisement to verify its authenticity
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="https://example.com/ad"
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
                  Verify <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
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
                      ? "Warning: Potential Fake Advertisement" 
                      : "Verification Passed: Likely Legitimate"}
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
                    title="Domain Age" 
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
            <strong>Remember:</strong> Even with our advanced verification tools, always use your judgment and caution when interacting with online advertisements.
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
