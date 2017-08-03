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

spl_autoload_register('classLoadMultyAnnouncement');

use WHMCS\Module\Addon\MultyLoadAnnouncement\Admin\AdminDispatcher;

/**
 * @return array
 */
function multyloadannouncement_config()
{
    return array(
        'name' => 'Multy Load Announcement', // Display name for your module
        'description' => 'A whmcs addon module , which significance is load multy announcements.',
        'author' => 'liumapp', // Module author name
        'language' => 'english', // Default language
        'version' => '1.0', // Version number
        'fields' => array(
            'isPublished' => array(
                'FriendlyName' => '是否立即发布',
                'Type' => 'yesno',
            ),
        )
    );
}

/**
 * @return array
 */
function multyloadannouncement_activate()
{
    return array(
        'status' => 'success', // Supported values here include: success, error or info
        'description' => 'Load Success !',
    );
}

/**
 * @return array
 */
function multyloadannouncement_deactivate()
{
    // Undo any database and schema modifications made by your module here
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
function multyloadannouncement_sidebar($vars)
{
    // Get common module parameters
    $sidebar = '<p>You are now under the Multy Load Announcement Module!</p>';
    return $sidebar;
}

/**
 * @param $vars
 */
function multyloadannouncement_output($vars)
{

    $action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';

    $dispatcher = new AdminDispatcher();
    $response = $dispatcher->dispatch($action, $vars);
    echo $response;
}
