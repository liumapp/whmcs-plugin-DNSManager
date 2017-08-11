<?php

namespace WHMCS\Module\Addon\DNSManager\Admin;
use WHMCS\Module\Addon\DNSManager\Common\dnsbrood;

/**
 * Created by PhpStorm.
 * User: liumapp
 * Email: liumapp.com@gmail.com
 * homePage: http://www.liumapp.com
 * Date: 8/3/17
 * Time: 5:04 PM
 */
class Controller {

    /**
     * Index action.
     *
     * @param array $vars Module configuration parameters
     *
     * @return string
     */
    public function index($vars)
    {
        // Get common module parameters
        $modulelink = $vars['modulelink']; // eg. addonmodules.php?module=addonmodule
        $version = $vars['version']; // eg. 1.0
        $LANG = $vars['_lang']; // an array of the currently loaded language variables

        // Get module configuration parameters
        $ip = $vars['serverIp'];

        return <<<EOF

<h2>Index</h2>

<p>This is the <em>index</em> action output of the Dns Manager.</p>

<p>The currently installed version is: <strong>{$version}</strong></p>

<p>Values of the configuration field are as follows:</p>

<blockquote>
    DNS server IP: {$ip}<br>
</blockquote>

<p>
    <a href="{$modulelink}&action=check" class="btn btn-success">
        <i class="fa fa-check"></i>
        检查连接
    </a>
</p>

EOF;

    }

    /**
     * Show action.
     * 检查是否能够成功连接到解析服务器
     * @param array $vars Module configuration parameters
     *
     * @return string
     */
    public function check($vars)
    {
        // Get common module parameters
        $modulelink = $vars['modulelink']; // eg. addonmodules.php?module=addonmodule
        $version = $vars['version']; // eg. 1.0
        $LANG = $vars['_lang']; // an array of the currently loaded language variables

        // Get module configuration parameters
        $dnsbrood = new dnsbrood();
        $result = $dnsbrood->testConnect();
        return <<<EOF

<h2>检查链接</h2>

<p>我们将向 <em>解析服务器的Web接口</em> 发送一个post请求，如果有消息返回，那么说明连接是成功可行的。 </p>

<p>解析服务器返回的消息为: <strong>{$result}</strong></p>

<p>
    <a href="{$modulelink}" class="btn btn-info">
        <i class="fa fa-arrow-left"></i>
        返回
    </a>
</p>

EOF;

    }

}

