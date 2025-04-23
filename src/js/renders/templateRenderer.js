"use strict";

import { parseHTML } from "../utils/parseHTML";

const templateRenderer = {
    asTemplate: function(item){
        const title = item.title;
        const category = item.category;
        const img = item.img;
        const icon = item.icon;

        const html = `
        <div class="col-lg-4 col-md-6">
            <div class="portflio-item position-relative mb-4">
                <a href="project-details.html">
                    <img src=${img} alt="" class="img-fluid w-100">
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

    asGallery: function(data){
        const container = parseHTML('<div class="row portfolio-gallery"></div>');
        for(let d of data){
            container.appendChild(templateRenderer.asTemplate(d));
        }
        return container;
    }
}

export {templateRenderer};