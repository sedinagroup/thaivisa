export type VisaType = 'tourist' | 'business' | 'transit' | 'education' | 'retirement' | 'work';

export type ApplicationStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'additional_info_required' 
  | 'approved' 
  | 'rejected' 
  | 'cancelled';

export type DocumentType = 
  | 'passport' 
  | 'national_id' 
  | 'driver_license' 
  | 'birth_certificate' 
  | 'bank_statement' 
  | 'employment_letter' 
  | 'hotel_booking' 
  | 'flight_ticket';

export interface Application {
  id: string;
  userId: string;
  visaType: VisaType;
  status: ApplicationStatus;
  applicationData: ApplicationData;
  embassyReference?: string;
  submissionDate?: string;
  processingFee?: number;
  currency: string;
  estimatedCompletion?: string;
  actualCompletion?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  documents: Document[];
  statusHistory: StatusHistoryEntry[];
  progressPercentage: number;
  nextSteps: string[];
}

export interface ApplicationData {
  personalInfo: {
    firstName: string;
    lastName: string;
    nationality: string;
    passportNumber: string;
    dateOfBirth: string;
    placeOfBirth: string;
    gender: 'male' | 'female' | 'other';
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  };
  travelInfo: {
    visaType: VisaType;
    travelPurpose: string;
    intendedArrivalDate: string;
    intendedDepartureDate: string;
    durationDays: number;
    portOfEntry: string;
    accommodationDetails: {
      type: 'hotel' | 'private' | 'other';
      name: string;
      address: string;
      contactNumber: string;
    };
    previousVisits: Array<{
      country: string;
      dateFrom: string;
      dateTo: string;
      purpose: string;
    }>;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
    email: string;
    address: string;
  };
  additionalInfo?: string;
}

export interface Document {
  id: string;
  userId: string;
  applicationId?: string;
  documentType: DocumentType;
  originalFilename: string;
  storedFilename: string;
  fileSize: number;
  mimeType: string;
  ocrData?: OCRData;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationConfidence?: number;
  fraudScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface OCRData {
  fullText: string;
  extractedFields: Record<string, string>;
  confidence: number;
  language: string;
  mrzData?: {
    documentType: string;
    countryCode: string;
    surname: string;
    givenNames: string;
    passportNumber: string;
    nationality: string;
    dateOfBirth: string;
    sex: string;
    expiryDate: string;
    personalNumber: string;
  };
}

export interface StatusHistoryEntry {
  id: string;
  applicationId: string;
  previousStatus?: ApplicationStatus;
  newStatus: ApplicationStatus;
  changedBy?: string;
  changeReason?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface EligibilityAssessment {
  eligible: boolean;
  confidence: number;
  visaType: VisaType;
  requirements: string[];
  processingTimeEstimate: string;
  feeEstimate: {
    amount: number;
    currency: string;
  };
  recommendations: string[];
  riskFactors: string[];
}

export interface FraudDetectionResult {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  componentScores: {
    documentAuthenticity: Record<string, number>;
    behavioralAnalysis: number;
    dataConsistency: number;
    patternAnalysis: number;
    neoAiAnalysis: number;
  };
  recommendations: string[];
  requiresManualReview: boolean;
  flags: string[];
}