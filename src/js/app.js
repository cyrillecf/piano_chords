/**
 * PIANI
 * Cyrille Fourcin 
 * date : 04/06/2021
 * EBAUCHE DE TRAVAIL SUR L'AFFICHAGE D'ACCORDS CLAVIER
 * CALCUL BASIQUE D'ACCORDS ET DE GAMMES
 * base sur le mode majeur
 * idées : - essayer avec des tableaux assiociatifs, objets, json.
 *         - etudier d'autres façons de faire.
 *         - rajouter une touche à la suite du clavier (DO, C), octave en plus;
 *         - definir le mode mineure et les autres modes (dorien, mixolydien,...);
 *         - inclure les différents degrées. (I II III IV ...) (tonique, sensible, dominante)
 *         - les cadences
 *         - les relatives
 * 
 *  TODO : METTRE EN ORDRE CE GROS PLAT DE SPAGHETTI.😣
 */
/**
 * MEMO : (en demi-tons)
 * second m --------------- = 1
 * second M --------------- = 2
 * tierce m --------------- = 3
 * tierce M --------------- = 4
 * quarte ----------------- = 5
 * quinte dim (b5) -------- = 6
 * quinte ----------------- = 7
 * quint aug (#5) --------- = 8
 * sixte ------------------ = 9
 * septieme (m7)----------- = 10
 * septieme (M7)----------- = 11
 * octave ----------------- = 12
 * La neuvième correspond à la seconde 
 */

var white   = "#F3F4F5";
var black   = "#939598";
var yellow  = "#FFCB00";
var blue    = "#5CB6EC";
var red     = "#FF0032";
var flat    = "♭";
var sharp   = "♯";
var ton     = 2;
var demiton = 1;

const keysArray = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B', 'C'];

// Accords : fondamentale/tonique = 0;

var major   = [4, 3];
var minor   = [3, 4];
var dim     = [3, 3];
var aug     = [4, 4];
var sus4    = [5, 2];
var k6      = [4, 3, 2]; // sixieme;
var M7      = [4, 3, 4]; // septieme majeure
var m7      = [3, 4, 3]; // septieme mineure
var dom7    = [4, 3, 3]; // septieme de dominante noté 7
var m7b5    = [3, 3, 4]; // septieme demi diminuée noté -7(b5);
var dim7    = [3, 3, 3]; // septieme diminuée;
var k7sus4  = [5, 2, 3]; // septieme suspendu;


const TreeChords = [major, minor, dim, aug, sus4, k6, M7, m7, dom7, m7b5, dim7, k7sus4];

const regNumb = /[0-9]+/;
const regNote = /[a-z|A-Z+"♭"|"♯"|"#|]+/;

/**
 * SCALES
 */
function MajorScale(key) {

  const g    = [ton, ton, demiton, ton, ton, ton, demiton];
  var depart = keysArray.indexOf(key);
  var result = [key];

  for (i = 0; i < g.length; i++) {
    var pointeur = keysArray[depart + g[i]];
    result.push(pointeur);
    depart = keysArray.indexOf(pointeur);
  }
  return result;
}

function MinorNatScale(key) {
  const g    = [ton, demiton, ton, ton, demiton, ton, ton];
  var depart = keysArray.indexOf(key);
  var result = [key];

  for (i = 0; i < g.length; i++) {
    var pointeur = keysArray[depart + g[i]];
    result.push(pointeur);
    depart = keysArray.indexOf(pointeur);
  }
  return result;
}

/**
 * CHORDS
 */

function Chord(key, mode) { // obtenir la composition de l'accord selectionné

  var depart = keysArray.indexOf(key);
  var result = [key];

  for (i = 0; i < mode.length; i++) {
    var pointeur = keysArray[depart + mode[i]];
    result.push(pointeur);
    depart = keysArray.indexOf(pointeur);
  }
  return result;

}
//console.log(Chord('C',major));

/**
 * SCALES'S CHORDS
 * obtenir tous les accords du mode majeur selectionné, tonalité + accords à 3 ou 4 sons.
 */
var chord3 = [2, 2];
var chord4 = [2, 2, 2];

function majorScaleChords(key, chordType) {
  const scale = MajorScale(key);
  scale.pop();
  const array = scale.concat(scale);

  const patron = chordType;
  var result = [];
  var chord  = [];

  for (i = 0; i < scale.length; i++) {
    chord = [];
    var keys = scale[i];
    var depart = array.indexOf(keys);

    chord.push(keys);
    /////////////////////////////////////////////////////
    for (j = 0; j < patron.length; j++) {
      var pointeur = array[depart + patron[j]];
      chord.push(pointeur); // bloc utilisé plusieurs fois : à factoriser
      depart = array.indexOf(pointeur);
    }
    ////////////////////////////////////////////////////    
    result.push(chord);
  }
  return result;
}
//console.log(majorScaleChords('C',chord3));

/**
 * affectations des touches (svg-css)
 */

function resetKeys() {
  let whiteK = document.getElementsByClassName('white key');
  let blackK = document.getElementsByClassName('black key');

  for (let i = 0; i < whiteK.length; i++) {
    whiteK[i].style.fill = white;
  }
  for (let i = 0; i < blackK.length; i++) {
    blackK[i].style.fill = black;
  }
}

//affiche TOUTES les positions de l'accord 
// TODO: pour l'utiliser revoir la syntaxe des id dans index.html (ex: id="12-C"),
//
var touches = document.getElementsByClassName('key');
function displayChord(ton, mode) {

  resetKeys();
  let chord = Chord(ton, mode);
  //
  chord.forEach(element => {

    let keynNumberId = element +"-"+ keysArray.indexOf( element);// ex : "E-7"
    let tonNumberId = ton +"-"+ keysArray.indexOf( element);// ex: "C-0"

    for (let i = 0; i < touches.length; i++) {
      let idKey = touches[i].id;
      
      if (idKey === keynNumberId) {
        touches[i].style.fill = yellow;
        touches[i+12].style.fill = yellow; // octave superieur
      }
      if (idKey === tonNumberId) {
        touches[i].style.fill = red; // tonique octave0
        touches[i+12].style.fill = red; // tonique octave1
      }
    }
  });
}
//displayChord('Ab',k6);

/**
 * @function ChordInit() affiche les touches correspondant à l'accord choisit
 * compare les index array avec id html.
 * @param {string} key tonalité de l'accord.
 * @param {number[]} mode type d'accord (major, minor, M7,...)
 * @returns {number[]} 
 */
/************************************************** */
function ChordInit(key, mode) { //to-do: separer l'affichage
 
  var o      = keysArray.indexOf(key);
  var accord = [o];
  var count  = o;

  mode.forEach(element => {
    var calc = count + element
    count    = calc;

    accord.push(count);
  });

  return accord;
} //console.log(ChordInit('B',dim));

function displayChordinit(key,mode){
  resetKeys();
  var accord = ChordInit(key,mode);
  accord.forEach(element => {
    
    if (keysArray[element] === key) { //tonique
      document.getElementById(key+"-"+ accord[0]).style.fill = red;
    } else {
      document.getElementById(keysArray[element]+"-"+element).style.fill = yellow;
    }
  });
  return accord;

} //console.log(displayChordinit('F',major));
/******************************************************************* */
// TEST //

var x = 0;
function TestChordInit(){

  try {
    TreeChords.forEach(mode => {
      for (let index = 0; index < keysArray.length-13; index++) {
        const element = keysArray[index];
        console.log(ChordInit(element,mode));
        x++;
      } 
    }); 
  } catch (error) {
    console.error(error);
  }
    
}
//TestChordInit();console.log(x);

//TEST - END//
////////////////////////////////////////////////////////////////////////////////////
const chaine = ["1-C", "E-2", "eb-3", "F♯-4", "Gb-5", "A#-6", "C#-7", "d♭-8", "B♭-9","C-10","db-11","D-12","C16","Cb45"];

for (let i = 0; i < chaine.length; i++) {
  const el = chaine[i];
  //console.log(regNumb.exec(el)[0]); // pour le nombres
}

for (let i = 0; i < chaine.length; i++) {
  const el = chaine[i];
  //console.log(regNote.exec(el)[0]); // pour les notes
}
/**
 * exemple get node pastilles1 notes 
 */
// var ele = document.getElementById('pastilles1').firstElementChild;
// ele = ele.children[2].firstElementChild.textContent
// console.log(ele)
/////////////////////////////////////////////////////////////

var accordsElt = document.createElement("td");
accordsElt.id = "nom de l'accord";
accordsElt.textContent = "accords";
document.getElementById('rowChords').appendChild(accordsElt);



/**
 * majorScaleChordsBis
 * renvoie un array composé des accords de 3 ou 4 sons d'une gamme majeur sous forme de tableaau
 * ex : majorScaleChordsBis('C',chord4) --> array[["C","E","G"],['D', 'F', 'A'],...]
 * @param {*} key 
 * @param {*} chordType 
 * @returns 
 */
function majorScaleChordsBis(key, chordType) {
  const scale = MajorScale(key);
  scale.pop();
  const array = scale.concat(scale);

  const patron = chordType;
  var result = [];
  var chord  = [];

  for (i = 0; i < scale.length; i++) {
    chord = [];
    var keys = scale[i];
    var depart = array.indexOf(keys);

    chord.push(keys);
    /////////////////////////////////////////////////////
    for (j = 0; j < patron.length; j++) {
      var pointeur = array[depart + patron[j]];
      chord.push(pointeur); // bloc utilisé plusieurs fois : à factoriser
      depart = array.indexOf(pointeur);
    }
    ////////////////////////////////////////////////////    
    result.push(chord);
  }
  return result;
}
//console.log(majorScaleChordsBis('C',chord3));




/**
 * GET URL
 */
var url = document.location;
var urlcourante = url.href;
var queue_url = urlcourante.substring (urlcourante.lastIndexOf( "/" )+1 );
var debut_url = document.location;
var JsonURL = urlcourante.replace(queue_url, "keyboard.json");

/**
 *  GET JSON / AJAX
 */
// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 400) {
          // Appelle la fonction callback en lui passant la réponse de la requête
          callback(req.responseText);
      } else {
          console.error(req.status + " " + req.statusText + " " + url);
      }
  });
  req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + url);
  });
  req.send(null);
}
function afficher(reponse) {
  var keyboards = JSON.parse(reponse);
  console.log(keyboards.chords[0]["major"]);
  console.log(keyboards.intervals[0]["3m"]);
  console.log(keyboards.keys[0]["keyFR"]);
}

