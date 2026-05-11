'use client';

import { useState } from 'react';
import PhoneMock, { type PhoneFrame } from 'mockupphone';

const HOSTS = [
  { label: 'Demo: landing', url: 'http://localhost:3000/demos/landing' },
  { label: 'Demo: app',     url: 'http://localhost:3000/demos/app' },
  { label: 'example.com',   url: 'https://example.com' },
];

const FRAMES: { id: PhoneFrame; label: string; section?: string }[] = [
  { id: 'iphone-15-pro', label: 'iPhone 15 Pro', section: 'Modern' },
  { id: 'pixel-8',       label: 'Pixel 8' },
  { id: 'iphone-se',     label: 'iPhone SE' },
  { id: 'blackberry',    label: 'BlackBerry', section: 'Retro' },
  { id: 'razr-v3',       label: 'Motorola Razr V3' },
  { id: 'lg-env2',       label: 'LG enV2' },
];

export default function Home() {
  const [frame, setFrame] = useState<PhoneFrame>('iphone-15-pro');
  const [showCode, setShowCode] = useState(false);

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at top, #fafafa 0%, #f4f4f5 50%, #e9e9ec 100%)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          padding: '48px 24px 80px',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 320px) 1fr',
          gap: 48,
          alignItems: 'start',
        }}
      >
        {/* Left rail: controls + docs */}
        <aside
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            position: 'sticky',
            top: 32,
          }}
        >
          <header>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.4, color: '#a1a1aa', fontWeight: 600 }}>
              Component
            </div>
            <h1 style={{ margin: '4px 0 8px', fontSize: 28, fontWeight: 700, letterSpacing: -0.6 }}>
              PhoneMock
            </h1>
            <p style={{ margin: 0, color: '#52525b', fontSize: 14, lineHeight: 1.5 }}>
              Drop a framed mobile iframe into any React/Next app. Toggle between
              hosts to preview the same path across environments.
            </p>
          </header>

          <section>
            <Label>Frame</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {FRAMES.map((f) => (
                <div key={f.id}>
                  {f.section && (
                    <div
                      style={{
                        fontSize: 10,
                        textTransform: 'uppercase',
                        letterSpacing: 1.2,
                        color: '#a1a1aa',
                        fontWeight: 600,
                        margin: '10px 0 4px',
                      }}
                    >
                      {f.section}
                    </div>
                  )}
                  <button
                    onClick={() => setFrame(f.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 12px',
                      fontSize: 13,
                      borderRadius: 8,
                      border: '1px solid',
                      borderColor: frame === f.id ? '#0a0a0a' : '#e4e4e7',
                      background: frame === f.id ? '#0a0a0a' : '#fff',
                      color: frame === f.id ? '#fff' : '#0a0a0a',
                      cursor: 'pointer',
                      fontWeight: 500,
                      transition: 'all 120ms',
                    }}
                  >
                    {f.label}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <button
              onClick={() => setShowCode((v) => !v)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px 12px',
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 8,
                border: '1px solid #e4e4e7',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>How to use</span>
              <span style={{ color: '#a1a1aa' }}>{showCode ? '−' : '+'}</span>
            </button>
            {showCode && (
              <pre
                style={{
                  background: '#0a0a0a',
                  color: '#e4e4e7',
                  padding: 14,
                  borderRadius: 8,
                  overflow: 'auto',
                  fontSize: 11.5,
                  lineHeight: 1.55,
                  margin: '8px 0 0',
                }}
              >{`// 1. Copy components/PhoneMock.tsx
// 2. Use it:

import PhoneMock from '@/components/PhoneMock';

<PhoneMock
  hosts={[
    { label: 'local',   url: 'http://localhost:3000' },
    { label: 'staging', url: 'https://staging.app' },
    { label: 'prod',    url: 'https://app.com' },
  ]}
  frame="iphone-15-pro"
  path="/landing"
/>`}</pre>
            )}
          </section>

          <div
            style={{
              fontSize: 11,
              color: '#a1a1aa',
              lineHeight: 1.5,
              padding: '10px 12px',
              background: '#f4f4f5',
              border: '1px solid #e4e4e7',
              borderRadius: 8,
            }}
          >
            <strong style={{ color: '#71717a' }}>Note:</strong> Sites with{' '}
            <code>X-Frame-Options: DENY</code> or strict{' '}
            <code>frame-ancestors</code> CSP can&apos;t render in an iframe — your
            own apps are fine.
          </div>
        </aside>

        {/* Right: phone stage */}
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: 16,
          }}
        >
          <PhoneMock hosts={HOSTS} frame={frame} />
        </section>
      </div>
    </main>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: '#71717a',
        fontWeight: 600,
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}
