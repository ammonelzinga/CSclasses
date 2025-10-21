export const catalogProgramsCS = () =>
  "https://catalog.byu.edu/programs/34712";

export const catalogCourseUrl = (code: string) =>
  `https://catalog.byu.edu/departments/1323/courses?query=${encodeURIComponent(code)}`;
