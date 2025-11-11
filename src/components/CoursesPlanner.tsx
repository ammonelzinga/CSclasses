import React, { useEffect, useMemo, useState } from 'react'
import { courses, CourseFull } from '../data/courses'
import { categories, categorizeCourse } from '../data/categories'
import { requirementGroups, bioRequirementGroups } from '../data/requirements'

type Semester = { id: string; name: string; courses: string[] }
const STORAGE_KEY = 'byu-cs-planner'
function uid(){ return Math.random().toString(36).slice(2,9) }

// Emphasis mapping helpers
// 1) Which courses to HIGHLIGHT in the list for each emphasis (visual focus only)
const emphasisHighlightCodes: Record<string,string[]> = {
  'animation-games': ['CS 355','CS 455','CSANM 340','CSANM 342','CSANM 459','CSANM 460'],
  'software-engineering': ['CS 329','CS 428','CS 480','CS 481'],
  'machine-learning': ['CS 270','CS 470','CS 472','CS 473','CS 474','CS 479'],
  // Bioinformatics: highlight core BIO/MMBIO/PWS courses unique to the emphasis
  'bioinformatics': ['BIO 130','BIO 165','BIO 264','BIO 364','BIO 465','MMBIO 240','PWS 340']
}

// 2) Which courses to seed into the planner when applying an emphasis plan
const emphasisPlanCodes: Record<string,string[]> = {
  'animation-games': ['CS 142','CS 111','CS 235','DESAN 101','CSANM 150','CS 236','CS 224','CS 240','CS 312','CS 330','CS 355','CSANM 340','CS 455','CSANM 342','CSANM 459','CS 324','CSANM 460','CS 404'],
  'software-engineering': ['CS 142','CS 111','CS 235','CS 236','CS 224','CS 240','CS 312','CS 330','CS 329','CS 340','CS 428','CS 480','CS 481','CS 404'],
  'machine-learning': ['CS 142','CS 111','CS 235','CS 236','CS 224','CS 240','CS 312','CS 330','CS 270','CS 470','CS 472','CS 473','CS 474','CS 404'],
  // Bioinformatics full requirements (defaults chosen for options):
  // Req1 CS core (10) + Req2 BIO core (7) + Req3 Supporting (5) + Req4 choose BIO 420 + Req5 choose CS 473 + Req6 pick 12 hours default
  'bioinformatics': [
    // Req1 — CS core (10)
    'CS 111','CS 191','CS 224','CS 235','CS 236','CS 240','CS 270','CS 291','CS 312','CS 404',
    // Req2 — Biology core (7)
    'BIO 130','BIO 165','BIO 264','BIO 364','BIO 465','MMBIO 240','PWS 340',
    // Req3 — Supporting (5)
    'CHEM 105','MATH 112','MATH 213','MATH 215','WRTG 316',
    // Req4 — choose 1
    'BIO 420',
    // Req5 — choose 1
    'CS 473',
    // Req6 — 12 hours default selection (4x3.0)
    'BIO 463','CS 452','CS 453','CS 470'
  ]
}

// RequirementSection component
type CourseListType = CourseFull[]

