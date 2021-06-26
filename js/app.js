import Manche from './composants/Manche.mjs'
import * as Solfege from './Solfege.mjs'
import * as env from './env.mjs'

// customElements.define('manche-bass', Manche)

// env.manche__form.addEventListener('submit', initManche);

let test = new Solfege("fr");

console.log(test.listerNotesCorde(4, 21));



