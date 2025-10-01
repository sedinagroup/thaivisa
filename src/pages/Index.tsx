import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  CheckCircle, 
  FileCheck, 
  MapPin, 
  Users, 
  Clock,
  Star,
  Shield,
  Zap,
  Globe,
  Award,
  TrendingUp
} from 'lucide-react';

const Index: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const features = [
    {
      icon: FileCheck,
      title: t('home.features.aiDocumentChecker.title'),
      description: t('home.features.aiDocumentChecker.description'),
      color: 'bg-blue-500'
    },
    {
      icon: MapPin,
      title: t('home.features.tripPlanner.title'),
      description: t('home.features.tripPlanner.description'),
      color: 'bg-green-500'
    },
    {
      icon: Users,
      title: t('home.features.expertSupport.title'),
      description: t('home.features.expertSupport.description'),
      color: 'bg-purple-500'
    },
    {
      icon: Clock,
      title: t('home.features.fastProcessing.title'),
      description: t('home.features.fastProcessing.description'),
      color: 'bg-orange-500'
    }
  ];

  const stats = [
    { icon: TrendingUp, value: '50K+', label: t('home.stats.applicationsProcessed') },
    { icon: Award, value: '98%', label: t('home.stats.successRate') },
    { icon: Globe, value: '150+', label: t('home.stats.countriesSupported') },
    { icon: Clock, value: '3-5', label: t('home.stats.avgProcessingTime') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">TV</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t('home.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
              {t('home.subtitle')}
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              {t('home.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link to="/apply">
                    {t('home.cta.startApplication')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Link to="/register">
                      {t('home.getStarted')}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="#features">{t('home.learnMore')}</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the future of visa applications with our AI-powered platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get your Thailand visa in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Documents',
                description: 'Upload your passport and required documents for AI verification',
                icon: FileCheck
              },
              {
                step: '2',
                title: 'AI Processing',
                description: 'Our AI analyzes your documents and creates your application',
                icon: Zap
              },
              {
                step: '3',
                title: 'Get Your Visa',
                description: 'Receive your approved visa and travel to Thailand',
                icon: CheckCircle
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-blue-600">
                        <span className="text-sm font-bold text-blue-600">{item.step}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t('home.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link to="/apply">
                    {t('home.cta.startApplication')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                    <Link to="/register">
                      {t('home.getStarted')}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                    <Link to="/login">{t('nav.signIn')}</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;