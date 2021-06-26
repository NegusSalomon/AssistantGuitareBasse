import Solfege from '../Solfege.mjs'
import * as env from '../env.mjs'

const template = document.createElement('template')
template.innerHTML = `<div id="manche"></div>`
const templateCorde = document.createElement('template')
templateCorde.innerHTML = `<div class="manche__corde"></div>`
const templateSillet = document.createElement('template')
templateSillet.innerHTML = `<div class="manche__fret_sillet"></div>`
const templateFret = document.createElement('template')
templateFret.innerHTML = `<div class="manche__fret"></div>`


export default class Manche extends HTMLElement{

    constructor(){
        super()
        this.boiteANote = new Solfege("fr");
    }

    creationCorde(noteDepart){
        let notesCorde = this.boiteANote.listerNotesCorde(noteDepart, this.nbFrets);
        let corde = document.importNode(templateCorde.content, true);

        notesCorde.forEach(note => {
            let fret = document.importNode(templateCorde.content, true);
            fret.textContent = note;
            corde.appendChild(fret);
        });
        return corde;
    }

    creationManche(){
        let manche = document.importNode(template.content, true);
        this.accordage.forEach(noteAVide => {
            manche.appendChild(this.creationCorde(noteAVide));
        });
        return manche
    }
    
}

customElements.define('app-manche', Manche);