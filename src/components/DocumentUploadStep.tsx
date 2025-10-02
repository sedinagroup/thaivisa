import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Image, CheckCircle, X, AlertCircle } from 'lucide-react';

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

interface DocumentUploadStepProps {
  formData: FormData;
  onUpdate: (data: FormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({ formData, onUpdate, onNext, onBack }) => {
  const { t } = useTranslation();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(formData.documents || []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type === 'application/pdf'
    );
    const newFiles = [...uploadedFiles, ...validFiles];
    setUploadedFiles(newFiles);
    onUpdate({ ...formData, documents: newFiles });
  }, [uploadedFiles, formData, onUpdate]);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type === 'application/pdf'
    );
    const newFiles = [...uploadedFiles, ...validFiles];
    setUploadedFiles(newFiles);
    onUpdate({ ...formData, documents: newFiles });
  }, [uploadedFiles, formData, onUpdate]);

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onUpdate({ ...formData, documents: newFiles });
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-6 h-6 text-blue-500" />;
    }
    return <FileText className="w-6 h-6 text-red-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const requiredDocuments = [
    {
      name: 'Passport Copy',
      description: 'Clear copy of passport main page',
      required: true
    },
    {
      name: 'Passport Photo',
      description: 'Recent passport-size photograph',
      required: true
    },
    {
      name: 'Flight Itinerary',
      description: 'Round-trip flight booking confirmation',
      required: false
    },
    {
      name: 'Hotel Booking',
      description: 'Accommodation confirmation',
      required: false
    },
    {
      name: 'Bank Statement',
      description: 'Recent bank statement (last 3 months)',
      required: true
    }
  ];

  const isFormValid = () => {
    return uploadedFiles.length >= 3; // At least 3 documents required
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Document Upload
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Upload the required documents for your visa application.
        </p>
      </div>

      {/* Required Documents List */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-600" />
            Required Documents
          </CardTitle>
          <CardDescription>
            Please upload all required documents in clear, high-quality images or PDFs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-sm">{doc.name}</span>
                    {doc.required && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        Required
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{doc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-6 h-6 mr-2 text-purple-600" />
            Upload Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 border-gray-300 dark:border-gray-600 hover:border-gray-400"
          >
            <input 
              type="file" 
              multiple
              accept="image/*,.pdf"
              onChange={onFileSelect}
              className="hidden"
              id="document-upload"
            />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Drag and drop files here, or click to select
            </p>
            <label htmlFor="document-upload">
              <Button variant="outline" type="button" asChild>
                <span>Select Files</span>
              </Button>
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Supported: JPG, PNG, PDF (max 10MB each)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
              Uploaded Files ({uploadedFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center">
                    {getFileIcon(file)}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Message */}
      {uploadedFiles.length < 3 && (
        <div className="flex items-center p-4 mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Please upload at least 3 required documents to continue.
          </p>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button 
          onClick={onBack}
          variant="outline"
          size="lg"
          className="px-6"
        >
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={!isFormValid()}
          size="lg"
          className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploadStep;