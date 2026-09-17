import { useState } from 'react'
import './index.css'

const people = [
  { name: 'Aarav Sharma', age: 22, route: 'Patna → New Delhi', time: 'Tomorrow · 7:30 AM', rating: '4.9' },
  { name: 'Ananya Singh', age: 21, route: 'Patna → New Delhi', time: 'Tomorrow · 8:00 AM', rating: '4.8' },
  { name: 'Riya Verma', age: 23, route: 'Patna → Lucknow', time: 'Fri · 6:00 AM', rating: '4.9' },
]

const places = ['Home', 'College', 'Work']

function Logo() {
  return <div className="logo">tag<span>.</span></div>
}

function Back({ go }) {
  return <button className="back" onClick={() => go(-1)}>‹</button>
}

function Primary({ children, onClick }) {
  return <button className="primary" onClick={onClick}>{children}<span>→</span></button>
}

function Header({ title, go }) {
  return (
    <header className="inner-header">
      <Back go={go} />
      <strong>{title}</strong>
      <span className="header-spacer" />
    </header>
  )
}

function Avatar({ name = 'Mohnish', size = '' }) {
  return (
    <div className={`avatar ${size}`}>
      {name.split(' ').map(x => x[0]).join('').slice(0, 2)}
    </div>
  )
}

function Field({ label, placeholder, value, onChange, type = 'text' }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
        />
      </div>
    </label>
  )
}

/* ---------- REFERENCE-LANGUAGE MAP ---------- */

function Map() {
  return (
    <div className="map">
      <div className="map-grid" />
      <div className="road r1" />
      <div className="road r2" />
      <div className="road r3" />
      <div className="road r4" />
      <span className="street a">Fraser Road</span>
      <span className="street b">Bailey Road</span>
      <span className="street c">Station Road</span>
      <div className="map-water" />
      <div className="map-pin" />
      <button className="locate">⌖</button>
    </div>
  )
}

/* ---------- ONBOARDING ---------- */

function Onboarding({ n, go }) {
  const data = [
    ['Meet people along your way', 'Turn ordinary journeys into shared experiences.', '✦'],
    ['Find the right match', 'Discover people heading your way, with profiles you can trust.', '◎'],
    ['Keep the journey on Tag', 'Chat, coordinate and complete your journey without giving up your privacy.', '↗'],
  ][n]

  return (
    <div className="plain onboarding">
      <div className="onboard-art">{data[2]}</div>

      <div className="dots">
        {[0, 1, 2].map(i => <i className={i === n ? 'on' : ''} key={i} />)}
      </div>

      <div className="onboard-copy">
        <Logo />
        <h1>{data[0]}</h1>
        <p>{data[1]}</p>
      </div>

      <Primary onClick={() => go(n === 2 ? 'welcome' : 1)}>
        Continue
      </Primary>

      <button className="text-btn" onClick={() => go('welcome')}>
        Skip
      </button>
    </div>
  )
}

/* ---------- AUTH ---------- */

function Otp({ go, title, next }) {
  return (
    <div className="plain auth">
      <Logo />
      <h1>{title}</h1>
      <p className="muted">
        We sent a 6-digit code to your mobile number.
      </p>

      <div className="otp">
        {[1, 2, 3, 4, 5, 6].map(i =>
          <input key={i} maxLength="1" inputMode="numeric" />
        )}
      </div>

      <button className="resend">
        Didn't receive it? <b>Resend</b>
      </button>

      <Primary onClick={() => go(next)}>Verify</Primary>
    </div>
  )
}

function ProfileSetup({ go }) {
  return (
    <div className="plain auth">
      <Header title="Complete profile" go={go} />

      <div className="profile-photo">
        <Avatar size="lg" />
        <button>+</button>
      </div>

      <h1>Tell people about you</h1>
      <p className="muted">
        Only share what you're comfortable with.
      </p>

      <Field label="Full name" placeholder="Mohnish Raj" />
      <Field label="Age" placeholder="22" />
      <Field label="City" placeholder="Patna" />

      <Primary onClick={() => go('home')}>Finish</Primary>
    </div>
  )
}

