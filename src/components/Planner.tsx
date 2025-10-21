import React, { useEffect, useState } from 'react'
import { courses, CourseFull } from '../data/courses'
import { tracks } from '../data/tracks'
import { ciFlags } from '../config/ciFlags'
import { catalogCourseUrl } from '../utils/externalLinks'

type Semester = {
  id: string
  name: string
  courses: string[] // course codes
}

const STORAGE_KEY = 'byu-cs-planner'

const MIN_CREDITS = 6
const MAX_CREDITS = 18

function uid() { return Math.random().toString(36).slice(2,9) }

function flowchartPreset(): Semester[] {
  const makeSem = (i: number, name?: string): Semester => ({ id: uid(), name: name ?? `Semester ${i}`, courses: [] })
  const sems: Semester[] = [
    makeSem(1, 'Semester 1'),
    makeSem(2, 'Semester 2'),
    makeSem(3, 'Semester 3'),
    makeSem(4, 'Semester 4'),
    makeSem(5, 'Semester 5'),
    makeSem(6, 'Semester 6'),
    makeSem(7, 'Semester 7'),
    makeSem(8, 'Semester 8')
  ]
  // Best-effort mapping based on BYU CS 2022–2023 flowchart core sequence
  // Adjust as needed for catalog year specifics
  const plan: string[][] = [
    ['CS 142', 'CS 111'],
    ['CS 235', 'CS 236'],
    ['CS 240', 'CS 224'],
    ['CS 312', 'CS 330'],
    ['CS 340', 'CS 345'],
    ['CS 324', 'CS 404'],
    ['CS 480', 'CS 355'],
    ['CS 481', 'CS 450']
  ]
  plan.forEach((codes, idx) => {
    sems[idx].courses = codes.filter(code => courses.some(c => c.code === code))
  })
  return sems
}

function animationGamesPreset(): Semester[] {
  const makeSem = (i: number, name?: string): Semester => ({ id: uid(), name: name ?? `Semester ${i}`, courses: [] })
  const sems: Semester[] = [
    makeSem(1, 'Semester 1'),
    makeSem(2, 'Semester 2'),
    makeSem(3, 'Semester 3'),
    makeSem(4, 'Semester 4'),
    makeSem(5, 'Semester 5'),
    makeSem(6, 'Semester 6'),
    makeSem(7, 'Semester 7'),
    makeSem(8, 'Semester 8')
  ]
  // Best-effort mapping based on BYU CS Animation & Games MAP (2024–2025)
  // Uses only courses present in our dataset
  const plan: string[][] = [
    ['CS 142', 'CS 111'],                 // programming foundations
    ['CS 235', 'CS 236'],                 // data structures + discrete
    ['CS 224', 'CS 240'],                 // systems + advanced software
    ['CS 312', 'CS 330'],                 // algorithms + PL
    ['CS 355', 'CSANM 340'],              // graphics + game design
    ['CS 455', 'CSANM 342'],              // advanced graphics + real-time
    ['CSANM 459', 'CS 324'],              // game prod 1 + systems programming
    ['CSANM 460', 'CS 404']               // game prod 2 + ethics
  ]
  plan.forEach((codes, idx) => {
    sems[idx].courses = codes.filter(code => courses.some(c => c.code === code))
  })
  return sems
}

