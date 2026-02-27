import React, { useState, useEffect } from 'react';
import { getCommunityPosts, createPost, likePost, getGuides, getEvents } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Reveal, Stagger } from '../components/Reveal';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import {
    MessageSquare, Eye, Heart, User as UserIcon,
    Calendar, Clock, Lock, Plus, X,
    ShieldCheck, Sparkles, Send
} from 'lucide-react';

const MOCK_POSTS = [
    {
        id: 'm1',
        title: "The significance of morning chants",
        content: "I've been starting my day with 108 chants of 'Om' and noticed a profound shift in my energy levels. Does anyone else feel the same?",
        author: "Aravind K.",
        likes: 24,
        replies: 8,
        views: 156,
        createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
        id: 'm2',
        title: "Lost scriptures found in Hampi?",
        content: "Heard some rumors about recent excavations revealing minor inscriptions. Anyone has more details on this archaeology update?",
        author: "Meera Iyer",
        likes: 15,
        replies: 12,
        views: 89,
        createdAt: new Date(Date.now() - 86400000).toISOString()
    }
];

const MOCK_GUIDES = [
    { name: "Swami Viveka", specialty: "Vedic Philosophy", status: "online" },
    { name: "Dr. Anjali", specialty: "Ayurvedic Wellness", status: "away" },
    { name: "Vijay Sharma", specialty: "Heritage Architecture", status: "online" }
];

