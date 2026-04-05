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

const attackButton = document.getElementById("minusLifeEnemy");
const shieldButton = document.getElementById("shield");
const energyButton = document.getElementById("energy");

const buttonAction = document.querySelectorAll("#buttonAction button");

const action = document.querySelector("#actions .card-title");
const actionCard = document.getElementById("actions");

const imgPerso = document.getElementById("imgPersonnage");
const imgEnemy = document.getElementById("imgEnemy");

const affichageImgPerso = document.querySelector(".img-personnage");
const affichageImgEnemy = document.querySelector(".img-enemy");

const affichageDegatPerso = document.getElementById("affichageDegatPerso")
const affichageDegatEnemy = document.getElementById("affichageDegatEnemy")

const mainSong = document.getElementById("mainSong");
const victorySong = document.getElementById("victorySong");
const loozeSong = document.getElementById("loozeSong");

const restart = document.getElementById("restart");
const scoreboard = document.getElementById("scoreboard")
const hidden = document.querySelector(".hidden");

const imgPersoSplit = imgPerso.value.split(".");
const imgEnemySplit = imgEnemy.value.split(".");

hidden.style.display = "none";
hidden.style.opacity = "0";

let calcViePlayer = null
let calcVieEnemy = null

console.log(parseInt(localStorage.getItem("playerLife")))

let newVieEnemy = vieEnemy.value
let newViePerso = viePersonnage.value

newVieEnemy = parseInt(newVieEnemy);

if (!localStorage.getItem("playerLife")) {
    newViePerso = parseInt(newViePerso);
} else {
    newViePerso = localStorage.getItem("playerLife");
}

calcViePlayer = (parseInt(newViePerso) * 100) / parseInt(viePersonnage.value)
calcVieEnemy = (parseInt(newVieEnemy) * 100) / parseInt(vieEnemy.value)

let icone = null

progressPersonnage.style.width = `${calcViePlayer}%`;
progressEnemy.style.width = `${calcVieEnemy}%`;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

dictionnairePlayer = {
    "attaque": false,
    "bouclier": false,
    "charge": false,
};

dictionnaireBot = {
    "attaque": false,
    "bouclier": false,
    "charge": false,
};

const stockPlayer = {
    "attaque": [],
    "shield": 0,
    "energy": 0,
    "energy_tour_avant": 0,
    "nb_coup": 1,
}

const stockBot = {
    "attaque": [],
    "shield": 0,
    "energy": 0,
    "energy_tour_avant": 0,
    "nb_coup": 0,
}

// let addShieldBool = false;

function addShield(chield) {
    // if (stockBot.energy > 0 || stockPlayer.energy > 0) {
    //     console.log("siu")
    //     return;
    // }

    chield.shield += 1
    // attackButton.click();
}

function addCharge(chield) {
    chield.energy += 1

    if (chield === stockPlayer) {
        document.getElementById("display-charge").textContent = chield.energy
    }
    // attackButton.click();
}

// shieldButton.addEventListener('click', addShield);

