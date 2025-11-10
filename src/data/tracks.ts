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
    description: 'Integrates the CS core with foundational biology, statistics, and advanced bioinformatics / machine learning.',
    requiredCourses: [
      // Requirement 1 — CS core (10 courses)
      { code: 'CS 111', title: 'Intro to Computer Science' },
      { code: 'CS 191', title: 'Exploring CS' },
      { code: 'CS 224', title: 'Computer Systems' },
      { code: 'CS 235', title: 'Data Structures' },
      { code: 'CS 236', title: 'Discrete Structure' },
      { code: 'CS 240', title: 'Adv Software Construction' },
      { code: 'CS 270', title: 'Intro to Machine Learning' },
      { code: 'CS 291', title: 'Careers in CS' },
      { code: 'CS 312', title: 'Algorithm Design & Analysis' },
      { code: 'CS 404', title: 'Ethics & Computers in Society' },
      // Requirement 2 — Biology core (7 courses)
      { code: 'BIO 130', title: 'Biology' },
      { code: 'BIO 165', title: 'Introduction to Bioinformatics' },
      { code: 'BIO 264', title: 'Stat Analysis for Biologists' },
      { code: 'BIO 364', title: 'Bioinformatics Algorithms' },
      { code: 'BIO 465', title: 'Capstone in Bioinformatics' },
      { code: 'MMBIO 240', title: 'Molecular Biology' },
      { code: 'PWS 340', title: 'Genetics' },
      // Requirement 3 — Supporting (5 courses)
      { code: 'CHEM 105', title: 'Gen College Chem 1+Lab Integr' },
      { code: 'MATH 112', title: 'Calculus 1' },
      { code: 'MATH 213', title: 'Elementary Linear Algebra' },
      { code: 'MATH 215', title: 'Computational Linear Algebra' },
      { code: 'WRTG 316', title: 'Technical Communication' }
    ],
    electives: [
      // Requirement 4 — Evolution option (choose 1)
      { code: 'BIO 250', title: 'Evolutionary Medicine' },
      { code: 'BIO 420', title: 'Evolutionary Biology' },
      // Requirement 5 — Advanced ML option (choose 1)
      { code: 'CS 473', title: 'Advanced Machine Learning' },
      { code: 'CS 474', title: 'Deep Learning' },
      // Requirement 6 — Extended electives (subset shown; full list in requirements)
      { code: 'BIO 463', title: 'Genetics of Human Disease' },
      { code: 'CS 256', title: 'Introduction to HCI' },
      { code: 'CS 260', title: 'Web Programming' },
      { code: 'CS 329', title: 'QA & DevOps' },
      { code: 'CS 330', title: 'Concepts of Programming Languages' },
      { code: 'CS 345', title: 'Operating Systems Design' },
      { code: 'CS 356', title: 'Advanced Techniques in HCI' },
      { code: 'CS 412', title: 'Linear Prog/Convx Optimization' },
      { code: 'CS 416', title: 'Advanced Algorithms' },
      { code: 'CS 428', title: 'Software Engineering' },
      { code: 'CS 430', title: 'Formal Verification' },
      { code: 'CS 431', title: 'Algorithmic Lang & Compilers' },
      { code: 'CS 450', title: 'Computer Vision' },
      { code: 'CS 452', title: 'Database Modeling Concepts' },
      { code: 'CS 453', title: 'Fund of Information Retrieval' },
      { code: 'CS 455', title: 'Computer Graphics' },
      { code: 'CS 456', title: 'Mobile and Ubiquitous HCI' },
      { code: 'CS 460', title: 'Comp Comms & Networking' },
      { code: 'CS 462', title: 'Distributed System Design' },
      { code: 'CS 465', title: 'Computer Security' },
      { code: 'CS 466', title: 'Blockchain Technologies' },
      { code: 'CS 470', title: 'Intro Artificial Intelligence' },
      { code: 'CS 479', title: 'Intro to Machine Translation' },
      { code: 'CS 480', title: 'Soft Eng Capstone 1' },
      { code: 'CS 481', title: 'Soft Eng Capstone 2' },
      { code: 'CS 482', title: 'Data Science Capstone 1' },
      { code: 'CS 483', title: 'Data Science Capstone 2' },
      { code: 'CS 486', title: 'Verification and Validation' },
      { code: 'CS 493R', title: 'Computing Competitions' },
      { code: 'CS 497R', title: 'Undergraduate Research' },
      { code: 'CS 498R', title: 'Undergraduate Special Projects' }
    ]
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
