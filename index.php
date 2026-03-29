<?php 
    session_start();

    require_once(__DIR__ . "/config/config.php");
    require_once(__DIR__ . "/config/variables.php");
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.min.js" integrity="sha384-G/EV+4j2dNv+tEPo3++6LCgdCROaejBqfUeNjuKAiuXbjrxilcCdDz6ZAVfHWe1Y" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <title>Jeu PHP</title>
</head>
<body>
    <audio id="mainSong" src="assets/mainSong.mp3" loop></audio>
    <audio id="victorySong" src="assets/victory.mp3"></audio>
    <audio id="loozeSong" src="assets/looze.mp3"></audio>

    <main class="min-vh-100 d-flex flex-column gap-50px">
        <?php 
            if (isset($_GET['page'])) {
                $scan = scandir("steps");
                $bool = false;

                foreach ($scan as $file) {
                    if ($file == "{$_GET['page']}.php") {
                        $bool = true;
                        break;
                    }
                }

                if ($bool == false) {
                    header('location: index.php');
                    return;
                }

                require_once(__DIR__ . "/steps/{$_GET['page']}.php"); 
            } else {
                require_once(__DIR__ . "/steps/start.php"); 
            }
        ?>
    </main>

    <script src="script.js"></script>
</body>
</html>