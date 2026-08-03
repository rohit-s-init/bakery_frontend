import { getConversation, sendMessage } from '@/api/bot';
import { useUser } from '@/context/User';
import React, { useState, useRef, useEffect } from 'react';
import ReactGA from "react-ga4";

const ChatPopup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user } = useUser();

    const suggestions = [
        { text: "Tell me about my order", icon: "📦" },
        { text: "Make an order", icon: "🛒" },
        { text: "Explore pastry platter", icon: "🍰" }
    ];

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        (async () => {
            const messages = await getConversation();
            if (messages.success) {
                setMessages(messages.messages.map((m) => {
                    return {
                        text: m.content,
                        sender: m.role == "ASSISTANT" ? "bot" : "user"
                    }
                }))
            }
        })();
    }, [user]);

    const handleSendMessage = async (message?: string) => {
        const textToSend = message || inputValue;
        if (textToSend.trim() === '') return;

        // Add user message
        setMessages(prev => [...prev, { text: textToSend, sender: 'user' }]);
        setInputValue('');

        // Show typing indicator
        setIsBotTyping(true);

        // Simulate bot thinking with random delay between 800ms - 2000ms
        // const delay = 800 + Math.random() * 1200;
        // setTimeout(() => {
        //   setIsBotTyping(false);
        //   setMessages(prev => [...prev, { text: 'done', sender: 'bot' }]);
        // }, delay);
        const { success, bot } = await sendMessage({
            content: textToSend
        });

        if (success) {
            setIsBotTyping(false);
            setMessages(prev => [...prev, { text: bot.text, sender: 'bot' }]);
            if (bot.event) {
                console.log("emmiting event : " + bot.event);
                ReactGA.event("ai_behaviour_prediction", {
                    prediction: bot.event
                })
            }
        }

    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        handleSendMessage(suggestion);
    };

    // Auto scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isBotTyping]);

    // Reset suggestions visibility when chat opens
    const showSuggestions = messages.length <= 2 && !isBotTyping;

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 z-50 bg-[#8B5E3C] hover:bg-[#6d4a2e] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
                style={{
                    boxShadow: '0 10px 25px -5px rgba(139, 94, 60, 0.4)'
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl transition-all duration-500 transform origin-bottom-right ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-75 translate-y-12 pointer-events-none'
                    }`}
                style={{
                    maxHeight: 'calc(100vh - 8rem)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
            >
                {/* Chat Header */}
                <div className="bg-[#8B5E3C] text-white rounded-t-2xl px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Pastry Palette</h3>
                            <p className="text-xs text-white/80">Online • Usually replies in minutes</p>
                        </div>
                    </div>
                    <button onClick={toggleChat} className="text-white/80 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FDF8F3]" style={{ maxHeight: '320px' }}>
                    {messages.map((msg, idx) => {
                        // Check if message contains event
                        let hasEvent = false;
                        let textParts = [];
                        let eventText = null;
                        const parts = msg.text.split("_ga_triggered_event_");
                        textParts = parts[0] ? [parts[0]] : [];
                        
                        if (parts.length>=2) {
                            hasEvent = true;
                            eventText = parts[1] || null;
                        }

                        return (
                            <div
                                key={idx}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${msg.sender === 'user'
                                            ? 'bg-[#8B5E3C] text-white rounded-br-none'
                                            : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">
                                        {hasEvent ? (
                                            <>
                                                {textParts.map((part, i) => (
                                                    <span key={i}>{part}</span>
                                                ))}
                                                <span
                                                    className="
                  inline-block
                  mt-1.5
                  px-2.5
                  py-0.5
                  rounded-md
                  bg-amber-50/70
                  backdrop-blur-sm
                  border-l-4
                  border-amber-600
                  font-medium
                  text-amber-900
                  text-xs
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-amber-100/80
                  animate-pulse
                "
                                                >
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <span className="text-amber-600">⚡</span>
                                                        <span className="font-bold uppercase tracking-wider text-amber-700">
                                                            Event:
                                                        </span>
                                                        {eventText}
                                                    </span>
                                                </span>
                                            </>
                                        ) : (
                                            msg.text
                                        )}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {/* Typing Indicator - Bot is thinking */}
                    {isBotTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 px-4 py-3 max-w-[80%]">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-[#8B5E3C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-[#8B5E3C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-[#8B5E3C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggestion Chips - Styled Container */}
                {showSuggestions && (
                    <div className="px-4 py-3 bg-gradient-to-r from-[#FFF5ED] to-[#FFE8D6] border-t border-[#E8D5C4]">
                        <p className="text-xs text-[#8B5E3C]/70 font-medium mb-2.5 tracking-wide">
                            ✨ Quick actions
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSuggestionClick(suggestion.text)}
                                    className="flex items-center gap-1.5 px-3.5 py-2 bg-white/90 backdrop-blur-sm border border-[#D4B8A0] hover:border-[#8B5E3C] hover:bg-[#8B5E3C] hover:text-white rounded-full text-sm text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
                                >
                                    <span>{suggestion.icon}</span>
                                    <span>{suggestion.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Chat Input */}
                <div className="border-t border-gray-100 p-4 bg-white rounded-b-2xl">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            disabled={isBotTyping}
                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/30 focus:border-[#8B5E3C] transition-all text-sm bg-[#FDF8F3] placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!inputValue.trim() || isBotTyping}
                            className={`px-4 py-2.5 rounded-xl transition-all ${inputValue.trim() && !isBotTyping
                                ? 'bg-[#8B5E3C] hover:bg-[#6d4a2e] text-white shadow-md'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatPopup;