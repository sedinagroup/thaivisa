import { useState, useCallback } from 'react';
import { useCredits } from '@/contexts/CreditsContext';
import { toast } from 'sonner';

// Multi-stage credit costs
export const STAGE_CREDIT_COSTS = {
  // STAGE 1 - Initial Data Collection (250 credits budget)
  ELIGIBILITY_CHECK: 15,
  DOCUMENT_UPLOAD: 10,
  AI_BRAIN_BASIC: 5,
  AI_BRAIN_ADVANCED: 15,
  AI_BRAIN_PREMIUM: 20,
  SUBMIT_TO_REVIEW: 50, // Remaining credits from 250 budget
  
  // STAGE 2 - Compliance & Application Details
  COMPLIANCE_BASIC: 25,
  COMPLIANCE_ADVANCED: 50,
  COMPLIANCE_PREMIUM: 100,
  COMPLIANCE_ENTERPRISE: 200,
  DOCUMENT_VERIFICATION: 30,
  BACKGROUND_CHECK: 40,
  TRAVEL_HISTORY_ANALYSIS: 35,
  RISK_ASSESSMENT: 45,
  
  // STAGE 3 - Final Application Submission (Real visa costs)
  TOURIST_VISA_FINAL: 500,    // $50 equivalent
  BUSINESS_VISA_FINAL: 750,   // $75 equivalent
  EDUCATION_VISA_FINAL: 1000, // $100 equivalent
  TRANSIT_VISA_FINAL: 300,    // $30 equivalent
  
  // Additional services
  PRIORITY_PROCESSING: 100,
  EXPEDITED_SERVICE: 150,
  PREMIUM_SUPPORT: 75,
} as const;

export type CreditServiceKey = keyof typeof STAGE_CREDIT_COSTS;

export interface ServiceInfo {
  key: CreditServiceKey;
  name: string;
  description: string;
  stage: 'initial' | 'compliance' | 'final';
  credits: number;
  category: string;
}

export const SERVICE_CATALOG: ServiceInfo[] = [
  // Stage 1 - Initial
  {
    key: 'ELIGIBILITY_CHECK',
    name: 'Eligibility Check',
    description: 'Verify your eligibility for Thailand visa',
    stage: 'initial',
    credits: STAGE_CREDIT_COSTS.ELIGIBILITY_CHECK,
    category: 'Verification'
  },
  {
    key: 'DOCUMENT_UPLOAD',
    name: 'Document Upload',
    description: 'Upload and process each document',
    stage: 'initial',
    credits: STAGE_CREDIT_COSTS.DOCUMENT_UPLOAD,
    category: 'Documents'
  },
  {
    key: 'AI_BRAIN_BASIC',
    name: 'AI Analysis (Basic)',
    description: 'Basic AI document analysis',
    stage: 'initial',
    credits: STAGE_CREDIT_COSTS.AI_BRAIN_BASIC,
    category: 'AI Services'
  },
  {
    key: 'SUBMIT_TO_REVIEW',
    name: 'Submit to Review',
    description: 'Submit application for initial review',
    stage: 'initial',
    credits: STAGE_CREDIT_COSTS.SUBMIT_TO_REVIEW,
    category: 'Submission'
  },
  
  // Stage 2 - Compliance
  {
    key: 'COMPLIANCE_BASIC',
    name: 'Basic Compliance Check',
    description: 'Standard compliance verification',
    stage: 'compliance',
    credits: STAGE_CREDIT_COSTS.COMPLIANCE_BASIC,
    category: 'Compliance'
  },
  {
    key: 'COMPLIANCE_ADVANCED',
    name: 'Advanced Compliance Check',
    description: 'Comprehensive compliance analysis',
    stage: 'compliance',
    credits: STAGE_CREDIT_COSTS.COMPLIANCE_ADVANCED,
    category: 'Compliance'
  },
  {
    key: 'DOCUMENT_VERIFICATION',
    name: 'Document Verification',
    description: 'Verify document authenticity',
    stage: 'compliance',
    credits: STAGE_CREDIT_COSTS.DOCUMENT_VERIFICATION,
    category: 'Verification'
  },
  
  // Stage 3 - Final
  {
    key: 'TOURIST_VISA_FINAL',
    name: 'Tourist Visa Application',
    description: 'Final tourist visa submission',
    stage: 'final',
    credits: STAGE_CREDIT_COSTS.TOURIST_VISA_FINAL,
    category: 'Final Application'
  },
  {
    key: 'BUSINESS_VISA_FINAL',
    name: 'Business Visa Application',
    description: 'Final business visa submission',
    stage: 'final',
    credits: STAGE_CREDIT_COSTS.BUSINESS_VISA_FINAL,
    category: 'Final Application'
  }
];

