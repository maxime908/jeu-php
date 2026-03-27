<?php 
    session_start();
    require_once(__DIR__ . "/../config/config.php");
?>

<?php 
    if (!isset($_POST['personnages']) || !is_numeric($_POST['personnages'])) {
        header('location: ../index.php');
        return;
    }

    if (isset($_POST["pseudo"])) {
        if (empty($_POST['pseudo'])) {
            header('location: ../index.php');
            return;
        }

        $insertUserStatement = $mysqlClient -> prepare("INSERT INTO utilisateurs (pseudo, id_personnage) VALUES (:pseudo, :personnage)");
        $insertUserStatement -> execute([
            'pseudo' => $_POST['pseudo'],
            'personnage' => $_POST['personnages'],
        ]);

        $lastId = $mysqlClient -> lastInsertId();

        $_SESSION['USER'] = [
            "id_utilisateur" => $lastId,
            "pseudo" => $_POST['pseudo'],
            "score" => 0,
            "steps" => "game",
            "enemy" => "",
        ];

        header('location: ../index.php?page=game');
    }
?>