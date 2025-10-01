import { useState, useCallback } from 'react';
import { useCredits } from '@/contexts/CreditsContext';
import { useEmailNotifications } from '@/hooks/useEmailNotifications';
import { toast } from 'sonner';

export interface TripPlanVersion {
  id: string;
  version: number;
  createdAt: Date;
  destination: string;
  duration: number;
  travelers: number;
  budget: number;
  formData: any;
  generatedPlan: string;
  creditsUsed: number;
  isRemix: boolean;
  parentVersionId?: string;
}

export interface RemixOptions {
  changeDestination?: boolean;
  adjustBudget?: boolean;
  modifyDates?: boolean;
  updatePreferences?: boolean;
  addActivities?: boolean;
  changeAccommodation?: boolean;
}

const CREDIT_COSTS = {
  INITIAL_PLAN: 25,
  REMIX_BASIC: 15,
  REMIX_ADVANCED: 20,
  REMIX_PREMIUM: 30
};

export const useTripPlanRemix = () => {
  const { credits, consumeCredits } = useCredits();
  const { sendTripUpdate } = useEmailNotifications();
  const [versions, setVersions] = useState<TripPlanVersion[]>([]);
  const [currentVersion, setCurrentVersion] = useState<TripPlanVersion | null>(null);
  const [isRemixing, setIsRemixing] = useState(false);
  const [showRemixOptions, setShowRemixOptions] = useState(false);

  const createInitialPlan = useCallback(async (formData: any, generatedPlan: string) => {
    try {
      // Consume credits for initial plan
      await consumeCredits(CREDIT_COSTS.INITIAL_PLAN, 'AI Trip Planner', `Initial plan for ${formData.destination}`);

      const newVersion: TripPlanVersion = {
        id: `plan_${Date.now()}`,
        version: 1,
        createdAt: new Date(),
        destination: formData.destination,
        duration: Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)),
        travelers: formData.travelers,
        budget: formData.budget[0],
        formData,
        generatedPlan,
        creditsUsed: CREDIT_COSTS.INITIAL_PLAN,
        isRemix: false
      };

      setVersions([newVersion]);
      setCurrentVersion(newVersion);
      
      // Send email notification
      await sendTripUpdate({
        destination: formData.destination,
        updateType: 'Your initial trip plan has been generated successfully!'
      });

      return newVersion;
    } catch (error) {
      console.error('Error creating initial plan:', error);
      throw error;
    }
  }, [consumeCredits, sendTripUpdate]);

  const createRemixPlan = useCallback(async (
    baseVersion: TripPlanVersion,
    remixOptions: RemixOptions,
    newFormData: any,
    remixType: 'basic' | 'advanced' | 'premium' = 'basic'
  ) => {
    const creditCost = CREDIT_COSTS[`REMIX_${remixType.toUpperCase()}` as keyof typeof CREDIT_COSTS];
    
    if (credits < creditCost) {
      toast.error(`Insufficient credits. You need ${creditCost} credits for ${remixType} remix.`);
      return null;
    }

    setIsRemixing(true);
    try {
      // Consume credits for remix
      await consumeCredits(creditCost, 'AI Trip Planner Remix', `${remixType} remix for ${newFormData.destination}`);

      // Simulate AI processing for remix
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate enhanced plan based on remix options
      const enhancedPlan = generateRemixPlan(baseVersion, remixOptions, newFormData, remixType);

      const remixVersion: TripPlanVersion = {
        id: `remix_${Date.now()}`,
        version: versions.length + 1,
        createdAt: new Date(),
        destination: newFormData.destination,
        duration: Math.ceil((new Date(newFormData.endDate).getTime() - new Date(newFormData.startDate).getTime()) / (1000 * 60 * 60 * 24)),
        travelers: newFormData.travelers,
        budget: newFormData.budget[0],
        formData: newFormData,
        generatedPlan: enhancedPlan,
        creditsUsed: creditCost,
        isRemix: true,
        parentVersionId: baseVersion.id
      };

      setVersions(prev => [...prev, remixVersion]);
      setCurrentVersion(remixVersion);
      
      // Send email notification
      await sendTripUpdate({
        destination: newFormData.destination,
        updateType: `Your trip plan has been remixed with ${remixType} enhancements!`
      });

      toast.success(`${remixType} remix created successfully! (${creditCost} credits used)`);
      return remixVersion;
    } catch (error) {
      console.error('Error creating remix:', error);
      toast.error('Failed to create remix. Please try again.');
      return null;
    } finally {
      setIsRemixing(false);
      setShowRemixOptions(false);
    }
  }, [credits, consumeCredits, sendTripUpdate, versions.length]);

  const generateRemixPlan = (
    baseVersion: TripPlanVersion,
    remixOptions: RemixOptions,
    newFormData: any,
    remixType: string
  ): string => {
    const changes = [];
    if (remixOptions.changeDestination) changes.push('destination updated');
    if (remixOptions.adjustBudget) changes.push('budget optimized');
    if (remixOptions.modifyDates) changes.push('dates adjusted');
    if (remixOptions.updatePreferences) changes.push('preferences refined');
    if (remixOptions.addActivities) changes.push('new activities added');
    if (remixOptions.changeAccommodation) changes.push('accommodation upgraded');

    return `
🎯 **REMIXED TRIP PLAN - ${remixType.toUpperCase()} VERSION ${baseVersion.version + 1}**

**Destination**: ${newFormData.destination}
**Duration**: ${Math.ceil((new Date(newFormData.endDate).getTime() - new Date(newFormData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
**Travelers**: ${newFormData.travelers} people
**Budget**: ${newFormData.budget[0]} ${newFormData.budgetCurrency}

**🔄 REMIX ENHANCEMENTS:**
${changes.map(change => `✅ ${change.charAt(0).toUpperCase() + change.slice(1)}`).join('\n')}

**📅 ENHANCED DAILY ITINERARY:**

**Day 1: Arrival & Premium Welcome**
- 🛬 VIP Airport Transfer (${remixType === 'premium' ? 'Private luxury car' : 'Comfortable sedan'})
- 🏨 ${remixOptions.changeAccommodation ? 'Upgraded accommodation check-in' : 'Hotel check-in'}
- 🍽️ Welcome dinner at ${remixType === 'premium' ? 'Michelin-starred restaurant' : 'highly-rated local restaurant'}
- 🌃 ${newFormData.interests.includes('nightlife') ? 'Evening city lights tour' : 'Relaxing evening at hotel'}

**Day 2: Cultural Immersion Plus**
- 🏛️ Enhanced temple tour with ${remixType === 'premium' ? 'private guide' : 'expert local guide'}
- 🎨 ${remixOptions.addActivities ? 'Traditional craft workshop' : 'Cultural center visit'}
- 🍜 Authentic cooking class (${remixType === 'advanced' ? 'Market tour included' : 'Restaurant-based'})
- 🛍️ ${remixOptions.updatePreferences ? 'Personalized shopping experience' : 'Local market exploration'}

**Day 3: Adventure & Nature**
- 🌿 ${newFormData.interests.includes('nature') ? 'National park expedition' : 'City park and gardens tour'}
- 🚁 ${remixType === 'premium' ? 'Helicopter scenic tour' : 'Scenic viewpoint visits'}
- 🏊 ${newFormData.interests.includes('beach') ? 'Beach activities and water sports' : 'Spa and wellness activities'}
- 🍹 Sunset experience with ${remixType === 'premium' ? 'rooftop cocktails' : 'local refreshments'}

**💰 OPTIMIZED BUDGET BREAKDOWN:**
- Accommodation: ${newFormData.budgetBreakdown.accommodation}% (${remixOptions.changeAccommodation ? 'Upgraded options' : 'Value selections'})
- Food & Dining: ${newFormData.budgetBreakdown.food}% (${remixType === 'premium' ? 'Fine dining included' : 'Mix of local and international'})
- Activities: ${newFormData.budgetBreakdown.activities}% (${remixOptions.addActivities ? 'Enhanced experiences' : 'Core activities'})
- Transportation: ${newFormData.budgetBreakdown.transport}% (${remixType === 'premium' ? 'Premium transport' : 'Comfortable options'})
- Shopping: ${newFormData.budgetBreakdown.shopping}% (${remixOptions.updatePreferences ? 'Curated shopping' : 'General allowance'})

**🎯 REMIX BENEFITS:**
- ${remixType === 'premium' ? '🌟 VIP treatment throughout' : '✨ Enhanced experiences'}
- ${remixOptions.updatePreferences ? '🎨 Personalized to your interests' : '📋 Standard customization'}
- ${remixType === 'advanced' ? '📱 Real-time updates included' : '📧 Email updates'}
- ${remixOptions.adjustBudget ? '💡 Budget optimization applied' : '💰 Standard budget allocation'}

**📞 SUPPORT LEVEL:**
${remixType === 'premium' ? '🔥 24/7 Premium Concierge' : remixType === 'advanced' ? '📞 Priority Support' : '💬 Standard Support'}

---
*This ${remixType} remix used ${CREDIT_COSTS[`REMIX_${remixType.toUpperCase()}` as keyof typeof CREDIT_COSTS]} credits and includes ${changes.length} enhancements over the previous version.*
    `;
  };

  const compareVersions = useCallback((version1: TripPlanVersion, version2: TripPlanVersion) => {
    return {
      budgetDifference: version2.budget - version1.budget,
      durationDifference: version2.duration - version1.duration,
      creditsUsed: version2.creditsUsed,
      isUpgrade: version2.version > version1.version,
      changes: getVersionChanges(version1, version2)
    };
  }, []);

  const getVersionChanges = (oldVersion: TripPlanVersion, newVersion: TripPlanVersion) => {
    const changes = [];
    if (oldVersion.destination !== newVersion.destination) {
      changes.push(`Destination changed from ${oldVersion.destination} to ${newVersion.destination}`);
    }
    if (oldVersion.budget !== newVersion.budget) {
      changes.push(`Budget ${newVersion.budget > oldVersion.budget ? 'increased' : 'decreased'} by $${Math.abs(newVersion.budget - oldVersion.budget)}`);
    }
    if (oldVersion.duration !== newVersion.duration) {
      changes.push(`Duration ${newVersion.duration > oldVersion.duration ? 'extended' : 'shortened'} by ${Math.abs(newVersion.duration - oldVersion.duration)} days`);
    }
    if (oldVersion.travelers !== newVersion.travelers) {
      changes.push(`Travelers changed from ${oldVersion.travelers} to ${newVersion.travelers}`);
    }
    return changes;
  };

  const deleteVersion = useCallback((versionId: string) => {
    setVersions(prev => prev.filter(v => v.id !== versionId));
    if (currentVersion?.id === versionId) {
      const remaining = versions.filter(v => v.id !== versionId);
      setCurrentVersion(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
    toast.success('Version deleted successfully');
  }, [currentVersion, versions]);

  const selectVersion = useCallback((version: TripPlanVersion) => {
    setCurrentVersion(version);
  }, []);

  const getRemixSuggestions = useCallback((version: TripPlanVersion): RemixOptions => {
    // AI-powered suggestions based on the current plan
    return {
      changeDestination: false,
      adjustBudget: version.budget < 1000,
      modifyDates: false,
      updatePreferences: true,
      addActivities: version.formData.interests.length < 3,
      changeAccommodation: version.formData.accommodationType.length === 1
    };
  }, []);

  return {
    versions,
    currentVersion,
    isRemixing,
    showRemixOptions,
    setShowRemixOptions,
    createInitialPlan,
    createRemixPlan,
    compareVersions,
    deleteVersion,
    selectVersion,
    getRemixSuggestions,
    creditCosts: CREDIT_COSTS
  };
};