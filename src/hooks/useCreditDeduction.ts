import { useCredits } from '@/contexts/CreditsContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Definir custos das operações
export const CREDIT_COSTS = {
  // Visa Application
  page_load_premium: 1,
  visa_select_type: 5,
  visa_continue_step: 10,
  visa_upload_passport: 15,
  visa_ocr_processing: 25,
  visa_upload_documents: 20,
  visa_document_analysis: 30,
  visa_final_analysis: 100,
  visa_generate_report: 25,
  
  // Document Checker
  document_upload: 10,
  document_analysis: 25,
  document_verification: 15,
  
  // Trip Planner
  trip_planning_basic: 50,
  trip_planning_detailed: 75,
  trip_recommendations: 25,
  trip_export: 10,
  
  // General
  ai_consultation: 20,
  priority_support: 50
} as const;

export type CreditAction = keyof typeof CREDIT_COSTS;

interface DeductionOptions {
  showCost?: boolean;
  confirmBeforeAction?: boolean;
  actionDescription?: string;
}

export const useCreditDeduction = () => {
  const { credits, deductCredits, hasEnoughCredits, refreshCredits } = useCredits();
  const navigate = useNavigate();

  // Obter custo de uma ação
  const getCost = (action: CreditAction): number => {
    return CREDIT_COSTS[action] || 0;
  };

  // Verificar se pode pagar por uma ação
  const canAfford = (action: CreditAction): boolean => {
    const cost = getCost(action);
    const affordable = hasEnoughCredits(cost);
    console.log('[useCreditDeduction] Can afford check:', action, 'costs', cost, 'have', credits, 'affordable:', affordable);
    return affordable;
  };

  // Forçar redirecionamento para compra de créditos
  const forcePurchaseRedirect = (message?: string) => {
    const defaultMessage = 'You need more credits to continue. Please purchase more credits.';
    toast.error(message || defaultMessage, {
      duration: 5000,
      action: {
        label: 'Buy Credits',
        onClick: () => navigate('/pricing')
      }
    });
    
    // Redirecionar após um pequeno delay
    setTimeout(() => {
      navigate('/pricing');
    }, 2000);
  };

  // Função principal para deduzir créditos
  const deductCreditsForAction = async (
    action: CreditAction, 
    options: DeductionOptions = {}
  ): Promise<boolean> => {
    const cost = getCost(action);
    const { 
      showCost = true, 
      confirmBeforeAction = false, 
      actionDescription = action 
    } = options;

    console.log('[useCreditDeduction] Attempting deduction for:', action, 'cost:', cost);

    // Verificar se tem créditos suficientes
    if (!canAfford(action)) {
      const message = `Insufficient credits! You need ${cost} credits but only have ${credits}.`;
      console.warn('[useCreditDeduction]', message);
      
      toast.error(message, {
        duration: 5000,
        action: {
          label: 'Buy Credits',
          onClick: () => navigate('/pricing')
        }
      });
      
      forcePurchaseRedirect();
      return false;
    }

    // Confirmação antes da ação (se solicitado)
    if (confirmBeforeAction) {
      const confirmed = window.confirm(
        `This action will cost ${cost} credits. You currently have ${credits} credits. Continue?`
      );
      
      if (!confirmed) {
        console.log('[useCreditDeduction] User cancelled action');
        return false;
      }
    }

    // Tentar deduzir os créditos
    const success = deductCredits(cost, actionDescription);
    
    if (success) {
      console.log('[useCreditDeduction] Credits deducted successfully for:', action);
      
      if (showCost) {
        toast.success(`${cost} credits deducted. ${credits - cost} credits remaining.`, {
          duration: 3000
        });
      }
      
      // Atualizar saldo para garantir consistência
      refreshCredits();
      return true;
    } else {
      console.error('[useCreditDeduction] Failed to deduct credits for:', action);
      toast.error('Failed to deduct credits. Please try again.');
      return false;
    }
  };

  // Verificar saldo baixo e avisar usuário
  const checkLowBalance = (threshold: number = 100) => {
    if (credits <= threshold && credits > 0) {
      toast.warning(`Low credit balance: ${credits} credits remaining. Consider purchasing more credits.`, {
        duration: 5000,
        action: {
          label: 'Buy Credits',
          onClick: () => navigate('/pricing')
        }
      });
    }
  };

  // Obter informações sobre uma ação
  const getActionInfo = (action: CreditAction) => {
    return {
      action,
      cost: getCost(action),
      canAfford: canAfford(action),
      currentBalance: credits
    };
  };

  return {
    credits,
    deductCredits: deductCreditsForAction,
    canAfford,
    getCost,
    forcePurchaseRedirect,
    checkLowBalance,
    getActionInfo,
    refreshCredits
  };
};