import React from 'react'
import { ciFlags } from '../config/ciFlags'

const clubs = [
  { id: 'byucs', name: 'BYU Computer Science Club', desc: 'Student-run club for CS majors and enthusiasts.' },
  { id: 'gamedev', name: 'BYU Game Dev', desc: 'Focus on game jams, projects, and portfolios.' }
]

const events = [
  {
    id: 'hackathon2025',
    title: 'Hackathon 2025',
    datetime: 'Feb 10',
    summary: '24-hour coding event',
    url: 'https://cs.byu.edu/events/hackathon'
  },
  {
    id: 'ai-seminar',
    title: 'AI Seminar',
    datetime: 'Mar 3',
    summary: 'Guest lecture on LLMs',
    url: 'https://cs.byu.edu/events/ai-seminar'
  }
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
          {ciFlags.enableEventLinks ? (
            <a
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <strong style={{ color: '#0ea5e9', cursor: 'pointer' }}>{e.title}</strong>
            </a>
          ) : (
            <strong>{e.title}</strong>
          )}
          <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>{e.datetime}</div>
          <p style={{ marginTop: 8 }}>{e.summary}</p>
        </div>
      ))}
    </div>
  )
}