function Auth({ mode, go }) {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  if (mode === 'welcome') {
    return (
      <div className="plain welcome">
        <Logo />

        <div className="welcome-art">
          <div className="orbit o1" />
          <div className="orbit o2" />
          <b>TAG</b>
        </div>

        <h1>
          Find your people.<br />
          <em>Make the journey together.</em>
        </h1>

        <p>
          A safer way to discover, connect and stay in control.
        </p>

        <Primary onClick={() => go('signup')}>
          Get started
        </Primary>

        <button className="secondary" onClick={() => go('signin')}>
          I already have an account
        </button>
      </div>
    )
  }

  if (mode === 'signup') {
    return (
      <div className="plain auth">
        <Logo />
        <h1>Create your account</h1>
        <p className="muted">A few details and you're ready to Tag.</p>

        <Field
          label="Mobile number"
          placeholder="+91 98765 43210"
          value={phone}
          onChange={setPhone}
        />

        <Field label="Email" placeholder="you@example.com" />

        <Primary onClick={() => go('otp')}>Continue</Primary>

        <p className="switch">
          Already have an account?
          <button onClick={() => go('signin')}>Sign in</button>
        </p>
      </div>
    )
  }

  if (mode === 'signin') {
    return (
      <div className="plain auth">
        <Logo />
        <h1>Welcome back</h1>
        <p className="muted">Sign in to continue your journey.</p>

        <Field
          label="Mobile number"
          placeholder="+91 98765 43210"
          value={phone}
          onChange={setPhone}
        />

        <Field
          label="Password"
          placeholder="Your password"
          type="password"
          value={password}
          onChange={setPassword}
        />

        <button className="forgot" onClick={() => go('forgot')}>
          Forgot password?
        </button>

        <Primary onClick={() => go('home')}>Sign in</Primary>

        <p className="switch">
          New to Tag?
          <button onClick={() => go('signup')}>Create account</button>
        </p>
      </div>
    )
  }

  if (mode === 'otp') {
    return <Otp go={go} title="Verify your number" next="profile" />
  }

  if (mode === 'forgot') {
    return (
      <div className="plain auth">
        <Logo />
        <h1>Reset password</h1>
        <p className="muted">
          Enter your mobile number and we'll send a verification code.
        </p>

        <Field label="Mobile number" placeholder="+91 98765 43210" />

        <Primary onClick={() => go('phone-otp')}>
          Send code
        </Primary>
      </div>
    )
  }

  if (mode === 'phone-otp') {
    return <Otp go={go} title="Verify to reset password" next="new-password" />
  }

  if (mode === 'new-password') {
    return (
      <div className="plain auth">
        <Header title="New password" go={go} />
        <h1>Set a new password</h1>

        <Field
          label="New password"
          placeholder="Minimum 8 characters"
          type="password"
        />

        <Field
          label="Confirm password"
          placeholder="Repeat password"
          type="password"
        />

        <Primary onClick={() => go('signin')}>
          Update password
        </Primary>
      </div>
    )
  }

  if (mode === 'profile') return <ProfileSetup go={go} />
}

/* ---------- MAIN NAV ---------- */

function BottomNav({ go, active }) {
  return (
    <nav className="bottom-nav">
      {[
        ['home', '⌂', 'Home'],
        ['discover', '⌕', 'Discover'],
        ['tags', '◇', 'Tags'],
        ['activity', '◷', 'Activity'],
        ['profile', '○', 'Profile'],
      ].map(x => (
        <button
          className={active === x[0] ? 'active' : ''}
          key={x[0]}
          onClick={() => go(x[0])}
        >
          <span>{x[1]}</span>
          <small>{x[2]}</small>
        </button>
      ))}
    </nav>
  )
}

