import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SEO from '../components/ui/SEO';

const HERITAGE_SITES = [
  { wiki: 'Taj_Mahal', name: 'Taj Mahal', category: 'MONUMENT', state: 'Uttar Pradesh', city: 'Agra', lat: 27.1751, lng: 78.0421, year: 1653, unesco: true },
  { wiki: 'Hampi', name: 'Hampi', category: 'TEMPLE', state: 'Karnataka', city: 'Ballari', lat: 15.335, lng: 76.462, year: 1336, unesco: true },
  { wiki: 'Khajuraho_Group_of_Monuments', name: 'Khajuraho Temples', category: 'TEMPLE', state: 'Madhya Pradesh', city: 'Chhatarpur', lat: 24.8318, lng: 79.9199, year: 950, unesco: true },
  { wiki: 'Konark_Sun_Temple', name: 'Konark Sun Temple', category: 'TEMPLE', state: 'Odisha', city: 'Puri', lat: 19.8876, lng: 86.0945, year: 1250, unesco: true },
  { wiki: 'Amber_Fort', name: 'Amber Fort', category: 'FORT', state: 'Rajasthan', city: 'Jaipur', lat: 26.9855, lng: 75.8513, year: 1592, unesco: true },
  { wiki: 'Red_Fort', name: 'Red Fort', category: 'FORT', state: 'Delhi', city: 'New Delhi', lat: 28.6562, lng: 77.241, year: 1648, unesco: true },
  { wiki: 'Mysore_Palace', name: 'Mysore Palace', category: 'PALACE', state: 'Karnataka', city: 'Mysuru', lat: 12.3051, lng: 76.6551, year: 1912, unesco: false },
  { wiki: 'Meenakshi_Amman_Temple', name: 'Meenakshi Amman Temple', category: 'TEMPLE', state: 'Tamil Nadu', city: 'Madurai', lat: 9.9195, lng: 78.1193, year: 1623, unesco: false },
  { wiki: 'Ellora_Caves', name: 'Ellora Caves', category: 'SACRED_SITE', state: 'Maharashtra', city: 'Aurangabad', lat: 20.0268, lng: 75.178, year: 600, unesco: true },
  { wiki: 'Hawa_Mahal', name: 'Hawa Mahal', category: 'PALACE', state: 'Rajasthan', city: 'Jaipur', lat: 26.9239, lng: 75.8267, year: 1799, unesco: false }
];

const CULTURE_ITEMS = [
  { wiki: 'Diwali', name: 'Diwali - Festival of Lights', type: 'FESTIVAL', region: 'Pan-India', lang: 'Hindi' },
  { wiki: 'Bharatanatyam', name: 'Bharatanatyam', type: 'DANCE', region: 'Tamil Nadu', lang: 'Tamil' },
  { wiki: 'Bhagavad_Gita', name: 'Bhagavad Gita', type: 'SCRIPTURE', region: 'Pan-India', lang: 'Sanskrit' },
  { wiki: 'Holi', name: 'Holi - Festival of Colors', type: 'FESTIVAL', region: 'North India', lang: 'Hindi' },
  { wiki: 'Kathakali', name: 'Kathakali Dance', type: 'DANCE', region: 'Kerala', lang: 'Malayalam' },
  { wiki: 'Yoga', name: 'Yoga - Ancient Science', type: 'PHILOSOPHY', region: 'Pan-India', lang: 'Sanskrit' },
  { wiki: 'Pongal_(festival)', name: 'Pongal Harvest Festival', type: 'FESTIVAL', region: 'Tamil Nadu', lang: 'Tamil' },
  { wiki: 'Madhubani_painting', name: 'Madhubani Painting', type: 'ART', region: 'Bihar', lang: 'Maithili' }
];

const WELLNESS = [
  { wiki: 'Surya_Namaskara', name: 'Surya Namaskar - Sun Salutation', cat: 'YOGA', duration: 20, difficulty: 'BEGINNER' },
  { wiki: 'Pranayama', name: 'Pranayama - Breathing Mastery', cat: 'PRANAYAMA', duration: 15, difficulty: 'BEGINNER' },
  { wiki: 'Vipassana', name: 'Vipassana Meditation', cat: 'MEDITATION', duration: 45, difficulty: 'INTERMEDIATE' },
  { wiki: 'Yoga_nidra', name: 'Yoga Nidra - Conscious Sleep', cat: 'RELAXATION', duration: 30, difficulty: 'BEGINNER' },
  { wiki: 'Mantra', name: 'Mantra Chanting - Om Namah Shivaya', cat: 'CHANTING', duration: 20, difficulty: 'BEGINNER' }
];

const USERS = [
  { name: 'Varun Akuri', username: 'varun_innerroot', email: 'varun@innerroot.in', role: 'ADMIN' },
  { name: 'Hem Sathvik Reddy', username: 'sathvik_hem', email: 'sathvik@innerroot.in', role: 'ADMIN' },
  { name: 'Ruhan Md', username: 'ruhan_dev', email: 'ruhan@innerroot.in', role: 'USER' },
  { name: 'Priya Sharma', username: 'priya_wellness', email: 'priya@example.com', role: 'USER' },
  { name: 'Arjun Nair', username: 'arjun_heritage', email: 'arjun@example.com', role: 'USER' }
];

const QUOTES = [
  ['You have the right to perform your actions, but you are not entitled to the fruits of your actions.', 'Lord Krishna', 'Bhagavad Gita 2.47', 'Karma', ['karma', 'action', 'detachment']],
  ['The soul is neither born nor dies at any time. It has not come into being, does not come into being, and will not come into being.', 'Lord Krishna', 'Bhagavad Gita 2.20', 'Atman', ['soul', 'immortality', 'vedanta']],
  ['When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.', 'Lord Krishna', 'Bhagavad Gita 6.19', 'Meditation', ['meditation', 'mind', 'focus']],
  ['Arise, awake and stop not till the goal is reached.', 'Swami Vivekananda', 'Practical Vedanta', 'Motivation', ['motivation', 'perseverance', 'growth']],
  ['Truth is one; sages call it by various names.', 'Rigveda 1.164.46', 'Rigveda', 'Philosophy', ['truth', 'vedas', 'philosophy']],
  ['The greatest religion is to be true to your own nature. Have faith in yourself.', 'Swami Vivekananda', 'Complete Works', 'Self-Belief', ['faith', 'self-belief', 'confidence']],
  ['Let noble thoughts come to us from every side.', 'Rigveda 1.89.1', 'Rigveda', 'Wisdom', ['wisdom', 'thoughts', 'knowledge']],
  ['Ahimsa Paramo Dharma - Non-violence is the highest dharma.', 'Mahabharata', 'Mahabharata Shantiparva', 'Ahimsa', ['ahimsa', 'dharma', 'nonviolence']],
  ['The mind is everything. What you think, you become.', 'Gautama Buddha', 'Dhammapada', 'Mindfulness', ['mind', 'mindfulness', 'buddhism']],
  ['Yoga is the journey of the self, through the self, to the self.', 'Lord Krishna', 'Bhagavad Gita 6.20', 'Yoga', ['yoga', 'self', 'journey']]
];

const EVENTS = [
  ['Diwali Cultural Evening 2026', 'diwali-cultural-evening-2026', 'Cultural Program', '2026-10-20 18:00:00', 'Asia/Kolkata', true, 'https://meet.google.com/innerroot-diwali', 500, 'festival,culture,diwali'],
  ['Morning Yoga & Pranayama Workshop', 'morning-yoga-pranayama-workshop', 'Workshop', '2026-04-05 06:00:00', 'Asia/Kolkata', true, 'https://meet.google.com/innerroot-yoga', 100, 'yoga,wellness,morning'],
  ['Heritage Walk - Virtual Hampi Tour', 'heritage-walk-virtual-hampi', 'Webinar', '2026-05-10 10:00:00', 'Asia/Kolkata', true, 'https://meet.google.com/innerroot-hampi', 300, 'heritage,hampi,virtual'],
  ['Vedanta Philosophy Seminar', 'vedanta-philosophy-seminar', 'Workshop', '2026-06-21 11:00:00', 'Asia/Kolkata', true, 'https://meet.google.com/innerroot-vedanta', 200, 'philosophy,vedanta,spirituality'],
  ['Meditation & Mood Journaling Masterclass', 'meditation-mood-journaling', 'Workshop', '2026-07-15 07:00:00', 'Asia/Kolkata', true, 'https://meet.google.com/innerroot-meditation', 150, 'meditation,journaling,wellness']
];

