import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  ArrowLeft, 
  Loader2,
  Coins,
  Star,
  Gift
} from 'lucide-react';
import { toast } from 'sonner';

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  popular?: boolean;
  bonus?: number;
  description: string;
}

const creditPackages: CreditPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 100,
    price: 9.99,
    description: 'Perfect for single visa applications',
    bonus: 0
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    credits: 300,
    price: 24.99,
    popular: true,
    description: 'Best value for multiple applications',
    bonus: 50
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    credits: 1000,
    price: 79.99,
    description: 'For agencies and frequent travelers',
    bonus: 200
  }
];

const PayPalPayment: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package');
  
  const [loading, setLoading] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);

  useEffect(() => {
    // Find the selected package
    const pkg = creditPackages.find(p => p.id === packageId);
    if (pkg) {
      setSelectedPackage(pkg);
    } else {
      // Default to starter pack if no package specified
      setSelectedPackage(creditPackages[0]);
    }

    // Simulate PayPal SDK loading
    setTimeout(() => {
      setPaypalLoaded(true);
    }, 1000);
  }, [packageId]);

  const handlePayPalPayment = async () => {
    if (!selectedPackage || !user) return;

    setLoading(true);
    
    try {
      // Simulate PayPal payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      const totalCredits = selectedPackage.credits + (selectedPackage.bonus || 0);
      updateUser({ credits: user.credits + totalCredits });
      
      toast.success(`Payment successful! ${totalCredits} credits added to your account.`);
      navigate('/credits?success=true');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMockPayment = async () => {
    if (!selectedPackage || !user) return;

    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const totalCredits = selectedPackage.credits + (selectedPackage.bonus || 0);
    updateUser({ credits: user.credits + totalCredits });
    
    toast.success(`Mock payment successful! ${totalCredits} credits added to your account.`);
    navigate('/credits?success=true');
    setLoading(false);
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/credits')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Credits
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Complete Your Purchase
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Secure payment powered by PayPal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coins className="w-5 h-5 mr-2 text-amber-500" />
                Order Summary
              </CardTitle>
              <CardDescription>
                Review your credit package purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{selectedPackage.name}</h3>
                  {selectedPackage.popular && (
                    <Badge className="bg-blue-500">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {selectedPackage.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Credits:</span>
                    <span className="font-medium">{selectedPackage.credits}</span>
                  </div>
                  {selectedPackage.bonus && selectedPackage.bonus > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center">
                        <Gift className="w-4 h-4 mr-1" />
                        Bonus Credits:
                      </span>
                      <span className="font-medium">+{selectedPackage.bonus}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Credits:</span>
                    <span className="text-blue-600">
                      {selectedPackage.credits + (selectedPackage.bonus || 0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">${selectedPackage.price}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  One-time payment • No recurring charges
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Method
              </CardTitle>
              <CardDescription>
                Choose your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PayPal Payment */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">PP</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">PayPal</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Secure payment with PayPal
                      </p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>

                {/* PayPal Button Container */}
                <div id="paypal-button-container" className="min-h-[50px]">
                  {paypalLoaded ? (
                    <Button
                      onClick={handlePayPalPayment}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay with PayPal - ${selectedPackage.price}
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex items-center justify-center">
                      <span className="text-gray-500">Loading PayPal...</span>
                    </div>
                  )}
                </div>

                {/* Demo Payment Button */}
                <Separator />
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    For demo purposes only:
                  </p>
                  <Button
                    onClick={handleMockPayment}
                    variant="outline"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Simulate Payment (Demo)'
                    )}
                  </Button>
                </div>
              </div>

              {/* Security Information */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-green-800 dark:text-green-300">
                    Secure Payment
                  </h4>
                </div>
                <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• 256-bit SSL encryption</li>
                  <li>• PCI DSS compliant</li>
                  <li>• Your payment info is never stored</li>
                  <li>• 30-day money-back guarantee</li>
                </ul>
              </div>

              {/* Terms */}
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <p>
                  By completing this purchase, you agree to our{' '}
                  <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
                  Credits are non-refundable and do not expire.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PayPalPayment;