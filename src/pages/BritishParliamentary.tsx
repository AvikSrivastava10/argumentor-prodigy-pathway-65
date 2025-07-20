import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Clock, 
  Target,
  Crown,
  MessageSquare,
  BookOpen,
  Video,
  Users,
  Trophy,
  Info,
  RefreshCw,
  Zap,
  Star,
  Volume2,
  VolumeX,
  Maximize,
  Pause,
  RotateCcw,
  Lightbulb,
  Award,
  TrendingUp,
  BookmarkPlus,
  Sparkles,
  Timer,
  ArrowRight,
  HelpCircle,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

const BritishParliamentary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [currentMotion, setCurrentMotion] = useState("This House Would ban social media for under 16s");
  const [videoState, setVideoState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 720, // 12 minutes
    isMuted: false,
    showCaptions: true,
    isFullscreen: false
  });
  const [aiMessages, setAiMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [showXpAnimation, setShowXpAnimation] = useState(false);

  const moduleData = {
    title: "British Parliamentary Format",
    description: "Master the world's most prestigious debate format used in international competitions",
    totalSections: 7,
    estimatedTime: "90 minutes",
    difficulty: "Intermediate",
    xpReward: 250,
    sections: [
      {
        title: "Introduction to BP Format",
        type: "video",
        content: "Comprehensive overview of the British Parliamentary debate format",
        duration: "12 min",
        xp: 30
      },
      {
        title: "The Four Teams Structure",
        type: "theory",
        content: "Understanding Opening Government, Opening Opposition, Closing Government, and Closing Opposition",
        duration: "15 min",
        xp: 40
      },
      {
        title: "Speaker Roles & Time Allocations",
        type: "theory",
        content: "Detailed breakdown of each speaker's responsibilities and timing",
        duration: "18 min",
        xp: 45
      },
      {
        title: "Points of Information (POIs)",
        type: "interactive",
        content: "Master the art of giving and taking POIs effectively",
        duration: "12 min",
        xp: 35
      },
      {
        title: "Judging Criteria & Whip Speeches",
        type: "theory",
        content: "Understanding how BP debates are judged and the importance of whip speeches",
        duration: "15 min",
        xp: 40
      },
      {
        title: "BP Knowledge Quiz",
        type: "quiz",
        content: "Test your understanding of the British Parliamentary format",
        duration: "10 min",
        xp: 50
      },
      {
        title: "AI Practice Session",
        type: "ai-chat",
        content: "Practice BP-specific skills with our AI debate coach",
        duration: "8 min",
        xp: 30
      }
    ]
  };

  const bpMotions = [
    "This House Would ban social media for under 16s",
    "This House Believes that universities should prioritize STEM subjects over humanities",
    "This House Would implement a four-day working week",
    "This House Believes that wealthy nations should open their borders to climate refugees",
    "This House Would ban private schools",
    "This House Would legalize all drugs",
    "This House Believes that artificial intelligence poses a greater threat than benefit to humanity",
    "This House Would abolish the death penalty worldwide",
    "This House Would require companies to have a maximum wage ratio",
    "This House Believes that developed nations should accept unlimited climate refugees"
  ];

  const quizQuestions = [
    {
      question: "How many teams participate in a British Parliamentary debate?",
      options: ["2", "3", "4", "6"],
      correct: 2,
      explanation: "BP debates feature 4 teams: Opening Government, Opening Opposition, Closing Government, and Closing Opposition.",
      type: "basic"
    },
    {
      question: "What is the standard speaking time for each speaker in BP?",
      options: ["5 minutes", "7 minutes", "8 minutes", "10 minutes"],
      correct: 1,
      explanation: "Each speaker in BP gets 7 minutes to present their case.",
      type: "basic"
    },
    {
      question: "During which part of a speech can Points of Information be offered?",
      options: ["Anytime during the speech", "Only in the first minute", "Between minutes 1-6", "Only in the last minute"],
      correct: 2,
      explanation: "POIs can only be offered between the 1st and 6th minutes of each speech.",
      type: "basic"
    },
    {
      question: "Which teams have the burden of proof in BP?",
      options: ["Only Opening Government", "Both Government teams", "All four teams equally", "Opening Government and Closing Opposition"],
      correct: 1,
      explanation: "Both Government teams (Opening and Closing) share the burden of proving the motion.",
      type: "basic"
    },
    {
      question: "What is the primary role of the Closing Opposition Whip?",
      options: ["Introduce new arguments", "Summarize and rebut", "Ask the most POIs", "Define the motion"],
      correct: 1,
      explanation: "The Closing Opposition Whip should summarize their side's case and provide strong rebuttals to Government arguments.",
      type: "basic"
    },
    {
      question: "SCENARIO: You are the Opening Government Prime Minister. The motion is 'This House Would ban social media for under 16s.' Your partner wants to define this as a complete ban on all online platforms. What should you do?",
      options: [
        "Agree with your partner to show unity",
        "Propose a more reasonable definition focusing on major social media platforms",
        "Let the Opposition define it instead",
        "Argue for the broadest possible interpretation"
      ],
      correct: 1,
      explanation: "As PM, you should set a reasonable, defensible definition. A complete ban on 'all online platforms' would be too broad and harder to defend, including educational platforms, etc.",
      type: "scenario"
    },
    {
      question: "SCENARIO: You are Closing Government. Opening Government defined the motion narrowly, and Opening Opposition accepted it. You disagree with OG's narrow interpretation. What should you do?",
      options: [
        "Completely redefine the motion to be broader",
        "Work within OG's definition while extending with new arguments",
        "Ignore the definition and argue your own interpretation",
        "Criticize OG's definition publicly"
      ],
      correct: 1,
      explanation: "As CG, you must work within the framework set by OG. You can extend the case with new arguments but shouldn't contradict your side partner's definition.",
      type: "scenario"
    },
    {
      question: "SCENARIO: You are taking a POI and the opponent asks: 'If your policy helps the poor, why do statistics show poverty increased in countries that tried it?' How should you respond?",
      options: [
        "Dismiss the statistics as unreliable",
        "Acknowledge but explain contextual factors or implementation issues",
        "Ignore the question and continue your speech",
        "Ask them to provide the source"
      ],
      correct: 1,
      explanation: "The best response acknowledges the challenge but provides context - perhaps the poverty increase had other causes, or implementation was flawed. This shows intellectual honesty while defending your case.",
      type: "scenario"
    }
  ];

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'theory': return BookOpen;
      case 'interactive': return Target;
      case 'quiz': return Target;
      case 'ai-chat': return MessageSquare;
      default: return Play;
    }
  };

  const toggleVideo = () => {
    setVideoState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const toggleMute = () => {
    setVideoState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const toggleCaptions = () => {
    setVideoState(prev => ({ ...prev, showCaptions: !prev.showCaptions }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAiMessage = (message: string) => {
    setAiMessages(prev => [...prev, { role: 'user', content: message }]);
    
    // Simulate AI response (in real app, this would be an API call)
    setTimeout(() => {
      let response = "I'd be happy to help you with that BP question!";
      
      if (message.toLowerCase().includes('opening government') || message.toLowerCase().includes('prime minister')) {
        response = "As Opening Government Prime Minister, your key responsibilities are: 1) Define the motion clearly and reasonably, 2) Present the strongest arguments for your side, 3) Establish the framework for the debate, and 4) Set up your Deputy PM for success. Remember, your definition should be neither too narrow nor too broad - it should be the most reasonable interpretation that gives your side the best chance to win.";
      } else if (message.toLowerCase().includes('poi') || message.toLowerCase().includes('point of information')) {
        response = "Points of Information are crucial in BP! Here are key strategies: 1) Offer POIs during minutes 1-6 of each speech, 2) Target key arguments or contradictions, 3) Keep them short and sharp, 4) As a speaker, take 1-2 POIs per speech to show engagement, 5) Use POIs to disrupt opponent's flow at strategic moments. Remember: quality over quantity!";
      } else if (message.toLowerCase().includes('whip')) {
        response = "Whip speeches are about summary and comparison, not new arguments! Your job is to: 1) Summarize your side's case clearly, 2) Explain why your side won the major clashes, 3) Provide comparative analysis showing why your arguments are stronger, 4) Rebut the opponent's key points, 5) Give judges a clear reason to rank your side higher. Think of it as the 'closing argument' in a court case.";
      } else if (message.toLowerCase().includes('closing')) {
        response = "Closing teams face unique challenges! You need to: 1) Acknowledge what opening teams established, 2) Extend the case with genuinely new arguments (not just examples), 3) Show how your extension changes the debate, 4) Maintain consistency with your side partner, 5) Prove you've added value beyond what opening teams did. Your extension should matter - it should give your side a new way to win.";
      }
      
      setAiMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1500);
    
    setAiInput('');
  };

  const triggerXpAnimation = () => {
    setShowXpAnimation(true);
    setTimeout(() => setShowXpAnimation(false), 2000);
  };

  const handleSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      const newCompleted = [...completedSections, sectionIndex];
      setCompletedSections(newCompleted);
      
      // Show XP gain toast
      const xpGained = moduleData.sections[sectionIndex].xp;
      toast({
        title: "Section Completed! 🎉",
        description: `You earned ${xpGained} XP!`,
        duration: 3000,
      });
    }
    
    if (sectionIndex < moduleData.sections.length - 1) {
      setCurrentSection(sectionIndex + 1);
    } else {
      // Module completed
      toast({
        title: "Module Completed! 🏆",
        description: `You earned a total of ${moduleData.xpReward} XP!`,
        duration: 5000,
      });
    }
  };

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
    const score = Object.values(quizAnswers).filter((answer, index) => 
      answer === quizQuestions[index].correct
    ).length;
    
    toast({
      title: score === quizQuestions.length ? "Perfect Score! 🎯" : "Quiz Completed!",
      description: `You got ${score}/${quizQuestions.length} questions correct.`,
      duration: 3000,
    });
  };

  const generateNewMotion = () => {
    const randomMotion = bpMotions[Math.floor(Math.random() * bpMotions.length)];
    setCurrentMotion(randomMotion);
    toast({
      title: "New Motion Generated! 🎲",
      description: "Practice with this fresh debate topic.",
      duration: 2000,
    });
  };

  const progress = (completedSections.length / moduleData.totalSections) * 100;
  const totalXpEarned = completedSections.reduce((total, sectionIndex) => 
    total + moduleData.sections[sectionIndex].xp, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/learn')}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Learning
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Section Navigation */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm sticky top-24 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">{moduleData.title}</CardTitle>
                </div>
                <CardDescription>{moduleData.description}</CardDescription>
                <div className="flex gap-2 mt-3">
                  <Badge variant="secondary">{moduleData.difficulty}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {moduleData.estimatedTime}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{totalXpEarned}/{moduleData.xpReward} XP</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  {moduleData.sections.map((section, index) => {
                    const SectionIcon = getSectionIcon(section.type);
                    const isCompleted = completedSections.includes(index);
                    const isCurrent = index === currentSection;
                    
                    return (
                      <div
                        key={index}
                        onClick={() => setCurrentSection(index)}
                        className={`p-3 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                          isCurrent 
                            ? 'bg-blue-100 border-2 border-blue-300 shadow-md' 
                            : isCompleted
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-muted border border-border hover:bg-muted/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isCompleted 
                              ? 'bg-green-500 text-white' 
                              : isCurrent
                              ? 'bg-blue-500 text-white'
                              : 'bg-muted-foreground/20 text-muted-foreground'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <SectionIcon className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">
                              {section.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{section.duration}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                {section.xp} XP
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {React.createElement(getSectionIcon(moduleData.sections[currentSection].type), {
                        className: "w-6 h-6 text-blue-600"
                      })}
                      {moduleData.sections[currentSection].title}
                    </CardTitle>
                    <CardDescription>
                      Section {currentSection + 1} of {moduleData.totalSections} • {moduleData.sections[currentSection].duration}
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    {moduleData.sections[currentSection].type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="practice">Practice Arena</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="animate-fade-in">
                    {/* Video Section */}
                    {moduleData.sections[currentSection].type === 'video' && (
                      <div className="space-y-6">
                        <div className="aspect-video bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl overflow-hidden shadow-lg relative group">
                          {/* Video Player */}
                          <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <div className="text-center text-white">
                                <div className="mb-4">
                                  <Button
                                    onClick={toggleVideo}
                                    className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50"
                                  >
                                    {videoState.isPlaying ? (
                                      <Pause className="w-8 h-8 text-white" />
                                    ) : (
                                      <Play className="w-8 h-8 text-white ml-1" />
                                    )}
                                  </Button>
                                </div>
                                <p className="text-xl font-semibold mb-2">Introduction to British Parliamentary Format</p>
                                <p className="text-sm opacity-80">Comprehensive overview • 12 minutes</p>
                              </div>
                            </div>
                            
                            {/* Video Controls */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex items-center gap-4">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={toggleVideo}
                                  className="text-white hover:bg-white/20"
                                >
                                  {videoState.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                </Button>
                                
                                <div className="flex-1 flex items-center gap-2">
                                  <span className="text-xs text-white">{formatTime(videoState.currentTime)}</span>
                                  <Progress value={(videoState.currentTime / videoState.duration) * 100} className="flex-1 h-1" />
                                  <span className="text-xs text-white">{formatTime(videoState.duration)}</span>
                                </div>
                                
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={toggleMute}
                                  className="text-white hover:bg-white/20"
                                >
                                  {videoState.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                </Button>
                                
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={toggleCaptions}
                                  className={`text-white hover:bg-white/20 ${videoState.showCaptions ? 'bg-white/20' : ''}`}
                                >
                                  CC
                                </Button>
                                
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-white hover:bg-white/20"
                                >
                                  <Maximize className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Video Description */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
                          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-blue-600" />
                            What You'll Learn
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">The four-team structure and how it creates dynamic competition</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">How BP differs from traditional two-team debate formats</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">The role of each team in the parliamentary chamber</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">Basic judging criteria and team ranking system</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">The concept of 'case construction' vs 'case extension'</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">How points of information create interactive debate</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">The importance of whip speeches in BP format</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">Strategic considerations for team positioning</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Video Notes */}
                        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                          <div className="flex items-start gap-3">
                            <BookmarkPlus className="w-5 h-5 text-amber-600 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-amber-800 mb-1">Key Takeaway</h4>
                              <p className="text-amber-700 text-sm">
                                BP is unique because you're not just competing against the other side - you're also competing with your side partner 
                                for the best ranking. This creates a fascinating dynamic where cooperation and competition coexist.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Theory Sections */}
                    {moduleData.sections[currentSection].type === 'theory' && (
                      <div className="space-y-6">
                        {currentSection === 1 && (
                          <div className="prose max-w-none">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-6">
                              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Users className="w-6 h-6 text-blue-600" />
                                The Four Teams Structure
                              </h3>
                              <p className="text-muted-foreground">
                                BP is unique among debate formats because it features four teams instead of two, creating dynamic competition and cooperation.
                              </p>
                            </div>
                            
                            {/* Visual Diagram */}
                            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm mb-6">
                              <h4 className="font-semibold mb-4 text-center">BP Chamber Layout</h4>
                              <div className="relative">
                                <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                                  <div className="space-y-4">
                                    <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
                                      <div className="font-semibold text-green-800">Opening Government</div>
                                      <div className="text-sm text-green-600 mt-1">Sets the case</div>
                                    </div>
                                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                                      <div className="font-semibold text-green-700">Closing Government</div>
                                      <div className="text-sm text-green-600 mt-1">Extends the case</div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div className="bg-red-100 border-2 border-red-300 rounded-lg p-4 text-center">
                                      <div className="font-semibold text-red-800">Opening Opposition</div>
                                      <div className="text-sm text-red-600 mt-1">Challenges the case</div>
                                    </div>
                                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                                      <div className="font-semibold text-red-700">Closing Opposition</div>
                                      <div className="text-sm text-red-600 mt-1">Extends opposition</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-muted rounded-full flex items-center justify-center font-semibold text-muted-foreground">
                                  VS
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <Card className="bg-green-50 border-green-200 rounded-2xl">
                                <CardHeader>
                                  <CardTitle className="text-green-800 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    Government Side
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-lg border border-green-100">
                                      <h4 className="font-semibold text-green-700 mb-2">Opening Government (OG)</h4>
                                      <ul className="text-sm text-green-600 space-y-1">
                                        <li>• Defines the motion clearly and reasonably</li>
                                        <li>• Presents the main case for the proposition</li>
                                        <li>• Establishes the framework for the debate</li>
                                        <li>• Sets up their side partner for success</li>
                                      </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-green-100">
                                      <h4 className="font-semibold text-green-700 mb-2">Closing Government (CG)</h4>
                                      <ul className="text-sm text-green-600 space-y-1">
                                        <li>• Extends the case with genuinely new arguments</li>
                                        <li>• Shows how their extension matters</li>
                                        <li>• Maintains consistency with OG's framework</li>
                                        <li>• Proves they've added value to the debate</li>
                                      </ul>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              <Card className="bg-red-50 border-red-200 rounded-2xl">
                                <CardHeader>
                                  <CardTitle className="text-red-800 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    Opposition Side
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-lg border border-red-100">
                                      <h4 className="font-semibold text-red-700 mb-2">Opening Opposition (OO)</h4>
                                      <ul className="text-sm text-red-600 space-y-1">
                                        <li>• Challenges the definition if unreasonable</li>
                                        <li>• Presents the main case against the motion</li>
                                        <li>• Establishes the opposition framework</li>
                                        <li>• Provides strong rebuttals to OG</li>
                                      </ul>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-red-100">
                                      <h4 className="font-semibold text-red-700 mb-2">Closing Opposition (CO)</h4>
                                      <ul className="text-sm text-red-600 space-y-1">
                                        <li>• Extends opposition with new arguments</li>
                                        <li>• Shows how their extension changes the debate</li>
                                        <li>• Maintains consistency with OO's framework</li>
                                        <li>• Demonstrates added value beyond OO</li>
                                      </ul>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                            
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200 mt-6">
                              <div className="flex items-start gap-3">
                                <Trophy className="w-5 h-5 text-yellow-600 mt-0.5" />
                                <div>
                                  <h4 className="font-semibold text-yellow-800 mb-2">The Ranking System</h4>
                                  <p className="text-yellow-700 text-sm mb-3">
                                    Teams are ranked 1st, 2nd, 3rd, and 4th based on their contribution to the debate. This creates a unique dynamic:
                                  </p>
                                  <div className="grid md:grid-cols-2 gap-3">
                                    <div className="bg-white p-3 rounded-lg border border-yellow-100">
                                      <div className="font-medium text-yellow-800">Cooperation</div>
                                      <div className="text-sm text-yellow-700">Work with your side partner to win the debate</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border border-yellow-100">
                                      <div className="font-medium text-yellow-800">Competition</div>
                                      <div className="text-sm text-yellow-700">Outperform your side partner to rank higher</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {currentSection === 2 && (
                          <div className="prose max-w-none">
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-6">
                              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Clock className="w-6 h-6 text-purple-600" />
                                Speaker Roles & Time Allocations
                              </h3>
                            </div>
                            
                            <div className="space-y-4">
                              {[
                                { role: "Prime Minister", team: "OG", time: "7 min", duties: "Define motion, present main government case, establish framework" },
                                { role: "Leader of Opposition", team: "OO", time: "7 min", duties: "Challenge definition, present main opposition case, establish counter-framework" },
                                { role: "Deputy Prime Minister", team: "OG", time: "7 min", duties: "Rebuild government case, respond to opposition attacks, strengthen arguments" },
                                { role: "Deputy Leader of Opposition", team: "OO", time: "7 min", duties: "Rebuild opposition case, respond to government responses, strengthen rebuttals" },
                                { role: "Member of Government", team: "CG", time: "7 min", duties: "Extend government case with new material, maintain consistency with OG" },
                                { role: "Member of Opposition", team: "CO", time: "7 min", duties: "Extend opposition case with new material, maintain consistency with OO" },
                                { role: "Government Whip", team: "CG", time: "7 min", duties: "Summarize entire government case, provide final rebuttals, no new arguments" },
                                { role: "Opposition Whip", team: "CO", time: "7 min", duties: "Summarize entire opposition case, provide final rebuttals, no new arguments" }
                              ].map((speaker, index) => (
                                <Card key={index} className={`rounded-2xl ${speaker.team.includes('G') ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                  <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className={`font-semibold ${speaker.team.includes('G') ? 'text-green-800' : 'text-red-800'}`}>
                                        {speaker.role} ({speaker.team})
                                      </h4>
                                      <Badge variant="outline">{speaker.time}</Badge>
                                    </div>
                                    <p className={`text-sm ${speaker.team.includes('G') ? 'text-green-700' : 'text-red-700'}`}>
                                      {speaker.duties}
                                    </p>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {currentSection === 4 && (
                          <div className="prose max-w-none">
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl mb-6">
                              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Trophy className="w-6 h-6 text-amber-600" />
                                Judging Criteria & Whip Speeches
                              </h3>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <Card className="bg-blue-50 border-blue-200 rounded-2xl">
                                <CardHeader>
                                  <CardTitle className="text-blue-800">Judging Criteria</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    <div>
                                      <h4 className="font-semibold text-blue-700">Content (40%)</h4>
                                      <p className="text-sm text-blue-600">Quality of arguments, evidence, and analysis</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-blue-700">Strategy (30%)</h4>
                                      <p className="text-sm text-blue-600">Team coordination, case structure, tactical choices</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-blue-700">Style (30%)</h4>
                                      <p className="text-sm text-blue-600">Delivery, language, persuasiveness</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              <Card className="bg-purple-50 border-purple-200 rounded-2xl">
                                <CardHeader>
                                  <CardTitle className="text-purple-800">Whip Speech Rules</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                      <span className="text-sm">Summarize your side's case</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                      <span className="text-sm">Provide comparative analysis</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                      <span className="text-sm">Rebut opposing arguments</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <span className="w-4 h-4 text-red-500 mt-0.5">✗</span>
                                      <span className="text-sm">No new constructive material</span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Interactive POI Section */}
                    {moduleData.sections[currentSection].type === 'interactive' && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl">
                          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-indigo-600" />
                            Points of Information (POIs)
                          </h3>
                          <p className="text-muted-foreground">
                            Master the art of giving and taking POIs to maximize your team's impact in the debate.
                          </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card className="bg-emerald-50 border-emerald-200 rounded-2xl">
                            <CardHeader>
                              <CardTitle className="text-emerald-800">Giving POIs</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="p-3 bg-white rounded-lg border border-emerald-100">
                                  <h4 className="font-semibold text-emerald-700 mb-1">Timing</h4>
                                  <p className="text-sm text-emerald-600">Offer POIs between minutes 1-6 of each speech</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-emerald-100">
                                  <h4 className="font-semibold text-emerald-700 mb-1">Strategy</h4>
                                  <p className="text-sm text-emerald-600">Target key arguments, expose contradictions, clarify positions</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-emerald-100">
                                  <h4 className="font-semibold text-emerald-700 mb-1">Etiquette</h4>
                                  <p className="text-sm text-emerald-600">Stand, say "Point of Information," wait for acceptance</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-blue-50 border-blue-200 rounded-2xl">
                            <CardHeader>
                              <CardTitle className="text-blue-800">Taking POIs</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="p-3 bg-white rounded-lg border border-blue-100">
                                  <h4 className="font-semibold text-blue-700 mb-1">Balance</h4>
                                  <p className="text-sm text-blue-600">Take 1-2 POIs per speech, not too many or too few</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-blue-100">
                                  <h4 className="font-semibold text-blue-700 mb-1">Timing</h4>
                                  <p className="text-sm text-blue-600">Choose strategic moments, avoid mid-argument</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-blue-100">
                                  <h4 className="font-semibold text-blue-700 mb-1">Response</h4>
                                  <p className="text-sm text-blue-600">Answer confidently and briefly, then continue your case</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                          <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-amber-800 mb-1">Pro Tip</h4>
                              <p className="text-amber-700 text-sm">
                                POIs are a chance to show engagement and quick thinking. Use them strategically to weaken opponents' 
                                arguments or clarify your own position, but don't let them derail your speech structure.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Quiz Section */}
                    {moduleData.sections[currentSection].type === 'quiz' && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-purple-600" />
                            BP Knowledge Quiz
                          </h3>
                          <p className="text-muted-foreground">
                            Test your understanding of the British Parliamentary format with these questions.
                          </p>
                        </div>
                        
                        <div className="space-y-6">
                          {quizQuestions.map((question, qIndex) => (
                            <Card key={qIndex} className="rounded-2xl">
                              <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                  <Badge variant={question.type === 'scenario' ? 'default' : 'secondary'}>
                                    {question.type === 'scenario' ? 'Scenario' : 'Knowledge'}
                                  </Badge>
                                  <h4 className="font-semibold">
                                    {qIndex + 1}. {question.question}
                                  </h4>
                                </div>
                                <div className="space-y-2">
                                  {question.options.map((option, oIndex) => (
                                    <label 
                                      key={oIndex}
                                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                                        showQuizResults
                                          ? oIndex === question.correct
                                            ? 'bg-green-100 border-green-300 border-2'
                                            : quizAnswers[qIndex] === oIndex && oIndex !== question.correct
                                            ? 'bg-red-100 border-red-300 border-2'
                                            : 'bg-muted'
                                          : quizAnswers[qIndex] === oIndex
                                          ? 'bg-blue-100 border-blue-300 border-2'
                                          : 'bg-muted hover:bg-muted/80 border border-border'
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name={`question-${qIndex}`}
                                        value={oIndex}
                                        checked={quizAnswers[qIndex] === oIndex}
                                        onChange={() => setQuizAnswers({...quizAnswers, [qIndex]: oIndex})}
                                        disabled={showQuizResults}
                                        className="sr-only"
                                      />
                                      <div className={`w-4 h-4 rounded-full border-2 ${
                                        quizAnswers[qIndex] === oIndex ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                      }`} />
                                      <span className="flex-1">{option}</span>
                                      {showQuizResults && oIndex === question.correct && (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                      )}
                                    </label>
                                  ))}
                                </div>
                                {showQuizResults && (
                                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <h5 className="font-semibold text-blue-800 mb-2">Explanation:</h5>
                                    <p className="text-blue-700 text-sm">{question.explanation}</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        
                        {!showQuizResults && (
                          <div className="flex justify-center">
                            <Button 
                              onClick={handleQuizSubmit}
                              disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            >
                              Submit Quiz
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* AI Chat Section */}
                    {moduleData.sections[currentSection].type === 'ai-chat' && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl">
                          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-indigo-600" />
                            Practice with Grandmaster
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Use the floating Grandmaster assistant (bottom-right corner) to get expert coaching on BP-specific scenarios, speaker roles, POI strategies, and argument feedback.
                          </p>
                          <div className="bg-white p-6 rounded-xl border border-border min-h-40 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-grandmaster-bg rounded-full flex items-center justify-center mb-4">
                              <Crown className="w-8 h-8 text-grandmaster-accent" />
                            </div>
                            <h4 className="font-semibold text-grandmaster-bg mb-2">ARGUMENTOR'S Grandmaster Available</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Click the floating crown icon in the bottom-right corner to chat with your elite BP coach!
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg max-w-md">
                              <h5 className="font-semibold text-sm mb-2">Ask about:</h5>
                              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                                <li>• Opening government speech structures</li>
                                <li>• POI timing and effectiveness</li>
                                <li>• Whip speech strategy</li>
                                <li>• Closing opposition extensions</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="practice" className="animate-fade-in">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-2xl">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <Target className="w-6 h-6 text-amber-600" />
                          BP Practice Arena
                        </h3>
                        <p className="text-muted-foreground">
                          Generate practice motions and scenarios to test your BP skills.
                        </p>
                      </div>
                      
                      <Card className="rounded-2xl">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>Current Motion</CardTitle>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={generateNewMotion}
                              className="flex items-center gap-2"
                            >
                              <RefreshCw className="w-4 h-4" />
                              New Motion
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                            <p className="text-lg font-semibold text-blue-900 text-center">
                              "{currentMotion}"
                            </p>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 mt-6">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-green-800">Government Side</h4>
                              <div className="space-y-2 text-sm">
                                <div className="bg-green-50 p-3 rounded-lg">
                                  <span className="font-medium">Opening Gov:</span> Define and establish main case
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                  <span className="font-medium">Closing Gov:</span> Extend with new arguments
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h4 className="font-semibold text-red-800">Opposition Side</h4>
                              <div className="space-y-2 text-sm">
                                <div className="bg-red-50 p-3 rounded-lg">
                                  <span className="font-medium">Opening Opp:</span> Challenge and counter-case
                                </div>
                                <div className="bg-red-50 p-3 rounded-lg">
                                  <span className="font-medium">Closing Opp:</span> Extend opposition arguments
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <Users className="w-6 h-6" />
                          <span>Practice with AI</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <MessageSquare className="w-6 h-6" />
                          <span>POI Simulator</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <Trophy className="w-6 h-6" />
                          <span>Enter Arena</span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                </Tabs>
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>+{moduleData.sections[currentSection].xp} XP</span>
                  </div>
                  
                  <Button
                    onClick={() => handleSectionComplete(currentSection)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2"
                  >
                    {currentSection === moduleData.sections.length - 1 ? (
                      <>
                        <Trophy className="w-4 h-4" />
                        Complete Module
                      </>
                    ) : (
                      <>
                        Next Section
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Module Summary */}
            {currentSection === moduleData.sections.length - 1 && (
              <Card className="mt-6 border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Module Summary</h3>
                    <p className="text-muted-foreground mb-4">
                      Congratulations! You've mastered the British Parliamentary debate format.
                    </p>
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <Badge className="bg-green-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        {moduleData.xpReward} XP Earned
                      </Badge>
                      <Badge variant="outline">BP Format Certified</Badge>
                    </div>
                    <Button 
                      onClick={() => navigate('/debate-arena')}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      Practice in Arena (BP Format)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BritishParliamentary;