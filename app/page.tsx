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
  // ── iPhones ───────────────────────────────────────────────────────────────
  { id: 'iphone-17-pro-max', label: 'iPhone 17 Pro Max', category: 'modern' },
  { id: 'iphone-17-pro',     label: 'iPhone 17 Pro',     category: 'modern' },
  { id: 'iphone-17-air',     label: 'iPhone 17 Air',     category: 'modern' },
  { id: 'iphone-17',         label: 'iPhone 17',         category: 'modern' },
  { id: 'iphone-17e',        label: 'iPhone 17e',        category: 'modern' },
  { id: 'iphone-16-pro-max', label: 'iPhone 16 Pro Max', category: 'modern' },
  { id: 'iphone-16-pro',     label: 'iPhone 16 Pro',     category: 'modern' },
  { id: 'iphone-15-pro',     label: 'iPhone 15 Pro',     category: 'modern' },
  { id: 'iphone-se',         label: 'iPhone SE',         category: 'modern' },
  // ── Android phones ────────────────────────────────────────────────────────
  { id: 'pixel-10-pro-xl',   label: 'Pixel 10 Pro XL',   category: 'modern' },
  { id: 'pixel-10-pro',      label: 'Pixel 10 Pro',      category: 'modern' },
  { id: 'pixel-10',          label: 'Pixel 10',          category: 'modern' },
  { id: 'pixel-8',           label: 'Pixel 8',           category: 'modern' },
  { id: 'galaxy-s25-ultra',  label: 'Galaxy S25 Ultra',  category: 'modern' },
  { id: 'galaxy-s25-plus',   label: 'Galaxy S25+',       category: 'modern' },
  { id: 'galaxy-s25',        label: 'Galaxy S25',        category: 'modern' },
  { id: 'galaxy-s24-ultra',  label: 'Galaxy S24 Ultra',  category: 'modern' },
  // ── Tablets ───────────────────────────────────────────────────────────────
  { id: 'ipad-pro-11',       label: 'iPad Pro 11"',      category: 'modern' },
  { id: 'galaxy-tab-s9',     label: 'Galaxy Tab S9',     category: 'modern' },
  // ── Retro ─────────────────────────────────────────────────────────────────
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
type Theme = 'light' | 'dark';

const THEMES: Record<Theme, {
  bg: string; text: string; textMuted: string; textFaint: string;
  border: string; surface: string; surfaceAlt: string;
  pillBg: string; pillActiveBg: string; pillActiveText: string; pillInactiveText: string;
  buttonBorder: string; buttonActiveBg: string; buttonActiveText: string;
}> = {
  light: {
    bg: 'radial-gradient(ellipse at top, #fafafa 0%, #f4f4f5 50%, #e9e9ec 100%)',
    text: '#0a0a0a', textMuted: '#52525b', textFaint: '#a1a1aa',
    border: '#e4e4e7', surface: '#ffffff', surfaceAlt: '#f4f4f5',
    pillBg: '#e4e4e7', pillActiveBg: '#ffffff', pillActiveText: '#0a0a0a', pillInactiveText: '#71717a',
    buttonBorder: '#e4e4e7', buttonActiveBg: '#0a0a0a', buttonActiveText: '#ffffff',
  },
  dark: {
    bg: 'radial-gradient(ellipse at top, #1f1f23 0%, #0f0f12 55%, #050507 100%)',
    text: '#fafafa', textMuted: '#a1a1aa', textFaint: '#71717a',
    border: '#27272a', surface: '#18181b', surfaceAlt: '#27272a',
    pillBg: '#27272a', pillActiveBg: '#3f3f46', pillActiveText: '#fafafa', pillInactiveText: '#a1a1aa',
    buttonBorder: '#27272a', buttonActiveBg: '#fafafa', buttonActiveText: '#0a0a0a',
  },
};

