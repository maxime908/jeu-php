<?php
    session_start();

    if (isset($_SESSION['USER'])) {
        $_SESSION['USER']['steps'] = 'score';
    }
?>