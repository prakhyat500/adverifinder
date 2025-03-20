
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Shield, Users, Award, Lightbulb } from 'lucide-react';

const About = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'About | Trust Trend';
    
    return () => {
      document.title = 'Trust Trend';
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Shield size={28} />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">About Trust Trend</h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              We're on a mission to make online shopping safer by helping consumers identify fraudulent advertisements and websites.
            </p>
          </div>
          
          <div className="mb-16">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-blue-600 text-white p-8 md:p-12">
                  <h2 className="text-2xl font-display font-bold mb-4">Our Mission</h2>
                  <p className="mb-6 text-blue-100">
                    Trust Trend was founded with a clear purpose: to protect online shoppers from the growing threat of fraudulent advertisements and fake e-commerce websites.
                  </p>
                  <p className="mb-6 text-blue-100">
                    In an era where online shopping has become the norm, we recognized the urgent need for tools that empower consumers to make safe and informed decisions about where they spend their money.
                  </p>
                  <p className="text-blue-100">
                    Our platform combines advanced technology with practical knowledge to create a shield against deceptive online practices, particularly in the clothing and fashion industry where scams are prevalent.
                  </p>
                </div>
                <div className="md:w-1/2 p-8 md:p-12">
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Our Story</h2>
                  <p className="text-gray-600 mb-4">
                    Trust Trend began when our founder fell victim to a sophisticated online scam, ordering clothing from what appeared to be a legitimate website, only to receive poor-quality items that bore no resemblance to the advertised products.
                  </p>
                  <p className="text-gray-600 mb-4">
                    This experience revealed a gap in the market: while there were many resources for detecting email scams or malware, there were few tools specifically designed to help shoppers identify fraudulent clothing advertisements.
                  </p>
                  <p className="text-gray-600">
                    Since our launch in 2022, we've helped thousands of consumers avoid scams and make safer purchasing decisions. We continue to evolve our technology as scammers develop new tactics, staying one step ahead to keep our users protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10">Our Core Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <CoreValueCard 
              title="Consumer Protection"
              description="We believe every shopper deserves to be protected from fraud. Our tools and resources are designed to empower consumers with information and verification capabilities."
              icon={<Users className="h-10 w-10 text-blue-600" />}
            />
            
            <CoreValueCard 
              title="Ethical Marketing"
              description="We champion transparent and honest advertising practices. By exposing deceptive tactics, we encourage businesses to maintain high ethical standards in their marketing."
              icon={<Award className="h-10 w-10 text-blue-600" />}
            />
            
            <CoreValueCard 
              title="Technological Innovation"
              description="We continuously refine our detection algorithms and analysis methods to stay ahead of evolving scam tactics, leveraging the latest advancements in technology."
              icon={<Lightbulb className="h-10 w-10 text-blue-600" />}
            />
          </div>
          
          <div className="bg-blue-50 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Join Our Mission</h2>
            <p className="text-gray-700 max-w-3xl mx-auto mb-8">
              Whether you're a consumer looking to shop safely online, or a business committed to ethical marketing practices, we invite you to join us in creating a more trustworthy digital marketplace.
            </p>
            <div className="flex justify-center">
              <a 
                href="/signup" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Create an Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CoreValueCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CoreValueCard = ({ title, description, icon }: CoreValueCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default About;
