import React, { useState, useEffect } from 'react';
import './App.css';

// --- ICONS (SVG-inline, theme colored) ---
const icons = {
  wave: (
    <svg viewBox="0 0 32 32" width="28" style={{verticalAlign:'middle'}} fill="#2EC4B6">
      <path d="M4,24c0-4.4,3.6-8,8-8c2,0,3.9,0.8,5.3,2.1c-0.9,0.3-1.7,0.7-2.5,1.2c-1.2-0.5-2.4-0.8-3.8-0.8c-3.3,0-6,2.7-6,6
	 s2.7,6,6,6c3.2,0,5.9-2.5,6-5.6V24h2C24,28.4,20.4,32,16,32C9.4,32,4,26.6,4,20V24z"/>
    </svg>
  ),
  board: (
    <svg viewBox="0 0 32 32" width="22" style={{verticalAlign:'middle'}} fill="#3A8DAD">
      <ellipse cx="16" cy="16" rx="12" ry="4" />
      <rect x="15" y="4" width="2" height="18" rx="1" fill="#2EC4B6" />
    </svg>
  ),
  mood: {
    joy: (
      <svg viewBox="0 0 32 32" width="22" style={{verticalAlign:'middle'}} fill="#FFD23F">
        <circle cx="16" cy="16" r="15" fill="#FFD23F" />
        <ellipse cx="11" cy="14" rx="2" ry="3" fill="#1A4552"/>
        <ellipse cx="21" cy="14" rx="2" ry="3" fill="#1A4552"/>
        <path d="M11,22c2,2,8,2,10,0" stroke="#1A4552" strokeWidth="2" fill="none" />
      </svg>
    ),
    neutral: (
      <svg viewBox="0 0 32 32" width="22" fill="#FCDC8A" style={{verticalAlign:'middle'}}>
        <circle cx="16" cy="16" r="15" fill="#FCDC8A" />
        <ellipse cx="11" cy="14" rx="2" ry="3" fill="#377D8F"/>
        <ellipse cx="21" cy="14" rx="2" ry="3" fill="#377D8F"/>
        <rect x="11" y="21" width="10" height="2" rx="1" fill="#377D8F"/>
      </svg>
    ),
    sad: (
      <svg viewBox="0 0 32 32" width="22" fill="#B9E0EF" style={{verticalAlign:'middle'}}>
        <circle cx="16" cy="16" r="15" fill="#B9E0EF" />
        <ellipse cx="11" cy="14" rx="2" ry="3" fill="#24586B"/>
        <ellipse cx="21" cy="14" rx="2" ry="3" fill="#24586B"/>
        <path d="M11,24c2-2,8-2,10,0" stroke="#24586B" strokeWidth="2" fill="none" />
      </svg>
    )
  },
  edit: (
    <svg viewBox="0 0 20 20" width="18" fill="#2EC4B6">
      <path d="M13.586 3.586a2 2 0 0 1 2.828 2.828l-8.607 8.607a2 2 0 0 1-1.06.562l-3.045.61a.5.5 0 0 1-.593-.594l.609-3.046a2 2 0 0 1 .563-1.06l8.606-8.607z" />
    </svg>
  ),
  delete: (
    <svg viewBox="0 0 20 20" width="18" fill="#FF686B">
      <path d="M6 7h8M9 10v4m2-4v4m7-7v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7m13 0V5a2 2 0 0 0-2-2h-1.5A1.5 1.5 0 0 1 13 3h-2a1.5 1.5 0 0 1-1.5-1.5H8A2 2 0 0 0 6 5v2"/>
    </svg>
  ),
  filter: (
    <svg viewBox="0 0 20 20" width="18" fill="#3A8DAD">
      <path d="M4 7h12M7 11h6m-3 4h0" stroke="#3A8DAD" strokeWidth="2" fill="none"/>
    </svg>
  ),
  stats: (
    <svg viewBox="0 0 24 24" width="21" fill="#2EC4B6">
      <rect x="4" y="13" width="3" height="7"/>
      <rect x="10.5" y="7" width="3" height="13"/>
      <rect x="17" y="10" width="3" height="10"/>
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" width="21" fill="#3A8DAD">
      <path d="M3 12L12 4l9 8v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z" />
    </svg>
  ),
  reminder: (
    <svg viewBox="0 0 24 24" width="18" fill="#FFD23F">
      <circle cx="12" cy="12" r="9"/>
      <rect x="11" y="7" width="2" height="6"/>
      <circle cx="12" cy="17" r="1.5"/>
    </svg>
  ),
};

