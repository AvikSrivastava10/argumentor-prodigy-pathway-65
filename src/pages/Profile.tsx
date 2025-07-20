
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Trophy, 
  Target, 
  Calendar, 
  TrendingUp,
  Award,
  Star,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const Profile = () => {
  const userStats = {
    level: 7,
    xp: 2340,
    xpToNext: 660,
    debatesWon: 15,
    totalDebates: 23,
    streak: 12,
    joinDate: "September 2024"
  };

  const achievements = [
    { title: "First Blood", description: "Won your first debate", date: "Oct 15", earned: true },
    { title: "Streak Master", description: "7-day learning streak", date: "Nov 2", earned: true },
    { title: "Fallacy Hunter", description: "Detected 10 logical fallacies", date: "Nov 8", earned: true },
    { title: "Evidence Expert", description: "Used 50 pieces of evidence", date: "Nov 12", earned: true },
    { title: "Debate Champion", description: "Won 20 debates", date: "Not yet", earned: false },
    { title: "Master Debater", description: "Reached level 10", date: "Not yet", earned: false }
  ];

  const skillMetrics = [
    { name: "Argument Construction", current: 85, target: 90, color: "bg-blue-500" },
    { name: "Rebuttal Strength", current: 78, target: 85, color: "bg-green-500" },
    { name: "Evidence Usage", current: 92, target: 95, color: "bg-purple-500" },
    { name: "Speaking Clarity", current: 88, target: 90, color: "bg-orange-500" },
    { name: "Logical Reasoning", current: 82, target: 88, color: "bg-red-500" }
  ];

  const recentActivity = [
    { type: "module", title: "Completed 'Advanced Rebuttals'", date: "2 hours ago" },
    { type: "debate", title: "Won debate vs AI opponent", date: "1 day ago" },
    { type: "achievement", title: "Earned 'Fallacy Hunter' badge", date: "3 days ago" },
    { type: "streak", title: "Extended learning streak to 12 days", date: "Today" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                  AJ
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">Alex Johnson</h1>
                  <p className="text-indigo-100 mb-4">
                    Level {userStats.level} Debater • Member since {userStats.joinDate}
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      <span>{userStats.xp.toLocaleString()} XP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      <span>{userStats.debatesWon}/{userStats.totalDebates} Won</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      <span>{userStats.streak} Day Streak</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-indigo-100 mb-1">
                    {userStats.xpToNext} XP to Level {userStats.level + 1}
                  </div>
                  <Progress 
                    value={(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100} 
                    className="w-32 h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Performance Overview */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-6 h-6 text-indigo-600" />
                      Performance Overview
                    </CardTitle>
                    <CardDescription>
                      Your debate skills progression over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillMetrics.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-gray-500">{skill.current}% / {skill.target}%</span>
                          </div>
                          <div className="relative">
                            <Progress value={skill.current} className="h-3" />
                            <div 
                              className="absolute top-0 w-1 h-3 bg-gray-400 rounded"
                              style={{ left: `${skill.target}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Improvement Suggestions</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Focus on rebuttal techniques to reach your 85% target</li>
                        <li>• Practice logical reasoning exercises daily</li>
                        <li>• Try advanced debate formats to challenge yourself</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Win Rate</span>
                      <span className="font-semibold">65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Avg. Score</span>
                      <span className="font-semibold">8.2/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Time Spent</span>
                      <span className="font-semibold">24h 32m</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Modules Completed</span>
                      <span className="font-semibold">12/18</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Next Milestone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold mb-1">Debate Champion</h3>
                      <p className="text-sm text-gray-600 mb-3">Win 20 debates</p>
                      <Progress value={75} className="mb-2" />
                      <p className="text-xs text-gray-500">5 more wins to go!</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Detailed Skills Analysis</CardTitle>
                <CardDescription>
                  Deep dive into your debate skill development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {skillMetrics.map((skill, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold">{skill.name}</h3>
                        <Badge variant="secondary">{skill.current}%</Badge>
                      </div>
                      <Progress value={skill.current} className="mb-3" />
                      <div className="text-sm text-gray-600">
                        <p className="mb-2">Target: {skill.target}%</p>
                        <p>Recent improvement: +{Math.floor(Math.random() * 10) + 1} points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-yellow-600" />
                  Achievement Gallery
                </CardTitle>
                <CardDescription>
                  Your collection of earned badges and milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned 
                          ? 'border-yellow-200 bg-yellow-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.earned 
                            ? 'bg-yellow-500 text-white' 
                            : 'bg-gray-300 text-gray-500'
                        }`}>
                          <Trophy className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${
                            achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                          }`}>
                            {achievement.title}
                          </h3>
                          <p className="text-xs text-gray-500">{achievement.date}</p>
                        </div>
                      </div>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your learning journey over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'module' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'debate' ? 'bg-green-100 text-green-600' :
                        activity.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.type === 'module' && <User className="w-5 h-5" />}
                        {activity.type === 'debate' && <Users className="w-5 h-5" />}
                        {activity.type === 'achievement' && <Trophy className="w-5 h-5" />}
                        {activity.type === 'streak' && <Target className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
