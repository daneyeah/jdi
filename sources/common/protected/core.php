<?
    header("Content-Type: text/html; charset=UTF-8");
    require_once('routes/Route.php');
    $config = json_decode(file_get_contents('protected/config.json'), TRUE);
    $route = new Route($_SERVER['REQUEST_URI']);
    //echo 'hello';