// --- STYLES ---
const themeVars = {
  '--surf-primary': '#3A8DAD',
  '--surf-secondary': '#F5E9DA',
  '--surf-accent': '#2EC4B6',
  '--surf-sand': '#F5E9DA',
  '--surf-dark': '#133449',
  '--surf-wave-light': '#E6FAFB',
  '--surf-card': '#FAFAFA',
};

// --- Dummy DATA for demo ---
const defaultSessions = [
  {
    id: 1,
    date: '2024-05-27',
    spot: 'Ocean Beach',
    board: 'Shortboard',
    waves: 12,
    mood: 'joy',
    conditions: {
      swell: '4-6ft',
      wind: 'Offshore',
      tide: 'Mid',
    },
    notes: 'Epic dawn patrol, glassy walls and dolphins!',
  },
  {
    id: 2,
    date: '2024-05-26',
    spot: 'Sandy Point',
    board: 'Longboard',
    waves: 8,
    mood: 'neutral',
    conditions: {
      swell: '2-3ft',
      wind: 'Sideshore',
      tide: 'High',
    },
    notes: 'Cruisy glide, summer vibes.',
  },
  {
    id: 3,
    date: '2024-05-25',
    spot: 'Reef Break',
    board: 'Fish',
    waves: 6,
    mood: 'sad',
    conditions: {
      swell: '1-2ft',
      wind: 'Onshore',
      tide: 'Low',
    },
    notes: 'Small and bumpy but still fun.',
  }
];

const boardTypes = ['Shortboard', 'Longboard', 'Fish', 'Funboard', 'Bodyboard', 'Soft-top'];
const moodOptions = [
  { id: 'joy', label: 'Stoked', icon: icons.mood.joy },
  { id: 'neutral', label: 'Mellow', icon: icons.mood.neutral },
  { id: 'sad', label: 'Bummer', icon: icons.mood.sad }
];
const spots = ['Ocean Beach', 'Reef Break', 'Sandy Point', 'Big Cove', 'Secret Spot'];

// ------------------------- Components --------------------------- //

