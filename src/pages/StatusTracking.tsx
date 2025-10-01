import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { applicationService } from '@/services/applicationService';
import { Application } from '@/types/application';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Download,
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Plane
} from 'lucide-react';

const StatusTracking: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      if (id) {
        try {
          const app = await applicationService.getApplication(id);
          setApplication(app);
        } catch (error) {
          console.error('Failed to fetch application:', error);
        } finally {
          setLoading(false);
        }
      } else {
        // If no ID provided, fetch the latest application
        if (user) {
          try {
            const applications = await applicationService.getApplications(user.id);
            if (applications.length > 0) {
              setApplication(applications[0]);
            }
          } catch (error) {
            console.error('Failed to fetch applications:', error);
          } finally {
            setLoading(false);
          }
        }
      }
    };

    fetchApplication();
  }, [id, user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'under_review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'additional_info_required':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'under_review':
      case 'submitted':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'additional_info_required':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Application Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't find the application you're looking for.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('status.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track the progress of your visa application
          </p>
        </div>

        {/* Application Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  {getStatusIcon(application.status)}
                  <span className="ml-2">{t(`visaTypes.${application.visaType}`)} Visa</span>
                </CardTitle>
                <CardDescription>
                  {t('status.applicationId')}: {application.id}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(application.status)}>
                {t(`status.statuses.${application.status}`)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {t('status.submittedOn')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {application.submissionDate 
                      ? new Date(application.submissionDate).toLocaleDateString()
                      : 'Not submitted'
                    }
                  </p>
                </div>
              </div>
              
              {application.embassyReference && (
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Embassy Reference
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {application.embassyReference}
                    </p>
                  </div>
                </div>
              )}
              
              {application.estimatedCompletion && (
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {t('status.estimatedCompletion')}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(application.estimatedCompletion).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-900 dark:text-white">
                  {t('status.progress')}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {application.progressPercentage}%
                </span>
              </div>
              <Progress value={application.progressPercentage} className="h-2" />
            </div>

            {/* Download Visa Button */}
            {application.status === 'approved' && (
              <div className="mt-6">
                <Button className="w-full md:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  {t('status.downloadVisa')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status History */}
          <Card>
            <CardHeader>
              <CardTitle>{t('status.statusHistory')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.statusHistory.map((entry, index) => (
                  <div key={entry.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getStatusIcon(entry.newStatus)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {t(`status.statuses.${entry.newStatus}`)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(entry.createdAt).toLocaleString()}
                      </p>
                      {entry.changeReason && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {entry.changeReason}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>{t('status.nextSteps')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {application.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Details */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Applicant
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {application.applicationData.personalInfo?.firstName} {application.applicationData.personalInfo?.lastName}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Passport Number
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {application.applicationData.personalInfo?.passportNumber}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Plane className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Travel Dates
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {application.applicationData.travelInfo?.intendedArrivalDate} - {application.applicationData.travelInfo?.intendedDepartureDate}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Port of Entry
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {application.applicationData.travelInfo?.portOfEntry}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatusTracking;