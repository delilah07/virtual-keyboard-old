import { keyboard } from './keyboard.js';


window.addEventListener("DOMContentLoaded", function() {
    keyboard.init();
});

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.altKey) {
        keyboard.changeLanguage();
    }
});