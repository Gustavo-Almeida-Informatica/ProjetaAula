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
import Cabos from "./pages/Cabos";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
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
      <Route path="/login" element={session ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/historia" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="/hardware" element={<ProtectedRoute><Hardware /></ProtectedRoute>} />
      <Route path="/cabos" element={<ProtectedRoute><Cabos /></ProtectedRoute>} />
      <Route path="/software" element={<ProtectedRoute><Software /></ProtectedRoute>} />
      <Route path="/galeria" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
      <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
      <Route path="/comunidade" element={<ProtectedRoute><Community /></ProtectedRoute>} />
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
