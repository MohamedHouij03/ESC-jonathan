'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('chatHasBeenClosed') === 'true';
    }
    return false;
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your fitness assistant. How can I help you today? You can ask me about courses, routines, exercises, or anything fitness-related! 💪",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Check authentication status and auto-open for logged-out users
  useEffect(() => {
    const checkAuthStatus = () => {
      const userData = localStorage.getItem('user');
      const loggedIn = !!userData;
      setIsLoggedIn(loggedIn);
      
      // Reset hasBeenClosed when user logs in (so chat can auto-open for newly logged-out users)
      if (loggedIn && hasBeenClosed) {
        setHasBeenClosed(false);
        localStorage.removeItem('chatHasBeenClosed');
      }
      
      // Auto-open chat for logged-out users after a short delay (only if not manually closed)
      if (!loggedIn && !isOpen && !hasBeenClosed) {
        setTimeout(() => {
          setIsOpen(true);
          setIsMinimized(false);
        }, 2000); // 2 second delay
      }
    };

    // Initial check
    checkAuthStatus();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        checkAuthStatus();
      }
    };

    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [hasBeenClosed]); // Removed isOpen from dependencies to prevent re-running on every open/close

  // Minimize chat when clicking outside
  useEffect(() => {
    if (isOpen && !isMinimized) {
      const handleClickOutside = (event: MouseEvent) => {
        if (chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
          setIsMinimized(true);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, isMinimized]);

  // Simple AI responses based on keywords
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Course-related responses
    if (message.includes('course') || message.includes('training')) {
      return "We offer several fitness courses! 🎯\n\n• Level 1 Training - Xformer-Megacore-Most other reformers\n• Level 2 Training - New exercises\n• Pre/Post Natal\n\nEach course includes detailed video lessons, progress tracking, and certificates upon completion. Would you like to know more about a specific course?";
    }
    
    // Routine-related responses
    if (message.includes('routine') || message.includes('workout')) {
      return "We have workout routines for every fitness level! 💪\n\n• Beginner Friendly Routines (5 different levels)\n• Intermediate Routines\n• Advanced Routines\n• Pregnant Friendly Routines\n• VIP Routines\n\nWhat's your current fitness level? I can recommend the perfect routine for you!";
    }
    
    // Exercise-related responses
    if (message.includes('exercise') || message.includes('movement')) {
      return "Our exercise library includes hundreds of movements! 🏋️‍♀️\n\n• Strength training exercises\n• Cardio workouts\n• Flexibility and mobility\n• Core strengthening\n• Rehabilitation exercises\n\nYou can browse our complete exercise database in the 'Exercises' section. What type of exercise are you looking for?";
    }
    
    // Pricing-related responses
    if (message.includes('price') || message.includes('cost') || message.includes('payment')) {
      return "We offer flexible pricing options! 💰\n\n• Individual courses available\n• VIP membership with access to all content\n• Special packages for studios\n\nFor detailed pricing and to book a consultation, visit our 'Book Now' page or contact us directly. Would you like me to connect you with our team?";
    }
    
    // General fitness advice
    if (message.includes('advice') || message.includes('tip') || message.includes('help')) {
      return "Here are some fitness tips! 🌟\n\n• Start with proper form - quality over quantity\n• Consistency is key - even 20 minutes daily makes a difference\n• Listen to your body and rest when needed\n• Stay hydrated and fuel your body properly\n• Set realistic goals and track your progress\n\nWhat specific area would you like advice on?";
    }
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 I'm here to help you on your fitness journey. You can ask me about:\n\n• Our courses and training programs\n• Workout routines for your level\n• Exercise techniques and form\n• Pricing and membership options\n• General fitness advice\n\nWhat would you like to know?";
    }
    
    // Default response
    return "Thanks for your message! 🤔 I'm here to help with fitness-related questions. You can ask me about:\n\n• Our courses and training programs\n• Workout routines\n• Exercise techniques\n• Pricing information\n• Fitness advice\n\nFeel free to ask anything fitness-related, or type 'help' for more options!";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Play notification sound when bot sends message
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log('Audio playback failed:', error);
        });
      }
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    if (isOpen && isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
      setIsMinimized(false);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setHasBeenClosed(true);
    localStorage.setItem('chatHasBeenClosed', 'true');
  };

  return (
    <>
      {/* Audio element for notification sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/notification.mp3" type="audio/mpeg" />
        <source src="/sounds/notification.wav" type="audio/wav" />
        <source src="/sounds/notification.ogg" type="audio/ogg" />
      </audio>
      
      {/* Chat Toggle Button - Only show when chat is closed */}
      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow-lg hover:shadow-xl z-50 flex items-center justify-center transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-40"
          >
            {isMinimized ? (
              /* Minimized State - Simple Bubble */
              <motion.button
                onClick={toggleChat}
                className="w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Open chat"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </motion.button>
            ) : (
              /* Expanded State - Full Chat Window */
              <div className="w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xl">💪</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Fitness Assistant</h3>
                        <p className="text-sm text-red-100">Online • Ready to help</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={minimizeChat}
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                        title="Minimize"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={closeChat}
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                        title="Close"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.isUser
                            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                            : 'bg-white text-gray-800 shadow-sm border'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.isUser ? 'text-red-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white text-gray-800 shadow-sm border p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t bg-white rounded-b-2xl">
                  <div className="flex space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 