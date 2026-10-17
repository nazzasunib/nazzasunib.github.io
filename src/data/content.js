import { GUB_BLUR } from './gubBlur';
import { GALLERY_BLUR } from './galleryBlur';

export const PROFILE = {
  name: 'Nazzas Ibn Shams Unib',
  first: 'Nazzas Ibn Shams',
  last: 'Unib',
  logo: { mark: 'NIS', tail: 'Unib.' },
  status: 'Available for opportunities · Dhaka, BD',
  roles: [
    'Textile Engineering Graduate',
    'Business Development Executive',
    'Aspiring Technologist',
    'Future-Focused Problem Solver',
  ],
  intro:
    'A Textile Engineering graduate from BGMEA University of Fashion & Technology (BUFT), currently working as a Business Development Executive at NidusLab. Passionate about business development, technology and innovation, with a focus on creating impactful digital solutions, exploring AI-driven opportunities and driving sustainable business growth.',
  badge: { title: 'Business Development Executive', sub: 'at NidusLab Ecosystem' },
  resume: 'assets/Nazzas-Ibn-Shams-Unib-Resume.pdf',
  portrait: 'assets/portrait.jpg',
  email: 'mdnazzas@gmail.com',
  phone: '+880 1312-347482',
  location: 'Gulshan 2, Dhaka, Bangladesh',
  whatsapp: '8801312347482',
  /* paste a Formspree / Web3Forms endpoint here to send messages straight to your inbox */
  formUrl: '',
  site: 'https://nazzasunib.github.io',
  mapQuery: 'Gulshan 2 Circle, Dhaka 1212, Bangladesh',
  github: 'nazzasunib',
  tagline: 'Textile · Business · Technology',
};

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact' },
];

/* secondary sections, listed in the footer only */
export const NAV_MORE = [
  { id: 'textile', label: 'Textile' },
  { id: 'business', label: 'Business' },
  { id: 'casestudy', label: 'Case Study' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'now', label: 'Now' },
  { id: 'social', label: 'Social' },
];

export const ABOUT_PARAGRAPHS = [
  "I'm a Textile Engineering graduate from BGMEA University of Fashion & Technology (BUFT), currently working as a Business Development Executive at NidusLab. My background combines technical knowledge of the textile and apparel industry with hands-on experience in business development, giving me a unique perspective on both industry operations and business growth.",
  'During my internship at a composite textile factory, I gained practical exposure to spinning, knitting, dyeing and apparel operations while also working on order costing, buyer communication and marketing activities. Alongside my academic journey, I took on leadership roles in four university clubs where I managed media, organized events and coordinated volunteer teams.',
  "Today, I'm expanding my expertise in business development, web technologies, artificial intelligence and digital innovation. I believe the future of businesses will be driven not only by industry expertise but also by data, automation and intelligent technology.",
  'My goal is to combine engineering knowledge, business insight and emerging technologies to build smarter digital solutions, create meaningful business opportunities and drive sustainable business growth.',
];

export const ABOUT_STATS = [
  { value: 4, suffix: '', label: 'Club Leadership Roles' },
  { value: 2022, suffix: '', label: 'B.Sc. Started', plain: true },
  { value: 3, suffix: '+', label: 'Domains Blended' },
];

export const EDUCATION = [
  {
    title: 'B.Sc. in Textile Engineering',
    org: 'BGMEA University of Fashion & Technology · 2022 – Present, Batch 222',
    desc: 'Final-year coursework spanning spinning, knitting, dyeing, apparel manufacturing and quality control.',
  },
  {
    title: 'Higher Secondary Certificate (Science)',
    org: 'Bangla Bazar Fatema Khanam College · Passed 2021',
    desc: 'Built the scientific foundation that led into textile engineering.',
  },
  {
    title: 'Secondary School Certificate (Science)',
    org: 'Joynagar Secondary School · Passed 2019',
    desc: 'Where the curiosity for how things are made first took shape.',
  },
];

/* Skill domains. `tone` keys into the palette; order sets the filter order. */
export const SKILL_GROUPS = [
  { id: 'textile', label: 'Textile & Manufacturing', short: 'Textile', tone: 'saffron' },
  { id: 'business', label: 'Business & Commercial', short: 'Business', tone: 'vermilion' },
  { id: 'tech', label: 'Technology', short: 'Technology', tone: 'jade' },
  { id: 'human', label: 'Human Skills', short: 'Human', tone: 'iris' },
];

/* `value` is a self-assessed proficiency, rendered as a named level plus a
   segmented meter rather than a bare percentage. `note` is the evidence
   behind the claim — it is what the readout panel shows. */
