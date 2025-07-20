import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Trophy, 
  Zap,
  Star,
  Crosshair,
  ArrowLeft
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface StoneBreakerGameProps {
  questions: Question[];
  onExit: () => void;
}

interface Stone {
  id: string;
  text: string;
  isCorrect: boolean;
  x: number;
  y: number;
  speed: number;
  destroyed: boolean;
  hit: boolean;
  opacity: number;
  rotation: number;
  size: number;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const StoneBreakerGame: React.FC<StoneBreakerGameProps> = ({ questions, onExit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stones, setStones] = useState<Stone[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [gamePhase, setGamePhase] = useState<'question' | 'falling' | 'complete' | 'final'>('question');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crosshairPos, setCrosshairPos] = useState({ x: 0, y: 0 });
  const [showCrosshair, setShowCrosshair] = useState(false);
  const [wrongStonesMissed, setWrongStonesMissed] = useState(0);
  const [correctStonesHit, setCorrectStonesHit] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const soundContextRef = useRef<AudioContext | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isGameComplete = currentQuestionIndex >= questions.length;

  // Initialize audio context
  useEffect(() => {
    if (soundEnabled && !soundContextRef.current) {
      soundContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, [soundEnabled]);

  // Play sound effects
  const playSound = useCallback((frequency: number, duration: number, type: 'sine' | 'square' = 'sine') => {
    if (!soundEnabled || !soundContextRef.current) return;
    
    const oscillator = soundContextRef.current.createOscillator();
    const gainNode = soundContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(soundContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(frequency, soundContextRef.current.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, soundContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, soundContextRef.current.currentTime + duration);
    
    oscillator.start(soundContextRef.current.currentTime);
    oscillator.stop(soundContextRef.current.currentTime + duration);
  }, [soundEnabled]);

  // Create particles effect
  const createParticles = useCallback((x: number, y: number, color: string, count: number = 8) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: `particle-${Date.now()}-${i}`,
        x,
        y,
        vx: (Math.random() - 0.5) * 400,
        vy: Math.random() * -200 - 100,
        life: 60,
        maxLife: 60,
        color,
        size: Math.random() * 4 + 2
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Initialize stones for current question
  const initializeStones = useCallback(() => {
    if (!currentQuestion) return;
    
    const correctWords = currentQuestion.options[currentQuestion.correctAnswer]
      .split(' ')
      .filter(word => word.length > 2);
    
    const wrongWords = currentQuestion.options
      .filter((_, index) => index !== currentQuestion.correctAnswer)
      .flatMap(option => option.split(' '))
      .filter(word => word.length > 2)
      .slice(0, Math.max(8 - correctWords.length, 4));

    const newStones: Stone[] = [];
    const totalStones = [...correctWords, ...wrongWords];
    
    totalStones.forEach((word, index) => {
      const baseDelay = index * 200; // Stagger stone appearances
      const speedVariation = Math.random() * 0.15 + 0.08; // Much slower falling (0.08-0.23)
      const trajectoryVariation = (Math.random() - 0.5) * 5; // Slight horizontal drift
      
      newStones.push({
        id: `stone-${index}`,
        text: word,
        isCorrect: correctWords.includes(word),
        x: Math.random() * 70 + 15 + trajectoryVariation, // Add trajectory variation
        y: -10 - Math.random() * 30 - baseDelay * 0.05, // Deeper starting positions with stagger
        speed: speedVariation,
        destroyed: false,
        hit: false,
        opacity: 0, // Start invisible for fade-in effect
        rotation: Math.random() * 360,
        size: Math.min(Math.max(word.length * (window.innerWidth > 1024 ? 8 : window.innerWidth > 768 ? 7 : window.innerWidth > 640 ? 6 : 5), window.innerWidth > 1024 ? 40 : window.innerWidth > 768 ? 36 : window.innerWidth > 640 ? 32 : 28), window.innerWidth > 1024 ? 80 : window.innerWidth > 768 ? 72 : window.innerWidth > 640 ? 64 : 56)
      });
    });

    setStones(newStones);
    setGamePhase('falling');
    setQuestionStartTime(Date.now());
    setCorrectStonesHit(0);
    setWrongStonesMissed(0);
  }, [currentQuestion]);

  // Handle mouse/touch movement for crosshair
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0]?.clientX || 0 : e.clientX;
        const clientY = 'touches' in e ? e.touches[0]?.clientY || 0 : e.clientY;
        
        setCrosshairPos({
          x: clientX - rect.left,
          y: clientY - rect.top
        });
        setShowCrosshair(gamePhase === 'falling');
      }
    };

    const handlePointerLeave = () => setShowCrosshair(false);

    // Mouse events
    document.addEventListener('mousemove', handlePointerMove);
    
    // Touch events for mobile
    document.addEventListener('touchmove', handlePointerMove, { passive: true });
    document.addEventListener('touchstart', handlePointerMove, { passive: true });
    
    if (gameAreaRef.current) {
      gameAreaRef.current.addEventListener('mouseleave', handlePointerLeave);
      gameAreaRef.current.addEventListener('touchend', handlePointerLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('touchmove', handlePointerMove);
      document.removeEventListener('touchstart', handlePointerMove);
      if (gameAreaRef.current) {
        gameAreaRef.current.removeEventListener('mouseleave', handlePointerLeave);
        gameAreaRef.current.removeEventListener('touchend', handlePointerLeave);
      }
    };
  }, [gamePhase]);

  // Handle stone click
  const handleStoneClick = useCallback((stoneId: string) => {
    if (gamePhase !== 'falling') return;

    setStones(prev => prev.map(stone => {
      if (stone.id === stoneId && !stone.destroyed && !stone.hit) {
        if (stone.isCorrect) {
          // Correct stone hit - immediate destruction with celebration
          setScore(s => s + 100 + streak * 50);
          setStreak(s => s + 1);
          setCorrectStonesHit(prev => prev + 1);
          createParticles(stone.x, stone.y, 'hsl(142, 76%, 36%)', 15); // Green particles
          playSound(800 + streak * 100, 0.2);
          return { ...stone, destroyed: true };
        } else {
          // Wrong stone hit - reveal red color and become darker/faster
          setStreak(0);
          createParticles(stone.x, stone.y, 'hsl(0, 84%, 60%)', 6); // Red particles
          playSound(200, 0.3, 'square');
          return { ...stone, hit: true, speed: stone.speed * 1.3, opacity: 0.8 };
        }
      }
      return stone;
    }));

    // Update max streak
    setMaxStreak(prev => Math.max(prev, streak + 1));
  }, [gamePhase, streak, createParticles, playSound]);

  // Game loop
  useEffect(() => {
    if (gamePhase !== 'falling') return;

    const gameLoop = () => {
      setStones(prev => {
        const updated = prev.map(stone => {
          if (stone.destroyed) return stone;
          
          const newStone = {
            ...stone,
            y: stone.y + stone.speed,
            rotation: stone.rotation + 0.5, // Slower rotation for smoother effect
            // Smooth fade-in effect
            opacity: stone.y < 0 ? Math.max(0, Math.min(1, (stone.y + 30) / 30)) : stone.opacity
          };

          // Add slight horizontal drift as stones fall
          if (stone.y > 0) {
            newStone.x += Math.sin(stone.y * 0.02) * 0.02;
          }

          return newStone;
        });

        // Check if stones hit bottom
        updated.forEach(stone => {
          if (stone.y > 100 && !stone.destroyed && !stone.hit) {
            if (!stone.isCorrect) {
              setWrongStonesMissed(prev => prev + 1);
            }
          }
        });

        return updated;
      });

      // Update particles
      setParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx * 0.016,
          y: particle.y + particle.vy * 0.016,
          vy: particle.vy + 500 * 0.016, // gravity
          life: particle.life - 1
        }))
        .filter(particle => particle.life > 0)
      );

