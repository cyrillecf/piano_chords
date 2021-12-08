/**
 * GET URL
 */
let url        = document.location;
let currentUrl = url.href;
let queue_url  = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
let debut_url  = document.location;
let JsonURL    = currentUrl.replace(queue_url, "harmony.json");

/**
 *  GET JSON / AJAX
 */
// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
  let req = new XMLHttpRequest();
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

function display(reponse) {
  let harmony = JSON.parse(reponse);
  console.log(harmony.intervals);
}
//  ajaxGet(JsonURL, display);