export const SKILLS = [
  {
    name: 'Textile Engineering',
    group: 'textile',
    icon: 'weave',
    note: 'B.Sc. at BUFT plus mill-floor time across spinning, knitting, dyeing and apparel units.',
  },
  {
    name: 'Quality Assurance',
    group: 'textile',
    icon: 'check',
    note: 'Analysed fabric types, yarn counts and fabric quality for an academic project.',
  },
  {
    name: 'Textile Manufacturing',
    group: 'textile',
    icon: 'pulse',
    note: 'Followed the integrated workflow of a composite factory end to end.',
  },
  {
    name: 'Business Development',
    group: 'business',
    icon: 'trend',
    note: 'Building pipeline and partnerships as Business Development Executive at NidusLab.',
  },
  {
    name: 'Marketing',
    group: 'business',
    icon: 'bars',
    note: 'Factory marketing support, campus campaigns and event promotion across four clubs.',
  },
  {
    name: 'Sales',
    group: 'business',
    icon: 'compass',
    note: 'Outreach and pricing planned around real buyer behaviour, not guesswork.',
  },
  {
    name: 'GitHub / Git',
    group: 'tech',
    icon: 'code',
    note: 'Version control for personal projects, experiments and this portfolio.',
  },
  {
    name: 'AI & Emerging Tech',
    group: 'tech',
    icon: 'chip',
    note: 'Working with AI-driven career tooling around the NidusJob platform.',
  },
  {
    name: 'Web Technologies',
    group: 'tech',
    icon: 'laptop',
    note: 'HTML, CSS and JavaScript — including the site you are reading.',
  },
  {
    name: 'Communication',
    group: 'human',
    icon: 'chat',
    note: 'Buyer correspondence, B2B follow-up and speaking at university seminars.',
  },
  {
    name: 'Leadership',
    group: 'human',
    icon: 'users',
    note: 'Four club leadership roles, coordinating media, events and volunteer teams.',
  },
];
export const EXPERIENCE = [
  {
    title: 'Business Development Executive',
    org: 'NidusLab',
    desc: 'Building partnerships and pipeline for NidusLab products, including the AI-powered job marketplace NidusJob, and running campus outreach such as the AI & Career Guidance Seminar at Green University of Bangladesh.',
    tag: 'Work',
    points: [
      'Build partnerships and pipeline for NidusLab products.',
      'Work on NidusJob, the AI-powered job marketplace.',
      'Run campus outreach, such as the AI & Career Guidance Seminar at Green University of Bangladesh.',
    ],
    related: [
      { label: 'Case study', id: 'casestudy' },
      { label: 'Events', id: 'events' },
    ],
  },
  {
    title: 'Internship — Integrated Workflow & Merchandising',
    org: 'Rising Knit Textiles Ltd',
    desc: 'Covered spinning, knitting, dyeing and apparel units; handled order costing, buyer communication and marketing.',
    tag: 'Industry',
    points: [
      'Worked across spinning, knitting, dyeing and apparel units.',
      'Handled order costing and buyer communication.',
      'Supported marketing work.',
    ],
    related: [
      { label: 'Textile expertise', id: 'textile' },
      { label: 'Fabric project', id: 'fabric' },
    ],
  },
  {
    title: 'Assistant Press & Media Secretary',
    org: 'BUFT Textile Club',
    desc: 'Managed social media content and event promotions for the club.',
    tag: 'Leadership',
    points: ['Managed social media content for the club.', 'Promoted club events.'],
    related: [{ label: 'Achievements', id: 'achievements' }],
  },
  {
    title: 'Joint Secretary (formerly Press & Media Secretary)',
    org: 'BUFT Social Welfare Club',
    desc: 'Coordinated overall club activities, supported executive decisions and led media coverage for events.',
    tag: 'Leadership',
    points: [
      'Coordinated overall club activities.',
      'Supported executive decisions.',
      'Led media coverage for events.',
    ],
    related: [{ label: 'Achievements', id: 'achievements' }],
  },
  {
    title: 'Volunteer — National Job Fest',
    org: 'BUFT Career Development Club',
    desc: 'Assisted in organizing and managing a national-level job fair.',
    tag: 'Volunteer',
    points: ['Helped organize and manage a national-level job fair.'],
    related: [{ label: 'Events', id: 'events' }],
  },
  {
    title: 'Event Organizer & Volunteer — Tarunner Utsob 2025',
    org: 'BUFT Debate Club',
    desc: 'Organized event activities and managed volunteer coordination.',
    tag: 'Events',
    points: ['Organized event activities.', 'Managed volunteer coordination.'],
    related: [{ label: 'Achievements', id: 'achievements' }],
  },
  {
    title: 'Academic Project — Textile Fabric Analysis',
    org: 'BUFT',
    desc: 'Analyzed fabric types, yarn counts and fabric quality; built technical reporting and teamwork skills.',
    tag: 'Academic',
    points: [
      'Analyzed fabric types and yarn counts.',
      'Assessed fabric quality.',
      'Built technical reporting and teamwork skills.',
    ],
    related: [{ label: 'Project deep dive', id: 'fabric' }],
  },
];

export const PROJECT_IMAGES = {
  'mealmate': 'assets/MealMate.png',
  'task-management': 'assets/Task Management.png',
  'niduslab-finance': 'assets/NidusLab Finance.png',
};

export const projectImage = (name) =>
  PROJECT_IMAGES[String(name || '').trim().toLowerCase()] || null;

