import { useState } from 'react'
import './index.css'

const matches = [
  {
    name: 'Aarav Sharma',
    age: 22,
    route: 'Patna → New Delhi',
    time: 'Tomorrow · 7:30 AM',
    rating: '4.9',
  },
  {
    name: 'Ananya Singh',
    age: 21,
    route: 'Patna → New Delhi',
    time: 'Tomorrow · 8:00 AM',
    rating: '4.8',
  },
]

function App() {
  const [active, setActive] = useState('home')

  return (
    <div className="viewport">
      <div className="screen">

        <header className="header">
          <button className="header-btn" aria-label="Menu">
            <span className="menu-lines">
              <i />
              <i />
              <i />
            </span>
          </button>

          <div className="logo">tag</div>

          <button className="header-btn notification" aria-label="Notifications">
            <span className="notification-icon">♢</span>
            <b />
          </button>
        </header>

        <main>

          <section className="hero">
            <span className="label">YOUR JOURNEY</span>
            <h1>Find people.<br />Go together.</h1>
            <p>
              Connect with verified people travelling your way.
            </p>
          </section>

          <section className="journey-card">

            <div className="location-row">
              <div className="location-mark origin">
                <span />
              </div>

              <div className="location-text">
                <small>FROM</small>
                <strong>Patna</strong>
              </div>
            </div>

            <div className="connector">
              <span />
            </div>

            <div className="location-row">
              <div className="location-mark destination">
                <span />
              </div>

              <div className="location-text">
                <small>TO</small>
                <strong className="placeholder">
                  Where are you going?
                </strong>
              </div>
            </div>

            <div className="journey-options">
              <button>
                <span>◷</span>
                <div>
                  <small>DATE</small>
                  <strong>Any date</strong>
                </div>
              </button>

              <button>
                <span>◎</span>
                <div>
                  <small>PEOPLE</small>
                  <strong>Anyone</strong>
                </div>
              </button>
            </div>

            <button className="find-button">
              Find people
            </button>

          </section>

          <section className="section quick-section">
            <div className="section-head">
              <h2>Quick start</h2>
              <button>See all</button>
            </div>

            <div className="quick-row">

              <button className="quick-card">
                <span className="quick-symbol">＋</span>
                <div>
                  <strong>Create a journey</strong>
                  <small>Tell people where you're going</small>
                </div>
              </button>

              <button className="quick-card">
                <span className="quick-symbol">⌕</span>
                <div>
                  <strong>Discover</strong>
                  <small>Find people near your route</small>
                </div>
              </button>

            </div>
          </section>

          <section className="section">
            <div className="section-head">
              <div>
                <span className="label">RECOMMENDED</span>
                <h2>People near your route</h2>
              </div>

              <button>View all</button>
            </div>

            <div className="people">

              {matches.map((person) => (
                <article className="person" key={person.name}>

                  <div className="avatar">
                    {person.name.charAt(0)}
                  </div>

                  <div className="person-info">
                    <div className="person-title">
                      <strong>
                        {person.name}, {person.age}
                      </strong>
                      <span className="check">✓</span>
                    </div>

                    <p>{person.route}</p>
                    <small>{person.time}</small>
                  </div>

                  <div className="person-rating">
                    <span>★</span>
                    {person.rating}
                  </div>

                </article>
              ))}

            </div>
          </section>

        </main>

        <nav className="bottom-nav">

          {[
            ['home', '⌂', 'Home'],
            ['discover', '⌕', 'Discover'],
            ['tags', '◇', 'Tags'],
            ['profile', '○', 'Profile'],
          ].map(([id, icon, text]) => (
            <button
              key={id}
              className={active === id ? 'selected' : ''}
              onClick={() => setActive(id)}
            >
              <span>{icon}</span>
              <small>{text}</small>
            </button>
          ))}

        </nav>

      </div>
    </div>
  )
}

export default App
