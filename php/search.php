<?php 

    include 'connect-db.php';
    
    $str = $_GET["str"];
    $limit = $_GET["limit"];

    if (strlen($str) == 0) {
        echo ' <div class="col-sm-12 col-md-12 col-lg-12">
        <div class="alert alert-danger" role="alert" id="null-str">
          <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span class="sr-only">Error:</span>
          Пустой поисковой запрос!
        </div></div>';
        echo '<input type="button" class="btn" id="old" value="Первоначальный список новостей" onclick="post_list()">';
    }

    else 
    {
        $res = mysqli_query($db, "SELECT * FROM `articles` WHERE title LIKE '%".$str."%'");
        $count_search = mysqli_num_rows($res);

        if ($count_search == 0) {
        echo ' <div class="col-sm-12 col-md-12 col-lg-12">
        <div class="alert alert-danger" role="alert" id="no-search">
          <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span class="sr-only">Error:</span>
          Нет записей удовлетворяющих поисковому запросу!
        </div></div>';
        echo '<input type="button" class="btn" id="old" value="Первоначальный список новостей" onclick="post_list()">';
        }

        else {

            $articles = array();
            while($row = mysqli_fetch_assoc($res))
            {
                $articles[] = $row;
            }

            foreach ($articles as $article):
                echo    '<article class="post-item"  >
                            <div class="col-sm-12 col-md-12 col-lg-4 post-image">
                                <img src="http://placehold.it/360x150" alt="Изображение">
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
            echo '<input type="button" class="btn" id="old" value="Первоначальный список новостей" onclick="post_list()">';
        }
    }
?>