//ajaxGet(JsonURL, afficher);

///////////////////////////////////
//////////////////////////////////
//////////////////////////////////

/**
 * calcul les intervals d'un accords donné : utilisé pour afficher les accords d'une gamme. 
 * ex: notes[C,E,G] -> index[0,4,7] -> intervals[0,4,3].
 * 
 * !!!Ne fonctionne pas avec les octaves, unissons, les notes doivent se suivrent!!! 
 * En cause : indexOf(chords[i],keysArray.indexOf(chords[0])) indexOf(el,debut)
 * -> ["C","G","C"] donnera [0,7,-7]
 *TODO : trouver une autre solution basé sur les intervals de la gamme (relation : gammes / accords)
 */ 
/************************************************** */
function intervals(chords){
  const index = [];
  const result =[0];
  
  for (let i = 0; i < chords.length; i++) {
    
    var x = keysArray.indexOf(chords[i],keysArray.indexOf(chords[0]));
    index.push(x);  
  }
    
  /** calcul interval */
  for (let i = 0; i < index.length; i++) {
    const el = index[i];

    if (i+1 <index.length) {
      var calcul = index[i+1] - el;
      result.push(calcul);
    } 
  }
  return result;
  //return index;
  
}
//console.log(intervals(["C", "F", "G"]));


/**
 *  phase de test pour intervals() return index à la place de result:
 */

function testIntervals(){

  function runtest(key,mode){
    
    var compoAccord = Chord(key,mode);
    var indexCompo  = ChordInit(key,mode);
    var interv = intervals(compoAccord);

    if(indexCompo.join("") != interv.join("")){
      return false;
    }
    return true;
  }
///////////////////////////////////////////
  const test =[];
  
  TreeChords.forEach(element => {// pour chaque modes et ...
    for (let i = 0; i < keysArray.length-13; i++) { //...pour toutes les tonalités
      var key = keysArray[i];
      test.push(runtest(key,element));
    }
  });

  if(test.includes(false)){
    
    for (const [i, element] of test.entries()) {
      if(element === false){
        console.log(i, element );
      }
    }

    return console.log("iteration: "+ test.length +" " + false);
    
  }
  return console.log("iteration: "+ test.length +" " + true);
}///testIntervals();

// test - FIN
/*********************************************************** */