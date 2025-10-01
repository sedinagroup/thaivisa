import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle, 
  Star,
  Gift,
  Zap,
  Crown,
  Shield,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  bonus?: number;
  features: string[];
  icon: React.ReactNode;
}

const PayPalPayment: React.FC = () => {
  const { user } = useAuth();
  const { credits, addCredits } = useCredits();
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [processing, setProcessing] = useState(false);

  const creditPackages: CreditPackage[] = [
    {
      id: 'starter',
      name: 'Starter Pack',
      credits: 100,
      price: 9.99,
      originalPrice: 12.99,
      bonus: 20,
      features: [
        '5 Document Analyses',
        '2 Trip Plans',
        'Basic Support',
        'Valid for 6 months'
      ],
      icon: <Gift className="w-6 h-6" />
    },
    {
      id: 'professional',
      name: 'Professional',
      credits: 300,
      price: 24.99,
      originalPrice: 34.99,
      popular: true,
      bonus: 75,
      features: [
        '15 Document Analyses',
        '7 Trip Plans',
        'Priority Support',
        'Valid for 12 months',
        'Advanced AI Features'
      ],
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      credits: 1000,
      price: 79.99,
      originalPrice: 99.99,
      bonus: 300,
      features: [
        '50 Document Analyses',
        '25 Trip Plans',
        'VIP Support',
        'Valid for 24 months',
        'All Premium Features',
        'Custom Solutions'
      ],
      icon: <Crown className="w-6 h-6" />
    }
  ];

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handlePayment = async () => {
    if (!selectedPackage) {
      toast.error('Please select a credit package');
      return;
    }

    const pkg = creditPackages.find(p => p.id === selectedPackage);
    if (!pkg) return;

    setProcessing(true);

    try {
      // Simulate PayPal payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Add credits to user account
      const totalCredits = pkg.credits + (pkg.bonus || 0);
      addCredits(totalCredits);

      toast.success(`Payment successful! ${totalCredits} credits added to your account.`);
      setSelectedPackage('');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const getPackageColor = (packageId: string) => {
    switch (packageId) {
      case 'starter':
        return 'from-green-500 to-emerald-600';
      case 'professional':
        return 'from-blue-500 to-purple-600';
      case 'enterprise':
        return 'from-purple-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Purchase Credits
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose the perfect credit package for your needs
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Current Balance: {credits} credits
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Secure PayPal Payment
            </Badge>
          </div>
        </div>

        {/* Credit Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {creditPackages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl ${
                selectedPackage === pkg.id 
                  ? 'ring-2 ring-blue-500 shadow-lg transform scale-105' 
                  : 'hover:shadow-lg'
              } ${pkg.popular ? 'border-blue-500' : ''}`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${getPackageColor(pkg.id)} rounded-xl flex items-center justify-center mx-auto mb-4 text-white`}>
                  {pkg.icon}
                </div>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription>Perfect for your needs</CardDescription>
              </CardHeader>
              
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${pkg.price}
                    </span>
                    {pkg.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${pkg.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-semibold text-blue-600">
                    {pkg.credits} Credits
                  </div>
                  {pkg.bonus && (
                    <div className="text-sm text-green-600 font-medium">
                      + {pkg.bonus} Bonus Credits
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-2">
                    Total: {pkg.credits + (pkg.bonus || 0)} credits
                  </div>
                  <div className="text-xs text-gray-500">
                    ${(pkg.price / (pkg.credits + (pkg.bonus || 0))).toFixed(3)} per credit
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Section */}
        {selectedPackage && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Summary
              </CardTitle>
              <CardDescription>
                Complete your purchase with PayPal
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const pkg = creditPackages.find(p => p.id === selectedPackage);
                if (!pkg) return null;

                return (
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-r ${getPackageColor(pkg.id)} rounded-lg flex items-center justify-center text-white`}>
                            {pkg.icon}
                          </div>
                          <div>
                            <div className="font-semibold">{pkg.name}</div>
                            <div className="text-sm text-gray-600">{pkg.credits} + {pkg.bonus || 0} bonus credits</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">${pkg.price}</div>
                          {pkg.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">${pkg.originalPrice}</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total Credits:</span>
                          <span className="font-bold text-blue-600">{pkg.credits + (pkg.bonus || 0)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={handlePayment}
                        disabled={processing}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
                      >
                        {processing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5 mr-2" />
                            Pay with PayPal
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedPackage('')}
                        disabled={processing}
                      >
                        Cancel
                      </Button>
                    </div>

                    <div className="text-center text-xs text-gray-500">
                      <Shield className="w-4 h-4 inline mr-1" />
                      Secure payment powered by PayPal. Your payment information is encrypted and secure.
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Why Choose Our Credits?</CardTitle>
              <CardDescription className="text-center">
                Get the most value from your AI-powered visa services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Instant Processing</h3>
                  <p className="text-sm text-gray-600">Credits are added to your account immediately after payment</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Secure Payment</h3>
                  <p className="text-sm text-gray-600">Protected by PayPal's industry-leading security</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Gift className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Bonus Credits</h3>
                  <p className="text-sm text-gray-600">Get extra credits with every package purchase</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PayPalPayment;