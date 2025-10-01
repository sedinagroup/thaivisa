import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCredits } from '@/contexts/CreditsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Eye,
  Download,
  Coins,
  Brain,
  Shield,
  Search,
  Clock,
  Star,
  TrendingUp,
  Zap,
  CreditCard,
  Loader2,
  DollarSign,
  BarChart3,
  Target,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface DocumentAnalysis {
  id: string;
  filename: string;
  type: string;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  confidence: number;
  issues: string[];
  suggestions: string[];
  creditsUsed: number;
  analysisTime: string;
  aiInsights: string[];
  riskScore: number;
  complianceScore: number;
}

const Compliance: React.FC = () => {
  const { t } = useTranslation();
  const { credits, consumeCredits, getServicePrice } = useCredits();
  const [documents, setDocuments] = useState<DocumentAnalysis[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('standard');

  // Revenue-Optimized Service Tiers
  const complianceServices = [
    {
      id: 'basic_scan',
      name: 'Basic Document Scan',
      baseCredits: 5,
      description: 'OCR text extraction and format validation',
      features: ['Text extraction', 'Format validation', 'Basic compliance check'],
      icon: FileText,
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 'advanced_analysis',
      name: 'Advanced AI Analysis',
      baseCredits: 15,
      description: 'Deep learning analysis with fraud detection',
      features: ['AI-powered verification', 'Fraud detection', 'Biometric analysis', 'Cross-reference validation'],
      popular: true,
      icon: Brain,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'premium_compliance',
      name: 'Premium Compliance Check',
      baseCredits: 25,
      description: 'Comprehensive review with expert validation',
      features: ['AI analysis', 'Expert human review', 'Detailed report', 'Compliance guarantee'],
      icon: Shield,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'full_legal_verification',
      name: 'Full Legal Verification',
      baseCredits: 50,
      description: 'Complete legal compliance with government database checks',
      features: ['Government database check', 'Legal compliance review', 'Official verification', 'Certified report'],
      icon: Scale,
      color: 'from-red-600 to-orange-600'
    }
  ];

  // Client Data Analysis Services (Micro-transactions)
  const dataAnalysisServices = [
    {
      id: 'personal_info_verification',
      name: 'Personal Info Verification',
      credits: 10,
      description: 'Identity verification and data validation',
      details: 'Verify personal details, check for inconsistencies'
    },
    {
      id: 'financial_background_check',
      name: 'Financial Background Check',
      credits: 20,
      description: 'Financial history and stability analysis',
      details: 'Bank statements, income verification, financial risk assessment'
    },
    {
      id: 'travel_history_analysis',
      name: 'Travel History Analysis',
      credits: 15,
      description: 'Previous travel patterns and visa compliance',
      details: 'Immigration history, visa compliance record, travel behavior'
    },
    {
      id: 'risk_assessment',
      name: 'Risk Assessment',
      credits: 30,
      description: 'Comprehensive risk profiling and scoring',
      details: 'Multi-factor risk analysis, predictive modeling, threat assessment'
    },
    {
      id: 'complete_profile_analysis',
      name: 'Complete Profile Analysis',
      credits: 100,
      description: 'Full 360-degree client analysis',
      details: 'All verification services combined with detailed reporting'
    }
  ];

  // Document Types with Individual Pricing
  const documentTypes = [
    { id: 'passport', name: 'Passport', baseCredits: 15, description: 'Full passport verification and validation' },
    { id: 'photo', name: 'Passport Photo', baseCredits: 8, description: 'Photo compliance and biometric analysis' },
    { id: 'bank_statement', name: 'Bank Statement', baseCredits: 25, description: 'Financial verification and fraud detection' },
    { id: 'flight_ticket', name: 'Flight Ticket', baseCredits: 12, description: 'Travel itinerary validation' },
    { id: 'hotel_booking', name: 'Hotel Booking', baseCredits: 10, description: 'Accommodation verification' },
    { id: 'employment_letter', name: 'Employment Letter', baseCredits: 20, description: 'Employment verification and authenticity check' },
    { id: 'invitation_letter', name: 'Invitation Letter', baseCredits: 18, description: 'Invitation authenticity and compliance' },
    { id: 'insurance', name: 'Travel Insurance', baseCredits: 15, description: 'Coverage verification and policy validation' },
    { id: 'birth_certificate', name: 'Birth Certificate', baseCredits: 22, description: 'Official document verification' },
    { id: 'marriage_certificate', name: 'Marriage Certificate', baseCredits: 20, description: 'Relationship status verification' },
  ];

  // Complexity Multipliers for Maximum Revenue
  const complexityLevels = [
    { id: 'basic', name: 'Basic', multiplier: 0.8, description: 'Standard processing' },
    { id: 'standard', name: 'Standard', multiplier: 1.0, description: 'Enhanced verification' },
    { id: 'advanced', name: 'Advanced', multiplier: 1.5, description: 'Deep analysis with AI' },
    { id: 'premium', name: 'Premium', multiplier: 2.0, description: 'Expert review included' },
    { id: 'enterprise', name: 'Enterprise', multiplier: 3.0, description: 'Real-time government verification' }
  ];

  const calculatePrice = (baseCredits: number, complexity: string = 'standard'): number => {
    const complexityData = complexityLevels.find(c => c.id === complexity);
    return Math.ceil(baseCredits * (complexityData?.multiplier || 1.0));
  };

  const handleDocumentAnalysis = async (documentType: string, serviceType: string, complexity: string) => {
    const docType = documentTypes.find(dt => dt.id === documentType);
    const service = complianceServices.find(cs => cs.id === serviceType);
    
    if (!docType || !service) return;

    const documentCredits = calculatePrice(docType.baseCredits, complexity);
    const serviceCredits = calculatePrice(service.baseCredits, complexity);
    const totalCredits = documentCredits + serviceCredits;
    
    if (credits < totalCredits) {
      toast.error(`Insufficient credits. You need ${totalCredits} credits for this analysis.`);
      return;
    }

    const success = await consumeCredits(totalCredits, `${docType.name} - ${service.name}`, `${complexity} complexity analysis`);
    
    if (!success) {
      toast.error('Failed to process payment. Please try again.');
      return;
    }

    // Simulate document analysis
    const newDoc: DocumentAnalysis = {
      id: Date.now().toString(),
      filename: `${documentType}_document.pdf`,
      type: docType.name,
      status: 'analyzing',
      confidence: 0,
      issues: [],
      suggestions: [],
      creditsUsed: totalCredits,
      analysisTime: new Date().toISOString(),
      aiInsights: [],
      riskScore: 0,
      complianceScore: 0,
    };

    setDocuments(prev => [...prev, newDoc]);
    setCurrentAnalysis(newDoc.id);

    // Simulate analysis progress
    setTimeout(() => {
      const analysisResult = generateAnalysisResult(documentType, serviceType, complexity);
      setDocuments(prev => prev.map(doc => 
        doc.id === newDoc.id ? { ...doc, ...analysisResult, status: 'completed' } : doc
      ));
      setCurrentAnalysis(null);
      toast.success(`${docType.name} analysis completed successfully!`);
    }, 3000 + Math.random() * 2000);
  };

  const handleDataAnalysis = async (serviceId: string) => {
    const service = dataAnalysisServices.find(s => s.id === serviceId);
    if (!service) return;

    const success = await consumeCredits(service.credits, service.name, service.description);
    
    if (success) {
      toast.success(`${service.name} analysis initiated! Results will be available shortly.`);
    }
  };

  const generateAnalysisResult = (docType: string, serviceType: string, complexity: string) => {
    const baseConfidence = complexity === 'enterprise' ? 95 : complexity === 'premium' ? 90 : 85;
    const confidence = baseConfidence + Math.floor(Math.random() * 10);
    const hasIssues = Math.random() < (complexity === 'basic' ? 0.4 : 0.2);

    const commonIssues = {
      passport: ['Expiry date within 6 months', 'Photo quality could be improved', 'Some text appears blurred'],
      photo: ['Background not completely white', 'Face position slightly off-center', 'Resolution could be higher'],
      bank_statement: ['Statement older than 3 months', 'Some transactions flagged for review', 'Balance verification needed'],
      flight_ticket: ['Return date not specified', 'Booking confirmation pending', 'Airline verification required'],
    };

    const aiInsights = {
      passport: [
        'Document appears authentic based on security features',
        'Biometric data matches photo standards',
        'No signs of tampering detected',
        'Issuing authority verified',
        `Analysis performed at ${complexity} complexity level`
      ],
      photo: [
        'Facial recognition confidence: 94%',
        'Photo meets ICAO standards',
        'Background uniformity: Good',
        'Lighting conditions: Acceptable',
        `Biometric analysis completed with ${complexity} precision`
      ],
      bank_statement: [
        'Financial pattern analysis: Normal',
        'No suspicious transactions detected',
        'Account activity consistent with declared purpose',
        'Bank verification: Authentic',
        `Financial risk assessment: ${complexity} level analysis`
      ],
    };

    return {
      confidence,
      riskScore: Math.floor(Math.random() * 30) + 10,
      complianceScore: confidence,
      issues: hasIssues ? (commonIssues[docType as keyof typeof commonIssues] || ['Minor formatting issues detected']) : [],
      suggestions: hasIssues ? [
        'Consider re-uploading with higher quality',
        'Ensure all text is clearly visible',
        'Verify document is recent and valid'
      ] : ['Document meets all compliance requirements'],
      aiInsights: aiInsights[docType as keyof typeof aiInsights] || ['AI analysis completed successfully'],
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'analyzing': return 'text-blue-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'analyzing': return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                NEO AI Compliance System
              </h1>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                Maximum Revenue Through Intelligent Analysis
              </p>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Advanced AI-powered document verification and client analysis with micro-transaction pricing. 
            Every analysis step generates revenue through our optimized credit system.
          </p>
        </div>

        {/* Credits Display */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Coins className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Available Credits: {credits}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Each analysis consumes credits based on complexity and service level
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => window.location.href = '/credits'}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Buy Credits
                </Button>
                <Button variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Revenue Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="document-analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="document-analysis">Document Analysis</TabsTrigger>
            <TabsTrigger value="client-profiling">Client Profiling</TabsTrigger>
            <TabsTrigger value="results">Analysis Results</TabsTrigger>
            <TabsTrigger value="revenue-optimization">Revenue Optimization</TabsTrigger>
          </TabsList>

          {/* Document Analysis Tab */}
          <TabsContent value="document-analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Document Selection */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Select Document Type
                </h3>
                <div className="space-y-3">
                  {documentTypes.map((docType) => (
                    <Card key={docType.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                {docType.name}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {docType.description}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs flex items-center space-x-1">
                            <Coins className="h-3 w-3" />
                            <span>{docType.baseCredits}+</span>
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Service Level Selection */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Analysis Service Level
                </h3>
                <div className="space-y-4">
                  {complianceServices.map((service) => (
                    <Card 
                      key={service.id} 
                      className={`hover:shadow-md transition-shadow cursor-pointer ${
                        service.popular ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center`}>
                              <service.icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                  {service.name}
                                </h4>
                                {service.popular && (
                                  <Badge className="bg-orange-500 text-xs">Popular</Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs flex items-center space-x-1">
                            <Coins className="h-3 w-3" />
                            <span>{service.baseCredits}+</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-1">
                          {service.features.slice(0, 4).map((feature, index) => (
                            <div key={index} className="flex items-center text-xs">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                              <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Complexity & Pricing */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Complexity Level & Pricing
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="complexity">Select Complexity Level</Label>
                    <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        {complexityLevels.map((level) => (
                          <SelectItem key={level.id} value={level.id}>
                            {level.name} ({level.multiplier}x) - {level.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Dynamic Pricing Display */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                      Dynamic Pricing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Document Processing:</span>
                        <span className="font-medium">{calculatePrice(15, selectedComplexity)} credits</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Service Analysis:</span>
                        <span className="font-medium">{calculatePrice(25, selectedComplexity)} credits</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Cost:</span>
                        <span className="text-green-600">{calculatePrice(40, selectedComplexity)} credits</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4"
                      onClick={() => handleDocumentAnalysis('passport', 'advanced_analysis', selectedComplexity)}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Start Analysis
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Client Profiling Tab */}
          <TabsContent value="client-profiling" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Client Data Analysis Services
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Micro-transaction based client profiling and risk assessment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataAnalysisServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <Coins className="h-3 w-3" />
                        <span>{service.credits}</span>
                      </Badge>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {service.details}
                    </p>
                    
                    <Button 
                      className="w-full"
                      onClick={() => handleDataAnalysis(service.id)}
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Start Analysis ({service.credits} credits)
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Subscription Model */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                  Real-time Compliance Monitoring
                </CardTitle>
                <CardDescription>
                  Continuous monitoring with subscription-based revenue model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-lg text-purple-600">Basic Monitor</h4>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$29/mo</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Real-time alerts</p>
                    <Button className="w-full mt-3" size="sm">Subscribe</Button>
                  </div>
                  
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg ring-2 ring-purple-500">
                    <h4 className="font-semibold text-lg text-purple-600">Pro Monitor</h4>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$79/mo</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Advanced analytics</p>
                    <Button className="w-full mt-3" size="sm">Subscribe</Button>
                  </div>
                  
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-lg text-purple-600">Enterprise</h4>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$199/mo</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Full compliance suite</p>
                    <Button className="w-full mt-3" size="sm">Subscribe</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {documents.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Analysis Results Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start document analysis to see results here. Each analysis generates revenue through our credit system.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {documents.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(doc.status)}
                          <div>
                            <CardTitle className="text-lg">{doc.type}</CardTitle>
                            <CardDescription>{doc.filename}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="flex items-center space-x-1 mb-1">
                            <Coins className="h-3 w-3" />
                            <span>{doc.creditsUsed}</span>
                          </Badge>
                          <div className="text-xs text-gray-500">Revenue Generated</div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {doc.status === 'analyzing' ? (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">AI analysis in progress...</span>
                          </div>
                          <Progress value={Math.random() * 100} className="h-2" />
                          <div className="text-xs text-gray-500">
                            Generating revenue: {doc.creditsUsed} credits consumed
                          </div>
                        </div>
                      ) : doc.status === 'completed' ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm font-medium">Confidence Score</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={doc.confidence} className="flex-1 h-2" />
                                <span className="text-sm font-medium">{doc.confidence}%</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Compliance Score</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={doc.complianceScore} className="flex-1 h-2" />
                                <span className="text-sm font-medium">{doc.complianceScore}%</span>
                              </div>
                            </div>
                          </div>
                          
                          {doc.issues.length > 0 && (
                            <Alert>
                              <AlertTriangle className="h-4 w-4" />
                              <AlertTitle>Issues Detected</AlertTitle>
                              <AlertDescription>
                                <ul className="list-disc list-inside text-sm">
                                  {doc.issues.slice(0, 2).map((issue, index) => (
                                    <li key={index}>{issue}</li>
                                  ))}
                                </ul>
                              </AlertDescription>
                            </Alert>
                          )}
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">AI Insights</h4>
                            {doc.aiInsights.slice(0, 3).map((insight, index) => (
                              <div key={index} className="flex items-start text-sm">
                                <Brain className="h-3 w-3 mr-2 mt-0.5 text-blue-600" />
                                {insight}
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              Full Report
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Export
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Revenue Optimization Tab */}
          <TabsContent value="revenue-optimization" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Revenue Optimization Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Maximize profitability through intelligent pricing and service bundling
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue Per Analysis</p>
                      <p className="text-3xl font-bold text-green-600">$2.50</p>
                      <p className="text-xs text-green-600">+15% from last month</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Daily Credit Consumption</p>
                      <p className="text-3xl font-bold text-blue-600">1,247</p>
                      <p className="text-xs text-blue-600">+23% from yesterday</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upsell Success Rate</p>
                      <p className="text-3xl font-bold text-purple-600">67%</p>
                      <p className="text-xs text-purple-600">Premium services</p>
                    </div>
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pricing Strategy */}
            <Card>
              <CardHeader>
                <CardTitle>Dynamic Pricing Strategy</CardTitle>
                <CardDescription>
                  Optimize revenue through complexity-based pricing multipliers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {complexityLevels.map((level, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-semibold text-lg">{level.name}</h4>
                      <p className="text-2xl font-bold text-blue-600">{level.multiplier}x</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{level.description}</p>
                      <div className="mt-2">
                        <Badge variant="outline">
                          {Math.round((level.multiplier - 1) * 100)}% markup
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Bundling */}
            <Card>
              <CardHeader>
                <CardTitle>Service Bundling Opportunities</CardTitle>
                <CardDescription>
                  Increase average transaction value through strategic bundling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Complete Verification Bundle</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Document analysis + Client profiling + Risk assessment
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">150 credits</span>
                      <Badge className="bg-orange-600">Save 25%</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Premium Compliance Package</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Full legal verification + Real-time monitoring (3 months)
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-teal-600">299 credits</span>
                      <Badge className="bg-teal-600">Save 40%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Compliance;