import { engKeyboard } from './languages/en.js';
import { ruKeyboard } from './languages/ru.js';

export const keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false,
        keyboardLanguage: JSON.parse(sessionStorage.getItem('language')) || engKeyboard,
        languageText: JSON.parse(sessionStorage.getItem('languageText')) || "English",
    },

    init () {
        //Create main elements
        this.elements.title = document.createElement('h1');
        this.elements.textarea = document.createElement('textarea');
        this.elements.textDiv = document.createElement('div');
        this.elements.language = document.createElement('span');
        this.elements.text = document.createElement('span');
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.title.classList.add("main-title");
        this.elements.textarea.classList.add("keyboard__textarea");
        this.elements.textDiv.classList.add("keyboard__text-wrapper");
        this.elements.language.classList.add("keyboard__language");
        this.elements.text.classList.add("keyboard__text");
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");

        // Add to DOM
        document.body.appendChild(this.elements.title).innerHTML = ("Virtual Keyboard");
        document.body.appendChild(this.elements.textarea);
        document.body.appendChild(this.elements.textDiv);
        this.elements.textDiv.appendChild(this.elements.language).innerHTML = this.properties.languageText;
        this.elements.textDiv.appendChild(this.elements.text).innerHTML = ("to change language press: Ctrl + Alt");
        document.body.appendChild(this.elements.main);
        this.elements.main.appendChild(this.elements.keysContainer);
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");      
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        let keyboardSmall = this.properties.keyboardLanguage.map(({ small }) => small)
        let keyboardShift = this.properties.keyboardLanguage.map(({ shift }) => shift)
        // Create HTML for an icon

        const createIconHTML = (icon_name) => {
            return `<span class="material-icons">${icon_name}</span>`;
        };

        this.properties.keyboardLanguage.forEach(key => {
            const keyElement = document.createElement("button");

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key.small) {
                case "Backspace":
                    keyElement.classList.add("keyboard__key-backspace");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this.elements.textarea.textContent = this.properties.value;
                        console.log( this.properties.value);
                    });

                    break;

                case "Tab":
                    keyElement.classList.add("keyboard__key-tab");
                    keyElement.innerHTML = createIconHTML("swap_horiz");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\t";
                        this.elements.textarea.textContent = this.properties.value;
                    });

                    break;

                case "CapsLock":
                    keyElement.classList.add("keyboard__key-capslock");
                    keyElement.textContent = "CapsLock";
                    keyElement.addEventListener("click", () => {
                        if (this.properties.shift){
                            this._toggleShift();
                            document.querySelector('.keyboard__key-shift').classList.remove('active');
                        }
                        this._toggleCapsLock();
                        keyElement.classList.toggle('active');
                    });

                    break;

                case "Enter":
                    keyElement.classList.add("keyboard__key-enter");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this.elements.textarea.textContent = this.properties.value;
                        console.log( this.properties.value);
                    });

                    break;

                case "ShiftLeft":
                    keyElement.classList.add("keyboard__key-shift", "keyboard__key-shiftleft");
                    keyElement.innerHTML = createIconHTML("vertical_align_top");

                    keyElement.addEventListener("click", () => {
                        if (this.properties.capsLock){
                            this._toggleCapsLock();
                            document.querySelector('.keyboard__key-capslock').classList.remove('active');
                        }
                        this._toggleShift();
                        keyElement.classList.toggle('active');
                    });

                    break;


                case "ShiftRight":
                    keyElement.classList.add("keyboard__key-shift", "keyboard__key-shiftright");
                    keyElement.innerHTML = createIconHTML("vertical_align_top");

                    keyElement.addEventListener("click", () => {
                        if (this.properties.capsLock){
                            this._toggleCapsLock();
                            document.querySelector('.keyboard__key-capslock').classList.remove('active');
                        }
                        this._toggleShift();
                        keyElement.classList.toggle('active');
                    });
                    break;
                    
                
                case "\\":
                    keyElement.classList.add("keyboard__key-long");
                    keyElement.textContent = "\\";

                    break;
                
                case "Ctrl":
                    keyElement.classList.add("keyboard__key-ctrl");
                    keyElement.textContent = "Ctrl";

                    break;
                case "Alt":
                    keyElement.classList.add("keyboard__key-alt");
                    keyElement.textContent = "Alt";

                    break;

                case "Space":
                    keyElement.classList.add("keyboard__key-space");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this.elements.textarea.textContent = this.properties.value;
                        console.log( this.properties.value);
                    });
                    break;

                case "&uarr;":
                    keyElement.classList.add("keyboard__key-arrow","keyboard__key-arrowUp");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_up");

                    break;

                case "&darr;":
                    keyElement.classList.add("keyboard__key-arrow","keyboard__key-arrowDown");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_down");

                    break;

                case "&larr;":
                    keyElement.classList.add("keyboard__key-arrow","keyboard__key-arrowLeft");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

                    break;

                case "&rarr;":
                    keyElement.classList.add("keyboard__key-arrow","keyboard__key-arrowRight");
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

                    break;

                default:
                    keyElement.textContent = key.small;

                    keyElement.addEventListener("click", () => {
                        if (this.properties.shift){
                            this.properties.value += key.shift;
                        } else if (this.properties.capsLock){
                            this.properties.value += key.small.toUpperCase()
                        } else{
                            this.properties.value += key.small;
                        }
                        this.elements.textarea.textContent = this.properties.value;
                        console.log( this.properties.value);
                    });
                    break;
            }

            fragment.appendChild(keyElement);

        });

        return fragment;
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        this.properties.keyboardLanguage.forEach((keyElement,index) => {
            if (!keyElement.functional.includes('true'))     {  
                this.elements.keys[index].textContent = this.properties.capsLock ? 
                this.elements.keys[index].textContent.toUpperCase() : this.elements.keys[index].textContent.toLowerCase();
            }
        });

    },
    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        this.properties.keyboardLanguage.forEach((keyElement,index) => {
            if (!keyElement.functional.includes('true'))     {  
                this.elements.keys[index].textContent = this.properties.shift ? 
                                    keyElement.shift : 
                                    keyElement.small;
            }
        });
    },


    changeLanguage() {
        this.properties.capsLock = false;
        this.elements.keysContainer.innerHTML='';
        if (this.properties.keyboardLanguage === engKeyboard) {
            this.properties.keyboardLanguage = ruKeyboard ;
            this.elements.language.innerHTML = ("Russion");
            
        } else {
            this.properties.keyboardLanguage = engKeyboard;
            this.elements.language.innerHTML = ("English");
        }
        this.elements.keysContainer.appendChild(this._createKeys());
        sessionStorage.setItem('language', JSON.stringify(this.properties.keyboardLanguage));
        sessionStorage.setItem('languageText', JSON.stringify(this.elements.language.innerHTML));
    }
}





