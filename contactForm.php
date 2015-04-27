<?php

ob_start();
session_start();

require_once '/home/codejinn/public_html/php/recaptcha-master/autoload.php';
/*$directories = array(
            '/home/codejinn/public_html/php',
            '/home/codejinn/public_html/php/recaptcha-master/src/ReCaptcha',
            '/home/codejinn/public_html/php/recaptcha-master/src/ReCaptcha/RequestMethod'
);
foreach ($directories as $directory) {
    foreach(glob($directory . "*.php") as $class) {
        include_once $class;
    }
}*/
include_once('/home/codejinn/public_html/php/recaptchalib.php');

     //Recaptcha Settings
   $siteKey  = "6LeA9QUTAAAAAKXoXO_JvlLbgood_Ap7IbtJxUe9"; // you got this from the signup page
   $secret  = "6LeA9QUTAAAAAGtWqwsVpygF08HRnoUNS7cF8stM";

   

//curl method posting
//extract data from the post
  extract($_POST);
 if(isset($_POST['g-recaptcha-response'])){
	 $recaptcha = new ReCaptcha\ReCaptcha($secret);
	 $resp = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);
	 
	 if($resp->isSuccess()){
		        
    //set POST variables
    $url = 'https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';


    $fields = array(
                'oid'=>urlencode($oid),
                'retURL'=>urlencode($retURL),
                'first_name'=>urlencode($first_name),
                'email'=>urlencode($email),
                'phone'=>urlencode($phone),
                'comments'=>urlencode($comments),
				'lead_source'=>urlencode($lead_source)
                );
                // replace XXXXXX with custom field ID

   


    //url-ify the data for the POST
    $fields_string = '';
    foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
    $fields_string = substr($fields_string, 0, -1); // delete last &
    rtrim($fields_string,'&');

    //print_r($fields_string);

    //open connection
    $ch = curl_init();

    //set the url, number of POST vars, POST data
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_POST,count($fields));
    curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);

    //execute post
    $result = curl_exec($ch);

    //close connection
    curl_close($ch);
		 
	 }else {
          echo "<h4>Sorry - Invalid Captcha </h4>";
        }   
	 
	 
	 
 }
 ?>