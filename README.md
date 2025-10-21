# BYU Computer Science Explorer

This is a small React + TypeScript app (Vite) that displays BYU Computer Science tracks, clubs/events, and a scholarships page with direct Apply buttons.

Quick start (Windows PowerShell):

1. Install dependencies:

```powershell
npm install
```

2. Run dev server:

```powershell
npm run dev
```

The scholarships page includes the requested scholarships with 'Apply' buttons linking to the BYU CS scholarship portal.

Notes:
- Course tracks are a simplified representation pulled from BYU CS program pages; verify with the official BYU Catalog for graduation planning.
- To populate with more detailed course-by-semester plans, we can scrape or manually add the official catalog content into `src/data/tracks.ts`.
