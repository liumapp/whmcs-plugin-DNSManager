<?php
/**
 * Created by PhpStorm.
 * User: liumapp
 * Email: liumapp.com@gmail.com
 * homePage: http://www.liumapp.com
 * Date: 8/10/17
 * Time: 4:48 PM
 */
namespace WHMCS\Module\Addon\DNSManager\Client;

class dnsbrood {

    private $userNumber;

    private $domain;

    private $value;

    private $type;

    /**
     * @return mixed
     */
    public function getUserNumber()
    {
        return $this->userNumber;
    }

    /**
     * @return mixed
     */
    public function getDomain()
    {
        return $this->domain;
    }

    /**
     * @return mixed
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param mixed $userNumber
     */
    public function setUserNumber($userNumber)
    {
        $this->userNumber = $userNumber;
    }

    /**
     * @param mixed $domain
     */
    public function setDomain($domain)
    {
        $this->domain = $domain;
    }

    /**
     * @param mixed $value
     */
    public function setValue($value)
    {
        $this->value = $value;
    }

    /**
     * @param mixed $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    

}