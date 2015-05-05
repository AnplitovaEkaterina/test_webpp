<?php 

    include 'connect-db.php';

    $limit = $_GET["limit"];

    $res = mysqli_query($db, "SELECT * FROM `articles` ORDER BY `id` DESC LIMIT $limit");

    $articles = array();
    while($row = mysqli_fetch_assoc($res))
    {
        $articles[] = $row;
    }

    foreach ($articles as $article):
    echo    '<article class="post-item"  >
                <div class="col-sm-12 col-md-12 col-lg-4 post-image">
                    <img src="http://placehold.it/360x150" alt="Изображение Новости 1">
                </div>
                <div class="col-sm-12 col-md-12 col-lg-8 post-content">
                    <h2 class="post-title">' . $article['title'] . '</h2>
                    <p class="post-text">' . $article['text'] . '</p>
                    <a class="read-more" href="#" title="">Читать далее</a>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-12 post-info">
                    <div class="post-date">' . $article['date'] . '</div>
                    <div class="post-date">Автор:' . $article['autor'] . '</div>
                </div>
            </article>';
    endforeach;
?>