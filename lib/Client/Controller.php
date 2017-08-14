<?php

namespace WHMCS\Module\Addon\DNSManager\Client;

use function Sodium\add;
use WHMCS\ClientArea;
use WHMCS\Database\Capsule;

$documentRoot = $_SERVER['DOCUMENT_ROOT'];

require_once $documentRoot . '/dnsManagerHelper.php';

require_once $documentRoot . '/init.php';

/**
 * Created by PhpStorm.
 * User: liumapp
 * Email: liumapp.com@gmail.com
 * homePage: http://www.liumapp.com
 * Date: 8/3/17
 * Time: 5:06 PM
 */
class Controller {

    /**
     * Index action.
     *
     * @param array $vars Module configuration parameters
     *
     * @return array
     */
    public function index($vars)
    {
        $ca = new ClientArea();
        $ca->requireLogin();

        $helper = new \dnsManagerHelper();
        $helper->renderDomainMenu();

        // Get common module parameters
        $modulelink = $vars['modulelink']; // eg. addonmodules.php?module=addonmodule
        $version = $vars['version']; // eg. 1.0
        $LANG = $vars['_lang']; // an array of the currently loaded language variables

        // Get module configuration parameters
        $ip = $vars['serverIp'];
        $domainId = addslashes($_GET['id']);

        return array(
            'pagetitle' => '域名解析',
            'breadcrumb' => array(
                'index.php?m=addonmodule' => 'dnsManager',
            ),
            'templatefile' => 'publicpage',
            'requirelogin' => true, // Set true to restrict access to authenticated client users
            'forcessl' => false, // Deprecated as of Version 7.0. Requests will always use SSL if available.
            'vars' => array(
                'modulelink' => $modulelink,
                'configTextField' => $ip,
                'customVariable' => 'your own content goes here',
                'domainId' => $domainId,
                'addDnsRecordUrl' => 'http://dm.huluwa.cc/index.php?m=dnsmanager&action=addDnsRecord',
                'initDataUrl' => 'http://dm.huluwa.cc/index.php?m=dnsmanager&action=initData',
                'updateDnsRecordUrl' => 'http://dm.huluwa.cc/index.php?m=dnsmanager&action=updateDnsRecord',
                'deleteDnsRecordUrl' => 'http://dm.huluwa.cc/index.php?m=dnsmanager&action=deleteDnsRecord',
                'addDnsBaseUrl' => 'http://dm.huluwa.cc/index.php?m=dnsmanager&action=addDnsBase',
                'updateDnsBaseRecordUrl' => 'http://dm.huluwa.cc/index.php?m=dnsmanager&action=updateDnsBaseRecord',

            ),
        );

    }

    /**
     * api operation
     * @param $vars
     */
    public function addDnsRecord ($vars)
    {

    }

    public function initData ($vars)
    {

        $ca = new ClientArea();

        $uid = $ca->getUserID();

        $domainId = addslashes($_POST['domainId']);

        $data = Capsule::table('lmdns')
            ->select('id' , 'type' , 'subdomain' , 'value')
            ->where('uid' , '=' , $uid)
            ->where('domainId' , '=' , $domainId)
            ->get();

        return $data;

    }

    public function updateDnsRecord ($vars)
    {

    }

    public function deleteDnsRecord ($vars)
    {

    }

    public function addDnsBase ($vars)
    {

    }

    public function updateDnsBaseRecord ($vars)
    {

    }

}
