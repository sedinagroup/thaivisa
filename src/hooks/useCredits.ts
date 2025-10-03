import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { creditService, ConsumeCreditsResult } from '@/services/creditService';
import { toast } from 'sonner';

export interface UseCreditsReturn {
  credits: number;
  loading: boolean;
  error: string | null;
  refreshBalance: () => Promise<void>;
  deductCredits: (amount: number, service: string, description: string) => Promise<boolean>;
  hassufficientCredits: (amount: number) => boolean;
  getBalance: () => Promise<number>;
}

export const useCredits = (): UseCreditsReturn => {
  const { user } = useAuth();
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get current balance
  const getBalance = useCallback(async (): Promise<number> => {
    if (!user?.id) return 0;
    
    try {
      const balance = await creditService.getCreditBalance(user.id);
      return balance;
    } catch (err) {
      console.error('Error getting balance:', err);
      return 0;
    }
  }, [user?.id]);

  // Refresh balance from service
  const refreshBalance = useCallback(async (): Promise<void> => {
    if (!user?.id) {
      setCredits(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const balance = await creditService.getCreditBalance(user.id);
      setCredits(balance);
      console.log(`💰 Balance refreshed for user ${user.id}: ${balance} credits`);
    } catch (err) {
      console.error('Error refreshing balance:', err);
      setError('Failed to load credit balance');
      setCredits(50); // Default fallback
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Deduct credits for a service
  const deductCredits = useCallback(async (
    amount: number,
    service: string,
    description: string
  ): Promise<boolean> => {
    if (!user?.id) {
      toast.error('Please log in to use this service');
      return false;
    }

    console.log(`💳 Attempting to deduct ${amount} credits for ${service}: ${description}`);

    try {
      const result: ConsumeCreditsResult = await creditService.consumeCredits(
        user.id,
        service,
        description,
        'standard',
        { originalAmount: amount }
      );

      if (result.success && result.remainingCredits !== undefined) {
        const newBalance = result.remainingCredits;
        setCredits(newBalance);
        
        console.log(`✅ Credits deducted successfully. New balance: ${newBalance}`);
        toast.success(`${amount} credits deducted. Remaining: ${newBalance}`, {
          duration: 3000
        });

        // Emit global event for other components
        window.dispatchEvent(new CustomEvent('creditBalanceUpdate', {
          detail: { newBalance, deductedAmount: amount }
        }));

        return true;
      } else {
        console.error('❌ Credit deduction failed:', result.error);
        if (result.error?.includes('Insufficient')) {
          toast.error(`Insufficient credits! You need ${amount} but only have ${credits}`, {
            duration: 5000,
            action: {
              label: 'Buy Credits',
              onClick: () => window.location.href = '/purchase-credits'
            }
          });
        } else {
          toast.error(result.error || 'Failed to deduct credits');
        }
        return false;
      }
    } catch (err) {
      console.error('❌ Error deducting credits:', err);
      toast.error('Error processing credit deduction');
      return false;
    }
  }, [user?.id, credits]);

  // Check if user has sufficient credits
  const hassufficientCredits = useCallback((amount: number): boolean => {
    return credits >= amount;
  }, [credits]);

  // Load balance when user changes
  useEffect(() => {
    if (user?.id) {
      refreshBalance();
    } else {
      setCredits(0);
      setLoading(false);
      setError(null);
    }
  }, [user?.id, refreshBalance]);

  // Listen for credit update events from other components
  useEffect(() => {
    const handleCreditUpdate = (event: CustomEvent) => {
      if (event.detail?.userId === user?.id && event.detail?.newBalance !== undefined) {
        console.log(`🔄 Credit update event received: ${event.detail.newBalance}`);
        setCredits(event.detail.newBalance);
      }
    };

    window.addEventListener('creditUpdate', handleCreditUpdate as EventListener);
    
    return () => {
      window.removeEventListener('creditUpdate', handleCreditUpdate as EventListener);
    };
  }, [user?.id]);

  // Periodic balance refresh (every 2 minutes)
  useEffect(() => {
    if (!user?.id) return;

    const interval = setInterval(() => {
      refreshBalance();
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [user?.id, refreshBalance]);

  return {
    credits,
    loading,
    error,
    refreshBalance,
    deductCredits,
    hassufficientCredits,
    getBalance
  };
};

export default useCredits;