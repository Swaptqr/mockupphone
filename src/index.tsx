'use client';

import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  Frame catalog
//
//  To add a new device:
//    1. Add its id to the PhoneFrame type union.
//    2. Add an entry to the FRAMES record (dimensions, color, default scale).
//    3. Add its label to FRAME_LABELS.
//    4. Add it to the appropriate family array (IPHONE_FRAMES, etc.).
//    5. If it has hardware below the screen (keyboard, dial pad, home button),
//       plug into the matching extras renderer at the bottom.
// ─────────────────────────────────────────────────────────────────────────────

export type PhoneFrame =
  // iPhones (newest first)
  | 'iphone-17-pro-max'
  | 'iphone-17-pro'
  | 'iphone-17-air'
  | 'iphone-17'
  | 'iphone-17e'
  | 'iphone-16-pro-max'
  | 'iphone-16-pro'
  | 'iphone-15-pro'
  | 'iphone-se'
  // Android phones
  | 'pixel-10-pro-xl'
  | 'pixel-10-pro'
  | 'pixel-10'
  | 'pixel-8'
  | 'galaxy-s25-ultra'
  | 'galaxy-s25-plus'
  | 'galaxy-s25'
  | 'galaxy-s24-ultra'
  // Tablets
  | 'ipad-pro-11'
  | 'galaxy-tab-s9'
  // Retro
  | 'blackberry'
  | 'razr-v3'
  | 'lg-env2';

/** All iPhones. Drives <IPhoneMockup>. */
export const IPHONE_FRAMES: PhoneFrame[] = [
  'iphone-17-pro-max',
  'iphone-17-pro',
  'iphone-17-air',
  'iphone-17',
  'iphone-17e',
  'iphone-16-pro-max',
  'iphone-16-pro',
  'iphone-15-pro',
  'iphone-se',
];

/** All Android phones. Drives <AndroidMockup>. */
export const ANDROID_PHONE_FRAMES: PhoneFrame[] = [
  'pixel-10-pro-xl',
  'pixel-10-pro',
  'pixel-10',
  'pixel-8',
  'galaxy-s25-ultra',
  'galaxy-s25-plus',
  'galaxy-s25',
  'galaxy-s24-ultra',
];

/** All iPads. Drives <IPadMockup>. */
export const IPAD_FRAMES: PhoneFrame[] = [
  'ipad-pro-11',
];

/** All Android tablets. Drives <AndroidTabMockup>. */
export const ANDROID_TAB_FRAMES: PhoneFrame[] = [
  'galaxy-tab-s9',
];

export const MODERN_FRAMES: PhoneFrame[] = [
  ...IPHONE_FRAMES,
  ...ANDROID_PHONE_FRAMES,
  ...IPAD_FRAMES,
  ...ANDROID_TAB_FRAMES,
];

export const RETRO_FRAMES: PhoneFrame[] = [
  'blackberry',
  'razr-v3',
  'lg-env2',
];

export const ALL_FRAMES: PhoneFrame[] = [...MODERN_FRAMES, ...RETRO_FRAMES];

export const FRAME_LABELS: Record<PhoneFrame, string> = {
  'iphone-17-pro-max': 'iPhone 17 Pro Max',
  'iphone-17-pro':     'iPhone 17 Pro',
  'iphone-17-air':     'iPhone 17 Air',
  'iphone-17':         'iPhone 17',
  'iphone-17e':        'iPhone 17e',
  'iphone-16-pro-max': 'iPhone 16 Pro Max',
  'iphone-16-pro':     'iPhone 16 Pro',
  'iphone-15-pro':     'iPhone 15 Pro',
  'iphone-se':         'iPhone SE',
  'pixel-10-pro-xl':   'Pixel 10 Pro XL',
  'pixel-10-pro':      'Pixel 10 Pro',
  'pixel-10':          'Pixel 10',
  'pixel-8':           'Pixel 8',
  'galaxy-s25-ultra':  'Galaxy S25 Ultra',
  'galaxy-s25-plus':   'Galaxy S25+',
  'galaxy-s25':        'Galaxy S25',
  'galaxy-s24-ultra':  'Galaxy S24 Ultra',
  'ipad-pro-11':       'iPad Pro 11"',
  'galaxy-tab-s9':     'Galaxy Tab S9',
  'blackberry':        'BlackBerry',
  'razr-v3':           'Motorola Razr V3',
  'lg-env2':           'LG enV2',
};

