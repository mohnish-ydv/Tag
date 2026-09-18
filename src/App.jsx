import { useState } from 'react'

function Icon({ name, size = 20, stroke = 1.8 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'icon',
    'aria-hidden': true,
  }

  const paths = {
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    back: <><path d="M15 18l-6-6 6-6"/></>,
    arrow: <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
    down: <path d="M6 9l6 6 6-6"/>,
    up: <path d="M6 15l6-6 6 6"/>,
    search: <><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 8h18c0-1-3-1-3-8"/><path d="M10 21h4"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    target: <><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6"/><path d="M16 5.5a3 3 0 0 1 0 5.8"/><path d="M17 14c2.5.5 3.8 2.2 4 5"/></>,
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M4 21c.7-4.5 3.3-7 8-7s7.3 2.5 8 7"/></>,
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 9.6 9.6 0 0 1-3.4-.6L4 20l1.6-3.7A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z"/></>,
    heart: <path d="M20.8 8.7c0 5.2-8.8 10.3-8.8 10.3S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.4Z"/>,
    clock: <><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    edit: <><path d="m4 20 4-.8L19 8.2a2 2 0 0 0-3-3L5 16l-1 4Z"/><path d="m14 6 4 4"/></>,
    shield: <><path d="M12 3 19 6v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></>,
    more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  }

  return <svg {...common}>{paths[name] || paths.user}</svg>
}

function Logo() {
  return <div className="logo">tag.</div>
}

function Button({ children, variant = 'primary', onClick, small = false }) {
  return (
    <button className={`btn btn-${variant}${small ? ' btn-sm' : ''}`} onClick={onClick}>
      {children}
    </button>
  )
}

function Header({ title, back, onBack, right }) {
  return (
    <header className="header">
      <div className="header-left">
        {back && (
          <button className="icon-btn" onClick={onBack} aria-label="Back">
            <Icon name="back" />
          </button>
        )}
        {title ? <h1 className="header-title">{title}</h1> : <Logo />}
      </div>
      <div className="header-right">{right}</div>
    </header>
  )
}

