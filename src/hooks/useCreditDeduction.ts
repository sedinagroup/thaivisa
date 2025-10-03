import { useCallback } from 'react';
import { useCredits } from '@/contexts/CreditsContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface CreditDeductionOptions {
  showCost?: boolean;
  confirmBeforeAction?: boolean;
  redirectOnInsufficient?: boolean;
  actionDescription?: string;
}

// Granular credit costs for maximum profitability
export const GRANULAR_CREDIT_COSTS = {
  // Visa Application Process
  'visa_select_type': 5,
  'visa_continue_step': 5,
  'visa_upload_passport': 15,
  'visa_ocr_processing': 10,
  'visa_upload_documents': 5,
  'visa_document_analysis': 20,
  'visa_final_analysis': 50,
  'visa_generate_report': 15,
  'visa_download_result': 5,
  
  // Trip Planning
  'trip_start_planning': 5,
  'trip_select_destination': 3,
  'trip_set_dates': 3,
  'trip_set_budget': 3,
  'trip_continue_step': 5,
  'trip_generate_basic': 25,
  'trip_generate_standard': 50,
  'trip_generate_premium': 100,
  'trip_modify_itinerary': 10,
  'trip_add_activity': 8,
  'trip_remove_activity': 5,
  'trip_export_pdf': 10,
  'trip_save_itinerary': 5,
  
  // Document Analysis
  'doc_upload_file': 3,
  'doc_ocr_scan': 8,
  'doc_ai_analysis': 15,
  'doc_verification': 12,
  'doc_generate_report': 10,
  'doc_download_report': 5,
  'doc_reanalyze': 20,
  
  // AI Chat & Support
  'chat_send_message': 2,
  'chat_complex_query': 5,
  'chat_visa_consultation': 15,
  'chat_legal_advice': 25,
  'chat_document_help': 8,
  'chat_travel_advice': 10,
  
  // Profile & Settings
  'profile_update': 2,
  'settings_change': 1,
  'notification_send': 1,
  
  // General Actions
  'page_load_premium': 1,
  'search_query': 2,
  'filter_results': 1,
  'export_data': 5,
  'save_progress': 2,
  'share_content': 3,
  
  // Premium Features
  'priority_processing': 20,
  'expedited_service': 30,
  'premium_support': 15,
  'api_call': 5,
  'bulk_operation': 25
};

export const useCreditDeduction = () => {
  const { credits, consumeCredits } = useCredits();
  const navigate = useNavigate();

  // Main function to deduct credits with comprehensive checks
  const deductCredits = useCallback(async (
    action: keyof typeof GRANULAR_CREDIT_COSTS,
    options: CreditDeductionOptions = {}
  ): Promise<boolean> => {
    const {
      showCost = true,
      confirmBeforeAction = false,
      redirectOnInsufficient = true,
      actionDescription
    } = options;

    const cost = GRANULAR_CREDIT_COSTS[action];
    const description = actionDescription || action.replace(/_/g, ' ');

    // Check if user has sufficient credits
    if (credits < cost) {
      const message = `Insufficient credits! You need ${cost} credits but only have ${credits}.`;
      
      if (showCost) {
        toast.error(message, {
          duration: 5000,
          action: {
            label: 'Buy Credits',
            onClick: () => navigate('/purchase-credits')
          }
        });
      }

      if (redirectOnInsufficient) {
        // Force redirect to purchase page after 3 seconds
        setTimeout(() => {
          navigate('/purchase-credits');
        }, 3000);
      }

      return false;
    }

    // Show confirmation if requested
    if (confirmBeforeAction) {
      const confirmed = window.confirm(
        `This action "${description}" will cost ${cost} credits. You have ${credits} credits remaining. Continue?`
      );
      if (!confirmed) return false;
    }

    // Deduct credits
    try {
      const success = await consumeCredits(cost, 'platform_usage', description);
      
      if (success) {
        if (showCost) {
          toast.success(`Action completed! ${cost} credits deducted. Remaining: ${credits - cost}`, {
            duration: 3000
          });
        }
        
        // Show low credit warning
        const remainingCredits = credits - cost;
        if (remainingCredits <= 20 && remainingCredits > 10) {
          toast.warning('Low credits! Consider purchasing more to avoid service interruption.', {
            duration: 5000,
            action: {
              label: 'Buy Now',
              onClick: () => navigate('/purchase-credits')
            }
          });
        } else if (remainingCredits <= 10) {
          toast.error('CRITICAL: Very low credits! Purchase immediately to continue using services.', {
            duration: 8000,
            action: {
              label: 'Buy Credits Now',
              onClick: () => navigate('/purchase-credits')
            }
          });
        }
        
        return true;
      } else {
        toast.error('Failed to process credit deduction. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Credit deduction error:', error);
      toast.error('Error processing credits. Please refresh and try again.');
      return false;
    }
  }, [credits, consumeCredits, navigate]);

  // Check if user can afford an action without deducting
  const canAfford = useCallback((action: keyof typeof GRANULAR_CREDIT_COSTS): boolean => {
    const cost = GRANULAR_CREDIT_COSTS[action];
    return credits >= cost;
  }, [credits]);

  // Get cost for an action
  const getCost = useCallback((action: keyof typeof GRANULAR_CREDIT_COSTS): number => {
    return GRANULAR_CREDIT_COSTS[action];
  }, []);

  // Create a protected function that only executes if credits are sufficient
  const withCreditCheck = useCallback(<T extends any[], R>(
    action: keyof typeof GRANULAR_CREDIT_COSTS,
    fn: (...args: T) => Promise<R> | R,
    options: CreditDeductionOptions = {}
  ) => {
    return async (...args: T): Promise<R | null> => {
      const success = await deductCredits(action, options);
      if (success) {
        return await fn(...args);
      }
      return null;
    };
  }, [deductCredits]);

  // Force purchase redirect for critical actions
  const forcePurchaseRedirect = useCallback((message?: string) => {
    toast.error(message || 'You must purchase credits to continue using this service!', {
      duration: 10000,
      action: {
        label: 'Buy Credits Now',
        onClick: () => navigate('/purchase-credits')
      }
    });
    
    // Force redirect after 2 seconds
    setTimeout(() => {
      navigate('/purchase-credits');
    }, 2000);
  }, [navigate]);

  // Show cost preview before action
  const showCostPreview = useCallback((action: keyof typeof GRANULAR_CREDIT_COSTS, actionName?: string) => {
    const cost = GRANULAR_CREDIT_COSTS[action];
    const name = actionName || action.replace(/_/g, ' ');
    
    if (credits < cost) {
      toast.error(`Cannot proceed: "${name}" costs ${cost} credits but you only have ${credits}`, {
        duration: 5000,
        action: {
          label: 'Buy Credits',
          onClick: () => navigate('/purchase-credits')
        }
      });
      return false;
    } else {
      toast.info(`"${name}" will cost ${cost} credits. You'll have ${credits - cost} remaining.`, {
        duration: 3000
      });
      return true;
    }
  }, [credits, navigate]);

  return {
    deductCredits,
    canAfford,
    getCost,
    withCreditCheck,
    forcePurchaseRedirect,
    showCostPreview,
    credits,
    GRANULAR_CREDIT_COSTS
  };
};

// Utility function to create credit-protected buttons
export const createCreditButton = (
  action: keyof typeof GRANULAR_CREDIT_COSTS,
  buttonText: string,
  onClick: () => void,
  options: CreditDeductionOptions = {}
) => {
  const cost = GRANULAR_CREDIT_COSTS[action];
  return {
    text: `${buttonText} (${cost} credits)`,
    cost,
    action,
    onClick,
    options
  };
};