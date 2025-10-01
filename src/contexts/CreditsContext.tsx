import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface CreditsContextType {
  credits: number;
  consumeCredits: (amount: number, service: string, description?: string) => Promise<void>;
  addCredits: (amount: number) => void;
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
  const { user, updateUser } = useAuth();

  const consumeCredits = async (amount: number, service: string, description?: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    if (user.credits < amount) {
      throw new Error('Insufficient credits');
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    
    updateUser({ credits: user.credits - amount });
  };

  const addCredits = (amount: number) => {
    if (!user) return;
    updateUser({ credits: user.credits + amount });
  };

  const value: CreditsContextType = {
    credits: user?.credits || 0,
    consumeCredits,
    addCredits
  };

  return (
    <CreditsContext.Provider value={value}>
      {children}
    </CreditsContext.Provider>
  );
};