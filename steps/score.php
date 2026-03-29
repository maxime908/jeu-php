<?php 
    if (!isset($_SESSION['USER'])) {
        header('location: index.php');
        return;
    }

    if ($_SESSION['USER']['steps'] !== "score") {
        header('location: index.php');
        return;
    }

    if (!isset($_SESSION['LIMIT'])) {
        $_SESSION['LIMIT'] = 10;
    }

    if (isset($_GET['plus'])) {
        $_SESSION['LIMIT'] += 10;
        header("location: index.php?page=score");
    } else if (isset($_GET['moins'])) {
        if ($_SESSION['LIMIT'] >= 20) {
            $_SESSION['LIMIT'] -= 10;
        } else {
            $_SESSION['LIMIT'] = 10;
        }
        header("location: index.php?page=score");
    }

    $scoreStatement = $mysqlClient -> prepare(
        "SELECT pseudo, point, date, img
        FROM utilisateurs
        LEFT JOIN personnages
        ON utilisateurs.id_personnage = personnages.id_personnage
        ORDER BY point DESC, date LIMIT {$_SESSION['LIMIT']}");
    $scoreStatement -> execute();
    $scores = $scoreStatement -> fetchAll(PDO::FETCH_ASSOC);

    $i = 1
?>

<img src="assets/bck_score.png" class="position-fixed w-100 z-n1" alt="">

<div class="d-flex flex-column gap-5 p-5 w-50 m-auto">
    <div class="d-flex flex-column gap-3 align-items-center w-100">
        <?php foreach ($scores as $score): ?>
            <div class="d-flex w-100">
                <div class="card w-50">
                    <img src="assets/<?php echo $score['img']; ?>" class="card-img-top p-2 w-100" alt="...">
                </div>
                <div class="card w-100" style="width: 18rem;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h5 class="card-title"><?php echo $score['pseudo']; ?></h5>
                            <small class="text-muted"><?php echo $i; ?></small>
                        </div>
                        <p class="card-text">Point(s) : <?php echo $score['point']; ?></p>
                        <p class="card-text">Date : <?php echo $score['date']; ?></p>

                    </div>
                </div>
            </div>
            <?php $i++; ?>
        <?php endforeach; ?>
    </div>

    <div class="d-flex flex-column gap-2">
        <div>
            <a href="?page=score&plus=true" class="btn btn-primary">Afficher plus</a>
            <a href="?page=score&moins=true" class="btn btn-primary">Afficher moins</a>
        </div>
        <a href="gestion/restartGame.php" class="btn btn-primary align-self-start">Recommencer</a>
    </div>
</div>