export const useCreditConsumption = () => {
  const { 
    credits, 
    consumeCredits, 
    hasEnoughCredits, 
    currentStage,
    getStageCreditsUsed,
    canAccessStage,
    completeStage
  } = useCredits();
  const [isProcessing, setIsProcessing] = useState(false);

  const consumeCreditsForService = useCallback(async (
    serviceKey: CreditServiceKey,
    description?: string,
    stage?: 'initial' | 'compliance' | 'final'
  ): Promise<boolean> => {
    const amount = STAGE_CREDIT_COSTS[serviceKey];
    const serviceInfo = SERVICE_CATALOG.find(s => s.key === serviceKey);
    const serviceStage = stage || serviceInfo?.stage || 'initial';
    const serviceDescription = description || serviceInfo?.description || serviceKey.toLowerCase().replace(/_/g, ' ');

    if (!hasEnoughCredits(amount)) {
      toast.error(`Insufficient credits! You need ${amount} credits but only have ${credits}.`, {
        action: {
          label: 'Buy Credits',
          onClick: () => window.location.href = '/credits'
        }
      });
      return false;
    }

    // Check stage access
    if (!canAccessStage(serviceStage)) {
      toast.error(`You cannot access ${serviceStage} stage services yet. Complete previous stages first.`);
      return false;
    }

    setIsProcessing(true);
    
    try {
      const success = await consumeCredits(amount, serviceKey, serviceDescription, serviceStage);
      
      // Check if this completes a stage
      if (success) {
        const stageCreditsUsed = getStageCreditsUsed(serviceStage) + amount;
        
        // Stage completion logic
        if (serviceStage === 'initial' && serviceKey === 'SUBMIT_TO_REVIEW') {
          completeStage('initial');
        } else if (serviceStage === 'compliance' && stageCreditsUsed >= 100) {
          // Complete compliance stage after spending 100+ credits
          completeStage('compliance');
        } else if (serviceStage === 'final') {
          // Complete final stage after any final application
          completeStage('final');
        }
      }
      
      return success;
    } finally {
      setIsProcessing(false);
    }
  }, [credits, consumeCredits, hasEnoughCredits, canAccessStage, getStageCreditsUsed, completeStage]);

  const checkServiceAccess = useCallback((serviceKey: CreditServiceKey): boolean => {
    const amount = STAGE_CREDIT_COSTS[serviceKey];
    const serviceInfo = SERVICE_CATALOG.find(s => s.key === serviceKey);
    const serviceStage = serviceInfo?.stage || 'initial';
    
    return hasEnoughCredits(amount) && canAccessStage(serviceStage);
  }, [hasEnoughCredits, canAccessStage]);

  const getCreditCost = useCallback((serviceKey: CreditServiceKey): number => {
    return STAGE_CREDIT_COSTS[serviceKey];
  }, []);

  const getServiceInfo = useCallback((serviceKey: CreditServiceKey): ServiceInfo | undefined => {
    return SERVICE_CATALOG.find(s => s.key === serviceKey);
  }, []);

  const getServicesByStage = useCallback((stage: 'initial' | 'compliance' | 'final'): ServiceInfo[] => {
    return SERVICE_CATALOG.filter(s => s.stage === stage);
  }, []);

  const validateAndConsume = useCallback(async (
    serviceKey: CreditServiceKey,
    action: () => Promise<void> | void,
    description?: string
  ): Promise<boolean> => {
    const success = await consumeCreditsForService(serviceKey, description);
    if (success) {
      try {
        await action();
        return true;
      } catch (error) {
        console.error('Service action failed:', error);
        toast.error('Service failed to execute. Credits were consumed.');
        return false;
      }
    }
    return false;
  }, [consumeCreditsForService]);

  return {
    credits,
    currentStage,
    consumeCreditsForService,
    checkServiceAccess,
    getCreditCost,
    getServiceInfo,
    getServicesByStage,
    validateAndConsume,
    isProcessing,
    hasEnoughCredits: (serviceKey: CreditServiceKey) => checkServiceAccess(serviceKey),
    getStageCreditsUsed,
    canAccessStage
  };
};