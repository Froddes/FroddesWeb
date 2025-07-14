"use strict";

import { parseHTML } from "../utils/parseHTML";

const MAX_ROWS = 3;
const ITEMS_PER_PAGE = MAX_ROWS * 2;

const templateRenderer = {
  asTemplate: function (item, category) {
    const { ref, title, img, icon, alt } = item;

    const html = `
      <div class="col-lg-6 col-md-6">
        <div class="portflio-item position-relative mb-4">
          <a href="plantilla.html?template=${ref}">
            <img src="${img}" alt="${alt}" class="img-fluid w-100">
            <div class="overlay-item">
              <i class="${icon}"></i>
            </div>
            <div class="portfolio-item-content">
              <h3 class="mb-0 text-white">${title}</h3>
              <p class="text-white-50">${category}</p>
            </div>
          </a>
        </div>
      </div>
    `;

    return parseHTML(html);
  },

  asGallery: function (data, category, page = 1) {
    const container = parseHTML(
      '<div class="gallery-content container-fluid" style="margin-top: 40px;"></div>'
    );
    let row = parseHTML('<div class="row portfolio-gallery"></div>');

    // Recolectar todas las plantillas que se deben mostrar
    const templates = [];
    for (let d of data) {
      if (category === "todas" || String(d.id) === category) {
        for (let t of d.templates) {
          templates.push({ ...t, category: d.category });
        }
      }
    }

    // Calcular paginación
    const start = (page - 1) * ITEMS_PER_PAGE;
    const paginatedTemplates = templates.slice(start, start + ITEMS_PER_PAGE);

    paginatedTemplates.forEach((item, i) => {
      row.appendChild(templateRenderer.asTemplate(item, item.category));
      if (row.children.length === 2 || i === paginatedTemplates.length - 1) {
        container.appendChild(row);
        row = parseHTML('<div class="row portfolio-gallery"></div>');
      }
    });

    return container;
  },

  getTotalPages: function (data, category) {
    let count = 0;
    for (let d of data) {
      if (category === "todas" || String(d.id) === category) {
        count += d.templates.length;
      }
    }
    return Math.ceil(count / ITEMS_PER_PAGE);
  }
};

export { templateRenderer };