const POSTS = [
  ['My first experience visiting Hampi', 'Sharing my unforgettable journey through the ruins of the Vijayanagara Empire. The energy at Hampi is truly divine and overwhelming - standing among 500-year-old stone chariots left me speechless.', 'Heritage', ['hampi', 'karnataka', 'heritage']],
  ['How Pranayama transformed my mornings', 'I started practicing Nadi Shodhana and Kapalbhati 30 days ago. The mental clarity and reduced anxiety have been remarkable. Highly recommend for beginners!', 'Wellness', ['pranayama', 'breathing', 'wellness']],
  ['Understanding the symbolism of Diwali', 'Beyond the lights and sweets, Diwali symbolizes the victory of knowledge over ignorance. Exploring the mythological narratives behind this celebration.', 'Spirituality', ['diwali', 'festival', 'symbolism']],
  ['Book recommendations for Vedanta beginners', "If you are just starting with Vedanta philosophy, Swami Vivekananda's Complete Works is the best starting point. Life-changing perspectives within every chapter.", 'Spirituality', ['vedanta', 'books', 'philosophy']],
  ['Mood tracking changed my relationship with emotions', 'After 3 weeks of daily journaling on Inner Root, I can now identify emotional triggers before they affect my decisions. This practice is underrated.', 'Wellness', ['journaling', 'mood', 'mentalhealth']]
];