function Avatar({ name = 'Tag', size = '' }) {
  const initials = name
    .split(' ')
    .map(x => x[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return <div className={`avatar ${size}`}>{initials}</div>
}

function BottomNav({ page, go }) {
  const items = [
    ['home', 'Home', 'home'],
    ['users', 'Discover', 'discover'],
    ['chat', 'Tags', 'tags'],
    ['clock', 'Activity', 'activity'],
    ['user', 'Profile', 'profile'],
  ]

  return (
    <nav className="bottom-nav">
      {items.map(([icon, label, route]) => (
        <button
          key={route}
          className={`nav-item ${page === route ? 'active' : ''}`}
          onClick={() => go(route)}
        >
          <Icon name={icon} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

function Intro({ go }) {
  return (
    <main className="center-screen">
      <div className="center-content">
        <div className="art-placeholder">
          <span>Tag illustration</span>
        </div>

        <h1 className="t-display">Find your people.</h1>
        <p className="t-body mt-12">
          Make the journey together. Discover people going your way,
          connect safely, and keep the experience on Tag.
        </p>

        <div className="dots">
          <span className="dot active" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>

      <div className="auth-actions stack-12">
        <Button onClick={() => go('welcome')}>Get Started</Button>
        <Button variant="secondary" onClick={() => go('welcome')}>I already have an account</Button>
      </div>
    </main>
  )
}

function Welcome({ go }) {
  return (
    <main className="center-screen">
      <div className="center-content">
        <Logo />

        <div className="mt-32">
          <h1 className="t-display">Welcome to Tag</h1>
          <p className="t-body mt-12">
            A simple way to find people around your journey
            and build useful connections without losing control
            of your privacy.
          </p>
        </div>
      </div>

      <div className="auth-actions stack-12">
        <Button onClick={() => go('signup')}>Create account</Button>
        <Button variant="secondary" onClick={() => go('signin')}>Sign in</Button>
      </div>
    </main>
  )
}

function Auth({ mode, go }) {
  const signup = mode === 'signup'

  return (
    <main className="screen">
      <Header
        back
        onBack={() => go('welcome')}
        title={signup ? 'Create account' : 'Sign in'}
      />

      <section className="section">
        <div className="stack-24">
          <div>
            <h2 className="t-title">{signup ? 'Create your Tag account' : 'Welcome back'}</h2>
            <p className="t-body mt-8">
              {signup
                ? 'A few details and you are ready to start.'
                : 'Sign in to continue your journey.'}
            </p>
          </div>

          {signup && (
            <div className="row" style={{ gap: 12 }}>
              <Avatar name="You" size="lg" />
              <button className="btn btn-secondary btn-sm">Add photo</button>
            </div>
          )}

          {signup && (
            <div className="field-group">
              <p className="t-label">Full name</p>
              <input className="field" placeholder="Enter your name" />
            </div>
          )}

          <div className="field-group">
            <p className="t-label">Mobile number</p>
            <input className="field" inputMode="tel" placeholder="+91 00000 00000" />
          </div>

          <div className="field-group">
            <p className="t-label">Password</p>
            <input className="field" type="password" placeholder="Enter password" />
          </div>
        </div>

        <div className="mt-32 stack-12">
          <Button onClick={() => go(signup ? 'profile-setup' : 'home')}>
            {signup ? 'Continue' : 'Sign in'}
          </Button>

          {!signup && (
            <button className="btn btn-ghost" onClick={() => go('signup')}>
              Create a new account
            </button>
          )}
        </div>
      </section>
    </main>
  )
}

function ProfileSetup({ go }) {
  return (
    <main className="screen">
      <Header title="Complete your profile" />

      <section className="section">
        <div className="stack-24">
          <div>
            <h2 className="t-title">Tell people a little about you</h2>
            <p className="t-body mt-8">
              Only share what you are comfortable sharing.
            </p>
          </div>

          <div className="row" style={{ justifyContent: 'center' }}>
            <Avatar name="Mohnish Raj" size="lg" />
          </div>

          <div className="field-group">
            <p className="t-label">About you</p>
            <textarea className="field" placeholder="What should people know?" />
          </div>

          <div className="field-group">
            <p className="t-label">Your usual journey</p>
            <input className="field" placeholder="e.g. Patna → Bihta" />
          </div>
        </div>

        <div className="mt-32">
          <Button onClick={() => go('home')}>Finish profile</Button>
        </div>
      </section>
    </main>
  )
}

function Home({ go }) {
  return (
    <main className="screen tag-home">

      {/* Journey surface */}
      <div className="tag-map">
        <div className="map-land land-a" />
        <div className="map-land land-b" />

        <div className="map-line line-a" />
        <div className="map-line line-b" />
        <div className="map-line line-c" />
        <div className="map-line line-d" />

        <div className="journey-route">
          <span className="route-start" />
          <span className="route-destination" />
        </div>

        <div className="you-marker">
          <span />
        </div>
      </div>

      {/* App chrome */}
      <header className="tag-home-header">
        <button
          className="tag-control"
          onClick={() => go('profile')}
          aria-label="Open profile"
        >
          <Icon name="menu" size={21} />
        </button>

        <Logo />

        <button
          className="tag-control"
          onClick={() => go('activity')}
          aria-label="Notifications"
        >
          <Icon name="bell" size={21} />
        </button>
      </header>

      {/* Context indicator */}
      <div className="journey-context">
        <span className="context-dot" />
        <span>Ready to Tag</span>
      </div>

      {/* Main journey surface */}
      <section className="tag-home-sheet">

        <div className="sheet-grabber" />

        <div className="sheet-heading">
          <div>
            <p className="sheet-eyebrow">YOUR JOURNEY</p>
            <h1>Where are you headed?</h1>
          </div>

          <button
            className="location-control"
            onClick={() => go('location')}
            aria-label="Use current location"
          >
            <Icon name="target" size={20} />
          </button>
        </div>

        <button
          className="journey-input"
          onClick={() => go('location')}
        >
          <span className="journey-input-icon">
            <Icon name="search" size={21} />
          </span>

          <span className="journey-input-copy">
            <strong>Find a journey</strong>
            <small>Discover people going your way</small>
          </span>

          <Icon name="arrow" size={19} />
        </button>

        <div className="home-discovery">
          <div className="home-discovery-heading">
            <div>
              <p className="sheet-eyebrow">AROUND YOU</p>
              <h2>People on your route</h2>
            </div>

            <button onClick={() => go('discover')}>
              See all
            </button>
          </div>

          <div className="route-people">

            <button className="route-person" onClick={() => go('match')}>
              <Avatar name="Aarav Sharma" size="sm" />

              <div className="route-person-copy">
                <strong>Aarav Sharma</strong>
                <span>Patna → Danapur</span>
              </div>

              <span className="route-match">92%</span>
            </button>

            <button className="route-person" onClick={() => go('match')}>
              <Avatar name="Ananya Singh" size="sm" />

              <div className="route-person-copy">
                <strong>Ananya Singh</strong>
                <span>Patna → Bihta</span>
              </div>

              <span className="route-match">87%</span>
            </button>

          </div>
        </div>

      </section>

      {/* Primary creation action */}
      <button
        className="create-tag"
        onClick={() => go('location')}
        aria-label="Create a Tag"
      >
        <span className="create-tag-icon">
          <Icon name="plus" size={25} stroke={2} />
        </span>
        <span>Create Tag</span>
      </button>

      {/* Tag navigation */}
      <nav className="tag-bottom-nav">

        <button className="tag-nav active" onClick={() => go('home')}>
          <Icon name="home" size={21} />
          <span>Home</span>
        </button>

        <button className="tag-nav" onClick={() => go('discover')}>
          <Icon name="users" size={21} />
          <span>Discover</span>
        </button>

        <button className="tag-nav tag-nav-create" onClick={() => go('location')}>
          <span className="create-nav-circle">
            <Icon name="plus" size={22} />
          </span>
          <span>Tag</span>
        </button>

        <button className="tag-nav" onClick={() => go('activity')}>
          <Icon name="clock" size={21} />
          <span>Activity</span>
        </button>

        <button className="tag-nav" onClick={() => go('profile')}>
          <Icon name="user" size={21} />
          <span>Profile</span>
        </button>

      </nav>

    </main>
  )
}

function Discover({ go }) {
  return (
    <main className="screen">
      <Header
        title="Discover"
        right={
          <button className="icon-btn outline">
            <Icon name="target" />
          </button>
        }
      />

      <div className="screen-scroll">
        <section className="section compact">
          <div className="search-box">
            <Icon name="search" size={18} />
            <input placeholder="Search people or journeys" />
          </div>
        </section>

        <section className="section compact">
          <div className="chips">
            <button className="chip active">All</button>
            <button className="chip">Going my way</button>
            <button className="chip">Nearby</button>
            <button className="chip">Same destination</button>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2 className="section-title">Recommended for you</h2>
          </div>

          <div className="stack-12">
            {[
              ['Aarav Sharma', 'Patna → Danapur', '92% match'],
              ['Ananya Singh', 'Patna → Bihta', '87% match'],
              ['Rahul Kumar', 'Kankarbagh → Patliputra', '81% match'],
              ['Priya Verma', 'Patna → Hajipur', '76% match'],
            ].map(([name, journey, match]) => (
              <button className="card person-card" key={name} onClick={() => go('match')}>
                <Avatar name={name} />
                <div className="person-info">
                  <p className="person-name">{name}</p>
                  <p className="person-meta">{journey}</p>
                  <div className="mt-8">
                    <span className="badge success">{match}</span>
                  </div>
                </div>
                <Icon name="arrow" size={18} />
              </button>
            ))}
          </div>
        </section>
      </div>

      <BottomNav page="discover" go={go} />
    </main>
  )
}

function Location({ go }) {
  return (
    <main className="location-screen">
      <div className="home-map">
        <div className="map-water" style={{ width: 300, height: 180, left: -80, top: 80 }} />
        <div className="map-road" style={{ width: 500, left: -50, top: 300, transform: 'rotate(20deg)' }} />
        <div className="map-road" style={{ width: 460, left: -20, top: 500, transform: 'rotate(-13deg)' }} />
        <div className="map-point" style={{ left: 190, top: 285 }} />
        <div className="map-point" style={{ left: 275, top: 510 }} />
      </div>

      <div className="location-ui">
        <div style={{ padding: 16 }}>
          <button className="icon-btn outline" onClick={() => go('home')}>
            <Icon name="back" />
          </button>
        </div>

        <div className="location-card">
          <div className="sheet-handle" />

          <h2 className="t-title">Set your journey</h2>
          <p className="t-body mt-8">Choose where you are starting and where you are going.</p>

          <div className="mt-20">
            <div className="route-row">
              <span className="route-dot" />
              <div>
                <p className="t-small">FROM</p>
                <p className="t-body-strong">Patna, Bihar</p>
              </div>
            </div>

            <div className="route-line" />

            <div className="route-row">
              <span className="route-dot end" />
              <div>
                <p className="t-small">TO</p>
                <p className="t-body-strong">Search destination</p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <Button onClick={() => go('match')}>Find people</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

function Match({ go }) {
  return (
    <main className="screen">
      <Header
        title="Match"
        back
        onBack={() => go('discover')}
        right={<button className="icon-btn outline"><Icon name="more" /></button>}
      />

      <div className="screen-scroll">
        <section className="detail-content">
          <div className="hero-card">
            <div className="hero-card-media" />
            <div className="hero-card-body">
              <div className="row-between">
                <div className="row" style={{ gap: 12 }}>
                  <Avatar name="Aarav Sharma" size="sm" />
                  <div>
                    <p className="person-name">Aarav Sharma</p>
                    <p className="person-meta">92% journey match</p>
                  </div>
                </div>
                <span className="badge success">Verified</span>
              </div>

              <div className="mt-20 stack-12">
                <div>
                  <p className="t-small">JOURNEY</p>
                  <p className="t-body-strong">Patna → Danapur</p>
                </div>
                <div>
                  <p className="t-small">DEPARTURE</p>
                  <p className="t-body-strong">Today · 6:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="status-card mt-16">
            <div className="status-row">
              <Icon name="shield" />
              <div>
                <p className="t-body-strong">Protected connection</p>
                <p className="t-small">Your contact details stay private on Tag.</p>
              </div>
            </div>
          </div>

          <div className="mt-20 stack-12">
            <Button onClick={() => go('active')}>Request a Tag</Button>
            <Button variant="secondary">View profile</Button>
          </div>
        </section>
      </div>
    </main>
  )
}

function Active({ go }) {
  return (
    <main className="screen">
      <Header
        title="Active Tag"
        right={
          <button className="icon-btn outline">
            <Icon name="shield" />
          </button>
        }
      />

      <div className="screen-scroll">
        <section className="active-top">
          <div className="row" style={{ gap: 12 }}>
            <Avatar name="Aarav Sharma" size="lg" />
            <div>
              <h2 className="t-heading">You are connected</h2>
              <p className="t-small">Aarav Sharma · Patna → Danapur</p>
            </div>
          </div>
        </section>

        <div className="status-card">
          <div className="status-row">
            <span className="status-dot" />
            <div>
              <p className="t-body-strong">Tag is active</p>
              <p className="t-small">Started 12 minutes ago</p>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="hero-card">
            <div className="hero-card-media" />
            <div className="hero-card-body">
              <p className="t-small">CURRENT JOURNEY</p>
              <p className="t-heading mt-4">Patna → Danapur</p>
              <p className="t-body mt-8">
                Keep your conversation and journey updates inside Tag.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Button onClick={() => go('chat')}>Open protected chat</Button>
          </div>

          <div className="mt-12">
            <Button variant="secondary" onClick={() => go('complete')}>Complete Tag</Button>
          </div>
        </section>
      </div>
    </main>
  )
}

function Chat({ go }) {
  return (
    <main className="screen">
      <Header
        title="Aarav Sharma"
        back
        onBack={() => go('active')}
        right={<button className="icon-btn outline"><Icon name="shield" /></button>}
      />

      <div className="screen-scroll" style={{ paddingBottom: 100 }}>
        <section className="section">
          <div className="empty-state" style={{ paddingTop: 30, paddingBottom: 30 }}>
            <div className="empty-icon">
              <Icon name="shield" />
            </div>
            <p className="t-body">
              This is a protected Tag conversation.
              Contact details are hidden unless you choose to share them.
            </p>
          </div>

          <div className="stack-12">
            <div className="card card-pad" style={{ width: '78%', marginLeft: 'auto' }}>
              <p className="t-body">Hey, are you leaving around 6:30?</p>
            </div>

            <div className="card card-pad" style={{ width: '78%' }}>
              <p className="t-body">Yes, I should be there. I'll update you here.</p>
            </div>
          </div>
        </section>
      </div>

      <div style={{
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 16,
        display: 'flex',
        gap: 8,
        zIndex: 20,
      }}>
        <input className="field" placeholder="Write a message..." />
        <button className="icon-btn" style={{ background: '#121212', color: '#fff' }}>
          <Icon name="arrow" />
        </button>
      </div>
    </main>
  )
}

function Complete({ go }) {
  return (
    <main className="success-screen">
      <div className="success-icon">
        <Icon name="check" size={34} stroke={1.6} />
      </div>

      <h1 className="t-title">Tag completed</h1>
      <p className="t-body mt-12">
        Your journey with Aarav has been completed.
        You can now leave a review and keep the connection in your history.
      </p>

      <div style={{ width: '100%' }} className="mt-32 stack-12">
        <Button onClick={() => go('activity')}>Leave a review</Button>
        <Button variant="secondary" onClick={() => go('home')}>Back to home</Button>
      </div>
    </main>
  )
}

function Tags({ go }) {
  return (
    <main className="screen">
      <Header title="My Tags" />

      <div className="screen-scroll">
        <section className="section">
          <div className="tabs">
            <button className="tab active">Active</button>
            <button className="tab">Upcoming</button>
            <button className="tab">Completed</button>
          </div>

          <div className="stack-12 mt-20">
            <button className="card card-pad" onClick={() => go('active')}>
              <div className="row-between">
                <div className="row" style={{ gap: 12 }}>
                  <Avatar name="Aarav Sharma" size="sm" />
                  <div>
                    <p className="person-name">Aarav Sharma</p>
                    <p className="person-meta">Patna → Danapur</p>
                  </div>
                </div>
                <span className="badge success">Active</span>
              </div>
            </button>
          </div>
        </section>
      </div>

      <BottomNav page="tags" go={go} />
    </main>
  )
}

function Activity({ go }) {
  return (
    <main className="screen">
      <Header title="Activity" />

      <div className="screen-scroll">
        <section className="section">
          <div className="stack-12">
            {[
              ['Tag request accepted', 'Aarav Sharma accepted your request.', '2 min ago'],
              ['Journey completed', 'Your previous Tag was completed.', 'Yesterday'],
              ['New match', 'You have a new journey match.', '2 days ago'],
            ].map(([title, body, time]) => (
              <div className="card card-pad" key={title}>
                <div className="row-between">
                  <div>
                    <p className="t-body-strong">{title}</p>
                    <p className="t-small mt-4">{body}</p>
                  </div>
                  <p className="t-small">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav page="activity" go={go} />
    </main>
  )
}

function Profile({ go }) {
  return (
    <main className="screen">
      <Header
        title="Profile"
        right={
          <button className="icon-btn outline">
            <Icon name="edit" />
          </button>
        }
      />

      <div className="screen-scroll">
        <section className="profile-head">
          <Avatar name="Mohnish Raj" size="lg" />
          <div>
            <h2 className="profile-name">Mohnish Raj</h2>
            <p className="profile-bio">Patna · Member since 2026</p>
          </div>
        </section>

        <section className="section compact">
          <div className="card card-pad">
            <div className="row-between">
              <div>
                <p className="t-small">TRUST</p>
                <p className="t-heading mt-4">New member</p>
              </div>
              <Icon name="shield" />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="stack-8">
            {[
              ['My history', 'Review previous Tags', 'clock', 'activity'],
              ['Favourite people', 'People you want to reconnect with', 'heart', 'discover'],
              ['Safety & privacy', 'Manage your protected experience', 'shield', 'profile'],
            ].map(([title, body, icon, route]) => (
              <button className="card person-card" key={title} onClick={() => go(route)}>
                <div className="avatar sm"><Icon name={icon} size={18} /></div>
                <div className="person-info">
                  <p className="person-name">{title}</p>
                  <p className="person-meta">{body}</p>
                </div>
                <Icon name="arrow" size={18} />
              </button>
            ))}
          </div>
        </section>
      </div>

      <BottomNav page="profile" go={go} />
    </main>
  )
}

function App() {
  const [page, setPage] = useState('intro')

  const go = next => setPage(next)

  let screen

  switch (page) {
    case 'intro':
      screen = <Intro go={go} />
      break
    case 'welcome':
      screen = <Welcome go={go} />
      break
    case 'signup':
      screen = <Auth mode="signup" go={go} />
      break
    case 'signin':
      screen = <Auth mode="signin" go={go} />
      break
    case 'profile-setup':
      screen = <ProfileSetup go={go} />
      break
    case 'home':
      screen = <Home go={go} />
      break
    case 'discover':
      screen = <Discover go={go} />
      break
    case 'location':
      screen = <Location go={go} />
      break
    case 'match':
      screen = <Match go={go} />
      break
    case 'active':
      screen = <Active go={go} />
      break
    case 'chat':
      screen = <Chat go={go} />
      break
    case 'complete':
      screen = <Complete go={go} />
      break
    case 'tags':
      screen = <Tags go={go} />
      break
    case 'activity':
      screen = <Activity go={go} />
      break
    case 'profile':
      screen = <Profile go={go} />
      break
    default:
      screen = <Intro go={go} />
  }

  return (
    <div className="app-shell">
      <div className="app-frame">
        {screen}
      </div>
    </div>
  )
}

export default App
