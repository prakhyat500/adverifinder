
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Check, Clock, Search, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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

const VerificationHistory = () => {
  const [history, setHistory] = useState<VerificationResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<VerificationResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('adVerificationHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('adVerificationHistory');
    setHistory([]);
    setSelectedResult(null);
    toast({
      title: "History cleared",
      description: "Your verification history has been cleared",
    });
  };

  const viewDetails = (result: VerificationResult) => {
    setSelectedResult(result);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <Card className="shadow-md border-0">
      <CardHeader className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Verification History</CardTitle>
            <CardDescription>Your previous ad verifications</CardDescription>
          </div>
          {history.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearHistory}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {history.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No verification history yet</p>
            <p className="text-gray-500 text-sm mt-1">Verify an Instagram ad to see results here</p>
          </div>
        ) : (
          <div className="divide-y">
            {history.map((result, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-4 hover:bg-gray-50 transition-colors cursor-pointer",
                  selectedResult === result ? "bg-gray-50" : ""
                )}
                onClick={() => viewDetails(result)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {result.isScam ? (
                      <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">
                        {result.details.brand.name} Ad
                      </p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(result.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    result.isScam 
                      ? "bg-red-100 text-red-700" 
                      : "bg-green-100 text-green-700"
                  )}>
                    {result.isScam ? 'Fake' : 'Authentic'} ({result.confidence}%)
                  </div>
                </div>
                
                {selectedResult === result && (
                  <div className="mt-4 animate-fade-in">
                    {result.imageUrl && (
                      <div className="mb-4 border rounded-md overflow-hidden">
                        <img 
                          src={result.imageUrl} 
                          alt="Verified ad" 
                          className="w-full h-48 object-contain"
                        />
                      </div>
                    )}
                    
                    {result.warnings.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-2">Warning Signs:</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {result.warnings.map((warning, i) => (
                            <li key={i} className="flex items-start">
                              <span className="h-5 w-5 text-red-500 flex-shrink-0 mr-2">⚠️</span>
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div className="flex justify-between items-center py-1 border-b border-gray-100">
                        <span className="font-medium">Brand</span>
                        <span>{result.details.brand.name}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-100">
                        <span className="font-medium">Account Age</span>
                        <span>{result.details.domain.age}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-100">
                        <span className="font-medium">Claims</span>
                        <span>{result.details.content.hasUnrealisticClaims ? 'Unrealistic' : 'Realistic'}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-gray-100">
                        <span className="font-medium">Contact Info</span>
                        <span>{result.details.contact.hasValidContactInfo ? 'Valid' : 'Invalid'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationHistory;
