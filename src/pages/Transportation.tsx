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
  Plane, 
  Car, 
  Train, 
  Ship,
  MapPin, 
  Calendar, 
  Users, 
  Clock,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Luggage,
  Shield,
  Star
} from 'lucide-react';
import { toast } from 'sonner';

const Transportation: React.FC = () => {
  const { t } = useTranslation();
  const { credits, consumeCredits } = useCredits();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    serviceType: '',
    from: '',
    to: '',
    date: '',
    passengers: '',
    time: '',
  });

  const transportationServices = [
    {
      id: 'airport-transfer',
      name: 'Airport Transfer',
      description: 'Comfortable and reliable transfers to/from airports',
      icon: Plane,
      price: 'From ฿800',
      duration: '30-60 mins',
      features: ['Professional driver', 'Flight tracking', 'Meet & greet', 'Free waiting time'],
      popular: true,
      type: 'Private Transfer',
    },
    {
      id: 'city-transfer',
      name: 'City Transfers',
      description: 'Point-to-point transfers within cities',
      icon: Car,
      price: 'From ฿400',
      duration: '15-45 mins',
      features: ['Air-conditioned vehicle', 'Professional driver', 'Door-to-door service', 'GPS tracking'],
      popular: false,
      type: 'Private Transfer',
    },
    {
      id: 'intercity-bus',
      name: 'Intercity Bus',
      description: 'Comfortable bus travel between major cities',
      icon: Car,
      price: 'From ฿200',
      duration: '2-8 hours',
      features: ['Reclining seats', 'Air conditioning', 'Onboard entertainment', 'Rest stops'],
      popular: false,
      type: 'Shared Transport',
    },
    {
      id: 'train-service',
      name: 'Train Services',
      description: 'Scenic train journeys across Thailand',
      icon: Train,
      price: 'From ฿150',
      duration: '3-12 hours',
      features: ['Comfortable seating', 'Dining car', 'Scenic views', 'Sleeper options'],
      popular: false,
      type: 'Rail Transport',
    },
    {
      id: 'ferry-service',
      name: 'Ferry & Boat',
      description: 'Island hopping and coastal transfers',
      icon: Ship,
      price: 'From ฿300',
      duration: '30 mins - 3 hours',
      features: ['Life jackets provided', 'Luggage handling', 'Scenic routes', 'Multiple departures'],
      popular: true,
      type: 'Marine Transport',
    },
    {
      id: 'private-charter',
      name: 'Private Charter',
      description: 'Exclusive vehicle with personal driver',
      icon: Car,
      price: 'From ฿2,500',
      duration: 'Flexible',
      features: ['Luxury vehicle', 'Personal driver', 'Flexible itinerary', 'Multiple stops'],
      popular: false,
      type: 'Premium Service',
    },
  ];

  const popularRoutes = [
    { from: 'Bangkok Airport', to: 'Bangkok City', price: '฿800', duration: '45 mins' },
    { from: 'Bangkok', to: 'Pattaya', price: '฿1,200', duration: '2 hours' },
    { from: 'Bangkok', to: 'Hua Hin', price: '฿1,800', duration: '3 hours' },
    { from: 'Phuket Airport', to: 'Patong Beach', price: '฿600', duration: '45 mins' },
    { from: 'Krabi', to: 'Koh Phi Phi', price: '฿450', duration: '1.5 hours' },
    { from: 'Bangkok', to: 'Chiang Mai', price: '฿8,500', duration: '1.5 hours (flight)' },
  ];

  const handleBooking = async () => {
    const requiredCredits = 20;
    
    if (credits < requiredCredits) {
      toast.error(`Insufficient credits. You need ${requiredCredits} credits to process transportation booking.`);
      return;
    }

    if (!selectedService || !bookingData.from || !bookingData.to || !bookingData.date) {
      toast.error('Please fill in all required booking details.');
      return;
    }

    const success = await consumeCredits(requiredCredits, 'Transportation Booking Processing');
    
    if (success) {
      toast.success('Transportation booking processed successfully! You will receive confirmation details shortly.');
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
            Transportation & Transfers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Travel comfortably and safely across Thailand with our comprehensive transportation services. 
            From airport transfers to intercity travel, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Transfer
                </CardTitle>
                <CardDescription>
                  Plan your journey
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="service-type">Service Type</Label>
                  <Select value={bookingData.serviceType} onValueChange={(value) => setBookingData({...bookingData, serviceType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="airport-transfer">Airport Transfer</SelectItem>
                      <SelectItem value="city-transfer">City Transfer</SelectItem>
                      <SelectItem value="intercity-bus">Intercity Bus</SelectItem>
                      <SelectItem value="train-service">Train Service</SelectItem>
                      <SelectItem value="ferry-service">Ferry Service</SelectItem>
                      <SelectItem value="private-charter">Private Charter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="from">From</Label>
                  <Select value={bookingData.from} onValueChange={(value) => setBookingData({...bookingData, from: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Departure location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangkok-airport">Bangkok Airport (BKK)</SelectItem>
                      <SelectItem value="bangkok-city">Bangkok City</SelectItem>
                      <SelectItem value="phuket-airport">Phuket Airport (HKT)</SelectItem>
                      <SelectItem value="phuket-city">Phuket City</SelectItem>
                      <SelectItem value="chiang-mai">Chiang Mai</SelectItem>
                      <SelectItem value="pattaya">Pattaya</SelectItem>
                      <SelectItem value="hua-hin">Hua Hin</SelectItem>
                      <SelectItem value="krabi">Krabi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="to">To</Label>
                  <Select value={bookingData.to} onValueChange={(value) => setBookingData({...bookingData, to: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangkok-airport">Bangkok Airport (BKK)</SelectItem>
                      <SelectItem value="bangkok-city">Bangkok City</SelectItem>
                      <SelectItem value="phuket-airport">Phuket Airport (HKT)</SelectItem>
                      <SelectItem value="phuket-city">Phuket City</SelectItem>
                      <SelectItem value="chiang-mai">Chiang Mai</SelectItem>
                      <SelectItem value="pattaya">Pattaya</SelectItem>
                      <SelectItem value="hua-hin">Hua Hin</SelectItem>
                      <SelectItem value="krabi">Krabi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={bookingData.time}
                      onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="passengers">Passengers</Label>
                  <Select value={bookingData.passengers} onValueChange={(value) => setBookingData({...bookingData, passengers: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Number of passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                      <SelectItem value="5+">5+ Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Booking processing fee:
                  </span>
                  <Badge variant="outline">20 credits</Badge>
                </div>

                <Button 
                  onClick={handleBooking}
                  className="w-full"
                  disabled={!selectedService}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Book Selected Service
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Transportation Services */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {transportationServices.map((service) => (
                <Card 
                  key={service.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedService === service.id ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <CardHeader className="relative">
                    {service.popular && (
                      <Badge className="absolute top-4 right-4 bg-orange-500">
                        Popular
                      </Badge>
                    )}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium text-green-600">{service.price}</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {service.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{service.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <Badge variant="outline" className="text-xs">{service.type}</Badge>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Popular Routes */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Routes</CardTitle>
                <CardDescription>Most requested transportation routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularRoutes.map((route, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="flex items-center space-x-2 text-sm font-medium">
                            <span>{route.from}</span>
                            <ArrowRight className="h-3 w-3" />
                            <span>{route.to}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                            <Clock className="h-3 w-3" />
                            <span>{route.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{route.price}</div>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Select
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Services */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Additional Services</CardTitle>
                <CardDescription>Enhance your travel experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <Luggage className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Extra Luggage</h4>
                      <p className="text-sm text-gray-600">฿100 per extra bag</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <Shield className="h-8 w-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">Travel Insurance</h4>
                      <p className="text-sm text-gray-600">฿200 per trip</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <Star className="h-8 w-8 text-orange-600" />
                    <div>
                      <h4 className="font-medium">Premium Service</h4>
                      <p className="text-sm text-gray-600">฿500 upgrade</p>
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

export default Transportation;