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
  Car, 
  MapPin, 
  Calendar, 
  Users, 
  Shield, 
  Star,
  Fuel,
  Settings,
  CheckCircle,
  CreditCard,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

const CarRental: React.FC = () => {
  const { t } = useTranslation();
  const { credits, consumeCredits } = useCredits();
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    driverAge: '',
  });

  const carCategories = [
    {
      id: 'economy',
      name: 'Economy',
      description: 'Perfect for city driving and budget-conscious travelers',
      price: '฿800/day',
      features: ['Manual transmission', 'Air conditioning', 'Fuel efficient', '4 seats'],
      image: '/images/car-economy.jpg',
      popular: false,
    },
    {
      id: 'compact',
      name: 'Compact',
      description: 'Great balance of comfort and affordability',
      price: '฿1,200/day',
      features: ['Automatic transmission', 'Air conditioning', 'GPS included', '5 seats'],
      image: '/images/car-compact.jpg',
      popular: true,
    },
    {
      id: 'suv',
      name: 'SUV',
      description: 'Spacious and comfortable for families and groups',
      price: '฿2,500/day',
      features: ['4WD capability', 'Premium interior', 'Large luggage space', '7 seats'],
      image: '/images/car-suv.jpg',
      popular: false,
    },
    {
      id: 'luxury',
      name: 'Luxury',
      description: 'Premium vehicles for special occasions',
      price: '฿4,500/day',
      features: ['Premium brand', 'Leather seats', 'Advanced features', 'Chauffeur available'],
      image: '/images/car-luxury.jpg',
      popular: false,
    },
  ];

  const handleBooking = async () => {
    const requiredCredits = 25;
    
    if (credits < requiredCredits) {
      toast.error(`Insufficient credits. You need ${requiredCredits} credits to process car rental booking.`);
      return;
    }

    if (!selectedCar || !bookingData.pickupLocation || !bookingData.pickupDate) {
      toast.error('Please fill in all required booking details.');
      return;
    }

    const success = await consumeCredits(requiredCredits, 'Car Rental Booking Processing');
    
    if (success) {
      toast.success('Car rental booking processed successfully! You will receive confirmation details shortly.');
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
            Car Rental in Thailand
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore Thailand at your own pace with our premium car rental service. 
            From economy cars to luxury vehicles, we have the perfect ride for your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Your Rental
                </CardTitle>
                <CardDescription>
                  Fill in your details to get started
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pickup-location">Pickup Location</Label>
                  <Select value={bookingData.pickupLocation} onValueChange={(value) => setBookingData({...bookingData, pickupLocation: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangkok-airport">Bangkok Airport (BKK)</SelectItem>
                      <SelectItem value="bangkok-city">Bangkok City Center</SelectItem>
                      <SelectItem value="phuket-airport">Phuket Airport (HKT)</SelectItem>
                      <SelectItem value="phuket-city">Phuket City</SelectItem>
                      <SelectItem value="chiang-mai-airport">Chiang Mai Airport (CNX)</SelectItem>
                      <SelectItem value="chiang-mai-city">Chiang Mai City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dropoff-location">Drop-off Location</Label>
                  <Select value={bookingData.dropoffLocation} onValueChange={(value) => setBookingData({...bookingData, dropoffLocation: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select drop-off location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same">Same as pickup</SelectItem>
                      <SelectItem value="bangkok-airport">Bangkok Airport (BKK)</SelectItem>
                      <SelectItem value="bangkok-city">Bangkok City Center</SelectItem>
                      <SelectItem value="phuket-airport">Phuket Airport (HKT)</SelectItem>
                      <SelectItem value="phuket-city">Phuket City</SelectItem>
                      <SelectItem value="chiang-mai-airport">Chiang Mai Airport (CNX)</SelectItem>
                      <SelectItem value="chiang-mai-city">Chiang Mai City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickup-date">Pickup Date</Label>
                    <Input
                      id="pickup-date"
                      type="date"
                      value={bookingData.pickupDate}
                      onChange={(e) => setBookingData({...bookingData, pickupDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dropoff-date">Drop-off Date</Label>
                    <Input
                      id="dropoff-date"
                      type="date"
                      value={bookingData.dropoffDate}
                      onChange={(e) => setBookingData({...bookingData, dropoffDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="driver-age">Driver Age</Label>
                  <Select value={bookingData.driverAge} onValueChange={(value) => setBookingData({...bookingData, driverAge: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="21-25">21-25 years</SelectItem>
                      <SelectItem value="26-35">26-35 years</SelectItem>
                      <SelectItem value="36-50">36-50 years</SelectItem>
                      <SelectItem value="50+">50+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Booking processing fee:
                  </span>
                  <Badge variant="outline">25 credits</Badge>
                </div>

                <Button 
                  onClick={handleBooking}
                  className="w-full"
                  disabled={!selectedCar}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Book Selected Car
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Car Categories */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {carCategories.map((car) => (
                <Card 
                  key={car.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedCar === car.id ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => setSelectedCar(car.id)}
                >
                  <CardHeader className="relative">
                    {car.popular && (
                      <Badge className="absolute top-4 right-4 bg-orange-500">
                        Most Popular
                      </Badge>
                    )}
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                      <Car className="h-16 w-16 text-gray-400" />
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      {car.name}
                      <span className="text-lg font-bold text-green-600">{car.price}</span>
                    </CardTitle>
                    <CardDescription>{car.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        4.8 (234 reviews)
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {car.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Shield className="h-4 w-4 mr-1" />
                          Full insurance included
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          24/7 support
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Services */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Additional Services</CardTitle>
                <CardDescription>Enhance your rental experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <MapPin className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">GPS Navigation</h4>
                      <p className="text-sm text-gray-600">฿200/day</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <Users className="h-8 w-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">Child Seat</h4>
                      <p className="text-sm text-gray-600">฿150/day</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <Fuel className="h-8 w-8 text-orange-600" />
                    <div>
                      <h4 className="font-medium">Full Tank Service</h4>
                      <p className="text-sm text-gray-600">฿500 one-time</p>
                    </div>
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

export default CarRental;