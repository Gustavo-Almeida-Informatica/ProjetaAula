import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Hardware from "./pages/Hardware";
import Software from "./pages/Software";
import Gallery from "./pages/Gallery";
import Quiz from "./pages/Quiz";
import Community from "./pages/Community";
import History from "./pages/History";
import About from "./pages/About";
import Typing from "./pages/Typing";



import Profile from "./pages/Profile";
import OAuthConsent from "./pages/OAuthConsent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse-warm font-display text-2xl gradient-warm-text">Projeta Aula</div>
      </div>
    );
  }
  if (!session) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function AppRoutes() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse-warm font-display text-2xl gradient-warm-text">Projeta Aula</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
      <Route path="/" element={<AppLayout><Index /></AppLayout>} />

      <Route path="/historia" element={<AppLayout><History /></AppLayout>} />
      <Route path="/sobre" element={<AppLayout><About /></AppLayout>} />
      <Route path="/hardware" element={<AppLayout><Hardware /></AppLayout>} />
      <Route path="/cabos" element={<Navigate to="/galeria" replace />} />
      <Route path="/software" element={<AppLayout><Software /></AppLayout>} />
      <Route path="/galeria" element={<AppLayout><Gallery /></AppLayout>} />
      <Route path="/quiz" element={<AppLayout><Quiz /></AppLayout>} />
      <Route path="/comunidade" element={<AppLayout><Community /></AppLayout>} />
      <Route path="/digitacao" element={<AppLayout><Typing /></AppLayout>} />
      <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
