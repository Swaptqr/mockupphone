'use client';

import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';

export type PhoneFrame =
  | 'iphone-15-pro'
  | 'iphone-se'
  | 'pixel-8'
  | 'blackberry'
  | 'razr-v3'
  | 'lg-env2';

export type HostOption = string | { label: string; url: string };

export interface PhoneMockProps {
  hosts: HostOption[];
  defaultHost?: string;
  path?: string;
  frame?: PhoneFrame;
  /** Override the per-frame default scale. */
  scale?: number;
  hideSwitcher?: boolean;
  hideChrome?: boolean;
  host?: string;
  onHostChange?: (url: string) => void;
  className?: string;
  style?: CSSProperties;
}

interface FrameSpec {
  width: number;            // body width
  height: number;           // body height
  radius: number;           // body corner radius
  bodyColor: string;
  bodyHighlight: string;
  screenX: number;          // screen position in body
  screenY: number;
  screenW: number;
  screenH: number;
  screenRadius: number;
  defaultScale: number;
  shadow: string;           // body box-shadow color tone
}

const FRAMES: Record<PhoneFrame, FrameSpec> = {
  'iphone-15-pro': {
    width: 414, height: 836, radius: 56,
    bodyColor: '#1a1a1c', bodyHighlight: '#3a3a3e',
    screenX: 11, screenY: 11, screenW: 392, screenH: 814, screenRadius: 45,
    defaultScale: 0.7, shadow: 'rgba(0,0,0,0.45)',
  },
  'iphone-se': {
    width: 375, height: 667, radius: 40,
    bodyColor: '#0e0e10', bodyHighlight: '#2a2a2e',
    screenX: 14, screenY: 60, screenW: 347, screenH: 547, screenRadius: 4,
    defaultScale: 0.8, shadow: 'rgba(0,0,0,0.42)',
  },
  'pixel-8': {
    width: 432, height: 896, radius: 46,
    bodyColor: '#1f1f23', bodyHighlight: '#3a3a3e',
    screenX: 11, screenY: 11, screenW: 410, screenH: 874, screenRadius: 35,
    defaultScale: 0.7, shadow: 'rgba(0,0,0,0.4)',
  },
  'blackberry': {
    width: 340, height: 480, radius: 26,
    bodyColor: '#1a1a1d', bodyHighlight: '#3a3a3f',
    screenX: 26, screenY: 30, screenW: 288, screenH: 224, screenRadius: 4,
    defaultScale: 0.95, shadow: 'rgba(0,0,0,0.4)',
  },
  'razr-v3': {
    width: 230, height: 540, radius: 6,
    bodyColor: '#8a8d92', bodyHighlight: '#c8ccd2',
    screenX: 22, screenY: 28, screenW: 186, screenH: 200, screenRadius: 3,
    defaultScale: 0.9, shadow: 'rgba(0,0,0,0.35)',
  },
  'lg-env2': {
    width: 560, height: 260, radius: 14,
    bodyColor: '#26262a', bodyHighlight: '#52525a',
    screenX: 16, screenY: 16, screenW: 256, screenH: 228, screenRadius: 4,
    defaultScale: 0.85, shadow: 'rgba(0,0,0,0.4)',
  },
};

const SPLIT_FRAMES = new Set<PhoneFrame>(['blackberry', 'razr-v3', 'lg-env2', 'iphone-se']);

function normalizeHosts(hosts: HostOption[]) {
  return hosts.map((h) => (typeof h === 'string' ? { label: h, url: h } : h));
}

