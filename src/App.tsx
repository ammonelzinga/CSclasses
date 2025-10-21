import React, { useState } from 'react'
import Tracks from './components/Tracks'
import Scholarships from './components/Scholarships'
import ClubsEvents from './components/ClubsEvents'
import Planner from './components/Planner'
import { ciFlags } from './config/ciFlags'

export default function App() {
  const [tab, setTab] = useState<'tracks'|'scholarships'|'clubs'|'planner'>('planner')

  return (
    <div className={ciFlags.uiRedesign ? "app ui" : "app"}>
      <header>
        <h1>BYU Computer Science Explorer</h1>
        <nav className="tabbar">
          <button
            className="tab"
            onClick={() => setTab('planner')}
            aria-current={tab === 'planner' ? 'page' : undefined}
          >
            Planner
          </button>
          <button
            className="tab"
            onClick={() => setTab('tracks')}
            aria-current={tab === 'tracks' ? 'page' : undefined}
          >
            Courses
          </button>
          <button
            className="tab"
            onClick={() => setTab('scholarships')}
            aria-current={tab === 'scholarships' ? 'page' : undefined}
          >
            Scholarships
          </button>
          <button
            className="tab"
            onClick={() => setTab('clubs')}
            aria-current={tab === 'clubs' ? 'page' : undefined}
          >
            Clubs & Events
          </button>
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
