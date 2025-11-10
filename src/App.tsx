import React, { useState } from 'react'
import Tracks from './components/Tracks'
import Scholarships from './components/Scholarships'
import ClubsEvents from './components/ClubsEvents'
import CoursesPlanner from './components/CoursesPlanner'
import { ciFlags } from './config/ciFlags'

export default function App() {
  const [tab, setTab] = useState<'courses'|'scholarships'|'clubs'>('courses')

  return (
    <div className={ciFlags.uiRedesign ? "app ui" : "app"}>
      <header>
        <h1>BYU Computer Science Explorer</h1>
        <nav className="tabbar">
          <button
            className="tab"
            onClick={() => setTab('courses')}
            aria-current={tab === 'courses' ? 'page' : undefined}
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
        {tab === 'courses' && <CoursesPlanner />}
        {tab === 'scholarships' && <Scholarships />}
        {tab === 'clubs' && <ClubsEvents />}
      </main>

      <footer>Built for BYU CS students — data sourced from cs.byu.edu and BYU Catalog</footer>
    </div>
  )
}
