import type { ReactNode } from 'react';

export const metadata = {
  title: 'PhoneMock',
  description: 'Drop-in framed phone preview component.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: '#f4f4f5',
          color: '#111',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
