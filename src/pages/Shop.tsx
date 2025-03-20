
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Star, Filter, ChevronDown, Search } from 'lucide-react';

const Shop = () => {
  useEffect(() => {
    document.title = 'Shop | Trust Trend';
    return () => {
      document.title = 'Trust Trend';
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
              Verified Clothing Stores
            </h1>
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stores..."
                  className="pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex md:hidden items-center space-x-3 mb-6">
            <Button variant="outline" className="flex items-center flex-1">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search stores..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {storeData.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="mx-auto">
              Load More Stores
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Store {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  trustScore: number;
  featured: boolean;
  categories: string[];
}

interface StoreCardProps {
  store: Store;
}

const StoreCard = ({ store }: StoreCardProps) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative">
        <img 
          src={store.image} 
          alt={store.name} 
          className="w-full h-48 object-cover" 
        />
        {store.featured && (
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-medium text-lg">{store.name}</h3>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(store.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : i < store.rating
                      ? 'text-yellow-400 fill-yellow-400 opacity-50'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-white text-sm ml-2">
              {store.rating.toFixed(1)} ({store.reviews})
            </span>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div 
              className={`h-2.5 w-2.5 rounded-full mr-2 ${
                store.trustScore >= 80 ? 'bg-green-500' : 
                store.trustScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`} 
            />
            <span className="text-sm font-medium">
              Trust Score: {store.trustScore}%
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {store.categories.map((category, index) => (
            <span 
              key={index}
              className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {category}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t bg-gray-50">
        <Button variant="outline" className="w-full flex items-center justify-center">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Visit Store
        </Button>
      </CardFooter>
    </Card>
  );
};

const storeData: Store[] = [
  {
    id: 1,
    name: "Fashion Forward",
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 328,
    trustScore: 95,
    featured: true,
    categories: ["Women's Fashion", "Men's Fashion", "Accessories"]
  },
  {
    id: 2,
    name: "Urban Style Co.",
    image: "/placeholder.svg",
    rating: 4.3,
    reviews: 178,
    trustScore: 88,
    featured: false,
    categories: ["Streetwear", "Casual", "Shoes"]
  },
  {
    id: 3,
    name: "Elite Boutique",
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 205,
    trustScore: 92,
    featured: true,
    categories: ["Luxury", "Designer", "Formal"]
  },
  {
    id: 4,
    name: "Eco Threads",
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 156,
    trustScore: 90,
    featured: false,
    categories: ["Sustainable", "Organic", "Eco-friendly"]
  },
  {
    id: 5,
    name: "Athletic Prime",
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 312,
    trustScore: 94,
    featured: false,
    categories: ["Sportswear", "Athletic", "Outdoor"]
  },
  {
    id: 6,
    name: "Vintage Finds",
    image: "/placeholder.svg",
    rating: 4.2,
    reviews: 98,
    trustScore: 85,
    featured: false,
    categories: ["Vintage", "Retro", "Second-hand"]
  }
];

export default Shop;
