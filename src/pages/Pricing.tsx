import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/hooks/useCredits';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Zap, 
  Crown, 
  Star, 
  Coins,
  CreditCard,
  ArrowRight,
  Gift,
  TrendingUp,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

const Pricing: React.FC = () => {
  const { user } = useAuth();
  const { credits, purchaseCredits } = useCredits();
  const navigate = useNavigate();

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter Pack',
      price: 9.99,
      credits: 500,
      popular: false,
      savings: 0,
      icon: <Coins className="w-6 h-6" />,
      color: 'bg-blue-500',
      features: [
        '500 AI Credits',
        '2-3 Visa Applications',
        'Basic Document Analysis',
        'Standard Support',
        'Valid for 6 months'
      ]
    },
    {
      id: 'popular',
      name: 'Popular Choice',
      price: 24.99,
      credits: 1500,
      popular: true,
      savings: 25,
      icon: <Star className="w-6 h-6" />,
      color: 'bg-purple-500',
      features: [
        '1,500 AI Credits',
        '6-8 Visa Applications',
        'Advanced Document Analysis',
        'Priority Support',
        'Trip Planning Included',
        'Valid for 1 year'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 49.99,
      credits: 3500,
      popular: false,
      savings: 40,
      icon: <Crown className="w-6 h-6" />,
      color: 'bg-gold-500',
      features: [
        '3,500 AI Credits',
        '15+ Visa Applications',
        'Premium Document Analysis',
        'VIP Support',
        'Unlimited Trip Planning',
        'Document Templates',
        'Valid for 1 year'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99.99,
      credits: 8000,
      popular: false,
      savings: 60,
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-emerald-500',
      features: [
        '8,000 AI Credits',
        'Unlimited Applications',
        'Enterprise Document Analysis',
        'Dedicated Support Manager',
        'Custom Integrations',
        'API Access',
        'Team Management',
        'Valid for 2 years'
      ]
    }
  ];

  const handlePurchase = async (plan: typeof pricingPlans[0]) => {
    if (!user) {
      toast.error('Please login to purchase credits');
      navigate('/login');
      return;
    }

    try {
      toast.info(`Processing purchase of ${plan.credits} credits...`);
      
      // Simulate payment processing
      setTimeout(async () => {
        const success = await purchaseCredits(plan.credits, plan.price);
        
        if (success) {
          toast.success(`Successfully purchased ${plan.credits} credits!`);
          
          // Show celebration message for larger purchases
          if (plan.credits >= 1500) {
            setTimeout(() => {
              toast.success('🎉 Bonus: You received extra credits for bulk purchase!');
            }, 1000);
          }
        } else {
          toast.error('Purchase failed. Please try again.');
        }
      }, 2000);
      
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Purchase failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Credits</span> Plan
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Power your visa applications and travel planning with our advanced AI. 
            Get more done with flexible credit packages that fit your needs.
          </p>

          {/* Current Credits Display */}
          {user && (
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border">
              <Coins className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900 dark:text-white">
                Current Balance: {credits} Credits
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                plan.popular 
                  ? 'ring-2 ring-purple-500 shadow-2xl transform scale-105' 
                  : 'hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-semibold">
                  🔥 MOST POPULAR
                </div>
              )}
              
              {plan.savings > 0 && (
                <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                  Save {plan.savings}%
                </Badge>
              )}

              <CardHeader className={`${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <div className={`w-12 h-12 ${plan.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                  {plan.icon}
                </div>
                
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                
                <div className="space-y-2">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-500 ml-2">one-time</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-blue-600" />
                    <span className="text-lg font-semibold text-blue-600">
                      {plan.credits.toLocaleString()} Credits
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    ${(plan.price / plan.credits * 1000).toFixed(2)} per 1000 credits
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePurchase(plan)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  } text-white font-semibold py-3`}
                  disabled={!user}
                >
                  {!user ? (
                    'Login to Purchase'
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Buy {plan.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Processing</h3>
            <p className="text-gray-600 text-sm">
              Credits are added to your account immediately after purchase. Start using AI services right away.
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Best Value</h3>
            <p className="text-gray-600 text-sm">
              Bulk purchases offer significant savings. The more you buy, the more you save per credit.
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Gift className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Bonus Credits</h3>
            <p className="text-gray-600 text-sm">
              Larger purchases include bonus credits. Get extra value with our premium packages.
            </p>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-left">
              <h3 className="font-semibold mb-2">How do credits work?</h3>
              <p className="text-sm text-gray-600">
                Credits are consumed when you use AI services like visa applications, document analysis, and trip planning. Different services cost different amounts of credits.
              </p>
            </Card>

            <Card className="p-6 text-left">
              <h3 className="font-semibold mb-2">Do credits expire?</h3>
              <p className="text-sm text-gray-600">
                Credits have different expiration periods based on your package. Starter packs last 6 months, while larger packages last 1-2 years.
              </p>
            </Card>

            <Card className="p-6 text-left">
              <h3 className="font-semibold mb-2">Can I get a refund?</h3>
              <p className="text-sm text-gray-600">
                We offer a 30-day money-back guarantee if you're not satisfied with our service. Contact support for assistance.
              </p>
            </Card>

            <Card className="p-6 text-left">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-gray-600">
                We accept all major credit cards, PayPal, and other secure payment methods through our payment processor.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="mb-6">Create your account and get 100 welcome credits for free!</p>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
              >
                Create Free Account
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;