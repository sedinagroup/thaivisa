import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'th' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Simple translations - in a real app, this would be loaded from files
const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.apply': 'Apply',
    'nav.status': 'Status',
    'nav.credits': 'Credits',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'welcome': 'Welcome to Thailand Visa AI',
    'apply.now': 'Apply Now',
    'credits.balance': 'Credit Balance'
  },
  th: {
    'nav.home': 'หน้าแรก',
    'nav.apply': 'สมัคร',
    'nav.status': 'สถานะ',
    'nav.credits': 'เครดิต',
    'nav.profile': 'โปรไฟล์',
    'nav.login': 'เข้าสู่ระบบ',
    'nav.logout': 'ออกจากระบบ',
    'welcome': 'ยินดีต้อนรับสู่ Thailand Visa AI',
    'apply.now': 'สมัครเลย',
    'credits.balance': 'ยอดเครดิต'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.apply': 'Aplicar',
    'nav.status': 'Estado',
    'nav.credits': 'Créditos',
    'nav.profile': 'Perfil',
    'nav.login': 'Iniciar sesión',
    'nav.logout': 'Cerrar sesión',
    'welcome': 'Bienvenido a Thailand Visa AI',
    'apply.now': 'Aplicar ahora',
    'credits.balance': 'Balance de créditos'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.apply': 'Postuler',
    'nav.status': 'Statut',
    'nav.credits': 'Crédits',
    'nav.profile': 'Profil',
    'nav.login': 'Se connecter',
    'nav.logout': 'Se déconnecter',
    'welcome': 'Bienvenue à Thailand Visa AI',
    'apply.now': 'Postuler maintenant',
    'credits.balance': 'Solde de crédits'
  },
  de: {
    'nav.home': 'Startseite',
    'nav.apply': 'Bewerben',
    'nav.status': 'Status',
    'nav.credits': 'Credits',
    'nav.profile': 'Profil',
    'nav.login': 'Anmelden',
    'nav.logout': 'Abmelden',
    'welcome': 'Willkommen bei Thailand Visa AI',
    'apply.now': 'Jetzt bewerben',
    'credits.balance': 'Credit-Guthaben'
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.apply': '申請',
    'nav.status': 'ステータス',
    'nav.credits': 'クレジット',
    'nav.profile': 'プロフィール',
    'nav.login': 'ログイン',
    'nav.logout': 'ログアウト',
    'welcome': 'Thailand Visa AIへようこそ',
    'apply.now': '今すぐ申請',
    'credits.balance': 'クレジット残高'
  },
  ko: {
    'nav.home': '홈',
    'nav.apply': '신청',
    'nav.status': '상태',
    'nav.credits': '크레딧',
    'nav.profile': '프로필',
    'nav.login': '로그인',
    'nav.logout': '로그아웃',
    'welcome': 'Thailand Visa AI에 오신 것을 환영합니다',
    'apply.now': '지금 신청',
    'credits.balance': '크레딧 잔액'
  },
  zh: {
    'nav.home': '首页',
    'nav.apply': '申请',
    'nav.status': '状态',
    'nav.credits': '积分',
    'nav.profile': '个人资料',
    'nav.login': '登录',
    'nav.logout': '登出',
    'welcome': '欢迎来到泰国签证AI',
    'apply.now': '立即申请',
    'credits.balance': '积分余额'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};