/* ---------- Featured apps: click a card to read the full details ---------- */
export const FEATURED_PROJECTS = [
  {
    id: 'task-management',
    repoName: 'task-management',
    name: 'Task Management',
    tagline: 'Plan your day, get reminded, finish the work.',
    logo: 'assets/Task Management.png',
    tags: ['Web', 'Android', 'Offline', 'Reminders'],
    about: [
      'Task Management helps you plan your day and finish your work. Add tasks, set a time, and get a reminder on your phone before the work is due.',
      'It works on the web and as an Android app. It also works with no internet: whatever you change offline saves on your phone and syncs when you go back online.',
    ],
    features: [
      { t: 'Simple tasks', d: 'Add a task with a title, date and optional time. Mark it done when finished.' },
      { t: 'Meetings', d: 'Put a time on a meeting and get an early warning.' },
      { t: 'Long tasks', d: 'Pick a start and end date for work that takes many days.' },
      {
        t: 'Smart reminders on your phone',
        d: 'They show even when the app is closed:',
        sub: [
          'Meeting: 20 minutes and 2 minutes before.',
          'Task with a time: 15 minutes before.',
          'Task with no time: a list of what is left at 9:00 AM, 2:30 PM, 5:00 PM and 11:40 PM.',
          'Overdue task: every morning at 8:30 AM until you finish it.',
          'Done tasks never remind you again.',
        ],
      },
      { t: 'Your own times', d: 'Change every reminder time in Settings.' },
      { t: 'Works offline', d: 'Add and edit tasks with no internet. They sync when you reconnect.' },
      { t: 'Sync across devices', d: 'Log in on your phone and your computer to see the same tasks.' },
      { t: 'Private login', d: 'Your tasks belong only to you.' },
    ],
    links: [
      { label: 'Open website', url: 'https://task-management-indol-eta.vercel.app', kind: 'web' },
      { label: 'Android download page', url: 'https://task-management-indol-eta.vercel.app/download', kind: 'android' },
      { label: 'Direct APK', url: 'https://github.com/nazzasunib/Task-Management/releases/download/latest-apk/TaskManagement.apk', kind: 'apk' },
      { label: 'Source code', url: 'https://github.com/nazzasunib/Task-Management', kind: 'code' },
    ],
    install:
      'To install the app, open the APK and tap Install. The first time, Android asks you to allow "Install unknown apps". Allow it and go back.',
  },
  {
    id: 'money-keeper',
    repoName: 'money-keeper',
    name: 'Money Keeper',
    tagline: 'A simple money app made for people in Bangladesh.',
    logo: 'assets/MoneyKeeper.webp',
    tags: ['Web', 'Android', 'bKash · Nagad', 'Offline sync'],
    about: [
      'Money Keeper helps you see all your money in one place: cash, bank accounts, bKash, Nagad, Rocket, savings and DPS. You always know how much you have, how much you spent, and what bills are coming.',
      'It works on the web and as an Android app. Your data is saved online, so you can use the same account on your phone and your computer.',
    ],
    features: [
      { t: 'All accounts in one place', d: 'Cash, bank, bKash, Nagad, Rocket, savings, DPS, cards.' },
      { t: 'Track spending and income', d: 'Pick a category and sub-category. Transfer money between accounts.' },
      { t: 'Balance can go below zero', d: '500 in cash, spend 700, it shows -200. The app never blocks you.' },
      { t: 'Budgets', d: 'Set a monthly limit per category and get a warning when you are close.' },
      { t: 'Savings goals', d: 'Set a goal and watch progress grow.' },
      { t: 'DPS and automatic payments', d: 'Instalments and repeating bills are paid on time.' },
      { t: 'Loans', d: 'Record money you borrowed or lent. The account balance updates by itself. Paid loans move to the History tab.' },
      { t: 'Reports and charts', d: 'Income vs expense, spending by category, cash flow, net worth.' },
      { t: 'Monthly view and calendar', d: 'See any month at a glance.' },
      { t: 'Works without internet', d: 'Add data offline. It syncs when you are back online.' },
      { t: 'Phone friendly', d: 'Compact cards, quick "+" button, light and dark mode, profile photo.' },
      { t: 'Search, export and import', d: 'Find any entry and move your data in or out.' },
    ],
    audience: 'Students, job holders, business owners and families. Anyone who wants to know where their money goes.',
    links: [
      { label: 'Open web app', url: 'https://money-keeper-theta.vercel.app', kind: 'web' },
      { label: 'Android download page', url: 'https://money-keeper-theta.vercel.app/download', kind: 'android' },
      { label: 'Direct APK', url: 'https://money-keeper-theta.vercel.app/downloads/money-keeper.apk', kind: 'apk' },
    ],
    install:
      'To install on Android: open the download page on your phone, tap "Download for Android", then open the file. If your phone asks, allow installs from this source. No account yet? Tap "Try the demo" on the login page.',
  },
  {
    id: 'mealmate',
    repoName: 'mealmate',
    name: 'MealMate',
    tagline: 'Meals, bazar and money for shared houses (messes).',
    logo: 'assets/MealMate.png',
    tags: ['Web', 'Android', 'iPhone (PWA)', 'Offline'],
    about: [
      'MealMate is an app for shared houses (messes) in Bangladesh. It helps everyone in the house track meals, bazar costs, money and shopping, so nobody has to keep a notebook or argue about who owes what.',
    ],
    features: [
      { t: 'Daily meals', d: 'Mark Breakfast, Lunch and Dinner as on or off for each day. Add guest meals when a friend eats with you.' },
      { t: 'Expenses', d: 'Add, edit or delete bazar costs. Each expense shows who added it and when.' },
      { t: 'Money', d: "Record each member's deposits. See how much money is in hand." },
      { t: 'Shopping list', d: 'Make the bazar list. An Admin or Moderator can assign the list to specific members with a close date, and those members get a phone notification.' },
      { t: 'Store stock', d: 'Track what is left at home.' },
      { t: 'Settlement', d: 'See who needs to pay whom at the end of the month.' },
      { t: 'Monthly summary', d: "See the month's totals and download them as a PDF." },
      { t: 'Meal-off and guest requests', d: 'Members ask for a meal off or a guest meal. Admins and Moderators approve or reject it.' },
      { t: 'Notices', d: 'Admins and Moderators post house notices. Everyone sees them, and the newest one shows on the Dashboard for 7 days.' },
      { t: 'Notifications', d: 'A bell shows recent activity. On the Android app, important changes also send a phone notification.' },
      { t: 'Themes', d: 'Light, Dark, or System (follows your phone).' },
      { t: 'Offline use', d: 'After one visit with internet, the app still works without internet. Changes you make offline save and sync when you are back online.' },
      { t: 'Bengali text', d: 'Names and labels can show in Bangla.' },
    ],
    roles: [
      { t: 'Admin', d: 'Full control, including managing members and roles.' },
      { t: 'Moderator', d: 'Handles meals, expenses and shopping.' },
      { t: 'Member', d: 'Sees the mess data and makes requests.' },
    ],
    links: [
      { label: 'Open website', url: 'https://meal-mate-woad.vercel.app', kind: 'web' },
      { label: 'Android download page', url: 'https://meal-mate-woad.vercel.app/download', kind: 'android' },
      { label: 'Direct APK', url: 'https://github.com/nazzasunib/MealMate/releases/download/latest-apk/MealMate.apk', kind: 'apk' },
      { label: 'Source code', url: 'https://github.com/nazzasunib/MealMate', kind: 'code' },
    ],
    install:
      'Android: open the download page, install the APK, and allow notifications when asked. iPhone: open the website in Safari and choose Add to Home Screen.',
  },
];

export const FALLBACK_PROJECTS = [
  {
    name: 'Portfolio Website',
    description:
      'Personal portfolio blending textile engineering, business development and web technology.',
    html_url: 'https://github.com/nazzasunib',
    topics: ['html', 'css', 'javascript'],
  },
  {
    name: 'Textile Fabric Analysis',
    description: 'Academic project analyzing fabric types, yarn counts and quality metrics.',
    html_url: 'https://github.com/nazzasunib',
    topics: ['research', 'textile'],
  },
  {
    name: 'More on GitHub',
    description: 'Explore the full set of repositories, experiments and contributions.',
    html_url: 'https://github.com/nazzasunib?tab=repositories',
    topics: ['github'],
  },
];

