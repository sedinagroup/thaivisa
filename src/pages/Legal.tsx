import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Scale, 
  FileText, 
  AlertTriangle, 
  Info, 
  Shield,
  Globe,
  Plane,
  Building,
  Users,
  Clock
} from 'lucide-react';

const Legal: React.FC = () => {
  const { t } = useTranslation();

  const visaLaws = [
    {
      id: '1',
      title: 'Immigration Act B.E. 2522 (1979)',
      description: 'The primary law governing immigration and visa requirements for Thailand',
      category: 'immigration',
      lastUpdated: '2024-01-15',
      importance: 'high',
    },
    {
      id: '2',
      title: 'Visa Exemption Regulations',
      description: 'Current visa exemption rules for different nationalities',
      category: 'exemption',
      lastUpdated: '2024-01-10',
      importance: 'high',
    },
    {
      id: '3',
      title: 'Work Permit Regulations',
      description: 'Laws governing work permits and employment for foreigners',
      category: 'work',
      lastUpdated: '2023-12-20',
      importance: 'medium',
    },
    {
      id: '4',
      title: 'Digital Nomad Visa Regulations',
      description: 'New regulations for remote workers and digital nomads',
      category: 'digital-nomad',
      lastUpdated: '2023-12-01',
      importance: 'medium',
    },
  ];

  const bestPractices = [
    {
      title: 'Document Preparation',
      description: 'Ensure all documents are original or certified copies, translated if necessary',
      icon: FileText,
      tips: [
        'Keep documents in good condition',
        'Translate documents to English or Thai',
        'Get official certifications when required',
        'Make multiple copies for backup',
      ],
    },
    {
      title: 'Application Timing',
      description: 'Apply well in advance of your travel date',
      icon: Clock,
      tips: [
        'Apply 2-4 weeks before travel',
        'Consider processing delays',
        'Check embassy holidays',
        'Allow time for additional requirements',
      ],
    },
    {
      title: 'Compliance & Honesty',
      description: 'Always provide accurate and truthful information',
      icon: Shield,
      tips: [
        'Never provide false information',
        'Declare all previous visa issues',
        'Be consistent across all documents',
        'Respond promptly to requests',
      ],
    },
    {
      title: 'Entry Requirements',
      description: 'Understand Thailand\'s entry and stay requirements',
      icon: Plane,
      tips: [
        'Valid passport (6+ months)',
        'Proof of onward travel',
        'Sufficient funds evidence',
        'Health insurance coverage',
      ],
    },
  ];

  const travelerInfo = [
    {
      category: 'Health & Safety',
      icon: Shield,
      items: [
        'COVID-19 vaccination requirements',
        'Health insurance recommendations',
        'Emergency contact information',
        'Medical facilities in Thailand',
      ],
    },
    {
      category: 'Cultural Guidelines',
      icon: Users,
      items: [
        'Respect for Thai customs and traditions',
        'Appropriate dress codes for temples',
        'Photography restrictions',
        'Tipping and bargaining etiquette',
      ],
    },
    {
      category: 'Legal Compliance',
      icon: Scale,
      items: [
        'Drug laws and penalties',
        'Alcohol consumption regulations',
        'Traffic rules and driving requirements',
        'Prohibited items and activities',
      ],
    },
    {
      category: 'Financial Matters',
      icon: Building,
      items: [
        'Currency exchange regulations',
        'Banking services for tourists',
        'Tax obligations for long stays',
        'Property ownership restrictions',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Legal Information & Guidelines
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stay informed about Thailand's visa laws, best practices, and important information for travelers
          </p>
        </div>

        <Tabs defaultValue="laws" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="laws" className="flex items-center">
              <Scale className="h-4 w-4 mr-2" />
              Visa Laws
            </TabsTrigger>
            <TabsTrigger value="practices" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Best Practices
            </TabsTrigger>
            <TabsTrigger value="traveler" className="flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Traveler Info
            </TabsTrigger>
            <TabsTrigger value="updates" className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Updates
            </TabsTrigger>
          </TabsList>

          {/* Visa Laws */}
          <TabsContent value="laws">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Scale className="h-5 w-5 mr-2" />
                    Thailand Visa Legislation
                  </CardTitle>
                  <CardDescription>
                    Current laws and regulations governing visa applications and immigration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visaLaws.map((law) => (
                      <Card key={law.id} className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge 
                              variant={law.importance === 'high' ? 'default' : 'secondary'}
                            >
                              {law.importance === 'high' ? 'High Priority' : 'Medium Priority'}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Updated: {law.lastUpdated}
                            </span>
                          </div>
                          <CardTitle className="text-lg">{law.title}</CardTitle>
                          <CardDescription>{law.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <Button variant="outline" size="sm">
                            <FileText className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Important Notice */}
              <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        Important Legal Notice
                      </h3>
                      <p className="text-amber-700 dark:text-amber-300 text-sm">
                        This information is for guidance only and should not be considered as legal advice. 
                        Visa laws and regulations can change frequently. Always consult official sources 
                        or legal professionals for the most current information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Best Practices */}
          <TabsContent value="practices">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bestPractices.map((practice, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <practice.icon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      {practice.title}
                    </CardTitle>
                    <CardDescription>{practice.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {practice.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Traveler Information */}
          <TabsContent value="traveler">
            <div className="space-y-6">
              {travelerInfo.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <section.icon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Updates */}
          <TabsContent value="updates">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
                    Recent Legal Updates
                  </CardTitle>
                  <CardDescription>
                    Stay informed about the latest changes in Thailand's visa regulations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-l-green-500 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="default">New</Badge>
                        <span className="text-xs text-gray-500">January 15, 2024</span>
                      </div>
                      <h4 className="font-semibold mb-1">Extended Visa Exemption Period</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Tourist visa exemption extended to 60 days for eligible countries
                      </p>
                    </div>

                    <div className="border-l-4 border-l-blue-500 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">Updated</Badge>
                        <span className="text-xs text-gray-500">January 10, 2024</span>
                      </div>
                      <h4 className="font-semibold mb-1">Digital Nomad Visa Requirements</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Updated income requirements and documentation for digital nomad visas
                      </p>
                    </div>

                    <div className="border-l-4 border-l-amber-500 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Important</Badge>
                        <span className="text-xs text-gray-500">December 20, 2023</span>
                      </div>
                      <h4 className="font-semibold mb-1">Health Insurance Requirements</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        New health insurance coverage requirements for certain visa types
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subscribe to Updates */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Stay Updated
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Get notified about important changes in Thailand's visa laws and regulations
                  </p>
                  <Button>
                    Subscribe to Legal Updates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Legal;