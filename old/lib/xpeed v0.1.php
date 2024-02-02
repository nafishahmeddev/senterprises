<?
///About Framework
class os{
    public $about = array("Version"=>"1.0", "Author"=>"Nafish Ahmed", "Created"=>"2018", "Updated"=>"01 Nov 2018");
    private $host;
    private $user;
    private $pass;
    private $db;
    private $conn;

    public $query_count=0;
    function __construct(){

    }
    ////////////////////////////////////////////////////////
    /////////////////////////MYSQL AREA/////////////////////
    ////////////////////////////////////////////////////////
    //mysql connect
    public function __call($method, $arguments) {
        return call_user_func_array(Closure::bind($this->$method, $this, get_called_class()), $arguments);
    }
    public function mysql_init($host, $user, $pass, $db){
        $this->host = $host;
        $this->user = $user;
        $this->pass = $pass;
        $this->db = $db;
        // Create connection
        $dsn = "mysql:dbname=".$this->db.";host=".$this->host."";
        //Check connection
        try{
            $dbh = new PDO($dsn, $this->user, $this->pass);
        } catch (PDOException $e) {
            $dbh = false;
            $this->_debug($e->getMessage(), "ERROR");
            exit;
        }
        $this->conn = $dbh;
        return $dbh;
    }
    ////mysql_query..
    public function m_q($query, $getLastId=false){
        $res = $this->conn->prepare($query);
        $res->execute();
        if($res->errorInfo()[1]!=""){
            $this->_debug($res->errorInfo(), "ERROR");
            $res =  false;
        } else if($getLastId){
            $res = $this->conn->lastInsertId();
        }
        return $res;
    }
    ///mysql num rows
    public function m_num_rows($query){
        return $query->rowCount();
    }
    ///mysql execute
    public function m_execute($query){
        $query->execute();
    }
    ///mysql fetch array
    public function m_f_a($query){
        if($query){
            return $query->fetch(PDO::FETCH_ASSOC);
        }
    }
    //////////////////////////////////////////////////////////
    //////////////////////OTHER FUNCTION//////////////////////
    //////////////////////////////////////////////////////////

    //session
    public function _session($var, $data="NONE"){
        if($data != "NONE"){
            $_SESSION[$var] = $data;
        } else {
            if(isset($_SESSION[$var])){
                $data = $_SESSION[$var];
            } else {
                $data = "";
            }

            return $data;
        }

    }
    ///explode
    public function _explode($data,$strops=","){
        return explode($strops, $data);
    }
    ///get
    public function _get($var=""){
        if(isset($_GET[$var])){
            return $_GET[$var];
        } else {
            return false;
        }
    }
    ///post
    public function _post($var=""){
        if(isset($_POST[$var])){
            return $_POST[$var];
        } else {
            return false;
        }
    }