export const BUSINESS = {
  eyebrow: 'Business Development',
  titleA: 'Turning conversations',
  titleB: 'into contracts.',
  sub:
    "During my internship at Rising Knit Textiles Ltd, I sat close to the merchandising desk — order costing, buyer communication, and the marketing that keeps a factory's pipeline full. That's where the business side of my work took root.",
  glyph: 'trend',
  items: [
    {
      icon: 'trend',
      title: 'Sales Strategy',
      desc: 'Planning outreach and pricing around real buyer behaviour, not guesswork.',
    },
    {
      icon: 'compass',
      title: 'Market Research',
      desc: 'Reading demand and competitor moves before committing resources.',
    },
    {
      icon: 'users',
      title: 'Client Acquisition',
      desc: 'Turning first contact with a buyer into a working relationship.',
    },
    {
      icon: 'chat',
      title: 'B2B Communication',
      desc: 'Clear, timely correspondence with buyers, factories and vendors.',
    },
    {
      icon: 'check',
      title: 'Negotiation',
      desc: 'Balancing cost, quality and timelines to close deals that hold up.',
    },
    {
      icon: 'bars',
      title: 'Business Growth & Partnerships',
      desc: 'Building the kind of relationships that outlast a single order.',
    },
  ],
};

export const TEXTILE = {
  eyebrow: 'Textile Engineering',
  titleA: 'From',
  titleB: 'fibre to finished garment.',
  sub:
    'Hands-on exposure across the full production chain at Rising Knit Textiles Ltd, plus academic work analyzing fabric structure and quality.',
  glyph: 'weave',
  items: [
    {
      icon: 'spool',
      title: 'Spinning & Knitting',
      desc: 'Followed yarn from fibre to fabric across the mill floor.',
    },
    {
      icon: 'drop',
      title: 'Dyeing',
      desc: 'Exposure to colour processing within an integrated production unit.',
    },
    {
      icon: 'check',
      title: 'Quality Control',
      desc: 'Analyzed fabric types, yarn counts and fabric quality for an academic project.',
    },
    {
      icon: 'shirt',
      title: 'Apparel & Garments',
      desc: 'Worked through apparel-unit operations end to end during internship.',
    },
    {
      icon: 'pulse',
      title: 'Textile Manufacturing',
      desc: 'Understanding the integrated workflow of a composite textile factory.',
    },
    {
      icon: 'cap',
      title: 'Industrial Experience & Education',
      desc: 'Rising Knit Textiles Ltd internship, paired with B.Sc. coursework at BUFT.',
    },
  ],
};

