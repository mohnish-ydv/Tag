import React, { useState } from 'react'

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
    wallet: <><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-9Z"/><path d="M4 8h15a2 2 0 0 1 2 2v1H17a2 2 0 0 0 0 4h4"/><circle cx="17" cy="13" r=".8"/></>,
    tag: <><path d="M20 13 13 20l-8-8V5h7l8 8Z"/><circle cx="8.5" cy="8.5" r="1"/></>,
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

        <div className="dots" aria-label="Introduction">
          <span className="dot active" />
        </div>
      </div>

      <div className="auth-actions stack-12">
        <Button onClick={() => go('signup')}>Get Started</Button>
        <Button variant="secondary" onClick={() => go('signin')}>I already have an account</Button>
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

  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const mobileOk = /^\+?91?\s?\d{10}$/.test(
    mobile.replace(/\s/g, '')
  )
  const passwordOk = password.length >= 6
  const nameOk = name.trim().length >= 2

  const valid =
    mobileOk &&
    passwordOk &&
    (!signup || nameOk)

  return (
    <main className="screen">
      <Header
        back
        onBack={() => go('intro')}
        title={signup ? 'Create account' : 'Sign in'}
      />

      <section className="section">
        <div className="stack-24">

          <div>
            <h2 className="t-title">
              {signup ? 'Create your Tag account' : 'Welcome back'}
            </h2>

            <p className="t-body mt-8">
              {signup
                ? 'A few details and you are ready to start.'
                : 'Sign in to continue your journey.'}
            </p>
          </div>

          {signup && (
            <div className="field-group">
              <p className="t-label">Full name</p>

              <input
                className={
                  submitted && !nameOk
                    ? 'field field-error'
                    : 'field'
                }
                value={name}
                onChange={e => setName(e.target.value)}
                onBlur={() => setSubmitted(true)}
                placeholder="Enter your name"
              />

              {submitted && !nameOk && (
                <small className="field-error-text">
                  Enter your full name
                </small>
              )}
            </div>
          )}

          <div className="field-group">
            <p className="t-label">Mobile number</p>

            <input
              className={
                submitted && !mobileOk
                  ? 'field field-error'
                  : 'field'
              }
              inputMode="tel"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              onBlur={() => setSubmitted(true)}
              placeholder="+91 00000 00000"
            />

            {submitted && !mobileOk && (
              <small className="field-error-text">
                Enter a valid 10-digit mobile number
              </small>
            )}
          </div>

          <div className="field-group">
            <p className="t-label">Password</p>

            <input
              className={
                submitted && !passwordOk
                  ? 'field field-error'
                  : 'field'
              }
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => setSubmitted(true)}
              placeholder="Enter password"
            />

            {submitted && !passwordOk && (
              <small className="field-error-text">
                Password must be at least 6 characters
              </small>
            )}
          </div>

        </div>

        <div className="mt-32 stack-12">

          <Button
            onClick={() => {
              setSubmitted(true)

              if (valid) {
                go(signup ? 'profile-setup' : 'home')
              }
            }}
          >
            {signup ? 'Continue' : 'Sign in'}
          </Button>

          {!signup && (
            <>
              <button
                className="btn btn-ghost"
                onClick={() => go('forgot-password')}
              >
                Forgot password?
              </button>

              <button
                className="btn btn-ghost"
                onClick={() => go('signup')}
              >
                Create a new account
              </button>
            </>
          )}

        </div>
      </section>
    </main>
  )
}

function ProfileSetup({ go }) {
  const [about, setAbout] = useState('')
  const [journey, setJourney] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const valid =
    about.trim().length >= 3 &&
    journey.trim().length >= 3

  return (
    <main className="screen">
      <Header title="Complete your profile" />

      <section className="section">
        <div className="stack-24">

          <div>
            <h2 className="t-title">
              Tell people a little about you
            </h2>

            <p className="t-body mt-8">
              Only share what you are comfortable sharing.
            </p>
          </div>

          <div
            className="row"
            style={{ justifyContent: 'center' }}
          >
            <Avatar name="Mohnish Raj" size="lg" />
          </div>

          <div className="field-group">
            <p className="t-label">About you</p>

            <textarea
              className={
                submitted && about.trim().length < 3
                  ? 'field field-error'
                  : 'field'
              }
              value={about}
              onChange={e => setAbout(e.target.value)}
              onBlur={() => setSubmitted(true)}
              placeholder="What should people know?"
            />

            {submitted && about.trim().length < 3 && (
              <small className="field-error-text">
                Tell people a little about you
              </small>
            )}
          </div>

          <div className="field-group">
            <p className="t-label">Your usual journey</p>

            <input
              className={
                submitted && journey.trim().length < 3
                  ? 'field field-error'
                  : 'field'
              }
              value={journey}
              onChange={e => setJourney(e.target.value)}
              onBlur={() => setSubmitted(true)}
              placeholder="e.g. Patna → Bihta"
            />

            {submitted && journey.trim().length < 3 && (
              <small className="field-error-text">
                Enter your usual journey
              </small>
            )}
          </div>

        </div>

        <div className="mt-32">
          <Button
            onClick={() => {
              setSubmitted(true)

              if (valid) {
                go('home')
              }
            }}
          >
            Finish profile
          </Button>
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
          onClick={() => go('notifications')}
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
          onClick={() => go('search')}
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
    <main className="location-screen ref-location">
      <div className="ref-location-map">
        <div className="ref-map-grid" />
        <div className="ref-map-road ref-road-1" />
        <div className="ref-map-road ref-road-2" />
        <div className="ref-map-road ref-road-3" />
        <div className="ref-map-road ref-road-4" />
        <div className="ref-map-water" />
        <div className="ref-map-label label-one">Patna</div>
        <div className="ref-map-label label-two">Gandhi Maidan</div>
        <div className="ref-map-label label-three">Fraser Road</div>

        <button
          className="ref-map-back"
          onClick={() => go('home')}
          aria-label="Back"
        >
          <Icon name="back" />
        </button>

        <button
          className="ref-map-locate"
          onClick={() => {}}
          aria-label="Current location"
        >
          <Icon name="location" />
        </button>

        <div className="ref-user-pin">
          <span />
        </div>
      </div>

      <section className="ref-location-sheet">
        <div className="ref-sheet-handle" />

        <div className="ref-location-heading">
          <span>YOUR JOURNEY</span>
          <h1>Where are you going?</h1>
          <p>Set your route to find people travelling the same way.</p>
        </div>

        <div className="ref-route-inputs">
          <button className="ref-route-field">
            <span className="ref-route-icon start">
              <i />
            </span>
            <span className="ref-route-copy">
              <small>FROM</small>
              <strong>Patna, Bihar</strong>
            </span>
            <b>⌄</b>
          </button>

          <div className="ref-route-connector">
            <span />
          </div>

          <button
            className="ref-route-field"
            onClick={() => go('search')}
          >
            <span className="ref-route-icon destination">
              <i />
            </span>
            <span className="ref-route-copy">
              <small>TO</small>
              <strong>Search destination</strong>
            </span>
            <b>⌕</b>
          </button>
        </div>

        <button
          className="ref-current-place"
          onClick={() => go('address')}
        >
          <span><Icon name="location" /></span>
          <div>
            <strong>Use my current location</strong>
            <small>Detect your starting point automatically</small>
          </div>
          <b>›</b>
        </button>

        <Button onClick={() => go('ride')}>
          Find people on my route
        </Button>
      </section>
    </main>
  )
}

function RideFlow({ go }) {
  const [step, setStep] = React.useState(0)
  const [transport, setTransport] = React.useState('Car')
  const [selectedCar, setSelectedCar] = React.useState(null)
  const [requested, setRequested] = React.useState(false)

  const cars = [
    {
      id: 'sedan',
      name: 'Sedan',
      type: 'Comfort',
      price: '₹420',
      eta: '4 min',
      seats: '4 seats',
      rating: '4.8',
      plate: 'BR 01 AX 4821',
      driver: 'Aarav Sharma'
    },
    {
      id: 'hatchback',
      name: 'Hatchback',
      type: 'Economy',
      price: '₹310',
      eta: '6 min',
      seats: '4 seats',
      rating: '4.7',
      plate: 'BR 01 CQ 7314',
      driver: 'Rohan Kumar'
    },
    {
      id: 'suv',
      name: 'SUV',
      type: 'Premium',
      price: '₹560',
      eta: '8 min',
      seats: '6 seats',
      rating: '4.9',
      plate: 'BR 01 DR 2098',
      driver: 'Vikram Singh'
    }
  ]

  const currentCar = selectedCar || cars[0]

  const back = () => {
    if (step === 0) {
      go('location')
    } else {
      setStep(step - 1)
    }
  }

  const next = () => setStep(step + 1)

  if (step === 0) {
    return (
      <main className="ride-flow-screen">
        <div className="ride-flow-header">
          <button className="ride-back" onClick={back}>‹</button>
          <div>
            <small>STEP 1 OF 6</small>
            <h1>Select transport</h1>
          </div>
        </div>

        <section className="ride-route-mini">
          <div className="ride-route-point">
            <span className="ride-route-dot start" />
            <div>
              <small>FROM</small>
              <strong>Patna</strong>
            </div>
          </div>
          <div className="ride-route-line" />
          <div className="ride-route-point">
            <span className="ride-route-dot end" />
            <div>
              <small>TO</small>
              <strong>Danapur</strong>
            </div>
          </div>
        </section>

        <section className="ride-section">
          <div className="ride-section-title">
            <span>Choose how you want to travel</span>
          </div>

          <div className="transport-grid">
            {[
              ['Car', 'CAR', 'Comfortable private ride'],
              ['Bike', 'BIKE', 'Quick solo journey'],
              ['Auto', 'AUTO', 'Affordable local ride'],
              ['Delivery', 'BOX', 'Send something across town']
            ].map(([name, symbol, copy]) => (
              <button
                key={name}
                className={`transport-card ${transport === name ? 'selected' : ''}`}
                onClick={() => setTransport(name)}
              >
                <span className="transport-symbol">{symbol}</span>
                <strong>{name}</strong>
                <small>{copy}</small>
                {transport === name && <span className="transport-check">✓</span>}
              </button>
            ))}
          </div>
        </section>

        <div className="ride-bottom-action">
          <div>
            <small>YOUR ROUTE</small>
            <strong>Patna → Danapur</strong>
          </div>
          <button onClick={next}>Continue <span>→</span></button>
        </div>
      </main>
    )
  }

  if (step === 1) {
    return (
      <main className="ride-flow-screen">
        <div className="ride-flow-header">
          <button className="ride-back" onClick={back}>‹</button>
          <div>
            <small>STEP 2 OF 6</small>
            <h1>Available rides</h1>
          </div>
          <button className="ride-filter">≡</button>
        </div>

        <section className="ride-map-preview">
          <div className="map-road r1" />
          <div className="map-road r2" />
          <div className="map-road r3" />
          <div className="map-water" />
          <div className="map-route-path" />
          <span className="map-pin from">A</span>
          <span className="map-pin to">B</span>
          <span className="map-current">●</span>
        </section>

        <section className="available-summary">
          <div>
            <small>RIDES NEAR YOU</small>
            <h2>Choose a ride</h2>
          </div>
          <span>{cars.length} available</span>
        </section>

        <div className="ride-bottom-action">
          <div>
            <small>SELECTED</small>
            <strong>{transport}</strong>
          </div>
          <button onClick={next}>View rides <span>→</span></button>
        </div>
      </main>
    )
  }

  if (step === 2) {
    return (
      <main className="ride-flow-screen">
        <div className="ride-flow-header">
          <button className="ride-back" onClick={back}>‹</button>
          <div>
            <small>STEP 3 OF 6</small>
            <h1>Choose your ride</h1>
          </div>
        </div>

        <section className="ride-list">
          {cars.map((car) => (
            <button
              key={car.id}
              className={`ride-car-card ${selectedCar?.id === car.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedCar(car)
                setStep(3)
              }}
            >
              <div className="car-visual">
                <div className="car-roof" />
                <div className="car-body" />
                <i />
                <b />
              </div>

              <div className="ride-car-info">
                <div className="row-between">
                  <div>
                    <strong>{car.name}</strong>
                    <small>{car.type} · {car.seats}</small>
                  </div>
                  <strong className="ride-price">{car.price}</strong>
                </div>

                <div className="ride-car-meta">
                  <span>★ {car.rating}</span>
                  <span>{car.eta} away</span>
                </div>
              </div>

              <span className="ride-chevron">›</span>
            </button>
          ))}
        </section>

        <div className="ride-info-note">
          <span>✓</span>
          <p>Only verified drivers and vehicles are shown on Tag.</p>
        </div>
      </main>
    )
  }

  if (step === 3) {
    return (
      <main className="ride-flow-screen">
        <div className="ride-flow-header">
          <button className="ride-back" onClick={back}>‹</button>
          <div>
            <small>STEP 4 OF 6</small>
            <h1>Ride details</h1>
          </div>
        </div>

        <section className="car-detail-hero">
          <div className="large-car-visual">
            <div className="car-roof" />
            <div className="car-body" />
            <i />
            <b />
          </div>
          <div className="car-detail-badge">VERIFIED</div>
        </section>

        <section className="car-detail-content">
          <div className="row-between">
            <div>
              <small className="eyebrow">VEHICLE</small>
              <h2>{currentCar.name}</h2>
              <p>{currentCar.type} · {currentCar.seats}</p>
            </div>
            <div className="detail-rating">
              <strong>★ {currentCar.rating}</strong>
              <small>verified rating</small>
            </div>
          </div>

          <div className="vehicle-number">
            <small>REGISTRATION</small>
            <strong>{currentCar.plate}</strong>
          </div>

          <div className="driver-card">
            <Avatar name={currentCar.driver} size="sm" />
            <div>
              <strong>{currentCar.driver}</strong>
              <small>Verified Tag driver</small>
            </div>
            <span>✓</span>
          </div>

          <div className="ride-detail-rows">
            <div><span>Pickup</span><strong>Patna</strong></div>
            <div><span>Destination</span><strong>Danapur</strong></div>
            <div><span>Estimated fare</span><strong>{currentCar.price}</strong></div>
            <div><span>Arrival</span><strong>{currentCar.eta}</strong></div>
          </div>
        </section>

        <div className="ride-bottom-action">
          <div>
            <small>ESTIMATED FARE</small>
            <strong>{currentCar.price}</strong>
          </div>
          <button onClick={next}>Request ride <span>→</span></button>
        </div>
      </main>
    )
  }

  if (step === 4) {
    return (
      <main className="ride-flow-screen request-screen">
        <div className="ride-flow-header">
          <button className="ride-back" onClick={back}>‹</button>
          <div>
            <small>STEP 5 OF 6</small>
            <h1>Request ride</h1>
          </div>
        </div>

        <section className="request-map">
          <div className="map-road r1" />
          <div className="map-road r2" />
          <div className="map-road r3" />
          <div className="map-route-path" />
          <span className="map-pin from">A</span>
          <span className="map-pin to">B</span>
        </section>

        <section className="request-sheet">
          <div className="sheet-handle" />

          <div className="request-driver">
            <Avatar name={currentCar.driver} size="lg" />
            <div>
              <small>YOUR DRIVER</small>
              <h2>{currentCar.driver}</h2>
              <p>{currentCar.name} · {currentCar.plate}</p>
            </div>
            <span className="verified-pill">✓ Verified</span>
          </div>

          <div className="request-route">
            <div>
              <span className="ride-route-dot start" />
              <div><small>PICKUP</small><strong>Patna</strong></div>
            </div>
            <div className="request-route-line" />
            <div>
              <span className="ride-route-dot end" />
              <div><small>DROP-OFF</small><strong>Danapur</strong></div>
            </div>
          </div>

          <div className="request-total">
            <span>Estimated fare</span>
            <strong>{currentCar.price}</strong>
          </div>

          <button
            className="request-confirm"
            onClick={() => {
              setRequested(true)
              setStep(5)
            }}
          >
            {requested ? 'Ride requested' : 'Confirm request'}
          </button>

          <p className="request-protection">
            <span>⌁</span> Your contact details remain protected by Tag.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="ride-flow-screen thank-you-screen">
      <div className="thank-you-top">
        <span className="success-ring">✓</span>
        <small>REQUEST CONFIRMED</small>
        <h1>You're all set.</h1>
        <p>Your ride request has been sent to {currentCar.driver}.</p>
      </div>

      <section className="confirmation-card">
        <div className="confirmation-status">
          <span className="status-dot" />
          <div>
            <strong>Waiting for confirmation</strong>
            <small>We'll notify you when your driver accepts.</small>
          </div>
        </div>

        <div className="confirmation-route">
          <div><span className="ride-route-dot start" /><strong>Patna</strong></div>
          <div className="confirmation-line" />
          <div><span className="ride-route-dot end" /><strong>Danapur</strong></div>
        </div>

        <div className="confirmation-driver">
          <Avatar name={currentCar.driver} size="sm" />
          <div>
            <strong>{currentCar.driver}</strong>
            <small>{currentCar.name} · {currentCar.plate}</small>
          </div>
          <strong>{currentCar.price}</strong>
        </div>
      </section>

      <div className="thank-you-actions">
        <button onClick={() => go('active')}>Continue journey</button>
        <button className="secondary-action" onClick={() => go('home')}>Back to home</button>
      </div>
    </main>
  )
}


function PostRideFlow({ go }) {
  const [step, setStep] = React.useState(0)
  const [message, setMessage] = React.useState('')
  const [paymentMethod, setPaymentMethod] = React.useState('Cash')
  const [rating, setRating] = React.useState(0)
  const [reviewed, setReviewed] = React.useState(false)

  const next = () => setStep(v => Math.min(v + 1, 6))
  const back = () => {
    if (step === 0) {
      go('ride')
    } else {
      setStep(v => v - 1)
    }
  }

  if (step === 0) {
    return (
      <main className="post-ride-screen">
        <header className="post-flow-header">
          <button onClick={back} aria-label="Back">‹</button>
          <div>
            <small>JOURNEY</small>
            <strong>Confirm location</strong>
          </div>
          <span>29</span>
        </header>

        <section className="post-location-map">
          <div className="post-map-grid" />
          <div className="post-map-road road-a" />
          <div className="post-map-road road-b" />
          <div className="post-map-road road-c" />
          <div className="post-map-route" />
          <span className="post-map-pin pickup">A</span>
          <span className="post-map-pin drop">B</span>
        </section>

        <section className="post-sheet">
          <div className="post-handle" />
          <small className="post-eyebrow">YOUR ROUTE</small>
          <h1>Confirm your journey</h1>
          <p className="post-muted">
            Make sure your pickup and destination are correct before continuing.
          </p>

          <div className="post-route-card">
            <div>
              <i className="post-dot start" />
              <span>
                <small>PICKUP</small>
                <strong>Patna, Bihar</strong>
              </span>
            </div>
            <div className="post-route-line" />
            <div>
              <i className="post-dot end" />
              <span>
                <small>DESTINATION</small>
                <strong>Danapur, Bihar</strong>
              </span>
            </div>
          </div>

          <button className="post-primary" onClick={next}>
            Confirm journey <span>→</span>
          </button>
        </section>
      </main>
    )
  }

  if (step === 1) {
    return (
      <main className="post-ride-screen">
        <header className="post-flow-header">
          <button onClick={back}>‹</button>
          <div>
            <small>COMMUNICATION</small>
            <strong>Message</strong>
          </div>
          <span>30</span>
        </header>

        <section className="post-content">
          <div className="post-person">
            <Avatar name="Aarav Sharma" size="lg" />
            <div>
              <small>CONNECTED WITH</small>
              <h2>Aarav Sharma</h2>
              <p>Patna → Danapur · Verified</p>
            </div>
          </div>

          <div className="post-chat">
            <div className="post-message received">
              <span>Hey! I'm leaving from Patna around 6:30.</span>
              <small>6:18 PM</small>
            </div>

            <div className="post-message sent">
              <span>Perfect, I'll be ready.</span>
              <small>6:19 PM</small>
            </div>
          </div>

          <div className="post-message-input">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write a message..."
            />
            <button onClick={() => setMessage('See you soon!')}>↑</button>
          </div>

          <button className="post-primary" onClick={next}>
            Continue <span>→</span>
          </button>
        </section>
      </main>
    )
  }

  if (step === 2) {
    return (
      <main className="post-ride-screen">
        <header className="post-flow-header">
          <button onClick={back}>‹</button>
          <div>
            <small>COMMUNICATION</small>
            <strong>Talk</strong>
          </div>
          <span>32</span>
        </header>

        <section className="talk-stage">
          <div className="talk-orb">
            <Avatar name="Aarav Sharma" size="lg" />
          </div>

          <small>CONNECTED</small>
          <h1>You're talking with Aarav</h1>
          <p>
            Your personal contact information stays hidden while using Tag.
          </p>

          <div className="talk-status">
            <span />
            Protected conversation active
          </div>

          <button className="post-primary" onClick={next}>
            Continue <span>→</span>
          </button>
        </section>
      </main>
    )
  }

  if (step === 2) {
    return (
      <main className="post-ride-screen">
        <header className="post-flow-header">
          <button onClick={back}>‹</button>
          <div>
            <small>PAYMENT</small>
            <strong>Payment</strong>
          </div>
          <span>33</span>
        </header>

        <section className="post-content">
          <div className="payment-total">
            <small>TOTAL FARE</small>
            <strong>₹420</strong>
            <span>Patna → Danapur</span>
          </div>

          <div className="payment-options">
            {['Cash', 'UPI', 'Tag Wallet'].map(method => (
              <button
                key={method}
                className={paymentMethod === method ? 'selected' : ''}
                onClick={() => setPaymentMethod(method)}
              >
                <span className="payment-icon">
                  {method === 'Cash' ? '₹' : method === 'UPI' ? '⌁' : '◉'}
                </span>
                <div>
                  <strong>{method}</strong>
                  <small>
                    {method === 'Cash'
                      ? 'Pay directly to driver'
                      : method === 'UPI'
                        ? 'Fast digital payment'
                        : 'Use your Tag balance'}
                  </small>
                </div>
                <b>{paymentMethod === method ? '✓' : ''}</b>
              </button>
            ))}
          </div>

          <button className="post-primary" onClick={next}>
            Continue with {paymentMethod} <span>→</span>
          </button>
        </section>
      </main>
    )
  }

  if (step === 2) {
    return (
      <main className="post-ride-screen">
        <header className="post-flow-header">
          <button onClick={back}>‹</button>
          <div>
            <small>JOURNEY</small>
            <strong>Location</strong>
          </div>
          <span>34</span>
        </header>

        <section className="journey-map-large">
          <div className="post-map-grid" />
          <div className="post-map-road road-a" />
          <div className="post-map-road road-b" />
          <div className="post-map-road road-c" />
          <div className="journey-live-route" />
          <span className="post-map-pin pickup">A</span>
          <span className="post-map-pin drop">B</span>

          <div className="journey-live-card">
            <span className="status-dot" />
            <div>
              <strong>Journey in progress</strong>
              <small>You're heading to Danapur</small>
            </div>
          </div>
        </section>

        <section className="post-sheet compact">
          <div className="post-route-card">
            <div>
              <i className="post-dot start" />
              <span>
                <small>FROM</small>
                <strong>Patna</strong>
              </span>
            </div>
            <div className="post-route-line" />
            <div>
              <i className="post-dot end" />
              <span>
                <small>TO</small>
                <strong>Danapur</strong>
              </span>
            </div>
          </div>

          <button className="post-primary" onClick={next}>
            Journey completed <span>→</span>
          </button>
        </section>
      </main>
    )
  }

  if (step === 2) {
    return (
      <main className="post-ride-screen">
        <header className="post-flow-header">
          <button onClick={back}>‹</button>
          <div>
            <small>FEEDBACK</small>
            <strong>Review</strong>
          </div>
          <span>35</span>
        </header>

        <section className="review-stage">
          <div className="review-check">✓</div>
          <small>JOURNEY COMPLETED</small>
          <h1>How was your ride?</h1>
          <p>Rate your experience with Aarav.</p>

          <div className="review-stars">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                className={n <= rating ? 'active' : ''}
                onClick={() => setRating(n)}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            placeholder="Tell us about your experience..."
            rows="4"
          />

          <button
            className="post-primary"
            onClick={() => {
              setReviewed(true)
              next()
            }}
          >
            {reviewed ? 'Review submitted' : 'Submit review'} <span>→</span>
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="post-ride-screen final-journey-screen">
      <section className="final-success">
        <div className="final-success-icon">✓</div>
        <small>JOURNEY COMPLETE</small>
        <h1>Thank you!</h1>
        <p>
          Your journey with Tag is complete. Thanks for helping make the
          community safer and more connected.
        </p>

        <div className="final-summary">
          <div>
            <small>ROUTE</small>
            <strong>Patna → Danapur</strong>
          </div>
          <div>
            <small>FARE</small>
            <strong>₹420</strong>
          </div>
          <div>
            <small>RATING</small>
            <strong>{rating || 5} / 5</strong>
          </div>
        </div>

        <button className="post-primary" onClick={() => go('home')}>
          Back to home <span>→</span>
        </button>
      </section>
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
            <Button variant="secondary" onClick={() => go('cancel')}>Cancel Tag</Button>
          </div>

          <div className="mt-12">
            <Button variant="secondary" onClick={() => go('post-ride')}>
              Continue journey flow
            </Button>
          </div>

          <div className="mt-12">
            <Button variant="secondary" onClick={() => go('complete')}>
              Complete Tag
            </Button>
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

function Match({ go }) {
  return (
    <main className="screen">

      <Header
        title="Journey match"
        back
        onBack={() => go('home')}
      />

      <section className="section">

        <div className="match-hero">
          <Avatar name="Aarav Sharma" size="lg" />

          <div>
            <p className="t-small">92% ROUTE MATCH</p>
            <h1>Aarav Sharma</h1>
            <p>Patna → Danapur</p>
          </div>
        </div>

        <div className="match-card mt-24">

          <div className="match-row">
            <span>Journey</span>
            <strong>Patna → Danapur</strong>
          </div>

          <div className="match-row">
            <span>Shared route</span>
            <strong>Most of the way</strong>
          </div>

          <div className="match-row">
            <span>Trust</span>
            <strong>Verified Tag member</strong>
          </div>

        </div>

        <div className="stack-12 mt-24">

          <Button onClick={() => go('chat')}>
            Message Aarav
          </Button>

          <Button
            variant="secondary"
            onClick={() => go('home')}
          >
            Back to home
          </Button>

        </div>

      </section>
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
        back
        onBack={() => go('home')}
      />

      <div className="screen-scroll profile-hub">

        <section className="profile-head">
          <Avatar name="Mohnish Raj" size="lg" />

          <div>
            <h2 className="profile-name">
              Mohnish Raj
            </h2>

            <p className="profile-bio">
              Patna · Member since 2026
            </p>
          </div>
        </section>

        <section className="section compact">
          <div className="profile-trust-card">
            <div>
              <p className="t-small">TRUST</p>
              <p className="t-heading mt-4">
                New member
              </p>
            </div>

            <Icon name="shield" />
          </div>
        </section>

        <section className="section profile-group">
          <p className="profile-group-title">
            ACCOUNT
          </p>

          <div className="stack-8">
            <AccountRow
              icon="user"
              title="Edit profile"
              subtitle="Update your personal details"
              onClick={() => go('profile-setup')}
            />

            <AccountRow
              icon="shield"
              title="Password"
              subtitle="Change your password"
              onClick={() => go('password')}
            />
          </div>
        </section>

        <section className="section profile-group">
          <p className="profile-group-title">
            JOURNEYS
          </p>

          <div className="stack-8">
            <AccountRow
              icon="heart"
              title="Favourite"
              subtitle="People you want to reconnect with"
              onClick={() => go('favourite')}
            />

            <AccountRow
              icon="clock"
              title="History"
              subtitle="Upcoming, completed and cancelled Tags"
              onClick={() => go('history-upcoming')}
            />
          </div>
        </section>

        <section className="section profile-group">
          <p className="profile-group-title">
            MONEY & REWARDS
          </p>

          <div className="stack-8">
            <AccountRow
              icon="wallet"
              title="Wallet"
              subtitle="Manage your Tag balance"
              onClick={() => go('wallet')}
            />

            <AccountRow
              icon="tag"
              title="Offers"
              subtitle="View available rewards"
              onClick={() => go('offer')}
            />
          </div>
        </section>

        <section className="section profile-group">
          <p className="profile-group-title">
            PREFERENCES
          </p>

          <div className="stack-8">
            <AccountRow
              icon="more"
              title="Language"
              subtitle="Choose your preferred language"
              onClick={() => go('language')}
            />

            <AccountRow
              icon="shield"
              title="Privacy"
              subtitle="Read Tag privacy policy"
              onClick={() => go('privacy')}
            />
          </div>
        </section>

        <section className="section profile-group">
          <p className="profile-group-title">
            HELP
          </p>

          <div className="stack-8">
            <AccountRow
              icon="chat"
              title="Help & Support"
              subtitle="Find answers or contact support"
              onClick={() => go('help')}
            />

            <AccountRow
              icon="chat"
              title="Contact Tag"
              subtitle="Get in touch with the team"
              onClick={() => go('contact')}
            />
          </div>
        </section>

        <section className="section profile-group profile-danger">
          <AccountRow
            icon="close"
            title="Delete account"
            subtitle="Permanently remove your Tag account"
            onClick={() => go('delete-account')}
          />
        </section>

      </div>
    </main>
  )
}

function AccountRow({ icon, title, subtitle, onClick }) {
  return (
    <button className="account-row" onClick={onClick}>
      <div className="account-row-icon">
        <Icon name={icon} size={19} />
      </div>
      <div className="account-row-copy">
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </div>
      <Icon name="arrow" size={17} />
    </button>
  )
}

function Menu({ go }) {
  return (
    <main className="screen">
      <Header
        title="Profile"
        back
        onBack={() => go('home')}
      />

      <section className="section">
        <p className="t-body">
          Your account options are now available directly from Profile.
        </p>

        <div className="mt-24">
          <Button onClick={() => go('profile')}>
            Open Profile
          </Button>
        </div>
      </section>
    </main>
  )
}


function Favourite({ go }) {
  const [favourites, setFavourites] = useState([
    { id: 1, name: 'Aarav Sharma', meta: 'Patna · 4 Tags together', active: true },
    { id: 2, name: 'Priya Singh', meta: 'Patna · 2 Tags together', active: true },
    { id: 3, name: 'Rahul Kumar', meta: 'Gaya · 1 Tag together', active: false },
  ])

  const toggleFavourite = id => {
    setFavourites(items =>
      items.map(item =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    )
  }

  return (
    <main className="screen">
      <Header title="Favourite" back onBack={() => go('profile')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="stack-12">
            {favourites.map(person => (
              <div className="card card-pad favourite-card" key={person.id}>
                <Avatar name={person.name} size="sm" />

                <div className="person-info">
                  <p className="person-name">{person.name}</p>
                  <p className="person-meta">{person.meta}</p>
                </div>

                <button
                  className={`icon-btn ${person.active ? 'outline' : ''}`}
                  onClick={() => toggleFavourite(person.id)}
                  aria-label={person.active ? 'Remove favourite' : 'Add favourite'}
                >
                  <Icon name="heart" size={19} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <Button variant="secondary" onClick={() => go('discover')}>
            Discover people
          </Button>
        </section>
      </div>
    </main>
  )
}

function Wallet({ go }) {
  const [balance] = useState(640)

  return (
    <main className="screen">
      <Header title="Wallet" back onBack={() => go('profile')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="wallet-balance-card">
            <span>Available balance</span>
            <strong>₹{balance}</strong>
            <small>Use your Tag wallet for eligible journey payments.</small>
          </div>
        </section>

        <section className="section">
          <div className="stack-8">
            <AccountRow
              icon="plus"
              title="Add amount"
              subtitle="Top up your Tag wallet"
              onClick={() => go('wallet-add')}
            />
            <AccountRow
              icon="wallet"
              title="Bank account"
              subtitle="Manage your linked payment account"
              onClick={() => go('wallet-bank')}
            />
          </div>
        </section>

        <section className="section">
          <div className="wallet-info-card">
            <div>
              <Icon name="shield" size={20} />
            </div>
            <div>
              <strong>Wallet balance</strong>
              <small>Your balance is stored locally in this demo.</small>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function AddAmount({ go }) {
  const [amount, setAmount] = useState('200')
  const quickAmounts = [100, 200, 500, 1000]

  return (
    <main className="screen">
      <Header title="Add Amount" back onBack={() => go('wallet')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="wallet-balance-card">
            <span>Amount to add</span>
            <strong>₹{amount || 0}</strong>
            <small>Choose a quick amount or enter your own.</small>
          </div>
        </section>

        <section className="section">
          <div className="amount-grid">
            {quickAmounts.map(value => (
              <button
                key={value}
                className={`amount-choice ${amount === String(value) ? 'active' : ''}`}
                onClick={() => setAmount(String(value))}
              >
                ₹{value}
              </button>
            ))}
          </div>

          <input
            className="input mt-12"
            type="number"
            min="1"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </section>

        <section className="section">
          <Button
            onClick={() => {
              if (Number(amount) > 0) go('wallet-bank')
            }}
          >
            Continue
          </Button>
        </section>
      </div>
    </main>
  )
}

function Bank({ go }) {
  const [bank, setBank] = useState('HDFC Bank')
  const [account, setAccount] = useState('XXXX 4821')

  const banks = ['HDFC Bank', 'State Bank of India', 'ICICI Bank']

  return (
    <main className="screen">
      <Header title="Bank" back onBack={() => go('wallet-add')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="stack-8">
            {banks.map(item => (
              <button
                key={item}
                className={`bank-choice ${bank === item ? 'active' : ''}`}
                onClick={() => setBank(item)}
              >
                <span className="option-check">
                  {bank === item ? '✓' : ''}
                </span>
                <span>
                  <strong>{item}</strong>
                  <small>Linked account</small>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <label className="field-label">Account</label>
          <input
            className="input"
            value={account}
            onChange={e => setAccount(e.target.value)}
          />
        </section>

        <section className="section">
          <Button onClick={() => go('wallet-success')}>
            Add to wallet
          </Button>
        </section>
      </div>
    </main>
  )
}

function Successful({ go }) {
  return (
    <main className="screen">
      <div className="success-screen">
        <div className="success-icon">
          <Icon name="check" size={30} />
        </div>

        <p className="t-small">WALLET</p>
        <h1>Amount added successfully</h1>
        <div className="success-amount">
          <span>Added</span>
          <strong>₹200</strong>
        </div>
        <p className="t-body">
          Your Tag wallet has been updated successfully.
        </p>

        <Button onClick={() => go('wallet')}>
          Back to wallet
        </Button>
      </div>
    </main>
  )
}

function Offer({ go }) {
  const [selected, setSelected] = useState(0)

  const offers = [
    {
      title: 'Welcome reward',
      description: 'Get ₹50 back after your first eligible Tag.',
      value: '₹50',
    },
    {
      title: 'Frequent traveller',
      description: 'Save on your next three eligible journeys.',
      value: '10%',
    },
    {
      title: 'Friend bonus',
      description: 'Reconnect with a favourite and unlock a bonus.',
      value: '₹30',
    },
  ]

  return (
    <main className="screen">
      <Header title="Offers" back onBack={() => go('profile')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="stack-12">
            {offers.map((offer, index) => (
              <button
                key={offer.title}
                className={`offer-card ${selected === index ? 'active' : ''}`}
                onClick={() => setSelected(index)}
              >
                <div>
                  <p className="person-name">{offer.title}</p>
                  <p className="person-meta">{offer.description}</p>
                </div>
                <strong>{offer.value}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <Button onClick={() => go('wallet')}>
            Continue with offer
          </Button>
        </section>
      </div>
    </main>
  )
}

const batch6History = {
  upcoming: [
    {
      id: 'up-1',
      person: 'Aarav Sharma',
      route: 'Patna → Gaya',
      date: 'Tomorrow · 8:30 AM',
      status: 'Confirmed',
      amount: '₹180',
    },
    {
      id: 'up-2',
      person: 'Priya Singh',
      route: 'Patna → Muzaffarpur',
      date: '24 Sep · 6:00 PM',
      status: 'Pending',
      amount: '₹150',
    },
  ],
  completed: [
    {
      id: 'co-1',
      person: 'Rahul Kumar',
      route: 'Patna → Bihta',
      date: '12 Sep · 7:30 AM',
      status: 'Completed',
      amount: '₹120',
    },
    {
      id: 'co-2',
      person: 'Ananya Verma',
      route: 'Patna → Gaya',
      date: '8 Sep · 9:00 AM',
      status: 'Completed',
      amount: '₹190',
    },
  ],
  cancelled: [
    {
      id: 'ca-1',
      person: 'Vikram Raj',
      route: 'Patna → Ara',
      date: '5 Sep · 6:30 PM',
      status: 'Cancelled',
      amount: '₹100',
    },
  ],
}

function History({ go, tab = 'upcoming' }) {
  const [activeTab, setActiveTab] = useState(tab)

  const tabs = [
    ['upcoming', 'Upcoming'],
    ['completed', 'Completed'],
    ['cancelled', 'Cancelled'],
  ]

  return (
    <main className="screen">
      <Header title="History" back onBack={() => go('profile')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="history-tabs">
            {tabs.map(([key, label]) => (
              <button
                key={key}
                className={`tab ${activeTab === key ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(key)
                  go(`history-${key}`)
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="stack-12">
            {batch6History[activeTab].map(item => (
              <button
                className="card card-pad history-card"
                key={item.id}
                onClick={() => {
                  if (activeTab === 'upcoming') go('active')
                }}
              >
                <div className="row-between">
                  <div className="row" style={{ gap: 12 }}>
                    <Avatar name={item.person} size="sm" />
                    <div>
                      <p className="person-name">{item.person}</p>
                      <p className="person-meta">{item.route}</p>
                      <p className="t-small mt-4">{item.date}</p>
                    </div>
                  </div>

                  <div className="history-card-right">
                    <span className={`badge ${activeTab === 'cancelled' ? 'danger' : 'success'}`}>
                      {item.status}
                    </span>
                    <strong>{item.amount}</strong>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}


function Complain({ go }) {
  const [reason, setReason] = useState('')

  const reasons = [
    'Safety concern',
    'Payment issue',
    'Ride issue',
    'Other',
  ]

  return (
    <main className="screen">
      <Header title="Complain" back onBack={() => go('settings')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="account-intro">
            <p className="t-small">SUPPORT</p>
            <h1>Tell us what happened</h1>
            <p>
              Choose the issue that best describes your complaint. Tag support
              will review it and get back to you.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="stack-8">
            {reasons.map(item => (
              <button
                key={item}
                className={`bank-choice ${reason === item ? 'active' : ''}`}
                onClick={() => setReason(item)}
              >
                <span className="option-check">
                  {reason === item ? '✓' : ''}
                </span>
                <span>
                  <strong>{item}</strong>
                  <small>Tap to select</small>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <label className="field-label">Details</label>
          <textarea
            className="input batch7-textarea"
            placeholder="Describe the issue..."
            rows="5"
          />
        </section>

        <section className="section">
          <Button
            onClick={() => {
              if (reason) go('complain-success')
            }}
          >
            Submit complaint
          </Button>
        </section>
      </div>
    </main>
  )
}


function ComplainSuccessful({ go }) {
  return (
    <main className="screen">
      <div className="success-screen">
        <div className="success-icon">
          <Icon name="check" size={30} />
        </div>

        <p className="t-small">SUPPORT</p>
        <h1>Complaint submitted</h1>

        <p className="t-body">
          Thanks for letting us know. Your complaint has been recorded and
          our support team will review it.
        </p>

        <Button onClick={() => go('profile')}>
          Back to profile
        </Button>
      </div>
    </main>
  )
}


function Referral({ go }) {
  const [copied, setCopied] = useState(false)
  const code = 'TAG-MOHNISH50'

  return (
    <main className="screen">
      <Header title="Referral" back onBack={() => go('profile')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="batch7-referral-hero">
            <div className="batch7-referral-mark">
              <Icon name="users" size={27} />
            </div>

            <p className="t-small">REFER & EARN</p>
            <h1>Invite friends to Tag</h1>
            <p>
              Share your referral code with friends and earn rewards when
              eligible journeys are completed.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="batch7-referral-code">
            <span>Your referral code</span>
            <strong>{code}</strong>
            <button
              className="btn btn-secondary"
              onClick={() => setCopied(true)}
            >
              {copied ? 'Copied' : 'Copy code'}
            </button>
          </div>
        </section>

        <section className="section">
          <Button onClick={() => setCopied(true)}>
            {copied ? 'Referral code copied' : 'Share referral'}
          </Button>
        </section>
      </div>
    </main>
  )
}


function AboutUs({ go }) {
  return (
    <main className="screen">
      <Header title="About Us" back onBack={() => go('settings')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="batch7-about-logo">
            <Logo />
          </div>

          <div className="account-intro">
            <p className="t-small">ABOUT TAG</p>
            <h1>Travel better, together.</h1>
            <p>
              Tag connects people travelling along similar routes so journeys
              can be more convenient, social and affordable.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="stack-12">
            <div className="wallet-info-card">
              <div><Icon name="users" size={20} /></div>
              <div>
                <strong>Built around people</strong>
                <small>Discover and connect with travellers on your route.</small>
              </div>
            </div>

            <div className="wallet-info-card">
              <div><Icon name="shield" size={20} /></div>
              <div>
                <strong>Designed with trust in mind</strong>
                <small>Profiles, preferences and support are part of the experience.</small>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <p className="t-small batch7-version">Tag · Version 1.0</p>
        </section>
      </div>
    </main>
  )
}


function Settings({ go }) {
  return (
    <main className="screen">
      <Header title="Settings" back onBack={() => go('profile')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="stack-8">
            <AccountRow
              icon="shield"
              title="Password"
              subtitle="Change your account password"
              onClick={() => go('password')}
            />

            <AccountRow
              icon="more"
              title="Language"
              subtitle="Choose your preferred language"
              onClick={() => go('language')}
            />

            <AccountRow
              icon="shield"
              title="Privacy Policy"
              subtitle="Read how Tag handles your information"
              onClick={() => go('privacy')}
            />

            <AccountRow
              icon="chat"
              title="Contact Us"
              subtitle="Get in touch with the Tag team"
              onClick={() => go('contact')}
            />

            <AccountRow
              icon="close"
              title="Delete Account"
              subtitle="Permanently remove your Tag account"
              onClick={() => go('delete-account')}
            />

            <AccountRow
              icon="more"
              title="Help & Support"
              subtitle="Find answers and contact support"
              onClick={() => go('help')}
            />
          </div>
        </section>
      </div>
    </main>
  )
}


function Password({ go }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const valid = current && next && next === confirm

  return (
    <main className="screen">
      <Header title="Password" back onBack={() => go('settings')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="account-intro">
            <p className="t-small">SECURITY</p>
            <h1>Change password</h1>
            <p>Use a strong password that you do not reuse elsewhere.</p>
          </div>
        </section>

        <section className="section">
          <div className="stack-12">
            <div>
              <label className="field-label">Current password</label>
              <input
                className="input"
                type="password"
                value={current}
                onChange={e => setCurrent(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label">New password</label>
              <input
                className="input"
                type="password"
                value={next}
                onChange={e => setNext(e.target.value)}
              />
            </div>

            <div>
              <label className="field-label">Confirm new password</label>
              <input
                className="input"
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="section">
          <Button
            onClick={() => {
              if (valid) go('settings')
            }}
          >
            Update password
          </Button>
        </section>
      </div>
    </main>
  )
}


function Language({ go }) {
  const [language, setLanguage] = useState('English')

  const languages = [
    ['English', 'English'],
    ['Hindi', 'हिन्दी'],
  ]

  return (
    <main className="screen">
      <Header title="Language" back onBack={() => go('settings')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="account-intro">
            <p className="t-small">PREFERENCE</p>
            <h1>Choose language</h1>
            <p>Select the language you want to use in Tag.</p>
          </div>
        </section>

        <section className="section">
          <div className="stack-8">
            {languages.map(([value, label]) => (
              <button
                key={value}
                className={`bank-choice ${language === value ? 'active' : ''}`}
                onClick={() => setLanguage(value)}
              >
                <span className="option-check">
                  {language === value ? '✓' : ''}
                </span>
                <span>
                  <strong>{label}</strong>
                  <small>{value === 'English' ? 'English' : 'Hindi'}</small>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <Button onClick={() => go('settings')}>
            Save language
          </Button>
        </section>
      </div>
    </main>
  )
}


function PrivacyPolicy({ go }) {
  return (
    <main className="screen">
      <Header title="Privacy Policy" back onBack={() => go('settings')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="batch7-policy">
            <p className="t-small">LAST UPDATED · SEPTEMBER 2026</p>

            <h2>Your privacy</h2>
            <p>
              Tag is designed to help people discover and coordinate shared
              journeys. We aim to collect only the information needed to
              provide the service.
            </p>

            <h2>Information we use</h2>
            <p>
              This can include account details, profile information, journey
              preferences and information you provide while using support.
            </p>

            <h2>How information is used</h2>
            <p>
              Information may be used to provide matching, communication,
              account management, safety and support features.
            </p>

            <h2>Your choices</h2>
            <p>
              You can manage account settings and contact Tag when you have
              questions about your information.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}


function ContactUs({ go }) {
  return (
    <main className="screen">
      <Header title="Contact Us" back onBack={() => go('settings')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="account-intro">
            <p className="t-small">GET IN TOUCH</p>
            <h1>We're here to help.</h1>
            <p>
              Have a question, suggestion or issue? Choose a way to reach the
              Tag team.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="stack-8">
            <AccountRow
              icon="chat"
              title="Chat with support"
              subtitle="Get help with your Tag account"
              onClick={() => go('help')}
            />

            <AccountRow
              icon="more"
              title="Email support"
              subtitle="support@tag.app"
              onClick={() => {}}
            />

            <AccountRow
              icon="clock"
              title="Support hours"
              subtitle="Monday – Saturday · 9 AM – 7 PM"
              onClick={() => {}}
            />
          </div>
        </section>
      </div>
    </main>
  )
}


function DeleteAccount({ go }) {
  const [confirm, setConfirm] = useState(false)

  return (
    <main className="screen">
      <Header title="Delete Account" back onBack={() => go('settings')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="batch7-danger">
            <div className="batch7-danger-icon">
              <Icon name="close" size={25} />
            </div>

            <p className="t-small">ACCOUNT</p>
            <h1>Delete your account?</h1>

            <p>
              This action is permanent. Your account and associated Tag
              information may no longer be available after deletion.
            </p>
          </div>
        </section>

        <section className="section">
          <label className="batch7-confirm-row">
            <input
              type="checkbox"
              checked={confirm}
              onChange={e => setConfirm(e.target.checked)}
            />
            <span>I understand that this action cannot be undone.</span>
          </label>
        </section>

        <section className="section">
          <Button
            variant="secondary"
            onClick={() => {
              if (confirm) go('intro')
            }}
          >
            Delete account
          </Button>
        </section>
      </div>
    </main>
  )
}


function HelpSupport({ go }) {
  const [open, setOpen] = useState(null)

  const items = [
    ['How does Tag work?', 'Tag helps people discover others travelling along similar routes and coordinate a journey together.'],
    ['How do I report an issue?', 'Open Support from Settings and submit a complaint with the relevant details.'],
    ['How can I manage my account?', 'Use Settings to update your password, language, privacy information and account preferences.'],
    ['Still need help?', 'Use Contact Us to reach the Tag support team.'],
  ]

  return (
    <main className="screen">
      <Header title="Help & Support" back onBack={() => go('settings')} />

      <div className="screen-scroll">
        <section className="section">
          <div className="account-intro">
            <p className="t-small">SUPPORT</p>
            <h1>How can we help?</h1>
            <p>Find a quick answer or contact the Tag support team.</p>
          </div>
        </section>

        <section className="section">
          <div className="stack-8">
            {items.map(([question, answer], index) => (
              <div className="batch7-faq" key={question}>
                <button
                  className="batch7-faq-question"
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  <strong>{question}</strong>
                  <Icon name={open === index ? 'up' : 'down'} size={17} />
                </button>

                {open === index && (
                  <p className="batch7-faq-answer">{answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <Button variant="secondary" onClick={() => go('contact')}>
            Contact support
          </Button>
        </section>
      </div>
    </main>
  )
}


class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[Tag render error]', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="viewport">
          <div className="plain error-screen">
            <div className="error-icon">!</div>
            <h1>Something went wrong</h1>
            <p>
              Tag couldn't render this screen.
            </p>
            <pre>{this.state.error?.message || 'Unknown render error'}</pre>
            <button
              className="primary"
              onClick={() => window.location.reload()}
            >
              Reload Tag
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}


/* ---------- BATCH 8: REFERENCE FLOWS ---------- */


function TagMap() {
  return (
    <div className="map">
      <div className="map-grid" />
      <div className="road r1" />
      <div className="road r2" />
      <div className="road r3" />
      <div className="road r4" />
      <div className="road r5" />
      <div className="road r6" />
    </div>
  )
}

function Primary({ children, onClick }) {
  return (
    <button className="primary" onClick={onClick}>
      {children}
    </button>
  )
}

function Address({ go }) {
  return (
    <div className="plain page reference-page address-flow">

      <Header
        title="Your route"
        back
        onBack={() => go('search')}
      />

      <div className="address-route-card">

        <div className="route-field-static">
          <span className="route-bullet from" />

          <div>
            <small>FROM</small>
            <strong>Patna Junction</strong>
            <p>Fraser Road, Patna</p>
          </div>
        </div>

        <div className="route-connector" />

        <div className="route-field-static">
          <span className="route-bullet to" />

          <div>
            <small>TO</small>
            <strong>Home</strong>
            <p>Patna, Bihar</p>
          </div>
        </div>

      </div>

      <div className="reference-map address-flow-map">
        <TagMap />
        <div className="reference-map-pin">●</div>
      </div>

      <div className="address-next-wrap">

        <p className="address-helper">
          Check both points before continuing.
        </p>

        <Button onClick={() => go('confirm-address')}>
          Next
        </Button>

      </div>

    </div>
  )
}

function ConfirmAddress({ go }) {
  return (
    <div className="screen reference-confirm">

      <TagMap />

      <div className="confirm-address-card">

        <Header
          title="Confirm location"
          back
          onBack={() => go('address')}
        />

        <div className="confirmed-address">
          <span>⌖</span>

          <div>
            <small>YOUR ROUTE</small>
            <h2>Patna Junction → Home</h2>
            <p>
              Fraser Road, Patna → Patna, Bihar
            </p>
          </div>
        </div>

        <div className="address-note">
          <b>Ready to continue?</b>
          <span>
            Review your route once before confirming.
          </span>
        </div>

        <Primary onClick={() => go('ride')}>
          Confirm location
        </Primary>

      </div>

    </div>
  )
}

function SearchScreen({ go }) {
  const [query, setQuery] = useState('')

  const results = [
    ['Patna Junction', 'Fraser Road, Patna'],
    ['Patna Airport', 'Shiekhpura, Patna'],
    ['Bailey Road', 'Patna, Bihar'],
  ]

  const visible = query
    ? results.filter(x =>
        `${x[0]} ${x[1]}`.toLowerCase().includes(query.toLowerCase())
      )
    : results

  return (
    <div className="plain page reference-page">
      <Header title="Search" go={go} />

      <div className="reference-search large">
        <span>⌕</span>
        <input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a place"
        />
        {query && (
          <button onClick={() => setQuery('')}>×</button>
        )}
      </div>

      <div className="search-section-label">
        <small>{query ? 'RESULTS' : 'RECENT SEARCHES'}</small>
      </div>

      <div className="search-results">
        {visible.map((x, i) => (
          <button
            key={x[0]}
            className="search-result"
            onClick={() => go('address')}
          >
            <span>{i === 0 ? '⌖' : '◷'}</span>
            <div>
              <b>{x[0]}</b>
              <small>{x[1]}</small>
            </div>
            <em>›</em>
          </button>
        ))}

        {!visible.length && (
          <div className="search-empty">
            <div>⌕</div>
            <h2>No places found</h2>
            <p>Try another destination or nearby landmark.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function CancelRide({ go }) {
  const [reason, setReason] = useState('')

  const reasons = [
    'Plans changed',
    'Found another ride',
    'Driver / passenger is late',
    'I no longer need the ride',
    'Other',
  ]

  return (
    <div className="plain page reference-page">
      <Header title="Cancel ride" go={go} />

      <div className="cancel-intro">
        <div className="cancel-icon">×</div>
        <h1>Cancel this Tag?</h1>
        <p>
          If you cancel, the other person will be notified.
        </p>
      </div>

      <div className="cancel-route">
        <span>YOUR JOURNEY</span>
        <b>Patna → New Delhi</b>
        <small>Today · 7:30 AM</small>
      </div>

      <div className="cancel-reasons">
        <small>WHY ARE YOU CANCELLING?</small>

        {reasons.map(x => (
          <button
            key={x}
            className={reason === x ? 'cancel-reason selected' : 'cancel-reason'}
            onClick={() => setReason(x)}
          >
            <span>{reason === x ? '✓' : ''}</span>
            {x}
          </button>
        ))}
      </div>

      <button
        className="danger filled"
        disabled={!reason}
        onClick={() => go('cancelled')}
      >
        Cancel ride
      </button>
    </div>
  )
}

function Cancelled({ go }) {
  return (
    <div className="plain success cancellation-success">
      <div className="cancel-success-icon">✓</div>

      <Logo />

      <h1>Ride cancelled</h1>

      <p>
        Your Tag has been cancelled and the other person has been notified.
      </p>

      <div className="cancel-summary">
        <span>Cancelled journey</span>
        <b>Patna → New Delhi</b>
        <small>Today · 7:30 AM</small>
      </div>

      <Primary onClick={() => go('home')}>
        Back to home
      </Primary>

      <button className="text-btn" onClick={() => go('history-cancelled')}>
        View history
      </button>
    </div>
  )
}

function RedirectHome({ go }) {
  React.useEffect(() => {
    const timer = setTimeout(() => go('home'), 900)
    return () => clearTimeout(timer)
  }, [go])

  return (
    <div className="plain redirect-screen">
      <Logo />

      <div className="redirect-mark">
        <span>↗</span>
      </div>

      <h1>You're all set</h1>
      <p>Taking you to your Tag journey...</p>

      <div className="redirect-loader">
        <i />
      </div>
    </div>
  )
}


/* ---------- BATCH 9 REFERENCE SCREENS ---------- */

function SplashScreen({ go }) {
  React.useEffect(() => {
    const timer = setTimeout(() => go('intro'), 1400)
    return () => clearTimeout(timer)
  }, [go])

  return (
    <main className="reference-splash">
      <div className="reference-splash-orbit orbit-one" />
      <div className="reference-splash-orbit orbit-two" />

      <div className="reference-splash-mark">
        <span className="splash-mark-dot" />
        <span className="splash-mark-line" />
      </div>

      <div className="reference-splash-brand">
        <strong>Tag</strong>
        <span>Move together.</span>
      </div>

      <div className="reference-splash-loading">
        <span />
      </div>
    </main>
  )
}

function Notifications({ go }) {
  const notifications = [
    {
      id: 1,
      title: 'New journey match',
      body: 'Aarav Sharma is travelling from Patna to Danapur.',
      time: '2 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Tag request update',
      body: 'Your ride request is waiting for confirmation.',
      time: '18 min ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Journey completed',
      body: 'Your previous Tag journey has been added to history.',
      time: 'Yesterday',
      unread: false,
    },
  ]

  return (
    <main className="screen">
      <Header
        title="Notifications"
        back
        onBack={() => go('home')}
      />

      <div className="screen-scroll">
        <section className="notification-page">
          {notifications.map(item => (
            <button
              className={`notification-card ${item.unread ? 'unread' : ''}`}
              key={item.id}
              onClick={() => item.id === 1 ? go('match') : go('activity')}
            >
              <span className="notification-icon">
                <Icon name="bell" size={19} />
              </span>

              <span className="notification-copy">
                <strong>{item.title}</strong>
                <span>{item.body}</span>
                <small>{item.time}</small>
              </span>

              {item.unread && <i className="notification-unread" />}
            </button>
          ))}
        </section>
      </div>
    </main>
  )
}

function ForgotPassword({ go }) {
  const [mobile, setMobile] = useState('')
  const [touched, setTouched] = useState(false)

  const valid = /^\+?91?\s?\d{10}$/.test(
    mobile.replace(/\s/g, '')
  )

  return (
    <main className="plain auth reference-forgot">

      <Header
        title="Forgot password"
        back
        onBack={() => go('signin')}
      />

      <div className="reference-auth-hero">
        <div className="reference-auth-icon">
          <Icon name="shield" size={25} />
        </div>

        <h1>Reset your password</h1>

        <p>
          Enter the mobile number linked to your Tag account.
          We'll send you a verification code.
        </p>
      </div>

      <div className="field-group">
        <p className="t-label">Mobile number</p>

        <input
          className={
            touched && !valid
              ? 'field field-error'
              : 'field'
          }
          inputMode="tel"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="+91 98765 43210"
        />

        {touched && !valid && (
          <small className="field-error-text">
            Enter a valid 10-digit mobile number
          </small>
        )}
      </div>

      <Primary
        disabled={!valid}
        onClick={() => valid && go('phone-otp')}
      >
        Send verification code
      </Primary>

    </main>
  )
}

function PhoneOtp({ go }) {
  const [otp, setOtp] = useState('')
  const [touched, setTouched] = useState(false)

  const valid = /^\d{6}$/.test(otp)

  return (
    <main className="plain auth reference-forgot">

      <Header
        back
        onBack={() => go('forgot-password')}
        title="Verify OTP"
      />

      <div className="reference-auth-hero">
        <div className="reference-auth-icon">
          <Icon name="shield" size={25} />
        </div>

        <h1>Enter verification code</h1>

        <p>
          We sent a 6-digit verification code to your mobile number.
        </p>
      </div>

      <div className="field-group">
        <p className="t-label">Verification code</p>

        <input
          className={
            touched && !valid
              ? 'field field-error'
              : 'field'
          }
          inputMode="numeric"
          value={otp}
          maxLength={6}
          onChange={e =>
            setOtp(
              e.target.value
                .replace(/\D/g, '')
                .slice(0, 6)
            )
          }
          onBlur={() => setTouched(true)}
          placeholder="000000"
        />

        {touched && !valid && (
          <small className="field-error-text">
            Enter the 6-digit verification code
          </small>
        )}
      </div>

      <Primary
        disabled={!valid}
        onClick={() => valid && go('reset-password')}
      >
        Verify code
      </Primary>

      <button
        className="btn btn-ghost"
        onClick={() => setOtp('')}
      >
        Resend verification code
      </button>

    </main>
  )
}

function ResetPassword({ go }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [touched, setTouched] = useState(false)

  const valid =
    password.length >= 6 &&
    confirm === password

  return (
    <main className="plain auth reference-forgot">

      <Header
        back
        onBack={() => go('phone-otp')}
        title="Set new password"
      />

      <div className="reference-auth-hero">
        <div className="reference-auth-icon">
          <Icon name="shield" size={25} />
        </div>

        <h1>Create a new password</h1>

        <p>
          Choose a new password to secure your Tag account.
        </p>
      </div>

      <div className="field-group">
        <p className="t-label">New password</p>

        <input
          className={
            touched && password.length < 6
              ? 'field field-error'
              : 'field'
          }
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Enter new password"
        />

        {touched && password.length < 6 && (
          <small className="field-error-text">
            Password must be at least 6 characters
          </small>
        )}
      </div>

      <div className="field-group">
        <p className="t-label">Confirm password</p>

        <input
          className={
            touched && confirm !== password
              ? 'field field-error'
              : 'field'
          }
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Re-enter password"
        />

        {touched && confirm !== password && (
          <small className="field-error-text">
            Passwords do not match
          </small>
        )}
      </div>

      <Primary
        disabled={!valid}
        onClick={() => valid && go('signin')}
      >
        Update password
      </Primary>

    </main>
  )
}

function LightMode({ go }) {
  return (
    <main className="screen light-reference-screen">
      <header className="light-reference-header">
        <button
          className="tag-control"
          onClick={() => go('home')}
          aria-label="Back"
        >
          <Icon name="back" size={21} />
        </button>

        <Logo />

        <button
          className="tag-control"
          onClick={() => go('home')}
          aria-label="Close"
        >
          ×
        </button>
      </header>

      <section className="light-reference-content">
        <span className="light-reference-badge">TAG</span>
        <h1>A lighter way to move together.</h1>
        <p>
          Your journeys, matches and conversations — designed to stay clear,
          calm and easy to use.
        </p>

        <div className="light-reference-card">
          <div className="light-reference-map">
            <span className="light-map-road one" />
            <span className="light-map-road two" />
            <span className="light-map-route" />
            <span className="light-map-pin" />
          </div>

          <div className="light-reference-card-copy">
            <small>YOUR JOURNEY</small>
            <strong>Patna → Danapur</strong>
            <span>3 people travelling nearby</span>
          </div>
        </div>

        <Button onClick={() => go('home')}>
          Continue to Tag
        </Button>
      </section>
    </main>
  )
}


function App() {
  const [page, setPage] = useState('intro')

  const go = next => setPage(next)

  let screen

  switch (page) {
    case 'splash':
      screen = <SplashScreen go={go} />
      break
    case 'notifications':
      screen = <Notifications go={go} />
      break
    case 'forgot-password':
      screen = <ForgotPassword go={go} />
      break
    case 'phone-otp':
      screen = <PhoneOtp go={go} />
      break
    case 'reset-password':
      screen = <ResetPassword go={go} />
      break
    case 'light-mode':
      screen = <LightMode go={go} />
      break
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
    case 'ride':
      screen = <RideFlow go={go} />
      break
    case 'post-ride':
      screen = <PostRideFlow go={go} />
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
    case 'menu':
      screen = <Menu go={go} />
      break
    case 'favourite':
      screen = <Favourite go={go} />
      break
    case 'wallet':
      screen = <Wallet go={go} />
      break
    case 'wallet-add':
      screen = <AddAmount go={go} />
      break
    case 'wallet-bank':
      screen = <Bank go={go} />
      break
    case 'wallet-success':
      screen = <Successful go={go} />
      break
    case 'offer':
      screen = <Offer go={go} />
      break
    case 'history-upcoming':
      screen = <History go={go} tab="upcoming" />
      break
    case 'history-completed':
      screen = <History go={go} tab="completed" />
      break
    case 'history-cancelled':
      screen = <History go={go} tab="cancelled" />
      break
    case 'address':
      screen = <Address go={go} />
      break
    case 'confirm-address':
      screen = <ConfirmAddress go={go} />
      break
    case 'search':
      screen = <SearchScreen go={go} />
      break
    case 'cancel':
      screen = <CancelRide go={go} />
      break
    case 'cancelled':
      screen = <Cancelled go={go} />
      break
    case 'redirect-home':
      screen = <RedirectHome go={go} />
      break
    case 'complain':
      screen = <Complain go={go} />
      break
    case 'complain-success':
      screen = <ComplainSuccessful go={go} />
      break
    case 'referral':
      screen = <Referral go={go} />
      break
    case 'about':
      screen = <AboutUs go={go} />
      break
    case 'settings':
      screen = <Settings go={go} />
      break
    case 'password':
      screen = <Password go={go} />
      break
    case 'language':
      screen = <Language go={go} />
      break
    case 'privacy':
      screen = <PrivacyPolicy go={go} />
      break
    case 'contact':
      screen = <ContactUs go={go} />
      break
    case 'delete-account':
      screen = <DeleteAccount go={go} />
      break
    case 'help':
      screen = <HelpSupport go={go} />
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