/* ---------- HOME ---------- */

function Home({ go }) {
  const [destination, setDestination] = useState('')

  return (
    <div className="screen">
      <Map />

      <header className="floating-header">
        <button className="round" onClick={() => go('menu')}>☰</button>
        <Logo />
        <button className="round" onClick={() => go('notifications')}>
          ♢<i />
        </button>
      </header>

      <div className="map-label">● Patna</div>

      <section className="home-sheet">
        <div className="handle" />

        <div className="sheet-title">
          <div>
            <small>YOUR JOURNEY</small>
            <h1>Where are you going?</h1>
          </div>
          <button className="mini" onClick={() => go('discover')}>⌕</button>
        </div>

        <div className="chips">
          {places.map(p =>
            <button key={p} onClick={() => setDestination(p)}>
              ⌂ {p}
            </button>
          )}
        </div>

        <button className="destination" onClick={() => go('location')}>
          <span>⌖</span>
          <b>{destination || 'Where do you want to go?'}</b>
          <em>›</em>
        </button>

        <div className="divider" />

        <div className="near-head">
          <div>
            <small>NEAR YOUR ROUTE</small>
            <h2>People travelling nearby</h2>
          </div>
          <button onClick={() => go('discover')}>See all</button>
        </div>

        <div className="people-row">
          {people.map(p =>
            <button
              className="person-card"
              key={p.name}
              onClick={() => go('person')}
            >
              <Avatar name={p.name} />
              <div>
                <strong>{p.name}, {p.age}</strong>
                <span>{p.time}</span>
              </div>
              <b>★ {p.rating}</b>
            </button>
          )}
        </div>
      </section>

      <BottomNav go={go} active="home" />
    </div>
  )
}

/* ---------- DISCOVER ---------- */

function Discover({ go }) {
  return (
    <div className="plain page">
      <Header title="Discover" go={go} />

      <div className="searchbar">
        ⌕ <input placeholder="Search destination or route" />
      </div>

      <div className="section-title">
        <small>PEOPLE HEADING YOUR WAY</small>
        <h1>Find a match</h1>
      </div>

      <div className="route-card">
        <div><span>FROM</span><b>Patna</b></div>
        <i>→</i>
        <div><span>TO</span><b>New Delhi</b></div>
      </div>

      <div className="filter-row">
        <button className="selected">Tomorrow</button>
        <button>Morning</button>
        <button>2 seats</button>
      </div>

      {people.map(p =>
        <button
          className="discover-card"
          key={p.name}
          onClick={() => go('person')}
        >
          <Avatar name={p.name} size="lg" />
          <div className="dcopy">
            <strong>{p.name}, {p.age}</strong>
            <span>★ {p.rating} · Verified</span>
            <p>{p.route}</p>
            <small>{p.time}</small>
          </div>
          <em>›</em>
        </button>
      )}

      <BottomNav go={go} active="discover" />
    </div>
  )
}

/* ---------- LOCATION ---------- */

function Location({ go }) {
  const [q, setQ] = useState('')

  return (
    <div className="plain page">
      <Header title="Choose destination" go={go} />

      <div className="location-search">
        <span>⌕</span>
        <input
          autoFocus
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search a place"
        />
        <button>×</button>
      </div>

      <div className="map-mini">
        <Map />
      </div>

      <div className="location-list">
        <button onClick={() => go('confirm')}>
          <span>⌖</span>
          <div>
            <b>Patna Junction</b>
            <small>Fraser Road, Patna</small>
          </div>
          <em>›</em>
        </button>

        <button onClick={() => go('confirm')}>
          <span>⌂</span>
          <div>
            <b>Home</b>
            <small>Patna, Bihar</small>
          </div>
          <em>›</em>
        </button>
      </div>
    </div>
  )
}

/* ---------- CREATE / MATCH ---------- */

