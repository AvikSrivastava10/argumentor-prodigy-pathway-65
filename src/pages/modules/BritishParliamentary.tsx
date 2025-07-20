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
  Users
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ArgumentBuilder from '@/components/ArgumentBuilder';
import QuizComponent from '@/components/QuizComponent';

const BritishParliamentary = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const moduleData = {
    title: "British Parliamentary Format",
    description: "Master the BP format used in World Championships",
    totalSections: 6,
    estimatedTime: "60 minutes",
    difficulty: "Intermediate",
    sections: [
      {
        title: "Introduction to BP Format",
        type: "video",
        content: "Understanding the structure and rules of British Parliamentary debate",
        duration: "15 min"
      },
      {
        title: "Team Roles and Responsibilities",
        type: "reading",
        content: "Learn the specific roles of each team in BP format",
        duration: "12 min"
      },
      {
        title: "Opening Government Strategy",
        type: "interactive",
        content: "Practice building compelling opening arguments",
        duration: "15 min"
      },
      {
        title: "Opposition Response Tactics",
        type: "interactive",
        content: "Master effective opposition strategies and rebuttals",
        duration: "10 min"
      },
      {
        title: "Extension Strategies",
        type: "reading",
        content: "How closing teams can effectively extend the debate",
        duration: "8 min"
      },
      {
        title: "Practice Round",
        type: "quiz",
        content: "Test your BP knowledge with scenario-based questions",
        duration: "15 min"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
                  <Users className="w-5 h-5 text-blue-600" />
                  {moduleData.title}
                </CardTitle>
                <CardDescription>{moduleData.description}</CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge variant="default">{moduleData.difficulty}</Badge>
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
                            ? 'bg-blue-100 border-2 border-blue-300' 
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
                              ? 'bg-blue-500 text-white'
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
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content">
                    {/* Content based on section type */}
                    {moduleData.sections[currentSection].type === 'video' && (
                      <div className="space-y-6">
                        <div className="aspect-video bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg flex items-center justify-center">
                          <div className="text-center text-white">
                            <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                            <p className="text-lg">Video: {moduleData.sections[currentSection].title}</p>
                            <p className="text-sm opacity-80">Click to play</p>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-lg mb-2">British Parliamentary Format Overview</h3>
                          <p className="text-gray-700 text-sm">{moduleData.sections[currentSection].content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-600 font-medium">{moduleData.sections[currentSection].duration}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {moduleData.sections[currentSection].type === 'reading' && (
                      <div className="prose max-w-none">
                        <h3>Team Roles in British Parliamentary Format</h3>
                        <p>The British Parliamentary format involves four teams of two speakers each, arranged in government and opposition benches.</p>
                        
                        <h4>Opening Government (OG)</h4>
                        <ul>
                          <li><strong>Prime Minister:</strong> Defines the motion and sets the framework for debate</li>
                          <li><strong>Deputy Prime Minister:</strong> Supports and extends the government case</li>
                        </ul>
                        
                        <h4>Opening Opposition (OO)</h4>
                        <ul>
                          <li><strong>Leader of Opposition:</strong> Directly refutes the government case</li>
                          <li><strong>Deputy Leader of Opposition:</strong> Continues opposition arguments</li>
                        </ul>
                        
                        <h4>Closing Government (CG)</h4>
                        <ul>
                          <li><strong>Member for Government:</strong> Extends government case with new arguments</li>
                          <li><strong>Government Whip:</strong> Summarizes and weighs the debate</li>
                        </ul>
                        
                        <h4>Closing Opposition (CO)</h4>
                        <ul>
                          <li><strong>Member for Opposition:</strong> Provides fresh opposition perspective</li>
                          <li><strong>Opposition Whip:</strong> Final opposition summary and weighing</li>
                        </ul>
                      </div>
                    )}
                    
                    {moduleData.sections[currentSection].type === 'interactive' && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">Interactive Exercise: BP Strategy</h3>
                          <p className="text-gray-700 mb-4">
                            Practice building arguments for British Parliamentary format:
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
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all"
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

export default BritishParliamentary;