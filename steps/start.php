<?php 
    if (isset($_SESSION['USER']) && $_SESSION['USER']['steps'] === "game") {
        header('location: ?page=game');
        return;
    }

    if (isset($_SESSION['USER']) && $_SESSION['USER']['steps'] === "score") {
        header('location: ?page=score');
        return;
    }
?>

<img src="assets/bck_main.png" class="position-fixed z-n1 w-100 h-100" alt="">

<form action="gestion/start.php" method="post" class="d-flex flex-column gap-5 pb-5">
    <div class="d-flex gap-3">
        <input type="text" class="form-control" name="pseudo" placeholder="Entrez votre pseudo" aria-label="pseudo">
        <button type="submit" class="btn btn-primary">Jouer</button>
    </div>
    <input type="hidden" id="personnages" name="personnages">
    <div id="choice" class="grid-card">
        <?php foreach ($personnages as $key => $personnage): ?>
            <div class="card p-5">
                <img src='assets/<?php echo $personnage['img']; ?>' class='card-img-top' alt='<?php echo $personnage['type']; ?>'>
                <div class="card-body no-white-space">
                    <p>🏷️ <?php echo ucfirst($personnage['type']); ?></p>
                    <p>💥 <?php echo $personnage['degat']; ?></p>
                    <p>❤️ <?php echo $personnage['vie']; ?></p>
                    <?php if ($personnage['mechant'] == 1): ?>
                        <p>😈 Méchant</p>
                    <?php else: ?>
                        <p>😇 Gentil</p>
                    <?php endif; ?>
                </div>
                <button type="button" class="btn <?php if ($key === 0) echo 'btn-success'; else echo 'btn-primary'; ?>" value="<?php echo $personnage['id_personnage']; ?>">Le choisir</button>
            </div>
        <?php endforeach; ?>
    </div>
</form>