function Confirm({ go }) {
  return (
    <div className="screen">
      <Map />

      <div className="confirm-card">
        <Header title="Confirm location" go={go} />

        <div className="selected-place">
          <span>⌖</span>
          <div>
            <small>DESTINATION</small>
            <h2>Patna Junction</h2>
            <p>Fraser Road, Patna</p>
          </div>
        </div>

        <Primary onClick={() => go('create')}>
          Use this location
        </Primary>
      </div>
    </div>
  )
}

function CreateTag({ go }) {
  return (
    <div className="plain page">
      <Header title="Create a Tag" go={go} />

      <div className="section-title">
        <small>START A JOURNEY</small>
        <h1>What are you looking for?</h1>
      </div>

      <div className="choice-grid">
        <button className="choice selected" onClick={() => go('tag-details')}>
          <b>↗</b>
          <strong>Ride together</strong>
          <span>Share a route and split the journey.</span>
        </button>

        <button className="choice" onClick={() => go('tag-details')}>
          <b>◎</b>
          <strong>Meet nearby</strong>
          <span>Find someone heading your way.</span>
        </button>
      </div>

      <Field label="Where are you going?" placeholder="Patna Junction" />
      <Field label="When?" placeholder="Tomorrow · 7:30 AM" />

      <Primary onClick={() => go('tag-details')}>
        Continue
      </Primary>
    </div>
  )
}

function TagDetails({ go }) {
  return (
    <div className="plain page">
      <Header title="Tag details" go={go} />

      <div className="tag-preview">
        <span>↗</span>
        <div>
          <small>YOUR TAG</small>
          <h2>Patna → New Delhi</h2>
          <p>Tomorrow · 7:30 AM</p>
        </div>
      </div>

      <div className="detail-row">
        <span>Seats</span>
        <b>2</b>
        <button>−</button>
        <button>+</button>
      </div>

      <div className="detail-row">
        <span>Preference</span>
        <b>Verified people</b>
        <em>›</em>
      </div>

      <div className="detail-row">
        <span>Visibility</span>
        <b>Public</b>
        <em>›</em>
      </div>

      <Primary onClick={() => go('matching')}>
        Find people
      </Primary>
    </div>
  )
}

function Matching({ go }) {
  return (
    <div className="plain page">
      <Header title="People for your Tag" go={go} />

      <div className="match-banner">
        <small>YOUR ROUTE</small>
        <b>Patna → New Delhi</b>
        <span>Tomorrow · 7:30 AM</span>
      </div>

      <div className="section-title compact">
        <small>3 PEOPLE FOUND</small>
        <h1>Choose who fits</h1>
      </div>

      {people.map(p =>
        <button
          className="match-card"
          key={p.name}
          onClick={() => go('person')}
        >
          <Avatar name={p.name} size="lg" />
          <div>
            <strong>{p.name}, {p.age}</strong>
            <span>★ {p.rating} · 12 Tags</span>
            <p>{p.route}</p>
            <small>{p.time}</small>
          </div>
          <em>›</em>
        </button>
      )}
    </div>
  )
}

function Person({ go }) {
  return (
    <div className="plain page">
      <Header title="Profile" go={go} />

      <div className="person-hero">
        <Avatar name="Aarav Sharma" size="xl" />
        <div>
          <h1>Aarav Sharma, 22</h1>
          <span>★ 4.9 · 18 completed Tags</span>
        </div>
      </div>

      <div className="trust">
        <b>✓</b>
        <div>
          <strong>Verified profile</strong>
          <span>Phone and identity verified</span>
        </div>
      </div>

      <div className="about">
        <small>ABOUT</small>
        <p>
          Usually travelling between Patna and Delhi.
          I prefer a quiet, respectful journey.
        </p>
      </div>

      <div className="route-box">
        <span>ROUTE</span>
        <b>Patna → New Delhi</b>
        <small>Tomorrow · 7:30 AM</small>
      </div>

      <Primary onClick={() => go('request')}>
        Request a Tag
      </Primary>
    </div>
  )
}

