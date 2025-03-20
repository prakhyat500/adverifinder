
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, MessageCircle, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Review {
  id: number;
  brandName: string;
  userName: string;
  date: string;
  rating: number;
  text: string;
  helpful: number;
  unhelpful: number;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState('all');
  const [newReview, setNewReview] = useState({
    brandName: '',
    rating: 0,
    text: ''
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockReviews = [
      {
        id: 1,
        brandName: 'Authentic Apparel',
        userName: 'Maria S.',
        date: '2 days ago',
        rating: 5,
        text: 'Amazing quality clothes! The sizing was perfect, and the materials are exactly as described. Shipping was fast, and their customer service was exceptional when I had a question about my order.',
        helpful: 12,
        unhelpful: 1
      },
      {
        id: 2,
        brandName: 'Fashion Finds',
        userName: 'James T.',
        date: '1 week ago',
        rating: 2,
        text: 'Very disappointed with my purchase. The fabric quality was poor and the sizing runs very small. The garment started falling apart after just one wash. Would not recommend.',
        helpful: 8,
        unhelpful: 2
      },
      {
        id: 3,
        brandName: 'Style Hub',
        userName: 'Samantha K.',
        date: '2 weeks ago',
        rating: 4,
        text: 'Good quality for the price. The colors are slightly different from what was shown online, but overall I\'m satisfied with my purchase. Shipping took longer than expected.',
        helpful: 5,
        unhelpful: 1
      },
      {
        id: 4,
        brandName: 'Elite Fashion',
        userName: 'Robert J.',
        date: '1 month ago',
        rating: 1,
        text: 'Complete scam! The website seemed legitimate but after placing my order, I never received any confirmation. No response from customer service and no package after 3 weeks. Had to dispute the charge with my credit card company.',
        helpful: 24,
        unhelpful: 0
      },
      {
        id: 5,
        brandName: 'Modern Threads',
        userName: 'Emily L.',
        date: '1 month ago',
        rating: 3,
        text: 'Average quality. The designs are nice but the fabric isn\'t as premium as advertised. Delivery was prompt and customer service was helpful with a return I had to make.',
        helpful: 7,
        unhelpful: 2
      }
    ];
    
    setReviews(mockReviews);
  }, []);
  
  useEffect(() => {
    document.title = 'Reviews | Trust Trend';
    return () => {
      document.title = 'Trust Trend';
    };
  }, []);
  
  const handleRatingClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };
  
  const handleSubmitReview = () => {
    if (!newReview.brandName) {
      toast({
        title: "Error",
        description: "Please enter a brand name",
        variant: "destructive",
      });
      return;
    }
    
    if (newReview.rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating",
        variant: "destructive",
      });
      return;
    }
    
    if (!newReview.text || newReview.text.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a detailed review (minimum 10 characters)",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send to an API
    const newReviewObject: Review = {
      id: Date.now(),
      brandName: newReview.brandName,
      userName: 'You',
      date: 'Just now',
      rating: newReview.rating,
      text: newReview.text,
      helpful: 0,
      unhelpful: 0
    };
    
    setReviews(prev => [newReviewObject, ...prev]);
    
    setNewReview({
      brandName: '',
      rating: 0,
      text: ''
    });
    
    toast({
      title: "Review Posted",
      description: "Thank you for sharing your experience!",
    });
  };
  
  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === 'positive') return review.rating >= 4;
    if (filter === 'neutral') return review.rating === 3;
    if (filter === 'negative') return review.rating <= 2;
    return true;
  });
  
  const handleFeedback = (reviewId: number, type: 'helpful' | 'unhelpful') => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        if (type === 'helpful') {
          return { ...review, helpful: review.helpful + 1 };
        } else {
          return { ...review, unhelpful: review.unhelpful + 1 };
        }
      }
      return review;
    }));
    
    toast({
      title: "Feedback Recorded",
      description: "Thank you for your feedback!",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <MessageCircle size={28} />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Community Reviews</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Share your experiences with clothing brands and help others make informed decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Post a Review</CardTitle>
                  <CardDescription>
                    Share your experience with a clothing brand
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brand Name
                      </label>
                      <Input 
                        placeholder="Enter clothing brand name"
                        value={newReview.brandName}
                        onChange={(e) => setNewReview(prev => ({ ...prev, brandName: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Rating
                      </label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => handleRatingClick(rating)}
                            className="focus:outline-none"
                          >
                            <StarIcon 
                              filled={rating <= newReview.rating}
                              className={`h-6 w-6 ${
                                rating <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {newReview.rating > 0 ? 
                            `${newReview.rating} star${newReview.rating > 1 ? 's' : ''}` : 
                            'Select rating'}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Experience
                      </label>
                      <Textarea 
                        placeholder="Share details about your experience with this brand..."
                        rows={5}
                        value={newReview.text}
                        onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleSubmitReview}
                      className="w-full md:w-auto"
                    >
                      Post Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Filter Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button 
                      variant={filter === 'all' ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setFilter('all')}
                    >
                      All Reviews ({reviews.length})
                    </Button>
                    <Button 
                      variant={filter === 'positive' ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setFilter('positive')}
                    >
                      Positive (4-5 ★)
                    </Button>
                    <Button 
                      variant={filter === 'neutral' ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setFilter('neutral')}
                    >
                      Neutral (3 ★)
                    </Button>
                    <Button 
                      variant={filter === 'negative' ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setFilter('negative')}
                    >
                      Negative (1-2 ★)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              {filteredReviews.length} {filter !== 'all' ? `${filter} ` : ''}Review{filteredReviews.length !== 1 ? 's' : ''}
            </h2>
            
            {filteredReviews.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg border">
                <MessageCircle className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No reviews found</h3>
                <p className="mt-1 text-gray-500">Be the first to share your experience!</p>
              </div>
            ) : (
              filteredReviews.map((review) => (
                <ReviewCard 
                  key={review.id} 
                  review={review} 
                  onFeedback={handleFeedback}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ReviewCardProps {
  review: Review;
  onFeedback: (id: number, type: 'helpful' | 'unhelpful') => void;
}

const ReviewCard = ({ review, onFeedback }: ReviewCardProps) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{review.brandName}</h3>
            <div className="flex items-center mt-1">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon 
                    key={star}
                    filled={star <= review.rating}
                    className={`h-4 w-4 ${
                      star <= review.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {review.rating}/5
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">{review.date}</div>
        </div>
        
        <p className="text-gray-700 mb-4">{review.text}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center bg-blue-50 rounded-full p-1.5 mr-2">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium">{review.userName}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onFeedback(review.id, 'helpful')}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{review.helpful}</span>
            </button>
            
            <button 
              onClick={() => onFeedback(review.id, 'unhelpful')}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>{review.unhelpful}</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StarIconProps {
  filled: boolean;
  className?: string;
}

const StarIcon = ({ filled, className }: StarIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default Reviews;
