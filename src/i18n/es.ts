// Textos de la interfaz en español (idioma por defecto).
// La forma de este objeto define el tipo `Dictionary` que deben cumplir el resto de idiomas.
export const es = {
  nav: {
    label: 'Navegación principal',
    projects: 'Proyectos',
    about: 'Acerca de',
    language: 'Idioma',
  },
  hero: {
    titleLine1: 'Tecnología',
    titleHighlight: 'Didáctica.',
    subtitle:
      'Desarrollamos software que impulsa el aprendizaje. Plugins para Moodle, paquetes NPM y herramientas de código abierto para entornos virtuales de aprendizaje.',
    cta: 'Explorar Proyectos',
    alt: {
      desk: 'Escritorio',
      books: 'Libros',
      laptop: 'Laptop',
      ui: 'Elementos de interfaz',
    },
  },
  projects: {
    title: { pre: 'Proyectos ', highlight: 'Destacados', post: '' },
    subtitle:
      'Repositorios y herramientas de código abierto construidos con estándares de rendimiento, accesibilidad y modularidad.',
    viewOnGithub: 'Ver en GitHub',
    viewCodeOnGithub: 'Ver código en GitHub',
    viewOnMoodle: 'Ver en el directorio oficial de plugins de Moodle',
    install: 'Instalar',
    copied: 'Copiado',
  },
  about: {
    title: { pre: 'Construyendo un puente de ', highlight: 'código libre', post: ' hacia la educación.' },
    paragraphs: [
      'Didactika es un laboratorio de tecnología e innovación educativa dedicado a crear proyectos open source que impulsen el aprendizaje digital.',
      'Creemos en una infraestructura educativa libre, robusta y escalable, capaz de responder a los retos actuales de usabilidad, interactividad e integración.',
      'Nuestro objetivo es construir soluciones listas para producción que sirvan tanto a instituciones educativas como a desarrolladores y comunidades comprometidas con el software libre.',
      'En Didactika, transformamos código abierto en oportunidades para aprender mejor.',
    ],
    metrics: {
      openSource: 'Código Abierto',
      moodleSupport: 'Soporte Moodle',
      licensing: 'Licenciamiento Libre',
    },
  },
  founders: {
    title: { pre: 'Nuestros ', highlight: 'Fundadores', post: '' },
    subtitle:
      'Un equipo técnico con experiencia en Moodle, desarrollo web, microservicios e integraciones educativas.',
    role: 'Co-fundador',
    website: 'Sitio Web',
    bios: {
      eduardo:
        'Ingeniero informático con experiencia en desarrollo full-stack, microservicios orientados a eventos e integraciones con Moodle. Su experiencia combina la creación de herramientas para campus virtuales con la extracción y uso de datos educativos para analítica del aprendizaje.',
      hector:
        'Ingeniero informático y máster en ciberseguridad, con experiencia en Moodle, microservicios e integraciones con sistemas educativos. Su enfoque técnico integra seguridad aplicada, patrones de diseño y criterios de calidad en el desarrollo de soluciones para plataformas educativas.',
    },
  },
  footer: {
    tagline: 'Impulsando la educación a través del código abierto.',
    resources: 'Recursos',
  },
};

export type Dictionary = typeof es;
