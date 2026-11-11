import type { Dictionary } from './es';

// Textos de la interfaz en inglés. Debe tener exactamente las mismas claves que `es`.
export const en: Dictionary = {
  nav: {
    label: 'Main navigation',
    projects: 'Projects',
    about: 'About',
    language: 'Language',
  },
  hero: {
    titleLine1: 'Learning',
    titleHighlight: 'Technology.',
    subtitle:
      'We build software that drives learning. Moodle plugins, NPM packages and open source tools for virtual learning environments.',
    cta: 'Explore Projects',
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
  footer: {
    tagline: 'Driving education through open source.',
    resources: 'Resources',
  },
};
