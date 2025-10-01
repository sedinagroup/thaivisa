import { useState, useCallback } from 'react';
import { emailService, WelcomeEmailData, InvoiceEmailData, NotificationEmailData } from '@/services/emailService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface NotificationPreferences {
  emailNotifications: boolean;
  flightReminders: boolean;
  visaDeadlines: boolean;
  applicationUpdates: boolean;
  tripUpdates: boolean;
  marketingEmails: boolean;
}

export const useEmailNotifications = () => {
  const { user } = useAuth();
  const [sending, setSending] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    flightReminders: true,
    visaDeadlines: true,
    applicationUpdates: true,
    tripUpdates: true,
    marketingEmails: false
  });

  const sendWelcomeEmail = useCallback(async (userData: { email: string; name: string }) => {
    if (!preferences.emailNotifications) return false;

    setSending(true);
    try {
      const welcomeData: WelcomeEmailData = {
        to_email: userData.email,
        to_name: userData.name,
        user_name: userData.name,
        login_url: `${window.location.origin}/login`,
        from_name: 'Thailand Visa AI Team',
        subject: 'Welcome to Thailand Visa AI Platform!',
        message: `Welcome ${userData.name}! Your account has been created successfully.`
      };

      const success = await emailService.sendWelcomeEmail(welcomeData);
      if (success) {
        toast.success('Welcome email sent successfully!');
      } else {
        toast.error('Failed to send welcome email');
      }
      return success;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      toast.error('Error sending welcome email');
      return false;
    } finally {
      setSending(false);
    }
  }, [preferences.emailNotifications]);

  const sendInvoiceEmail = useCallback(async (invoiceData: {
    amount: number;
    credits: number;
    paymentMethod: string;
  }) => {
    if (!preferences.emailNotifications || !user) return false;

    setSending(true);
    try {
      const invoiceNumber = `INV-${Date.now()}`;
      const invoiceEmailData: InvoiceEmailData = {
        to_email: user.email,
        to_name: user.name,
        invoice_number: invoiceNumber,
        amount: invoiceData.amount,
        credits_purchased: invoiceData.credits,
        transaction_date: new Date().toLocaleDateString(),
        payment_method: invoiceData.paymentMethod,
        from_name: 'Thailand Visa AI Billing',
        subject: `Invoice ${invoiceNumber} - Credit Purchase Confirmation`,
        message: `Thank you for your purchase of ${invoiceData.credits} credits for $${invoiceData.amount}.`
      };

      const success = await emailService.sendInvoiceEmail(invoiceEmailData);
      if (success) {
        toast.success('Invoice email sent successfully!');
      } else {
        toast.error('Failed to send invoice email');
      }
      return success;
    } catch (error) {
      console.error('Error sending invoice email:', error);
      toast.error('Error sending invoice email');
      return false;
    } finally {
      setSending(false);
    }
  }, [preferences.emailNotifications, user]);

  const sendFlightReminder = useCallback(async (flightData: {
    destination: string;
    flightDate: string;
  }) => {
    if (!preferences.flightReminders || !user) return false;

    setSending(true);
    try {
      const template = emailService.getFlightReminderTemplate(flightData.flightDate, flightData.destination);
      const notificationData: NotificationEmailData = {
        to_email: user.email,
        to_name: user.name,
        from_name: 'Thailand Visa AI Notifications',
        subject: template.title!,
        message: template.content!,
        ...template
      };

      const success = await emailService.sendNotificationEmail(notificationData);
      if (success) {
        toast.success('Flight reminder sent successfully!');
      }
      return success;
    } catch (error) {
      console.error('Error sending flight reminder:', error);
      return false;
    } finally {
      setSending(false);
    }
  }, [preferences.flightReminders, user]);

  const sendVisaDeadlineReminder = useCallback(async (visaData: {
    visaType: string;
    deadlineDate: string;
  }) => {
    if (!preferences.visaDeadlines || !user) return false;

    setSending(true);
    try {
      const template = emailService.getVisaDeadlineTemplate(visaData.deadlineDate, visaData.visaType);
      const notificationData: NotificationEmailData = {
        to_email: user.email,
        to_name: user.name,
        from_name: 'Thailand Visa AI Notifications',
        subject: template.title!,
        message: template.content!,
        ...template
      };

      const success = await emailService.sendNotificationEmail(notificationData);
      if (success) {
        toast.success('Visa deadline reminder sent successfully!');
      }
      return success;
    } catch (error) {
      console.error('Error sending visa deadline reminder:', error);
      return false;
    } finally {
      setSending(false);
    }
  }, [preferences.visaDeadlines, user]);

  const sendApplicationStatusUpdate = useCallback(async (statusData: {
    status: string;
    applicationId: string;
  }) => {
    if (!preferences.applicationUpdates || !user) return false;

    setSending(true);
    try {
      const template = emailService.getApplicationStatusTemplate(statusData.status, statusData.applicationId);
      const notificationData: NotificationEmailData = {
        to_email: user.email,
        to_name: user.name,
        from_name: 'Thailand Visa AI Notifications',
        subject: template.title!,
        message: template.content!,
        ...template
      };

      const success = await emailService.sendNotificationEmail(notificationData);
      if (success) {
        toast.success('Application status update sent successfully!');
      }
      return success;
    } catch (error) {
      console.error('Error sending application status update:', error);
      return false;
    } finally {
      setSending(false);
    }
  }, [preferences.applicationUpdates, user]);

  const sendTripUpdate = useCallback(async (tripData: {
    destination: string;
    updateType: string;
  }) => {
    if (!preferences.tripUpdates || !user) return false;

    setSending(true);
    try {
      const template = emailService.getTripUpdateTemplate(tripData.destination, tripData.updateType);
      const notificationData: NotificationEmailData = {
        to_email: user.email,
        to_name: user.name,
        from_name: 'Thailand Visa AI Notifications',
        subject: template.title!,
        message: template.content!,
        ...template
      };

      const success = await emailService.sendNotificationEmail(notificationData);
      if (success) {
        toast.success('Trip update sent successfully!');
      }
      return success;
    } catch (error) {
      console.error('Error sending trip update:', error);
      return false;
    } finally {
      setSending(false);
    }
  }, [preferences.tripUpdates, user]);

  const updatePreferences = useCallback((newPreferences: Partial<NotificationPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
    // In a real app, you would save these preferences to the backend
    localStorage.setItem('emailNotificationPreferences', JSON.stringify({ ...preferences, ...newPreferences }));
    toast.success('Notification preferences updated!');
  }, [preferences]);

  // Load preferences from localStorage on mount
  const loadPreferences = useCallback(() => {
    try {
      const saved = localStorage.getItem('emailNotificationPreferences');
      if (saved) {
        setPreferences(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    }
  }, []);

  return {
    preferences,
    sending,
    sendWelcomeEmail,
    sendInvoiceEmail,
    sendFlightReminder,
    sendVisaDeadlineReminder,
    sendApplicationStatusUpdate,
    sendTripUpdate,
    updatePreferences,
    loadPreferences
  };
};