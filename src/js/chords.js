/**
 * Cyrille Fourcin 
 * date : 07/12/21
 * CALCUL D'ACCORDS
 */

let white  = "#F3F4F5";
let black  = "#939598";
let yellow = "#FFCB00";
let blue   = "#5CB6EC";
let red    = "#FF0032";

let flat  = "♭";
let sharp = "♯";

const arrayKey   = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const majorChord = [0, 4, 3];
const minorChord = [0, 3, 4];

function getChord(key, chord) { // args: tonalité , mode : majeur, mineur, ... ;
  let cursor = arrayKey.indexOf(key);
  let result = [arrayKey[cursor]];

  for (let i = 1; i < chord.length; i++) {
    cursor = cursor + chord[i];
    let calcul = 0;

    if (cursor > arrayKey.length - 1) { // 11
      calcul = (arrayKey.length - cursor);
      calcul = Math.abs(calcul);
      result.push(arrayKey[calcul]);
    } else {
      result.push(arrayKey[cursor]);
    }
  }
  
  return result;
}

for (let i = 0; i < arrayKey.length; i++) {
  const key = arrayKey[i];
  console.log(getChord(key, majorChord));
}

/*#########################################################################*/