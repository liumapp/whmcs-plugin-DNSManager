<?php

/**
 * Created by PhpStorm.
 * User: liumapp
 * Email: liumapp.com@gmail.com
 * homePage: http://www.liumapp.com
 * Date: 8/14/17
 * Time: 9:56 AM
 */
class dnsManagerHelper
{

    public function renderDomainMenu () {
        /**
         * Set a context for sidebars
         *
         * @link http://docs.whmcs.com/Editing_Client_Area_Menus#Context
         */
        Menu::addContext();

        /**
         * Setup the primary and secondary sidebars
         *
         * @link http://docs.whmcs.com/Editing_Client_Area_Menus#Context
         */

        Menu::primarySidebar('domainView');
        Menu::secondarySidebar('domainView');
    }

}