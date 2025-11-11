export type CourseFull = {
  code: string
  title: string
  description: string
  credits?: number
}

// Default credit assignment: 3 credits for most courses; adjust as needed.
export const courses: CourseFull[] = [
  { code: 'CS 110', title: 'How to Program', description: 'Introduction to programming and computer science for those with no prior programming experience. Focuses on the basic aspects of programming, with an emphasis on core principles. Labs provide a supportive environment to learn how to program with peer...', credits: 3 },
  { code: 'CS 111', title: 'Introduction to Computer Science', description: 'Teaches how to design, develop, reason about, and test programs. Topics include higher-order functions, object-oriented programming, recursion, algorithms, data structures, decomposition, interpreters, and regular expressions.', credits: 3 },
  { code: 'CS 142', title: 'Introduction to Computer Programming', description: 'Introduction to object-oriented program design and development. Principles of algorithm formulation and implementation.' },
  { code: 'CS 180', title: 'Introduction to Data Science', description: 'A broad, interdisciplinary look at data science, developing technical skills (including some python programming, statistics, linear algebra, machine learning, data cleaning and visualization).' },
  { code: 'CS 191', title: 'Exploring Computer Science', description: 'Introduction to the discipline of computer science and its fields.', credits: 0.5 },
  { code: 'CS 199R', title: 'Academic Internship', description: 'Internships or cooperative education experiences with organizations outside BYU.' },
  { code: 'CS 201R', title: 'Topics in Computer Science', description: 'Undergraduate level subjects as announced before each semester.' },
  { code: 'CS 202', title: 'Software Engineering Lab 1', description: 'The first of three experiential learning labs that will provide students with hands-on experience with various tools, technologies, and techniques that software engineers use in practice.' },
  { code: 'CS 203', title: 'Software Engineering Lab 2', description: 'The second of three experiential learning labs building on those learned in previous lab.' },
  { code: 'CS 204', title: 'Software Engineering Lab 3', description: 'The third of three experiential learning labs building on those learned in previous labs.' },
  { code: 'CS 224', title: 'Introduction to Computer Systems', description: 'How a computer works to execute sequential code: low level data representation and abstraction, relationship between C and assembly, architecture, memory hierarchy, dynamic memory allocation, and linking.', credits: 3 },
  { code: 'CS 235', title: 'Data Structures and Algorithms', description: 'Fundamental data structures and algorithms of computer science; basic algorithm analysis; recursion; sorting and searching; lists, stacks, queues, trees, hashing; object-oriented data abstraction.', credits: 3 },
  { code: 'CS 236', title: 'Discrete Structures', description: 'Introduction to grammars and parsing; predicate and propositional logic; proof techniques; sets, functions, relations, relational data model; graphs and graph algorithms.', credits: 3 },
  { code: 'CS 240', title: 'Advanced Software Construction', description: 'Advanced software development with an object-oriented focus. Design, implementation, and testing of medium-sized programs including a server program.', credits: 4 },
  { code: 'CS 252', title: 'Introduction to Computational Theory', description: 'Finite state automata, regular languages, push-down automata, parsing, Turing machines, computability complexity, NP-completeness.' },
  { code: 'CS 256', title: 'Introduction to Human Computer Interaction', description: 'Design user experiences with technology. Methods to establish user needs, derive designs, assess tradeoffs, and report results. Develop and iterate prototypes with feedback.' },
  { code: 'CS 260', title: 'Web Programming', description: 'Introduction to building and deploying full stack web applications using core technologies, frameworks, protocols, and development tools.' },
  { code: 'CS 270', title: 'Introduction to Machine Learning', description: 'Fundamental models of machine learning, such as neural networks, decision trees, clustering, Bayesian learning, ensembles, reinforcement learning, and deep learning.', credits: 3 },
  { code: 'CS 291', title: 'Careers in Computer Science', description: 'Career advising for students in computer science. Advice on resumes, applications, and interviews for internships, jobs, and graduate school.', credits: 0.5 },
  { code: 'CS 301R', title: 'Topics in Computer Science', description: 'Undergraduate-level topics as announced.' },
  { code: 'CS 312', title: 'Algorithm Design and Analysis', description: 'Design and analysis of algorithms as solutions to problems including dynamic programming, greedy algorithms, divide-and-conquer, graph algorithms, and intelligent search algorithms.', credits: 3 },
  { code: 'CS 324', title: 'Systems Programming', description: 'Systems programming principles: Linux systems programming, multiprocessing, concurrency, exceptional control flow, caching, sockets, protocols, and non-blocking I/O.' },
  { code: 'CS 329', title: 'Quality Assurance and Developer Operations', description: 'Production software testing, deployment, and management strategies, focusing on automation, security, CI/CD, scalability, and resilience.' },
  { code: 'CS 330', title: 'Concepts of Programming Languages', description: 'Principles and concepts characterizing high-level programming languages, functional programming, logic programming, scanners, and parsers.' },
  { code: 'CS 340', title: 'Software Design', description: 'Design, development, testing and refactoring techniques to build and evolve reliable, maintainable and scalable software systems; architecture and design patterns.' },
  { code: 'CS 345', title: 'Operating Systems Design', description: 'Principles and concepts of operating systems design and implementation.' },
  { code: 'CS 355', title: 'Interactive Graphics and Image Processing', description: 'Basic concepts of computer graphics and image processing: cameras and displays; color models; basic image processing algorithms; 2D and 3D transforms; rendering fundamentals.' },
  { code: 'CS 356', title: 'Advanced Techniques in Human Computer Interaction', description: 'Designing the user experience and implementing technology; website design, information architecture, design for broader ecosystems, prototyping and feedback.' },
  { code: 'CS 393', title: 'Collaborative Problem Solving', description: 'Strengthen problem-solving skills through targeted practice to prepare for technical/coding interviews.' },
  { code: 'CS 401R', title: 'Topics in Computer Science', description: 'Undergraduate level subjects as announced before each semester.' },
  { code: 'CS 404', title: 'Ethics and Computers in Society', description: 'Societal impact of computer technology, ethical issues; reading, discussion, and writing seminar.', credits: 2 },
  { code: 'CS 405', title: 'Creating and Managing a Software Business', description: 'Entrepreneurship, product development, marketing/sales, customer support, fund raising, and effective management.' },
  { code: 'CS 412', title: 'Linear Programming and Convex Optimization', description: 'Optimization, problem formulation, and solution algorithms, with applications in control, data mining, finance, game theory, and learning.' },
  { code: 'CS 416', title: 'Advanced Algorithms', description: 'Advanced algorithms and problem solving: combinatorics, prime number theory, network flow, computational geometry, randomized algorithms, advanced DP.' },
  { code: 'CS 428', title: 'Software Engineering', description: 'Analysis, design, implementation, and testing of significant software systems.' },
  { code: 'CS 430', title: 'Formal Verification', description: 'Mathematical formalization and techniques to establish properties of data structures and programs using proof assistants.' },
  { code: 'CS 431', title: 'Algorithmic Languages and Compilers', description: 'Formal description of languages and compilation techniques: semantics, parsing, recursion, and code generation.' },
  { code: 'CS 450', title: 'Computer Vision', description: 'Fundamental concepts and algorithms of computer vision: feature extraction, detection, segmentation, recognition, motion, 3D vision.' },
  { code: 'CS 452', title: 'Database Modeling Concepts', description: 'Database models: relational, deductive, object-oriented; integrity constraints, query languages, database design.' },
  { code: 'CS 453', title: 'Fundamentals of Information Retrieval', description: 'Concepts and terminology of IR systems and fundamental IR models: Boolean, Vector Space, Probabilistic models, and evaluation.' },
  { code: 'CS 455', title: 'Computer Graphics', description: 'Interactive computer graphics systems programming and architecture.' },
  { code: 'CS 456', title: 'Mobile and Ubiquitous HCI', description: 'Iterative UX design for mobile and ubiquitous computing with prototyping and critique; open-ended project.' },
  { code: 'CS 460', title: 'Computer Communications and Networking', description: 'Introduction to data communications and computer networking; communications fundamentals, protocols, architecture.' },
  { code: 'CS 462', title: 'Large-Scale Distributed System Design', description: 'Design and building of distributed systems: architectures, reliability, availability, scalability, cloud computing and APIs.' },
  { code: 'CS 465', title: 'Computer Security', description: 'Introduction to computer security fundamentals: confidentiality, integrity, cryptography, network security protocols.' },
  { code: 'CS 466', title: 'Blockchain Technologies', description: 'Technical underpinnings of blockchain-based systems, cryptocurrency, smart contracts, decentralized finance, and Web3.' },
  { code: 'CS 470', title: 'Introduction to Artificial Intelligence', description: 'Core areas of AI: intelligent agents, problem solving and search, knowledge-based systems, planning, learning, and perception.' },
  { code: 'CS 471', title: 'Voice User Interfaces', description: 'Methods and development platforms for Voice User Interfaces; differences from visual interfaces, ASR and dialog systems.' },
  { code: 'CS 472', title: 'Introduction to Machine Learning', description: 'Machine learning models and mechanisms allowing computers to learn and find knowledge from data.' },
  { code: 'CS 473', title: 'Advanced Machine Learning', description: 'Advanced machine learning topics including neural networks, decision trees, clustering, Bayesian learning, ensembles, reinforcement learning, and deep learning.' },
  { code: 'CS 474', title: 'Introduction to Deep Learning', description: 'Theory and practice of deep learning including machine vision, language, dynamical systems, and mathematical foundations.' },
  { code: 'CS 477R', title: 'Secondary Minor Student Teaching', description: 'Supervised experience developing and demonstrating competence in teaching minor area content in secondary classroom.' },
  { code: 'CS 479', title: 'Introduction to Machine Translation', description: 'Evolution of machine translation technologies and algorithms, statistical and neural models, multilingual models, and quality evaluation.' },
  { code: 'CS 480', title: 'Software Engineering Capstone 1', description: 'Culminating team project: plan, design, implement, test, and demonstrate a major project.' },
  { code: 'CS 481', title: 'Software Engineering Capstone 2', description: 'Continuation of capstone experience.' },
  { code: 'CS 482', title: 'Data Science Capstone 1', description: 'Culminating team data science project.' },
  { code: 'CS 483', title: 'Data Science Capstone 2', description: 'Continuation of data science capstone project.' },
  { code: 'CS 486', title: 'Verification and Validation', description: 'Foundational topics in verification and validation; logics to specify properties, verification techniques, and advanced formal verification topics.' },
  { code: 'CS 493R', title: 'Computing Competitions', description: 'Teams prepare for and compete in CS competitions in programming, data science, and ethical hacking.' },
  { code: 'CS 494', title: 'Capstone 1', description: 'Culminating team project focusing on planning, design, testing, and demonstration.' },
  { code: 'CS 495', title: 'Capstone 2', description: 'Continuation of capstone sequence.' },
  { code: 'CS 497R', title: 'Undergraduate Research', description: 'Course credit for undergraduate research under faculty supervision.' },
  { code: 'CS 498R', title: 'Undergraduate Special Projects', description: 'Independent problem solving with faculty guidance.' },
  { code: 'CS 500', title: 'Business Career Essentials in Science and Math', description: 'Introduction to careers in industry: project planning, presentations, business accounting, and technology readiness.' },
  { code: 'CS 501R', title: 'Advanced Topics in Computer Science', description: 'Advanced undergraduate- and graduate-level subjects as announced.' },
  { code: 'CS 502', title: 'Job Search Strategies', description: 'Assists graduating students in identifying and connecting to potential employers.' },
  { code: 'CS 513', title: 'Robust Control', description: 'Analysis and design of feedback systems to perform under model uncertainty.' },
  { code: 'CS 556', title: 'Research Methods in HCI', description: 'Qualitative and quantitative methods for HCI research: interviews, observations, surveys, measurements, ethical considerations.' },
  { code: 'CS 574', title: 'Transformer Models for NLP', description: 'State of the art transformer language models for NLP tasks: classification, generation, QA, translation.' },
  { code: 'CS 575', title: 'Introduction to Graph Data Science', description: 'Using graph structures to explore labeled data, community detection, and graph models.' },
  { code: 'CS 580', title: 'Theory of Predictive Modeling', description: 'Foundations of machine learning, control, and physical modeling; causality and uncertainty.' },
  { code: 'CSANM 150', title: 'Introduction to Three-Dimensional Computer Graphics', description: 'Fundamentals of modeling, texturing, lighting, and rendering.' },
  { code: 'DESAN 101', title: 'Introduction to Design and Animation', description: 'Foundational principles of design and animation including visual storytelling, composition, timing, and an introduction to industry tools and workflows.', credits: 3 },
  { code: 'CSANM 210', title: 'Visual Narrative for Animation', description: 'Foundational skills for animation: cinematography, layout, composition, and storytelling.' },
  { code: 'CSANM 250', title: 'Intermediate Three-Dimensional Computer Graphics', description: 'Fundamentals of building 3D models and setting up model rigs.' },
  { code: 'CSANM 252', title: 'Introduction to Three-Dimensional Animation', description: 'Principles and techniques of 3D animation including timing, pacing, and character setup.' },
  { code: 'CSANM 258', title: 'Scripting for Animation', description: 'Scripting skills to procedurally build models, rigs, and animation tools.' },
  { code: 'CSANM 340', title: 'Introduction to Game Design', description: 'Introductory course in game design covering foundational game elements and design processes.' },
  { code: 'CSANM 342', title: 'Real-time Techniques', description: 'Principles for creating real-time applications and basic game mechanics in engines like Unreal.' },
  { code: 'CSANM 351R', title: 'Lighting for 3D Graphics', description: 'Lighting and color, compiling elements for final images in 3D applications.' },
  { code: 'CSANM 352', title: 'Animated Film Production 1', description: 'Early development of a film: character design, environments, pipeline, visual effects.' },
  { code: 'CSANM 353', title: 'Previsualization', description: 'Technical aspects of previsualization using 3D software and cameras.' },
  { code: 'CSANM 354', title: 'Materials and Surfacing', description: 'Shading and rendering techniques for visual effects.' },
  { code: 'CSANM 355', title: 'Photography for Animation', description: 'Layout, references, camera technology, composition, lighting, and core art skills.' },
  { code: 'CSANM 450', title: 'Animated Film Production 2', description: 'In-depth computer animations and visual effects; senior film production.' },
  { code: 'CSANM 452', title: 'Animated Film Production 3', description: 'Portfolio development and advanced animation projects.' },
  { code: 'CSANM 453R', title: 'Special Topics in Advanced Graphics', description: 'Research new technologies in animation and visualization.' },
  { code: 'CSANM 454', title: 'Advanced Shading', description: 'Advanced shading, rendering, and lighting methods.' },
  { code: 'CSANM 458R', title: 'Three-Dimensional Visual Effects', description: 'Procedure and 3D animation methods to create realistic special effects.' },
  { code: 'CSANM 459', title: 'Video Game Production 1', description: 'Prototyping to develop game experience ideas and team participation.' },
  { code: 'CSANM 460', title: 'Video Game Production 2', description: 'Polishing a video game for production as a team.' },
  { code: 'CSANM 494R', title: 'Special Problems in Animation', description: 'Individual study in area of special interest.' },
  { code: 'CSANM 497R', title: 'BFA Final Project', description: 'Advanced individual project showing competence within chosen major.' },
  { code: 'STAT 180', title: 'Introduction to Data Science', description: 'Statistics; linear algebra; ML; data cleaning and visualization; data literacy.', credits: 3 }
  ,{ code: 'MATH 112', title: 'Calculus 1', description: 'Differential and integral calculus of one variable.', credits: 4 }
  ,{ code: 'MATH 113', title: 'Calculus 2', description: 'Continuation of Calculus 1: techniques of integration, series.', credits: 4 }
  ,{ code: 'MATH 213', title: 'Elementary Linear Algebra', description: 'Matrices, systems of equations, vector spaces, determinants.', credits: 2 }
  ,{ code: 'MATH 215', title: 'Computational Linear Algebra', description: 'Applied linear algebra computations.', credits: 1 }
  ,{ code: 'MATH 290', title: 'Fundamentals of Mathematics', description: 'Proof techniques and fundamental structures.', credits: 3 }
  ,{ code: 'MATH 431', title: 'Probability Theory', description: 'Mathematical theory of probability.', credits: 3 }
  ,{ code: 'STAT 121', title: 'Intro to Statistical Data Analysis', description: 'Introduction to statistics for data analysis.', credits: 3 }
  ,{ code: 'STAT 201', title: 'Statistics for Engineers & Scientists', description: 'Applied statistics for engineering and science contexts.', credits: 3 }
  ,{ code: 'STAT 220', title: 'Stat Modeling for Data Science', description: 'Statistical modeling techniques in data science.', credits: 3 }
  ,{ code: 'PHSCS 121', title: 'Intro to Newtonian Mechanics', description: 'Fundamental principles of mechanics.', credits: 3 }
  ,{ code: 'WRTG 316', title: 'Technical Communication', description: 'Professional and technical writing.', credits: 3 }
  ,{ code: 'EC EN 220', title: 'Fund of Digital Systems', description: 'Digital logic and system fundamentals.', credits: 3 }
  ,{ code: 'EC EN 330', title: 'Intro Embedded Programming', description: 'Embedded system programming principles.', credits: 4 }
  ,{ code: 'EC EN 427', title: 'Embedded Systems', description: 'Advanced embedded system design.', credits: 4 }
  ,{ code: 'IS 567', title: 'Cybersecurity & Pen Testing', description: 'Cybersecurity principles and penetration testing.', credits: 3 }
  ,{ code: 'MATH 485', title: 'Mathematical Cryptography', description: 'Mathematics behind cryptographic systems.', credits: 3 }
  ,{ code: 'BIO 130', title: 'Biology', description: 'Foundational principles of biology: cells, genetics, evolution, ecology.', credits: 4 }
  ,{ code: 'BIO 165', title: 'Introduction to Bioinformatics', description: 'Overview of bioinformatics concepts, tools, and data analysis techniques.', credits: 3 }
  ,{ code: 'BIO 264', title: 'Stat Analysis for Biologists', description: 'Statistics methods applied to biological data.', credits: 4 }
  ,{ code: 'BIO 364', title: 'Bioinformatics Algorithms', description: 'Algorithms used in bioinformatics: sequence alignment, clustering, phylogenetics.', credits: 3 }
  ,{ code: 'BIO 465', title: 'Capstone in Bioinformatics', description: 'Team-based capstone applying bioinformatics methods to real datasets.', credits: 3 }
  ,{ code: 'MMBIO 240', title: 'Molecular Biology', description: 'Molecular mechanisms governing cells and organisms.', credits: 3 }
  ,{ code: 'PWS 340', title: 'Genetics', description: 'Principles of heredity and genetic analysis.', credits: 3 }
  ,{ code: 'CHEM 105', title: 'Gen College Chem 1+Lab Integr', description: 'General chemistry with integrated laboratory.', credits: 4 }
  ,{ code: 'BIO 250', title: 'Evolutionary Medicine', description: 'Evolutionary principles in the context of human health and disease.', credits: 2 }
  ,{ code: 'BIO 420', title: 'Evolutionary Biology', description: 'Advanced study of evolutionary mechanisms and patterns.', credits: 4 }
  ,{ code: 'BIO 463', title: 'Genetics of Human Disease', description: 'Genetic basis of human diseases and analysis approaches.', credits: 3 }
]
