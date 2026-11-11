import type { Dictionary } from './es';

// Textos de la interfaz en inglés. Debe tener exactamente las mismas claves que `es`.
export const en: Dictionary = {
  nav: {
    label: 'Main navigation',
    projects: 'Projects',
    about: 'About',
    docs: 'Documentation',
    language: 'Language',
  },
  hero: {
    titleLine1: 'Learning',
    titleHighlight: 'Technology.',
    subtitle:
      'We build software that drives learning. Moodle plugins, NPM packages and open source tools for virtual learning environments.',
    cta: 'Explore Projects',
    ctaDocs: 'Read the documentation',
    alt: {
      desk: 'Desk',
      books: 'Books',
      laptop: 'Laptop',
      ui: 'Interface elements',
    },
  },
  projects: {
    title: { pre: 'Featured ', highlight: 'Projects', post: '' },
    subtitle:
      'Open source repositories and tools built to high standards of performance, accessibility and modularity.',
    viewOnGithub: 'View on GitHub',
    viewCodeOnGithub: 'View code on GitHub',
    viewOnMoodle: 'View in the official Moodle plugins directory',
    install: 'Install',
    docs: 'Documentation',
    copied: 'Copied',
  },
  about: {
    title: { pre: 'Building an ', highlight: 'open source', post: ' bridge to education.' },
    paragraphs: [
      'Didactika is an educational technology and innovation lab dedicated to creating open source projects that drive digital learning.',
      "We believe in free, robust and scalable educational infrastructure, able to meet today's challenges in usability, interactivity and integration.",
      'Our goal is to build production-ready solutions that serve educational institutions as well as developers and communities committed to free software.',
      'At Didactika, we turn open source code into opportunities to learn better.',
    ],
    metrics: {
      openSource: 'Open Source',
      moodleSupport: 'Moodle Support',
      licensing: 'Free Licensing',
    },
  },
  founders: {
    title: { pre: 'Our ', highlight: 'Founders', post: '' },
    subtitle:
      'A technical team with experience in Moodle, web development, microservices and educational integrations.',
    role: 'Co-founder',
    website: 'Website',
    bios: {
      eduardo:
        'Computer engineer with experience in full-stack development, event-driven microservices and Moodle integrations. Combines building tools for virtual campuses with extracting and using educational data for learning analytics.',
      hector:
        "Computer engineer with a master's degree in cybersecurity and experience in Moodle, microservices and integrations with educational systems. Brings a technical approach that integrates applied security, design patterns and quality criteria into the development of solutions for educational platforms.",
    },
  },
  ecosystem: {
    title: { pre: 'Everything you ', highlight: 'need', post: ' to get started.' },
    subtitle: 'Documentation, the design system and the full list of what Didactika publishes.',
    items: {
      docs: { title: 'Documentation', text: 'Installation guides, user manuals and technical reference for every plugin and library, by version and in English and Spanish.', cta: 'Open the documentation' },
      design: { title: 'Design system', text: 'The components, tokens and guidelines that give every Moodle plugin of Didactika the same look.', cta: 'See the design system' },
      resources: { title: 'All resources', text: 'Every site, repository, package and service of Didactika in a single list.', cta: 'See the resources' },
    },
  },
  footer: {
    about: 'Open source educational software: Moodle plugins, npm packages and tools for virtual learning environments.',
    tagline: 'Driving education through open source.',
    cofounder: 'Co-founder',
    collaborators: 'Collaborators',
    allCollaborators: 'All collaborators on GitHub',
    join: 'See everything we build and contribute',
    docs: 'Documentation',
    design: 'Design system',
    resources: 'Resources',
    support: 'Support Didactika',
    licence: 'Open source',
  },
};
