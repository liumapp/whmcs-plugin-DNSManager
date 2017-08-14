<?php
/**
 * Created by PhpStorm.
 * User: liumapp
 * Email: liumapp.com@gmail.com
 * homePage: http://www.liumapp.com
 * Date: 8/11/17
 * Time: 5:05 PM
 */

use WHMCS\View\Menu\Item as MenuItem;


add_hook('ClientAreaPrimarySidebar', 1, function (MenuItem $primarySidebar)
{
    if (!is_null($primarySidebar->getChild('Domain Details Management'))) {
        $domainId = addslashes($_GET['id']);
        $domainId = ($domainId == '' ) ? addslashes($_GET['domainid']) : $domainId;
        $primarySidebar->getChild('Domain Details Management')
            ->addChild('DNS')
            ->setLabel('域名解析')
            ->setUri('index.php?m=dnsmanager&id=' . $domainId)
            ->setOrder(100);
    }

    if (!is_null($primarySidebar->getChild('Domain Details Management'))) {
        $child = $primarySidebar->getChild('Domain Details Management')->getChild('Overview');
        if (is_null($child)) {
            $domainId = addslashes($_GET['id']);
            $domainId = ($domainId == '' ) ? addslashes($_GET['domainid']) : $domainId;
            $primarySidebar->removeChild('DNS');
            $primarySidebar->getChild('Domain Details Management')
                ->addChild('Overview')
                ->setLabel('总览')
                ->setUri('clientarea.php?action=domaindetails&id='.$domainId.'#tabOverview')
                ->setOrder(100);
            $primarySidebar->getChild('Domain Details Management')
                ->addChild('Auto Renew Settings')
                ->setLabel('自助续费')
                ->setUri('clientarea.php?action=domaindetails&id='.$domainId.'#tabAutorenew')
                ->setOrder(110);
            $primarySidebar->getChild('Domain Details Management')
                ->addChild('Modify Nameservers')
                ->setLabel('NS服务器')
                ->setUri('clientarea.php?action=domaindetails&id='.$domainId.'#tabNameservers')
                ->setOrder(120);
            $primarySidebar->getChild('Domain Details Management')
                ->addChild('Registrar Lock Status')
                ->setLabel('域名锁定')
                ->setUri('clientarea.php?action=domaindetails&id='.$domainId.'#tabReglock')
                ->setOrder(130);
            $primarySidebar->getChild('Domain Details Management')
                ->addChild('Domain Contacts')
                ->setLabel('联系人信息')
                ->setUri('clientarea.php?action=domaincontacts&domainid=' . $domainId)
                ->setOrder(140);
            $primarySidebar->getChild('Domain Details Management')
                ->addChild('DNS')
                ->setLabel('域名解析')
                ->setUri('index.php?m=dnsmanager&id=' . $domainId)
                ->setOrder(150);
        }
    }
});



