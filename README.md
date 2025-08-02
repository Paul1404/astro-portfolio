# Astro Portfolio

A modern, fast, and customizable portfolio site built with [Astro](https://astro.build/).

[View on GitHub](https://github.com/Paul1404/astro-portfolio)

---

## Features

- ⚡️ Lightning-fast static site generation
- 🛠️ Built with Astro, TypeScript, and modern tooling
- 📱 Responsive design
- 📝 Easy content management with Markdown or MDX
- 🧩 Modular components for easy customization
- 🔒 Secure dependencies (see [Security](#security))

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (v9+ recommended)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Paul1404/astro-portfolio.git
cd astro-portfolio
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser to view the site.

### Building for Production

```bash
npm run build
```

The static site will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
.
├── public/           # Static assets (images, favicon, etc.)
├── src/
│   ├── components/   # Reusable UI components
│   ├── content/      # Content files (Markdown, MDX, etc.)
│   ├── layouts/      # Layout components
│   ├── pages/        # Site pages (routes)
│   └── styles/       # CSS/SCSS files
├── astro.config.mjs  # Astro configuration
├── package.json      # Project metadata and scripts
├── tsconfig.json     # TypeScript configuration
└── ...
```

---

## Security

- **No vulnerable dependencies:**  
  The project previously included `npm` as a dependency, which introduced a transitive vulnerability in `brace-expansion`.  
  This has been fixed by removing `npm` from the project dependencies.  
  Please ensure you use a secure, up-to-date version of `npm` globally.

- **Keep dependencies updated:**  
  Run `npm audit` regularly and update as needed.

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [Astro](https://astro.build/)
- [TypeScript](https://www.typescriptlang.org/)