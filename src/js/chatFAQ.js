"use strict";

import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

function initializeChat(){
    const chat = createChat({
        webhookUrl: 'https://n8n.froddes.com/webhook/67a51fd6-18d8-429a-9e5d-736b19dfc7d6/chat',
        webhookConfig: {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        target: '#n8n-chat',
        mode: 'window',
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        loadPreviousSession: true,
        metadata: {},
        showWelcomeScreen: false,
        defaultLanguage: 'es',
        initialMessages: [
            'Hola 👋 Soy el asistente de Froddes',
            '¿Tienes alguna duda sobre nuestros servicios, precios, procesos o cómo podemos ayudarte? Escríbeme tu pregunta y estaré encantado de ayudarte 😊'
        ],
        i18n: {
            es: {
                title: 'Hola! 👋',
                subtitle: "Comienza un chat. Estamos disponibles las 24 horas, los 7 días de la semana.",
                footer: '',
                getStarted: 'Nueva Conversación',
                inputPlaceholder: 'Pregunta lo que necesites...',
            },
        },
    });
    
    return chat;
}

document.addEventListener("DOMContentLoaded", initializeChat);