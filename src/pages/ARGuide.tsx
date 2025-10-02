import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Brain, 
  MapPin, 
  Clock, 
  Globe, 
  Smartphone,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Camera,
  Navigation,
  Languages,
  Users,
  Shield,
  Headphones
} from 'lucide-react';

const ARGuide: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Eye,
      title: 'Real-Time Information',
      description: 'Instant access to historical data, cultural insights, and tourist information through AR overlay',
      color: 'text-blue-500'
    },
    {
      icon: Brain,
      title: 'NEO AI Integration',
      description: '24/7 personalized AI assistant powered by THINKNEO brain for intelligent travel guidance',
      color: 'text-purple-500'
    },
    {
      icon: MapPin,
      title: 'Smart Navigation',
      description: 'AR-guided routes to attractions with optimized paths and real-time crowd information',
      color: 'text-green-500'
    },
    {
      icon: Languages,
      title: 'Live Translation',
      description: 'Instant translation of signs, menus, and conversations directly in your field of view',
      color: 'text-orange-500'
    },
    {
      icon: Camera,
      title: 'Interactive Experiences',
      description: 'Point at landmarks to unlock hidden stories, virtual reconstructions, and 3D models',
      color: 'text-red-500'
    },
    {
      icon: Users,
      title: 'Professional Guidance',
      description: 'Access to certified local guides and experts through AR video calls and live assistance',
      color: 'text-indigo-500'
    }
  ];

  const devices = [
    {
      name: 'Xreal One Pro',
      status: 'Fully Supported',
      badge: 'Recommended',
      features: ['4K Display', 'Hand Tracking', 'Voice Control']
    },
    {
      name: 'Apple Vision Pro',
      status: 'Compatible',
      badge: 'Premium',
      features: ['Eye Tracking', 'Spatial Audio', 'High Resolution']
    },
    {
      name: 'Meta Quest 3',
      status: 'Supported',
      badge: 'Popular',
      features: ['Mixed Reality', 'Hand Tracking', 'Wireless']
    }
  ];

  const plans = [
    {
      name: 'Explorer',
      price: '$9.99',
      period: 'per day',
      features: [
        'Basic AR information overlay',
        'Standard navigation',
        'Text translation',
        'Audio guides'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$24.99',
      period: 'per week',
      features: [
        'Full NEO AI integration',
        'Live expert guidance',
        'Advanced AR features',
        'Priority support',
        'Offline mode'
      ],
      popular: true
    },
    {
      name: 'VIP Experience',
      price: '$79.99',
      period: 'per month',
      features: [
        'Unlimited access',
        'Personal AR concierge',
        'Exclusive content',
        'Custom experiences',
        'White-glove support'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Background Image */}
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(/ar-guide-hero-new.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-600/80 text-white border-0 text-lg px-4 py-2">
            Powered by THINKNEO AI
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            AR Tourism Guide
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Experience Thailand like never before with augmented reality. Get real-time information, 
            AI-powered guidance, and immersive cultural insights through your AR glasses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
              <Eye className="w-6 h-6 mr-2" />
              Start AR Experience
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
              <Camera className="w-6 h-6 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-300">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              <span>Compatible with Xreal One Pro</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              <span>24/7 AI Assistant</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              <span>Real-time Translation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Revolutionary AR Tourism Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powered by THINKNEO AI, our AR guide transforms how you explore Thailand's rich culture and history.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Compatible AR Devices
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Works seamlessly with leading AR glasses and headsets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {devices.map((device, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <Headphones className="w-12 h-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{device.name}</CardTitle>
                  <Badge 
                    variant={device.badge === 'Recommended' ? 'default' : 'secondary'}
                    className="mx-auto"
                  >
                    {device.badge}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600 dark:text-green-400 font-semibold mb-4">
                    {device.status}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {device.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Choose Your AR Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Flexible plans to match your travel style and duration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-xl transition-all duration-300 ${
                  plan.popular 
                    ? 'border-2 border-blue-500 shadow-lg scale-105' 
                    : 'border border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full mt-8 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Thailand Experience?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of travelers who have discovered Thailand through our revolutionary AR guide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              <Zap className="w-6 h-6 mr-2" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
              <Shield className="w-6 h-6 mr-2" />
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Tourist Attractions</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.9★</div>
              <div className="text-blue-200">User Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ARGuide;