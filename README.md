# mockupphone

Drop-in framed mobile preview component for React / Next.js. Wraps any URL in an iframe styled as a phone (iPhone 15 Pro, iPhone SE, Pixel 8, BlackBerry, Motorola Razr V3, LG enV2), with a built-in host switcher.

## Install

This package ships source-only (a single `.tsx` file). Install directly from GitHub:

```bash
npm install github:Swaptqr/mockupphone
```

Then in your `next.config.js` (or `next.config.mjs`) add the package to `transpilePackages` so Next compiles the source:

```js
/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['mockupphone'],
};
```

## Usage

```tsx
import PhoneMock from 'mockupphone';

export default function Preview() {
  return (
    <PhoneMock
      hosts={[
        { label: 'local',   url: 'http://localhost:3000' },
        { label: 'staging', url: 'https://staging.myapp.com' },
        { label: 'prod',    url: 'https://myapp.com' },
      ]}
      frame="iphone-15-pro"
      path="/landing"
    />
  );
}
```

## Props

| Prop           | Type                                  | Default           | Notes                                                       |
| -------------- | ------------------------------------- | ----------------- | ----------------------------------------------------------- |
| `hosts`        | `(string \| { label, url })[]`        | —                 | Required. Hosts shown in the dropdown.                      |
| `defaultHost`  | `string`                              | first host's url  | Uncontrolled starting host.                                 |
| `path`         | `string`                              | `'/'`             | Appended to the selected host.                              |
| `frame`        | `PhoneFrame`                          | `'iphone-15-pro'` | See frames below.                                           |
| `scale`        | `number`                              | per-frame         | Override the default visual scale.                          |
| `hideSwitcher` | `boolean`                             | `false`           | Hide the host dropdown above the frame.                     |
| `hideChrome`   | `boolean`                             | `false`           | Hide simulated status bar / notch / home indicator.         |
| `host`         | `string`                              | —                 | Controlled mode. Pair with `onHostChange`.                  |
| `onHostChange` | `(url: string) => void`               | —                 | Fires when the user changes hosts.                          |

### Frames

`'iphone-15-pro' | 'iphone-se' | 'pixel-8' | 'blackberry' | 'razr-v3' | 'lg-env2'`

## iframe limitations

Sites that send `X-Frame-Options: DENY` or restrictive `frame-ancestors` CSP (most big production sites) can't render in an iframe. Your own apps will be fine.

## Local development

```bash
npm install
npm run dev
```

Opens a demo page at `http://localhost:3000` with frame switcher and built-in demo content.
