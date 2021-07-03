import Solfege from './Solfege.mjs'
import * as env from './env.mjs'


env.manche__btn_valider.addEventListener('click', function(){
    env.manche__manche.setAttribute('nbfrets',env.select_nb_frets.value);
    creationAccordage();
});

env.select_nb_corde.addEventListener('change', function(){
    affichageSelectsNoteAccordage();
});

function affichageSelectsNoteAccordage(){
    switch(env.select_nb_corde.value){
        case "4":
            env.select_accordage_5.classList.add('invisible');
            env.select_accordage_6.classList.add('invisible');
            env.select_accordage_7.classList.add('invisible');
            break
        case "5":
            env.select_accordage_5.classList.add('visible');
            env.select_accordage_5.classList.remove('invisible');
            env.select_accordage_6.classList.add('invisible');
            env.select_accordage_7.classList.add('invisible');
            break
        case "6":

            env.select_accordage_5.classList.add('visible');
            env.select_accordage_5.classList.remove('invisible');
            env.select_accordage_6.classList.add('visible');
            env.select_accordage_6.classList.remove('invisible');
            env.select_accordage_7.classList.add('invisible');
            break
        case "7":
            env.select_accordage_5.classList.add('visible');
            env.select_accordage_5.classList.remove('invisible');
            env.select_accordage_6.classList.add('visible');
            env.select_accordage_6.classList.remove('invisible');
            env.select_accordage_7.classList.add('visible');
            env.select_accordage_7.classList.remove('invisible');
            break
    }
}

function creationAccordage(){
    console.log("ok");
    let nbCordes = env.select_nb_corde.value;
    let accordage = [ env.select_accordage_7.value, env.select_accordage_6.value, env.select_accordage_5.value, env.select_accordage_4.value, env.select_accordage_3.value, env.select_accordage_2.value, env.select_accordage_1.value];
    let nbNotesASupprimer = 7 - nbCordes;
    for(let i=0; i<nbNotesASupprimer; i++){
        accordage.shift();
    } 
    document.querySelector('app-manche').setAttribute('accordage', JSON.stringify(accordage));
}

if (document.readyState === 'complete') {
    affichageSelectsNoteAccordage();
  } else {
    document.addEventListener('DOMContentLoaded', function() {
        affichageSelectsNoteAccordage();
    });
  }