// PUBLIC_INTERFACE
function SurfSyncApp() {
  // --- Surf Sessions State (simulate persistence) ---
  const [sessions, setSessions] = useState(defaultSessions);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [reminderShown, setReminderShown] = useState(false);

  // Filters
  const [filter, setFilter] = useState({ spot: '', board: '', mood: '' });

  // --- Reminder: notify if no session logged today
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const loggedToday = sessions.some(s => s.date === today);
    if (!reminderShown && !loggedToday) {
      // Simulate local reminder
      setTimeout(() => setReminderShown(true), 1000);
    }
  }, [sessions, reminderShown]);

  // --- Form Submission ---
  function handleAddSession(newSession) {
    setSessions([
      ...sessions,
      {
        ...newSession,
        id: Date.now() + Math.floor(Math.random()*1000)
      }
    ]);
    setShowForm(false);
    setEditId(null);
    setSelectedSessionId(null);
  }

  function handleEditSession(updatedSession) {
    setSessions(sessions.map(s => 
      s.id === updatedSession.id ? {...updatedSession} : s
    ));
    setShowForm(false);
    setEditId(null);
    setSelectedSessionId(null);
  }

  function handleDeleteSession(id) {
    setSessions(sessions.filter(s => s.id !== id));
    setSelectedSessionId(null);
    setShowForm(false);
    setEditId(null);
  }

  // --- Filter logic ---
  function filteredSessions() {
    return sessions.filter(s => 
      (filter.spot ? s.spot === filter.spot : true) &&
      (filter.board ? s.board === filter.board : true) &&
      (filter.mood ? s.mood === filter.mood : true)
    ).sort((a, b) => b.date.localeCompare(a.date));
  }

  // --- Theme Variables Application ---
  useEffect(() => {
    Object.entries(themeVars).forEach(([key, val]) =>
      document.documentElement.style.setProperty(key, val)
    );
  }, []);

  // --- Render ---
  return (
    <div className="app section-bg-home" style={{ minHeight: '100vh', position: 'relative', fontFamily: 'Inter, Arial, sans-serif' }}>
      {/* Overlay for glass effect and readability */}
      <div className="section-overlay" />

      {/* Navbar Ocean Header */}
      <nav className="navbar navbar-futuristic" role="navigation" aria-label="main navigation">
        <div style={{maxWidth: 950, margin:'auto', display:'flex',alignItems:'center',justifyContent: 'space-between',padding:'0 18px'}}>
          <div className="logo" style={{display:'flex',alignItems:'center',fontWeight:700,fontSize: '1.5rem',letterSpacing:1,textShadow:'0 2px 6px #0895bbbc'}}>
            <span style={{marginRight:6,display:'inline-block',transform:'rotate(-10deg)'}}>{icons.wave}</span>
            <span style={{color:'#54dfff', textShadow:'0 1.5px 7px #159adccc'}}>Surf</span><span style={{color:'#ffd23f',textShadow:'0 1.2px 6px #d8b70e9c'}}>Sync</span>
          </div>
          <div style={{display:'flex', gap: '10px',alignItems:'center'}}>
            <button
              onClick={()=>{setShowDashboard(false);setShowForm(false);setSelectedSessionId(null);setEditId(null);}}
              className={`btn btn-futuristic ${showDashboard===false && !showForm && !selectedSessionId ? "active-nav" : ""}`}
              tabIndex={0}
              style={navBtnStyle(showDashboard===false && !showForm && !selectedSessionId)}>
              {icons.home} Home
            </button>
            <button
              onClick={()=>setShowDashboard(v=>!v)}
              className={`btn btn-futuristic ${showDashboard ? "active-nav" : ""}`}
              tabIndex={0}
              style={navBtnStyle(showDashboard)}>
              {icons.stats} Stats
            </button>
          </div>
        </div>
      </nav>

      {/* Notification/Reminder */}
      {reminderShown && (
        <div
          style={{
            background: 'rgba(41,238,254,0.94)',
            color: '#151a27',
            padding: '10px 0',
            fontWeight: 600,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            fontSize: '1.09rem',
            position: 'relative',
            zIndex: 18,
            boxShadow: '0 4px 20px #09cbe020'
          }}>
          <span>{icons.reminder}</span>
          <span style={{textShadow:'0 2px 11px #92f4ffad'}}>Remember to log your surf session if you paddled out today!</span>
          <button style={{
            background: 'none', border: 'none', fontSize: 18, marginLeft: 18, color: '#0889a6', cursor: 'pointer',
            borderRadius:8, padding: '0 6px'
          }} aria-label="Dismiss reminder" onClick={()=>setReminderShown(false)}>&#10005;
          </button>
        </div>
      )}

      <main style={{
          maxWidth:950,
          margin:'42px auto 0 auto',
          minHeight:'56vh',
          padding:'0 12px 60px 12px',
          position: 'relative',
          zIndex: 2
        }}>
        {/* Form: Add/Edit */}
        {showForm && !showDashboard && (
          <div className="section-bg-log" style={{borderRadius: '2.3rem', overflow:'hidden', position:'relative'}}>
            <div className="section-overlay" />
            <SessionForm
              session={editId ? sessions.find(s=>s.id===editId) : undefined}
              onSave={editId ? handleEditSession : handleAddSession}
              onCancel={() => { setShowForm(false); setEditId(null); }}
            />
          </div>
        )}

        {/* Dashboard */}
        {showDashboard && (
          <div className="section-bg-dashboard" style={{borderRadius: '2.3rem', overflow:'hidden', position:'relative'}}>
            <div className="section-overlay" />
            <StatsDashboard allSessions={sessions}/>
          </div>
        )}

        {/* Session Detail */}
        {selectedSessionId && !showForm && !showDashboard &&
          <div className="section-bg-details" style={{borderRadius: '2.3rem', overflow:'hidden', position:'relative'}}>
            <div className="section-overlay" />
            <SessionDetail
              session={sessions.find(s=>s.id===selectedSessionId)}
              onBack={()=>setSelectedSessionId(null)}
              onEdit={()=>{setEditId(selectedSessionId); setShowForm(true);}}
              onDelete={()=>handleDeleteSession(selectedSessionId)}
            />
          </div>
        }

        {/* Home/Main List */}
        {!showForm && !selectedSessionId && !showDashboard && (
          <div>
            {/* "Log New Session" button */}
            <div style={{textAlign:'center',marginTop:30,marginBottom:33}}>
              <button
                onClick={() => { setShowForm(true); setEditId(null); }}
                className="btn btn-large btn-futuristic"
                tabIndex={0}
                style={{
                  fontWeight:900,
                  letterSpacing:2,
                  display:'inline-flex', alignItems:'center', gap:18,
                  textShadow:'0 2px 7px #01e9ff58',
                  borderRadius: '2.1rem',
                }}>
                  <span style={{
                    transform:'rotate(10deg)',display:'inline-block',filter:'drop-shadow(0 4px 16px #13e0ffc2)'
                  }}>{icons.wave}</span>
                  + Log New Session
              </button>
            </div>
            {/* Filter Bar */}
            <SessionFilterBar filter={filter} setFilter={setFilter} sessions={sessions}/>
            {/* Sessions List */}
            <SessionList
              sessions={filteredSessions()}
              onSessionClicked={setSelectedSessionId}
              onEdit={id => {setEditId(id); setShowForm(true);}}
              onDelete={handleDeleteSession}
              emptyText="No surf sessions found! Paddle out and start logging some stoke."
            />
          </div>
        )}
      </main>

      {/* Animated Oceanic SVG effect (deeper opacity) */}
      <svg width="100%" height="100" style={{
          position:'fixed', bottom:0, left:0, zIndex:3, pointerEvents:'none'
        }} viewBox="0 0 1440 100" fill="none"
      >
        <defs>
          <linearGradient id="oceanWave1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0f80d9" stopOpacity="0.16"/>
            <stop offset="100%" stopColor="#41f2ff" stopOpacity="0.26"/>
          </linearGradient>
          <linearGradient id="oceanWave2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1ff6f8" stopOpacity="0.21"/>
            <stop offset="100%" stopColor="#2477c7" stopOpacity="0.14"/>
          </linearGradient>
        </defs>
        <path d="M0,87 Q380,20 720,93 T1440,87 L1440,100 L0,100Z" fill="url(#oceanWave1)"/>
        <path d="M0,99 Q380,59 800,98 T1440,99 L1440,100 L0,100Z" fill="url(#oceanWave2)"/>
      </svg>
    </div>
  );
}

