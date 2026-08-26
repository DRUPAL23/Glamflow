'use client';

import { useEffect, useState } from 'react';

type Content = { id:string; title:string; body:string; platform:string; status:string; scheduledAt:string|null };

export default function Dashboard() {
  const [items, setItems] = useState<Content[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  async function load() { const r = await fetch(`${api}/api/content`); const j = await r.json(); setItems(j.data); }
  async function create() {
    if (!title.trim()) return;
    await fetch(`${api}/api/content`, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({title, body}) });
    setTitle(''); setBody(''); load();
  }
  useEffect(() => { load(); }, []);

  return <main className="dashboard">
    <header><div><p className="eyebrow">GLAMFLOW AI</p><h1>Content command center</h1><p>Create, organize and prepare social content from one workspace.</p></div><span className="status">● System online</span></header>
    <section className="composer"><h2>Create content</h2><input placeholder="Content title" value={title} onChange={e=>setTitle(e.target.value)} /><textarea placeholder="Write a caption, brief or creative direction..." value={body} onChange={e=>setBody(e.target.value)} /><button onClick={create}>Create draft</button></section>
    <section><div className="sectionHead"><h2>Content pipeline</h2><span>{items.length} items</span></div><div className="grid">{items.map(item=><article key={item.id}><div className="tag">{item.platform}</div><h3>{item.title}</h3><p>{item.body || 'No caption yet.'}</p><footer><span>{item.status}</span>{item.scheduledAt && <time>{new Date(item.scheduledAt).toLocaleString()}</time>}</footer></article>)}{items.length===0 && <div className="empty">No content yet. Create your first draft above.</div>}</div></section>
  </main>;
}
