import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Users, Calendar, MessageCircle, Heart,
    Clock, MapPin, ArrowRight, Star, Sparkles,
    Search, Check, Plus
} from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useAuth } from '../hooks/useAuth';
import SEO from '../components/ui/SEO';
import { eventAPI, communityAPI } from '../services/api';

const events = [
    { title: 'Full Moon Meditation', date: 'March 14, 2026', time: '7:00 PM', attendees: 128, category: 'Meditation', color: '#d97706', facilitator: 'Swami Atmananda', bio: 'Certified meditation teacher with 20+ years of experience in Vedic chanting.' },
    { title: 'Bhakti Music Evening', date: 'March 18, 2026', time: '6:30 PM', attendees: 85, category: 'Bhakti', color: '#7c3aed', facilitator: 'Riya Sharma', bio: 'Classical vocalist and bhakti music researcher.' },
    { title: 'Heritage Walk: Old Delhi', date: 'March 22, 2026', time: '9:00 AM', attendees: 42, category: 'Heritage', color: '#14532d', facilitator: 'Arjun Verma', bio: 'Historian and lead researcher at Inner Root.' },
    { title: 'Mindfulness Workshop', date: 'March 25, 2026', time: '5:00 PM', attendees: 64, category: 'Wellness', color: '#c9a227', facilitator: 'Dr. Meera Rao', bio: 'Clinical psychologist specializing in mindfulness-based stress reduction.' },
];

const circles = [
    { name: 'Seekers of Shanti', members: 342, desc: 'A circle dedicated to peaceful living and daily meditation rituals.', icon: Heart, facilitator: 'Mantra Devi' },
    { name: 'Heritage Explorers', members: 218, desc: 'Discover India\'s rich cultural tapestry and lost architectural wonders.', icon: MapPin, facilitator: 'Vikram Singh' },
    { name: 'Bhakti Sangam', members: 156, desc: 'Devotional music, chanting, and spiritual connections through sound.', icon: Sparkles, facilitator: 'Pt. Shivam' },
    { name: 'Mindful Warriors', members: 289, desc: 'Practical mindfulness strategies for modern everyday challenges.', icon: Star, facilitator: 'Coach Anjali' },
];

