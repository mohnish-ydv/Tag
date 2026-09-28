import React, { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

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
  const [googleLoading, setGoogleLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const mobileOk = /^\+?91?\s?\d{10}$/.test(
    mobile.replace(/\s/g, '')
  )
  const passwordOk = password.length >= 6
  const nameOk = name.trim().length >= 2

  const valid =
    mobileOk &&
    passwordOk &&
    (!signup || nameOk)

  const signInWithGoogle = async () => {
    setGoogleLoading(true)
    setAuthError('')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (error) {
      console.error('Google OAuth error:', error)
      setAuthError(error.message)
      setGoogleLoading(false)
    }
  }

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

          <button
            className="btn btn-ghost"
            type="button"
            onClick={signInWithGoogle}
            disabled={googleLoading}
          >
            {googleLoading
              ? 'Connecting to Google…'
              : 'Continue with Google'}
          </button>

          {authError && (
            <small className="field-error-text">
              {authError}
            </small>
          )}

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

function parseCommuteRoute(value) {
  const raw = value.trim()

  const separators = [
    /\s*→\s*/,
    /\s+to\s+/i,
    /\s*-\s*/,
  ]

  for (const separator of separators) {
    const parts = raw.split(separator).map(part => part.trim()).filter(Boolean)

    if (parts.length === 2) {
      return {
        origin: parts[0],
        destination: parts[1],
      }
    }
  }

  return {
    origin: raw,
    destination: raw,
  }
}

function formatCommuteRoute(commute) {
  if (!commute) return 'Add your usual journey'

  return `${commute.origin} → ${commute.destination}`
}

function formatCommuteTime(value) {
  if (!value) return ''

  const [hourText, minuteText] = value.split(':')
  const hour = Number(hourText)
  const minute = minuteText ?? '00'

  if (!Number.isFinite(hour)) return ''

  const suffix = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12

  return `${displayHour}:${minute} ${suffix}`
}

function ProfileSetup({ go }) {
  const [about, setAbout] = useState('')
  const [originSearch, setOriginSearch] = useState('')
  const [destinationSearch, setDestinationSearch] = useState('')
  const [originPlace, setOriginPlace] = useState(null)
  const [destinationPlace, setDestinationPlace] = useState(null)

  const [originResults, setOriginResults] = useState([])
  const [destinationResults, setDestinationResults] = useState([])
  const [searchingOrigin, setSearchingOrigin] = useState(false)
  const [searchingDestination, setSearchingDestination] = useState(false)
  const [locating, setLocating] = useState(false)

  const [displayName, setDisplayName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    let mounted = true

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return

      const user = data.user
      const metadata = user?.user_metadata ?? {}

      setDisplayName(
        metadata.full_name ||
        metadata.name ||
        user?.email?.split('@')[0] ||
        'Tag User'
      )
    })

    return () => {
      mounted = false
    }
  }, [])

  const searchPlaces = async (
    query,
    setResults,
    setSearching
  ) => {
    const value = query.trim()

    if (value.length < 3) {
      setResults([])
      return
    }

    setSearching(true)

    try {
      const params = new URLSearchParams({
        format: 'jsonv2',
        q: value,
        limit: '5',
        addressdetails: '1',
        countrycodes: 'in',
      })

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${params.toString()}`,
        {
          headers: {
            Accept: 'application/json',
            'Accept-Language': 'en-IN,en;q=0.8',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Place search failed.')
      }

      const results = await response.json()

      setResults(
        (results ?? []).map(item => ({
          id: String(item.place_id),
          label: item.display_name,
          lat: Number(item.lat),
          lng: Number(item.lon),
        }))
      )
    } catch (error) {
      console.error('PLACE SEARCH FAILED:', error)
      setResults([])
    } finally {
      setSearching(false)
    }
  }

  const selectOrigin = place => {
    setOriginPlace(place)
    setOriginSearch(place.label)
    setOriginResults([])
  }

  const selectDestination = place => {
    setDestinationPlace(place)
    setDestinationSearch(place.label)
    setDestinationResults([])
  }

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setSaveError('Location is not supported on this device.')
      return
    }

    setLocating(true)
    setSaveError('')

    navigator.geolocation.getCurrentPosition(
      async position => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        try {
          const params = new URLSearchParams({
            format: 'jsonv2',
            lat: String(lat),
            lon: String(lng),
            zoom: '18',
            addressdetails: '1',
          })

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
            {
              headers: {
                Accept: 'application/json',
                'Accept-Language': 'en-IN,en;q=0.8',
              },
            }
          )

          if (!response.ok) {
            throw new Error('Could not identify your location.')
          }

          const result = await response.json()

          selectOrigin({
            id: String(result.place_id ?? `${lat},${lng}`),
            label:
              result.display_name ||
              `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
            lat,
            lng,
          })
        } catch (error) {
          console.error('REVERSE GEOCODE FAILED:', error)

          selectOrigin({
            id: `${lat},${lng}`,
            label: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
            lat,
            lng,
          })
        } finally {
          setLocating(false)
        }
      },
      error => {
        console.error('LOCATION FAILED:', error)

        const messages = {
          1: 'Location permission was denied. Please allow location access and try again.',
          2: 'Your location could not be determined.',
          3: 'Location request timed out. Please try again.',
        }

        setSaveError(
          messages[error.code] ||
          'Could not get your current location.'
        )

        setLocating(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      }
    )
  }

  const saveProfile = async () => {
    setSaveError('')

    if (saving) return

    if (
      (originSearch.trim() && !originPlace) ||
      (destinationSearch.trim() && !destinationPlace)
    ) {
      setSaveError('Please select a place from the search results.')
      return
    }

    if (
      (originPlace && !destinationPlace) ||
      (!originPlace && destinationPlace)
    ) {
      setSaveError('Select both your starting point and destination.')
      return
    }

    setSaving(true)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error('Your session has expired. Please sign in again.')
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(
          {
            id: user.id,
            display_name: displayName.trim() || 'Tag User',
            phone: user.phone ?? null,
            avatar_url: user.user_metadata?.avatar_url ?? null,
            bio: about.trim() || null,
            onboarding_completed: true,
          },
          {
            onConflict: 'id',
          }
        )

      if (profileError) {
        throw new Error(profileError.message)
      }

      if (originPlace && destinationPlace) {
        const { data: existingCommutes, error: existingError } =
          await supabase
            .from('commutes')
            .select('id')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(1)

        if (existingError) {
          throw new Error(existingError.message)
        }

        const payload = {
          user_id: user.id,
          role: 'either',
          origin: originPlace.label,
          destination: destinationPlace.label,
          origin_lat: originPlace.lat,
          origin_lng: originPlace.lng,
          destination_lat: destinationPlace.lat,
          destination_lng: destinationPlace.lng,
          days: [1, 2, 3, 4, 5],
          seats_total: 1,
          status: 'active',
        }

        if (existingCommutes?.[0]?.id) {
          const { error } = await supabase
            .from('commutes')
            .update(payload)
            .eq('id', existingCommutes[0].id)
            .eq('user_id', user.id)

          if (error) throw new Error(error.message)
        } else {
          const { error } = await supabase
            .from('commutes')
            .insert(payload)

          if (error) throw new Error(error.message)
        }
      }

      go('home')
    } catch (error) {
      console.error('PROFILE SETUP FAILED:', error)
      setSaveError(
        error?.message ||
        'Could not complete your profile.'
      )
    } finally {
      setSaving(false)
    }
  }

  const skipSetup = async () => {
    if (saving) return

    setSaving(true)
    setSaveError('')

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error('Your session has expired. Please sign in again.')
      }

      const { error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: user.id,
            display_name: displayName.trim() || 'Tag User',
            phone: user.phone ?? null,
            avatar_url: user.user_metadata?.avatar_url ?? null,
            bio: about.trim() || null,
            onboarding_completed: true,
          },
          {
            onConflict: 'id',
          }
        )

      if (error) throw new Error(error.message)

      go('home')
    } catch (error) {
      console.error('PROFILE SKIP FAILED:', error)
      setSaveError(
        error?.message || 'Could not continue.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="screen">
      <Header title="Set up your Tag" />

      <div className="screen-scroll">
        <section className="section">
          <div className="stack-24">

            <div>
              <h2 className="t-title">
                Start with what matters
              </h2>

              <p className="t-body mt-8">
                Add your journey if you are ready. You can complete
                the rest of your profile later.
              </p>
            </div>

            <div
              className="row"
              style={{ justifyContent: 'center' }}
            >
              <Avatar
                name={displayName || 'Tag User'}
                size="lg"
              />
            </div>

            <div className="field-group">
              <p className="t-label">
                Your name <span style={{ opacity: 0.55 }}>(optional)</span>
              </p>

              <input
                className="field"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="field-group">
              <p className="t-label">
                About you <span style={{ opacity: 0.55 }}>(optional)</span>
              </p>

              <textarea
                className="field"
                value={about}
                onChange={e => setAbout(e.target.value)}
                placeholder="What should people know?"
              />
            </div>

            <div className="field-group">
              <p className="t-label">
                Starting point <span style={{ opacity: 0.55 }}>(optional)</span>
              </p>

              <input
                className="field"
                value={originSearch}
                onChange={e => {
                  const value = e.target.value
                  setOriginSearch(value)
                  setOriginPlace(null)

                  searchPlaces(
                    value,
                    setOriginResults,
                    setSearchingOrigin
                  )
                }}
                placeholder="Search your starting point"
              />

              <button
                type="button"
                className="btn btn-ghost mt-8"
                onClick={useCurrentLocation}
                disabled={locating}
              >
                {locating
                  ? 'Finding your location…'
                  : 'Use current location'}
              </button>

              {searchingOrigin && (
                <small className="t-body mt-8">
                  Searching places…
                </small>
              )}

              {originResults.length > 0 && (
                <div className="stack-8 mt-8">
                  {originResults.map(place => (
                    <button
                      type="button"
                      key={place.id}
                      className="card card-pad"
                      onClick={() => selectOrigin(place)}
                      style={{
                        textAlign: 'left',
                        width: '100%',
                      }}
                    >
                      <strong>
                        {place.label.split(',')[0]}
                      </strong>

                      <span
                        className="t-small"
                        style={{
                          display: 'block',
                          marginTop: 4,
                        }}
                      >
                        {place.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="field-group">
              <p className="t-label">
                Destination <span style={{ opacity: 0.55 }}>(optional)</span>
              </p>

              <input
                className="field"
                value={destinationSearch}
                onChange={e => {
                  const value = e.target.value
                  setDestinationSearch(value)
                  setDestinationPlace(null)

                  searchPlaces(
                    value,
                    setDestinationResults,
                    setSearchingDestination
                  )
                }}
                placeholder="Search your destination"
              />

              {searchingDestination && (
                <small className="t-body mt-8">
                  Searching places…
                </small>
              )}

              {destinationResults.length > 0 && (
                <div className="stack-8 mt-8">
                  {destinationResults.map(place => (
                    <button
                      type="button"
                      key={place.id}
                      className="card card-pad"
                      onClick={() => selectDestination(place)}
                      style={{
                        textAlign: 'left',
                        width: '100%',
                      }}
                    >
                      <strong>
                        {place.label.split(',')[0]}
                      </strong>

                      <span
                        className="t-small"
                        style={{
                          display: 'block',
                          marginTop: 4,
                        }}
                      >
                        {place.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {originPlace && destinationPlace && (
              <div className="card card-pad">
                <p className="t-small">YOUR JOURNEY</p>

                <p className="person-name mt-8">
                  {originPlace.label.split(',')[0]}
                  {' → '}
                  {destinationPlace.label.split(',')[0]}
                </p>

                <p className="t-small mt-8">
                  Your selected locations are used to improve
                  commute matching.
                </p>
              </div>
            )}

            {saveError && (
              <small className="field-error-text">
                {saveError}
              </small>
            )}

          </div>

          <div className="mt-32 stack-12">
            <Button
              onClick={saveProfile}
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Continue'}
            </Button>

            <Button
              variant="secondary"
              onClick={skipSetup}
              disabled={saving}
            >
              Skip for now
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}

function Home({ go }) {
  const [commute, setCommute] = useState(null)
  const [nearbyCommutes, setNearbyCommutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadHomeData = async () => {
      setLoading(true)
      setLoadError('')

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        if (mounted) {
          setLoading(false)
          setLoadError('Please sign in again.')
        }
        return
      }

      const { data: ownCommutes, error: ownError } = await supabase
        .from('commutes')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)

      if (ownError) {
        if (mounted) {
          setLoading(false)
          setLoadError(ownError.message)
        }
        return
      }

      const currentCommute = ownCommutes?.[0] ?? null

      let discoveryQuery = supabase
        .from('commutes')
        .select(`
          id,
          user_id,
          origin,
          destination,
          departure_time,
          role,
          seats_total,
          vehicle_type,
          profiles (
            display_name,
            avatar_url,
            bio
          )
        `)
        .eq('status', 'active')
        .neq('user_id', user.id)
        .limit(6)

      if (currentCommute) {
        // Start with the strongest deterministic signal: same origin.
        // Destination compatibility is scored client-side so we can
        // gracefully handle partial/nearby route text without requiring
        // a new database function.
        discoveryQuery = discoveryQuery
          .eq('origin', currentCommute.origin)
      }

      const { data: matches, error: matchError } = await discoveryQuery

      if (!mounted) return

      if (matchError) {
        setCommute(currentCommute)
        setNearbyCommutes([])
        setLoadError(matchError.message)
        setLoading(false)
        return
      }

      const normalize = value =>
        String(value || '')
          .trim()
          .toLowerCase()
          .replace(/\\s+/g, ' ')

      const destination = normalize(currentCommute?.destination)

      const rankedMatches = (matches ?? [])
        .map(item => {
          const itemDestination = normalize(item.destination)
          let score = 50

          if (destination && itemDestination === destination) {
            score += 40
          } else if (
            destination &&
            (
              itemDestination.includes(destination) ||
              destination.includes(itemDestination)
            )
          ) {
            score += 25
          }

          if (
            currentCommute?.role &&
            currentCommute.role !== 'either' &&
            item.role &&
            item.role !== 'either' &&
            currentCommute.role !== item.role
          ) {
            score += 8
          }

          return { ...item, match_score: Math.min(score, 100) }
        })
        .sort((a, b) => b.match_score - a.match_score)

      setCommute(currentCommute)
      setNearbyCommutes(rankedMatches)
      setLoading(false)
    }

    loadHomeData()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <main className="screen tag-home">

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

      <div className="journey-context">
        <span className="context-dot" />
        <span>
          {loading
            ? 'Getting your journey ready…'
            : commute
              ? 'Ready to Tag'
              : 'Set your usual journey'}
        </span>
      </div>

      <section className="tag-home-sheet">

        <div className="sheet-grabber" />

        <div className="sheet-heading">
          <div>
            <p className="sheet-eyebrow">YOUR JOURNEY</p>
            <h1>
              {loading
                ? 'Loading your journey…'
                : commute
                  ? formatCommuteRoute(commute)
                  : 'Where are you headed?'}
            </h1>
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

        {loadError && (
          <div className="field-error-text" style={{ marginTop: 12 }}>
            {loadError}
          </div>
        )}

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
            {loading && (
              <div className="t-body">
                Finding people travelling your way…
              </div>
            )}

            {!loading && nearbyCommutes.length === 0 && (
              <div className="t-body">
                No matching commuters yet. Check Discover to explore more journeys.
              </div>
            )}

            {!loading && nearbyCommutes.slice(0, 2).map(item => {
              const profile = item.profiles ?? {}
              const name = profile.display_name || 'Tag commuter'

              return (
                <button
                  className="route-person"
                  key={item.id}
                  onClick={() => {
                    sessionStorage.setItem(
                      'tag:selected-commute',
                      JSON.stringify({
                        commute: item,
                        match_score: item.match_score,
                      }),
                    )
                    go('match')
                  }}
                >
                  <Avatar
                    name={name}
                    size="sm"
                  />

                  <div className="route-person-copy">
                    <strong>{name}</strong>
                    <span>
                      {formatCommuteRoute(item)}
                    </span>
                  </div>

                  <span className="route-match">
                    {item.match_score
                      ? `${item.match_score}% match`
                      : item.role === 'driver'
                        ? 'Driver'
                        : item.role === 'rider'
                          ? 'Rider'
                          : 'Match'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

      </section>

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
  const [commutes, setCommutes] = useState([])
  const [myCommute, setMyCommute] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadCommutes = async () => {
      setLoading(true)
      setLoadError('')

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        if (mounted) {
          setLoading(false)
          setLoadError('Please sign in again.')
        }
        return
      }

      const { data: ownCommutes } = await supabase
        .from('commutes')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)

      if (mounted) {
        setMyCommute(ownCommutes?.[0] ?? null)
      }

      const { data, error } = await supabase
        .from('commutes')
        .select(`
          id,
          user_id,
          origin,
          destination,
          departure_time,
          arrival_time,
          role,
          seats_total,
          vehicle_type,
          detour_preference,
          profiles (
            display_name,
            avatar_url,
            bio
          )
        `)
        .eq('status', 'active')
        .neq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30)

      if (!mounted) return

      if (error) {
        setLoadError(error.message)
        setCommutes([])
      } else {
        setCommutes(data ?? [])
      }

      setLoading(false)
    }

    loadCommutes()

    return () => {
      mounted = false
    }
  }, [])

  const normalize = value =>
    String(value || '')
      .trim()
      .toLowerCase()
      .replace(/\\s+/g, ' ')

  const searchTerm = search.trim().toLowerCase()
  const myOrigin = normalize(myCommute?.origin)
  const myDestination = normalize(myCommute?.destination)

  const filteredCommutes = commutes
    .map(item => {
      const itemOrigin = normalize(item.origin)
      const itemDestination = normalize(item.destination)

      let score = 50

      if (myOrigin && itemOrigin === myOrigin) {
        score += 25
      }

      if (myDestination && itemDestination === myDestination) {
        score += 25
      } else if (
        myDestination &&
        (
          itemDestination.includes(myDestination) ||
          myDestination.includes(itemDestination)
        )
      ) {
        score += 15
      }

      if (
        myCommute?.role &&
        myCommute.role !== 'either' &&
        item.role &&
        item.role !== 'either' &&
        myCommute.role !== item.role
      ) {
        score += 8
      }

      return {
        ...item,
        match_score: Math.min(score, 100),
      }
    })
    .filter(item => {
      if (!searchTerm) return true

      const profile = item.profiles ?? {}
      const name = profile.display_name || ''
      const route = `${item.origin} ${item.destination}`

      return `${name} ${route}`
        .toLowerCase()
        .includes(searchTerm)
    })
    .sort((a, b) => b.match_score - a.match_score)

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
            <input
              placeholder="Search people or journeys"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
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

          {loadError && (
            <small className="field-error-text">
              {loadError}
            </small>
          )}

          {loading && (
            <p className="t-body">
              Finding commuters…
            </p>
          )}

          {!loading && !loadError && filteredCommutes.length === 0 && (
            <p className="t-body">
              No commuters found yet. Try another search.
            </p>
          )}

          <div className="stack-12">
            {!loading && filteredCommutes.map(item => {
              const profile = item.profiles ?? {}
              const name = profile.display_name || 'Tag commuter'

              return (
                <button
                  className="card person-card"
                  key={item.id}
                  onClick={() => {
                    sessionStorage.setItem(
                      'tag:selected-commute',
                      JSON.stringify({
                        commute: item,
                        match_score: item.match_score,
                      })
                    )
                    go('match')
                  }}
                >
                  <Avatar
                    name={name}
                    src={profile.avatar_url}
                  />

                  <div className="person-info">
                    <p className="person-name">{name}</p>

                    <p className="person-meta">
                      {formatCommuteRoute(item)}
                    </p>

                    <div className="mt-8">
                      <span className="badge success">
                        {item.role === 'driver'
                          ? 'Driver'
                          : item.role === 'rider'
                            ? 'Rider'
                            : 'Open to either'}
                      </span>

                      <span
                        className="badge"
                        style={{ marginLeft: 6 }}
                      >
                        {item.match_score}% match
                      </span>

                      {item.departure_time && (
                        <span
                          className="badge"
                          style={{ marginLeft: 6 }}
                        >
                          {formatCommuteTime(item.departure_time)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Icon name="arrow" size={18} />
                </button>
              )
            })}
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

        <Button onClick={() => go('discover')}>
          Find people on my route
        </Button>
      </section>
    </main>
  )
}

function Active({ go }) {
  const [connection, setConnection] = useState(null)
  const [otherProfile, setOtherProfile] = useState(null)
  const [otherCommute, setOtherCommute] = useState(null)
  const [myCommute, setMyCommute] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadConnection = async () => {
      setLoading(true)
      setError('')

      try {
        const connectionId =
          sessionStorage.getItem('tag:selected-connection')

        if (!connectionId) {
          throw new Error('No active Tag selected.')
        }

        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          throw new Error('Please sign in again.')
        }

        const { data: row, error: connectionError } =
          await supabase
            .from('commute_connections')
            .select(`
              id,
              commute_a_id,
              commute_b_id,
              user_a,
              user_b,
              status,
              created_at
            `)
            .eq('id', connectionId)
            .or(`user_a.eq.${user.id},user_b.eq.${user.id}`)
            .maybeSingle()

        if (connectionError || !row) {
          throw new Error(
            connectionError?.message ||
            'This Tag connection is no longer available.'
          )
        }

        if (row.status !== 'active') {
          throw new Error('This Tag is no longer active.')
        }

        const otherUserId =
          row.user_a === user.id
            ? row.user_b
            : row.user_a

        const otherCommuteId =
          row.user_a === user.id
            ? row.commute_b_id
            : row.commute_a_id

        const myCommuteId =
          row.user_a === user.id
            ? row.commute_a_id
            : row.commute_b_id

        const [profileResult, otherCommuteResult, myCommuteResult] =
          await Promise.all([
            supabase
              .from('profiles')
              .select('id,display_name,avatar_url,bio')
              .eq('id', otherUserId)
              .maybeSingle(),

            supabase
              .from('commutes')
              .select('*')
              .eq('id', otherCommuteId)
              .maybeSingle(),

            supabase
              .from('commutes')
              .select('*')
              .eq('id', myCommuteId)
              .maybeSingle(),
          ])

        if (profileResult.error) {
          throw new Error(profileResult.error.message)
        }

        if (otherCommuteResult.error) {
          throw new Error(otherCommuteResult.error.message)
        }

        if (myCommuteResult.error) {
          throw new Error(myCommuteResult.error.message)
        }

        if (!mounted) return

        setConnection(row)
        setOtherProfile(profileResult.data)
        setOtherCommute(otherCommuteResult.data)
        setMyCommute(myCommuteResult.data)
      } catch (err) {
        console.error('ACTIVE TAG LOAD FAILED:', err)

        if (mounted) {
          setError(
            err?.message ||
            'Could not load this Tag.'
          )
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadConnection()

    return () => {
      mounted = false
    }
  }, [])

  const name =
    otherProfile?.display_name ||
    'Tag commuter'

  const route =
    otherCommute
      ? formatCommuteRoute(otherCommute)
      : 'Recurring commute'

  if (loading) {
    return (
      <main className="screen">
        <Header title="Active Tag" />
        <section className="section">
          <p className="t-body">Loading your Tag…</p>
        </section>
      </main>
    )
  }

  if (error || !connection) {
    return (
      <main className="screen">
        <Header
          title="Active Tag"
          back
          onBack={() => go('tags')}
        />

        <section className="section">
          <div className="card card-pad">
            <p className="field-error-text">
              {error || 'This Tag is unavailable.'}
            </p>

            <div className="mt-16">
              <Button onClick={() => go('tags')}>
                Back to My Tags
              </Button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const commuteRole =
    myCommute?.role === 'driver'
      ? 'Driver'
      : myCommute?.role === 'rider'
        ? 'Rider'
        : 'Open to either'

  const commuteDays = Array.isArray(myCommute?.days)
    ? myCommute.days
    : []

  const daysLabel =
    commuteDays.length > 0
      ? commuteDays.join(' · ')
      : 'Recurring schedule'

  const departureLabel =
    myCommute?.departure_time
      ? formatCommuteTime(myCommute.departure_time)
      : 'Flexible'

  const arrivalLabel =
    myCommute?.arrival_time
      ? formatCommuteTime(myCommute.arrival_time)
      : 'Flexible'

  return (
    <main className="screen active-screen">
      <Header
        title="Active Tag"
        back
        onBack={() => go('tags')}
        right={
          <button
            className="icon-btn outline"
            aria-label="Connection safety"
            type="button"
          >
            <Icon name="shield" />
          </button>
        }
      />

      <div className="screen-scroll active-scroll">

        <section className="active-connection-hero">
          <div className="active-person">
            <Avatar
              name={name}
              src={otherProfile?.avatar_url}
              size="lg"
            />

            <div className="active-person-copy">
              <div className="active-live-label">
                <span className="active-live-dot" />
                Active connection
              </div>

              <h1>{name}</h1>

              <p>
                Your recurring commute connection is ready.
              </p>
            </div>
          </div>
        </section>

        <section className="active-route-card">
          <div className="active-card-kicker">
            RECURRING COMMUTE
          </div>

          <div className="active-route">
            {myCommute
              ? formatCommuteRoute(myCommute)
              : route}
          </div>

          <div className="active-route-meta">
            <span className="active-route-status">
              <span className="active-route-status-dot" />
              Active
            </span>

            <span>{commuteRole}</span>
          </div>
        </section>

        <section className="active-details-card">
          <div className="active-details-head">
            <div>
              <p className="t-body-strong">
                Your routine
              </p>
              <p className="t-small">
                Keep the recurring plan clear for both of you.
              </p>
            </div>
          </div>

          <div className="active-detail-grid">

            <div className="active-detail">
              <span>Departure</span>
              <strong>{departureLabel}</strong>
            </div>

            <div className="active-detail">
              <span>Arrival</span>
              <strong>{arrivalLabel}</strong>
            </div>

            <div className="active-detail">
              <span>Days</span>
              <strong>{daysLabel}</strong>
            </div>

            <div className="active-detail">
              <span>Community</span>
              <strong>
                {myCommute?.community || 'Tag community'}
              </strong>
            </div>

          </div>
        </section>

        <section className="active-coordination-card">
          <div className="active-coordination-icon">
            <Icon name="message" />
          </div>

          <div className="active-coordination-copy">
            <p className="t-body-strong">
              Coordinate before you travel
            </p>

            <p className="t-small">
              Keep updates, timing changes and commute details
              inside your Tag connection.
            </p>
          </div>
        </section>

        <section className="section active-actions-section">
          <Button onClick={() => go('chat')}>
            Open chat
          </Button>

          <Button
            variant="secondary"
            onClick={() => go('complete')}
          >
            Complete Tag
          </Button>
        </section>

      </div>
    </main>
  )
}

function Chat({ go }) {
  const [connection, setConnection] = useState(null)
  const [otherProfile, setOtherProfile] = useState(null)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    let channel = null

    const loadChat = async () => {
      setLoading(true)
      setError('')

      try {
        const connectionId =
          sessionStorage.getItem('tag:selected-connection')

        if (!connectionId) {
          throw new Error('No active conversation selected.')
        }

        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          throw new Error('Please sign in again.')
        }

        const { data: row, error: connectionError } =
          await supabase
            .from('commute_connections')
            .select(`
              id,
              user_a,
              user_b,
              status
            `)
            .eq('id', connectionId)
            .or(`user_a.eq.${user.id},user_b.eq.${user.id}`)
            .maybeSingle()

        if (connectionError || !row) {
          throw new Error(
            connectionError?.message ||
            'This conversation is unavailable.'
          )
        }

        if (row.status !== 'active') {
          throw new Error(
            'This Tag conversation is no longer active.'
          )
        }

        const otherUserId =
          row.user_a === user.id
            ? row.user_b
            : row.user_a

        const [profileResult, messagesResult] =
          await Promise.all([
            supabase
              .from('profiles')
              .select('id,display_name,avatar_url,bio')
              .eq('id', otherUserId)
              .maybeSingle(),

            supabase
              .from('messages')
              .select('id,connection_id,sender_id,body,created_at')
              .eq('connection_id', connectionId)
              .order('created_at', { ascending: true }),
          ])

        if (profileResult.error) {
          throw new Error(profileResult.error.message)
        }

        if (messagesResult.error) {
          throw new Error(messagesResult.error.message)
        }

        if (!mounted) return

        setConnection(row)
        setCurrentUserId(user.id)
        setOtherProfile(profileResult.data)
        setMessages(messagesResult.data ?? [])

        channel = supabase
          .channel(`tag-chat-${connectionId}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'messages',
              filter: `connection_id=eq.${connectionId}`,
            },
            payload => {
              if (!mounted) return

              setMessages(current => {
                if (
                  current.some(
                    item => item.id === payload.new.id
                  )
                ) {
                  return current
                }

                return [...current, payload.new]
              })
            }
          )
          .subscribe()
      } catch (err) {
        console.error('CHAT LOAD FAILED:', err)

        if (mounted) {
          setError(
            err?.message ||
            'Could not load this conversation.'
          )
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadChat()

    return () => {
      mounted = false

      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [])

  const sendMessage = async () => {
    const body = message.trim()

    if (!body || sending || !connection) {
      return
    }

    setSending(true)
    setError('')

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('Please sign in again.')
      }

      const { data, error: sendError } =
        await supabase
          .from('messages')
          .insert({
            connection_id: connection.id,
            sender_id: user.id,
            body,
          })
          .select('id,connection_id,sender_id,body,created_at')
          .single()

      if (sendError) {
        throw new Error(sendError.message)
      }

      setMessages(current => {
        if (current.some(item => item.id === data.id)) {
          return current
        }

        return [...current, data]
      })

      setMessage('')
    } catch (err) {
      console.error('MESSAGE SEND FAILED:', err)

      setError(
        err?.message ||
        'Could not send your message.'
      )
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = event => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey
    ) {
      event.preventDefault()
      sendMessage()
    }
  }

  const name =
    otherProfile?.display_name ||
    'Tag commuter'

  const avatarName = name.trim() || 'Tag commuter'

  return (
    <main className="screen chat-screen">
      <Header
        title={name}
        back
        onBack={() => go('active')}
        right={
          <button
            className="icon-btn outline"
            aria-label="Conversation safety"
            type="button"
          >
            <Icon name="shield" />
          </button>
        }
      />

      <div className="chat-content">
        <section className="chat-context">
          <Avatar
            name={avatarName}
            src={otherProfile?.avatar_url}
            size="md"
          />

          <div className="chat-context-copy">
            <div className="chat-context-topline">
              <span className="chat-online-dot" />
              Active Tag connection
            </div>
            <p>
              Coordinate your recurring commute here.
            </p>
          </div>
        </section>

        <section className="chat-privacy">
          <div className="chat-privacy-icon">
            <Icon name="shield" />
          </div>
          <div>
            <p className="t-body-strong">
              Protected conversation
            </p>
            <p className="t-small">
              Contact details stay private unless you choose to share them.
            </p>
          </div>
        </section>

        {loading && (
          <section className="chat-state">
            <div className="chat-loading-dot" />
            <p>Loading conversation…</p>
          </section>
        )}

        {error && (
          <section className="chat-error" role="alert">
            <Icon name="alert" />
            <span>{error}</span>
          </section>
        )}

        {!loading && !error && messages.length === 0 && (
          <section className="chat-empty">
            <div className="chat-empty-icon">
              <Icon name="message" />
            </div>
            <h2>Start the conversation</h2>
            <p>
              Say hello and coordinate the next recurring commute.
            </p>
          </section>
        )}

        {!loading && !error && messages.length > 0 && (
          <section className="chat-thread" aria-label="Messages">
            {messages.map(item => {
              const mine =
                !!currentUserId &&
                item.sender_id === currentUserId

              return (
                <div
                  key={item.id}
                  className={
                    mine
                      ? 'chat-message-row chat-message-row-mine'
                      : 'chat-message-row chat-message-row-theirs'
                  }
                >
                  {!mine && (
                    <Avatar
                      name={avatarName}
                      src={otherProfile?.avatar_url}
                      size="sm"
                    />
                  )}

                  <div
                    className={
                      mine
                        ? 'chat-message chat-message-mine'
                        : 'chat-message chat-message-theirs'
                    }
                  >
                    <p className="chat-message-body">
                      {item.body}
                    </p>

                    <p className="chat-message-time">
                      {new Date(
                        item.created_at
                      ).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              )
            })}
          </section>
        )}
      </div>

      <div className="chat-composer-wrap">
        <div className="chat-composer">
          <input
            className="chat-composer-input"
            aria-label="Message"
            placeholder="Message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading || sending || !connection}
          />

          <button
            className="chat-send-button"
            type="button"
            aria-label={sending ? 'Sending message' : 'Send message'}
            onClick={sendMessage}
            disabled={
              loading ||
              sending ||
              !connection ||
              !message.trim()
            }
          >
            <Icon name="arrow" />
          </button>
        </div>

        <p className="chat-composer-hint">
          Enter to send · Shift + Enter for a new line
        </p>
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
  const [incoming, setIncoming] = useState([])
  const [outgoing, setOutgoing] = useState([])
  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState('')
  const [userId, setUserId] = useState('')

  const loadTags = async () => {
    setLoading(true)
    setError('')

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setUserId('')
      setLoading(false)
      setError('Please sign in again.')
      return
    }

    setUserId(user.id)

    const [
      incomingResult,
      outgoingResult,
      connectionsResult,
    ] = await Promise.all([
      supabase
        .from('commute_requests')
        .select(`
          id,
          commute_id,
          requester_id,
          target_user_id,
          status,
          message,
          created_at,
          requester:profiles!commute_requests_requester_id_fkey (
            display_name,
            avatar_url,
            bio
          ),
          target_commute:commutes!commute_requests_commute_id_fkey (
            origin,
            destination,
            departure_time,
            role
          )
        `)
        .eq('target_user_id', user.id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false }),

      supabase
        .from('commute_requests')
        .select(`
          id,
          commute_id,
          requester_id,
          target_user_id,
          status,
          message,
          created_at,
          target:profiles!commute_requests_target_user_id_fkey (
            display_name,
            avatar_url,
            bio
          ),
          target_commute:commutes!commute_requests_commute_id_fkey (
            origin,
            destination,
            departure_time,
            role
          )
        `)
        .eq('requester_id', user.id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false }),

      supabase
        .from('commute_connections')
        .select(`
          id,
          commute_a_id,
          commute_b_id,
          user_a,
          user_b,
          status,
          created_at,
          profile_a:profiles!commute_connections_user_a_fkey (
            id,
            display_name,
            avatar_url
          ),
          profile_b:profiles!commute_connections_user_b_fkey (
            id,
            display_name,
            avatar_url
          ),
          commute_a:commutes!commute_connections_commute_a_id_fkey (
            origin,
            destination,
            departure_time
          ),
          commute_b:commutes!commute_connections_commute_b_id_fkey (
            origin,
            destination,
            departure_time
          )
        `)
        .or(`user_a.eq.${user.id},user_b.eq.${user.id}`)
        .eq('status', 'active')
        .order('created_at', { ascending: false }),
    ])

    if (incomingResult.error || outgoingResult.error || connectionsResult.error) {
      setError(
        incomingResult.error?.message ||
        outgoingResult.error?.message ||
        connectionsResult.error?.message ||
        'Could not load your Tags.'
      )
      setLoading(false)
      return
    }

    setIncoming(incomingResult.data ?? [])
    setOutgoing(outgoingResult.data ?? [])
    setConnections(connectionsResult.data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    loadTags()
  }, [])

  const acceptRequest = async request => {
    if (busyId) return

    setBusyId(request.id)
    setError('')

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('Please sign in again.')
      }

      if (
        !request?.requester_id ||
        request.requester_id === user.id ||
        request?.target_user_id !== user.id ||
        request?.status !== 'pending'
      ) {
        throw new Error('This Tag request is no longer available.')
      }

      /*
       * commute_id belongs to the TARGET user.
       */
      const { data: targetCommute, error: targetError } =
        await supabase
          .from('commutes')
          .select('id,user_id,status')
          .eq('id', request.commute_id)
          .eq('user_id', user.id)
          .eq('status', 'active')
          .maybeSingle()

      if (targetError || !targetCommute) {
        throw new Error(
          targetError?.message ||
          'Your commute is no longer available.'
        )
      }

      /*
       * The requester has their own active commute.
       */
      const {
        data: requesterCommute,
        error: requesterError,
      } = await supabase
        .from('commutes')
        .select('id,user_id,status')
        .eq('user_id', request.requester_id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (requesterError || !requesterCommute) {
        throw new Error(
          requesterError?.message ||
          'The requester’s active commute is no longer available.'
        )
      }

      const requesterIsFirst =
        request.requester_id < user.id

      const userA = requesterIsFirst
        ? request.requester_id
        : user.id

      const userB = requesterIsFirst
        ? user.id
        : request.requester_id

      const commuteA = requesterIsFirst
        ? requesterCommute.id
        : targetCommute.id

      const commuteB = requesterIsFirst
        ? targetCommute.id
        : requesterCommute.id

      const {
        data: existingConnection,
        error: existingError,
      } = await supabase
        .from('commute_connections')
        .select('id,status')
        .or(
          `and(user_a.eq.${userA},user_b.eq.${userB}),and(user_a.eq.${userB},user_b.eq.${userA})`
        )
        .limit(1)
        .maybeSingle()

      if (existingError) {
        throw new Error(existingError.message)
      }

      if (!existingConnection) {
        const { error: connectionError } =
          await supabase
            .from('commute_connections')
            .insert({
              commute_a_id: commuteA,
              commute_b_id: commuteB,
              user_a: userA,
              user_b: userB,
              status: 'active',
            })

        if (connectionError && connectionError.code !== '23505') {
          throw new Error(connectionError.message)
        }
      }

      const {
        data: acceptedRequest,
        error: requestError,
      } = await supabase
        .from('commute_requests')
        .update({ status: 'accepted' })
        .eq('id', request.id)
        .eq('target_user_id', user.id)
        .eq('status', 'pending')
        .select('id,status')
        .maybeSingle()

      if (requestError) {
        throw new Error(requestError.message)
      }

      if (!acceptedRequest) {
        throw new Error('This Tag request was already handled.')
      }

      await supabase
        .from('commute_requests')
        .update({ status: 'cancelled' })
        .eq('requester_id', user.id)
        .eq('target_user_id', request.requester_id)
        .eq('status', 'pending')

      await loadTags()
    } catch (error) {
      console.error('ACCEPT TAG FAILED:', error)

      setError(
        error?.message ||
        'Could not accept this Tag.'
      )
    } finally {
      setBusyId('')
    }
  }

  const rejectRequest = async request => {
    if (busyId || !request?.id) return

    setBusyId(request.id)
    setError('')

    const { error } = await supabase
      .from('commute_requests')
      .update({ status: 'rejected' })
      .eq('id', request.id)
      .eq('target_user_id', userId)
      .eq('status', 'pending')

    if (error) {
      setError(error.message)
      setBusyId('')
      return
    }

    await loadTags()
    setBusyId('')
  }

  return (
    <main className="screen">
      <Header title="My Tags" />

      <div className="screen-scroll">
        <section className="section">

          {error && (
            <small className="field-error-text">
              {error}
            </small>
          )}

          {loading && (
            <p className="t-body">
              Loading your Tags…
            </p>
          )}

          {!loading && incoming.length > 0 && (
            <>
              <div className="section-head">
                <h2 className="section-title">Requests for you</h2>
              </div>

              <div className="stack-12 mt-12">
                {incoming.map(request => {
                  const person = request.requester ?? {}
                  const commute = request.target_commute ?? {}

                  return (
                    <div className="card card-pad" key={request.id}>
                      <div className="row-between">
                        <div className="row" style={{ gap: 12 }}>
                          <Avatar
                            name={person.display_name || 'Tag commuter'}
                            src={person.avatar_url}
                            size="sm"
                          />

                          <div>
                            <p className="person-name">
                              {person.display_name || 'Tag commuter'}
                            </p>

                            <p className="person-meta">
                              {commute.origin || 'Origin'} → {commute.destination || 'Destination'}
                            </p>
                          </div>
                        </div>

                        <span className="badge">
                          Request
                        </span>
                      </div>

                      <div className="row mt-12" style={{ gap: 8 }}>
                        <Button
                          onClick={() => acceptRequest(request)}
                          disabled={busyId === request.id}
                        >
                          {busyId === request.id ? 'Working…' : 'Accept'}
                        </Button>

                        <Button
                          variant="secondary"
                          onClick={() => rejectRequest(request)}
                          disabled={busyId === request.id}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {!loading && connections.length > 0 && (
            <>
              <div className="section-head mt-24">
                <h2 className="section-title">Active Tags</h2>
              </div>

              <div className="stack-12 mt-12">
                {connections.map(connection => {
                  const iAmA = connection.user_a === userId
                  const otherProfile = iAmA
                    ? (connection.profile_b ?? {})
                    : (connection.profile_a ?? {})
                  const myCommute = iAmA
                    ? (connection.commute_a ?? {})
                    : (connection.commute_b ?? {})

                  const otherName =
                    otherProfile.display_name || 'Tag commuter'

                  const route =
                    myCommute.origin && myCommute.destination
                      ? myCommute.origin + ' → ' + myCommute.destination
                      : 'Recurring commute'

                  return (
                    <button
                      className="card card-pad active-connection-card"
                      key={connection.id}
                      onClick={() => {
                        sessionStorage.setItem(
                          'tag:selected-connection',
                          connection.id
                        )
                        go('active')
                      }}
                    >
                      <div className="row-between">
                        <div className="row" style={{ gap: 12, minWidth: 0 }}>
                          <Avatar
                            name={otherName}
                            src={otherProfile.avatar_url}
                            size="sm"
                          />

                          <div style={{ minWidth: 0 }}>
                            <p className="person-name">
                              {otherName}
                            </p>

                            <p className="person-meta active-connection-route">
                              {route}
                            </p>

                            {myCommute.departure_time && (
                              <p className="t-small active-connection-time">
                                Usually leaves around {formatCommuteTime(myCommute.departure_time)}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className="badge success">
                          Active
                        </span>
                      </div>

                      <div className="active-connection-footer">
                        <span>Recurring commute</span>
                        <span>View connection →</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {!loading && outgoing.length > 0 && (
            <>
              <div className="section-head mt-24">
                <h2 className="section-title">Requests sent</h2>
              </div>

              <div className="stack-12 mt-12">
                {outgoing.map(request => {
                  const person = request.target ?? {}
                  const commute = request.target_commute ?? {}

                  return (
                    <div className="card card-pad" key={request.id}>
                      <div className="row-between">
                        <div className="row" style={{ gap: 12 }}>
                          <Avatar
                            name={person.display_name || 'Tag commuter'}
                            src={person.avatar_url}
                            size="sm"
                          />

                          <div>
                            <p className="person-name">
                              {person.display_name || 'Tag commuter'}
                            </p>

                            <p className="person-meta">
                              {commute.origin || 'Origin'} → {commute.destination || 'Destination'}
                            </p>
                          </div>
                        </div>

                        <span className="badge">
                          Pending
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {!loading &&
            incoming.length === 0 &&
            outgoing.length === 0 &&
            connections.length === 0 && (
              <div className="card card-pad">
                <p className="t-body-strong">
                  No Tags yet
                </p>
                <p className="t-small mt-4">
                  Find someone travelling your way and send them a request.
                </p>

                <div className="mt-16">
                  <Button onClick={() => go('discover')}>
                    Discover commuters
                  </Button>
                </div>
              </div>
            )}

        </section>
      </div>

      <BottomNav page="tags" go={go} />
    </main>
  )
}



function Match({ go }) {
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [requestState, setRequestState] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('tag:selected-commute')

      if (!raw) {
        setLoading(false)
        setError('This match is no longer available.')
        return
      }

      const parsed = JSON.parse(raw)
      setSelected(parsed)
      setLoading(false)
    } catch (err) {
      console.error('Selected commute load failed:', err)
      setError('Could not open this match.')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!selected?.commute?.id) return

    const checkRequest = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from('commute_requests')
        .select('id,status')
        .eq('commute_id', selected.commute.id)
        .eq('requester_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (data?.status === 'pending') {
        setRequestState('pending')
      } else if (data?.status === 'accepted') {
        setRequestState('accepted')
      } else {
        setRequestState('idle')
      }
    }

    checkRequest()
  }, [selected])

  const sendRequest = async () => {
    if (
      !selected?.commute?.id ||
      requestState === 'pending' ||
      requestState === 'sending' ||
      requestState === 'accepted'
    ) return

    setRequestState('sending')
    setError('')

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError('Please sign in again.')
      setRequestState('idle')
      return
    }

    const targetCommute = selected.commute

    if (targetCommute.user_id === user.id) {
      setError('You cannot request your own commute.')
      setRequestState('idle')
      return
    }

    const {
      data: existingRequest,
      error: existingRequestError,
    } = await supabase
      .from('commute_requests')
      .select('id,status')
      .eq('commute_id', targetCommute.id)
      .eq('requester_id', user.id)
      .eq('target_user_id', targetCommute.user_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (existingRequestError) {
      setError(existingRequestError.message)
      setRequestState('idle')
      return
    }

    if (existingRequest?.status === 'pending') {
      setRequestState('pending')
      return
    }

    if (existingRequest?.status === 'accepted') {
      setRequestState('accepted')
      return
    }

    const { error: requestError } = await supabase
      .from('commute_requests')
      .insert({
        commute_id: targetCommute.id,
        requester_id: user.id,
        target_user_id: targetCommute.user_id,
        status: 'pending',
        message: 'I think our recurring journeys could work well together.',
      })

    if (requestError) {
      if (requestError.code === '23505') {
        setRequestState('pending')
      } else {
        setError(requestError.message)
        setRequestState('idle')
      }
      return
    }

    setRequestState('pending')
  }

  if (loading) {
    return (
      <main className="screen">
        <Header
          title="Journey match"
          back
          onBack={() => go('discover')}
        />
        <section className="section">
          <p className="t-body">Opening match…</p>
        </section>
      </main>
    )
  }

  if (error && !selected) {
    return (
      <main className="screen">
        <Header
          title="Journey match"
          back
          onBack={() => go('discover')}
        />
        <section className="section">
          <p className="field-error-text">{error}</p>
          <div className="mt-16">
            <Button onClick={() => go('discover')}>
              Back to discover
            </Button>
          </div>
        </section>
      </main>
    )
  }

  const commute = selected?.commute ?? {}
  const profile = commute.profiles ?? {}
  const name = profile.display_name || 'Tag commuter'
  const score = selected?.match_score ?? 50

  return (
    <main className="screen">

      <Header
        title="Journey match"
        back
        onBack={() => go('discover')}
      />

      <div className="screen-scroll">
        <section className="section">

          <div className="match-hero">
            <Avatar
              name={name}
              src={profile.avatar_url}
              size="lg"
            />

            <div>
              <p className="t-small">
                {score}% ROUTE MATCH
              </p>

              <h1>{name}</h1>

              <p>
                {formatCommuteRoute(commute)}
              </p>
            </div>
          </div>

          <div className="match-card mt-24">

            <div className="match-row">
              <span>Journey</span>
              <strong>
                {formatCommuteRoute(commute)}
              </strong>
            </div>

            <div className="match-row">
              <span>Role</span>
              <strong>
                {commute.role === 'driver'
                  ? 'Driver'
                  : commute.role === 'rider'
                    ? 'Rider'
                    : 'Open to either'}
              </strong>
            </div>

            <div className="match-row">
              <span>Departure</span>
              <strong>
                {commute.departure_time
                  ? formatCommuteTime(commute.departure_time)
                  : 'Flexible'}
              </strong>
            </div>

            <div className="match-row">
              <span>Trust</span>
              <strong>Tag member</strong>
            </div>

          </div>

          {error && (
            <small className="field-error-text">
              {error}
            </small>
          )}

          <div className="stack-12 mt-24">

            {requestState === 'pending' ? (
              <Button disabled>
                Request sent
              </Button>
            ) : requestState === 'accepted' ? (
              <Button onClick={() => go('tags')}>
                Tag active
              </Button>
            ) : (
              <Button
                onClick={sendRequest}
                disabled={requestState === 'sending'}
              >
                {requestState === 'sending'
                  ? 'Sending…'
                  : 'Request to connect'}
              </Button>
            )}

            <Button
              variant="secondary"
              onClick={() => go('discover')}
            >
              Back to discover
            </Button>

          </div>

        </section>
      </div>
    </main>
  )
}



function Activity({ go }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadActivity = async () => {
      setLoading(true)
      setError('')

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        if (mounted) {
          setLoading(false)
          setError('Please sign in again.')
        }
        return
      }

      const [incoming, outgoing, connections] = await Promise.all([
        supabase
          .from('commute_requests')
          .select(`
            id,
            status,
            created_at,
            requester_id,
            requester:profiles!commute_requests_requester_id_fkey (
              display_name
            )
          `)
          .eq('target_user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20),

        supabase
          .from('commute_requests')
          .select(`
            id,
            status,
            created_at,
            target_user_id,
            target:profiles!commute_requests_target_user_id_fkey (
              display_name
            )
          `)
          .eq('requester_id', user.id)
          .order('created_at', { ascending: false })
          .limit(20),

        supabase
          .from('commute_connections')
          .select('id,status,created_at,user_a,user_b')
          .or(`user_a.eq.${user.id},user_b.eq.${user.id}`)
          .order('created_at', { ascending: false })
          .limit(20),
      ])

      if (!mounted) return

      if (incoming.error || outgoing.error || connections.error) {
        setError(
          incoming.error?.message ||
          outgoing.error?.message ||
          connections.error?.message ||
          'Could not load activity.'
        )
        setLoading(false)
        return
      }

      const activity = [
        ...(incoming.data ?? []).map(item => ({
          id: `incoming-${item.id}`,
          type: item.status === 'accepted'
            ? 'success'
            : item.status === 'pending'
              ? 'request'
              : 'neutral',
          title:
            item.status === 'accepted'
              ? 'Tag request accepted'
              : item.status === 'pending'
                ? 'New Tag request'
                : `Tag request ${item.status}`,
          body:
            item.status === 'accepted'
              ? `${item.requester?.display_name || 'A commuter'} is now connected with you.`
              : `${item.requester?.display_name || 'A commuter'} wants to connect for a recurring commute.`,
          created_at: item.created_at,
        })),

        ...(outgoing.data ?? []).map(item => ({
          id: `outgoing-${item.id}`,
          type: item.status === 'accepted'
            ? 'success'
            : item.status === 'pending'
              ? 'request'
              : 'neutral',
          title:
            item.status === 'accepted'
              ? 'Your Tag request was accepted'
              : item.status === 'pending'
                ? 'Tag request sent'
                : `Tag request ${item.status}`,
          body:
            item.status === 'accepted'
              ? `${item.target?.display_name || 'Your match'} accepted your commute request.`
              : `Your recurring commute request is ${item.status}.`,
          created_at: item.created_at,
        })),

        ...(connections.data ?? []).map(item => ({
          id: `connection-${item.id}`,
          type: 'connection',
          title: 'Recurring Tag active',
          body: 'You have an active recurring commute connection.',
          created_at: item.created_at,
        })),
      ]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 30)

      setItems(activity)
      setLoading(false)
    }

    loadActivity()

    return () => {
      mounted = false
    }
  }, [])

  const relativeTime = value => {
    const diff = Math.max(0, Date.now() - new Date(value).getTime())
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} min ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`

    const days = Math.floor(hours / 24)
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`

    return new Date(value).toLocaleDateString()
  }

  return (
    <main className="screen activity-screen">
      <Header title="Activity" />

      <div className="screen-scroll">
        <section className="section activity-section">
          <div className="activity-intro">
            <p className="activity-eyebrow">YOUR ACTIVITY</p>
            <h1 className="activity-title">Stay in the loop</h1>
            <p className="activity-subtitle">
              Requests, connections and recurring Tags in one place.
            </p>
          </div>

          {error && (
            <div className="activity-state activity-error">
              <Icon name="close" size={18} />
              <div>
                <strong>Couldn’t load activity</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="activity-state">
              <div className="activity-loading-dot" />
              <p>Loading your activity…</p>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="activity-empty">
              <div className="activity-empty-icon">
                <Icon name="activity" size={24} />
              </div>

              <h2>Nothing here yet</h2>
              <p>Your requests and recurring Tags will appear here.</p>

              <Button onClick={() => go('discover')}>
                Find a commuter
              </Button>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="activity-list">
              {items.map(item => (
                <article className="activity-item" key={item.id}>
                  <div className={`activity-item-icon activity-item-icon-${item.type}`}>
                    <Icon
                      name={
                        item.type === 'connection'
                          ? 'heart'
                          : item.type === 'success'
                            ? 'check'
                            : item.type === 'request'
                              ? 'tag'
                              : 'activity'
                      }
                      size={17}
                    />
                  </div>

                  <div className="activity-item-content">
                    <div className="activity-item-top">
                      <h2>{item.title}</h2>
                      <time>{relativeTime(item.created_at)}</time>
                    </div>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <BottomNav page="activity" go={go} />
    </main>
  )
}



function Profile({ go }) {
  const [profile, setProfile] = useState(null)
  const [commute, setCommute] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadProfile = async () => {
      setLoading(true)
      setError('')

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        if (mounted) {
          setLoading(false)
          setError('Please sign in again.')
        }
        return
      }

      const [profileResult, commuteResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('id, display_name, username, avatar_url, phone, bio, created_at')
          .eq('id', user.id)
          .maybeSingle(),

        supabase
          .from('commutes')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
      ])

      if (!mounted) return

      if (profileResult.error) {
        setError(profileResult.error.message)
      } else {
        setProfile(profileResult.data)
      }

      if (!commuteResult.error) {
        setCommute(commuteResult.data)
      }

      setLoading(false)
    }

    loadProfile()

    return () => {
      mounted = false
    }
  }, [])

  const name = profile?.display_name || 'Tag User'
  const bio = profile?.bio?.trim()
  const memberYear = profile?.created_at
    ? new Date(profile.created_at).getFullYear()
    : new Date().getFullYear()

  return (
    <main className="screen profile-screen">
      <Header
        title="Profile"
        back
        onBack={() => go('home')}
      />

      <div className="screen-scroll profile-scroll">
        <section className="profile-hero">
          <div className="profile-avatar-wrap">
            <Avatar
              name={name}
              src={profile?.avatar_url}
              size="lg"
            />
            <span className="profile-online-dot" />
          </div>

          <div className="profile-hero-copy">
            <p className="profile-eyebrow">YOUR TAG PROFILE</p>
            <h1 className="profile-name">
              {loading ? 'Loading…' : name}
            </h1>

            <p className="profile-bio">
              {loading
                ? 'Loading your profile'
                : bio || (
                    commute
                      ? formatCommuteRoute(commute)
                      : `Member since ${memberYear}`
                  )}
            </p>
          </div>
        </section>

        {error && (
          <section className="section compact">
            <div className="profile-error">
              <Icon name="close" size={17} />
              <span>{error}</span>
            </div>
          </section>
        )}

        <section className="section compact">
          <div className="profile-trust-card">
            <div className="profile-trust-copy">
              <p className="profile-card-label">TRUST</p>
              <p className="profile-card-title">New member</p>
              <p className="profile-card-subtitle">
                Keep showing up to build your Tag history.
              </p>
            </div>

            <div className="profile-trust-icon">
              <Icon name="shield" size={22} />
            </div>
          </div>
        </section>

        {commute && (
          <section className="section compact">
            <div className="profile-commute-card">
              <div className="profile-commute-head">
                <div>
                  <p className="profile-card-label">ACTIVE COMMUTE</p>
                  <h2>{formatCommuteRoute(commute)}</h2>
                </div>
                <span className="profile-active-pill">Active</span>
              </div>

              <div className="profile-commute-meta">
                <span>{commute.departure_time || 'Flexible'}</span>
                <span>•</span>
                <span>
                  {commute.role === 'driver'
                    ? 'Driver'
                    : commute.role === 'rider'
                      ? 'Rider'
                      : 'Either'}
                </span>
              </div>
            </div>
          </section>
        )}

        <section className="section profile-group">
          <p className="profile-group-title">ACCOUNT</p>
          <div className="profile-list">
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
          <p className="profile-group-title">JOURNEYS</p>
          <div className="profile-list">
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
          <p className="profile-group-title">MONEY & REWARDS</p>
          <div className="profile-list">
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
          <p className="profile-group-title">PREFERENCES</p>
          <div className="profile-list">
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
          <p className="profile-group-title">HELP</p>
          <div className="profile-list">
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
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const deleteAccount = async () => {
    if (!confirm || deleting) return

    setDeleting(true)
    setError('')

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        throw new Error(
          'Your session has expired. Please sign in again.'
        )
      }

      const { data, error: functionError } =
        await supabase.functions.invoke(
          'delete-account',
          {
            body: {},
          }
        )

      if (functionError) {
        throw new Error(functionError.message)
      }

      if (!data?.success) {
        throw new Error(
          data?.error ||
          'Account deletion failed.'
        )
      }

      await supabase.auth.signOut()

      sessionStorage.clear()
      localStorage.removeItem('tag:selected-commute')

      go('intro')
    } catch (error) {
      console.error('DELETE ACCOUNT FAILED:', error)

      setError(
        error?.message ||
        'Could not delete your account. Please try again.'
      )

      setDeleting(false)
    }
  }

  return (
    <main className="screen">
      <Header
        title="Delete Account"
        back
        onBack={() => go('settings')}
      />

      <div className="screen-scroll">
        <section className="section">
          <div className="batch7-danger">
            <div className="batch7-danger-icon">
              <Icon name="close" size={25} />
            </div>

            <p className="t-small">ACCOUNT</p>

            <h1>Delete your account?</h1>

            <p>
              This permanently deletes your Tag account and
              associated profile, commute, request and connection data.
            </p>
          </div>
        </section>

        <section className="section">
          <label className="batch7-confirm-row">
            <input
              type="checkbox"
              checked={confirm}
              onChange={e => setConfirm(e.target.checked)}
              disabled={deleting}
            />

            <span>
              I understand that this action cannot be undone.
            </span>
          </label>

          {error && (
            <small className="field-error-text mt-12">
              {error}
            </small>
          )}
        </section>

        <section className="section">
          <Button
            variant="secondary"
            onClick={deleteAccount}
            disabled={!confirm || deleting}
          >
            {deleting
              ? 'Deleting account…'
              : 'Delete account'}
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

        <Primary onClick={() => go('discover')}>
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
  const [session, setSession] = useState(undefined)
  const [profileReady, setProfileReady] = useState(false)

  const go = next => setPage(next)

  useEffect(() => {
    let mounted = true

    const syncProfileRoute = async currentSession => {
      if (!mounted) return

      if (!currentSession) {
        setSession(null)
        setProfileReady(true)
        setPage('intro')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id,onboarding_completed')
        .eq('id', currentSession.user.id)
        .maybeSingle()

      if (!mounted) return

      setSession(currentSession)

      if (error) {
        console.error('Profile lookup failed:', error)
        setProfileReady(true)
        setPage('profile-setup')
        return
      }

      if (!data || !data.onboarding_completed) {
        setPage('profile-setup')
      } else {
        setPage('home')
      }

      setProfileReady(true)
    }

    const bootstrapAuth = async () => {
      try {
        /*
         * OAuth callbacks can briefly arrive before the auth state
         * listener has emitted the final session. Do not route to
         * intro while an OAuth callback is still being processed.
         */
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')

        if (code) {
          const { data, error } =
            await supabase.auth.exchangeCodeForSession(code)

          if (error) {
            console.error('OAuth code exchange failed:', error)
            if (mounted) {
              setSession(null)
              setProfileReady(true)
              setPage('intro')
            }
            return
          }

          if (data.session) {
            window.history.replaceState(
              {},
              document.title,
              url.pathname + url.hash
            )

            await syncProfileRoute(data.session)
            return
          }
        }

        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession()

        if (!mounted) return

        if (error) {
          console.error('Session lookup failed:', error)
          setSession(null)
          setProfileReady(true)
          setPage('intro')
          return
        }

        await syncProfileRoute(currentSession ?? null)
      } catch (error) {
        console.error('Auth bootstrap failed:', error)

        if (mounted) {
          setSession(null)
          setProfileReady(true)
          setPage('intro')
        }
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return

      /*
       * Ignore a transient null event while an OAuth callback URL
       * is present. bootstrapAuth() owns that callback.
       */
      const hasOAuthCode =
        new URL(window.location.href).searchParams.has('code')

      if (!nextSession && hasOAuthCode) return

      if (nextSession) {
        setSession(nextSession)

        setTimeout(() => {
          if (mounted) {
            syncProfileRoute(nextSession)
          }
        }, 0)

        return
      }

      setSession(null)
      setProfileReady(true)
      setPage('intro')
    })

    bootstrapAuth()

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])


  if (session === undefined || !profileReady) {
    return (
      <main className="screen">
        <section className="section">
          <div className="stack-24">
            <Logo />
            <div>
              <h2 className="t-title">Loading Tag…</h2>
              <p className="t-body mt-8">
                Getting your account ready.
              </p>
            </div>
          </div>
        </section>
      </main>
    )
  }

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
      screen = <Home go={go} />
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
      screen = <Home go={go} />
      break
    case 'cancelled':
      screen = <Home go={go} />
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
