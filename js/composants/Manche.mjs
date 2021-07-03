import Solfege from '../Solfege.mjs'
import * as env from '../env.mjs'

const templateManche = document.createElement('template');
templateManche.innerHTML = `<div id="manche"></div>`;
const templateCorde = document.createElement('template');
templateCorde.innerHTML = `<div class="manche__corde"></div>`;
const templateSillet = document.createElement('template');
templateSillet.innerHTML = `<div class="manche__fret manche__fret_sillet"></div>`;
const templateFret = document.createElement('template');
templateFret.innerHTML = `<div class="manche__fret"></div>`;

export class Manche extends HTMLElement{

    static get observedAttributes() { return ['nbfrets', 'nbcordes', 'accordage']; };

    constructor(){
        super()
        this.boiteANote = new Solfege("fr");
        
    }

    get nbfrets(){
        return this.getAttribute('nbfrets');
    }

    set nbfrets(value){
        this.setAttribute('nbfrets', value);
    }

    get nbcordes(){
        return this.getAttribute('nbcordes');
    }

    set nbcordes(value){
        if(value){
            this.setAttribute('nbcordes', value);
        } else {
            this.removeAttribute('nbcordes');
        }
    }

    get accordage(){
        return this.getAttribute('accordage');
    }

    set accordage(value){
        if(value){
            this.setAttribute('accordage', value);
        } else {
            this.removeAttribute('accordage');
        }
    }

    creationCorde(noteDepart){
        var notesCorde = this.boiteANote.listerNotesCorde(noteDepart, this.nbfrets);
        let corde = document.importNode(templateCorde.content, true);
        let compteurFrets = 0
        notesCorde.forEach(note => {
            let fret
            if(compteurFrets === 0){
                fret = document.importNode(templateSillet.content, true);
                fret.querySelector('.manche__fret_sillet').innerHTML = note;
            } else {
                fret = document.importNode(templateFret.content, true);
                fret.querySelector('.manche__fret').innerHTML = note;
            }
            corde.querySelector('.manche__corde').appendChild(fret);
            compteurFrets++;
        });
        return corde;
    }

    creationManche(){
        let acc = JSON.parse(this.accordage);
        acc.forEach(noteAVide => {
            this.manche.querySelector('#manche').appendChild(this.creationCorde(noteAVide));
        });
    }

    render(){
        this.manche = document.importNode(templateManche.content, true);
        this.creationManche();
        this.appendChild(this.manche)
    }

    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(attrName, oldValue, newValue){
        if (oldValue !== newValue) {
            switch(attrName) {
                case 'nbfrets':
                    this.nbfrets = newValue;
                    break;
                case 'nbcordes':
                    this.nbcordes = newValue;
                    break;
                case 'accordage':
                    this.accordage = newValue;
                    break;
           }
         }
         this.querySelector('#manche').remove()
         this.render()
    }
}

customElements.define('app-manche', Manche);