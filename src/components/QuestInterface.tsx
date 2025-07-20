import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Check, 
  X, 
  Star, 
  Trophy, 
  Brain,
  Target,
  Lightbulb,
  Zap,
  ChevronRight,
  RefreshCw,
  Timer,
  Award
} from 'lucide-react';

interface QuestInterfaceProps {
  questId: string;
  onBack: () => void;
  onComplete: (xpEarned: number) => void;
}

const QuestInterface: React.FC<QuestInterfaceProps> = ({ questId, onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(true);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Quest data structure
  const questData = {
    'fallacy-hunter': {
      title: 'Fallacy Detective',
      description: 'Identify logical fallacies in arguments',
      totalSteps: 5,
      xpReward: 250,
      steps: [
        {
          type: 'multiple-choice',
          question: 'What logical fallacy is present in this argument?',
          scenario: '"Everyone says pineapple on pizza is terrible, so it must be bad."',
          options: [
            'Ad Hominem',
            'Bandwagon Fallacy',
            'Straw Man',
            'False Dilemma'
          ],
          correct: 1,
          explanation: 'This is a Bandwagon Fallacy - assuming something is true because many people believe it.',
          aiTip: 'Look for arguments that rely on popularity rather than evidence.'
        },
        {
          type: 'drag-drop',
          question: 'Arrange the parts of a proper rebuttal in order:',
          items: [
            'Acknowledge the opponent\'s point',
            'Present counter-evidence',
            'Explain why your evidence is stronger',
            'Conclude with your position'
          ],
          correct: [0, 1, 2, 3],
          explanation: 'A strong rebuttal follows this logical sequence to maximize persuasive impact.',
          aiTip: 'Always acknowledge before you attack - it shows intellectual honesty.'
        },
        {
          type: 'scenario',
          question: 'How would you respond to this argument?',
          scenario: '"We shouldn\'t fund space exploration because there are hungry people on Earth."',
          options: [
            'Attack the speaker\'s character',
            'Point out the false dilemma',
            'Ignore the argument',
            'Agree completely'
          ],
          correct: 1,
          explanation: 'This presents a false dilemma - we can address both issues simultaneously.',
          aiTip: 'False dilemmas limit options artificially. Show that multiple solutions can coexist.'
        },
        {
          type: 'interactive',
          question: 'Build a counter-argument to strengthen this claim:',
          scenario: '"Social media has only negative effects on teenagers."',
          task: 'Select evidence that challenges this absolute claim',
          options: [
            'Studies showing educational benefits',
            'Examples of positive communities',
            'Research on creative expression',
            'All social media is bad'
          ],
          correct: [0, 1, 2],
          explanation: 'Multiple types of evidence help challenge absolute claims effectively.',
          aiTip: 'Absolute claims ("only", "never", "always") are often vulnerable to counter-examples.'
        },
        {
          type: 'synthesis',
          question: 'Final Challenge: Complete Analysis',
          scenario: '"Video games cause violence because many mass shooters played violent games."',
          task: 'Identify all the logical issues in this argument',
          checkboxes: [
            'Post hoc ergo propter hoc (correlation vs causation)',
            'Cherry-picking evidence',
            'Hasty generalization',
            'Appeal to emotion'
          ],
          correct: [0, 1, 2],
          explanation: 'This argument contains multiple fallacies, making it particularly weak.',
          aiTip: 'Complex arguments often contain multiple fallacies. Address the strongest ones first.'
        }
      ]
    },
    'argument-builder': {
      title: 'Argument Architect',
      description: 'Build compelling arguments with structure',
      totalSteps: 4,
      xpReward: 200,
      steps: [
        {
          type: 'structure',
          question: 'Build the foundation of your argument',
          scenario: 'Topic: "Schools should start later in the day"',
          task: 'Select the strongest claim',
          options: [
            'Schools should start later because I don\'t like waking up early',
            'Later school start times improve student academic performance and health',
            'Everyone wants schools to start later',
            'Schools have always started too early'
          ],
          correct: 1,
          explanation: 'A strong claim is specific, debatable, and supported by evidence.',
          aiTip: 'Your claim should be clear, specific, and create a clear position to defend.'
        },
        {
          type: 'evidence',
          question: 'Choose the strongest evidence',
          scenario: 'Supporting: "Later school start times improve academic performance"',
          options: [
            'My friend says they feel more awake',
            'Studies show 15% improvement in test scores',
            'Common sense suggests students need more sleep',
            'Teachers prefer well-rested students'
          ],
          correct: 1,
          explanation: 'Empirical data provides the strongest foundation for arguments.',
          aiTip: 'Quantitative evidence is generally more persuasive than anecdotal evidence.'
        },
        {
          type: 'warrant',
          question: 'Connect evidence to claim',
          scenario: 'Evidence: "15% test score improvement" → Claim: "Schools should start later"',
          task: 'Select the logical connection',
          options: [
            'Test scores are the only measure of success',
            'Better academic performance justifies schedule changes',
            'Teachers will be happier',
            'Students will be less tired'
          ],
          correct: 1,
          explanation: 'The warrant explains why your evidence supports your claim.',
          aiTip: 'Make the logical connection explicit - don\'t assume it\'s obvious.'
        },
        {
          type: 'counter',
          question: 'Address the strongest counterargument',
          scenario: 'Opponents argue: "Later start times disrupt parent work schedules"',
          options: [
            'Parents should adjust their schedules',
            'Implement staggered start times and after-school programs',
            'This isn\'t a real problem',
            'Student health is more important than convenience'
          ],
          correct: 1,
          explanation: 'Acknowledge concerns and provide practical solutions.',
          aiTip: 'The strongest responses address counterarguments with solutions, not dismissal.'
        }
      ]
    }
  };

  const currentQuest = questData[questId as keyof typeof questData];
  const currentStepData = currentQuest?.steps[currentStep];

  if (!currentQuest) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Quest Not Found</h2>
        <p className="text-gray-600 mb-4">This quest is not available yet.</p>
        <Button onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Journey
        </Button>
      </div>
    );
  }

  const handleAnswer = (answer: any) => {
    setAnswers({ ...answers, [currentStep]: answer });
    setShowFeedback(true);
    
    // Calculate score
    let isCorrect = false;
    if (Array.isArray(currentStepData.correct)) {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentStepData.correct);
    } else {
      isCorrect = answer === currentStepData.correct;
    }
    
    if (isCorrect) {
      setScore(score + 20);
    }
  };

  const nextStep = () => {
    if (currentStep < currentQuest.totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setShowFeedback(false);
    } else {
      // Quest complete
      const finalScore = score + (isCorrect ? 20 : 0);
      const xpEarned = Math.round((finalScore / 100) * currentQuest.xpReward);
      onComplete(xpEarned);
    }
  };

  const isCorrect = () => {
    const answer = answers[currentStep];
    if (Array.isArray(currentStepData.correct)) {
      return JSON.stringify(answer) === JSON.stringify(currentStepData.correct);
    }
    return answer === currentStepData.correct;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning Journey
          </Button>
          
          <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-2xl font-bold">{currentQuest.title}</h1>
                  <p className="text-indigo-100">{currentQuest.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-lg font-bold">
                    <Timer className="w-5 h-5" />
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-indigo-100">Time remaining</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Step {currentStep + 1} of {currentQuest.totalSteps}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{score} points</span>
                  </div>
                </div>
                <Progress 
                  value={(currentStep / currentQuest.totalSteps) * 100} 
                  className="w-32 h-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quest Content */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-indigo-600" />
              {currentStepData.question}
            </CardTitle>
            {currentStepData.scenario && (
              <CardDescription className="text-base p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
                <strong>Scenario:</strong> {currentStepData.scenario}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Question Content */}
            {currentStepData.type === 'multiple-choice' && (
              <div className="space-y-3">
                {currentStepData.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start p-4 h-auto hover:border-indigo-300"
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                  >
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {currentStepData.type === 'scenario' && (
              <div className="space-y-3">
                {currentStepData.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start p-4 h-auto hover:border-indigo-300"
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {currentStepData.type === 'synthesis' && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">{currentStepData.task}</p>
                {(currentStepData as any).checkboxes?.map((option: string, index: number) => (
                  <label key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600"
                      onChange={(e) => {
                        const currentAnswers = answers[currentStep] || [];
                        if (e.target.checked) {
                          handleAnswer([...currentAnswers, index]);
                        } else {
                          handleAnswer(currentAnswers.filter((i: number) => i !== index));
                        }
                      }}
                      disabled={showFeedback}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Feedback */}
            {showFeedback && (
              <Card className={`border-2 ${isCorrect() ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect() ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-orange-600" />
                    )}
                    <span className={`font-bold ${isCorrect() ? 'text-green-800' : 'text-orange-800'}`}>
                      {isCorrect() ? 'Correct!' : 'Not quite right'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{currentStepData.explanation}</p>
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-800">
                      <strong>AI Tip:</strong> {currentStepData.aiTip}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Next Button */}
            {showFeedback && (
              <div className="flex justify-center">
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  {currentStep < currentQuest.totalSteps - 1 ? (
                    <>
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Complete Quest
                      <Trophy className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuestInterface;