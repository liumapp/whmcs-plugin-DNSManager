<?php
/**
 * 删除一条解析纪录
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
$domain = $domain[0];

$data = [
    'id' => addslashes($_POST['id']),
    'uid' => $uid,
    'domainId' => $domainId,
];

$lmdns = \WHMCS\Module\Addon\DNSManager\Common\lmdns::findOne($data);

if($lmdns->delRecord()) {

    $lmdns->ReloadIpIndex($uid , $domainId , $lmdns->type);

    $data2 = [
        'userNumber' => 'whmcsUser' . $uid,
        'domain' => $lmdns->subdomain . '.' . $domain,
        'value' => $lmdns->value,
        'type' => $lmdns->type,
    ];

    $dnsbrood = new \WHMCS\Module\Addon\DNSManager\Common\dnsbrood();
    $dnsbrood->initData($data2);
    $dnsbrood->delRecord();

    echo 'success';

}
