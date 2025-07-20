import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Clock, 
  Search, 
  MessageSquare,
  Star,
  ThumbsUp,
  Laugh,
  Send,
  X,
  ArrowLeft,
  Timer,
  Mic,
  MicOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

type DebatePhase = 'matching' | 'countdown' | 'opening' | 'rebuttal' | 'conclusion' | 'feedback';
type Reaction = '👍' | '👏' | '😂';

const PeerMatch = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<DebatePhase>('matching');
  const [timer, setTimer] = useState(300); // 5 minutes per phase
  const [isMatching, setIsMatching] = useState(true);
  const [matchedOpponent, setMatchedOpponent] = useState<any>(null);
  const [countdown, setCountdown] = useState(5);
  const [micEnabled, setMicEnabled] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, sender: string, message: string, timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Simulate matching process
  useEffect(() => {
    if (currentPhase === 'matching') {
      const matchingTimer = setTimeout(() => {
        setMatchedOpponent({
          name: 'Alex Chen',
          level: 12,
          avatar: 'AC',
          skillLevel: 85
        });
        setIsMatching(false);
        setCurrentPhase('countdown');
      }, 3000);

      return () => clearTimeout(matchingTimer);
    }
  }, [currentPhase]);

  // Countdown timer
  useEffect(() => {
    if (currentPhase === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (currentPhase === 'countdown' && countdown === 0) {
      setCurrentPhase('opening');
      setTimer(420); // 7 minutes for opening
    }
  }, [currentPhase, countdown]);

  // Debate timer
  useEffect(() => {
    if (['opening', 'rebuttal', 'conclusion'].includes(currentPhase) && timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      // Auto-advance to next phase
      const phaseOrder: DebatePhase[] = ['opening', 'rebuttal', 'conclusion', 'feedback'];
      const currentIndex = phaseOrder.indexOf(currentPhase);
      if (currentIndex < phaseOrder.length - 1) {
        setCurrentPhase(phaseOrder[currentIndex + 1]);
        if (phaseOrder[currentIndex + 1] !== 'feedback') {
          setTimer(phaseOrder[currentIndex + 1] === 'opening' ? 420 : 300); // 7 min opening, 5 min others
        }
      }
    }
  }, [currentPhase, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sendReaction = (reaction: Reaction) => {
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'You',
      message: reaction,
      timestamp: new Date()
    }]);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'You',
        message: newMessage,
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  const cancelMatch = () => {
    navigate('/arena');
  };

  const submitFeedback = () => {
    // Simulate feedback submission
    navigate('/arena');
  };

  const quickRematch = () => {
    setCurrentPhase('matching');
    setIsMatching(true);
    setMatchedOpponent(null);
    setCountdown(5);
    setChatMessages([]);
    setRating(0);
    setFeedback('');
  };

  if (currentPhase === 'matching') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Peer Match</h1>
            </div>
            <p className="text-xl text-gray-600">Find Your Perfect Debate Partner</p>
          </div>

          {/* Matching Animation */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center animate-pulse">
                  <Search className="w-8 h-8 text-white animate-spin" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping"></div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Finding opponent...</h3>
              <p className="text-gray-600 mb-6">Matching you with a debater at your skill level</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Your Skill Level</span>
                  <span className="font-medium">Level 10 • Advanced</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <Button variant="outline" onClick={cancelMatch} className="w-full">
                <X className="w-4 h-4 mr-2" />
                Cancel Match
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (currentPhase === 'countdown') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm max-w-lg mx-auto">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg">
                      {matchedOpponent?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold">{matchedOpponent?.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Level {matchedOpponent?.level}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{matchedOpponent?.skillLevel}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-6xl font-bold text-blue-600 mb-4">{countdown}</div>
              <p className="text-lg text-gray-600">Debate starting in...</p>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Topic:</strong> This house believes that social media does more harm than good to democracy
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (currentPhase === 'feedback') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Rate Your Debate Partner</CardTitle>
              <CardDescription className="text-center">
                Help improve the peer matching system with your feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-3">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg">
                    {matchedOpponent?.avatar}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{matchedOpponent?.name}</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Rating
                </label>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-8 h-8 ${
                          star <= rating 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments (Optional)
                </label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts about this debate experience..."
                  className="h-24"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={quickRematch}
                  variant="outline" 
                  className="flex-1"
                >
                  Quick Rematch
                </Button>
                <Button 
                  onClick={submitFeedback}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Submit & Exit
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Debate Interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate('/arena')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Arena
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Peer Match Debate</h1>
            <p className="text-gray-600">vs {matchedOpponent?.name}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Debate Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Timer and Phase */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Timer className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-lg capitalize">{currentPhase} Phase</h3>
                      <p className="text-sm text-gray-600">
                        {currentPhase === 'opening' && 'Present your opening arguments'}
                        {currentPhase === 'rebuttal' && 'Address opponent points and strengthen your case'}
                        {currentPhase === 'conclusion' && 'Summarize and close your argument'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{formatTime(timer)}</div>
                    <Progress value={(timer / (currentPhase === 'opening' ? 420 : 300)) * 100} className="w-32 h-2 mt-1" />
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
                <Textarea
                  className="h-40 resize-none"
                  placeholder="Jot down your key points, rebuttals, and evidence..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat & Reactions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Live Chat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Reaction Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendReaction('👍')}
                    className="text-lg p-2"
                  >
                    👍
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendReaction('👏')}
                    className="text-lg p-2"
                  >
                    👏
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendReaction('😂')}
                    className="text-lg p-2"
                  >
                    😂
                  </Button>
                </div>

                {/* Chat Messages */}
                <div className="h-32 overflow-y-auto space-y-2 bg-gray-50 rounded-lg p-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="text-sm">
                      <span className="font-medium text-blue-600">{msg.sender}:</span> {msg.message}
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button size="sm" onClick={sendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Opponent Info */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Your Opponent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarFallback className="bg-white/20 text-white">
                      {matchedOpponent?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{matchedOpponent?.name}</p>
                    <div className="flex items-center gap-2 text-sm text-blue-100">
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        Level {matchedOpponent?.level}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-blue-100">
                  <div className="flex justify-between">
                    <span>Skill Level</span>
                    <span>{matchedOpponent?.skillLevel}%</span>
                  </div>
                  <Progress value={matchedOpponent?.skillLevel} className="h-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PeerMatch;