    public function str_short($string,$length=100,$append="&hellip;") {
        $total_length = strlen($string);
        if($total_length > $length) {
            $string = substr($string, 0, $length).$append;
        }


        return $string;
    }
    public function int_format($n, $precision = 3) {
        if ($n < 1000000) {
            // Anything less than a million
            $n_format = number_format($n);
        } else if ($n < 1000000000) {
            // Anything less than a billion
            $n_format = number_format($n / 1000000, $precision) . 'M';
        } else {
            // At least a billion
            $n_format = number_format($n / 1000000000, $precision) . 'B';
        }

        return $n_format;
    }
    //_debug
    public function _debug($data, $type="WARN", $details = false){
        $color = "#FDEDAA";
        switch ($type){
            case "WARN" :
                $color = "#FDEDAA";
                break;
            case "ERROR":
                $color = "#FF9494";
                break;
            case "SUCCESS":
                $color = "#98FB98";
                break;
        }
        print("<pre style='font-size:12px; background:".$color."; padding:10px; margin:5px; border:1px solid rgba(0,0,0,0.1)'>");

        if($details){
            var_dump($data);
        } else {
            print_r($data);
        }


        print("</pre>");
    }
    //file uploader
    public function uploader($file, $destination){
        $structure = $destination;
        $target_file = $structure.basename("pic".rand(0,99999)."".$file["name"]);

        $response = array();
        try{
            move_uploaded_file($file["tmp_name"], $target_file);

            $message = str_replace($structure,"",$target_file);
            $response["error"] = false;
            $response["message"] = $message;
        } catch (Exception $ex){
            $message = $ex->getMessage();
            $response["error"] = true;
            $response["message"] = $message;
        }
        return $response;
    }
    ///get data
    public function get_data($url) {
        $ch = curl_init();
        $timeout = 5;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }
    //getPageContent
    public function getPageContent($string, $prefix='[{', $suffix='}]') {
        $prefix = preg_quote($prefix);
        $suffix = preg_quote($suffix);
        if(preg_match_all("!$prefix(.*?)$suffix!",$string,$matches)) {
            $links =  $matches[1];
            foreach($links as $url){
                $full_url = $url;
                if(is_file( $full_url)){
                    ob_start();
                    require($full_url);
                    $page = ob_get_clean();
                    $string = str_replace("[{".$url."}]", $page ,$string);
                }
                return $string;

            }
        } else {
            return $string;
        }
    }
    //in_array_all
    public function in_array_all($needles, $haystack) {
        return !array_diff($needles, $haystack);
    }
    ///random token
    public function crypto_rand_secure($min, $max){
        $range = $max - $min;
        if ($range < 1) return $min; // not so random...
        $log = ceil(log($range, 2));
        $bytes = (int) ($log / 8) + 1; // length in bytes
        $bits = (int) $log + 1; // length in bits
        $filter = (int) (1 << $bits) - 1; // set all lower bits to 1
        do {
            $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
            $rnd = $rnd & $filter; // discard irrelevant bits
        } while ($rnd > $range);
        return $min + $rnd;
    }
    public function random_token($length){
        $token = "";
        $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $codeAlphabet.= "abcdefghijklmnopqrstuvwxyz";
        $codeAlphabet.= "0123456789";
        $max = strlen($codeAlphabet); // edited

        for ($i=0; $i < $length; $i++) {
            $token .= $codeAlphabet[$this->crypto_rand_secure(0, $max-1)];
        }

        return $token;
    }
    //array to xml
    public function arrayToXml($array, $rootElement = null, $xml = null) {
        $_xml = $xml;
        // If there is no Root Element then insert root
        if ($_xml === null) {
            $_xml = new SimpleXMLElement($rootElement !== null ? $rootElement : '<root/>');
        }
        // Visit all key value pair
        foreach ($array as $k => $v) {
            // If there is nested array then
            if (is_array($v)) {
                // Call function for nested array
                $this->arrayToXml($v, $k, $_xml->addChild($k));
            }

            else {

                // Simply add child element.
                $_xml->addChild($k, $v);
            }
        }

        return $_xml->asXML();
    }
    public function isImage($url){
        $file_type = file_exists($url)?exif_imagetype($url):null;
        $image_types = array(
            IMAGETYPE_BMP,
            IMAGETYPE_COUNT,
            IMAGETYPE_GIF,
            IMAGETYPE_ICO,
            IMAGETYPE_JPC,
            IMAGETYPE_IFF,
            IMAGETYPE_JB2,
            IMAGETYPE_JP2,
            IMAGETYPE_JPEG,
            IMAGETYPE_JPEG2000,
            IMAGETYPE_JPX,
            IMAGETYPE_PNG,
            IMAGETYPE_WEBP,
            IMAGETYPE_WBMP);
        if(in_array($file_type, $image_types)){
            return true;
        } else {
            return false;
        }
    }
    ##SECURITY##
    public function encode($value){
        return base64_encode(strrev(base64_encode(strrev(base64_encode(base64_encode(str_rot13($value)))))));
    }
    public function decode($value){
        return str_rot13(base64_decode(base64_decode(strrev(base64_decode(strrev(base64_decode($value)))))));
    }
    ##SITE###
    public function logged_user($user){
        return $this->_session($user);
    }
    ///////////LOGOUT//////////////
    public function logout($user){
        $this->_session($user, "");
        echo $this->_session($user);
        return true;
    }

    public function get_full_url(){
        if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on'){
            $link = "https";
        } else {
            $link = "http";
        }
        // Here append the common URL characters.
        $link .= "://";
        // Append the host(domain name, ip) to the URL.
        $link .= $_SERVER['HTTP_HOST'];
        // Append the requested resource location to the URL
        $link .= $_SERVER['REQUEST_URI'];
        // Print the link
        return $link;
    }

    public function get_seo_url($base_url){
        $full_url = $this->get_full_url();
        $exclude_strings = array("%20",$base_url);
        foreach($exclude_strings as $exclude_string){
            $full_url = str_replace($exclude_string,"",$full_url);
        }
        return explode("?",$full_url)[0];
    }
    public function get_query_string($base_url){
        $full_url = $this->get_full_url();
        $exclude_strings = array("%20",$base_url);
        foreach($exclude_strings as $exclude_string){
            $full_url = str_replace($exclude_string,"",$full_url);
        }
        $query = array();
        if(count(explode("?",$full_url))>1){
            $query_string =  explode("?",$full_url)[1];
            $queeries  =explode("&",$query_string);

            if(count($queeries)>0){
                foreach ($queeries as $q){
                    if(count(explode("=",$q))==2){
                        list($key, $val) = explode("=",$q);
                        $query[$key] = $val;
                    } else if(count(explode("=",$q))==1) {
                        list($key) = explode("=",$q);
                        $query[$key] = true;
                    }

                }
            }

        }
        return $query;
    }

    #pagination url creater
    public function pagination_create_url($base, $query_strings, $page_no_key, $page_no_val){
        $base = rtrim($base,'/');
        $url = $base."?";

        $query_strings[$page_no_key] = $page_no_val;
        foreach($query_strings as $key=>$val){

            $url.=$key."=".$val;
            $url.="&";
        }
        $url = rtrim($url,'&');
        return $url;
    }

}
?>