export type HostOption = string | { label: string; url: string };

export interface PhoneMockProps {
  hosts: HostOption[];
  defaultHost?: string;
  path?: string;
  /** Single-frame mode. Ignored if `frames` is set. */
  frame?: PhoneFrame;
  /** Picker mode — supplying multiple frames shows a device dropdown. */
  frames?: PhoneFrame[];
  /** Initial frame for picker mode. Defaults to first in `frames`. */
  defaultFrame?: PhoneFrame;
  /** Override the per-frame default scale. */
  scale?: number;
  /** Hide the host (and device, if any) switcher above the frame. */
  hideSwitcher?: boolean;
  /** Hide simulated status bar / notch / home indicator overlays. */
  hideChrome?: boolean;
  /** Renders the screen with a dark background and light status bar / home
   *  indicator. Useful when the iframe content is dark-themed. */
  dark?: boolean;
  /** Controlled host URL (pairs with onHostChange). */
  host?: string;
  onHostChange?: (url: string) => void;
  className?: string;
  style?: CSSProperties;
}

interface FrameSpec {
  width: number;
  height: number;
  radius: number;
  bodyColor: string;
  bodyHighlight: string;
  screenX: number;
  screenY: number;
  screenW: number;
  screenH: number;
  screenRadius: number;
  defaultScale: number;
  shadow: string;
}

