import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  HelpCircle, 
  FileText, 
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const Support: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(t('support.form.successMessage'));
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: '',
      priority: 'normal'
    });
    setIsSubmitting(false);
  };

  const faqItems = [
    {
      question: t('support.faq.items.visaApplication.question'),
      answer: t('support.faq.items.visaApplication.answer')
    },
    {
      question: t('support.faq.items.creditSystem.question'),
      answer: t('support.faq.items.creditSystem.answer')
    },
    {
      question: t('support.faq.items.documents.question'),
      answer: t('support.faq.items.documents.answer')
    },
    {
      question: t('support.faq.items.aiAccuracy.question'),
      answer: t('support.faq.items.aiAccuracy.answer')
    },
    {
      question: t('support.faq.items.refunds.question'),
      answer: t('support.faq.items.refunds.answer')
    },
    {
      question: t('support.faq.items.processing.question'),
      answer: t('support.faq.items.processing.answer')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('support.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('support.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                  {t('support.contact.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{t('support.contact.email.title')}</p>
                    <p className="text-sm text-gray-600">{t('support.contact.email.address')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{t('support.contact.phone.title')}</p>
                    <p className="text-sm text-gray-600">{t('support.contact.phone.number')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{t('support.contact.hours.title')}</p>
                    <p className="text-sm text-gray-600">{t('support.contact.hours.schedule')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                  {t('support.response.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">{t('support.response.general')}</span>
                  <span className="text-sm font-medium">{t('support.response.generalTime')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t('support.response.technical')}</span>
                  <span className="text-sm font-medium">{t('support.response.technicalTime')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t('support.response.urgent')}</span>
                  <span className="text-sm font-medium">{t('support.response.urgentTime')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{t('support.response.phone')}</span>
                  <span className="text-sm font-medium">{t('support.response.phoneTime')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('support.form.title')}</CardTitle>
                <CardDescription>
                  {t('support.form.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t('support.form.fields.name')}</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t('support.form.fields.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">{t('support.form.fields.category')}</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('support.form.placeholders.category')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="visa-application">{t('support.form.categories.visaApplication')}</SelectItem>
                          <SelectItem value="credits-billing">{t('support.form.categories.creditsBilling')}</SelectItem>
                          <SelectItem value="technical-issue">{t('support.form.categories.technicalIssue')}</SelectItem>
                          <SelectItem value="document-analysis">{t('support.form.categories.documentAnalysis')}</SelectItem>
                          <SelectItem value="trip-planning">{t('support.form.categories.tripPlanning')}</SelectItem>
                          <SelectItem value="account-access">{t('support.form.categories.accountAccess')}</SelectItem>
                          <SelectItem value="other">{t('support.form.categories.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">{t('support.form.fields.priority')}</Label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">{t('support.form.priorities.low')}</SelectItem>
                          <SelectItem value="normal">{t('support.form.priorities.normal')}</SelectItem>
                          <SelectItem value="high">{t('support.form.priorities.high')}</SelectItem>
                          <SelectItem value="urgent">{t('support.form.priorities.urgent')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">{t('support.form.fields.subject')}</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t('support.form.placeholders.subject')}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">{t('support.form.fields.message')}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('support.form.placeholders.message')}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        {t('support.form.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t('support.form.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="w-6 h-6 mr-2 text-blue-600" />
                {t('support.faq.title')}
              </CardTitle>
              <CardDescription>
                {t('support.faq.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                    <h3 className="font-semibold text-lg mb-2 flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      {item.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 ml-7">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t('support.quickLinks.documentation.title')}</h3>
              <p className="text-sm text-gray-600">
                {t('support.quickLinks.documentation.description')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t('support.quickLinks.liveChat.title')}</h3>
              <p className="text-sm text-gray-600">
                {t('support.quickLinks.liveChat.description')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t('support.quickLinks.phoneSupport.title')}</h3>
              <p className="text-sm text-gray-600">
                {t('support.quickLinks.phoneSupport.description')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;