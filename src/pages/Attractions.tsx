import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCredits } from '@/contexts/CreditsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star,
  Clock,
  Camera,
  Utensils,
  Waves,
  Mountain,
  Building,
  CreditCard,
  CheckCircle,
  Heart,
  Share,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

const Attractions: React.FC = () => {
  const { t } = useTranslation();
  const { credits, consumeCredits } = useCredits();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    destination: '',
    date: '',
    participants: '',
    packageType: '',
  });

  const tourPackages = [
    {
      id: 'bangkok-temples',
      name: 'Bangkok Temple Tour',
      location: 'Bangkok',
      description: 'Explore the magnificent temples and cultural heritage of Bangkok',
      price: '฿1,500/person',
      duration: '8 hours',
      rating: 4.8,
      reviews: 1247,
      image: '/images/bangkok-temples.jpg',
      highlights: ['Wat Pho Temple', 'Grand Palace', 'Wat Arun', 'Local lunch included'],
      category: 'Cultural',
      popular: true,
      includes: ['Professional guide', 'Transportation', 'Entrance fees', 'Lunch'],
    },
    {
      id: 'phi-phi-islands',
      name: 'Phi Phi Islands Day Trip',
      location: 'Phuket/Krabi',
      description: 'Discover the stunning beauty of the famous Phi Phi Islands',
      price: '฿2,800/person',
      duration: '10 hours',
      rating: 4.9,
      reviews: 2156,
      image: '/images/phi-phi-islands.jpg',
      highlights: ['Maya Bay', 'Snorkeling', 'Monkey Beach', 'Buffet lunch'],
      category: 'Beach & Islands',
      popular: true,
      includes: ['Speedboat transfer', 'Snorkeling gear', 'Lunch', 'Professional guide'],
    },
    {
      id: 'elephant-sanctuary',
      name: 'Ethical Elephant Sanctuary',
      location: 'Chiang Mai',
      description: 'Interact with rescued elephants in their natural habitat',
      price: '฿2,200/person',
      duration: '6 hours',
      rating: 4.7,
      reviews: 892,
      image: '/images/elephant-sanctuary.jpg',
      highlights: ['Feed elephants', 'Mud bath experience', 'Educational program', 'Vegetarian lunch'],
      category: 'Wildlife',
      popular: false,
      includes: ['Transportation', 'English-speaking guide', 'Lunch', 'Insurance'],
    },
    {
      id: 'floating-markets',
      name: 'Floating Markets Experience',
      location: 'Bangkok',
      description: 'Experience traditional Thai floating markets and local culture',
      price: '฿1,200/person',
      duration: '5 hours',
      rating: 4.5,
      reviews: 567,
      image: '/images/floating-markets.jpg',
      highlights: ['Damnoen Saduak Market', 'Long-tail boat ride', 'Local food tasting', 'Cultural insights'],
      category: 'Cultural',
      popular: false,
      includes: ['Transportation', 'Boat ride', 'Guide', 'Market entrance'],
    },
    {
      id: 'james-bond-island',
      name: 'James Bond Island Tour',
      location: 'Phuket',
      description: 'Visit the famous James Bond Island and Phang Nga Bay',
      price: '฿2,500/person',
      duration: '9 hours',
      rating: 4.6,
      reviews: 1334,
      image: '/images/james-bond-island.jpg',
      highlights: ['Phang Nga Bay', 'Sea canoeing', 'Limestone caves', 'Thai lunch'],
      category: 'Adventure',
      popular: true,
      includes: ['Longtail boat', 'Canoe equipment', 'Lunch', 'Insurance'],
    },
    {
      id: 'cooking-class',
      name: 'Thai Cooking Class',
      location: 'Multiple Cities',
      description: 'Learn to cook authentic Thai dishes with local chefs',
      price: '฿1,800/person',
      duration: '4 hours',
      rating: 4.9,
      reviews: 445,
      image: '/images/cooking-class.jpg',
      highlights: ['Market visit', 'Hands-on cooking', '5-course meal', 'Recipe booklet'],
      category: 'Culinary',
      popular: false,
      includes: ['Ingredients', 'Cooking equipment', 'Meal', 'Recipe book'],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Tours', icon: MapPin },
    { id: 'Cultural', name: 'Cultural', icon: Building },
    { id: 'Beach & Islands', name: 'Beach & Islands', icon: Waves },
    { id: 'Adventure', name: 'Adventure', icon: Mountain },
    { id: 'Wildlife', name: 'Wildlife', icon: Camera },
    { id: 'Culinary', name: 'Culinary', icon: Utensils },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPackages = selectedCategory === 'all' 
    ? tourPackages 
    : tourPackages.filter(pkg => pkg.category === selectedCategory);

  const handleBooking = async () => {
    const requiredCredits = 35;
    
    if (credits < requiredCredits) {
      toast.error(`Insufficient credits. You need ${requiredCredits} credits to process tour booking.`);
      return;
    }

    if (!selectedPackage || !bookingData.destination || !bookingData.date) {
      toast.error('Please fill in all required booking details.');
      return;
    }

    const success = await consumeCredits(requiredCredits, 'Tour Package Booking Processing');
    
    if (success) {
      toast.success('Tour package booking processed successfully! You will receive confirmation details shortly.');
    } else {
      toast.error('Failed to process booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Thailand Attractions & Tour Packages
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the wonders of Thailand with our carefully curated tour packages. 
            From ancient temples to pristine beaches, create unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Your Tour
                </CardTitle>
                <CardDescription>
                  Plan your perfect adventure
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Select value={bookingData.destination} onValueChange={(value) => setBookingData({...bookingData, destination: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangkok">Bangkok</SelectItem>
                      <SelectItem value="phuket">Phuket</SelectItem>
                      <SelectItem value="chiang-mai">Chiang Mai</SelectItem>
                      <SelectItem value="krabi">Krabi</SelectItem>
                      <SelectItem value="koh-samui">Koh Samui</SelectItem>
                      <SelectItem value="pattaya">Pattaya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="package-type">Package Type</Label>
                  <Select value={bookingData.packageType} onValueChange={(value) => setBookingData({...bookingData, packageType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select package type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cultural">Cultural Tours</SelectItem>
                      <SelectItem value="beach">Beach & Islands</SelectItem>
                      <SelectItem value="adventure">Adventure Tours</SelectItem>
                      <SelectItem value="wildlife">Wildlife Tours</SelectItem>
                      <SelectItem value="culinary">Culinary Experiences</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="participants">Participants</Label>
                  <Select value={bookingData.participants} onValueChange={(value) => setBookingData({...bookingData, participants: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Number of participants" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="3">3 People</SelectItem>
                      <SelectItem value="4">4 People</SelectItem>
                      <SelectItem value="5+">5+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Booking processing fee:
                  </span>
                  <Badge variant="outline">35 credits</Badge>
                </div>

                <Button 
                  onClick={handleBooking}
                  className="w-full"
                  disabled={!selectedPackage}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Book Selected Tour
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Tour Packages */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center space-x-1"
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Tour Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPackages.map((tour) => (
                <Card 
                  key={tour.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedPackage === tour.id ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => setSelectedPackage(tour.id)}
                >
                  <CardHeader className="relative p-0">
                    {tour.popular && (
                      <Badge className="absolute top-4 right-4 bg-orange-500 z-10">
                        Popular
                      </Badge>
                    )}
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                      <Camera className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="secondary" className="mb-2">
                        {tour.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {tour.name}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-1" />
                            {tour.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{tour.price}</div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {tour.duration}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tour.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{tour.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({tour.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="p-1">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Tour Highlights:</h4>
                        <div className="grid grid-cols-2 gap-1">
                          {tour.highlights.slice(0, 4).map((highlight, index) => (
                            <div key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Includes:</h4>
                        <div className="flex flex-wrap gap-1">
                          {tour.includes.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Special Offers */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Special Offers & Packages</CardTitle>
                <CardDescription>Limited time deals and combo packages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Multi-Day Adventure Package</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Combine 3 or more tours and save up to 30%. Perfect for extended stays.
                    </p>
                    <Badge className="bg-purple-600">Save 30%</Badge>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Group Booking Discount</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Book for 6+ people and get special group rates plus complimentary guide.
                    </p>
                    <Badge className="bg-orange-600">Group Rates</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attractions;