const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const sqlEscape = (str) => str?.replace(/'/g, "''") ?? '';
const arr2pg = (arr) => (arr?.length ? `ARRAY[${arr.map((tag) => `'${sqlEscape(tag)}'`).join(', ')}]` : 'NULL');
const uuid = () => 'uuid_generate_v4()';

const addHours = (dt, hours) => {
  const [datePart, timePart] = dt.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [h, m, s] = timePart.split(':').map(Number);
  const base = new Date(Date.UTC(year, month - 1, day, h, m, s));
  base.setUTCHours(base.getUTCHours() + hours);
  const y = base.getUTCFullYear();
  const mo = String(base.getUTCMonth() + 1).padStart(2, '0');
  const d = String(base.getUTCDate()).padStart(2, '0');
  const hh = String(base.getUTCHours()).padStart(2, '0');
  const mm = String(base.getUTCMinutes()).padStart(2, '0');
  const ss = String(base.getUTCSeconds()).padStart(2, '0');
  return `${y}-${mo}-${d} ${hh}:${mm}:${ss}`;
};

export default function SeedGenerator() {
  const [log, setLog] = useState([]);
  const [sql, setSql] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('generator');
  const [total, setTotal] = useState(0);
  const abortRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => () => {
    isMountedRef.current = false;
    abortRef.current?.abort();
  }, []);

  const totalItems = useMemo(
    () => HERITAGE_SITES.length + CULTURE_ITEMS.length + WELLNESS.length + 4,
    []
  );

  const addLog = useCallback((msg, type = 'info') => {
    if (!isMountedRef.current) return;
    setLog((prev) => [...prev, { msg, type, t: new Date().toLocaleTimeString() }]);
  }, []);

  const updateProgress = useCallback((done) => {
    if (!isMountedRef.current) return;
    setProgress(Math.min(100, Math.round((done / totalItems) * 100)));
  }, [totalItems]);

  const fetchWiki = async (title, signal) => {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`Summary HTTP ${res.status}`);
    return res.json();
  };

  const fetchWikiImage = async (title, signal) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=800&origin=*`;
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`Image HTTP ${res.status}`);
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return null;
    const page = Object.values(pages)[0];
    return page?.thumbnail?.source || null;
  };

  const generate = async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsRunning(true);
    setLog([]);
    setSql('');
    setProgress(0);
    setTotal(totalItems);

    let done = 0;
    const out = [];
    const tick = async () => {
      done += 1;
      updateProgress(done);
      await new Promise((resolve) => setTimeout(resolve, 120));
    };

    try {
      out.push('-- ================================================================');
      out.push('-- INNER ROOT DATABASE SEED');
      out.push(`-- Generated: ${new Date().toISOString()}`);
      out.push('-- Source: Wikipedia REST API + Wikimedia Commons');
      out.push('-- ================================================================\n');

      addLog('Inserting seed users...', 'section');
      out.push('-- USERS');
      for (const u of USERS) {
        out.push('INSERT INTO users (id, full_name, username, email, role, auth_provider, is_active, is_email_verified) VALUES');
        out.push(`  (${uuid()}, '${sqlEscape(u.name)}', '${u.username}', '${u.email}', '${u.role}', 'LOCAL', TRUE, TRUE);`);
      }
      out.push('');
      await tick();

      addLog('Fetching Heritage Sites from Wikipedia...', 'section');
      out.push('-- HERITAGE SITES');
      for (const site of HERITAGE_SITES) {
        addLog(`  -> ${site.name}`, 'fetch');
        try {
          const [summary, image] = await Promise.all([
            fetchWiki(site.wiki, controller.signal),
            fetchWikiImage(site.wiki, controller.signal)
          ]);
          const desc = sqlEscape(summary.extract?.slice(0, 800) ?? '');
          const thumb = image || summary.thumbnail?.source || '';
          const tourUrl = `https://www.google.com/maps/@${site.lat},${site.lng},14z`;
          const tags = [site.category.toLowerCase(), site.state.toLowerCase().replace(/\s+/g, '_'), 'heritage'];
          out.push('INSERT INTO heritage_sites (id, name, slug, description, category, state, city, latitude, longitude, established_year, unesco_listed, thumbnail_url, virtual_tour_url, tags, is_published, created_at, updated_at) VALUES');
          out.push(`  (${uuid()}, '${sqlEscape(site.name)}', '${slugify(site.name)}', '${desc}', '${site.category}', '${site.state}', '${site.city}', ${site.lat}, ${site.lng}, ${site.year}, ${site.unesco}, '${thumb}', '${tourUrl}', ${arr2pg(tags)}, TRUE, NOW(), NOW());`);
          addLog(`  OK ${site.name}`, 'ok');
        } catch (e) {
          if (e.name === 'AbortError') throw e;
          addLog(`  ERR ${site.name}: ${e.message}`, 'error');
          out.push(`-- SKIPPED: ${site.name} (${e.message})`);
        }
        await tick();
      }
      out.push('');

      addLog('Fetching Culture Items from Wikipedia...', 'section');
      out.push('-- CULTURE ITEMS');
      for (const item of CULTURE_ITEMS) {
        addLog(`  -> ${item.name}`, 'fetch');
        try {
          const [summary, image] = await Promise.all([
            fetchWiki(item.wiki, controller.signal),
            fetchWikiImage(item.wiki, controller.signal)
          ]);
          const desc = sqlEscape(summary.extract?.slice(0, 600) ?? '');
          const thumb = image || summary.thumbnail?.source || '';
          const tags = [item.type.toLowerCase(), item.region.toLowerCase().replace(/\s+/g, '_'), item.lang.toLowerCase()];
          out.push('INSERT INTO culture_items (id, title, slug, description, culture_type, region, language, content_body, media_url, tags, is_published, created_at, updated_at) VALUES');
          out.push(`  (${uuid()}, '${sqlEscape(item.name)}', '${slugify(item.name)}', '${desc}', '${item.type}', '${item.region}', '${item.lang}', '${desc}', '${thumb}', ${arr2pg(tags)}, TRUE, NOW(), NOW());`);
          addLog(`  OK ${item.name}`, 'ok');
        } catch (e) {
          if (e.name === 'AbortError') throw e;
          addLog(`  ERR ${item.name}: ${e.message}`, 'error');
        }
        await tick();
      }
      out.push('');

      addLog('Fetching Wellness Content from Wikipedia...', 'section');
      out.push('-- WELLNESS CONTENT');
      for (const w of WELLNESS) {
        addLog(`  -> ${w.name}`, 'fetch');
        try {
          const [summary, image] = await Promise.all([
            fetchWiki(w.wiki, controller.signal),
            fetchWikiImage(w.wiki, controller.signal)
          ]);
          const desc = sqlEscape(summary.extract?.slice(0, 600) ?? '');
          const thumb = image || summary.thumbnail?.source || '';
          const tags = [w.cat.toLowerCase(), 'wellness', 'india'];
          out.push('INSERT INTO wellness_content (id, title, slug, description, category, duration_minutes, difficulty_level, content_url, thumbnail_url, tags, is_premium, is_published, created_at, updated_at) VALUES');
          out.push(`  (${uuid()}, '${sqlEscape(w.name)}', '${slugify(w.name)}', '${desc}', '${w.cat}', ${w.duration}, '${w.difficulty}', 'https://www.youtube.com/results?search_query=${encodeURIComponent(w.name)}', '${thumb}', ${arr2pg(tags)}, FALSE, TRUE, NOW(), NOW());`);
          addLog(`  OK ${w.name}`, 'ok');
        } catch (e) {
          if (e.name === 'AbortError') throw e;
          addLog(`  ERR ${w.name}: ${e.message}`, 'error');
        }
        await tick();
      }
      out.push('');

      addLog('Inserting Wisdom Quotes...', 'section');
      out.push('-- WISDOM QUOTES');
      for (const [text, author, source, cat, tags] of QUOTES) {
        out.push('INSERT INTO wisdom_quotes (id, quote_text, author, source, category, language, tags, is_active) VALUES');
        out.push(`  (${uuid()}, '${sqlEscape(text)}', '${sqlEscape(author)}', '${sqlEscape(source)}', '${cat}', 'English', ${arr2pg(tags)}, TRUE);`);
      }
      out.push('');
      await tick();

      addLog('Inserting Events...', 'section');
      out.push('-- EVENTS');
      for (const [title, slug, type, start, tz, isOnline, url, max, tags] of EVENTS) {
        const end = addHours(start, 2);
        out.push('INSERT INTO events (id, title, slug, event_type, status, start_datetime, end_datetime, timezone, is_online, meeting_url, max_participants, is_free, tags, is_published, created_at, updated_at) VALUES');
        out.push(`  (${uuid()}, '${sqlEscape(title)}', '${slug}', '${type}', 'UPCOMING', '${start}+05:30', '${end}+05:30', '${tz}', ${isOnline}, '${url}', ${max}, TRUE, ${arr2pg(tags.split(','))}, TRUE, NOW(), NOW());`);
      }
      out.push('');
      await tick();

      addLog('Inserting Community Posts...', 'section');
      out.push('-- COMMUNITY POSTS');
      for (const [title, content, cat, tags] of POSTS) {
        out.push('INSERT INTO community_posts (id, user_id, title, content, category, tags, status, is_pinned, created_at, updated_at) VALUES');
        out.push(`  (${uuid()}, (SELECT id FROM users ORDER BY RANDOM() LIMIT 1), '${sqlEscape(title)}', '${sqlEscape(content)}', '${cat}', ${arr2pg(tags)}, 'ACTIVE', FALSE, NOW(), NOW());`);
      }
      out.push('');
      await tick();

      out.push('-- ================================================================');
      out.push('-- SEED COMPLETE');
      out.push(`-- Heritage Sites: ${HERITAGE_SITES.length}`);
      out.push(`-- Culture Items:  ${CULTURE_ITEMS.length}`);
      out.push(`-- Wellness:       ${WELLNESS.length}`);
      out.push(`-- Wisdom Quotes:  ${QUOTES.length}`);
      out.push(`-- Events:         ${EVENTS.length}`);
      out.push(`-- Community Posts:${POSTS.length}`);
      out.push(`-- Users:          ${USERS.length}`);
      out.push('-- ================================================================');

      if (isMountedRef.current) {
        setSql(out.join('\n'));
        setActiveTab('sql');
        addLog('All SQL generated successfully.', 'success');
      }
    } catch (e) {
      if (e.name === 'AbortError') {
        addLog('Generation canceled.', 'info');
      } else {
        addLog(`Generation failed: ${e.message}`, 'error');
      }
    } finally {
      if (isMountedRef.current) setIsRunning(false);
    }
  };

  const copySql = async () => {
    if (!sql) return;
    try {
      await navigator.clipboard.writeText(sql);
      addLog('Copied SQL to clipboard.', 'ok');
    } catch {
      addLog('Clipboard copy failed in this browser context.', 'error');
    }
  };

  const downloadSql = () => {
    if (!sql) return;
    const blob = new Blob([sql], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'innerroot_seed_data.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  const logColor = { info: '#94a3b8', ok: '#4ade80', error: '#f87171', section: '#fbbf24', fetch: '#38bdf8', success: '#a78bfa' };

  return (
    <>
      <SEO title="SQL Seed Generator | Inner Root" description="Generate Inner Root SQL seed data from curated records and Wikipedia summaries." />
      <div style={{ fontFamily: "'Courier New', monospace", background: '#0a0a0f', minHeight: '100vh', color: '#e2e8f0' }}>
        <div style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #0d1a3a 50%, #0a1a0a 100%)', borderBottom: '1px solid #2d1b69', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#e2e8f0' }}>Inner Root SQL Seed Generator</h1>
            <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#64748b', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Wikipedia API · PostgreSQL · {total || totalItems} steps</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['generator', 'sql'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 6,
                  border: '1px solid',
                  cursor: 'pointer',
                  background: activeTab === tab ? 'linear-gradient(135deg, #7c3aed, #065f46)' : 'transparent',
                  borderColor: activeTab === tab ? '#7c3aed' : '#334155',
                  color: activeTab === tab ? '#fff' : '#94a3b8'
                }}
              >
                {tab === 'generator' ? 'Generator' : 'SQL Output'}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'generator' ? (
          <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
            {(isRunning || progress > 0) && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>Generating SQL...</span>
                  <span style={{ fontSize: 12, color: '#a78bfa', fontWeight: 700 }}>{progress}%</span>
                </div>
                <div style={{ background: '#1e293b', borderRadius: 999, height: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #7c3aed, #34d399)', transition: 'width 0.3s ease' }} />
                </div>
              </div>
            )}

            <button
              onClick={generate}
              disabled={isRunning}
              style={{
                width: '100%',
                padding: 16,
                borderRadius: 10,
                border: 'none',
                cursor: isRunning ? 'not-allowed' : 'pointer',
                fontSize: 15,
                fontWeight: 700,
                fontFamily: 'inherit',
                background: isRunning ? '#1e293b' : 'linear-gradient(135deg, #7c3aed 0%, #065f46 50%, #92400e 100%)',
                color: '#fff'
              }}
            >
              {isRunning ? `Generating... ${progress}%` : 'Generate SQL with Wikipedia summaries'}
            </button>

            {log.length > 0 && (
              <div style={{ background: '#080c14', border: '1px solid #1e293b', borderRadius: 10, padding: 16, maxHeight: 320, overflowY: 'auto', marginTop: 16 }}>
                {log.map((entry, i) => (
                  <div key={`${entry.t}-${i}`} style={{ fontSize: 11, color: logColor[entry.type] || '#94a3b8', padding: '2px 0', display: 'flex', gap: 10 }}>
                    <span style={{ color: '#334155', minWidth: 60 }}>{entry.t}</span>
                    <span>{entry.msg}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: '24px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: '#64748b' }}>
                {sql ? `${sql.split('\n').length} lines · ${(sql.length / 1024).toFixed(1)} KB` : 'No SQL generated yet'}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={copySql} disabled={!sql} className="btn btn-secondary btn-sm">Copy</button>
                <button onClick={downloadSql} disabled={!sql} className="btn btn-primary btn-sm">Download .sql</button>
              </div>
            </div>
            {sql ? (
              <pre style={{ background: '#080c14', border: '1px solid #1e293b', borderRadius: 10, padding: 16, fontSize: 11, lineHeight: 1.6, overflow: 'auto', maxHeight: 'calc(100vh - 240px)', margin: 0 }}>
                {sql}
              </pre>
            ) : (
              <div style={{ background: '#080c14', border: '1px solid #1e293b', borderRadius: 10, padding: 60, textAlign: 'center', color: '#334155' }}>
                Run generator first to view SQL output.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