const FRAMES: Record<PhoneFrame, FrameSpec> = {
  // ── iPhone 17 family ─────────────────────────────────────────────────────
  'iphone-17-pro-max': {
    width: 466, height: 950, radius: 60,
    bodyColor: '#e8e8eb', bodyHighlight: '#ffffff', // White Titanium
    screenX: 11, screenY: 11, screenW: 444, screenH: 928, screenRadius: 49,
    defaultScale: 0.6, shadow: 'rgba(0,0,0,0.4)',
  },
  'iphone-17-pro': {
    width: 430, height: 882, radius: 58,
    bodyColor: '#c95e3a', bodyHighlight: '#e88a6a', // Cosmic Orange
    screenX: 11, screenY: 11, screenW: 408, screenH: 860, screenRadius: 47,
    defaultScale: 0.66, shadow: 'rgba(0,0,0,0.45)',
  },
  'iphone-17-air': {
    width: 432, height: 892, radius: 60,
    bodyColor: '#b8c8d8', bodyHighlight: '#dce6f0', // Silver Sky
    screenX: 11, screenY: 11, screenW: 410, screenH: 870, screenRadius: 49,
    defaultScale: 0.65, shadow: 'rgba(0,0,0,0.35)',
  },
  'iphone-17': {
    width: 414, height: 850, radius: 55,
    bodyColor: '#b8d4e8', bodyHighlight: '#dce8f4', // Sky blue
    screenX: 11, screenY: 11, screenW: 392, screenH: 828, screenRadius: 44,
    defaultScale: 0.7, shadow: 'rgba(0,0,0,0.4)',
  },
  'iphone-17e': {
    width: 410, height: 850, radius: 50,
    bodyColor: '#2a2a32', bodyHighlight: '#4a4a52', // Midnight
    screenX: 11, screenY: 11, screenW: 388, screenH: 828, screenRadius: 39,
    defaultScale: 0.7, shadow: 'rgba(0,0,0,0.45)',
  },
  // ── iPhone 16 family ─────────────────────────────────────────────────────
  'iphone-16-pro-max': {
    width: 458, height: 936, radius: 60,
    bodyColor: '#8a7960', bodyHighlight: '#c8b59a', // Desert Titanium
    screenX: 11, screenY: 11, screenW: 436, screenH: 914, screenRadius: 49,
    defaultScale: 0.62, shadow: 'rgba(0,0,0,0.45)',
  },
  'iphone-16-pro': {
    width: 424, height: 870, radius: 58,
    bodyColor: '#9a9aa3', bodyHighlight: '#cdcdd2', // Natural Titanium
    screenX: 11, screenY: 11, screenW: 402, screenH: 848, screenRadius: 47,
    defaultScale: 0.68, shadow: 'rgba(0,0,0,0.4)',
  },
  'iphone-15-pro': {
    width: 414, height: 836, radius: 56,
    bodyColor: '#1a1a1c', bodyHighlight: '#3a3a3e', // Black Titanium
    screenX: 11, screenY: 11, screenW: 392, screenH: 814, screenRadius: 45,
    defaultScale: 0.7, shadow: 'rgba(0,0,0,0.45)',
  },
  'iphone-se': {
    width: 375, height: 667, radius: 40,
    bodyColor: '#0e0e10', bodyHighlight: '#2a2a2e',
    screenX: 14, screenY: 60, screenW: 347, screenH: 547, screenRadius: 4,
    defaultScale: 0.8, shadow: 'rgba(0,0,0,0.42)',
  },
  // ── Pixel ────────────────────────────────────────────────────────────────
  'pixel-10-pro-xl': {
    width: 458, height: 942, radius: 48,
    bodyColor: '#ede8e0', bodyHighlight: '#ffffff', // Porcelain
    screenX: 11, screenY: 11, screenW: 436, screenH: 920, screenRadius: 37,
    defaultScale: 0.62, shadow: 'rgba(0,0,0,0.4)',
  },
  'pixel-10-pro': {
    width: 434, height: 902, radius: 46,
    bodyColor: '#6a7252', bodyHighlight: '#9ba483', // Hazel
    screenX: 11, screenY: 11, screenW: 412, screenH: 880, screenRadius: 35,
    defaultScale: 0.66, shadow: 'rgba(0,0,0,0.4)',
  },
  'pixel-10': {
    width: 416, height: 870, radius: 44,
    bodyColor: '#3a4a7a', bodyHighlight: '#6a7aa8', // Indigo
    screenX: 11, screenY: 11, screenW: 394, screenH: 848, screenRadius: 33,
    defaultScale: 0.7, shadow: 'rgba(0,0,0,0.4)',
  },
  'pixel-8': {
    width: 432, height: 896, radius: 46,
    bodyColor: '#1f1f23', bodyHighlight: '#3a3a3e', // Obsidian
    screenX: 11, screenY: 11, screenW: 410, screenH: 874, screenRadius: 35,
    defaultScale: 0.68, shadow: 'rgba(0,0,0,0.4)',
  },
  // ── Galaxy ───────────────────────────────────────────────────────────────
  'galaxy-s25-ultra': {
    width: 430, height: 910, radius: 28, // softer corners than S24 Ultra
    bodyColor: '#c8c8d0', bodyHighlight: '#e8e8ec', // Titanium Whitesilver
    screenX: 8, screenY: 8, screenW: 414, screenH: 894, screenRadius: 22,
    defaultScale: 0.65, shadow: 'rgba(0,0,0,0.45)',
  },
  'galaxy-s25-plus': {
    width: 408, height: 872, radius: 32,
    bodyColor: '#1a2540', bodyHighlight: '#3a4560', // Navy
    screenX: 11, screenY: 11, screenW: 386, screenH: 850, screenRadius: 22,
    defaultScale: 0.68, shadow: 'rgba(0,0,0,0.4)',
  },
  'galaxy-s25': {
    width: 388, height: 822, radius: 30,
    bodyColor: '#a8c8a8', bodyHighlight: '#d0e0d0', // Mint
    screenX: 11, screenY: 11, screenW: 366, screenH: 800, screenRadius: 20,
    defaultScale: 0.72, shadow: 'rgba(0,0,0,0.35)',
  },
  'galaxy-s24-ultra': {
    width: 422, height: 900, radius: 22,
    bodyColor: '#3a3a40', bodyHighlight: '#6a6a72', // Titanium Black
    screenX: 8, screenY: 8, screenW: 406, screenH: 884, screenRadius: 18,
    defaultScale: 0.66, shadow: 'rgba(0,0,0,0.45)',
  },
  // ── Tablets ──────────────────────────────────────────────────────────────
  'ipad-pro-11': {
    width: 860, height: 1230, radius: 28,
    bodyColor: '#0e0e10', bodyHighlight: '#3a3a3e', // Space Black
    screenX: 14, screenY: 14, screenW: 832, screenH: 1202, screenRadius: 18,
    defaultScale: 0.4, shadow: 'rgba(0,0,0,0.5)',
  },
  'galaxy-tab-s9': {
    width: 840, height: 1316, radius: 16,
    bodyColor: '#3a3a40', bodyHighlight: '#6a6a72',
    screenX: 12, screenY: 12, screenW: 816, screenH: 1292, screenRadius: 10,
    defaultScale: 0.4, shadow: 'rgba(0,0,0,0.45)',
  },
  // ── Retro ────────────────────────────────────────────────────────────────
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

// Frames that get the iPhone-style chrome (status bar / home indicator).
const IPHONE_CHROME_FRAMES: PhoneFrame[] = [
  'iphone-17-pro-max', 'iphone-17-pro', 'iphone-17-air', 'iphone-17', 'iphone-17e',
  'iphone-16-pro-max', 'iphone-16-pro', 'iphone-15-pro',
  'ipad-pro-11',
];

// Subset that ALSO gets a Dynamic Island. (iPad and SE excluded.)
const HAS_DYNAMIC_ISLAND: PhoneFrame[] = [
  'iphone-17-pro-max', 'iphone-17-pro', 'iphone-17-air', 'iphone-17', 'iphone-17e',
  'iphone-16-pro-max', 'iphone-16-pro', 'iphone-15-pro',
];

// Frames that get the Android-style chrome (punch-hole camera).
const ANDROID_CHROME_FRAMES: PhoneFrame[] = [
  'pixel-10-pro-xl', 'pixel-10-pro', 'pixel-10', 'pixel-8',
  'galaxy-s25-ultra', 'galaxy-s25-plus', 'galaxy-s25', 'galaxy-s24-ultra',
  'galaxy-tab-s9',
];

// Frames that get decorative volume / power side buttons.
const HAS_SIDE_BUTTONS: PhoneFrame[] = [
  'iphone-17-pro-max', 'iphone-17-pro', 'iphone-17-air', 'iphone-17', 'iphone-17e',
  'iphone-16-pro-max', 'iphone-16-pro', 'iphone-15-pro',
  'pixel-10-pro-xl', 'pixel-10-pro', 'pixel-10', 'pixel-8',
  'galaxy-s25-ultra', 'galaxy-s25-plus', 'galaxy-s25', 'galaxy-s24-ultra',
];

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
        background: bg, color,
        borderRadius: radius,
        display: 'grid', placeItems: 'center',
        fontSize, fontWeight: bold ? 700 : 500,
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
// Per-frame "chrome" renderers (the simulated UI inside the screen)
// ────────────────────────────────────────────────────────────────────────────

function IPhoneChrome({ screenW, frame, dark }: { screenW: number; frame: PhoneFrame; dark: boolean }) {
  const hasIsland = HAS_DYNAMIC_ISLAND.includes(frame);
  const fg = dark ? '#fafafa' : '#000';
  const textShadow = dark
    ? '0 0 6px rgba(0,0,0,0.5)'
    : '0 0 6px rgba(255,255,255,0.6)';
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
          fontSize: 15, fontWeight: 600, color: fg,
          pointerEvents: 'none', zIndex: 2,
          textShadow,
        }}
      >
        <span style={{ minWidth: 60 }}>9:41</span>
        <div style={{ minWidth: 60, display: 'flex', justifyContent: 'flex-end', paddingTop: 2, color: fg }}>
          <StatusBarIcons />
        </div>
      </div>
      {hasIsland && (
        <div
          aria-hidden
          style={{
            position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
            width: 122, height: 36, borderRadius: 999,
            background: '#000',
            // Subtle outline so the island stays visible against a dark screen
            boxShadow: dark
              ? 'inset 0 0 0 1px rgba(255,255,255,0.12), 0 0 0 1px rgba(255,255,255,0.06)'
              : 'inset 0 0 0 1px rgba(255,255,255,0.04)',
            pointerEvents: 'none', zIndex: 3,
          }}
        />
      )}
      <div
        aria-hidden
        style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: screenW * 0.34, height: 5, borderRadius: 3,
          background: dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)',
          pointerEvents: 'none', zIndex: 2,
        }}
      />
    </>
  );
}

