import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCredits } from '@/contexts/CreditsContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreditsDisplay: React.FC = () => {
  const { t } = useTranslation();
  const { credits } = useCredits();
  const navigate = useNavigate();

  const getCreditsColor = () => {
    if (credits >= 50) return 'bg-green-500';
    if (credits >= 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center space-x-2">
      <Badge variant="secondary" className="flex items-center space-x-1 px-3 py-1">
        <Coins className="h-4 w-4" />
        <span className="font-medium">{credits}</span>
        <span className="text-xs opacity-75">credits</span>
      </Badge>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate('/credits')}
        className="h-8 px-2"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default CreditsDisplay;