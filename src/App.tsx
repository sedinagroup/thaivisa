import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { CreditsProvider } from '@/contexts/CreditsContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Apply from '@/pages/Apply';
import PurchaseCredits from '@/pages/PurchaseCredits';
import Profile from '@/pages/Profile';
import AIDocumentChecker from '@/pages/ai/DocumentChecker';
import AITripPlanner from '@/pages/ai/TripPlanner';
import PayPalPayment from '@/pages/PayPalPayment';
import ARGuide from '@/pages/ARGuide';
import Support from '@/pages/Support';
import AboutUs from '@/pages/AboutUs';

// 404 Page Component
const NotFound: React.FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </a>
    </div>
  </div>
);

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
                
                <Route path="/ar-guide" element={
                  <>
                    <Navbar />
                    <ARGuide />
                  </>
                } />
                
                {/* Consolidated pricing/credits page */}
                <Route path="/pricing" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <PurchaseCredits />
                    </ProtectedRoute>
                  </>
                } />
                
                {/* Redirect old credits route to pricing */}
                <Route path="/credits" element={<Navigate to="/pricing" replace />} />
                <Route path="/purchase-credits" element={<Navigate to="/pricing" replace />} />
                
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
                
                <Route path="/trip-planner" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <AITripPlanner />
                    </ProtectedRoute>
                  </>
                } />
                
                {/* Legacy AI routes - redirect to new paths */}
                <Route path="/ai-document-checker" element={<Navigate to="/document-checker" replace />} />
                <Route path="/ai-trip-planner" element={<Navigate to="/trip-planner" replace />} />
                
                <Route path="/payment" element={
                  <>
                    <Navbar />
                    <ProtectedRoute>
                      <PayPalPayment />
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