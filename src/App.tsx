import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CreditsProvider } from '@/contexts/CreditsContext';

// Pages
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Apply from './pages/Apply';
import Credits from './pages/Credits';
import NotFound from './pages/NotFound';

// AI Services
import DocumentChecker from './pages/ai/DocumentChecker';
import VisaAdvisor from './pages/ai/VisaAdvisor';
import TripPlanner from './pages/ai/TripPlanner';
import AIChat from './pages/ai/AIChat';

// Travel Services
import FlightRecommendations from './pages/travel/FlightRecommendations';
import HotelAccommodation from './pages/travel/HotelAccommodation';
import TransportationServices from './pages/travel/TransportationServices';
import SpecialServices from './pages/travel/SpecialServices';

// Layout Components
import Navbar from './components/Navbar';

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

// Layout with Navbar
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/apply" element={
        <ProtectedRoute>
          <Layout>
            <Apply />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/credits" element={
        <ProtectedRoute>
          <Layout>
            <Credits />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* AI Services Routes */}
      <Route path="/ai/document-checker" element={
        <ProtectedRoute>
          <Layout>
            <DocumentChecker />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/ai/visa-advisor" element={
        <ProtectedRoute>
          <Layout>
            <VisaAdvisor />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/ai/trip-planner" element={
        <ProtectedRoute>
          <Layout>
            <TripPlanner />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/ai/chat" element={
        <ProtectedRoute>
          <Layout>
            <AIChat />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* Travel Services Routes */}
      <Route path="/travel/flights" element={
        <ProtectedRoute>
          <Layout>
            <FlightRecommendations />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/travel/hotels" element={
        <ProtectedRoute>
          <Layout>
            <HotelAccommodation />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/travel/transport" element={
        <ProtectedRoute>
          <Layout>
            <TransportationServices />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/travel/special" element={
        <ProtectedRoute>
          <Layout>
            <SpecialServices />
          </Layout>
        </ProtectedRoute>
      } />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CreditsProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </CreditsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;