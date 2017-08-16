<?php
/**
 * Created by PhpStorm.
 * User: liumapp
 * Email: liumapp.com@gmail.com
 * homePage: http://www.liumapp.com
 * Date: 5/12/17
 * Time: 3:10 PM
 */

namespace WHMCS\Module\Addon\DNSManager\Common;

use Punic\Exception;
use WHMCS\Database\Capsule;
use Whoops\Exception\ErrorException;

$documentRoot = $_SERVER['DOCUMENT_ROOT'];

require_once $documentRoot . '/init.php';

/**
 * Class lmdns
 * @package WHMCS\Module\Addon\DNSManager\Common
 */
class lmdns
{

    public $id;

    public $uid;

    public $domainId;

    public $type;

    public $subdomain;

    public $value;

    public $ipIndex;

    public $tableName = 'lmdns';

    public $status;

    public function initData(array $data)
    {

        foreach ($data as $key => $value) {
            if (property_exists( $this , $key)) {

                if (is_null($value)) {
                    continue;
                } else {
                    $this->{$key} = $value;
                }

            }
        }

    }

    /**
     * @param array $config
     * get your data according to uid , domainId and type
     */
    public function getData (array $config)
    {

        $results = Capsule::table('lmdns')
            ->where('uid' , '=' , $config['uid'])
            ->where('domainId' , '=' , $config['domainId'])
            ->where('type' , '=' , $config['type'])
            ->get();

        return $results;
    }

    public function getOne()
    {
        $result = Capsule::table('lmdns')
            ->where('uid' , '=' , $this->uid)
            ->where('domainId' , '=' , $this->domainId)
            ->where('type' , '=' , $this->type)
            ->get();
        return $result;
    }

    public static function findOne (array $config)
    {
        $result = Capsule::table('lmdns')
            ->where('id' , '=' , $config['id'])
            ->where('uid' , '=' , $config['uid'])
            ->where('domainId' , '=' , $config['domainId'])
            ->get();
        return $result;
    }

    public function select ()
    {
        $result = Capsule::table('lmdns')
            ->where('id' , '=' , $this->id)
            ->get();
        return result;
    }

    public function updateRecord ()
    {
        $result = Capsule::table('lmdns')
            ->where('id' , '=' , $this->id)
            ->update([
                'subdomain' => $this->subdomain,
                'value' => $this->value,
                'type' => $this->type,
                'ipIndex' => $this->ipIndex,
            ]);
        return $result;
    }

    public function addRecord ()
    {
        $result = Capsule::table('lmdns')
            ->insert([
                'uid' => $this->uid,
                'domainId' => $this->domainId,
                'type' => $this->type,
                'subdomain' => $this->subdomain,
                'value' => $this->value,
                'ipIndex' => $this->ipIndex,
            ]);

        return $result;
    }

    public function delRecord ()
    {
        $result = Capsule::table('lmdns')
            ->where('id' , '=' , $this->id)
            ->where('uid' , '=' , $this->uid)
            ->where('domainId' , '=' , $this->domainId)
            ->delete();
        return $result;
    }

    public function ReloadIpIndex ($uid , $domainId , $type)
    {
        try {
            $data = $this->getData(['uid' => $uid , 'domainId' => $domainId , 'type' => $type]);
            $i = 1;
            foreach ($data as $d)
            {
                $model = new lmdns();
                $model->id = $d->id;
                $model->value = $d->value;
                $model->domainId = $d->domainId;
                $model->type = $d->type;
                $model->uid = $d->uid;
                $model->subdomain = $d->subdomain;
                $model->ipIndex = $i;
                $model->updateRecord();
                $i++;
            }
        } catch (ErrorException $e) {
            echo $e->getMessage();
        }
    }

    public function getNewIndex ()
    {
        $result = Capsule::table('lmdns')
            ->select('ipIndex')
            ->where('uid' , '=' , $this->uid)
            ->where('domainId' , '=' , $this->domainId)
            ->where('type' , '=' , $this->type)
            ->get();
        if (!isset($result['ipIndex'])) {
            return 1;
        } else {
            return $result['ipIndex'] + 1;
        }
    }

    public function getNewRecordId ()
    {
        $result = Capsule::select('SELECT LAST_INSERT_ID() as id');
        $result = $result[0];
        return $result->id;
    }

    public function validate ()
    {
        if ($this->type == '') {
            $this->type = 'A';
        }
        if ($this->subdomain == '') {
            $this->subdomain = '@';
        }
    }



}