export default function Home() {
  const [theme, setTheme] = useState<Theme>('light');
  const t = THEMES[theme];

  const [filter, setFilter] = useState<Filter>('all');
  const visibleDevices = useMemo(
    () => (filter === 'all' ? DEVICES : DEVICES.filter((d) => d.category === filter)),
    [filter],
  );
  const [frame, setFrame] = useState<PhoneFrame>(DEVICES[0].id);
  const [showCode, setShowCode] = useState(false);

  const effectiveFrame = visibleDevices.find((d) => d.id === frame)?.id
    ?? visibleDevices[0]?.id
    ?? DEVICES[0].id;

  return (
    <main
      style={{
        minHeight: '100vh',
        background: t.bg,
        color: t.text,
        transition: 'background 240ms ease, color 240ms ease',
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
        <aside
          style={{
            display: 'flex', flexDirection: 'column', gap: 24,
            position: 'sticky', top: 32,
            maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
            paddingRight: 8,
          }}
        >
          <header>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.4, color: t.textFaint, fontWeight: 600 }}>
                  Component
                </div>
                <h1 style={{ margin: '4px 0 8px', fontSize: 28, fontWeight: 700, letterSpacing: -0.6, color: t.text }}>
                  mockupphone
                </h1>
              </div>
              <ThemeToggle theme={theme} onChange={setTheme} t={t} />
            </div>
            <p style={{ margin: 0, color: t.textMuted, fontSize: 14, lineHeight: 1.5 }}>
              Drop a framed mobile iframe into any React / Next app. Toggle hosts
              and devices, or hardcode a single device.
            </p>
          </header>

          {/* Modern / Retro filter */}
          <section>
            <Label color={t.textMuted}>Show</Label>
            <div
              style={{
                display: 'inline-flex', padding: 3, gap: 2,
                background: t.pillBg, borderRadius: 999,
              }}
            >
              {(['all', 'modern', 'retro'] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    border: 'none',
                    padding: '6px 14px',
                    fontSize: 12, fontWeight: 600, borderRadius: 999,
                    cursor: 'pointer',
                    background: filter === f ? t.pillActiveBg : 'transparent',
                    color: filter === f ? t.pillActiveText : t.pillInactiveText,
                    boxShadow: filter === f ? '0 1px 2px rgba(0,0,0,0.12)' : 'none',
                    textTransform: 'capitalize',
                    transition: 'background 120ms, color 120ms',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </section>

          {/* Device buttons */}
          <section>
            <Label color={t.textMuted}>Device</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {visibleDevices.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setFrame(d.id)}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '8px 12px', fontSize: 13,
                    borderRadius: 8,
                    border: '1px solid',
                    borderColor: effectiveFrame === d.id ? t.buttonActiveBg : t.buttonBorder,
                    background: effectiveFrame === d.id ? t.buttonActiveBg : t.surface,
                    color: effectiveFrame === d.id ? t.buttonActiveText : t.text,
                    cursor: 'pointer', fontWeight: 500,
                    transition: 'all 120ms',
                  }}
                >
                  {d.label}
                </button>
              ))}
              {visibleDevices.length === 0 && (
                <div style={{ fontSize: 12, color: t.textFaint, padding: '8px 12px' }}>
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
                width: '100%', textAlign: 'left',
                padding: '10px 12px', fontSize: 13, fontWeight: 500,
                borderRadius: 8,
                border: `1px solid ${t.border}`,
                background: t.surface, color: t.text,
                cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <span>How to use</span>
              <span style={{ color: t.textFaint }}>{showCode ? '−' : '+'}</span>
            </button>
            {showCode && (
              <pre
                style={{
                  background: '#0a0a0a', color: '#e4e4e7',
                  padding: 14, borderRadius: 8,
                  overflow: 'auto', fontSize: 11.5, lineHeight: 1.55,
                  margin: '8px 0 0',
                }}
              >{`import PhoneMock, {
  IPhoneMockup, AndroidMockup,
  IPadMockup,   AndroidTabMockup,
} from 'mockupphone';

// Single device
<PhoneMock frame="iphone-17-pro" hosts={[...]} />

// Built-in device picker (any frames)
<PhoneMock
  frames={['iphone-17-pro', 'pixel-10', 'razr-v3']}
  hosts={[...]}
/>

// Family-locked components — picker scoped to that family
<IPhoneMockup     hosts={[...]} />
<AndroidMockup    hosts={[...]} />
<IPadMockup       hosts={[...]} />
<AndroidTabMockup hosts={[...]} />`}</pre>
            )}
          </section>

          <div
            style={{
              fontSize: 11, color: t.textFaint, lineHeight: 1.5,
              padding: '10px 12px',
              background: t.surfaceAlt,
              border: `1px solid ${t.border}`, borderRadius: 8,
            }}
          >
            <strong style={{ color: t.textMuted }}>Note:</strong> Sites with{' '}
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

function Label({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      style={{
        fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.2,
        color, fontWeight: 600, marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

function ThemeToggle({
  theme, onChange, t,
}: {
  theme: Theme;
  onChange: (next: Theme) => void;
  t: (typeof THEMES)[Theme];
}) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={() => onChange(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: 32, height: 32,
        borderRadius: 999,
        border: `1px solid ${t.border}`,
        background: t.surface,
        color: t.text,
        cursor: 'pointer',
        display: 'grid', placeItems: 'center',
        transition: 'all 160ms',
        flexShrink: 0,
      }}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2 M12 20v2 M2 12h2 M20 12h2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M4.93 19.07l1.41-1.41 M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
