export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 32 }}>
      <section style={{ maxWidth: 760, textAlign: 'center' }}>
        <p style={{ letterSpacing: '0.2em', fontSize: 12 }}>GLAMFLOW</p>
        <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', margin: '16px 0' }}>Create. Automate. Grow.</h1>
        <p style={{ fontSize: 20, lineHeight: 1.6, opacity: 0.72 }}>
          The AI operating system for social content, publishing, and audience growth.
        </p>
      </section>
    </main>
  );
}