export const EVENTS = [
  {
    id: 'gub-2026',
    name: 'GUB 2026',
    meta: '23 August 2026 · Green University of Bangladesh',
    blurb: "NidusLab's seminar on AI, careers and the future of recruitment.",
    cover: 'assets/gub/1-1024.webp',
    coverSrcSet:
      'assets/gub/1-640.webp 640w, assets/gub/1-1024.webp 1024w, assets/gub/1-1600.webp 1600w',
    coverBlur: GUB_BLUR['1'],
    photos: [
      {
        src: 'assets/gub/1-1024.webp',
        srcSet: 'assets/gub/1-640.webp 640w, assets/gub/1-1024.webp 1024w, assets/gub/1-1600.webp 1600w',
        blur: GUB_BLUR['1'],
        alt: 'AI and Career Guidance Seminar cover',
      },
      {
        src: 'assets/gub/2-1024.webp',
        srcSet: 'assets/gub/2-640.webp 640w, assets/gub/2-1024.webp 1024w, assets/gub/2-1600.webp 1600w',
        blur: GUB_BLUR['2'],
        alt: 'Seminar award presentation',
      },
      {
        src: 'assets/gub/3-1024.webp',
        srcSet: 'assets/gub/3-640.webp 640w, assets/gub/3-1024.webp 1024w, assets/gub/3-1600.webp 1600w',
        blur: GUB_BLUR['3'],
        alt: 'Signing event documents',
      },
      {
        src: 'assets/gub/4-1024.webp',
        srcSet: 'assets/gub/4-640.webp 640w, assets/gub/4-1024.webp 1024w, assets/gub/4-1600.webp 1600w',
        blur: GUB_BLUR['4'],
        alt: 'Seminar group photo',
      },
      {
        src: 'assets/gub/5-1024.webp',
        srcSet: 'assets/gub/5-640.webp 640w, assets/gub/5-1024.webp 1024w, assets/gub/5-1600.webp 1600w',
        blur: GUB_BLUR['5'],
        alt: 'Seminar audience',
      },
      {
        src: 'assets/gub/6-1024.webp',
        srcSet: 'assets/gub/6-640.webp 640w, assets/gub/6-1024.webp 1024w, assets/gub/6-1600.webp 1600w',
        blur: GUB_BLUR['6'],
        alt: 'Seminar team photo',
      },
    ],    article: {
      title: 'GUB 2026 — AI & Career Guidance Seminar',
      blocks: [
        { t: 'h3', v: 'Empowering Students for an AI-Driven Career Future' },
        {
          t: 'p',
          v: 'The rapid growth of Artificial Intelligence is transforming the way we learn, work and build our careers. To help students understand these changes and prepare for the future of work, <strong>NidusLab</strong> organized an <strong>AI &amp; Career Guidance Seminar</strong> at <strong>Green University of Bangladesh</strong> on <strong>23 August 2026</strong>, in collaboration with the university’s <strong>Center for Career Development (CCD)</strong>.',
        },
        {
          t: 'p',
          v: 'The seminar brought together university students who were eager to learn how AI is changing the job market, what skills employers are looking for and how they can prepare themselves for a competitive career landscape.',
        },
        { t: 'h3', v: 'A Day of Learning, Networking and Career Exploration' },
        {
          t: 'p',
          v: 'The day started early with the NidusLab team setting up a dedicated booth on campus from <strong>9:00 AM</strong>. Students visited the booth throughout the day, where they learned more about NidusLab, NidusJob and the opportunities available through AI-powered career tools.',
        },
        {
          t: 'p',
          v: 'The main seminar took place from <strong>2:00 PM to 4:30 PM</strong> at the Green University campus. The session focused on the growing impact of Artificial Intelligence on careers and the importance of continuously developing relevant skills.',
        },
        { t: 'p', v: 'Students were introduced to practical insights on topics such as:' },
        {
          t: 'ul',
          v: [
            'The impact of AI on the future job market',
            'How AI is changing traditional career paths',
            'Skills students should develop for the future',
            'How to use AI as a career development tool',
            'Building a stronger and more competitive professional profile',
          ],
        },
        { t: 'h3', v: 'Connecting Students with the Future of Recruitment' },
        {
          t: 'p',
          v: 'One of the key focuses of the seminar was helping students understand how technology is changing the recruitment process.',
        },
        {
          t: 'p',
          v: 'Through <strong>NidusJob</strong>, students can explore AI-powered career features designed to make job searching smarter and more personalized. From matching candidates with suitable opportunities to improving resumes and identifying skill gaps, AI can play a meaningful role in career development.',
        },
        {
          t: 'p',
          v: 'The seminar gave students an opportunity to understand that AI is not simply a technology for the future — it is already becoming an important part of today’s workplace.',
        },
        { t: 'h3', v: 'More Than Just a Seminar' },
        {
          t: 'p',
          v: 'For NidusLab, the event was more than a single seminar. It was an opportunity to connect directly with students, understand their career concerns and create meaningful conversations around the future of employment.',
        },
        {
          t: 'p',
          v: 'The booth provided students with a chance to interact with the NidusLab team, learn about the company’s technology-driven ecosystem and explore how platforms like NidusJob can support them throughout their career journey.',
        },
        {
          t: 'p',
          v: 'The enthusiasm and participation of the students made the experience especially meaningful.',
        },
        { t: 'h3', v: 'Building a Smarter Career Ecosystem' },
        {
          t: 'p',
          v: 'As technology continues to evolve, students need more than academic knowledge to succeed. They need adaptability, digital skills, communication abilities, problem-solving skills and the confidence to continuously learn.',
        },
        {
          t: 'p',
          v: 'At NidusLab, we believe that technology should make these opportunities more accessible.',
        },
        {
          t: 'p',
          v: 'Through initiatives like the <strong>AI &amp; Career Guidance Seminar</strong>, NidusLab aims to bridge the gap between students, technology and the evolving job market — helping young professionals become better prepared for the future.',
        },
        { t: 'h3', v: 'Discovering NidusJob: A Smarter Way to Build Your Career' },
        {
          t: 'p',
          v: 'A key part of the discussion was the introduction of <strong>NidusJob</strong>, NidusLab’s AI-powered job marketplace designed to make the job-search and recruitment experience smarter, faster and more personalized.',
        },
        {
          t: 'p',
          v: 'For students and job seekers, finding the right opportunity can often be challenging. From searching through countless job postings to preparing a resume and understanding whether a particular role matches their skills, the traditional job-search process can be slow and uncertain.',
        },
        { t: 'p', v: '<strong>NidusJob is designed to simplify this journey with the power of AI.</strong>' },
        { t: 'p', v: 'Through NidusJob, job seekers can access features such as:' },
        {
          t: 'ul',
          v: [
            '<strong>AI-Powered Job Matching</strong> — Discover job opportunities that match your background and skills',
            '<strong>CV &amp; Job Match Score</strong> — Understand how well your CV aligns with a specific job',
            '<strong>AI-Based Skills Gap Analysis</strong> — See which skills to build next',
            '<strong>Smarter Applications</strong> — Make better career decisions with less guesswork',
          ],
        },
        {
          t: 'p',
          v: 'The goal is simple: <strong>make job searching less complicated and help candidates make smarter career decisions.</strong>',
        },
        {
          t: 'p',
          v: 'For the students at Green University, the introduction to NidusJob offered a practical example of how AI can be used not only for learning and productivity but also for building a stronger career.',
        },
        { t: 'h3', v: 'Looking Ahead' },
        {
          t: 'p',
          v: 'The Green University seminar was an inspiring step toward creating stronger connections between the education ecosystem and the rapidly changing world of technology and employment.',
        },
        {
          t: 'p',
          v: 'We are grateful to <strong>Green University of Bangladesh</strong> and the <strong>Center for Career Development (CCD)</strong> for their support and collaboration and to all the students who joined the seminar, visited our booth and actively participated in the conversation.',
        },
        {
          t: 'p',
          v: 'The future of work is changing. <strong>And the next generation needs to be ready for it.</strong>',
        },
        { t: 'h3', v: 'NidusLab — Building Smart Solutions.' },
        {
          t: 'p',
          v: '<strong>NidusLab:</strong> <a href="https://niduslab.com/" target="_blank" rel="noopener noreferrer">niduslab.com</a><br/><strong>NidusJob:</strong> <a href="https://nidusjob.com/" target="_blank" rel="noopener noreferrer">nidusjob.com</a>',
        },
      ],
    },
  },
  {
    id: 'bswc-winter-clothes-2026',
    name: 'Winter Clothes Distribution Program 2026',
    meta: '2026 · BUFT Social Welfare Club',
    blurb:
      'Planned and coordinated a winter clothes distribution drive with the BUFT Social Welfare Club, from preparing the clothes to running the day itself.',
    cover: 'assets/events/bswc-winter-2026/1-1024.webp',
    coverSrcSet:
      'assets/events/bswc-winter-2026/1-640.webp 640w, assets/events/bswc-winter-2026/1-1024.webp 1024w, assets/events/bswc-winter-2026/1-1600.webp 1600w',
    coverBlur: GALLERY_BLUR['events/bswc-winter-2026-1'],
    photos: [
      {
        src: 'assets/events/bswc-winter-2026/1-1024.webp',
        srcSet:
          'assets/events/bswc-winter-2026/1-640.webp 640w, assets/events/bswc-winter-2026/1-1024.webp 1024w, assets/events/bswc-winter-2026/1-1600.webp 1600w',
        blur: GALLERY_BLUR['events/bswc-winter-2026-1'],
        alt: 'Winter clothes distribution programme',
      },
      {
        src: 'assets/events/bswc-winter-2026/2-1024.webp',
        srcSet:
          'assets/events/bswc-winter-2026/2-640.webp 640w, assets/events/bswc-winter-2026/2-1024.webp 1024w, assets/events/bswc-winter-2026/2-1600.webp 1600w',
        blur: GALLERY_BLUR['events/bswc-winter-2026-2'],
        alt: 'Distributing winter clothing',
      },
      {
        src: 'assets/events/bswc-winter-2026/3-1024.webp',
        srcSet:
          'assets/events/bswc-winter-2026/3-640.webp 640w, assets/events/bswc-winter-2026/3-1024.webp 1024w, assets/events/bswc-winter-2026/3-1600.webp 1600w',
        blur: GALLERY_BLUR['events/bswc-winter-2026-3'],
        alt: 'BUFT Social Welfare Club team at the distribution',
      },
    ],
    article: {
      title: 'Winter Clothes Distribution Program 2026',
      blocks: [
        { t: 'h3', v: 'Joint Secretary | BUFT Social Welfare Club' },
        {
          t: 'p',
          v: 'In 2026, I had the opportunity to take part in a winter clothes distribution program organized by the <strong>BUFT Social Welfare Club</strong>. As a <strong>Joint Secretary of the club</strong>, I was involved in planning and coordinating the program with other members, from preparing the clothes for distribution to managing the activities on the day of the program.',
        },
        {
          t: 'p',
          v: 'What made this experience meaningful to me was the opportunity to meet and interact with people who were struggling to manage the winter with limited resources. Handing over a warm piece of clothing may seem like a small gesture, but seeing the happiness and gratitude on people&rsquo;s faces made me realize how much a simple act of support can mean to someone. It was a different kind of experience from my regular academic and club activities because it allowed me to directly connect with people and understand some of the challenges they face.',
        },
        {
          t: 'p',
          v: 'Working as part of the organizing team also taught me how important teamwork, responsibility and proper coordination are when arranging a social welfare activity. We had to work together, manage the collected clothes, organize the distribution and make sure the support reached the people who needed it. Being part of the process gave me a stronger sense of responsibility toward my community.',
        },
        {
          t: 'p',
          v: 'This program was important to me because it reminded me that social work is not always about making a big change at once. Sometimes, a small contribution, a little time and a sincere effort can bring comfort to someone. The experience gave me a sense of satisfaction and encouraged me to stay involved in activities where I can contribute to people and society in a practical way.',
        },
      ],
    },
  },
  {
    id: 'dhaka-north-marathon-2025-season-1',
    name: 'Organizer – Dhaka North Marathon 2025 | Season 1',
    meta: '2025 · Dhaka North Marathon',
    blurb:
      'Served as organizer for Dhaka North Marathon 2025 | Season 1, supporting coordination, planning, communication and smooth event execution.',
    cover: 'assets/events/Dhaka North/1.jpeg',
    coverSrcSet: 'assets/events/Dhaka North/1.jpeg 1x',
    photos: [
      {
        src: 'assets/events/Dhaka North/1.jpeg',
        srcSet: 'assets/events/Dhaka North/1.jpeg 1x',
        alt: 'Dhaka North Marathon 2025 | Season 1 cover photo',
      },
      {
        src: 'assets/events/Dhaka North/2.jpeg',
        srcSet: 'assets/events/Dhaka North/2.jpeg 1x',
        alt: 'Dhaka North Marathon 2025 | Season 1 event setup',
      },
      {
        src: 'assets/events/Dhaka North/3.jpeg',
        srcSet: 'assets/events/Dhaka North/3.jpeg 1x',
        alt: 'Dhaka North Marathon 2025 | Season 1 organizing moment',
      },
    ],
    article: {
      title: 'Organizer – Dhaka North Marathon 2025 | Season 1',
      blocks: [
        { t: 'h3', v: 'Organizer • Dhaka North Marathon 2025 | Season 1' },
        {
          t: 'p',
          v: 'I had the opportunity to work as an <strong>Organizer at Dhaka North Marathon 2025 | Season 1</strong>, an experience that gave me the chance to be involved in a large-scale public event beyond my regular academic and professional activities.',
        },
        {
          t: 'p',
          v: 'Being part of the organizing team taught me how much planning, coordination and teamwork are required to successfully manage an event where a large number of participants, volunteers and organizers come together. From supporting event preparation to coordinating activities and helping ensure that everything was running smoothly, I had the opportunity to take responsibility in different parts of the event.',
        },
        {
          t: 'p',
          v: 'Working behind the scenes of a marathon was a completely different experience from simply participating in one. There were many things that required attention at the same time, and sometimes quick decisions were necessary to handle situations effectively. It helped me improve my communication, teamwork, time management and problem-solving skills while working with people from different backgrounds.',
        },
        {
          t: 'p',
          v: 'One of the most memorable parts of the experience was seeing the energy and enthusiasm of the participants on the event day. Watching people of different ages and backgrounds come together with a common goal made the experience even more meaningful. Being able to contribute to that environment, even from behind the scenes, gave me a strong sense of satisfaction.',
        },
        {
          t: 'p',
          v: 'The experience also taught me that successful events are built through the combined effort of many people. Every small responsibility matters when a large event is being organized. Working with the organizing team allowed me to understand this firsthand and gave me valuable experience in event management, coordination and working under pressure.',
        },
        {
          t: 'p',
          v: 'I am grateful for the opportunity to be part of <strong>Dhaka North Marathon 2025 | Season 1</strong>. It remains a memorable experience that helped me grow personally, develop practical skills and understand the importance of responsibility, teamwork and coordination in real-world events.',
        },
      ],
    },
  },
];

