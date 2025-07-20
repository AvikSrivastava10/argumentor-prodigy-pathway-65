import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Crown, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const GrandmasterAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Greetings! I'm ARGUMENTOR'S Grandmaster, your elite debate coach. I'm here to guide you through the art of argumentation, from building powerful claims to mastering advanced parliamentary formats. What would you like to work on today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Excellent question! Let me break down that concept for you. In debate, we need to consider multiple perspectives...",
        "That's a sophisticated argument structure! Here's how we can strengthen it further...",
        "I see you're working on rebuttals. The key is to address the warrant behind their claim...",
        "Great thinking! For parliamentary debate, remember the speaker roles and time allocation...",
        "Let's dive deeper into that fallacy. Here's how to identify and counter it effectively..."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-grandmaster-bg shadow-2xl rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 group"
          aria-label="Open ARGUMENTOR'S Grandmaster Assistant"
        >
          <div className="relative">
            <Crown className="w-8 h-8 text-grandmaster-accent group-hover:text-grandmaster-secondary transition-colors duration-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-grandmaster-accent rounded-full animate-pulse"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="grandmaster-chat fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-scale-in">
          {/* Header */}
          <div className="bg-grandmaster-bg text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Crown className="w-6 h-6 text-grandmaster-accent" />
                <Sparkles className="w-3 h-3 text-grandmaster-secondary absolute -top-1 -right-1" />
              </div>
              <div>
                <h3 className="font-bold text-lg">ARGUMENTOR'S Grandmaster</h3>
                <p className="text-xs text-grandmaster-secondary">Elite Debate Coach</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-grandmaster-accent text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {!message.isUser && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Crown className="w-4 h-4 text-grandmaster-accent" />
                        <span className="text-xs font-semibold text-grandmaster-accent">Grandmaster</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                    <div className="flex items-center space-x-2 mb-2">
                      <Crown className="w-4 h-4 text-grandmaster-accent" />
                      <span className="text-xs font-semibold text-grandmaster-accent">Grandmaster</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-grandmaster-accent rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-grandmaster-accent rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-grandmaster-accent rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask the Grandmaster anything about debate..."
                className="flex-1 border-grandmaster-secondary/30 focus:ring-grandmaster-accent focus:border-grandmaster-accent"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-grandmaster-accent hover:bg-grandmaster-accent/90 text-white px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center mt-2 space-x-1 text-xs text-gray-500">
              <Zap className="w-3 h-3" />
              <span>Powered by elite debate intelligence</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Responsive - handled via Tailwind classes */}
      {isOpen && (
        <style>
          {`
            @media (max-width: 768px) {
              .grandmaster-chat {
                position: fixed !important;
                bottom: 1rem !important;
                right: 1rem !important;
                left: 1rem !important;
                width: auto !important;
                height: 70vh !important;
                max-height: 500px !important;
              }
            }
          `}
        </style>
      )}
    </>
  );
};

export default GrandmasterAssistant;