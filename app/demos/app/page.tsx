export const metadata = { title: 'Acme — Demo App' };

const messages = [
  { from: 'Alex Chen',   text: 'Just shipped the new pricing page — looks great in the frame', time: '2m', unread: true },
  { from: 'Jamie Park',  text: 'Can you screenshot the iPhone SE view for the deck?',          time: '14m', unread: true },
  { from: 'Sam Liu',     text: 'Approved ✅',                                                    time: '1h',  unread: false },
  { from: 'Riley Adams', text: 'Where do we host the staging build?',                          time: '3h',  unread: false },
  { from: 'Morgan Yu',   text: 'See you at standup',                                            time: '1d',  unread: false },
];

export default function DemoApp() {
  return (
    <main
      style={{
        margin: 0,
        minHeight: '100vh',
        background: '#fafafa',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#0a0a0a',
        paddingTop: 60,
      }}
    >
      <header
        style={{
          padding: '12px 20px 16px',
          background: '#fff',
          borderBottom: '1px solid #e4e4e7',
        }}
      >
        <div style={{ fontSize: 11, color: '#71717a', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
          Inbox
        </div>
        <h1 style={{ margin: '4px 0 0', fontSize: 26, letterSpacing: -0.5, fontWeight: 700 }}>
          Messages
        </h1>
      </header>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {messages.map((m, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 20px',
              background: '#fff',
              borderBottom: '1px solid #f4f4f5',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: `hsl(${(i * 67) % 360} 70% 85%)`,
                color: `hsl(${(i * 67) % 360} 60% 30%)`,
                display: 'grid',
                placeItems: 'center',
                fontWeight: 600,
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {m.from.split(' ').map((s) => s[0]).join('')}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{m.from}</div>
                <div style={{ fontSize: 11, color: '#a1a1aa' }}>{m.time}</div>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: m.unread ? '#0a0a0a' : '#71717a',
                  fontWeight: m.unread ? 500 : 400,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {m.text}
              </div>
            </div>
            {m.unread && (
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
