import React, { useState, useEffect } from 'react';
import { getCommunityPosts, createPost, likePost, getGuides, getEvents } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Reveal } from '../components/Reveal';

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewPost, setShowNewPost] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [posting, setPosting] = useState(false);
    const [guides, setGuides] = useState([]);
    const [events, setEvents] = useState([]);
    const { isAuthenticated } = useAuth();

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
            setPosts(Array.isArray(postsRes.data) ? postsRes.data : []);
            setGuides(Array.isArray(guidesRes.data) ? guidesRes.data : []);
            setEvents(Array.isArray(eventsRes.data) ? eventsRes.data : []);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newContent.trim()) return;
        setPosting(true);
        try {
            await createPost({ title: newTitle, content: newContent, author: 'User' }); // Hardcoded author for now
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
            // Assuming updated.data returns the updated post or we reload
            setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: updated.data.likes } : p));
        } catch (err) {
            console.error('Failed to like post:', err);
        }
    };

    const timeAgo = (dateStr) => {
        if (!dateStr) return '';
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins} min ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs} hours ago`;
        const days = Math.floor(hrs / 24);
        return `${days} days ago`;
    };

    return (
        <section id="page-community" className="page active block opacity-100">
            <div className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <Reveal className="text-center mb-12">
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--fg)] mb-4">Community</h1>
                        <p className="text-[var(--muted)] max-w-2xl mx-auto">
                            Connect with fellow culture enthusiasts, share experiences, and learn together.
                        </p>
                    </Reveal>

                    {/* Content */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Discussions List */}
                        <div className="lg:col-span-2">
                            <Reveal className="heritage-card">
                                <div className="p-6 border-b border-[var(--border)] flex justify-between items-center">
                                    <h3 className="font-display text-xl font-bold text-[var(--fg)]">Recent Discussions</h3>
                                    {isAuthenticated ? (
                                        <button className="btn-primary text-sm py-2 px-4" onClick={() => setShowNewPost(!showNewPost)}>
                                            {showNewPost ? 'Cancel' : 'New Topic'}
                                        </button>
                                    ) : (
                                        <span className="text-xs text-[var(--muted)]">Log in to post</span>
                                    )}
                                </div>

                                {/* New Post Form */}
                                {showNewPost && (
                                    <form onSubmit={handleCreatePost} className="p-6 border-b border-[var(--border)] bg-[var(--border)]/10">
                                        <input
                                            type="text"
                                            placeholder="Discussion title..."
                                            className="search-input mb-3"
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            required
                                        />
                                        <textarea
                                            placeholder="Share your thoughts..."
                                            className="search-input min-h-[100px] resize-y"
                                            value={newContent}
                                            onChange={(e) => setNewContent(e.target.value)}
                                            required
                                        />
                                        <div className="flex justify-end mt-3">
                                            <button type="submit" className="btn-primary text-sm py-2 px-6" disabled={posting}>
                                                {posting ? 'Posting...' : 'Post'}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {loading ? (
                                    <div className="flex justify-center py-12">
                                        <div className="w-8 h-8 border-4 border-heritage-gold/30 border-t-heritage-gold rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-[var(--border)]">
                                        {(Array.isArray(posts) ? posts : []).map(d => (
                                            <div key={d.id} className="p-6 hover:bg-[var(--border)]/20 transition-colors cursor-pointer">
                                                <h4 className="font-medium text-[var(--fg)] mb-2">{d.title}</h4>
                                                {d.content && <p className="text-sm text-[var(--muted)] mb-3">{d.content}</p>}
                                                <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                                                    <span>by {d.author}</span>
                                                    <span>{d.replies} replies</span>
                                                    <span>{d.views} views</span>
                                                    <button
                                                        className="flex items-center gap-1 hover:text-heritage-gold transition-colors"
                                                        onClick={(e) => { e.stopPropagation(); handleLike(d.id); }}
                                                    >
                                                        ♥ {d.likes || 0}
                                                    </button>
                                                    <span className="text-heritage-gold">{timeAgo(d.createdAt)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Reveal>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Active Members */}
                            <Reveal className="heritage-card p-6">
                                <h3 className="font-display text-lg font-bold text-[var(--fg)] mb-4">Active Guides</h3>
                                <div className="space-y-4">
                                    {(Array.isArray(guides) ? guides : []).map((g, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-heritage-teal to-heritage-green relative">
                                                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${g.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'} border-2 border-[var(--card)]`}></span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-[var(--fg)] text-sm">{g.name}</div>
                                                <div className="text-xs text-[var(--muted)]">{g.specialty}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>

                            {/* Upcoming Events */}
                            <Reveal className="heritage-card p-6">
                                <h3 className="font-display text-lg font-bold text-[var(--fg)] mb-4">Upcoming Events</h3>
                                <div className="space-y-4">
                                    {(Array.isArray(events) ? events : []).map((e, i) => (
                                        <div key={i} className="p-3 rounded-lg bg-[var(--border)]/10">
                                            <div className="font-medium text-[var(--fg)] text-sm">{e.title}</div>
                                            <div className="text-xs text-heritage-gold mt-1">{e.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Community;
