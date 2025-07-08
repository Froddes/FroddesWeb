"use strict";

import templates from '../data/templates.json';
import { templateRenderer } from './renders/templateRenderer.js';

const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "todas";
let currentPage = 1;

function main() {
    const totalPages = templateRenderer.getTotalPages(templates, category);

    loadTemplates(currentPage);
    loadTitle();
    if (totalPages > 1) {
        renderPagination(totalPages, currentPage);
    }
}

function loadTemplates(page = 1) {
    try {
        const gallery = document.getElementById("gallery");
        const before = document.getElementById("before-gallery");

        // Eliminar galería anterior si existe
        const existing = document.querySelector(".gallery-content");
        if (existing) existing.remove();

        // Añadir la nueva galería para esta página
        const rendered = templateRenderer.asGallery(templates, category, page);
        gallery.insertBefore(rendered, before);

        currentPage = page; // actualizar página actual
    } catch (error) {
        console.error("Error al cargar las plantillas", error);
    }
}

function loadTitle() {
    try {
        const title = document.getElementById("category-title");
        const description = document.getElementById("category-description");
        if (category !== "todas") {
            const categoriaSeleccionada = templates.find(d => String(d.id) === category)?.category;
            title.innerHTML = `${categoriaSeleccionada}`;
            description.innerHTML = templates.find(d => String(d.id) === category)?.description;
        } else {
            title.innerHTML = `Todas Nuestras Plantillas`;
        }
    } catch (error) {
        console.error("Error al cargar el título de la categoría", error);
    }
}

function renderPagination(totalPages, activePage) {
    const nav = document.querySelector(".pagination .nav-links");
    if (!nav) return;

    nav.innerHTML = ""; // Limpiar paginación existente

    // ← Flecha izquierda (anterior)
    if (activePage > 1) {
        const prev = document.createElement("a");
        prev.href = "#";
        prev.className = "page-numbers";
        prev.innerHTML = `<i class="ti-angle-left"></i>`;
        prev.addEventListener("click", (e) => {
            e.preventDefault();
            loadTemplates(activePage - 1);
            renderPagination(totalPages, activePage - 1);
        });
        nav.appendChild(prev);
    }

    // Números de página
    for (let i = 1; i <= totalPages; i++) {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = i;
        link.className = "page-numbers" + (i === activePage ? " current" : "");
        link.addEventListener("click", (e) => {
            e.preventDefault();
            loadTemplates(i);
            renderPagination(totalPages, i);
        });
        nav.appendChild(link);
    }

    // → Flecha derecha (siguiente)
    if (activePage < totalPages) {
        const next = document.createElement("a");
        next.href = "#";
        next.className = "page-numbers";
        next.innerHTML = `<i class="ti-angle-right"></i>`;
        next.addEventListener("click", (e) => {
            e.preventDefault();
            loadTemplates(activePage + 1);
            renderPagination(totalPages, activePage + 1);
        });
        nav.appendChild(next);
    }
}


document.addEventListener("DOMContentLoaded", main);
