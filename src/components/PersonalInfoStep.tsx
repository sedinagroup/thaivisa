import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, User, Mail, Phone, MapPin, Flag, Upload, FileText, CheckCircle, Loader2, Camera } from 'lucide-react';
import { format } from 'date-fns';

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

interface PersonalInfoStepProps {
  formData: FormData;
  onUpdate: (data: FormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ formData, onUpdate, onNext, onBack }) => {
  const { t } = useTranslation();
  const [isProcessingPassport, setIsProcessingPassport] = useState(false);
  const [passportProcessed, setPassportProcessed] = useState(false);
  const [passportFile, setPassportFile] = useState<File | null>(null);

  const handleInputChange = (field: keyof FormData, value: string | Date | null) => {
    onUpdate({ ...formData, [field]: value });
  };

  // Simulate OCR processing
  const processPassportOCR = async (file: File) => {
    setIsProcessingPassport(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate extracted data (in real implementation, this would come from OCR API)
    const extractedData = {
      fullName: 'JOHN MICHAEL SMITH',
      passportNumber: 'A12345678',
      nationality: 'United States',
      dateOfBirth: new Date('1990-05-15'),
      passportExpiry: new Date('2030-05-14')
    };
    
    // Update form with extracted data
    onUpdate({ 
      ...formData, 
      ...extractedData,
      passportPhoto: file
    });
    
    setIsProcessingPassport(false);
    setPassportProcessed(true);
  };

  const onPassportDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
      setPassportFile(file);
      await processPassportOCR(file);
    }
  }, [formData, onUpdate]);

  const onPassportSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPassportFile(file);
      await processPassportOCR(file);
    }
  }, [formData, onUpdate]);

  const isFormValid = () => {
    return formData.fullName && 
           formData.email && 
           formData.phone && 
           formData.nationality && 
           formData.dateOfBirth &&
           formData.passportNumber &&
           formData.passportExpiry;
  };

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
    'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Bolivia', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria',
    'Cambodia', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Czech Republic',
    'Denmark', 'Ecuador', 'Egypt', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece',
    'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Latvia', 'Lebanon', 'Lithuania', 'Luxembourg',
    'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Norway', 'Pakistan', 'Philippines',
    'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'Slovakia',
    'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland',
    'Taiwan', 'Turkey', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Personal Information
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Provide your personal details for the visa application.
        </p>
      </div>

      {/* Passport Upload Section */}
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <CardTitle className="flex items-center text-xl">
            <Camera className="w-6 h-6 mr-2 text-purple-600" />
            Upload Passport
          </CardTitle>
          <CardDescription>
            Upload a clear photo of your passport for automatic data extraction
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {!passportFile && !isProcessingPassport && (
            <div
              onDrop={onPassportDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 border-gray-300 dark:border-gray-600 hover:border-gray-400"
            >
              <input 
                type="file" 
                accept="image/*" 
                onChange={onPassportSelect}
                className="hidden"
                id="passport-upload"
              />
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Drag and drop your passport photo here, or click to select
              </p>
              <label htmlFor="passport-upload">
                <Button variant="outline" type="button" asChild>
                  <span>Upload Passport Photo</span>
                </Button>
              </label>
            </div>
          )}

          {isProcessingPassport && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-purple-600 animate-spin" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Processing passport...
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI is extracting data from your passport...
              </p>
            </div>
          )}

          {passportProcessed && passportFile && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                  Passport data extracted successfully!
                </h3>
              </div>
              <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                <FileText className="w-4 h-4 mr-2" />
                <span>{passportFile.name}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Personal Information Form */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardTitle className="flex items-center text-xl">
            <User className="w-6 h-6 mr-2 text-blue-600" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Please provide accurate information as it appears on your passport.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium flex items-center">
              <User className="w-4 h-4 mr-2" />
              Full Name *
            </Label>
            <Input
              id="fullName"
              value={formData.fullName || ''}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name as on passport"
              className={`w-full ${passportProcessed ? 'bg-green-50 dark:bg-green-900/20 border-green-300' : ''}`}
              disabled={isProcessingPassport}
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                disabled={isProcessingPassport}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                disabled={isProcessingPassport}
              />
            </div>
          </div>

          {/* Nationality and Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center">
                <Flag className="w-4 h-4 mr-2" />
                Nationality *
              </Label>
              <Select 
                value={formData.nationality || ''} 
                onValueChange={(value) => handleInputChange('nationality', value)}
                disabled={isProcessingPassport}
              >
                <SelectTrigger className={passportProcessed ? 'bg-green-50 dark:bg-green-900/20 border-green-300' : ''}>
                  <SelectValue placeholder="Select your nationality" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Date of Birth *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={`w-full justify-start text-left font-normal ${
                      passportProcessed ? 'bg-green-50 dark:bg-green-900/20 border-green-300' : ''
                    }`}
                    disabled={isProcessingPassport}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfBirth ? format(formData.dateOfBirth, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfBirth || undefined}
                    onSelect={(date) => handleInputChange('dateOfBirth', date || null)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Passport Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              Passport Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passportNumber" className="text-sm font-medium">
                  Passport Number *
                </Label>
                <Input
                  id="passportNumber"
                  value={formData.passportNumber || ''}
                  onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                  placeholder="Enter passport number"
                  className={passportProcessed ? 'bg-green-50 dark:bg-green-900/20 border-green-300' : ''}
                  disabled={isProcessingPassport}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Passport Expiry Date *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={`w-full justify-start text-left font-normal ${
                        passportProcessed ? 'bg-green-50 dark:bg-green-900/20 border-green-300' : ''
                      }`}
                      disabled={isProcessingPassport}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.passportExpiry ? format(formData.passportExpiry, 'PPP') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.passportExpiry || undefined}
                      onSelect={(date) => handleInputChange('passportExpiry', date || null)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button 
          onClick={onBack}
          variant="outline"
          size="lg"
          className="px-6"
          disabled={isProcessingPassport}
        >
          Back
        </Button>
        <Button 
          onClick={onNext}
          disabled={!isFormValid() || isProcessingPassport}
          size="lg"
          className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
        >
          {isProcessingPassport ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;