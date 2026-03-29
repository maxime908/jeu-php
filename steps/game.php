<?php 
    if (!isset($_SESSION['USER'])) {
        header('location: index.php');
        return;
    }

    if ($_SESSION['USER']['steps'] !== "game") {
        header('location: index.php');
        return;
    }

    $selectUserStatement = $mysqlClient -> prepare("SELECT * FROM utilisateurs WHERE id_utilisateur = :id_utilisateur");
    $selectUserStatement -> execute([
        'id_utilisateur' => $_SESSION['USER']['id_utilisateur'],
    ]);
    $user = $selectUserStatement -> fetch(PDO::FETCH_ASSOC); 

    if (!$user) {
        unset($_SESSION['USER']);
        header('location: index.php');
        return;
    }

    $selectPersonnageStatement = $mysqlClient -> prepare("SELECT * FROM personnages WHERE id_personnage = :id_personnage");
    $selectPersonnageStatement -> execute([
        'id_personnage' => $user['id_personnage'],
    ]);
    $personnage = $selectPersonnageStatement -> fetch(PDO::FETCH_ASSOC);

    $pngStatement = $mysqlClient -> prepare("SELECT * FROM personnages WHERE NOT id_personnage = :id_personnage");
    $pngStatement -> execute([
        'id_personnage' => $user['id_personnage'],
    ]);
    $pngs = $pngStatement -> fetchAll(PDO::FETCH_ASSOC);

    if (empty($_SESSION['USER']['enemy'])) {
        $pngRand = random_int(0, count($pngs) - 1);

        while(!$pngs[$pngRand]) {
            $pngRand;
        }

        $pngSelect = $pngs[$pngRand];

        $_SESSION['USER']['enemy'] = $pngSelect;
    }
?>

<div id="game">
    <div class="d-flex gap-3 header vh-20">
        <div class="d-flex flex-column gap-2 w-100">
            <div>
                <span class="text-white">Player : <?php echo $user['pseudo']; ?></span>
                <input type="hidden" id="viePersonnage" value="<?php echo $personnage["vie"]; ?>">
                <input type="hidden" id="degatsPersonnage" value="<?php echo $personnage["degat"]; ?>">
                <input type="hidden" id="imgPersonnage" value="<?php echo $personnage["img"]; ?>">
            </div>
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar progressPersonnage" style="width: 25%"></div>
            </div>
            <div class="d-flex gap-3 align-items-center" id="buttonAction">
                <div class="d-flex align-items-center gap-2">
                    <button type="button" id="minusLifeEnemy" value="attaque" class="btn btn-danger" style="width: fit-content;" title="Attaquer">⚔️</button>
                    <span class="text-white" id="display-attack">0</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button type="button" id="shield" value="bouclier" class="btn btn-primary" style="width: fit-content;" title="Se défendre">🛡️</button>
                    <span class="text-white" id="display-shield">0</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button type="button" id="energy" value="charge" class="btn btn-warning" style="width: fit-content;" title="Charger">⚡</button>
                    <span class="text-white" id="display-charge">0</span>
                </div>
                <span id="remaining_move" class="text-white ms-3">Action restante : </span>
            </div>
        </div>

        <div class="d-flex flex-column gap-2 w-100 ">
            <div>
                <span class="text-white">Bot : <?php echo $_SESSION['USER']['enemy']['type']; ?></span>
                <input type="hidden" id="vieEnemy" value="<?php echo $_SESSION['USER']['enemy']['vie']; ?>">
                <input type="hidden" id="degatsEnemy" value="<?php echo $_SESSION['USER']['enemy']["degat"]; ?>">
                <input type="hidden" id="imgEnemy" value="<?php echo $_SESSION['USER']['enemy']["img"]; ?>">
            </div>
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar progressEnemy" style="width: 25%"></div>
            </div>
        </div>
    </div>

    <div id="gameplay" class="vh-80-50px position-relative">
        <div class="img-personnage h-75 position-absolute bottom-0">
            <span class="position-absolute right-0 text-danger font-24" id="affichageDegatPerso"></span>
            <img src="assets/<?php echo $personnage['img']; ?>" class="w-100 h-100" alt="">
        </div>
        <div class="position-absolute left-0 bottom-0 h-75 img-enemy">
            <span class="position-absolute text-danger font-24" id="affichageDegatEnemy"></span>
            <img src="assets/<?php echo $_SESSION['USER']['enemy']['img']; ?>" class="w-100 h-100 scale-1" alt="">
        </div>
    </div>

    <div id="actions" class="card position-fixed bottom-0 right-0 m-auto w-25" style="height: fit-content;">
        <div class="card-body">
            <h5 class="card-title">A vous de jouer !</h5>
            <div class="hidden">
                <button id="restart" class="btn btn-primary">Recommencer</button>
                <button id="scoreboard" class="btn btn-primary">Tableau des scores</button>
            </div>
        </div>
    </div>
</div>