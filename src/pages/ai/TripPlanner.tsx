import React, { useState } from 'react';
import { useCredits } from '@/contexts/CreditsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar as CalendarIcon, 
  DollarSign, 
  Bot, 
  Sparkles,
  MapPin,
  Clock,
  Users,
  Plane,
  Hotel,
  Car,
  Utensils,
  Camera,
  Umbrella,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  CloudSun,
  Navigation
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface TripPlan {
  id: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  travelers: number;
  interests: string[];
  itinerary: DayPlan[];
  recommendations: Recommendation[];
  totalCost: number;
  savings: number;
}

interface DayPlan {
  day: number;
  date: Date;
  activities: Activity[];
  meals: Meal[];
  accommodation: string;
  transportation: string;
  estimatedCost: number;
}

interface Activity {
  time: string;
  name: string;
  description: string;
  location: string;
  cost: number;
  rating: number;
  duration: string;
  category: string;
}

interface Meal {
  time: string;
  restaurant: string;
  cuisine: string;
  cost: number;
  rating: number;
}

interface Recommendation {
  type: 'flight' | 'hotel' | 'activity' | 'restaurant' | 'transport';
  title: string;
  description: string;
  price: number;
  savings: number;
  rating: number;
  provider: string;
}

const TripPlanner: React.FC = () => {
  const { credits, consumeCredits } = useCredits();
  const [formData, setFormData] = useState({
    destination: 'Bangkok, Thailand',
    startDate: new Date('2024-12-15'),
    endDate: new Date('2024-12-25'),
    budget: 2500,
    travelers: 2,
    interests: [] as string[],
    travelStyle: 'balanced',
    accommodation: 'hotel'
  });
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const interestOptions = [
    'Cultural Sites', 'Food & Dining', 'Nightlife', 'Shopping', 'Nature & Parks',
    'Adventure Sports', 'Beaches', 'Museums', 'Local Markets', 'Photography',
    'Wellness & Spa', 'Religious Sites', 'Street Food', 'Art Galleries'
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateTripPlan = async () => {
    if (credits < 40) {
      toast.error('Insufficient credits. You need 40 credits to generate a trip plan.');
      return;
    }

    setGenerating(true);
    setProgress(0);

    try {
      // Simulate AI processing with progress updates
      const steps = [
        'Analyzing your preferences...',
        'Searching flights and accommodations...',
        'Finding best activities and attractions...',
        'Optimizing your budget...',
        'Creating personalized itinerary...',
        'Finalizing recommendations...'
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProgress((i + 1) * (100 / steps.length));
        toast.info(steps[i]);
      }

      // Consume credits
      await consumeCredits(40, 'AI Trip Planning', `Trip plan for ${formData.destination}`);

      // Generate mock trip plan
      const mockTripPlan = generateMockTripPlan();
      setTripPlan(mockTripPlan);
      
      toast.success('Trip plan generated successfully!');
    } catch (error) {
      toast.error('Failed to generate trip plan. Please try again.');
    } finally {
      setGenerating(false);
      setProgress(0);
    }
  };

  const generateMockTripPlan = (): TripPlan => {
    const days = Math.ceil((formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const dailyBudget = formData.budget / days;

    const mockActivities: Activity[] = [
      {
        time: '09:00',
        name: 'Grand Palace',
        description: 'Explore the magnificent royal palace complex',
        location: 'Phra Nakhon, Bangkok',
        cost: 15,
        rating: 4.8,
        duration: '3 hours',
        category: 'Cultural'
      },
      {
        time: '14:00',
        name: 'Wat Pho Temple',
        description: 'Visit the famous reclining Buddha temple',
        location: 'Phra Nakhon, Bangkok',
        cost: 8,
        rating: 4.7,
        duration: '2 hours',
        category: 'Religious'
      },
      {
        time: '17:00',
        name: 'Chao Phraya River Cruise',
        description: 'Scenic boat ride along Bangkok\'s main river',
        location: 'Chao Phraya River',
        cost: 25,
        rating: 4.6,
        duration: '2 hours',
        category: 'Sightseeing'
      }
    ];

    const mockMeals: Meal[] = [
      {
        time: '12:00',
        restaurant: 'Som Tam Nua',
        cuisine: 'Thai Street Food',
        cost: 12,
        rating: 4.5
      },
      {
        time: '19:00',
        restaurant: 'Blue Elephant',
        cuisine: 'Royal Thai Cuisine',
        cost: 45,
        rating: 4.8
      }
    ];

    const itinerary: DayPlan[] = Array.from({ length: days }, (_, index) => {
      const date = new Date(formData.startDate);
      date.setDate(date.getDate() + index);
      
      return {
        day: index + 1,
        date,
        activities: mockActivities,
        meals: mockMeals,
        accommodation: 'Mandarin Oriental Bangkok',
        transportation: 'BTS Skytrain + Taxi',
        estimatedCost: dailyBudget
      };
    });

    const recommendations: Recommendation[] = [
      {
        type: 'flight',
        title: 'Thai Airways - Premium Economy',
        description: 'Direct flight with excellent service',
        price: 850,
        savings: 150,
        rating: 4.7,
        provider: 'Thai Airways'
      },
      {
        type: 'hotel',
        title: 'Mandarin Oriental Bangkok',
        description: 'Luxury riverside hotel with spa',
        price: 180,
        savings: 50,
        rating: 4.9,
        provider: 'Mandarin Oriental'
      },
      {
        type: 'activity',
        title: 'Bangkok Food Tour',
        description: 'Guided street food experience',
        price: 35,
        savings: 10,
        rating: 4.8,
        provider: 'Bangkok Food Tours'
      }
    ];

    return {
      id: Date.now().toString(),
      destination: formData.destination,
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: formData.budget,
      travelers: formData.travelers,
      interests: formData.interests,
      itinerary,
      recommendations,
      totalCost: formData.budget * 0.85,
      savings: formData.budget * 0.15
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Trip Planner</h1>
              <p className="text-gray-600 dark:text-gray-400">Complete bureaucratic planning for your Thailand trip with intelligent scheduling</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-sm">
              40 credits per trip plan
            </Badge>
            <Badge variant="outline" className="text-sm">
              Available: {credits} credits
            </Badge>
          </div>
        </div>

        {!tripPlan ? (
          /* Trip Planning Form */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Plan Your Perfect Trip
                  </CardTitle>
                  <CardDescription>
                    Tell our AI about your preferences and get a personalized itinerary
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Destination */}
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="destination"
                        value={formData.destination}
                        onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                        className="pl-10"
                        placeholder="Where do you want to go?"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(formData.startDate, 'PPP')}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) => date && setFormData(prev => ({ ...prev, startDate: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(formData.endDate, 'PPP')}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.endDate}
                            onSelect={(date) => date && setFormData(prev => ({ ...prev, endDate: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Budget and Travelers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget (USD)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="budget"
                          type="number"
                          value={formData.budget}
                          onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                          className="pl-10"
                          placeholder="2500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="travelers">Number of Travelers</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="travelers"
                          type="number"
                          value={formData.travelers}
                          onChange={(e) => setFormData(prev => ({ ...prev, travelers: parseInt(e.target.value) || 1 }))}
                          className="pl-10"
                          min="1"
                          max="10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Travel Style */}
                  <div className="space-y-2">
                    <Label>Travel Style</Label>
                    <Select value={formData.travelStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, travelStyle: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget Traveler</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Interests */}
                  <div className="space-y-2">
                    <Label>Interests (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {interestOptions.map((interest) => (
                        <Button
                          key={interest}
                          variant={formData.interests.includes(interest) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleInterestToggle(interest)}
                          className="text-xs"
                        >
                          {interest}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {generating && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="w-4 h-4 text-blue-600 animate-pulse" />
                        <span className="text-sm font-medium text-blue-600">Generating your personalized trip plan...</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  <Button 
                    onClick={generateTripPlan} 
                    disabled={generating || credits < 40}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    size="lg"
                  >
                    {generating ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating Plan...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate AI Trip Plan
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* AI Trip Planner Interface Preview */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Bot className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">AI Trip Planner Interface</h3>
                    <p className="opacity-90">Personalized travel planning powered by AI</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Travel Dates</span>
                        <CalendarIcon className="w-5 h-5 text-blue-300" />
                      </div>
                      <div className="text-sm opacity-80">Dec 15 - Dec 25, 2024</div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Budget Range</span>
                        <DollarSign className="w-5 h-5 text-green-300" />
                      </div>
                      <div className="text-sm opacity-80">$2,000 - $3,000 USD</div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">AI Recommendations</span>
                        <Bot className="w-5 h-5 text-purple-300" />
                      </div>
                      <div className="text-sm opacity-80">15 personalized suggestions ready</div>
                    </div>
                    
                    <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100 mt-4">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate AI Trip Plan
                    </Button>
                  </div>
                </div>
              </Card>

              {/* How It Works */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">How AI Trip Planning Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                      <div>
                        <div className="font-medium text-sm">Tell AI Your Preferences</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Share your travel style, budget, interests, and dates</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                      <div>
                        <div className="font-medium text-sm">AI Analyzes Options</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">AI compares thousands of flights, hotels, and activities</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                      <div>
                        <div className="font-medium text-sm">Get Personalized Plan</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Receive tailored recommendations with alternatives</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                      <div>
                        <div className="font-medium text-sm">Book with Confidence</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">AI monitors and updates your trip in real-time</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Generated Trip Plan */
          <div className="space-y-8">
            {/* Trip Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{tripPlan.destination}</CardTitle>
                    <CardDescription>
                      {format(tripPlan.startDate, 'MMM dd')} - {format(tripPlan.endDate, 'MMM dd, yyyy')} • {tripPlan.travelers} travelers
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">${tripPlan.totalCost}</div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                    <Badge variant="secondary" className="mt-1">
                      Saved ${tripPlan.savings}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{tripPlan.itinerary.length}</div>
                  <div className="text-sm text-gray-600">Days</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <MapPin className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{tripPlan.itinerary.reduce((acc, day) => acc + day.activities.length, 0)}</div>
                  <div className="text-sm text-gray-600">Activities</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">4.7</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">${Math.round(tripPlan.totalCost / tripPlan.itinerary.length)}</div>
                  <div className="text-sm text-gray-600">Per Day</div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>Top picks optimized for your preferences and budget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tripPlan.recommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {rec.type}
                        </Badge>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{rec.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-medium mb-1">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold">${rec.price}</span>
                          <span className="text-sm text-green-600 ml-2">Save ${rec.savings}</span>
                        </div>
                        <Button size="sm" variant="outline">Book</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Itinerary</CardTitle>
                <CardDescription>Your personalized day-by-day plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tripPlan.itinerary.slice(0, 3).map((day) => (
                    <div key={day.day} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold">Day {day.day} - {format(day.date, 'EEEE, MMM dd')}</h3>
                        <Badge variant="secondary">${day.estimatedCost}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            Activities
                          </h4>
                          <div className="space-y-2">
                            {day.activities.slice(0, 2).map((activity, index) => (
                              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium text-sm">{activity.time} - {activity.name}</span>
                                  <span className="text-xs text-gray-600">${activity.cost}</span>
                                </div>
                                <p className="text-xs text-gray-600">{activity.description}</p>
                                <div className="flex items-center mt-1">
                                  <Star className="w-3 h-3 text-yellow-500 mr-1" />
                                  <span className="text-xs">{activity.rating}</span>
                                  <span className="text-xs text-gray-500 ml-2">{activity.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <Utensils className="w-4 h-4 mr-1" />
                            Dining
                          </h4>
                          <div className="space-y-2">
                            {day.meals.map((meal, index) => (
                              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium text-sm">{meal.time} - {meal.restaurant}</span>
                                  <span className="text-xs text-gray-600">${meal.cost}</span>
                                </div>
                                <p className="text-xs text-gray-600">{meal.cuisine}</p>
                                <div className="flex items-center mt-1">
                                  <Star className="w-3 h-3 text-yellow-500 mr-1" />
                                  <span className="text-xs">{meal.rating}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    View Complete Itinerary ({tripPlan.itinerary.length} days)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
              <Button onClick={() => setTripPlan(null)} variant="outline">
                Create New Plan
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500">
                Book This Trip
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;