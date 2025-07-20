
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DailyChallenge from "./pages/DailyChallenge";
import LearningModule from "./pages/LearningModule";
import BritishParliamentary from "./pages/BritishParliamentary";
import DebateArena from "./pages/DebateArena";
import PeerMatch from "./pages/PeerMatch";
import TournamentMode from "./pages/TournamentMode";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import Progress from "./pages/Progress";
import GrandmasterAssistant from "./components/GrandmasterAssistant";
import DebateFundamentals from "./pages/modules/DebateFundamentals";
import BritishParliamentaryModule from "./pages/modules/BritishParliamentary";
import AdvancedRebuttals from "./pages/modules/AdvancedRebuttals";
import FallacyDetection from "./pages/modules/FallacyDetection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/daily-challenge" element={<DailyChallenge />} />
          <Route path="/learn" element={<LearningModule />} />
          <Route path="/module/:moduleId" element={<LearningModule />} />
          <Route path="/modules/debate-fundamentals" element={<DebateFundamentals />} />
          <Route path="/modules/british-parliamentary" element={<BritishParliamentaryModule />} />
          <Route path="/modules/advanced-rebuttals" element={<AdvancedRebuttals />} />
          <Route path="/modules/fallacy-detection" element={<FallacyDetection />} />
          <Route path="/british-parliamentary" element={<BritishParliamentary />} />
          <Route path="/arena" element={<DebateArena />} />
          <Route path="/peer-match" element={<PeerMatch />} />
          <Route path="/tournament-mode" element={<TournamentMode />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <GrandmasterAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