export const ACHIEVEMENTS = [
  {
    id: 'buft-tarunno-utsab-2025',
    name: 'BUFT Tarunno Utsab 2025',
    role: 'Organizer | BUFT Debate Club',
    date: 'August 2025',
    meta: 'August 2025 · BUFT Debate Club',
    blurb:
      'Organized BUFT Tarunno Utsab 2025 with the BUFT Debate Club — planning, coordination and on-ground activity management.',
    /* portrait certificate scans — letterbox them rather than crop */
    fit: 'contain',
    cover: 'assets/achievements/debate-club/1-1024.webp',
    coverSrcSet:
      'assets/achievements/debate-club/1-640.webp 640w, assets/achievements/debate-club/1-1024.webp 1024w, assets/achievements/debate-club/1-1600.webp 1600w',
    coverBlur: GALLERY_BLUR['achievements/debate-club-1'],
    photos: [
      {
        src: 'assets/achievements/debate-club/1-1024.webp',
        srcSet:
          'assets/achievements/debate-club/1-640.webp 640w, assets/achievements/debate-club/1-1024.webp 1024w, assets/achievements/debate-club/1-1600.webp 1600w',
        blur: GALLERY_BLUR['achievements/debate-club-1'],
        alt: 'BUFT Tarunno Utsab 2025 certificate',
      },
      {
        src: 'assets/achievements/debate-club/2-1024.webp',
        srcSet:
          'assets/achievements/debate-club/2-640.webp 640w, assets/achievements/debate-club/2-1024.webp 1024w, assets/achievements/debate-club/2-1600.webp 1600w',
        blur: GALLERY_BLUR['achievements/debate-club-2'],
        alt: 'BUFT Tarunno Utsab 2025 recognition',
      },
    ],
    article: {
      title: 'BUFT Tarunno Utsab 2025',
      blocks: [
        { t: 'h3', v: 'Organizer | BUFT Debate Club' },
        {
          t: 'p',
          v: 'Participated as an organizer with the <strong>BUFT Debate Club</strong> for <strong>BUFT Tarunno Utsab 2025</strong>, helping with the planning and coordination of the event. I was also involved in managing event activities and supporting the participants throughout the program.',
        },
      ],
    },
  },

  {
    id: 'shukhee-seminar-2026',
    name: 'Shukhee Mental Health Awareness Seminar',
    role: 'BUFT Social Welfare Club',
    date: '9 April 2026',
    meta: '9 April 2026 · BUFT Social Welfare Club',
    blurb:
      'Certificate of Appreciation from Shukhee (Grameen HealthTech) for supporting the health camp and mental health awareness seminar at BUFT.',
    /* portrait photograph of the framed certificate — letterbox, do not crop */
    fit: 'contain',
    cover: 'assets/achievements/shukhee-seminar-2026/1-1024.webp',
    coverSrcSet:
      'assets/achievements/shukhee-seminar-2026/1-640.webp 640w, assets/achievements/shukhee-seminar-2026/1-1024.webp 1024w, assets/achievements/shukhee-seminar-2026/1-1600.webp 1600w',
    coverBlur: GALLERY_BLUR['achievements/shukhee-seminar-2026-1'],
    photos: [
      {
        src: 'assets/achievements/shukhee-seminar-2026/1-1024.webp',
        srcSet:
          'assets/achievements/shukhee-seminar-2026/1-640.webp 640w, assets/achievements/shukhee-seminar-2026/1-1024.webp 1024w, assets/achievements/shukhee-seminar-2026/1-1600.webp 1600w',
        blur: GALLERY_BLUR['achievements/shukhee-seminar-2026-1'],
        alt: 'Certificate of Appreciation from Shukhee for the BUFT Social Welfare Club',
      },
    ],
    article: {
      title: 'Shukhee Mental Health Awareness Seminar',
      blocks: [
        { t: 'h3', v: 'Certificate of Appreciation · Shukhee (Grameen HealthTech)' },
        {
          t: 'p',
          v: 'I had the opportunity to participate in the <strong>Shukhee Mental Health Awareness Seminar</strong>, where the discussion focused on creating awareness about important health and social issues that affect people in their everyday lives. The seminar provided a platform to learn about the importance of health awareness and how proper knowledge can help individuals make better decisions for themselves and their families.',
        },
        {
          t: 'p',
          v: 'Being part of this seminar was a valuable experience for me because it allowed me to learn beyond the classroom and listen to different perspectives on health and social well-being. I realized that many health-related problems can become more manageable when people have access to the right information and feel comfortable discussing these issues.',
        },
        {
          t: 'p',
          v: 'The seminar also helped me understand the importance of communication when working with people from different backgrounds. Listening to the speakers and interacting with others gave me a better understanding of how awareness programs can encourage people to be more conscious about their health and well-being.',
        },
        {
          t: 'p',
          v: 'For me, the experience was meaningful because it connected learning with real-life social issues. It encouraged me to become more aware of the people and communities around me and reminded me that sharing knowledge and creating awareness can be a simple but meaningful way to contribute to society.',
        },
      ],
    },
  },
  {
    id: 'kpl-football-tournament-2025-season-2',
    name: 'Referee – KPL Football Tournament 2025 | Season 2',
    role: 'Football Referee',
    date: '2025',
    meta: '2025 · KPL Football Tournament',
    blurb:
      'Served as football referee in KPL Football Tournament 2025 | Season 2, ensuring fair play, discipline and calm decisions under pressure.',
    fit: 'cover',
    cover: 'assets/achievements/Football/1.jpeg',
    coverSrcSet: 'assets/achievements/Football/1.jpeg 1x',
    photos: [
      {
        src: 'assets/achievements/Football/1.jpeg',
        srcSet: 'assets/achievements/Football/1.jpeg 1x',
        alt: 'KPL Football Tournament 2025 | Season 2 referee moment',
      },
    ],
    article: {
      title: 'Referee – KPL Football Tournament 2025 | Season 2',
      blocks: [
        { t: 'h3', v: 'Football Referee • KPL Football Tournament 2025 | Season 2' },
        {
          t: 'p',
          v: 'I had the privilege of working as a <strong>Football Referee at KPL Football Tournament 2025 | Season 2</strong>. It was a meaningful experience where I got the chance to contribute to the tournament from the field and take responsibility for ensuring that the matches were conducted fairly and according to the rules.',
        },
        {
          t: 'p',
          v: 'Being a referee taught me that football is not only about the players on the field. It also requires concentration, quick decision-making, patience and the ability to remain calm in challenging situations. Every match brought a different experience and helped me become more confident in handling responsibility.',
        },
        {
          t: 'p',
          v: 'I truly enjoyed being part of the tournament and the atmosphere surrounding it. Looking back, it remains one of those experiences that gave me both great memories and valuable lessons beyond the classroom. ❤️',
        },
      ],
    },
  },
  {
    id: 'kpl-football-tournament-2026-season-3',
    name: 'Referee – KPL Football Tournament 2026 | Season 3',
    role: 'Football Referee',
    date: '2026',
    meta: '2026 · KPL Football Tournament',
    blurb:
      'Served as football referee in KPL Football Tournament 2026 | Season 3, ensuring fair play, discipline and calm decisions under pressure.',
    fit: 'cover',
    cover: 'assets/achievements/Football/FB_IMG_1789439801582.jpg.jpeg',
    coverSrcSet: 'assets/achievements/Football/FB_IMG_1789439801582.jpg.jpeg 1x',
    photos: [
      {
        src: 'assets/achievements/Football/FB_IMG_1789439801582.jpg.jpeg',
        srcSet: 'assets/achievements/Football/2.jpeg 1x',
        alt: 'KPL Football Tournament 2026 | Season 3 referee moment',
      },
    ],
    article: {
      title: 'Referee – KPL Football Tournament 2026 | Season 3',
      blocks: [
        { t: 'h3', v: 'Football Referee • KPL Football Tournament 2026 | Season 3' },
        {
          t: 'p',
          v: 'I had the opportunity to serve as a <strong>Football Referee at KPL Football Tournament 2026 | Season 3</strong>. Being on the field as a referee was a memorable experience that allowed me to take responsibility for maintaining fair play, following the rules and making decisions under pressure.',
        },
        {
          t: 'p',
          v: 'Football has always been more than just a game to me. Being part of the tournament from a different role gave me a new perspective on the sport. Managing the match, staying focused throughout the game and handling different situations on the field helped me build confidence, discipline and a stronger sense of responsibility.',
        },
        {
          t: 'p',
          v: 'I am grateful to the KPL organizers for giving me the opportunity to be part of the tournament. It was a valuable experience and a memory I will always be happy to carry forward. ❤️',
        },
        {
          t: 'p',
          v: '<strong>🎥 My Vlog:</strong><br />KPL Football Tournament 2026 | Season 3<br /><a href="https://www.facebook.com/share/v/14s2exX5dQC/" target="_blank" rel="noreferrer">Watch the Vlog on Facebook : https://www.facebook.com/share/v/14s2exX5dQC/</a>',
        },
      ],
    },
  },
];

export const SOCIALS = [
  {
    icon: 'github',
    name: 'GitHub',
    handle: 'github.com/nazzasunib',
    url: 'https://github.com/nazzasunib',
    tone: '#f5f2ea',
  },
  {
    icon: 'linkedin',
    name: 'LinkedIn',
    handle: 'Nazzas Ibn Shams Unib',
    url: 'https://www.linkedin.com/in/nazzas-ibn-shams-unib17',
    tone: '#4ea3ff',
  },
  {
    icon: 'facebook',
    name: 'Facebook',
    handle: 'facebook.com/It.is.me.Unib',
    url: 'https://www.facebook.com/It.is.me.Unib',
    tone: '#5a8cff',
  },
  {
    icon: 'instagram',
    name: 'Instagram',
    handle: '@nazzas_unib',
    url: 'https://www.instagram.com/nazzas_unib',
    tone: '#ff7db0',
  },
  {
    icon: 'facebook',
    name: 'Facebook Page',
    handle: 'Business / Professional',
    url: 'https://www.facebook.com/profile.php?id=61559838521019',
    tone: '#5a8cff',
  },
  {
    icon: 'youtube',
    name: 'YouTube',
    handle: '@your_bother',
    url: 'https://youtube.com/@your_bother',
    tone: '#ff5c39',
  },
  {
    icon: 'globe',
    name: 'Portfolio',
    handle: 'nazzasunib.github.io',
    url: 'https://nazzasunib.github.io/my-portfolio/',
    tone: '#23d3b0',
  },
  {
    icon: 'cart',
    name: 'Shop at UNA Mart',
    handle: 'Explore products & shop online',
    url: 'https://una-mart-frontend.vercel.app/',
    tone: '#ffb020',
  },
];

