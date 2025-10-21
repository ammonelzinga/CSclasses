export type Scholarship = {
  id: string
  name: string
  description: string
  minGPA?: number
  applyUrl?: string
}

export const scholarships: Scholarship[] = [
  {
    id: 'hill',
    name: 'Brian T. and Katherine Hill Scholarship',
    description: 'This scholarship is for Computer Science students with a 3.0 or above GPA in a Computer Science program at BYU.',
    minGPA: 3.0,
    applyUrl: 'https://cs.byu.edu/scholarships/list'
  },
  {
    id: 'endowed',
    name: 'Computer Science Endowed Scholarship',
    description: 'This scholarship is for selected students who are pursuing a degree in the Department of Computer Science and who have evidenced scholastic ability by maintaining a GPA of at least 3.5.',
    minGPA: 3.5,
    applyUrl: 'https://cs.byu.edu/scholarships/list'
  },
  {
    id: 'together',
    name: 'Computer Science Together for Greatness Scholarship',
    description: 'This scholarship is for Computer Science majors.',
    applyUrl: 'https://cs.byu.edu/scholarships/list'
  },
  {
    id: 'meyers',
    name: 'David C. Meyers Endowed Scholarship',
    description: 'This scholarship is for students pursuing a degree in the Computer Science Department.',
    applyUrl: 'https://cs.byu.edu/scholarships/list'
  },
  {
    id: 'google-mentorship',
    name: 'Google Endowed Mentorship',
    description: 'This endowment is to provide mentored student learning experiences for undergraduate students who are pursuing a degree in the Computer Science Department.',
    applyUrl: 'https://cs.byu.edu/scholarships/list'
  },
  {
    id: 'sayer-ml',
    name: 'Kevin and Mimi Sayer Computer Science Machine Learning Endowed Scholarship',
    description: 'This scholarship is for students pursuing a degree in the Department of Computer Science with a Machine Learning emphasis.',
    applyUrl: 'https://cs.byu.edu/scholarships/list'
  },
  {
    id: 'microsoft',
    name: 'Microsoft Endowed Scholarship/Mentorship',
    description: 'This scholarship is for students pursuing a degree in the Department of Computer Science and who have evidenced scholastic ability by maintaining a GPA of at least 3.0.',
    minGPA: 3.0,
    applyUrl: 'https://cs.byu.edu/scholarships/list'
  },
  {
    id: 'national-instruments',
    name: 'National Instruments Computer Science Endowed Scholarship',
    description: 'This scholarship is for selected junior or senior students who are pursuing a degree in Computer Science who are enrolled in a minimum of 12 credit hours and who have maintained a GPA of 3.5.',
    minGPA: 3.5,
    applyUrl: 'https://cs.byu.edu/scholarships/list'
  },
  {
    id: 'linebarger',
    name: 'Robert Linebarger Endowed Scholarship',
    description: 'This scholarship is for selected students in the Computer Science Department who have evidenced a scholarship ability by maintaining a 3.5 GPA.',
    minGPA: 3.5,
    applyUrl: 'https://cs.byu.edu/scholarships/list'
  },
  {
    id: 'allred',
    name: 'Tracie R Allred Endowed Scholarship',
    description: 'This scholarship is for students majoring in computer science who are in their junior or senior year and who have maintained at least a 3.2 GPA.',
    minGPA: 3.2,
    applyUrl: 'https://cs.byu.edu/scholarships/list'
  }
]
