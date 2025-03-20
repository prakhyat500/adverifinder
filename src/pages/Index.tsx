
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import { ArrowRight, ShieldCheck, AlertTriangle, Zap, Search, Star, Shirt, Sparkles } from 'lucide-react';

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
                Shop Online With Confidence
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-balance mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Spot Fake Clothing Ads</span> Before You Buy
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl text-balance">
                Trust Trend helps you identify suspicious clothing advertisements, protecting you from scams and fraudulent online stores.
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
                  onClick={() => navigate('/analyzer')}
                >
                  Analyze Website
                </Button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-2/5 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-blue-500/20 rounded-2xl transform rotate-3 blur-xl animate-pulse"></div>
                <div className="relative bg-white glass-card rounded-2xl p-8 shadow-xl border">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm text-gray-500">Trust Trend</div>
                  </div>
                  
                  <div className="p-4 bg-red-50 border border-red-100 rounded-lg mb-6">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-red-800">Warning: Fraudulent Store Detected</h3>
                        <p className="text-sm text-red-700 mt-1">This clothing store shows multiple warning signs of fraud.</p>
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
                      <span className="text-sm font-medium">Unrealistic Discounts</span>
                      <div className="flex items-center">
                        <span className="text-sm text-red-600 mr-2">90% off</span>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-balance">How Trust Trend Protects You</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
              Our advanced detection technology helps you identify and avoid clothing scams online.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="h-8 w-8 text-blue-500" />}
              title="Website Analyzer"
              description="Instantly analyze clothing store websites to detect potential fraud and scam indicators."
            />
            <FeatureCard 
              icon={<Search className="h-8 w-8 text-blue-500" />}
              title="Trust Verification"
              description="Check domain age, contact information, return policies, and other trust signals."
            />
            <FeatureCard 
              icon={<Star className="h-8 w-8 text-blue-500" />}
              title="Community Reviews"
              description="Access and contribute to reviews of clothing brands from our trusted user community."
            />
            <FeatureCard 
              icon={<Shirt className="h-8 w-8 text-blue-500" />}
              title="Virtual Try-On"
              description="Virtually try on clothing items before purchasing using our advanced AR technology."
            />
          </div>
        </div>
      </section>
      
      {/* Tools Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-display font-bold mb-4">Powerful Tools for Smarter Shopping</h2>
              <p className="text-gray-600 mb-6">
                Trust Trend provides a comprehensive suite of tools designed to enhance your online shopping experience and keep you safe from scams.
              </p>
              <ul className="space-y-4">
                <FeatureListItem 
                  icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
                  title="Scam Detection"
                  description="Identify red flags that indicate potential scam websites"
                />
                <FeatureListItem 
                  icon={<Sparkles className="h-5 w-5 text-purple-500" />}
                  title="AI Styling Advice"
                  description="Get personalized outfit recommendations based on your preferences"
                />
                <FeatureListItem 
                  icon={<Zap className="h-5 w-5 text-blue-500" />}
                  title="Instant Analysis"
                  description="Receive immediate results when analyzing clothing store websites"
                />
              </ul>
              <Button 
                className="mt-6"
                onClick={() => navigate('/features')}
              >
                Explore All Features
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/placeholder.svg" 
                alt="Trust Trend Dashboard" 
                className="w-full rounded-lg shadow-lg border"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Shop Safely?</h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Join our community of savvy shoppers protecting themselves from clothing scams.
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
            <div className="flex items-center mb-4 md:mb-0">
              <ShieldCheck className="h-5 w-5 text-blue-600 mr-2" />
              <p className="text-gray-700 font-medium">
                Trust Trend
              </p>
            </div>
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2023 Trust Trend. All rights reserved.
            </p>
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

const FeatureListItem = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <li className="flex">
      <div className="mt-1 mr-3">{icon}</div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </li>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      className="text-gray-600 text-sm hover:text-blue-600 transition-colors"
    >
      {children}
    </a>
  );
};

export default Index;
