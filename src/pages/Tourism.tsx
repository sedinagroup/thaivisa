import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Car,
  Plane,
  Camera,
  Utensils,
  Waves,
  Mountain,
  Building,
  ShoppingBag,
  Search,
  Heart,
  DollarSign
} from 'lucide-react';

interface TourPackage {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  highlights: string[];
  image: string;
  popular: boolean;
}

interface Attraction {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  rating: number;
  price: string;
  image: string;
  featured: boolean;
}

const Tourism: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tourPackages: TourPackage[] = [
    {
      id: '1',
      title: 'Bangkok City Explorer',
      description: 'Discover the vibrant capital city with temples, markets, and street food',
      duration: '3 days',
      price: 299,
      rating: 4.8,
      reviews: 245,
      category: 'city',
      highlights: ['Grand Palace', 'Wat Pho Temple', 'Floating Market', 'Street Food Tour'],
      image: '/images/tours/bangkok.jpg',
      popular: true,
    },
    {
      id: '2',
      title: 'Phuket Beach Paradise',
      description: 'Relax on pristine beaches and enjoy water activities',
      duration: '5 days',
      price: 599,
      rating: 4.9,
      reviews: 189,
      category: 'beach',
      highlights: ['Patong Beach', 'Phi Phi Islands', 'Snorkeling', 'Sunset Cruise'],
      image: '/images/tours/phuket.jpg',
      popular: true,
    },
    {
      id: '3',
      title: 'Chiang Mai Cultural Journey',
      description: 'Experience northern Thai culture and mountain landscapes',
      duration: '4 days',
      price: 449,
      rating: 4.7,
      reviews: 156,
      category: 'culture',
      highlights: ['Doi Suthep Temple', 'Night Bazaar', 'Elephant Sanctuary', 'Cooking Class'],
      image: '/images/tours/chiangmai.jpg',
      popular: false,
    },
    {
      id: '4',
      title: 'Ayutthaya Historical Tour',
      description: 'Explore ancient ruins and UNESCO World Heritage sites',
      duration: '2 days',
      price: 199,
      rating: 4.6,
      reviews: 98,
      category: 'history',
      highlights: ['Ancient Temples', 'Historical Park', 'River Cruise', 'Local Markets'],
      image: '/images/tours/ayutthaya.jpg',
      popular: false,
    },
  ];

  const attractions: Attraction[] = [
    {
      id: '1',
      name: 'Grand Palace',
      description: 'Magnificent royal palace complex in Bangkok',
      location: 'Bangkok',
      category: 'temple',
      rating: 4.8,
      price: '$15',
      image: '/images/attractions/grand-palace.jpg',
      featured: true,
    },
    {
      id: '2',
      name: 'Phi Phi Islands',
      description: 'Stunning tropical islands with crystal clear waters',
      location: 'Krabi',
      category: 'beach',
      rating: 4.9,
      price: '$45',
      image: '/images/attractions/phi-phi.jpg',
      featured: true,
    },
    {
      id: '3',
      name: 'Chatuchak Weekend Market',
      description: 'Massive weekend market with everything imaginable',
      location: 'Bangkok',
      category: 'shopping',
      rating: 4.7,
      price: 'Free',
      image: '/images/attractions/chatuchak.jpg',
      featured: false,
    },
    {
      id: '4',
      name: 'Elephant Nature Park',
      description: 'Ethical elephant sanctuary and rescue center',
      location: 'Chiang Mai',
      category: 'nature',
      rating: 4.9,
      price: '$65',
      image: '/images/attractions/elephant-park.jpg',
      featured: true,
    },
  ];

  const transfers = [
    {
      id: '1',
      type: 'Airport Transfer',
      description: 'Private car from airport to hotel',
      price: 25,
      duration: '45 min',
      icon: Car,
    },
    {
      id: '2',
      type: 'City Tour Transfer',
      description: 'Full day with driver and guide',
      price: 80,
      duration: '8 hours',
      icon: Users,
    },
    {
      id: '3',
      type: 'Inter-city Transfer',
      description: 'Comfortable travel between cities',
      price: 120,
      duration: '4-6 hours',
      icon: Plane,
    },
  ];

  const categories = [
    { id: 'all', name: 'All', icon: MapPin },
    { id: 'city', name: 'City Tours', icon: Building },
    { id: 'beach', name: 'Beach', icon: Waves },
    { id: 'culture', name: 'Culture', icon: Users },
    { id: 'history', name: 'History', icon: Camera },
    { id: 'nature', name: 'Nature', icon: Mountain },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag },
  ];

  const filteredPackages = tourPackages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attraction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Thailand Tourism & Travel Packages
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover amazing destinations, book tour packages, and arrange transfers for your perfect Thailand experience
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tours and attractions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-1"
              >
                <category.icon className="h-3 w-3" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="packages" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="packages" className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Tour Packages
            </TabsTrigger>
            <TabsTrigger value="attractions" className="flex items-center">
              <Camera className="h-4 w-4 mr-2" />
              Attractions
            </TabsTrigger>
            <TabsTrigger value="transfers" className="flex items-center">
              <Car className="h-4 w-4 mr-2" />
              Transfers
            </TabsTrigger>
          </TabsList>

          {/* Tour Packages */}
          <TabsContent value="packages">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center relative">
                    <MapPin className="h-12 w-12 text-white" />
                    {pkg.popular && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{pkg.category}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{pkg.rating} ({pkg.reviews})</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{pkg.title}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        ${pkg.price}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Highlights:</h4>
                      <div className="flex flex-wrap gap-1">
                        {pkg.highlights.slice(0, 3).map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {pkg.highlights.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{pkg.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <DollarSign className="h-3 w-3 mr-1" />
                        Book Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Attractions */}
          <TabsContent value="attractions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAttractions.map((attraction) => (
                <Card key={attraction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center relative">
                    <Camera className="h-8 w-8 text-white" />
                    {attraction.featured && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {attraction.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{attraction.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-base">{attraction.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {attraction.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">{attraction.location}</span>
                      </div>
                      <div className="font-bold text-blue-600 dark:text-blue-400">
                        {attraction.price}
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transfers */}
          <TabsContent value="transfers">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {transfers.map((transfer) => (
                <Card key={transfer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <transfer.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{transfer.type}</CardTitle>
                    <CardDescription>{transfer.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{transfer.duration}</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        ${transfer.price}
                      </div>
                    </div>
                    <Button className="w-full">
                      Book Transfer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom Transfer */}
            <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-8 text-center">
                <Car className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Need a Custom Transfer?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                  Contact us for personalized transfer solutions, group bookings, or special requirements
                </p>
                <Button size="lg">
                  Request Custom Quote
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Tourism;