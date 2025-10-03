import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Coins, 
  CreditCard, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Gift,
  Zap,
  Shield,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';
import { toast } from 'sonner';
import { CREDIT_PACKAGES } from '@/services/creditService';

const PurchaseCredits: React.FC = () => {
  const { user } = useAuth();
  const { credits, purchaseCredits } = useCredits();
  const navigate = useNavigate();
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);

  // Enhanced credit packages for maximum profitability
  const enhancedPackages = [
    {
      id: 'starter',
      name: 'Starter Pack',
      credits: 100,
      price: 9.99,
      bonus: 0,
      popular: false,
      savings: 0,
      description: 'Perfect for trying our services',
      features: ['Basic visa applications', 'Document analysis', 'AI chat support'],
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'professional',
      name: 'Professional Pack',
      credits: 500,
      price: 39.99,
      bonus: 100,
      popular: true,
      savings: 20,
      description: 'Most popular choice for regular users',
      features: ['Multiple visa applications', 'Trip planning', 'Priority support', 'Bonus credits'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'business',
      name: 'Business Pack',
      credits: 1000,
      price: 69.99,
      bonus: 300,
      popular: false,
      savings: 35,
      description: 'Best value for heavy users',
      features: ['Unlimited applications', 'Advanced AI features', '24/7 support', 'Bulk operations'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Pack',
      credits: 2500,
      price: 149.99,
      bonus: 750,
      popular: false,
      savings: 50,
      description: 'Maximum value for businesses',
      features: ['Enterprise features', 'API access', 'Custom integrations', 'Dedicated support'],
      color: 'from-amber-500 to-orange-600'
    }
  ];

  const handlePurchase = async (packageId: string) => {
    if (!user) {
      toast.error('Please log in to purchase credits');
      navigate('/login');
      return;
    }

    setPurchaseLoading(packageId);
    try {
      const success = await purchaseCredits(packageId, 'paypal');
      if (!success) {
        setPurchaseLoading(null);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Failed to initiate purchase');
      setPurchaseLoading(null);
    }
  };

  const creditUsageExamples = [
    {
      service: 'Visa Application',
      actions: [
        'Select visa type: 5 credits',
        'Upload passport (OCR): 15 credits', 
        'Continue to next step: 5 credits',
        'Upload documents: 5 credits',
        'Final analysis: 50 credits'
      ],
      total: '80 credits per application',
      icon: '🎯',
      color: 'text-red-600'
    },
    {
      service: 'Trip Planning',
      actions: [
        'Each planning step: 3-5 credits',
        'Generate itinerary: 25-100 credits',
        'Modify plans: 10 credits each',
        'Export itinerary: 5 credits'
      ],
      total: '50-150 credits per trip',
      icon: '✈️',
      color: 'text-blue-600'
    },
    {
      service: 'Document Analysis',
      actions: [
        'Upload document: 3 credits',
        'OCR processing: 8 credits',
        'AI analysis: 15 credits',
        'Generate report: 10 credits'
      ],
      total: '36 credits per document',
      icon: '📄',
      color: 'text-green-600'
    },
    {
      service: 'AI Chat Support',
      actions: [
        'Simple questions: 2 credits',
        'Complex queries: 5-8 credits',
        'Visa consultation: 15 credits',
        'Legal advice: 25 credits'
      ],
      total: '2-25 credits per message',
      icon: '💬',
      color: 'text-purple-600'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Login Required</h2>
              <p className="text-gray-600 mb-6">Please log in to purchase credits.</p>
              <Button onClick={() => navigate('/login')}>
                Login to Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mr-4 shadow-lg">
              <Coins className="h-10 w-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                Purchase Credits
              </h1>
              <p className="text-xl text-amber-600 dark:text-amber-400 font-medium">
                Power up your ThaiVisa.ai experience
              </p>
            </div>
          </div>
          
          {/* Current Balance Alert */}
          <Card className={`max-w-md mx-auto mb-8 ${credits < 50 ? 'bg-red-50 border-red-200' : 'bg-gradient-to-r from-blue-500 to-purple-600'} text-white border-0`}>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">
                {credits} Credits Remaining
              </div>
              {credits < 50 ? (
                <div className="text-red-600 dark:text-red-400 font-medium">
                  ⚠️ Low Balance! Purchase credits to continue using our services
                </div>
              ) : (
                <div className="text-blue-100">
                  You're all set! But more credits = more possibilities
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Urgency Banner */}
        {credits < 20 && (
          <div className="mb-8 p-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="w-6 h-6 mr-2" />
              <span className="font-bold text-lg">URGENT: Credits Running Low!</span>
            </div>
            <p>You need more credits to continue using our premium AI services. Purchase now to avoid interruption!</p>
          </div>
        )}

        {/* Credit Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {enhancedPackages.map((pkg) => (
            <Card key={pkg.id} className={`relative overflow-hidden ${pkg.popular ? 'ring-4 ring-blue-500 scale-105' : ''} hover:shadow-2xl transition-all duration-300`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-blue-500 text-white px-4 py-2 text-sm font-bold">
                    <Star className="w-4 h-4 mr-1" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              {pkg.savings > 0 && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  SAVE {pkg.savings}%
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${pkg.color}`}></div>
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                <CardDescription className="text-sm">{pkg.description}</CardDescription>
                <div className="text-4xl font-bold text-blue-600 mt-4">
                  ${pkg.price}
                </div>
                <div className="text-sm text-gray-600">
                  ${(pkg.price / (pkg.credits + pkg.bonus)).toFixed(3)} per credit
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{pkg.credits}</div>
                  <div className="text-sm text-gray-600">Base Credits</div>
                  {pkg.bonus > 0 && (
                    <div className="flex items-center justify-center mt-2 text-green-600">
                      <Gift className="w-4 h-4 mr-1" />
                      <span className="font-medium">+{pkg.bonus} BONUS Credits!</span>
                    </div>
                  )}
                  <div className="text-2xl font-bold text-purple-600 mt-2 border-t pt-2">
                    Total: {pkg.credits + pkg.bonus} Credits
                  </div>
                </div>
                
                <div className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => handlePurchase(pkg.id)}
                  className={`w-full text-lg py-6 ${pkg.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''} shadow-lg hover:shadow-xl transition-all duration-300`}
                  variant={pkg.popular ? 'default' : 'outline'}
                  disabled={purchaseLoading === pkg.id}
                  size="lg"
                >
                  {purchaseLoading === pkg.id ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Buy Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Credit Usage Examples */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <TrendingUp className="w-6 h-6 mr-2 text-red-500" />
              How Credits Are Used (Per Action Pricing)
            </CardTitle>
            <CardDescription className="text-lg">
              Every action on our platform consumes credits. Here's exactly what you'll pay:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creditUsageExamples.map((example, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{example.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg">{example.service}</h3>
                      <p className={`font-bold ${example.color}`}>{example.total}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {example.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-center text-sm">
                        <Zap className="w-3 h-3 text-yellow-500 mr-2" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border border-red-200">
              <h4 className="font-bold text-lg text-red-700 dark:text-red-300 mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Important: Pay-Per-Action System
              </h4>
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-2">
                <li>• Every click, upload, and analysis consumes credits immediately</li>
                <li>• No refunds for consumed credits - choose your actions wisely</li>
                <li>• Services are blocked when you have insufficient credits</li>
                <li>• Average user spends 100-200 credits per session</li>
                <li>• Heavy users may need 500+ credits per day</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Social Proof */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-green-600 mr-2" />
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-300">Join 50,000+ Happy Users</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">98%</div>
                <div className="text-sm text-green-600">Success Rate</div>
              </div>
              <div className="text-center">
                <Zap className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">2M+</div>
                <div className="text-sm text-green-600">Documents Processed</div>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">100%</div>
                <div className="text-sm text-green-600">Secure Payments</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">Secure & Instant</h3>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              All payments are processed securely through PayPal and Stripe. Credits are added instantly to your account.
              Your payment information is never stored on our servers. Credits never expire.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PurchaseCredits;