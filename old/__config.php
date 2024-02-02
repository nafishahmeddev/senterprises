
<?php

session_start();
include "lib/xpeed v0.1.php";
#Set timezone
define('TIMEZONE', 'Asia/Kolkata');
date_default_timezone_set(TIMEZONE);
class Site{
    public $__OS;
    # DIRECTORIES
    private $__BASE_DIR;
    public  $__FRONTEND_DIR;
    public  $__BACKEND_DIR;
    public  $__LIB_DIR;
    public  $__CSS_DIR;
    public  $__JS_DIR;
    public  $__IMAGES_DIR;
    public  $__ASSETS_DIR;
    # Mysql Configuration
    private $__HOST;
    private $__USER;
    private $__PASS;
    private $__DB;
    # Global Locations
    public $__SEO_URL;
    public $__QUERY_STRING;
    private  $__SERVER;
    private  $__LOCAL_SERVER;

    public function __construct()
    {
        $this->__SERVER = "https://".$_SERVER['SERVER_NAME']."/";
        $this->__LOCAL_SERVER = array('127.0.0.1','::1','192.168.1.102');

        if(in_array($_SERVER['SERVER_ADDR'], $this->__LOCAL_SERVER)){
            # Mysql configuration for local environment
            $this->__BASE_DIR	= $this->__SERVER.'senterprises/';
            $this->__HOST	='localhost';
            $this->__USER	='root';
            $this->__PASS	='12345678';
            $this->__DB		='senterprises';
        } else {
            # Mysql configuration for remote environment
            $this->__BASE_DIR	= $this->__SERVER.'old/';
            $this->__HOST	='localhost';
            $this->__USER	='u990995717_senterprises';
            $this->__PASS	='@#Samima123@#';
            $this->__DB 	='u990995717_senterprises';
        }
        # Directories
        $this->__LIB_DIR	    = $this->__BASE_DIR."lib/";
        $this->__FRONTEND_DIR	= $this->__BASE_DIR;
        $this->__BACKEND_DIR	= $this->__BASE_DIR."admin/";
        $this->__CSS_DIR 		= $this->__BASE_DIR."css/";
        $this->__JS_DIR		    = $this->__BASE_DIR."js/";
        $this->__IMAGES_DIR 	= $this->__BASE_DIR."images/";
        $this->__ASSETS_DIR     = $this->__BASE_DIR."assets/";
        #Library Configuration/Initialization
        $this->__OS = new os();
        $this->__OS->mysql_init($this->__HOST, $this->__USER, $this->__PASS, $this->__DB);
        # SEO Configuration
        $this->__SEO_URL = $this->__OS->get_seo_url($this->__BASE_DIR);
        # QUERY STRING
        $this->__QUERY_STRING = $this->__OS->get_query_string($this->__BASE_DIR);
    }
}
error_reporting(E_ALL);
?>