export default function Planner(){
  const [semesters, setSemesters] = useState<Semester[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch {}
    // Default to Animation & Games (2024–2025) if no saved plan
    return animationGamesPreset()
  })
  const [newName, setNewName] = useState('')
  const [warningToast, setWarningToast] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(semesters))
  }, [semesters])

  function addSemester(){
    if(!newName) return
    setSemesters(s => [...s, { id: uid(), name: newName, courses: [] }])
    setNewName('')
  }

  function addCourseToSemester(semId: string, courseCode: string){
    setSemesters(s => s.map(sem => sem.id === semId ? { ...sem, courses: Array.from(new Set([...sem.courses, courseCode])) } : sem))
  }

  function removeCourseFromSemester(semId: string, courseCode: string){
    setSemesters(s => s.map(sem => sem.id === semId ? { ...sem, courses: sem.courses.filter(c => c !== courseCode) } : sem))
  }

  function deleteSemester(id: string){ setSemesters(s => s.filter(x => x.id !== id)) }

  function exportPlan(){
    const data = JSON.stringify(semesters, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    window.open(url)
  }

  function importPlan(ev: React.ChangeEvent<HTMLInputElement>){
    const file = ev.target.files?.[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try{
        const parsed = JSON.parse(String(reader.result))
        setSemesters(parsed)
      }catch{}
    }
    reader.readAsText(file)
  }

  // Drag handlers
  function handleDragStart(ev: React.DragEvent, courseCode: string, fromSemId?: string){
    ev.dataTransfer.setData('text/plain', courseCode)
    if(fromSemId) ev.dataTransfer.setData('from', fromSemId)
  }

  function handleDropOnSemester(ev: React.DragEvent, targetSemId: string){
    ev.preventDefault()
    const code = ev.dataTransfer.getData('text/plain')
    const from = ev.dataTransfer.getData('from') || null
    if(!code) return

    // Check if course is 300+ level and warn if CS 240 hasn't been taken in a previous semester
    if(ciFlags.showPrereq240Note && code.startsWith('CS')){
      const num = parseInt(code.split(' ')[1] || '0', 10)
      if(num >= 300){
        const targetIdx = semesters.findIndex(s => s.id === targetSemId)
        const has240Before = semesters.slice(0, targetIdx).some(s => s.courses.includes('CS 240'))
        if(!has240Before){
          setWarningToast('Heads up: Pass CS 240 test before taking 300-level CS courses.')
          setTimeout(() => setWarningToast(null), 5000)
        }
      }
    }

    // If dragged from another semester, remove it there
    if(from){
      setSemesters(s => s.map(sem => sem.id === from ? { ...sem, courses: sem.courses.filter(c => c !== code) } : sem))
    }
    // Remove code from any semester (prevent duplicates) then add to target
    setSemesters(s => {
      const without = s.map(sem => ({ ...sem, courses: sem.courses.filter(c => c !== code) }))
      return without.map(sem => sem.id === targetSemId ? { ...sem, courses: Array.from(new Set([...sem.courses, code])) } : sem)
    })
  }

  function allowDrop(ev: React.DragEvent){ ev.preventDefault() }

  // Preset: create 8 semesters and distribute a track's required courses across them
  function applyPreset(trackId: string){
    if (trackId === 'byu-animation-games-2024') { setSemesters(animationGamesPreset()); return }
    if (trackId === 'byu-flowchart-2022') { setSemesters(flowchartPreset()); return }
    const t = tracks.find(x => x.id === trackId)
    if(!t) return
    const allCodes = [
      ...t.requiredCourses.map(c => c.code),
      ...(t.electives ? t.electives.map(e => e.code) : [])
    ]
    // Include a few core CS intro courses if they exist
    const core = ['CS 110','CS 111','CS 142','CS 240','CS 235','CS 224']
    const unique = Array.from(new Set([...core, ...allCodes]))
    // Distribute across 8 semesters
    const sems: Semester[] = Array.from({ length: 8 }).map((_, i) => ({ id: uid(), name: `Semester ${i+1}`, courses: [] }))
    unique.forEach((code, idx) => {
      const bucket = idx % sems.length
      sems[bucket].courses.push(code)
    })
    setSemesters(sems)
  }

  return (
    <div className="container">
      <h2>Semester Planner (Drag & Drop)</h2>
      <p>Create an 8-semester graduation plan from a recommended track, then drag and drop classes between semesters. Data is saved to localStorage.</p>
      {ciFlags.uiRedesign && (
        <p style={{ fontSize: 14, color: '#6b7280', fontStyle: 'italic' }}>
          Tip: Import/Export your plan as JSON to share with an advisor.
        </p>
      )}

      <div style={{ marginBottom: 12 }}>
        <label>Choose a recommended track: </label>
        <select onChange={e => applyPreset(e.target.value)} defaultValue="">
          <option value="">-- Select track to preset 8-semester plan --</option>
          <option value="byu-animation-games-2024">Animation & Games (2024–2025)</option>
          <option value="byu-flowchart-2022">BYU CS Flowchart (2022–2023)</option>
          {tracks.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <button onClick={() => { localStorage.removeItem(STORAGE_KEY); setSemesters([]) }} style={{ marginLeft:8 }}>Clear Plan</button>
        <button onClick={exportPlan} style={{ marginLeft:8 }}>Export JSON</button>
        <label style={{ marginLeft:8 }}>
          Import JSON <input type="file" accept="application/json" onChange={importPlan} />
        </label>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Total planned credits: </strong>
        {semesters.reduce((acc, sem) => acc + sem.courses.reduce((a, code) => a + (courses.find(c => c.code === code)?.credits ?? 3), 0), 0)}
      </div>

      <div className="planner-layout">
        <div className="planner-available">
          <h3>Available Courses</h3>
          <div style={{ maxHeight: 700, overflow: 'auto' }}>
            {courses.map(c => (
              <div key={c.code} className="card" draggable onDragStart={e => handleDragStart(e, c.code)}>
                <strong>{c.code}</strong> {c.title}
                <div style={{ marginTop:6 }}>
                  <small>{c.description}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="planner-sems">
          <div className="semesters-grid two-columns">
          {semesters.map(sem => (
            <div key={sem.id} className="card" style={{ minWidth: 240 }} onDragOver={allowDrop} onDrop={e => handleDropOnSemester(e as unknown as React.DragEvent, sem.id)}>
              <strong>{sem.name}</strong>
              <div style={{ fontSize: 12, color: '#666' }}>
                {/* compute semester credits */}
                {(() => {
                  const total = sem.courses.reduce((acc, code) => {
                    const c = courses.find(x => x.code === code)
                    return acc + (c?.credits ?? 3)
                  }, 0)
                  return <span>Credits: {total}</span>
                })()}
              </div>
              <div className="sem-controls" style={{ marginTop:8 }}>
                <select onChange={e => { if(e.target.value) addCourseToSemester(sem.id, e.target.value) }}>
                  <option value="">-- Add course --</option>
                  {courses.map(c => <option key={c.code} value={c.code}>{c.code} — {c.title}</option>)}
                </select>
                <button onClick={() => deleteSemester(sem.id)} style={{ marginLeft:8 }}>Delete</button>
              </div>

              <ul>
                {sem.courses.map(code => {
                  const detail = courses.find(x => x.code === code)
                  return (
                    <li key={code} draggable onDragStart={e => handleDragStart(e, code, sem.id)} style={{ marginBottom:6 }}>
                      {code} — {detail?.title}
                      <button onClick={() => removeCourseFromSemester(sem.id, code)} style={{ marginLeft:8 }}>Remove</button>
                    </li>
                  )
                })}
              </ul>
              {/* warning if overloaded/underloaded */}
              {(() => {
                const total = sem.courses.reduce((acc, code) => {
                  const c = courses.find(x => x.code === code)
                  return acc + (c?.credits ?? 3)
                }, 0)
                if (total > MAX_CREDITS) return <div style={{ color: 'red' }}>Warning: heavy load ({total} credits)</div>
                if (total > 0 && total < MIN_CREDITS) return <div style={{ color: 'orange' }}>Warning: light load ({total} credits)</div>
                return null
              })()}
            </div>
          ))}
          </div>
        </div>
      </div>

      {warningToast && ciFlags.uiRedesign && (
        <div className="toast warning">
          <strong>⚠️ Prerequisite Warning</strong>
          <p style={{ margin: '4px 0 0 0', fontSize: 14 }}>{warningToast}</p>
        </div>
      )}
    </div>
  )
}
