<?php
/**
 * Created by PhpStorm.
 * User: liumapp
 * Email: liumapp.com@gmail.com
 * homePage: http://www.liumapp.com
 * Date: 8/14/17
 * Time: 5:21 PM
 */

use WHMCS\ClientArea;
use WHMCS\Database\Capsule;


$documentRoot = $_SERVER['DOCUMENT_ROOT'];

require_once $documentRoot . '/init.php';

$ca = new ClientArea();

$uid = $ca->getUserID();

$domainId = addslashes($_POST['domainId']);

$data = Capsule::table('lmdns')
    ->select('id' , 'type' , 'subdomain' , 'value')
    ->where('uid' , '=' , $uid)
    ->where('domainId' , '=' , $domainId)
    ->get();

var_dump($data);die;