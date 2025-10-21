import React from 'react'
import { courses } from '../../data/courses'

interface Semester {
  id: string
  name: string
  courses: string[]
}

interface SemesterCardProps {
  semester: Semester
  onAddCourse: (semId: string, courseCode: string) => void
  onRemoveCourse: (semId: string, courseCode: string) => void
  onDelete: (id: string) => void
  onDragStart: (ev: React.DragEvent, courseCode: string, fromSemId: string) => void
  onDragOver: (ev: React.DragEvent) => void
  onDrop: (ev: React.DragEvent, targetSemId: string) => void
}

const MIN_CREDITS = 6
const MAX_CREDITS = 18

/**
 * Displays a single semester with its courses and controls
 */
export function SemesterCard({
  semester,
  onAddCourse,
  onRemoveCourse,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop
}: SemesterCardProps) {
  const totalCredits = semester.courses.reduce((acc, code) => {
    const c = courses.find(x => x.code === code)
    return acc + (c?.credits ?? 3)
  }, 0)

  return (
    <div
      className="card"
      style={{ minWidth: 240 }}
      onDragOver={onDragOver}
      onDrop={e => onDrop(e, semester.id)}
      role="listitem"
      aria-label={`${semester.name} semester`}
    >
      <strong>{semester.name}</strong>
      <div style={{ fontSize: 12, color: '#666' }}>
        <span>Credits: {totalCredits}</span>
      </div>

      <div className="sem-controls" style={{ marginTop: 8 }}>
        <select onChange={e => { if (e.target.value) onAddCourse(semester.id, e.target.value) }}>
          <option value="">-- Add course --</option>
          {courses.map(c => (
            <option key={c.code} value={c.code}>
              {c.code} — {c.title}
            </option>
          ))}
        </select>
        <button onClick={() => onDelete(semester.id)} style={{ marginLeft: 8 }}>
          Delete
        </button>
      </div>

      <ul>
        {semester.courses.map(code => {
          const detail = courses.find(x => x.code === code)
          return (
            <li
              key={code}
              draggable
              onDragStart={e => onDragStart(e, code, semester.id)}
              style={{ marginBottom: 6 }}
            >
              {code} — {detail?.title}
              <button onClick={() => onRemoveCourse(semester.id, code)} style={{ marginLeft: 8 }}>
                Remove
              </button>
            </li>
          )
        })}
      </ul>

      {/* Warning if overloaded/underloaded */}
      {totalCredits > MAX_CREDITS && (
        <div style={{ color: 'red' }}>Warning: heavy load ({totalCredits} credits)</div>
      )}
      {totalCredits > 0 && totalCredits < MIN_CREDITS && (
        <div style={{ color: 'orange' }}>Warning: light load ({totalCredits} credits)</div>
      )}
    </div>
  )
}
