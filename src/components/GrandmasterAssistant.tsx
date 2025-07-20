import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Zap, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { sarvamAPI, SarvamMessage } from '@/lib/sarvam-api';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ArgueAI: React.FC = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm ArgueAI, your debate mentor. I'm here to help you master debating formats (BP, AP, MUN), argumentation, rebuttals, logical fallacies, time management, judging criteria, and speaking tips. What would you like to work on today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  // Initialize conversation history from localStorage if available
  const [conversationHistory, setConversationHistory] = useState<SarvamMessage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('argueAI_conversation');
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        console.error('Error loading conversation from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  // Refs
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    // Save conversation to localStorage when it changes
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('argueAI_conversation', JSON.stringify(conversationHistory));
      } catch (error) {
        console.error('Error saving conversation to localStorage:', error);
      }
    }
  }, [conversationHistory]);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    };
    
    scrollToBottom();
  }, [messages]);

  // Event handlers
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    // Add user message to UI immediately for better responsiveness
    setMessages(prev => [...prev, newUserMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Add user message to conversation history
    const updatedHistory = [
      ...conversationHistory,
      { role: 'user' as const, content: currentMessage }
    ];
    setConversationHistory(updatedHistory);

    // Create a temporary message for the typing indicator
    const tempMessageId = `temp-${Date.now()}`;
    const tempMessage: Message = {
      id: tempMessageId,
      content: '...',
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, tempMessage]);

    try {
      // Get AI response from Sarvam API with error handling and retry logic
      let attempts = 0;
      const maxAttempts = 2;
      let lastError: Error | null = null;
      let aiResponse = '';

      while (attempts < maxAttempts) {
        try {
          attempts++;
          // Prepare the history for the API call, including the new user message
          const historyForApi = [...conversationHistory, { role: 'user' as const, content: currentMessage }];

          aiResponse = await sarvamAPI.getDebateResponse(
            historyForApi,
            undefined // Context is the second, optional argument
          );
          lastError = null;
          break; // Success, exit retry loop
        } catch (error) {
          console.error(`Attempt ${attempts} failed:`, error);
          lastError = error as Error;
          if (attempts >= maxAttempts) break;
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
      }

      if (lastError) {
        throw lastError; // Re-throw if all attempts failed
      }

      // Remove temporary typing indicator and add actual response
      setMessages(prev => [
        ...prev.filter(msg => msg.id !== tempMessageId),
        {
          id: Date.now().toString(),
          content: aiResponse,
          isUser: false,
          timestamp: new Date()
        }
      ]);

      // Update conversation history with AI response
      setConversationHistory(prev => [
        ...prev,
        { role: 'assistant' as const, content: aiResponse }
      ]);

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Remove temporary typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== tempMessageId));
      
      // Add error message to chat
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "I'm having trouble connecting to the debate server. Please check your internet connection and try again.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      // Revert conversation history to previous state
      setConversationHistory(conversationHistory);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isTyping) {
        handleSendMessage();
      }
    }
  };
  
  const handleQuickReply = (reply: string) => {
    if (isTyping) return; // Prevent new messages while typing
    setInputMessage(reply);
    // Small delay to allow state update before sending
    setTimeout(() => {
      handleSendMessage();
    }, 50);
  };

  // Render
  return (
    <>
      {/* Floating Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 z-50 group animate-bounce-slow"
          aria-label="Open ArgueAI - Your Debate Mentor"
        >
          <div className="relative">
            <Brain className="w-8 h-8 text-white group-hover:text-blue-200 transition-colors duration-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="argue-ai-chat fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50 transition-all duration-300 animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="w-6 h-6 text-white" />
                <Sparkles className="w-3 h-3 text-blue-200 absolute -top-1 -right-1" />
              </div>
              <div>
                <h3 className="font-bold text-lg">ArgueAI</h3>
                <p className="text-xs text-blue-200">Your Debate Mentor</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 h-8 w-8 p-0 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-gray-50 dark:bg-gray-800">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg shadow-sm transition-all duration-200 ${
                      message.isUser
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {!message.isUser && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">ArgueAI</span>
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
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-lg max-w-[80%] shadow-sm border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">ArgueAI</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Reply Buttons */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                "How do I frame a rebuttal?",
                "Explain BP Format",
                "Common fallacies",
                "Time management tips",
                "What's a whip speech?"
              ].map((quickReply) => (
                <button
                  key={quickReply}
                  onClick={() => handleQuickReply(quickReply)}
                  disabled={isTyping}
                  className={`px-3 py-1 text-xs bg-white dark:bg-gray-700 border ${
                    isTyping 
                      ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600'
                  } rounded-full transition-colors duration-200`}
                >
                  {quickReply}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={isTyping ? 'ArgueAI is thinking...' : 'Ask ArgueAI anything about debate...'}
                disabled={isTyping}
                className={`flex-1 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200 ${
                  isTyping ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : 'bg-white dark:bg-gray-800'
                }`}
              />
              <Button
                type="submit"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 transition-all duration-200 shadow-md ${
                  !isTyping && 'hover:from-blue-600 hover:to-purple-600 hover:shadow-lg'
                } ${isTyping ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isTyping ? (
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>Powered by Sarvam AI</span>
              </div>
              <div className="text-xs opacity-70">
                {conversationHistory.length > 0 && `Context: ${conversationHistory.length} messages`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Responsive and Custom Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .animate-scale-in { animation: scale-in 0.2s ease-out; }
          .animate-fade-in { animation: fade-in 0.3s ease-out; }
          .animate-bounce-slow { animation: bounce-slow 2s infinite; }
          @media (max-width: 768px) {
            .argue-ai-chat {
              position: fixed !important;
              bottom: 1rem !important;
              right: 1rem !important;
              left: 1rem !important;
              width: auto !important;
              height: 75vh !important;
              max-height: 600px !important;
            }
          }
          @media (max-width: 480px) {
            .argue-ai-chat {
              height: 80vh !important;
              bottom: 0.5rem !important;
              right: 0.5rem !important;
              left: 0.5rem !important;
            }
          }
        `
      }} />
    </>
  );
};

export default ArgueAI;