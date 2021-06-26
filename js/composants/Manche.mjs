import Solfege from '../Solfege.mjs'
import * as env from '../env.mjs'

const template = document.createElement('template')
template.innerHTML = `<table class="table table-bordered table-responsive d-flex justify-content-center"></table>`
const templateCorde = document.createElement('template')
templateCorde.innerHTML = `<div class="manche__corde"></div>`
const templateSillet = document.createElement('template')
templateSillet.innerHTML = `<div class="manche__fret_sillet"></div>`
const templateFret = document.createElement('template')
templateFret.innerHTML = `<div class="manche__fret"></div>`


export default class Manche extends HTMLElement{

    set nbCordes (nbCordes) {
        this.nbCordes = nbCordes;
    }

    get nbCordes() {
        return this.nbCordes
    }

    set nbFrets (nbFrets) {
        this.nbFrets = nbFrets;
    }

    get nbFrets() {
        return this.nbFrets
    }

    constructor(){
        super()
    }


}

customElements.define('app-manche', Manche)