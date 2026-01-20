import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Key } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "hi there. ask me anything about the projects or skills listed here.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      
      if (responseText === "NEED_KEY_SELECTION") {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: "it seems i need a valid api key to work in this environment. please connect one using the button below.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: responseText.toLowerCase(),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleConnectKey = async () => {
    try {
      // @ts-ignore - Handle specific AISTUDIO live environment tool
      if (window.aistudio && window.aistudio.openSelectKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        setMessages(prev => [...prev, {
          id: 'key-connected',
          role: 'model',
          text: "key connected. you can now try asking your question again!",
          timestamp: new Date()
        }]);
      } else {
        alert("api key selection is not supported in this environment. please ensure process.env.API_KEY is configured.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed bottom-32 md:bottom-8 right-6 md:right-10 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-4 w-[300px] md:w-80 bg-black/90 border border-neutral-800 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col h-[400px]"
          >
            {/* Header */}
            <div className="p-3 flex items-center justify-between border-b border-neutral-800 bg-neutral-900/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-neutral-800">
                  <Sparkles className="w-3 h-3 text-accent" />
                </div>
                <span className="font-mono text-xs text-neutral-400">assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-neutral-800 rounded transition-colors"
              >
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-neutral-800 shrink-0 mt-1 border border-neutral-800">
                       <Sparkles className="w-3 h-3 text-accent" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-neutral-800 text-white' 
                      : 'bg-transparent border border-neutral-800 text-neutral-300'
                  }`}>
                    {msg.text}
                    {msg.text.includes("connect one using the button below") && (
                       <button 
                         onClick={handleConnectKey}
                         className="mt-2 w-full flex items-center justify-center gap-2 py-1.5 bg-accent/20 hover:bg-accent/30 border border-accent/40 rounded-lg text-xs text-accent transition-all"
                       >
                         <Key size={12} />
                         connect api key
                       </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-center gap-2 px-1">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-neutral-800 shrink-0 border border-neutral-800">
                       <Sparkles className="w-3 h-3 text-accent/50 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-neutral-600 rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-neutral-600 rounded-full animate-bounce delay-75" />
                      <div className="w-1 h-1 bg-neutral-600 rounded-full animate-bounce delay-150" />
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-neutral-800 bg-neutral-900/30">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask anything..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 pl-3 pr-10 text-xs text-white focus:outline-none focus:border-neutral-600 transition-colors font-mono"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-1 p-1.5 hover:bg-neutral-800 rounded-md text-neutral-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition-all border border-neutral-800 overflow-hidden ${
          isOpen ? 'bg-neutral-800' : 'bg-black hover:border-neutral-600'
        }`}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <MessageSquare className="w-5 h-5 text-white" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;