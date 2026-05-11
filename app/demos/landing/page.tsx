export const metadata = { title: 'Acme — Demo Landing' };

export default function DemoLanding() {
  return (
    <main
      style={{
        margin: 0,
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#0a0a0a',
        paddingTop: 60,
      }}
    >
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
        }}
      >
        <div style={{ fontWeight: 700, letterSpacing: -0.3 }}>◆ Acme</div>
        <button
          style={{
            background: '#0a0a0a',
            color: '#fff',
            border: 'none',
            padding: '6px 12px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          Sign in
        </button>
      </nav>

      <section style={{ padding: '32px 20px 24px' }}>
        <div
          style={{
            display: 'inline-block',
            background: '#f4f4f5',
            color: '#52525b',
            padding: '4px 10px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          ✨ New — Acme 2.0
        </div>
        <h1
          style={{
            fontSize: 34,
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: -1,
            margin: '0 0 12px',
          }}
        >
          The fastest way to ship&nbsp;mobile.
        </h1>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.5,
            color: '#52525b',
            margin: '0 0 20px',
          }}
        >
          Preview your landing pages inside a real device frame — no Xcode, no
          simulator, no fuss.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            style={{
              flex: 1,
              background: '#0a0a0a',
              color: '#fff',
              border: 'none',
              padding: '12px 16px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Get started
          </button>
          <button
            style={{
              flex: 1,
              background: '#fff',
              color: '#0a0a0a',
              border: '1px solid #e4e4e7',
              padding: '12px 16px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            View demo
          </button>
        </div>
      </section>

      <section style={{ padding: '8px 20px 32px' }}>
        <h2
          style={{
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: '#71717a',
            margin: '24px 0 12px',
            fontWeight: 600,
          }}
        >
          Why teams choose Acme
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: '⚡', t: 'Instant preview', d: 'See changes the moment you save.' },
            { icon: '📱', t: 'Real device frames', d: 'iPhone, Pixel, iPad — all included.' },
            { icon: '🌐', t: 'Multi-host', d: 'Swap between local, staging, and prod.' },
            { icon: '🪶', t: 'Zero dependencies', d: 'Drop in one file. Done.' },
          ].map((f) => (
            <div
              key={f.t}
              style={{
                display: 'flex',
                gap: 14,
                padding: 14,
                background: '#fff',
                border: '1px solid #e4e4e7',
                borderRadius: 14,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: '#f4f4f5',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                  {f.t}
                </div>
                <div style={{ fontSize: 13, color: '#71717a', lineHeight: 1.4 }}>
                  {f.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer
        style={{
          padding: '24px 20px 40px',
          fontSize: 12,
          color: '#a1a1aa',
          textAlign: 'center',
        }}
      >
        © Acme Inc. — demo content
      </footer>
    </main>
  );
}
