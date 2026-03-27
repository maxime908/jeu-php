<?php 
    $personnageStatement = $mysqlClient -> prepare("SELECT * FROM personnages");
    $personnageStatement -> execute();
    $personnages = $personnageStatement -> fetchAll(PDO::FETCH_ASSOC);
?>