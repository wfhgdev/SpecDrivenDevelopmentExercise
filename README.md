# 🕹️ SAVE POINT — Retro Podcast Website

> **"Two controllers, one mic — deep dives into 16-bit legends."**

Sitio web estático para un podcast temático sobre videojuegos retro clásicos. Diseñado con una marcada estética visual inspirada en la era dorada de los videojuegos de 16 bits (estilo arcade, scanlines CRT, paleta retro vibrante y tipografía monoespaciada), construido bajo una arquitectura _Static-First_ y guiado por la metodología **Spec-Driven Development (SDD)**.

---

## 🌟 Características Principales

- **🎮 Estética Retro 16-Bit**: Interfaz visual con ambientación arcade, bordes gruesos biselados (_chunky borders_), efectos de scanlines por CSS y paleta de colores de alto contraste adaptable a modo oscuro.
- **🎙️ Landing Page con Episodio Destacado**: Hero con la identidad y premisa del programa, junto a una tarjeta destacada (_Featured Episode_) con llamada a la acción y metadatos completos.
- **📚 Catálogo de 20 Episodios Mockeados**: Catálogo estructurado con 20 episodios con título, número, fecha de publicación, duración y sinopsis, ordenados cronológicamente (del más reciente al más antiguo).
- **♿ Accesibilidad y Rendimiento**:
  - Cumplimiento de estándares de contraste y navegación **WCAG AA**.
  - Soporte para `prefers-reduced-motion` (desactiva efectos de scanlines decorativos para usuarios sensibles al movimiento).
  - Navegación accesible por teclado y estructura semántica (`<header>`, `<nav>`, `<main>`, `<footer>`, único `<h1>` por página).
  - Diseño responsivo adaptado desde dispositivos móviles estrechos (320px) hasta pantallas de escritorio.
- **⚡ Arquitectura Static-First**: Generación estática completa (`output: 'export'`) sin requerir servidor en producción, bases de datos o secretos en tiempo de ejecución.
- **📐 Spec-Driven Development (SDD)**: Desarrollo guiado por especificaciones con SpecKit/OpenCode, incluyendo contratos de datos, invariantes validados por tests y runbooks de verificación.

---

## 🛠️ Tecnologías Utilizadas

| Categoría              | Tecnología                                                                                | Descripción                                                           |
| :--------------------- | :---------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| **Framework Web**      | [Next.js 15](https://nextjs.org/)                                                         | App Router con exportación HTML estática (`output: 'export'`)         |
| **Librería UI**        | [React 19](https://react.dev/)                                                            | Componentes declarativos y renderizado eficiente                      |
| **Lenguaje**           | [TypeScript 5](https://www.typescriptlang.org/)                                           | Tipado estricto para modelos de contenido y componentes               |
| **Estilos**            | CSS Moderno / Custom Properties                                                           | Variables nativas, animaciones fluidas, scanlines y responsive design |
| **Testing Unitario**   | [Vitest](https://vitest.dev/)                                                             | Validación de invariantes de datos y funciones de acceso              |
| **Testing E2E & A11y** | [Playwright](https://playwright.dev/) + [axe-core](https://github.com/dequelabs/axe-core) | Pruebas de integración visual, interacción y accesibilidad            |
| **Calidad de Código**  | ESLint & Prettier                                                                         | Estilo consistente y análisis estático                                |
| **Metodología**        | SpecKit / OpenCode                                                                        | Especificación formal y control de cambios en `specs/`                |

---

## 📁 Estructura del Proyecto

```text
├── specs/                          # Especificaciones y contratos (SDD)
│   └── 001-retro-podcast-site/     # Especificación del sitio del podcast
│       ├── contracts/              # Esquemas de datos y contratos de páginas
│       ├── data-model.md           # Modelo de datos de episodios, sitio y FAQ
│       ├── plan.md                 # Plan de arquitectura e implementación
│       ├── quickstart.md           # Guía de validación end-to-end
│       ├── spec.md                 # Especificación de historias de usuario y requisitos
│       └── tasks.md                # Tareas de implementación
├── src/
│   ├── app/                        # Rutas de Next.js (App Router)
│   │   ├── globals.css             # Paleta de diseño retro, tokens y scanlines
│   │   ├── layout.tsx              # Shell global (Header, Footer, Lang, Meta)
│   │   └── page.tsx                # Página de inicio (Landing)
│   ├── components/                 # Componentes de UI reutilizables
│   │   ├── FeaturedEpisode.tsx     # Tarjeta de episodio destacado
│   │   ├── PixelHeading.tsx        # Encabezados con estilo pixel
│   │   ├── RetroButton.tsx         # Botones y enlaces con estilo arcade
│   │   ├── SiteFooter.tsx          # Pie de página semántico
│   │   └── SiteHeader.tsx          # Navegación principal persistente
│   ├── content/                    # Datos mockeados y contratos TypeScript
│   │   ├── about.ts                # Información de anfitriones y premisa
│   │   ├── episodes.ts             # Dataset mockeado de 20 episodios
│   │   ├── faq.ts                  # Preguntas frecuentes
│   │   ├── site.ts                 # Metadatos del podcast (nombre, tagline, historia)
│   │   └── types.ts                # Tipos de TypeScript del dominio
│   └── lib/                        # Helpers y selectores de datos
│       └── episodes.ts             # Acceso ordenado y fallback de episodio destacado
├── tests/
│   ├── unit/                       # Pruebas unitarias (invariantes de datos con Vitest)
│   │   └── episodes-data.test.ts
│   └── e2e/                        # Pruebas End-to-End con Playwright
│       └── landing.spec.ts
├── next.config.ts                  # Configuración de Next.js (export estático)
├── playwright.config.ts            # Configuración de pruebas Playwright
├── vitest.config.ts                # Configuración de pruebas Vitest
└── package.json                    # Scripts y dependencias del proyecto
```

---

## 🚀 Requisitos Previos

- **Node.js**: Versión `20.x` o superior recomendada.
- **npm**: Gestor de paquetes incluido con Node.js.

---

## 💻 Pasos para la Ejecución

### 1. Clonar el Repositorio

```bash
git clone https://github.com/wfhgdev/SpecDrivenDevelopmentExercise.git
cd SpecDrivenDevelopmentExercise
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Servidor de Desarrollo

Inicia el entorno de desarrollo local con recarga en caliente:

```bash
npm run dev
```

Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

### 4. Compilar para Producción (Static Export)

Genera la exportación estática optimizada en el directorio `out/`:

```bash
npm run build
```

Para previsualizar localmente la salida estática generada:

```bash
npx serve out -l 3000
```

---

## 🧪 Pruebas y Calidad de Código

### Pruebas Unitarias (Vitest)

Valida la integridad de los datos mockeados y los invariantes del modelo de episodios (número único, fechas válidas, fallback de destacado):

```bash
npm run test:unit
```

### Pruebas End-to-End y Accesibilidad (Playwright)

Ejecuta las pruebas en navegadores reales para validar el renderizado, contraste accesible y navegación:

```bash
npm run test:e2e
```

### Linter y Formato de Código

```bash
# Comprobar reglas de ESLint
npm run lint

# Formatear archivos con Prettier
npm run format

# Comprobar formato sin modificar
npm run format:check
```

---

## 📜 Licencia

Este proyecto está desarrollado como un ejercicio práctico de arquitectura web y desarrollo guiado por especificaciones (_Spec-Driven Development_).
