import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2, History, RotateCcw } from 'lucide-react';
import { useWebSocketClient } from '../../context/WebSocketContext';
import { API_BASE_URL } from '../../utils/constants';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingHistory, setIsFetchingHistory] = useState(false);
    
    const scrollRef = useRef(null);
    const { client, connected } = useWebSocketClient();
    const subscriptionRef = useRef(null);

    // PERSISTENT SESSION MANAGEMENT
    const getSessionId = useCallback(() => {
        let sid = localStorage.getItem('inner_root_chat_session');
        if (!sid) {
            sid = `session-${Math.random().toString(36).substring(2, 10)}`;
            localStorage.setItem('inner_root_chat_session', sid);
        }
        return sid;
    }, []);

    const [sessionId] = useState(getSessionId());

    // FETCH HISTORY FROM MYSQL
    const fetchHistory = useCallback(async () => {
        setIsFetchingHistory(true);
        try {
            const response = await fetch(`${API_BASE_URL}/chat/history/${sessionId}`);
            if (response.ok) {
                const data = await response.json();
                // Map database entity to local message format
                const history = data.map(msg => ({
                    role: msg.sender,
                    content: msg.content,
                    timestamp: msg.timestamp
                }));
                
                if (history.length > 0) {
                    setMessages(history);
                } else {
                    setMessages([
                        { role: 'bot', content: 'Namaste! I am your Heritage Companion. How can I assist you with your cultural or wellness journey today?' }
                    ]);
                }
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
            // Fallback to default message if backend fails
            if (messages.length === 0) {
                setMessages([{ role: 'bot', content: 'Namaste! I am your Heritage Companion. How can I assist you with your cultural or wellness journey today?' }]);
            }
        } finally {
            setIsFetchingHistory(false);
        }
    }, [sessionId]);

    // Initialize WebSocket subscription
    useEffect(() => {
        if (!client || !connected) return;

        subscriptionRef.current = client.subscribe(`/topic/chat/reply/${sessionId}`, (message) => {
            if (message.body) {
                const response = JSON.parse(message.body);
                setMessages(prev => [...prev, { role: response.role, content: response.content }]);
                setIsLoading(false);
            }
        });

        // Fetch history when connected
        fetchHistory();

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        };
    }, [client, connected, sessionId, fetchHistory]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);

        setIsLoading(true);

        if (client && connected) {
            client.publish({
                destination: '/app/chat',
                body: JSON.stringify({ content: input, sender: 'User', sessionId: sessionId })
            });
        } else {
            console.warn('WebSocket is not connected');
            setMessages(prev => [...prev, { role: 'bot', content: 'Unable to connect to the backend WebSocket Gateway.' }]);
            setIsLoading(false);
        }

        setInput('');
    };

    const clearChat = () => {
        // Reset sessionId to start a fresh chat in MySQL
        const newSid = `session-${Math.random().toString(36).substring(2, 10)}`;
        localStorage.setItem('inner_root_chat_session', newSid);
        window.location.reload(); // Simplest way to re-init everything
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-[0_20px_50px_rgba(255,191,0,0.3)] relative overflow-hidden group"
                style={{
                    background: 'linear-gradient(135deg, var(--gold-400) 0%, var(--gold-600) 100%)',
                }}
            >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X size={28} />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="relative">
                            <MessageSquare size={28} />
                            <motion.div 
                                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 40 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-32 right-8 w-[min(calc(100vw-4rem),480px)] h-[min(calc(100vh-12rem),700px)] bg-obsidian-pure/90 border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-[100] backdrop-blur-2xl"
                    >
                    {/* Header - The Aura Lockup */}
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-display font-black tracking-widest uppercase">Aura AI</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Sentient Heritage Guide</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setMessages([{ role: 'bot', content: 'Namaste! I am your Heritage Companion. How can I assist you with your cultural or wellness journey today?' }])}
                                className="p-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"
                            >
                                <RotateCcw size={18} />
                            </button>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="p-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar">
                            {isFetchingHistory && (
                                <div className="flex flex-col items-center justify-center h-full gap-3 text-white/30">
                                    <Loader2 className="animate-spin" size={32} />
                                    <span className="text-xs tracking-widest uppercase">Retrieving Chronicles...</span>
                                </div>
                            )}

                            {!isFetchingHistory && messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div 
                                        className={`max-w-[85%] p-5 rounded-[1.5rem] ${
                                            msg.role === 'user' 
                                            ? 'bg-accent text-obsidian-pure font-bold rounded-tr-none ml-auto' 
                                            : 'bg-white/5 text-white/80 rounded-tl-none border border-white/5'
                                        }`}
                                    >
                                        <p className="text-sm leading-relaxed font-sans">{msg.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            
                            {isLoading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="bg-white/5 p-4 rounded-3xl rounded-tl-none border border-white/10 flex gap-3 items-center">
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map(dot => (
                                                <motion.div 
                                                    key={dot}
                                                    className="w-1.5 h-1.5 bg-amber-400 rounded-full"
                                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                                    transition={{ repeat: Infinity, duration: 1, delay: dot * 0.2 }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[10px] uppercase tracking-tighter text-white/40">Alchemizing Knowledge</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area - Integrated Glass Design */}
                        <div className="p-6 bg-black/20 border-t border-white/10">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/50 to-amber-200/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative flex gap-2 bg-[#0d0d1a] rounded-2xl p-2 border border-white/10 shadow-inner">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Communicate with the heritage core..."
                                        className="flex-1 bg-transparent px-4 py-3 text-sm text-white focus:outline-none placeholder:text-white/20"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05, x: 2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-black disabled:opacity-50 transition-all shadow-lg"
                                        style={{ background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)' }}
                                    >
                                        <Send size={20} />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Secure Core V4.2</span>
                                <div className="flex gap-2">
                                    <div className="w-1 h-1 bg-amber-500 rounded-full animate-ping" />
                                    <div className="w-1 h-1 bg-amber-500/50 rounded-full" />
                                    <div className="w-1 h-1 bg-amber-500/20 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 215, 0, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 215, 0, 0.3);
                }
            `}} />
        </div>
    );
};

export default ChatBot;

