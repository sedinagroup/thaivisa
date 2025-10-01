import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  BarChart3, 
  User, 
  MessageCircle, 
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Coins
} from 'lucide-react';
import DashboardNotifications from '@/components/DashboardNotifications';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: t('dashboard.newApplication'),
      description: 'Start a new visa application',
      icon: FileText,
      action: () => navigate('/apply'),
      color: 'bg-blue-600',
    },
    {
      title: t('dashboard.trackStatus'),
      description: 'Check your application status',
      icon: BarChart3,
      action: () => navigate('/status'),
      color: 'bg-green-600',
    },
    {
      title: t('dashboard.viewProfile'),
      description: 'Manage your profile',
      icon: User,
      action: () => navigate('/profile'),
      color: 'bg-purple-600',
    },
    {
      title: t('dashboard.contactSupport'),
      description: 'Get help with your application',
      icon: MessageCircle,
      action: () => navigate('/support'),
      color: 'bg-orange-600',
    },
  ];

  const recentApplications = [
    {
      id: 'APP-001',
      type: 'Tourist Visa',
      status: 'under_review',
      submittedOn: '2024-01-15',
      progress: 60,
    },
    {
      id: 'APP-002',
      type: 'Business Visa',
      status: 'approved',
      submittedOn: '2024-01-10',
      progress: 100,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'under_review':
        return <Clock className="h-4 w-4" />;
      case 'rejected':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('dashboard.welcome', { name: user?.firstName || 'User' })}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your visa applications and track your progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.quickActions')}</CardTitle>
                <CardDescription>
                  Common tasks and actions you can perform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 justify-start"
                      onClick={action.action}
                    >
                      <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mr-3`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t('dashboard.recentApplications')}</CardTitle>
                    <CardDescription>
                      Your latest visa application submissions
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/apply')}>
                    <Plus className="h-4 w-4 mr-1" />
                    New Application
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recentApplications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {t('dashboard.noApplications')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {t('dashboard.startFirst')}
                    </p>
                    <Button onClick={() => navigate('/apply')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Start Application
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentApplications.map((application) => (
                      <div
                        key={application.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {getStatusIcon(application.status)}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {application.type}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Application ID: {application.id}
                            </p>
                            <p className="text-xs text-gray-500">
                              Submitted: {new Date(application.submittedOn).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(application.status)}>
                            {application.status.replace('_', ' ')}
                          </Badge>
                          <div className="mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/status/${application.id}`)}
                            >
                              View Details
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Notifications */}
          <div className="space-y-6">
            <DashboardNotifications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;