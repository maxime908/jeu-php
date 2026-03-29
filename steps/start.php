<?php 
    if (isset($_SESSION['USER']) && $_SESSION['USER']['steps'] === "game") {
        header('location: ?page=game');
        return;
    }

    if (isset($_SESSION['USER']) && $_SESSION['USER']['steps'] === "score") {
        header('location: ?page=score');
        return;
    }

    $personnageStatement = $mysqlClient -> prepare("SELECT * FROM personnages");
    $personnageStatement -> execute();
    $personnages = $personnageStatement -> fetchAll(PDO::FETCH_ASSOC);
?>

<img src="assets/bck_main.png" class="position-fixed z-n1 w-100 h-100" alt="">

<form action="gestion/start.php" method="post" id="form" class="d-flex flex-column gap-5 pb-5">
    <div class="d-flex gap-3">
        <input type="text" class="form-control" name="pseudo" placeholder="Entrez votre pseudo" aria-label="pseudo">
        <button type="button" class="btn btn-primary w-25" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Jouer</button>
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

<div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Règles du jeu</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <span>🧍 Choisis ton personnage (vie ❤️, dégâts 💥)</span><br>

        <span>🔁 Le jeu se joue en rounds</span><br>
        <span>➡️ Tu gardes ta vie entre chaque round</span><br>
        <span>🔥 Le but est d’aller le plus loin possible</span><br>

        <br>

        <span>⚔️ À chaque tour, tu peux :</span><br>
        <span>- Attaquer → inflige des dégâts</span><br>
        <span>- Défendre → bloque des attaques</span><br>
        <span>- Charger → gagne des actions au prochain tour</span><br>

        <br>

        <span>🤖 Une fois tes actions utilisées, le bot joue</span><br>

        <br>

        <span>🛡️ Les boucliers annulent des attaques</span><br>
        <span>💢 Les attaques peuvent être critiques</span><br>

        <br>

        <span>💀 La partie se termine quand ta vie tombe à 0</span>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" id="play">Jouer</button>
      </div>
    </div>
  </div>
</div>

<script>
    const play = document.getElementById("play");
    const form = document.getElementById("form");

    play.addEventListener('click', () => {
        form.submit();
    })
</script>