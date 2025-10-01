import { 
  Application, 
  ApplicationData, 
  EligibilityAssessment, 
  FraudDetectionResult,
  VisaType,
  ApplicationStatus 
} from '@/types/application';

class ApplicationService {
  private baseUrl = '/api/v1';
  
  // Mock applications database
  private mockApplications: Application[] = [
    {
      id: 'app_001',
      userId: '1',
      visaType: 'tourist',
      status: 'under_review',
      applicationData: {} as ApplicationData,
      embassyReference: 'TH2024001234',
      submissionDate: '2024-01-15T10:30:00Z',
      processingFee: 1000,
      currency: 'THB',
      estimatedCompletion: '2024-01-22T10:30:00Z',
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      documents: [],
      statusHistory: [
        {
          id: 'hist_001',
          applicationId: 'app_001',
          newStatus: 'submitted',
          changeReason: 'Application submitted by user',
          createdAt: '2024-01-15T10:30:00Z'
        }
      ],
      progressPercentage: 60,
      nextSteps: ['Document verification in progress', 'Background check pending']
    }
  ];

  async assessEligibility(request: {
    nationality: string;
    visaType: VisaType;
    travelPurpose: string;
    durationDays: number;
    previousVisits: unknown[];
    backgroundInfo: Record<string, unknown>;
  }): Promise<EligibilityAssessment> {
    // Simulate NEO AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock eligibility assessment based on nationality and visa type
    const isEligible = this.calculateEligibility(request.nationality, request.visaType);
    
    return {
      eligible: isEligible,
      confidence: isEligible ? 0.92 : 0.15,
      visaType: request.visaType,
      requirements: this.getRequirements(request.visaType),
      processingTimeEstimate: '3-5 business days',
      feeEstimate: {
        amount: this.getProcessingFee(request.visaType),
        currency: 'THB'
      },
      recommendations: isEligible 
        ? ['Ensure all documents are valid for at least 6 months', 'Prepare proof of accommodation']
        : ['Consider alternative visa types', 'Consult with embassy for specific requirements'],
      riskFactors: isEligible ? [] : ['Nationality restrictions may apply']
    };
  }

  async createApplication(applicationData: ApplicationData): Promise<Application> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newApplication: Application = {
      id: 'app_' + Date.now(),
      userId: '1',
      visaType: applicationData.travelInfo.visaType,
      status: 'draft',
      applicationData,
      processingFee: this.getProcessingFee(applicationData.travelInfo.visaType),
      currency: 'THB',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      documents: [],
      statusHistory: [],
      progressPercentage: 10,
      nextSteps: ['Complete document upload', 'Review and submit application']
    };

    this.mockApplications.push(newApplication);
    return newApplication;
  }

  async getApplications(userId: string): Promise<Application[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.mockApplications.filter(app => app.userId === userId);
  }

  async getApplication(applicationId: string): Promise<Application | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockApplications.find(app => app.id === applicationId) || null;
  }

  async updateApplicationStatus(
    applicationId: string, 
    status: ApplicationStatus,
    reason?: string
  ): Promise<Application> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const application = this.mockApplications.find(app => app.id === applicationId);
    if (!application) {
      throw new Error('Application not found');
    }

    const previousStatus = application.status;
    application.status = status;
    application.updatedAt = new Date().toISOString();
    application.progressPercentage = this.calculateProgress(status);
    application.nextSteps = this.getNextSteps(status);

    // Add to status history
    application.statusHistory.push({
      id: 'hist_' + Date.now(),
      applicationId,
      previousStatus,
      newStatus: status,
      changeReason: reason,
      createdAt: new Date().toISOString()
    });

    return application;
  }

  async detectFraud(applicationData: ApplicationData): Promise<FraudDetectionResult> {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock fraud detection algorithm
    const riskScore = Math.random() * 0.3; // Low risk for demo
    
    return {
      riskScore,
      riskLevel: riskScore < 0.3 ? 'low' : riskScore < 0.6 ? 'medium' : 'high',
      componentScores: {
        documentAuthenticity: { passport: 0.95, photo: 0.88 },
        behavioralAnalysis: 0.12,
        dataConsistency: 0.95,
        patternAnalysis: 0.08,
        neoAiAnalysis: 0.15
      },
      recommendations: riskScore < 0.3 
        ? ['Application appears legitimate', 'Standard processing recommended']
        : ['Additional verification required', 'Manual review recommended'],
      requiresManualReview: riskScore > 0.6,
      flags: riskScore > 0.3 ? ['Unusual application pattern detected'] : []
    };
  }

  private calculateEligibility(nationality: string, visaType: VisaType): boolean {
    // Mock eligibility logic - most nationalities eligible for tourist visa
    const restrictedNationalities = ['XX', 'YY']; // Mock restricted countries
    return !restrictedNationalities.includes(nationality) || visaType !== 'tourist';
  }

  private getRequirements(visaType: VisaType): string[] {
    const requirements = {
      tourist: [
        'Valid passport with 6+ months validity',
        'Passport-sized photograph',
        'Proof of accommodation',
        'Return flight ticket',
        'Bank statement (last 3 months)'
      ],
      business: [
        'Valid passport with 6+ months validity',
        'Business invitation letter',
        'Company registration documents',
        'Bank statement (last 6 months)',
        'Travel insurance'
      ],
      work: [
        'Valid passport with 6+ months validity',
        'Work permit approval',
        'Employment contract',
        'Educational certificates',
        'Medical certificate'
      ]
    };
    
    return requirements[visaType] || requirements.tourist;
  }

  private getProcessingFee(visaType: VisaType): number {
    const fees = {
      tourist: 1000,
      business: 2000,
      work: 3000,
      education: 1500,
      retirement: 2500,
      transit: 500
    };
    
    return fees[visaType] || 1000;
  }

  private calculateProgress(status: ApplicationStatus): number {
    const progressMap = {
      draft: 10,
      submitted: 25,
      under_review: 60,
      additional_info_required: 40,
      approved: 100,
      rejected: 100,
      cancelled: 0
    };
    
    return progressMap[status] || 0;
  }

  private getNextSteps(status: ApplicationStatus): string[] {
    const stepsMap = {
      draft: ['Complete application form', 'Upload required documents', 'Submit application'],
      submitted: ['Application under initial review', 'Document verification in progress'],
      under_review: ['Background check in progress', 'Embassy review pending'],
      additional_info_required: ['Provide requested additional information', 'Upload missing documents'],
      approved: ['Download visa approval letter', 'Prepare for travel'],
      rejected: ['Review rejection reasons', 'Consider reapplication'],
      cancelled: ['Application has been cancelled']
    };
    
    return stepsMap[status] || [];
  }
}

export const applicationService = new ApplicationService();