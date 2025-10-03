import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  HelpCircle, 
  FileText, 
  Users, 
  Zap,
  CheckCircle,
  AlertCircle,
  Send,
  Globe,
  Shield,
  HeadphonesIcon
} from 'lucide-react';
import { toast } from 'sonner';

const Support: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
        priority: 'medium'
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const supportCategories = [
    { value: 'visa-application', label: 'Visa Application Issues' },
    { value: 'payment-billing', label: 'Payment & Billing' },
    { value: 'technical-issues', label: 'Technical Issues' },
    { value: 'account-management', label: 'Account Management' },
    { value: 'document-verification', label: 'Document Verification' },
    { value: 'ai-services', label: 'AI Services' },
    { value: 'general-inquiry', label: 'General Inquiry' }
  ];

  const faqItems = [
    {
      question: 'How do I apply for a Thailand visa?',
      answer: 'Use our AI-powered visa application system. Simply go to the "Apply" page, select your visa type, and follow the step-by-step process. Our AI will guide you through document requirements and help ensure your application is complete.'
    },
    {
      question: 'How does the credit system work?',
      answer: 'Credits are consumed when you use our AI services. Different actions cost different amounts: visa applications (80+ credits), trip planning (50-150 credits), document analysis (15-35 credits). You can purchase credit packages starting from $9.99.'
    },
    {
      question: 'What documents do I need for my visa application?',
      answer: 'Required documents vary by visa type and nationality. Our AI system will provide a personalized checklist based on your specific situation. Common documents include passport, photos, bank statements, and travel itinerary.'
    },
    {
      question: 'How accurate is your AI document verification?',
      answer: 'Our AI has a 98% accuracy rate in document verification. It uses advanced OCR and machine learning to analyze documents for completeness, authenticity markers, and compliance with Thai immigration requirements.'
    },
    {
      question: 'Can I get a refund for unused credits?',
      answer: 'Credits are non-refundable once purchased, but they never expire. If you\'re unsatisfied with our service within 30 days of purchase, contact our support team for assistance.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we use enterprise-grade encryption and security measures. All data is stored securely and we comply with international privacy regulations. We never share your personal information with third parties.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <HeadphonesIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How Can We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Help You?</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Get expert support for your Thailand visa application and AI services. 
            Our team is here to help you succeed.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Get instant help from our AI chatbot or connect with a human agent</p>
              <Badge className="bg-green-100 text-green-800">Available 24/7</Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us detailed questions and get comprehensive answers</p>
              <Badge className="bg-blue-100 text-blue-800">Response within 24h</Badge>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Speak directly with our visa experts for urgent matters</p>
              <Badge className="bg-orange-100 text-orange-800">Business Hours</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Support Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Send className="w-6 h-6 mr-2 text-blue-600" />
                Submit a Support Ticket
              </CardTitle>
              <CardDescription>
                Describe your issue in detail and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General question</SelectItem>
                      <SelectItem value="medium">Medium - Standard issue</SelectItem>
                      <SelectItem value="high">High - Urgent matter</SelectItem>
                      <SelectItem value="critical">Critical - Service blocking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Please describe your issue in detail. Include any error messages, steps you've taken, and what you expected to happen."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Ticket
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <HelpCircle className="w-6 h-6 mr-2 text-green-600" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Quick answers to common questions about our services.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {item.question}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Globe className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600">support@thaivisa.ai</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-600">+66 2-123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM (GMT+7)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Emergency Support</p>
                    <p className="text-sm text-gray-600">24/7 for critical issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Service Status */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Zap className="w-5 h-5 mr-2 text-green-600" />
              Service Status
            </CardTitle>
            <CardDescription>
              Current status of our AI services and platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Visa Application System</p>
                  <p className="text-sm text-green-600">Operational</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">AI Document Analysis</p>
                  <p className="text-sm text-green-600">Operational</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Trip Planning AI</p>
                  <p className="text-sm text-green-600">Operational</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;