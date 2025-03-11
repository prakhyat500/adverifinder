import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, PieChart, BarChart, TrendingUp } from 'lucide-react';
import { cn } from "@/lib/utils";
import { AdService, VerificationResult } from '@/services/ad.service';
import { useToast } from '@/hooks/use-toast';

const VerificationAnalytics = () => {
  const { toast } = useToast();
  const [history, setHistory] = useState<VerificationResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    fake: 0,
    authentic: 0,
    brands: {} as Record<string, { total: number, fake: number }>
  });

  useEffect(() => {
    async function loadVerifications() {
      setIsLoading(true);
      try {
        const { success, verifications, error } = await AdService.getUserVerifications();
        
        if (success && verifications) {
          setHistory(verifications);
          
          // Calculate statistics
          const stats = {
            total: verifications.length,
            fake: 0,
            authentic: 0,
            brands: {} as Record<string, { total: number, fake: number }>
          };
          
          verifications.forEach((item: VerificationResult) => {
            if (item.isScam) {
              stats.fake++;
            } else {
              stats.authentic++;
            }
            
            const brandName = item.details.brand.name;
            if (!stats.brands[brandName]) {
              stats.brands[brandName] = { total: 0, fake: 0 };
            }
            
            stats.brands[brandName].total++;
            if (item.isScam) {
              stats.brands[brandName].fake++;
            }
          });
          
          setStats(stats);
        } else if (error) {
          toast({
            title: "Error",
            description: error || "Failed to load verification history",
            variant: "destructive"
          });
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "An unexpected error occurred",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    loadVerifications();
  }, [toast]);

  // Get top brands by verification count
  const topBrands = Object.entries(stats.brands)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 5);

  const fakePercentage = stats.total > 0 
    ? Math.round((stats.fake / stats.total) * 100) 
    : 0;

  return (
    <Card className="shadow-md border-0">
      <CardHeader className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-b">
        <CardTitle className="text-xl flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-blue-500" />
          Verification Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {stats.total === 0 ? (
          <div className="text-center py-6">
            <PieChart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No verification data yet</p>
            <p className="text-gray-500 text-sm mt-1">Analytics will appear after you verify ads</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard 
                title="Total Verifications"
                value={stats.total}
                icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
                color="blue"
              />
              <StatCard 
                title="Authentic Ads"
                value={stats.authentic}
                icon={<CheckCircle className="h-5 w-5 text-green-500" />}
                color="green"
              />
              <StatCard 
                title="Fake Ads"
                value={stats.fake}
                icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
                color="red"
              />
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Fake Ad Percentage</h3>
              <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 flex items-center justify-end pr-2 text-xs font-bold text-white"
                  style={{ width: `${fakePercentage}%` }}
                >
                  {fakePercentage > 5 ? `${fakePercentage}%` : ''}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            
            {topBrands.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Top Verified Brands</h3>
                <div className="space-y-3">
                  {topBrands.map(([brand, data]) => {
                    const fakePercent = Math.round((data.fake / data.total) * 100);
                    return (
                      <div key={brand}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{brand}</span>
                          <span className="text-gray-500">{data.total} verifications</span>
                        </div>
                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex">
                          <div 
                            className="h-full bg-red-500"
                            style={{ width: `${fakePercent}%` }}
                          />
                          <div 
                            className="h-full bg-green-500"
                            style={{ width: `${100 - fakePercent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{fakePercent}% fake</span>
                          <span>{100 - fakePercent}% authentic</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'red';
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  const bgColor = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    red: 'bg-red-50'
  }[color];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex items-center">
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-3", bgColor)}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default VerificationAnalytics;
