# mockupphone

Drop-in framed mobile preview component for React / Next.js. Wraps any URL in an iframe styled as a phone or tablet, with built-in host and device switchers.

**Devices included** — iPhone 17 / 17 Pro / 17 Pro Max / 17 Air / 17e, iPhone 16 Pro / Pro Max, iPhone 15 Pro, iPhone SE; Pixel 10 / 10 Pro / 10 Pro XL, Pixel 8; Galaxy S25 / S25+ / S25 Ultra, S24 Ultra; iPad Pro 11", Galaxy Tab S9; and retro: BlackBerry, Motorola Razr V3, LG enV2.

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
  frame="iphone-17-pro"
  hosts={[
    { label: 'local',   url: 'http://localhost:3000' },
    { label: 'staging', url: 'https://staging.myapp.com' },
    { label: 'prod',    url: 'https://myapp.com' },
  ]}
  path="/landing"
/>
```

### Built-in device picker

Pass `frames` to render a "Device" dropdown alongside the host dropdown.

```tsx
<PhoneMock
  frames={['iphone-17-pro', 'pixel-10', 'razr-v3']}
  hosts={[...]}
/>
```

### Family-specific components

```tsx
import { IPhoneMockup, AndroidMockup, IPadMockup, AndroidTabMockup } from 'mockupphone';

<IPhoneMockup     hosts={[...]} />  // picker scoped to iPhones
<AndroidMockup    hosts={[...]} />  // Pixel + Galaxy phones
<IPadMockup       hosts={[...]} />  // iPad Pro
<AndroidTabMockup hosts={[...]} />  // Galaxy Tab
```

Each accepts every `PhoneMock` prop. Pass `frame` for a single device, or `frames` for a custom subset.

### Presets

```tsx
import PhoneMock, { MODERN_FRAMES, RETRO_FRAMES, ALL_FRAMES } from 'mockupphone';

<PhoneMock frames={MODERN_FRAMES} hosts={[...]} />
```

## Props (`PhoneMock`)

| Prop           | Type                                  | Default           | Notes                                                       |
| -------------- | ------------------------------------- | ----------------- | ----------------------------------------------------------- |
| `hosts`        | `(string \| { label, url })[]`        | —                 | Required. Hosts shown in the dropdown.                      |
| `defaultHost`  | `string`                              | first host's url  | Uncontrolled starting host.                                 |
| `path`         | `string`                              | `'/'`             | Appended to the selected host.                              |
| `frame`        | `PhoneFrame`                          | `'iphone-17-pro'` | Single-frame mode.                                          |
| `frames`       | `PhoneFrame[]`                        | —                 | Picker mode. Renders a Device dropdown.                     |
| `defaultFrame` | `PhoneFrame`                          | first in `frames` | Initial frame in picker mode.                               |
| `scale`        | `number`                              | per-frame         | Override the default visual scale.                          |
| `hideSwitcher` | `boolean`                             | `false`           | Hide the dropdowns above the frame.                         |
| `hideChrome`   | `boolean`                             | `false`           | Hide simulated status bar / notch / home indicator.         |
| `dark`         | `boolean`                             | `false`           | Dark screen surface + light status bar / home indicator.    |
| `host`         | `string`                              | —                 | Controlled host. Pair with `onHostChange`.                  |
| `onHostChange` | `(url: string) => void`               | —                 | Fires when the user changes hosts.                          |

## Frame ids

```
iphone-17-pro-max | iphone-17-pro | iphone-17-air | iphone-17 | iphone-17e
iphone-16-pro-max | iphone-16-pro | iphone-15-pro | iphone-se
pixel-10-pro-xl | pixel-10-pro | pixel-10 | pixel-8
galaxy-s25-ultra | galaxy-s25-plus | galaxy-s25 | galaxy-s24-ultra
ipad-pro-11 | galaxy-tab-s9
blackberry | razr-v3 | lg-env2
```

Also exported: `IPHONE_FRAMES`, `ANDROID_PHONE_FRAMES`, `IPAD_FRAMES`, `ANDROID_TAB_FRAMES`, `MODERN_FRAMES`, `RETRO_FRAMES`, `ALL_FRAMES`, `FRAME_LABELS`.

## iframe limitations

Sites that send `X-Frame-Options: DENY` or restrictive `frame-ancestors` CSP (most big production sites) can't render in an iframe. Your own apps will be fine.

## Local development

```bash
npm install
npm run dev
```

Opens a demo page at `http://localhost:3000` with frame switcher, retro/modern filter, and built-in demo content.
