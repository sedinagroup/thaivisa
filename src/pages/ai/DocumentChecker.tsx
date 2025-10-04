import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Eye,
  Download,
  Trash2,
  Loader2,
  Camera,
  Scan,
  Shield,
  Clock,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

interface DocumentAnalysis {
  documentType: string;
  validity: 'valid' | 'invalid' | 'expired' | 'warning';
  confidence: number;
  extractedData: ExtractedData;
  issues: Issue[];
  recommendations: string[];
  processingTime: number;
}

interface ExtractedData {
  documentNumber?: string;
  fullName?: string;
  dateOfBirth?: string;
  nationality?: string;
  issueDate?: string;
  expiryDate?: string;
  issuingAuthority?: string;
  placeOfBirth?: string;
  gender?: string;
  [key: string]: any;
}

interface Issue {
  type: 'error' | 'warning' | 'info';
  message: string;
  field?: string;
  severity: 'high' | 'medium' | 'low';
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  analysis?: DocumentAnalysis;
  status: 'uploading' | 'analyzing' | 'completed' | 'error';
  progress: number;
}

const AIDocumentChecker: React.FC = () => {
  const { user } = useAuth();
  const { credits, consumeCredits } = useCredits();
  const { t } = useTranslation();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = [
    t('documentChecker.formats.passport'),
    t('documentChecker.formats.id'),
    t('documentChecker.formats.driverLicense'),
    t('documentChecker.formats.birthCertificate'),
    t('documentChecker.formats.incomeProof'),
    t('documentChecker.formats.bankStatement'),
    t('documentChecker.formats.vaccinationCertificate')
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (fileList: File[]) => {
    const validFiles = fileList.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf';
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      
      if (!isValidType) {
        toast.error(t('documentChecker.errors.unsupportedFormat', { fileName: file.name }));
        return false;
      }
      
      if (!isValidSize) {
        toast.error(t('documentChecker.errors.fileTooLarge', { fileName: file.name }));
        return false;
      }
      
      return true;
    });

    validFiles.forEach(file => {
      const id = Math.random().toString(36).substr(2, 9);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const newFile: UploadedFile = {
          id,
          file,
          preview: e.target?.result as string,
          status: 'uploading',
          progress: 0
        };
        
        setFiles(prev => [...prev, newFile]);
        processFile(newFile);
      };
      
      reader.readAsDataURL(file);
    });
  };

  const processFile = async (uploadedFile: UploadedFile) => {
    if (credits < 15) {
      toast.error(t('documentChecker.errors.insufficientCredits'));
      setFiles(prev => prev.filter(f => f.id !== uploadedFile.id));
      return;
    }

    try {
      // Consume credits first
      await consumeCredits(15, t('documentChecker.title'), t('documentChecker.actions.analyzing', { fileName: uploadedFile.file.name }));

      // Update status to analyzing
      setFiles(prev => prev.map(f => 
        f.id === uploadedFile.id 
          ? { ...f, status: 'analyzing', progress: 20 }
          : f
      ));

      // Simulate upload progress
      for (let progress = 30; progress <= 90; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { ...f, progress }
            : f
        ));
      }

      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock analysis
      const analysis = generateMockAnalysis(uploadedFile.file.name);

      setFiles(prev => prev.map(f => 
        f.id === uploadedFile.id 
          ? { 
              ...f, 
              status: 'completed', 
              progress: 100, 
              analysis 
            }
          : f
      ));

      toast.success(t('documentChecker.success.analysisComplete', { fileName: uploadedFile.file.name }));
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === uploadedFile.id 
          ? { ...f, status: 'error', progress: 0 }
          : f
      ));
      toast.error(t('documentChecker.errors.processingError'));
    }
  };

  const generateMockAnalysis = (fileName: string): DocumentAnalysis => {
    const isPassport = fileName.toLowerCase().includes('passport') || fileName.toLowerCase().includes('passaporte');
    const isID = fileName.toLowerCase().includes('id') || fileName.toLowerCase().includes('identidade');
    
    let documentType = t('documentChecker.types.general');
    let extractedData: ExtractedData = {};
    const issues: Issue[] = [];
    let validity: 'valid' | 'invalid' | 'expired' | 'warning' = 'valid';

    if (isPassport) {
      documentType = t('documentChecker.types.passport');
      extractedData = {
        [t('documentChecker.fields.documentNumber')]: 'BR123456789',
        [t('documentChecker.fields.fullName')]: 'JOÃO SILVA SANTOS',
        [t('documentChecker.fields.dateOfBirth')]: '15/03/1985',
        [t('documentChecker.fields.nationality')]: t('documentChecker.nationalities.brazilian'),
        [t('documentChecker.fields.issueDate')]: '10/01/2020',
        [t('documentChecker.fields.expiryDate')]: '10/01/2030',
        [t('documentChecker.fields.issuingAuthority')]: t('documentChecker.authorities.federalPolice'),
        [t('documentChecker.fields.placeOfBirth')]: 'SÃO PAULO, SP',
        [t('documentChecker.fields.gender')]: 'M'
      };
    } else if (isID) {
      documentType = t('documentChecker.types.id');
      extractedData = {
        [t('documentChecker.fields.documentNumber')]: '12.345.678-9',
        [t('documentChecker.fields.fullName')]: 'JOÃO SILVA SANTOS',
        [t('documentChecker.fields.dateOfBirth')]: '15/03/1985',
        [t('documentChecker.fields.issueDate')]: '20/05/2018',
        [t('documentChecker.fields.issuingAuthority')]: 'SSP/SP',
        [t('documentChecker.fields.placeOfBirth')]: 'SÃO PAULO, SP'
      };
    }

    // Add some realistic issues
    const currentDate = new Date();
    const expiryDateStr = extractedData[t('documentChecker.fields.expiryDate')] as string;
    const expiryDate = expiryDateStr ? new Date(expiryDateStr.split('/').reverse().join('-')) : null;
    
    if (expiryDate && expiryDate < currentDate) {
      validity = 'expired';
      issues.push({
        type: 'error',
        message: t('documentChecker.issues.expired'),
        field: 'expiryDate',
        severity: 'high'
      });
    } else if (expiryDate && (expiryDate.getTime() - currentDate.getTime()) < (6 * 30 * 24 * 60 * 60 * 1000)) {
      validity = 'warning';
      issues.push({
        type: 'warning',
        message: t('documentChecker.issues.expiringSoon'),
        field: 'expiryDate',
        severity: 'medium'
      });
    }

    // Add quality issues randomly
    if (Math.random() > 0.7) {
      issues.push({
        type: 'warning',
        message: t('documentChecker.issues.imageQuality'),
        severity: 'low'
      });
    }

    if (Math.random() > 0.8) {
      issues.push({
        type: 'info',
        message: t('documentChecker.issues.compliant'),
        severity: 'low'
      });
    }

    return {
      documentType,
      validity,
      confidence: Math.floor(Math.random() * 15) + 85, // 85-100%
      extractedData,
      issues,
      recommendations: [
        t('documentChecker.recommendations.keepOriginal'),
        t('documentChecker.recommendations.makeBackups'),
        validity === 'warning' ? t('documentChecker.recommendations.renewBeforeTravel') : t('documentChecker.recommendations.validForTravel'),
        t('documentChecker.recommendations.checkRequirements')
      ],
      processingTime: Math.floor(Math.random() * 3000) + 2000 // 2-5 seconds
    };
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const downloadReport = (file: UploadedFile) => {
    if (!file.analysis) return;

    const report = `
${t('documentChecker.report.title')}
${t('documentChecker.report.generatedBy')}

${t('documentChecker.report.fileInfo')}:
- ${t('documentChecker.report.fileName')}: ${file.file.name}
- ${t('documentChecker.report.fileSize')}: ${(file.file.size / 1024 / 1024).toFixed(2)} MB
- ${t('documentChecker.report.fileType')}: ${file.file.type}
- ${t('documentChecker.report.analyzedAt')}: ${new Date().toLocaleString()}

${t('documentChecker.report.analysisResult')}:
- ${t('documentChecker.report.documentType')}: ${file.analysis.documentType}
- ${t('documentChecker.report.status')}: ${file.analysis.validity.toUpperCase()}
- ${t('documentChecker.report.confidence')}: ${file.analysis.confidence}%
- ${t('documentChecker.report.processingTime')}: ${file.analysis.processingTime}ms

${t('documentChecker.report.extractedData')}:
${Object.entries(file.analysis.extractedData).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

${t('documentChecker.report.identifiedIssues')}:
${file.analysis.issues.length > 0 
  ? file.analysis.issues.map(issue => `- [${issue.severity.toUpperCase()}] ${issue.message}`).join('\n')
  : `- ${t('documentChecker.report.noIssues')}`
}

${t('documentChecker.report.recommendations')}:
${file.analysis.recommendations.map(rec => `- ${rec}`).join('\n')}

---
${t('documentChecker.report.disclaimer')}
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${t('documentChecker.report.reportPrefix')}-${file.file.name.split('.')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(t('documentChecker.success.reportDownloaded'));
  };

  const getStatusIcon = (status: string, validity?: string) => {
    switch (status) {
      case 'uploading':
      case 'analyzing':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
      case 'completed':
        switch (validity) {
          case 'valid':
            return <CheckCircle className="w-5 h-5 text-green-500" />;
          case 'warning':
            return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
          case 'expired':
          case 'invalid':
            return <XCircle className="w-5 h-5 text-red-500" />;
          default:
            return <CheckCircle className="w-5 h-5 text-green-500" />;
        }
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string, validity?: string) => {
    switch (status) {
      case 'uploading':
        return t('documentChecker.status.uploading');
      case 'analyzing':
        return t('documentChecker.status.analyzing');
      case 'completed':
        switch (validity) {
          case 'valid':
            return t('documentChecker.status.valid');
          case 'warning':
            return t('documentChecker.status.warning');
          case 'expired':
            return t('documentChecker.status.expired');
          case 'invalid':
            return t('documentChecker.status.invalid');
          default:
            return t('documentChecker.status.completed');
        }
      case 'error':
        return t('documentChecker.status.error');
      default:
        return t('documentChecker.status.waiting');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Scan className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('documentChecker.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('documentChecker.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              {t('documentChecker.creditsAvailable', { credits })}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {t('documentChecker.creditsPerDocument')}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  {t('documentChecker.upload.title')}
                </CardTitle>
                <CardDescription>
                  {t('documentChecker.upload.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('documentChecker.upload.dragDrop')}
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="mb-4"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {t('documentChecker.upload.selectFiles')}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className="text-xs text-gray-500">
                    {t('documentChecker.upload.formats')}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    {t('documentChecker.supportedDocuments')}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {supportedFormats.map((format, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {format}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {files.length > 0 ? (
              <div className="space-y-6">
                {files.map((file) => (
                  <Card key={file.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(file.status, file.analysis?.validity)}
                          <div>
                            <CardTitle className="text-lg">{file.file.name}</CardTitle>
                            <CardDescription>
                              {getStatusText(file.status, file.analysis?.validity)} • 
                              {(file.file.size / 1024 / 1024).toFixed(2)} MB
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {file.analysis && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => downloadReport(file)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {file.status === 'uploading' || file.status === 'analyzing' ? (
                        <div className="space-y-3">
                          <Progress value={file.progress} className="w-full" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {file.status === 'uploading' ? t('documentChecker.progress.uploading') : t('documentChecker.progress.analyzing')}
                          </p>
                        </div>
                      ) : file.analysis ? (
                        <div className="space-y-6">
                          {/* Analysis Overview */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">{file.analysis.confidence}%</div>
                              <div className="text-sm text-gray-600">{t('documentChecker.analysis.confidence')}</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">{file.analysis.documentType}</div>
                              <div className="text-sm text-gray-600">{t('documentChecker.analysis.type')}</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="text-2xl font-bold text-purple-600">{file.analysis.processingTime}ms</div>
                              <div className="text-sm text-gray-600">{t('documentChecker.analysis.processing')}</div>
                            </div>
                          </div>

                          {/* Extracted Data */}
                          {Object.keys(file.analysis.extractedData).length > 0 && (
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                {t('documentChecker.analysis.extractedData')}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Object.entries(file.analysis.extractedData).map(([key, value]) => (
                                  <div key={key} className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">{key}</div>
                                    <div className="font-medium">{value}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Issues */}
                          {file.analysis.issues.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                {t('documentChecker.analysis.issues')}
                              </h4>
                              <div className="space-y-2">
                                {file.analysis.issues.map((issue, index) => (
                                  <Alert 
                                    key={index} 
                                    variant={issue.type === 'error' ? 'destructive' : 'default'}
                                  >
                                    {issue.type === 'error' ? (
                                      <XCircle className="h-4 w-4" />
                                    ) : issue.type === 'warning' ? (
                                      <AlertTriangle className="h-4 w-4" />
                                    ) : (
                                      <CheckCircle className="h-4 w-4" />
                                    )}
                                    <AlertDescription>
                                      <span className="font-medium">[{issue.severity.toUpperCase()}]</span> {issue.message}
                                    </AlertDescription>
                                  </Alert>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Recommendations */}
                          <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              {t('documentChecker.analysis.recommendations')}
                            </h4>
                            <ul className="space-y-2">
                              {file.analysis.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : file.status === 'error' ? (
                        <Alert variant="destructive">
                          <XCircle className="h-4 w-4" />
                          <AlertDescription>
                            {t('documentChecker.errors.processingFailed')}
                          </AlertDescription>
                        </Alert>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {t('documentChecker.empty.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('documentChecker.empty.description')}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDocumentChecker;