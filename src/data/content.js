import { GUB_BLUR } from './gubBlur';

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
  mapQuery: 'Uttara,Dhaka,Bangladesh',
  github: 'nazzasunib',
  tagline: 'Textile · Business · Technology',
};

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'business', label: 'Business' },
  { id: 'textile', label: 'Textile' },
  { id: 'events', label: 'Events' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'social', label: 'Social' },
  { id: 'contact', label: 'Contact' },
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
    title: 'Internship — Integrated Workflow & Merchandising',
    org: 'Rising Knit Textiles Ltd',
    desc: 'Covered spinning, knitting, dyeing and apparel units; handled order costing, buyer communication and marketing.',
    tag: 'Industry',
  },
  {
    title: 'Assistant Press & Media Secretary',
    org: 'BUFT Textile Club',
    desc: 'Managed social media content and event promotions for the club.',
    tag: 'Leadership',
  },
  {
    title: 'Joint Secretary (formerly Press & Media Secretary)',
    org: 'BUFT Social Welfare Club',
    desc: 'Coordinated overall club activities, supported executive decisions and led media coverage for events.',
    tag: 'Leadership',
  },
  {
    title: 'Volunteer — National Job Fest',
    org: 'BUFT Career Development Club',
    desc: 'Assisted in organizing and managing a national-level job fair.',
    tag: 'Volunteer',
  },
  {
    title: 'Event Organizer & Volunteer — Tarunner Utsob 2025',
    org: 'BUFT Debate Club',
    desc: 'Organized event activities and managed volunteer coordination.',
    tag: 'Events',
  },
  {
    title: 'Academic Project — Textile Fabric Analysis',
    org: 'BUFT',
    desc: 'Analyzed fabric types, yarn counts and fabric quality; built technical reporting and teamwork skills.',
    tag: 'Academic',
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
];

export const CERTIFICATES = [
  {
    title: 'Certificate Title',
    org: 'Issuing organization · Year',
    note: 'Replace with your certificate details.',
  },
  {
    title: 'Certificate Title',
    org: 'Issuing organization · Year',
    note: 'Replace with your certificate details.',
  },
  {
    title: 'Certificate Title',
    org: 'Issuing organization · Year',
    note: 'Replace with your certificate details.',
  },
  {
    title: 'Certificate Title',
    org: 'Issuing organization · Year',
    note: 'Replace with your certificate details.',
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
