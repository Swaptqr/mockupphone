'use client';

import { useState, useMemo } from 'react';
import PhoneMock, { type PhoneFrame } from 'mockupphone';

// ─────────────────────────────────────────────────────────────────────────────
//                   ⇣ TOGGLE DEVICES ON / OFF HERE ⇣
//
//  Comment out a line to remove that device from the picker. Reorder freely —
//  the order in this list is the order shown in the left rail.
// ─────────────────────────────────────────────────────────────────────────────

const DEVICES: { id: PhoneFrame; label: string; category: 'modern' | 'retro' }[] = [
  // ── Modern ─────────────────────────────────────────────────────────────────
  { id: 'iphone-16-pro-max', label: 'iPhone 16 Pro Max', category: 'modern' },
  { id: 'iphone-16-pro',     label: 'iPhone 16 Pro',     category: 'modern' },
  { id: 'iphone-15-pro',     label: 'iPhone 15 Pro',     category: 'modern' },
  { id: 'pixel-8',           label: 'Pixel 8',           category: 'modern' },
  { id: 'galaxy-s24-ultra',  label: 'Galaxy S24 Ultra',  category: 'modern' },
  { id: 'iphone-se',         label: 'iPhone SE',         category: 'modern' },
  // ── Retro ──────────────────────────────────────────────────────────────────
  { id: 'blackberry',        label: 'BlackBerry',        category: 'retro' },
  { id: 'razr-v3',           label: 'Motorola Razr V3',  category: 'retro' },
  { id: 'lg-env2',           label: 'LG enV2',           category: 'retro' },
];

const HOSTS = [
  { label: 'Demo: landing', url: 'http://localhost:3000/demos/landing' },
  { label: 'Demo: app',     url: 'http://localhost:3000/demos/app' },
  { label: 'example.com',   url: 'https://example.com' },
];

type Filter = 'all' | 'modern' | 'retro';

export default function Home() {
  const [filter, setFilter] = useState<Filter>('all');
  const visibleDevices = useMemo(
    () => (filter === 'all' ? DEVICES : DEVICES.filter((d) => d.category === filter)),
    [filter],
  );
  const [frame, setFrame] = useState<PhoneFrame>(DEVICES[0].id);
  const [showCode, setShowCode] = useState(false);

  // If the current frame got filtered out, fall back to the first visible.
  const effectiveFrame = visibleDevices.find((d) => d.id === frame)?.id
    ?? visibleDevices[0]?.id
    ?? DEVICES[0].id;

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #fafafa 0%, #f4f4f5 50%, #e9e9ec 100%)',
      }}
    >
      <div
        style={{
          maxWidth: 1200, margin: '0 auto', width: '100%',
          padding: '48px 24px 80px',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 320px) 1fr',
          gap: 48, alignItems: 'start',
        }}
      >
        {/* Left rail */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 32 }}>
          <header>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.4, color: '#a1a1aa', fontWeight: 600 }}>
              Component
            </div>
            <h1 style={{ margin: '4px 0 8px', fontSize: 28, fontWeight: 700, letterSpacing: -0.6 }}>
              mockupphone
            </h1>
            <p style={{ margin: 0, color: '#52525b', fontSize: 14, lineHeight: 1.5 }}>
              Drop a framed mobile iframe into any React / Next app. Toggle hosts
              and devices, or hardcode a single device.
            </p>
          </header>

          {/* Modern / Retro filter */}
          <section>
            <Label>Show</Label>
            <div
              style={{
                display: 'inline-flex',
                padding: 3,
                background: '#e4e4e7',
                borderRadius: 999,
                gap: 2,
              }}
            >
              {(['all', 'modern', 'retro'] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    border: 'none',
                    padding: '6px 14px',
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: 999,
                    cursor: 'pointer',
                    background: filter === f ? '#fff' : 'transparent',
                    color: filter === f ? '#0a0a0a' : '#71717a',
                    boxShadow: filter === f ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                    textTransform: 'capitalize',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </section>

          {/* Frame buttons */}
          <section>
            <Label>Device</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {visibleDevices.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setFrame(d.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    fontSize: 13,
                    borderRadius: 8,
                    border: '1px solid',
                    borderColor: effectiveFrame === d.id ? '#0a0a0a' : '#e4e4e7',
                    background: effectiveFrame === d.id ? '#0a0a0a' : '#fff',
                    color: effectiveFrame === d.id ? '#fff' : '#0a0a0a',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 120ms',
                  }}
                >
                  {d.label}
                </button>
              ))}
              {visibleDevices.length === 0 && (
                <div style={{ fontSize: 12, color: '#a1a1aa', padding: '8px 12px' }}>
                  Nothing in this category.
                </div>
              )}
            </div>
          </section>

          {/* Snippet */}
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
                  background: '#0a0a0a', color: '#e4e4e7',
                  padding: 14, borderRadius: 8,
                  overflow: 'auto', fontSize: 11.5, lineHeight: 1.55,
                  margin: '8px 0 0',
                }}
              >{`import PhoneMock from 'mockupphone';

// Single device
<PhoneMock
  frame="iphone-16-pro"
  hosts={[
    { label: 'local', url: 'http://localhost:3000' },
    { label: 'prod',  url: 'https://myapp.com' },
  ]}
  path="/landing"
/>

// Built-in device picker
<PhoneMock
  frames={['iphone-16-pro', 'pixel-8', 'razr-v3']}
  hosts={[...]}
/>`}</pre>
            )}
          </section>

          <div
            style={{
              fontSize: 11, color: '#a1a1aa', lineHeight: 1.5,
              padding: '10px 12px', background: '#f4f4f5',
              border: '1px solid #e4e4e7', borderRadius: 8,
            }}
          >
            <strong style={{ color: '#71717a' }}>Note:</strong> Sites with{' '}
            <code>X-Frame-Options: DENY</code> or strict{' '}
            <code>frame-ancestors</code> CSP can&apos;t render in an iframe — your
            own apps are fine.
          </div>
        </aside>

        {/* Right: phone stage */}
        <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 16 }}>
          <PhoneMock hosts={HOSTS} frame={effectiveFrame} />
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
