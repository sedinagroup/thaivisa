import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { applicationService } from '@/services/applicationService';
import { EligibilityAssessment, VisaType, ApplicationData } from '@/types/application';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Brain, 
  FileText, 
  User, 
  Plane, 
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

const ApplicationForm: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [eligibilityData, setEligibilityData] = useState<EligibilityAssessment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [applicationData, setApplicationData] = useState<Partial<ApplicationData>>({
    personalInfo: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      nationality: user?.nationality || '',
      passportNumber: '',
      dateOfBirth: user?.dateOfBirth || '',
      placeOfBirth: '',
      gender: 'male',
      maritalStatus: 'single',
    },
    travelInfo: {
      visaType: 'tourist',
      travelPurpose: '',
      intendedArrivalDate: '',
      intendedDepartureDate: '',
      durationDays: 30,
      portOfEntry: 'Bangkok (BKK)',
      accommodationDetails: {
        type: 'hotel',
        name: '',
        address: '',
        contactNumber: '',
      },
      previousVisits: [],
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phoneNumber: '',
      email: '',
      address: '',
    },
    additionalInfo: '',
  });

  const steps = [
    { id: 'eligibility', title: t('application.steps.eligibility'), icon: Brain },
    { id: 'personal', title: t('application.steps.personalInfo'), icon: User },
    { id: 'travel', title: t('application.steps.travelInfo'), icon: Plane },
    { id: 'documents', title: t('application.steps.documents'), icon: Upload },
    { id: 'review', title: t('application.steps.review'), icon: CheckCircle },
  ];

  const visaTypes: { value: VisaType; label: string }[] = [
    { value: 'tourist', label: t('visaTypes.tourist') },
    { value: 'business', label: t('visaTypes.business') },
    { value: 'transit', label: t('visaTypes.transit') },
    { value: 'education', label: t('visaTypes.education') },
    { value: 'work', label: t('visaTypes.work') },
    { value: 'retirement', label: t('visaTypes.retirement') },
  ];

  const handleEligibilityCheck = async () => {
    if (!applicationData.travelInfo) return;
    
    setIsLoading(true);
    try {
      const assessment = await applicationService.assessEligibility({
        nationality: user?.nationality || '',
        visaType: applicationData.travelInfo.visaType,
        travelPurpose: applicationData.travelInfo.travelPurpose,
        durationDays: applicationData.travelInfo.durationDays,
        previousVisits: applicationData.travelInfo.previousVisits || [],
        backgroundInfo: {},
      });
      
      setEligibilityData(assessment);
      
      if (assessment.eligible) {
        toast.success(t('application.eligibility.eligible'));
      } else {
        toast.warning(t('application.eligibility.notEligible'));
      }
    } catch (error) {
      toast.error('Failed to assess eligibility');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const application = await applicationService.createApplication(applicationData as ApplicationData);
      toast.success('Application created successfully!');
      navigate(`/status/${application.id}`);
    } catch (error) {
      toast.error('Failed to create application');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setApplicationData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo!,
        [field]: value,
      },
    }));
  };

  const updateTravelInfo = (field: string, value: string | number | Record<string, string>) => {
    setApplicationData(prev => ({
      ...prev,
      travelInfo: {
        ...prev.travelInfo!,
        [field]: value,
      },
    }));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('application.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Complete your Thailand visa application with AI assistance
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <step.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs mt-2 hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card>
          <CardContent className="p-8">
            {/* Step 0: Eligibility Check */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('application.eligibility.title')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {t('application.eligibility.description')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>{t('application.eligibility.nationality')}</Label>
                    <Input value={user?.nationality || ''} disabled />
                  </div>
                  <div>
                    <Label>{t('application.eligibility.visaType')}</Label>
                    <Select
                      value={applicationData.travelInfo?.visaType}
                      onValueChange={(value: VisaType) => updateTravelInfo('visaType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {visaTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{t('application.eligibility.travelPurpose')}</Label>
                    <Input
                      value={applicationData.travelInfo?.travelPurpose || ''}
                      onChange={(e) => updateTravelInfo('travelPurpose', e.target.value)}
                      placeholder="Tourism, business meeting, etc."
                    />
                  </div>
                  <div>
                    <Label>{t('application.eligibility.duration')}</Label>
                    <Input
                      type="number"
                      value={applicationData.travelInfo?.durationDays || 30}
                      onChange={(e) => updateTravelInfo('durationDays', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleEligibilityCheck} 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t('application.eligibility.checkEligibility')}
                </Button>

                {eligibilityData && (
                  <Card className={`mt-6 ${eligibilityData.eligible ? 'border-green-200' : 'border-yellow-200'}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {eligibilityData.eligible ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                        )}
                        {eligibilityData.eligible 
                          ? t('application.eligibility.eligible')
                          : t('application.eligibility.notEligible')
                        }
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label>{t('application.eligibility.confidence')}</Label>
                          <div className="flex items-center space-x-2">
                            <Progress value={eligibilityData.confidence * 100} className="flex-1" />
                            <span className="text-sm font-medium">
                              {Math.round(eligibilityData.confidence * 100)}%
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <Label>{t('application.eligibility.requirements')}</Label>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {eligibilityData.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>{t('application.eligibility.processingTime')}</Label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {eligibilityData.processingTimeEstimate}
                            </p>
                          </div>
                          <div>
                            <Label>{t('application.eligibility.fee')}</Label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {eligibilityData.feeEstimate.amount} {eligibilityData.feeEstimate.currency}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('application.personalInfo.title')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>{t('application.personalInfo.firstName')}</Label>
                    <Input
                      value={applicationData.personalInfo?.firstName || ''}
                      onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>{t('application.personalInfo.lastName')}</Label>
                    <Input
                      value={applicationData.personalInfo?.lastName || ''}
                      onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>{t('application.personalInfo.nationality')}</Label>
                    <Input
                      value={applicationData.personalInfo?.nationality || ''}
                      onChange={(e) => updatePersonalInfo('nationality', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>{t('application.personalInfo.passportNumber')}</Label>
                    <Input
                      value={applicationData.personalInfo?.passportNumber || ''}
                      onChange={(e) => updatePersonalInfo('passportNumber', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>{t('application.personalInfo.dateOfBirth')}</Label>
                    <Input
                      type="date"
                      value={applicationData.personalInfo?.dateOfBirth || ''}
                      onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>{t('application.personalInfo.placeOfBirth')}</Label>
                    <Input
                      value={applicationData.personalInfo?.placeOfBirth || ''}
                      onChange={(e) => updatePersonalInfo('placeOfBirth', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>{t('application.personalInfo.gender')}</Label>
                    <Select
                      value={applicationData.personalInfo?.gender}
                      onValueChange={(value) => updatePersonalInfo('gender', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{t('application.personalInfo.maritalStatus')}</Label>
                    <Select
                      value={applicationData.personalInfo?.maritalStatus}
                      onValueChange={(value) => updatePersonalInfo('maritalStatus', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Travel Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Plane className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('application.travelInfo.title')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>{t('application.travelInfo.arrivalDate')}</Label>
                    <Input
                      type="date"
                      value={applicationData.travelInfo?.intendedArrivalDate || ''}
                      onChange={(e) => updateTravelInfo('intendedArrivalDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>{t('application.travelInfo.departureDate')}</Label>
                    <Input
                      type="date"
                      value={applicationData.travelInfo?.intendedDepartureDate || ''}
                      onChange={(e) => updateTravelInfo('intendedDepartureDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>{t('application.travelInfo.portOfEntry')}</Label>
                    <Select
                      value={applicationData.travelInfo?.portOfEntry}
                      onValueChange={(value) => updateTravelInfo('portOfEntry', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bangkok (BKK)">Bangkok (BKK)</SelectItem>
                        <SelectItem value="Phuket (HKT)">Phuket (HKT)</SelectItem>
                        <SelectItem value="Chiang Mai (CNX)">Chiang Mai (CNX)</SelectItem>
                        <SelectItem value="Hat Yai (HDY)">Hat Yai (HDY)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{t('application.travelInfo.accommodationType')}</Label>
                    <Select
                      value={applicationData.travelInfo?.accommodationDetails.type}
                      onValueChange={(value) => updateTravelInfo('accommodationDetails', {
                        ...applicationData.travelInfo?.accommodationDetails,
                        type: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="private">Private Residence</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label>{t('application.travelInfo.accommodationName')}</Label>
                    <Input
                      value={applicationData.travelInfo?.accommodationDetails.name || ''}
                      onChange={(e) => updateTravelInfo('accommodationDetails', {
                        ...applicationData.travelInfo?.accommodationDetails,
                        name: e.target.value
                      })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>{t('application.travelInfo.accommodationAddress')}</Label>
                    <Textarea
                      value={applicationData.travelInfo?.accommodationDetails.address || ''}
                      onChange={(e) => updateTravelInfo('accommodationDetails', {
                        ...applicationData.travelInfo?.accommodationDetails,
                        address: e.target.value
                      })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('application.documents.title')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['passport', 'photo', 'bankStatement', 'flightTicket', 'hotelBooking'].map((docType) => (
                    <Card key={docType} className="border-dashed border-2 hover:border-blue-300 transition-colors">
                      <CardContent className="p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          {t(`application.documents.${docType}`)}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {t('application.documents.dragDrop')}
                        </p>
                        <Button variant="outline" size="sm">
                          {t('application.documents.uploadDocument')}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('application.review.title')}
                  </h2>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('application.review.personalInfo')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Name:</span> {applicationData.personalInfo?.firstName} {applicationData.personalInfo?.lastName}
                        </div>
                        <div>
                          <span className="font-medium">Nationality:</span> {applicationData.personalInfo?.nationality}
                        </div>
                        <div>
                          <span className="font-medium">Passport:</span> {applicationData.personalInfo?.passportNumber}
                        </div>
                        <div>
                          <span className="font-medium">Date of Birth:</span> {applicationData.personalInfo?.dateOfBirth}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t('application.review.travelInfo')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Visa Type:</span> {t(`visaTypes.${applicationData.travelInfo?.visaType}`)}
                        </div>
                        <div>
                          <span className="font-medium">Purpose:</span> {applicationData.travelInfo?.travelPurpose}
                        </div>
                        <div>
                          <span className="font-medium">Arrival:</span> {applicationData.travelInfo?.intendedArrivalDate}
                        </div>
                        <div>
                          <span className="font-medium">Departure:</span> {applicationData.travelInfo?.intendedDepartureDate}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="declaration" />
                    <Label htmlFor="declaration" className="text-sm">
                      {t('application.review.declaration')}
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('common.previous')}
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={currentStep === 0 && !eligibilityData?.eligible}
                >
                  {t('common.next')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t('application.review.submitApplication')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationForm;