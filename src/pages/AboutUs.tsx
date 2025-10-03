import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Globe, 
  Users, 
  Award, 
  Target, 
  Lightbulb, 
  Shield, 
  Zap,
  Heart,
  Star,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle,
  TrendingUp,
  Briefcase,
  Rocket
} from 'lucide-react';

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Officer',
      description: 'Former Google AI researcher with 15+ years in machine learning and natural language processing.',
      image: '👩‍💼'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Immigration Law',
      description: 'Licensed immigration attorney specializing in Southeast Asian visa regulations and compliance.',
      image: '👨‍💼'
    },
    {
      name: 'Priya Sharma',
      role: 'VP of Product',
      description: 'Product strategist with expertise in travel tech and user experience design.',
      image: '👩‍💻'
    },
    {
      name: 'James Wilson',
      role: 'CTO',
      description: 'Full-stack architect building scalable AI platforms for global enterprises.',
      image: '👨‍💻'
    }
  ];

  const achievements = [
    { metric: '500K+', label: 'Visa Applications Processed', icon: <FileText className="w-6 h-6" /> },
    { metric: '98.5%', label: 'Success Rate', icon: <Award className="w-6 h-6" /> },
    { metric: '150+', label: 'Countries Served', icon: <Globe className="w-6 h-6" /> },
    { metric: '24/7', label: 'AI Support Available', icon: <Zap className="w-6 h-6" /> }
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We leverage cutting-edge AI technology to simplify complex visa processes and make travel accessible to everyone.',
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />
    },
    {
      title: 'Trust & Security',
      description: 'Your personal data and documents are protected with enterprise-grade security and privacy measures.',
      icon: <Shield className="w-8 h-8 text-blue-500" />
    },
    {
      title: 'Global Excellence',
      description: 'We maintain the highest standards of service quality across all markets and jurisdictions we serve.',
      icon: <Star className="w-8 h-8 text-purple-500" />
    },
    {
      title: 'Customer Success',
      description: 'Every feature we build is designed to increase your chances of visa approval and travel success.',
      icon: <Heart className="w-8 h-8 text-red-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ThinkNeo.AI</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
            A pioneering AI company under the SHK Hong Kong Group, revolutionizing travel and immigration 
            services through advanced artificial intelligence and machine learning technologies.
          </p>

          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-lg">
            Part of SHK Hong Kong Group
          </Badge>
        </div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Rocket className="w-6 h-6 mr-2 text-blue-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                To democratize global travel by making visa applications and immigration processes 
                accessible, transparent, and efficient through AI-powered solutions. We believe 
                everyone should have the opportunity to explore the world without bureaucratic barriers.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="w-6 h-6 mr-2 text-purple-600" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                To become the world's leading AI-driven immigration technology platform, 
                processing millions of visa applications annually while maintaining the highest 
                success rates and customer satisfaction in the industry.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* SHK Hong Kong Group Section */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-3xl">
              <Building2 className="w-8 h-8 mr-3 text-blue-600" />
              SHK Hong Kong Group
            </CardTitle>
            <CardDescription className="text-lg">
              Our parent company and strategic foundation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">About SHK Group</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  SHK Hong Kong Group is a diversified multinational conglomerate with over 30 years of 
                  experience in technology, finance, real estate, and international business development. 
                  Headquartered in Hong Kong, the group operates across Asia-Pacific, Europe, and the Americas.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">Strategic Support</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  As part of SHK Group, ThinkNeo.AI benefits from extensive international networks, 
                  regulatory expertise, and financial backing that enables us to deliver world-class 
                  AI solutions while maintaining the highest standards of compliance and security.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">30+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Countries of Operation</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <Briefcase className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">$2B+</div>
                <div className="text-sm text-gray-600">Assets Under Management</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {achievement.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {achievement.metric}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  {achievement.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <Badge className="mb-4 bg-blue-100 text-blue-800">
                    {member.role}
                  </Badge>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology & Innovation */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="w-6 h-6 mr-2 text-yellow-500" />
              Technology & Innovation
            </CardTitle>
            <CardDescription>
              Cutting-edge AI technologies powering our platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Machine Learning
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Advanced ML algorithms analyze visa requirements, predict approval chances, 
                  and optimize application strategies for maximum success rates.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Natural Language Processing
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  NLP technology processes immigration documents, extracts key information, 
                  and provides intelligent recommendations in multiple languages.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Computer Vision
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  OCR and image recognition technology automatically validates documents, 
                  detects inconsistencies, and ensures compliance with immigration standards.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <MapPin className="w-6 h-6 mr-2 text-blue-600" />
              Get in Touch
            </CardTitle>
            <CardDescription>
              Connect with ThinkNeo.AI and SHK Hong Kong Group
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-4">ThinkNeo.AI Headquarters</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">
                      Level 25, International Commerce Centre<br />
                      1 Austin Road West, Tsim Sha Tsui<br />
                      Kowloon, Hong Kong
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">info@thinkneo.ai</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">+852 3892-1234</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-4">SHK Hong Kong Group</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">
                      SHK Tower, 68 Yee Wo Street<br />
                      Causeway Bay, Hong Kong
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">contact@shkgroup.hk</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">+852 2891-5678</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit SHK Group Website
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Investor Relations
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Career Opportunities
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;