const FeedItem = ({ title, author, createdAt, content, likes, id, i }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
        className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 group relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
            <Sparkles size={24} className="text-accent" />
        </div>
        
        <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center font-display font-black text-accent text-xl">
                {(author || 'A')[0]}
            </div>
            <div>
                <div className="text-sm font-heading font-black uppercase tracking-widest text-white">{author || 'Anonymous'}</div>
                <div className="text-[10px] text-white/40 uppercase font-bold tracking-[0.2em]">{new Date(createdAt || Date.now()).toLocaleDateString()}</div>
            </div>
        </div>
        
        {title && <h4 className="text-xl font-display font-black mb-4 tracking-tight uppercase group-hover:text-accent transition-colors">{title}</h4>}
        <p className="text-sm leading-relaxed text-white/50 mb-8 font-sans">{content}</p>
        
        <div className="flex items-center gap-6 pt-6 border-t border-white/5">
            <button onClick={() => communityAPI.likePost(id).catch(console.error)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-accent transition-all">
                <Heart size={14} className={likes > 0 ? "fill-accent text-accent" : ""} /> {likes || 0} RESONANCE
            </button>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-accent transition-all">
                <MessageCircle size={14} /> 0 CHRONICLES
            </button>
            <div className="flex-1" />
            <button className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/40 hover:text-accent transition-all">SHARE RADIANCE</button>
        </div>
    </motion.div>
);

const Community = () => {
    const { user } = useAuth();
    const [dynamicEvents, setDynamicEvents] = useState([]);
    const [feedPosts, setFeedPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [activeTab, setActiveTab] = useState('events');
    const [searchQuery, setSearchQuery] = useState('');
    const [rsvpd, setRsvpd] = useState({}); // Tracking RSVPs by title
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const contentInView = useInView(contentRef, { once: true, margin: '-80px' });

    useEffect(() => {
        eventAPI.getAll()
            .then(data => {
                if (data) setDynamicEvents(data);
            })
            .catch(err => console.error("Failed to fetch events:", err));

        communityAPI.getPosts()
            .then(data => setFeedPosts(data))
            .catch(err => console.error("Failed to fetch posts:", err));
    }, []);

    useWebSocket('/topic/community/posts', (newPost) => {
        setFeedPosts(prev => {
            if (prev.some(p => p.id === newPost.id)) return prev;
            return [newPost, ...prev];
        });
    });

    useWebSocket('/topic/community/likes', (updatedPost) => {
        setFeedPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
    });

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPostTitle.trim() || !newPostContent.trim()) return;
        setIsSubmitting(true);
        try {
            await communityAPI.createPost(newPostTitle, newPostContent);
            setNewPostTitle('');
            setNewPostContent('');
        } catch (err) {
            console.error("Failed to create post", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const allEvents = [...dynamicEvents, ...events.filter(staticEvt =>
        !dynamicEvents.some(dyn => dyn.title === staticEvt.title)
    )];

    const filteredEvents = allEvents.filter(e =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRSVP = (title) => {
        setRsvpd(prev => ({ ...prev, [title]: 'joining' }));
        setTimeout(() => {
            setRsvpd(prev => ({ ...prev, [title]: 'confirmed' }));
        }, 1200);
    };

    const filteredCircles = circles.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const feedItems = [
        { user: 'Siddharth M.', time: '2h ago', type: 'Heritage Discovery', content: 'Just visited the Brihadisvara Temple. The granite masonry is mind-blowing. Does anyone know how they lifted the 80-ton capstone?', likes: 24, comments: 12 },
        { user: 'Elena Grace', time: '5h ago', type: 'Wellness Choice', content: 'Tried the Full Moon Meditation recommended by the AI today. Feel remarkably more grounded. Highly recommend the 20-min session!', likes: 45, comments: 8 },
        { user: 'Rahul Varma', time: 'Yesterday', type: 'Community Event', content: 'Great session on Bhakti Music with Riya last night. Looking forward to the next walk in Old Delhi.', likes: 18, comments: 3 }
    ];

    return (
        <>
            <SEO title="Community — Inner Root" description="Join circles, events, and mindfulness sessions with our growing inner root community." />

            {/* Hero */}
                <div className="max-w-7xl mx-auto px-6 pt-10 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                        <span className="text-accent font-black uppercase text-[10px] tracking-[0.6em] mb-12 block">
                            Circle of Seekers
                        </span>
                        
                        <h1 className="text-6xl md:text-[8rem] font-display font-black leading-[0.8] mb-16 tracking-tighter">
                            COMMUNITY <br/> OF LIGHT
                        </h1>
                        
                        <p className="text-base sm:text-lg max-w-2xl mx-auto opacity-40 font-heading uppercase tracking-widest leading-loose">
                            Connect with a global collective dedicated to heritage, mindfulness, and the alchemy of conscious living.
                        </p>
                    </motion.div>
                </div>

            {/* Tabs */}
            <section ref={contentRef} className="section-padding" style={{ paddingTop: 0 }}>
                <div className="max-w-5xl mx-auto px-6">
                    {/* Search & Tab Selection Combined */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 bg-[#0a0a0a]/80 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-white/5">
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                            {['events', 'circles', 'feed'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-5 rounded-2xl whitespace-nowrap font-heading font-black uppercase text-[10px] tracking-widest transition-all ${
                                        activeTab === tab 
                                        ? 'bg-accent text-obsidian-pure shadow-[0_10px_30px_rgba(217,119,6,0.3)]' 
                                        : 'bg-white/5 text-white/40 hover:bg-white/10'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-96">
                            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-sm focus:outline-none focus:border-accent/40 font-heading text-white placeholder:text-white/20"
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Events Tab */}
                            {activeTab === 'events' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {filteredEvents.map((event, i) => (
                                        <motion.div
                                            key={event.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                            className="group relative rounded-[2.5rem] p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-accent/20 transition-all duration-500 overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 group-hover:translate-x-0">
                                                <Sparkles size={24} className="text-accent" />
                                            </div>

                                            <div className="flex justify-between items-start mb-8">
                                                <span className="text-[10px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent">
                                                    {event.category}
                                                </span>
                                                <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${rsvpd[event.title] === 'confirmed' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'group-hover:border-accent/40 text-white/20 group-hover:text-accent'}`}>
                                                    {rsvpd[event.title] === 'confirmed' ? <Check size={18} /> : <Plus size={18} />}
                                                </div>
                                            </div>

                                            <h3 className="text-3xl font-display font-black mb-4 tracking-tight uppercase group-hover:text-accent transition-colors">
                                                {event.title}
                                            </h3>

                                            <div className="flex flex-col gap-3 mb-8">
                                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                                                    <Calendar size={14} className="text-accent/40" /> {event.date} · {event.time}
                                                </div>
                                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                                                    <MapPin size={14} className="text-accent/40" /> Online · Sentient Core
                                                </div>
                                            </div>

                                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 mb-8">
                                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/40 mb-2">Facilitator</div>
                                                <div className="text-sm font-heading font-black uppercase tracking-widest text-white mb-2">{event.facilitator}</div>
                                                <div className="text-[11px] leading-relaxed text-white/30">{event.bio}</div>
                                            </div>

                                            <button
                                                onClick={() => handleRSVP(event.title)}
                                                disabled={rsvpd[event.title] === 'confirmed' || rsvpd[event.title] === 'joining'}
                                                className={`w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] transition-all ${
                                                    rsvpd[event.title] === 'confirmed' 
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                                    : 'bg-accent text-obsidian-pure hover:scale-[1.02] active:scale-[0.98]'
                                                }`}
                                            >
                                                {rsvpd[event.title] === 'joining' ? 'Aligning Resonance...' : rsvpd[event.title] === 'confirmed' ? 'Resonance Confirmed' : 'Sync with Circle'}
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Circles Tab */}
                            {activeTab === 'circles' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {filteredCircles.map((circle, i) => (
                                        <motion.div
                                            key={circle.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                            className="group relative rounded-[2.5rem] p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-accent/20 transition-all duration-500"
                                        >
                                            <div className="flex items-start gap-6 mb-8">
                                                <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 bg-accent/10 border border-accent/20 text-accent">
                                                    <circle.icon size={32} />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-2xl font-display font-black mb-2 tracking-tight uppercase group-hover:text-accent transition-colors">
                                                        {circle.name}
                                                    </h3>
                                                    <p className="text-xs leading-relaxed text-white/40 font-sans">{circle.desc}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mb-8 px-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/40 mb-1">Circle Lead</span>
                                                    <span className="text-xs font-heading font-black uppercase text-white tracking-widest">{circle.facilitator}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/40 mb-1">Active</span>
                                                    <div className="text-xs font-heading font-black uppercase text-accent tracking-widest">{circle.members} Seekers</div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleRSVP(circle.name)}
                                                disabled={rsvpd[circle.name] === 'confirmed' || rsvpd[circle.name] === 'joining'}
                                                className={`w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] transition-all ${
                                                    rsvpd[circle.name] === 'confirmed' 
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                                    : 'bg-accent text-obsidian-pure hover:scale-[1.02] active:scale-[0.98]'
                                                }`}
                                            >
                                                {rsvpd[circle.name] === 'joining' ? 'Initiating...' : rsvpd[circle.name] === 'confirmed' ? 'Initiated' : 'Request Initiation'}
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Feed Tab */}
                            {activeTab === 'feed' && (
                                <div className="max-w-2xl mx-auto space-y-6">
                                    {/* Create Post Form */}
                                    {user ? (
                                        <form onSubmit={handleCreatePost} className="p-6 rounded-3xl border border-primary bg-card mb-8">
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                value={newPostTitle}
                                                onChange={e => setNewPostTitle(e.target.value)}
                                                className="w-full bg-secondary border border-primary rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all mb-4"
                                                required
                                            />
                                            <textarea
                                                placeholder="Share your thoughts with the community..."
                                                value={newPostContent}
                                                onChange={e => setNewPostContent(e.target.value)}
                                                className="w-full bg-secondary border border-primary rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all mb-4"
                                                rows="3"
                                                required
                                            ></textarea>
                                            <div className="flex justify-end">
                                                <button type="submit" disabled={isSubmitting} className="btn w-fit px-8 py-2 rounded-xl text-sm font-semibold whitespace-nowrap" style={{ background: 'var(--accent)', color: 'white' }}>
                                                    {isSubmitting ? 'Posting...' : 'Post'}
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="p-6 rounded-3xl border border-primary bg-secondary mb-8 text-center text-sm opacity-70">
                                            Please log in to share your thoughts with the community.
                                        </div>
                                    )}

                                    {/* Posts List */}
                                    {feedPosts.map((item, i) => (
                                        <FeedItem key={item.id} {...item} i={i} />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
};

export default Community;
