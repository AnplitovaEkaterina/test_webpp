var current_page,
    count,
    all_page,
    limit,
    count_search;

function search() {
    document.getElementById("no-post").style.display = "none";
    document.getElementById("more").style.display = "none";
    var str = document.getElementById("search").value;
    if (str.length == 0) { 
        document.getElementById("articles").innerHTML = "";
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
              if (xmlhttp.status == 200) {
                document.getElementById("articles").innerHTML = xmlhttp.responseText;
              }
            }
        }
        document.getElementById("more").style.display = "none";
        xmlhttp.open("GET", "php/search.php?str=" + str + "&limit=" + limit + "&count_search=" + count_search, true);
        xmlhttp.send();
      }
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
  limit = 2;
  current_page = 1;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          document.getElementById("articles").innerHTML = xmlhttp.responseText;
          document.getElementById("more").style.display = "block";
          if ((current_page*limit) >= count) {
            document.getElementById("more").style.display = "none";
            document.getElementById("no-post").style.display = "block";
          }
        }
      }
  }
  xmlhttp.open("GET", "php/post-list.php?limit=" + limit, true);
  xmlhttp.send();
}

function more() {
  current_page++;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          document.getElementById("articles").innerHTML = document.getElementById("articles").innerHTML + xmlhttp.responseText;
          if (current_page < all_page)
            document.getElementById("more").style.display = "block";
          else 
            document.getElementById("no-post").style.display = "block";
        }
      }
  }
  document.getElementById("more").style.display = "none";
  xmlhttp.open("GET", "php/more.php?page=" + current_page + "&limit=" + limit, true);
  xmlhttp.send();
}