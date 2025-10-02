import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, TrendingUp, FileText, Clock, Star, Download, Share } from 'lucide-react';

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

interface ResultsStepProps {
  formData: FormData;
  onRestart: () => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ formData, onRestart }) => {
  const { t } = useTranslation();

  // Simulate AI analysis results
  const analysisResults = {
    approvalProbability: 92,
    riskLevel: 'low',
    processingTime: '3-5 business days',
    recommendations: [
      {
        type: 'success',
        title: 'Strong Application Profile',
        description: 'Your application shows excellent compliance with visa requirements'
      },
      {
        type: 'warning',
        title: 'Bank Statement Recommendation',
        description: 'Consider including additional financial documents for stronger application'
      },
      {
        type: 'info',
        title: 'Travel Insurance Suggested',
        description: 'Adding travel insurance can improve your application strength'
      }
    ],
    nextSteps: [
      'Submit Application',
      'Pay Application Fees',
      'Track Application Status',
      'Receive Your Visa'
    ]
  };

  const getApprovalColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getApprovalBadge = (probability: number) => {
    if (probability >= 80) return { text: 'Excellent', variant: 'default' as const };
    if (probability >= 60) return { text: 'Good', variant: 'secondary' as const };
    return { text: 'Needs Improvement', variant: 'destructive' as const };
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <FileText className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          AI Analysis Results
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Here are your personalized visa application insights and recommendations.
        </p>
      </div>

      {/* Approval Probability */}
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-500" />
              Approval Probability
            </span>
            <Badge {...getApprovalBadge(analysisResults.approvalProbability)}>
              {getApprovalBadge(analysisResults.approvalProbability).text}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <div className={`text-6xl font-bold ${getApprovalColor(analysisResults.approvalProbability)}`}>
              {analysisResults.approvalProbability}%
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Based on AI analysis of your application
            </p>
          </div>
          <Progress 
            value={analysisResults.approvalProbability} 
            className="w-full h-3"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </CardContent>
      </Card>

      {/* Processing Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Expected Processing Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {analysisResults.processingTime}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Estimated time for visa processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Application Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Visa Type:</span>
                <span className="font-medium">{formData.visaType || 'Tourist Visa'}</span>
              </div>
              <div className="flex justify-between">
                <span>Nationality:</span>
                <span className="font-medium">{formData.nationality || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span>Documents:</span>
                <span className="font-medium">{formData.documents?.length || 0} files</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
            AI Recommendations
          </CardTitle>
          <CardDescription>
            Personalized suggestions to improve your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysisResults.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {getRecommendationIcon(rec.type)}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {rec.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {rec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysisResults.nextSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-700 dark:text-gray-300">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg"
          className="px-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          <FileText className="w-5 h-5 mr-2" />
          Submit Application
        </Button>
        <Button 
          variant="outline"
          size="lg"
          className="px-6"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Report
        </Button>
        <Button 
          variant="outline"
          size="lg"
          className="px-6"
        >
          <Share className="w-5 h-5 mr-2" />
          Share Results
        </Button>
        <Button 
          variant="ghost"
          size="lg"
          onClick={onRestart}
          className="px-6"
        >
          Start New Application
        </Button>
      </div>
    </div>
  );
};

export default ResultsStep;