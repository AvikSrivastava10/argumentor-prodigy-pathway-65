import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Trophy, 
  Users, 
  Clock, 
  Target,
  Crown,
  Medal,
  ArrowLeft,
  Timer,
  Mic,
  MicOff,
  ChevronDown,
  ChevronUp,
  X,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

type TournamentPhase = 'bracket' | 'debate' | 'results' | 'complete';
type Round = 'quarter-finals' | 'semi-finals' | 'finals';

const TournamentMode = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<TournamentPhase>('bracket');
  const [currentRound, setCurrentRound] = useState<Round>('quarter-finals');
  const [timer, setTimer] = useState(600); // 10 minutes per phase in tournament
  const [micEnabled, setMicEnabled] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [userRank, setUserRank] = useState(8);
  const [userPoints, setUserPoints] = useState(1250);

  const bracket = {
    'quarter-finals': [
      { match: 1, player1: 'You', player2: 'Sarah Kim', winner: null, time: '15:30' },
      { match: 2, player1: 'Alex Chen', player2: 'Jordan Miller', winner: 'Alex Chen', time: '15:45' },
      { match: 3, player1: 'Maya Patel', player2: 'Chris Johnson', winner: 'Maya Patel', time: '16:00' },
      { match: 4, player1: 'David Lee', player2: 'Emma Wilson', winner: 'David Lee', time: '16:15' }
    ],
    'semi-finals': [
      { match: 5, player1: 'TBD', player2: 'Alex Chen', winner: null, time: '17:00' },
      { match: 6, player1: 'Maya Patel', player2: 'David Lee', winner: null, time: '17:15' }
    ],
    'finals': [
      { match: 7, player1: 'TBD', player2: 'TBD', winner: null, time: '18:00' }
    ]
  };

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', points: 2450, wins: 23, losses: 3 },
    { rank: 2, name: 'Maya Patel', points: 2380, wins: 21, losses: 4 },
    { rank: 3, name: 'David Lee', points: 2290, wins: 19, losses: 6 },
    { rank: 4, name: 'Emma Wilson', points: 2180, wins: 18, losses: 7 },
    { rank: 5, name: 'Jordan Miller', points: 2050, wins: 16, losses: 9 },
    { rank: 6, name: 'Chris Johnson', points: 1920, wins: 15, losses: 10 },
    { rank: 7, name: 'Sarah Kim', points: 1850, wins: 14, losses: 11 },
    { rank: 8, name: 'You', points: userPoints, wins: 12, losses: 13 },
    { rank: 9, name: 'Lisa Zhang', points: 1680, wins: 11, losses: 14 },
    { rank: 10, name: 'Tom Brady', points: 1590, wins: 10, losses: 15 }
  ];

  // Tournament debate timer
  useEffect(() => {
    if (currentPhase === 'debate' && timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else if (currentPhase === 'debate' && timer === 0) {
      setCurrentPhase('results');
    }
  }, [currentPhase, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startMatch = () => {
    setCurrentPhase('debate');
    setTimer(600); // 10 minutes for tournament debate
  };

  const completeMatch = (won: boolean) => {
    setCurrentPhase('results');
    if (won) {
      setUserPoints(prev => prev + 150);
      // Update bracket
      // In real app, this would update the tournament state
    }
  };

  const exitTournament = () => {
    navigate('/arena');
  };

  const advanceToNextRound = () => {
    if (currentRound === 'quarter-finals') {
      setCurrentRound('semi-finals');
    } else if (currentRound === 'semi-finals') {
      setCurrentRound('finals');
    } else {
      setCurrentPhase('complete');
    }
    setCurrentPhase('bracket');
  };

  if (currentPhase === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm max-w-lg mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Crown className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tournament Complete!</h1>
                <p className="text-lg text-gray-600">Congratulations on your performance</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Final Placement</span>
                    <Badge className="bg-yellow-500">2nd Place</Badge>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Points Earned</span>
                    <span className="font-bold text-blue-600">+400</span>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">New Ranking</span>
                    <span className="font-bold text-green-600">#6 Overall</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline" 
                  className="flex-1"
                >
                  Join New Tournament
                </Button>
                <Button 
                  onClick={exitTournament}
                  className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                >
                  Return to Arena
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (currentPhase === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm max-w-lg mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Award className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h1 className="text-3xl font-bold text-green-600 mb-2">You Win!</h1>
                <p className="text-lg text-gray-600">Great debate performance</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Points Earned</span>
                    <span className="font-bold text-green-600">+150</span>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">New Total</span>
                    <span className="font-bold text-blue-600">{userPoints} points</span>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Current Rank</span>
                    <Badge variant="secondary">#{userRank}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowExitDialog(true)}
                  variant="outline" 
                  className="flex-1"
                >
                  Exit Tournament
                </Button>
                <Button 
                  onClick={advanceToNextRound}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Advance to Next Round
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (currentPhase === 'debate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => setCurrentPhase('bracket')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Bracket
            </Button>
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Tournament Match</h1>
              <p className="text-gray-600">Quarter-Finals • Match 1</p>
            </div>
            <Badge className="bg-red-500">🔴 LIVE</Badge>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Debate Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Tournament Timer */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Timer className="w-6 h-6 text-purple-600" />
                      <div>
                        <h3 className="font-semibold text-lg">Tournament Debate</h3>
                        <p className="text-sm text-gray-600">Strict time limits enforced</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-purple-600">{formatTime(timer)}</div>
                      <Progress value={(timer / 600) * 100} className="w-32 h-2 mt-1" />
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
                      onClick={() => completeMatch(true)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      Complete Match
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tournament Rules */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Tournament Rules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <p className="font-medium">Time Limits</p>
                      <p className="text-purple-100">10 minutes total per debater</p>
                      <p className="text-purple-100">Strict enforcement</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">Scoring</p>
                      <p className="text-purple-100">Judge panel evaluation</p>
                      <p className="text-purple-100">Winner advances in bracket</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Speaking Notes */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Tournament Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="h-32 resize-none"
                    placeholder="Tournament-level preparation notes..."
                  />
                </CardContent>
              </Card>
            </div>

            {/* Tournament Sidebar */}
            <div className="space-y-6">
              {/* Current Match */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Current Match</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-2 border-purple-200">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-purple-500 text-white text-sm">You</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">You</span>
                      </div>
                      <span className="text-sm text-gray-600">Position</span>
                    </div>
                    <div className="text-center text-sm text-gray-500 font-medium">VS</div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gray-500 text-white text-sm">SK</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Sarah Kim</span>
                      </div>
                      <span className="text-sm text-gray-600">Opposition</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mini Leaderboard */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Leaderboard
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsLeaderboardOpen(!isLeaderboardOpen)}
                      className="text-white hover:bg-white/20"
                    >
                      {isLeaderboardOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardHeader>
                {isLeaderboardOpen && (
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {leaderboard.slice(0, 5).map((player) => (
                        <div 
                          key={player.rank}
                          className={`flex items-center justify-between p-2 rounded ${
                            player.name === 'You' ? 'bg-white/30' : 'bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium">#{player.rank}</span>
                            <span className={player.name === 'You' ? 'font-bold' : ''}>{player.name}</span>
                          </div>
                          <span className="text-yellow-100">{player.points}</span>
                        </div>
                      ))}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full mt-3 text-white hover:bg-white/20">
                          View Full Leaderboard
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Tournament Leaderboard</DialogTitle>
                          <DialogDescription>
                            Current standings for all tournament participants
                          </DialogDescription>
                        </DialogHeader>
                        <div className="max-h-96 overflow-y-auto">
                          <div className="space-y-2">
                            {leaderboard.map((player) => (
                              <div 
                                key={player.rank}
                                className={`flex items-center justify-between p-3 rounded-lg border ${
                                  player.name === 'You' ? 'border-purple-200 bg-purple-50' : 'border-gray-200'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="font-bold text-lg w-8">#{player.rank}</span>
                                  <Avatar>
                                    <AvatarFallback className={player.name === 'You' ? 'bg-purple-500 text-white' : ''}>
                                      {player.name === 'You' ? 'You' : player.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className={`font-medium ${player.name === 'You' ? 'text-purple-600' : ''}`}>
                                      {player.name}
                                    </p>
                                    <p className="text-sm text-gray-600">{player.wins}W - {player.losses}L</p>
                                  </div>
                                </div>
                                <span className="font-bold text-lg">{player.points}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Tournament Bracket View
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Tournament Mode</h1>
          </div>
          <p className="text-xl text-gray-600">Climb the Bracket to Victory!</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge className="bg-purple-500">Round: {currentRound.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>
            <Badge variant="outline">Your Rank: #{userRank}</Badge>
            <Badge variant="secondary">{userPoints} Points</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Tournament Bracket */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Tournament Bracket</span>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowExitDialog(true)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Exit Tournament
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* Quarter Finals */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-center">Quarter-Finals</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {bracket['quarter-finals'].map((match) => (
                        <div 
                          key={match.match}
                          className={`p-4 border-2 rounded-lg ${
                            match.player1 === 'You' || match.player2 === 'You'
                              ? 'border-purple-300 bg-purple-50' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Match {match.match}</span>
                            <span className="text-sm text-gray-600">{match.time}</span>
                          </div>
                          <div className="space-y-2">
                            <div className={`flex items-center justify-between p-2 rounded ${
                              match.player1 === 'You' ? 'bg-purple-100' : 'bg-white'
                            }`}>
                              <span className={match.player1 === 'You' ? 'font-bold' : ''}>{match.player1}</span>
                              {match.winner === match.player1 && <Medal className="w-4 h-4 text-yellow-500" />}
                            </div>
                            <div className={`flex items-center justify-between p-2 rounded ${
                              match.player2 === 'You' ? 'bg-purple-100' : 'bg-white'
                            }`}>
                              <span className={match.player2 === 'You' ? 'font-bold' : ''}>{match.player2}</span>
                              {match.winner === match.player2 && <Medal className="w-4 h-4 text-yellow-500" />}
                            </div>
                          </div>
                          {match.player1 === 'You' || match.player2 === 'You' ? (
                            <Button 
                              onClick={startMatch}
                              className="w-full mt-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                            >
                              Start Match
                            </Button>
                          ) : (
                            <div className="mt-3 text-center">
                              {match.winner ? (
                                <Badge variant="secondary">Complete</Badge>
                              ) : (
                                <Badge variant="outline">In Progress</Badge>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Semi Finals */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-center">Semi-Finals</h3>
                    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      {bracket['semi-finals'].map((match) => (
                        <div key={match.match} className="p-4 border-2 border-gray-200 bg-gray-50 rounded-lg opacity-60">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Match {match.match}</span>
                            <span className="text-sm text-gray-600">{match.time}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-white rounded">
                              <span>{match.player1}</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-white rounded">
                              <span>{match.player2}</span>
                            </div>
                          </div>
                          <div className="mt-3 text-center">
                            <Badge variant="outline">Waiting</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Finals */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 text-center">Finals</h3>
                    <div className="max-w-md mx-auto">
                      {bracket['finals'].map((match) => (
                        <div key={match.match} className="p-4 border-2 border-gray-200 bg-gray-50 rounded-lg opacity-60">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Championship Match</span>
                            <span className="text-sm text-gray-600">{match.time}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-white rounded">
                              <span>{match.player1}</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-white rounded">
                              <span>{match.player2}</span>
                            </div>
                          </div>
                          <div className="mt-3 text-center">
                            <Badge variant="outline">Waiting</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard Panel */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Top 10 Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {leaderboard.slice(0, 10).map((player) => (
                    <div 
                      key={player.rank}
                      className={`flex items-center justify-between p-2 rounded ${
                        player.name === 'You' ? 'bg-white/30 font-bold' : 'bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">#{player.rank}</span>
                        <span>{player.name}</span>
                      </div>
                      <span className="text-yellow-100">{player.points}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tournament Info */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Tournament Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Format</span>
                  <span className="font-medium">Single Elimination</span>
                </div>
                <div className="flex justify-between">
                  <span>Participants</span>
                  <span className="font-medium">8 Debaters</span>
                </div>
                <div className="flex justify-between">
                  <span>Prize Pool</span>
                  <span className="font-medium">1000 Points</span>
                </div>
                <div className="flex justify-between">
                  <span>Your Seed</span>
                  <span className="font-medium">#8</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Exit Tournament Dialog */}
        <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Exit Tournament?</DialogTitle>
              <DialogDescription>
                Are you sure you want to exit the tournament? You will forfeit your current position and any potential prizes.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowExitDialog(false)}
                className="flex-1"
              >
                Stay in Tournament
              </Button>
              <Button 
                onClick={exitTournament}
                variant="destructive"
                className="flex-1"
              >
                Exit Tournament
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default TournamentMode;