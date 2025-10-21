import React, { useEffect, useState } from 'react'
import { courses, CourseFull } from '../data/courses'
import { tracks } from '../data/tracks'
import { ciFlags } from '../config/ciFlags'
import { catalogCourseUrl } from '../utils/externalLinks'
import { CourseCard } from './planner/CourseCard'
import { SemesterCard } from './planner/SemesterCard'
import { PlannerControls } from './planner/PlannerControls'

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
  const [successToast, setSuccessToast] = useState<string | null>(null)

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
    if (ciFlags.uiRedesign) {
      setSuccessToast('Plan exported successfully!')
      setTimeout(() => setSuccessToast(null), 3000)
    }
  }

  function importPlan(ev: React.ChangeEvent<HTMLInputElement>){
    const file = ev.target.files?.[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try{
        const parsed = JSON.parse(String(reader.result))
        setSemesters(parsed)
        if (ciFlags.uiRedesign) {
          setSuccessToast('Plan imported successfully!')
          setTimeout(() => setSuccessToast(null), 3000)
        }
      }catch{
        if (ciFlags.uiRedesign) {
          setWarningToast('Failed to import plan. Please check the file format.')
          setTimeout(() => setWarningToast(null), 5000)
        }
      }
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

  const totalCredits = semesters.reduce(
    (acc, sem) => acc + sem.courses.reduce((a, code) => a + (courses.find(c => c.code === code)?.credits ?? 3), 0),
    0
  )

  function clearPlan() {
    localStorage.removeItem(STORAGE_KEY)
    setSemesters([])
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

      <PlannerControls
        onPresetSelect={applyPreset}
        onClearPlan={clearPlan}
        onExport={exportPlan}
        onImport={importPlan}
        totalCredits={totalCredits}
      />

      <div className="planner-layout">
        <section className="planner-available" aria-labelledby="available-courses-heading">
          <h3 id="available-courses-heading">Available Courses</h3>
          <div style={{ maxHeight: 700, overflow: 'auto' }} role="list" aria-label="Available courses to add to semesters">
            {courses.map(c => (
              <CourseCard key={c.code} course={c} onDragStart={handleDragStart} />
            ))}
          </div>
        </section>

        <section className="planner-sems" aria-labelledby="semesters-heading">
          <h3 id="semesters-heading" className="sr-only">Your Semester Plan</h3>
          <div className="semesters-grid two-columns" role="list" aria-label="Semester plan grid">
            {semesters.map(sem => (
              <SemesterCard
                key={sem.id}
                semester={sem}
                onAddCourse={addCourseToSemester}
                onRemoveCourse={removeCourseFromSemester}
                onDelete={deleteSemester}
                onDragStart={handleDragStart}
                onDragOver={allowDrop}
                onDrop={handleDropOnSemester}
              />
            ))}
          </div>
        </section>
      </div>

      {warningToast && ciFlags.uiRedesign && (
        <div className="toast warning" role="alert" aria-live="polite">
          <strong>⚠️ Prerequisite Warning</strong>
          <p style={{ margin: '4px 0 0 0', fontSize: 14 }}>{warningToast}</p>
        </div>
      )}
      {successToast && ciFlags.uiRedesign && (
        <div className="toast success" role="status" aria-live="polite">
          <strong>✓ Success</strong>
          <p style={{ margin: '4px 0 0 0', fontSize: 14 }}>{successToast}</p>
        </div>
      )}
    </div>
  )
}
