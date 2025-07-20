import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Clock, 
  Target,
  Brain,
  MessageSquare,
  BookOpen,
  Video,
  Search,
  AlertTriangle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ArgumentBuilder from '@/components/ArgumentBuilder';
import QuizComponent from '@/components/QuizComponent';

const FallacyDetection = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const moduleData = {
    title: "Fallacy Detection",
    description: "Identify and dismantle logical fallacies with confidence",
    totalSections: 8,
    estimatedTime: "40 minutes",
    difficulty: "Advanced",
    sections: [
      {
        title: "Introduction to Logical Fallacies",
        type: "video",
        content: "Understanding what fallacies are and why they matter in debate",
        duration: "8 min"
      },
      {
        title: "Common Informal Fallacies",
        type: "reading",
        content: "Learn to identify the most frequent logical errors",
        duration: "10 min"
      },
      {
        title: "Ad Hominem and Personal Attacks",
        type: "interactive",
        content: "Practice spotting attacks on the person vs. the argument",
        duration: "6 min"
      },
      {
        title: "Straw Man Fallacy",
        type: "interactive",
        content: "Identify when arguments are misrepresented",
        duration: "5 min"
      },
      {
        title: "False Dichotomy and Slippery Slope",
        type: "reading",
        content: "Recognize oversimplified choices and extreme predictions",
        duration: "8 min"
      },
      {
        title: "Appeal Fallacies",
        type: "video",
        content: "Understanding appeals to authority, emotion, and tradition",
        duration: "7 min"
      },
      {
        title: "Fallacy Hunter Challenge",
        type: "quiz",
        content: "Test your ability to spot fallacies in real arguments",
        duration: "15 min"
      },
      {
        title: "Constructive Fallacy Calling",
        type: "ai-chat",
        content: "Learn to point out fallacies respectfully and effectively",
        duration: "5 min"
      }
    ]
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'youtube': return Video;
      case 'interactive': return Target;
      case 'reading': return BookOpen;
      case 'quiz': return Brain;
      case 'ai-chat': return MessageSquare;
      default: return Play;
    }
  };

  const handleSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex]);
    }
    if (sectionIndex < moduleData.sections.length - 1) {
      setCurrentSection(sectionIndex + 1);
    }
  };

  const progress = (completedSections.length / moduleData.totalSections) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Section Navigation */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-600" />
                  {moduleData.title}
                </CardTitle>
                <CardDescription>{moduleData.description}</CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge variant="destructive">{moduleData.difficulty}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {moduleData.estimatedTime}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
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
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                          isCurrent 
                            ? 'bg-purple-100 border-2 border-purple-300' 
                            : isCompleted
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isCompleted 
                              ? 'bg-green-500 text-white' 
                              : isCurrent
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <SectionIcon className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {section.title}
                            </h4>
                            <p className="text-xs text-gray-500">{section.duration}</p>
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
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {React.createElement(getSectionIcon(moduleData.sections[currentSection].type), {
                        className: "w-6 h-6 text-purple-600"
                      })}
                      {moduleData.sections[currentSection].title}
                    </CardTitle>
                    <CardDescription>
                      Section {currentSection + 1} of {moduleData.totalSections} • {moduleData.sections[currentSection].duration}
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    {moduleData.sections[currentSection].type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content">
                    {/* Content based on section type */}
                    {moduleData.sections[currentSection].type === 'video' && (
                      <div className="space-y-6">
                        <div className="aspect-video bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg flex items-center justify-center">
                          <div className="text-center text-white">
                            <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                            <p className="text-lg">Video: {moduleData.sections[currentSection].title}</p>
                            <p className="text-sm opacity-80">Click to play</p>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2">Logical Fallacy Fundamentals</h3>
                          <p className="text-gray-700 text-sm">{moduleData.sections[currentSection].content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <span className="text-sm text-purple-600 font-medium">{moduleData.sections[currentSection].duration}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {moduleData.sections[currentSection].type === 'reading' && (
                      <div className="prose max-w-none">
                        <h3>Common Logical Fallacies in Debate</h3>
                        <p>Understanding and identifying logical fallacies is crucial for effective debate participation. Here are the most common fallacies you'll encounter:</p>
                        
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            <h4 className="font-semibold text-yellow-800">Ad Hominem</h4>
                          </div>
                          <p className="text-yellow-700">Attacking the person making the argument rather than the argument itself.</p>
                          <p className="text-sm text-yellow-600 italic">Example: "You can't trust John's economic policy because he failed math in high school."</p>
                        </div>
                        
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                            <h4 className="font-semibold text-red-800">Straw Man</h4>
                          </div>
                          <p className="text-red-700">Misrepresenting someone's argument to make it easier to attack.</p>
                          <p className="text-sm text-red-600 italic">Example: Person A: "We should have safety regulations for cars." Person B: "Why do you want to ban all cars?"</p>
                        </div>
                        
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-blue-600" />
                            <h4 className="font-semibold text-blue-800">False Dichotomy</h4>
                          </div>
                          <p className="text-blue-700">Presenting only two options when more exist.</p>
                          <p className="text-sm text-blue-600 italic">Example: "Either you're with us or against us."</p>
                        </div>
                      </div>
                    )}
                    
                    {moduleData.sections[currentSection].type === 'interactive' && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">Interactive Exercise: Fallacy Detection</h3>
                          <p className="text-gray-700 mb-4">
                            Practice identifying fallacies in real debate scenarios:
                          </p>
                          <ArgumentBuilder />
                        </div>
                      </div>
                    )}
                    
                    {moduleData.sections[currentSection].type === 'quiz' && (
                      <QuizComponent />
                    )}
                    
                    {moduleData.sections[currentSection].type === 'ai-chat' && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-purple-600" />
                            Practice with Grandmaster
                          </h3>
                          <p className="text-gray-700 mb-4">
                            Use the floating Grandmaster assistant to practice constructive fallacy calling and learn how to point out logical errors respectfully!
                          </p>
                          <div className="bg-white p-4 rounded-lg border min-h-32 flex items-center justify-center">
                            <p className="text-gray-500 italic">Click the floating crown icon to chat with the Grandmaster →</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="notes">
                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Your Notes</h3>
                      <textarea 
                        className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none"
                        placeholder="Take notes about this section..."
                      />
                    </div>
                  </TabsContent>
                  
                </Tabs>
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                    className="flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={() => handleSectionComplete(currentSection)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-all"
                  >
                    {currentSection === moduleData.sections.length - 1 ? 'Complete Module' : 'Next Section'}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FallacyDetection;