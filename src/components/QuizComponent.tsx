import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Trophy, RefreshCw, Target, Zap } from 'lucide-react';
import StoneBreakerGame from './StoneBreakerGame';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What are the main components of a strong argument?",
    options: ["Claim, Evidence, Warrant, Impact", "Introduction, Body, Conclusion", "Topic, Opinion, Facts", "Statement, Proof, Summary"],
    correctAnswer: 0,
    explanation: "A strong argument consists of a Claim (your position), Evidence (supporting facts), Warrant (logical connection), and Impact (why it matters)."
  },
  {
    id: 2,
    question: "What is the purpose of a warrant in an argument?",
    options: ["To provide statistical evidence", "To link evidence to the claim", "To conclude the argument", "To introduce the topic"],
    correctAnswer: 1,
    explanation: "A warrant explains how and why the evidence supports your claim, creating the logical bridge between them."
  },
  {
    id: 3,
    question: "Which type of evidence is typically most persuasive in policy debates?",
    options: ["Personal anecdotes", "Statistical data", "Historical examples", "Emotional appeals"],
    correctAnswer: 1,
    explanation: "Statistical data provides quantifiable, verifiable support that is especially powerful in policy discussions."
  },
  {
    id: 4,
    question: "What is the primary goal of the opening statement in a debate?",
    options: ["To attack opponents", "To present your case framework", "To ask questions", "To summarize everything"],
    correctAnswer: 1,
    explanation: "The opening statement establishes your position, main arguments, and the framework through which the debate should be viewed."
  },
  {
    id: 5,
    question: "In formal debate, what is a 'rebuttal'?",
    options: ["Your opening argument", "A response to opponent's arguments", "A closing summary", "A question to the opponent"],
    correctAnswer: 1,
    explanation: "A rebuttal directly addresses and challenges the opponent's arguments, showing why they are flawed or insufficient."
  },
  {
    id: 6,
    question: "What makes expert testimony credible?",
    options: ["Celebrity status", "Relevant expertise and credentials", "Personal opinions", "Emotional delivery"],
    correctAnswer: 1,
    explanation: "Credible expert testimony comes from individuals with proven expertise, qualifications, and experience in the relevant field."
  },
  {
    id: 7,
    question: "What is the fallacy of 'ad hominem'?",
    options: ["Using false statistics", "Attacking the person instead of their argument", "Making hasty generalizations", "Using circular reasoning"],
    correctAnswer: 1,
    explanation: "Ad hominem is attacking the character or attributes of the person making an argument rather than addressing the argument itself."
  },
  {
    id: 8,
    question: "What is the burden of proof in debate?",
    options: ["The obligation to be polite", "The responsibility to prove your claims", "The duty to ask questions", "The need to speak loudly"],
    correctAnswer: 1,
    explanation: "Burden of proof is the obligation to provide sufficient evidence and reasoning to support your claims and convince the audience."
  },
  {
    id: 9,
    question: "Which of these is NOT a common debate format?",
    options: ["Parliamentary", "Policy", "Lincoln-Douglas", "Socratic Circle"],
    correctAnswer: 3,
    explanation: "While Socratic Circle is a discussion format, it's not typically considered a formal competitive debate format like the others."
  },
  {
    id: 10,
    question: "What is the purpose of cross-examination in debate?",
    options: ["To make friends", "To clarify and challenge opponent's arguments", "To give a speech", "To present new evidence"],
    correctAnswer: 1,
    explanation: "Cross-examination allows debaters to ask pointed questions to clarify, expose weaknesses, or challenge the opponent's case."
  },
  {
    id: 11,
    question: "What is a 'strawman' fallacy?",
    options: ["Using weak evidence", "Misrepresenting opponent's argument to attack it easily", "Being too emotional", "Speaking too quietly"],
    correctAnswer: 1,
    explanation: "A strawman fallacy involves mischaracterizing or oversimplifying an opponent's position to make it easier to attack."
  },
  {
    id: 12,
    question: "In debate judging, what is typically most important?",
    options: ["Speaking speed", "Physical appearance", "Quality of arguments and evidence", "Volume of voice"],
    correctAnswer: 2,
    explanation: "Judges primarily evaluate the strength, logic, and evidence quality of arguments rather than delivery style alone."
  },
  {
    id: 13,
    question: "What is the difference between inductive and deductive reasoning?",
    options: ["No difference", "Inductive goes from specific to general, deductive from general to specific", "Inductive is always wrong", "Deductive uses emotions"],
    correctAnswer: 1,
    explanation: "Inductive reasoning draws general conclusions from specific examples, while deductive reasoning applies general principles to specific cases."
  },
  {
    id: 14,
    question: "What is the role of impact in an argument?",
    options: ["To sound impressive", "To explain why the argument matters and its consequences", "To repeat the claim", "To provide more evidence"],
    correctAnswer: 1,
    explanation: "Impact explains the significance and real-world consequences of your argument, showing why it matters to the audience."
  },
  {
    id: 15,
    question: "What is the best way to handle a question you can't answer in cross-examination?",
    options: ["Make up an answer", "Admit uncertainty and offer to clarify", "Attack the questioner", "Change the subject"],
    correctAnswer: 1,
    explanation: "Honesty builds credibility. Acknowledging uncertainty while offering to clarify shows integrity and professionalism."
  }
];

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [gameMode, setGameMode] = useState<'normal' | 'stonebreaker'>('normal');

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
    setGameMode('normal');
  };

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const score = calculateScore();
  const scorePercentage = (score / quizQuestions.length) * 100;

  // StoneBreaker mode
  if (gameMode === 'stonebreaker') {
    return (
      <StoneBreakerGame 
        questions={quizQuestions} 
        onExit={() => setGameMode('normal')} 
      />
    );
  }

  if (quizCompleted && showResults) {
    return (
      <div className="space-y-6">
        {/* Results Summary */}
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
            <p className="text-lg mb-4">
              You scored <span className="font-bold text-indigo-600">{score}</span> out of <span className="font-bold">{quizQuestions.length}</span>
            </p>
            <div className="mb-4">
              <Progress value={scorePercentage} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">{scorePercentage.toFixed(0)}% Correct</p>
            </div>
            <Badge variant={scorePercentage >= 80 ? "default" : scorePercentage >= 60 ? "secondary" : "destructive"} className="mb-4">
              {scorePercentage >= 80 ? "Excellent!" : scorePercentage >= 60 ? "Good Job!" : "Keep Practicing!"}
            </Badge>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Review Your Answers</h4>
          {quizQuestions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <Card key={question.id} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {question.options[userAnswer]}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 mb-2">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 italic">{question.explanation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button onClick={resetQuiz} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="text-center space-y-6">
        <Card className="border-0 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="p-8">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-2xl font-bold mb-4">Great Job!</h3>
            <p className="text-gray-600 mb-6">
              You've completed all {quizQuestions.length} questions. Ready to see your results?
            </p>
            <Button 
              onClick={() => setShowResults(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mode Selection Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">Knowledge Check</h3>
          <p className="text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => setGameMode('stonebreaker')}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white flex items-center gap-2 animate-pulse"
          >
            <Target className="w-4 h-4" />
            🔥 STONEBREAKER MODE
            <Zap className="w-4 h-4" />
          </Button>
          <Badge variant="outline" className="w-fit">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="h-2" />

      {/* Question Card */}
      <Card className="border-0 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardContent className="p-6 sm:p-8">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-4 leading-relaxed">
                {currentQ.question}
              </h4>
              
              <div className="grid gap-3">
                {currentQ.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion] === index;
                  return (
                    <label 
                      key={index} 
                      className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all hover:bg-white/50 ${
                        isSelected 
                          ? 'bg-white shadow-md border-2 border-indigo-300' 
                          : 'bg-white/30 border border-gray-200'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name={`question-${currentQ.id}`}
                        value={index}
                        checked={isSelected}
                        onChange={() => handleAnswerSelect(index)}
                        className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-700 leading-relaxed">{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2 order-2 sm:order-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <Button
          onClick={nextQuestion}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2 order-1 sm:order-2"
        >
          {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuizComponent;