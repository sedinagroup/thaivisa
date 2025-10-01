import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Coins, 
  CreditCard, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Gift,
  Zap,
  Shield,
  Clock
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
  features: string[];
}

const creditPackages: CreditPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 100,
    price: 9.99,
    description: 'Perfect for single visa applications',
    bonus: 0,
    features: [
      '6 document scans',
      '4 AI analyses',
      '2 trip plans',
      'Email support'
    ]
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    credits: 300,
    price: 24.99,
    popular: true,
    description: 'Best value for multiple applications',
    bonus: 50,
    features: [
      '23 document scans',
      '14 AI analyses',
      '7 trip plans',
      'Priority support',
      '50 bonus credits'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    credits: 1000,
    price: 79.99,
    description: 'For agencies and frequent travelers',
    bonus: 200,
    features: [
      '80 document scans',
      '48 AI analyses',
      '24 trip plans',
      'Dedicated support',
      '200 bonus credits',
      'API access'
    ]
  }
];

const recentTransactions = [
  {
    id: '1',
    type: 'purchase',
    description: 'Professional Pack Purchase',
    credits: +350,
    date: '2024-01-15',
    amount: '$24.99'
  },
  {
    id: '2',
    type: 'usage',
    description: 'AI Document Analysis',
    credits: -15,
    date: '2024-01-14',
    service: 'Document Checker'
  },
  {
    id: '3',
    type: 'usage',
    description: 'Trip Plan Generation',
    credits: -50,
    date: '2024-01-13',
    service: 'Trip Planner'
  }
];

const Credits: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');

  React.useEffect(() => {
    if (success === 'true') {
      toast.success('Payment successful! Credits have been added to your account.');
    }
  }, [success]);

  const handlePurchase = (packageId: string) => {
    navigate(`/payment?package=${packageId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mr-4">
              <Coins className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Credits & Billing
              </h1>
              <p className="text-lg text-amber-600 dark:text-amber-400 font-medium">
                Manage your credits and purchase additional packages
              </p>
            </div>
          </div>
          
          {/* Current Balance */}
          <Card className="max-w-md mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">{user?.credits || 0}</div>
              <div className="text-blue-100">Available Credits</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="packages" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="packages">Credit Packages</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="packages">
            {/* Credit Packages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {creditPackages.map((pkg) => (
                <Card key={pkg.id} className={`relative ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white px-3 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <CardDescription className="text-lg">{pkg.description}</CardDescription>
                    <div className="text-4xl font-bold text-blue-600 mt-4">
                      ${pkg.price}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{pkg.credits}</div>
                      <div className="text-sm text-gray-600">Base Credits</div>
                      {pkg.bonus && pkg.bonus > 0 && (
                        <div className="flex items-center justify-center mt-2 text-green-600">
                          <Gift className="w-4 h-4 mr-1" />
                          <span className="font-medium">+{pkg.bonus} Bonus Credits</span>
                        </div>
                      )}
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
                      className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      variant={pkg.popular ? 'default' : 'outline'}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Purchase Package
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Credit Usage Guide */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  How Credits Work
                </CardTitle>
                <CardDescription>
                  Understanding credit consumption for different services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">15</span>
                    </div>
                    <h3 className="font-semibold mb-1">Document Analysis</h3>
                    <p className="text-sm text-gray-600">Per document scan and verification</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 font-bold">50</span>
                    </div>
                    <h3 className="font-semibold mb-1">Trip Planning</h3>
                    <p className="text-sm text-gray-600">Complete AI-generated itinerary</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 font-bold">5</span>
                    </div>
                    <h3 className="font-semibold mb-1">AI Chat</h3>
                    <p className="text-sm text-gray-600">Per conversation message</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Transaction History
                </CardTitle>
                <CardDescription>
                  Your recent credit purchases and usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'purchase' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.type === 'purchase' ? (
                            <CreditCard className="w-5 h-5" />
                          ) : (
                            <Zap className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-gray-600">
                            {transaction.date} {transaction.service && `• ${transaction.service}`}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${
                          transaction.credits > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.credits > 0 ? '+' : ''}{transaction.credits} credits
                        </div>
                        {transaction.amount && (
                          <div className="text-sm text-gray-600">{transaction.amount}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Security Notice */}
        <Card className="mt-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="font-semibold text-green-800 dark:text-green-300">Secure Payments</h3>
            </div>
            <p className="text-sm text-green-700 dark:text-green-400">
              All payments are processed securely through PayPal. Your credit card information is never stored on our servers.
              Credits never expire and can be used across all AI services.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Credits;