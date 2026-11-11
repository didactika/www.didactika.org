# didactika.org

Landing page oficial de **Didactika**, un laboratorio de tecnología e innovación educativa que crea software open source para impulsar el aprendizaje digital: plugins para Moodle, paquetes NPM y herramientas para entornos virtuales de aprendizaje.

Construida con React 19, TypeScript, Vite y Tailwind CSS. Usa `npm run dev` para desarrollo, `npm run build` para compilar y `npm run lint` para el linter. El listado de proyectos que se muestra en la página se gestiona en [`src/data/projects.json`](src/data/projects.json).

## Ver los cambios antes de desplegarlos

```
docker compose up -d      # http://localhost:4322/ (español) y http://localhost:4322/en/ (inglés)
docker compose down
```

La página de recursos (`/resources/`) sale de `src/data/resources.json`; el pie, el mismo de la documentación, de `src/Footer.tsx`.
