<?
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$_SITE = new Site();
$_OS = $_SITE->__OS;
$_OS->m_q('SET sql_mode = ""');
?>