/* ---------- REQUEST / ACTIVE ---------- */

function Request({ go }) {
  return (
    <div className="plain page">
      <Header title="Request Tag" go={go} />

      <div className="request-card">
        <Avatar name="Aarav Sharma" size="lg" />
        <div>
          <strong>Aarav Sharma</strong>
          <span>★ 4.9 · Verified</span>
        </div>
      </div>

      <div className="route-box">
        <span>YOUR JOURNEY</span>
        <b>Patna → New Delhi</b>
        <small>Tomorrow · 7:30 AM</small>
      </div>

      <div className="note">
        <small>MESSAGE</small>
        <textarea placeholder="Say hello and tell them a little about your journey..." />
      </div>

      <Primary onClick={() => go('request-sent')}>
        Send request
      </Primary>
    </div>
  )
}

function RequestSent({ go }) {
  return (
    <div className="plain success">
      <div className="success-icon">✓</div>
      <Logo />
      <h1>Request sent</h1>
      <p>
        Aarav has been notified. You can keep exploring while you wait.
      </p>
      <Primary onClick={() => go('tags')}>View my Tags</Primary>
      <button className="text-btn" onClick={() => go('home')}>
        Back home
      </button>
    </div>
  )
}

function Tags({ go }) {
  return (
    <div className="plain page">
      <Header title="My Tags" go={go} />

      <div className="tabs">
        <button className="active">Active</button>
        <button>Upcoming</button>
        <button>Completed</button>
      </div>

      <div className="tag-card active-card">
        <span className="status">REQUESTED</span>
        <h2>Patna → New Delhi</h2>
        <p>Tomorrow · 7:30 AM</p>
        <div>
          <Avatar name="Aarav Sharma" />
          <b>Aarav Sharma</b>
          <em>Pending</em>
        </div>
      </div>

      <div className="tag-card">
        <span className="status soft">UPCOMING</span>
        <h2>Patna → Lucknow</h2>
        <p>Fri · 6:00 AM</p>
        <div>
          <Avatar name="Riya Verma" />
          <b>Riya Verma</b>
          <em>Confirmed</em>
        </div>
      </div>

      <BottomNav go={go} active="tags" />
    </div>
  )
}

function ActiveTag({ go }) {
  return (
    <div className="plain page">
      <Header title="Active Tag" go={go} />

      <div className="active-route">
        <span>LIVE JOURNEY</span>
        <h1>Patna → New Delhi</h1>
        <p>Today · 7:30 AM</p>
      </div>

      <div className="travel-status">
        <i />
        <div>
          <strong>You're connected</strong>
          <span>Aarav is on your Tag</span>
        </div>
      </div>

      <div className="action-grid">
        <button onClick={() => go('chat')}>
          ◌<b>Chat</b><small>Protected</small>
        </button>

        <button onClick={() => go('call')}>
          ◉<b>Call</b><small>In-app</small>
        </button>

        <button onClick={() => go('complete')}>
          ✓<b>Complete</b><small>End Tag</small>
        </button>
      </div>

      <div className="safety">
        <b>ⓘ</b>
        <span>
          Your contact details stay private while you're on Tag.
        </span>
      </div>
    </div>
  )
}

function Chat({ go }) {
  return (
    <div className="plain chat">
      <Header title="Aarav Sharma" go={go} />

      <div className="chat-trust">
        ✓ Protected conversation
      </div>

      <div className="messages">
        <div className="bubble them">Hey! Ready for tomorrow?</div>
        <div className="bubble me">
          Yes! I'll be at the pickup point by 7:20.
        </div>
        <div className="bubble them">Perfect 👍</div>
      </div>

      <div className="chat-input">
        <button>+</button>
        <input placeholder="Message..." />
        <button>➤</button>
      </div>
    </div>
  )
}

