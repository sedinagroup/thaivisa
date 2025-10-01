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
import { 
  Building, 
  MapPin, 
  Calendar, 
  Users, 
  Star,
  Wifi,
  Car,
  Utensils,
  Waves,
  CreditCard,
  CheckCircle,
  Bath,
  Coffee,
  Dumbbell
} from 'lucide-react';
import { toast } from 'sonner';

const Accommodations: React.FC = () => {
  const { t } = useTranslation();
  const { credits, consumeCredits } = useCredits();
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    destination: '',
    checkinDate: '',
    checkoutDate: '',
    guests: '',
    rooms: '1',
  });

  const accommodations = [
    {
      id: 'luxury-bangkok',
      name: 'Bangkok Luxury Resort',
      location: 'Bangkok City Center',
      description: 'Experience ultimate luxury in the heart of Bangkok',
      price: '฿8,500/night',
      rating: 4.9,
      reviews: 1247,
      image: '/images/hotel-luxury.jpg',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Room Service'],
      popular: true,
      type: 'Luxury Hotel',
    },
    {
      id: 'boutique-chiang-mai',
      name: 'Chiang Mai Boutique Hotel',
      location: 'Old City, Chiang Mai',
      description: 'Charming boutique hotel with traditional Thai architecture',
      price: '฿3,200/night',
      rating: 4.7,
      reviews: 892,
      image: '/images/hotel-boutique.jpg',
      amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Spa', 'Garden'],
      popular: false,
      type: 'Boutique Hotel',
    },
    {
      id: 'beach-phuket',
      name: 'Phuket Beach Resort',
      location: 'Patong Beach, Phuket',
      description: 'Beachfront paradise with stunning ocean views',
      price: '฿5,800/night',
      rating: 4.8,
      reviews: 2156,
      image: '/images/hotel-beach.jpg',
      amenities: ['Beach Access', 'Pool', 'Water Sports', 'Restaurant', 'Bar'],
      popular: true,
      type: 'Beach Resort',
    },
    {
      id: 'budget-hostel',
      name: 'Bangkok Backpacker Hostel',
      location: 'Khao San Road, Bangkok',
      description: 'Clean, safe, and social accommodation for budget travelers',
      price: '฿450/night',
      rating: 4.3,
      reviews: 567,
      image: '/images/hostel-budget.jpg',
      amenities: ['Free WiFi', 'Common Area', 'Kitchen', 'Laundry'],
      popular: false,
      type: 'Hostel',
    },
    {
      id: 'villa-koh-samui',
      name: 'Koh Samui Private Villa',
      location: 'Chaweng, Koh Samui',
      description: 'Exclusive private villa with personal chef and butler service',
      price: '฿15,000/night',
      rating: 5.0,
      reviews: 89,
      image: '/images/villa-private.jpg',
      amenities: ['Private Pool', 'Chef Service', 'Butler', 'Beach Access', 'Spa'],
      popular: false,
      type: 'Private Villa',
    },
    {
      id: 'eco-resort',
      name: 'Eco-Friendly Jungle Resort',
      location: 'Khao Yai National Park',
      description: 'Sustainable luxury in the heart of nature',
      price: '฿4,200/night',
      rating: 4.6,
      reviews: 334,
      image: '/images/eco-resort.jpg',
      amenities: ['Eco-Friendly', 'Nature Tours', 'Organic Restaurant', 'Spa'],
      popular: false,
      type: 'Eco Resort',
    },
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi':
        return <Wifi className="h-4 w-4" />;
      case 'pool':
      case 'private pool':
        return <Waves className="h-4 w-4" />;
      case 'restaurant':
      case 'organic restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'spa':
        return <Bath className="h-4 w-4" />;
      case 'gym':
        return <Dumbbell className="h-4 w-4" />;
      case 'room service':
      case 'chef service':
        return <Coffee className="h-4 w-4" />;
      case 'beach access':
        return <Waves className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const handleBooking = async () => {
    const requiredCredits = 30;
    
    if (credits < requiredCredits) {
      toast.error(`Insufficient credits. You need ${requiredCredits} credits to process accommodation booking.`);
      return;
    }

    if (!selectedHotel || !bookingData.destination || !bookingData.checkinDate) {
      toast.error('Please fill in all required booking details.');
      return;
    }

    const success = await consumeCredits(requiredCredits, 'Accommodation Booking Processing');
    
    if (success) {
      toast.success('Accommodation booking processed successfully! You will receive confirmation details shortly.');
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
            Accommodations in Thailand
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From luxury resorts to budget-friendly hostels, find the perfect place to stay 
            during your Thailand adventure. All accommodations are carefully selected for quality and value.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Your Stay
                </CardTitle>
                <CardDescription>
                  Find your perfect accommodation
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
                      <SelectItem value="koh-samui">Koh Samui</SelectItem>
                      <SelectItem value="pattaya">Pattaya</SelectItem>
                      <SelectItem value="krabi">Krabi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkin-date">Check-in</Label>
                    <Input
                      id="checkin-date"
                      type="date"
                      value={bookingData.checkinDate}
                      onChange={(e) => setBookingData({...bookingData, checkinDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkout-date">Check-out</Label>
                    <Input
                      id="checkout-date"
                      type="date"
                      value={bookingData.checkoutDate}
                      onChange={(e) => setBookingData({...bookingData, checkoutDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guests">Guests</Label>
                    <Select value={bookingData.guests} onValueChange={(value) => setBookingData({...bookingData, guests: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5+">5+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rooms">Rooms</Label>
                    <Select value={bookingData.rooms} onValueChange={(value) => setBookingData({...bookingData, rooms: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Rooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Room</SelectItem>
                        <SelectItem value="2">2 Rooms</SelectItem>
                        <SelectItem value="3">3 Rooms</SelectItem>
                        <SelectItem value="4+">4+ Rooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Booking processing fee:
                  </span>
                  <Badge variant="outline">30 credits</Badge>
                </div>

                <Button 
                  onClick={handleBooking}
                  className="w-full"
                  disabled={!selectedHotel}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Book Selected Hotel
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Accommodations Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accommodations.map((hotel) => (
                <Card 
                  key={hotel.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedHotel === hotel.id ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => setSelectedHotel(hotel.id)}
                >
                  <CardHeader className="relative p-0">
                    {hotel.popular && (
                      <Badge className="absolute top-4 right-4 bg-orange-500 z-10">
                        Popular Choice
                      </Badge>
                    )}
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
                      <Building className="h-16 w-16 text-gray-400" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-1" />
                            {hotel.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{hotel.price}</div>
                          <Badge variant="outline" className="text-xs">{hotel.type}</Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {hotel.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{hotel.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({hotel.reviews} reviews)</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {hotel.amenities.slice(0, 6).map((amenity, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                            {getAmenityIcon(amenity)}
                            <span className="ml-1">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Special Offers */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Special Offers</CardTitle>
                <CardDescription>Limited time deals and packages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Early Bird Special</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Book 30 days in advance and save up to 25% on luxury accommodations.
                    </p>
                    <Badge className="bg-blue-600">Save 25%</Badge>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Extended Stay Discount</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Stay 7 nights or more and get the 8th night free at participating hotels.
                    </p>
                    <Badge className="bg-green-600">Free Night</Badge>
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

export default Accommodations;