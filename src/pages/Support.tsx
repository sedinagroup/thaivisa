import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  HelpCircle,
  Mail,
  Phone,
  Clock,
  Loader2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Support: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: t('support.chatbot.welcome'),
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('status') || input.includes('track')) {
      return 'To track your application status, please visit the Status Tracking page in your dashboard. You can also provide your application ID for specific updates.';
    }
    
    if (input.includes('document') || input.includes('upload')) {
      return 'For document requirements, please ensure all documents are clear, in color, and show all four corners. Accepted formats are JPG, PNG, and PDF up to 10MB.';
    }
    
    if (input.includes('processing time') || input.includes('how long')) {
      return 'Processing times vary by visa type: Tourist visas typically take 3-5 business days, Business visas take 5-7 business days, and Work visas take 10-15 business days.';
    }
    
    if (input.includes('fee') || input.includes('cost') || input.includes('price')) {
      return 'Visa fees depend on the type: Tourist visa: 1,000 THB, Business visa: 2,000 THB, Work visa: 3,000 THB. Additional service fees may apply.';
    }
    
    if (input.includes('eligibility') || input.includes('eligible')) {
      return 'Use our AI-powered eligibility checker in the application form to determine if you qualify for a Thailand visa based on your nationality and travel purpose.';
    }
    
    return 'Thank you for your question. For specific assistance, please contact our support team or check our FAQ section. Is there anything else I can help you with?';
  };

  const faqs = [
    {
      question: t('support.faq.processingTime'),
      answer: 'Processing times vary by visa type and nationality. Tourist visas typically take 3-5 business days, while business and work visas may take longer.',
    },
    {
      question: t('support.faq.requiredDocuments'),
      answer: 'Required documents include a valid passport, passport photos, proof of accommodation, return flight tickets, and financial statements. Specific requirements vary by visa type.',
    },
    {
      question: t('support.faq.applicationFee'),
      answer: 'Visa fees depend on the type and duration. Tourist visas start from 1,000 THB, business visas from 2,000 THB. Check our fee calculator for exact amounts.',
    },
    {
      question: t('support.faq.trackApplication'),
      answer: 'You can track your application status in real-time through your dashboard. You\'ll also receive email and SMS notifications for important updates.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('support.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Get help with your visa application from our AI assistant or support team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Chatbot */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  {t('support.chatbot.title')}
                </CardTitle>
                <CardDescription>
                  Ask questions about your visa application process
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.sender === 'bot' && (
                            <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          )}
                          {message.sender === 'user' && (
                            <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t('support.chatbot.typing')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={t('support.chatbot.placeholder')}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isTyping}
                  />
                  <Button onClick={handleSendMessage} disabled={isTyping || !inputMessage.trim()}>
                    {isTyping ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('support.contact.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{t('support.contact.email')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">support@thaivisa.ai</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">{t('support.contact.phone')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+66 2 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium">{t('support.contact.hours')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Mon-Fri: 9:00 AM - 6:00 PM (GMT+7)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Live Chat Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help Center
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t('support.faq.title')}</CardTitle>
            <CardDescription>
              Find answers to commonly asked questions about visa applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {faq.answer}
                  </p>
                  {index < faqs.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;