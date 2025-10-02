import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Brain, FileCheck, Shield, Zap, CheckCircle } from 'lucide-react';

interface AIThinkingStepProps {
  onComplete: () => void;
}

const AIThinkingStep: React.FC<AIThinkingStepProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const thinkingSteps = [
    {
      icon: FileCheck,
      title: 'Analyzing your documents',
      description: 'AI is scanning and verifying all uploaded documents with advanced OCR technology',
      duration: 2000
    },
    {
      icon: Shield,
      title: 'Verifying requirements',
      description: 'Checking compliance with Thailand visa requirements and regulations',
      duration: 1500
    },
    {
      icon: Brain,
      title: 'Calculating approval probability',
      description: 'AI is analyzing your profile against successful visa applications database',
      duration: 2500
    },
    {
      icon: Zap,
      title: 'Preparing recommendations',
      description: 'Generating personalized suggestions to optimize your application',
      duration: 1000
    }
  ];

  useEffect(() => {
    const processSteps = async () => {
      for (let i = 0; i < thinkingSteps.length; i++) {
        setCurrentStep(i);
        
        // Wait for the step duration
        await new Promise(resolve => setTimeout(resolve, thinkingSteps[i].duration));
        
        // Mark step as completed
        setCompletedSteps(prev => [...prev, i]);
        
        // Small pause before next step
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Final pause before completing
      await new Promise(resolve => setTimeout(resolve, 500));
      onComplete();
    };

    processSteps();
  }, [onComplete]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Bot className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          THINKNEO AI is Analyzing Your Application
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Our advanced AI is processing your information and documents to provide personalized recommendations.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="space-y-6">
            {thinkingSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = completedSteps.includes(index);
              const isPending = index > currentStep;

              return (
                <div key={index} className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500
                    ${isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white animate-pulse' 
                        : 'bg-gray-200 text-gray-400 dark:bg-gray-700'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className={`w-6 h-6 ${isActive ? 'animate-spin' : ''}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`
                      text-lg font-semibold transition-colors duration-300
                      ${isCompleted 
                        ? 'text-green-600 dark:text-green-400' 
                        : isActive 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-500 dark:text-gray-400'
                      }
                    `}>
                      {step.title}
                    </h3>
                    <p className={`
                      text-sm transition-colors duration-300
                      ${isCompleted 
                        ? 'text-gray-700 dark:text-gray-300' 
                        : isActive 
                          ? 'text-gray-600 dark:text-gray-400' 
                          : 'text-gray-400 dark:text-gray-500'
                      }
                    `}>
                      {step.description}
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center">
                    {isCompleted && (
                      <div className="text-green-500 font-medium text-sm">
                        Completed
                      </div>
                    )}
                    {isActive && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Analysis Progress</span>
              <span>{Math.round(((completedSteps.length + (currentStep < thinkingSteps.length ? 0.5 : 0)) / thinkingSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${((completedSteps.length + (currentStep < thinkingSteps.length ? 0.5 : 0)) / thinkingSteps.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floating AI Particles Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-bounce"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AIThinkingStep;