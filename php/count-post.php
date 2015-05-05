<?php 

    include 'connect-db.php';

    $res = mysqli_query($db, "SELECT * FROM `articles` ORDER BY `id`");
    $count_post = mysqli_num_rows($res);

    echo $count_post;
?>