import React, { useState, useMemo } from 'react'
import { tracks } from '../data/tracks'
import { courses } from '../data/courses'

export default function Tracks() {
  const [viewAll, setViewAll] = useState(true)
  const [viewMode, setViewMode] = useState<'list'|'grid'>('list')
  const [query, setQuery] = useState('')
  const [prefix, setPrefix] = useState('')
  const [level, setLevel] = useState('')

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase()
    return courses.filter(c => {
      if(prefix){
        const p = c.code.split(' ')[0]
        if(p !== prefix) return false
      }
      if(level){
        const num = parseInt(c.code.split(' ')[1] || '0', 10)
        const lvl = Math.floor(num / 100) * 100
        if(String(lvl) !== level) return false
      }
      if(!q) return true
      return (c.code + ' ' + c.title + ' ' + c.description).toLowerCase().includes(q)
    })
  }, [query, prefix, level])

  return (
    <div className="container">
      <h2>Courses</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setViewAll(false)}>Tracks</button>
        <button onClick={() => setViewAll(true)} style={{ marginLeft: 8 }}>All Courses</button>
        {viewAll && (
          <span style={{ marginLeft: 16 }}>
            View: <button disabled={viewMode==='list'} onClick={() => setViewMode('list')}>List</button>
            <button disabled={viewMode==='grid'} onClick={() => setViewMode('grid')} style={{ marginLeft: 8 }}>Grid</button>
          </span>
        )}
      </div>

      {!viewAll && tracks.map(t => (
        <div key={t.id} className="card">
          <h3>{t.name}</h3>
          <p>{t.description}</p>
          <strong>Required courses</strong>
          <ul>
            {t.requiredCourses.map(c => (
              <li key={c.code}>{c.code} — {c.title}</li>
            ))}
          </ul>
          {t.electives && (
            <>
              <strong>Electives</strong>
              <ul>
                {t.electives.map(e => <li key={e.code}>{e.code} — {e.title}</li>)}
              </ul>
            </>
          )}
        </div>
      ))}

      {viewAll && (
        <div>
          <h2>All Courses</h2>
          <div style={{ marginBottom: 12 }}>
            <input placeholder="Search by code or title" onChange={e => setQuery(e.target.value)} />
            <select onChange={e => setPrefix(e.target.value)} style={{ marginLeft:8 }}>
              <option value="">All subjects</option>
              {Array.from(new Set(courses.map(c => c.code.split(' ')[0]))).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select onChange={e => setLevel(e.target.value)} style={{ marginLeft:8 }}>
              <option value="">All levels</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
            </select>
          </div>

          {viewMode === 'list' && filteredCourses.map(c => (
            <div key={c.code} className="card">
              <strong>{c.code} — {c.title}</strong>
              <p>{c.description}</p>
            </div>
          ))}

          {viewMode === 'grid' && (
            <div>
              {Array.from(new Set(filteredCourses.map(c => Math.floor(parseInt(c.code.split(' ')[1] || '0', 10) / 100) * 100)))
                .sort((a,b) => a-b)
                .map(lvl => {
                  const levelCourses = filteredCourses.filter(c => Math.floor(parseInt(c.code.split(' ')[1] || '0', 10) / 100) * 100 === lvl)
                  if(levelCourses.length === 0) return null
                  return (
                    <div key={lvl} className="level-section">
                      <h3>{lvl} Level</h3>
                      <div className="courses-grid">
                        {levelCourses.map(c => (
                          <div key={c.code} className="card course-card compact">
                            <strong>{c.code}</strong>
                            <div>{c.title}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
