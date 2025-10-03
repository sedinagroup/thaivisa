import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { creditService, CreditTransaction, CREDIT_PACKAGES } from '@/services/creditService';
import { toast } from 'sonner';

interface CreditsContextType {
  credits: number;
  loading: boolean;
  transactions: CreditTransaction[];
  consumeCredits: (amount: number, service: string, description: string) => Promise<boolean>;
  purchaseCredits: (packageId: string, paymentMethod: 'stripe' | 'paypal') => Promise<boolean>;
  getServiceCost: (service: string, complexity?: string) => number;
  hassufficientCredits: (service: string, complexity?: string) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
  packages: typeof CREDIT_PACKAGES;
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
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);

  // Refresh credit balance
  const refreshBalance = useCallback(async () => {
    if (!user?.id) {
      setCredits(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const balance = await creditService.getCreditBalance(user.id);
      setCredits(balance);
    } catch (error) {
      console.error('Error refreshing balance:', error);
      // Don't show error toast on initial load, just set default
      setCredits(50);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Refresh transaction history
  const refreshTransactions = useCallback(async () => {
    if (!user?.id) {
      setTransactions([]);
      return;
    }

    try {
      const history = await creditService.getTransactionHistory(user.id);
      setTransactions(history);
    } catch (error) {
      console.error('Error refreshing transactions:', error);
    }
  }, [user?.id]);

  // Consume credits for a service - SIMPLIFIED for compatibility
  const consumeCredits = useCallback(async (
    amount: number,
    service: string,
    description: string
  ): Promise<boolean> => {
    if (!user?.id) {
      toast.error('Please log in to use this service');
      return false;
    }

    try {
      // Use the new credit service method
      const result = await creditService.consumeCredits(
        user.id, 
        service, 
        description, 
        'standard',
        { amount }
      );

      if (result.success && result.remainingCredits !== undefined) {
        setCredits(result.remainingCredits);
        await refreshTransactions();
        return true;
      } else {
        if (result.error) {
          toast.error(result.error);
        }
        return false;
      }
    } catch (error) {
      console.error('Error consuming credits:', error);
      toast.error('Failed to consume credits');
      return false;
    }
  }, [user?.id, refreshTransactions]);

  // Purchase credits
  const purchaseCredits = useCallback(async (
    packageId: string,
    paymentMethod: 'stripe' | 'paypal'
  ): Promise<boolean> => {
    if (!user?.id) {
      toast.error('Please log in to purchase credits');
      return false;
    }

    try {
      const result = await creditService.purchaseCredits(user.id, packageId, paymentMethod);
      
      if (result.success && result.paymentUrl) {
        // Redirect to payment URL
        window.location.href = result.paymentUrl;
        return true;
      } else {
        toast.error(result.error || 'Failed to initiate purchase');
        return false;
      }
    } catch (error) {
      console.error('Error purchasing credits:', error);
      toast.error('Failed to purchase credits');
      return false;
    }
  }, [user?.id]);

  // Get service cost
  const getServiceCost = useCallback((service: string, complexity: string = 'standard'): number => {
    return creditService.getServiceCost(service, complexity);
  }, []);

  // Check if user has sufficient credits
  const hassufficientCredits = useCallback(async (service: string, complexity: string = 'standard'): Promise<boolean> => {
    if (!user?.id) return false;
    return await creditService.hassufficientCredits(user.id, service, complexity);
  }, [user?.id]);

  // Load initial data when user changes
  useEffect(() => {
    if (user?.id) {
      refreshBalance();
      refreshTransactions();
    } else {
      setCredits(0);
      setTransactions([]);
      setLoading(false);
    }
  }, [user?.id, refreshBalance, refreshTransactions]);

  // Listen for credit update events
  useEffect(() => {
    const handleCreditUpdate = (event: CustomEvent) => {
      if (event.detail.userId === user?.id) {
        setCredits(event.detail.newBalance);
        refreshTransactions();
      }
    };

    window.addEventListener('creditUpdate', handleCreditUpdate as EventListener);
    
    return () => {
      window.removeEventListener('creditUpdate', handleCreditUpdate as EventListener);
    };
  }, [user?.id, refreshTransactions]);

  // Set up periodic balance refresh (every 5 minutes)
  useEffect(() => {
    if (!user?.id) return;

    const interval = setInterval(() => {
      refreshBalance();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [user?.id, refreshBalance]);

  const value: CreditsContextType = {
    credits,
    loading,
    transactions,
    consumeCredits,
    purchaseCredits,
    getServiceCost,
    hassufficientCredits,
    refreshBalance,
    refreshTransactions,
    packages: CREDIT_PACKAGES
  };

  return (
    <CreditsContext.Provider value={value}>
      {children}
    </CreditsContext.Provider>
  );
};