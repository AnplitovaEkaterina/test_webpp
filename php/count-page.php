<?php 

    $count=$_GET["count"];
    $limit = $_GET["limit"];


    $page = $count/$limit;

    $all_page = ceil($page);

    echo $all_page;
?>