<?php 
    if (!isset($_SESSION['USER'])) {
        header('location: index.php');
        return;
    }

    if ($_SESSION['USER']['steps'] !== "score") {
        header('location: index.php');
        return;
    }
?>