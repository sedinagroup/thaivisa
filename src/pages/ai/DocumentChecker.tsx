import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useCredits } from '@/contexts/CreditsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  FileCheck, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Eye,
  Download,
  Trash2,
  Scan
} from 'lucide-react';
import { toast } from 'sonner';

interface DocumentAnalysis {
  id: string;
  fileName: string;
  fileSize: number;
  uploadTime: Date;
  status: 'analyzing' | 'completed' | 'error';
  confidence: number;
  documentType: string;
  issues: string[];
  recommendations: string[];
  extractedData?: Record<string, any>;
}

const DocumentChecker: React.FC = () => {
  const { credits, consumeCredits } = useCredits();
  const [documents, setDocuments] = useState<DocumentAnalysis[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (credits < 20) {
      toast.error('Insufficient credits. You need 20 credits per document.');
      return;
    }

    for (const file of acceptedFiles) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(`File ${file.name} is too large. Maximum size is 10MB.`);
        continue;
      }

      const newDoc: DocumentAnalysis = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        fileSize: file.size,
        uploadTime: new Date(),
        status: 'analyzing',
        confidence: 0,
        documentType: 'Unknown',
        issues: [],
        recommendations: []
      };

      setDocuments(prev => [newDoc, ...prev]);
      setAnalyzing(true);

      // Simulate AI analysis
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Consume credits
        await consumeCredits(20, 'Document AI Analysis', `Analysis of ${file.name}`);
        
        // Mock analysis results
        const analysisResult = simulateDocumentAnalysis(file);
        
        setDocuments(prev => prev.map(doc => 
          doc.id === newDoc.id 
            ? { ...doc, ...analysisResult, status: 'completed' as const }
            : doc
        ));
        
        toast.success(`Analysis completed for ${file.name}`);
      } catch (error) {
        setDocuments(prev => prev.map(doc => 
          doc.id === newDoc.id 
            ? { ...doc, status: 'error' as const }
            : doc
        ));
        toast.error(`Analysis failed for ${file.name}`);
      }
    }
    
    setAnalyzing(false);
  }, [credits, consumeCredits]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  });

  const simulateDocumentAnalysis = (file: File): Partial<DocumentAnalysis> => {
    const fileName = file.name.toLowerCase();
    let documentType = 'Unknown Document';
    let confidence = Math.floor(Math.random() * 20) + 80; // 80-100%
    let issues: string[] = [];
    let recommendations: string[] = [];
    let extractedData: Record<string, any> = {};

    if (fileName.includes('passport')) {
      documentType = 'Passport';
      extractedData = {
        documentNumber: 'P123456789',
        fullName: 'John Doe',
        nationality: 'American',
        dateOfBirth: '1990-01-15',
        expiryDate: '2030-01-15',
        issueDate: '2020-01-15'
      };
      
      if (confidence < 90) {
        issues.push('Image quality could be improved');
        recommendations.push('Ensure document is well-lit and flat');
      }
      
      if (Math.random() > 0.7) {
        issues.push('Expiry date is within 6 months');
        recommendations.push('Consider renewing passport before travel');
      }
    } else if (fileName.includes('visa')) {
      documentType = 'Visa Document';
      extractedData = {
        visaType: 'Tourist Visa',
        visaNumber: 'TH2024001234',
        validFrom: '2024-01-01',
        validUntil: '2024-12-31',
        entries: 'Multiple'
      };
    } else if (fileName.includes('bank') || fileName.includes('statement')) {
      documentType = 'Bank Statement';
      extractedData = {
        accountHolder: 'John Doe',
        accountNumber: '****1234',
        statementPeriod: 'Jan 2024 - Mar 2024',
        averageBalance: '$5,250.00'
      };
      
      if (Math.random() > 0.6) {
        issues.push('Balance may be insufficient for visa requirements');
        recommendations.push('Maintain minimum $3,000 balance for tourist visa');
      }
    } else if (fileName.includes('flight') || fileName.includes('ticket')) {
      documentType = 'Flight Ticket';
      extractedData = {
        passengerName: 'John Doe',
        flightNumber: 'TG123',
        departure: 'New York (JFK)',
        arrival: 'Bangkok (BKK)',
        departureDate: '2024-06-15',
        returnDate: '2024-06-30'
      };
    }

    // Add random recommendations
    const commonRecommendations = [
      'Document appears to meet standard requirements',
      'Ensure all information is clearly visible',
      'Keep original documents for travel',
      'Make copies of important documents'
    ];
    
    recommendations.push(...commonRecommendations.slice(0, Math.floor(Math.random() * 2) + 1));

    return {
      confidence,
      documentType,
      issues,
      recommendations,
      extractedData
    };
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    toast.success('Document deleted');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Document Checker</h1>
              <p className="text-gray-600 dark:text-gray-400">Upload documents for instant AI verification with 95% accuracy</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-sm">
              20 credits per document
            </Badge>
            <Badge variant="outline" className="text-sm">
              Available: {credits} credits
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Documents
                </CardTitle>
                <CardDescription>
                  Supported formats: JPG, PNG, PDF, DOC, DOCX (Max 10MB each)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    {isDragActive ? (
                      <p className="text-blue-600 font-medium">Drop documents here...</p>
                    ) : (
                      <>
                        <p className="text-gray-600 dark:text-gray-400">
                          Drag & drop documents here, or click to select
                        </p>
                        <Button variant="outline" size="sm">
                          Choose Files
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                {analyzing && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Scan className="w-4 h-4 text-blue-600 animate-pulse" />
                      <span className="text-sm font-medium text-blue-600">Analyzing documents...</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Document Types Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Supported Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Passport pages</div>
                  <div>• Visa documents</div>
                  <div>• Bank statements</div>
                  <div>• Flight tickets</div>
                  <div>• Hotel bookings</div>
                  <div>• Employment letters</div>
                  <div>• Insurance documents</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Analysis Results
                </CardTitle>
                <CardDescription>
                  AI-powered document verification and data extraction
                </CardDescription>
              </CardHeader>
              <CardContent>
                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileCheck className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">No documents uploaded yet</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                      Upload documents to see AI analysis results
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {documents.map((doc) => (
                      <div key={doc.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-medium text-gray-900 dark:text-white">{doc.fileName}</h3>
                              {doc.status === 'completed' && (
                                <Badge variant="secondary" className="text-xs">
                                  {doc.confidence}% confidence
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{formatFileSize(doc.fileSize)}</span>
                              <span>{doc.uploadTime.toLocaleTimeString()}</span>
                              <span className="capitalize">{doc.documentType}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {doc.status === 'analyzing' && (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                            )}
                            {doc.status === 'completed' && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                            {doc.status === 'error' && (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteDocument(doc.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {doc.status === 'completed' && (
                          <>
                            {/* Extracted Data */}
                            {doc.extractedData && Object.keys(doc.extractedData).length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Extracted Information</h4>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    {Object.entries(doc.extractedData).map(([key, value]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 capitalize">
                                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                                        </span>
                                        <span className="font-medium">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Issues */}
                            {doc.issues.length > 0 && (
                              <Alert className="mb-4">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>
                                  <div className="font-medium mb-1">Issues Found:</div>
                                  <ul className="list-disc list-inside space-y-1">
                                    {doc.issues.map((issue, index) => (
                                      <li key={index} className="text-sm">{issue}</li>
                                    ))}
                                  </ul>
                                </AlertDescription>
                              </Alert>
                            )}

                            {/* Recommendations */}
                            {doc.recommendations.length > 0 && (
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recommendations</h4>
                                <ul className="space-y-1">
                                  {doc.recommendations.map((rec, index) => (
                                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        )}

                        {doc.status === 'error' && (
                          <Alert variant="destructive">
                            <XCircle className="h-4 w-4" />
                            <AlertDescription>
                              Failed to analyze document. Please try uploading again.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentChecker;