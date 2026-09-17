import { useState } from 'react'
import './index.css'

const people = [
  {
    name: 'Aarav',
    age: 22,
    route: 'Patna → Delhi',
    time: 'Tomorrow · 7:30 AM',
    rating: '4.9',
    verified: true,
  },
  {
    name: 'Ananya',
    age: 21,
    route: 'Patna → Delhi',
    time: 'Tomorrow · 8:00 AM',
    rating: '4.8',
    verified: true,
  },
  {
    name: 'Rohan',
    age: 24,
    route: 'Patna → Noida',
    time: 'Friday · 6:45 AM',
    rating: '4.7',
    verified: false,
  },
]

function App() {
  const [tab, setTab] = useState('home')

  return (
    <div className="app-shell">
      <div className="app-screen">

        <header className="topbar">
          <button className="icon-button" aria-label="Open menu">
            <span className="hamburger">
              <i />
              <i />
              <i />
            </span>
          </button>

          <div className="brand">tag</div>

          <button
            className="icon-button notification-button"
            aria-label="Notifications"
          >
            <span className="bell">♧</span>
            <span className="notification-dot" />
          </button>
        </header>

        <main className="home-content">

          <section className="intro">
            <p className="eyebrow">WELCOME BACK</p>
            <h1>Find your people.<br />Make the journey together.</h1>
            <p className="intro-copy">
              Discover people travelling your way and create a trusted connection before you go.
            </p>
          </section>

          <section className="search-card">
            <div className="field">
              <div className="field-icon origin-icon">
                <span />
              </div>
              <div className="field-content">
                <span className="field-label">FROM</span>
                <strong>Patna</strong>
              </div>
            </div>

            <div className="route-line">
              <span />
            </div>

            <div className="field">
              <div className="field-icon destination-icon">
                <span />
              </div>
              <div className="field-content">
                <span className="field-label">TO</span>
                <strong>Where are you going?</strong>
              </div>
            </div>

            <button className="primary-button">
              Find people
            </button>
          </section>

          <section className="quick-section">
            <div className="section-heading">
              <h2>Start with</h2>
              <button>View all</button>
            </div>

            <div className="quick-grid">
              <button className="quick-card">
                <span className="quick-icon route-icon">
                  ↗
                </span>
                <span>
                  <strong>My journey</strong>
                  <small>Create a trip</small>
                </span>
              </button>

              <button className="quick-card">
                <span className="quick-icon people-icon">
                  ••
                </span>
                <span>
                  <strong>Discover</strong>
                  <small>Find people</small>
                </span>
              </button>
            </div>
          </section>

          <section className="matches-section">
            <div className="section-heading">
              <div>
                <p className="section-kicker">NEAR YOUR ROUTE</p>
                <h2>People you may match with</h2>
              </div>
              <button>See all</button>
            </div>

            <div className="match-list">
              {people.map((person) => (
                <article className="match-card" key={person.name}>
                  <div className="avatar">
                    {person.name[0]}
                  </div>

                  <div className="match-main">
                    <div className="match-name">
                      <strong>{person.name}, {person.age}</strong>
                      {person.verified && (
                        <span className="verified">✓</span>
                      )}
                    </div>

                    <p>{person.route}</p>
                    <small>{person.time}</small>
                  </div>

                  <div className="rating">
                    <span>★</span>
                    {person.rating}
                  </div>
                </article>
              ))}
            </div>
          </section>

        </main>

        <nav className="bottom-nav">
          <button
            className={tab === 'home' ? 'active' : ''}
            onClick={() => setTab('home')}
          >
            <span>⌂</span>
            Home
          </button>

          <button
            className={tab === 'discover' ? 'active' : ''}
            onClick={() => setTab('discover')}
          >
            <span>⌕</span>
            Discover
          </button>

          <button
            className={tab === 'tags' ? 'active' : ''}
            onClick={() => setTab('tags')}
          >
            <span>◇</span>
            Tags
          </button>

          <button
            className={tab === 'profile' ? 'active' : ''}
            onClick={() => setTab('profile')}
          >
            <span>○</span>
            Profile
          </button>
        </nav>

      </div>
    </div>
  )
}

export default App
