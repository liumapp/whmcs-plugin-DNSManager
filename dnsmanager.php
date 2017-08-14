<?php
/**
 * Created by PhpStorm.
 * User: liumapp
 * Email: liumapp.com@gmail.com
 * homePage: http://www.liumapp.com
 * Date: 8/3/17
 * Time: 2:35 PM
 */


if (!defined("WHMCS")) {
    die("This file cannot be accessed directly");
}

function classLoadDNSManager ($class)
{
    $path = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    $path = str_replace('WHMCS' . DIRECTORY_SEPARATOR . 'Module' . DIRECTORY_SEPARATOR . 'Addon' . DIRECTORY_SEPARATOR . 'DNSManager' , 'lib' , $path);
    $file = __DIR__ . DIRECTORY_SEPARATOR . $path . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
}

spl_autoload_register('classLoadDNSManager');
use WHMCS\Module\Addon\DNSManager\Admin\AdminDispatcher;
use WHMCS\Module\Addon\DNSManager\Client\ClientDispatcher;

/**
 * @return array
 */
function dnsmanager_config()
{
    return array(
        'name' => 'DNS Manager', // Display name for your module
        'description' => 'a whmcs addon module , which is based on DNSBrood Server.',
        'author' => 'liumapp', // Module author name
        'language' => 'english', // Default language
        'version' => '1.0', // Version number
        //在参数中设置DNS Server的IP地址
        'fields' => array(
            'serverIp' => array(
                'FriendlyName' => 'DNS服务器IP地址',
                'Type' => 'text',
                'Size' => '25',
                'Default' => '8.8.8.8',
                'Description' => '请输入部署DNSBrood的服务器ip地址',
            ),
        )
    );
}

/**
 * @return array
 */
function dnsmanager_activate()
{

    $query = "
        CREATE TABLE `lmdns` (
          `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
          `uid` int(11) DEFAULT NULL,
          `domainId` int(11) DEFAULT NULL,
          `type` varchar(50) DEFAULT NULL,
          `subdomain` varchar(255) DEFAULT NULL,
          `ipIndex` tinyint(4) DEFAULT NULL COMMENT 'ip1,ip2…ip10',
          `value` varchar(255) DEFAULT NULL,
          `status` varchar(45) DEFAULT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8
    ";
    full_query($query);

    return array(
        'status' => 'success', // Supported values here include: success, error or info
        'description' => 'Load Success !',
    );

}

/**
 * @return array
 */
function dnsmanager_deactivate()
{
    // Undo any database and schema modifications made by your module here
    $query = "DROP TABLE `lmdns`";
    full_query($query);

    return array(
        'status' => 'success', // Supported values here include: success, error or info
        'description' => 'Delete Success !',
    );
}

/**
 *
 * @param $vars
 * @return string
 */
function dnsmanager_sidebar($vars)
{
    // Get common module parameters
    $sidebar = '<p>You are now under the DNS Manager Module!</p>';
    return $sidebar;
}

/**
 * @param $vars
 */
function dnsmanager_output($vars)
{

    $action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
    $dispatcher = new AdminDispatcher();
    $response = $dispatcher->dispatch($action, $vars);
    echo $response;

}

/**
 * Client Area Output.
 *
 * Called when the addon module is accessed via the client area.
 * Should return an array of output parameters.
 *
 * This function is optional.
 *
 *
 * @return array
 */
function dnsmanager_clientarea($vars)
{

    // Dispatch and handle request here. What follows is a demonstration of one
    // possible way of handling this using a very basic dispatcher implementation.
    $action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
    $dispatcher = new ClientDispatcher();
    return $dispatcher->dispatch($action, $vars);

}


