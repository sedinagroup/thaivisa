import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Settings,
  FileText,
  MapPin,
  Plane,
  Building,
  Plus,
  Download,
  ExternalLink,
  Mail,
  MessageSquare,
  Smartphone
} from 'lucide-react';
import { toast } from 'sonner';

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  const { 
    notifications, 
    preferences, 
    updatePreferences,
    markAsCompleted,
    addCustomReminder,
    getUpcomingDeadlines 
  } = useNotifications();
  
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [showAddReminder, setShowAddReminder] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'visa_expiry':
        return <Plane className="h-5 w-5 text-blue-600" />;
      case '90_day_report':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'work_permit':
        return <Building className="h-5 w-5 text-purple-600" />;
      case 'reentry_permit':
        return <Plane className="h-5 w-5 text-orange-600" />;
      case 'tm30':
        return <MapPin className="h-5 w-5 text-red-600" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string, daysUntil: number) => {
    if (daysUntil < 0) return 'destructive';
    if (daysUntil <= 3) return 'destructive';
    if (daysUntil <= 7) return 'default';
    if (priority === 'high') return 'secondary';
    return 'outline';
  };

  const formatDaysUntil = (days: number) => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `${days} days remaining`;
  };

  const upcomingNotifications = notifications.filter(n => n.status !== 'completed');
  const completedNotifications = notifications.filter(n => n.status === 'completed');
  const overdueNotifications = notifications.filter(n => n.daysUntilDue < 0 && n.status !== 'completed');

  const exportToCalendar = () => {
    // Generate ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Thaivisa.ai//Visa Reminders//EN
${notifications.map(notification => `BEGIN:VEVENT
UID:${notification.id}@thaivisa.ai
DTSTART:${notification.dueDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${notification.title}
DESCRIPTION:${notification.description}\\n\\nAction Required: ${notification.actionRequired}
CATEGORIES:VISA,IMMIGRATION
STATUS:CONFIRMED
END:VEVENT`).join('\n')}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'visa-reminders.ics';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Calendar file downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Visa & Immigration Notifications
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Stay on top of important Thai visa requirements and deadlines
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={exportToCalendar}>
              <Download className="h-4 w-4 mr-2" />
              Export Calendar
            </Button>
            <Button onClick={() => setShowAddReminder(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Reminder
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {overdueNotifications.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {getUpcomingDeadlines(7).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Due This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {getUpcomingDeadlines(30).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Due This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {completedNotifications.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({upcomingNotifications.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedNotifications.length})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Upcoming Notifications */}
          <TabsContent value="upcoming" className="space-y-6">
            {upcomingNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    All Caught Up!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You have no upcoming visa or immigration deadlines.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {upcomingNotifications.map((notification) => (
                  <Card key={notification.id} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div>
                            <CardTitle className="text-lg">{notification.title}</CardTitle>
                            <CardDescription>{notification.description}</CardDescription>
                          </div>
                        </div>
                        <Badge variant={getPriorityColor(notification.priority, notification.daysUntilDue)}>
                          {formatDaysUntil(notification.daysUntilDue)}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Action Required:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {notification.actionRequired}
                          </p>
                          
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => markAsCompleted(notification.id)}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark Complete
                            </Button>
                            {notification.officialLink && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={notification.officialLink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  Official Info
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Document Checklist:</h4>
                          <ul className="space-y-1">
                            {notification.documentChecklist.map((doc, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                          
                          {notification.governmentOffice && (
                            <div className="mt-4">
                              <p className="text-sm font-medium">Office:</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {notification.governmentOffice}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Completed Notifications */}
          <TabsContent value="completed" className="space-y-4">
            {completedNotifications.map((notification) => (
              <Card key={notification.id} className="opacity-75">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div>
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                        <CardDescription>{notification.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Customize how and when you receive visa and immigration reminders
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Notification Methods */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Receive reminders via email
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={preferences.emailEnabled}
                        onCheckedChange={(checked) => updatePreferences({ emailEnabled: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                        <div>
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Receive reminders via SMS
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={preferences.smsEnabled}
                        onCheckedChange={(checked) => updatePreferences({ smsEnabled: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-purple-600" />
                        <div>
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Receive browser push notifications
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={preferences.pushEnabled}
                        onCheckedChange={(checked) => updatePreferences({ pushEnabled: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Reminder Timing */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Reminder Timing</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={preferences.timezone} onValueChange={(value) => updatePreferences({ timezone: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Bangkok">Asia/Bangkok (Thailand)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">America/New_York</SelectItem>
                          <SelectItem value="Europe/London">Europe/London</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="working-hours">Working Hours Only</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Only send notifications during business hours (9 AM - 6 PM)
                        </p>
                      </div>
                      <Switch
                        id="working-hours"
                        checked={preferences.workingHoursOnly}
                        onCheckedChange={(checked) => updatePreferences({ workingHoursOnly: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <Button onClick={() => toast.success('Notification preferences saved!')}>
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Notifications;