import React from 'react'
import { scholarships } from '../data/scholarships'

export default function Scholarships() {
  return (
    <div className="container">
      <h2>Scholarships</h2>
      <p>Apply to scholarships through the BYU CS scholarship portal.</p>
      <div style={{ marginBottom: 12 }}>
        <button className="scholarship-apply" onClick={() => window.open('https://cs.byu.edu/scholarships/applications/student/list/', '_blank')}>Apply to all scholarships</button>
      </div>
      {scholarships.map(s => (
        <div key={s.id} className="card">
          <h3>{s.name}</h3>
          <p>{s.description}</p>
          {s.minGPA && <p><strong>Minimum GPA:</strong> {s.minGPA}</p>}
        </div>
      ))}
    </div>
  )
}
