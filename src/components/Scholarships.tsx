import React from 'react'
import { scholarships } from '../data/scholarships'
import { ciFlags } from '../config/ciFlags'

export default function Scholarships() {
  return (
    <div className="container">
      <h2>Scholarships</h2>
      <p>Apply to scholarships through the BYU CS scholarship portal.</p>
      <div style={{ marginBottom: 12 }}>
        <button
          className={ciFlags.uiRedesign ? "btn-primary" : "scholarship-apply"}
          onClick={() => window.open('https://cs.byu.edu/scholarships/applications/student/list/', '_blank')}
        >
          Apply to all scholarships
        </button>
      </div>
      {scholarships.map(s => (
        <div key={s.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>{s.name}</h3>
            {ciFlags.showScholarshipApplyNow && s.applyUrl && (
              <button
                className={ciFlags.uiRedesign ? "btn-primary" : ""}
                onClick={() => window.open(s.applyUrl, '_blank')}
                style={{ fontSize: 14 }}
              >
                Apply Now
              </button>
            )}
          </div>
          <p>{s.description}</p>
          {s.minGPA && (
            <p style={{ fontSize: 14, color: '#6b7280' }}>
              <strong>Minimum GPA:</strong> {s.minGPA}
            </p>
          )}
          {ciFlags.showScholarshipApplyNow && !s.applyUrl && (
            <p style={{ fontSize: 13, color: '#9ca3af', fontStyle: 'italic' }}>Application link pending</p>
          )}
        </div>
      ))}
    </div>
  )
}
