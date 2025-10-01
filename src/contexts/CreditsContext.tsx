import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CreditTransaction {
  id: string;
  amount: number;
  type: 'consumed' | 'purchased' | 'refunded';
  service: string;
  description: string;
  stage: 'initial' | 'compliance' | 'final';
  timestamp: Date;
}

export interface ApplicationStage {
  stage: 'initial' | 'compliance' | 'final';
  completed: boolean;
  creditsUsed: number;
  services: string[];
}

interface CreditsContextType {
  credits: number;
  transactions: CreditTransaction[];
  applicationStages: ApplicationStage[];
  currentStage: 'initial' | 'compliance' | 'final';
  consumeCredits: (amount: number, service: string, description: string, stage: 'initial' | 'compliance' | 'final') => Promise<boolean>;
  addCredits: (amount: number, description?: string) => void;
  refreshCredits: () => Promise<void>;
  hasEnoughCredits: (amount: number) => boolean;
  setCurrentStage: (stage: 'initial' | 'compliance' | 'final') => void;
  getStageCreditsUsed: (stage: 'initial' | 'compliance' | 'final') => number;
  canAccessStage: (stage: 'initial' | 'compliance' | 'final') => boolean;
  completeStage: (stage: 'initial' | 'compliance' | 'final') => void;
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
  const [credits, setCredits] = useState<number>(250); // Start with 250 free credits
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [currentStage, setCurrentStageState] = useState<'initial' | 'compliance' | 'final'>('initial');
  const [applicationStages, setApplicationStages] = useState<ApplicationStage[]>([
    { stage: 'initial', completed: false, creditsUsed: 0, services: [] },
    { stage: 'compliance', completed: false, creditsUsed: 0, services: [] },
    { stage: 'final', completed: false, creditsUsed: 0, services: [] }
  ]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCredits = localStorage.getItem('user_credits');
    const savedTransactions = localStorage.getItem('credit_transactions');
    const savedStages = localStorage.getItem('application_stages');
    const savedCurrentStage = localStorage.getItem('current_stage');
    
    if (savedCredits) {
      setCredits(parseInt(savedCredits, 10));
    }
    
    if (savedTransactions) {
      try {
        const parsedTransactions = JSON.parse(savedTransactions).map((t: any) => ({
          ...t,
          timestamp: new Date(t.timestamp)
        }));
        setTransactions(parsedTransactions);
      } catch (error) {
        console.error('Error parsing saved transactions:', error);
      }
    }

    if (savedStages) {
      try {
        setApplicationStages(JSON.parse(savedStages));
      } catch (error) {
        console.error('Error parsing saved stages:', error);
      }
    }

    if (savedCurrentStage) {
      setCurrentStageState(savedCurrentStage as 'initial' | 'compliance' | 'final');
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('user_credits', credits.toString());
  }, [credits]);

  useEffect(() => {
    localStorage.setItem('credit_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('application_stages', JSON.stringify(applicationStages));
  }, [applicationStages]);

  useEffect(() => {
    localStorage.setItem('current_stage', currentStage);
  }, [currentStage]);

  const consumeCredits = async (
    amount: number, 
    service: string, 
    description: string, 
    stage: 'initial' | 'compliance' | 'final'
  ): Promise<boolean> => {
    if (credits < amount) {
      toast.error(`Insufficient credits! You need ${amount} credits but only have ${credits}.`, {
        action: {
          label: 'Buy Credits',
          onClick: () => window.location.href = '/credits'
        }
      });
      return false;
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const newCredits = credits - amount;
      const transaction: CreditTransaction = {
        id: Date.now().toString(),
        amount: -amount,
        type: 'consumed',
        service,
        description,
        stage,
        timestamp: new Date()
      };

      setCredits(newCredits);
      setTransactions(prev => [transaction, ...prev]);

      // Update stage credits used
      setApplicationStages(prev => prev.map(stageData => 
        stageData.stage === stage 
          ? { 
              ...stageData, 
              creditsUsed: stageData.creditsUsed + amount,
              services: [...stageData.services, service]
            }
          : stageData
      ));

      toast.success(`${amount} credits consumed for ${service}. Remaining: ${newCredits}`, {
        description: `Stage: ${stage.charAt(0).toUpperCase() + stage.slice(1)}`
      });
      
      // Trigger credit update event
      window.dispatchEvent(new CustomEvent('creditsUpdated', { 
        detail: { newBalance: newCredits, transaction, stage } 
      }));

      return true;
    } catch (error) {
      console.error('Error consuming credits:', error);
      toast.error('Failed to consume credits. Please try again.');
      return false;
    }
  };

  const addCredits = (amount: number, description: string = 'Credits purchased') => {
    const newCredits = credits + amount;
    const transaction: CreditTransaction = {
      id: Date.now().toString(),
      amount,
      type: 'purchased',
      service: 'purchase',
      description,
      stage: 'initial',
      timestamp: new Date()
    };

    setCredits(newCredits);
    setTransactions(prev => [transaction, ...prev]);
    
    toast.success(`${amount} credits added! New balance: ${newCredits}`);
    
    window.dispatchEvent(new CustomEvent('creditsUpdated', { 
      detail: { newBalance: newCredits, transaction } 
    }));
  };

  const refreshCredits = async (): Promise<void> => {
    const savedCredits = localStorage.getItem('user_credits');
    if (savedCredits) {
      setCredits(parseInt(savedCredits, 10));
    }
  };

  const hasEnoughCredits = (amount: number): boolean => {
    return credits >= amount;
  };

  const setCurrentStage = (stage: 'initial' | 'compliance' | 'final') => {
    setCurrentStageState(stage);
  };

  const getStageCreditsUsed = (stage: 'initial' | 'compliance' | 'final'): number => {
    const stageData = applicationStages.find(s => s.stage === stage);
    return stageData?.creditsUsed || 0;
  };

  const canAccessStage = (stage: 'initial' | 'compliance' | 'final'): boolean => {
    if (stage === 'initial') return true;
    
    if (stage === 'compliance') {
      const initialStage = applicationStages.find(s => s.stage === 'initial');
      return initialStage?.completed || false;
    }
    
    if (stage === 'final') {
      const complianceStage = applicationStages.find(s => s.stage === 'compliance');
      return complianceStage?.completed || false;
    }
    
    return false;
  };

  const completeStage = (stage: 'initial' | 'compliance' | 'final') => {
    setApplicationStages(prev => prev.map(stageData => 
      stageData.stage === stage 
        ? { ...stageData, completed: true }
        : stageData
    ));

    toast.success(`${stage.charAt(0).toUpperCase() + stage.slice(1)} stage completed!`, {
      description: 'You can now proceed to the next stage.'
    });
  };

  const value: CreditsContextType = {
    credits,
    transactions,
    applicationStages,
    currentStage,
    consumeCredits,
    addCredits,
    refreshCredits,
    hasEnoughCredits,
    setCurrentStage,
    getStageCreditsUsed,
    canAccessStage,
    completeStage
  };

  return (
    <CreditsContext.Provider value={value}>
      {children}
    </CreditsContext.Provider>
  );
};