import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCredits } from '@/contexts/CreditsContext';
import { useCreditConsumption } from '@/hooks/useCreditConsumption';
import StageProgress from '@/components/StageProgress';
import PassportOCR from '@/components/PassportOCR';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertTriangle,
  User,
  IdCard,
  Coins,
  Shield,
  Brain,
  Clock,
  Award,
  Scan,
  Edit
} from 'lucide-react';
import { toast } from 'sonner';
import type { PassportData } from '@/services/ocrService';

interface EligibilityResult {
  eligible: boolean;
  requirements: string[];
  processingTime: string;
  fee: string;
}

const Apply: React.FC = () => {
  const navigate = useNavigate();
  const { 
    credits, 
    currentStage, 
    canAccessStage, 
    getStageCreditsUsed,
    setCurrentStage,
    completeStage
  } = useCredits();
  
  const { 
    consumeCreditsForService, 
    getCreditCost, 
    checkServiceAccess,
    isProcessing 
  } = useCreditConsumption();

  const [eligibilityChecked, setEligibilityChecked] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    dateOfBirth: '',
    visaType: '',
    purpose: '',
    duration: '',
    arrivalDate: '',
    departureDate: ''
  });
  const [documents, setDocuments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ocrDataExtracted, setOcrDataExtracted] = useState(false);
  const [activeTab, setActiveTab] = useState<'ocr' | 'manual'>('ocr');

  // Load saved data
  useEffect(() => {
    const savedEligibility = localStorage.getItem('eligibility_checked');
    const savedEligibilityResult = localStorage.getItem('eligibility_result');
    const savedFormData = localStorage.getItem('form_data');
    const savedDocuments = localStorage.getItem('uploaded_documents');

    if (savedEligibility) setEligibilityChecked(JSON.parse(savedEligibility));
    if (savedEligibilityResult) setEligibilityResult(JSON.parse(savedEligibilityResult));
    if (savedFormData) setFormData(JSON.parse(savedFormData));
    if (savedDocuments) {
      const docNames = JSON.parse(savedDocuments);
      console.log('Previously uploaded documents:', docNames);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('eligibility_checked', JSON.stringify(eligibilityChecked));
    localStorage.setItem('eligibility_result', JSON.stringify(eligibilityResult));
    localStorage.setItem('form_data', JSON.stringify(formData));
    localStorage.setItem('uploaded_documents', JSON.stringify(documents.map(f => f.name)));
  }, [eligibilityChecked, eligibilityResult, formData, documents]);

  const handleOCRDataExtracted = (data: PassportData) => {
    // Map OCR data to form fields
    setFormData(prev => ({
      ...prev,
      firstName: data.firstName || prev.firstName,
      lastName: data.lastName || prev.lastName,
      passportNumber: data.passportNumber || prev.passportNumber,
      dateOfBirth: data.dateOfBirth ? formatDateForInput(data.dateOfBirth) : prev.dateOfBirth,
      nationality: mapNationalityCode(data.nationality) || prev.nationality,
    }));
    
    setOcrDataExtracted(true);
    toast.success('Passport data extracted and form fields populated!');
  };

  const handleOCRCreditsConsumed = (amount: number) => {
    // Credits are already handled by the OCR service
    console.log(`OCR consumed ${amount} credits`);
  };

  const formatDateForInput = (dateString: string): string => {
    // Convert various date formats to YYYY-MM-DD for HTML input
    const patterns = [
      /(\d{2})[/\-.](\d{2})[/\-.](\d{4})/, // DD/MM/YYYY or DD-MM-YYYY
      /(\d{4})[/\-.](\d{2})[/\-.](\d{2})/, // YYYY/MM/DD or YYYY-MM-DD
    ];

    for (const pattern of patterns) {
      const match = dateString.match(pattern);
      if (match) {
        if (match[3] && match[3].length === 4) {
          // DD/MM/YYYY format
          return `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
        } else if (match[1] && match[1].length === 4) {
          // YYYY/MM/DD format
          return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
        }
      }
    }
    
    return dateString; // Return as-is if no pattern matches
  };

  const mapNationalityCode = (nationality: string): string => {
    // Map 3-letter country codes to full country names
    const countryMap: Record<string, string> = {
      'USA': 'US',
      'GBR': 'UK', 
      'CAN': 'CA',
      'AUS': 'AU',
      'DEU': 'DE',
      'FRA': 'FR',
      'JPN': 'JP',
      'BRA': 'BR',
    };

    return countryMap[nationality.toUpperCase()] || nationality;
  };

  const handleEligibilityCheck = async () => {
    if (!formData.nationality || !formData.visaType) {
      toast.error('Please select your nationality and visa type first');
      return;
    }

    const success = await consumeCreditsForService(
      'ELIGIBILITY_CHECK',
      `Eligibility check for ${formData.nationality} citizen applying for ${formData.visaType} visa`
    );

    if (success) {
      // Simulate eligibility check
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result: EligibilityResult = {
        eligible: true,
        requirements: [
          'Valid passport with at least 6 months validity',
          'Passport-sized photograph',
          'Flight itinerary',
          'Hotel booking confirmation',
          'Bank statement (last 3 months)',
          'Travel insurance'
        ],
        processingTime: '3-5 business days',
        fee: formData.visaType === 'tourist' ? '$35' : '$80'
      };

      setEligibilityResult(result);
      setEligibilityChecked(true);
      toast.success('Eligibility check completed! You are eligible for this visa.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    for (const file of files) {
      const success = await consumeCreditsForService(
        'DOCUMENT_UPLOAD',
        `Document upload: ${file.name}`
      );
      
      if (success) {
        setDocuments(prev => [...prev, file]);
        toast.success(`Document "${file.name}" uploaded successfully!`);
        
        // Trigger AI analysis for each document
        const aiSuccess = await consumeCreditsForService(
          'AI_BRAIN_BASIC',
          `AI analysis for ${file.name}`
        );
        
        if (aiSuccess) {
          toast.success(`AI analysis completed for ${file.name}`);
        }
      } else {
        toast.error(`Failed to upload "${file.name}" - insufficient credits`);
        break;
      }
    }
  };

  const handleSubmitToReview = async () => {
    if (!eligibilityChecked) {
      toast.error('Please complete eligibility check first');
      return;
    }

    if (documents.length < 3) {
      toast.error('Please upload at least 3 required documents');
      return;
    }

    const requiredFields = ['firstName', 'lastName', 'email', 'nationality', 'passportNumber', 'visaType'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await consumeCreditsForService(
        'SUBMIT_TO_REVIEW',
        'Submit application for initial review'
      );

      if (success) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        completeStage('initial');
        setCurrentStage('compliance');
        
        toast.success('Application submitted for review! You can now proceed to compliance stage.');
        
        // Navigate to compliance page after successful submission
        setTimeout(() => {
          navigate('/compliance');
        }, 1500);
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = eligibilityChecked && documents.length >= 3 && 
    formData.firstName && formData.lastName && formData.email && 
    formData.nationality && formData.passportNumber && formData.visaType;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Thailand Visa Application
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Stage 1: Initial Application & Document Collection
          </p>
        </div>

        {/* Stage Progress */}
        <StageProgress />

        {/* Stage Access Check */}
        {!canAccessStage('initial') ? (
          <Alert className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Access Restricted</AlertTitle>
            <AlertDescription>
              You cannot access this stage yet. Please complete previous stages first.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-8">
            {/* Credits Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins className="h-6 w-6 text-amber-500" />
                  <span>Stage 1 Credits Usage</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{credits}</div>
                    <div className="text-sm text-gray-600">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{getStageCreditsUsed('initial')}</div>
                    <div className="text-sm text-gray-600">Used</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">250</div>
                    <div className="text-sm text-gray-600">Budget</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{250 - getStageCreditsUsed('initial')}</div>
                    <div className="text-sm text-gray-600">Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 1: Passport Data Collection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <IdCard className="h-6 w-6" />
                  <span>Step 1: Passport Information</span>
                </CardTitle>
                <CardDescription>
                  Extract your passport data automatically using OCR or enter manually
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'ocr' | 'manual')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="ocr" className="flex items-center space-x-2">
                      <Scan className="h-4 w-4" />
                      <span>OCR Scanner</span>
                    </TabsTrigger>
                    <TabsTrigger value="manual" className="flex items-center space-x-2">
                      <Edit className="h-4 w-4" />
                      <span>Manual Entry</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ocr" className="mt-6">
                    <PassportOCR
                      onDataExtracted={handleOCRDataExtracted}
                      onCreditsConsumed={handleOCRCreditsConsumed}
                      disabled={isProcessing}
                    />
                    
                    {ocrDataExtracted && (
                      <Alert className="mt-4">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Data Extracted Successfully!</AlertTitle>
                        <AlertDescription>
                          Your passport data has been automatically filled in the form below. 
                          Please review and correct any information if needed.
                        </AlertDescription>
                      </Alert>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="manual" className="mt-6">
                    <Alert>
                      <User className="h-4 w-4" />
                      <AlertTitle>Manual Data Entry</AlertTitle>
                      <AlertDescription>
                        Enter your passport information manually. Make sure all details match exactly as they appear on your passport.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Step 2: Eligibility Check */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-6 w-6" />
                  <span>Step 2: Eligibility Check</span>
                  <Badge variant="outline">{getCreditCost('ELIGIBILITY_CHECK')} credits</Badge>
                </CardTitle>
                <CardDescription>
                  Verify your eligibility for Thailand visa before proceeding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="JP">Japan</SelectItem>
                        <SelectItem value="BR">Brazil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="visaType">Visa Type *</Label>
                    <Select value={formData.visaType} onValueChange={(value) => handleInputChange('visaType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visa type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tourist">Tourist Visa (TR)</SelectItem>
                        <SelectItem value="business">Business Visa (B)</SelectItem>
                        <SelectItem value="transit">Transit Visa (TS)</SelectItem>
                        <SelectItem value="education">Education Visa (ED)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleEligibilityCheck}
                    disabled={!formData.nationality || !formData.visaType || eligibilityChecked || isProcessing}
                    className="px-8 py-3"
                  >
                    {eligibilityChecked ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Eligibility Confirmed
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-5 w-5" />
                        Check Eligibility ({getCreditCost('ELIGIBILITY_CHECK')} credits)
                      </>
                    )}
                  </Button>
                </div>

                {eligibilityResult && (
                  <Alert className="mt-4">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Eligibility Confirmed!</AlertTitle>
                    <AlertDescription>
                      <div className="mt-2">
                        <p className="font-medium">Required Documents:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          {eligibilityResult.requirements.map((req: string, index: number) => (
                            <li key={index} className="text-sm">{req}</li>
                          ))}
                        </ul>
                        <p className="mt-2 text-sm">
                          <strong>Processing Time:</strong> {eligibilityResult.processingTime} | 
                          <strong> Fee:</strong> {eligibilityResult.fee}
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Step 3: Personal Information */}
            {(eligibilityChecked || ocrDataExtracted) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-6 w-6" />
                    <span>Step 3: Personal Information</span>
                    {ocrDataExtracted && (
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Scan className="h-3 w-3" />
                        <span>Auto-filled</span>
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {ocrDataExtracted 
                      ? 'Review and correct the auto-filled information from your passport'
                      : 'Provide your personal details as they appear on your passport'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="passportNumber">Passport Number *</Label>
                      <Input
                        id="passportNumber"
                        value={formData.passportNumber}
                        onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                        placeholder="Enter passport number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="purpose">Purpose of Visit</Label>
                    <Textarea
                      id="purpose"
                      value={formData.purpose}
                      onChange={(e) => handleInputChange('purpose', e.target.value)}
                      placeholder="Briefly describe the purpose of your visit to Thailand"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Document Upload */}
            {eligibilityChecked && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-6 w-6" />
                    <span>Step 4: Document Upload</span>
                    <Badge variant="outline">{getCreditCost('DOCUMENT_UPLOAD')} credits per document</Badge>
                  </CardTitle>
                  <CardDescription>
                    Upload required documents (each document is processed by AI and charged separately)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <Brain className="h-4 w-4" />
                      <AlertTitle>AI Document Processing</AlertTitle>
                      <AlertDescription>
                        Each uploaded document is automatically analyzed by our AI system for authenticity and compliance.
                        This costs {getCreditCost('DOCUMENT_UPLOAD')} credits per document + {getCreditCost('AI_BRAIN_BASIC')} credits for AI analysis.
                      </AlertDescription>
                    </Alert>

                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <div className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Upload Documents
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Supported formats: PDF, JPG, PNG (Max 10MB each)
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        disabled={isProcessing}
                      >
                        Select Files
                      </Button>
                    </div>

                    {documents.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Uploaded Documents ({documents.length}):</h4>
                        {documents.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                {getCreditCost('DOCUMENT_UPLOAD') + getCreditCost('AI_BRAIN_BASIC')} credits
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Submit to Review */}
            {eligibilityChecked && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-6 w-6" />
                    <span>Step 5: Submit to Review</span>
                    <Badge variant="outline">{getCreditCost('SUBMIT_TO_REVIEW')} credits</Badge>
                  </CardTitle>
                  <CardDescription>
                    Submit your application for initial review and proceed to compliance stage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertTitle>Ready to Submit?</AlertTitle>
                      <AlertDescription>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            {eligibilityChecked ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            )}
                            <span>Eligibility Check: {eligibilityChecked ? 'Completed' : 'Required'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {documents.length >= 3 ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            )}
                            <span>Documents: {documents.length}/3 minimum uploaded</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {canProceed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            )}
                            <span>Personal Information: {canProceed ? 'Complete' : 'Incomplete'}</span>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>

                    <div className="text-center">
                      <Button
                        onClick={handleSubmitToReview}
                        disabled={!canProceed || isSubmitting || isProcessing}
                        size="lg"
                        className="px-12 py-4 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Submitting to Review...
                          </>
                        ) : (
                          <>
                            Submit to Review ({getCreditCost('SUBMIT_TO_REVIEW')} credits)
                            <Award className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                        After submission, you'll proceed to the compliance stage for document verification.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Apply;