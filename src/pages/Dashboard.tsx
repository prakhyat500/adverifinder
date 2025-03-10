
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AdVerifier from '@/components/AdVerifier';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History, BarChart3, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'verify' | 'history' | 'settings';

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
    document.title = 'Dashboard | AdVeriFinder';
    
    return () => {
      document.title = 'AdVeriFinder';
    };
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-display font-bold mb-6 px-4 animate-fade-in">Dashboard</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <Card className="sticky top-24 shadow-md border-0 overflow-hidden animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border-b">
                <CardTitle className="text-lg">Dashboard Menu</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <SidebarItem 
                    icon={<BarChart3 size={18} />}
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
                <Card className="border-0 shadow-md p-6">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle>Ad Verification Tool</CardTitle>
                    <CardDescription>Analyze any advertisement URL to detect potential scams</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <AdVerifier />
                  </CardContent>
                </Card>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <InfoCard 
                    title="How It Works"
                    description="Our tool analyzes multiple aspects of an advertisement, including domain age, content claims, and contact information to determine its legitimacy."
                  />
                  <InfoCard 
                    title="Stay Safe Online"
                    description="Even with verification tools, always be cautious when responding to ads. Never share sensitive information with unknown parties."
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'history' && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Verification History</CardTitle>
                  <CardDescription>View your recent ad verification checks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-500">No verification history yet.</p>
                    <p className="text-gray-500 mb-4">Verify your first ad to see the results here.</p>
                    <Button onClick={() => setActiveTab('verify')}>Verify an Ad</Button>
                  </div>
                </CardContent>
              </Card>
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
        active ? "bg-blue-50 text-blue-700 border-l-2 border-blue-500" : "hover:bg-gray-50",
        className
      )}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );
};

const InfoCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
