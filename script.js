const buttonStart = document.querySelectorAll("#choice button");
const personnages = document.getElementById("personnages");

buttonStart.forEach((element) => {
    if (element.classList.contains("btn-success")) {
        element.innerHTML = "choisit";
        personnages.value = parseInt(element.value)
    }

    element.addEventListener('click', () => {
        personnages.value = "";

        if (document.querySelectorAll(".btn-success")) {
            document.querySelectorAll(".btn-success").forEach(element => {
                element.classList.remove("btn-success");
                element.classList.add("btn-primary");
                element.innerHTML = "Le choisir"
            });
        }

        element.classList.toggle("btn-primary");
        element.classList.toggle("btn-success");

        if (element.classList.contains("btn-success")) {
            element.innerHTML = "choisit"
        } else {
            element.innerHTML = "Le choisir"
        }

        personnages.value = parseInt(element.value)
    })
})

let bool = true;
let endGame = false;

const url = new URLSearchParams(window.location.search);
const page = url.get("page");

let viePersonnage = document.getElementById("viePersonnage");
let vieEnemy = document.getElementById("vieEnemy");

const degatsPersonnage = document.getElementById("degatsPersonnage");
const degatsEnemy = document.getElementById("degatsEnemy");

const progressPersonnage = document.querySelector(".progressPersonnage");
const progressEnemy = document.querySelector(".progressEnemy");

const minusLifePlayer = document.getElementById("minusLifePlayer");
const minusLifeEnemy = document.getElementById("minusLifeEnemy");

const action = document.querySelector("#actions .card-title");
const actionCard = document.getElementById("actions");

const imgPerso = document.getElementById("imgPersonnage");
const imgEnemy = document.getElementById("imgEnemy");

const affichageImgPerso = document.querySelector(".img-personnage");
const affichageImgEnemy = document.querySelector(".img-enemy");

const affichageDegatPerso = document.getElementById("affichageDegatPerso")
const affichageDegatEnemy = document.getElementById("affichageDegatEnemy")

const mainSong = document.getElementById("mainSong");

const restart = document.getElementById("restart");

restart.style.display = "none";
restart.style.opacity = "0";

let calcViePlayer = parseInt(viePersonnage.value) + (100 - parseInt(viePersonnage.value))
let calcVieEnemy = parseInt(vieEnemy.value) + (100 - parseInt(vieEnemy.value))

let newVieEnemy = vieEnemy.value
let newViePerso = viePersonnage.value

newVieEnemy = parseInt(newVieEnemy);
newViePerso = parseInt(newViePerso);


progressPersonnage.style.width = `${calcViePlayer}%`;
progressEnemy.style.width = `${calcVieEnemy}%`;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function afficherImg(affichage, img, imgSplit, transform, transformReturn, affichageDegat, degat) {
    affichage.style.transform = transform;
    affichage.querySelector("img").src = `assets/${imgSplit[0]}_attaque.${imgSplit[1]}`;
    affichage.style.transition = "0.5s";

    setTimeout(() => {
        affichage.style.transform = transformReturn;
        affichage.querySelector("img").src = `assets/${img.value}`;
        
        affichageDegat.innerHTML = `⚔️ ${degat}`;
        affichageDegat.style.opacity = "1";
        affichageDegat.style.transition = "0.2s";

        affichage.style.transition = "0.5s";
    }, 500)
}

function cardAction() {
    actionCard.style.transform = "translateX(100%)"
    actionCard.style.transition = "0.1s"

    setTimeout(() => {
        actionCard.style.transform = "translateY(0)"
        actionCard.style.transition = "0.1s"
    }, 100)
}

minusLifeEnemy.addEventListener('click', () => {
    if (endGame) {
        action.innerHTML = "La partie est terminée !";
        return;
    }
    
    if (bool) {
        const imgPersoSplit = imgPerso.value.split(".");
        const imgEnemySplit = imgEnemy.value.split(".");

        affichageDegatEnemy.style.opacity = "0";
        affichageDegatPerso.style.opacity = "0";

        let aleaTemps = (1500 + getRandomInt(3000));
        let rand = getRandomInt(degatsEnemy.value) + 1;

        let crticalRand = getRandomInt(10)

        if (crticalRand === 8) {
            rand += 5
        }

        // newVieEnemy -= vieEnemy.value - rand;

        newVieEnemy -= rand

        console.log(newVieEnemy);

        // calcViePlayer = (parseInt(viePersonnage.value) * 100) / parseInt(maxViePerso.value)
        calcVieEnemy = (parseInt(newVieEnemy) * 100) / parseInt(vieEnemy.value)

        console.log(calcVieEnemy)

        if (calcVieEnemy > 0) {
            progressEnemy.style.width = `${calcVieEnemy}%`;
        } else {
            calcVieEnemy = 0;
            progressEnemy.style.width = `${calcVieEnemy}%`;
            action.innerHTML = "Vous avez gagné !";
            restart.style.display = "block";
            restart.style.opacity = "1";
            restart.style.transition = "0.5s";
            endGame = true;
        }

        console.log(affichageImgPerso)

        afficherImg(affichageImgPerso, imgPerso, imgPersoSplit, "translateX(100%)", "translateX(0)", affichageDegatEnemy, rand);

        cardAction();

        bool = false;

        if (!endGame) {
            action.innerHTML = "Le bot est en train de jouer...";
            
            if (!bool) {
                setTimeout(() => {
                    
                    let rand = getRandomInt(degatsEnemy.value) + 1;

                    affichageDegatEnemy.style.opacity = "0";
                    affichageDegatPerso.style.opacity = "0";

                    let crticalRand = getRandomInt(10)

                    if (crticalRand === 8) {
                        rand += 5
                    }

                    newViePerso -= rand

                    console.log(newViePerso);

                    // calcViePlayer = (parseInt(viePersonnage.value) * 100) / parseInt(maxViePerso.value)
                    calcViePlayer = (parseInt(newViePerso) * 100) / parseInt(viePersonnage.value)

                    console.log(calcViePlayer)

                    if (calcViePlayer > 0) {
                        progressPersonnage.style.width = `${calcViePlayer}%`;
                        action.innerHTML = "A vous de jouer !";
                    } else {
                        calcViePlayer = 0;
                        progressPersonnage.style.width = `${calcViePlayer}%`;
                        action.innerHTML = "Vous avez perdu !";
                        restart.style.display = "block";
                        restart.style.opacity = "1";
                        restart.style.transition = "0.5s";
                        endGame = true;
                    }

                    afficherImg(affichageImgEnemy, imgEnemy, imgEnemySplit, "translateX(100%)", "translateX(200%)", affichageDegatPerso, rand);

                    cardAction();

                    bool = true;
                }, aleaTemps)
            }
        }
    }
})

document.querySelector("body").addEventListener('click', () => {
    mainSong.play();
})

if (page === "game") {
    document.querySelector("body").style.backgroundImage = "url(assets/bck.gif)";
} else {
    document.querySelector("body").style.backgroundImage = "unset";
}

restart.addEventListener("click", () => {
    window.location.href = "gestion/restartGame.php";
})