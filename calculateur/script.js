// Sélection du corps du tableau avec id "mon tableau"
const tbody = document.querySelector("#monTableau tbody");

// Liste des noms pour la première colonne
const lignes = [
  "Français", "Mathématiques", "Histoire-Géographie", "EMC",
  "LV1", "LV2", "Sciences Physiques", "SVT",
  "Technologie", "Arts Plastiques", "Education musicale", "EPS"
];
//prépare deux tableaux vides, probablement pour stocker les notes ou moyennes spécifiques
//à ces matières (non utilisés dans le reste du code pour l’instant).
let listeFrançais=[];
let listeMaths = [];

///////////////////////////////////////////////////////////
/////////// 1er tableau matières///////////////////////////
//////////////////////////////////////////////////////////
// Création des 12 lignes
for (let i = 0; i < lignes.length; i++) {
  const tr = document.createElement("tr");              //Boucle sur chaque matière pour créer une ligne (<tr>) dans le tableau.
 
  // 1ère colonne : nom de la ligne
  const tdLabel = document.createElement("td");         //Crée la première cellule (<td>) contenant le nom de la matière, et l’ajoute à la ligne.
  tdLabel.textContent = lignes[i];
  tr.appendChild(tdLabel);

  // Colonnes Tr1, Tr2, Tr3 + dernière colonne : Moyenne à l'année
  const colonnes = ["Tr1", "Tr2", "Tr3", "Moyenne"];     //3 colonnes pour les trimestres (Tr1, Tr2, Tr3) +1 pour "moyenne"
  colonnes.forEach(() => {
    const tdInput = document.createElement("td");        //Chaque cellule contient un champ <input> pour saisir ou afficher une note.
    const input = document.createElement("input");
    input.type = "text";                                 // imput de texte
    input.placeholder = "";                              // champ vide au départ
    tdInput.appendChild(input);
    tr.appendChild(tdInput);
  });

  tbody.appendChild(tr);                                 //Ajoute la ligne complète au corps du tableau.
}
////////////////////////////////////////////////////////
////////////Fin construction du tableau////////////////
////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////
//fonction qui permet de calculer les points du contrôle continu
///////////////////////////////////////////////////////////////////

