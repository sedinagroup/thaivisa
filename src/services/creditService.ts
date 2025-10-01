// Credit service for managing credit operations
export interface CreditService {
  name: string;
  description: string;
  credits: number;
  category: 'visa' | 'document' | 'ai' | 'support';
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  popular?: boolean;
  savings?: string;
}

export const CREDIT_SERVICES: Record<string, CreditService> = {
  ELIGIBILITY_CHECK: {
    name: 'Eligibility Check',
    description: 'AI-powered visa eligibility assessment',
    credits: 15,
    category: 'visa'
  },
  DOCUMENT_UPLOAD: {
    name: 'Document Upload',
    description: 'Secure document upload and storage',
    credits: 5,
    category: 'document'
  },
  AI_BRAIN_BASIC: {
    name: 'AI Analysis',
    description: 'Basic AI document analysis',
    credits: 10,
    category: 'ai'
  },
  AI_BRAIN_ADVANCED: {
    name: 'Advanced AI Analysis',
    description: 'Comprehensive AI document verification',
    credits: 25,
    category: 'ai'
  },
  SUBMIT_TO_REVIEW: {
    name: 'Submit to Review',
    description: 'Submit application for official review',
    credits: 30,
    category: 'visa'
  },
  OCR_PASSPORT_SCAN: {
    name: 'OCR Passport Scan',
    description: 'AI-powered passport data extraction',
    credits: 20,
    category: 'ai'
  },
  COMPLIANCE_CHECK: {
    name: 'Compliance Check',
    description: 'Document compliance verification',
    credits: 20,
    category: 'document'
  },
  FINAL_SUBMISSION: {
    name: 'Final Submission',
    description: 'Complete visa application submission',
    credits: 50,
    category: 'visa'
  }
};

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 100,
    price: 9.99
  },
  {
    id: 'popular',
    name: 'Popular Pack',
    credits: 250,
    price: 19.99,
    popular: true,
    savings: 'Save 20%'
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    credits: 500,
    price: 34.99,
    savings: 'Save 30%'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    credits: 1000,
    price: 59.99,
    savings: 'Save 40%'
  }
];

export function getCreditCost(serviceKey: string): number {
  const service = CREDIT_SERVICES[serviceKey];
  return service ? service.credits : 0;
}

export function getServicePrice(serviceKey: string): number {
  const service = CREDIT_SERVICES[serviceKey];
  return service ? service.credits : 0;
}

export function getServiceInfo(serviceKey: string): CreditService | null {
  return CREDIT_SERVICES[serviceKey] || null;
}

export function calculateTotalCredits(services: string[]): number {
  return services.reduce((total, serviceKey) => {
    return total + getCreditCost(serviceKey);
  }, 0);
}

export function findBestPackage(creditsNeeded: number): CreditPackage | null {
  return CREDIT_PACKAGES.find(pkg => pkg.credits >= creditsNeeded) || null;
}

export function getAllServices(): CreditService[] {
  return Object.values(CREDIT_SERVICES);
}

export function getServicesByCategory(category: CreditService['category']): CreditService[] {
  return Object.values(CREDIT_SERVICES).filter(service => service.category === category);
}

// Simulate credit consumption
export async function consumeCredits(serviceKey: string, userId: string): Promise<boolean> {
  const cost = getCreditCost(serviceKey);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would make an API call to deduct credits
  console.log(`Consuming ${cost} credits for ${serviceKey} for user ${userId}`);
  
  return true; // Assume success for demo
}

// Get user's current credit balance (mock)
export async function getCreditBalance(userId: string): Promise<number> {
  // In a real app, this would fetch from API
  const stored = localStorage.getItem(`credits_${userId}`);
  return stored ? parseInt(stored) : 1000; // Default 1000 credits for demo
}

// Update user's credit balance (mock)
export async function updateCreditBalance(userId: string, newBalance: number): Promise<void> {
  localStorage.setItem(`credits_${userId}`, newBalance.toString());
}