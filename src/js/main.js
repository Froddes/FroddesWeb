"use strict";

import templates from '../data/templates.json';
import {templateRenderer} from './renders/templateRenderer.js'

function main(){
    loadTemplates();
}

function loadTemplates(){
    try{
        const gallery = document.getElementById("template-gallery");
        gallery.appendChild(templateRenderer.asGallery(templates));
    }catch(error){
        console.error("Error al cargar las plantillas", error);
    }
}

document.addEventListener("DOMContentLoaded", main);