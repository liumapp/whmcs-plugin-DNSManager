<?php
/**
 * Created by PhpStorm.
 * User: liumapp
 * Email: liumapp.com@gmail.com
 * homePage: http://www.liumapp.com
 * Date: 8/10/17
 * Time: 4:48 PM
 */
namespace WHMCS\Module\Addon\DNSManager\Common;

class dnsbrood {

    private $userNumber;

    private $domain;

    private $value;

    private $type;

    private $url = "http://bee.huluwa.cc/";

    private $add = "api/add";

    private $update = "api/update";

    private $select = "api/select";

    private $delete = "api/del";

    private $multyDel = "api/multyDel";

    private $test = "api/testPage";

    public function initData(array $data)
    {
        foreach ($data as $key => $value) {

            if (property_exists( $this , $key)) {
                $this->{$key} = $value;
            } else {

            }

        }
    }

    /**
     * @return string
     */
    public function getMultyDel()
    {
        return $this->multyDel;
    }

    /**
     * @param string $multyDel
     */
    public function setMultyDel($multyDel)
    {
        $this->multyDel = $multyDel;
    }

    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param mixed $url
     */
    public function setUrl($url)
    {
        $this->url = $url;
    }

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

    public function addRecord() {
        $this->url .= $this->add;
        return $this->sendRequest();
    }

    public function updateRecord() {
        $this->url .= $this->update;
        return $this->sendRequest();
    }

    public function selectRecord() {
        $this->url .= $this->select;
        return $this->sendRequest();
    }

    public function delRecord() {
        $this->url .= $this->delete;
        return $this->sendRequest();
    }

    public function multyDelRecord () {
        $this->url .= $this->multyDel;
        return $this->sendRequest();
    }

    public function testConnect() {
        $this->url .= $this->test;
        return $this->sendRequest(false);
    }

    /**
     * @return mixed
     */
    private function sendRequest ( $isData = true) {

        $ch = curl_init();
        curl_setopt($ch , CURLOPT_URL , $this->url);
        curl_setopt($ch , CURLOPT_SSL_VERIFYPEER ,false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch , CURLOPT_RETURNTRANSFER , 1);
        if ($isData) {
            $queryString = $this->dnsbrood_params([
                'userNumber' => $this->userNumber,
                'domain' => $this->domain,
                'value' => $this->value,
                'type' => $this->type,
            ]);
            curl_setopt($ch , CURLOPT_POST , 1);
            curl_setopt($ch , CURLOPT_POSTFIELDS , $queryString);
        }
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;

    }

    private function dnsbrood_params($postfields, $key = "") {
        $query_string = "";
        foreach ($postfields AS $k => $v) {
            if (is_array($v)) {
                $query_string.=$this->dnsbrood_params($v, $k);
            } else {
                if ($key != "") {
                    $k = $key;
                }
                $query_string .= "$k=" . urlencode($v) . "&";
            }
            //$query_string .= "$k=".$v."&";
        }
        return $query_string;
    }

}