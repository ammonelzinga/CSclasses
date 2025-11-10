export type Category = { id: string; name: string }

export const categories: Category[] = [
  { id: 'core', name: 'CS Core' },
  { id: 'systems', name: 'Systems' },
  { id: 'software', name: 'Software Engineering' },
  { id: 'theory', name: 'Algorithms & Theory' },
  { id: 'db-ir', name: 'Databases & Information Retrieval' },
  { id: 'ai-ml', name: 'Artificial Intelligence & ML' },
  { id: 'graphics', name: 'Graphics, Animation & Games' },
  { id: 'hci', name: 'Human-Computer Interaction' },
  { id: 'security', name: 'Security & Blockchain' },
  { id: 'net-dist', name: 'Networks & Distributed Systems' },
  { id: 'capstone', name: 'Capstones' },
  { id: 'bioinfo', name: 'Bioinformatics' },
  { id: 'other', name: 'Other' }
]

// Return category id for a given course code
export function categorizeCourse(code: string): string {
  const [prefix, numStr] = code.split(' ')
  const num = parseInt(numStr || '0', 10)
  const is = (codes: (string|number)[]) => codes.some(c => String(c) === code || (typeof c === 'number' && num === c))

  // Core sequence
  if (is(['CS 111','CS 142',111,142]) || (prefix==='CS' && [224,235,236,240,312,324,330,340,345,404].includes(num))) return 'core'

  // Systems
  if (prefix==='CS' && [324,345].includes(num)) return 'systems'

  // Software Eng
  if (prefix==='CS' && [329,340,428,480,481].includes(num)) return 'software'

  // Theory
  if (prefix==='CS' && [252,312,416,430,431].includes(num)) return 'theory'

  // Databases & IR
  if (prefix==='CS' && [452,453].includes(num)) return 'db-ir'

  // AI/ML
  if (prefix==='CS' && [270,470,472,473,474,479].includes(num)) return 'ai-ml'

  // Graphics / Animation / Games
  if (prefix==='CS' && [355,455].includes(num)) return 'graphics'
  if (prefix==='CSANM') return 'graphics'

  // HCI
  if (prefix==='CS' && [256,356,456].includes(num)) return 'hci'

  // Security & Blockchain
  if (prefix==='CS' && [465,466].includes(num)) return 'security'

  // Networks & Distributed
  if (prefix==='CS' && [460,462].includes(num)) return 'net-dist'

  // Capstones
  if (prefix==='CS' && [480,481,494,495].includes(num)) return 'capstone'

  // Bioinformatics courses (BIO/MMBIO/PWS core and related options)
  if (prefix==='BIO' && ['BIO 130','BIO 165','BIO 264','BIO 364','BIO 465','BIO 250','BIO 420','BIO 463'].includes(code)) return 'bioinfo'
  if (code==='MMBIO 240') return 'bioinfo'
  if (code==='PWS 340') return 'bioinfo'

  return 'other'
}
