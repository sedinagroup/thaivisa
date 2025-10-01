import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Contexts
import { AuthProvider } from '@/contexts/AuthContext';
import { CreditsProvider } from '@/contexts/CreditsContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { NotificationProvider } from '@/contexts/NotificationContext';

// Components
import Navbar from '@/components/Navbar';

// Pages
import Index from '@/pages/Index';
import Apply from '@/pages/Apply';
import Compliance from '@/pages/Compliance';
import Credits from '@/pages/Credits';
import NotFound from '@/pages/NotFound';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <NotificationProvider>
            <AuthProvider>
              <CreditsProvider>
                <Router>
                  <div className="min-h-screen bg-background text-foreground">
                    <Navbar />
                    <main className="pt-16">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/apply" element={<Apply />} />
                        <Route path="/compliance" element={<Compliance />} />
                        <Route path="/credits" element={<Credits />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Toaster 
                      position="top-right" 
                      richColors 
                      closeButton
                      toastOptions={{
                        duration: 4000,
                      }}
                    />
                  </div>
                </Router>
              </CreditsProvider>
            </AuthProvider>
          </NotificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;