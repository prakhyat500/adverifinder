
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, CheckCircle, Clock, TrendingUp, Zap, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ActivityItem {
  id: number;
  website: string;
  date: string;
  result: 'authentic' | 'fake';
  score: number;
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalScans: 0,
    fakeDetected: 0,
    accountStatus: 'Active',
    usagePercentage: 0,
    accuracyRate: 0
  });
  
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  
  useEffect(() => {
    // In a real application, this would be fetched from an API
    // Simulating data fetch with setTimeout
    const timer = setTimeout(() => {
      setMetrics({
        totalScans: 28,
        fakeDetected: 7,
        accountStatus: 'Active',
        usagePercentage: 35,
        accuracyRate: 92
      });
      
      setRecentActivity([
        { id: 1, website: 'fashion-deals.com', date: '2 hours ago', result: 'fake', score: 25 },
        { id: 2, website: 'nike.com', date: '5 hours ago', result: 'authentic', score: 98 },
        { id: 3, website: 'amazingstyles.net', date: '1 day ago', result: 'fake', score: 32 },
        { id: 4, website: 'adidas.com', date: '2 days ago', result: 'authentic', score: 95 },
        { id: 5, website: 'designerbags-outlet.com', date: '3 days ago', result: 'fake', score: 15 }
      ]);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    document.title = 'Dashboard | Trust Trend';
    return () => {
      document.title = 'Trust Trend';
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back to your Trust Trend overview</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard 
              title="Total Scans"
              value={metrics.totalScans}
              description="Websites analyzed"
              icon={<Shield className="h-8 w-8 text-blue-500" />}
            />
            
            <MetricCard 
              title="Fake Ads Detected"
              value={metrics.fakeDetected}
              description="Potentially fraudulent sites"
              icon={<AlertTriangle className="h-8 w-8 text-amber-500" />}
            />
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Account Status</CardDescription>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{metrics.accountStatus}</CardTitle>
                  <div className={`h-3 w-3 rounded-full ${metrics.accountStatus === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Monthly usage</span>
                    <span className="text-sm font-medium">{metrics.usagePercentage}%</span>
                  </div>
                  <Progress value={metrics.usagePercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Detection Accuracy</CardDescription>
                <CardTitle className="text-lg">{metrics.accuracyRate}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Overall performance</span>
                    <span className="text-sm font-medium">High</span>
                  </div>
                  <Progress value={metrics.accuracyRate} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest website analyses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map(activity => (
                      <div key={activity.id} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                        <div className={`mt-0.5 mr-3 p-1.5 rounded-full ${
                          activity.result === 'authentic' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {activity.result === 'authentic' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium">{activity.website}</h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {activity.date}
                            </div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className={`text-xs font-medium ${
                              activity.result === 'authentic' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {activity.result === 'authentic' ? 'Authentic Website' : 'Fake Website'}
                            </span>
                            <span className="text-xs font-medium">
                              Score: {activity.score}/100
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {recentActivity.length === 0 && (
                      <div className="text-center py-6 text-gray-500">
                        No recent activity to display
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="shadow-sm mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Statistics</CardTitle>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Fake Detection Rate</span>
                        <span className="text-sm font-medium">{((metrics.fakeDetected / metrics.totalScans) * 100 || 0).toFixed(1)}%</span>
                      </div>
                      <Progress value={((metrics.fakeDetected / metrics.totalScans) * 100) || 0} className="h-1.5" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Authentic Sites</span>
                        <span className="text-sm font-medium">{metrics.totalScans - metrics.fakeDetected}</span>
                      </div>
                      <Progress value={((metrics.totalScans - metrics.fakeDetected) / metrics.totalScans * 100) || 0} className="h-1.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm bg-blue-50">
                <CardHeader>
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-blue-500 mr-2" />
                    <CardTitle>Tips for Better Results</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex">
                      <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Always check the domain age of suspicious websites</span>
                    </li>
                    <li className="flex">
                      <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Look for secure payment options (PayPal, credit cards)</span>
                    </li>
                    <li className="flex">
                      <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Be cautious of sites with poor grammar or spelling errors</span>
                    </li>
                    <li className="flex">
                      <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Verify contact information and return policies</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, description, icon }: MetricCardProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardDescription>{title}</CardDescription>
          {icon}
        </div>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
