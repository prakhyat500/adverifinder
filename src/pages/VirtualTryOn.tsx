
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Camera, Upload, Image as ImageIcon, Shirt, Check, Info } from 'lucide-react';

const VirtualTryOn = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [useLiveCamera, setUseLiveCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<number | null>(null);
  
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = 'Virtual Try-On | Trust Trend';
    return () => {
      document.title = 'Trust Trend';
      // Cleanup camera stream when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);
  
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setUseLiveCamera(true);
      
      toast({
        title: "Camera Active",
        description: "Your camera is now active. Position yourself in the frame and select a clothing item.",
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access your camera. Please check permissions and try again.",
        variant: "destructive",
      });
    }
  };
  
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setUseLiveCamera(false);
    }
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'person' | 'clothing') => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === 'person') {
        setSourceImage(e.target?.result as string);
        stopCamera(); // Stop camera if user uploads an image
        setUseLiveCamera(false);
      } else {
        setClothingImage(e.target?.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const capturePhoto = () => {
    const videoElement = document.getElementById('cameraFeed') as HTMLVideoElement;
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx && videoElement) {
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');
      setSourceImage(imageDataUrl);
      
      toast({
        title: "Photo Captured",
        description: "Your photo has been captured. Now select a clothing item to try on.",
      });
    }
  };
  
  const handleSelectClothing = (id: number, imageSrc: string) => {
    setSelectedClothing(id);
    setClothingImage(imageSrc);
  };
  
  const handleTryOn = () => {
    if (!sourceImage) {
      toast({
        title: "Missing Photo",
        description: "Please upload or capture a photo of yourself first.",
        variant: "destructive",
      });
      return;
    }
    
    if (!clothingImage) {
      toast({
        title: "Missing Clothing",
        description: "Please select a clothing item to try on.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // In a real app, this would call an AI service
    // For demo, we'll simulate processing delay and use a mock result
    setTimeout(() => {
      // Mock result - in a real app, the AI would generate this
      setResultImage('/placeholder.svg');
      setIsProcessing(false);
      
      toast({
        title: "Try-On Complete",
        description: "Virtual try-on has been processed successfully!",
      });
    }, 3000);
  };
  
  const clothingItems = [
    { id: 1, name: 'Blue T-Shirt', image: '/placeholder.svg', price: '$29.99' },
    { id: 2, name: 'Black Blazer', image: '/placeholder.svg', price: '$89.99' },
    { id: 3, name: 'Red Dress', image: '/placeholder.svg', price: '$59.99' },
    { id: 4, name: 'White Shirt', image: '/placeholder.svg', price: '$34.99' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Shirt size={28} />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Virtual Try-On</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              See how clothing items would look on you before purchasing
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <Info className="h-5 w-5" />
              <p className="text-sm font-medium">How it works</p>
            </div>
            <p className="text-sm text-gray-600">
              Upload a photo of yourself or use your camera, then select clothing items to see how they would look on you. Our AI technology will create a realistic visualization.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Photo</CardTitle>
                <CardDescription>
                  Upload a photo or use your camera to capture a full-body image
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        if (useLiveCamera) {
                          stopCamera();
                        } else {
                          startCamera();
                        }
                      }}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      {useLiveCamera ? 'Stop Camera' : 'Use Camera'}
                    </Button>
                    
                    <div className="relative">
                      <Button variant="outline" className="relative">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'person')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </Button>
                    </div>
                    
                    {useLiveCamera && (
                      <Button 
                        variant="secondary"
                        onClick={capturePhoto}
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Capture
                      </Button>
                    )}
                  </div>
                  
                  <div className="border rounded-md p-2 min-h-[300px] flex items-center justify-center bg-gray-50">
                    {useLiveCamera && stream ? (
                      <video
                        id="cameraFeed"
                        autoPlay
                        playsInline
                        className="max-w-full max-h-[300px] rounded"
                        ref={(videoElement) => {
                          if (videoElement && stream) {
                            videoElement.srcObject = stream;
                          }
                        }}
                      />
                    ) : sourceImage ? (
                      <img 
                        src={sourceImage} 
                        alt="Uploaded photo" 
                        className="max-w-full max-h-[300px] rounded" 
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p>No photo uploaded</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Select Clothing</CardTitle>
                <CardDescription>
                  Choose clothing items to virtually try on
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {clothingItems.map((item) => (
                    <div 
                      key={item.id}
                      className={`border rounded-md p-2 cursor-pointer transition-all ${
                        selectedClothing === item.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleSelectClothing(item.id, item.image)}
                    >
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-36 object-contain rounded" 
                        />
                        {selectedClothing === item.id && (
                          <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleTryOn}
                  disabled={isProcessing || !sourceImage || !clothingImage}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shirt className="mr-2 h-4 w-4" />
                      Try It On
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {resultImage && (
            <Card className="border-blue-100 shadow-md">
              <CardHeader className="bg-blue-50 border-b border-blue-100">
                <CardTitle className="flex items-center">
                  <Check className="h-5 w-5 text-blue-600 mr-2" />
                  Virtual Try-On Result
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1">
                    <img
                      src={resultImage}
                      alt="Virtual try-on result"
                      className="max-w-full max-h-[500px] mx-auto rounded-md shadow-sm"
                    />
                  </div>
                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-1">How does it look?</h3>
                      <p className="text-gray-600">
                        This is a virtual representation of how the selected clothing item would look on you. The visualization uses AI to create a realistic fitting.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Button className="w-full">
                        View Item Details
                      </Button>
                      <Button variant="outline" className="w-full">
                        Try Another Item
                      </Button>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4">
                      <p className="text-sm text-yellow-800">
                        <span className="font-medium">Note:</span> Virtual try-on provides an estimate of fit and appearance. Actual products may vary slightly in color, texture, and fit.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
