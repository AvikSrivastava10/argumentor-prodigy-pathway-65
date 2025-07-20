import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Star,
  Brain,
  Lightbulb,
  Target,
  RefreshCw
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { getDailyChallengeByDate, getRandomChallenge, type Challenge } from '@/data/challengeBank';

const DailyChallenge = () => {
  const navigate = useNavigate();
  const [challengeData, setChallengeData] = useState<Challenge | null>(null);
  const [selectedFallacies, setSelectedFallacies] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Load a fresh challenge each time the component mounts
    const loadChallenge = () => {
      setLoading(true);
      // Use date-based challenge for consistency, or random for more variety
      const challenge = getDailyChallengeByDate();
      
      setTimeout(() => {
        setChallengeData(challenge);
        setLoading(false);
        setTimeout(() => setAnimateIn(true), 100);
      }, 500); // Brief loading state for smooth transition
    };

    loadChallenge();
    
    // Reset state when component mounts
    setSelectedFallacies([]);
    setSubmitted(false);
    setShowConfetti(false);
  }, []);

  const loadNewChallenge = () => {
    setAnimateIn(false);
    setLoading(true);
    setSubmitted(false);
    setSelectedFallacies([]);
    setShowConfetti(false);
    
    setTimeout(() => {
      const challenge = getRandomChallenge();
      setChallengeData(challenge);
      setLoading(false);
      setTimeout(() => setAnimateIn(true), 100);
    }, 300);
  };

  const handleFallacyToggle = (fallacyId: string) => {
    if (submitted) return;
    
    setSelectedFallacies(prev => 
      prev.includes(fallacyId) 
        ? prev.filter(id => id !== fallacyId)
        : [...prev, fallacyId]
    );
  };

  const handleSubmit = () => {
    if (!challengeData) return;
    
    setSubmitted(true);
    
    const correctCount = selectedFallacies.filter(id => 
      challengeData.correctFallacies.includes(id)
    ).length;
    
    const totalCorrect = challengeData.correctFallacies.length;
    
    if (correctCount === totalCorrect && selectedFallacies.length === totalCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const getOptionStatus = (fallacyId: string) => {
    if (!submitted) return 'default';
    
    const isSelected = selectedFallacies.includes(fallacyId);
    const isCorrect = challengeData.correctFallacies.includes(fallacyId);
    
    if (isSelected && isCorrect) return 'correct';
    if (isSelected && !isCorrect) return 'incorrect';
    if (!isSelected && isCorrect) return 'missed';
    return 'default';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'correct': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'incorrect': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'missed': return <Target className="w-5 h-5 text-orange-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'correct': return 'border-green-500 bg-green-50';
      case 'incorrect': return 'border-red-500 bg-red-50';
      case 'missed': return 'border-orange-500 bg-orange-50';
      default: return 'border-gray-200 bg-white hover:border-[#EE6C29] hover:bg-orange-50';
    }
  };

  const correctCount = submitted && challengeData ? selectedFallacies.filter(id => 
    challengeData.correctFallacies.includes(id)
  ).length : 0;

  const totalCorrect = challengeData?.correctFallacies.length || 0;

  if (loading || !challengeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#282B2B] via-gray-800 to-[#282B2B]">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-[#EE6C29] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[#7AA6B3] text-lg">Loading your challenge...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#282B2B] via-gray-800 to-[#282B2B]">
      <Navbar />
      
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 animate-pulse">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#EE6C29] rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-8 h-8 text-[#EE6C29]" />
              <h1 className="text-4xl font-bold text-white">Daily Challenge</h1>
            </div>
            <p className="text-[#7AA6B3] text-lg">
              Sharpen your fallacy detection skills with today's argument analysis
            </p>
          </div>
        </div>

        {/* Challenge Controls */}
        <div className="flex justify-between items-center mb-6">
          <Badge variant="outline" className="border-[#7AA6B3] text-[#7AA6B3] px-3 py-1">
            Difficulty: {challengeData.difficulty}
          </Badge>
          <Button
            onClick={loadNewChallenge}
            variant="outline"
            size="sm"
            className="border-[#EE6C29] text-[#EE6C29] hover:bg-[#EE6C29]/10"
            disabled={loading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Challenge
          </Button>
        </div>

        {/* Argument Card */}
        <Card className={`mb-8 border-2 border-[#7AA6B3]/30 bg-white/95 backdrop-blur-sm shadow-2xl transition-all duration-500 ${
          animateIn ? 'animate-fade-in' : 'opacity-0 translate-y-4'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#282B2B]">
              <Lightbulb className="w-6 h-6 text-[#EE6C29]" />
              Analyze This Argument
            </CardTitle>
            <CardDescription>
              Read carefully and identify the logical fallacies present
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-gradient-to-r from-gray-50 to-orange-50/30 rounded-lg border-l-4 border-[#EE6C29] shadow-inner">
              <p className="text-lg leading-relaxed text-gray-800 font-medium">
                "{challengeData.argument}"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fallacy Options */}
        <Card className={`mb-8 border-2 border-[#7AA6B3]/30 bg-white/95 backdrop-blur-sm shadow-2xl transition-all duration-700 ${
          animateIn ? 'animate-fade-in' : 'opacity-0 translate-y-4'
        }`} style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="text-[#282B2B]">Select the Logical Fallacies</CardTitle>
            <CardDescription>
              Choose all fallacies that you can identify in the argument above
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challengeData.fallacyOptions.map((fallacy, index) => {
                const status = getOptionStatus(fallacy.id);
                return (
                  <div
                    key={fallacy.id}
                    onClick={() => handleFallacyToggle(fallacy.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      getStatusColor(status)
                    } ${selectedFallacies.includes(fallacy.id) && !submitted ? 'ring-2 ring-[#EE6C29]/50 shadow-[#EE6C29]/20 shadow-lg' : ''}`}
                    style={{ 
                      animationDelay: `${300 + index * 100}ms`,
                      opacity: animateIn ? 1 : 0,
                      transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 0.3s ease-out'
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{fallacy.name}</h3>
                      <div className="transition-all duration-200">
                        {getStatusIcon(status)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{fallacy.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        {!submitted && (
          <div className="text-center mb-8">
            <Button
              onClick={handleSubmit}
              disabled={selectedFallacies.length === 0}
              className="bg-[#EE6C29] hover:bg-[#EE6C29]/90 text-white px-8 py-3 text-lg font-semibold"
            >
              Submit Answer
            </Button>
          </div>
        )}

        {/* Results */}
        {submitted && (
          <Card className="border-2 border-[#7AA6B3]/30 bg-white/95 backdrop-blur-sm shadow-2xl animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#282B2B]">
                <Star className="w-6 h-6 text-[#EE6C29]" />
                Challenge Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score */}
              <div className="text-center p-6 bg-gradient-to-r from-[#7AA6B3]/10 to-[#EE6C29]/10 rounded-lg">
                <div className="text-3xl font-bold text-[#282B2B] mb-2">
                  {correctCount}/{totalCorrect}
                </div>
                <p className="text-lg text-gray-700">
                  {correctCount === totalCorrect ? "Perfect! 🎉" : 
                   correctCount > 0 ? "Good effort! 👍" : "Keep practicing! 💪"}
                </p>
              </div>

              {/* Correct Answers */}
              <div>
                <h3 className="text-lg font-semibold text-[#282B2B] mb-3">Correct Fallacies:</h3>
                <div className="space-y-2">
                  {challengeData.correctFallacies.map(fallacyId => {
                    const fallacy = challengeData.fallacyOptions.find(f => f.id === fallacyId);
                    return (
                      <div key={fallacyId} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <span className="font-medium text-green-800">{fallacy?.name}</span>
                          <p className="text-sm text-green-700">{fallacy?.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Improvement Tips */}
              <div className="p-4 bg-[#7AA6B3]/10 rounded-lg border border-[#7AA6B3]/30">
                <h3 className="text-lg font-semibold text-[#282B2B] mb-2">💡 Tips for Next Time:</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Look for personal attacks rather than addressing the argument (Ad Hominem)</li>
                  <li>• Watch for unrelated connections being treated as causal relationships</li>
                  <li>• Practice identifying when irrelevant information is used to discredit someone</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  className="border-[#7AA6B3] text-[#7AA6B3] hover:bg-[#7AA6B3]/10"
                >
                  Return to Dashboard
                </Button>
                <Button
                  onClick={loadNewChallenge}
                  className="bg-[#EE6C29] hover:bg-[#EE6C29]/90 text-white"
                >
                  Try Another Challenge
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default DailyChallenge;