function Call({ go }) {
  return (
    <div className="plain call">
      <Avatar name="Aarav Sharma" size="xl" />
      <h1>Aarav Sharma</h1>
      <p>Calling securely through Tag...</p>
      <div className="call-ring">◉</div>
      <button className="end-call" onClick={() => go('active')}>×</button>
    </div>
  )
}

function Complete({ go }) {
  return (
    <div className="plain success">
      <div className="success-icon">✓</div>
      <h1>Tag completed</h1>
      <p>How was the journey with Aarav?</p>
      <div className="stars">☆ ☆ ☆ ☆ ☆</div>
      <Primary onClick={() => go('review')}>Leave review</Primary>
    </div>
  )
}

function Review({ go }) {
  return (
    <div className="plain page">
      <Header title="Your review" go={go} />

      <div className="review-person">
        <Avatar name="Aarav Sharma" size="xl" />
        <h1>How was your Tag?</h1>
        <p>Your feedback helps keep the community trusted.</p>
      </div>

      <div className="stars big">☆ ☆ ☆ ☆ ☆</div>

      <div className="note">
        <small>OPTIONAL NOTE</small>
        <textarea placeholder="Share something helpful..." />
      </div>

      <Primary onClick={() => go('review-success')}>
        Submit review
      </Primary>
    </div>
  )
}

function ReviewSuccess({ go }) {
  return (
    <div className="plain success">
      <div className="success-icon">✓</div>
      <Logo />
      <h1>Thanks for the feedback</h1>
      <p>Your review has been added to the community trust layer.</p>
      <Primary onClick={() => go('home')}>Back to home</Primary>
    </div>
  )
}

/* ---------- PRODUCT INFRASTRUCTURE ---------- */

function Notifications({ go }) {
  return (
    <div className="plain page">
      <Header title="Notifications" go={go} />

      <div className="notification">
        <b>New Tag request</b>
        <span>Aarav Sharma wants to join your Patna → New Delhi journey.</span>
        <small>2 min ago</small>
      </div>

      <div className="notification">
        <b>Your Tag is confirmed</b>
        <span>Riya accepted your request.</span>
        <small>Yesterday</small>
      </div>
    </div>
  )
}

function Activity({ go }) {
  return (
    <div className="plain page">
      <Header title="Activity" go={go} />

      <div className="empty">
        <div>◷</div>
        <h1>Nothing new yet</h1>
        <p>Your completed journeys and updates will appear here.</p>
        <Primary onClick={() => go('discover')}>
          Discover people
        </Primary>
      </div>

      <BottomNav go={go} active="activity" />
    </div>
  )
}

function Profile({ go }) {
  return (
    <div className="plain page">
      <Header title="Profile" go={go} />

      <div className="profile-head">
        <Avatar size="xl" />
        <div>
          <h1>Mohnish Raj</h1>
          <span>★ 4.9 · 12 Tags completed</span>
        </div>
        <button>✎</button>
      </div>

      <div className="profile-list">
        <button onClick={() => go('settings')}>⚙ <span>Settings</span>›</button>
        <button onClick={() => go('wallet')}>◈ <span>Wallet</span>›</button>
        <button onClick={() => go('referral')}>♧ <span>Invite friends</span>›</button>
        <button onClick={() => go('help')}>? <span>Help & Support</span>›</button>
      </div>

      <BottomNav go={go} active="profile" />
    </div>
  )
}

