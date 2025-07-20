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
  Sword
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ArgumentBuilder from '@/components/ArgumentBuilder';
import QuizComponent from '@/components/QuizComponent';

const AdvancedRebuttals = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const moduleData = {
    title: "Advanced Rebuttals",
    description: "Craft powerful responses to opponent arguments",
    totalSections: 7,
    estimatedTime: "50 minutes",
    difficulty: "Advanced",
    sections: [
      {
        title: "The Art of Rebuttal",
        type: "video",
        content: "Understanding the fundamentals of effective rebuttals",
        duration: "10 min"
      },
      {
        title: "Listening and Note-Taking",
        type: "reading",
        content: "Master active listening techniques for debates",
        duration: "8 min"
      },
      {
        title: "Direct Refutation Strategies",
        type: "interactive",
        content: "Practice direct attack methods on opponent arguments",
        duration: "12 min"
      },
      {
        title: "Turning Arguments",
        type: "interactive",
        content: "Learn to flip opponent arguments to your advantage",
        duration: "10 min"
      },
      {
        title: "Weighing and Prioritizing",
        type: "reading",
        content: "Strategic thinking about which arguments to address",
        duration: "5 min"
      },
      {
        title: "Advanced Techniques",
        type: "video",
        content: "Master-level rebuttal strategies and timing",
        duration: "8 min"
      },
      {
        title: "Rebuttal Challenge",
        type: "quiz",
        content: "Test your rebuttal skills with challenging scenarios",
        duration: "12 min"
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
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
                  <Sword className="w-5 h-5 text-red-600" />
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
                            ? 'bg-red-100 border-2 border-red-300' 
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
                              ? 'bg-red-500 text-white'
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
                        className: "w-6 h-6 text-red-600"
                      })}
                      {moduleData.sections[currentSection].title}
                    </CardTitle>
                    <CardDescription>
                      Section {currentSection + 1} of {moduleData.totalSections} • {moduleData.sections[currentSection].duration}
                    </CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
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
                        <div className="aspect-video bg-gradient-to-br from-red-900 to-orange-900 rounded-lg flex items-center justify-center">
                          <div className="text-center text-white">
                            <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                            <p className="text-lg">Video: {moduleData.sections[currentSection].title}</p>
                            <p className="text-sm opacity-80">Click to play</p>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2">Advanced Rebuttal Techniques</h3>
                          <p className="text-gray-700 text-sm">{moduleData.sections[currentSection].content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-600 font-medium">{moduleData.sections[currentSection].duration}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {moduleData.sections[currentSection].type === 'reading' && (
                      <div className="prose max-w-none">
                        <h3>Mastering Active Listening in Debate</h3>
                        <p>Effective rebuttals begin with excellent listening skills. Here's how to listen strategically during debates:</p>
                        
                        <h4>1. Note-Taking Structure</h4>
                        <ul>
                          <li><strong>Flow charts:</strong> Track arguments line by line</li>
                          <li><strong>Impact hierarchy:</strong> Prioritize arguments by significance</li>
                          <li><strong>Evidence tracking:</strong> Note the quality of opponent's evidence</li>
                        </ul>
                        
                        <h4>2. Listening for Weaknesses</h4>
                        <ul>
                          <li><strong>Logic gaps:</strong> Identify missing steps in reasoning</li>
                          <li><strong>Assumption flaws:</strong> Find unstated assumptions</li>
                          <li><strong>Evidence problems:</strong> Spot weak or missing evidence</li>
                        </ul>
                        
                        <h4>3. Strategic Response Planning</h4>
                        <ul>
                          <li><strong>Time allocation:</strong> Decide which arguments deserve time</li>
                          <li><strong>Response order:</strong> Plan your rebuttal sequence</li>
                          <li><strong>Turn opportunities:</strong> Identify arguments you can flip</li>
                        </ul>
                      </div>
                    )}
                    
                    {moduleData.sections[currentSection].type === 'interactive' && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">Interactive Exercise: Rebuttal Practice</h3>
                          <p className="text-gray-700 mb-4">
                            Practice advanced rebuttal techniques with interactive scenarios:
                          </p>
                          <ArgumentBuilder />
                        </div>
                      </div>
                    )}
                    
                    {moduleData.sections[currentSection].type === 'quiz' && (
                      <QuizComponent />
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
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:scale-105 transition-all"
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

export default AdvancedRebuttals;