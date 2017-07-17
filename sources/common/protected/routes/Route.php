<?php


class Route {
    private $routes = [], $controllers = [], $host, $default_route = [], $run_controller, $uri;
    public function __construct($uri) {
        //$this->default_route = $this->setDefault();
        $this->routes = $this->setRoutes();
        $this->controllers = $this->setControllers();
        $this->setUri();
        //print_r($_SERVER);

    }
    private function setRoutes() {
        $path = 'protected/app/views/contents';
        $scan = scandir($path);
        $i = 0;
        $routes = [];
        foreach ($scan as $value)
            if(!in_array($value,array(".","..")) && !is_dir($path.DIRECTORY_SEPARATOR.$value)) {
                $routes[$i] = ucfirst(substr($value,0,strpos($value,'.php')));
                $i++;
            }
        return $routes;
    }
    private function setControllers(){
        $controllers = [];
        $i = 0;
        foreach ($this->routes as $value) {
            $controllers[$i] = 'JDI' . $value . 'Controller';
            $i++;
        }
        return $controllers;
    }
    private function setUri(){
        //echo($_SERVER['HTTP_HOST'].' '.$_SERVER['REQUEST_METHOD'].' '.$_SERVER['REDIRECT_URL'].' '.$_SERVER['QUERY_STRING'].' '.$_SERVER['REQUEST_URI'].' '.$_SERVER['REDIRECT_QUERY_STRING']);
    }
};
