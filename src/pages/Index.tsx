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
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
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

      {/* AI Trip Planner Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.tripPlannerSection.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              {t('home.tripPlannerSection.description')}
            </p>
          </div>

          {/* AI Travel Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">{t('home.tripPlannerSection.services.flightRecommendations.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.flightRecommendations.features.smartFlightSearch')}</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.flightRecommendations.features.pricePredictions')}</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.flightRecommendations.features.bestRouteAnalysis')}</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.flightRecommendations.features.seatRecommendations')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Hotel className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">{t('home.tripPlannerSection.services.hotelAccommodation.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.hotelAccommodation.features.personalizedMatching')}</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.hotelAccommodation.features.locationOptimizer')}</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.hotelAccommodation.features.priceComparison')}</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.hotelAccommodation.features.amenityMatching')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">{t('home.tripPlannerSection.services.transportationServices.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.transportationServices.features.airportTransfers')}</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.transportationServices.features.localTransport')}</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.transportationServices.features.carRentalOptimizer')}</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.transportationServices.features.routePlanning')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">{t('home.tripPlannerSection.services.specialServices.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.specialServices.features.tourPackages')}</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.specialServices.features.restaurantRecommendations')}</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.specialServices.features.culturalExperiences')}</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.tripPlannerSection.services.specialServices.features.emergencySupport')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Interactive AI Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t('home.tripPlannerSection.interactiveFeatures.title')}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('home.tripPlannerSection.interactiveFeatures.smartItinerary.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{t('home.tripPlannerSection.interactiveFeatures.smartItinerary.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('home.tripPlannerSection.interactiveFeatures.budgetOptimizer.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{t('home.tripPlannerSection.interactiveFeatures.budgetOptimizer.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CloudSun className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('home.tripPlannerSection.interactiveFeatures.weatherIntegration.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{t('home.tripPlannerSection.interactiveFeatures.weatherIntegration.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('home.tripPlannerSection.interactiveFeatures.realTimeUpdates.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{t('home.tripPlannerSection.interactiveFeatures.realTimeUpdates.description')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center mb-6">
                  <Compass className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{t('home.tripPlannerSection.interface.title')}</h3>
                  <p className="opacity-90">{t('home.tripPlannerSection.interface.subtitle')}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{t('home.tripPlannerSection.interface.travelDates')}</span>
                      <Calendar className="w-5 h-5 text-blue-300" />
                    </div>
                    <div className="text-sm opacity-80">{t('home.tripPlannerSection.interface.sampleDates')}</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{t('home.tripPlannerSection.interface.budgetRange')}</span>
                      <DollarSign className="w-5 h-5 text-green-300" />
                    </div>
                    <div className="text-sm opacity-80">{t('home.tripPlannerSection.interface.sampleBudget')}</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{t('home.tripPlannerSection.interface.aiRecommendations')}</span>
                      <Bot className="w-5 h-5 text-purple-300" />
                    </div>
                    <div className="text-sm opacity-80">{t('home.tripPlannerSection.interface.sampleRecommendations')}</div>
                  </div>
                  
                  <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100 mt-4">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {t('home.tripPlannerSection.interface.generatePlan')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Credit-Based Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-lg">{t('home.tripPlannerSection.creditServices.basicPlan.title')}</CardTitle>
                <div className="text-3xl font-bold text-blue-600">25</div>
                <div className="text-sm text-gray-600">{t('home.tripPlannerSection.creditServices.basicPlan.credits')}</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('home.tripPlannerSection.creditServices.basicPlan.description')}</p>
                <Button variant="outline" className="w-full">
                  {t('home.tripPlannerSection.creditServices.basicPlan.button')}
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="text-lg">{t('home.tripPlannerSection.creditServices.advancedPlan.title')}</CardTitle>
                <div className="text-3xl font-bold text-purple-600">50</div>
                <div className="text-sm text-gray-600">{t('home.tripPlannerSection.creditServices.advancedPlan.credits')}</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('home.tripPlannerSection.creditServices.advancedPlan.description')}</p>
                <Button variant="outline" className="w-full">
                  {t('home.tripPlannerSection.creditServices.advancedPlan.button')}
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-lg">{t('home.tripPlannerSection.creditServices.premiumPlan.title')}</CardTitle>
                <div className="text-3xl font-bold text-green-600">100</div>
                <div className="text-sm text-gray-600">{t('home.tripPlannerSection.creditServices.premiumPlan.credits')}</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('home.tripPlannerSection.creditServices.premiumPlan.description')}</p>
                <Button variant="outline" className="w-full">
                  {t('home.tripPlannerSection.creditServices.premiumPlan.button')}
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <CardHeader>
                <CardTitle className="text-lg">{t('home.tripPlannerSection.creditServices.vipConcierge.title')}</CardTitle>
                <div className="text-3xl font-bold text-orange-600">200</div>
                <div className="text-sm text-gray-600">{t('home.tripPlannerSection.creditServices.vipConcierge.credits')}</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('home.tripPlannerSection.creditServices.vipConcierge.description')}</p>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  {t('home.tripPlannerSection.creditServices.vipConcierge.button')}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Success Stories */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {t('home.tripPlannerSection.successStories.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">92%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.tripPlannerSection.successStories.userBookings')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">30%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.tripPlannerSection.successStories.averageSavings')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.8/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.tripPlannerSection.successStories.planningRating')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.tripPlannerSection.successStories.timeSaved')}</div>
              </div>
            </div>
          </div>

          {/* How AI Trip Planning Works */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
              {t('home.tripPlannerSection.howItWorks.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('home.tripPlannerSection.howItWorks.step1.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400">{t('home.tripPlannerSection.howItWorks.step1.description')}</p>
                <div className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 hidden lg:block"></div>
              </div>
              
              <div className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('home.tripPlannerSection.howItWorks.step2.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400">{t('home.tripPlannerSection.howItWorks.step2.description')}</p>
                <div className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-purple-500 to-green-500 hidden lg:block"></div>
              </div>
              
              <div className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('home.tripPlannerSection.howItWorks.step3.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400">{t('home.tripPlannerSection.howItWorks.step3.description')}</p>
                <div className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-green-500 to-orange-500 hidden lg:block"></div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  4
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('home.tripPlannerSection.howItWorks.step4.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400">{t('home.tripPlannerSection.howItWorks.step4.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Information Hub */}
      <section id="visa-types" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.visaHub.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.visaHub.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{t('home.visaHub.touristVisa.title')}</CardTitle>
                  <Badge variant="secondary">{t('home.visaHub.touristVisa.badge')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {t('home.visaHub.touristVisa.description')}
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.touristVisa.features.aiDocumentVerification')}</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.touristVisa.features.instantEligibilityCheck')}</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.touristVisa.features.smartFormFilling')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{t('home.visaHub.businessVisa.title')}</CardTitle>
                  <Badge variant="outline">{t('home.visaHub.businessVisa.badge')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {t('home.visaHub.businessVisa.description')}
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.businessVisa.features.businessDocumentAnalysis')}</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.businessVisa.features.invitationLetterVerification')}</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.businessVisa.features.companyRegistrationCheck')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{t('home.visaHub.educationVisa.title')}</CardTitle>
                  <Badge variant="outline">{t('home.visaHub.educationVisa.badge')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {t('home.visaHub.educationVisa.description')}
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.educationVisa.features.academicDocumentVerification')}</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.educationVisa.features.institutionValidation')}</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.educationVisa.features.financialProofAnalysis')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{t('home.visaHub.transitVisa.title')}</CardTitle>
                  <Badge variant="outline">{t('home.visaHub.transitVisa.badge')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {t('home.visaHub.transitVisa.description')}
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.transitVisa.features.flightItineraryVerification')}</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.transitVisa.features.transitTimeCalculation')}</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.transitVisa.features.expressProcessing')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{t('home.visaHub.specialVisas.title')}</CardTitle>
                  <Badge variant="outline">{t('home.visaHub.specialVisas.badge')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {t('home.visaHub.specialVisas.description')}
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.specialVisas.features.eligibilityAssessment')}</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.specialVisas.features.investmentVerification')}</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />{t('home.visaHub.specialVisas.features.personalizedGuidance')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-indigo-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{t('home.visaHub.aiRecommendations.title')}</CardTitle>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">{t('home.visaHub.aiRecommendations.badge')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {t('home.visaHub.aiRecommendations.description')}
                </CardDescription>
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Bot className="w-4 h-4 mr-2" />
                  {t('home.visaHub.aiRecommendations.button')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI-Powered Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('home.aiPoweredFeatures.title')}</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              {t('home.aiPoweredFeatures.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scan className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('home.aiPoweredFeatures.smartDocumentAnalysis.title')}</h3>
              <p className="opacity-80">{t('home.aiPoweredFeatures.smartDocumentAnalysis.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('home.aiPoweredFeatures.intelligentFormFilling.title')}</h3>
              <p className="opacity-80">{t('home.aiPoweredFeatures.intelligentFormFilling.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('home.aiPoweredFeatures.riskAssessment.title')}</h3>
              <p className="opacity-80">{t('home.aiPoweredFeatures.riskAssessment.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('home.aiPoweredFeatures.realTimeUpdates.title')}</h3>
              <p className="opacity-80">{t('home.aiPoweredFeatures.realTimeUpdates.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.howItWorks.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('home.howItWorks.step1.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.howItWorks.step1.description')}</p>
              <div className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 hidden lg:block"></div>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('home.howItWorks.step2.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.howItWorks.step2.description')}</p>
              <div className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-purple-500 to-green-500 hidden lg:block"></div>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('home.howItWorks.step3.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.howItWorks.step3.description')}</p>
              <div className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-green-500 to-orange-500 hidden lg:block"></div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('home.howItWorks.step4.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('home.howItWorks.step4.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trip Management Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.tripManagement.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.tripManagement.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('home.tripManagement.bureaucraticPlanning.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t('home.tripManagement.bureaucraticPlanning.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('home.tripManagement.documentTimeline.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t('home.tripManagement.documentTimeline.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('home.tripManagement.complianceMonitoring.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t('home.tripManagement.complianceMonitoring.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('home.tripManagement.emergencySupport.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t('home.tripManagement.emergencySupport.description')}</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center mb-6">
                  <Bot className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{t('home.tripManagement.aiTravelAssistant.title')}</h3>
                  <p className="opacity-90">{t('home.tripManagement.aiTravelAssistant.subtitle')}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{t('home.tripManagement.aiTravelAssistant.documentStatus')}</span>
                      <CheckCircle className="w-5 h-5 text-green-300" />
                    </div>
                    <div className="text-sm opacity-80">{t('home.tripManagement.aiTravelAssistant.allDocumentsVerified')}</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{t('home.tripManagement.aiTravelAssistant.applicationProgress')}</span>
                      <div className="text-sm">85%</div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{t('home.tripManagement.aiTravelAssistant.nextStep')}</span>
                      <Clock className="w-5 h-5 text-yellow-300" />
                    </div>
                    <div className="text-sm opacity-80">{t('home.tripManagement.aiTravelAssistant.submitFinalDocuments')}</div>
                  </div>
                </div>
              </div>
            </div>
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