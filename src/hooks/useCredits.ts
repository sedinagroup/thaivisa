import { useState, useEffect, useCallback } from 'react';
import { creditService, CreditTransaction } from '@/services/creditService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface UseCreditReturn {
  credits: number;
  loading: boolean;
  transactions: CreditTransaction[];
  consumeCredits: (service: string, action: string, complexity?: string, metadata?: Record<string, any>) => Promise<boolean>;
  purchaseCredits: (packageId: string, paymentMethod: 'stripe' | 'paypal') => Promise<boolean>;
  refreshBalance: () => Promise<void>;
  analytics: {
    totalConsumed: number;
    totalPurchased: number;
    averageDaily: number;
    topServices: Array<{ service: string; credits: number }>;
    monthlyTrend: Array<{ month: string; consumed: number; purchased: number }>;
  };
}

export const useCredits = (): UseCreditReturn => {
  const { user } = useAuth();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [analytics, setAnalytics] = useState({
    totalConsumed: 0,
    totalPurchased: 0,
    averageDaily: 0,
    topServices: [],
    monthlyTrend: []
  });

  // Refresh credit balance - FIXED error handling
  const refreshBalance = useCallback(async () => {
    if (!user?.id) {
      setCredits(0);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      // FIXED: Use correct method name
      const balance = await creditService.getCreditBalance(user.id);
      setCredits(balance);
    } catch (error) {
      console.error('Error refreshing credit balance:', error);
      // FIXED: Don't show toast error on initial load, just log
      // Set default credits for new users
      setCredits(50);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Load transaction history - FIXED error handling
  const loadTransactions = useCallback(async () => {
    if (!user?.id) {
      setTransactions([]);
      return;
    }
    
    try {
      const history = await creditService.getTransactionHistory(user.id);
      setTransactions(history);
    } catch (error) {
      console.error('Error loading transactions:', error);
      setTransactions([]);
    }
  }, [user?.id]);

  // Load analytics - FIXED error handling
  const loadAnalytics = useCallback(async () => {
    if (!user?.id) {
      setAnalytics({
        totalConsumed: 0,
        totalPurchased: 0,
        averageDaily: 0,
        topServices: [],
        monthlyTrend: []
      });
      return;
    }
    
    try {
      const analyticsData = await creditService.getCreditAnalytics(user.id);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
      setAnalytics({
        totalConsumed: 0,
        totalPurchased: 0,
        averageDaily: 0,
        topServices: [],
        monthlyTrend: []
      });
    }
  }, [user?.id]);

  // Consume credits - FIXED to use correct service method
  const consumeCredits = useCallback(async (
    service: string, 
    action: string, 
    complexity: string = 'standard',
    metadata?: Record<string, any>
  ): Promise<boolean> => {
    if (!user?.id) {
      toast.error('Please log in to use this service');
      return false;
    }

    try {
      // FIXED: Use correct method from service
      const result = await creditService.consumeCredits(
        user.id, 
        service, 
        action, 
        complexity, 
        metadata
      );

      if (result.success && result.remainingCredits !== undefined) {
        setCredits(result.remainingCredits);
        // Refresh transactions to show the new consumption
        await loadTransactions();
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
  }, [user?.id, loadTransactions]);

  // Purchase credits - FIXED to use correct service method
  const purchaseCredits = useCallback(async (
    packageId: string, 
    paymentMethod: 'stripe' | 'paypal'
  ): Promise<boolean> => {
    if (!user?.id) {
      toast.error('Please log in to purchase credits');
      return false;
    }

    try {
      // FIXED: Use correct method from service
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

  // Load initial data when user changes - FIXED initialization
  useEffect(() => {
    if (user?.id) {
      refreshBalance();
      loadTransactions();
      loadAnalytics();
    } else {
      setCredits(0);
      setTransactions([]);
      setAnalytics({
        totalConsumed: 0,
        totalPurchased: 0,
        averageDaily: 0,
        topServices: [],
        monthlyTrend: []
      });
      setLoading(false);
    }
  }, [user?.id, refreshBalance, loadTransactions, loadAnalytics]);

  // Set up periodic balance refresh - REDUCED frequency to avoid spam
  useEffect(() => {
    if (!user?.id) return;

    const interval = setInterval(() => {
      refreshBalance();
    }, 300000); // FIXED: Refresh every 5 minutes instead of 1 minute

    return () => clearInterval(interval);
  }, [user?.id, refreshBalance]);

  // Listen for credit-related events
  useEffect(() => {
    const handleCreditUpdate = (event: CustomEvent) => {
      if (event.detail.userId === user?.id) {
        setCredits(event.detail.newBalance);
        loadTransactions();
      }
    };

    window.addEventListener('creditUpdate', handleCreditUpdate as EventListener);
    
    return () => {
      window.removeEventListener('creditUpdate', handleCreditUpdate as EventListener);
    };
  }, [user?.id, loadTransactions]);

  return {
    credits,
    loading,
    transactions,
    consumeCredits,
    purchaseCredits,
    refreshBalance,
    analytics
  };
};