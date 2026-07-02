import { useState, useLayoutEffect, useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import {
  BookOpen, Package, Menu, X,
  Globe, ArrowRight, ExternalLink, Check, Cpu, Layers,
  Terminal
} from 'lucide-react';

// Capas del escenario parallax del hero
import layerDesk from './assets/layer-1.png';
import layerLaptop from './assets/layer-2.png';
import layerBooks from './assets/layer-3.png';
import layerUI from './assets/layer-4.png';

// Fotos de perfil de los fundadores
import photoEduardo from './assets/eduardo-pp.jpg';
import photoHector from './assets/hector-pp.jpg';

// Datos de proyectos (externalizados a JSON)
import projectsData from './data/projects.json';

type Project = {
  id: string;
  type: 'moodle' | 'npm';
  typeName: string;
  name: string;
  desc: string;
  license: string;
  version: string;
  link: string;
  installCmd?: string;
  moodleLink?: string;
};

// Iconos de marca (lucide-react ya no incluye logos de terceros)
const Github = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const Linkedin = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// Componente Logo restaurado con su trazado de vectores original completo y sin truncar
const Logo = ({ className = "h-full w-full", fill = "#00555a" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="7.5 -90 800 800"
    version="1.1" preserveAspectRatio="xMidYMid meet" 
    className={className}>
	  <path d="M 154.835 17.673 C 153.919 17.916, 152.861 18.876, 152.483 19.807 C 152.104 20.738, 151.551 32.638, 151.253 46.250 C 150.759 68.835, 150.561 71, 148.982 71 C 148.031 71, 139.208 69.429, 129.376 67.509 C 107.717 63.278, 104.219 63.108, 103.582 66.250 C 103.331 67.487, 102.887 78.348, 102.595 90.385 C 102.303 102.421, 101.824 112.509, 101.531 112.802 C 101.238 113.096, 90.916 112.358, 78.594 111.163 C 66.272 109.968, 55.533 109.242, 54.731 109.550 C 50.359 111.227, 50.516 103.622, 50.213 329.124 C 49.921 546.541, 50.339 580.768, 53.320 583.749 C 54.786 585.215, 56.571 585.082, 74.710 582.156 C 99.222 578.202, 119.270 575.543, 137.500 573.829 C 155.493 572.137, 220.338 572.132, 240 573.822 C 277.992 577.087, 324.407 584.903, 357 593.525 C 379.976 599.603, 387.705 601.048, 400.500 601.658 C 417.817 602.483, 430.202 600.922, 453.491 594.979 C 476.752 589.042, 491.065 586.023, 514.500 582.107 C 560.991 574.340, 581.291 572.643, 628.500 572.577 C 674.585 572.513, 689.549 573.763, 737.835 581.708 C 761.989 585.682, 762.988 585.632, 764.132 580.393 C 764.479 578.802, 764.817 472.773, 764.882 344.773 L 765 112.046 762.431 110.363 C 760.022 108.784, 758.631 108.785, 740.181 110.379 C 729.356 111.313, 719.375 112.285, 718 112.537 C 716.625 112.790, 714.969 112.653, 714.321 112.233 C 713.505 111.705, 712.921 104.223, 712.427 87.985 C 712.033 75.046, 711.284 64.222, 710.759 63.881 C 710.234 63.540, 702.536 64.796, 693.652 66.672 C 684.769 68.548, 674.612 70.177, 671.083 70.292 L 664.666 70.500 664.914 44.829 C 665.158 19.574, 665.128 19.139, 663.043 18.023 C 661.476 17.184, 656.305 17.165, 643.211 17.949 C 585.779 21.387, 539.095 31.976, 494.500 51.680 C 468.441 63.194, 437.434 82.622, 421.145 97.640 L 414.790 103.500 417.145 106.047 C 418.440 107.448, 422.788 112.243, 426.807 116.703 L 434.115 124.811 448.307 114.148 C 481.894 88.913, 519.487 70.978, 560.500 60.624 C 579.575 55.808, 611.831 51, 625.065 51 C 636.500 51, 635.265 26.735, 635.100 248.094 C 635.021 354.337, 634.714 441.653, 634.419 442.131 C 634.124 442.609, 630.124 443, 625.531 443 L 617.180 443 616.441 434.250 C 616.034 429.438, 616.018 347.348, 616.405 251.830 C 617.067 88.214, 617.008 78.104, 615.388 77.197 C 613.350 76.057, 610.581 76.319, 589.500 79.650 C 544.653 86.736, 505.611 101.952, 471.693 125.564 C 460.756 133.177, 449 143.607, 449 145.697 C 449 147.185, 460.909 166.912, 463.618 169.911 C 464.692 171.099, 465.989 170.258, 471.834 164.590 C 492.453 144.597, 517.938 130.275, 552.349 119.344 C 560.734 116.680, 580.350 112.024, 583.250 112.009 C 584.909 112, 585 119.649, 584.994 258.750 C 584.991 339.462, 584.694 409.274, 584.335 413.886 L 583.683 422.272 570.591 421.724 C 534.984 420.235, 495.530 405.650, 470.007 384.543 C 466.986 382.044, 464.181 380, 463.774 380 C 463.367 380, 461.849 382.363, 460.401 385.250 C 458.954 388.137, 456.021 393.082, 453.884 396.239 C 451.748 399.395, 450 402.879, 450 403.982 C 450 407.750, 472.460 422.639, 492.165 431.934 C 511.277 440.949, 537.567 448.748, 555 450.575 C 563.587 451.475, 565.392 452.523, 559.865 453.401 C 557.464 453.782, 547.411 456.826, 537.524 460.166 C 516.914 467.129, 517.659 467.125, 500.556 460.367 C 484.184 453.897, 469.261 445.205, 441.649 426.057 C 438.431 423.826, 435.444 422, 435.012 422 C 433.849 422, 418 441.017, 418 442.413 C 418 446.436, 442.981 464.287, 468.500 478.500 C 475.100 482.175, 480.630 485.309, 480.788 485.463 C 480.946 485.617, 478.786 487.212, 475.988 489.008 C 451.485 504.731, 427.391 528.069, 413.213 549.812 L 407.794 558.123 402.062 549.312 C 387.708 527.246, 369.419 509.048, 345.401 492.934 L 334.876 485.872 349.188 478.658 C 375.031 465.631, 391.729 453.193, 414.032 430.356 C 435.036 408.848, 445.844 394.393, 455.792 374.500 C 473.628 338.834, 482.060 298.244, 479.213 261.749 C 475.410 212.996, 457.053 168.201, 424.089 127.235 C 390.338 85.292, 334.674 51.198, 270.500 33.162 C 245.841 26.231, 206.353 20.075, 176.500 18.508 C 170.450 18.190, 163.475 17.774, 161 17.582 C 158.525 17.390, 155.751 17.431, 154.835 17.673 M 179.350 50.531 C 178.478 52.804, 179.896 441.296, 180.780 442.180 C 181.196 442.596, 186.516 443.239, 192.602 443.608 L 203.668 444.281 204.334 349.475 C 204.700 297.332, 205 215.564, 205 167.769 C 205 109.779, 205.344 80.225, 206.035 78.934 C 207.331 76.513, 208.940 76.522, 223.620 79.029 C 261.167 85.443, 301.213 98.862, 325.375 113.127 C 340.555 122.089, 360.732 136.766, 366.768 143.236 L 369.036 145.667 366.540 149.345 C 365.168 151.368, 361.706 156.955, 358.848 161.762 C 355.989 166.568, 353.509 170.683, 353.336 170.906 C 353.164 171.129, 350.655 169.088, 347.761 166.370 C 327.489 147.332, 301.312 131.804, 274 122.617 C 260.621 118.116, 242.011 113.027, 238.868 113.009 C 237.393 113.001, 237.177 117.003, 236.634 154.250 C 236.303 176.938, 235.763 246.420, 235.433 308.656 C 234.835 421.534, 234.839 421.814, 236.852 422.453 C 240.791 423.703, 267.871 420.576, 283 417.124 C 304.153 412.298, 329.849 399.062, 346.611 384.360 C 349.972 381.412, 353.122 379.001, 353.611 379.002 C 354.100 379.004, 355.850 381.794, 357.500 385.204 C 359.150 388.613, 362.188 394.027, 364.250 397.235 C 366.313 400.443, 368 403.649, 368 404.359 C 368 406.289, 364.645 409.029, 352.658 416.888 C 332.255 430.263, 315.429 438.161, 294.725 444.079 C 285.180 446.807, 264.829 450.622, 256.635 451.218 C 253.314 451.460, 255.357 452.394, 271.135 457.846 C 299.743 467.731, 299.858 467.753, 308.379 465.059 C 319.435 461.562, 346.310 448.033, 358.709 439.720 C 398.734 412.887, 427.186 375.312, 442.167 329.500 C 457.373 282.999, 451.697 231.807, 425.955 183.289 C 408.792 150.940, 392.609 131.121, 368.662 113.122 C 321.088 77.364, 267.494 57.754, 197.500 50.492 C 180.024 48.679, 180.060 48.679, 179.350 50.531 M 129.604 99.440 C 128.809 102.607, 128.868 393.776, 129.674 448.325 C 130.209 484.476, 130.506 490.363, 131.865 491.722 C 133.222 493.079, 135.844 493.216, 150.969 492.719 C 214.015 490.646, 274.027 502.940, 324.785 528.330 C 346.602 539.242, 360.354 548.285, 370.381 558.312 C 376.324 564.255, 376.983 564.693, 374.990 561.373 C 355.399 528.740, 311.817 499.711, 260 484.782 C 232.118 476.748, 204.996 472.640, 171.807 471.424 C 156.027 470.845, 152.988 470.486, 152.307 469.119 C 151.863 468.229, 151.275 384.957, 151 284.072 L 150.500 100.644 142.500 98.879 C 131.534 96.460, 130.339 96.512, 129.604 99.440 M 672.595 98.606 C 668.797 99.360, 665.437 100.230, 665.129 100.538 C 664.820 100.846, 664.328 184.064, 664.034 285.466 C 663.740 386.869, 663.275 470.046, 663 470.304 C 662.725 470.563, 651.925 471.273, 639 471.882 C 563.223 475.453, 506.689 495.799, 461.239 535.856 C 454.545 541.757, 444.192 553.840, 440.690 559.841 C 438.673 563.298, 438.913 563.177, 445.027 557.652 C 463.559 540.907, 502.143 520.486, 535.792 509.613 C 572.690 497.690, 605.884 493.016, 656 492.687 L 684.500 492.500 685.109 438 C 685.943 363.430, 686.147 103.986, 685.375 100.125 C 684.651 96.506, 683.720 96.395, 672.595 98.606 M 81.524 159.094 C 81.117 169.151, 81.057 206.882, 81.390 242.940 C 81.724 278.998, 82.280 358.900, 82.627 420.500 C 82.974 482.100, 83.537 535.650, 83.879 539.500 L 84.500 546.500 89.500 546.410 C 92.250 546.360, 100.125 545.582, 107 544.680 C 149.695 539.081, 201.192 539.039, 240 544.570 C 274.162 549.440, 314.120 560.231, 341.505 571.982 C 348.102 574.814, 354.175 577.395, 355 577.719 C 358.047 578.916, 350.378 571.821, 343.550 567.125 C 317.439 549.170, 278.849 534.263, 240.795 527.434 C 209.637 521.841, 180.973 520.301, 138.641 521.944 C 115.143 522.857, 106.488 522.888, 105.662 522.062 C 103.694 520.094, 103.228 489.075, 102.536 314 C 102.166 220.225, 101.556 143.208, 101.181 142.851 C 100.807 142.493, 96.397 141.888, 91.382 141.505 L 82.263 140.809 81.524 159.094 M 382.576 143.513 C 373.619 153.178, 356.561 183.628, 350.092 201.500 C 345.613 213.877, 340.514 234.226, 338.441 248 C 333.604 280.149, 338.378 319.034, 351.195 351.864 C 359.664 373.558, 374.217 399, 378.157 399 C 380.821 399, 390.911 388.698, 393.950 382.875 L 396.364 378.249 388.260 360.817 C 366.515 314.044, 361.869 282.472, 370.578 240.659 C 375.403 217.493, 386.530 189.417, 399.237 168.349 C 402.885 162.300, 403.100 161.556, 401.866 159.249 C 399.949 155.668, 389.914 143.966, 387.290 142.253 C 385.262 140.928, 384.875 141.032, 382.576 143.513 M 719.500 141.735 C 717.300 141.954, 715.050 142.576, 714.500 143.117 C 713.844 143.762, 713.328 208.890, 712.999 332.501 C 712.619 475.482, 712.213 521.187, 711.316 522.084 C 710.408 522.992, 703.296 522.961, 680.527 521.951 C 625.268 519.498, 582.014 523.696, 541 535.493 C 510.902 544.150, 477.913 560.656, 462 575.019 C 458.141 578.502, 457.928 578.879, 460.500 577.663 C 462.150 576.884, 469.287 573.920, 476.360 571.078 C 535.540 547.296, 600.159 537.067, 667 540.899 C 687.805 542.092, 714.895 544.472, 723.928 545.900 C 726.659 546.331, 729.425 546.355, 730.077 545.953 C 732.237 544.617, 732.884 503.350, 733.615 320.250 L 734.331 141 728.916 141.168 C 725.937 141.261, 721.700 141.516, 719.500 141.735 M 396.140 193.750 C 393.458 199.113, 390.237 206.328, 388.984 209.785 L 386.706 216.070 389.320 224.785 C 394.380 241.660, 397.298 256.968, 398.510 273 C 399.521 286.369, 395.449 309.222, 388.940 326.713 L 386.628 332.926 389.948 341.713 C 394.197 352.958, 400.713 366, 402.083 366 C 403.321 366, 413.764 344.296, 416.806 335.402 C 420.545 324.470, 424.903 306.684, 425.963 298.026 C 429.206 271.536, 425.012 240.968, 414.131 211.794 C 409.835 200.278, 402.481 184, 401.574 184 C 401.268 184, 398.823 188.387, 396.140 193.750" 
    stroke="none"
    fill={fill} 
    fillRule="evenodd"
    />
  </svg>
);

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedRepoId, setCopiedRepoId] = useState<string | null>(null);

  // Refs a cada capa del parallax: escribimos el transform directo al DOM
  // (sin estado de React) para que el scroll no dispare re-renders.
  const deskRef = useRef<HTMLDivElement>(null);
  const booksRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let rafId = 0;

    // Desplazamientos base del escenario, responsivos. Los valores de desktop
    // están calibrados para el escenario alto (600px). En pantallas muy pequeñas
    // el escenario mide solo 300px, así que reducimos el desplazamiento vertical
    // para que la ilustración no se pegue al botón ni deje hueco debajo.
    let booksX = 120, booksY = -110, laptopX = 20, laptopY = -95;

    const computeLayout = () => {
      const w = window.innerWidth;
      const isMobile = w < 768; // controla el desplazamiento horizontal
      const small = w < 640;    // aquí el escenario baja a h-[300px]
      booksX = isMobile ? 40 : 120;
      laptopX = isMobile ? 10 : 20;
      booksY = small ? -70 : -110;
      laptopY = small ? -60 : -95;
    };
    computeLayout();

    // Un único bucle rAF gobierna TODO el escenario: parallax (según scroll)
    // + flotación (onda seno). Es el mismo mecanismo del scroll (transform por
    // JS), que ya va fluido, en vez de una animación CSS @keyframes aparte.
    const OMEGA = (Math.PI * 2) / 6; // periodo de 6s, como el float original

    const render = (now: number) => {
      const y = window.scrollY;

      // Solo hacemos trabajo mientras el hero está a la vista.
      if (y < window.innerHeight) {
        const phase = Math.sin(now * 0.001 * OMEGA);
        const floatBooks = -15 * phase; // sube
        const floatUI = 15 * phase;     // baja (contrafase)

        if (deskRef.current)
          deskRef.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
        if (booksRef.current)
          booksRef.current.style.transform = `translate3d(${booksX}px, ${booksY + y * -0.18 + floatBooks}px, 0)`;
        if (laptopRef.current)
          laptopRef.current.style.transform = `translate3d(${laptopX}px, ${laptopY + y * -0.04}px, 0)`;
        if (uiRef.current)
          uiRef.current.style.transform = `translate3d(-5%, ${y * -0.45 + floatUI}px, 0) scale(0.85)`;
      }

      rafId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      computeLayout();
    };

    rafId = requestAnimationFrame(render);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Función genérica para realizar scroll suave a cualquier sección
  const handleScrollToSection = (id: string) => (e: ReactMouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Cierra menú móvil si está abierto
  };

  const copyToClipboard = (text: string, repoId: string | null = null) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      if (repoId) {
        setCopiedRepoId(repoId);
        setTimeout(() => setCopiedRepoId(null), 2000);
      }
    } catch (err) {
      console.error('Error al copiar', err);
    }
    document.body.removeChild(textArea);
  };

  // Listado de proyectos reales de Didactika (datos en src/data/projects.json)
  const projects = projectsData as Project[];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-600 selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden relative">

      {/* Resplandores de fondo estilo Arthur AI / Lapa Ninja */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[80vw] h-[80vw] rounded-full bg-teal-100/30 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-100/20 blur-[120px]"></div>
      </div>

      {/* Navegación */}
      <nav aria-label="Navegación principal" className="fixed w-full top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer" onClick={handleScrollToSection('home')}>
              {/* Contenedor del Logo con el SVG vectorial adaptativo */}
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm group-hover:border-teal-400 transition-all">
                <Logo className="h-8 w-8 transition-colors" fill="#00555a" />
              </div>
              <span className="font-bold text-2xl tracking-tighter text-slate-900">
                Didactika<span className="text-teal-600 font-light">.org</span>
              </span>
            </div>

            {/* Navbar Links */}
            <div className="hidden md:flex items-center space-x-2">
              <button 
                onClick={handleScrollToSection('proyectos')} 
                className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors"
              >
                Proyectos
              </button>
              <button 
                onClick={handleScrollToSection('about')} 
                className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors"
              >
                Acerca de
              </button>
              <a 
                href="https://github.com/didactika" 
                target="_blank" 
                rel="noreferrer" 
                className="ml-4 px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>

            {/* Menu móvil trigger */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="text-slate-500 hover:text-slate-900 p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-3xl border-b border-slate-200 px-4 pt-2 pb-6 absolute w-full shadow-xl z-50">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={handleScrollToSection('proyectos')}
                className="text-left text-base font-semibold text-slate-700 hover:text-teal-700 p-3 rounded-lg hover:bg-slate-50 w-full"
              >
                Proyectos
              </button>
              <button 
                onClick={handleScrollToSection('about')}
                className="text-left text-base font-semibold text-slate-700 hover:text-teal-700 p-3 rounded-lg hover:bg-slate-50 w-full"
              >
                Acerca de
              </button>
              <a 
                href="https://github.com/didactika"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 mt-4 rounded-xl bg-slate-900 text-white font-bold"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 z-10 flex items-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Columna de Texto - Aparece PRIMERO en móvil */}
          <div className="relative z-30 text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-8">
              Tecnología <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
              Didáctica.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-500 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Desarrollamos software que impulsa el aprendizaje. Plugins para Moodle, paquetes NPM y herramientas de código abierto para entornos virtuales de aprendizaje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={handleScrollToSection('proyectos')}
                className="px-10 py-5 bg-teal-600 text-white rounded-2xl font-bold shadow-xl shadow-teal-600/30 hover:bg-teal-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Explorar Proyectos <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* ESCENARIO PARALLAX */}
          <div className="relative h-[300px] sm:h-[450px] lg:h-[600px] w-full flex items-center justify-center">
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              
              {/* CAPA 1: Escritorio (Base Estable - Fondo) */}
              <div
                ref={deskRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-0"
              >
                <img
                  src={layerDesk}
                  alt="Escritorio"
                  className="w-full h-full object-contain opacity-90"
                />
              </div>

              {/* CAPA 3: Libros Flotantes (Medio - Centrado responsivamente en móvil) */}
              <div
                ref={booksRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-10"
              >
                <img
                  src={layerBooks}
                  alt="Libros"
                  className="w-full h-full object-contain drop-shadow-xl opacity-90"
                />
              </div>

              {/* CAPA 2: Laptop y Accesorios (Centrado responsivamente en móvil) */}
              <div
                ref={laptopRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-20"
              >
                <img
                  src={layerLaptop}
                  alt="Laptop"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* CAPA 4: ELEMENTOS UI (Primer Plano) */}
              <div
                ref={uiRef}
                className="absolute inset-0 flex items-center justify-center will-change-transform z-40"
              >
                <img
                  src={layerUI}
                  alt="UI Elements"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Proyectos Destacados */}
      <section id="proyectos" className="scroll-mt-24 py-32 relative z-10 border-t border-slate-100 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl text-left">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Proyectos <span className="text-teal-600">Destacados</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium">
                Repositorios y herramientas de código abierto construidos con estándares de rendimiento, accesibilidad y modularidad.
              </p>
            </div>
            <a 
              href="https://github.com/didactika" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-sm bg-white transition-all self-start md:self-auto shrink-0 shadow-sm"
            >
              <ExternalLink className="h-4 w-4 text-slate-500" />
              <span>Ver en GitHub</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="relative bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 hover:border-teal-500/50 hover:shadow-[0_15px_30px_rgba(13,148,136,0.04)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Fila superior: Tipo de Ecosistema */}
                  <div className="flex justify-between items-center gap-4 mb-4">
                    <span className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors">
                      {project.type === "moodle" ? (
                        <BookOpen className="h-5 w-5" />
                      ) : (
                        <Package className="h-5 w-5" />
                      )}
                    </span>
                    <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md border ${
                      project.type === "moodle" 
                        ? "bg-teal-50 text-teal-700 border-teal-100" 
                        : "bg-slate-900 text-slate-100 border-slate-800"
                    }`}>
                      {project.typeName}
                    </span>
                  </div>

                  {/* Título: Nombre del Repositorio */}
                  <h3 
                    className="font-mono text-base font-bold text-slate-900 mb-2 truncate group-hover:text-teal-700 transition-colors" 
                    title={project.name}
                  >
                    {project.name}
                  </h3>

                  {/* Descripción de hasta 4 líneas con atributo title para lectura completa al hacer hover */}
                  <p 
                    className="text-sm text-slate-500 line-clamp-4 leading-relaxed mb-6 cursor-help" 
                    title={project.desc}
                  >
                    {project.desc}
                  </p>
                </div>

                {/* Fila inferior: Metadatos y Acción */}
                <div className="pt-4 border-t border-slate-100 mt-auto space-y-3">
                  
                  {/* Metadatos (Licencia y Versión) */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium font-mono">
                    <span className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-slate-400" />
                      {project.license}
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      <Cpu className="h-3.5 w-3.5 text-teal-600/80 mr-0.5" />
                      {project.version}
                    </span>
                  </div>

                  {/* Botones de acción distribuidos con Grid 2 columnas (50/50 exactos y misma altura en móvil) */}
                  <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:items-stretch sm:justify-end sm:w-auto">
                    {project.type === "npm" ? (
                      <>
                        {/* Botón de GitHub para NPM */}
                        <a 
                          href={project.link || "https://github.com/didactika"} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-2 py-2 text-[11px] xs:text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-1 shadow-sm w-full h-full sm:w-auto text-center whitespace-nowrap"
                          title="Ver código en GitHub"
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                          <span>GitHub</span>
                        </a>

                        {/* Botón interactivo de instalar NPM */}
                        <button 
                          onClick={() => copyToClipboard(project.installCmd ?? '', project.id)}
                          className={`px-2 py-2 text-[11px] xs:text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 w-full h-full sm:w-auto text-center whitespace-nowrap ${
                            copiedRepoId === project.id
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                              : "bg-slate-900 border-slate-800 text-white hover:bg-slate-800 shadow-sm"
                          }`}
                        >
                          {copiedRepoId === project.id ? (
                            <>
                              <Check className="h-3 w-3 shrink-0" />
                              <span>Copiado</span>
                            </>
                          ) : (
                            <>
                              <Terminal className="h-3 w-3 shrink-0" />
                              <span>Instalar</span>
                            </>
                          )}
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Botón de GitHub para Moodle */}
                        <a 
                          href={project.link || "https://github.com/didactika"} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-2 py-2 text-[11px] xs:text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-1 shadow-sm w-full h-full sm:w-auto text-center whitespace-nowrap"
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                          <span>GitHub</span>
                        </a>

                        {/* Botón de Moodle Directory */}
                        <a 
                          href={project.moodleLink || "https://moodle.org/plugins/"} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-2 py-2 text-[11px] xs:text-xs font-bold rounded-xl border border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100/80 hover:border-teal-300 transition-all flex items-center justify-center gap-1 shadow-sm w-full h-full sm:w-auto text-center whitespace-nowrap"
                          title="Ver en el directorio oficial de plugins de Moodle"
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                          <span>Moodle Org</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Acerca de & Fundadores Section */}
      <section id="about" className="scroll-mt-24 py-32 relative z-10 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Fila Acerca de: El Proyecto */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
            <div className="lg:col-span-5 text-left">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-6">
                Construyendo un puente de <span className="text-teal-600">código libre</span> hacia la educación.
              </h2>
            </div>
            
            <div className="lg:col-span-7 space-y-6 text-left text-lg text-slate-500 font-medium leading-relaxed">
              <p>
                Didactika es un laboratorio de tecnología e innovación educativa dedicado a crear proyectos open source que impulsen el aprendizaje digital.
              </p>
              <p>
                Creemos en una infraestructura educativa libre, robusta y scalable, capaz de responder a los retos actuales de usabilidad, interactividad e integración.
              </p>
              <p>
                Nuestro objetivo es construir soluciones listas para producción que sirvan tanto a instituciones educativas como a desarrolladores y comunidades comprometidas con el software libre.
              </p>
              <p>
                En Didactika, transformamos código abierto en oportunidades para aprender mejor.
              </p>
            </div>
          </div>

          {/* Tarjeta de Métricas Rápidas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 sm:p-12 rounded-[2.5rem] bg-slate-50 border border-slate-200/60 mb-32 text-center">
            <div className="flex flex-col items-center justify-center py-4">
              <p className="text-4xl sm:text-5xl font-black text-slate-900 mb-2 tracking-tight">100%</p>
              <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest">Código Abierto</p>
            </div>
            <div className="flex flex-col items-center justify-center py-6 sm:py-4 border-y border-slate-200/60 sm:border-y-0 sm:border-x sm:border-slate-200/60">
              <p className="text-4xl sm:text-5xl font-black text-teal-600 mb-2 tracking-tight">v4.0+</p>
              <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider">Soporte Moodle</p>
            </div>
            <div className="flex flex-col items-center justify-center py-4">
              <p className="text-4xl sm:text-5xl font-black text-emerald-600 mb-2 tracking-tight">MIT/GPL</p>
              <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest">Licenciamiento Libre</p>
            </div>
          </div>

          {/* Fila de Fundadores */}
          <div className="text-center">
            <div className="mb-16">
              <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Nuestros <span className="text-teal-600">Fundadores</span>
              </h3>
              <p className="text-base text-slate-400 font-semibold mt-2 max-w-xl mx-auto">
                Un equipo técnico con experiencia en Moodle, desarrollo web, microservicios e integraciones educativas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              
              {/* Fundador 1: Eduardo Estrada */}
              <div className="relative bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-200/50 text-left flex flex-col items-center sm:items-start sm:flex-row gap-6 hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 group">
                {/* Foto de perfil */}
                <div className="w-24 h-24 rounded-2xl shrink-0 shadow-lg shadow-teal-500/15 group-hover:scale-105 transition-transform relative overflow-hidden">
                  <img src={photoEduardo} alt="Eduardo Estrada" className="w-full h-full object-cover" />
                </div>
                
                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Eduardo Estrada</h4>
                    <p className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">Co-fundador</p>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    Ingeniero informático con experiencia en desarrollo full-stack, microservicios orientados a eventos e integraciones con Moodle. Su experiencia combina la creación de herramientas para campus virtuales con la extracción y uso de datos educativos para analítica del aprendizaje.
                  </p>
                  
                  {/* Enlaces de Perfil */}
                  <div className="flex gap-3 pt-2 justify-center sm:justify-start">
                    <a href="https://github.com/didactika" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all shadow-sm" title="GitHub">
                      <Github className="h-4 w-4" />
                    </a>
                    <a href="https://eduardoestrada.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-teal-600 transition-all shadow-sm" title="Sitio Web">
                      <Globe className="h-4 w-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/estradaeduardo/" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-[#0A66C2] transition-all shadow-sm" title="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Fundador 2: Hector Arrechea */}
              <div className="relative bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-200/50 text-left flex flex-col items-center sm:items-start sm:flex-row gap-6 hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 group">
                {/* Foto de perfil */}
                <div className="w-24 h-24 rounded-2xl shrink-0 shadow-lg shadow-cyan-500/15 group-hover:scale-105 transition-transform relative overflow-hidden">
                  <img src={photoHector} alt="Hector Arrechea" className="w-full h-full object-cover" />
                </div>
                
                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Hector Arrechea</h4>
                    <p className="text-xs font-bold text-teal-600 uppercase tracking-widest font-mono">Co-fundador</p>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    Ingeniero informático y máster en ciberseguridad, con experiencia en Moodle, microservicios e integraciones con sistemas educativos. Su enfoque técnico integra seguridad aplicada, patrones de diseño y criterios de calidad en el desarrollo de soluciones para plataformas educativas.
                  </p>
                  
                  {/* Enlaces de Perfil */}
                  <div className="flex gap-3 pt-2 justify-center sm:justify-start">
                    <a href="https://github.com/didactika" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all shadow-sm" title="GitHub">
                      <Github className="h-4 w-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/hector-arrechea/" target="_blank" rel="noreferrer" className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-[#0A66C2] transition-all shadow-sm" title="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-slate-100 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 text-sm font-medium">
          <div className="flex items-center gap-3">
            {/* Contenedor del Logo con el SVG vectorial adaptativo para el Footer */}
            <div className="h-8 w-8 bg-slate-900 rounded-lg p-1.5 flex items-center justify-center">
              <Logo className="h-6 w-6 text-white" fill="#ffffff" />
            </div>
            <span className="text-slate-900 font-bold">Didactika.org</span>
          </div>
          <div>
            <p>© {new Date().getFullYear()} — Didactika.org</p>
            <p>Impulsando la educación a través del código abierto.</p>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/didactika" className="hover:text-slate-900 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}