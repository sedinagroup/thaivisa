import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Users, 
  Award, 
  Zap, 
  Shield, 
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Building2,
  Rocket,
  Target,
  Heart,
  Star,
  CheckCircle,
  FileText
} from 'lucide-react';

const AboutUs: React.FC = () => {
  const stats = [
    { label: 'Countries Served', value: '50+', icon: Globe },
    { label: 'Visas Processed', value: '100K+', icon: FileText },
    { label: 'Success Rate', value: '98%', icon: Award },
    { label: 'Customer Satisfaction', value: '4.9/5', icon: Star }
  ];

  const values = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI technology to revolutionize visa processing and travel planning.'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Enterprise-grade security ensuring your personal data and documents are always protected.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make is driven by our commitment to providing exceptional customer experience.'
    },
    {
      icon: Target,
      title: 'Accuracy',
      description: 'Precision-driven AI analysis with 98% accuracy rate for visa eligibility and document verification.'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'THINKNEO.AI was founded as part of SHK Hong Kong Group with a vision to democratize travel through AI.'
    },
    {
      year: '2021',
      title: 'AI Development',
      description: 'Launched our first AI-powered document analysis system, processing over 10,000 documents in beta.'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Expanded to serve 25+ countries with multi-language support and regional partnerships.'
    },
    {
      year: '2023',
      title: 'ThaiVisa.ai Launch',
      description: 'Launched ThaiVisa.ai, becoming the leading AI-powered Thai visa application platform.'
    },
    {
      year: '2024',
      title: 'Market Leadership',
      description: 'Achieved 100K+ processed applications with 98% success rate and industry recognition.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Technology Officer',
      description: 'Former Google AI researcher with 15+ years in machine learning and NLP.',
      image: '👩‍💻'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Product',
      description: 'Ex-Uber product leader specializing in user experience and growth.',
      image: '👨‍💼'
    },
    {
      name: 'Priya Sharma',
      role: 'VP of Operations',
      description: 'Immigration law expert with deep knowledge of visa processes worldwide.',
      image: '👩‍⚖️'
    },
    {
      name: 'James Liu',
      role: 'Chief Security Officer',
      description: 'Cybersecurity veteran ensuring enterprise-grade data protection.',
      image: '👨‍🔒'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mr-4 backdrop-blur-sm">
                <Rocket className="h-10 w-10 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold mb-2">THINKNEO.AI</h1>
                <p className="text-xl text-blue-100">Part of SHK Hong Kong Group</p>
              </div>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing travel and immigration through artificial intelligence. 
              We're making visa applications faster, smarter, and more accessible for everyone.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Building2 className="w-4 h-4 mr-2" />
                SHK Hong Kong Group
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                Global Presence
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Industry Leader
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="w-6 h-6 mr-2 text-blue-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To democratize global travel by leveraging artificial intelligence to make visa applications 
                and travel planning accessible, accurate, and stress-free for everyone. We believe that 
                technology should remove barriers, not create them.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Rocket className="w-6 h-6 mr-2 text-purple-600" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To become the world's most trusted AI-powered travel and immigration platform, 
                enabling seamless global mobility for millions of travelers while maintaining 
                the highest standards of accuracy, security, and customer satisfaction.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Core Values</CardTitle>
            <CardDescription className="text-center">
              The principles that guide everything we do
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Company Timeline */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Journey</CardTitle>
            <CardDescription className="text-center">
              From startup to industry leader
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {item.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <Badge variant="outline" className="ml-2">{item.year}</Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leadership Team */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Leadership Team</CardTitle>
            <CardDescription className="text-center">
              Meet the experts driving our innovation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    {member.image}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{member.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SHK Hong Kong Group */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Part of SHK Hong Kong Group</CardTitle>
            <CardDescription className="text-center">
              Backed by decades of business excellence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-12 h-12 text-white" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-6">
                THINKNEO.AI is proudly part of SHK Hong Kong Group, a diversified conglomerate with over 30 years 
                of experience in technology, finance, and international business. This partnership provides us with 
                the resources, expertise, and global network needed to deliver world-class AI solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">30+ Years</div>
                  <div className="text-sm text-gray-600">Business Excellence</div>
                </div>
                <div className="text-center">
                  <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold">Global Network</div>
                  <div className="text-sm text-gray-600">Worldwide Presence</div>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">Enterprise Grade</div>
                  <div className="text-sm text-gray-600">Security & Compliance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Get in Touch</CardTitle>
            <CardDescription className="text-center">
              Ready to transform your travel experience?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Headquarters</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Hong Kong SAR<br />
                  SHK Hong Kong Group
                </p>
              </div>
              <div>
                <Mail className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  info@thinkneo.ai<br />
                  support@thaivisa.ai
                </p>
              </div>
              <div>
                <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  24/7 Customer Support<br />
                  Multiple Languages
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us Today
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;