function joinUrl(host: string, path: string) {
  const h = host.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${h}${p}`;
}

// ────────────────────────────────────────────────────────────────────────────
// Shared bits
// ────────────────────────────────────────────────────────────────────────────

function StatusBarIcons({ tint = '#000' }: { tint?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: tint }}>
      <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
        <rect x="0"  y="7" width="3" height="4"  rx="0.5" />
        <rect x="5"  y="5" width="3" height="6"  rx="0.5" />
        <rect x="10" y="3" width="3" height="8"  rx="0.5" />
        <rect x="15" y="1" width="3" height="10" rx="0.5" opacity="0.4" />
      </svg>
      <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
        <path d="M8 1.2C4.6 1.2 1.9 3.3 0 5.1l1.6 1.6C3.2 5 5.4 3.6 8 3.6s4.8 1.4 6.4 3.1L16 5.1C14.1 3.3 11.4 1.2 8 1.2z" opacity="0.85" />
        <path d="M8 5.4c-1.9 0-3.6 1-4.8 2.1l1.6 1.6c.9-.8 2-1.3 3.2-1.3s2.3.5 3.2 1.3L12.8 7.5C11.6 6.4 9.9 5.4 8 5.4z" />
        <circle cx="8" cy="10" r="1.4" />
      </svg>
      <svg width="27" height="12" viewBox="0 0 27 12" fill="currentColor">
        <rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.4" />
        <rect x="24"  y="4"   width="2"  height="4"  rx="0.8" opacity="0.4" />
        <rect x="2"   y="2"   width="14" height="8"  rx="1.5" />
      </svg>
    </div>
  );
}

function Key({
  label,
  w = 26, h = 22, fontSize = 11, bg = '#2a2a2e', color = '#e4e4e7', radius = 5,
  bold = false, style,
}: {
  label: ReactNode;
  w?: number; h?: number; fontSize?: number; bg?: string; color?: string; radius?: number;
  bold?: boolean; style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={{
        width: w, height: h,
        background: bg,
        color,
        borderRadius: radius,
        display: 'grid',
        placeItems: 'center',
        fontSize,
        fontWeight: bold ? 700 : 500,
        fontFamily: 'system-ui, sans-serif',
        boxShadow: '0 1px 0 rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        userSelect: 'none',
        ...style,
      }}
    >
      {label}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Per-frame "chrome" renderers
// ────────────────────────────────────────────────────────────────────────────

function IPhoneChrome({ screenW, screenH, frame }: { screenW: number; screenH: number; frame: PhoneFrame }) {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'absolute', top: 0, left: 0,
          width: screenW, height: 54,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: '14px 32px 0', boxSizing: 'border-box',
          fontFamily: '-apple-system, "SF Pro Display", sans-serif',
          fontSize: 15, fontWeight: 600, color: '#000',
          pointerEvents: 'none', zIndex: 2,
          textShadow: '0 0 6px rgba(255,255,255,0.6)',
        }}
      >
        <span style={{ minWidth: 60 }}>9:41</span>
        <div style={{ minWidth: 60, display: 'flex', justifyContent: 'flex-end', paddingTop: 2 }}>
          <StatusBarIcons />
        </div>
      </div>
      {frame === 'iphone-15-pro' && (
        <div
          aria-hidden
          style={{
            position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
            width: 122, height: 36, borderRadius: 999,
            background: '#000',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
            pointerEvents: 'none', zIndex: 3,
          }}
        />
      )}
      {frame === 'iphone-15-pro' && (
        <div
          aria-hidden
          style={{
            position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
            width: screenW * 0.34, height: 5, borderRadius: 3,
            background: 'rgba(0,0,0,0.85)',
            pointerEvents: 'none', zIndex: 2,
          }}
        />
      )}
    </>
  );
}

function PixelChrome({ screenW }: { screenW: number }) {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'absolute', top: 0, left: 0,
          width: screenW, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', boxSizing: 'border-box',
          fontFamily: 'Roboto, sans-serif',
          fontSize: 13, fontWeight: 500, color: '#000',
          pointerEvents: 'none', zIndex: 2,
          textShadow: '0 0 4px rgba(255,255,255,0.6)',
        }}
      >
        <span>9:41</span>
        <StatusBarIcons />
      </div>
      <div
        aria-hidden
        style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 14, height: 14, borderRadius: '50%',
          background: '#000',
          boxShadow: '0 0 0 1.5px rgba(0,0,0,0.5)',
          pointerEvents: 'none', zIndex: 3,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
          width: 90, height: 3, borderRadius: 2,
          background: 'rgba(0,0,0,0.55)',
          pointerEvents: 'none', zIndex: 2,
        }}
      />
    </>
  );
}

function IPhoneSEExtras({ spec }: { spec: FrameSpec }) {
  return (
    <>
      {/* Speaker grill */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 30, left: '50%', transform: 'translateX(-50%)',
          width: 56, height: 5, borderRadius: 999,
          background: '#070708',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      />
      {/* Front camera dot */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 28, left: '50%', transform: 'translate(-72px, 0)',
          width: 7, height: 7, borderRadius: '50%',
          background: '#0a0a0c',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      />
      {/* Home button below screen */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 14, left: '50%', transform: 'translateX(-50%)',
          width: 46, height: 46, borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #2a2a2e, #0a0a0c)',
          boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.06), inset 0 -2px 4px rgba(0,0,0,0.4)',
        }}
      />
    </>
  );
}

function BlackBerryExtras({ spec }: { spec: FrameSpec }) {
  const kbTop = spec.screenY + spec.screenH + 26;
  const rows: string[][] = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['⇧','Z','X','C','V','B','N','M','⌫'],
    ['!','sym','___','___','___','⏎','.'],
  ];
  return (
    <>
      {/* Carrier strip */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 8, left: 0, right: 0,
          height: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          fontFamily: 'system-ui, sans-serif',
          fontSize: 8, fontWeight: 600, color: '#52525b',
          letterSpacing: 1,
        }}
      >
        <span>● ● ● ●●</span>
        <span style={{ opacity: 0.5 }}>BERRY</span>
        <span>3G</span>
      </div>

      {/* Function row (below screen, above keyboard) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: spec.screenY + spec.screenH + 4,
          left: spec.screenX,
          width: spec.screenW,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 4px',
        }}
      >
        <Key label="📞" w={28} h={18} bg="#1d4f23" color="#9ef7a4" fontSize={10} />
        <Key label="≡"  w={22} h={18} bg="#2a2a2e" fontSize={11} />
        <div
          aria-hidden
          style={{
            width: 18, height: 18, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #c8c8cc, #5a5a5e 60%, #1a1a1c)',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.4)',
          }}
        />
        <Key label="↩" w={22} h={18} bg="#2a2a2e" fontSize={11} />
        <Key label="📞" w={28} h={18} bg="#5a1717" color="#ffb5b5" fontSize={10} />
      </div>

      {/* Keyboard */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: kbTop, left: 16, right: 16,
          display: 'flex', flexDirection: 'column', gap: 6,
        }}
      >
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            {row.map((k, j) => {
              if (k === '___') return <div key={j} style={{ flex: 1, height: 22 }} />;
              const isSpace = i === 3 && j >= 2 && j <= 4;
              return (
                <Key
                  key={j}
                  label={k}
                  w={isSpace ? 60 : 26}
                  h={22}
                  bg="linear-gradient(180deg, #353539, #1d1d20)"
                  color="#e4e4e7"
                  fontSize={11}
                  bold
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

function RazrExtras({ spec }: { spec: FrameSpec }) {
  const hingeY = spec.screenY + spec.screenH + 14;
  const dialTop = hingeY + 32;
  const dialKeys = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['*','0','#'],
  ];
  return (
    <>
      {/* Carrier label */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 12, left: 0, right: 0, textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: 7, fontWeight: 700, color: '#3a3a3e',
          letterSpacing: 2,
        }}
      >
        MOTO
      </div>

      {/* Hinge line */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: hingeY, left: -6, right: -6, height: 6,
          background: 'linear-gradient(180deg, #5a5d62, #2a2d32)',
          borderRadius: 1,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)',
        }}
      />

      {/* Navigation row below hinge */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: hingeY + 12, left: 16, right: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <Key label="◀" w={24} h={14} bg="#5a5d62" color="#1a1d22" fontSize={9} />
        <div
          aria-hidden
          style={{
            width: 24, height: 14, borderRadius: 7,
            background: 'radial-gradient(circle at 30% 30%, #e8eaee, #6a6d72)',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.3)',
          }}
        />
        <Key label="▶" w={24} h={14} bg="#5a5d62" color="#1a1d22" fontSize={9} />
      </div>

      {/* Call / End / Clear */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: hingeY + 30, left: 14, right: 14,
          display: 'flex', justifyContent: 'space-between',
        }}
      >
        <Key label="📞" w={48} h={16} bg="#1d4f23" color="#9ef7a4" fontSize={9} radius={2} />
        <Key label="✕"  w={36} h={16} bg="#3a3d42" color="#d4d4d8" fontSize={10} radius={2} />
        <Key label="🔚" w={48} h={16} bg="#5a1717" color="#ffb5b5" fontSize={9} radius={2} />
      </div>

      {/* Dial pad */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: dialTop + 24, left: 14, right: 14,
          display: 'flex', flexDirection: 'column', gap: 4,
        }}
      >
        {dialKeys.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
            {row.map((k, j) => (
              <div
                key={j}
                style={{
                  flex: 1, height: 30,
                  background: 'linear-gradient(180deg, #b8bcc2, #6a6d72)',
                  borderRadius: 2,
                  display: 'grid', placeItems: 'center',
                  fontSize: 14, fontWeight: 700, fontFamily: 'system-ui, sans-serif',
                  color: '#1a1d22',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 1px rgba(0,0,0,0.2)',
                  textShadow: '0 0 8px rgba(80,160,255,0.6)',
                }}
              >
                {k}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function EnV2Extras({ spec }: { spec: FrameSpec }) {
  // Right half = keyboard. Screen takes left half.
  const kbLeft = spec.screenX + spec.screenW + 16;
  const kbWidth = spec.width - kbLeft - 16;
  const rows: string[][] = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['⇧','Z','X','C','V','B','N','M','⌫'],
    ['sym','spc','spc','spc','spc','spc','.', '↩'],
  ];
  return (
    <>
      {/* Hinge line (horizontal across top, suggesting flip) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 6, left: 14, right: 14, height: 3,
          background: 'linear-gradient(180deg, #52525a, #2a2a2e)',
          borderRadius: 1,
          opacity: 0.6,
        }}
      />

      {/* D-pad / function buttons to the right of screen, top */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: kbLeft,
          top: spec.screenY,
          width: kbWidth,
          height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 4px',
        }}
      >
        <Key label="📞" w={44} h={22} bg="#1d4f23" color="#9ef7a4" fontSize={10} radius={3} />
        <div
          aria-hidden
          style={{
            width: 50, height: 26, borderRadius: 13,
            background: 'radial-gradient(circle at 30% 30%, #6a6d72, #1a1d22)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#a1a1aa', fontSize: 10 }}>OK</div>
        </div>
        <Key label="📞" w={44} h={22} bg="#5a1717" color="#ffb5b5" fontSize={10} radius={3} />
      </div>

      {/* QWERTY keyboard */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: kbLeft, top: spec.screenY + 42,
          width: kbWidth,
          display: 'flex', flexDirection: 'column', gap: 3,
        }}
      >
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 2.5, justifyContent: 'space-between' }}>
            {row.map((k, j) => {
              const isSpace = k === 'spc';
              return (
                <div
                  key={j}
                  style={{
                    flex: isSpace ? 1.4 : 1,
                    height: 22,
                    background: 'linear-gradient(180deg, #3a3a3f, #1d1d20)',
                    borderRadius: 3,
                    display: 'grid', placeItems: 'center',
                    fontSize: 10, fontWeight: 600,
                    fontFamily: 'system-ui, sans-serif',
                    color: isSpace ? 'transparent' : '#e4e4e7',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 1px rgba(0,0,0,0.3)',
                  }}
                >
                  {isSpace ? '' : k}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

// Decorative side buttons for modern smartphones only
function SideButtons({ spec }: { spec: FrameSpec }) {
  const make = (side: 'left' | 'right', top: number, h: number): CSSProperties => ({
    position: 'absolute',
    [side]: -2.5,
    top,
    width: 3, height: h,
    background: `linear-gradient(90deg, ${spec.bodyHighlight}, ${spec.bodyColor})`,
    borderRadius: 1.5,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
  });
  return (
    <>
      <div aria-hidden style={make('left',  spec.height * 0.17, 30)} />
      <div aria-hidden style={make('left',  spec.height * 0.25, 56)} />
      <div aria-hidden style={make('left',  spec.height * 0.34, 56)} />
      <div aria-hidden style={make('right', spec.height * 0.23, 90)} />
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────────

export default function PhoneMock({
  hosts,
  defaultHost,
  path = '/',
  frame = 'iphone-15-pro',
  scale,
  hideSwitcher = false,
  hideChrome = false,
  host,
  onHostChange,
  className,
  style,
}: PhoneMockProps) {
  const options = useMemo(() => normalizeHosts(hosts), [hosts]);
  const [internalHost, setInternalHost] = useState<string>(
    defaultHost ?? options[0]?.url ?? ''
  );
  const currentHost = host ?? internalHost;

  const handleChange = (url: string) => {
    if (onHostChange) onHostChange(url);
    if (host === undefined) setInternalHost(url);
  };

  const spec = FRAMES[frame];
  const effectiveScale = scale ?? spec.defaultScale;
  const url = joinUrl(currentHost, path);

  const outerWidth = spec.width * effectiveScale;
  const outerHeight = spec.height * effectiveScale;

  const isModernSmartphone = frame === 'iphone-15-pro' || frame === 'pixel-8';

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        ...style,
      }}
    >
      {!hideSwitcher && (
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(10,10,10,0.92)', color: '#fff',
            padding: '6px 10px 6px 14px',
            borderRadius: 999,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 13,
            boxShadow: '0 4px 14px -4px rgba(0,0,0,0.3)',
          }}
        >
          <span style={{ opacity: 0.55, fontWeight: 500 }}>Host</span>
          <select
            value={currentHost}
            onChange={(e) => handleChange(e.target.value)}
            style={{
              appearance: 'none',
              background: 'rgba(255,255,255,0.08)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 999,
              padding: '4px 28px 4px 12px',
              fontSize: 13, fontWeight: 500,
              outline: 'none', cursor: 'pointer',
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='white' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>\")",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
            }}
          >
            {options.map((o) => (
              <option key={o.url} value={o.url} style={{ color: '#000' }}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div
        data-phone-frame={frame}
        style={{
          width: outerWidth,
          height: outerHeight,
          transition: 'width 220ms ease, height 220ms ease',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute', top: 0, left: 0,
            transform: `scale(${effectiveScale})`,
            transformOrigin: 'top left',
            width: spec.width, height: spec.height,
          }}
        >
          {/* Body */}
          <div
            style={{
              width: spec.width, height: spec.height,
              borderRadius: spec.radius,
              background: `linear-gradient(155deg, ${spec.bodyHighlight} 0%, ${spec.bodyColor} 22%, ${spec.bodyColor} 78%, ${spec.bodyHighlight} 100%)`,
              boxShadow: [
                `0 50px 80px -30px ${spec.shadow}`,
                `0 20px 40px -20px ${spec.shadow}`,
                'inset 0 0 0 1px rgba(255,255,255,0.06)',
                'inset 0 1px 0 rgba(255,255,255,0.1)',
              ].join(', '),
              position: 'relative',
            }}
          >
            {/* Side buttons on modern smartphones */}
            {isModernSmartphone && <SideButtons spec={spec} />}

            {/* Screen */}
            <div
              style={{
                position: 'absolute',
                left: spec.screenX, top: spec.screenY,
                width: spec.screenW, height: spec.screenH,
                borderRadius: spec.screenRadius,
                overflow: 'hidden',
                background: '#fff',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.4)',
              }}
            >
              <iframe
                key={url}
                src={url}
                title={`PhoneMock — ${url}`}
                style={{
                  width: '100%', height: '100%',
                  border: 'none', display: 'block', background: '#fff',
                }}
              />

              {/* In-screen chrome (status bar / notch / home indicator) */}
              {!hideChrome && (frame === 'iphone-15-pro') && (
                <IPhoneChrome screenW={spec.screenW} screenH={spec.screenH} frame={frame} />
              )}
              {!hideChrome && frame === 'pixel-8' && (
                <PixelChrome screenW={spec.screenW} />
              )}
            </div>

            {/* Hardware extras outside the screen */}
            {frame === 'iphone-se' && <IPhoneSEExtras spec={spec} />}
            {frame === 'blackberry'  && <BlackBerryExtras spec={spec} />}
            {frame === 'razr-v3'     && <RazrExtras spec={spec} />}
            {frame === 'lg-env2'     && <EnV2Extras spec={spec} />}
          </div>
        </div>
      </div>
    </div>
  );
}
