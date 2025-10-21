export type Course = { code: string; title: string; credits?: number }

export type Track = {
  id: string
  name: string
  description?: string
  requiredCourses: Course[]
  electives?: Course[]
}

export const tracks: Track[] = [
  {
    id: 'animation-games',
    name: 'Animation & Games',
    description: 'Focus on graphics, game programming, and interactive systems.',
    requiredCourses: [
      { code: 'CS 240', title: 'Foundations of Programming' },
      { code: 'CS 242', title: 'Object-Oriented Programming' },
      { code: 'CS 360', title: 'Data Structures' },
      { code: 'CS 370', title: 'Computer Graphics' }
    ],
    electives: [
      { code: 'CS 480R', title: 'Game Programming' },
      { code: 'CS 430', title: 'Human-Computer Interaction' }
    ]
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    description: 'Focus on software design, testing, and large-scale development.',
    requiredCourses: [
      { code: 'CS 240', title: 'Foundations of Programming' },
      { code: 'CS 360', title: 'Data Structures' },
      { code: 'CS 340', title: 'Software Engineering' },
      { code: 'CS 441', title: 'Software Testing' }
    ],
    electives: [ { code: 'CS 442', title: 'Software Architecture' } ]
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'Focus on statistical learning, AI, and data-driven algorithms.',
    requiredCourses: [
      { code: 'CS 240', title: 'Foundations of Programming' },
      { code: 'CS 360', title: 'Data Structures' },
      { code: 'CS 465', title: 'Introduction to Machine Learning' },
      { code: 'STAT 121', title: 'Statistics' }
    ],
    electives: [ { code: 'CS 466', title: 'Deep Learning' } ]
  },
  {
    id: 'bioinformatics',
    name: 'Bioinformatics',
    description: 'Computational biology, algorithms for biological data.',
    requiredCourses: [
      { code: 'CS 240', title: 'Foundations of Programming' },
      { code: 'CS 360', title: 'Data Structures' },
      { code: 'CS 472', title: 'Computational Biology' }
    ],
    electives: [ { code: 'BIO 311', title: 'Genetics' } ]
  }
  ,
  {
    id: 'general-cs',
    name: 'General CS (No Emphasis)',
    description: 'A balanced general Computer Science plan (no emphasis). Good default plan for undecided students.',
    requiredCourses: [
      { code: 'CS 110', title: 'How to Program' },
      { code: 'CS 111', title: 'Introduction to Computer Science' },
      { code: 'CS 142', title: 'Introduction to Computer Programming' },
      { code: 'CS 235', title: 'Data Structures and Algorithms' },
      { code: 'CS 240', title: 'Advanced Software Construction' },
      { code: 'CS 224', title: 'Introduction to Computer Systems' },
      { code: 'CS 312', title: 'Algorithm Design and Analysis' },
      { code: 'CS 340', title: 'Software Design' }
    ],
    electives: [
      { code: 'CS 355', title: 'Interactive Graphics and Image Processing' },
      { code: 'CS 450', title: 'Computer Vision' }
    ]
  }
]
