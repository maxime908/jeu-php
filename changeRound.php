<?php 
    session_start();

    require_once(__DIR__ . "/config/config.php");

    if (isset($_SESSION['USER'])) {
        $_SESSION['USER']['enemy'] = "";

        $updateScorStatement = $mysqlClient -> prepare("UPDATE utilisateurs SET point = point + 1 WHERE id_utilisateur = :id_utilisateur");
        $updateScorStatement -> execute([
            'id_utilisateur' => $_SESSION['USER']['id_utilisateur'],
        ]);
    }
?>