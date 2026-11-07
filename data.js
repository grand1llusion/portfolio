// The timeline. One scene per year; each callout points at a real object in that year's illustration.
// x and y are percentages of the image. "screen" is where the computer screen sits: it opens the terminal.
window.JOURNEY = [
  { year: 2001, age: 12, chapter: 'The first spark', headline: 'A bedroom. A computer. A hundred questions.',
    summary: 'When my family upgraded its computer, the old one moved into my bedroom. Installing a graphics card introduced me to the parts inside the case, and I started taking it apart to learn how they worked together.',
    note: 'Gaming and hardware', screen: [40, 40],
    callouts: [
      { x: 67, y: 50, label: 'The graphics card', text: 'When the old family computer came to my room, I learned what a GPU was and got one to install. That was my first look inside the case.' },
      { x: 80, y: 40, label: 'Ribbon cables', text: 'Then the taking-apart began: tracing each ribbon cable to find out what it connected and how the pieces worked together. That curiosity started everything.' },
      { x: 18, y: 67, label: 'The first controller', text: 'It really started in 1996, when my family got its first NES. I loved gaming, and it was my first connection to technology.' } ] },

  { year: 2005, age: 16, chapter: 'Making it mine', headline: 'The internet became something I could change.',
    summary: 'I used HTML and CSS to customize MySpace pages, learning by experimenting. Online gaming communities led me to write chatroom bots that handled specific tasks.',
    note: 'HTML, CSS and online games', screen: [36, 40],
    callouts: [
      { x: 41, y: 36, label: 'My MySpace page', text: 'MySpace was the big social platform, and advanced users customized their pages with HTML and CSS. I built several and never stopped changing them, learning what each section did.' },
      { x: 12, y: 64, label: 'Still playing', text: 'Blizzard games and their online communities kept me playing, and pulled me toward programming.' },
      { x: 88, y: 66, label: 'Chatroom bots', text: 'Those communities led me to write chatroom bots that performed specific tasks: my first programs that did real work for other people.' } ] },

  { year: 2008, age: 19, chapter: 'Learning the foundations', headline: 'Programming, mathematics, and a bigger world.',
    summary: 'I started electrical engineering at Michigan Technological University, my hometown university, and realized how much I loved programming, math and engineering.',
    note: 'Electrical engineering, years 1–2', screen: [42, 38],
    callouts: [
      { x: 62, y: 36, label: 'Code and signals', text: 'Engineering showed me how much I loved programming. This is where I became a lifelong learner.' },
      { x: 22, y: 58, label: 'The breadboard', text: 'Coursework put circuits in my hands and tied programming, math and hardware together.' },
      { x: 84, y: 66, label: 'The math', text: 'I completed the first two years of an electrical engineering bachelor’s degree.' } ] },

  { year: 2012, age: 23, chapter: 'The real beginning', headline: 'Curiosity became a profession.',
    summary: 'I joined the Army as a Small Electronics Repairman: soldering irons, calibration equipment and diagnostic tools, on computers, radios and tactical electronic gear.',
    note: 'Small Electronics Repairman', screen: [36, 40],
    callouts: [
      { x: 14, y: 60, label: 'The soldering station', text: 'I joined the Army as a Small Electronics Repairman and got to use soldering irons and calibration tools every day. This is where I was able to shine.' },
      { x: 66, y: 42, label: 'Radios on the bench', text: 'I took apart and repaired computers, radios and tactical electronic gear.' },
      { x: 80, y: 52, label: 'The multimeter', text: 'Diagnostic tools turned curiosity into useful work: find the fault, fix it, prove it works.' } ] },

  { year: 2013, age: 24, chapter: 'Learning to lead', headline: 'Take responsibility. Help the team succeed.',
    summary: 'I finished Basic Combat Training and Advanced Individual Training, graduated AIT with honors, and got my first look at leadership in my training platoons.',
    note: 'AIT, graduated with honors', screen: [40, 38],
    callouts: [
      { x: 76, y: 30, label: 'AIT honors', text: 'I finished Basic Combat Training and Advanced Individual Training, and graduated AIT with honors.' },
      { x: 76, y: 66, label: 'The training notebook', text: 'My first glimpse of what leadership looks like: I took on leadership roles in my training platoons.' },
      { x: 18, y: 46, label: 'The test bench', text: 'Scopes, power supplies and soldering tools became everyday equipment.' } ] },

  { year: 2014, age: 25, chapter: 'A growing family', headline: 'Repairing systems. Becoming a father.',
    summary: 'I kept repairing radios, computers and other electronics. Our first child, a daughter, was born, and she became the focus of my year.',
    note: 'Repair work', screen: [36, 36],
    callouts: [
      { x: 81, y: 46, label: 'Radios and computers', text: 'Most of my work was repairing radios, computers and other electronic equipment.' },
      { x: 60, y: 44, label: 'Board-level repair', text: 'Find the fault, fix the board, get the gear back to the people who need it.' },
      { x: 94, y: 66, label: 'Tiny shoes', text: 'Our first child, a daughter, was born. That year my focus was almost all on her.' } ] },

  { year: 2015, age: 26, chapter: 'Owning the mission', headline: 'From repairing equipment to supporting a unit.',
    summary: 'I pushed to become the Communications NCO, responsible for the unit’s comms equipment, and learned classic help-desk work with the battalion S6 team.',
    note: 'Communications and help desk', screen: [32, 40],
    callouts: [
      { x: 12, y: 52, label: 'The comms rack', text: 'I pushed to become the Communications NCO, in charge of the unit’s comms equipment: management, fielding and acquisition.' },
      { x: 64, y: 35, label: 'Help desk', text: 'Working with the battalion S6 team taught me the classic help-desk work.' },
      { x: 82, y: 50, label: 'Fielding systems', text: 'I began fielding equipment at the field and tactical levels.' } ] },

  { year: 2016, age: 27, chapter: 'Building expertise', headline: 'From exploring systems to understanding their impact.',
    summary: 'I pushed into classes on the technologies used across the Army and industry, and lifelong learning became a habit. I earned CompTIA A+. Our second child was born.',
    note: 'CompTIA A+', screen: [30, 40],
    callouts: [
      { x: 92, y: 62, label: 'A+ study cards', text: 'I earned CompTIA A+, my first certification.' },
      { x: 79, y: 68, label: 'The coursework', text: 'I started taking classes on the technologies available to the Army and to industry. That is when lifelong learning really took hold.' },
      { x: 10, y: 52, label: 'The network switch', text: 'Supporting communications systems by day, studying the technology behind them by night, while making time for a growing family.' } ] },

  { year: 2017, age: 28, chapter: 'Learning and teaching', headline: 'Understanding it well enough to help someone else.',
    summary: 'The Army accepted me into the Green to Gold program. I switched my degree from electrical engineering to Cybersecurity and Digital Forensics, and volunteered to help teach difficult concepts in class.',
    note: 'Green to Gold', screen: [30, 40],
    callouts: [
      { x: 91, y: 36, label: 'The whiteboard', text: 'Accepted into the Army’s Green to Gold program, I went back to school and switched from electrical engineering to Cybersecurity and Digital Forensics.' },
      { x: 16, y: 74, label: 'Class notes', text: 'I volunteered for extra roles in class and helped classmates with difficult concepts. Teaching something is the best way to learn it.' },
      { x: 93, y: 62, label: 'Cyber textbooks', text: 'Security, networking and forensics: a new field, and the one I stayed in.' } ] },

  { year: 2018, age: 29, chapter: 'Leading a community', headline: 'Make room for others to learn.',
    summary: 'I became president of the Cyber Forensics Club and joined the Honors program. I was also recognized as a National and State certified Journeyman Electronics Technician.',
    note: 'Journeyman, Electronics Technician', screen: [32, 40],
    callouts: [
      { x: 27, y: 63, below: true, label: 'The magnifying glass', text: 'I became president of the Cyber Forensics Club at school.' },
      { x: 85, y: 32, label: 'The investigation board', text: 'I joined the Honors program.' },
      { x: 16, y: 64, label: 'The evidence drive', text: 'Digital forensics coursework: learning to follow the evidence. The same year, my repair years were recognized as a National and State certified Journeyman, Electronics Technician.' } ] },

  { year: 2019, age: 30, chapter: 'A new chapter', headline: 'An officer, a graduate, and a father of three.',
    summary: 'I completed my B.S. in Cybersecurity and Digital Forensics, commissioned as an officer, moved to another state, and our third child was born.',
    note: 'B.S., Cybersecurity and Digital Forensics', screen: [38, 42],
    callouts: [
      { x: 5, y: 42, label: 'The crutches', text: 'I broke my foot and had to drop out of my Cyber BOLC course, which forced me to take a knee and recover.' },
      { x: 9, y: 60, label: 'Network upgrades', text: 'While recovering, I helped the S6 section upgrade network infrastructure and manage process flow, and learned more about offensive cyber.' },
      { x: 19, y: 70, label: 'Raspberry Pi', text: 'I tinkered with Raspberry Pi boards a lot that year.' } ] },

  { year: 2020, age: 31, chapter: 'Leading with presence', headline: 'Becoming the leader I wanted to be.',
    summary: 'I focused on becoming a more present leader, and earned CompTIA Security+.',
    note: 'CompTIA Security+', screen: [36, 40],
    callouts: [
      { x: 7, y: 57, label: 'Security+', text: 'I earned CompTIA Security+.' },
      { x: 88, y: 70, label: 'The compass', text: 'I focused on becoming a more present leader for the people I worked with.' } ] },

  { year: 2021, age: 32, chapter: 'Teaching in the field', headline: 'Help others put their skills to work.',
    summary: 'I grounded my Army knowledge and helped deliver field training to hundreds of cyber officers, so their cyber skills stayed usable alongside their field skills.',
    note: 'Field training', screen: [32, 42],
    callouts: [
      { x: 72, y: 66, label: 'The training plan', text: 'I helped deliver field training to hundreds of cyber officers, so their cyber skills stayed usable alongside their field skills.' },
      { x: 16, y: 50, label: 'The GPS', text: 'Field skills mattered too: I worked hard to ground my own Army knowledge.' },
      { x: 92, y: 55, label: 'The field kit', text: 'Training happened in the field, not just the classroom.' } ] },

  { year: 2022, age: 33, chapter: 'Understanding operations', headline: 'See the network. Understand the consequences.',
    summary: 'I moved to an offensive cyber team and dug into how operations are performed, what new technologies mean, and why patching matters. I earned CompTIA Network+.',
    note: 'CompTIA Network+', screen: [36, 40],
    callouts: [
      { x: 58, y: 34, label: 'Operations', text: 'I moved to an offensive cyber team and dug into how operations are performed and what new technologies mean when they come out.' },
      { x: 7, y: 55, label: 'The patch panel', text: 'Networking became my main interest, and I earned CompTIA Network+.' },
      { x: 83, y: 60, label: 'Why patching matters', text: 'Seeing the offensive side taught me why patching is so important.' } ] },

  { year: 2023, age: 34, chapter: 'Developing the craft', headline: 'Technical understanding needs clear communication.',
    summary: 'I kept building offensive security fundamentals and worked on report writing. I earned CompTIA CySA+.',
    note: 'CompTIA CySA+', screen: [32, 42],
    callouts: [
      { x: 72, y: 58, label: 'The report', text: 'I worked on report writing: findings only help if someone else can understand and act on them.' },
      { x: 8, y: 52, label: 'CySA+', text: 'I earned CompTIA CySA+.' },
      { x: 84, y: 40, label: 'The fundamentals', text: 'I kept working on offensive security fundamentals.' } ] },

  { year: 2024, age: 35, chapter: 'The instructor', headline: 'Make difficult ideas easier to understand.',
    summary: 'I moved to the Cyber School as an instructor, learned Kolb’s model and experiential learning, and realized how much I want to keep teaching. I earned Certified ScrumMaster.',
    note: 'Certified ScrumMaster', screen: [38, 40],
    callouts: [
      { x: 10, y: 34, label: 'The whiteboard', text: 'I moved to the Cyber School to become an instructor, and realized how much I want to keep teaching.' },
      { x: 6, y: 58, label: 'Kolb and experiential learning', text: 'I learned the basics of Kolb’s model: people learn best by doing, then reflecting on it.' },
      { x: 75, y: 68, label: 'Mentoring notes', text: 'I started mentoring more people on the side: on careers, and on making complex situations easy to understand.' } ] },

  { year: 2025, age: 36, chapter: 'Planning the defense', headline: 'Bring technical knowledge into the plan.',
    summary: 'I kept teaching, then became a Cyber Operations Planner for defensive cyber operations. I started attending conferences and won a CrowdStrike AI CTF.',
    note: 'Cyber Operations Planner', screen: [40, 42],
    callouts: [
      { x: 57, y: 33, label: 'The defense plan', text: 'I moved from teaching to planning defensive cyber operations. Learning the job came first, so certifications waited.' },
      { x: 9, y: 75, label: 'The conference badge', text: 'I started attending conferences such as the Rocky Mountain Cyber Symposium to learn what vendors and technologies are out there.' },
      { x: 20, y: 40, label: 'The AI CTF', text: 'I won a CrowdStrike AI capture-the-flag at the symposium.' } ] },

  { year: 2026, age: 37, chapter: 'Planning what’s next', headline: 'Cyber Operations Planner. Builder. Still a student.',
    summary: 'I earned CompTIA SecurityX, built AI agents on AWS, grew my GitHub, and won several capture-the-flag competitions. My wife and I have four children.',
    note: 'CompTIA SecurityX', screen: [30, 40],
    callouts: [
      { x: 95, y: 45, label: 'The trophies', text: 'CTF wins this year: Hammercon through CACI, a bigger one through Dragos, and smaller ones through DARPA and Zapier.' },
      { x: 14, y: 56, label: 'AI agents on AWS', text: 'I built three AI agents on AWS: AntiSOCial, SOC It To ’Em and Sprint Zero. Open the terminal and type ls projects.' },
      { x: 92, y: 63, label: 'What I’m studying', text: 'I earned CompTIA SecurityX. Next: finish my M.S. in Cybersecurity and Information Assurance, earn PenTest+ and CISM, and become a Certified Scrum Trainer.' } ] }
];

// Family portrait on the desk: how many children by each year.
window.FAMILY = { 2014: 1, 2016: 2, 2019: 3, 2026: 4 };

window.NEXT = {
  title: 'Keep learning. Help the next generation begin.',
  text: 'Finish my MBA in IT Management, earn CISSP, become a fully certified Scrum Trainer, and build an Agile portfolio. I also want to start teaching basic cybersecurity on YouTube and Skool, for students from middle school through their first two years of college.'
};
