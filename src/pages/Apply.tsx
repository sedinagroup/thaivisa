import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Calendar, 
  Phone, 
  Mail,
  BookOpen,
  Plane,
  CheckCircle,
  Upload,
  FileText,
  AlertCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

const Apply: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    nationality: '',
    passportNumber: '',
    dateOfBirth: '',
    visaType: '',
    purposeOfVisit: '',
    duration: '',
    arrivalDate: '',
    departureDate: '',
    accommodation: '',
    previousVisits: 'no',
    criminalRecord: 'no',
    additionalInfo: ''
  });

  const [documents, setDocuments] = useState({
    passport: null,
    photo: null,
    bankStatement: null,
    flightTicket: null,
    hotelBooking: null
  });

  const [submitting, setSubmitting] = useState(false);

  const visaTypes = [
    { value: 'tourist', label: 'Tourist Visa (TR)', duration: '30-60 days', fee: '$40' },
    { value: 'business', label: 'Business Visa (B)', duration: '90 days', fee: '$80' },
    { value: 'education', label: 'Education Visa (ED)', duration: '1 year', fee: '$100' },
    { value: 'retirement', label: 'Retirement Visa (O-A)', duration: '1 year', fee: '$200' },
    { value: 'marriage', label: 'Marriage Visa (O)', duration: '1 year', fee: '$200' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (documentType: string, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'nationality', 'passportNumber', 'dateOfBirth', 'visaType'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }

      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Visa application submitted successfully! You will receive a confirmation email shortly.');
      
      // Reset form
      setFormData({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: '',
        nationality: '',
        passportNumber: '',
        dateOfBirth: '',
        visaType: '',
        purposeOfVisit: '',
        duration: '',
        arrivalDate: '',
        departureDate: '',
        accommodation: '',
        previousVisits: 'no',
        criminalRecord: 'no',
        additionalInfo: ''
      });
      
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedVisa = visaTypes.find(visa => visa.value === formData.visaType);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Visa Application</h1>
              <p className="text-gray-600 dark:text-gray-400">Apply for your Thailand visa online</p>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Processing time: 3-5 business days. Make sure all information is accurate before submitting.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Please provide your personal details as they appear on your passport
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Select value={formData.nationality} onValueChange={(value) => handleSelectChange('nationality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="kr">South Korea</SelectItem>
                      <SelectItem value="sg">Singapore</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passportNumber">Passport Number *</Label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="passportNumber"
                      name="passportNumber"
                      value={formData.passportNumber}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visa Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plane className="w-5 h-5 mr-2" />
                Visa Information
              </CardTitle>
              <CardDescription>
                Select the type of visa you're applying for and provide travel details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="visaType">Visa Type *</Label>
                <Select value={formData.visaType} onValueChange={(value) => handleSelectChange('visaType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visa type" />
                  </SelectTrigger>
                  <SelectContent>
                    {visaTypes.map((visa) => (
                      <SelectItem key={visa.value} value={visa.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{visa.label}</span>
                          <div className="flex space-x-2 ml-4">
                            <Badge variant="secondary">{visa.duration}</Badge>
                            <Badge variant="outline">{visa.fee}</Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedVisa && (
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-100">{selectedVisa.label}</p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">Duration: {selectedVisa.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-900 dark:text-blue-100">{selectedVisa.fee}</p>
                        <p className="text-xs text-blue-700 dark:text-blue-300">Processing fee</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="purposeOfVisit">Purpose of Visit</Label>
                <Textarea
                  id="purposeOfVisit"
                  name="purposeOfVisit"
                  value={formData.purposeOfVisit}
                  onChange={handleInputChange}
                  placeholder="Briefly describe the purpose of your visit to Thailand"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="arrivalDate">Planned Arrival Date</Label>
                  <Input
                    id="arrivalDate"
                    name="arrivalDate"
                    type="date"
                    value={formData.arrivalDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="departureDate">Planned Departure Date</Label>
                  <Input
                    id="departureDate"
                    name="departureDate"
                    type="date"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accommodation">Accommodation in Thailand</Label>
                <Textarea
                  id="accommodation"
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleInputChange}
                  placeholder="Hotel name and address, or host information"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Additional Information
              </CardTitle>
              <CardDescription>
                Please answer the following questions honestly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Have you visited Thailand before?</Label>
                <Select value={formData.previousVisits} onValueChange={(value) => handleSelectChange('previousVisits', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No, this is my first visit</SelectItem>
                    <SelectItem value="yes">Yes, I have visited before</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Do you have any criminal record?</Label>
                <Select value={formData.criminalRecord} onValueChange={(value) => handleSelectChange('criminalRecord', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Any additional information you'd like to provide"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Required Documents
              </CardTitle>
              <CardDescription>
                Upload the required documents for your visa application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Passport Copy *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload passport copy</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG (max 5MB)</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Passport Photo *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload passport photo</p>
                    <p className="text-xs text-gray-500">JPG, PNG (max 2MB)</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Bank Statement</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload bank statement</p>
                    <p className="text-xs text-gray-500">PDF (max 5MB)</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Flight Ticket</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload flight ticket</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG (max 5MB)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button 
              type="submit" 
              disabled={submitting}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              {submitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Application...
                </div>
              ) : (
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Application
                  {selectedVisa && <span className="ml-2">({selectedVisa.fee})</span>}
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;