import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, Database, Shield, Search, Plus, Trash2, 
    RefreshCw, X, Menu, Bell, ChevronRight, 
    ClipboardList, Package, LayoutDashboard, UserCircle, ShoppingBag,
    ListTodo, Command
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import SEO from '../components/ui/SEO';

const AdminDashboard = () => {
    const { user: currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [explorerType, setExplorerType] = useState('heritage');
    const [explorerData, setExplorerData] = useState([]);
    
    // UI States
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userForm, setUserForm] = useState({ name: '', email: '', role: 'USER' });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {
        if (activeTab === 'content') {
            fetchExplorerData();
        }
    }, [explorerType, activeTab]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [uData, sData] = await Promise.all([
                adminAPI.getUsers(),
                adminAPI.getStats()
            ]);
            setUsers(uData);
            setStats(sData || {});
        } catch (err) {
            console.error('Failed to load system data');
        } finally {
            setLoading(false);
        }
    };

    const fetchExplorerData = async () => {
        try {
            setLoading(true);
            const data = await adminAPI.getEntities(explorerType);
            setExplorerData(data);
        } catch (err) {
            console.error('Data pull failed');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await adminAPI.toggleUserStatus(id);
            setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
        } catch (err) { alert('Status synchronization failed'); }
    };

    const handleUpdateRole = async (id, currentRole) => {
        const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
        try {
            await adminAPI.updateUserRole(id, newRole);
            setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
        } catch (err) { alert('Clearance update failed'); }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to terminate this identity?')) return;
        try {
            await adminAPI.deleteUser(id);
            setUsers(users.filter(u => u.id !== id));
        } catch (err) { alert('Termination failed'); }
    };

    const handleSaveUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (editingUser) await adminAPI.updateUser(editingUser.id, userForm);
            else await adminAPI.addUser(userForm);
            setIsUserModalOpen(false);
            fetchDashboardData();
        } catch (err) { alert('Failed to save user'); }
        finally { setLoading(false); }
    };

    const handleResetPassword = async (id, email) => {
        if (!window.confirm(`Reset password for ${email}?`)) return;
        try { await adminAPI.resetPassword(id); alert('Password reset to InnerRoot2026!'); }
        catch (err) { alert('Reset failed'); }
    };

    const handleOpenUserModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setUserForm({ name: user.name, email: user.email, role: user.role });
        } else {
            setEditingUser(null);
            setUserForm({ name: '', email: '', role: 'USER' });
        }
        setIsUserModalOpen(true);
    };

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'projects', label: 'Projects', icon: ClipboardList },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'accounts', label: 'Accounts', icon: UserCircle },
        { id: 'tasks', label: 'Tasks', icon: ListTodo },
    ];

    return (
        <div className="flex min-h-screen bg-[#050604] font-sans selection:bg-[#D4AF37]/20 text-[#F0EEE8]">
            <SEO title="Admin — Inner Root Console" description="Spiritual intelligence administrative control." />

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0E100A] text-white transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 border-r border-white/5 overflow-y-auto`}>
                <div className="flex flex-col h-full">
                    <div className="p-8 flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center border border-[#D4AF37]/20 shadow-inner">
                            <Shield size={26} className="text-[#D4AF37]" />
                        </div>
                        <span className="text-2xl font-black uppercase tracking-tighter font-serif">INNER ROOT</span>
                    </div>

                    <nav className="flex-1 mt-6 px-4 space-y-2">
                        {sidebarItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold uppercase tracking-widest text-[10px] ${
                                    activeTab === item.id 
                                    ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' 
                                    : 'text-[#8E8C84] hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                                <span className="text-[15px]">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="p-6">
                        <button onClick={() => window.location.href='/'} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all">
                            <X size={20} />
                            <span>Exit</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <header className="h-24 bg-[#050604]/80 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-8 shrink-0">
                    <div className="flex items-center gap-6">
                        <button className="md:hidden p-2 text-slate-400" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Menu size={24} />
                        </button>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                            {activeTab} Protocol
                        </h2>
                    </div>

                    <div className="flex-1 max-w-xl mx-8 hidden sm:block">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search the protocol..." 
                                className="w-full h-12 bg-white/5 border border-white/5 rounded-full pl-14 pr-6 text-[13px] focus:ring-2 focus:ring-[#D4AF37]/20 focus:bg-white/10 transition-all outline-none text-[#F0EEE8]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-[#8E8C84] hover:bg-white/10 hover:text-white transition-all">
                            <Bell size={20} />
                            <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-[#D4AF37] rounded-full border-2 border-[#050604]"></span>
                        </button>
                        <div className="h-10 w-px bg-slate-100 mx-2 hidden md:block"></div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden md:block">
                                <p className="text-[14px] font-black text-white leading-tight uppercase tracking-tight">{currentUser?.name || "Initializing..."}</p>
                                <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mt-1">Super Admin</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-[#D4AF37] flex items-center justify-center text-black font-black text-lg shadow-lg shadow-[#D4AF37]/20 overflow-hidden">
                                {currentUser?.name?.charAt(0) || "I"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scroller Area */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {activeTab === 'dashboard' && (
                            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[
                                        { label: 'Sentient Users', value: stats?.totalUsers || 0, icon: Users, color: '#D4AF37' },
                                        { label: 'Heritage Sites', value: stats?.totalHeritageSites || 0, icon: ClipboardList, color: '#D4AF37' },
                                        { label: 'Active Events', value: stats?.totalEvents || 0, icon: Package, color: '#D4AF37' },
                                        { label: 'Protocol Nodes', value: stats?.totalWellnessContent || 0, icon: RefreshCw, type: 'action', color: '#000000' }
                                    ].map((stat, i) => (
                                        <div key={i} className={`p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between transition-all hover:scale-[1.02] cursor-pointer ${stat.type === 'action' ? 'bg-[#D4AF37] text-black shadow-xl shadow-[#D4AF37]/20' : 'bg-white/5 backdrop-blur-xl shadow-sm hover:shadow-md'}`}>
                                            <div>
                                                <p className={`text-[36px] font-black tracking-tighter ${stat.type === 'action' ? 'text-black' : 'text-white'}`}>{stat.value}</p>
                                                <p className={`text-[11px] font-black uppercase tracking-widest ${stat.type === 'action' ? 'text-black/60' : 'text-[#8E8C84]'}`}>{stat.label}</p>
                                            </div>
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.type === 'action' ? 'bg-black/10' : 'bg-white/5 border border-white/10'}`} style={{ color: stat.type === 'action' ? 'black' : stat.color }}>
                                                <stat.icon size={28} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Content Grid */}
                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                    <div className="xl:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-10 shadow-sm overflow-hidden flex flex-col">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Recent Synchronizations</h3>
                                            <button className="px-6 py-2.5 bg-[#D4AF37] text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 group/btn">
                                                Archive <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                            </button>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="border-b border-white/5 text-[#8E8C84] text-[10px] font-black uppercase tracking-[0.2em]">
                                                        <th className="py-4">Vessel Title</th>
                                                        <th className="py-4">Domain</th>
                                                        <th className="py-4">Resonance</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/[0.03]">
                                                    {[
                                                        { title: 'Vedic Mapping', dept: 'Neural Hub', status: 'optimal', color: '#D4AF37' },
                                                        { title: 'Soul Resonance', dept: 'Bio-Sync', status: 'aligning', color: '#8E8C84' },
                                                        { title: 'Ancestral Protocol', dept: 'Heritage', status: 'stable', color: '#D4AF37' },
                                                        { title: 'Mandala Genesis', dept: 'Generative', status: 'optimal', color: '#D4AF37' },
                                                        { title: 'Karmic Analytics', dept: 'Engine V1', status: 'aligning', color: '#8E8C84' }
                                                    ].map((row, i) => (
                                                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                                            <td className="py-5 text-[14px] font-bold text-white/90">{row.title}</td>
                                                            <td className="py-5 text-[14px] text-[#8E8C84] font-medium">{row.dept}</td>
                                                            <td className="py-5">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: row.color }}></div>
                                                                    <span className="text-[11px] font-black uppercase tracking-widest text-white/60">{row.status}</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-10 shadow-sm flex flex-col">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Active Vessels</h3>
                                            <button onClick={() => setActiveTab('customers')} className="px-6 py-2.5 bg-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2 group/btn">
                                                Registry <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                            </button>
                                        </div>
                                        <div className="space-y-6">
                                            {users.slice(0, 7).map((u, i) => (
                                                <div key={i} className="flex items-center justify-between group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-[#D4AF37]">
                                                            {u.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-white/90 leading-tight text-[14px]">{u.name}</p>
                                                            <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-wider mt-1">{u.role === 'ADMIN' ? 'Super Admin' : 'Explorer'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                        <button className="p-2 bg-white/5 text-[#8E8C84] hover:text-[#D4AF37] rounded-lg"><UserCircle size={16} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                         {activeTab === 'customers' && (
                            <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                <div className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-10 shadow-sm">
                                    <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
                                        <div>
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Manifested Identities</h3>
                                            <p className="text-[#8E8C84] font-medium text-sm mt-1">Manage sentient vessels and protocol clearances.</p>
                                        </div>
                                        <button onClick={() => handleOpenUserModal()} className="px-8 py-4 bg-[#D4AF37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-[#D4AF37]/20 flex items-center gap-3">
                                            <Plus size={20} /> Initiate Identity
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-white/5 text-[#8E8C84] text-[10px] font-black uppercase tracking-[0.3em]">
                                                <tr>
                                                    <th className="px-8 py-5 rounded-l-2xl">Identity</th>
                                                    <th className="px-8 py-5">Communication Path</th>
                                                    <th className="px-8 py-5 text-center">Clearance</th>
                                                    <th className="px-8 py-5 text-center">Resonance</th>
                                                    <th className="px-8 py-5 text-right rounded-r-2xl">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/[0.03] font-medium">
                                                {users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase())).map(u => (
                                                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-black text-[#D4AF37]">{u.name.charAt(0)}</div>
                                                                <span className="font-bold text-white/90">{u.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 text-[#8E8C84]">{u.email}</td>
                                                        <td className="px-8 py-6 text-center">
                                                            <button onClick={() => handleUpdateRole(u.id, u.role)} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${u.role === 'ADMIN' ? 'bg-[#D4AF37] text-black shadow-inner' : 'bg-white/5 text-white/40'}`}>
                                                                {u.role}
                                                            </button>
                                                        </td>
                                                        <td className="px-8 py-6 text-center">
                                                            <div className={`w-2 h-2 rounded-full mx-auto animate-pulse ${u.active !== false ? 'bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)]' : 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]'}`}></div>
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                                <button onClick={() => handleResetPassword(u.id, u.email)} title="Recall Protocol" className="p-2.5 bg-white/5 text-[#8E8C84] hover:text-[#D4AF37] hover:bg-white/10 rounded-xl"><RefreshCw size={18} /></button>
                                                                <button onClick={() => handleToggleStatus(u.id)} title="Shift Status" className="p-2.5 bg-white/5 text-[#8E8C84] hover:text-[#D4AF37] hover:bg-white/10 rounded-xl"><Shield size={18} /></button>
                                                                <button onClick={() => handleDeleteUser(u.id)} title="Terminate" className="p-2.5 bg-red-500/10 text-red-400 hover:text-red-500 hover:bg-red-500/20 rounded-xl"><Trash2 size={18} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'projects' && (
                            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-12 shadow-sm min-h-[600px] flex flex-col items-center justify-center text-center space-y-6">
                                <ClipboardList size={60} className="text-[#D4AF37] opacity-20" />
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Project Nexus</h3>
                                <p className="max-w-md text-[#8E8C84] font-medium leading-relaxed italic">The internal project vaults are currently being synchronized with the neural network. Check back shortly for full access.</p>
                                <button onClick={() => setActiveTab('dashboard')} className="px-8 py-3 bg-white/5 text-[#8E8C84] rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all border border-white/10">Return to Nexus</button>
                            </motion.div>
                        )}

                        {activeTab === 'inventory' && (
                            <motion.div key="inventory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-12 shadow-sm min-h-[600px] flex flex-col items-center justify-center text-center space-y-6">
                                <Package size={60} className="text-white/10" />
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Artifact Registry</h3>
                                <p className="max-w-md text-[#8E8C84] italic">Tracking physical assets and digital relics categorized under Inner Root registries.</p>
                            </motion.div>
                        )}

                        {activeTab === 'orders' && (
                            <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-12 shadow-sm min-h-[600px] flex flex-col items-center justify-center text-center space-y-6">
                                <ShoppingBag size={60} className="text-white/10" />
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Acquisition Flow</h3>
                                <p className="max-w-md text-[#8E8C84] italic">Monitor the manifestation of customer acquisitions and fulfillment resonance.</p>
                            </motion.div>
                        )}

                        {activeTab === 'accounts' && (
                            <motion.div key="accounts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-12 shadow-sm min-h-[600px] flex flex-col items-center justify-center text-center space-y-6">
                                <UserCircle size={60} className="text-[#D4AF37]" />
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Vessel Configurations</h3>
                                <p className="max-w-md text-[#8E8C84] italic">Advanced profile tuning, permission alignment, and security protocols.</p>
                            </motion.div>
                        )}

                        {activeTab === 'tasks' && (
                            <motion.div key="tasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-12 shadow-sm min-h-[600px] flex flex-col items-center justify-center text-center space-y-6">
                                <RefreshCw size={60} className="text-[#D4AF37] animate-spin-slow opacity-20" />
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Operational Flux</h3>
                                <p className="max-w-md text-[#8E8C84] italic">System maintenance routines and pending administrative resonance tasks.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

             {/* Modal */}
            <AnimatePresence>
                {isUserModalOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#050604] border border-white/10 rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl overflow-hidden relative">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{editingUser ? 'Synchronize Identity' : 'Initiate Vessel'}</h3>
                                <button onClick={() => setIsUserModalOpen(false)} className="p-2 text-white/20 hover:text-white transition-colors"><X size={28} /></button>
                            </div>
                            <form onSubmit={handleSaveUser} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] ml-1">Identity Designation</label>
                                    <input required className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-bold text-white outline-none" value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] ml-1">Communication Channel</label>
                                    <input required type="email" className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-bold text-white outline-none" value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] ml-1">Clearance Tier</label>
                                    <select className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-bold text-white outline-none appearance-none cursor-pointer" value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})}>
                                        <option value="USER">Explorer (Vessel)</option>
                                        <option value="ADMIN">Super Admin (Overseer)</option>
                                    </select>
                                </div>
                                <button type="submit" disabled={loading} className="w-full h-14 bg-[#D4AF37] text-black rounded-2xl font-black uppercase tracking-widest text-[12px] shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 transition-all mt-4">
                                    {loading ? 'Processing Flux...' : (editingUser ? 'Synchronize Resonance' : 'Manifest Identity')}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212, 175, 55, 0.4); }
            `}} />
        </div>
    );
};

export default AdminDashboard;
