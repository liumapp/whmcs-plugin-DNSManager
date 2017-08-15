$(function (){

    $.lmParam = {
        domainId:1,
        defaultValue: [
            {'type':'A','subdomain':'mail','value':'112.13.12.11','status':'1'},
            {'type':'A','subdomain':'mail2','value':'112.13.12.12','status':'2'},
            {'type':'A','subdomain':'mail3','value':'112.13.12.13','status':'0'},
        ],
        recordType:[
            {'value':'A','text':'A'},
            {'value':'CNAME','text':'CNAME'}
        ],
        tmpRecord:{},
        state:1,
        homePage:"http://www.liumapp.com",
        addDnsRecordUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/addDnsRecord.php",
        initDataUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/initRecord.php",
        updateDnsRecordUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/updateDnsRecord.php",
        deleteDnsRecordUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/deleteDnsRecord.php",
        addDnsBaseUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/addDnsBaseRecord.php",
        updateDnsBaseRecordUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/updateDnsBaseRecord.php"
    }

});