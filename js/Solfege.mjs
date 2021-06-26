import * as env from './env.mjs'

export default class Solfege {

    constructor(typeNotation){
        this.typeNotation = typeNotation;
        switch(typeNotation){
            case "fr":
                this.notes = env.notesFr;
                break;
            case "us":
                this.notes = env.notesUS;
                break;
        }
    }

    listerNotesCorde(noteDepart, nbFrets){
        let indexNote = this.notes.indexOf(noteDepart)
        let notesCorde = []
        for(let i=0; i<nbFrets; i++){
            notesCorde.push(this.notes[indexNote]);
            if(indexNote == this.notes.length -1 ){
                indexNote = 0;
            } else {
                indexNote++;
            }
        }
        return notesCorde;
    }

    listerNotesGamme(tonique, gamme){
        let indexNote = this.notes.indexOf(tonique)
        let notesGamme = {}
        for(let intervalle in gamme){
            notesGamme[intervalle] =this.notes[indexNote += gamme[intervalle]];
        }
        return notesGamme;
    }
}