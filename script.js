"use strict";

var current_page,
    count,
    all_page,
    limit,
    count_search,

    more_btn = document.getElementById("more"),
    no_post = document.getElementById("no-post"),
    search_str = document.getElementById("search"),
    articles = document.getElementById("articles");

function search() {
  no_post.style.display = "none";
  more_btn.style.display = "none";
  var str = search_str.value;
  var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          articles.innerHTML = xmlhttp.responseText;
        }
      }
  }
  xmlhttp.open("GET", "php/search.php?str=" + str + "&limit=" + limit + "&count_search=" + count_search, true);
  xmlhttp.send();
}

function count_post() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          count = xmlhttp.responseText;
          count_page();
        }
      }
  }
  xmlhttp.open("GET", "php/count-post.php", true);
  xmlhttp.send();
}

function count_page() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          all_page = xmlhttp.responseText;
        }
      }
  }
  xmlhttp.open("GET", "php/count-page.php?count=" + count + "&limit=" + limit, true);
  xmlhttp.send();
}

function post_list() {
  count_post();
  limit = 3;
  current_page = 1;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          articles.innerHTML = xmlhttp.responseText;
          more_btn.style.display = "block";
          if ((current_page*limit) >= count) {
            more_btn.style.display = "none";
            no_post.style.display = "block";
          }
        }
      }
  }
  xmlhttp.open("GET", "php/post-list.php?limit=" + limit, true);
  xmlhttp.send();
}

function more() {
  current_page++;
  more_btn.style.display = "none";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          articles.innerHTML = articles.innerHTML + xmlhttp.responseText;
          if (current_page < all_page)
            document.getElementById("more").style.display = "block";
          else 
            no_post.style.display = "block";
        }
      }
  }
  xmlhttp.open("GET", "php/more.php?page=" + current_page + "&limit=" + limit, true);
  xmlhttp.send();
}

