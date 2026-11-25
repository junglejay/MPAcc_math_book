export const PROJECT_GLOB_LOADERS = import.meta.glob<string>(
  [
    '/src/**/*.{ts,tsx,css}',
    '/index.html',
    '/package.json',
    '/tsconfig.json',
    '/vite.config.ts',
    '/metadata.json',
    '/README.md',
    '/.env.example',
    '/.gitignore',
  ],
  { query: '?raw', import: 'default' }
);
