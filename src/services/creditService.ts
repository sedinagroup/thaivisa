export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'purchase' | 'consumption' | 'refund' | 'bonus';
  service: string;
  action: string;
  complexity?: string;
  description: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  metadata?: Record<string, any>;
}

export interface CreditBalance {
  total: number;
  available: number;
  pending: number;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  bonus: number;
  popular?: boolean;
}

export interface ConsumeCreditsResult {
  success: boolean;
  remainingCredits?: number;
  error?: string;
  transactionId?: string;
}

export interface PurchaseCreditsResult {
  success: boolean;
  paymentUrl?: string;
  error?: string;
  transactionId?: string;
}

// Credit consumption rates for different services
export const CREDIT_RATES = {
  // Document Services
  'document_analysis': {
    'basic': 10,
    'standard': 15,
    'advanced': 20
  },
  'document_verification': {
    'basic': 8,
    'standard': 12,
    'advanced': 18
  },
  'passport_ocr': {
    'basic': 5,
    'standard': 8,
    'advanced': 12
  },
  
  // Trip Planning Services
  'trip_planning': {
    'basic': 25,
    'standard': 50,
    'advanced': 75,
    'premium': 100,
    'vip': 200
  },
  'itinerary_generation': {
    'basic': 30,
    'standard': 45,
    'advanced': 60
  },
  'accommodation_search': {
    'basic': 15,
    'standard': 25,
    'advanced': 35
  },
  
  // AI Chat Services
  'ai_chat': {
    'basic': 3,
    'standard': 5,
    'advanced': 8
  },
  'visa_consultation': {
    'basic': 10,
    'standard': 15,
    'advanced': 25
  },
  
  // Visa Services
  'visa_application': {
    'basic': 20,
    'standard': 30,
    'advanced': 45
  },
  'eligibility_check': {
    'basic': 8,
    'standard': 12,
    'advanced': 18
  }
};

// Credit packages with profitable pricing
export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 100,
    price: 9.99,
    bonus: 0,
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    credits: 300,
    price: 24.99,
    bonus: 50,
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    credits: 1000,
    price: 79.99,
    bonus: 200,
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    credits: 500,
    price: 39.99,
    bonus: 100,
    popular: false
  }
];

class CreditService {
  private baseUrl = '/api/credits';

  // Get credit balance for user - FIXED METHOD NAME
  async getCreditBalance(userId: string): Promise<number> {
    try {
      const stored = localStorage.getItem(`credits_${userId}`);
      return stored ? parseInt(stored, 10) : 50; // FIXED: 50 initial credits instead of 100
    } catch (error) {
      console.error('Error fetching credit balance:', error);
      return 50; // FIXED: Return 50 instead of 0 on error
    }
  }

  // Get detailed balance information
  async getBalance(userId: string): Promise<CreditBalance> {
    try {
      const balance = await this.getCreditBalance(userId);
      return {
        total: balance,
        available: balance,
        pending: 0
      };
    } catch (error) {
      console.error('Error fetching credit balance:', error);
      return { total: 50, available: 50, pending: 0 }; // FIXED: Return 50 instead of 0
    }
  }

  // Calculate credit cost for a service
  getCreditCost(service: string, complexity: string = 'standard'): number {
    const serviceRates = CREDIT_RATES[service as keyof typeof CREDIT_RATES];
    if (!serviceRates) {
      console.warn(`Unknown service: ${service}, defaulting to 10 credits`);
      return 10;
    }

    const cost = serviceRates[complexity as keyof typeof serviceRates];
    if (cost === undefined) {
      console.warn(`Unknown complexity: ${complexity} for service: ${service}, using standard rate`);
      return serviceRates['standard' as keyof typeof serviceRates] || 10;
    }

    return cost;
  }

  // FIXED: Added missing consumeCredits method
  async consumeCredits(
    userId: string,
    service: string,
    action: string,
    complexity: string = 'standard',
    metadata?: Record<string, any>
  ): Promise<ConsumeCreditsResult> {
    try {
      const currentBalance = await this.getCreditBalance(userId);
      const cost = this.getCreditCost(service, complexity);

      // Check if user has sufficient credits
      if (currentBalance < cost) {
        return {
          success: false,
          error: `Insufficient credits. Required: ${cost}, Available: ${currentBalance}`
        };
      }

      // Create transaction record
      const transaction: CreditTransaction = {
        id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        amount: -cost,
        type: 'consumption',
        service,
        action,
        complexity,
        description: `${service}: ${action} (${complexity})`,
        timestamp: new Date(),
        status: 'completed',
        metadata
      };

      // Update balance
      const newBalance = currentBalance - cost;
      localStorage.setItem(`credits_${userId}`, newBalance.toString());

      // Store transaction
      await this.storeTransaction(transaction);

      // Emit credit update event
      window.dispatchEvent(new CustomEvent('creditUpdate', {
        detail: { userId, newBalance, transaction }
      }));

      return {
        success: true,
        remainingCredits: newBalance,
        transactionId: transaction.id
      };
    } catch (error) {
      console.error('Error consuming credits:', error);
      return {
        success: false,
        error: 'Failed to consume credits'
      };
    }
  }

