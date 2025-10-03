import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCreditDeduction } from '@/hooks/useCreditDeduction';
import { useNavigate } from 'react-router-dom';
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
        actionDescription: 'Loading visa application page'
      });
    }
  }, [user, navigate, deductCredits, credits]);

  const visaTypes = [
    { value: 'tourist', label: 'Tourist Visa (TR)', description: 'For tourism and leisure' },
    { value: 'business', label: 'Business Visa (B)', description: 'For business activities' },
    { value: 'education', label: 'Education Visa (ED)', description: 'For studying in Thailand' },
    { value: 'retirement', label: 'Retirement Visa (O-A)', description: 'For retirees over 50' },
    { value: 'marriage', label: 'Marriage Visa (O)', description: 'For married to Thai national' },
    { value: 'work', label: 'Work Visa (Non-B)', description: 'For employment in Thailand' }
  ];

  const handleVisaTypeSelect = async (value: string) => {
    // Charge credits for selecting visa type
    const success = await deductCredits('visa_select_type', {
      actionDescription: `Selected ${value} visa type`
    });
    
    if (success) {
      setFormData({ ...formData, visaType: value });
    }
  };

  const handleContinue = async () => {
    // Check if user can afford to continue
    if (!canAfford('visa_continue_step')) {
      forcePurchaseRedirect('You need more credits to continue with your visa application!');
      return;
    }

    // Validate current step
    if (currentStep === 1 && !formData.visaType) {
      toast.error('Please select a visa type first');
      return;
    }

    if (currentStep === 2 && (!formData.nationality || !formData.purpose)) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (currentStep === 3 && !formData.passportFile) {
      toast.error('Please upload your passport photo');
      return;
    }

    if (currentStep === 4 && formData.documents.length === 0) {
      toast.error('Please upload at least one supporting document');
      return;
    }

    // Deduct credits for continuing to next step
    const success = await deductCredits('visa_continue_step', {
      actionDescription: `Continue to step ${currentStep + 1}`
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
      forcePurchaseRedirect(`Passport upload and OCR processing requires ${totalCost} credits. You only have ${credits}.`);
      return;
    }

    // Deduct credits for passport upload
    const uploadSuccess = await deductCredits('visa_upload_passport', {
      actionDescription: 'Upload passport photo'
    });

    if (uploadSuccess) {
      setFormData({ ...formData, passportFile: file });
      
      // Simulate OCR processing and deduct credits
      toast.info('Processing passport with OCR...', { duration: 2000 });
      
      setTimeout(async () => {
        const ocrSuccess = await deductCredits('visa_ocr_processing', {
          actionDescription: 'OCR passport analysis'
        });
        
        if (ocrSuccess) {
          toast.success('Passport processed successfully! OCR data extracted.');
        }
      }, 2000);
    }
  };

  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Check if user can afford document upload
    if (!canAfford('visa_upload_documents')) {
      forcePurchaseRedirect('You need more credits to upload documents!');
      return;
    }

    const success = await deductCredits('visa_upload_documents', {
      actionDescription: `Upload ${files.length} documents`
    });

    if (success) {
      setFormData({ ...formData, documents: [...formData.documents, ...files] });
      
      // Charge for document analysis
      setTimeout(async () => {
        const analysisSuccess = await deductCredits('visa_document_analysis', {
          actionDescription: 'AI document analysis'
        });
        
        if (analysisSuccess) {
          toast.success('Documents analyzed successfully!');
        }
      }, 1500);
    }
  };

  const handleFinalSubmission = async () => {
    // Final analysis is the most expensive operation
    const success = await deductCredits('visa_final_analysis', {
      confirmBeforeAction: true,
      actionDescription: 'Complete visa application analysis'
    });

    if (success) {
      toast.success('Visa application submitted successfully!');
      
      // Charge for generating final report
      setTimeout(async () => {
        await deductCredits('visa_generate_report', {
          actionDescription: 'Generate application report'
        });
        navigate('/dashboard');
      }, 2000);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">Select Your Visa Type</Label>
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
                          {getCost('visa_select_type')} credits
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
                <Label htmlFor="nationality">Nationality</Label>
                <Select value={formData.nationality} onValueChange={(value) => setFormData({ ...formData, nationality: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="purpose">Purpose of Visit</Label>
                <Select value={formData.purpose} onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tourism">Tourism</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="medical">Medical Treatment</SelectItem>
                    <SelectItem value="family">Family Visit</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="duration">Intended Duration of Stay</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-7">1-7 days</SelectItem>
                  <SelectItem value="8-15">8-15 days</SelectItem>
                  <SelectItem value="16-30">16-30 days</SelectItem>
                  <SelectItem value="31-60">31-60 days</SelectItem>
                  <SelectItem value="61-90">61-90 days</SelectItem>
                  <SelectItem value="90+">More than 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold mb-4 block">Upload Passport Photo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="mb-4">
                  <p className="text-lg font-medium">Upload your passport photo page</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Our AI will extract information using OCR technology
                  </p>
                  <Badge variant="destructive" className="mt-2">
                    <Zap className="w-3 h-3 mr-1" />
                    Costs {getCost('visa_upload_passport') + getCost('visa_ocr_processing')} credits
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
                    <span className="text-green-700">Passport uploaded and processed</span>
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
              <Label className="text-lg font-semibold mb-4 block">Upload Supporting Documents</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="mb-4">
                  <p className="text-lg font-medium">Upload required documents</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Bank statements, hotel bookings, flight tickets, etc.
                  </p>
                  <Badge variant="destructive" className="mt-2">
                    <Zap className="w-3 h-3 mr-1" />
                    Costs {getCost('visa_upload_documents') + getCost('visa_document_analysis')} credits
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
              <h2 className="text-2xl font-bold mb-4">Ready to Submit</h2>
              <p className="text-gray-600 mb-6">
                Review your application and submit for final AI analysis
              </p>
              
              <Card className="bg-red-50 border-red-200 mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <span className="font-bold text-red-700">Final Analysis Cost</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {getCost('visa_final_analysis')} Credits
                  </div>
                  <p className="text-sm text-red-600">
                    This includes comprehensive AI analysis, eligibility assessment, and detailed report generation
                  </p>
                </CardContent>
              </Card>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3">Application Summary:</h3>
                <div className="text-left space-y-2 text-sm">
                  <div><strong>Visa Type:</strong> {formData.visaType}</div>
                  <div><strong>Nationality:</strong> {formData.nationality}</div>
                  <div><strong>Purpose:</strong> {formData.purpose}</div>
                  <div><strong>Duration:</strong> {formData.duration}</div>
                  <div><strong>Passport:</strong> {formData.passportFile ? 'Uploaded ✓' : 'Not uploaded'}</div>
                  <div><strong>Documents:</strong> {formData.documents.length} files uploaded</div>
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
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="mb-4">Please log in to access the visa application.</p>
            <Button onClick={() => navigate('/login')}>Login</Button>
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
              Visa Application
            </h1>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-lg px-3 py-1">
                <Coins className="w-4 h-4 mr-1" />
                {credits} Credits
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/purchase-credits')}
              >
                <CreditCard className="w-4 h-4 mr-1" />
                Buy More
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
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
                    <p className="text-yellow-800 font-medium">Low Credits Warning</p>
                    <p className="text-yellow-700 text-sm">
                      You may not have enough credits to complete this application. 
                      Consider purchasing more credits to avoid interruption.
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
            <CardTitle>Step {currentStep}: {
              currentStep === 1 ? 'Select Visa Type' :
              currentStep === 2 ? 'Basic Information' :
              currentStep === 3 ? 'Passport Upload' :
              currentStep === 4 ? 'Supporting Documents' :
              'Review & Submit'
            }</CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Choose the type of visa you want to apply for'}
              {currentStep === 2 && 'Provide your basic information and travel details'}
              {currentStep === 3 && 'Upload a clear photo of your passport information page'}
              {currentStep === 4 && 'Upload all required supporting documents'}
              {currentStep === 5 && 'Review your application and submit for processing'}
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
            Previous
          </Button>
          
          <Button
            onClick={handleContinue}
            disabled={!canAfford(currentStep === totalSteps ? 'visa_final_analysis' : 'visa_continue_step')}
            className="min-w-[200px]"
          >
            {currentStep === totalSteps ? (
              <>
                Submit Application
                <Zap className="w-4 h-4 ml-2" />
                ({getCost('visa_final_analysis')} credits)
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
                ({getCost('visa_continue_step')} credits)
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Apply;