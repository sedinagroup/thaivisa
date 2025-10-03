export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'purchase' | 'usage' | 'refund';
  description: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export interface CreditBalance {
  total: number;
  available: number;
  pending: number;
}

class CreditService {
  private baseUrl = '/api/credits';

  async getBalance(userId: string): Promise<CreditBalance> {
    try {
      // Simulate API call - replace with actual API integration
      const stored = localStorage.getItem(`credits_${userId}`);
      const balance = stored ? parseInt(stored, 10) : 100; // Default 100 credits
      
      return {
        total: balance,
        available: balance,
        pending: 0
      };
    } catch (error) {
      console.error('Error fetching credit balance:', error);
      return { total: 0, available: 0, pending: 0 };
    }
  }

  async purchaseCredits(userId: string, amount: number, paymentMethod: string): Promise<CreditTransaction> {
    try {
      // Simulate API call - replace with actual payment processing
      const transaction: CreditTransaction = {
        id: `txn_${Date.now()}`,
        userId,
        amount,
        type: 'purchase',
        description: `Purchased ${amount} credits`,
        timestamp: new Date(),
        status: 'completed'
      };

      // Update local storage (replace with actual API call)
      const currentBalance = await this.getBalance(userId);
      const newBalance = currentBalance.available + amount;
      localStorage.setItem(`credits_${userId}`, newBalance.toString());

      return transaction;
    } catch (error) {
      console.error('Error purchasing credits:', error);
      throw new Error('Failed to purchase credits');
    }
  }

  async useCredits(userId: string, amount: number, description: string): Promise<CreditTransaction> {
    try {
      const currentBalance = await this.getBalance(userId);
      
      if (currentBalance.available < amount) {
        throw new Error('Insufficient credits');
      }

      const transaction: CreditTransaction = {
        id: `txn_${Date.now()}`,
        userId,
        amount: -amount,
        type: 'usage',
        description,
        timestamp: new Date(),
        status: 'completed'
      };

      // Update local storage (replace with actual API call)
      const newBalance = currentBalance.available - amount;
      localStorage.setItem(`credits_${userId}`, newBalance.toString());

      return transaction;
    } catch (error) {
      console.error('Error using credits:', error);
      throw error;
    }
  }

  async getTransactionHistory(userId: string): Promise<CreditTransaction[]> {
    try {
      // Simulate API call - replace with actual API integration
      const stored = localStorage.getItem(`transactions_${userId}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      return [];
    }
  }
}

// Export the service instance
export const creditService = new CreditService();
export default creditService;