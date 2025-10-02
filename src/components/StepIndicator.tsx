import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, steps }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        {/* Step Circles */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${isCompleted 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                    : isCurrent 
                      ? 'bg-white border-4 border-blue-500 text-blue-500 shadow-lg' 
                      : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                  }
                `}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                <span className={`
                  mt-2 text-xs text-center max-w-20 transition-colors duration-300
                  ${isCurrent 
                    ? 'text-blue-600 font-semibold dark:text-blue-400' 
                    : isCompleted 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : 'text-gray-500 dark:text-gray-400'
                  }
                `}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Step Counter */}
      <div className="text-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default StepIndicator;