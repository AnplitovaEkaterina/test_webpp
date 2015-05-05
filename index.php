<!-- 
  connect-db.php - подключение к БД
  search.php - поиск записей в БД
  post-list.php - первоначальный вывод записей из БД
  more.php  - подгрузка записей из БД
  count-post.php - подсчет количества записей в БД
  count-page.php - подсчет количества страниц для подгрузки записей из БД
-->

<!DOCTYPE html>
<html lang="rus">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Новости</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <!-- My Style CSS -->
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>

    <?php include 'php/connect-db.php';?>
    
    <div class="container">
      <header>  
        <div class="row">
        <h1>Достопримечательности Санкт-Петербурга</h1>
          <div class="col-md-12">
            <div class="input-group">
              <span class="input-group-btn">
                 <input type="button" class="btn btn-default" onclick="search()" value="Поиск">
              </span>
              <input type="text" id="search" class="form-control" placeholder="Поиск ... ">
            </div>
          </div>
        </div>
      </header>
      <div class="row" id="articles"></div>
      <input type="button" class="btn" id="more" value="Дальше" onclick="more()">
      <div class="alert alert-danger" role="alert" id="no-post">
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span class="sr-only">Error:</span>
        Больше нет записей!
      </div>
        
    </div>
    <footer></footer>
    <script src="static/js/script.js"></script>
    <script>
        window.onload = function() {
          post_list();
        };
    </script>
</body>
</html>