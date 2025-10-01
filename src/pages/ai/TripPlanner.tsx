import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  Wallet, 
  Plane, 
  Hotel, 
  Utensils, 
  Camera, 
  Mountain, 
  Waves, 
  Building, 
  TreePine, 
  Heart, 
  Star, 
  Clock, 
  Globe,
  Sparkles,
  History,
  Download,
  Share2,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { useCredits } from '@/contexts/CreditsContext';
import { useTripPlanRemix, TripPlanVersion } from '@/hooks/useTripPlanRemix';
import TripPlanRemixModal from '@/components/TripPlanRemixModal';

interface TripPlannerFormData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number[];
  budgetCurrency: string;
  accommodationType: string[];
  transportPreference: string;
  travelStyle: string;
  adventureLevel: string;
  interests: string[];
  dietaryRestrictions: string[];
  accessibility: string[];
  travelCompany: string;
  previousVisits: string;
  languagePreference: string;
  specialRequests: string;
  budgetBreakdown: {
    accommodation: number;
    food: number;
    activities: number;
    transport: number;
    shopping: number;
  };
}

export default function TripPlanner() {
  const { t } = useTranslation();
  const { credits } = useCredits();
  const {
    versions,
    currentVersion,
    createInitialPlan,
    selectVersion,
    deleteVersion,
    compareVersions,
    showRemixOptions,
    setShowRemixOptions
  } = useTripPlanRemix();

  const [formData, setFormData] = useState<TripPlannerFormData>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: [1000],
    budgetCurrency: 'USD',
    accommodationType: [],
    transportPreference: '',
    travelStyle: '',
    adventureLevel: '',
    interests: [],
    dietaryRestrictions: [],
    accessibility: [],
    travelCompany: '',
    previousVisits: '',
    languagePreference: '',
    specialRequests: '',
    budgetBreakdown: {
      accommodation: 40,
      food: 25,
      activities: 20,
      transport: 10,
      shopping: 5
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  const handleInputChange = (field: keyof TripPlannerFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field: keyof TripPlannerFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const handleBudgetBreakdownChange = (category: keyof typeof formData.budgetBreakdown, value: number) => {
    setFormData(prev => ({
      ...prev,
      budgetBreakdown: {
        ...prev.budgetBreakdown,
        [category]: value
      }
    }));
  };

  const generateTripPlan = async () => {
    if (credits < 25) {
      toast.error(t('notifications.insufficientCredits', 'Insufficient credits. You need 25 credits to generate a trip plan.'));
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate mock trip plan
      const mockPlan = generateMockPlan();
      
      const newPlan = await createInitialPlan(formData, mockPlan);
      if (newPlan) {
        toast.success(t('tripPlanner.generatedPlan.success', 'Trip plan generated successfully!'));
      }
    } catch (error) {
      console.error('Trip planning error:', error);
      toast.error(t('tripPlanner.generatedPlan.error', 'Error generating trip plan. Please try again.'));
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockPlan = (): string => {
    const duration = Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24));
    
    return `
🎯 **YOUR PERSONALIZED THAILAND TRIP PLAN**

**Destination**: ${formData.destination}
**Duration**: ${duration} days
**Travelers**: ${formData.travelers} ${t('tripPlanner.generatedPlan.people', 'people')}
**Budget**: ${formData.budget[0]} ${formData.budgetCurrency}
**Travel Style**: ${formData.travelStyle}

**📅 DAY-BY-DAY ITINERARY:**

**Day 1: ${t('tripPlanner.generatedPlan.arrival', 'Arrival & Orientation')}**
- 🛬 ${t('tripPlanner.generatedPlan.arrivalDetails', 'Airport pickup and hotel check-in')}
- 🏨 ${t('tripPlanner.generatedPlan.checkIn', 'Hotel check-in and rest')}
- 🌆 ${t('tripPlanner.generatedPlan.localExploration', 'Local area exploration')}

**Day 2: ${t('tripPlanner.generatedPlan.culturalExperience', 'Cultural Experience')}**
- 🏛️ ${t('tripPlanner.generatedPlan.culturalDetails', 'Visit temples and cultural sites')}
- 🍜 ${t('tripPlanner.generatedPlan.localCuisine', 'Try authentic local cuisine')}
- 🛍️ ${t('tripPlanner.generatedPlan.shopping', 'Local market shopping')}

**💰 BUDGET BREAKDOWN:**
- ${t('tripPlanner.budgetBreakdown.accommodation', 'Accommodation')}: ${formData.budgetBreakdown.accommodation}%
- ${t('tripPlanner.budgetBreakdown.food', 'Food & Dining')}: ${formData.budgetBreakdown.food}%
- ${t('tripPlanner.budgetBreakdown.activities', 'Activities & Tours')}: ${formData.budgetBreakdown.activities}%
- ${t('tripPlanner.budgetBreakdown.transport', 'Transportation')}: ${formData.budgetBreakdown.transport}%
- ${t('tripPlanner.budgetBreakdown.shopping', 'Shopping & Souvenirs')}: ${formData.budgetBreakdown.shopping}%

**🎯 RECOMMENDATIONS:**
- ${t('tripPlanner.generatedPlan.accommodation', 'Accommodation')}: ${formData.accommodationType.join(', ')}
- ${t('tripPlanner.generatedPlan.transport', 'Transportation')}: ${formData.transportPreference}
- ${t('tripPlanner.generatedPlan.activities', 'Activities')}: ${formData.interests.join(', ')}

---
*Generated with 25 credits • ${new Date().toLocaleDateString()}*
    `;
  };

  const downloadPlan = () => {
    if (!currentVersion) return;
    
    const planText = `Thailand Trip Plan - ${currentVersion.destination}\n\n${currentVersion.generatedPlan}`;
    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trip-plan-${currentVersion.destination.toLowerCase().replace(/\s+/g, '-')}-v${currentVersion.version}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(t('tripPlanner.downloadSuccess', 'Trip plan downloaded successfully!'));
  };

  const handleRemixComplete = (newPlan: TripPlanVersion) => {
    // The plan is already added to versions by the hook
    toast.success(t('tripPlanner.remix.success', 'Remix completed successfully!'));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="destination" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {t('tripPlanner.form.destination')}
          </Label>
          <Input
            id="destination"
            placeholder={t('tripPlanner.form.destinationPlaceholder')}
            value={formData.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="travelers" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {t('tripPlanner.form.travelers')}
          </Label>
          <Input
            id="travelers"
            type="number"
            min="1"
            max="20"
            value={formData.travelers}
            onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate" className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            {t('tripPlanner.form.startDate')}
          </Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate" className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            {t('tripPlanner.form.endDate')}
          </Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Wallet className="w-4 h-4" />
          {t('tripPlanner.form.budget')}: {formData.budget[0]} {formData.budgetCurrency}
        </Label>
        <div className="flex gap-4 items-center">
          <Slider
            value={formData.budget}
            onValueChange={(value) => handleInputChange('budget', value)}
            max={10000}
            min={100}
            step={100}
            className="flex-1"
          />
          <Select value={formData.budgetCurrency} onValueChange={(value) => handleInputChange('budgetCurrency', value)}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="THB">THB</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label>{t('tripPlanner.form.travelCompany')}</Label>
        <RadioGroup value={formData.travelCompany} onValueChange={(value) => handleInputChange('travelCompany', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="solo" id="solo" />
            <Label htmlFor="solo">{t('tripPlanner.travelCompany.solo')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="couple" id="couple" />
            <Label htmlFor="couple">{t('tripPlanner.travelCompany.couple')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="family" id="family" />
            <Label htmlFor="family">{t('tripPlanner.travelCompany.family')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="friends" id="friends" />
            <Label htmlFor="friends">{t('tripPlanner.travelCompany.friends')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="business" />
            <Label htmlFor="business">{t('tripPlanner.travelCompany.business')}</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>{t('tripPlanner.form.accommodationType')}</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { id: 'hotel', label: t('tripPlanner.accommodation.hotel'), icon: Hotel },
            { id: 'hostel', label: t('tripPlanner.accommodation.hostel'), icon: Building },
            { id: 'resort', label: t('tripPlanner.accommodation.resort'), icon: TreePine },
            { id: 'apartment', label: t('tripPlanner.accommodation.apartment'), icon: Building },
            { id: 'villa', label: t('tripPlanner.accommodation.villa'), icon: Heart },
            { id: 'guesthouse', label: t('tripPlanner.accommodation.guesthouse'), icon: Star }
          ].map(({ id, label, icon: Icon }) => (
            <div key={id} className="flex items-center space-x-2">
              <Checkbox
                id={id}
                checked={formData.accommodationType.includes(id)}
                onCheckedChange={() => handleArrayToggle('accommodationType', id)}
              />
              <Label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
                <Icon className="w-4 h-4" />
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>{t('tripPlanner.form.transportPreference')}</Label>
        <RadioGroup value={formData.transportPreference} onValueChange={(value) => handleInputChange('transportPreference', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="flight" id="flight" />
            <Label htmlFor="flight" className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              {t('tripPlanner.transport.flight')}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="train" id="train" />
            <Label htmlFor="train">{t('tripPlanner.transport.train')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bus" id="bus" />
            <Label htmlFor="bus">{t('tripPlanner.transport.bus')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="car" id="car" />
            <Label htmlFor="car">{t('tripPlanner.transport.car')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mixed" id="mixed" />
            <Label htmlFor="mixed">{t('tripPlanner.transport.mixed')}</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>{t('tripPlanner.form.travelStyle')}</Label>
        <RadioGroup value={formData.travelStyle} onValueChange={(value) => handleInputChange('travelStyle', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="luxury" id="luxury" />
            <Label htmlFor="luxury">{t('tripPlanner.travelStyle.luxury')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfort" id="comfort" />
            <Label htmlFor="comfort">{t('tripPlanner.travelStyle.comfort')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="budget" id="budget" />
            <Label htmlFor="budget">{t('tripPlanner.travelStyle.budget')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="backpacker" id="backpacker" />
            <Label htmlFor="backpacker">{t('tripPlanner.travelStyle.backpacker')}</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>{t('tripPlanner.form.adventureLevel')}</Label>
        <RadioGroup value={formData.adventureLevel} onValueChange={(value) => handleInputChange('adventureLevel', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="relaxed" id="relaxed" />
            <Label htmlFor="relaxed">{t('tripPlanner.adventureLevel.relaxed')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moderate" id="moderate" />
            <Label htmlFor="moderate">{t('tripPlanner.adventureLevel.moderate')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="adventurous" id="adventurous" />
            <Label htmlFor="adventurous">{t('tripPlanner.adventureLevel.adventurous')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="extreme" id="extreme" />
            <Label htmlFor="extreme">{t('tripPlanner.adventureLevel.extreme')}</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>{t('tripPlanner.form.interests')}</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { id: 'culture', label: t('tripPlanner.interests.culture'), icon: Building },
            { id: 'nature', label: t('tripPlanner.interests.nature'), icon: TreePine },
            { id: 'adventure', label: t('tripPlanner.interests.adventure'), icon: Mountain },
            { id: 'beach', label: t('tripPlanner.interests.beach'), icon: Waves },
            { id: 'food', label: t('tripPlanner.interests.food'), icon: Utensils },
            { id: 'photography', label: t('tripPlanner.interests.photography'), icon: Camera },
            { id: 'nightlife', label: t('tripPlanner.interests.nightlife'), icon: Star },
            { id: 'shopping', label: t('tripPlanner.interests.shopping'), icon: Building },
            { id: 'wellness', label: t('tripPlanner.interests.wellness'), icon: Heart }
          ].map(({ id, label, icon: Icon }) => (
            <div key={id} className="flex items-center space-x-2">
              <Checkbox
                id={id}
                checked={formData.interests.includes(id)}
                onCheckedChange={() => handleArrayToggle('interests', id)}
              />
              <Label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
                <Icon className="w-4 h-4" />
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>{t('tripPlanner.form.dietaryRestrictions')}</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'vegetarian', 'vegan', 'halal', 'kosher', 'gluten-free', 'dairy-free', 'nut-allergy', 'seafood-allergy', 'none'
          ].map((restriction) => (
            <div key={restriction} className="flex items-center space-x-2">
              <Checkbox
                id={restriction}
                checked={formData.dietaryRestrictions.includes(restriction)}
                onCheckedChange={() => handleArrayToggle('dietaryRestrictions', restriction)}
              />
              <Label htmlFor={restriction} className="cursor-pointer">
                {t(`tripPlanner.dietary.${restriction}`)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="languagePreference" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          {t('tripPlanner.form.languagePreference')}
        </Label>
        <Select value={formData.languagePreference} onValueChange={(value) => handleInputChange('languagePreference', value)}>
          <SelectTrigger>
            <SelectValue placeholder={t('tripPlanner.form.languagePreferencePlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">{t('tripPlanner.languages.english')}</SelectItem>
            <SelectItem value="local">{t('tripPlanner.languages.local')}</SelectItem>
            <SelectItem value="translator">{t('tripPlanner.languages.translator')}</SelectItem>
            <SelectItem value="guide">{t('tripPlanner.languages.guide')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="previousVisits">{t('tripPlanner.form.previousVisits')}</Label>
        <RadioGroup value={formData.previousVisits} onValueChange={(value) => handleInputChange('previousVisits', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="first-time" id="first-time" />
            <Label htmlFor="first-time">{t('tripPlanner.previousVisits.firstTime')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="returning" id="returning" />
            <Label htmlFor="returning">{t('tripPlanner.previousVisits.returning')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="frequent" id="frequent" />
            <Label htmlFor="frequent">{t('tripPlanner.previousVisits.frequent')}</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>{t('tripPlanner.form.budgetBreakdown')}</Label>
        <div className="space-y-4">
          {Object.entries(formData.budgetBreakdown).map(([category, percentage]) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="capitalize">{t(`tripPlanner.budgetBreakdown.${category}`)}</Label>
                <Badge variant="secondary">{percentage}%</Badge>
              </div>
              <Slider
                value={[percentage]}
                onValueChange={(value) => handleBudgetBreakdownChange(category as keyof typeof formData.budgetBreakdown, value[0])}
                max={70}
                min={0}
                step={5}
              />
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          {t('tripPlanner.form.budgetBreakdownNote')}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialRequests">{t('tripPlanner.form.specialRequests')}</Label>
        <Textarea
          id="specialRequests"
          placeholder={t('tripPlanner.form.specialRequestsPlaceholder')}
          value={formData.specialRequests}
          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
          rows={4}
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('tripPlanner.form.summary')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>{t('tripPlanner.form.destination')}:</strong> {formData.destination}
          </div>
          <div>
            <strong>{t('tripPlanner.form.travelers')}:</strong> {formData.travelers}
          </div>
          <div>
            <strong>{t('tripPlanner.form.dates')}:</strong> {formData.startDate} - {formData.endDate}
          </div>
          <div>
            <strong>{t('tripPlanner.form.budget')}:</strong> {formData.budget[0]} {formData.budgetCurrency}
          </div>
          <div>
            <strong>{t('tripPlanner.form.travelStyle')}:</strong> {formData.travelStyle}
          </div>
          <div>
            <strong>{t('tripPlanner.form.adventureLevel')}:</strong> {formData.adventureLevel}
          </div>
        </div>
        {formData.interests.length > 0 && (
          <div>
            <strong>{t('tripPlanner.form.interests')}:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.interests.map(interest => (
                <Badge key={interest} variant="outline">
                  {t(`tripPlanner.interests.${interest}`)}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('tripPlanner.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('tripPlanner.subtitle')}
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              {credits} {t('credits.credits', 'credits')}
            </Badge>
            {versions.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVersionHistory(!showVersionHistory)}
                className="flex items-center gap-2"
              >
                <History className="w-4 h-4" />
                {t('tripPlanner.versionHistory', 'Version History')} ({versions.length})
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            {!currentVersion ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      {t('tripPlanner.step')} {currentStep} {t('tripPlanner.of')} 4
                    </CardTitle>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`w-3 h-3 rounded-full ${
                            step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <CardDescription>
                    {currentStep === 1 && t('tripPlanner.stepDescriptions.step1')}
                    {currentStep === 2 && t('tripPlanner.stepDescriptions.step2')}
                    {currentStep === 3 && t('tripPlanner.stepDescriptions.step3')}
                    {currentStep === 4 && t('tripPlanner.stepDescriptions.step4')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}
                  {currentStep === 4 && renderStep4()}

                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      disabled={currentStep === 1}
                    >
                      {t('tripPlanner.buttons.previous')}
                    </Button>
                    
                    {currentStep < 4 ? (
                      <Button
                        onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                        disabled={
                          (currentStep === 1 && (!formData.destination || !formData.startDate || !formData.endDate)) ||
                          (currentStep === 2 && (!formData.accommodationType.length || !formData.transportPreference)) ||
                          (currentStep === 3 && !formData.interests.length)
                        }
                      >
                        {t('tripPlanner.buttons.next')}
                      </Button>
                    ) : (
                      <Button
                        onClick={generateTripPlan}
                        disabled={isGenerating || credits < 25}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('tripPlanner.buttons.generating')}
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            {t('tripPlanner.buttons.generatePlan')} (25 credits)
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    {t('tripPlanner.planGenerated', 'Plan Generated')}
                  </CardTitle>
                  <CardDescription>
                    Version {currentVersion.version} • {currentVersion.creditsUsed} credits used
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowRemixOptions(true)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {t('tripPlanner.remix.button', 'REMIX Plan')}
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={downloadPlan} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      {t('tripPlanner.download', 'Download')}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      {t('tripPlanner.share', 'Share')}
                    </Button>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {t('tripPlanner.remix.info', 'Use REMIX to refine your plan with additional preferences. Each remix costs 15-30 credits depending on the enhancement level.')}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {currentVersion ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      {currentVersion.destination} - Version {currentVersion.version}
                      {currentVersion.isRemix && (
                        <Badge variant="secondary" className="ml-2">
                          <Sparkles className="w-3 h-3 mr-1" />
                          REMIX
                        </Badge>
                      )}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {currentVersion.duration} days • {currentVersion.travelers} travelers • {currentVersion.budget} {formData.budgetCurrency}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    {currentVersion.generatedPlan}
                  </pre>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t('tripPlanner.readyToPlan', 'Ready to plan your trip?')}
                  </h3>
                  <p className="text-gray-600">
                    {t('tripPlanner.readyToPlanDesc', 'Fill in the details and our AI will create a personalized plan for you.')}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Version History */}
            {showVersionHistory && versions.length > 1 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    {t('tripPlanner.versionHistory', 'Version History')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {versions.map((version) => (
                      <div
                        key={version.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          currentVersion?.id === version.id 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => selectVersion(version)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Version {version.version}</span>
                              {version.isRemix && (
                                <Badge variant="secondary" size="sm">
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  REMIX
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {version.destination} • {version.duration} days • {version.creditsUsed} credits
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {version.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteVersion(version.id);
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Remix Modal */}
        {currentVersion && (
          <TripPlanRemixModal
            isOpen={showRemixOptions}
            onClose={() => setShowRemixOptions(false)}
            currentPlan={currentVersion}
            onRemixComplete={handleRemixComplete}
          />
        )}
      </div>
    </div>
  );
}