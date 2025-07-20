import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Star, 
  Award, 
  Sparkles,
  Target,
  Crown
} from 'lucide-react';

interface QuestCompletionProps {
  questTitle: string;
  xpEarned: number;
  score: number;
  newAchievements: string[];
  onContinue: () => void;
}

const QuestCompletion: React.FC<QuestCompletionProps> = ({ 
  questTitle, 
  xpEarned, 
  score, 
  newAchievements, 
  onContinue 
}) => {
  const getPerformanceLevel = () => {
    if (score >= 90) return { level: 'Excellent', color: 'text-yellow-600', icon: Crown };
    if (score >= 75) return { level: 'Great', color: 'text-green-600', icon: Trophy };
    if (score >= 60) return { level: 'Good', color: 'text-blue-600', icon: Target };
    return { level: 'Keep Practicing', color: 'text-gray-600', icon: Star };
  };

  const performance = getPerformanceLevel();
  const PerformanceIcon = performance.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden relative">
        {/* Celebration Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-400/20 rounded-full translate-y-12 -translate-x-12 animate-pulse delay-1000"></div>
        
        <CardContent className="p-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quest Completed! 🎉
            </h1>
            <p className="text-xl text-gray-600">
              {questTitle}
            </p>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl border border-yellow-200">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{xpEarned}</div>
              <div className="text-sm text-gray-600">XP Earned</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-xl border border-green-200">
              <PerformanceIcon className={`w-8 h-8 ${performance.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-gray-900">{score}%</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-xl border border-purple-200">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{newAchievements.length}</div>
              <div className="text-sm text-gray-600">New Badges</div>
            </div>
          </div>

          {/* Performance Feedback */}
          <Card className={`mb-6 border-2 ${
            score >= 90 ? 'border-yellow-300 bg-yellow-50' :
            score >= 75 ? 'border-green-300 bg-green-50' :
            score >= 60 ? 'border-blue-300 bg-blue-50' :
            'border-gray-300 bg-gray-50'
          }`}>
            <CardContent className="p-6 text-center">
              <h3 className={`text-xl font-bold mb-2 ${performance.color}`}>
                {performance.level}!
              </h3>
              <p className="text-gray-700">
                {score >= 90 ? 'Outstanding performance! You\'ve mastered this concept completely.' :
                 score >= 75 ? 'Great work! You\'ve shown strong understanding of the material.' :
                 score >= 60 ? 'Good effort! You\'re on the right track with room to improve.' :
                 'Keep practicing! Every attempt makes you stronger.'}
              </p>
            </CardContent>
          </Card>

          {/* New Achievements */}
          {newAchievements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-600" />
                New Achievements Unlocked!
              </h3>
              <div className="space-y-3">
                {newAchievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg border border-yellow-200 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                      <div>
                        <h4 className="font-bold text-yellow-800">{achievement}</h4>
                        <p className="text-sm text-yellow-700">Achievement unlocked!</p>
                      </div>
                      <Badge className="ml-auto bg-yellow-100 text-yellow-800">
                        New! ✨
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={onContinue}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 py-3 text-lg"
            >
              Continue Journey
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Motivational Message */}
          <div className="text-center mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
            <p className="text-indigo-800 font-medium">
              "Every master was once a beginner. Every pro was once an amateur."
            </p>
            <p className="text-sm text-indigo-600 mt-1">Keep pushing forward! 🚀</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestCompletion;