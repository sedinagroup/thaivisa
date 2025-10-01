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
import { CalendarDays, MapPin, Users, Wallet, Plane, Hotel, Utensils, Camera, Mountain, Waves, Building, TreePine, Heart, Star, Clock, Globe } from 'lucide-react';

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
  const [generatedPlan, setGeneratedPlan] = useState<string>('');

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
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedPlan(`
${t('tripPlanner.generatedPlan.title')}

${t('tripPlanner.generatedPlan.destination')}: ${formData.destination}
${t('tripPlanner.generatedPlan.duration')}: ${formData.startDate} - ${formData.endDate}
${t('tripPlanner.generatedPlan.travelers')}: ${formData.travelers} ${t('tripPlanner.generatedPlan.people')}
${t('tripPlanner.generatedPlan.budget')}: ${formData.budget[0]} ${formData.budgetCurrency}

${t('tripPlanner.generatedPlan.dayByDay')}:

${t('tripPlanner.generatedPlan.day')} 1: ${t('tripPlanner.generatedPlan.arrival')}
- ${t('tripPlanner.generatedPlan.arrivalDetails')}
- ${t('tripPlanner.generatedPlan.checkIn')}
- ${t('tripPlanner.generatedPlan.localExploration')}

${t('tripPlanner.generatedPlan.day')} 2: ${t('tripPlanner.generatedPlan.culturalExperience')}
- ${t('tripPlanner.generatedPlan.culturalDetails')}
- ${t('tripPlanner.generatedPlan.localCuisine')}
- ${t('tripPlanner.generatedPlan.shopping')}

${t('tripPlanner.generatedPlan.recommendations')}:
- ${t('tripPlanner.generatedPlan.accommodation')}: ${formData.accommodationType.join(', ')}
- ${t('tripPlanner.generatedPlan.transport')}: ${formData.transportPreference}
- ${t('tripPlanner.generatedPlan.activities')}: ${formData.interests.join(', ')}

${t('tripPlanner.generatedPlan.budgetBreakdown')}:
- ${t('tripPlanner.budgetBreakdown.accommodation')}: ${formData.budgetBreakdown.accommodation}%
- ${t('tripPlanner.budgetBreakdown.food')}: ${formData.budgetBreakdown.food}%
- ${t('tripPlanner.budgetBreakdown.activities')}: ${formData.budgetBreakdown.activities}%
- ${t('tripPlanner.budgetBreakdown.transport')}: ${formData.budgetBreakdown.transport}%
- ${t('tripPlanner.budgetBreakdown.shopping')}: ${formData.budgetBreakdown.shopping}%
      `);
      setIsGenerating(false);
    }, 3000);
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

      <div className="space-y-4">
        <Label>{t('tripPlanner.form.accessibility')}</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'wheelchair', 'mobility-aid', 'visual-impairment', 'hearing-impairment', 'none'
          ].map((accessibility) => (
            <div key={accessibility} className="flex items-center space-x-2">
              <Checkbox
                id={accessibility}
                checked={formData.accessibility.includes(accessibility)}
                onCheckedChange={() => handleArrayToggle('accessibility', accessibility)}
              />
              <Label htmlFor={accessibility} className="cursor-pointer">
                {t(`tripPlanner.accessibility.${accessibility}`)}
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('tripPlanner.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('tripPlanner.subtitle')}
          </p>
        </div>

        <Card className="mb-6">
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
                  disabled={isGenerating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isGenerating ? t('tripPlanner.buttons.generating') : t('tripPlanner.buttons.generatePlan')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {generatedPlan && (
          <Card>
            <CardHeader>
              <CardTitle>{t('tripPlanner.generatedPlan.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
                {generatedPlan}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}