import React from 'react'

const clubs = [
  { id: 'byucs', name: 'BYU Computer Science Club', desc: 'Student-run club for CS majors and enthusiasts.' },
  { id: 'gamedev', name: 'BYU Game Dev', desc: 'Focus on game jams, projects, and portfolios.' }
]

const events = [
  { id: 'hackathon', name: 'Homecoming Hackathon', date: 'Oct 17-18' },
  { id: 'labtour', name: 'Computer Science Lab Tours', date: 'Oct 22' }
]

export default function ClubsEvents() {
  return (
    <div className="container">
      <h2>Clubs</h2>
      {clubs.map(c => (
        <div key={c.id} className="card">
          <h3>{c.name}</h3>
          <p>{c.desc}</p>
        </div>
      ))}

      <h2>Upcoming Events</h2>
      {events.map(e => (
        <div key={e.id} className="card">
          <strong>{e.name}</strong>
          <p>{e.date}</p>
        </div>
      ))}
    </div>
  )
}
