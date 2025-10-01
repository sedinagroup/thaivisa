import React, { useState } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Bell, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  X,
  Settings,
  FileText,
  MapPin,
  Plane,
  Building
} from 'lucide-react';

const NotificationWidget: React.FC = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAsCompleted, 
    dismissNotification,
    getUpcomingDeadlines 
  } = useNotifications();
  
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'visa_expiry':
        return <Plane className="h-4 w-4" />;
      case '90_day_report':
        return <FileText className="h-4 w-4" />;
      case 'work_permit':
        return <Building className="h-4 w-4" />;
      case 'reentry_permit':
        return <Plane className="h-4 w-4" />;
      case 'tm30':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
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

  const upcomingDeadlines = getUpcomingDeadlines(30);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-96">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Visa & Immigration Reminders</span>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <ScrollArea className="h-96">
          {upcomingDeadlines.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <p>No upcoming deadlines</p>
              <p className="text-sm">All your visa requirements are up to date!</p>
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {upcomingDeadlines.map((notification) => (
                <Card key={notification.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {getNotificationIcon(notification.type)}
                        <div>
                          <CardTitle className="text-sm font-medium">
                            {notification.title}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {notification.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => dismissNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={getPriorityColor(notification.priority, notification.daysUntilDue)}>
                        {formatDaysUntil(notification.daysUntilDue)}
                      </Badge>
                      {notification.daysUntilDue < 0 && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {notification.actionRequired}
                    </p>
                    
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-6"
                        onClick={() => markAsRead(notification.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        className="text-xs h-6"
                        onClick={() => markAsCompleted(notification.id)}
                      >
                        Mark Done
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer">
          <Calendar className="mr-2 h-4 w-4" />
          View All Notifications
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          Notification Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationWidget;