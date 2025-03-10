
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AdVerifier from '@/components/AdVerifier';
import VerificationHistory from '@/components/VerificationHistory';
import VerificationAnalytics from '@/components/VerificationAnalytics';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History, BarChart3, Settings, LogOut, Instagram, Image, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'verify' | 'history' | 'analytics' | 'settings';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('verify');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Dashboard | InstaAdVerifier';
    
    return () => {
      document.title = 'InstaAdVerifier';
    };
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6 px-4 animate-fade-in">
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
          <div className="flex items-center bg-blue-50 text-blue-800 rounded-full px-3 py-1 text-sm">
            <Instagram className="h-4 w-4 mr-1 text-pink-500" />
            <span>Clothing Ad Verification Tool</span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <Card className="sticky top-24 shadow-md border-0 overflow-hidden animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-pink-500/5 to-purple-500/5 border-b">
                <CardTitle className="text-lg">Dashboard Menu</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <SidebarItem 
                    icon={<Image size={18} />}
                    label="Verify Ad"
                    active={activeTab === 'verify'}
                    onClick={() => setActiveTab('verify')}
                  />
                  <SidebarItem 
                    icon={<History size={18} />}
                    label="Verification History"
                    active={activeTab === 'history'}
                    onClick={() => setActiveTab('history')}
                  />
                  <SidebarItem 
                    icon={<BarChart3 size={18} />}
                    label="Analytics"
                    active={activeTab === 'analytics'}
                    onClick={() => setActiveTab('analytics')}
                  />
                  <SidebarItem 
                    icon={<Settings size={18} />}
                    label="Account Settings"
                    active={activeTab === 'settings'}
                    onClick={() => setActiveTab('settings')}
                  />
                  <SidebarItem 
                    icon={<LogOut size={18} />}
                    label="Sign Out"
                    onClick={() => {
                      localStorage.removeItem('isAuthenticated');
                      navigate('/');
                    }}
                    className="text-red-600 hover:bg-red-50"
                  />
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow pb-6 animate-fade-in">
            {activeTab === 'verify' && (
              <div className="space-y-6">
                <AdVerifier />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <InfoCard 
                    title="How It Works"
                    description="Our tool analyzes Instagram clothing ads by examining the account's age, content claims, and other signals to determine if it's a legitimate brand."
                    icon={<AlertTriangle className="h-8 w-8 text-amber-500" />}
                  />
                  <InfoCard 
                    title="Stay Safe Shopping"
                    description="Before purchasing from an Instagram clothing ad, verify the brand's legitimacy, check reviews, and use secure payment methods that offer buyer protection."
                    icon={<Instagram className="h-8 w-8 text-pink-500" />}
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'history' && (
              <VerificationHistory />
            )}
            
            {activeTab === 'analytics' && (
              <VerificationAnalytics />
            )}
            
            {activeTab === 'settings' && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-500">Account settings are coming soon.</p>
                    <p className="text-gray-500 mb-4">This feature is currently under development.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  className?: string;
}

const SidebarItem = ({ icon, label, active, onClick, className }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center px-4 py-3 text-sm font-medium transition-colors",
        active ? "bg-pink-50 text-pink-700 border-l-2 border-pink-500" : "hover:bg-gray-50",
        className
      )}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );
};

interface InfoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const InfoCard = ({ title, description, icon }: InfoCardProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        {icon && <div className="mr-2">{icon}</div>}
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
