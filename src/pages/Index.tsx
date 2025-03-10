
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import { ArrowRight, ShieldCheck, AlertTriangle, Zap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-grow pt-24 pb-16 md:pt-36 md:pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 animate-fade-up">
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium mb-4 animate-fade-in">
                Protect Yourself Online
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-balance mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-primary">Detect Fake Ads</span> Before They Deceive You
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl text-balance">
                AdVeriFinder helps you identify suspicious online advertisements, protecting you from scams and fraudulent offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="px-8"
                  onClick={() => navigate('/signup')}
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-2/5 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-purple-500/20 rounded-2xl transform rotate-3 blur-xl animate-pulse"></div>
                <div className="relative bg-white glass-card rounded-2xl p-8 shadow-xl border">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm text-gray-500">AdVeriFinder</div>
                  </div>
                  
                  <div className="p-4 bg-red-50 border border-red-100 rounded-lg mb-6">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-red-800">Warning: Suspicious Ad Detected</h3>
                        <p className="text-sm text-red-700 mt-1">This ad contains multiple warning signs and might be fraudulent.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Domain Age</span>
                      <div className="flex items-center">
                        <span className="text-sm text-red-600 mr-2">3 days</span>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Unrealistic Claims</span>
                      <div className="flex items-center">
                        <span className="text-sm text-red-600 mr-2">Detected</span>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Contact Info</span>
                      <div className="flex items-center">
                        <span className="text-sm text-red-600 mr-2">Missing</span>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="sm">View Detailed Report</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-balance">How AdVeriFinder Protects You</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
              Our advanced detection technology helps you identify and avoid online scams.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="h-8 w-8 text-primary" />}
              title="Real-Time Verification"
              description="Instantly analyze advertisements to detect potential fraud and scam indicators."
            />
            <FeatureCard 
              icon={<AlertTriangle className="h-8 w-8 text-primary" />}
              title="Warning Signs Detection"
              description="Identify suspicious elements like domain age, unrealistic claims, and missing information."
            />
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-primary" />}
              title="Fast & Easy to Use"
              description="Simply paste the ad URL and get immediate results with detailed analysis."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Spot Fake Ads?</h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Join our community of vigilant users protecting themselves from online scams.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="px-8"
                onClick={() => navigate('/signup')}
              >
                Create Free Account
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                © 2023 AdVeriFinder. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      className="text-gray-600 text-sm hover:text-primary transition-colors"
    >
      {children}
    </a>
  );
};

export default Index;
