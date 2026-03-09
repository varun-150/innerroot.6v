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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, duration: 0.5 }}
        className="p-6 rounded-3xl border border-primary bg-card hover:shadow-xl transition-all duration-300"
    >
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                {(author || 'A')[0]}
            </div>
            <div>
                <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{author || 'Anonymous'}</div>
                <div className="text-[10px] opacity-40 uppercase tracking-widest">{new Date(createdAt || Date.now()).toLocaleDateString()}</div>
            </div>
        </div>
        {title && <h4 className="font-bold mb-2">{title}</h4>}
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{content}</p>
        <div className="flex items-center gap-4 pt-4 border-t border-primary">
            <button onClick={() => communityAPI.likePost(id).catch(console.error)} className="flex items-center gap-1.5 text-xs hover:text-accent transition-colors">
                <Heart size={14} className="opacity-40" /> {likes || 0}
            </button>
            <button className="flex items-center gap-1.5 text-xs hover:text-accent transition-colors">
                <MessageCircle size={14} className="opacity-40" /> 0
            </button>
            <div className="flex-1" />
            <button className="text-[10px] font-bold uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Share</button>
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
            <section ref={heroRef} className="relative overflow-hidden section-padding" style={{ paddingBottom: 'var(--sp-12)' }}>
                <div className="sacred-geometry" style={{ opacity: 0.02 }} />
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(124,58,237,0.08)', color: '#7c3aed' }}>
                            <Users size={14} /> Community Hub
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5" style={{ fontFamily: 'var(--font-display)' }}>
                            Join the <span className="text-gradient">Circle of Seekers</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Connect with a global community dedicated to heritage, mindfulness, and conscious living.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Tabs */}
            <section ref={contentRef} className="section-padding" style={{ paddingTop: 0 }}>
                <div className="max-w-5xl mx-auto px-6">
                    {/* Search & Tab Selection Combined */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                        <div className="flex items-center p-1 rounded-2xl bg-secondary border border-primary w-full md:w-auto">
                            {['events', 'circles', 'feed'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab ? 'bg-accent text-white shadow-lg shadow-accent-glow' : 'text-tertiary hover:text-primary'}`}
                                >
                                    {tab === 'events' ? <Calendar size={16} /> : tab === 'circles' ? <Users size={16} /> : <MessageCircle size={16} />}
                                    <span className="capitalize">{tab}</span>
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full md:w-80">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-secondary border border-primary rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {filteredEvents.map((event, i) => (
                                        <motion.div
                                            key={event.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08, duration: 0.5 }}
                                            className="group rounded-3xl p-6 border border-primary bg-card hover:border-accent transition-all duration-300"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full" style={{ background: `${event.color}12`, color: event.color }}>
                                                    {event.category}
                                                </span>
                                                <div className="w-8 h-8 rounded-full border border-primary flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                                                    {rsvpd[event.title] === 'confirmed' ? <Check size={14} className="text-success" /> : <Plus size={14} />}
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                                                {event.title}
                                            </h3>

                                            <div className="flex flex-col gap-2 mb-5">
                                                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                    <Calendar size={12} className="opacity-40" /> {event.date} · {event.time}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                    <MapPin size={12} className="opacity-40" /> Online via Inner Root Circle
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-2xl bg-secondary mb-5">
                                                <div className="text-[10px] font-bold uppercase tracking-tighter opacity-40 mb-1">Facilitated by</div>
                                                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{event.facilitator}</div>
                                                <div className="text-[11px] leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{event.bio}</div>
                                            </div>

                                            <button
                                                onClick={() => handleRSVP(event.title)}
                                                disabled={rsvpd[event.title] === 'confirmed' || rsvpd[event.title] === 'joining'}
                                                className={`btn w-full btn-sm flex items-center justify-center gap-2 ${rsvpd[event.title] === 'confirmed' ? 'btn-secondary text-success border-success/30' : 'btn-primary'}`}
                                            >
                                                {rsvpd[event.title] === 'joining' ? 'Joining...' : rsvpd[event.title] === 'confirmed' ? <><Check size={14} /> RSVP Confirmed</> : <>Join Event <ArrowRight size={14} /></>}
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Circles Tab */}
                            {activeTab === 'circles' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {filteredCircles.map((circle, i) => (
                                        <motion.div
                                            key={circle.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08, duration: 0.5 }}
                                            className="group rounded-3xl p-6 border border-primary bg-card hover:border-accent transition-all duration-300"
                                        >
                                            <div className="flex items-start gap-5 mb-5">
                                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                                                    <circle.icon size={28} />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                                                        {circle.name}
                                                    </h3>
                                                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{circle.desc}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mb-6 px-1">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold uppercase opacity-40 mb-0.5">Circle Lead</span>
                                                    <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{circle.facilitator}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-bold uppercase opacity-40 mb-0.5">Active</span>
                                                    <div className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{circle.members} Seekers</div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleRSVP(circle.name)}
                                                disabled={rsvpd[circle.name] === 'confirmed' || rsvpd[circle.name] === 'joining'}
                                                className={`btn w-full btn-sm flex items-center justify-center gap-2 ${rsvpd[circle.name] === 'confirmed' ? 'btn-secondary text-success border-success/30' : 'btn-primary'}`}
                                            >
                                                {rsvpd[circle.name] === 'joining' ? 'Joining...' : rsvpd[circle.name] === 'confirmed' ? <><Check size={14} /> Circle Joined</> : <>Join Circle <Plus size={14} /></>}
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