// --- Navigation Button Styling Helper ---
function navBtnStyle(selected) {
  return {
    background: selected ? 'rgba(242,255,248,0.23)' : 'transparent',
    border: 'none',
    color: '#F5E9DA',
    fontWeight: 500,
    fontSize:'1.03rem',
    borderRadius: 15,
    padding: selected ? '7px 18px' : '7px 16px',
    marginLeft: 1,
    marginRight: 1,
    boxShadow: selected ? '0 2px 6px #2ec4b641' : 'none',
    cursor: 'pointer',
    transition: 'background .18s'
  };
}

// PUBLIC_INTERFACE
function SessionList({ sessions, onSessionClicked, onEdit, onDelete, emptyText }) {
  if (!sessions.length) return (
    <div style={{
      margin:'60px auto 0 auto', color:'#639CB5', background:'rgba(236,252,255,.33)', border:'2px dashed #2EC4B6',
      borderRadius: 18, padding:'26px', maxWidth: 500, fontSize:'1.13rem', textAlign:'center'
    }}>
      <div style={{fontSize:'2.5rem',marginBottom:10}}>{icons.wave}</div>
      {emptyText}
    </div>
  );
  return (
    <div style={{margin:'0 auto', marginBottom:'3.7rem',maxWidth: 740,display:'grid',gap:24}}>
      {sessions.map(sess => (
        <div key={sess.id}
          className="surf-card"
          style={{
            background:'#F5E9DA',padding:'22px 15px 16px 18px',borderRadius:'22px',
            boxShadow: '0 3px 16px rgba(73,175,210,0.11)',cursor:'pointer',
            position:'relative',border:'1.5px solid #E9F7F8'
          }}
          onClick={() => onSessionClicked(sess.id)}
        >
          <div style={{fontWeight:600, color:'#3A8DAD',letterSpacing:.5,fontSize:'1.19rem'}}>
            {sess.spot}
          </div>
          <div style={{display:'flex', gap:'14px',alignItems:'center',marginTop:2}}>
            <div style={{color:'#367F95',fontSize:'1.07rem',fontWeight:500}}>
              {sess.board && (
                <span style={{marginRight:8,verticalAlign:'middle'}}>{icons.board}</span>
              )}
              {sess.board}
            </div>
            <div style={{color:'#7AC5C9',marginLeft:5,fontWeight:500}}>
              <span style={{marginRight:6}}>{icons.wave}</span>
              {sess.waves} waves
            </div>
            <div style={{marginLeft:'auto',minWidth:28}}>
              {icons.mood[sess.mood] || icons.mood.joy}
            </div>
            <div style={{color:'#bad3db', fontSize: '0.96em'}}>
              {sess.date}
            </div>
          </div>
          {/* Actions */}
          <div style={{
            position:'absolute',right:19,top:13,display:'flex',gap:2
          }} onClick={e=>e.stopPropagation()} >
            <button aria-label="Edit Session" title="Edit" 
              onClick={()=>onEdit(sess.id)}
              style={{background:'transparent',border:'none',marginRight:2,cursor:'pointer'}}>
              {icons.edit}
            </button>
            <button aria-label="Delete Session" title="Delete" 
              onClick={()=>onDelete(sess.id)} 
              style={{background:'transparent',border:'none',cursor:'pointer'}}>
              {icons.delete}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function SessionFilterBar({ filter, setFilter, sessions }) {
  // Compute options from sessions
  const spotOpts = Array.from(new Set(sessions.map(s => s.spot)));
  const boardOpts = Array.from(new Set(sessions.map(s => s.board)));
  const moodOpts = Array.from(new Set(sessions.map(s => s.mood)));

  return (
    <div style={{
      display:'flex',alignItems:'center',gap:'20px',justifyContent:'center',
      background:'rgba(62,202,212,.07)',padding:'9px 0',margin:'0 auto 22px auto',
      borderRadius:15, boxShadow:'0 1px 8px rgba(62,202,212,0.13)',maxWidth:690
    }}>
      <span style={{
        opacity: .79, letterSpacing:.7,fontSize:'1.1rem',display:'inline-flex',alignItems:'center', gap:8,
        color: "#338ab0", fontWeight:600
      }}>{icons.filter} Filter:</span>
      <select
        value={filter.spot}
        onChange={e=>setFilter(f=>({...f,spot:e.target.value}))}
        style={filterBarSelectStyle}
      >
        <option value="">All Spots</option>
        {spotOpts.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <select
        value={filter.board}
        onChange={e=>setFilter(f=>({...f,board:e.target.value}))}
        style={filterBarSelectStyle}
      >
        <option value="">All Boards</option>
        {boardOpts.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <select
        value={filter.mood}
        onChange={e=>setFilter(f=>({...f,mood:e.target.value}))}
        style={filterBarSelectStyle}
      >
        <option value="">All Moods</option>
        {moodOpts.map(mood => (
          <option key={mood} value={mood}>{moodOptions.find(m=>m.id===mood)?.label || mood}</option>
        ))}
      </select>
      <button
        onClick={()=>setFilter({spot:'',board:'',mood:''})}
        style={{
          background:'#3A8DAD',color:'#fff',fontWeight:500,padding:'7px 17px',border:'none',
          borderRadius:19,marginLeft:7,cursor:'pointer',fontSize:'1.04em',boxShadow:'0 1px 5px #3A8DAD22'
        }}>
        Reset
      </button>
    </div>
  );
}
const filterBarSelectStyle = {
  padding:'7px 20px 7px 10px', borderRadius:10, border:'1px solid #a9dce5',
  fontWeight:500, fontSize:'1.04rem', color:'#1A4552', background:'#e6fafb92',
  minWidth:120, margin:'0 3px'
};

// PUBLIC_INTERFACE
function SessionForm({ session, onSave, onCancel }) {
  // State
  const initialState = session || {
    date: new Date().toISOString().slice(0,10),
    spot: '',
    board: '',
    waves: '',
    mood: 'joy',
    conditions: { swell:'', wind:'', tide:'' },
    notes: '',
  };
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Validate fields
  function validate() {
    let e = {};
    if (!data.date) e.date = "Date required";
    if (!data.spot) e.spot = "Spot required";
    if (!data.board) e.board = "Board required";
    if (!data.waves || isNaN(Number(data.waves))) e.waves = "Waves (number)";
    return e;
  }

  // Handle field changes
  const handleChange = e => {
    const { name, value } = e.target;
    if (name in data) setData({ ...data, [name]: value });
    else if (name.includes('conditions.')) {
      const key = name.split('.')[1];
      setData({ ...data, conditions: {...data.conditions, [key]: value } });
    }
  };

  // Mood change (iconic)
  function handleMood(moodId) {
    setData({ ...data, mood: moodId });
  }

  // Form submit
  function handleSubmit(e) {
    e.preventDefault();
    const valid = validate();
    setErrors(valid);
    if (Object.keys(valid).length === 0) {
      onSave({...session, ...data});
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background:'#fff', borderRadius:25, maxWidth:500,margin:'33px auto', padding:'32px 15px 15px 30px',
      boxShadow:'0 3px 18px rgba(48,173,223,0.11)', border:'2px solid #3A8DAD22'
    }}>
      <h2 style={{color:'#3A8DAD',marginBottom:10,marginTop:2,letterSpacing:1.1,display:'flex',alignItems:'center',gap:8}}>
        {icons.wave} {session ? "Edit Session" : "Log New Session"}
      </h2>
      <div style={{display:'grid',gap:10,marginTop:18}}>
        {/* Date */}
        <label>
          <span style={labelStyle}>Date</span>
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={handleChange}
            style={inputStyle(errors.date)}
          />
          {errors.date && <FieldError text={errors.date}/>}
        </label>
        {/* Spot */}
        <label>
          <span style={labelStyle}>Surf Spot</span>
          <input
            type="text"
            name="spot"
            list="spot-list"
            value={data.spot}
            onChange={handleChange}
            style={inputStyle(errors.spot)}
            placeholder="Enter or select spot"
          />
          <datalist id="spot-list">
            {spots.map(s=><option key={s}>{s}</option>)}
          </datalist>
          {errors.spot && <FieldError text={errors.spot}/>}
        </label>
        {/* Board */}
        <label>
          <span style={labelStyle}>Board</span>
          <select
            name="board"
            value={data.board}
            onChange={handleChange}
            style={inputStyle(errors.board)}
          >
            <option value="">Select board type</option>
            {boardTypes.map(b=><option key={b}>{b}</option>)}
          </select>
          {errors.board && <FieldError text={errors.board}/>}
        </label>
        {/* Wave Count */}
        <label>
          <span style={labelStyle}>Wave Count</span>
          <input
            type="number"
            name="waves"
            value={data.waves}
            onChange={handleChange}
            min="0"
            style={inputStyle(errors.waves)}
            placeholder="How many rides?"
          />
          {errors.waves && <FieldError text={errors.waves}/>}
        </label>
        {/* Mood */}
        <label>
          <span style={labelStyle}>Mood</span>
          <div style={{display:'flex',gap:16,alignItems:'center',marginTop:4}}>
            {moodOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={()=>handleMood(opt.id)}
                style={{
                  border:'none',borderRadius:14,padding:'7px 12px',background:data.mood===opt.id ? '#2EC4B6' : '#F5E9DA',
                  outline: data.mood===opt.id ? '2px solid #2EC4B6' : 'none',
                  boxShadow: data.mood===opt.id ? '0 1.5px 8px #2ec4b641' : 'none',
                  cursor:'pointer'
                }}>
                <span>{opt.icon}</span> <span style={{
                  color: data.mood===opt.id ? '#fff' : '#2EC4B6',marginLeft:4,fontWeight:600
                }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </label>
        {/* Conditions */}
        <div style={{display:'flex', gap:11, alignItems:'flex-end'}}>
          <label style={{flex:1}}>
            <span style={labelStyle}><span style={{fontWeight:'bold'}}>Swell</span> (ft)</span>
            <input
              type="text"
              name="conditions.swell"
              value={data.conditions?.swell || ''}
              placeholder="eg. 4-6ft"
              onChange={handleChange}
              style={inputStyle()}
            />
          </label>
          <label style={{flex:1}}>
            <span style={labelStyle}>Wind</span>
            <select
              name="conditions.wind"
              value={data.conditions?.wind || ""}
              onChange={handleChange}
              style={inputStyle()}
            >
              <option value="">Wind</option>
              <option>Offshore</option>
              <option>Onshore</option>
              <option>Sideshore</option>
              <option>Light</option>
              <option>Strong</option>
            </select>
          </label>
          <label style={{flex:1}}>
            <span style={labelStyle}>Tide</span>
            <select
              name="conditions.tide"
              value={data.conditions?.tide || ""}
              onChange={handleChange}
              style={inputStyle()}
            >
              <option value="">Tide</option>
              <option>Low</option>
              <option>Mid</option>
              <option>High</option>
              <option>Incoming</option>
              <option>Outgoing</option>
            </select>
          </label>
        </div>
        {/* Notes */}
        <label>
          <span style={labelStyle}>Notes</span>
          <textarea
            name="notes"
            value={data.notes}
            onChange={handleChange}
            style={{
              ...inputStyle(),
              minHeight:50,
              background:'#F5E9DA'
            }}
            placeholder="How was the vibe, highlight, wildlife, lineup, etc?"
          />
        </label>
        {/* Actions */}
        <div style={{
          display:'flex',justifyContent:'flex-end',gap:14,marginTop:14
        }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background:'none',color:'#3A8DAD',border:'1.5px solid #2EC4B6',
              padding:'9px 21px',borderRadius:10,fontWeight:500,fontSize:'1.11rem',cursor:'pointer'
            }}>
            Cancel
          </button>
          <button
            type="submit"
            style={{
              background:'#3A8DAD',color:'#fff',border:'none',
              padding:'10px 36px',borderRadius:18,fontWeight:700,fontSize:'1.15rem', cursor:'pointer'
            }}>
            {session ? "Save" : "Add Session"}
          </button>
        </div>
      </div>
    </form>
  );
}
const inputStyle = (error) => ({
  borderRadius:8, border:error? '2px solid #FF686B':'1px solid #BADCE2',
  padding:'7px 10px', fontSize:'1.07rem',marginTop:2,marginBottom:2,
  width:'100%', background:'#F5E9DA', color:'#17586B'
});
const labelStyle = {color:'#399FA8',marginBottom:2,fontWeight:600,display:'block'};
function FieldError({text}) {
  return <span style={{color:'#FF686B',fontWeight:500,fontSize: '.95em'}}>{text}</span>;
}

// PUBLIC_INTERFACE
function SessionDetail({session, onBack, onEdit, onDelete}) {
  if (!session) return null;
  return (
    <div style={{
      maxWidth:550, margin:'33px auto', background:'#fff', borderRadius:28,
      boxShadow:'0 4.5px 16px rgba(50,136,170,0.13)',border:'2px solid #3A8DAD22',
      padding:'2.1rem 2.1rem 1.6rem 2.1rem',position:'relative'
    }}>
      <button aria-label="Back" onClick={onBack}
        style={{
          position:'absolute',left:12,top:12,background:'#3A8DAD',border:'none',borderRadius:10,padding:'6px 16px',
          color:'#fff',fontWeight:500,cursor:'pointer'
        }}>&#8592; Back</button>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
        <h2 style={{
          color:'#3A8DAD',margin:0,fontWeight:700,letterSpacing:1.1,display:'flex',alignItems:'center',gap:8
        }}>
          {session.spot} {icons.wave}
        </h2>
        <div style={{display:'flex',gap:8}}>
          <button aria-label="Edit Session" title="Edit"
            onClick={onEdit} style={{
              background:'#2EC4B6',border:'none',padding:'6px',borderRadius:10,cursor:'pointer'
            }}>{icons.edit}</button>
          <button aria-label="Delete Session" title="Delete"
            onClick={onDelete} style={{
              background:'#FF686B',border:'none',padding:'6px',borderRadius:10,cursor:'pointer'
            }}>{icons.delete}</button>
        </div>
      </div>
      <div style={{marginTop:4,color:'#BAD5DB',fontWeight:500}}>{session.date}</div>
      <div style={{margin:'18px 0 16px 0',fontSize:'1.05rem'}}>
        <strong style={{color:'#2EC4B6',fontWeight:600}}>Board:</strong> {session.board} {icons.board}
      </div>
      <div style={{fontSize:'1.13rem',color:'#309EAB',fontWeight:600,marginBottom:8}}>
        <span>{icons.wave}</span> {session.waves} waves
      </div>
      {/* Ocean conditions */}
      <div style={{display:'flex',gap:18,marginBottom:8}}>
        <div><strong style={{color:'#a2b3c8'}}>Swell:</strong> {session.conditions.swell || '-'}</div>
        <div><strong style={{color:'#a2b3c8'}}>Wind:</strong> {session.conditions.wind || '-'}</div>
        <div><strong style={{color:'#a2b3c8'}}>Tide:</strong> {session.conditions.tide || '-'}</div>
      </div>
      {/* Mood */}
      <div style={{margin:'14px 0 10px 0'}}>
        <strong style={{color:'#2EC4B6'}}>Mood:</strong>
        <span style={{marginLeft:14,verticalAlign:'middle'}}>{icons.mood[session.mood] || 'Joy'}</span>
      </div>
      {/* Notes */}
      {session.notes && (
        <div style={{
          background:'#F5E9DA',borderRadius:10,padding:'10px 15px',color:'#397B89',margin:'12px 0',fontWeight:500
        }}>
          <span style={{color:'#2EC4B6',marginRight:8}}>Notes:</span> {session.notes}
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
function StatsDashboard({ allSessions }) {
  // --- Charts logic (dummy data sample) ---
  // 1. Most visited spot
  const spotFreq = {};
  allSessions.forEach(s => {spotFreq[s.spot]=(spotFreq[s.spot]||0)+1;});
  const mostSpot = Object.entries(spotFreq).sort((a,b)=>b[1]-a[1])[0];

  // 2. Board Usage %
  const boardFreq = {};
  allSessions.forEach(s => {boardFreq[s.board]=(boardFreq[s.board]||0)+1;});
  const boardNames = Object.keys(boardFreq);
  const boardCounts = Object.values(boardFreq);
  const totalBoards = boardCounts.reduce((a,b)=>a+b,0);

  // 3. Mood trend (by date, line chart)
  // Sort by date asc
  let moodByDate = allSessions.slice().sort((a,b)=>a.date.localeCompare(b.date))
    .map(s => [s.date, s.mood]);
  let moodMap = {joy:2, neutral:1, sad:0};
  let moodLabels = ['sad','neutral','joy'];

  return (
    <div style={{
      background:'#F5E9DA',borderRadius:28,padding:'36px 12px',maxWidth:680,margin:'33px auto',
      boxShadow:'0 5px 12px #2ec4b625', border:'2px solid #3A8DAD22'
    }}>
      <h2 style={{color:'#3A8DAD',letterSpacing:1.1,fontWeight:700, marginBottom:18,display:'flex', alignItems:'center', gap:8}}>
        {icons.stats} Stats Dashboard
      </h2>
      <div>
        <div style={{fontWeight:600,color:'#3A8DAD',marginBottom:7,fontSize:'1.06rem'}}>Most Visited Spot</div>
        <div style={{
          background:'#E9F7F8',padding:'11px 17px',borderRadius:12,display:'flex',alignItems:'center',gap:8
        }}>
          <span style={{fontSize:'1.5rem'}}>{icons.wave}</span>
          <span style={{fontWeight:600}}>{mostSpot?.[0] || 'N/A'}</span>
          <span style={{
            marginLeft:15, color:'#2EC4B6', background:'#fff', fontWeight:500,
            borderRadius:8,padding:'3px 13px',fontSize:'.95rem',marginRight:8
          }}>
            {mostSpot?.[1] || 0} Sessions
          </span>
        </div>
      </div>
      {/* Board Usage Pie */}
      <div style={{margin:'32px 0 25px 0'}}>
        <div style={{fontWeight:600,color:'#3A8DAD',marginBottom:7,fontSize:'1.06rem'}}>Board Usage %</div>
        <PieChart labels={boardNames} data={boardCounts} colors={boardNames.map((_,i)=>pieColors[i%pieColors.length])}/>
        <div style={{display:'flex',gap:16,justifyContent:'center',marginTop:10,flexWrap:'wrap'}}>
          {boardNames.map((name,i)=>
            <span key={name} style={{color:'#218497',fontWeight:500, background: pieColors[i%pieColors.length],
            borderRadius:8, padding:'2px 10px', fontSize:'.98em'}}>{name} ({Math.round(boardFreq[name]/totalBoards*100)||0}%)</span>
          )}
        </div>
      </div>
      {/* Mood trend line (SVG) */}
      <div>
        <div style={{fontWeight:600,color:'#3A8DAD',marginBottom:7,fontSize:'1.06rem'}}>Mood Trend</div>
        <MoodLineChart moodByDate={moodByDate} moodMap={moodMap} />
        <div style={{display:'flex',gap:18,justifyContent:'center',marginTop:9,alignItems:'center'}}>
          {moodLabels.map(m => <span key={m} style={{
            color: ['#24586B','#397B89','#FFD23F'][moodMap[m]],
            fontWeight:500, display:'flex',alignItems:'center',gap:6
          }}>{icons.mood[m]} {m.charAt(0).toUpperCase() + m.slice(1)}</span>)}
        </div>
      </div>
    </div>
  );
}
const pieColors = ['#3A8DAD','#2EC4B6','#FFD23F','#B7D5E7','#FF686B'];
// PieChart: Minimal SVG pie
function PieChart({ labels, data, colors }) {
  const sum = data.reduce((a,b)=>a+b,0)||1;
  let acc = 0;
  return (
    <svg viewBox="0 0 32 32" width="110" height="110" style={{display:'block',margin:'0 auto 0 auto'}}>
      {data.map((d,i)=>{
        const start = acc/sum * 2*Math.PI;
        acc += d;
        const end = acc/sum * 2*Math.PI;
        const x1 = 16 + 16*Math.sin(start);
        const y1 = 16 - 16*Math.cos(start);
        const x2 = 16 + 16*Math.sin(end);
        const y2 = 16 - 16*Math.cos(end);
        const large = d/sum > 0.5 ? 1 : 0;
        return (
          <path
            key={labels[i]}
            d={
              `M16,16 L${x1},${y1} A16,16 0 ${large} 1 ${x2},${y2} Z`
            }
            fill={colors[i]}
            stroke="#fff"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}
// Mood trend (line chart): date x, mood level y
function MoodLineChart({moodByDate, moodMap}) {
  // SVG: width=220, height=50, margin=6
  if (!moodByDate.length) return <div style={{color:'#B7D5E7'}}>No data</div>;
  const w=220, h=50, m=6;
  const xStep = (w-2*m)/(moodByDate.length-1||1);
  const yPos = v => h-m-(moodMap[v]*((h-2*m)/2));
  let points = moodByDate.map(([dt, mood],i) => [m+i,xStep*i+m,yPos(mood)]);
  let path = '';
  for (let i=0;i<points.length;i++) {
    path+=(i?'L':'M')+points[i][1]+','+points[i][2];
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{display:'block'}}>
      {/* Baseline */}
      <line x1={m} x2={w-m} y1={h-m} y2={h-m} stroke="#BADCE2" strokeWidth="1"/>
      <path d={path} fill="none" stroke="#FFD23F" strokeWidth="3" />
      {points.map(([dt,x,y],i)=>
        <circle key={dt} cx={x} cy={y} r="3.7" fill="#2EC4B6"/>
      )}
    </svg>
  );
}

// Main App Wrapper
function App() {
  return <SurfSyncApp />;
}

export default App;
