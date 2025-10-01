import emailjs from '@emailjs/browser';

// EmailJS configuration (replace with your actual keys)
const EMAILJS_SERVICE_ID = 'service_thailand_visa';
const EMAILJS_TEMPLATE_WELCOME = 'template_welcome';
const EMAILJS_TEMPLATE_INVOICE = 'template_invoice';
const EMAILJS_TEMPLATE_NOTIFICATION = 'template_notification';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailTemplate {
  to_email: string;
  to_name: string;
  from_name: string;
  subject: string;
  message: string;
}

export interface WelcomeEmailData extends EmailTemplate {
  user_name: string;
  login_url: string;
}

export interface InvoiceEmailData extends EmailTemplate {
  invoice_number: string;
  amount: number;
  credits_purchased: number;
  transaction_date: string;
  payment_method: string;
}

export interface NotificationEmailData extends EmailTemplate {
  notification_type: 'flight_reminder' | 'visa_deadline' | 'application_status' | 'trip_update';
  title: string;
  content: string;
  action_url?: string;
  deadline_date?: string;
}

class EmailService {
  private isInitialized = false;

  constructor() {
    this.initializeService();
  }

  private async initializeService() {
    try {
      // In a real implementation, you would initialize with actual EmailJS keys
      this.isInitialized = true;
      console.log('Email service initialized');
    } catch (error) {
      console.error('Failed to initialize email service:', error);
    }
  }

  async sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        console.log('Demo: Welcome email would be sent to:', data.to_email);
        return true;
      }

      const templateParams = {
        to_email: data.to_email,
        to_name: data.to_name,
        user_name: data.user_name,
        login_url: data.login_url,
        from_name: 'Thailand Visa AI Team',
        subject: 'Welcome to Thailand Visa AI Platform!',
        message: `Welcome ${data.user_name}! Your account has been created successfully.`
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_WELCOME,
        templateParams
      );

      console.log('Welcome email sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      return false;
    }
  }

  async sendInvoiceEmail(data: InvoiceEmailData): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        console.log('Demo: Invoice email would be sent to:', data.to_email);
        console.log('Invoice details:', {
          invoice_number: data.invoice_number,
          amount: data.amount,
          credits: data.credits_purchased
        });
        return true;
      }

      const templateParams = {
        to_email: data.to_email,
        to_name: data.to_name,
        invoice_number: data.invoice_number,
        amount: data.amount,
        credits_purchased: data.credits_purchased,
        transaction_date: data.transaction_date,
        payment_method: data.payment_method,
        from_name: 'Thailand Visa AI Billing',
        subject: `Invoice ${data.invoice_number} - Credit Purchase Confirmation`,
        message: `Thank you for your purchase of ${data.credits_purchased} credits.`
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_INVOICE,
        templateParams
      );

      console.log('Invoice email sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send invoice email:', error);
      return false;
    }
  }

  async sendNotificationEmail(data: NotificationEmailData): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        console.log('Demo: Notification email would be sent to:', data.to_email);
        console.log('Notification:', data.title, '-', data.content);
        return true;
      }

      const templateParams = {
        to_email: data.to_email,
        to_name: data.to_name,
        notification_type: data.notification_type,
        title: data.title,
        content: data.content,
        action_url: data.action_url || '',
        deadline_date: data.deadline_date || '',
        from_name: 'Thailand Visa AI Notifications',
        subject: data.title,
        message: data.content
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_NOTIFICATION,
        templateParams
      );

      console.log('Notification email sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send notification email:', error);
      return false;
    }
  }

  // Email templates for different notification types
  getFlightReminderTemplate(flightDate: string, destination: string): Partial<NotificationEmailData> {
    return {
      notification_type: 'flight_reminder',
      title: 'Flight Reminder - Your Trip to Thailand',
      content: `Your flight to ${destination} is scheduled for ${flightDate}. Please check in online and arrive at the airport 2-3 hours before departure.`,
      deadline_date: flightDate
    };
  }

  getVisaDeadlineTemplate(deadlineDate: string, visaType: string): Partial<NotificationEmailData> {
    return {
      notification_type: 'visa_deadline',
      title: 'Visa Application Deadline Reminder',
      content: `Your ${visaType} visa application deadline is approaching. Please submit all required documents by ${deadlineDate}.`,
      deadline_date: deadlineDate
    };
  }

  getApplicationStatusTemplate(status: string, applicationId: string): Partial<NotificationEmailData> {
    return {
      notification_type: 'application_status',
      title: `Visa Application Status Update - ${status}`,
      content: `Your visa application (ID: ${applicationId}) status has been updated to: ${status}. Please check your dashboard for more details.`,
      action_url: '/profile'
    };
  }

  getTripUpdateTemplate(tripDestination: string, updateType: string): Partial<NotificationEmailData> {
    return {
      notification_type: 'trip_update',
      title: `Trip Update - ${tripDestination}`,
      content: `Your trip to ${tripDestination} has been updated. ${updateType}. Please review your updated itinerary.`,
      action_url: '/ai-trip-planner'
    };
  }
}

export const emailService = new EmailService();
export default EmailService;