function Menu({ go }) {
  const items = [
    ['⌂', 'Home', 'home'],
    ['◇', 'My Tags', 'tags'],
    ['◷', 'Activity', 'activity'],
    ['♡', 'Favourites', 'favourites'],
    ['◈', 'Wallet', 'wallet'],
    ['⚙', 'Settings', 'settings'],
    ['?', 'Help & Support', 'help'],
  ]

  return (
    <div className="plain menu">
      <Logo />

      <button className="menu-profile" onClick={() => go('profile')}>
        <Avatar size="lg" />
        <div>
          <b>Mohnish Raj</b>
          <span>View profile</span>
        </div>
        ›
      </button>

      {items.map(x =>
        <button
          className="menu-item"
          key={x[2]}
          onClick={() => go(x[2])}
        >
          <i>{x[0]}</i>
          <span>{x[1]}</span>
          ›
        </button>
      )}

      <button className="logout" onClick={() => go('welcome')}>
        ↪ Sign out
      </button>
    </div>
  )
}

function Favourites({ go }) {
  return (
    <div className="plain page">
      <Header title="Favourites" go={go} />

      <div className="section-title">
        <small>SAVED PEOPLE</small>
        <h1>Your trusted circle</h1>
      </div>

      <div className="discover-card">
        <Avatar name="Aarav Sharma" size="lg" />
        <div className="dcopy">
          <strong>Aarav Sharma</strong>
          <span>★ 4.9 · Verified</span>
          <p>18 completed Tags</p>
        </div>
        <em>♡</em>
      </div>

      <div className="empty small-empty">
        <div>♡</div>
        <h2>No more favourites</h2>
        <p>Save people you trust after a completed Tag.</p>
      </div>
    </div>
  )
}

function Wallet({ go }) {
  return (
    <div className="plain page">
      <Header title="Wallet" go={go} />

      <div className="wallet">
        <small>TAG BALANCE</small>
        <strong>₹ 240.00</strong>
        <span>Available for future Tag services</span>
      </div>

      <button className="wallet-action" onClick={() => go('add-money')}>
        + Add money
      </button>

      <div className="section-title compact">
        <small>RECENT</small>
        <h2>Transactions</h2>
      </div>

      {[
        'Tag service · − ₹60',
        'Added money · + ₹300',
        'Tag service · − ₹0',
      ].map(x =>
        <div className="transaction" key={x}>
          {x}<span>Today</span>
        </div>
      )}
    </div>
  )
}

function AddMoney({ go }) {
  return (
    <div className="plain page">
      <Header title="Add money" go={go} />

      <div className="amount-grid">
        {['₹100', '₹250', '₹500', '₹1,000'].map(x =>
          <button key={x}>{x}</button>
        )}
      </div>

      <Field label="Custom amount" placeholder="₹ Enter amount" />

      <Primary onClick={() => go('payment-success')}>
        Continue
      </Primary>
    </div>
  )
}

function PaymentSuccess({ go }) {
  return (
    <div className="plain success">
      <div className="success-icon">✓</div>
      <h1>Money added</h1>
      <p>₹250 has been added to your Tag wallet.</p>
      <Primary onClick={() => go('wallet')}>Done</Primary>
    </div>
  )
}

/* ---------- ACCOUNT ---------- */

function Settings({ go }) {
  const rows = [
    ['Account', 'Edit profile', 'profile'],
    ['Security', 'Password & verification', 'password'],
    ['Preferences', 'Language', 'language'],
    ['Privacy', 'Privacy policy', 'privacy'],
    ['Support', 'Contact us', 'contact'],
  ]

  return (
    <div className="plain page">
      <Header title="Settings" go={go} />

      {rows.map(x =>
        <button
          className="settings-row"
          key={x[1]}
          onClick={() => go(x[2])}
        >
          <span>
            <small>{x[0]}</small>
            <b>{x[1]}</b>
          </span>
          ›
        </button>
      )}

      <button className="danger" onClick={() => go('delete')}>
        Delete account
      </button>
    </div>
  )
}

