import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Map, 
  Trophy, 
  Star, 
  Lock, 
  Play, 
  Target,
  Brain,
  Gamepad2,
  Award,
  TrendingUp,
  Zap,
  ChevronRight,
  Crown,
  Shield,
  Sword
} from 'lucide-react';

interface LearningJourneyProps {
  onStartQuest: (questId: string) => void;
}

const LearningJourney: React.FC<LearningJourneyProps> = ({ onStartQuest }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalXP, setTotalXP] = useState(1250);
  
  const levels = [
    {
      id: 'beginner',
      title: 'Novice Debater',
      level: 1,
      icon: Shield,
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      unlocked: true,
      xpRequired: 0,
      description: 'Master the fundamentals of debate'
    },
    {
      id: 'intermediate',
      title: 'Skilled Advocate',
      level: 2,
      icon: Sword,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      unlocked: totalXP >= 2000,
      xpRequired: 2000,
      description: 'Advanced techniques and strategy'
    },
    {
      id: 'advanced',
      title: 'Debate Champion',
      level: 3,
      icon: Crown,
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      unlocked: totalXP >= 5000,
      xpRequired: 5000,
      description: 'Master-level skills and tactics'
    }
  ];

  const quests = [
    // Beginner Level
    {
      id: 'debate-basics',
      title: 'Debate Foundation Quest',
      level: 'beginner',
      type: 'foundation',
      description: 'Learn the core structure of arguments and debate formats',
      duration: '15 min',
      xpReward: 150,
      completed: true,
      modules: ['Argument Structure', 'Debate Formats', 'Speaker Roles']
    },
    {
      id: 'argument-builder',
      title: 'Argument Architect',
      level: 'beginner',
      type: 'interactive',
      description: 'Build compelling arguments with our drag-and-drop tool',
      duration: '20 min',
      xpReward: 200,
      completed: true,
      modules: ['Claim-Evidence-Warrant', 'Logical Flow', 'Counter-Arguments']
    },
    {
      id: 'fallacy-hunter',
      title: 'Fallacy Detective',
      level: 'beginner',
      type: 'game',
      description: 'Spot logical fallacies in real-world arguments',
      duration: '25 min',
      xpReward: 250,
      completed: false,
      modules: ['Common Fallacies', 'Identification Skills', 'Response Strategies']
    },
    
    // Intermediate Level
    {
      id: 'rebuttal-master',
      title: 'Rebuttal Workshop',
      level: 'intermediate',
      type: 'simulation',
      description: 'Master the art of dismantling opponent arguments',
      duration: '30 min',
      xpReward: 300,
      completed: false,
      modules: ['Direct Refutation', 'Turn Arguments', 'Defensive Strategies']
    },
    {
      id: 'format-specialist',
      title: 'Format Explorer',
      level: 'intermediate',
      type: 'comprehensive',
      description: 'Deep dive into different debate formats and their strategies',
      duration: '45 min',
      xpReward: 400,
      completed: false,
      modules: ['British Parliamentary', 'Policy Debate', 'Public Forum']
    },
    
    // Advanced Level
    {
      id: 'strategy-tactician',
      title: 'Strategic Mastermind',
      level: 'advanced',
      type: 'advanced',
      description: 'Learn advanced debate strategy and psychological tactics',
      duration: '50 min',
      xpReward: 500,
      completed: false,
      modules: ['Meta-Arguments', 'Framing', 'Time Management']
    }
  ];

  const achievements = [
    { id: 'first-quest', title: 'Quest Beginner', description: 'Complete your first quest', earned: true },
    { id: 'fallacy-hunter', title: 'Fallacy Hunter', description: 'Identify 10 logical fallacies', earned: true },
    { id: 'argument-master', title: 'Argument Master', description: 'Build 5 perfect arguments', earned: false },
    { id: 'rebuttal-king', title: 'Rebuttal King', description: 'Master 3 rebuttal techniques', earned: false },
    { id: 'logic-champion', title: 'Logic Champion', description: 'Score 100% on advanced logic quiz', earned: false }
  ];

  const getQuestsByLevel = (levelId: string) => {
    return quests.filter(quest => quest.level === levelId);
  };

  const getQuestIcon = (type: string) => {
    switch (type) {
      case 'foundation': return Target;
      case 'interactive': return Gamepad2;
      case 'game': return Trophy;
      case 'simulation': return Brain;
      case 'comprehensive': return Map;
      case 'advanced': return Crown;
      default: return Play;
    }
  };

  const isQuestUnlocked = (quest: any) => {
    const level = levels.find(l => l.id === quest.level);
    return level?.unlocked || false;
  };

  return (
    <div className="space-y-6">
      {/* Learning Journey Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Map className="w-8 h-8" />
            Learning Journey
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Embark on an epic quest to master the art of debate through gamified challenges
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{totalXP.toLocaleString()}</div>
              <div className="text-sm text-indigo-100">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{currentLevel}</div>
              <div className="text-sm text-indigo-100">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{achievements.filter(a => a.earned).length}</div>
              <div className="text-sm text-indigo-100">Achievements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            Your Learning Path
          </CardTitle>
          <CardDescription>
            Progress through levels to unlock new challenges and master debate skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {levels.map((level, index) => (
              <div key={level.id} className="relative">
                {index < levels.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-20 bg-gradient-to-b from-gray-300 to-transparent"></div>
                )}
                
                <div className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                  level.unlocked 
                    ? `${level.bgColor} ${level.borderColor} shadow-lg` 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${level.unlocked ? level.color : 'from-gray-400 to-gray-500'}`}>
                      <level.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold ${level.unlocked ? level.textColor : 'text-gray-500'}`}>
                        {level.title}
                      </h3>
                      <p className={`text-sm ${level.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                        {level.description}
                      </p>
                      {!level.unlocked && (
                        <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                          <Lock className="w-4 h-4" />
                          Requires {level.xpRequired} XP to unlock
                        </div>
                      )}
                    </div>
                    <Badge variant={level.unlocked ? 'default' : 'secondary'} className="text-xs">
                      Level {level.level}
                    </Badge>
                  </div>

                  {level.unlocked && (
                    <div className="grid gap-3">
                      {getQuestsByLevel(level.id).map((quest) => {
                        const QuestIcon = getQuestIcon(quest.type);
                        return (
                          <div
                            key={quest.id}
                            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                              quest.completed
                                ? 'bg-green-50 border-green-200'
                                : 'bg-white border-gray-200 hover:border-indigo-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <QuestIcon className={`w-5 h-5 ${
                                  quest.completed ? 'text-green-600' : 'text-indigo-600'
                                }`} />
                                <div>
                                  <h4 className={`font-semibold ${
                                    quest.completed ? 'text-green-800' : 'text-gray-900'
                                  }`}>
                                    {quest.title}
                                  </h4>
                                  <p className="text-sm text-gray-600">{quest.description}</p>
                                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                    <span>⏱️ {quest.duration}</span>
                                    <span>⭐ {quest.xpReward} XP</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => onStartQuest(quest.id)}
                                variant={quest.completed ? 'outline' : 'default'}
                                className={quest.completed ? '' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'}
                              >
                                {quest.completed ? (
                                  <>
                                    <Trophy className="w-4 h-4 mr-1" />
                                    Replay
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 mr-1" />
                                    Start
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements Showcase */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-600" />
            Achievement Gallery
          </CardTitle>
          <CardDescription>
            Track your progress and unlock special badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                  achievement.earned
                    ? 'border-yellow-200 bg-yellow-50 shadow-lg'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className={`w-6 h-6 ${
                    achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                  }`} />
                  <h4 className={`font-bold ${
                    achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                  }`}>
                    {achievement.title}
                  </h4>
                </div>
                <p className={`text-sm ${
                  achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                }`}>
                  {achievement.description}
                </p>
                {achievement.earned && (
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800" variant="secondary">
                    Unlocked! ✨
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningJourney;