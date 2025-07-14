"use strict";

import data from '../data/templates.json';

const params = new URLSearchParams(window.location.search);
const t = params.get("template");

function template() {
    const loader = document.getElementById("loader");
    const iframe = document.getElementsByTagName("iframe");
    document.getElementById("laptop").onclick = () => {
        activateView("laptop", iframe[0]);
        activateView("laptop", loader);
    };
    document.getElementById("tablet").onclick = () => {
        activateView("tablet", iframe[0]);
        activateView("tablet", loader);
    };
    document.getElementById("mobile").onclick = () => {
        activateView("mobile", iframe[0]);
        activateView("mobile", loader);
    };

    loadTemplate();
}

function activateView(type, iframe) {
    switch (type) {
        case "tablet":
            iframe.style.width = "50vw";
            break;
        case "mobile":
            iframe.style.width = "25vw";
            break;
        default:
            iframe.style.width = "80vw";
            break;
    }
}

function loadTemplate() {
    const iframe = document.getElementsByTagName("iframe")[0];
    const loader = document.getElementById("loader");

    loader.style.display = "flex";

    for (let cat of data) {
        for (let temp of cat.templates) {
            if (temp.ref === t) {
                iframe.src = temp.url;

                iframe.onload = () => {
                    loader.style.display = "none";
                };
                break;
            }
        }
    }
}


document.addEventListener("DOMContentLoaded", template);