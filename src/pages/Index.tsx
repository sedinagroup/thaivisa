import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Briefcase
} from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              <Bot className="w-4 h-4 mr-2" />
              AI-Powered Platform
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            AI-Powered Thailand
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Visa & Travel Assistant
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Complete AI support for document verification, visa information, and trip bureaucracy management. 
            Let our advanced AI handle all the complexity while you focus on your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link to="/apply" className="flex items-center">
                <Scan className="w-5 h-5 mr-2" />
                Start AI Visa Check
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg border-2">
              <Link to="#visa-types" className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Explore Visa Types
              </Link>
            </Button>
          </div>
          
          {/* Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">3x</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Faster Processing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">4.9</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI-Powered Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our advanced AI handles every aspect of your Thailand visa journey with unprecedented accuracy and speed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileCheck className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">AI Document Checker</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Upload any document for instant AI verification and compliance checking with 95% accuracy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">AI Visa Advisor</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Get personalized visa recommendations based on your profile and travel plans.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">AI Trip Planner</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Complete bureaucratic planning for your Thailand trip with intelligent scheduling.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">AI Assistant Chat</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  24/7 AI support for all visa and travel questions with instant, accurate responses.
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
              AI Trip Planner - Complete Travel Management
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Get personalized AI recommendations for flights, accommodations, transportation, and special services in Thailand. 
              Save time and money with intelligent travel planning.
            </p>
          </div>

          {/* AI Travel Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">Flight Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Smart flight search</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Price predictions</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Best route analysis</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Seat recommendations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Hotel className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">Hotel & Accommodation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Personalized matching</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Location optimizer</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Price comparison</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Amenity matching</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">Transportation Services</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Airport transfers</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Local transport</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Car rental optimizer</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Route planning</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">Special Services</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Tour packages</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Restaurant recommendations</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Cultural experiences</li>
                  <li className="flex items-center justify-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Emergency support</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Interactive AI Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Interactive AI Features
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Map className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Smart Itinerary Builder</h4>
                    <p className="text-gray-600 dark:text-gray-400">AI creates personalized day-by-day travel plans based on your interests and preferences.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Budget Optimizer</h4>
                    <p className="text-gray-600 dark:text-gray-400">AI analyzes thousands of options to find the best value for your travel budget.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CloudSun className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Weather Integration</h4>
                    <p className="text-gray-600 dark:text-gray-400">AI adjusts recommendations based on weather forecasts and seasonal conditions.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Real-time Updates</h4>
                    <p className="text-gray-600 dark:text-gray-400">AI provides live travel updates, flight changes, and alternative recommendations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center mb-6">
                  <Compass className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">AI Trip Planner Interface</h3>
                  <p className="opacity-90">Personalized travel planning powered by AI</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Travel Dates</span>
                      <Calendar className="w-5 h-5 text-blue-300" />
                    </div>
                    <div className="text-sm opacity-80">Dec 15 - Dec 25, 2024</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Budget Range</span>
                      <DollarSign className="w-5 h-5 text-green-300" />
                    </div>
                    <div className="text-sm opacity-80">$2,000 - $3,000 USD</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">AI Recommendations</span>
                      <Bot className="w-5 h-5 text-purple-300" />
                    </div>
                    <div className="text-sm opacity-80">15 personalized suggestions ready</div>
                  </div>
                  
                  <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100 mt-4">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Trip Plan
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Credit-Based Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-lg">Basic Trip Plan</CardTitle>
                <div className="text-3xl font-bold text-blue-600">25</div>
                <div className="text-sm text-gray-600">credits</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Basic AI recommendations for flights, hotels, and transport</p>
                <Button variant="outline" className="w-full">
                  Get Basic Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="text-lg">Advanced Trip Plan</CardTitle>
                <div className="text-3xl font-bold text-purple-600">50</div>
                <div className="text-sm text-gray-600">credits</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Detailed itinerary with alternatives and optimization</p>
                <Button variant="outline" className="w-full">
                  Get Advanced Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-lg">Premium Trip Plan</CardTitle>
                <div className="text-3xl font-bold text-green-600">100</div>
                <div className="text-sm text-gray-600">credits</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Complete travel management with real-time updates</p>
                <Button variant="outline" className="w-full">
                  Get Premium Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <CardHeader>
                <CardTitle className="text-lg">VIP Concierge</CardTitle>
                <div className="text-3xl font-bold text-orange-600">200</div>
                <div className="text-sm text-gray-600">credits</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Personal AI travel assistant with 24/7 support</p>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Get VIP Service
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Success Stories */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              AI Trip Planning Success Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">92%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Users book AI-recommended services</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">30%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average savings with AI optimization</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.8/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Stars for AI travel planning</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Hours saved with AI research</div>
              </div>
            </div>
          </div>

          {/* How AI Trip Planning Works */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
              How AI Trip Planning Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Tell AI Your Preferences</h4>
                <p className="text-gray-600 dark:text-gray-400">Share your travel style, budget, interests, and dates with our AI system.</p>
                <div className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 hidden lg:block"></div>
              </div>
              
              <div className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">AI Analyzes Options</h4>
                <p className="text-gray-600 dark:text-gray-400">AI compares thousands of flights, hotels, and activities to find the best matches.</p>
                <div className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-purple-500 to-green-500 hidden lg:block"></div>
              </div>
              
              <div className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Get Personalized Plan</h4>
                <p className="text-gray-600 dark:text-gray-400">Receive tailored recommendations with explanations and alternative options.</p>
                <div className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-green-500 to-orange-500 hidden lg:block"></div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  4
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Book with Confidence</h4>
                <p className="text-gray-600 dark:text-gray-400">AI monitors and updates your trip with real-time information and support.</p>
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
              Complete Visa Information Hub
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              AI-powered guidance for every type of Thailand visa with personalized recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Tourist Visa (TR)</CardTitle>
                  <Badge variant="secondary">Most Popular</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Complete guide and AI-assisted application for tourism and leisure visits.
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />AI document verification</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Instant eligibility check</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Smart form filling</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Business Visa (B)</CardTitle>
                  <Badge variant="outline">Professional</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Requirements and AI document verification for business activities.
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Business document analysis</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Invitation letter verification</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Company registration check</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Education Visa (ED)</CardTitle>
                  <Badge variant="outline">Students</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Student visa support with AI guidance for educational institutions.
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Academic document verification</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Institution validation</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Financial proof analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Transit Visa (TS)</CardTitle>
                  <Badge variant="outline">Quick</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Quick processing with AI assistance for transit passengers.
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Flight itinerary verification</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Transit time calculation</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Express processing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Special Visas</CardTitle>
                  <Badge variant="outline">Premium</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Retirement, Investment, and other special visa categories with AI recommendations.
                </CardDescription>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Eligibility assessment</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Investment verification</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Personalized guidance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-indigo-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">AI Recommendations</CardTitle>
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Smart</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Let AI analyze your profile and recommend the best visa type for your needs.
                </CardDescription>
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Bot className="w-4 h-4 mr-2" />
                  Get AI Recommendation
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
            <h2 className="text-4xl font-bold mb-4">AI-Powered Features</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Experience the future of visa processing with our cutting-edge AI technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scan className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Document Analysis</h3>
              <p className="opacity-80">AI scans and verifies all your documents with 95% accuracy in seconds.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Intelligent Form Filling</h3>
              <p className="opacity-80">OCR + AI automatically fills all forms with extracted passport data.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Risk Assessment</h3>
              <p className="opacity-80">AI predicts approval chances and suggests improvements before submission.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Updates</h3>
              <p className="opacity-80">AI monitors your application status and provides instant updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How AI Makes It Simple
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Four simple steps powered by advanced AI to get your Thailand visa approved.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Upload Passport</h3>
              <p className="text-gray-600 dark:text-gray-400">AI extracts data instantly from your passport photo using advanced OCR technology.</p>
              <div className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 hidden lg:block"></div>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">AI analyzes your profile and recommends the best visa type for your needs.</p>
              <div className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-purple-500 to-green-500 hidden lg:block"></div>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Document Verification</h3>
              <p className="text-gray-600 dark:text-gray-400">AI verifies all documents and ensures 100% compliance with requirements.</p>
              <div className="absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-green-500 to-orange-500 hidden lg:block"></div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Smart Submission</h3>
              <p className="text-gray-600 dark:text-gray-400">AI submits your application and monitors progress with real-time updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trip Management Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Trip Management
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              AI manages all bureaucratic aspects of your Thailand trip so you can focus on planning the fun parts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Bureaucratic Planning</h3>
                  <p className="text-gray-600 dark:text-gray-400">AI manages all paperwork and deadlines with intelligent scheduling and reminders.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Document Timeline</h3>
                  <p className="text-gray-600 dark:text-gray-400">Smart scheduling for document preparation with automated progress tracking.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Compliance Monitoring</h3>
                  <p className="text-gray-600 dark:text-gray-400">AI ensures all requirements are met and alerts you to any issues instantly.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Emergency Support</h3>
                  <p className="text-gray-600 dark:text-gray-400">AI-powered urgent assistance for time-sensitive visa and travel issues.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center mb-6">
                  <Bot className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">AI Travel Assistant</h3>
                  <p className="opacity-90">Your personal AI assistant for all Thailand visa and travel needs</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Document Status</span>
                      <CheckCircle className="w-5 h-5 text-green-300" />
                    </div>
                    <div className="text-sm opacity-80">All documents verified and compliant</div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Application Progress</span>
                      <div className="text-sm">85%</div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Next Step</span>
                      <Clock className="w-5 h-5 text-yellow-300" />
                    </div>
                    <div className="text-sm opacity-80">Submit final documents by Dec 15</div>
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
            Ready to Experience AI-Powered Visa Processing?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of travelers who trust our AI to handle their Thailand visa applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/apply" className="flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Start AI Passport Scan
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/credits" className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                View Pricing
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">50,000+</div>
              <div className="opacity-80">Happy Travelers</div>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">98%</div>
              <div className="opacity-80">Success Rate</div>
            </div>
            <div>
              <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="opacity-80">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg" 
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};

export default Index;