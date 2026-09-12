/**
 * Page copy and structured section data.
 *
 * Marketing copy lives here rather than inside components so it can be edited
 * without touching layout or markup.
 */

export type Service = {
  number: string;
  title: string;
  focus: string;
  impact: string;
  variant: 'navy' | 'white' | 'lav';
};

export type ApproachStep = {
  number: string;
  phase: string;
  title: string;
  body: string;
};

/* ----- Hero -------------------------------------------------------------- */
export const hero = {
  kicker: 'London · Founder-led · Full service',
  title: 'Full-Service Digital Marketing Agency in London',
  lede: "We scale ambitious brands with technical SEO, performance-led PPC, and high-converting web design. No fluff metrics\u2014just predictable revenue growth.",
  trust: [
    'Direct access to the founders',
    'Reporting tied to revenue',
    'UK & international clients',
  ],
};

/* ----- "Black box" differentiators --------------------------------------- */
export const blackBoxPoints = [
  {
    title: 'SEO That Holds Rank',
    body: 'Built on site architecture, entity optimization, and white-hat link building\u2014engineered to survive Google core algorithm updates.',
  },
  {
    title: 'Laser-Focused Paid Ads',
    body: 'Performance Max, Google Search, and Paid Social campaigns managed to strict Cost-Per-Acquisition (CPA) targets.',
  },
  {
    title: 'Conversion-Driven Design',
    body: 'Websites optimized for lightning speed, mobile usability, and high conversion rates.',
  },
];

/* ----- Approach ---------------------------------------------------------- */
export const approach = {
  kicker: 'Our approach',
  title: 'How we build a growth engine that compounds.',
  lede: "Every engagement runs on the same four stages. We start with the commercial reality of your business, fix what is leaking, then scale only the channels that prove they pay for themselves.",
  steps: [
    {
      number: '01',
      phase: 'Stage one',
      title: 'Diagnose',
      body: 'We start with the numbers you already have. A technical, paid media and analytics audit shows where real demand sits, where budget leaks, and which pages cost you revenue. You get the findings in plain English, in priority order.',
    },
    {
      number: '02',
      phase: 'Stage two',
      title: 'Architect',
      body: 'Next we design the system: keyword and topic architecture, campaign structure, clean tracking and attribution, and the conversion paths that join them together. Every workstream maps to a commercial outcome.',
    },
    {
      number: '03',
      phase: 'Stage three',
      title: 'Execute',
      body: 'The people who planned the work are the people who do it. Technical fixes ship, content goes live, campaigns launch against defined CPA targets, and landing pages are built to convert the traffic you already pay for.',
    },
    {
      number: '04',
      phase: 'Stage four',
      title: 'Compound',
      body: 'Each month we review performance against pipeline rather than impressions. Winning tests are rolled out, weak spend is cut, and budget moves to the channels earning it. The system gets stronger the longer it runs.',
    },
  ] satisfies ApproachStep[],
  principles: [
    {
      title: 'No junior handovers',
      body: 'The specialists who pitch your strategy are the ones who run it day to day.',
    },
    {
      title: 'One connected system',
      body: 'SEO, PPC and CRO are planned together, so each channel makes the others cheaper.',
    },
    {
      title: 'Reporting you can act on',
      body: 'Clear reporting on leads, sales and cost per acquisition\u2014not impressions and vanity charts.',
    },
  ],
};

/* ----- Services ---------------------------------------------------------- */
export const services: Service[] = [
  {
    number: '01',
    title: 'Search Engine Optimisation (SEO)',
    focus: 'Technical Audits, Local SEO (London & UK), Keyword Architecture, Authority Link Building',
    impact: 'Dominates high-intent search queries to drive free, recurring organic leads.',
    variant: 'navy',
  },
  {
    number: '02',
    title: 'Pay-Per-Click Advertising (PPC)',
    focus: 'Google Ads, Bing Ads, Meta (Facebook/Instagram), LinkedIn Advertising',
    impact: 'Delivers immediate, targeted traffic with real-time attribution tracking.',
    variant: 'white',
  },
  {
    number: '03',
    title: 'Web Design & Development',
    focus: 'WordPress, Shopify, Custom Frontend Frameworks, Speed Optimisation',
    impact: 'Turns visitors into buyers with frictionless user journeys and high-speed loading.',
    variant: 'lav',
  },
  {
    number: '04',
    title: 'Content Strategy & PR',
    focus: 'SEO Copywriting, Topical Clusters, Digital PR, Brand Storytelling',
    impact: 'Builds domain authority while capturing top-of-funnel customer intent.',
    variant: 'navy',
  },
];