function calculerMoyennes() {
  const lignes = document.querySelectorAll("#monTableau tbody tr"); //Déclare une fonction qui va parcourir chaque ligne du tableau pour calculer les moyennes.
  //const optionInput = document.getElementById("optionAnnuelle");

  let sommeGlobale = 0;                                             //somme de toutes les moyennes calculées
  let lignesAvecMoyenne = 0;                                        //nombre de lignes ayant une moyenne valide

  lignes.forEach((ligne) => {                                       //Pour chaque ligne du tableau
    const inputs = ligne.querySelectorAll("input");                 //on récupère les 4 champs <input> (Tr1, Tr2, Tr3, Moyenne).

    let somme = 0;                                                  // Initialise la somme des notes et le nombre de notes valides pour cette ligne.
    let count = 0;                                                  //et le nombre de notes valides pour cette ligne.

    // Calcul de la moyenne des 3 premiers inputs
    for (let i = 0; i < 3; i++) {                                   // Parcourt les 3 premiers champs (Tr1 à Tr3) :
      const valeur = parseFloat(inputs[i].value);                   //Convertit la valeur en nombre
      if (!isNaN(valeur)) {                                         // si c'est bien un nombre
        if (valeur > 20) {                                          //supérieur à 20
          alert("Erreur : une note est supérieure à 20 !");         // alerte
          inputs[i].focus();                                        //On garde le focus sur l'input problématique
          return;                                                   // Stoppe le calcul
        }

        somme += valeur;                                            //Ajoute à la somme 
        count++;                                                    //et incrémente le compteur
      }
    }

    const moyenne = count > 0 ? (somme / count).toFixed(2) : "";    //Calcule la moyenne si au moins une note est valide
    const moyenneInput = inputs[3];
    moyenneInput.value = moyenne;                                   //l’affiche dans le 4ᵉ champ (Moyenne)

    // Coloration
    if (moyenne !== "") {                                           // Si une moyenne est calculée :
      moyenneInput.style.backgroundColor = moyenne >= 10 ? "#c8f7c5" : "#f7c5c5"; //Colore le champ en vert si ≥ 10, rouge sinon
      sommeGlobale += parseFloat(moyenne);                          //Ajoute la moyenne à la somme globale
      lignesAvecMoyenne++;                                          // on incrémente le nbre de ligne avec moyenne
    } else {
      moyenneInput.style.backgroundColor = "";                      //Sinon, laisse le fond neutre.
    }
  });

  //------------------------------------------------------------------------//
  // Option facultative : calcul de la moyenne des 3 trimestres +points bonus
  //------------------------------------------------------------------------//

  const optionInputs = document.querySelectorAll(".optionAnnuelle input"); // liste de tous les input de .optionAnnuelle (tr1,tr2,tr3,moyenne anneuelle, bonus)
  let sommeOption = 0;                                                     //pour additionner les moyennes valides.
  let countOption = 0;                                                     //pour compter combien de notes ont été saisies correctement.

  for (let i = 0; i < 3; i++) {                                            //Lance une boucle sur les 3 premiers champs (Tr1, Tr2, Tr3).
    const valeur = parseFloat(optionInputs[i].value);
    if (!isNaN(valeur)) {                                                   //Vérifie que la valeur est bien un nombre (et non vide ou invalide).
      if (valeur > 20) {                                                    // Si la note dépasse 20 :
        alert("Erreur : une note d'option facultative est supérieure à 20 !"); //alerte
        optionInputs[i].focus();                                            // on met le focus sur l'input pb
        return;                                                             // on arrête le calcul
      }
      sommeOption += valeur;                                                //Si la note est valide : on l'ajoute à la somme
      countOption++;                                                        //Incrémente le compteur.
    }
  }
  // Calcul de la moyenne annuelle de l'option
  const moyenneOption = countOption > 0 ? (sommeOption / countOption).toFixed(2) : ""; // Si on a au moins une moyenne valide sur un tr, on calcule la moyenne de l'option sinon on laisse le champ vide
  const moyenneOptionInput = optionInputs[3];                                          //selectionne le 4e input donc moyenne
  moyenneOptionInput.value = moyenneOption;                                            // insère la moyenne calculée dans le champs qui correspond

  // Calcul des points bonus si moyenne > 10
  if (moyenneOption !== "" && parseFloat(moyenneOption) > 10) {             //si Moyenne annuelle n'est pas vide et >10
    const bonus = (parseFloat(moyenneOption) - 10).toFixed(2);              // on définit les point bonus (moyenne annuelle - 10)
    optionInputs[4].value = bonus;                                          // Champ "bonus" remplit par bonus
  } else if(moyenneOption !== "" && parseFloat(moyenneOption) <= 10) {      //si Moyenne annuelle  pas vide et note<10
    optionInputs[4].value =0;                                               // pas de bonus, on envoie 0
  }else{                                                                    // sinon, on envoie rien !
    optionInputs[4].value = "";                                             // Vide si pas de bonus
  }

  // Coloration
  if (moyenneOption !== "") {                                               // si la moyenne à l'année n'est pas vide
    moyenneOptionInput.style.backgroundColor = moyenneOption >= 10 ? "#c8f7c5" : "#f7c5c5"; //Applique une couleur de fond au champ de moyenne
    if (parseFloat(moyenneOption) > 10) {                                   //Si la moyenne est strictement supérieure à 10, on calcule les points bonus 
      sommeGlobale += parseFloat(moyenneOption) - 10;                       //On soustrait 10 à la moyenne
    }
  } else {
    moyenneOptionInput.style.backgroundColor = "";                          // sinon, la moyenne est vide, on réinitialise la couleur de fond
  }


  // Calcul de la moyenne générale
  let moyenneGlobale = lignesAvecMoyenne > 0 ? (sommeGlobale / lignesAvecMoyenne).toFixed(2) : "–"; //Si au moins une ligne a une moyenne (lignesAvecMoyenne > 0), on calcule la moyenne générale :
  
  // ✅ Empêche la moyenne globale de dépasser 20
      if (moyenneGlobale !== "–") {
        moyenneGlobale = Math.min(parseFloat(moyenneGlobale), 20).toFixed(2);
      }
  /////////////////////////////////////////////////////////////////////////////////
  const valeurGlobale = document.getElementsByClassName("valeurGlobale");                             //Attention, sélctionner par class renvoie une liste. Il faut faire une boucle pour afficher sur les 2 span controle continu
  for (let i = 0; i < valeurGlobale.length; i++) {                                                    //Boucle sur chaque élément valeurGlobale (deux <span> affichant la moyenne générale).
      valeurGlobale[i].textContent = moyenneGlobale;                                                    //Insère la moyenne calculée (ou "–") dans le texte de chaque élément.
      valeurGlobale[i].style.backgroundColor =                                                          //Applique une couleur de fond selon la valeur 
      moyenneGlobale !== "–" && parseFloat(moyenneGlobale) >= 10 ? "#c8f7c5" :                      //Vert clair si la moyenne est ≥ 10
      moyenneGlobale !== "–" ? "#f7c5c5" : "";                                                      //Rouge clair si elle est < 10 et rien si la moeyenne est "-"
  }

  //---------------------------------------------------------------------//
  /// calcul de la note des épreuves finales (moyenne pondérée)/////////////
  //---------------------------------------------------------------------//

  const table = document.getElementById("EpreuvesFinales");                             //Sélectionne le tableau HTML contenant les épreuves finales (id="EpreuvesFinales")
  const rows = table.querySelectorAll("tbody tr");                                      //récupère toutes ses lignes (<tr>) dans le corps (<tbody>).

        /// Teste si les valeurs entrées pour les notes finales sont indérieur à20///
        let noteInvalide = null;                                             //Initialise une variable pour stocker le premier champ contenant une note invalide (> 20).
        let noteManquante = false;

        rows.forEach(row => {                                                 //Pour chaque ligne
          const inputNote = row.cells[2].querySelector("input");              //Récupère la note saisie dans la 3ᵉ cellule :input "note sur 20"
          const noteText = inputNote.value.trim().replace(",", ".");          //Remplace les virgules par des points pour éviter les erreurs de conversion.
          const note = parseFloat(noteText);                                  //Convertit en nombre.
          

          //test des champs des notes finales
          if (noteText === "" || isNaN(note)) {                               //si l'imput des notes d'épreuves est vide ou pas un nombre
            noteManquante = true;                                             //la variable note manquante existe
          }

          if (!isNaN(note) && note > 20 && noteInvalide === null) {           //Si la note est valide (nombre) mais supérieure à 20, on la stocke comme erreur.
            noteInvalide = inputNote;                                         // On garde le premier input erroné
          }
        });

        if (noteInvalide) {                                                   //Si une note invalide a été détectée :
          alert("Erreur : une note d'épreuve finale est supérieure à 20 !");  //alerte
          noteInvalide.focus();                                               // On garde le focus sur le champs pb
          return;                                                             // Stoppe le calcul complet
        }
        
        if (noteManquante) {                                                  // si note manquante existe
          document.getElementById("noteFinale").textContent = "–";            //le champs note finale affiche "-"
          document.getElementById("notefinaleBrevet").textContent = "–";      //le champs note finale brevet affiche "-"
          document.getElementById("Mention").textContent = "–";               // idem pour menrtion
          return;
        }


  // Calcul de la moyenne pondérée
  let totalPoints = 0;                                                        // initialise totalPoints : somme des notes × coefficients.
  let totalCoefficients = 0;                                                  //totalCoefficients : somme des coefficients.

  rows.forEach(row => {                                                       //Pour chaque ligne
    const coefText = row.cells[1].textContent.trim().replace("x", "").replace(",", "."); //Récupère le coefficient (cellule 2) et la note (cellule 3).
    const noteText = row.cells[2].querySelector("input").value.trim().replace(",", "."); //Nettoie les valeurs (supprime "x", remplace virgule).

   
    const coef = parseFloat(coefText); //Convertit en nombres.
    const note = parseFloat(noteText); //Convertit en nombres.

    if (!isNaN(coef) && !isNaN(note)) {   //Si les deux sont valides, ajoute au total pondéré.
      totalPoints += note * coef;
      totalCoefficients += coef;
    }
  });

  const moyenne = totalCoefficients > 0 ? (totalPoints / totalCoefficients).toFixed(2) : "–"; //Si au moins un coefficient est valide? on calcule la moyenne sinon on affiche "-"
  document.getElementById("noteFinale").textContent = moyenne; //Affiche le résultat dans l’élément HTML avec id="noteFinale"






// penser au test cond pour éviter le NaN si pas de CC et notes au épreuves finales
//penser à coloriser la note aux épreuves terminales et la note finale








  
  
    /// calcul de la note finale du brevet///////
   let noteFinalelBrevet = 0.4*moyenneGlobale + 0.6*moyenne;        //Calcule la note finale du brevet en combinant :
   let arrondi = parseFloat(noteFinalelBrevet.toFixed(2));          //Arrondit la note finale à 2 chiffres après la virgule et la convertit en nombre.
   const noteDNB = document.getElementById("notefinaleBrevet");     // Affiche la note finale dans l’élément HTML avec l’ID notefinaleBrevet.
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
