<?php
/**
 * 添加根域解析
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

$domain = Capsule::table('tbldomains')
    ->where('id', '=', $domainId)->pluck('domain');

$data = [
    'uid' => $uid,
    'domainId' => $domainId,
    'type' => addslashes($_POST['type']),
    'subdomain' => addslashes($_POST['subdomain']),
    'value' => addslashes($_POST['value']),
];

$lmdns = new \WHMCS\Module\Addon\DNSManager\Common\lmdns();

$lmdns->initData($data);

$lmdns->addRecord();

$id = $lmdns->getNewRecordId();

$lmdns->ReloadIpIndex($uid , $domainId , $lmdns->type);


$data2 = [
    'userNumber' => 'whmcsUser' . $uid,
    'domain' => $domain,
    'value' => $data['value'],
    'type' => $lmdns->type,
];

$dnsbrood = new \WHMCS\Module\Addon\DNSManager\Common\dnsbrood();

$dnsbrood->initData($data2);

$result = $dnsbrood->addRecord();

echo $id;



