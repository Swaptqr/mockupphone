# mockupphone

Drop-in framed mobile preview component for React / Next.js. Wraps any URL in an iframe styled as a phone (iPhone 16 Pro Max, 16 Pro, 15 Pro, SE, Pixel 8, Galaxy S24 Ultra, BlackBerry, Motorola Razr V3, LG enV2), with built-in host and device switchers.

## Install

```bash
npm install mockupphone
```

Works with Next.js, Vite, CRA, or any React 18+ setup. No additional config required.

## Usage

### Single device

```tsx
import PhoneMock from 'mockupphone';

<PhoneMock
  frame="iphone-16-pro"
  hosts={[
    { label: 'local',   url: 'http://localhost:3000' },
    { label: 'staging', url: 'https://staging.myapp.com' },
    { label: 'prod',    url: 'https://myapp.com' },
  ]}
  path="/landing"
/>
```

### Built-in device picker

Pass `frames` instead of (or in addition to) `frame` — `PhoneMock` will render a "Device" dropdown next to the host dropdown.

```tsx
<PhoneMock
  frames={['iphone-16-pro', 'pixel-8', 'razr-v3']}
  hosts={[...]}
/>
```

### Modern vs retro presets

```tsx
import PhoneMock, { MODERN_FRAMES, RETRO_FRAMES, ALL_FRAMES } from 'mockupphone';

<PhoneMock frames={MODERN_FRAMES} hosts={[...]} />
```

## Props

| Prop           | Type                                  | Default           | Notes                                                       |
| -------------- | ------------------------------------- | ----------------- | ----------------------------------------------------------- |
| `hosts`        | `(string \| { label, url })[]`        | —                 | Required. Hosts shown in the dropdown.                      |
| `defaultHost`  | `string`                              | first host's url  | Uncontrolled starting host.                                 |
| `path`         | `string`                              | `'/'`             | Appended to the selected host.                              |
| `frame`        | `PhoneFrame`                          | `'iphone-15-pro'` | Single-frame mode.                                          |
| `frames`       | `PhoneFrame[]`                        | —                 | Picker mode. Renders a Device dropdown.                     |
| `defaultFrame` | `PhoneFrame`                          | first in `frames` | Initial frame in picker mode.                               |
| `scale`        | `number`                              | per-frame         | Override the default visual scale.                          |
| `hideSwitcher` | `boolean`                             | `false`           | Hide the dropdowns above the frame.                         |
| `hideChrome`   | `boolean`                             | `false`           | Hide simulated status bar / notch / home indicator.         |
| `host`         | `string`                              | —                 | Controlled host. Pair with `onHostChange`.                  |
| `onHostChange` | `(url: string) => void`               | —                 | Fires when the user changes hosts.                          |

### Frames

```
'iphone-16-pro-max' | 'iphone-16-pro' | 'iphone-15-pro' | 'iphone-se'
| 'pixel-8' | 'galaxy-s24-ultra'
| 'blackberry' | 'razr-v3' | 'lg-env2'
```

Also exported: `MODERN_FRAMES`, `RETRO_FRAMES`, `ALL_FRAMES`, `FRAME_LABELS`.

## iframe limitations

Sites that send `X-Frame-Options: DENY` or restrictive `frame-ancestors` CSP (most big production sites) can't render in an iframe. Your own apps will be fine.

## Local development

```bash
npm install
npm run dev
```

Opens a demo page at `http://localhost:3000` with frame switcher and built-in demo content.