/* =====================================================================
   RECRUITER SECTIONS — Now, Case study, Project deep dive.

   Everything here comes from facts already in this file.
   ===================================================================== */

/* ---------- Now: what I'm doing at the moment (update every few months) ---------- */
/* repo names (lowercase) to show under "More on GitHub". Empty = every public non-fork repo with a description */
export const PINNED_REPOS = [];

export const NOW = {
  items: [
    {
      label: 'Working on',
      text: 'Business development at NidusLab, including university partnerships and campus outreach for NidusJob.',
    },
    { label: 'Studying', text: 'Final year of B.Sc. Textile Engineering at BUFT (Batch 222).' },
    {
      label: 'Learning',
      text: 'Web technologies and AI tools, starting with building and maintaining this site.',
    },
    {
      label: 'Open to',
      text: 'Internships, entry-level roles and collaborations across textile, business development and tech.',
    },
  ],
};

/* ---------- Case studies: business development work with real outcomes ---------- */
export const CASE_STUDIES = [
  {
    id: 'gub-campus-outreach',
    eventId: 'gub-2026', // opens this event's full story
    title: 'Taking NidusJob to campus',
    client: 'Green University of Bangladesh · Center for Career Development',
    type: 'University partnership',
    date: '23 August 2026',
    role: 'Business Development Executive, NidusLab',
    cover: 'assets/gub/4-1024.webp',
    coverSrcSet:
      'assets/gub/4-640.webp 640w, assets/gub/4-1024.webp 1024w, assets/gub/4-1600.webp 1600w',
    coverBlur: GUB_BLUR['4'],
    challenge:
      'Students wanted to understand how AI is changing hiring, and NidusLab wanted a direct line to young job seekers for NidusJob.',
    approach: [
      "Partnered with the university's Center for Career Development to host an AI & Career Guidance Seminar on campus.",
      'Ran a NidusLab booth from 9:00 AM so students could meet the team and try NidusJob first-hand.',
      'Held a 2:00–4:30 PM session on the AI job market, changing career paths and the skills employers look for.',
      'Introduced NidusJob: AI job matching, CV match score, skills-gap analysis and smarter applications.',
    ],
    facts: [
      { value: '1', label: 'University partnership' },
      { value: '9 AM', label: 'Booth opened' },
      { value: '2.5 h', label: 'Seminar session' },
      { value: '4', label: 'NidusJob features shown' },
    ],
  },
];

/* ---------- Project deep dive: the fabric analysis project ---------- */
export const FABRIC_PROJECT = {
  title: 'Textile Fabric Analysis',
  org: 'BUFT · Academic project',
  summary:
    'An academic project analysing fabric types, yarn counts and fabric quality, written up as a technical report with the team.',
  scope: [
    { icon: 'weave', title: 'Fabric type', text: 'Identified the type and structure of each fabric sample.' },
    { icon: 'spool', title: 'Yarn count', text: 'Measured the yarn count of each sample.' },
    { icon: 'check', title: 'Fabric quality', text: 'Assessed the quality of each fabric against the brief.' },
    { icon: 'users', title: 'Technical report', text: 'Wrote up the method and findings as a team report.' },
  ],
};
