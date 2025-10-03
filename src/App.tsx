import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { CreditsProvider } from '@/contexts/CreditsContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';

// Import pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Apply from '@/pages/Apply';
import Pricing from '@/pages/Pricing';
import Profile from '@/pages/Profile';
import PayPalPayment from '@/pages/PayPalPayment';
import ARGuide from '@/pages/ARGuide';
import Support from '@/pages/Support';
import AboutUs from '@/pages/AboutUs';
import NotFound from '@/pages/NotFound';
import AIDocumentChecker from '@/pages/ai/DocumentChecker';
import AITripPlanner from '@/pages/ai/TripPlanner';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CreditsProvider>
          <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900">
              <Routes>
                {/* Public routes without navbar */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Routes with navbar */}
                <Route path="/" element={
                  <>
                    <Navbar />
                    <Index />
                  </>
                } />
                
                <Route path="/apply" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <Apply />
                    </ProtectedRoute>
                  </>
                } />

                <Route path="/apply-visa" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <Apply />
                    </ProtectedRoute>
                  </>
                } />
                
                <Route path="/pricing" element={
                  <>
                    <Navbar />
                    <Pricing />
                  </>
                } />

                <Route path="/credits" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <Pricing />
                    </ProtectedRoute>
                  </>
                } />

                <Route path="/purchase-credits" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <Pricing />
                    </ProtectedRoute>
                  </>
                } />

                <Route path="/support" element={
                  <>
                    <Navbar />
                    <Support />
                  </>
                } />

                <Route path="/about" element={
                  <>
                    <Navbar />
                    <AboutUs />
                  </>
                } />

                <Route path="/about-us" element={
                  <>
                    <Navbar />
                    <AboutUs />
                  </>
                } />
                
                <Route path="/ar-guide" element={
                  <>
                    <Navbar />
                    <ARGuide />
                  </>
                } />
                
                <Route path="/profile" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  </>
                } />
                
                <Route path="/document-checker" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <AIDocumentChecker />
                    </ProtectedRoute>
                  </>
                } />

                <Route path="/ai-document-checker" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <AIDocumentChecker />
                    </ProtectedRoute>
                  </>
                } />
                
                <Route path="/trip-planner" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <AITripPlanner />
                    </ProtectedRoute>
                  </>
                } />

                <Route path="/ai-trip-planner" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <AITripPlanner />
                    </ProtectedRoute>
                  </>
                } />
                
                <Route path="/payment" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <PayPalPayment />
                    </ProtectedRoute>
                  </>
                } />
                
                <Route path="/404" element={
                  <>
                    <Navbar />
                    <NotFound />
                  </>
                } />
                
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
              <Toaster position="top-right" richColors />
            </div>
          </Router>
        </CreditsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;