
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Shirt, PanelBottom, Clock, ThumbsUp, DollarSign, Tag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AIStyler = () => {
  const [styling, setStyling] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [preferences, setPreferences] = useState<string>('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = 'AI Styler | Trust Trend';
    return () => {
      document.title = 'Trust Trend';
    };
  }, []);
  
  const handleGetRecommendations = () => {
    if (!styling || !occasion) {
      toast({
        title: "Missing Information",
        description: "Please select a styling type and occasion at minimum",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // In a real application, this would call an AI API
    // For demo, we'll simulate a delay and use mock data
    setTimeout(() => {
      // Mock recommendation data
      const mockRecommendations = [
        {
          id: 1,
          title: "Business Casual Outfit",
          description: "A perfect balance of professional and comfortable attire for your office meetings.",
          items: [
            { name: "Navy Blue Blazer", price: "$95", image: "/placeholder.svg" },
            { name: "White Button-up Shirt", price: "$45", image: "/placeholder.svg" },
            { name: "Khaki Chinos", price: "$60", image: "/placeholder.svg" },
            { name: "Brown Leather Loafers", price: "$80", image: "/placeholder.svg" }
          ],
          tags: ["Professional", "Versatile", "Comfortable"],
          score: 95
        },
        {
          id: 2,
          title: "Smart Casual Ensemble",
          description: "Stylish yet relaxed combination that's perfect for a variety of social occasions.",
          items: [
            { name: "Light Blue Oxford Shirt", price: "$55", image: "/placeholder.svg" },
            { name: "Navy Chinos", price: "$65", image: "/placeholder.svg" },
            { name: "Brown Derby Shoes", price: "$75", image: "/placeholder.svg" },
            { name: "Leather Belt", price: "$35", image: "/placeholder.svg" }
          ],
          tags: ["Casual", "Stylish", "Versatile"],
          score: 92
        },
        {
          id: 3,
          title: "Contemporary Business Look",
          description: "Modern professional attire that makes a statement while maintaining formality.",
          items: [
            { name: "Charcoal Suit", price: "$220", image: "/placeholder.svg" },
            { name: "Light Blue Dress Shirt", price: "$65", image: "/placeholder.svg" },
            { name: "Burgundy Tie", price: "$40", image: "/placeholder.svg" },
            { name: "Black Oxford Shoes", price: "$125", image: "/placeholder.svg" }
          ],
          tags: ["Formal", "Professional", "Modern"],
          score: 88
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
      
      toast({
        title: "Recommendations Ready",
        description: "We've created personalized styling suggestions based on your preferences.",
      });
    }, 2500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Sparkles size={28} />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900">AI Dress Styling</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Get personalized outfit recommendations and styling advice from our AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Your Preferences</CardTitle>
                  <CardDescription>
                    Tell us what you're looking for
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Styling Type
                    </label>
                    <Select onValueChange={setStyling} value={styling}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="party">Party</SelectItem>
                        <SelectItem value="athleisure">Athleisure</SelectItem>
                        <SelectItem value="vintage">Vintage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Occasion
                    </label>
                    <Select onValueChange={setOccasion} value={occasion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="work">Work / Office</SelectItem>
                        <SelectItem value="date">Date Night</SelectItem>
                        <SelectItem value="interview">Job Interview</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="casual-outing">Casual Outing</SelectItem>
                        <SelectItem value="workout">Workout</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range
                    </label>
                    <Select onValueChange={setBudget} value={budget}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget (Under $100)</SelectItem>
                        <SelectItem value="mid-range">Mid-range ($100 - $300)</SelectItem>
                        <SelectItem value="premium">Premium ($300 - $500)</SelectItem>
                        <SelectItem value="luxury">Luxury ($500+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Preferences
                    </label>
                    <Textarea 
                      placeholder="Colors, styles, brands, or specific items you prefer or want to avoid..."
                      value={preferences}
                      onChange={(e) => setPreferences(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleGetRecommendations}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Get Recommendations
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <div className="space-y-6">
                {recommendations.length === 0 ? (
                  <div className="bg-white rounded-lg border shadow-sm p-10 text-center">
                    <Shirt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No recommendations yet
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Fill out your style preferences and click "Get Recommendations" to see AI-generated outfit suggestions.
                    </p>
                  </div>
                ) : (
                  recommendations.map((recommendation) => (
                    <Card key={recommendation.id} className="shadow-sm overflow-hidden">
                      <CardHeader className="bg-blue-50 border-b">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{recommendation.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {recommendation.description}
                            </CardDescription>
                          </div>
                          <div className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {recommendation.score}% Match
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                          {recommendation.items.map((item, index) => (
                            <div key={index} className="border rounded-md p-2 bg-white">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-32 object-contain mb-2" 
                              />
                              <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                              <p className="text-sm text-gray-600">{item.price}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between">
                          <div className="flex items-center space-x-1 mb-3 md:mb-0">
                            <Tag className="h-4 w-4 text-blue-600" />
                            <div className="flex flex-wrap gap-2">
                              {recommendation.tags.map((tag, index) => (
                                <span 
                                  key={index}
                                  className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex space-x-3">
                            <Button variant="outline" size="sm">
                              <DollarSign className="h-4 w-4 mr-1" />
                              Shop Items
                            </Button>
                            <Button size="sm">
                              <PanelBottom className="h-4 w-4 mr-1" />
                              Save Outfit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
                
                {recommendations.length > 0 && (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-md p-3">
                    <div className="flex items-center text-sm text-blue-800">
                      <Clock className="h-4 w-4 mr-2" />
                      Recommendations updated just now
                    </div>
                    <Button variant="outline" size="sm">
                      Refresh
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStyler;
