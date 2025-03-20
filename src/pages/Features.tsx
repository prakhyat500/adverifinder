
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdAnalyzer from '@/components/AdAnalyzer';
import { 
  Image, 
  History, 
  BarChart3, 
  Shield, 
  AlertTriangle, 
  Search,
  Database,
  MessageSquare,
  Shirt,
  Sparkles
} from 'lucide-react';

const Features = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Features | Trust Trend';
    
    return () => {
      document.title = 'Trust Trend';
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Shield size={28} />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Our Features</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Explore the powerful tools and capabilities of Trust Trend
            </p>
          </div>
          
          {/* Ad Analyzer Tool */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold mb-6 text-center">
              Ad & Website Analyzer
            </h2>
            <AdAnalyzer />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              title="Ad Verification"
              description="Upload screenshots or provide URLs of clothing ads for instant verification. Our system analyzes multiple factors to determine legitimacy."
              icon={<Image className="h-8 w-8 text-pink-500" />}
            />
            
            <FeatureCard
              title="Virtual Try-On"
              description="Virtually try on clothing items before purchasing using our advanced AR technology to see how they look on you."
              icon={<Shirt className="h-8 w-8 text-blue-500" />}
            />
            
            <FeatureCard
              title="AI Styling Recommendations"
              description="Get personalized outfit recommendations based on your preferences, style, and previous purchases using our AI technology."
              icon={<Sparkles className="h-8 w-8 text-purple-500" />}
            />
            
            <FeatureCard
              title="Verification History"
              description="Access your complete history of verified ads. Review past results and keep track of both legitimate brands and scams you've encountered."
              icon={<History className="h-8 w-8 text-indigo-500" />}
            />
            
            <FeatureCard
              title="Analytics Dashboard"
              description="View comprehensive statistics about the ads you've verified, including the percentage of fake ads detected and insights on common scam patterns."
              icon={<BarChart3 className="h-8 w-8 text-blue-500" />}
            />
            
            <FeatureCard
              title="Warning Detection"
              description="Receive detailed warnings about specific red flags identified in suspicious ads, including unrealistic claims, pressure tactics, and poor grammar."
              icon={<AlertTriangle className="h-8 w-8 text-amber-500" />}
            />
            
            <FeatureCard
              title="Brand Database"
              description="Our system cross-references against a database of verified clothing brands to help identify legitimate retailers versus suspicious newcomers."
              icon={<Database className="h-8 w-8 text-indigo-500" />}
            />
            
            <FeatureCard
              title="Domain Analysis"
              description="Automatic checking of website domain age, reputation, and security features to identify newly created scam sites versus established retailers."
              icon={<Search className="h-8 w-8 text-cyan-500" />}
            />
            
            <FeatureCard
              title="Secure Account"
              description="Create a personal account to save your verification history, access your dashboard from any device, and receive updates on emerging scam patterns."
              icon={<Shield className="h-8 w-8 text-green-500" />}
            />
            
            <FeatureCard
              title="Community Reports"
              description="Benefit from our community-driven approach where users collectively help identify new scams and verify legitimate brands through crowdsourced feedback."
              icon={<MessageSquare className="h-8 w-8 text-orange-500" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <Card className="border-0 shadow-md h-full animate-fade-in">
      <CardHeader className="pb-2">
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Features;
