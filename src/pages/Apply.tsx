import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCreditDeduction } from '@/hooks/useCreditDeduction';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Coins,
  CreditCard,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

const Apply: React.FC = () => {
  const { user } = useAuth();
  const { deductCredits, canAfford, getCost, credits, forcePurchaseRedirect } = useCreditDeduction();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    visaType: '',
    nationality: '',
    purpose: '',
    duration: '',
    passportFile: null as File | null,
    documents: [] as File[],
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: ''
    }
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Check credits on component mount
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Charge for loading the premium application page
    if (credits > 0) {
      deductCredits('page_load_premium', { 
        showCost: false,
        actionDescription: t('apply.loadingPage')
      });
    }
  }, [user, navigate, deductCredits, credits, t]);

  const visaTypes = [
    { value: 'tourist', label: t('apply.visaTypes.tourist'), description: t('apply.visaTypes.touristDesc') },
    { value: 'business', label: t('apply.visaTypes.business'), description: t('apply.visaTypes.businessDesc') },
    { value: 'education', label: t('apply.visaTypes.education'), description: t('apply.visaTypes.educationDesc') },
    { value: 'retirement', label: t('apply.visaTypes.retirement'), description: t('apply.visaTypes.retirementDesc') },
    { value: 'marriage', label: t('apply.visaTypes.marriage'), description: t('apply.visaTypes.marriageDesc') },
    { value: 'work', label: t('apply.visaTypes.work'), description: t('apply.visaTypes.workDesc') }
  ];

  const handleVisaTypeSelect = async (value: string) => {
    // Charge credits for selecting visa type
    const success = await deductCredits('visa_select_type', {
      actionDescription: t('apply.actions.selectedVisa', { type: value })
    });
    
    if (success) {
      setFormData({ ...formData, visaType: value });
    }
  };

  const handleContinue = async () => {
    // Check if user can afford to continue
    if (!canAfford('visa_continue_step')) {
      forcePurchaseRedirect(t('apply.errors.needMoreCredits'));
      return;
    }

    // Validate current step
    if (currentStep === 1 && !formData.visaType) {
      toast.error(t('apply.errors.selectVisaType'));
      return;
    }

    if (currentStep === 2 && (!formData.nationality || !formData.purpose)) {
      toast.error(t('apply.errors.fillRequiredFields'));
      return;
    }

    if (currentStep === 3 && !formData.passportFile) {
      toast.error(t('apply.errors.uploadPassport'));
      return;
    }

    if (currentStep === 4 && formData.documents.length === 0) {
      toast.error(t('apply.errors.uploadDocuments'));
      return;
    }

    // Deduct credits for continuing to next step
    const success = await deductCredits('visa_continue_step', {
      actionDescription: t('apply.actions.continueStep', { step: currentStep + 1 })
    });

    if (success) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleFinalSubmission();
      }
    }
  };

  const handlePassportUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if user can afford passport upload + OCR
    const uploadCost = getCost('visa_upload_passport');
    const ocrCost = getCost('visa_ocr_processing');
    const totalCost = uploadCost + ocrCost;

    if (credits < totalCost) {
      forcePurchaseRedirect(t('apply.errors.passportUploadCost', { totalCost, credits }));
      return;
    }

    // Deduct credits for passport upload
    const uploadSuccess = await deductCredits('visa_upload_passport', {
      actionDescription: t('apply.actions.uploadPassport')
    });

    if (uploadSuccess) {
      setFormData({ ...formData, passportFile: file });
      
      // Simulate OCR processing and deduct credits
      toast.info(t('apply.processing.ocrPassport'), { duration: 2000 });
      
      setTimeout(async () => {
        const ocrSuccess = await deductCredits('visa_ocr_processing', {
          actionDescription: t('apply.actions.ocrAnalysis')
        });
        
        if (ocrSuccess) {
          toast.success(t('apply.success.passportProcessed'));
        }
      }, 2000);
    }
  };

  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Check if user can afford document upload
    if (!canAfford('visa_upload_documents')) {
      forcePurchaseRedirect(t('apply.errors.needCreditsDocuments'));
      return;
    }

    const success = await deductCredits('visa_upload_documents', {
      actionDescription: t('apply.actions.uploadDocuments', { count: files.length })
    });

    if (success) {
      setFormData({ ...formData, documents: [...formData.documents, ...files] });
      
      // Charge for document analysis
      setTimeout(async () => {
        const analysisSuccess = await deductCredits('visa_document_analysis', {
          actionDescription: t('apply.actions.documentAnalysis')
        });
        
        if (analysisSuccess) {
          toast.success(t('apply.success.documentsAnalyzed'));
        }
      }, 1500);
    }
  };

  const handleFinalSubmission = async () => {
    // Final analysis is the most expensive operation
    const success = await deductCredits('visa_final_analysis', {
      confirmBeforeAction: true,
      actionDescription: t('apply.actions.finalAnalysis')
    });

    if (success) {
      toast.success(t('apply.success.applicationSubmitted'));
      
      // Charge for generating final report
      setTimeout(async () => {
        await deductCredits('visa_generate_report', {
          actionDescription: t('apply.actions.generateReport')
        });
        navigate('/profile');
      }, 2000);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">{t('apply.steps.selectVisaType')}</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visaTypes.map((visa) => (
                  <Card 
                    key={visa.value} 
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      formData.visaType === visa.value ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleVisaTypeSelect(visa.value)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{visa.label}</h3>
                        <Badge variant="outline" className="text-xs">
                          <Coins className="w-3 h-3 mr-1" />
                          {getCost('visa_select_type')} {t('credits.credits')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{visa.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nationality">{t('apply.form.nationality')}</Label>
                <Select value={formData.nationality} onValueChange={(value) => setFormData({ ...formData, nationality: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('apply.form.selectNationality')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">{t('apply.countries.us')}</SelectItem>
                    <SelectItem value="uk">{t('apply.countries.uk')}</SelectItem>
                    <SelectItem value="ca">{t('apply.countries.ca')}</SelectItem>
                    <SelectItem value="au">{t('apply.countries.au')}</SelectItem>
                    <SelectItem value="de">{t('apply.countries.de')}</SelectItem>
                    <SelectItem value="fr">{t('apply.countries.fr')}</SelectItem>
                    <SelectItem value="jp">{t('apply.countries.jp')}</SelectItem>
                    <SelectItem value="other">{t('apply.countries.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="purpose">{t('apply.form.purpose')}</Label>
                <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('apply.form.selectPurpose')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tourism">{t('apply.purposes.tourism')}</SelectItem>
                    <SelectItem value="business">{t('apply.purposes.business')}</SelectItem>
                    <SelectItem value="education">{t('apply.purposes.education')}</SelectItem>
                    <SelectItem value="medical">{t('apply.purposes.medical')}</SelectItem>
                    <SelectItem value="family">{t('apply.purposes.family')}</SelectItem>
                    <SelectItem value="other">{t('apply.purposes.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="duration">{t('apply.form.duration')}</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('apply.form.selectDuration')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-7">{t('apply.durations.1-7')}</SelectItem>
                  <SelectItem value="8-15">{t('apply.durations.8-15')}</SelectItem>
                  <SelectItem value="16-30">{t('apply.durations.16-30')}</SelectItem>
                  <SelectItem value="31-60">{t('apply.durations.31-60')}</SelectItem>
                  <SelectItem value="61-90">{t('apply.durations.61-90')}</SelectItem>
                  <SelectItem value="90+">{t('apply.durations.90+')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">{t('apply.steps.uploadPassport')}</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="mb-4">
                  <p className="text-lg font-medium">{t('apply.upload.passportTitle')}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {t('apply.upload.passportDesc')}
                  </p>
                  <Badge variant="destructive" className="mt-2">
                    <Zap className="w-3 h-3 mr-1" />
                    {t('apply.costs.passportUpload', { cost: getCost('visa_upload_passport') + getCost('visa_ocr_processing') })}
                  </Badge>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePassportUpload}
                  className="max-w-xs mx-auto"
                />
                {formData.passportFile && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 inline mr-2" />
                    <span className="text-green-700">{t('apply.status.passportUploaded')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">{t('apply.steps.uploadDocuments')}</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="mb-4">
                  <p className="text-lg font-medium">{t('apply.upload.documentsTitle')}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {t('apply.upload.documentsDesc')}
                  </p>
                  <Badge variant="destructive" className="mt-2">
                    <Zap className="w-3 h-3 mr-1" />
                    {t('apply.costs.documentsUpload', { cost: getCost('visa_upload_documents') + getCost('visa_document_analysis') })}
                  </Badge>
                </div>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleDocumentUpload}
                  className="max-w-xs mx-auto"
                />
                {formData.documents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.documents.map((doc, index) => (
                      <div key={index} className="p-2 bg-blue-50 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-blue-700 text-sm">{doc.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">{t('apply.review.title')}</h2>
              <p className="text-gray-600 mb-6">
                {t('apply.review.description')}
              </p>
              
              <Card className="bg-red-50 border-red-200 mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <span className="font-bold text-red-700">{t('apply.review.finalCost')}</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {getCost('visa_final_analysis')} {t('credits.credits')}
                  </div>
                  <p className="text-sm text-red-600">
                    {t('apply.review.finalCostDesc')}
                  </p>
                </CardContent>
              </Card>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3">{t('apply.review.summary')}:</h3>
                <div className="text-left space-y-2 text-sm">
                  <div><strong>{t('apply.form.visaType')}:</strong> {formData.visaType}</div>
                  <div><strong>{t('apply.form.nationality')}:</strong> {formData.nationality}</div>
                  <div><strong>{t('apply.form.purpose')}:</strong> {formData.purpose}</div>
                  <div><strong>{t('apply.form.duration')}:</strong> {formData.duration}</div>
                  <div><strong>{t('apply.form.passport')}:</strong> {formData.passportFile ? t('apply.status.uploaded') : t('apply.status.notUploaded')}</div>
                  <div><strong>{t('apply.form.documents')}:</strong> {t('apply.status.filesUploaded', { count: formData.documents.length })}</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('apply.auth.loginRequired')}</h2>
            <p className="mb-4">{t('apply.auth.loginMessage')}</p>
            <Button onClick={() => navigate('/login')}>{t('nav.login')}</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Credits */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('apply.title')}
            </h1>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-lg px-3 py-1">
                <Coins className="w-4 h-4 mr-1" />
                {credits} {t('credits.credits')}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/pricing')}
              >
                <CreditCard className="w-4 h-4 mr-1" />
                {t('credits.purchase')}
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{t('apply.progress.step', { current: currentStep, total: totalSteps })}</span>
              <span>{t('apply.progress.complete', { percent: Math.round(progress) })}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Low Credits Warning */}
          {credits < 100 && (
            <Card className="bg-yellow-50 border-yellow-200 mb-4">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                  <div>
                    <p className="text-yellow-800 font-medium">{t('apply.warnings.lowCredits')}</p>
                    <p className="text-yellow-700 text-sm">
                      {t('apply.warnings.lowCreditsDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>{t('apply.progress.step', { current: currentStep, total: '' })}: {
              currentStep === 1 ? t('apply.steps.selectVisa') :
              currentStep === 2 ? t('apply.steps.basicInfo') :
              currentStep === 3 ? t('apply.steps.passport') :
              currentStep === 4 ? t('apply.steps.documents') :
              t('apply.steps.review')
            }</CardTitle>
            <CardDescription>
              {currentStep === 1 && t('apply.stepDescriptions.step1')}
              {currentStep === 2 && t('apply.stepDescriptions.step2')}
              {currentStep === 3 && t('apply.stepDescriptions.step3')}
              {currentStep === 4 && t('apply.stepDescriptions.step4')}
              {currentStep === 5 && t('apply.stepDescriptions.step5')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('tripPlanner.navigation.previous')}
          </Button>
          
          <Button
            onClick={handleContinue}
            disabled={!canAfford(currentStep === totalSteps ? 'visa_final_analysis' : 'visa_continue_step')}
            className="min-w-[200px]"
          >
            {currentStep === totalSteps ? (
              <>
                {t('apply.actions.submitApplication')}
                <Zap className="w-4 h-4 ml-2" />
                ({getCost('visa_final_analysis')} {t('credits.credits')})
              </>
            ) : (
              <>
                {t('tripPlanner.navigation.next')}
                <ArrowRight className="w-4 h-4 ml-2" />
                ({getCost('visa_continue_step')} {t('credits.credits')})
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Apply;