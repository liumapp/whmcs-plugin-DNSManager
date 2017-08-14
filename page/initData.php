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

$datas = Capsule::table('lmdns')
    ->select('id' , 'type' , 'subdomain' , 'value')
    ->where('uid' , '=' , $uid)
    ->where('domainId' , '=' , $domainId)
    ->get();

$result = array_map(function ($data) {
    $tmp = [];
    foreach ($data as $k => $v) {
        $tmp[$k] = $v;
    }
    return $tmp;
} , $datas);

echo json_encode($result);

