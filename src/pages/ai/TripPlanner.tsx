import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  DollarSign, 
  Plane, 
  Hotel, 
  Car, 
  Utensils, 
  Camera, 
  Mountain, 
  Waves, 
  Building, 
  TreePine, 
  Sun, 
  Moon, 
  Clock, 
  Star, 
  Heart, 
  Zap, 
  Sparkles, 
  Bot, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  AlertCircle, 
  Info,
  Gift,
  Compass,
  Globe,
  Shield,
  Award,
  Target,
  TrendingUp,
  ChevronRight,
  Plus,
  Minus,
  Download,
  Share2,
  Edit,
  FileText,
  CheckCircle2,
  MapIcon,
  CalendarDays,
  Wallet
} from 'lucide-react';

interface TripPlan {
  id: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget: number;
  preferences: string[];
  accommodation: string;
  transportation: string;
  activities: string[];
  specialRequests: string;
  createdAt: Date;
  plan?: {
    itinerary: any[];
    recommendations: any[];
    estimatedCost: number;
  };
}

const TripPlanner: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { credits, useCredits: consumeCredits } = useCredits();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<TripPlan | null>(null);
  
  // Form state
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState([2000]);
  const [accommodation, setAccommodation] = useState('');
  const [transportation, setTransportation] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const creditCosts = {
    basic: 25,
    advanced: 50,
    premium: 100,
    vip: 200
  };

  const accommodationTypes = [
    { value: 'hotel', label: t('tripPlanner.accommodation.hotel'), icon: Hotel },
    { value: 'resort', label: t('tripPlanner.accommodation.resort'), icon: Building },
    { value: 'hostel', label: t('tripPlanner.accommodation.hostel'), icon: Users },
    { value: 'apartment', label: t('tripPlanner.accommodation.apartment'), icon: Building },
    { value: 'villa', label: t('tripPlanner.accommodation.villa'), icon: TreePine }
  ];

  const transportationTypes = [
    { value: 'flight', label: t('tripPlanner.transportation.flight'), icon: Plane },
    { value: 'train', label: t('tripPlanner.transportation.train'), icon: Car },
    { value: 'bus', label: t('tripPlanner.transportation.bus'), icon: Car },
    { value: 'car-rental', label: t('tripPlanner.transportation.carRental'), icon: Car },
    { value: 'mixed', label: t('tripPlanner.transportation.mixed'), icon: Compass }
  ];

  const preferenceOptions = [
    { value: 'culture', label: t('tripPlanner.preferences.culture'), icon: Building },
    { value: 'adventure', label: t('tripPlanner.preferences.adventure'), icon: Mountain },
    { value: 'relaxation', label: t('tripPlanner.preferences.relaxation'), icon: Waves },
    { value: 'nightlife', label: t('tripPlanner.preferences.nightlife'), icon: Moon },
    { value: 'food', label: t('tripPlanner.preferences.food'), icon: Utensils },
    { value: 'shopping', label: t('tripPlanner.preferences.shopping'), icon: Gift },
    { value: 'nature', label: t('tripPlanner.preferences.nature'), icon: TreePine },
    { value: 'photography', label: t('tripPlanner.preferences.photography'), icon: Camera }
  ];

  const activityOptions = [
    { value: 'temples', label: t('tripPlanner.activities.temples'), icon: Building },
    { value: 'beaches', label: t('tripPlanner.activities.beaches'), icon: Waves },
    { value: 'markets', label: t('tripPlanner.activities.markets'), icon: Gift },
    { value: 'museums', label: t('tripPlanner.activities.museums'), icon: Building },
    { value: 'tours', label: t('tripPlanner.activities.tours'), icon: Compass },
    { value: 'cooking-classes', label: t('tripPlanner.activities.cookingClasses'), icon: Utensils },
    { value: 'spa', label: t('tripPlanner.activities.spa'), icon: Heart },
    { value: 'diving', label: t('tripPlanner.activities.diving'), icon: Waves }
  ];

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    if (checked) {
      setPreferences([...preferences, preference]);
    } else {
      setPreferences(preferences.filter(p => p !== preference));
    }
  };

  const handleActivityChange = (activity: string, checked: boolean) => {
    if (checked) {
      setActivities([...activities, activity]);
    } else {
      setActivities(activities.filter(a => a !== activity));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateTripPlan = async (planType: string) => {
    const cost = creditCosts[planType as keyof typeof creditCosts];
    
    if (credits < cost) {
      alert(t('tripPlanner.errors.insufficientCredits'));
      return;
    }

    // Validate required fields
    if (!destination || !startDate || !endDate) {
      alert('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate AI trip planning
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockPlan: TripPlan = {
        id: Date.now().toString(),
        destination,
        startDate: startDate!,
        endDate: endDate!,
        travelers,
        budget: budget[0],
        preferences,
        accommodation,
        transportation,
        activities,
        specialRequests,
        createdAt: new Date(),
        plan: {
          itinerary: [
            {
              day: 1,
              title: t('tripPlanner.result.itinerary.day1.title'),
              description: t('tripPlanner.result.itinerary.day1.description'),
              activities: [
                {
                  time: '09:00',
                  title: t('tripPlanner.result.itinerary.day1.activity1.title'),
                  description: t('tripPlanner.result.itinerary.day1.activity1.description'),
                  icon: 'plane',
                  duration: '2h'
                },
                {
                  time: '14:00',
                  title: t('tripPlanner.result.itinerary.day1.activity2.title'),
                  description: t('tripPlanner.result.itinerary.day1.activity2.description'),
                  icon: 'building',
                  duration: '3h'
                },
                {
                  time: '19:00',
                  title: t('tripPlanner.result.itinerary.day1.activity3.title'),
                  description: t('tripPlanner.result.itinerary.day1.activity3.description'),
                  icon: 'utensils',
                  duration: '2h'
                }
              ]
            },
            {
              day: 2,
              title: t('tripPlanner.result.itinerary.day2.title'),
              description: t('tripPlanner.result.itinerary.day2.description'),
              activities: [
                {
                  time: '08:00',
                  title: t('tripPlanner.result.itinerary.day2.activity1.title'),
                  description: t('tripPlanner.result.itinerary.day2.activity1.description'),
                  icon: 'building',
                  duration: '2h'
                },
                {
                  time: '11:00',
                  title: t('tripPlanner.result.itinerary.day2.activity2.title'),
                  description: t('tripPlanner.result.itinerary.day2.activity2.description'),
                  icon: 'gift',
                  duration: '3h'
                },
                {
                  time: '16:00',
                  title: t('tripPlanner.result.itinerary.day2.activity3.title'),
                  description: t('tripPlanner.result.itinerary.day2.activity3.description'),
                  icon: 'utensils',
                  duration: '3h'
                }
              ]
            }
          ],
          recommendations: [
            {
              type: 'hotel',
              category: t('tripPlanner.result.recommendations.accommodation.category'),
              name: t('tripPlanner.result.recommendations.accommodation.name'),
              description: t('tripPlanner.result.recommendations.accommodation.description'),
              price: '$120/night',
              rating: 4.8,
              features: [
                t('tripPlanner.result.recommendations.accommodation.features.riverside'),
                t('tripPlanner.result.recommendations.accommodation.features.spa'),
                t('tripPlanner.result.recommendations.accommodation.features.restaurant')
              ]
            },
            {
              type: 'restaurant',
              category: t('tripPlanner.result.recommendations.restaurant.category'),
              name: t('tripPlanner.result.recommendations.restaurant.name'),
              description: t('tripPlanner.result.recommendations.restaurant.description'),
              price: '$25-40/meal',
              rating: 4.9,
              features: [
                t('tripPlanner.result.recommendations.restaurant.features.michelin'),
                t('tripPlanner.result.recommendations.restaurant.features.rooftop'),
                t('tripPlanner.result.recommendations.restaurant.features.authentic')
              ]
            },
            {
              type: 'transport',
              category: t('tripPlanner.result.recommendations.transport.category'),
              name: t('tripPlanner.result.recommendations.transport.name'),
              description: t('tripPlanner.result.recommendations.transport.description'),
              price: '$15-25/day',
              rating: 4.7,
              features: [
                t('tripPlanner.result.recommendations.transport.features.convenient'),
                t('tripPlanner.result.recommendations.transport.features.affordable'),
                t('tripPlanner.result.recommendations.transport.features.coverage')
              ]
            }
          ],
          estimatedCost: budget[0] * 0.85
        }
      };

      setGeneratedPlan(mockPlan);
      consumeCredits(cost);
      setCurrentStep(totalSteps + 1);
    } catch (error) {
      console.error('Error generating trip plan:', error);
      alert(t('tripPlanner.errors.generationFailed'));
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = () => {
    if (!generatedPlan || !startDate || !endDate) return;
    
    // Calculate trip duration safely
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Simulate PDF generation and download
    const element = document.createElement('a');
    const file = new Blob([`
${t('tripPlanner.result.title')} - ${destination}

${t('tripPlanner.result.summary.destination')}: ${destination}
${t('tripPlanner.result.summary.duration')}: ${duration} ${t('tripPlanner.result.summary.days')}
${t('tripPlanner.result.summary.travelers')}: ${travelers}
${t('tripPlanner.result.summary.estimatedCost')}: $${generatedPlan?.plan?.estimatedCost}

${t('tripPlanner.result.itinerary.title')}:
${generatedPlan?.plan?.itinerary.map((day: any) => `
Day ${day.day}: ${day.title}
${day.activities.map((activity: any) => `- ${activity.time}: ${activity.title}`).join('\n')}
`).join('\n')}

${t('tripPlanner.result.recommendations.title')}:
${generatedPlan?.plan?.recommendations.map((rec: any) => `
${rec.category}: ${rec.name}
${rec.description}
Price: ${rec.price}
`).join('\n')}

Generated by Thailand Visa AI - ${new Date().toLocaleDateString()}
    `], { type: 'text/plain' });
    
    element.href = URL.createObjectURL(file);
    element.download = `thailand-trip-plan-${destination.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getActivityIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      plane: Plane,
      building: Building,
      utensils: Utensils,
      gift: Gift,
      waves: Waves,
      heart: Heart,
      moon: Moon,
      hotel: Hotel,
      car: Car
    };
    const IconComponent = icons[iconName] || Star;
    return <IconComponent className="w-5 h-5" />;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('tripPlanner.steps.step1.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('tripPlanner.steps.step1.description')}
              </p>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl">
                  <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                  {t('tripPlanner.steps.step1.destination.title')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('tripPlanner.steps.step1.destination.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="destination" className="text-base font-medium mb-3 block">
                    {t('tripPlanner.steps.step1.destination.label')}
                  </Label>
                  <Input
                    id="destination"
                    placeholder={t('tripPlanner.steps.step1.destination.placeholder')}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl">
                  <CalendarIcon className="w-6 h-6 mr-3 text-green-600" />
                  {t('tripPlanner.steps.step1.dates.title')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('tripPlanner.steps.step1.dates.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      {t('tripPlanner.steps.step1.dates.startDate')}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : t('tripPlanner.steps.step1.dates.selectStartDate')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      {t('tripPlanner.steps.step1.dates.endDate')}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : t('tripPlanner.steps.step1.dates.selectEndDate')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl">
                  <Users className="w-6 h-6 mr-3 text-purple-600" />
                  {t('tripPlanner.steps.step1.travelers.title')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('tripPlanner.steps.step1.travelers.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    {t('tripPlanner.steps.step1.travelers.label')}: <span className="text-2xl font-bold text-purple-600">{travelers}</span>
                  </Label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 px-4 py-2 text-center text-lg font-semibold bg-white dark:bg-gray-800 rounded-lg border">
                      {travelers} {travelers === 1 ? t('tripPlanner.steps.step1.travelers.person') : t('tripPlanner.steps.step1.travelers.people')}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTravelers(travelers + 1)}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('tripPlanner.steps.step2.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('tripPlanner.steps.step2.description')}
              </p>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl">
                  <DollarSign className="w-6 h-6 mr-3 text-orange-600" />
                  {t('tripPlanner.steps.step2.budget.title')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('tripPlanner.steps.step2.budget.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    {t('tripPlanner.steps.step2.budget.label')}: <span className="text-2xl font-bold text-orange-600">${budget[0].toLocaleString()}</span>
                  </Label>
                  <Slider
                    value={budget}
                    onValueChange={setBudget}
                    max={10000}
                    min={500}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>$500</span>
                    <span>$10,000+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl">
                  <Hotel className="w-6 h-6 mr-3 text-blue-600" />
                  {t('tripPlanner.steps.step2.accommodation.title')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('tripPlanner.steps.step2.accommodation.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={accommodation} onValueChange={setAccommodation}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {accommodationTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <div key={type.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                          <RadioGroupItem value={type.value} id={type.value} />
                          <Icon className="w-5 h-5 text-blue-600" />
                          <Label htmlFor={type.value} className="cursor-pointer flex-1">
                            {type.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl">
                  <Plane className="w-6 h-6 mr-3 text-green-600" />
                  {t('tripPlanner.steps.step2.transportation.title')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('tripPlanner.steps.step2.transportation.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={transportation} onValueChange={setTransportation}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {transportationTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <div key={type.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                          <RadioGroupItem value={type.value} id={type.value} />
                          <Icon className="w-5 h-5 text-green-600" />
                          <Label htmlFor={type.value} className="cursor-pointer flex-1">
                            {type.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('tripPlanner.steps.step3.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('tripPlanner.steps.step3.description')}
              </p>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl">
                  <Heart className="w-6 h-6 mr-3 text-pink-600" />
                  {t('tripPlanner.steps.step3.preferences.title')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('tripPlanner.steps.step3.preferences.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {preferenceOptions.map((preference) => {
                    const Icon = preference.icon;
                    return (
                      <div key={preference.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <Checkbox
                          id={preference.value}
                          checked={preferences.includes(preference.value)}
                          onCheckedChange={(checked) => handlePreferenceChange(preference.value, checked as boolean)}
                        />
                        <Icon className="w-5 h-5 text-pink-600" />
                        <Label htmlFor={preference.value} className="cursor-pointer flex-1 text-sm">
                          {preference.label}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl">
                  <Star className="w-6 h-6 mr-3 text-indigo-600" />
                  {t('tripPlanner.steps.step3.activities.title')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('tripPlanner.steps.step3.activities.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {activityOptions.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <Checkbox
                          id={activity.value}
                          checked={activities.includes(activity.value)}
                          onCheckedChange={(checked) => handleActivityChange(activity.value, checked as boolean)}
                        />
                        <Icon className="w-5 h-5 text-indigo-600" />
                        <Label htmlFor={activity.value} className="cursor-pointer flex-1 text-sm">
                          {activity.label}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('tripPlanner.steps.step4.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('tripPlanner.steps.step4.description')}
              </p>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl">
                  <Sparkles className="w-6 h-6 mr-3 text-amber-600" />
                  {t('tripPlanner.steps.step4.specialRequests.title')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('tripPlanner.steps.step4.specialRequests.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={t('tripPlanner.steps.step4.specialRequests.placeholder')}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="min-h-32 text-base"
                />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl">
                  <Bot className="w-6 h-6 mr-3 text-emerald-600" />
                  {t('tripPlanner.steps.step4.planTypes.title')}
                </CardTitle>
                <CardDescription className="text-base">
                  {t('tripPlanner.steps.step4.planTypes.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="hover:shadow-lg transition-shadow border-2 border-blue-200 dark:border-blue-800">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-lg">{t('tripPlanner.steps.step4.planTypes.basic.title')}</CardTitle>
                      <div className="text-3xl font-bold text-blue-600">25</div>
                      <div className="text-sm text-gray-600">{t('tripPlanner.steps.step4.planTypes.credits')}</div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {t('tripPlanner.steps.step4.planTypes.basic.description')}
                      </p>
                      <Button 
                        onClick={() => generateTripPlan('basic')}
                        disabled={isGenerating || credits < 25}
                        className="w-full"
                        variant="outline"
                      >
                        {t('tripPlanner.steps.step4.planTypes.basic.button')}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow border-2 border-purple-200 dark:border-purple-800">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-lg">{t('tripPlanner.steps.step4.planTypes.advanced.title')}</CardTitle>
                      <div className="text-3xl font-bold text-purple-600">50</div>
                      <div className="text-sm text-gray-600">{t('tripPlanner.steps.step4.planTypes.credits')}</div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {t('tripPlanner.steps.step4.planTypes.advanced.description')}
                      </p>
                      <Button 
                        onClick={() => generateTripPlan('advanced')}
                        disabled={isGenerating || credits < 50}
                        className="w-full"
                        variant="outline"
                      >
                        {t('tripPlanner.steps.step4.planTypes.advanced.button')}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow border-2 border-green-200 dark:border-green-800">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-lg">{t('tripPlanner.steps.step4.planTypes.premium.title')}</CardTitle>
                      <div className="text-3xl font-bold text-green-600">100</div>
                      <div className="text-sm text-gray-600">{t('tripPlanner.steps.step4.planTypes.credits')}</div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {t('tripPlanner.steps.step4.planTypes.premium.description')}
                      </p>
                      <Button 
                        onClick={() => generateTripPlan('premium')}
                        disabled={isGenerating || credits < 100}
                        className="w-full"
                        variant="outline"
                      >
                        {t('tripPlanner.steps.step4.planTypes.premium.button')}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-lg">{t('tripPlanner.steps.step4.planTypes.vip.title')}</CardTitle>
                      <div className="text-3xl font-bold text-orange-600">200</div>
                      <div className="text-sm text-gray-600">{t('tripPlanner.steps.step4.planTypes.credits')}</div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {t('tripPlanner.steps.step4.planTypes.vip.description')}
                      </p>
                      <Button 
                        onClick={() => generateTripPlan('vip')}
                        disabled={isGenerating || credits < 200}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      >
                        {t('tripPlanner.steps.step4.planTypes.vip.button')}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <Bot className="w-16 h-16 mx-auto mb-4 text-blue-600 animate-pulse" />
            <h3 className="text-xl font-bold mb-2">{t('tripPlanner.generating.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t('tripPlanner.generating.description')}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (generatedPlan) {
    // Calculate trip duration safely
    const duration = generatedPlan.startDate && generatedPlan.endDate 
      ? Math.ceil((generatedPlan.endDate.getTime() - generatedPlan.startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle2 className="w-12 h-12 mr-4" />
                <div className="text-left">
                  <h1 className="text-4xl font-bold mb-2">
                    {t('tripPlanner.result.title')}
                  </h1>
                  <p className="text-xl opacity-90">
                    {t('tripPlanner.result.subtitle')}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-6 text-sm opacity-90">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {generatedPlan.createdAt.toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Bot className="w-4 h-4 mr-2" />
                  {t('tripPlanner.result.badge')}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button 
                onClick={downloadPDF}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-3 text-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                {t('tripPlanner.result.actions.downloadPDF')}
              </Button>
              <Button 
                variant="outline"
                className="px-8 py-3 text-lg border-2"
              >
                <Share2 className="w-5 h-5 mr-2" />
                {t('tripPlanner.result.actions.share')}
              </Button>
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="px-8 py-3 text-lg border-2"
              >
                <Edit className="w-5 h-5 mr-2" />
                Edit Plan
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trip Summary */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-2xl text-indigo-700 dark:text-indigo-300">
                    <Info className="w-6 h-6 mr-3" />
                    {t('tripPlanner.result.summary.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="font-medium">{t('tripPlanner.result.summary.destination')}</span>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {generatedPlan.destination}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <CalendarDays className="w-5 h-5 text-green-600 mr-3" />
                        <span className="font-medium">{t('tripPlanner.result.summary.duration')}</span>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {duration} {t('tripPlanner.result.summary.days')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-600 mr-3" />
                        <span className="font-medium">{t('tripPlanner.result.summary.travelers')}</span>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {generatedPlan.travelers} {generatedPlan.travelers === 1 ? t('tripPlanner.result.summary.person') : t('tripPlanner.result.summary.people')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg shadow-sm border-2 border-green-200 dark:border-green-800">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-600 mr-3" />
                        <span className="font-medium">{t('tripPlanner.result.summary.estimatedCost')}</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        ${generatedPlan.plan?.estimatedCost?.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3 text-lg">Your Preferences</h4>
                    <div className="flex flex-wrap gap-2">
                      {generatedPlan.preferences.map((pref, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1">
                          {t(`tripPlanner.preferences.${pref}`)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-2xl text-purple-700 dark:text-purple-300">
                    <Sparkles className="w-6 h-6 mr-3" />
                    {t('tripPlanner.result.recommendations.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {generatedPlan.plan?.recommendations.map((rec, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-bold text-lg text-gray-900 dark:text-white">{rec.name}</h5>
                          <Badge variant="secondary" className="text-xs mb-2">{rec.category}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-yellow-500 mb-1">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            <span className="font-semibold">{rec.rating}</span>
                          </div>
                          <div className="text-lg font-bold text-green-600">{rec.price}</div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{rec.description}</p>
                      <div className="space-y-1">
                        {rec.features.map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Daily Itinerary */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center text-3xl text-orange-700 dark:text-orange-300">
                    <CalendarDays className="w-8 h-8 mr-4" />
                    {t('tripPlanner.result.itinerary.title')}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {t('tripPlanner.result.itinerary.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {generatedPlan.plan?.itinerary.map((day, index) => (
                      <div key={index} className="relative">
                        {/* Day Header */}
                        <div className="flex items-center mb-6">
                          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                            {day.day}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{day.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{day.description}</p>
                          </div>
                        </div>

                        {/* Activities */}
                        <div className="ml-8 space-y-4">
                          {day.activities.map((activity: any, actIndex: number) => (
                            <div key={actIndex} className="flex items-start space-x-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                                  {getActivityIcon(activity.icon)}
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{activity.title}</h4>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="outline" className="text-xs">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {activity.time}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                      {activity.duration}
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">{activity.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Connector line */}
                        {index < generatedPlan.plan!.itinerary.length - 1 && (
                          <div className="flex justify-center my-6">
                            <div className="w-0.5 h-8 bg-gradient-to-b from-orange-300 to-orange-500"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 border-0">
              <CardContent className="py-8">
                <div className="flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-blue-600 mr-3" />
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {t('tripPlanner.result.footer.generatedBy')}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  This personalized travel plan was created using advanced AI technology to ensure you have the perfect Thailand experience.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    onClick={downloadPDF}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t('tripPlanner.result.actions.downloadPDF')}
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    {t('tripPlanner.result.actions.share')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('tripPlanner.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('tripPlanner.subtitle')}
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t('tripPlanner.progress.title')}</h3>
              <Badge variant="secondary" className="px-3 py-1">
                {t('tripPlanner.progress.step')} {currentStep} {t('tripPlanner.progress.of')} {totalSteps}
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{t('tripPlanner.progress.basicInfo')}</span>
              <span>{t('tripPlanner.progress.preferences')}</span>
              <span>{t('tripPlanner.progress.interests')}</span>
              <span>{t('tripPlanner.progress.generate')}</span>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('tripPlanner.navigation.previous')}
              </Button>

              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="px-3 py-1">
                  {t('tripPlanner.navigation.credits')}: {credits}
                </Badge>
              </div>

              <Button
                onClick={nextStep}
                disabled={currentStep === totalSteps}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {t('tripPlanner.navigation.next')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TripPlanner;