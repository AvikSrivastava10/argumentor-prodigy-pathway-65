import React from 'react';
import { ArrowLeft, BookOpen, Target, Trophy, TrendingUp, Clock, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ViewProgress = () => {
  // Mock data - in real app this would come from user state/API
  const moduleProgress = [
    {
      id: 'debate-fundamentals',
      title: 'Debate Fundamentals',
      completion: 75,
      timeSpent: 45,
      totalTime: 60,
      level: 'Beginner',
      status: 'In Progress',
      lastAccessed: '2 days ago'
    },
    {
      id: 'british-parliamentary', 
      title: 'British Parliamentary Format',
      completion: 60,
      timeSpent: 36,
      totalTime: 60,
      level: 'Intermediate',
      status: 'In Progress',
      lastAccessed: '1 week ago'
    },
    {
      id: 'advanced-rebuttals',
      title: 'Advanced Rebuttals',
      completion: 30,
      timeSpent: 18,
      totalTime: 60,
      level: 'Advanced',
      status: 'Started',
      lastAccessed: '2 weeks ago'
    },
    {
      id: 'fallacy-detection',
      title: 'Fallacy Detection',
      completion: 0,
      timeSpent: 0,
      totalTime: 45,
      level: 'Intermediate',
      status: 'Not Started',
      lastAccessed: 'Never'
    }
  ];

  const weeklyProgress = [
    { week: 'Week 1', modules: 1, hours: 8 },
    { week: 'Week 2', modules: 2, hours: 12 },
    { week: 'Week 3', modules: 1, hours: 6 },
    { week: 'Week 4', modules: 3, hours: 15 }
  ];

  const milestones = [
    { title: 'Started Learning Journey', date: '3 weeks ago', completed: true },
    { title: 'First Module Completed', date: '2 weeks ago', completed: true },
    { title: 'Reached 20 Hours', date: '1 week ago', completed: true },
    { title: 'Complete 3 Modules', date: 'In Progress', completed: false },
    { title: 'Master Advanced Techniques', date: 'Upcoming', completed: false }
  ];

  const totalTimeSpent = moduleProgress.reduce((sum, module) => sum + module.timeSpent, 0);
  const averageCompletion = Math.round(moduleProgress.reduce((sum, module) => sum + module.completion, 0) / moduleProgress.length);
  const modulesCompleted = moduleProgress.filter(module => module.completion === 100).length;
  const modulesInProgress = moduleProgress.filter(module => module.completion > 0 && module.completion < 100).length;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'Intermediate': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';  
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Started': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Not Started': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 sm:mb-8 animate-fade-in">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:gap-3 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Back to Dashboard</span>
          </Link>
        </div>

        <div className="mb-8 sm:mb-12 animate-fade-in text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent leading-tight">
            Your Learning Progress
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto sm:mx-0">
            Track your debate mastery journey and celebrate every milestone
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card className="hover-scale animate-fade-in border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 group" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Total Time</p>
                  <p className="text-xl sm:text-2xl font-bold tracking-tight">{totalTimeSpent}h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale animate-fade-in border-l-4 border-l-emerald-500 hover:shadow-lg transition-all duration-300 group" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                  <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Completed</p>
                  <p className="text-xl sm:text-2xl font-bold tracking-tight">{modulesCompleted}/4</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale animate-fade-in border-l-4 border-l-amber-500 hover:shadow-lg transition-all duration-300 group" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-amber-100 dark:bg-amber-900 rounded-lg group-hover:bg-amber-200 dark:group-hover:bg-amber-800 transition-colors">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">In Progress</p>
                  <p className="text-xl sm:text-2xl font-bold tracking-tight">{modulesInProgress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale animate-fade-in border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 group" style={{ animationDelay: '400ms' }}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Avg. Progress</p>
                  <p className="text-xl sm:text-2xl font-bold tracking-tight">{averageCompletion}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Module Progress Grid */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Module Progress
              </h2>
              <div className="text-sm text-muted-foreground hidden sm:block">
                {modulesInProgress} in progress
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {moduleProgress.map((module, index) => (
                <Card key={module.id} className="hover-scale animate-fade-in group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm dark:bg-card/80" style={{ animationDelay: `${(index + 5) * 100}ms` }}>
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-tight">
                          {module.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          <Badge variant="secondary" className={`${getLevelColor(module.level)} text-xs font-medium px-2 py-1`}>
                            {module.level}
                          </Badge>
                          <Badge variant="outline" className={`${getStatusColor(module.status)} text-xs font-medium px-2 py-1`}>
                            {module.status}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs sm:text-sm text-muted-foreground font-medium">Progress</span>
                          <span className="text-xs sm:text-sm font-bold text-primary">{module.completion}%</span>
                        </div>
                        <Progress 
                          value={module.completion} 
                          className="h-2 sm:h-2.5 bg-secondary/50"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                        <span className="text-muted-foreground font-medium">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                          {module.timeSpent}/{module.totalTime} mins
                        </span>
                        <span className="text-muted-foreground text-right">
                          {module.lastAccessed}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 lg:space-y-8">
            {/* Weekly Progress Chart */}
            <Card className="animate-fade-in hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm dark:bg-card/80" style={{ animationDelay: '900ms' }}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {weeklyProgress.map((week, index) => (
                    <div key={week.week} className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium min-w-0 flex-shrink-0">{week.week}</span>
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs sm:text-sm font-bold text-primary">{week.hours}h</div>
                          <div className="text-xs text-muted-foreground">{week.modules} modules</div>
                        </div>
                        <div className="w-12 sm:w-16 bg-secondary/50 rounded-full h-1.5 sm:h-2 flex-shrink-0">
                          <div 
                            className="bg-gradient-to-r from-primary to-primary/80 h-full rounded-full transition-all duration-500 ease-out" 
                            style={{ width: `${Math.min((week.hours / 15) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card className="animate-fade-in hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm dark:bg-card/80" style={{ animationDelay: '1000ms' }}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors group">
                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mt-1.5 sm:mt-1 transition-all ${
                        milestone.completed 
                          ? 'bg-primary group-hover:scale-110' 
                          : 'bg-muted border-2 border-primary group-hover:border-primary/80'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs sm:text-sm font-medium leading-tight ${
                          milestone.completed ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {milestone.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{milestone.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Insights & Recommendations */}
            <Card className="animate-fade-in bg-gradient-to-br from-primary/5 via-primary/3 to-secondary/5 border-primary/20 hover:shadow-lg transition-all duration-300 shadow-md backdrop-blur-sm" style={{ animationDelay: '1100ms' }}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-primary text-base sm:text-lg">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                  Smart Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20 border border-primary/10">
                      <p className="text-xs sm:text-sm leading-relaxed">
                        🔥 <span className="font-semibold text-foreground">You're closest to completing:</span><br />
                        <span className="text-muted-foreground">Debate Fundamentals (75%)</span>
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20 border border-primary/10">
                      <p className="text-xs sm:text-sm leading-relaxed">
                        🧠 <span className="font-semibold text-foreground">Most time invested:</span><br />
                        <span className="text-muted-foreground">Debate Fundamentals</span>
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20 border border-primary/10">
                      <p className="text-xs sm:text-sm leading-relaxed">
                        🎯 <span className="font-semibold text-foreground">Recommended next:</span><br />
                        <span className="text-muted-foreground">Complete British Parliamentary Format</span>
                      </p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium" size="sm">
                    Continue Learning Journey
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProgress;