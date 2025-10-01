import React from 'react';
import { useCredits } from '@/contexts/CreditsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  Lock, 
  FileText, 
  Shield, 
  Award,
  Coins
} from 'lucide-react';

const StageProgress: React.FC = () => {
  const { 
    currentStage, 
    applicationStages, 
    getStageCreditsUsed, 
    canAccessStage,
    credits 
  } = useCredits();

  const stages = [
    {
      id: 'initial' as const,
      title: 'Initial Application',
      description: 'Data collection and document upload',
      icon: FileText,
      maxCredits: 250,
      color: 'blue'
    },
    {
      id: 'compliance' as const,
      title: 'Compliance Review',
      description: 'Document verification and compliance check',
      icon: Shield,
      maxCredits: 500,
      color: 'purple'
    },
    {
      id: 'final' as const,
      title: 'Final Submission',
      description: 'Official visa application submission',
      icon: Award,
      maxCredits: 1000,
      color: 'green'
    }
  ];

  const getStageStatus = (stageId: 'initial' | 'compliance' | 'final') => {
    const stage = applicationStages.find(s => s.stage === stageId);
    if (stage?.completed) return 'completed';
    if (currentStage === stageId) return 'current';
    if (canAccessStage(stageId)) return 'available';
    return 'locked';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'available':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return <Lock className="h-5 w-5 text-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'current':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      case 'available':
        return 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700';
      default:
        return 'bg-gray-50 border-gray-200 opacity-60 dark:bg-gray-800 dark:border-gray-700';
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>Application Progress</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-amber-500" />
            <span className="font-semibold">{credits} credits</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const status = getStageStatus(stage.id);
            const creditsUsed = getStageCreditsUsed(stage.id);
            const progress = Math.min((creditsUsed / stage.maxCredits) * 100, 100);

            return (
              <div key={stage.id} className="relative">
                {/* Connection line */}
                {index < stages.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200 dark:bg-gray-700" />
                )}
                
                <div className={`flex items-start space-x-4 p-4 rounded-lg border ${getStatusColor(status)}`}>
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      status === 'completed' ? 'bg-green-100 dark:bg-green-900/40' :
                      status === 'current' ? 'bg-blue-100 dark:bg-blue-900/40' :
                      status === 'available' ? 'bg-gray-100 dark:bg-gray-800' :
                      'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <stage.icon className={`h-6 w-6 ${
                        status === 'completed' ? 'text-green-600' :
                        status === 'current' ? 'text-blue-600' :
                        'text-gray-400'
                      }`} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {stage.title}
                        </h3>
                        {getStatusIcon(status)}
                      </div>
                      
                      <Badge variant={
                        status === 'completed' ? 'default' :
                        status === 'current' ? 'secondary' :
                        'outline'
                      }>
                        {status === 'completed' ? 'Completed' :
                         status === 'current' ? 'In Progress' :
                         status === 'available' ? 'Available' :
                         'Locked'}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {stage.description}
                    </p>
                    
                    {status !== 'locked' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Credits used:</span>
                          <span className="font-medium">
                            {creditsUsed} / {stage.maxCredits} credits
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StageProgress;