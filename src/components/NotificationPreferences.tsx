import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Bell, Mail, Plane, Calendar, FileText, MapPin, Gift } from 'lucide-react';
import { useEmailNotifications } from '@/hooks/useEmailNotifications';

export default function NotificationPreferences() {
  const { t } = useTranslation();
  const { preferences, updatePreferences, loadPreferences } = useEmailNotifications();

  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  const handlePreferenceChange = (key: keyof typeof preferences, value: boolean) => {
    updatePreferences({ [key]: value });
  };

  const testNotifications = {
    welcome: () => {
      // Demo test
      console.log('Testing welcome email...');
    },
    invoice: () => {
      console.log('Testing invoice email...');
    },
    flight: () => {
      console.log('Testing flight reminder...');
    },
    visa: () => {
      console.log('Testing visa deadline reminder...');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          {t('profile.notificationPreferences.title', 'Email Notification Preferences')}
        </CardTitle>
        <CardDescription>
          {t('profile.notificationPreferences.description', 'Manage how you receive notifications from Thailand Visa AI')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Master Email Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {t('notifications.emailNotifications', 'Email Notifications')}
            </Label>
            <p className="text-sm text-muted-foreground">
              {t('notifications.emailNotificationsDesc', 'Receive notifications via email')}
            </p>
          </div>
          <Switch
            checked={preferences.emailNotifications}
            onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
          />
        </div>

        <Separator />

        {/* Individual Notification Types */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            {t('notifications.notificationTypes', 'Notification Types')}
          </h4>

          {/* Flight Reminders */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Plane className="w-4 h-4" />
                {t('notifications.flightReminders', 'Flight Reminders')}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t('notifications.flightRemindersDesc', 'Get reminded about upcoming flights')}
              </p>
            </div>
            <Switch
              checked={preferences.flightReminders}
              onCheckedChange={(checked) => handlePreferenceChange('flightReminders', checked)}
              disabled={!preferences.emailNotifications}
            />
          </div>

          {/* Visa Deadlines */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {t('notifications.visaDeadlines', 'Visa Deadlines')}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t('notifications.visaDeadlinesDesc', 'Important visa application deadlines')}
              </p>
            </div>
            <Switch
              checked={preferences.visaDeadlines}
              onCheckedChange={(checked) => handlePreferenceChange('visaDeadlines', checked)}
              disabled={!preferences.emailNotifications}
            />
          </div>

          {/* Application Updates */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {t('notifications.applicationUpdates', 'Application Updates')}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t('notifications.applicationUpdatesDesc', 'Status updates for your visa applications')}
              </p>
            </div>
            <Switch
              checked={preferences.applicationUpdates}
              onCheckedChange={(checked) => handlePreferenceChange('applicationUpdates', checked)}
              disabled={!preferences.emailNotifications}
            />
          </div>

          {/* Trip Updates */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t('notifications.tripUpdates', 'Trip Updates')}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t('notifications.tripUpdatesDesc', 'Updates about your travel plans and itinerary')}
              </p>
            </div>
            <Switch
              checked={preferences.tripUpdates}
              onCheckedChange={(checked) => handlePreferenceChange('tripUpdates', checked)}
              disabled={!preferences.emailNotifications}
            />
          </div>

          {/* Marketing Emails */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Gift className="w-4 h-4" />
                {t('notifications.marketingEmails', 'Marketing & Promotions')}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t('notifications.marketingEmailsDesc', 'Special offers and travel deals')}
              </p>
            </div>
            <Switch
              checked={preferences.marketingEmails}
              onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
              disabled={!preferences.emailNotifications}
            />
          </div>
        </div>

        <Separator />

        {/* Test Notifications */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            {t('notifications.testNotifications', 'Test Notifications')}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={testNotifications.welcome}
              disabled={!preferences.emailNotifications}
            >
              {t('notifications.testWelcome', 'Test Welcome')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={testNotifications.invoice}
              disabled={!preferences.emailNotifications}
            >
              {t('notifications.testInvoice', 'Test Invoice')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={testNotifications.flight}
              disabled={!preferences.flightReminders}
            >
              {t('notifications.testFlight', 'Test Flight')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={testNotifications.visa}
              disabled={!preferences.visaDeadlines}
            >
              {t('notifications.testVisa', 'Test Visa')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}