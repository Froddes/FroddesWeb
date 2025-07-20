// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

const pageFiles = [
  { name: 'licencia', file: 'licencia.html' },
  { name: 'plantilla', file: 'plantilla.html' },
  { name: 'catalogo', file: 'catalogo.html'},
  { name: 'politica-de-privacidad', file: 'politica-de-privacidad.html' },
  { name: 'terminos-de-servicio', file: 'terminos-de-servicio.html' },
  { name: 'aviso-legal', file: 'aviso-legal.html' },
  { name: 'sobre-froddes', file: 'sobre-froddes.html' },
  { name: 'servicios', file: 'servicios.html' },
  { name: 'contacto', file: 'contacto.html' },
  // Agrega los archivos adicionales aquí
  { name: 'footer', file: 'footer.html' },
  { name: 'navbar', file: 'navbar.html' },
  { name: 'whatsapp', file: 'whatsapp.html' }
];

const inputEntries = {};
pageFiles.forEach(({ name, file }) => {
  inputEntries[name] = path.resolve(__dirname, file);
});

// Agrega los archivos HTML ubicados en src/html/
const additionalHtmlFiles = ['footer', 'navbar', 'whatsapp'];
additionalHtmlFiles.forEach((file) => {
  inputEntries[file] = path.resolve(__dirname, 'src/html', `${file}.html`);
});

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        ...inputEntries,
      },
    },
  },
});