<?php
    // Хост (обычно localhost)
    $db_host = "mysql.hostinger.ru";
    // Имя базы данных
    $db_name = "u827441520_test";
    // Логин для подключения к базе данных
    $db_user = "u827441520_admin";
    // Пароль для подключения к базе данных
    $db_pass = "fAtOvl43Rkr0";

    //Подключаемся к базе
    $db = mysqli_connect ($db_host, $db_user, $db_pass, $db_name) or die ("Невозможно подключиться к БД");
    // Указываем кодировку, в которой будет получена информация из базы
    mysqli_query ($db, 'set character_set_client = "utf-8"');
    mysqli_query ($db, 'set character_set_connection = "utf-8"');
    mysqli_query ($db, 'set character_set_results = "utf-8"');

?>