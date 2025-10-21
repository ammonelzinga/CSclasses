import React, { useState, useMemo } from 'react'
import { tracks } from '../data/tracks'
import { courses } from '../data/courses'
import { ciFlags } from '../config/ciFlags'
import { catalogCourseUrl } from '../utils/externalLinks'

export default function Tracks() {
  const [viewAll, setViewAll] = useState(true)
  const [viewMode, setViewMode] = useState<'list'|'grid'>('list')
  const [query, setQuery] = useState('')
  const [prefix, setPrefix] = useState('')
  const [level, setLevel] = useState('')
  const [interestFilter, setInterestFilter] = useState('')

  const getCourseLevel = (code: string) => {
    const num = parseInt(code.split(' ')[1] || '0', 10)
    return Math.floor(num / 100) * 100
  }

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase()
    const interest = interestFilter.trim().toLowerCase()
    return courses.filter(c => {
      if(prefix){
        const p = c.code.split(' ')[0]
        if(p !== prefix) return false
      }
      if(level){
        const lvl = getCourseLevel(c.code)
        if(String(lvl) !== level) return false
      }
      if(interest){
        const searchText = (c.code + ' ' + c.title + ' ' + c.description).toLowerCase()
        if(!searchText.includes(interest)) return false
      }
      if(!q) return true
      return (c.code + ' ' + c.title + ' ' + c.description).toLowerCase().includes(q)
    })
  }, [query, prefix, level, interestFilter])

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
            <input placeholder="Search by code or title" onChange={e => setQuery(e.target.value)} className={ciFlags.uiRedesign ? "input" : ""} />
            {ciFlags.showInterestFilter && (
              <div style={{ marginTop: 12 }}>
                <input
                  placeholder="Filter by interest (graphics, AI, data, systems…)"
                  onChange={e => setInterestFilter(e.target.value)}
                  className={ciFlags.uiRedesign ? "input" : ""}
                />
              </div>
            )}
            <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <select onChange={e => setPrefix(e.target.value)}>
                <option value="">All subjects</option>
                {Array.from(new Set(courses.map(c => c.code.split(' ')[0]))).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <select onChange={e => setLevel(e.target.value)}>
                <option value="">All levels</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
              </select>
            </div>
          </div>

          {viewMode === 'list' && filteredCourses.map(c => {
            const courseLevel = getCourseLevel(c.code)
            const requires240Test = courseLevel >= 300 && c.code.startsWith('CS')
            return (
              <div key={c.code} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <strong>{c.code} — {c.title}</strong>
                    {ciFlags.showPrereq240Note && requires240Test && (
                      <span className="badge">CS 240 Test Required</span>
                    )}
                    <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
                      Level {courseLevel} • {c.credits || 3} credits
                    </div>
                  </div>
                  {ciFlags.showCatalogLinks && (
                    <button
                      className={ciFlags.uiRedesign ? "btn-secondary" : ""}
                      onClick={() => window.open(catalogCourseUrl(c.code), '_blank')}
                      style={{ fontSize: 13 }}
                    >
                      Open in Catalog
                    </button>
                  )}
                </div>
                <p style={{ margin: 0, color: '#374151' }}>{c.description}</p>
              </div>
            )
          })}

          {viewMode === 'grid' && (
            <div>
              {Array.from(new Set(filteredCourses.map(c => getCourseLevel(c.code))))
                .sort((a,b) => a-b)
                .map(lvl => {
                  const levelCourses = filteredCourses.filter(c => getCourseLevel(c.code) === lvl)
                  if(levelCourses.length === 0) return null
                  return (
                    <div key={lvl} className="level-section">
                      <h3>{lvl} Level</h3>
                      <div className="courses-grid">
                        {levelCourses.map(c => {
                          const requires240Test = lvl >= 300 && c.code.startsWith('CS')
                          return (
                            <div key={c.code} className="card course-card compact">
                              <strong>{c.code}</strong>
                              {ciFlags.showPrereq240Note && requires240Test && (
                                <span className="badge" style={{ display: 'block', marginTop: 4 }}>CS 240 Test</span>
                              )}
                              <div>{c.title}</div>
                              {ciFlags.showCatalogLinks && (
                                <button
                                  className={ciFlags.uiRedesign ? "btn-secondary" : ""}
                                  onClick={() => window.open(catalogCourseUrl(c.code), '_blank')}
                                  style={{ fontSize: 12, marginTop: 8, width: '100%' }}
                                >
                                  Catalog
                                </button>
                              )}
                            </div>
                          )
                        })}
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
