
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Target, 
  Zap, 
  Clock, 
  Star, 
  Users, 
  Play,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  Map,
  ChevronLeft
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import LearningJourney from '@/components/LearningJourney';
import QuestInterface from '@/components/QuestInterface';
import QuestCompletion from '@/components/QuestCompletion';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'dashboard' | 'learning-journey' | 'quest' | 'completion'>('dashboard');
  const [activeQuest, setActiveQuest] = useState<string | null>(null);
  const [questResults, setQuestResults] = useState<{
    questTitle: string;
    xpEarned: number;
    score: number;
    newAchievements: string[];
  } | null>(null);

  const stats = [
    { label: "Current Level", value: "7", icon: Trophy, color: "text-yellow-600" },
    { label: "XP Points", value: "2,340", icon: Star, color: "text-purple-600" },
    { label: "Debates Won", value: "15", icon: Target, color: "text-green-600" },
    { label: "Study Streak", value: "12 days", icon: Zap, color: "text-orange-600" }
  ];

  const learningModules = [
    {
      id: 1,
      title: "Debate Fundamentals",
      description: "Learn the basics of argumentation and debate structure",
      progress: 85,
      duration: "45 min",
      difficulty: "Beginner",
      unlocked: true,
      route: "/modules/debate-fundamentals"
    },
    {
      id: 2,
      title: "British Parliamentary Format",
      description: "Master the BP format used in World Championships",
      progress: 60,
      duration: "60 min",
      difficulty: "Intermediate",
      unlocked: true,
      route: "/modules/british-parliamentary"
    },
    {
      id: 3,
      title: "Advanced Rebuttals",
      description: "Craft powerful responses to opponent arguments",
      progress: 30,
      duration: "50 min",
      difficulty: "Advanced",
      unlocked: true,
      route: "/modules/advanced-rebuttals"
    },
    {
      id: 4,
      title: "Fallacy Detection",
      description: "Identify and dismantle logical fallacies with confidence",
      progress: 0,
      duration: "40 min",
      difficulty: "Advanced",
      unlocked: true,
      route: "/modules/fallacy-detection"
    }
  ];

  const achievements = [
    { title: "First Debate", description: "Completed your first practice debate", earned: true },
    { title: "Streak Master", description: "Maintained a 7-day learning streak", earned: true },
    { title: "Perfect Score", description: "Scored 100% on a module quiz", earned: true },
    { title: "Fallacy Hunter", description: "Detected 10 logical fallacies", earned: false }
  ];

  const handleStartQuest = (questId: string) => {
    setActiveQuest(questId);
    setCurrentView('quest');
  };

  const handleQuestComplete = (xpEarned: number) => {
    const mockQuestTitles: Record<string, string> = {
      'fallacy-hunter': 'Fallacy Detective',
      'argument-builder': 'Argument Architect',
      'rebuttal-master': 'Rebuttal Workshop'
    };
    
    setQuestResults({
      questTitle: mockQuestTitles[activeQuest || ''] || 'Unknown Quest',
      xpEarned,
      score: Math.floor(Math.random() * 40) + 60, // Mock score 60-100
      newAchievements: Math.random() > 0.5 ? ['Logic Champion'] : []
    });
    setCurrentView('completion');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setActiveQuest(null);
    setQuestResults(null);
  };

  const handleBackToJourney = () => {
    setCurrentView('learning-journey');
  };

  // Render different views based on current state
  if (currentView === 'quest' && activeQuest) {
    return (
      <QuestInterface
        questId={activeQuest}
        onBack={handleBackToJourney}
        onComplete={handleQuestComplete}
      />
    );
  }

  if (currentView === 'completion' && questResults) {
    return (
      <QuestCompletion
        questTitle={questResults.questTitle}
        xpEarned={questResults.xpEarned}
        score={questResults.score}
        newAchievements={questResults.newAchievements}
        onContinue={handleBackToJourney}
      />
    );
  }

  if (currentView === 'learning-journey') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button variant="ghost" onClick={handleBackToDashboard}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <LearningJourney onStartQuest={handleStartQuest} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-gray-600">
            Ready to continue your debate mastery journey? You're doing great!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                  Learning Modules
                </CardTitle>
                <CardDescription>
                  Continue your learning journey with our structured modules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningModules.map((module) => (
                  <div 
                    key={module.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-indigo-200 ${
                      module.unlocked ? 'border-gray-200 bg-white cursor-pointer' : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${module.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                          {module.title}
                        </h3>
                        <p className={`text-sm ${module.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                          {module.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={module.difficulty === 'Beginner' ? 'secondary' : 
                                     module.difficulty === 'Intermediate' ? 'default' : 'destructive'}
                               className="transition-all duration-200">
                          {module.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </span>
                        <span>{module.progress}% complete</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => navigate(module.route)}
                        disabled={!module.unlocked}
                        className={module.unlocked ? 
                          "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105" :
                          ""
                        }
                      >
                        {module.unlocked ? (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            {module.progress > 0 ? 'Continue' : 'Start'}
                          </>
                        ) : (
                          '🔒 Locked'
                        )}
                      </Button>
                    </div>
                    
                    {module.unlocked && (
                      <div className="mt-3">
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Journey Feature */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => setCurrentView('learning-journey')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-6 h-6" />
                  Learning Journey
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  🎮 NEW: Gamified quests & challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-indigo-100 mb-3">
                  Master debate skills through interactive quests, earn XP, and unlock achievements!
                </p>
                <div className="flex items-center gap-2 text-xs text-indigo-200">
                  <Star className="w-3 h-3" />
                  <span>Level-based progression</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-indigo-200 mt-1">
                  <Trophy className="w-3 h-3" />
                  <span>AI-powered feedback</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  onClick={() => navigate('/arena')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Practice Debate
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/progress')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Progress
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border ${
                      achievement.earned ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className={`w-4 h-4 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                      <span className={`font-medium text-sm ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                        {achievement.title}
                      </span>
                    </div>
                    <p className={`text-xs ${achievement.earned ? 'text-yellow-700' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Daily Challenge */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Daily Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-100 mb-3">
                  Identify the logical fallacy in today's argument sample
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/daily-challenge')}
                >
                  Take Challenge
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
