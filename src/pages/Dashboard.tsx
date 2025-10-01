import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Coins, 
  FileCheck, 
  Brain, 
  Calendar, 
  MessageCircle, 
  Plane,
  Hotel,
  Car,
  MapPin,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { credits } = useCredits();

  const aiServices = [
    {
      id: 'document-checker',
      title: 'AI Document Checker',
      description: 'Upload documents for instant AI verification',
      icon: FileCheck,
      color: 'bg-blue-500',
      credits: 20,
      path: '/ai/document-checker'
    },
    {
      id: 'visa-advisor',
      title: 'AI Visa Advisor',
      description: 'Get personalized visa recommendations',
      icon: Brain,
      color: 'bg-purple-500',
      credits: 25,
      path: '/ai/visa-advisor'
    },
    {
      id: 'trip-planner',
      title: 'AI Trip Planner',
      description: 'Complete bureaucratic planning',
      icon: Calendar,
      color: 'bg-green-500',
      credits: 40,
      path: '/ai/trip-planner'
    },
    {
      id: 'assistant-chat',
      title: 'AI Assistant Chat',
      description: '24/7 AI support for all questions',
      icon: MessageCircle,
      color: 'bg-orange-500',
      credits: 5,
      path: '/ai/chat'
    }
  ];

  const travelServices = [
    {
      title: 'Flight Recommendations',
      description: 'Smart flight search with price predictions',
      icon: Plane,
      color: 'bg-sky-500',
      path: '/travel/flights'
    },
    {
      title: 'Hotel & Accommodation',
      description: 'Personalized matching and price comparison',
      icon: Hotel,
      color: 'bg-emerald-500',
      path: '/travel/hotels'
    },
    {
      title: 'Transportation Services',
      description: 'Airport transfers and local transport',
      icon: Car,
      color: 'bg-violet-500',
      path: '/travel/transport'
    },
    {
      title: 'Special Services',
      description: 'Tour packages and cultural experiences',
      icon: MapPin,
      color: 'bg-rose-500',
      path: '/travel/special'
    }
  ];

  const recentActivity = [
    {
      action: 'Document Verification',
      description: 'Passport scan completed',
      time: '2 hours ago',
      status: 'completed',
      credits: -20
    },
    {
      action: 'Credit Purchase',
      description: 'Purchased 300 credits',
      time: '1 day ago',
      status: 'completed',
      credits: +300
    },
    {
      action: 'AI Trip Plan',
      description: 'Generated Bangkok itinerary',
      time: '2 days ago',
      status: 'completed',
      credits: -40
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your Thailand visa journey with AI-powered tools
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5" />
                    <span className="font-bold">{credits}</span>
                    <span className="text-sm opacity-90">credits</span>
                  </div>
                </CardContent>
              </Card>
              <Button asChild variant="outline">
                <Link to="/credits">Buy Credits</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available Credits</p>
                  <p className="text-2xl font-bold text-blue-600">{credits}</p>
                </div>
                <Coins className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Services Used</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Plans</p>
                  <p className="text-2xl font-bold text-purple-600">3</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                  <p className="text-2xl font-bold text-orange-600">98%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Services */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI-Powered Services</h2>
              <p className="text-gray-600 dark:text-gray-400">Access our advanced AI tools for visa processing</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {aiServices.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card key={service.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {service.credits} credits
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full" variant="outline">
                        <Link to={service.path} className="flex items-center justify-center">
                          Use Service
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Travel Services */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Travel Services</h2>
              <p className="text-gray-600 dark:text-gray-400">Complete travel planning with AI assistance</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {travelServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform mb-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full" variant="outline">
                        <Link to={service.path} className="flex items-center justify-center">
                          Explore
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Recent Activity</h2>
              <p className="text-gray-600 dark:text-gray-400">Your latest transactions and activities</p>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500">{activity.time}</p>
                          <span className={`text-xs font-medium ${
                            activity.credits > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {activity.credits > 0 ? '+' : ''}{activity.credits} credits
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full" variant="outline">
                  <Link to="/apply">Start New Application</Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/ai/chat">Ask AI Assistant</Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <Link to="/credits">Purchase Credits</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;