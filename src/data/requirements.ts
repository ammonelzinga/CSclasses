export type RequirementGroup = {
  id: string
  name: string
  codes: string[]
}

// Requirement-based groupings derived from user's list
export const requirementGroups: RequirementGroup[] = [
  {
    id: 'req1-core',
    name: 'Requirement 1 — Core (Complete 13 Courses)',
    codes: [
      'CS 111','CS 191','CS 224','CS 235','CS 236','CS 240','CS 252','CS 260','CS 291','CS 312','CS 324','CS 340','CS 404'
    ]
  },
  {
    id: 'req2-math-sci-comm',
    name: 'Requirement 2 — Complete 5 Courses',
    codes: ['MATH 112','MATH 213','MATH 215','PHSCS 121','WRTG 316']
  },
  {
    id: 'req3-prob-stat',
    name: 'Requirement 3 — Complete 1 of 3 Courses',
    codes: ['MATH 431','STAT 121','STAT 201']
  },
  {
    id: 'req4-calc2-math',
    name: 'Requirement 4 — Complete 1 of 3 Courses',
    codes: ['MATH 113','MATH 290','STAT 220']
  },
  {
    id: 'req5-1-advanced-cs',
    name: 'Requirement 5.1 — Advanced CS (12–21 hours)',
    codes: [
      'CS 329','CS 330','CS 345','CS 355','CS 356','CS 393','CS 401R','CS 412','CS 416','CS 428','CS 430','CS 431','CS 450','CS 452','CS 453','CS 455','CS 456','CS 460','CS 462','CS 465','CS 466','CS 470','CS 471','CS 473','CS 474','CS 479','CS 486','CS 501R','CS 513','CS 556','CS 574','CS 575','CS 580'
    ]
  },
  {
    id: 'req5-2-addl-electives',
    name: 'Requirement 5.2 — Additional Electives (up to 6 hours)',
    codes: [
      'CS 180','CS 202','CS 203','CS 204','CS 256','CS 270','CS 405','EC EN 220','MATH 113','MATH 290','STAT 220'
    ]
  },
  {
    id: 'req5-3-external',
    name: 'Requirement 5.3 — External Options (up to 8 hours)',
    codes: ['EC EN 330','EC EN 427','IS 567','MATH 485']
  },
  {
    id: 'req5-4-capstones',
    name: 'Requirement 5.4 — Capstones and Experiences (up to 9 hours)',
    codes: ['CS 480','CS 481','CS 482','CS 483','CS 493R','CS 494','CS 495','CS 497R','CS 498R']
  }
]

// Bioinformatics-specific requirement groupings
export const bioRequirementGroups: RequirementGroup[] = [
  {
    id: 'bio-req1-core-cs',
    name: 'Requirement 1 — CS Core (Complete 10 Courses)',
    codes: ['CS 111','CS 191','CS 224','CS 235','CS 236','CS 240','CS 270','CS 291','CS 312','CS 404']
  },
  {
    id: 'bio-req2-bio-core',
    name: 'Requirement 2 — Biology Core (Complete 7 Courses)',
    codes: ['BIO 130','BIO 165','BIO 264','BIO 364','BIO 465','MMBIO 240','PWS 340']
  },
  {
    id: 'bio-req3-support',
    name: 'Requirement 3 — Supporting (Complete 5 Courses)',
    codes: ['CHEM 105','MATH 112','MATH 213','MATH 215','WRTG 316']
  },
  {
    id: 'bio-req4-evolution',
    name: 'Requirement 4 — Choose 1 of 2',
    codes: ['BIO 250','BIO 420']
  },
  {
    id: 'bio-req5-ml',
    name: 'Requirement 5 — Choose 1 of 2',
    codes: ['CS 473','CS 474']
  },
  {
    id: 'bio-req6-electives',
    name: 'Requirement 6 — Complete 12 Hours (see catalog notes)',
    codes: [
      'BIO 463','CS 256','CS 260','CS 329','CS 330','CS 345','CS 355','CS 356','CS 393','CS 401R','CS 405','CS 412','CS 416','CS 428','CS 430','CS 431','CS 450','CS 452','CS 453','CS 455','CS 456','CS 460','CS 462','CS 465','CS 466','CS 470','CS 471','CS 473','CS 474','CS 479','CS 480','CS 481','CS 482','CS 483','CS 486','CS 493R','CS 513','CS 556','CS 574','CS 575','CS 580','CS 497R','CS 498R'
    ]
  }
]
