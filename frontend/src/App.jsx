import { useState, useRef, useEffect } from 'react'
import './App.css'

const PROFILE = {
  name: 'Lokesh Rawat',
  role: 'Software Developer',
  skills: ['Python', 'FastAPI', 'React', 'Machine Learning', 'SQL', 'Docker'],
  experience: ['AI/ML Projects', 'Full Stack Development', 'API Design'],
  education: 'B.Tech Computer Science',
}

const SUGGESTIONS = [
  { icon: '🛠️', text: 'What are your top skills?' },
  { icon: '💼', text: 'Tell me about your work experience.' },
  { icon: '🚀', text: 'What projects have you built?' },
  { icon: '🎓', text: 'What is your educational background?' },
  { icon: '📜', text: 'Do you have any certifications?' },
  { icon: '📞', text: 'How can I contact you?' },
]

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function TypingDots() {
  return (
    <span className="typing-dots">
      <span /><span /><span />
    </span>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`message ${msg.role}`}>
      {!isUser && (
        <div className="avatar bot-avatar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7 14v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2H7m-4 6h18v2H3v-2z"/></svg>
        </div>
      )}
      <div className="bubble-wrap">
        <div className="bubble">{msg.text}</div>
        <div className="timestamp">{msg.time}</div>
      </div>
      {isUser && <div className="avatar user-avatar">You</div>}
    </div>
  )
}

function LandingPage({ onStart, dark, setDark }) {
  return (
    <div className="landing">
      <button className="theme-toggle landing-theme" onClick={() => setDark(d => !d)}>
        {dark ? '☀️' : '🌙'}
      </button>
      <div className="landing-glow" />
      <div className="landing-card">
        <div className="landing-avatar-wrap">
          <div className="landing-avatar">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7 14v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2H7m-4 6h18v2H3v-2z"/></svg>
          </div>
          <div className="landing-badge">AI Powered</div>
        </div>
        <h1 className="landing-title">HireMai</h1>
        <p className="landing-sub">Your intelligent candidate interview assistant</p>

        <div className="landing-profile-card">
          <div className="lp-initials">{PROFILE.name.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <div className="lp-name">{PROFILE.name}</div>
            <div className="lp-role">{PROFILE.role}</div>
          </div>
        </div>

        <div className="landing-skills">
          {PROFILE.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
        </div>

        <p className="landing-desc">
          Ask anything about this candidate — skills, experience, projects, education, and more.
        </p>

        <button className="landing-btn" onClick={onStart}>
          Start Interview
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>

        <div className="landing-hints">
          {SUGGESTIONS.slice(0, 3).map((s, i) => (
            <span key={i} className="landing-hint">{s.icon} {s.text}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Sidebar({ onAsk, onClose }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Candidate Profile</span>
        <button className="icon-btn" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div className="sidebar-profile">
        <div className="sidebar-avatar">{PROFILE.name.split(' ').map(n => n[0]).join('')}</div>
        <div className="sidebar-name">{PROFILE.name}</div>
        <div className="sidebar-role">{PROFILE.role}</div>
        <div className="online-badge"><span className="dot" />Available</div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">🛠️ Skills</div>
        <div className="sidebar-tags">
          {PROFILE.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">💼 Experience</div>
        {PROFILE.experience.map(e => (
          <div key={e} className="sidebar-item">
            <span className="sidebar-dot" />
            {e}
          </div>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">🎓 Education</div>
        <div className="sidebar-item">
          <span className="sidebar-dot" />
          {PROFILE.education}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">⚡ Quick Ask</div>
        <div className="quick-ask-list">
          {SUGGESTIONS.map((s, i) => (
            <button key={i} className="quick-ask-btn" onClick={() => onAsk(s.text)}>
              <span>{s.icon}</span> {s.text}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default function App() {
  const [page, setPage] = useState('landing')
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hi! I'm HireMai 👋 Ask me anything about ${PROFILE.name}.`, time: now() }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [dark, setDark] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (question) => {
    const q = (question ?? input).trim()
    if (!q || loading) return
    setMessages(prev => [...prev, { role: 'user', text: q, time: now() }])
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setLoading(true)
    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail ?? `Error ${res.status}`)
      setMessages(prev => [...prev, { role: 'assistant', text: data.answer, time: now() }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: `⚠️ ${err.message}`, time: now() }])
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => setMessages([
    { role: 'assistant', text: `Hi! I'm HireMai 👋 Ask me anything about ${PROFILE.name}.`, time: now() }
  ])

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const handleInput = (e) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px'
  }

  if (page === 'landing') {
    return <LandingPage onStart={() => setPage('chat')} dark={dark} setDark={setDark} />
  }

  const showSuggestions = messages.length === 1 && !loading

  return (
    <div className="app-layout">
      {sidebarOpen && <Sidebar onAsk={sendMessage} onClose={() => setSidebarOpen(false)} />}

      <div className="chat-container">
        <div className="chat-header">
          <div className="header-left">
            <button className="icon-btn" onClick={() => setSidebarOpen(o => !o)} title="Toggle sidebar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <div className="header-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7 14v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2H7m-4 6h18v2H3v-2z"/></svg>
            </div>
            <div>
              <div className="header-title">HireMai</div>
              <div className="status"><span className="dot" />Online</div>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-btn" onClick={clearChat} title="Clear chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </button>
            <button className="icon-btn" onClick={() => setDark(d => !d)} title="Toggle theme">
              {dark
                ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>
            <button className="icon-btn" onClick={() => setPage('landing')} title="Home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}
          {loading && (
            <div className="message assistant">
              <div className="avatar bot-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7 14v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2H7m-4 6h18v2H3v-2z"/></svg>
              </div>
              <div className="bubble-wrap">
                <div className="bubble"><TypingDots /></div>
              </div>
            </div>
          )}
          {showSuggestions && (
            <div className="suggestions">
              <div className="suggestions-label">Try asking</div>
              <div className="suggestions-grid">
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} className="suggestion-chip" onClick={() => sendMessage(s.text)}>
                    <span className="chip-icon">{s.icon}</span>
                    {s.text}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input-wrap">
          <div className="chat-input">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKey}
              placeholder="Ask about the candidate... (Enter to send)"
              rows={1}
            />
            <button className="send-btn" onClick={() => sendMessage()} disabled={loading || !input.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          <div className="input-hint">Press Enter to send · Shift+Enter for new line</div>
        </div>
      </div>
    </div>
  )
}
