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

    listerNotesChromatique(noteDepart, nbNotes){
        let indexNote = this.notes.indexOf(noteDepart)
        let notesChromatique = []
        for(let i=0; i<nbNotes; i++){
            notesChromatique.push(this.notes[indexNote]);
            if(indexNote == this.notes.length -1 ){
                indexNote = 0;
            } else {
                indexNote++;
            }
        }
        return notesChromatique;
    }

    listerNotesGamme(tonique, typeGamme){
        let gamme
        let nbNotes
        switch(typeGamme){
            case "gamme_majeure":
                gamme = env.intervallesGammeMajeure
                nbNotes = 12
                break
        }
        let gammeChromatique = this.listerNotesChromatique(tonique, nbNotes)
        let notesGamme = {}
        for(const [key, value] of Object.entries(gamme)){
            notesGamme[key] = gammeChromatique[value]
        }
        return notesGamme;
    }
}