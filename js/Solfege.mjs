// Notes

const notesFr = ["Do", "Do#/Re♭", "Ré", "Ré#/Mi♭", "Mi", "Fa", "Fa#/Sol♭", "Sol", "Sol#/La♭", "La", "La#/Si♭", "Si/Do♭" ]
const notesUs = ["C", "C#/D♭", "D", "D#/E♭", "E", "F", "F#/G♭", "G", "G#/A♭", "A", "A#/B♭", "B/C♭" ]

// Gammes
const gammeMajeure = { "tonique": 0, "seconde": 2, "tierce": 2, "quarte": 1, "quinte": 2, "sixte": 2, "septième": 2 }


// Accords


export default class Solfege {

    constructor(typeNotation){
        this.typeNotation = typeNotation;
        switch(typeNotation){
            case "fr":
                this.notes = notesFr;
                break;
            case "us":
                this.notes = notesUS;
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

let test = new Solfege("fr");
console.log(test.listerNotesGamme("Do", gammeMajeure))