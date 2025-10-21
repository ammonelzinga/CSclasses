import React, { useState } from 'react'
import Tracks from './components/Tracks'
import Scholarships from './components/Scholarships'
import ClubsEvents from './components/ClubsEvents'
import Planner from './components/Planner'

export default function App() {
  const [tab, setTab] = useState<'tracks'|'scholarships'|'clubs'|'planner'>('planner')

  return (
    <div className="app">
      <header>
        <h1>BYU Computer Science Explorer</h1>
        <nav>
          <button onClick={() => setTab('planner')}>Planner</button>
          <button onClick={() => setTab('tracks')}>Courses</button>
          <button onClick={() => setTab('scholarships')}>Scholarships</button>
          <button onClick={() => setTab('clubs')}>Clubs & Events</button>
        </nav>
      </header>

      <main>
  {tab === 'tracks' && <Tracks />}
  {tab === 'scholarships' && <Scholarships />}
  {tab === 'clubs' && <ClubsEvents />}
  {tab === 'planner' && <Planner />}
      </main>

      <footer>Built for BYU CS students — data sourced from cs.byu.edu and BYU Catalog</footer>
    </div>
  )
}
