import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import StepIndicator from '@/components/StepIndicator';
import VisaTypeSelector from '@/components/VisaTypeSelector';
import PersonalInfoStep from '@/components/PersonalInfoStep';
import DocumentUploadStep from '@/components/DocumentUploadStep';
import AIThinkingStep from '@/components/AIThinkingStep';
import ResultsStep from '@/components/ResultsStep';

interface FormData {
  visaType: string;
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  dateOfBirth: Date | null;
  passportNumber: string;
  passportExpiry: Date | null;
  documents: File[];
  passportPhoto?: File;
}

const Apply: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    visaType: '',
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    dateOfBirth: null,
    passportNumber: '',
    passportExpiry: null,
    documents: []
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const steps = [
    'Visa Type',
    'Personal Info',
    'Documents',
    'AI Processing',
    'Results'
  ];

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFormUpdate = (data: FormData) => {
    setFormData(data);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setFormData({
      visaType: '',
      fullName: '',
      email: '',
      phone: '',
      nationality: '',
      dateOfBirth: null,
      passportNumber: '',
      passportExpiry: null,
      documents: []
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <VisaTypeSelector
            selectedType={formData.visaType}
            onSelect={(type) => handleFormUpdate({ ...formData, visaType: type })}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <PersonalInfoStep
            formData={formData}
            onUpdate={handleFormUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <DocumentUploadStep
            formData={formData}
            onUpdate={handleFormUpdate}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <AIThinkingStep
            onComplete={handleNext}
          />
        );
      case 5:
        return (
          <ResultsStep
            formData={formData}
            onRestart={handleRestart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Thailand Visa Application
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Complete your visa application with AI-powered assistance
          </p>
        </div>

        {/* Step Indicator */}
        {currentStep !== 4 && ( // Hide during AI thinking step
          <StepIndicator
            currentStep={currentStep}
            totalSteps={5}
            steps={steps}
          />
        )}

        {/* Step Content */}
        <div className="transition-all duration-500 ease-in-out">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Apply;