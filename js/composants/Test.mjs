const template = document.createElement('template')
template.innerHTML = `<div id="test">Test</div>`



export default class Test extends HTMLElement{

    constructor(){
        super()
    }

    connectedCallback(){
        this.innerHTML = "<span>Test de</span>"
    }
}

customElements.define('app-test', Test);