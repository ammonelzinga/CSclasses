import React from 'react'
import { CourseFull } from '../../data/courses'

interface CourseCardProps {
  course: CourseFull
  onDragStart: (ev: React.DragEvent, courseCode: string) => void
  isDraggable?: boolean
}

/**
 * Displays a single course card with drag-and-drop support
 * Includes keyboard accessibility for draggable items
 */
export function CourseCard({ course, onDragStart, isDraggable = true }: CourseCardProps) {
  return (
    <div
      className="card"
      draggable={isDraggable}
      onDragStart={e => onDragStart(e, course.code)}
      role="listitem"
      tabIndex={isDraggable ? 0 : undefined}
      aria-label={`${course.code} - ${course.title}. ${isDraggable ? 'Draggable' : ''}`}
    >
      <strong>{course.code}</strong> {course.title}
      <div style={{ marginTop: 6 }}>
        <small>{course.description}</small>
      </div>
    </div>
  )
}
