import Manche from './composants/Manche.mjs'
import Solfege from './Solfege.mjs'
import * as env from './env.mjs'


let section_manche = document.getElementById('section_manche');
let manche = new Manche();
manche.accordage = [ "Mi", "La", "Ré", "Sol" ];
let test = document.createElement('span');
test.textContent = "Test"
section_manche.appendChild(test);