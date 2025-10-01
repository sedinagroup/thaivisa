import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Upload, 
  Scan, 
  CheckCircle, 
  AlertTriangle, 
  Loader2,
  RotateCw,
  Crop,
  Eye,
  EyeOff,
  Coins
} from 'lucide-react';
import { toast } from 'sonner';
import { ocrService, type PassportData, type OCRResult } from '@/services/ocrService';

interface PassportOCRProps {
  onDataExtracted: (data: PassportData) => void;
  onCreditsConsumed: (amount: number) => void;
  disabled?: boolean;
}

const PassportOCR: React.FC<PassportOCRProps> = ({ 
  onDataExtracted, 
  onCreditsConsumed, 
  disabled = false 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [showRawText, setShowRawText] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const OCR_CREDIT_COST = 20;

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image file is too large. Please select a file smaller than 10MB');
      return;
    }

    setSelectedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Reset previous results
    setOcrResult(null);
    setProgress(0);
  }, []);

  const processOCR = useCallback(async () => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      // Process the image with OCR
      const result = await ocrService.processPassportImage(selectedImage);
      
      clearInterval(progressInterval);
      setProgress(100);
      setOcrResult(result);

      if (result.success && result.data) {
        // Consume credits for OCR processing
        onCreditsConsumed(OCR_CREDIT_COST);
        
        // Pass extracted data to parent
        onDataExtracted(result.data);
        
        toast.success(`Passport data extracted successfully! Confidence: ${Math.round(result.confidence)}%`);
      } else {
        toast.error(result.error || 'Failed to extract passport data. Please try again or enter data manually.');
      }
    } catch (error) {
      console.error('OCR processing error:', error);
      toast.error('OCR processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, onDataExtracted, onCreditsConsumed]);

  const resetOCR = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
    setOcrResult(null);
    setProgress(0);
    setShowRawText(false);
    
    // Reset file inputs
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBadgeVariant = (confidence: number) => {
    if (confidence >= 80) return 'default';
    if (confidence >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Scan className="h-6 w-6" />
          <span>Passport OCR Scanner</span>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Coins className="h-3 w-3" />
            <span>{OCR_CREDIT_COST} credits</span>
          </Badge>
        </CardTitle>
        <CardDescription>
          Automatically extract passport data using OCR technology. Take a clear photo or upload an image of your passport.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Instructions */}
        <Alert>
          <Camera className="h-4 w-4" />
          <AlertTitle>Photo Tips for Best Results</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Ensure good lighting and avoid shadows</li>
              <li>Keep the passport flat and fully visible</li>
              <li>Avoid glare and reflections</li>
              <li>Make sure all text is clear and readable</li>
              <li>Include the entire passport page in the frame</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Image Selection */}
        {!selectedImage && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full h-24 flex flex-col items-center justify-center space-y-2"
                onClick={() => cameraInputRef.current?.click()}
                disabled={disabled}
              >
                <Camera className="h-8 w-8" />
                <span>Take Photo</span>
              </Button>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full h-24 flex flex-col items-center justify-center space-y-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
              >
                <Upload className="h-8 w-8" />
                <span>Upload Image</span>
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* Image Preview */}
        {imagePreview && (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Passport preview"
                className="w-full max-h-64 object-contain rounded-lg border"
              />
              <div className="absolute top-2 right-2 space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={resetOCR}
                  disabled={isProcessing}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Process Button */}
            {!ocrResult && (
              <Button
                onClick={processOCR}
                disabled={isProcessing || disabled}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing OCR... ({Math.round(progress)}%)
                  </>
                ) : (
                  <>
                    <Scan className="mr-2 h-5 w-5" />
                    Extract Passport Data ({OCR_CREDIT_COST} credits)
                  </>
                )}
              </Button>
            )}

            {/* Progress Bar */}
            {isProcessing && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-center text-gray-600">
                  Analyzing passport image with OCR...
                </p>
              </div>
            )}
          </div>
        )}

        {/* OCR Results */}
        {ocrResult && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Extraction Results</h4>
              <Badge 
                variant={getConfidenceBadgeVariant(ocrResult.confidence)}
                className="flex items-center space-x-1"
              >
                {ocrResult.success ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <AlertTriangle className="h-3 w-3" />
                )}
                <span>{Math.round(ocrResult.confidence)}% confidence</span>
              </Badge>
            </div>

            {ocrResult.success && ocrResult.data ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">First Name:</span>
                    <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                      {ocrResult.data.firstName || 'Not detected'}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Last Name:</span>
                    <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                      {ocrResult.data.lastName || 'Not detected'}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Passport Number:</span>
                    <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm font-mono">
                      {ocrResult.data.passportNumber || 'Not detected'}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Nationality:</span>
                    <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                      {ocrResult.data.nationality || 'Not detected'}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Date of Birth:</span>
                    <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                      {ocrResult.data.dateOfBirth || 'Not detected'}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Expiry Date:</span>
                    <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                      {ocrResult.data.expiryDate || 'Not detected'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>OCR Failed</AlertTitle>
                <AlertDescription>
                  {ocrResult.error || 'Could not extract passport data from the image. Please try again with a clearer image or enter the data manually.'}
                </AlertDescription>
              </Alert>
            )}

            {/* Raw Text Toggle */}
            {ocrResult.rawText && (
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRawText(!showRawText)}
                  className="flex items-center space-x-2"
                >
                  {showRawText ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span>{showRawText ? 'Hide' : 'Show'} Raw OCR Text</span>
                </Button>
                
                {showRawText && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs font-mono max-h-32 overflow-y-auto">
                    {ocrResult.rawText}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button onClick={resetOCR} variant="outline" className="flex-1">
                Try Another Image
              </Button>
              {ocrResult.success && (
                <Button 
                  onClick={() => onDataExtracted(ocrResult.data!)} 
                  className="flex-1"
                >
                  Use This Data
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PassportOCR;