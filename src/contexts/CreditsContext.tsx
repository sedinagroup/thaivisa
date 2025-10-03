import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { creditService } from '@/services/creditService';

interface CreditsContextType {
  credits: number;
  loading: boolean;
  refreshCredits: () => void;
  deductCredits: (amount: number, description: string) => boolean;
  addCredits: (amount: number, description: string) => void;
  hasEnoughCredits: (amount: number) => boolean;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

interface CreditsProviderProps {
  children: ReactNode;
}

export const CreditsProvider: React.FC<CreditsProviderProps> = ({ children }) => {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Função para atualizar o saldo
  const refreshCredits = () => {
    try {
      console.log('[CreditsContext] Refreshing credits...');
      const currentBalance = creditService.getBalance();
      setCredits(currentBalance);
      console.log('[CreditsContext] Credits updated to:', currentBalance);
    } catch (error) {
      console.error('[CreditsContext] Error refreshing credits:', error);
    }
  };

  // Debitar créditos
  const deductCredits = (amount: number, description: string): boolean => {
    console.log('[CreditsContext] Attempting to deduct:', amount, 'credits for:', description);
    
    const success = creditService.debitCredits(amount, description);
    if (success) {
      refreshCredits(); // Atualizar estado local
      console.log('[CreditsContext] Credits deducted successfully');
    } else {
      console.warn('[CreditsContext] Failed to deduct credits - insufficient balance');
    }
    
    return success;
  };

  // Adicionar créditos
  const addCredits = (amount: number, description: string): void => {
    console.log('[CreditsContext] Adding:', amount, 'credits for:', description);
    creditService.creditCredits(amount, description);
    refreshCredits(); // Atualizar estado local
    console.log('[CreditsContext] Credits added successfully');
  };

  // Verificar se tem créditos suficientes
  const hasEnoughCredits = (amount: number): boolean => {
    const hasEnough = creditService.hasEnoughCredits(amount);
    console.log('[CreditsContext] Has enough credits check:', credits, '>=', amount, '=', hasEnough);
    return hasEnough;
  };

  // Inicializar créditos ao montar o componente
  useEffect(() => {
    console.log('[CreditsContext] Initializing credits context...');
    refreshCredits();
    setLoading(false);
  }, []);

  // Escutar eventos de atualização de créditos
  useEffect(() => {
    const handleCreditsUpdate = (event: CustomEvent) => {
      console.log('[CreditsContext] Credits update event received:', event.detail.balance);
      setCredits(event.detail.balance);
    };

    window.addEventListener('creditsUpdated', handleCreditsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('creditsUpdated', handleCreditsUpdate as EventListener);
    };
  }, []);

  // Debug: Log mudanças no saldo
  useEffect(() => {
    console.log('[CreditsContext] Credits state changed to:', credits);
  }, [credits]);

  const value: CreditsContextType = {
    credits,
    loading,
    refreshCredits,
    deductCredits,
    addCredits,
    hasEnoughCredits
  };

  return (
    <CreditsContext.Provider value={value}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = (): CreditsContextType => {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};