import { useState } from 'react'
import './index.css'

const savedPlaces = [
  { icon: '⌂', label: 'Home' },
  { icon: '▣', label: 'College' },
  { icon: '⌖', label: 'Work' },
]

const people = [
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

function MapBackground() {
  return (
    <div className="map">
      <div className="map-grid" />

      <div className="road road-a" />
      <div className="road road-b" />
      <div className="road road-c" />
      <div className="road road-d" />
      <div className="road road-e" />

      <span className="street s1">Fraser Road</span>
      <span className="street s2">Bailey Road</span>
      <span className="street s3">Station Road</span>
      <span className="street s4">Exhibition Road</span>

      <div className="map-water" />

      <div className="map-car car-one">●</div>
      <div className="map-car car-two">●</div>
      <div className="map-car car-three">●</div>

      <div className="current-location">
        <span className="location-ring" />
        <span className="location-core" />
      </div>

      <button className="map-location" aria-label="Current location">
        ⌖
      </button>
    </div>
  )
}

function App() {
  const [active, setActive] = useState('home')
  const [destination, setDestination] = useState('')

  return (
    <div className="viewport">
      <div className="screen">

        <MapBackground />

        <header className="floating-header">
          <button className="floating-button menu-button" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>

          <div className="brand">
            <span>tag</span>
          </div>

          <button
            className="floating-button notification-button"
            aria-label="Notifications"
          >
            <span className="bell">♢</span>
            <i />
          </button>
        </header>

        <div className="map-label">
          <span className="map-label-dot" />
          Patna
        </div>

        <section className="bottom-sheet">

          <div className="sheet-handle" />

          <div className="sheet-heading">
            <div>
              <span className="eyebrow">YOUR JOURNEY</span>
              <h1>Where are you going?</h1>
            </div>

            <button className="sheet-action" aria-label="Search">
              ⌕
            </button>
          </div>

          <div className="saved-places">
            {savedPlaces.map((place) => (
              <button
                className="place-chip"
                key={place.label}
                onClick={() => setDestination(place.label)}
              >
                <span>{place.icon}</span>
                {place.label}
              </button>
            ))}
          </div>

          <button className="destination-input">
            <span className="destination-icon">
              <i />
            </span>

            <span className={destination ? 'destination-value' : 'destination-placeholder'}>
              {destination || 'Where do you want to go?'}
            </span>

            <span className="destination-arrow">›</span>
          </button>

          <div className="sheet-divider" />

          <div className="nearby-header">
            <div>
              <span className="eyebrow">NEAR YOUR ROUTE</span>
              <h2>People travelling nearby</h2>
            </div>

            <button className="see-all">See all</button>
          </div>

          <div className="people-row">
            {people.map((person) => (
              <button className="person-card" key={person.name}>
                <div className="person-avatar">
                  {person.name[0]}
                </div>

                <div className="person-copy">
                  <strong>{person.name}, {person.age}</strong>
                  <span>{person.time}</span>
                </div>

                <span className="person-rating">
                  ★ {person.rating}
                </span>
              </button>
            ))}
          </div>

        </section>

        <nav className="bottom-nav">

          {[
            ['home', '⌂', 'Home'],
            ['discover', '⌕', 'Discover'],
            ['tags', '◇', 'Tags'],
            ['activity', '◷', 'Activity'],
            ['profile', '○', 'Profile'],
          ].map(([id, icon, label]) => (
            <button
              key={id}
              className={active === id ? 'active' : ''}
              onClick={() => setActive(id)}
            >
              <span className="nav-icon">{icon}</span>
              <small>{label}</small>
            </button>
          ))}

        </nav>

      </div>
    </div>
  )
}

export default App
