import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/hooks/useCredits';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const Pricing: React.FC = () => {
  const { user } = useAuth();
  const { purchaseCredits } = useCredits();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  // APENAS 3 PACOTES conforme solicitado
  const packages = [
    {
      id: 'starter',
      name: 'Starter Pack',
      credits: 100,
      price: 9.99,
      bonus: 0,
      popular: false,
      description: 'Perfect for single visa applications',
      features: [
        '1-2 Visa Applications',
        'Basic Document Analysis',
        'Standard Support',
        'Email Support'
      ]
    },
    {
      id: 'professional',
      name: 'Professional Pack',
      credits: 300,
      price: 24.99,
      bonus: 50,
      popular: true,
      description: 'Great for frequent travelers',
      features: [
        '4-6 Visa Applications',
        'Advanced Document Analysis',
        'Trip Planning Included',
        'Priority Support',
        '50 Bonus Credits'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Pack',
      credits: 500,
      price: 39.99,
      bonus: 100,
      popular: false,
      description: 'For power users and agencies',
      features: [
        '8-12 Visa Applications',
        'Premium Document Analysis',
        'Unlimited Trip Planning',
        'Dedicated Support',
        '100 Bonus Credits',
        'Priority Processing'
      ]
    }
  ];

  const handlePurchase = async (packageId: string) => {
    if (!user) {
      toast.error('Please log in to purchase credits');
      navigate('/login');
      return;
    }

    setLoading(packageId);
    
    try {
      const success = await purchaseCredits(packageId, 'paypal');
      if (success) {
        toast.success('Redirecting to PayPal...');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Failed to initiate purchase');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Credit Package
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Flexible pricing for all your visa application needs. Pay once, use credits across all our AI-powered services.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative transition-all duration-300 hover:shadow-2xl ${
                pkg.popular 
                  ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {pkg.description}
                </CardDescription>
                
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-500 ml-1">/package</span>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-center space-x-2">
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      <Zap className="w-3 h-3 mr-1" />
                      {pkg.credits} Credits
                    </Badge>
                    {pkg.bonus > 0 && (
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        +{pkg.bonus} Bonus
                      </Badge>
                    )}
                  </div>
                  
                  {pkg.bonus > 0 && (
                    <p className="text-sm text-green-600 mt-2 font-medium">
                      Total: {pkg.credits + pkg.bonus} Credits
                    </p>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handlePurchase(pkg.id)}
                  disabled={loading === pkg.id}
                  className={`w-full ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : ''
                  }`}
                  size="lg"
                >
                  {loading === pkg.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      {pkg.popular ? 'Get Started' : 'Choose Package'}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-gray-600">Advanced AI algorithms for document verification and visa eligibility assessment</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">High Accuracy</h3>
              <p className="text-sm text-gray-600">98% accuracy rate in document analysis and eligibility predictions</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Premium Support</h3>
              <p className="text-sm text-gray-600">Priority customer support with dedicated assistance for your applications</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Usage</h3>
              <p className="text-sm text-gray-600">Credits never expire and can be used across all our AI services</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-2">How do credits work?</h3>
              <p className="text-gray-600">Credits are consumed when you use our AI services. Different actions have different credit costs. For example, a basic document analysis costs 15 credits, while a complete visa application analysis costs 50 credits.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-2">Do credits expire?</h3>
              <p className="text-gray-600">No, credits never expire. You can use them whenever you need our services, whether it's today or months from now.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-2">Can I get a refund?</h3>
              <p className="text-gray-600">Credits are non-refundable once purchased, but since they never expire, you can always use them for our services when needed.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept PayPal for secure and convenient payments. More payment options will be available soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;