function AndroidChrome({ screenW, frame, dark }: { screenW: number; frame: PhoneFrame; dark: boolean }) {
  const isGalaxy = frame.startsWith('galaxy-');
  const camTop = isGalaxy ? 8 : 10;
  const camSize = isGalaxy ? 12 : 14;
  const fg = dark ? '#fafafa' : '#000';
  const textShadow = dark
    ? '0 0 4px rgba(0,0,0,0.5)'
    : '0 0 4px rgba(255,255,255,0.6)';
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
          fontSize: 13, fontWeight: 500, color: fg,
          pointerEvents: 'none', zIndex: 2,
          textShadow,
        }}
      >
        <span>9:41</span>
        <StatusBarIcons />
      </div>
      <div
        aria-hidden
        style={{
          position: 'absolute', top: camTop, left: '50%', transform: 'translateX(-50%)',
          width: camSize, height: camSize, borderRadius: '50%',
          background: '#000',
          boxShadow: dark
            ? '0 0 0 1.5px rgba(255,255,255,0.18)'
            : '0 0 0 1.5px rgba(0,0,0,0.5)',
          pointerEvents: 'none', zIndex: 3,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
          width: 90, height: 3, borderRadius: 2,
          background: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)',
          pointerEvents: 'none', zIndex: 2,
        }}
      />
    </>
  );
}