  // FIXED: Added missing purchaseCredits method
  async purchaseCredits(
    userId: string,
    packageId: string,
    paymentMethod: 'stripe' | 'paypal'
  ): Promise<PurchaseCreditsResult> {
    try {
      const creditPackage = CREDIT_PACKAGES.find(pkg => pkg.id === packageId);
      if (!creditPackage) {
        return {
          success: false,
          error: 'Invalid package selected'
        };
      }

      // In a real implementation, this would integrate with payment processors
      // For demo purposes, we'll simulate the payment flow
      const paymentUrl = this.generatePaymentUrl(packageId, paymentMethod, userId);

      return {
        success: true,
        paymentUrl,
        transactionId: `purchase_${Date.now()}`
      };
    } catch (error) {
      console.error('Error purchasing credits:', error);
      return {
        success: false,
        error: 'Failed to initiate purchase'
      };
    }
  }

  // Process successful payment (called after payment completion)
  async processSuccessfulPayment(userId: string, packageId: string): Promise<boolean> {
    try {
      const creditPackage = CREDIT_PACKAGES.find(pkg => pkg.id === packageId);
      if (!creditPackage) {
        throw new Error('Invalid package');
      }

      const currentBalance = await this.getCreditBalance(userId);
      const totalCredits = creditPackage.credits + creditPackage.bonus;
      const newBalance = currentBalance + totalCredits;

      // Create purchase transaction
      const transaction: CreditTransaction = {
        id: `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        amount: totalCredits,
        type: 'purchase',
        service: 'credit_purchase',
        action: 'package_purchase',
        description: `Purchased ${creditPackage.name} - ${creditPackage.credits} credits + ${creditPackage.bonus} bonus`,
        timestamp: new Date(),
        status: 'completed',
        metadata: {
          packageId,
          packageName: creditPackage.name,
          price: creditPackage.price,
          baseCredits: creditPackage.credits,
          bonusCredits: creditPackage.bonus
        }
      };

      // Update balance
      localStorage.setItem(`credits_${userId}`, newBalance.toString());

      // Store transaction
      await this.storeTransaction(transaction);

      // Emit credit update event
      window.dispatchEvent(new CustomEvent('creditUpdate', {
        detail: { userId, newBalance, transaction }
      }));

      return true;
    } catch (error) {
      console.error('Error processing payment:', error);
      return false;
    }
  }

  // Get transaction history
  async getTransactionHistory(userId: string, limit: number = 50): Promise<CreditTransaction[]> {
    try {
      const stored = localStorage.getItem(`transactions_${userId}`);
      if (!stored) return [];

      const transactions: CreditTransaction[] = JSON.parse(stored);
      return transactions
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      return [];
    }
  }

  // FIXED: Added missing getCreditAnalytics method
  async getCreditAnalytics(userId: string): Promise<any> {
    try {
      const transactions = await this.getTransactionHistory(userId, 1000);
      
      const totalConsumed = transactions
        .filter(t => t.type === 'consumption')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      const totalPurchased = transactions
        .filter(t => t.type === 'purchase')
        .reduce((sum, t) => sum + t.amount, 0);

      const serviceUsage = transactions
        .filter(t => t.type === 'consumption')
        .reduce((acc, t) => {
          acc[t.service] = (acc[t.service] || 0) + Math.abs(t.amount);
          return acc;
        }, {} as Record<string, number>);

      const topServices = Object.entries(serviceUsage)
        .map(([service, credits]) => ({ service, credits }))
        .sort((a, b) => b.credits - a.credits)
        .slice(0, 5);

      return {
        totalConsumed,
        totalPurchased,
        averageDaily: totalConsumed / 30, // Rough estimate
        topServices,
        monthlyTrend: [] // Would be calculated from actual data
      };
    } catch (error) {
      console.error('Error calculating analytics:', error);
      return {
        totalConsumed: 0,
        totalPurchased: 0,
        averageDaily: 0,
        topServices: [],
        monthlyTrend: []
      };
    }
  }

  // Store transaction
  private async storeTransaction(transaction: CreditTransaction): Promise<void> {
    try {
      const stored = localStorage.getItem(`transactions_${transaction.userId}`);
      const transactions: CreditTransaction[] = stored ? JSON.parse(stored) : [];
      
      transactions.unshift(transaction);
      
      // Keep only last 1000 transactions
      if (transactions.length > 1000) {
        transactions.splice(1000);
      }
      
      localStorage.setItem(`transactions_${transaction.userId}`, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error storing transaction:', error);
    }
  }

  // Generate payment URL (mock implementation)
  private generatePaymentUrl(packageId: string, paymentMethod: string, userId: string): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/payment?package=${packageId}&method=${paymentMethod}&user=${userId}`;
  }

  // Check if user has sufficient credits for a service
  async hassufficientCredits(userId: string, service: string, complexity: string = 'standard'): Promise<boolean> {
    const balance = await this.getCreditBalance(userId);
    const cost = this.getCreditCost(service, complexity);
    return balance >= cost;
  }

  // Get service cost without consuming credits
  getServiceCost(service: string, complexity: string = 'standard'): number {
    return this.getCreditCost(service, complexity);
  }

  // LEGACY METHODS for backward compatibility
  async useCredits(userId: string, amount: number, description: string): Promise<CreditTransaction> {
    try {
      const currentBalance = await this.getCreditBalance(userId);
      
      if (currentBalance < amount) {
        throw new Error('Insufficient credits');
      }

      const transaction: CreditTransaction = {
        id: `txn_${Date.now()}`,
        userId,
        amount: -amount,
        type: 'consumption',
        service: 'legacy',
        action: 'use_credits',
        description,
        timestamp: new Date(),
        status: 'completed'
      };

      // Update local storage
      const newBalance = currentBalance - amount;
      localStorage.setItem(`credits_${userId}`, newBalance.toString());

      await this.storeTransaction(transaction);

      return transaction;
    } catch (error) {
      console.error('Error using credits:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const creditService = new CreditService();
export default creditService;