/* ----- About -------------------------------------------------------------
   Deliberately distinct from the story copy below: this says what the
   business is, the story says how it came to work that way. */
export const aboutParagraphs = [
  'Ed & Russ is a founder-led digital marketing business based in London, working with ambitious brands across the UK and internationally.',
  'When you partner with us you work directly with the specialists who architect, run and optimise your campaigns. There is no account layer sitting between you and the people doing the work.',
  'Search, paid media and conversion-focused design are planned as one system rather than separate retainers, so every channel makes the others cheaper.',
];

/* ----- Our story ---------------------------------------------------------- */
export const storyParagraphs = [
  'For years, the agency model has been broken. Large traditional marketing firms pitch clients using experienced directors, only to pass execution down to junior delegates.',
  'We built Ed & Russ to work the other way around. The specialists who win the account are the ones who stay on it, and the work is judged on the revenue it produces rather than the volume of reporting it generates.',
  'That means combining technical precision with commercial strategy\u2014merging deep Search Engine Optimisation (SEO), high-yield Pay-Per-Click (PPC) execution, and conversion-rate-optimised (CRO) web design into a single growth engine.',
];

/* ----- Per-page hero copy -------------------------------------------------
   Each route gets its own heading, lede and meta description so the pages
   rank independently instead of competing for the same terms. */
export const pages = {
  services: {
    kicker: 'What we do',
    title: 'Services built around growth.',
    lede: 'From search visibility to paid acquisition and conversion-focused digital experiences, every service is designed to contribute to measurable commercial growth.',
    metaTitle: 'Digital Marketing Services | SEO, PPC & Web Design',
    metaDescription:
      'SEO, Pay-Per-Click advertising, web design and content strategy from a founder-led London agency. Every service is measured against commercial growth.',
  },
  approach: {
    kicker: 'How we work',
    title: 'How we build a growth engine that compounds.',
    lede: 'Every engagement runs on the same four stages. We start with the commercial reality of your business, fix what is leaking, then scale only the channels that prove they pay for themselves.',
    metaTitle: 'Our Approach | Diagnose, Architect, Execute, Compound',
    metaDescription:
      'The four-stage process behind every Ed & Russ engagement, and the principles that keep senior specialists on your account from first audit onwards.',
  },
  about: {
    kicker: 'Who we are',
    title: 'A different kind of agency.',
    lede: 'Founder-led digital marketing from London, built on direct access to the specialists who actually run your campaigns.',
    metaTitle: 'About Us | Founder-Led Digital Marketing in London',
    metaDescription:
      'Ed & Russ is a founder-led digital marketing agency in London: senior specialists, no junior handovers, and reporting built around revenue.',
  },
  contact: {
    kicker: 'Get in touch',
    title: 'Let us look at your growth.',
    lede: 'Tell us where your digital marketing is today and where you want it to go. We reply to every enquiry within one working day.',
    metaTitle: 'Contact Us | Talk to a Founder',
    metaDescription:
      'Contact Ed & Russ for SEO, PPC, web design and content strategy. Send an enquiry and one of the founders will reply within one working day.',
  },
} as const;

/* ----- Contact form options ---------------------------------------------- */
export const serviceOptions = [
  'Search Engine Optimisation (SEO)',
  'Pay-Per-Click Advertising (PPC)',
  'Web Design & Development',
  'Content Strategy & PR',
  'A combination of the above',
  'Not sure yet \u2014 happy to be advised',
];

export const budgetOptions = [
  'Under £1,000 per month',
  '£1,000 \u2013 £2,500 per month',
  '£2,500 \u2013 £5,000 per month',
  '£5,000 \u2013 £10,000 per month',
  '£10,000+ per month',
  'One-off project',
  'Not sure yet',
];