function IPhoneSEExtras() {
  return (
    <>
      <div aria-hidden style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)', width: 56, height: 5, borderRadius: 999, background: '#070708', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }} />
      <div aria-hidden style={{ position: 'absolute', top: 28, left: '50%', transform: 'translate(-72px, 0)', width: 7, height: 7, borderRadius: '50%', background: '#0a0a0c', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', width: 46, height: 46, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #2a2a2e, #0a0a0c)', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.06), inset 0 -2px 4px rgba(0,0,0,0.4)' }} />
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
      <div aria-hidden style={{ position: 'absolute', top: 8, left: 0, right: 0, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'system-ui, sans-serif', fontSize: 8, fontWeight: 600, color: '#52525b', letterSpacing: 1 }}>
        <span>● ● ● ●●</span>
        <span style={{ opacity: 0.5 }}>BERRY</span>
        <span>3G</span>
      </div>
      <div aria-hidden style={{ position: 'absolute', top: spec.screenY + spec.screenH + 4, left: spec.screenX, width: spec.screenW, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <Key label="📞" w={28} h={18} bg="#1d4f23" color="#9ef7a4" fontSize={10} />
        <Key label="≡"  w={22} h={18} bg="#2a2a2e" fontSize={11} />
        <div aria-hidden style={{ width: 18, height: 18, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #c8c8cc, #5a5a5e 60%, #1a1a1c)', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.4)' }} />
        <Key label="↩" w={22} h={18} bg="#2a2a2e" fontSize={11} />
        <Key label="📞" w={28} h={18} bg="#5a1717" color="#ffb5b5" fontSize={10} />
      </div>
      <div aria-hidden style={{ position: 'absolute', top: kbTop, left: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            {row.map((k, j) => {
              if (k === '___') return <div key={j} style={{ flex: 1, height: 22 }} />;
              const isSpace = i === 3 && j >= 2 && j <= 4;
              return (
                <Key key={j} label={k} w={isSpace ? 60 : 26} h={22} bg="linear-gradient(180deg, #353539, #1d1d20)" color="#e4e4e7" fontSize={11} bold />
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
      <div aria-hidden style={{ position: 'absolute', top: 12, left: 0, right: 0, textAlign: 'center', fontFamily: 'monospace', fontSize: 7, fontWeight: 700, color: '#3a3a3e', letterSpacing: 2 }}>MOTO</div>
      <div aria-hidden style={{ position: 'absolute', top: hingeY, left: -6, right: -6, height: 6, background: 'linear-gradient(180deg, #5a5d62, #2a2d32)', borderRadius: 1, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.3)' }} />
      <div aria-hidden style={{ position: 'absolute', top: hingeY + 12, left: 16, right: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Key label="◀" w={24} h={14} bg="#5a5d62" color="#1a1d22" fontSize={9} />
        <div aria-hidden style={{ width: 24, height: 14, borderRadius: 7, background: 'radial-gradient(circle at 30% 30%, #e8eaee, #6a6d72)', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.3)' }} />
        <Key label="▶" w={24} h={14} bg="#5a5d62" color="#1a1d22" fontSize={9} />
      </div>
      <div aria-hidden style={{ position: 'absolute', top: hingeY + 30, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
        <Key label="📞" w={48} h={16} bg="#1d4f23" color="#9ef7a4" fontSize={9} radius={2} />
        <Key label="✕"  w={36} h={16} bg="#3a3d42" color="#d4d4d8" fontSize={10} radius={2} />
        <Key label="🔚" w={48} h={16} bg="#5a1717" color="#ffb5b5" fontSize={9} radius={2} />
      </div>
      <div aria-hidden style={{ position: 'absolute', top: dialTop + 24, left: 14, right: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {dialKeys.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
            {row.map((k, j) => (
              <div key={j} style={{ flex: 1, height: 30, background: 'linear-gradient(180deg, #b8bcc2, #6a6d72)', borderRadius: 2, display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 700, fontFamily: 'system-ui, sans-serif', color: '#1a1d22', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 1px rgba(0,0,0,0.2)', textShadow: '0 0 8px rgba(80,160,255,0.6)' }}>
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
      <div aria-hidden style={{ position: 'absolute', top: 6, left: 14, right: 14, height: 3, background: 'linear-gradient(180deg, #52525a, #2a2a2e)', borderRadius: 1, opacity: 0.6 }} />
      <div aria-hidden style={{ position: 'absolute', left: kbLeft, top: spec.screenY, width: kbWidth, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <Key label="📞" w={44} h={22} bg="#1d4f23" color="#9ef7a4" fontSize={10} radius={3} />
        <div aria-hidden style={{ width: 50, height: 26, borderRadius: 13, background: 'radial-gradient(circle at 30% 30%, #6a6d72, #1a1d22)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#a1a1aa', fontSize: 10 }}>OK</div>
        </div>
        <Key label="📞" w={44} h={22} bg="#5a1717" color="#ffb5b5" fontSize={10} radius={3} />
      </div>
      <div aria-hidden style={{ position: 'absolute', left: kbLeft, top: spec.screenY + 42, width: kbWidth, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 2.5, justifyContent: 'space-between' }}>
            {row.map((k, j) => {
              const isSpace = k === 'spc';
              return (
                <div key={j} style={{ flex: isSpace ? 1.4 : 1, height: 22, background: 'linear-gradient(180deg, #3a3a3f, #1d1d20)', borderRadius: 3, display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 600, fontFamily: 'system-ui, sans-serif', color: isSpace ? 'transparent' : '#e4e4e7', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 1px rgba(0,0,0,0.3)' }}>
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

function SideButtons({ spec }: { spec: FrameSpec }) {
  const make = (side: 'left' | 'right', top: number, h: number): CSSProperties => ({
    position: 'absolute',
    [side]: -2.5, top,
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
// Switcher pill
// ────────────────────────────────────────────────────────────────────────────

function SwitcherPill({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(10,10,10,0.92)', color: '#fff',
        padding: '6px 10px 6px 14px', borderRadius: 999,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: 13,
        boxShadow: '0 4px 14px -4px rgba(0,0,0,0.3)',
      }}
    >
      <span style={{ opacity: 0.55, fontWeight: 500 }}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
          <option key={o.value} value={o.value} style={{ color: '#000' }}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────────────────────

export default function PhoneMock({
  hosts,
  defaultHost,
  path = '/',
  frame,
  frames,
  defaultFrame,
  scale,
  hideSwitcher = false,
  hideChrome = false,
  dark = false,
  host,
  onHostChange,
  className,
  style,
}: PhoneMockProps) {
  const hostOptions = useMemo(() => normalizeHosts(hosts), [hosts]);
  const [internalHost, setInternalHost] = useState<string>(
    defaultHost ?? hostOptions[0]?.url ?? ''
  );
  const currentHost = host ?? internalHost;

  const handleHostChange = (url: string) => {
    if (onHostChange) onHostChange(url);
    if (host === undefined) setInternalHost(url);
  };

  const framePickerEnabled = !!frames && frames.length > 1;
  const [internalFrame, setInternalFrame] = useState<PhoneFrame>(
    defaultFrame ?? frames?.[0] ?? frame ?? 'iphone-17-pro'
  );
  const currentFrame: PhoneFrame = framePickerEnabled
    ? internalFrame
    : (frame ?? frames?.[0] ?? 'iphone-17-pro');

  const spec = FRAMES[currentFrame];
  const effectiveScale = scale ?? spec.defaultScale;
  const url = joinUrl(currentHost, path);

  const outerWidth = spec.width * effectiveScale;
  const outerHeight = spec.height * effectiveScale;

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
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {framePickerEnabled && (
            <SwitcherPill
              label="Device"
              value={currentFrame}
              onChange={(v) => setInternalFrame(v as PhoneFrame)}
              options={frames!.map((f) => ({ label: FRAME_LABELS[f], value: f }))}
            />
          )}
          <SwitcherPill
            label="Host"
            value={currentHost}
            onChange={handleHostChange}
            options={hostOptions.map((o) => ({ label: o.label, value: o.url }))}
          />
        </div>
      )}

      <div
        data-phone-frame={currentFrame}
        style={{
          width: outerWidth, height: outerHeight,
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
            {HAS_SIDE_BUTTONS.includes(currentFrame) && <SideButtons spec={spec} />}

            <div
              style={{
                position: 'absolute',
                left: spec.screenX, top: spec.screenY,
                width: spec.screenW, height: spec.screenH,
                borderRadius: spec.screenRadius,
                overflow: 'hidden',
                background: dark ? '#0a0a0a' : '#fff',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.4)',
                transition: 'background 200ms ease',
              }}
            >
              <iframe
                key={url}
                src={url}
                title={`PhoneMock — ${url}`}
                style={{
                  width: '100%', height: '100%',
                  border: 'none', display: 'block',
                  background: dark ? '#0a0a0a' : '#fff',
                  colorScheme: dark ? 'dark' : 'light',
                }}
              />

              {!hideChrome && IPHONE_CHROME_FRAMES.includes(currentFrame) && (
                <IPhoneChrome screenW={spec.screenW} frame={currentFrame} dark={dark} />
              )}
              {!hideChrome && ANDROID_CHROME_FRAMES.includes(currentFrame) && (
                <AndroidChrome screenW={spec.screenW} frame={currentFrame} dark={dark} />
              )}
            </div>

            {currentFrame === 'iphone-se'    && <IPhoneSEExtras />}
            {currentFrame === 'blackberry'   && <BlackBerryExtras spec={spec} />}
            {currentFrame === 'razr-v3'      && <RazrExtras spec={spec} />}
            {currentFrame === 'lg-env2'      && <EnV2Extras spec={spec} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Convenience wrappers for specific device families
//
// Each renders a <PhoneMock> pre-configured for its family. If you pass
// neither `frame` nor `frames`, you get a device picker with that family's
// full lineup. Pass `frame` for a single device, or `frames` for a subset.
// ────────────────────────────────────────────────────────────────────────────

function makeDeviceMockup(displayName: string, defaultFrames: PhoneFrame[]) {
  const C = (props: PhoneMockProps) => {
    const resolved =
      props.frames !== undefined
        ? props.frames
        : props.frame !== undefined
          ? undefined
          : defaultFrames;
    return <PhoneMock {...props} frames={resolved} />;
  };
  C.displayName = displayName;
  return C;
}

export const IPhoneMockup     = makeDeviceMockup('IPhoneMockup',     IPHONE_FRAMES);
export const AndroidMockup    = makeDeviceMockup('AndroidMockup',    ANDROID_PHONE_FRAMES);
export const IPadMockup       = makeDeviceMockup('IPadMockup',       IPAD_FRAMES);
export const AndroidTabMockup = makeDeviceMockup('AndroidTabMockup', ANDROID_TAB_FRAMES);
