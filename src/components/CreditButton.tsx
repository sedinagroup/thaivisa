import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Loader2 } from 'lucide-react';
import { useCreditConsumption, CreditServiceKey } from '@/hooks/useCreditConsumption';
import { cn } from '@/lib/utils';

interface CreditButtonProps {
  serviceKey: CreditServiceKey;
  onSuccess?: () => void;
  onInsufficientCredits?: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
  showCreditCost?: boolean;
  customDescription?: string;
}

const CreditButton: React.FC<CreditButtonProps> = ({
  serviceKey,
  onSuccess,
  onInsufficientCredits,
  children,
  variant = 'default',
  size = 'default',
  className,
  disabled = false,
  showCreditCost = true,
  customDescription
}) => {
  const {
    checkSufficientCredits,
    consumeCreditsForService,
    getCreditCost,
    isProcessing
  } = useCreditConsumption();
  
  const [isExecuting, setIsExecuting] = useState(false);
  const creditCost = getCreditCost(serviceKey);
  const hasSufficientCredits = checkSufficientCredits(serviceKey);

  const handleClick = async () => {
    if (disabled || isExecuting || isProcessing) return;

    if (!hasSufficientCredits) {
      onInsufficientCredits?.();
      return;
    }

    setIsExecuting(true);
    
    try {
      const success = await consumeCreditsForService(serviceKey, customDescription);
      if (success) {
        onSuccess?.();
      }
    } catch (error) {
      console.error('Credit consumption failed:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const isLoading = isExecuting || isProcessing;

  return (
    <div className="flex flex-col items-center space-y-2">
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        disabled={disabled || isLoading || !hasSufficientCredits}
        className={cn(
          'relative',
          !hasSufficientCredits && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {children}
      </Button>
      
      {showCreditCost && (
        <Badge 
          variant={hasSufficientCredits ? "outline" : "destructive"}
          className="flex items-center space-x-1 text-xs"
        >
          <Coins className="h-3 w-3" />
          <span>{creditCost} credits</span>
        </Badge>
      )}
    </div>
  );
};

export default CreditButton;