const MOCK_EVENTS = [
    { title: "Ganga Aarti Live Stream", date: "Today, 6:00 PM" },
    { title: "Yoga for Inner Peace Webinar", date: "Tomorrow, 7:00 AM" },
    { title: "Hampi Virtual Tour", date: "Sunday, 10:00 AM" }
];

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewPost, setShowNewPost] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [posting, setPosting] = useState(false);
    const [guides, setGuides] = useState([]);
    const [events, setEvents] = useState([]);
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const [postsRes, guidesRes, eventsRes] = await Promise.all([
                getCommunityPosts(),
                getGuides(),
                getEvents()
            ]);

            setPosts(Array.isArray(postsRes.data) && postsRes.data.length > 0 ? postsRes.data : MOCK_POSTS);
            setGuides(Array.isArray(guidesRes.data) && guidesRes.data.length > 0 ? guidesRes.data : MOCK_GUIDES);
            setEvents(Array.isArray(eventsRes.data) && eventsRes.data.length > 0 ? eventsRes.data : MOCK_EVENTS);
        } catch (err) {
            console.error('Failed to fetch data:', err);
            // Fallback on error too
            setPosts(MOCK_POSTS);
            setGuides(MOCK_GUIDES);
            setEvents(MOCK_EVENTS);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newContent.trim()) return;
        setPosting(true);
        try {
            await createPost({
                title: newTitle,
                content: newContent,
                author: user?.name || 'Guardian'
            });
            setNewTitle('');
            setNewContent('');
            setShowNewPost(false);
            await fetchPosts();
        } catch (err) {
            alert(err.message || 'Failed to create post');
        } finally {
            setPosting(false);
        }
    };

    const handleLike = async (id) => {
        try {
            const updated = await likePost(id);
            setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: updated.data.likes } : p));
        } catch (err) {
            console.error('Failed to like post:', err);
        }
    };

    const timeAgo = (dateStr) => {
        if (!dateStr) return '';
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        const days = Math.floor(hrs / 24);
        return `${days}d ago`;
    };

    return (
        <section id="page-community" className="page active block opacity-100" aria-label="Community Square">
            <div className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs />

                    {/* Header */}
                    <Reveal className="text-center mb-16 mt-8">
                        <span className="inline-block px-4 py-1 rounded-full bg-heritage-teal/20 text-heritage-tealLight font-bold text-xs uppercase tracking-widest mb-6">Community Square</span>
                        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[var(--fg)] mb-6">Connections & Conversations</h1>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto text-lg leading-relaxed">
                            Join a vibrant community of heritage guardians and seekers. Share your journey, ask questions, and discover timeless wisdom together.
                        </p>
                    </Reveal>

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Discussions List */}
                        <div className="lg:col-span-2">
                            <Card className="p-0 overflow-hidden !rounded-[32px] border-[var(--border)] shadow-xl" animate={false}>
                                <div className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-gradient-to-r from-[var(--bg)]/10 to-transparent">
                                    <h3 className="font-display text-2xl font-bold text-[var(--fg)] flex items-center gap-3">
                                        <MessageSquare className="text-heritage-teal w-6 h-6" />
                                        Recent Discussions
                                    </h3>
                                    {isAuthenticated ? (
                                        <Button
                                            variant={showNewPost ? 'secondary' : 'primary'}
                                            size="sm"
                                            onClick={() => setShowNewPost(!showNewPost)}
                                            leftIcon={showNewPost ? X : Plus}
                                            className={showNewPost ? '' : 'bg-heritage-teal hover:bg-heritage-tealLight'}
                                        >
                                            {showNewPost ? 'Cancel' : 'New Topic'}
                                        </Button>
                                    ) : (
                                        <div className="text-xs font-bold text-heritage-teal flex items-center gap-2 px-4 py-2 bg-heritage-teal/10 rounded-full">
                                            <Lock className="w-3 h-3" /> Log in to join community
                                        </div>
                                    )}
                                </div>

                                {/* New Post Form */}
                                {showNewPost && (
                                    <div className="p-8 bg-heritage-teal/5 border-b border-[var(--border)] animate-in slide-in-from-top duration-500">
                                        <form onSubmit={handleCreatePost} className="space-y-6">
                                            <Input
                                                placeholder="Topic title..."
                                                value={newTitle}
                                                onChange={(e) => setNewTitle(e.target.value)}
                                                icon={Sparkles}
                                                required
                                            />
                                            <Input
                                                as="textarea"
                                                placeholder="Share your thoughts with the community..."
                                                value={newContent}
                                                onChange={(e) => setNewContent(e.target.value)}
                                                icon={MessageSquare}
                                                rows={4}
                                                required
                                            />
                                            <div className="flex justify-end">
                                                <Button type="submit" disabled={posting} rightIcon={Send} className="bg-heritage-teal hover:bg-heritage-tealLight">
                                                    {posting ? 'Publishing...' : 'Publish Post'}
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-32 gap-6">
                                        <div className="w-12 h-12 border-4 border-heritage-teal/20 border-t-heritage-teal rounded-full animate-spin"></div>
                                        <p className="text-lg text-[var(--muted)] font-display italic">Gathering the tribe...</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-[var(--border)]">
                                        {posts.length > 0 ? posts.map(d => (
                                            <div key={d.id} className="p-8 hover:bg-heritage-teal/5 transition-all cursor-pointer group relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-heritage-teal scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                                                <h4 className="font-display text-2xl font-bold text-[var(--fg)] mb-3 group-hover:text-heritage-teal transition-colors">{d.title}</h4>
                                                {d.content && <p className="text-[var(--muted)] mb-6 line-clamp-2 leading-relaxed text-lg">{d.content}</p>}
                                                <div className="flex flex-wrap items-center gap-6 text-sm">
                                                    <span className="flex items-center gap-2 font-bold text-[var(--fg)] bg-[var(--bg)] px-3 py-1 rounded-lg">
                                                        <UserIcon className="w-4 h-4 text-heritage-teal" /> {d.author}
                                                    </span>
                                                    <div className="flex items-center gap-6 text-[var(--muted)]/60">
                                                        <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {d.replies || 0}</span>
                                                        <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {d.views || 0}</span>
                                                        <button
                                                            className="flex items-center gap-1.5 hover:text-red-500 transition-colors group/like"
                                                            onClick={(e) => { e.stopPropagation(); handleLike(d.id); }}
                                                        >
                                                            <Heart className={`w-4 h-4 ${d.likes > 0 ? 'fill-red-500 text-red-500' : 'group-hover/like:text-red-500'}`} /> {d.likes || 0}
                                                        </button>
                                                    </div>
                                                    <span className="ml-auto text-heritage-teal/60 font-bold flex items-center gap-2">
                                                        <Clock className="w-3 h-3" /> {timeAgo(d.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="p-20 text-center">
                                                <Sparkles className="w-12 h-12 text-heritage-teal/30 mx-auto mb-4" />
                                                <p className="text-[var(--muted)] font-display text-xl">The winds are quiet today. Be the first to start a conversation!</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            {/* Active Guides */}
                            <Card className="p-8 !rounded-[32px] border-[var(--border)] shadow-xl" animate={true}>
                                <h3 className="font-display text-2xl font-bold text-[var(--fg)] mb-8 flex items-center gap-2">
                                    <ShieldCheck className="text-heritage-teal w-6 h-6" />
                                    Active Guides
                                </h3>
                                <div className="space-y-6">
                                    {guides.map((g, i) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-heritage-teal to-heritage-green relative p-0.5">
                                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-heritage-teal text-xl">
                                                    {g.name?.charAt(0)}
                                                </div>
                                                <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${g.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'} border-4 border-white shadow-sm`}></span>
                                            </div>
                                            <div>
                                                <div className="font-bold text-[var(--fg)] group-hover:text-heritage-teal transition-colors">{g.name}</div>
                                                <div className="text-xs text-[var(--muted)] font-medium uppercase tracking-wider">{g.specialty}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Upcoming Events */}
                            <Card variant="glass" className="p-8 !rounded-[32px] border-[var(--border)] shadow-xl" animate={true}>
                                <h3 className="font-display text-2xl font-bold text-[var(--fg)] mb-8 flex items-center gap-2">
                                    <Calendar className="text-heritage-gold w-6 h-6" />
                                    Heritage Events
                                </h3>
                                <div className="space-y-6">
                                    {events.map((e, i) => (
                                        <div key={i} className="p-5 rounded-2xl bg-white/40 border border-white/20 hover:border-heritage-gold/30 transition-all group">
                                            <div className="font-bold text-[var(--fg)] mb-2 group-hover:text-heritage-gold transition-colors">{e.title}</div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-heritage-gold uppercase tracking-widest">
                                                <Clock className="w-3 h-3" />
                                                {e.date}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="secondary" className="w-full mt-8 !border-heritage-gold/20 text-heritage-gold">
                                    Calendar View
                                </Button>
                            </Card>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Community;
