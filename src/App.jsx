import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const colors = {
  primary: '#0D9488',
  secondary: '#0F172A',
  accent: '#FACC15',
}

function LanguageToggle({ lang, setLang }) {
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
      className="px-3 py-1 text-sm rounded border"
      style={{ borderColor: colors.accent, color: colors.accent }}
    >
      {lang === 'en' ? 'አማርኛ' : 'English'}
    </button>
  )
}

function Navbar({ lang, setLang }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b" style={{ borderColor: '#e5e7eb' }}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl" style={{ color: colors.primary }}>
          Ahadu Travel
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/services" className="hover:opacity-80">{lang === 'en' ? 'Services' : 'አገልግሎቶች'}</Link>
          <Link to="/blog" className="hover:opacity-80">Blog</Link>
          <Link to="/appointment" className="hover:opacity-80">{lang === 'en' ? 'Appointment' : 'መቀጠልያ'}</Link>
          <LanguageToggle lang={lang} setLang={setLang} />
        </nav>
      </div>
    </header>
  )
}

function Hero({ lang }) {
  const [hero, setHero] = useState(null)
  useEffect(() => {
    fetch(`${API_BASE}/api/hero`).then(r => r.json()).then(setHero).catch(()=>{})
  }, [])

  const title = lang === 'en' ? hero?.title_en : hero?.title_am
  const subtitle = lang === 'en' ? hero?.subtitle_en : hero?.subtitle_am

  return (
    <section className="relative">
      <div className="relative">
        <img
          src={hero?.image_url || 'https://images.unsplash.com/photo-1558980664-10de6b87b5c2?q=80&w=1600&auto=format&fit=crop'}
          alt="Ethiopia"
          className="w-full h-[60vh] object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>{title || 'Discover Ethiopia with Ahadu Travel'}</h1>
            <p className="mt-4 text-white/90 text-lg md:text-2xl">{subtitle || 'Tailored trips, local expertise, unforgettable experiences.'}</p>
            <div className="mt-6">
              <Link to="/appointment" className="px-6 py-3 rounded font-semibold"
                style={{ background: colors.accent, color: colors.secondary }}>
                {lang === 'en' ? 'Book an Appointment' : 'ቀጠሮ ይያዙ'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesPreview() {
  const [items, setItems] = useState([])
  useEffect(() => { fetch(`${API_BASE}/api/services`).then(r=>r.json()).then(setItems).catch(()=>{}) }, [])
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Popular Services</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map(s => (
          <div key={s.id} className="rounded-lg overflow-hidden border bg-white">
            <img src={s.image_url || 'https://images.unsplash.com/photo-1562684862-0f5a2f9d7d3a?q=80&w=800&auto=format&fit=crop'} alt={s.title} className="h-44 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function BlogList() {
  const [posts, setPosts] = useState([])
  useEffect(() => { fetch(`${API_BASE}/api/blog`).then(r=>r.json()).then(setPosts).catch(()=>{}) }, [])
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Latest Blog Posts</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map(p => (
          <Link key={p.id} to={`/blog/${p.slug}`} className="rounded-lg overflow-hidden border bg-white">
            <img src={p.cover_image || 'https://images.unsplash.com/photo-1549965738-e1aaf1168944?q=80&w=800&auto=format&fit=crop'} alt={p.title} className="h-44 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{new Date(p.created_at || Date.now()).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function HomePage({ lang, setLang }) {
  return (
    <div>
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <ServicesPreview />
      <div className="max-w-6xl mx-auto px-4"><hr className="my-8" /></div>
      <BlogList />
      <CTA />
      <Footer />
    </div>
  )
}

function CTA() {
  return (
    <section className="text-center py-16" style={{ background: colors.primary }}>
      <h3 className="text-white text-2xl font-semibold">Ready to plan your trip?</h3>
      <p className="text-white/90 mt-2">Talk to our local experts and get a custom itinerary.</p>
      <Link to="/appointment" className="inline-block mt-4 px-6 py-3 rounded font-semibold" style={{ background: colors.accent, color: colors.secondary }}>Book an Appointment</Link>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 text-center" style={{ background: colors.secondary }}>
      <p className="text-white/80">© {new Date().getFullYear()} Ahadu Travel Solutions</p>
    </footer>
  )
}

function ServicesPage() {
  const [items, setItems] = useState([])
  useEffect(() => { fetch(`${API_BASE}/api/services`).then(r=>r.json()).then(setItems).catch(()=>{}) }, [])
  return (
    <div>
      <Navbar lang={'en'} setLang={()=>{}} />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Our Services</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map(s => (
            <div key={s.id} className="rounded-lg overflow-hidden border bg-white">
              <img src={s.image_url || 'https://images.unsplash.com/photo-1562684862-0f5a2f9d7d3a?q=80&w=800&auto=format&fit=crop'} alt={s.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

function BlogPage() {
  const [posts, setPosts] = useState([])
  const [q, setQ] = useState('')
  useEffect(() => { fetch(`${API_BASE}/api/blog`).then(r=>r.json()).then(setPosts).catch(()=>{}) }, [])
  const filtered = posts.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <Navbar lang={'en'} setLang={()=>{}} />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Blog</h1>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search posts" className="border rounded px-3 py-2 w-64" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map(p => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="rounded-lg overflow-hidden border bg-white">
              <img src={p.cover_image || 'https://images.unsplash.com/photo-1549965738-e1aaf1168944?q=80&w=800&auto=format&fit=crop'} alt={p.title} className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{new Date(p.created_at || Date.now()).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  useEffect(() => { fetch(`${API_BASE}/api/blog/${slug}`).then(r=>r.json()).then(setPost).catch(()=>{}) }, [slug])
  if (!post) return <div className="p-8">Loading...</div>
  return (
    <div>
      <Navbar lang={'en'} setLang={()=>{}} />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <img src={post.cover_image} alt={post.title} className="w-full h-72 object-cover rounded" />
        <h1 className="text-4xl font-bold mt-6">{post.title}</h1>
        <div className="prose max-w-none mt-4" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <Footer />
    </div>
  )
}

function AppointmentPage() {
  const [form, setForm] = useState({ full_name:'', email:'', phone:'', destination:'', service_type:'', date:'', message:'' })
  const [status, setStatus] = useState(null)
  const submit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const res = await fetch(`${API_BASE}/api/appointments`, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Error')
      setStatus('✅ Booked! We will contact you shortly.')
      setForm({ full_name:'', email:'', phone:'', destination:'', service_type:'', date:'', message:'' })
    } catch (e) {
      setStatus('❌ ' + e.message)
    }
  }
  return (
    <div>
      <Navbar lang={'en'} setLang={()=>{}} />
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>
        <form onSubmit={submit} className="space-y-4">
          {[
            ['full_name','Full Name'],
            ['email','Email'],
            ['phone','Phone'],
            ['destination','Destination'],
            ['service_type','Service Type'],
            ['date','Date'],
          ].map(([key,label]) => (
            <div key={key}>
              <label className="block text-sm mb-1">{label}</label>
              <input value={form[key]} onChange={e=>setForm({ ...form, [key]: e.target.value })} className="w-full border rounded px-3 py-2" required={['full_name','email','phone','date'].includes(key)} />
            </div>
          ))}
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea value={form.message} onChange={e=>setForm({ ...form, message: e.target.value })} className="w-full border rounded px-3 py-2" rows={4} />
          </div>
          <button className="px-6 py-3 rounded font-semibold text-white" style={{ background: colors.primary }}>Submit</button>
          {status && <p className="mt-2 text-sm">{status}</p>}
        </form>
      </div>
      <Footer />
    </div>
  )
}

function AppShell() {
  const [lang, setLang] = useState('en')
  return (
    <Routes>
      <Route path="/" element={<HomePage lang={lang} setLang={setLang} />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
