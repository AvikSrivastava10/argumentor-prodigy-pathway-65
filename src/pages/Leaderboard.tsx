import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  TrendingUp, 
  HelpCircle, 
  Pin,
  ChevronUp,
  Filter,
  Target,
  Zap
} from 'lucide-react';
import Navbar from '@/components/Navbar';

// Mock leaderboard data - replace with API call
const mockLeaderboardData = [
  {
    rank: 1,
    username: "DebateMaster2024",
    avatar: null,
    totalXP: 15420,
    debatesWon: 89,
    totalDebates: 95,
    winRate: 93.7,
    level: 12,
    xpToNextLevel: 580,
    xpNeededForNext: 1000,
    isCurrentUser: false
  },
  {
    rank: 2,
    username: "ArgumentAce",
    avatar: null,
    totalXP: 14230,
    debatesWon: 76,
    totalDebates: 84,
    winRate: 90.5,
    level: 11,
    xpToNextLevel: 730,
    xpNeededForNext: 900,
    isCurrentUser: false
  },
  {
    rank: 3,
    username: "LogicLord",
    avatar: null,
    totalXP: 13890,
    debatesWon: 71,
    totalDebates: 80,
    winRate: 88.8,
    level: 11,
    xpToNextLevel: 390,
    xpNeededForNext: 900,
    isCurrentUser: false
  },
  {
    rank: 4,
    username: "RhetoricRanger",
    avatar: null,
    totalXP: 12450,
    debatesWon: 65,
    totalDebates: 75,
    winRate: 86.7,
    level: 10,
    xpToNextLevel: 550,
    xpNeededForNext: 800,
    isCurrentUser: false
  },
  {
    rank: 5,
    username: "SocraticSage",
    avatar: null,
    totalXP: 11680,
    debatesWon: 58,
    totalDebates: 68,
    winRate: 85.3,
    level: 10,
    xpToNextLevel: 180,
    xpNeededForNext: 800,
    isCurrentUser: false
  },
  // Add more mock data for positions 6-25
  ...Array.from({ length: 20 }, (_, i) => ({
    rank: i + 6,
    username: `Player${i + 6}`,
    avatar: null,
    totalXP: 11000 - (i * 300),
    debatesWon: 55 - (i * 2),
    totalDebates: 65 - (i * 2),
    winRate: 84.5 - (i * 1.5),
    level: 9 - Math.floor(i / 4),
    xpToNextLevel: 200 + (i * 50),
    xpNeededForNext: 700 - (i * 20),
    isCurrentUser: false
  }))
];

// Current user data (outside top 25)
const currentUser = {
  rank: 142,
  username: "Alex Johnson", // Current user from navbar
  avatar: null,
  totalXP: 2340,
  debatesWon: 15,
  totalDebates: 22,
  winRate: 68.2,
  level: 7,
  xpToNextLevel: 160,
  xpNeededForNext: 500,
  isCurrentUser: true
};

const Leaderboard = () => {
  const [leaderboardType, setLeaderboardType] = useState('overall');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Trigger progress bar animations on load
    setTimeout(() => setAnimateProgress(true), 300);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return null;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200";
    if (rank === 2) return "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200";
    if (rank === 3) return "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200";
    return "bg-white border-gray-200";
  };

  const LeaderboardCard = ({ player, index }: { player: any; index: number }) => (
    <Card 
      className={`
        ${getRankStyle(player.rank)} 
        ${player.isCurrentUser ? 'ring-2 ring-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50' : ''}
        transition-all duration-300 hover:shadow-lg hover:scale-[1.01] animate-fade-in
      `}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Left side - Rank and User Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-indigo-200">
              {getRankIcon(player.rank) || (
                <span className="text-lg font-bold text-indigo-600">#{player.rank}</span>
              )}
            </div>
            
            <Avatar className="w-12 h-12">
              <AvatarImage src={player.avatar} alt={player.username} />
              <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold">
                {player.username.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{player.username}</h3>
                {player.isCurrentUser && (
                  <>
                    <Pin className="w-4 h-4 text-indigo-600" />
                    <Badge variant="secondary" className="text-xs">You</Badge>
                  </>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-purple-600" />
                  {player.totalXP.toLocaleString()} XP
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-green-600" />
                  {player.debatesWon}/{player.totalDebates} wins
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  {player.winRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Level and Progress */}
          <div className="text-right min-w-[120px]">
            <Badge className="mb-2 bg-gradient-to-r from-indigo-600 to-purple-600">
              Level {player.level}
            </Badge>
            <div className="space-y-1">
              <div className="text-xs text-gray-500">
                {player.xpToNextLevel}/{player.xpNeededForNext} XP to next level
              </div>
              <Progress 
                value={animateProgress ? (player.xpToNextLevel / player.xpNeededForNext) * 100 : 0} 
                className="w-24 h-2" 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  Global Leaderboard
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  Top debaters competing worldwide
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-sm">
                        Rankings based on total XP earned, win rate, and debate performance. 
                        XP is awarded for debate participation, wins, and learning module completion.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-500" />
                <Select value={leaderboardType} onValueChange={setLeaderboardType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overall">Overall Rankings</SelectItem>
                    <SelectItem value="weekly">This Week</SelectItem>
                    <SelectItem value="monthly">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Your Global Rank</p>
                    <p className="text-3xl font-bold text-gray-900">#{currentUser.rank}</p>
                    <p className="text-sm text-gray-500">Level {currentUser.level}</p>
                  </div>
                  <Target className="w-8 h-8 text-indigo-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total XP</p>
                    <p className="text-3xl font-bold text-gray-900">{currentUser.totalXP.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{currentUser.xpToNextLevel} to next level</p>
                  </div>
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Win Rate</p>
                    <p className="text-3xl font-bold text-gray-900">{currentUser.winRate}%</p>
                    <p className="text-sm text-gray-500">{currentUser.debatesWon} wins</p>
                  </div>
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="sticky top-20 bg-white/95 backdrop-blur-sm border-b z-10">
              <CardTitle className="text-2xl">Top 25 Global Debaters</CardTitle>
              <CardDescription>
                The most skilled debaters from around the world
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                {mockLeaderboardData.map((player, index) => (
                  <LeaderboardCard key={player.rank} player={player} index={index} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current User Position (if outside top 25) */}
          <div className="mt-8">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Pin className="w-5 h-5" />
                  Your Position
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  Keep climbing to reach the top 25!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardCard player={currentUser} index={0} />
              </CardContent>
            </Card>
          </div>

          {/* Back to Top Button */}
          {showBackToTop && (
            <Button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg z-50"
              size="icon"
            >
              <ChevronUp className="w-5 h-5" />
            </Button>
          )}
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Leaderboard;