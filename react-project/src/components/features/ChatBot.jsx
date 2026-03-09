import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { useWebSocketClient } from '../../context/WebSocketContext';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Namaste! I am your Heritage Companion. How can I assist you with your cultural or wellness journey today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);
    const sessionIdRef = useRef(`session-${Math.random().toString(36).substring(2, 10)}`);
    const { client, connected } = useWebSocketClient();
    const subscriptionRef = useRef(null);

    // Initialize WebSocket subscription
    useEffect(() => {
        if (!client || !connected) return;

        subscriptionRef.current = client.subscribe(`/topic/chat/reply/${sessionIdRef.current}`, (message) => {
            if (message.body) {
                const response = JSON.parse(message.body);
                setMessages(prev => [...prev, { role: response.role, content: response.content }]);
                setIsLoading(false);
            }
        });

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        };
    }, [client, connected]);

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
                body: JSON.stringify({ content: input, sender: 'User', sessionId: sessionIdRef.current })
            });
        } else {
            console.warn('WebSocket is not connected');
            setMessages(prev => [...prev, { role: 'bot', content: 'Unable to connect to the backend WebSocket Gateway.' }]);
            setIsLoading(false);
        }

        setInput('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
                    boxShadow: '0 8px 32px var(--accent-glow)'
                }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                            <MessageSquare size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
                {!isOpen && (
                    <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-20 right-0 w-[90vw] sm:w-[400px] h-[500px] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
                        style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-primary)',
                            backdropFilter: 'blur(16px)'
                        }}
                    >
                        {/* Header */}
                        <div className="p-4 flex items-center gap-3 border-b" style={{ borderColor: 'var(--border-primary)', background: 'var(--accent-soft)' }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: 'var(--accent)' }}>
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Heritage Companion</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Online | Backend Automation Engine</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${m.role === 'user'
                                        ? 'bg-accent text-white rounded-tr-none'
                                        : 'bg-secondary text-primary rounded-tl-none border border-primary/10'
                                        }`}
                                        style={m.role === 'user' ? { background: 'var(--accent)' } : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                                        {m.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="bg-secondary p-3 rounded-2xl rounded-tl-none flex gap-2 items-center" style={{ background: 'var(--bg-secondary)' }}>
                                        <Loader2 size={14} className="animate-spin text-accent" style={{ color: 'var(--accent)' }} />
                                        <span className="text-[10px] italic" style={{ color: 'var(--text-tertiary)' }}>Chanting in the ether...</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t" style={{ borderColor: 'var(--border-primary)', background: 'var(--bg-secondary)' }}>
                            <div className="flex gap-2 bg-white rounded-2xl p-1 shadow-sm border" style={{ borderColor: 'var(--border-primary)', background: 'var(--bg-primary)' }}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask anything about heritage or wellness..."
                                    className="flex-1 bg-transparent px-3 py-2 text-xs focus:outline-none"
                                    style={{ color: 'var(--text-primary)' }}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="p-2 rounded-xl text-white disabled:opacity-50 transition-all"
                                    style={{ background: 'var(--accent)' }}
                                >
                                    <Send size={16} />
                                </motion.button>
                            </div>
                            <p className="text-[9px] text-center mt-2" style={{ color: 'var(--text-tertiary)' }}>
                                Automation Engine • Intent Detection • AI Processing
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;

