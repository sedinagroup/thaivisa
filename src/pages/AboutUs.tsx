import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Users, 
  Award, 
  Zap, 
  Shield, 
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Building2,
  Rocket,
  Target,
  Heart,
  Star,
  CheckCircle,
  FileText
} from 'lucide-react';

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { label: t('about.stats.countriesServed'), value: '50+', icon: Globe },
    { label: t('about.stats.visasProcessed'), value: '100K+', icon: FileText },
    { label: t('about.stats.successRate'), value: '98%', icon: Award },
    { label: t('about.stats.customerSatisfaction'), value: '4.9/5', icon: Star }
  ];

  const values = [
    {
      icon: Zap,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: Shield,
      title: t('about.values.security.title'),
      description: t('about.values.security.description')
    },
    {
      icon: Heart,
      title: t('about.values.customerFirst.title'),
      description: t('about.values.customerFirst.description')
    },
    {
      icon: Target,
      title: t('about.values.accuracy.title'),
      description: t('about.values.accuracy.description')
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: t('about.timeline.foundation.title'),
      description: t('about.timeline.foundation.description')
    },
    {
      year: '2021',
      title: t('about.timeline.aiDevelopment.title'),
      description: t('about.timeline.aiDevelopment.description')
    },
    {
      year: '2022',
      title: t('about.timeline.globalExpansion.title'),
      description: t('about.timeline.globalExpansion.description')
    },
    {
      year: '2023',
      title: t('about.timeline.thaiVisaLaunch.title'),
      description: t('about.timeline.thaiVisaLaunch.description')
    },
    {
      year: '2024',
      title: t('about.timeline.marketLeadership.title'),
      description: t('about.timeline.marketLeadership.description')
    }
  ];

  const team = [
    {
      name: t('about.team.sarahChen.name'),
      role: t('about.team.sarahChen.role'),
      description: t('about.team.sarahChen.description'),
      image: '👩‍💻'
    },
    {
      name: t('about.team.michaelRodriguez.name'),
      role: t('about.team.michaelRodriguez.role'),
      description: t('about.team.michaelRodriguez.description'),
      image: '👨‍💼'
    },
    {
      name: t('about.team.priyaSharma.name'),
      role: t('about.team.priyaSharma.role'),
      description: t('about.team.priyaSharma.description'),
      image: '👩‍⚖️'
    },
    {
      name: t('about.team.jamesLiu.name'),
      role: t('about.team.jamesLiu.role'),
      description: t('about.team.jamesLiu.description'),
      image: '👨‍🔒'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mr-4 backdrop-blur-sm">
                <Rocket className="h-10 w-10 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold mb-2">{t('about.hero.companyName')}</h1>
                <p className="text-xl text-blue-100">{t('about.hero.parentCompany')}</p>
              </div>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('about.hero.description')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Building2 className="w-4 h-4 mr-2" />
                {t('about.hero.badges.shkGroup')}
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                {t('about.hero.badges.globalPresence')}
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                {t('about.hero.badges.industryLeader')}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="w-6 h-6 mr-2 text-blue-600" />
                {t('about.mission.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.mission.description')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Rocket className="w-6 h-6 mr-2 text-purple-600" />
                {t('about.vision.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.vision.description')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{t('about.values.title')}</CardTitle>
            <CardDescription className="text-center">
              {t('about.values.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Company Timeline */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{t('about.timeline.title')}</CardTitle>
            <CardDescription className="text-center">
              {t('about.timeline.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {item.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <Badge variant="outline" className="ml-2">{item.year}</Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leadership Team */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{t('about.team.title')}</CardTitle>
            <CardDescription className="text-center">
              {t('about.team.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    {member.image}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{member.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SHK Hong Kong Group */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{t('about.shkGroup.title')}</CardTitle>
            <CardDescription className="text-center">
              {t('about.shkGroup.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-12 h-12 text-white" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-6">
                {t('about.shkGroup.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">{t('about.shkGroup.highlights.experience.value')}</div>
                  <div className="text-sm text-gray-600">{t('about.shkGroup.highlights.experience.label')}</div>
                </div>
                <div className="text-center">
                  <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold">{t('about.shkGroup.highlights.network.value')}</div>
                  <div className="text-sm text-gray-600">{t('about.shkGroup.highlights.network.label')}</div>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">{t('about.shkGroup.highlights.security.value')}</div>
                  <div className="text-sm text-gray-600">{t('about.shkGroup.highlights.security.label')}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">{t('about.contact.title')}</CardTitle>
            <CardDescription className="text-center">
              {t('about.contact.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{t('about.contact.headquarters.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('about.contact.headquarters.location')}<br />
                  {t('about.contact.headquarters.company')}
                </p>
              </div>
              <div>
                <Mail className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{t('about.contact.email.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('about.contact.email.general')}<br />
                  {t('about.contact.email.support')}
                </p>
              </div>
              <div>
                <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{t('about.contact.support.title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('about.contact.support.availability')}<br />
                  {t('about.contact.support.languages')}
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Mail className="w-4 h-4 mr-2" />
                {t('about.contact.button')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;