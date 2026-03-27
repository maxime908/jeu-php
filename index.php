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
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <title>Jeu PHP</title>
</head>
<body>
    <audio id="mainSong" src="assets/mainSong.mp3" loop></audio>

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