      // Check if round is complete
      const correctStones = stones.filter(s => s.isCorrect);
      const allCorrectDestroyed = correctStones.every(s => s.destroyed);
      const someStonesFellOff = stones.some(s => s.y > 100);

      if (allCorrectDestroyed || someStonesFellOff) {
        setGamePhase('complete');
        return;
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gamePhase, stones]);

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setGamePhase('question');
      setStones([]);
      setParticles([]);
    } else {
      setGamePhase('final');
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setGamePhase('question');
    setStones([]);
    setParticles([]);
  };

  const calculateAccuracy = () => {
    const totalQuestions = currentQuestionIndex + (gamePhase === 'final' ? 0 : 1);
    const accuracy = totalQuestions > 0 ? (score / (totalQuestions * 100)) * 100 : 0;
    return Math.min(accuracy, 100);
  };

  const getPerformanceRank = () => {
    const accuracy = calculateAccuracy();
    if (accuracy >= 90) return { rank: "Logic Master", color: "text-yellow-500", icon: "👑" };
    if (accuracy >= 80) return { rank: "Truth Seeker", color: "text-purple-500", icon: "🎯" };
    if (accuracy >= 70) return { rank: "Fallacy Hunter", color: "text-blue-500", icon: "🏹" };
    if (accuracy >= 60) return { rank: "Stone Breaker", color: "text-green-500", icon: "⚡" };
    return { rank: "Apprentice", color: "text-gray-500", icon: "🔰" };
  };

  // Final results screen
  if (gamePhase === 'final') {
    const performance = getPerformanceRank();
    const accuracy = calculateAccuracy();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-bg-primary via-game-bg-secondary to-game-bg-accent text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <Card className="w-full max-w-2xl bg-black/30 backdrop-blur-xl border-game-glow/30 shadow-2xl animate-scale-in relative">
          <div className="absolute inset-0 bg-gradient-to-r from-game-particle/10 to-game-glow/10 rounded-lg animate-pulse-glow" />
          <CardContent className="p-8 text-center space-y-6 relative z-10">
            <div className="relative animate-float">
              <Trophy className="w-24 h-24 mx-auto text-game-warning mb-4 drop-shadow-2xl" />
              <div className="absolute -top-2 -right-2 text-5xl animate-pulse">{performance.icon}</div>
              <div className="absolute inset-0 bg-game-warning/20 rounded-full blur-xl scale-150 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-game-warning to-game-glow bg-clip-text text-transparent">
                Mission Complete!
              </h2>
              <p className="text-xl text-game-particle mb-6 animate-fade-in">You've transcended traditional learning</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gradient-to-br from-game-bg-secondary/50 to-game-bg-accent/50 rounded-lg p-6 border border-game-glow/20 backdrop-blur-sm">
                <div className="text-3xl font-bold text-game-warning animate-pulse">{score}</div>
                <div className="text-sm text-gray-300">Total Score</div>
              </div>
              <div className="bg-gradient-to-br from-game-bg-secondary/50 to-game-bg-accent/50 rounded-lg p-6 border border-game-particle/20 backdrop-blur-sm">
                <div className="text-3xl font-bold text-game-particle animate-pulse">{maxStreak}</div>
                <div className="text-sm text-gray-300">Max Streak</div>
              </div>
            </div>

            <div className="space-y-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Accuracy</span>
                <span className="text-game-glow font-bold">{accuracy.toFixed(1)}%</span>
              </div>
              <Progress 
                value={accuracy} 
                className="h-4 bg-black/30" 
                style={{
                  background: `linear-gradient(90deg, hsl(var(--game-success)) 0%, hsl(var(--game-warning)) 50%, hsl(var(--game-danger)) 100%)`
                }}
              />
            </div>

            <Badge className={`${performance.color} bg-gradient-to-r from-game-particle/20 to-game-glow/20 text-lg px-6 py-3 border border-current/30 backdrop-blur-sm animate-pulse-glow`}>
              {performance.rank}
            </Badge>

            <div className="flex gap-4 justify-center pt-4">
              <Button 
                onClick={resetGame} 
                variant="outline" 
                className="flex items-center gap-2 bg-black/20 border-game-glow/50 text-game-glow hover:bg-game-glow/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
              <Button 
                onClick={onExit} 
                className="bg-gradient-to-r from-game-particle to-game-glow hover:from-game-particle/80 hover:to-game-glow/80 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Question display phase
  if (gamePhase === 'question') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-bg-primary via-game-bg-secondary to-game-bg-accent text-white p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-game-glow/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <Button 
              onClick={onExit} 
              variant="ghost" 
              className="text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Game
            </Button>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Badge variant="outline" className="border-game-glow/50 text-game-glow bg-black/20 backdrop-blur-sm animate-pulse-glow">
                Question {currentQuestionIndex + 1}/{questions.length}
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
            <Card className="bg-gradient-to-br from-black/30 to-game-bg-secondary/30 backdrop-blur-xl border-game-warning/30 hover:border-game-warning/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-3 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-game-warning animate-pulse">{score}</div>
                <div className="text-xs sm:text-sm text-gray-300">Score</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-black/30 to-game-bg-accent/30 backdrop-blur-xl border-game-particle/30 hover:border-game-particle/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-3 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-game-particle animate-pulse">{streak}</div>
                <div className="text-xs sm:text-sm text-gray-300">Streak</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-black/30 to-game-bg-primary/30 backdrop-blur-xl border-game-success/30 hover:border-game-success/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-3 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-game-success animate-pulse">{maxStreak}</div>
                <div className="text-xs sm:text-sm text-gray-300">Best</div>
              </CardContent>
            </Card>
          </div>

          {/* Question */}
          <Card className="bg-gradient-to-r from-game-particle/20 to-game-glow/20 backdrop-blur-xl border-game-glow/50 mb-6 sm:mb-8 animate-scale-in shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-game-particle/5 to-game-glow/5 rounded-lg animate-shimmer" 
                 style={{backgroundSize: '200% 100%'}} />
            <CardContent className="p-4 sm:p-8 relative z-10">
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="text-xs sm:text-sm text-game-particle uppercase tracking-wider font-semibold animate-pulse">
                  ⚡ Truth Bomb Incoming ⚡
                </div>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold leading-relaxed animate-fade-in bg-gradient-to-r from-white to-game-glow bg-clip-text text-transparent px-2">
                  {currentQuestion.question}
                </h2>
                <div className="text-game-glow/80 text-sm sm:text-lg px-2">
                  Answer stones will fall from the sky. Shoot the correct ones before they hit the ground!
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <div className="text-center space-y-4 sm:space-y-6 animate-fade-in px-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-sm sm:text-lg">
              <div className="flex items-center gap-2 text-game-success bg-black/20 px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm border border-game-success/30">
                <Star className="w-4 sm:w-5 h-4 sm:h-5 animate-pulse" />
                <span className="text-xs sm:text-base">Correct stones explode into points</span>
              </div>
              <div className="flex items-center gap-2 text-game-danger bg-black/20 px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm border border-game-danger/30">
                <Zap className="w-4 sm:w-5 h-4 sm:h-5 animate-pulse" />
                <span className="text-xs sm:text-base">Wrong stones grow stronger when hit</span>
              </div>
            </div>
            
            <Button 
              onClick={initializeStones}
              className="bg-gradient-to-r from-game-particle to-game-glow hover:from-game-particle/80 hover:to-game-glow/80 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 shadow-2xl animate-pulse-glow transition-all duration-300 hover:scale-110 border border-white/20"
            >
              <Target className="w-5 sm:w-6 h-5 sm:h-6 mr-2" />
              🚀 Launch the Stones!
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Game area phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-game-bg-primary via-game-bg-secondary to-game-bg-accent text-white overflow-hidden relative">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header HUD */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-20 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <Badge variant="outline" className="border-game-glow/50 text-game-glow bg-black/30 backdrop-blur-sm animate-pulse-glow text-xs sm:text-sm">
            Q{currentQuestionIndex + 1}/{questions.length}
          </Badge>
          <div className="text-game-warning font-bold bg-black/30 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm border border-game-warning/30 text-xs sm:text-sm">
            Score: {score}
          </div>
          {streak > 0 && (
            <div className="text-game-particle font-bold animate-pulse bg-black/30 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm border border-game-particle/30 text-xs sm:text-sm">
              🔥 Streak: {streak}x
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105 self-end sm:self-auto"
        >
          {soundEnabled ? <Volume2 className="w-3 sm:w-4 h-3 sm:h-4" /> : <VolumeX className="w-3 sm:w-4 h-3 sm:h-4" />}
        </Button>
      </div>

      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="relative w-full h-screen cursor-none"
        style={{ 
          background: 'linear-gradient(135deg, hsl(var(--game-bg-primary)) 0%, hsl(var(--game-bg-secondary)) 50%, hsl(var(--game-bg-accent)) 100%)',
          overflow: 'hidden'
        }}
      >
        {/* Enhanced Crosshair */}
        {showCrosshair && (
          <div
            className="absolute pointer-events-none z-30 transition-opacity duration-150"
            style={{
              left: crosshairPos.x - 20,
              top: crosshairPos.y - 20,
              transform: 'translate(0, 0)'
            }}
          >
            <div className="relative">
              <Crosshair className="w-10 h-10 text-game-danger animate-pulse drop-shadow-2xl" />
              <div className="absolute inset-0 w-10 h-10 border-2 border-game-glow rounded-full animate-ping opacity-50" />
            </div>
          </div>
        )}

        {/* Stones */}
        {stones.map(stone => {
          // Calculate hover effect based on crosshair proximity
          const dx = (crosshairPos.x / window.innerWidth * 100) - stone.x;
          const dy = (crosshairPos.y / window.innerHeight * 100) - stone.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const isNearCrosshair = distance < 8 && showCrosshair;
          
          return (
            <div
              key={stone.id}
              className={`absolute cursor-pointer transition-all duration-300 ${
                stone.destroyed ? 'animate-scale-out' : ''
              }`}
              style={{
                left: `${stone.x}%`,
                top: `${stone.y}%`,
                transform: `rotate(${stone.rotation}deg) translate(-50%, -50%) ${isNearCrosshair ? 'scale(1.1)' : 'scale(1)'}`,
                opacity: stone.opacity,
                zIndex: 10
              }}
              onClick={() => handleStoneClick(stone.id)}
            >
              <div
                 className={`
                  relative rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 font-bold text-white text-center shadow-2xl backdrop-blur-sm
                  transform transition-all duration-300
                  ${stone.destroyed 
                    ? 'bg-gradient-to-br from-game-success/80 to-game-success border-2 border-game-success animate-pulse' 
                    : stone.hit
                    ? 'bg-gradient-to-br from-game-danger/90 to-game-danger border-2 border-game-danger animate-pulse'
                    : 'bg-gradient-to-br from-amber-700/80 to-amber-800 border-2 border-amber-600'
                  }
                `}
                style={{
                  filter: stone.destroyed 
                    ? 'drop-shadow(0 0 25px hsl(142, 76%, 36%)) drop-shadow(0 0 50px hsl(142, 76%, 36% / 0.6))'
                    : stone.hit
                    ? 'drop-shadow(0 0 25px hsl(0, 84%, 60%)) drop-shadow(0 0 50px hsl(0, 84%, 60% / 0.8))'
                    : isNearCrosshair
                    ? 'drop-shadow(0 0 20px hsl(45, 93%, 58%)) drop-shadow(0 0 40px hsl(45, 93%, 58% / 0.4))'
                    : 'drop-shadow(0 0 10px hsl(25, 75%, 35%)) drop-shadow(0 0 20px hsl(25, 75%, 35% / 0.3))',
                  boxShadow: stone.destroyed
                    ? `0 0 30px hsl(142, 76%, 36% / 0.6), inset 0 0 10px hsl(142, 76%, 36% / 0.3)`
                    : stone.hit
                    ? `0 0 40px hsl(0, 84%, 60% / 0.8), inset 0 0 15px hsl(0, 84%, 60% / 0.5)`
                    : isNearCrosshair
                    ? `0 0 25px hsl(45, 93%, 58% / 0.5), inset 0 0 10px hsl(45, 93%, 58% / 0.2)`
                    : `0 0 15px hsl(25, 75%, 35% / 0.4), inset 0 0 8px hsl(25, 75%, 35% / 0.2)`,
                  minWidth: stone.size,
                  minHeight: stone.size / 2,
                  fontSize: Math.max(stone.size / (window.innerWidth > 768 ? 6 : window.innerWidth > 640 ? 7 : 8), window.innerWidth > 768 ? 12 : window.innerWidth > 640 ? 11 : 10)
                }}
              >
                {stone.text}
                {stone.destroyed && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/50 to-emerald-500/50 rounded-lg animate-pulse" />
                )}
                {isNearCrosshair && !stone.destroyed && !stone.hit && (
                  <div className="absolute inset-0 bg-game-warning/20 rounded-lg animate-pulse" />
                )}
              </div>
            </div>
          );
        })}

        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.life / particle.maxLife,
              zIndex: 15
            }}
          />
        ))}

        {/* Question reminder */}
        <div className="absolute bottom-4 sm:bottom-8 left-2 sm:left-4 right-2 sm:right-4 z-20">
          <Card className="bg-black/40 backdrop-blur-md border-white/20">
            <CardContent className="p-3 sm:p-4">
              <div className="text-center text-white">
                <div className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">Current Question:</div>
                <div className="font-medium text-sm sm:text-base">{currentQuestion.question}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Round Complete Modal */}
      {gamePhase === 'complete' && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4">
          <Card className="w-full max-w-sm sm:max-w-md bg-gradient-to-br from-game-bg-secondary/90 to-game-bg-accent/90 backdrop-blur-xl border-game-glow/50 shadow-2xl animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-r from-game-particle/10 to-game-glow/10 rounded-lg animate-shimmer" />
            <CardContent className="p-4 sm:p-8 text-center space-y-4 sm:space-y-6 relative z-10">
              <div className="relative">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2 animate-fade-in">
                  {correctStonesHit > wrongStonesMissed ? "🎯 Nice Shot!" : "🎮 Round Complete!"}
                </div>
                <div className="text-game-glow text-base sm:text-lg animate-fade-in">
                  {correctStonesHit > wrongStonesMissed 
                    ? "Your aim is getting better!" 
                    : "Keep practicing your precision!"
                  }
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-black/30 rounded-lg p-3 sm:p-4 backdrop-blur-sm border border-game-success/30">
                  <div className="text-xl sm:text-2xl font-bold text-game-success animate-pulse">{correctStonesHit}</div>
                  <div className="text-xs sm:text-sm text-gray-300">Correct Hits</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3 sm:p-4 backdrop-blur-sm border border-game-danger/30">
                  <div className="text-xl sm:text-2xl font-bold text-game-danger animate-pulse">{wrongStonesMissed}</div>
                  <div className="text-xs sm:text-sm text-gray-300">Missed</div>
                </div>
              </div>

              {streak > 0 && (
                <div className="bg-gradient-to-r from-game-particle/20 to-game-glow/20 rounded-lg p-3 sm:p-4 border border-game-particle/50 animate-pulse-glow">
                  <div className="text-lg sm:text-xl font-bold text-game-particle">🔥 Streak: {streak}x</div>
                  <div className="text-xs sm:text-sm text-gray-300">You're on fire!</div>
                </div>
              )}

              <div className="bg-black/20 rounded-lg p-3 sm:p-4 backdrop-blur-sm border border-white/20">
                <div className="text-xs sm:text-sm text-gray-300 mb-2">💡 Explanation:</div>
                <div className="text-white font-medium text-xs sm:text-sm leading-relaxed">{currentQuestion.explanation}</div>
              </div>

              <Button 
                onClick={nextQuestion}
                className="w-full bg-gradient-to-r from-game-particle to-game-glow hover:from-game-particle/80 hover:to-game-glow/80 text-sm sm:text-lg py-2 sm:py-3 shadow-2xl animate-pulse-glow transition-all duration-300 hover:scale-105"
              >
                {currentQuestionIndex < questions.length - 1 ? '🚀 Next Challenge' : '🏆 View Final Results'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StoneBreakerGame;