function Simple({ go, type }) {
  const map = {
    password: ['Change password', 'Keep your account secure with a strong password.'],
    language: ['Language', 'English'],
    privacy: ['Privacy policy', 'Your profile and journey information are designed to stay within the Tag experience.'],
    contact: ['Contact us', 'Need help? Reach out to the Tag support team.'],
    help: ['Help & Support', 'Find answers about Tags, privacy, safety and your account.'],
    referral: ['Invite friends', 'Bring trusted people into your Tag circle.'],
    about: ['About Tag', 'Tag helps people discover compatible journeys and build trusted connections without making contact exchange the goal.'],
    delete: ['Delete account', 'Deleting your account removes your profile and active Tag history. This action cannot be undone.'],
  }

  const [title, body] = map[type]

  return (
    <div className="plain page">
      <Header title={title} go={go} />

      <div className="simple-content">
        <div className="simple-icon">
          {type === 'delete' ? '!' : '•'}
        </div>

        <h1>{title}</h1>
        <p>{body}</p>

        {type === 'password' && <>
          <Field label="Current password" placeholder="Current password" type="password" />
          <Field label="New password" placeholder="New password" type="password" />
        </>}

        {type === 'language' &&
          <div className="language-option">
            <b>English</b>
            <span>✓</span>
          </div>
        }

        {type === 'delete'
          ? <button className="danger filled" onClick={() => go('welcome')}>
              Delete my account
            </button>
          : <Primary onClick={() => go(type === 'help' ? 'home' : 'settings')}>
              {type === 'contact' ? 'Send message' : 'Done'}
            </Primary>
        }
      </div>
    </div>
  )
}

/* ---------- APP ROUTER ---------- */

function App() {
  const [screen, setScreen] = useState('onboarding-0')
  const [history, setHistory] = useState([])

  const go = next => {
    if (typeof next === 'number') {
      setScreen(history[history.length - 1] || 'home')
      setHistory(h => h.slice(0, -1))
      return
    }

    setHistory(h => [...h, screen])
    setScreen(next)
  }

  if (screen.startsWith('onboarding-')) {
    return (
      <div className="viewport">
        <Onboarding n={Number(screen.split('-')[1])} go={go} />
      </div>
    )
  }

  if (
    [
      'welcome',
      'signup',
      'signin',
      'otp',
      'forgot',
      'phone-otp',
      'new-password',
      'profile',
    ].includes(screen)
  ) {
    return (
      <div className="viewport">
        <Auth mode={screen} go={go} />
      </div>
    )
  }

  const screens = {
    home: <Home go={go} />,
    discover: <Discover go={go} />,
    location: <Location go={go} />,
    confirm: <Confirm go={go} />,
    create: <CreateTag go={go} />,
    'tag-details': <TagDetails go={go} />,
    matching: <Matching go={go} />,
    person: <Person go={go} />,
    request: <Request go={go} />,
    'request-sent': <RequestSent go={go} />,
    tags: <Tags go={go} />,
    active: <ActiveTag go={go} />,
    chat: <Chat go={go} />,
    call: <Call go={go} />,
    complete: <Complete go={go} />,
    review: <Review go={go} />,
    'review-success': <ReviewSuccess go={go} />,
    notifications: <Notifications go={go} />,
    activity: <Activity go={go} />,
    profile: <Profile go={go} />,
    menu: <Menu go={go} />,
    favourites: <Favourites go={go} />,
    wallet: <Wallet go={go} />,
    'add-money': <AddMoney go={go} />,
    'payment-success': <PaymentSuccess go={go} />,
    settings: <Settings go={go} />,
    password: <Simple go={go} type="password" />,
    language: <Simple go={go} type="language" />,
    privacy: <Simple go={go} type="privacy" />,
    contact: <Simple go={go} type="contact" />,
    help: <Simple go={go} type="help" />,
    referral: <Simple go={go} type="referral" />,
    about: <Simple go={go} type="about" />,
    delete: <Simple go={go} type="delete" />,
  }

  return (
    <div className="viewport">
      {screens[screen] || <Home go={go} />}
    </div>
  )
}

export default App
