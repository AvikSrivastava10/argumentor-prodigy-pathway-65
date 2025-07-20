
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Bot, 
  Clock, 
  Trophy, 
  Target, 
  Play,
  Pause,
  RotateCcw,
  MessageSquare,
  Mic,
  MicOff,
  Video,
  VideoOff
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const DebateArena = () => {
  const [isInDebate, setIsInDebate] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [currentSpeaker, setCurrentSpeaker] = useState('user');
  const [micEnabled, setMicEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);

  const practiceOptions = [
    {
      title: "AI Opponent Practice",
      description: "Debate against our advanced AI for personalized practice",
      icon: Bot,
      difficulty: "Adaptive",
      duration: "15-30 min",
      type: "ai"
    },
    {
      title: "Peer Match",
      description: "Get matched with another student at your skill level",
      icon: Users,
      difficulty: "Matched",
      duration: "20-45 min",
      type: "peer"
    },
    {
      title: "Tournament Mode",
      description: "Compete in structured tournaments with rankings",
      icon: Trophy,
      difficulty: "Competitive",
      duration: "60+ min",
      type: "tournament"
    }
  ];

  const debateFormats = [
    { name: "British Parliamentary", rounds: 4, description: "World Championship format" },
    { name: "Lincoln-Douglas", rounds: 2, description: "Value-based philosophical debates" },
    { name: "Policy Debate", rounds: 2, description: "Evidence-heavy policy analysis" },
    { name: "Public Forum", rounds: 2, description: "Accessible current events debate" }
  ];

  const currentTopic = "This house believes that artificial intelligence poses a greater threat than benefit to humanity";

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isInDebate ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Debate Arena 🏛️
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Put your skills to the test! Choose your practice mode and start debating.
              </p>
            </div>

            {/* Practice Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {practiceOptions.map((option, index) => (
                <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col">
                  <CardHeader className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <option.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{option.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="secondary">{option.difficulty}</Badge>
                          <Badge variant="outline">{option.duration}</Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button 
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      onClick={() => {
                        if (option.type === 'ai') {
                          setIsInDebate(true);
                        } else if (option.type === 'peer') {
                          window.location.href = '/peer-match';
                        } else if (option.type === 'tournament') {
                          window.location.href = '/tournament-mode';
                        }
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Practice
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Debate Formats */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle>Choose Your Format</CardTitle>
                <CardDescription>
                  Select the debate format you'd like to practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {debateFormats.map((format, index) => (
                    <div
                      key={index}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900 mb-1">{format.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{format.description}</p>
                      <Badge variant="outline">{format.rounds} rounds</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Performance */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Your Recent Performance</CardTitle>
                <CardDescription>
                  Track your improvement across different debate skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { skill: "Argument Construction", score: 85, trend: "+5" },
                    { skill: "Rebuttal Strength", score: 78, trend: "+12" },
                    { skill: "Evidence Usage", score: 92, trend: "+3" },
                    { skill: "Speaking Clarity", score: 88, trend: "+8" }
                  ].map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{metric.skill}</span>
                          <span className="text-sm text-gray-500">
                            {metric.score}% <span className="text-green-600">({metric.trend})</span>
                          </span>
                        </div>
                        <Progress value={metric.score} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* In-Debate Interface */
          <div className="space-y-6">
            {/* Debate Header */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">AI Practice Debate</CardTitle>
                    <CardDescription className="mt-2">
                      <strong>Motion:</strong> {currentTopic}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">
                      {formatTime(timer)}
                    </div>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">
                      {currentSpeaker === 'user' ? 'Your Turn' : 'AI Speaking'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Debate Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Video/Audio Controls */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-4 opacity-80" />
                        <p className="text-lg">Debate Session Active</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <Button
                        variant={micEnabled ? "default" : "secondary"}
                        onClick={() => setMicEnabled(!micEnabled)}
                        className="flex items-center gap-2"
                      >
                        {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                        {micEnabled ? 'Mute' : 'Unmute'}
                      </Button>
                      
                      <Button
                        variant={videoEnabled ? "default" : "secondary"}
                        onClick={() => setVideoEnabled(!videoEnabled)}
                        className="flex items-center gap-2"
                      >
                        {videoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                        {videoEnabled ? 'Stop Video' : 'Start Video'}
                      </Button>
                      
                      <Button
                        variant="destructive"
                        onClick={() => setIsInDebate(false)}
                      >
                        End Debate
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Speaking Notes */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Your Speaking Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none"
                      placeholder="Jot down your key points, rebuttals, and evidence..."
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Debate Structure */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Debate Structure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { speaker: "Opening Gov (You)", time: "7 min", status: "current" },
                        { speaker: "Opening Opp (AI)", time: "8 min", status: "upcoming" },
                        { speaker: "Closing Gov (You)", time: "8 min", status: "upcoming" },
                        { speaker: "Closing Opp (AI)", time: "8 min", status: "upcoming" }
                      ].map((round, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg border ${
                            round.status === 'current' 
                              ? 'border-indigo-300 bg-indigo-50' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{round.speaker}</span>
                            <span className="text-xs text-gray-500">{round.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Feedback */}
                <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Real-time AI Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-white/20 rounded-lg">
                        <p className="font-medium">Strong opening claim!</p>
                        <p className="text-purple-100">Your argument structure is clear and logical.</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-lg">
                        <p className="font-medium">Consider adding evidence</p>
                        <p className="text-purple-100">Statistics would strengthen this point.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="w-4 h-4 mr-2" />
                      Request Point of Information
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      Check Time Remaining
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset Timer
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DebateArena;
