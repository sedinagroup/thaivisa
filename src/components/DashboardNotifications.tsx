import React from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Bell, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  FileText,
  MapPin,
  Plane,
  Building
} from 'lucide-react';

const DashboardNotifications: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, getUpcomingDeadlines } = useNotifications();

  const upcomingDeadlines = getUpcomingDeadlines(30);
  const urgentDeadlines = getUpcomingDeadlines(7);
  const overdueItems = notifications.filter(n => n.daysUntilDue < 0 && n.status !== 'completed');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'visa_expiry':
        return <Plane className="h-4 w-4 text-blue-600" />;
      case '90_day_report':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'work_permit':
        return <Building className="h-4 w-4 text-purple-600" />;
      case 'reentry_permit':
        return <Plane className="h-4 w-4 text-orange-600" />;
      case 'tm30':
        return <MapPin className="h-4 w-4 text-red-600" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDaysUntil = (days: number) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `${days} days`;
  };

  const getPriorityColor = (daysUntil: number) => {
    if (daysUntil < 0) return 'destructive';
    if (daysUntil <= 3) return 'destructive';
    if (daysUntil <= 7) return 'default';
    return 'secondary';
  };

  if (upcomingDeadlines.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            Visa Status
          </CardTitle>
          <CardDescription>All your visa requirements are up to date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No upcoming deadlines. You're all set!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-red-600">{overdueItems.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{urgentDeadlines.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Due This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{upcomingDeadlines.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription>Important visa and immigration requirements</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/notifications')}>
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.slice(0, 5).map((notification) => (
              <div key={notification.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div>
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {notification.actionRequired}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge variant={getPriorityColor(notification.daysUntilDue)} className="text-xs">
                    {formatDaysUntil(notification.daysUntilDue)}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.dueDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {upcomingDeadlines.length > 5 && (
            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm" onClick={() => navigate('/notifications')}>
                View {upcomingDeadlines.length - 5} more deadlines
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Indicator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Visa Compliance Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Overall Compliance</span>
              <span>{Math.round(((notifications.length - overdueItems.length) / notifications.length) * 100)}%</span>
            </div>
            <Progress 
              value={((notifications.length - overdueItems.length) / notifications.length) * 100} 
              className="h-2"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {overdueItems.length === 0 
                ? "Excellent! All requirements are up to date." 
                : `${overdueItems.length} requirement(s) need immediate attention.`
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardNotifications;