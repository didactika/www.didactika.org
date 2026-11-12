# didactika.org

Landing page oficial de **Didactika**, un laboratorio de tecnología e innovación educativa que crea software open source para impulsar el aprendizaje digital: plugins, librerías y herramientas para el aprendizaje digital.

Construida con React 19, TypeScript, Vite y Tailwind CSS. Usa `npm run dev` para desarrollo, `npm run build` para compilar y `npm run lint` para el linter. El listado de proyectos que se muestra en la página se gestiona en [`src/data/projects.json`](src/data/projects.json).

## Ver los cambios antes de desplegarlos

```
docker compose up -d      # http://localhost:4322/ (español) y http://localhost:4322/en/ (inglés)
docker compose down
```

La página de recursos (`/resources/`) sale de `src/data/resources.json`; el pie, el mismo de la documentación, de `src/Footer.tsx`.

## Añadir un idioma

```
node tools/add-language.mjs fr "Français"
```

Copia los textos en inglés a `src/i18n/fr.ts` (se traducen a mano), registra el idioma, crea `/fr/` y `/fr/resources/`, los añade al sitemap y a los `hreflang` de cada página y hace que quien tenga el navegador en ese idioma llegue a él. El menú de idiomas crece solo y, a partir de seis, ofrece un buscador. El tema claro y oscuro sale del sistema o de la elección guardada.

## Publicación

El sitio se construye y se publica con GitHub Pages (`.github/workflows/pages.yml`) en cada push a `main` y a mano. El dominio es `didactika.org` (`public/CNAME`). Pages no puede redirigir desde el servidor, así que la elección de idioma de quien llega a `/` la hace un pequeño script de `index.html` (cookie `lang`, o el idioma del navegador entre los `hreflang` de la página).

Se activa una vez, por una persona con permisos de administración:

```bash
gh repo edit didactika/www.didactika.org --visibility public --accept-visibility-change-consequences
gh api -X POST repos/didactika/www.didactika.org/pages -f build_type=workflow
gh api -X PUT repos/didactika/www.didactika.org/pages -f cname=didactika.org -F https_enforced=true
```

y en el DNS de didactika.org: cuatro registros `A` del apex hacia `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y `185.199.111.153`, y un `CNAME` de `www` hacia `didactika.github.io`.
