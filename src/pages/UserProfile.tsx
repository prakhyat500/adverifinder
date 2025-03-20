
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  LogOut, 
  ChevronRight, 
  Mail, 
  Lock, 
  Smartphone,
  CreditCard 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AuthService } from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 123-4567',
    subscription: 'Basic Plan',
    notifications: {
      email: true,
      browser: false,
      marketing: true
    }
  });
  
  useEffect(() => {
    document.title = 'Profile | Trust Trend';
    return () => {
      document.title = 'Trust Trend';
    };
  }, []);
  
  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      const response = await AuthService.logout();
      
      if (response.success) {
        toast({
          title: "Logged out",
          description: "You have been successfully logged out.",
        });
        
        navigate('/');
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to log out. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification settings have been updated successfully.",
    });
  };
  
  const handleChangePassword = () => {
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-1">Manage your profile and preferences</p>
          </div>
          
          <div className="grid md:grid-cols-7 gap-6">
            <div className="md:col-span-2">
              <Card className="shadow-sm mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{profile.name}</h2>
                    <p className="text-sm text-gray-500 mb-4">{profile.email}</p>
                    <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {profile.subscription}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardContent className="p-0">
                  <nav className="flex flex-col">
                    <MenuItem icon={<User />} text="Account" active />
                    <MenuItem icon={<Settings />} text="Preferences" />
                    <MenuItem icon={<Bell />} text="Notifications" />
                    <MenuItem icon={<Shield />} text="Security" />
                    <MenuItem 
                      icon={<LogOut />} 
                      text="Sign Out" 
                      onClick={handleLogout}
                      loading={isLoading}
                    />
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-5">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="profile">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="profile">Profile</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="profile" className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              value={profile.name}
                              onChange={(e) => setProfile({...profile, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={profile.email}
                              onChange={(e) => setProfile({...profile, email: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                              id="phone" 
                              value={profile.phone}
                              onChange={(e) => setProfile({...profile, phone: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-sm text-blue-800">
                          <div className="flex">
                            <Shield className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Current Subscription: {profile.subscription}</p>
                              <p className="mt-1">You have unlimited scans and access to all Trust Trend features.</p>
                              <a 
                                href="#" 
                                className="text-blue-600 hover:text-blue-800 inline-flex items-center mt-2"
                              >
                                Upgrade Plan
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button onClick={handleUpdateProfile}>
                        Save Changes
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="notifications" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notification Preferences</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start space-x-3">
                              <Mail className="h-5 w-5 text-gray-700 mt-0.5" />
                              <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-gray-500">
                                  Receive emails about your account activity, scan results, and security alerts
                                </p>
                              </div>
                            </div>
                            <Switch 
                              checked={profile.notifications.email}
                              onCheckedChange={(checked) => 
                                setProfile({
                                  ...profile, 
                                  notifications: {
                                    ...profile.notifications,
                                    email: checked
                                  }
                                })
                              }
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-start space-x-3">
                              <Bell className="h-5 w-5 text-gray-700 mt-0.5" />
                              <div>
                                <p className="font-medium">Browser Notifications</p>
                                <p className="text-sm text-gray-500">
                                  Receive browser notifications when you're on our website
                                </p>
                              </div>
                            </div>
                            <Switch 
                              checked={profile.notifications.browser}
                              onCheckedChange={(checked) => 
                                setProfile({
                                  ...profile, 
                                  notifications: {
                                    ...profile.notifications,
                                    browser: checked
                                  }
                                })
                              }
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-start space-x-3">
                              <Smartphone className="h-5 w-5 text-gray-700 mt-0.5" />
                              <div>
                                <p className="font-medium">Marketing Communications</p>
                                <p className="text-sm text-gray-500">
                                  Receive updates about new features, services, and special offers
                                </p>
                              </div>
                            </div>
                            <Switch 
                              checked={profile.notifications.marketing}
                              onCheckedChange={(checked) => 
                                setProfile({
                                  ...profile, 
                                  notifications: {
                                    ...profile.notifications,
                                    marketing: checked
                                  }
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Button onClick={handleSaveNotifications}>
                        Save Preferences
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="security" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Change Password</h3>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 text-sm text-yellow-800">
                          <div className="flex">
                            <Lock className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Password Requirements</p>
                              <ul className="list-disc ml-5 mt-1">
                                <li>Minimum 8 characters long</li>
                                <li>Include at least one uppercase letter</li>
                                <li>Include at least one number</li>
                                <li>Include at least one special character</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button onClick={handleChangePassword}>
                        Change Password
                      </Button>
                      
                      <div className="pt-4 border-t mt-8">
                        <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-white p-4 border rounded-md">
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 text-gray-700 mr-3" />
                              <div>
                                <p className="font-medium">•••• •••• •••• 4242</p>
                                <p className="text-sm text-gray-500">Expires 12/2024</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                          
                          <Button variant="outline" className="w-full justify-center">
                            Add Payment Method
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

const MenuItem = ({ icon, text, active = false, onClick, loading = false }: MenuItemProps) => {
  return (
    <button
      className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
        active ? 'border-l-2 border-blue-600 bg-blue-50 text-blue-600' : 'text-gray-700'
      }`}
      onClick={onClick}
      disabled={loading}
    >
      <div className="mr-3">
        {loading ? (
          <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          icon
        )}
      </div>
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default UserProfile;
