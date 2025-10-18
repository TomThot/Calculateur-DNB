// Sélection du corps du tableau
const tbody = document.querySelector("#monTableau tbody");

// Liste des noms pour la première colonne
const lignes = [
  "Français", "Mathématiques", "Histoire-Géographie", "EMC",
  "LV1", "LV2", "Sciences Physiques", "SVT",
  "Technologie", "Arts Plastiques", "Education musicale", "EPS"
];

let listeFrançais=[];
let listeMaths = [];

/////////// 1er tableau matières///////////////////////////
// Création des 12 lignes
for (let i = 0; i < lignes.length; i++) {
  const tr = document.createElement("tr");
 
  // 1ère colonne : nom de la ligne
  const tdLabel = document.createElement("td");
  tdLabel.textContent = lignes[i];
  tr.appendChild(tdLabel);

  // Colonnes Tr1, Tr2, Tr3 + dernière colonne : Moyenne à l'année
  const colonnes = ["Tr1", "Tr2", "Tr3", "Moyenne"];
  colonnes.forEach(() => {
    const tdInput = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "";
    tdInput.appendChild(input);
    tr.appendChild(tdInput);
  });

  tbody.appendChild(tr);
}

//fonction qui permet de calculer les points du contrôle continu
function calculerMoyennes() {
  const lignes = document.querySelectorAll("#monTableau tbody tr");
  const optionInput = document.getElementById("optionAnnuelle");

  let sommeGlobale = 0;
  let lignesAvecMoyenne = 0;

  lignes.forEach((ligne) => {
    const inputs = ligne.querySelectorAll("input");

    let somme = 0;
    let count = 0;

    // Calcul de la moyenne des 3 premiers inputs
    for (let i = 0; i < 3; i++) {
      const valeur = parseFloat(inputs[i].value);
      if (!isNaN(valeur)) {
        if (valeur > 20) {
          alert("Erreur : une note est supérieure à 20 !");
          inputs[i].focus();
          return; // Stoppe le calcul
        }

        somme += valeur;
        count++;
      }
    }

    const moyenne = count > 0 ? (somme / count).toFixed(2) : "";
    const moyenneInput = inputs[3];
    moyenneInput.value = moyenne;

    // Coloration
    if (moyenne !== "") {
      moyenneInput.style.backgroundColor = moyenne >= 10 ? "#c8f7c5" : "#f7c5c5";
      sommeGlobale += parseFloat(moyenne);
      lignesAvecMoyenne++;
    } else {
      moyenneInput.style.backgroundColor = "";
    }
  });


// Option facultative : calcul de la moyenne des 3 trimestres
const optionInputs = document.querySelectorAll(".optionAnnuelle input");
let sommeOption = 0;
let countOption = 0;

for (let i = 0; i < 3; i++) {
  const valeur = parseFloat(optionInputs[i].value);
  if (!isNaN(valeur)) {
    if (valeur > 20) {
      alert("Erreur : une note d'option facultative est supérieure à 20 !");
      optionInputs[i].focus();
      return;
    }
    sommeOption += valeur;
    countOption++;
  }
}

const moyenneOption = countOption > 0 ? (sommeOption / countOption).toFixed(2) : "";
const moyenneOptionInput = optionInputs[3];
moyenneOptionInput.value = moyenneOption;

// Coloration
if (moyenneOption !== "") {
  moyenneOptionInput.style.backgroundColor = moyenneOption >= 10 ? "#c8f7c5" : "#f7c5c5";
  if (parseFloat(moyenneOption) > 10) {
    sommeGlobale += parseFloat(moyenneOption) - 10;
  }
} else {
  moyenneOptionInput.style.backgroundColor = "";
}


  // Calcul de la moyenne générale
  const moyenneGlobale = lignesAvecMoyenne > 0 ? (sommeGlobale / lignesAvecMoyenne).toFixed(2) : "–";
  const valeurGlobale = document.getElementsByClassName("valeurGlobale"); //Attention, sélctionner par class renvoie une liste. Il faut faire une boucle pour afficher sur les 2 span controle continu
  for (let i = 0; i < valeurGlobale.length; i++) {
    valeurGlobale[i].textContent = moyenneGlobale;
    valeurGlobale[i].style.backgroundColor =
      moyenneGlobale !== "–" && parseFloat(moyenneGlobale) >= 10 ? "#c8f7c5" :
      moyenneGlobale !== "–" ? "#f7c5c5" : "";
  }


  /// calcul de la note des épreuve finale (moyenne pondérée)/////////////
  const table = document.getElementById("EpreuvesFinales");
  const rows = table.querySelectorAll("tbody tr");

        /// Teste si les valeur entrées pour les notes finale sont indérieur à20///
        let noteInvalide = null;

        rows.forEach(row => {
          const inputNote = row.cells[2].querySelector("input");
          const noteText = inputNote.value.trim().replace(",", ".");
          const note = parseFloat(noteText);

          if (!isNaN(note) && note > 20 && noteInvalide === null) {
            noteInvalide = inputNote; // On garde le premier input erroné
          }
        });

        if (noteInvalide) {
          alert("Erreur : une note d'épreuve finale est supérieure à 20 !");
          noteInvalide.focus();
          return; // Stoppe le calcul complet
        }
        ////////////////////////////////////

  let totalPoints = 0;
  let totalCoefficients = 0;

  rows.forEach(row => {
    const coefText = row.cells[1].textContent.trim().replace("x", "").replace(",", ".");
    const noteText = row.cells[2].querySelector("input").value.trim().replace(",", ".");

   
    const coef = parseFloat(coefText);
    const note = parseFloat(noteText);

    if (!isNaN(coef) && !isNaN(note)) {
      totalPoints += note * coef;
      totalCoefficients += coef;
    }
  });

  const moyenne = totalCoefficients > 0 ? (totalPoints / totalCoefficients).toFixed(2) : "–";
  document.getElementById("noteFinale").textContent = moyenne;

  /// calcul de la note finale du brevet///////
   let noteFinalelBrevet = 0.4*moyenneGlobale + 0.6*moyenne;
   let arrondi = parseFloat(noteFinalelBrevet.toFixed(2));
   const noteDNB = document.getElementById("notefinaleBrevet");
   noteDNB.textContent = arrondi;

  // calul de la mention////////////
    const mentionDNB = document.getElementById("Mention"); 
    if (arrondi>= 12 && arrondi<16){
      mentionDNB.textContent = "Bien";
    } else if (arrondi>=16 && arrondi<18){
        mentionDNB.textContent = "Très bien";
    } else if(arrondi>=18){
        mentionDNB.textContent = "Très bien avec félicitations";
    } else{
        mentionDNB.textContent = "Sans mention";
    }

}
