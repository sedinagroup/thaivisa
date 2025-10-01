import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ChatWidget from '@/components/ChatWidget';
import { 
  Bot, 
  Scan, 
  FileCheck, 
  Brain, 
  MessageCircle, 
  Shield, 
  Clock, 
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  Target,
  Globe,
  Award,
  TrendingUp,
  Users,
  Sparkles,
  Camera,
  FileText,
  MapPin,
  Calendar,
  AlertCircle,
  ChevronRight,
  Plane,
  Hotel,
  Car,
  Utensils,
  Map,
  DollarSign,
  CloudSun,
  Navigation,
  Gift,
  Compass,
  Briefcase,
  Eye,
  User,
  Rocket
} from 'lucide-react';

const Index: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section with Background Image */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23ff6b35;stop-opacity:0.3" /><stop offset="50%" style="stop-color:%2300d4aa;stop-opacity:0.3" /><stop offset="100%" style="stop-color:%23f7931e;stop-opacity:0.3" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23grad1)"/><circle cx="200" cy="150" r="80" fill="%23ff6b35" opacity="0.2"/><circle cx="800" cy="200" r="120" fill="%2300d4aa" opacity="0.2"/><circle cx="1000" cy="600" r="100" fill="%23f7931e" opacity="0.2"/><path d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z" fill="%2300d4aa" opacity="0.1"/></svg>')`
          }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              <Bot className="w-4 h-4 mr-2" />
              {t('home.hero.badge')}
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {t('home.hero.title')}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              {t('home.hero.subtitle')}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t('home.hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <Button asChild size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link to="/apply" className="flex items-center">
                  <Scan className="w-5 h-5 mr-2" />
                  {t('home.hero.startApplication')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link to="/register" className="flex items-center">
                    <Scan className="w-5 h-5 mr-2" />
                    {t('home.hero.getStarted')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg border-2">
                  <Link to="#visa-types" className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    {t('home.hero.learnMore')}
                  </Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.hero.stats.aiAccuracy')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">3x</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.hero.stats.fasterProcessing')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.hero.stats.successRate')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">4.9</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.hero.stats.userRating')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.aiFeatures.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.aiFeatures.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileCheck className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{t('home.aiFeatures.documentChecker.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  {t('home.aiFeatures.documentChecker.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{t('home.aiFeatures.visaAdvisor.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  {t('home.aiFeatures.visaAdvisor.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{t('home.aiFeatures.tripPlanner.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  {t('home.aiFeatures.tripPlanner.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{t('home.aiFeatures.assistantChat.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  {t('home.aiFeatures.assistantChat.description')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl opacity-90 mb-8">
            {t('home.cta.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button asChild size="lg" className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/apply" className="flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  {t('home.cta.startApplication')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100">
                  <Link to="/register" className="flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    {t('home.cta.getStarted')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600">
                  <Link to="/credits" className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t('home.cta.viewPricing')}
                  </Link>
                </Button>
              </>
            )}
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">50,000+</div>
              <div className="opacity-80">{t('home.cta.happyTravelers')}</div>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">98%</div>
              <div className="opacity-80">{t('home.cta.successRate')}</div>
            </div>
            <div>
              <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="opacity-80">{t('home.cta.aiSupport')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;