function afficherImg(affichage, img, imgSplit, transform, transformReturn, affichageDegat, degat, icone) {
    affichage.style.transform = transform;
    affichage.querySelector("img").src = `assets/${imgSplit[0]}_attaque.${imgSplit[1]}`;
    affichage.style.transition = "0.5s";

    setTimeout(() => {
        affichage.style.transform = transformReturn;
        affichage.querySelector("img").src = `assets/${img.value}`;

        affichageDegat.innerHTML = `${icone} ${degat}`;
        affichageDegat.style.opacity = "1";
        affichageDegat.style.transition = "0.5s";

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

let botCoup = 0

let coupUp = 1
let countRound = 0

let incr = 0

let playerCoup = coupUp + stockPlayer.energy

document.getElementById("remaining_move").textContent += playerCoup + "/4"

function test() {
    playerCoup += coupUp + stockPlayer.energy

    launchAnim();
}

function launchAnim() {
    bool = false

    let degatEnemy = 0

    if (stockBot.shield < stockPlayer.attaque.length) {
        for (let i = 0; i < stockPlayer.attaque.length; i++) {
            if (i >= stockBot.shield) {
                degatEnemy += stockPlayer.attaque[i]
                // console.log("pika attaque éclair")
            }
        }
    }

    // let crticalRand = getRandomInt(9)

    // if (crticalRand === 8) {
    //     rand = parseInt(degatsPersonnage.value) + 10
    //     icone = "💢"
    // } else {
    //     icone = "⚔️"
    // }

    newVieEnemy -= degatEnemy

    calcVieEnemy = (parseInt(newVieEnemy) * 100) / parseInt(vieEnemy.value)

    if (calcVieEnemy > 0) {
        progressEnemy.style.width = `${calcVieEnemy}%`;
    } else {
        calcVieEnemy = 0;
        progressEnemy.style.width = `${calcVieEnemy}%`;
        endGame = true
        localStorage.setItem("playerLife", parseInt(newViePerso))
        victorySong.play();
        axios.get("changeRound.php")
        .then(() => {
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        })
    }

    if (stockPlayer.attaque.length > 0) { 
        afficherImg(affichageImgPerso, imgPerso, imgPersoSplit, "translateX(100%)", "translateX(0%)", affichageDegatEnemy, degatEnemy, "⚔️")
    }

    setTimeout(() => {
        affichageDegatEnemy.style.opacity = "0";
    }, 2000)

    cardAction();

    if (stockBot.shield > 0) {
        document.querySelector(".img-enemy").classList.add("shield")
        setTimeout(() => {
            document.querySelector(".img-enemy").classList.remove("shield")
        }, 1600)
    }

    action.innerHTML = "Au bot de jouer !";

    setTimeout(() => {
        if (endGame) {
            action.innerHTML = "La partie est terminée !";
            return;
        }

        let degatPerso = 0

        if (stockPlayer.shield < stockBot.attaque.length) {
            for (let i = 0; i < stockBot.attaque.length; i++) {
                if (i >= stockPlayer.shield) {
                    degatPerso += stockBot.attaque[i]
                    console.log("pikaBot attaque éclair")
                }
            }
        }

        // let crticalRand = getRandomInt(9)

        // if (crticalRand === 8) {
        //     rand = parseInt(degatsPersonnage.value) + 10
        //     icone = "💢"
        // } else {
        //     icone = "⚔️"
        // }

        newViePerso -= degatPerso

        calcViePlayer = (parseInt(newViePerso) * 100) / parseInt(viePersonnage.value)

        if (calcViePlayer > 0) {
            progressPersonnage.style.width = `${calcViePlayer}%`;
        } else {
            calcViePlayer = 0;
            progressPersonnage.style.width = `${calcViePlayer}%`;
            loozeSong.play()
            action.innerHTML = "Vous avez perdu !";
            hidden.style.display = "block";
            hidden.style.opacity = "1";
            hidden.style.transition = "0.5s";
            localStorage.removeItem("playerLife")
            endGame = true;
        }

        console.log(degatPerso)

        if (stockBot.attaque.length > 0) { 
            afficherImg(affichageImgEnemy, imgEnemy, imgEnemySplit, "translateX(100%)", "translateX(200%)", affichageDegatPerso, degatPerso, "⚔️")
        }

        setTimeout(() => {
            affichageDegatPerso.style.opacity = "0";
        }, 2000)

        if (stockPlayer.shield > 0) {
            document.querySelector(".img-personnage").classList.add("shield")
            setTimeout(() => {
                document.querySelector(".img-personnage").classList.remove("shield")
            }, 1600)
        }

        stockPlayer.attaque = []
        document.getElementById("display-attack").textContent = stockPlayer.attaque.length

        setTimeout(() => {
            console.log("New round")

            stockPlayer.shield = 0
            stockBot.shield = 0

            stockBot.attaque = []

            // console.log(coupUp)

            // if (coupUp < 4) {
            //     playerCoup++
            // }

            stockPlayer.energy = 0
            stockBot.energy = 0

            document.getElementById("display-charge").textContent = stockPlayer.energy
            document.getElementById("display-shield").textContent = stockPlayer.shield

            stockPlayer.energy_tour_avant = stockPlayer.energy
            stockBot.energy_tour_avant = stockBot.energy

            countRound++

            if (countRound < 4) {
                incr++
            }

            playerCoup += incr
            stockBot.nb_coup += incr

            console.log("energy bot : " + stockBot.nb_coup)

            document.getElementById("remaining_move").textContent = "Action restante : " + playerCoup + "/4"

            if (stockPlayer.energy > 3) {
                document.getElementById("energy").disabled = true;
            } else {
                document.getElementById("energy").disabled = false;
            }

            // affichageDegatEnemy.style.opacity = "0";
            // affichageDegatPerso.style.opacity = "0";

            if (!endGame) {
                action.innerHTML = "A vous de jouer !";
            } else {
                action.innerHTML = "La partie est terminée !";
            }

            cardAction()

            bool = true
        }, 500)
    }, 1000)
}



buttonAction.forEach((element) => {
    element.addEventListener('click', () => {
        if (!bool || endGame) {
            return;
        }

        for (dico in dictionnairePlayer) {
            dictionnairePlayer[dico] = false
        }

        let aleaTemps = (1500 + getRandomInt(3000));

        // if (playerCoup > 0) {
            dictionnairePlayer[element.value] = true

            if (dictionnairePlayer["attaque"] === true) {
                setAttaque(false);
            }

            if (dictionnairePlayer["bouclier"] === true) {
                setDefense(false);
            }

            if (dictionnairePlayer["charge"] === true) {
                setCharge(false);
            }

            if (stockPlayer.energy > 3) {
                document.getElementById("energy").disabled = true;
            } else {
                document.getElementById("energy").disabled = false;
            }
        // }

        if (playerCoup > 0) {
            playerCoup--
        }

        // setTimeout(() => {
            if  (playerCoup === 0) {
                for (let i = 0; i <= stockBot.nb_coup; i++) {
                    for (dico in dictionnaireBot) {
                        dictionnaireBot[dico] = false
                    }

                    const rand = getRandomInt(buttonAction.length)

                    const selectAction = buttonAction[rand].value

                    dictionnaireBot[selectAction] = true;

                    if (dictionnaireBot["attaque"] === true) {
                        setAttaque(true);
                    }

                    if (dictionnaireBot["bouclier"] === true) {
                        setDefense(true);
                    }

                    if (dictionnaireBot["charge"] === true) {
                        setCharge(true);
                    }

                    if (i === stockBot.nb_coup) {
                        stockBot.nb_coup -= i
                    }
                }

                stockBot.nb_coup += stockBot.energy
            }

        // }, aleaTemps);
        document.getElementById("remaining_move").textContent = "Action restante : " + playerCoup + "/4"
        if (playerCoup === 0) {
            test()
        }
    })
})

function setAttaque(isBot) {
    if (isBot) {
        degat = degatsEnemy.value
        stock = stockBot
        if (stock.energy_tour_avant !== 0) {
            stock.energy_tour_avant--
            stock.energy--
        }
        console.log("Att bot")
    } else {
        degat = degatsPersonnage.value
        stock = stockPlayer
        if (stock.energy_tour_avant !== 0) {
            stock.energy_tour_avant--
            stock.energy--
            document.getElementById("display-charge").textContent = stock.energy
        }
    }

    let rand = getRandomInt(degat) + 1;

    let crticalRand = getRandomInt(9)

    if (crticalRand === 8) {
        rand = parseInt(degat) + 10
    }

    // newVieEnemy -= vieEnemy.value - rand;

    stock.attaque.push(rand)

    if (!isBot) {
        document.getElementById("display-attack").textContent = stockPlayer.attaque.length
    }
}

function setDefense(isBot) {
    let chooseDic = null

    if (isBot) {
        chooseDic = stockBot
        if (chooseDic.energy_tour_avant !== 0) {
            chooseDic.energy_tour_avant--
            chooseDic.energy--
        }
        console.log("def bot")
    } else {
        chooseDic = stockPlayer
        if (chooseDic.energy_tour_avant !== 0) {
            chooseDic.energy_tour_avant--
            chooseDic.energy--
            document.getElementById("display-charge").textContent = chooseDic.energy
        }
    }

    addShield(chooseDic)

    if (!isBot) {
        document.getElementById("display-shield").textContent = stockPlayer.shield
    }
}

function setCharge(isBot) {
    let chooseDic = null

    if (isBot) {
        chooseDic = stockBot
        console.log("charge bot")
    } else {
        chooseDic = stockPlayer
    }

    addCharge(chooseDic)
}



// attackButton.addEventListener('click', () => {
//     if (endGame) {
//         action.innerHTML = "La partie est terminée !";
//         return;
//     }

//     if (bool) {
//         affichageDegatEnemy.style.opacity = "0";
//         affichageDegatPerso.style.opacity = "0";

//         let aleaTemps = (1500 + getRandomInt(3000));

//         let rand = getRandomInt(degatsEnemy.value) + 1;

//         let crticalRand = getRandomInt(9)

//         if (crticalRand === 8) {
//             rand = parseInt(degatsPersonnage.value) + 10
//             icone = "💢"
//         } else {
//             icone = "⚔️"
//         }

        // newVieEnemy -= vieEnemy.value - rand;

//         newVieEnemy -= rand

//         calcVieEnemy = (parseInt(newVieEnemy) * 100) / parseInt(vieEnemy.value)

//         if (calcVieEnemy > 0) {
//             progressEnemy.style.width = `${calcVieEnemy}%`;
//         } else {
//             calcVieEnemy = 0;
//             progressEnemy.style.width = `${calcVieEnemy}%`;
//             action.innerHTML = "Vous avez gagné !";
//             restart.style.display = "block";
//             restart.style.opacity = "1";
//             restart.style.transition = "0.5s";
//             endGame = true;
//         }

//         afficherImg(affichageImgPerso, imgPerso, imgPersoSplit, "translateX(100%)", "translateX(0)", affichageDegatEnemy, rand, icone);

//         cardAction();

//         bool = false;

//         if (!endGame) {
//             action.innerHTML = "Le bot est en train de jouer...";

//             if (!bool) {
//                 setTimeout(() => {

//                     let rand = getRandomInt(degatsEnemy.value) + 1;

//                     affichageDegatEnemy.style.opacity = "0";
//                     affichageDegatPerso.style.opacity = "0";

//                     let crticalRand = getRandomInt(9)

//                     if (crticalRand === 8) {
//                         rand = parseInt(degatsEnemy.value) + 10
//                         icone = "💢"
//                     } else {
//                         icone = "⚔️"
//                     }

//                     if (stockPlayer.shield === 0) {
//                         newViePerso -= rand
//                     } else {
//                         stockPlayer.shield = 0
//                     }

//                     calcViePlayer = (parseInt(newViePerso) * 100) / parseInt(viePersonnage.value)

//                     if (calcViePlayer > 0) {
//                         progressPersonnage.style.width = `${calcViePlayer}%`;
//                         action.innerHTML = "A vous de jouer !";
//                     } else {
//                         calcViePlayer = 0;
//                         progressPersonnage.style.width = `${calcViePlayer}%`;
//                         action.innerHTML = "Vous avez perdu !";
//                         restart.style.display = "block";
//                         restart.style.opacity = "1";
//                         restart.style.transition = "0.5s";
//                         endGame = true;
//                     }

//                     afficherImg(affichageImgEnemy, imgEnemy, imgEnemySplit, "translateX(100%)", "translateX(200%)", affichageDegatPerso, rand, icone);

//                     cardAction();

//                     bool = true;
//                 }, aleaTemps)
//             }
//         }
//     }
// })

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

scoreboard.addEventListener('click', () => {
    axios.get("goToScoreboard.php")
    .then(() => window.location.reload())
})