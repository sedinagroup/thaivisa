import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sparkles, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Settings, 
  Plus, 
  Hotel,
  Crown,
  Zap,
  Star,
  Loader2
} from 'lucide-react';
import { TripPlanVersion, RemixOptions, useTripPlanRemix } from '@/hooks/useTripPlanRemix';
import { useCredits } from '@/contexts/CreditsContext';

interface TripPlanRemixModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: TripPlanVersion;
  onRemixComplete: (newPlan: TripPlanVersion) => void;
}

export default function TripPlanRemixModal({
  isOpen,
  onClose,
  currentPlan,
  onRemixComplete
}: TripPlanRemixModalProps) {
  const { t } = useTranslation();
  const { credits } = useCredits();
  const { createRemixPlan, getRemixSuggestions, creditCosts, isRemixing } = useTripPlanRemix();
  
  const [selectedOptions, setSelectedOptions] = useState<RemixOptions>({});
  const [remixType, setRemixType] = useState<'basic' | 'advanced' | 'premium'>('basic');
  const [step, setStep] = useState<'options' | 'type' | 'confirm'>('options');

  const suggestedOptions = getRemixSuggestions(currentPlan);

  const handleOptionChange = (option: keyof RemixOptions, checked: boolean) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  const getSelectedOptionsCount = () => {
    return Object.values(selectedOptions).filter(Boolean).length;
  };

  const getCreditCost = () => {
    return creditCosts[`REMIX_${remixType.toUpperCase()}` as keyof typeof creditCosts];
  };

  const canAffordRemix = () => {
    return credits >= getCreditCost();
  };

  const handleRemix = async () => {
    if (!canAffordRemix()) return;

    try {
      const newPlan = await createRemixPlan(
        currentPlan,
        selectedOptions,
        currentPlan.formData, // In a real app, you might want to allow editing this
        remixType
      );

      if (newPlan) {
        onRemixComplete(newPlan);
        onClose();
      }
    } catch (error) {
      console.error('Error creating remix:', error);
    }
  };

  const remixTypeOptions = [
    {
      id: 'basic',
      name: t('tripPlanner.remix.basic', 'Basic Remix'),
      description: t('tripPlanner.remix.basicDesc', 'Essential improvements and optimizations'),
      credits: creditCosts.REMIX_BASIC,
      icon: Zap,
      features: ['Optimized itinerary', 'Better recommendations', 'Updated pricing']
    },
    {
      id: 'advanced',
      name: t('tripPlanner.remix.advanced', 'Advanced Remix'),
      description: t('tripPlanner.remix.advancedDesc', 'Enhanced experiences and detailed planning'),
      credits: creditCosts.REMIX_ADVANCED,
      icon: Star,
      features: ['Premium activities', 'Local insights', 'Real-time updates', 'Priority support']
    },
    {
      id: 'premium',
      name: t('tripPlanner.remix.premium', 'Premium Remix'),
      description: t('tripPlanner.remix.premiumDesc', 'VIP treatment with luxury experiences'),
      credits: creditCosts.REMIX_PREMIUM,
      icon: Crown,
      features: ['VIP experiences', '24/7 concierge', 'Luxury upgrades', 'Personal assistant', 'Exclusive access']
    }
  ];

  const optionsList = [
    {
      key: 'changeDestination' as keyof RemixOptions,
      label: t('tripPlanner.remix.changeDestination', 'Change Destination'),
      description: t('tripPlanner.remix.changeDestinationDesc', 'Explore alternative destinations'),
      icon: MapPin,
      suggested: suggestedOptions.changeDestination
    },
    {
      key: 'adjustBudget' as keyof RemixOptions,
      label: t('tripPlanner.remix.adjustBudget', 'Optimize Budget'),
      description: t('tripPlanner.remix.adjustBudgetDesc', 'Better value for money recommendations'),
      icon: DollarSign,
      suggested: suggestedOptions.adjustBudget
    },
    {
      key: 'modifyDates' as keyof RemixOptions,
      label: t('tripPlanner.remix.modifyDates', 'Adjust Dates'),
      description: t('tripPlanner.remix.modifyDatesDesc', 'Find better pricing or weather conditions'),
      icon: Calendar,
      suggested: suggestedOptions.modifyDates
    },
    {
      key: 'updatePreferences' as keyof RemixOptions,
      label: t('tripPlanner.remix.updatePreferences', 'Refine Preferences'),
      description: t('tripPlanner.remix.updatePreferencesDesc', 'More personalized recommendations'),
      icon: Settings,
      suggested: suggestedOptions.updatePreferences
    },
    {
      key: 'addActivities' as keyof RemixOptions,
      label: t('tripPlanner.remix.addActivities', 'Add Activities'),
      description: t('tripPlanner.remix.addActivitiesDesc', 'Discover new experiences and attractions'),
      icon: Plus,
      suggested: suggestedOptions.addActivities
    },
    {
      key: 'changeAccommodation' as keyof RemixOptions,
      label: t('tripPlanner.remix.changeAccommodation', 'Upgrade Accommodation'),
      description: t('tripPlanner.remix.changeAccommodationDesc', 'Better hotels and unique stays'),
      icon: Hotel,
      suggested: suggestedOptions.changeAccommodation
    }
  ];

  const renderOptionsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Sparkles className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="text-lg font-semibold mb-2">
          {t('tripPlanner.remix.title', 'Remix Your Trip Plan')}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t('tripPlanner.remix.subtitle', 'Select the aspects you\'d like to improve')}
        </p>
      </div>

      <div className="space-y-3">
        {optionsList.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.key}
              className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedOptions[option.key] 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleOptionChange(option.key, !selectedOptions[option.key])}
            >
              <Checkbox
                checked={selectedOptions[option.key] || false}
                onChange={(checked) => handleOptionChange(option.key, checked)}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <Label className="font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  {option.suggested && (
                    <Badge variant="secondary" className="text-xs">
                      {t('tripPlanner.remix.suggested', 'Suggested')}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {option.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          {t('common.cancel', 'Cancel')}
        </Button>
        <Button 
          onClick={() => setStep('type')}
          disabled={getSelectedOptionsCount() === 0}
        >
          {t('common.next', 'Next')} ({getSelectedOptionsCount()} selected)
        </Button>
      </div>
    </div>
  );

  const renderTypeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          {t('tripPlanner.remix.selectType', 'Select Remix Type')}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t('tripPlanner.remix.selectTypeDesc', 'Choose the level of enhancement for your trip')}
        </p>
      </div>

      <RadioGroup value={remixType} onValueChange={(value) => setRemixType(value as any)}>
        <div className="space-y-4">
          {remixTypeOptions.map((option) => {
            const Icon = option.icon;
            const canAfford = credits >= option.credits;
            
            return (
              <Card 
                key={option.id}
                className={`cursor-pointer transition-colors ${
                  remixType === option.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : canAfford 
                      ? 'hover:bg-gray-50' 
                      : 'opacity-50'
                }`}
                onClick={() => canAfford && setRemixType(option.id as any)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={option.id} disabled={!canAfford} />
                      <Icon className="w-5 h-5" />
                      <div>
                        <CardTitle className="text-base">{option.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {option.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={canAfford ? "default" : "destructive"}>
                        {option.credits} credits
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {option.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </RadioGroup>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep('options')}>
          {t('common.back', 'Back')}
        </Button>
        <Button 
          onClick={() => setStep('confirm')}
          disabled={!canAffordRemix()}
        >
          {t('common.next', 'Next')}
        </Button>
      </div>
    </div>
  );

  const renderConfirmStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          {t('tripPlanner.remix.confirm', 'Confirm Remix')}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t('tripPlanner.remix.confirmDesc', 'Review your remix selection')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {t('tripPlanner.remix.summary', 'Remix Summary')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">
              {t('tripPlanner.remix.selectedOptions', 'Selected Options')}:
            </Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {optionsList
                .filter(option => selectedOptions[option.key])
                .map(option => (
                  <Badge key={option.key} variant="secondary">
                    {option.label}
                  </Badge>
                ))}
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-sm font-medium">
              {t('tripPlanner.remix.type', 'Remix Type')}:
            </Label>
            <div className="mt-2">
              <Badge variant="default">
                {remixTypeOptions.find(opt => opt.id === remixType)?.name}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">
              {t('tripPlanner.remix.cost', 'Cost')}:
            </Label>
            <Badge variant="outline" className="text-base">
              {getCreditCost()} credits
            </Badge>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              {t('credits.currentBalance', 'Current Balance')}:
            </span>
            <span className={credits >= getCreditCost() ? 'text-green-600' : 'text-red-600'}>
              {credits} credits
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep('type')}>
          {t('common.back', 'Back')}
        </Button>
        <Button 
          onClick={handleRemix}
          disabled={!canAffordRemix() || isRemixing}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isRemixing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t('tripPlanner.remix.creating', 'Creating Remix...')}
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              {t('tripPlanner.remix.create', 'Create Remix')}
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {t('tripPlanner.remix.modalTitle', 'Remix Your Trip Plan')}
          </DialogTitle>
          <DialogDescription>
            {step === 'options' && t('tripPlanner.remix.modalDesc1', 'Select the aspects you want to improve')}
            {step === 'type' && t('tripPlanner.remix.modalDesc2', 'Choose your remix enhancement level')}
            {step === 'confirm' && t('tripPlanner.remix.modalDesc3', 'Confirm your remix selection')}
          </DialogDescription>
        </DialogHeader>

        {step === 'options' && renderOptionsStep()}
        {step === 'type' && renderTypeStep()}
        {step === 'confirm' && renderConfirmStep()}
      </DialogContent>
    </Dialog>
  );
}