import React from 'react'
import { tracks } from '../../data/tracks'

interface PlannerControlsProps {
  onPresetSelect: (trackId: string) => void
  onClearPlan: () => void
  onExport: () => void
  onImport: (ev: React.ChangeEvent<HTMLInputElement>) => void
  totalCredits: number
}

/**
 * Controls for managing the semester plan (presets, import/export, etc.)
 */
export function PlannerControls({
  onPresetSelect,
  onClearPlan,
  onExport,
  onImport,
  totalCredits
}: PlannerControlsProps) {
  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <label>Choose a recommended track: </label>
        <select onChange={e => onPresetSelect(e.target.value)} defaultValue="">
          <option value="">-- Select track to preset 8-semester plan --</option>
          <option value="byu-animation-games-2024">Animation & Games (2024–2025)</option>
          <option value="byu-flowchart-2022">BYU CS Flowchart (2022–2023)</option>
          {tracks.map(t => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <button onClick={onClearPlan} style={{ marginLeft: 8 }}>
          Clear Plan
        </button>
        <button onClick={onExport} style={{ marginLeft: 8 }}>
          Export JSON
        </button>
        <label style={{ marginLeft: 8 }}>
          Import JSON <input type="file" accept="application/json" onChange={onImport} />
        </label>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Total planned credits: </strong>
        {totalCredits}
      </div>
    </>
  )
}
