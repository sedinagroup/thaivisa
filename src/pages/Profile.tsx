import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Globe,
  Save,
  Camera,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const { currentLanguage, changeLanguage, supportedLanguages } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    nationality: user?.nationality || '',
    dateOfBirth: user?.dateOfBirth || '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
  });

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      await updateProfile(profileData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode as any);
    toast.success('Language updated successfully');
  };

  const countries = [
    { code: 'US', name: t('countries.US') },
    { code: 'GB', name: t('countries.GB') },
    { code: 'CA', name: t('countries.CA') },
    { code: 'AU', name: t('countries.AU') },
    { code: 'DE', name: t('countries.DE') },
    { code: 'FR', name: t('countries.FR') },
    { code: 'JP', name: t('countries.JP') },
    { code: 'KR', name: t('countries.KR') },
    { code: 'CN', name: t('countries.CN') },
    { code: 'IN', name: t('countries.IN') },
    { code: 'BR', name: t('countries.BR') },
    { code: 'MX', name: t('countries.MX') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('profile.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {t('profile.personalInfo')}
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              {t('profile.preferences')}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              {t('profile.notifications')}
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              {t('profile.security')}
            </TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.personalInfo')}</CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.avatar} alt={user?.firstName} />
                    <AvatarFallback className="text-lg">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">{t('auth.firstName')}</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t('auth.lastName')}</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t('auth.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">{t('auth.phoneNumber')}</Label>
                    <Input
                      id="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">{t('auth.nationality')}</Label>
                    <Select
                      value={profileData.nationality}
                      onValueChange={(value) => setProfileData({ ...profileData, nationality: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">{t('auth.dateOfBirth')}</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleUpdateProfile} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  {t('profile.updateProfile')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.preferences')}</CardTitle>
                <CardDescription>
                  Customize your application experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="flex items-center mb-3">
                    <Globe className="h-4 w-4 mr-2" />
                    {t('profile.language')}
                  </Label>
                  <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedLanguages.map((language) => (
                        <SelectItem key={language.code} value={language.code}>
                          <div className="flex items-center space-x-2">
                            <span>{language.flag}</span>
                            <span>{language.nativeName}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.notifications')}</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">{t('profile.emailNotifications')}</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive application updates via email
                    </p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">{t('profile.smsNotifications')}</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive urgent updates via SMS
                    </p>
                  </div>
                  <Switch
                    checked={preferences.smsNotifications}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, smsNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Marketing Emails</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive promotional offers and updates
                    </p>
                  </div>
                  <Switch
                    checked={preferences.marketingEmails}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, marketingEmails: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Security Alerts</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Receive notifications about account security
                    </p>
                  </div>
                  <Switch
                    checked={preferences.securityAlerts}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, securityAlerts: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>{t('profile.security')}</CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-2 block">
                    {t('profile.changePassword')}
                  </Label>
                  <div className="space-y-4">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                    <Button variant="outline">
                      {t('profile.changePassword')}
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Label className="text-base font-medium mb-2 block">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">
                    Enable 2FA
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <Label className="text-base font-medium mb-2 block">
                    Active Sessions
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Manage your active login sessions
                  </p>
                  <Button variant="outline">
                    View Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;