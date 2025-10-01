import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Clock,
  FileText,
  CreditCard,
  Shield,
  Globe,
  Phone
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  popular: boolean;
}

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How long does visa processing take?',
      answer: 'Processing times vary by visa type and nationality. Tourist visas typically take 3-5 business days, business visas take 5-7 business days, and work visas take 10-15 business days. Our AI system provides real-time updates on your application status.',
      category: 'processing',
      tags: ['processing', 'time', 'duration'],
      popular: true,
    },
    {
      id: '2',
      question: 'What documents do I need for a Thailand visa?',
      answer: 'Required documents include: valid passport (6+ months validity), passport photos, proof of accommodation, return flight tickets, financial statements, and specific documents based on visa type. Our AI assistant can provide a personalized checklist based on your nationality and visa type.',
      category: 'documents',
      tags: ['documents', 'requirements', 'checklist'],
      popular: true,
    },
    {
      id: '3',
      question: 'How much does a Thailand visa cost?',
      answer: 'Visa fees vary by type and nationality: Tourist visa (1,000-2,000 THB), Business visa (2,000-5,000 THB), Work visa (3,000-10,000 THB). Additional service fees may apply. Our platform provides transparent pricing with no hidden costs.',
      category: 'fees',
      tags: ['cost', 'fees', 'price'],
      popular: true,
    },
    {
      id: '4',
      question: 'How do credits work on your platform?',
      answer: 'Credits are used to access our AI services. Eligibility checks cost 5 credits, form assistance costs 10 credits, and document review costs 15 credits. You can purchase credit packages starting from $9.99 for 50 credits.',
      category: 'credits',
      tags: ['credits', 'pricing', 'ai-services'],
      popular: true,
    },
    {
      id: '5',
      question: 'Can I track my application status?',
      answer: 'Yes! Our platform provides real-time tracking with live updates, email notifications, and SMS alerts. You can monitor your application progress 24/7 through your dashboard.',
      category: 'tracking',
      tags: ['tracking', 'status', 'notifications'],
      popular: false,
    },
    {
      id: '6',
      question: 'What if my visa application is rejected?',
      answer: 'If your application is rejected, we provide detailed feedback on the reasons and guidance for reapplication. Our AI system analyzes rejection patterns to improve future applications. Refunds may be available based on our terms.',
      category: 'rejection',
      tags: ['rejection', 'refund', 'reapplication'],
      popular: false,
    },
    {
      id: '7',
      question: 'Is my personal information secure?',
      answer: 'Absolutely. We use bank-level encryption, secure servers, and comply with international data protection standards. Your documents and personal information are protected with multi-layer security systems.',
      category: 'security',
      tags: ['security', 'privacy', 'data-protection'],
      popular: false,
    },
    {
      id: '8',
      question: 'Do you support multiple languages?',
      answer: 'Yes, our platform supports English, Thai, Portuguese, and Chinese. All AI assistance, forms, and support are available in these languages to ensure accessibility for global users.',
      category: 'language',
      tags: ['language', 'multilingual', 'support'],
      popular: false,
    },
    {
      id: '9',
      question: 'Can I get a refund if I change my mind?',
      answer: 'Refunds are available within 24 hours of payment if no AI services have been used. Once processing begins, refunds are subject to our terms and conditions. Contact support for specific cases.',
      category: 'refund',
      tags: ['refund', 'cancellation', 'policy'],
      popular: false,
    },
    {
      id: '10',
      question: 'How accurate is your AI eligibility checker?',
      answer: 'Our AI eligibility checker has a 95% accuracy rate based on current visa regulations and historical data. It considers your nationality, travel purpose, and other factors to provide reliable assessments.',
      category: 'ai',
      tags: ['ai', 'accuracy', 'eligibility'],
      popular: false,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'processing', name: 'Processing', icon: Clock },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'fees', name: 'Fees & Pricing', icon: CreditCard },
    { id: 'credits', name: 'Credits', icon: CreditCard },
    { id: 'tracking', name: 'Tracking', icon: Search },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'language', name: 'Language', icon: Globe },
    { id: 'ai', name: 'AI Services', icon: HelpCircle },
  ];

  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQs = faqItems.filter(faq => faq.popular);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about Thailand visa applications and our AI-powered platform
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-1"
            >
              <category.icon className="h-3 w-3" />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Popular Questions */}
        {selectedCategory === 'all' && searchQuery === '' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Popular Questions
            </h2>
            <div className="space-y-4">
              {popularFAQs.map((faq) => (
                <Card key={faq.id} className="hover:shadow-md transition-shadow">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleExpanded(faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      </div>
                      {expandedItems.includes(faq.id) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedItems.includes(faq.id) && (
                    <CardContent className="pt-0">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-4">
                        {faq.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Questions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {selectedCategory === 'all' ? 'All Questions' : `${categories.find(c => c.id === selectedCategory)?.name} Questions`}
          </h2>
          
          {filteredFAQs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No questions found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or contact our support team
                </p>
                <Button variant="outline" className="mt-4">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id} className="hover:shadow-md transition-shadow">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleExpanded(faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                        {faq.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                      </div>
                      {expandedItems.includes(faq.id) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedItems.includes(faq.id) && (
                    <CardContent className="pt-0">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-4">
                        {faq.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our support team is here to help you with any questions about your visa application
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                <Phone className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline">
                <HelpCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;