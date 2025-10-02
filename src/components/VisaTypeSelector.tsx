import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Plane, Briefcase, GraduationCap, Clock, Star, Bot } from 'lucide-react';

interface VisaTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
  onNext: () => void;
}

const VisaTypeSelector: React.FC<VisaTypeSelectorProps> = ({ selectedType, onSelect, onNext }) => {
  const { t } = useTranslation();

  const visaTypes = [
    {
      id: 'tourist',
      icon: Plane,
      title: 'Tourist Visa (TR)',
      badge: 'Most Popular',
      description: 'Complete guide and AI-assisted application for tourism and leisure visits.',
      features: [
        'AI document verification',
        'Instant eligibility check',
        'Smart form filling'
      ],
      popular: true,
      borderColor: 'border-blue-500',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
    },
    {
      id: 'business',
      icon: Briefcase,
      title: 'Business Visa (B)',
      badge: 'Professional',
      description: 'AI requirements and document verification for business activities.',
      features: [
        'Business document analysis',
        'Invitation letter verification',
        'Company registration check'
      ],
      borderColor: 'border-purple-500',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
    },
    {
      id: 'education',
      icon: GraduationCap,
      title: 'Education Visa (ED)',
      badge: 'Students',
      description: 'Student visa support with AI guidance for educational institutions.',
      features: [
        'Academic document verification',
        'Institution validation',
        'Financial proof analysis'
      ],
      borderColor: 'border-green-500',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
    },
    {
      id: 'transit',
      icon: Clock,
      title: 'Transit Visa (TS)',
      badge: 'Fast',
      description: 'Quick processing with AI assistance for transit passengers.',
      features: [
        'Flight itinerary verification',
        'Transit time calculation',
        'Express processing'
      ],
      borderColor: 'border-orange-500',
      bgColor: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20'
    },
    {
      id: 'special',
      icon: Star,
      title: 'Special Visas',
      badge: 'Premium',
      description: 'Retirement, Investment, and other special visa categories with AI recommendations.',
      features: [
        'Eligibility assessment',
        'Investment verification',
        'Personalized guidance'
      ],
      borderColor: 'border-red-500',
      bgColor: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20'
    },
    {
      id: 'ai-recommendation',
      icon: Bot,
      title: 'AI Recommendations',
      badge: 'Smart',
      description: 'Let AI analyze your profile and recommend the best visa type for your needs.',
      features: [
        'AI Profile Analysis',
        'Smart Visa Matching',
        'Personalized Recommendations'
      ],
      borderColor: 'border-indigo-500',
      bgColor: 'from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20',
      special: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your Visa Type
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Select the type of visa that best matches your travel purpose to Thailand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {visaTypes.map((visa) => {
          const Icon = visa.icon;
          const isSelected = selectedType === visa.id;
          
          return (
            <Card 
              key={visa.id}
              className={`
                cursor-pointer transition-all duration-300 hover:shadow-lg border-2
                ${isSelected 
                  ? `${visa.borderColor} shadow-lg scale-105` 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }
                ${visa.special ? 'ring-2 ring-indigo-200 dark:ring-indigo-800' : ''}
              `}
              onClick={() => onSelect(visa.id)}
            >
              <CardHeader className={`text-center pb-4 bg-gradient-to-br ${visa.bgColor} rounded-t-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={visa.popular ? "default" : "outline"} className="text-xs">
                    {visa.badge}
                  </Badge>
                  {isSelected && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Icon className="w-8 h-8 text-gray-700" />
                </div>
                <CardTitle className="text-lg font-bold">{visa.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-sm mb-4 text-center">
                  {visa.description}
                </CardDescription>
                <ul className="space-y-2">
                  {visa.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button 
          onClick={onNext}
          disabled={!selectedType}
          size="lg"
          className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default VisaTypeSelector;