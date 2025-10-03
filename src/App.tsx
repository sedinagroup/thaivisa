import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { CreditsProvider } from '@/contexts/CreditsContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';

// Pages
import Index from '@/pages/Index';
import Apply from '@/pages/Apply';
import AITripPlanner from '@/pages/ai/TripPlanner';
import AIDocumentChecker from '@/pages/ai/DocumentChecker';
import Pricing from '@/pages/Pricing';
import Support from '@/pages/Support';
import AboutUs from '@/pages/AboutUs';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Credits from '@/pages/Credits';
import PurchaseCredits from '@/pages/PurchaseCredits';
import PayPalPayment from '@/pages/PayPalPayment';
import ARGuide from '@/pages/ARGuide';

import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CreditsProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Main Pages */}
                  <Route path="/" element={<Index />} />
                  <Route path="/apply" element={<Apply />} />
                  <Route path="/ai-trip-planner" element={<AITripPlanner />} />
                  <Route path="/ai-document-checker" element={<AIDocumentChecker />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/about" element={<AboutUs />} />
                  
                  {/* Auth Pages */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* User Pages */}
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/credits" element={<Credits />} />
                  <Route path="/purchase-credits" element={<PurchaseCredits />} />
                  
                  {/* Payment Pages */}
                  <Route path="/payment" element={<PayPalPayment />} />
                  
                  {/* Additional Features */}
                  <Route path="/ar-guide" element={<ARGuide />} />
                </Routes>
              </main>
              <Toaster position="top-right" />
            </div>
          </Router>
        </CreditsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;