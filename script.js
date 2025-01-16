// Liste de mots aléatoires
const mots = ["ordinateur", "javascript", "souris", "clavier", "écran", "internet", "programmation", "développement", "algorithme", "intelligence", "artificielle", "machine", "apprentissage", "réseau", "neural", "données", "analyse", "système", "information", "technologie"];

// Sélection des éléments HTML
const affichageMot = document.getElementById("mot-taper");
const saisieMot = document.getElementById("mot-taper-utilisateur");
const affichageMinuterie = document.getElementById("temps");
const affichageScore = document.getElementById("score");
const affichageMeilleurScore = document.getElementById("meilleur-score");

let motActuel = "";
let score = 0;
let temps = 15;
let minuterie;
let meilleurScore = localStorage.getItem("meilleurScore") || 0;
affichageMeilleurScore.textContent = meilleurScore;

// Fonction pour choisir un mot aléatoire en fonction du score
function obtenirMotAleatoire() {
	const motsFiltres = mots.filter(mot => mot.length <= 5 + Math.floor(score / 5));
	return motsFiltres[Math.floor(Math.random() * motsFiltres.length)];
}

// Fonction pour démarrer le jeu
function demarrerJeu() {
	motActuel = obtenirMotAleatoire();
	affichageMot.textContent = motActuel;
	saisieMot.value = "";
	temps = 15 - Math.floor(score / 5);
	mettreAJourMinuterie();
	if (minuterie) clearInterval(minuterie);
	minuterie = setInterval(compteARebours, 1000);
}

// Fonction pour gérer le compte à rebours
function compteARebours() {
	if (temps > 0) {
		temps--;
		mettreAJourMinuterie();
	} else {
		terminerJeu();
	}
}

// Fonction pour mettre à jour le timer
function mettreAJourMinuterie() {
	affichageMinuterie.textContent = temps;
}

// Fonction pour gérer la saisie utilisateur
saisieMot.addEventListener("input", () => {
	if (saisieMot.value === motActuel) {
		score++;
		affichageScore.textContent = score;
		motActuel = obtenirMotAleatoire();
		affichageMot.textContent = motActuel;
		saisieMot.value = "";
		temps = 15 - Math.floor(score / 5);
		mettreAJourMinuterie();
	}
});

function terminerJeu() {
	clearInterval(minuterie);
	affichageMot.textContent = "Jeu terminé!";
	if (score > meilleurScore) {
		meilleurScore = score;
		localStorage.setItem("meilleurScore", meilleurScore);
		affichageMeilleurScore.textContent = meilleurScore;
	}
}