function RequirementSection({ id, name, courses: courseList, expanded, toggle, highlightSet, onDragCourseStart }: {
  id: string; name: string; courses: CourseListType; expanded: boolean; toggle: (id:string)=>void; highlightSet: Set<string>; onDragCourseStart: (ev: React.DragEvent, code: string) => void
}){
  return (
    <div className="req-section">
      <button className="req-header" onClick={() => toggle(id)} aria-expanded={expanded}>
        <span>{name}</span>
        <span className="chevron">{expanded ? '▾' : '▸'}</span>
      </button>
      <div className={`req-body ${expanded ? 'open' : ''}`}> 
        {expanded && (
          <div className="course-group">
            {courseList.map((c: CourseFull) => {
              const emphasized = highlightSet.has(c.code)
              const credits = c.credits ?? 3
              return (
                <details
                  key={c.code}
                  className={`course-card ${emphasized ? 'emphasis' : ''}`}
                  onToggle={(e) => {
                    const el = e.currentTarget
                    // Determine row by vertical midpoint and affect all details whose midpoint matches within threshold
                    const rect = el.getBoundingClientRect()
                    const midY = rect.top + rect.height/2
                    const parent = el.parentElement
                    if(!parent) return
                    const threshold = 18 // px tolerance for same row
                    const siblings = Array.from(parent.querySelectorAll('details.course-card')) as HTMLDetailsElement[]
                    siblings.forEach(sib => {
                      if(sib === el) return
                      const r = sib.getBoundingClientRect()
                      const sibMid = r.top + r.height/2
                      if(Math.abs(sibMid - midY) <= threshold){
                        sib.open = el.open
                      }
                    })
                  }}
                >
                  <summary className="course-top" aria-label={`Toggle details for ${c.code} ${c.title}`}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, flex:1 }}>
                      <strong>{c.code}</strong>
                      <span className="title">{c.title}</span>
                    </div>
                    <div className="meta" style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span>{credits}</span>
                      <button
                        className="drag-handle"
                        title="Drag to planner"
                        aria-label={`Drag ${c.code} to planner`}
                        draggable
                        onDragStart={(e) => onDragCourseStart(e, c.code)}
                        onClick={(e) => e.preventDefault()}
                        style={{ cursor:'grab' }}
                      >⠿</button>
                    </div>
                  </summary>
                  <div className="course-desc" style={{ padding:'6px 8px 10px', color:'#333', lineHeight:1.4 }}>
                    {c.description || 'Description coming soon.'}
                  </div>
                </details>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// Planner sidebar component
function PlannerSidebar({ semesters, setSemesters, close, onDropToSemester, emphasis, setEmphasis, applyPreset }: {
  semesters: Semester[]; setSemesters: React.Dispatch<React.SetStateAction<Semester[]>>; close: ()=>void; onDropToSemester: (ev: React.DragEvent, semId: string) => void; emphasis: string; setEmphasis: (v: string) => void; applyPreset: ()=>void
}){
  function removeCourse(semId: string, code: string){
    setSemesters(s => s.map(sem => sem.id === semId ? { ...sem, courses: sem.courses.filter(c => c !== code) } : sem))
  }
  const totalCredits = semesters.reduce((acc,sem)=> acc + sem.courses.reduce((a,code)=> a + (courses.find(c=>c.code===code)?.credits ?? 3),0),0)
  return (
    <aside className="planner-sidebar" aria-label="Planner">
      <div className="sidebar-header">
        <h3>My Plan</h3>
        <button onClick={close} className="close-btn" aria-label="Close planner">×</button>
      </div>
      <div style={{ fontSize:12, color:'#666', marginBottom:8 }}>Drag courses into semesters</div>
      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        <select value={emphasis} onChange={e => setEmphasis(e.target.value)}>
          <option value="">Select Emphasis</option>
          <option value="animation-games">Animation & Games</option>
          <option value="software-engineering">Software Engineering</option>
          <option value="machine-learning">Machine Learning</option>
          <option value="bioinformatics">Bioinformatics</option>
        </select>
        <button disabled={!emphasis} onClick={applyPreset}>Apply</button>
      </div>
      <div className="credits-total">Total Credits: {totalCredits}</div>
      <div className="sem-list">
        {semesters.map(sem => (
          <div key={sem.id} className="semester-block" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>onDropToSemester(e, sem.id)}>
            <div className="sem-title">{sem.name}</div>
            <ul className="sem-courses">
              {sem.courses.map(code => (
                <li key={code} className="sem-course">
                  <span>{code}</span>
                  <div className="actions">
                    <button onClick={() => removeCourse(sem.id, code)} title="Remove">✕</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}

// No direct add button; use drag-and-drop only

export default function CoursesPlanner(){
  const [expanded, setExpanded] = useState<string[]>([...categories.map(c => c.id), ...requirementGroups.map(r=>r.id), ...bioRequirementGroups.map(r=>r.id)]) // default expanded
  const [emphasis, setEmphasis] = useState<string>('')
  const [query, setQuery] = useState('')
  const [showPlanner, setShowPlanner] = useState(false)
  const [groupMode, setGroupMode] = useState<'requirements'|'topics'>('requirements')
  const [semesters, setSemesters] = useState<Semester[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw) return JSON.parse(raw)
    } catch{}
    return [
      { id: uid(), name: 'Semester 1', courses: []},
      { id: uid(), name: 'Semester 2', courses: []},
      { id: uid(), name: 'Semester 3', courses: []},
      { id: uid(), name: 'Semester 4', courses: []},
    ]
  })

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(semesters)) }, [semesters])

  function toggleSection(id: string){
    setExpanded(exp => exp.includes(id) ? exp.filter(x => x!==id) : [...exp, id])
  }

  // No add button logic — dragging is the only way to add a course to planner

  const highlightSet = useMemo(() => new Set(emphasis ? emphasisHighlightCodes[emphasis] || [] : []), [emphasis])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return courses.filter(c => {
      if(q){
        if(!(c.code + ' ' + c.title).toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [query])

  // Grouping logic based on mode
  const grouped = useMemo(() => {
    if(groupMode === 'requirements'){
      const selectedGroups = emphasis === 'bioinformatics' ? bioRequirementGroups : requirementGroups
      const map: Record<string, typeof courses> = {}
      for(const rg of selectedGroups){
        map[rg.id] = filtered.filter(c => rg.codes.includes(c.code))
      }
      return map
    }
    // topics mode
    const map: Record<string, typeof courses> = {}
    for(const c of filtered){
      const cat = categorizeCourse(c.code)
      if(!map[cat]) map[cat] = []
      map[cat].push(c)
    }
    return map
  }, [filtered, groupMode, emphasis])

  // Sort categories: emphasis-highlighted first (if selected)
  const orderedCategories = useMemo(() => {
    if(groupMode === 'requirements'){
      return emphasis === 'bioinformatics' ? bioRequirementGroups : requirementGroups
    }
    if(!emphasis) return categories
    const emphSet = highlightSet
    return [...categories].sort((a,b) => {
      const aHas = (grouped[a.id]||[]).some(c => emphSet.has(c.code))
      const bHas = (grouped[b.id]||[]).some(c => emphSet.has(c.code))
      if(aHas === bHas) return a.name.localeCompare(b.name)
      return aHas ? -1 : 1
    })
  }, [emphasis, grouped, highlightSet, groupMode])

  // Drag handlers for adding to planner
  function handleDragStart(ev: React.DragEvent, code: string){
    ev.dataTransfer.setData('text/plain', code)
  }
  function handleDropOnSemester(ev: React.DragEvent, semId: string){
    ev.preventDefault()
    const code = ev.dataTransfer.getData('text/plain')
    if(!code) return
    setSemesters(s => s.map(sem => sem.id === semId ? { ...sem, courses: sem.courses.includes(code) ? sem.courses : [...sem.courses, code] } : sem))
  }
  // allowDrop no longer needed (handled on specific targets)

  function applyEmphasisPreset(){
    if(!emphasis) return
    const codes = emphasisPlanCodes[emphasis] || []
    if(!codes.length) return
    const newSems: Semester[] = [
      { id: uid(), name:'Semester 1', courses: [] },
      { id: uid(), name:'Semester 2', courses: [] },
      { id: uid(), name:'Semester 3', courses: [] },
      { id: uid(), name:'Semester 4', courses: [] },
      { id: uid(), name:'Semester 5', courses: [] },
      { id: uid(), name:'Semester 6', courses: [] },
      { id: uid(), name:'Semester 7', courses: [] },
      { id: uid(), name:'Semester 8', courses: [] }
    ]
    // Order courses by numeric level so 100-level precede 200-level, etc.
    const levelOf = (code:string) => {
      const parts = code.split(' ')
      const n = parseInt(parts[1]||'0',10)
      return isNaN(n) ? 0 : n
    }
    let orderedCodes = [...codes].sort((a,b) => levelOf(a) - levelOf(b))
    if(emphasis === 'animation-games'){
      const priority = ['CS 111','CS 235','DESAN 101','CSANM 150']
      const prSet = new Set(priority)
      const rest = orderedCodes.filter(c => !prSet.has(c))
      orderedCodes = [...priority.filter(c => codes.includes(c)), ...rest]
      // Ensure these priority courses land in the first two semesters before distribution logic spreads others
      const firstTwo = orderedCodes.filter(c => prSet.has(c))
      const remaining = orderedCodes.filter(c => !prSet.has(c))
      orderedCodes = [...firstTwo, ...remaining]
    }

  // Constraints: aim for about 6–9 CS credits per semester; cap total at 9 to leave room for GEs
    const CS_PREFIXES = new Set(['CS','CSANM'])
    const csMaxPerSem = 9
    const csMinPreferred = 6
  const totalMaxPerSem = 9

    const getCredits = (code:string) => courses.find(c=>c.code===code)?.credits ?? 3
    const isCs = (code:string) => CS_PREFIXES.has((code.split(' ')[0]||'').toUpperCase())
    const semTotal = (idx:number) => newSems[idx].courses.reduce((s,c)=> s + getCredits(c), 0)
    const semCsTotal = (idx:number) => newSems[idx].courses.filter(isCs).reduce((s,c)=> s + getCredits(c), 0)

    for(const code of orderedCodes){
      const cr = getCredits(code)
      if(isCs(code)){
        // Prefer semesters with < 6 CS credits, otherwise any with room up to 9 CS credits
        let placed = false
        // First pass: try to meet csMinPreferred while respecting totals
        for(let i=0;i<newSems.length && !placed;i++){
          const csNow = semCsTotal(i)
          const totNow = semTotal(i)
          if(csNow < csMinPreferred && csNow + cr <= csMaxPerSem && totNow + cr <= totalMaxPerSem){
            newSems[i].courses.push(code)
            placed = true
          }
        }
        // Second pass: any semester that can fit within csMax and totalMax
        if(!placed){
          for(let i=0;i<newSems.length && !placed;i++){
            const csNow = semCsTotal(i)
            const totNow = semTotal(i)
            if(csNow + cr <= csMaxPerSem && totNow + cr <= totalMaxPerSem){
              newSems[i].courses.push(code)
              placed = true
            }
          }
        }
        // Fallback: put into the semester with the least CS credits
        if(!placed){
          let bestIdx = 0, bestVal = Number.POSITIVE_INFINITY
          for(let i=0;i<newSems.length;i++){
            const csNow = semCsTotal(i)
            if(csNow < bestVal){ bestVal = csNow; bestIdx = i }
          }
          newSems[bestIdx].courses.push(code)
        }
      } else {
        // Non-CS: distribute to keep total credits under target, earliest first
        let placed = false
        for(let i=0;i<newSems.length && !placed;i++){
          const totNow = semTotal(i)
          if(totNow + cr <= totalMaxPerSem){
            newSems[i].courses.push(code)
            placed = true
          }
        }
        if(!placed){
          // Fallback: put into semester with the lowest total load
          let bestIdx = 0, bestVal = Number.POSITIVE_INFINITY
          for(let i=0;i<newSems.length;i++){
            const totNow = semTotal(i)
            if(totNow < bestVal){ bestVal = totNow; bestIdx = i }
          }
          newSems[bestIdx].courses.push(code)
        }
      }
    }
    setSemesters(newSems)
    if(!showPlanner) setShowPlanner(true)
  }

  return (
    <div className="courses-planner-page">
      <div className="top-bar">
        <div className="left-tools">
          <h2>BYU CS Courses</h2>
          <div className="courses-intro">
            <p>
              Browse all Computer Science courses. Use the Emphasis selector to highlight emphasis-specific classes. Drag courses into the planner (right) to build an 8-semester path. Students usually pair 6–9 CS credits with GE classes each term.
            </p>
            <p>
              You must earn the CS 240 flag (finish CS 240) before taking most 300+ level CS courses. Plan CS 240 early so upper-division scheduling stays flexible.
            </p>
          </div>
          {emphasis === 'animation-games' && (
            <div className="courses-intro emphasis-note">
              <p>
                <strong>Animation & Games Emphasis Admission:</strong> Limited-enrollment emphasis. You must be enrolled in the prerequisite courses (CS 111, CS 235, DESAN 101, and CSANM 150) to apply. You may apply while taking a prerequisite (select "currently enrolled" for its grade; advisors verify after grades post). For questions contact Lynnette Nelson (lnelson@cs.byu.edu).
              </p>
              <p>
                Application deadlines: <strong>April 30</strong> and <strong>December 15</strong> at 11:59 p.m.
              </p>
            </div>
          )}
          <input placeholder="Search courses" value={query} onChange={e => setQuery(e.target.value)} />
          <select value={emphasis} onChange={e => setEmphasis(e.target.value)} style={{ marginRight:12, marginLeft:12, padding:'8px 10px' }}>
            <option value="">All Emphases</option>
            <option value="animation-games">Animation & Games</option>
            <option value="software-engineering">Software Engineering</option>
            <option value="machine-learning">Machine Learning</option>
            <option value="bioinformatics">Bioinformatics</option>
          </select>
          {/* Removed main-page Apply button; use the Planner sidebar control instead */}
          <select value={groupMode} onChange={e => setGroupMode(e.target.value as any)} style={{ marginLeft:8 }}>
            <option value="topics">Group: Topics</option>
            <option value="requirements">Group: Requirements</option>
          </select>
        </div>
        <div className="right-tools">
          <button className="btn-primary" onClick={() => setShowPlanner(s => !s)}>{showPlanner ? 'Hide My Plan' : 'My Plan'}</button>
        </div>
      </div>

      <div className={`content-area ${showPlanner ? 'with-sidebar' : ''}`}>
        <div className="requirements-column">
          {orderedCategories.map(cat => (
            <RequirementSection
              key={cat.id}
              id={cat.id}
              name={cat.name}
              courses={grouped[cat.id] || []}
              expanded={expanded.includes(cat.id)}
              toggle={toggleSection}
              highlightSet={highlightSet}
              onDragCourseStart={handleDragStart}
            />
          ))}
        </div>
        {showPlanner && (
          <div>
            <PlannerSidebar
              semesters={semesters}
              setSemesters={setSemesters}
              close={() => setShowPlanner(false)}
              onDropToSemester={handleDropOnSemester}
              emphasis={emphasis}
              setEmphasis={setEmphasis}
              applyPreset={applyEmphasisPreset}
            />
          </div>
        )}
      </div>
    </div>
  )
}
