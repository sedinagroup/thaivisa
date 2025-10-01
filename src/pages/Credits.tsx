import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCredits } from '@/contexts/CreditsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Coins, 
  CreditCard, 
  TrendingUp, 
  Clock, 
  Star,
  Zap,
  Shield,
  Crown,
  Gift,
  ArrowRight,
  CheckCircle,
  Calendar,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

const Credits: React.FC = () => {
  const { t } = useTranslation();
  const { 
    credits, 
    transactions, 
    creditPackages, 
    subscriptionTiers, 
    currentSubscription,
    purchaseCredits, 
    upgradeSubscription,
    getServicePrice 
  } = useCredits();
  
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (packageId: string) => {
    setLoading(packageId);
    const success = await purchaseCredits(packageId);
    if (success) {
      toast.success('Credits purchased successfully!');
    } else {
      toast.error('Failed to purchase credits. Please try again.');
    }
    setLoading(null);
  };

  const handleSubscription = async (tierId: string) => {
    setLoading(tierId);
    const success = await upgradeSubscription(tierId);
    if (success) {
      toast.success('Subscription upgraded successfully!');
    } else {
      toast.error('Failed to upgrade subscription. Please try again.');
    }
    setLoading(null);
  };

  const recentTransactions = transactions.slice(0, 10);
  const totalSpent = transactions
    .filter(t => t.type === 'consumed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalPurchased = transactions
    .filter(t => t.type === 'purchased')
    .reduce((sum, t) => sum + t.amount, 0);

  const servicePricing = [
    { service: 'Basic Document Scan', price: getServicePrice('basic_scan'), description: 'OCR and format validation' },
    { service: 'Advanced AI Analysis', price: getServicePrice('advanced_analysis'), description: 'Deep learning verification' },
    { service: 'Premium Compliance Check', price: getServicePrice('premium_compliance'), description: 'Full compliance review' },
    { service: 'Complete Profile Analysis', price: getServicePrice('complete_profile_analysis'), description: 'Comprehensive background check' },
    { service: 'Car Rental Booking', price: getServicePrice('car_rental_booking'), description: 'Vehicle reservation processing' },
    { service: 'Hotel Accommodation', price: getServicePrice('accommodation_booking'), description: 'Hotel booking service' },
    { service: 'Tour Package Booking', price: getServicePrice('attraction_booking'), description: 'Experience reservation' },
    { service: 'Real-time Monitoring', price: getServicePrice('real_time_monitoring'), description: 'Live status updates' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mr-4">
              <Coins className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Credits & Subscriptions
              </h1>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                Pay-per-use pricing for maximum value
              </p>
            </div>
          </div>
        </div>

        {/* Current Credits Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available Credits</p>
                  <p className="text-3xl font-bold text-blue-600">{credits}</p>
                </div>
                <Coins className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Purchased</p>
                  <p className="text-3xl font-bold text-green-600">{totalPurchased}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Used</p>
                  <p className="text-3xl font-bold text-orange-600">{totalSpent}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Plan</p>
                  <p className="text-lg font-bold text-purple-600">
                    {currentSubscription ? subscriptionTiers.find(t => t.id === currentSubscription)?.name : 'Pay-as-you-go'}
                  </p>
                </div>
                <Crown className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="packages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="packages">Credit Packages</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="pricing">Service Pricing</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          {/* Credit Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Choose Your Credit Package
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Pay only for what you use with our flexible credit system
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {creditPackages.map((pkg) => (
                <Card 
                  key={pkg.id} 
                  className={`relative hover:shadow-lg transition-all duration-200 ${
                    pkg.popular ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-blue-500">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Gift className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="text-center space-y-4">
                    <div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${pkg.price}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {pkg.credits} credits
                      </div>
                    </div>
                    
                    {pkg.bonus > 0 && (
                      <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-3">
                        <div className="text-green-600 font-medium">
                          +{pkg.bonus} Bonus Credits
                        </div>
                        <div className="text-xs text-green-600">
                          Total: {pkg.credits + pkg.bonus} credits
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full"
                      onClick={() => handlePurchase(pkg.id)}
                      disabled={loading === pkg.id}
                    >
                      {loading === pkg.id ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Purchase Now
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Monthly Subscription Plans
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Get monthly credits with additional benefits and discounts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionTiers.map((tier) => (
                <Card 
                  key={tier.id} 
                  className={`relative hover:shadow-lg transition-all duration-200 ${
                    tier.popular ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20' : ''
                  } ${
                    currentSubscription === tier.id ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : ''
                  }`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-purple-500">
                      Most Popular
                    </Badge>
                  )}
                  
                  {currentSubscription === tier.id && (
                    <Badge className="absolute -top-2 -left-2 bg-green-500">
                      Current Plan
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${tier.price}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      per month
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">
                        {tier.monthlyCredits} Credits/Month
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {tier.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full"
                      variant={currentSubscription === tier.id ? 'outline' : 'default'}
                      onClick={() => handleSubscription(tier.id)}
                      disabled={loading === tier.id || currentSubscription === tier.id}
                    >
                      {loading === tier.id ? (
                        <>Processing...</>
                      ) : currentSubscription === tier.id ? (
                        <>Current Plan</>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4 mr-2" />
                          Subscribe Now
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Service Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Service Pricing Guide
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Transparent pricing for all platform services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicePricing.map((service, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {service.service}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {service.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-4 flex items-center space-x-1">
                        <Coins className="h-3 w-3" />
                        <span>{service.price}</span>
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Complexity Pricing */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Dynamic Pricing by Complexity</CardTitle>
                <CardDescription>
                  Prices adjust based on service complexity and requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { level: 'Basic', multiplier: '0.8x', color: 'bg-green-100 text-green-800' },
                    { level: 'Standard', multiplier: '1.0x', color: 'bg-blue-100 text-blue-800' },
                    { level: 'Advanced', multiplier: '1.5x', color: 'bg-yellow-100 text-yellow-800' },
                    { level: 'Premium', multiplier: '2.0x', color: 'bg-orange-100 text-orange-800' },
                    { level: 'Enterprise', multiplier: '3.0x', color: 'bg-red-100 text-red-800' },
                  ].map((tier, index) => (
                    <div key={index} className="text-center">
                      <Badge className={`${tier.color} mb-2`}>
                        {tier.level}
                      </Badge>
                      <div className="text-sm font-medium">{tier.multiplier}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transaction History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Transaction History
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Track all your credit transactions and usage
              </p>
            </div>

            {recentTransactions.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Transactions Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your transaction history will appear here once you start using services.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    Your latest credit transactions and service usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'consumed' 
                              ? 'bg-red-100 dark:bg-red-900/20' 
                              : 'bg-green-100 dark:bg-green-900/20'
                          }`}>
                            {transaction.type === 'consumed' ? (
                              <ArrowRight className="h-5 w-5 text-red-600 rotate-45" />
                            ) : (
                              <ArrowRight className="h-5 w-5 text-green-600 -rotate-45" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {transaction.service}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {transaction.description}
                            </div>
                            <div className="text-xs text-gray-500">
                              {transaction.timestamp.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className={`font-semibold ${
                          transaction.type === 'consumed' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {transaction.type === 'consumed' ? '-' : '+'}{Math.abs(transaction.amount)} credits
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Credits;