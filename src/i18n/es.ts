// Textos de la interfaz en español (idioma por defecto).
// La forma de este objeto define el tipo `Dictionary` que deben cumplir el resto de idiomas.
export const es = {
  nav: {
    label: 'Navegación principal',
    projects: 'Proyectos',
    about: 'Acerca de',
    docs: 'Documentación',
    resources: 'Recursos',
    menu: 'Abrir el menú',
    language: 'Idioma',
    languageFilter: 'Buscar un idioma',
    theme: 'Cambiar entre tema claro y oscuro',
  },
  hero: {
    titleLine1: 'Tecnología',
    titleHighlight: 'Didáctica.',
    subtitle:
      'Desarrollamos software de código abierto que impulsa el aprendizaje: plugins, librerías y herramientas para entornos digitales de aprendizaje.',
    cta: 'Explorar Proyectos',
    ctaDocs: 'Leer la documentación',
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
    viewAll: 'Ver todos los recursos',
    viewCodeOnGithub: 'Ver código en GitHub',
    viewOnMoodle: 'Ver en el directorio oficial de plugins de Moodle',
    install: 'Instalar',
    docs: 'Documentación',
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
      moodleSupport: 'Tecnología educativa',
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
  resources: {
    title: 'Recursos de Didactika',
    intro: 'Todo lo que Didactika publica, en un único lugar.',
    eyebrow: 'Didactika.org / Recursos',
    back: 'Volver al inicio',
    open: 'Abrir',
    docs: 'Documentación',
  },
  ecosystem: {
    title: { pre: 'Todo lo que ', highlight: 'necesita', post: ' para empezar.' },
    subtitle: 'Documentación, sistema de diseño y el listado completo de lo que Didactika publica.',
    items: {
      docs: { title: 'Documentación', text: 'Guías de instalación, manuales de uso y referencia técnica de cada plugin y librería, por versión y en español e inglés.', cta: 'Abrir la documentación' },
      design: { title: 'Sistema de diseño', text: 'Los componentes, las variables y los criterios que dan a todos los productos de Didactika el mismo aspecto.', cta: 'Ver el sistema de diseño' },
      resources: { title: 'Todos los recursos', text: 'Cada sitio, repositorio, paquete y servicio de Didactika en un único listado.', cta: 'Ver los recursos' },
    },
  },
  footer: {
    about: 'Software educativo de código abierto: plugins, librerías y herramientas para el aprendizaje digital.',
    tagline: 'Impulsando la educación a través del código abierto.',
    cofounder: 'Cofundador',
    collaborators: 'Colaboradores',
    allCollaborators: 'Todos los colaboradores en GitHub',
    join: 'Ver todo lo que construimos y aportamos',
    support: 'Apoya a Didactika',
    licence: 'Código abierto',
  },
};

export type Dictionary = typeof es;
