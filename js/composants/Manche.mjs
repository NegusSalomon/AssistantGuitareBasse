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

    static get observedAttributes() { return ['nbfrets', 'nbcordes', 'accordage', 'gamme']; };

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
        var notesCorde = this.boiteANote.listerNotesChromatique(noteDepart, this.nbfrets);
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
        if(this.gammeChromatique){
            this.colorerFrets(this.gammeAAfficher)
        }
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
                case 'gamme':
                    if(newValue != ''){
                        let newValueParse = JSON.parse(newValue)
                        this.toniqueGamme = newValueParse[0];
                        this.gammeStr = newValueParse[1];
                        this.modeGamme = newValueParse[2];
                        this.gammeChromatique = this.boiteANote.listerNotesChromatique(this.toniqueGamme, this.gammeStr)
                        this.gammeAAfficher = this.boiteANote.listerNotesGamme(this.toniqueGamme, this.gammeStr)
                    }
                    break;
           }
         }
        this.querySelector('#manche').remove()
        this.render()
    }

    colorerFrets(listeNotes){
        let listeNotesArr = []
        for(const [key, value] of Object.entries(listeNotes)){
            listeNotesArr.push(value)
        }
        this.manche.querySelectorAll('.manche__fret').forEach(function(fret){
            listeNotesArr.forEach(function(note){
                if(fret.textContent === note){
                    fret.classList.add('bg-info')
                }
            })
        });
    }       

}

customElements.define('app-manche', Manche);