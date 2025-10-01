import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useEmailNotifications } from '@/hooks/useEmailNotifications';
import { toast } from 'sonner';

interface CreditTransaction {
  id: string;
  type: 'purchase' | 'consumption' | 'refund';
  amount: number;
  description: string;
  timestamp: Date;
  invoiceNumber?: string;
}

interface CreditsContextType {
  credits: number;
  transactions: CreditTransaction[];
  loading: boolean;
  purchaseCredits: (amount: number, packageName: string, price: number) => Promise<boolean>;
  consumeCredits: (amount: number, service: string, description: string) => Promise<boolean>;
  getTransactionHistory: () => CreditTransaction[];
  refreshCredits: () => Promise<void>;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};

interface CreditsProviderProps {
  children: ReactNode;
}

export const CreditsProvider: React.FC<CreditsProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { sendInvoiceEmail } = useEmailNotifications();
  const [credits, setCredits] = useState(100); // Start with demo credits
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  // Load credits and transactions from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedCredits = localStorage.getItem(`credits_${user.id}`);
      const savedTransactions = localStorage.getItem(`transactions_${user.id}`);
      
      if (savedCredits) {
        setCredits(parseInt(savedCredits));
      }
      
      if (savedTransactions) {
        try {
          const parsed = JSON.parse(savedTransactions);
          setTransactions(parsed.map((t: any) => ({
            ...t,
            timestamp: new Date(t.timestamp)
          })));
        } catch (error) {
          console.error('Error parsing transactions:', error);
        }
      }
    }
  }, [user]);

  // Save to localStorage whenever credits or transactions change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`credits_${user.id}`, credits.toString());
      localStorage.setItem(`transactions_${user.id}`, JSON.stringify(transactions));
    }
  }, [credits, transactions, user]);

  const purchaseCredits = async (amount: number, packageName: string, price: number): Promise<boolean> => {
    if (!user) {
      toast.error('Please log in to purchase credits');
      return false;
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const invoiceNumber = `INV-${Date.now()}`;
      const transaction: CreditTransaction = {
        id: `txn_${Date.now()}`,
        type: 'purchase',
        amount: amount,
        description: `Purchased ${packageName} (${amount} credits)`,
        timestamp: new Date(),
        invoiceNumber
      };

      setCredits(prev => prev + amount);
      setTransactions(prev => [transaction, ...prev]);

      // Send invoice email
      await sendInvoiceEmail({
        amount: price,
        credits: amount,
        paymentMethod: 'PayPal'
      });

      toast.success(`Successfully purchased ${amount} credits!`);
      return true;
    } catch (error) {
      console.error('Error purchasing credits:', error);
      toast.error('Failed to purchase credits. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const consumeCredits = async (amount: number, service: string, description: string): Promise<boolean> => {
    if (!user) {
      toast.error('Please log in to use credits');
      return false;
    }

    if (credits < amount) {
      toast.error(`Insufficient credits. You need ${amount} credits but only have ${credits}.`);
      return false;
    }

    try {
      const transaction: CreditTransaction = {
        id: `txn_${Date.now()}`,
        type: 'consumption',
        amount: -amount,
        description: `${service}: ${description}`,
        timestamp: new Date()
      };

      setCredits(prev => prev - amount);
      setTransactions(prev => [transaction, ...prev]);

      console.log(`Consumed ${amount} credits for ${service}`);
      return true;
    } catch (error) {
      console.error('Error consuming credits:', error);
      toast.error('Failed to consume credits. Please try again.');
      return false;
    }
  };

  const getTransactionHistory = (): CreditTransaction[] => {
    return transactions.slice(0, 50); // Return last 50 transactions
  };

  const refreshCredits = async (): Promise<void> => {
    if (!user) return;

    setLoading(true);
    try {
      // In a real app, you would fetch from your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we just reload from localStorage
      const savedCredits = localStorage.getItem(`credits_${user.id}`);
      if (savedCredits) {
        setCredits(parseInt(savedCredits));
      }
    } catch (error) {
      console.error('Error refreshing credits:', error);
      toast.error('Failed to refresh credits');
    } finally {
      setLoading(false);
    }
  };

  const value: CreditsContextType = {
    credits,
    transactions,
    loading,
    purchaseCredits,
    consumeCredits,
    getTransactionHistory,
    refreshCredits
  };

  return (
    <CreditsContext.Provider value={value}>
      {children}
    </CreditsContext.Provider>
  );
};