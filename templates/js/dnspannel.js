define ('info' , function (require , exports , module) {

    var table = $('.lm-dns-table');

    exports.init = function () {

        var tr = $('<tr></tr>');

        var td = $('<td colspan="6"></td>');

        var msg = $('<p>提示：域名解析的生效时间一般在五分钟左右</p>');

        td.append(msg);

        tr.append(td);

        table.append(tr);

    }


});
define('addColumn',function (require , exports , module) {

    var table = $(".lm-dns-table");
    var titleTr = $(".lm-title-tr");

    exports.init = function () {

        $('body').on('click' , '.lm-add-dns-record' , function (e) {
            if ($.lmParam.state == 1) {
                var tr = module.exports.buildColumn();
                titleTr.after(tr);
                $.lmParam.state = 2;
            } else {
                alert('当前有尚未保存的记录！');
            }
            e.stopPropagation();
        });

    };

    exports.buildColumn = function () {
        var select = $('<select class="lm-edit-type"></select>');
        var td0=$('<td></td>'),td1=$('<td></td>'),td2=$('<td></td>'),td3=$('<td></td>'),td4=$('<td></td>'),td5=$('<td></td>');
        var tr = $('<tr class="lm-edit-tr"></tr>');
        td0.append($('<input type="checkbox">'));
        $($.lmParam.recordType).each(function (n,ele) {
            select.append($('<option value="'+ele.value+'">'+ele.text+'</option>'));
        });
        td1.append(select);
        td2.append($('<input type="text" class="lm-edit-subdomain">'));
        td3.append($('<input type="text" class="lm-edit-value">'));
        td4.append('');
        td5.append('<a href="javascript:void(0)" class="lm-save-btn">保存</a>&nbsp;<a href="javascript:void(0)" class="lm-cancel-btn">取消</a>');
        tr.append(td0);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        return tr;
    }

});


define('cancelColumn' , function (require , exports , module){
    exports.init = function () {
        $('body').on('click' , '.lm-cancel-btn' ,function (){
            $.lmParam.state = 1;
            $('.msg-container').remove();
            $(this).parent().parent().remove();
        });

        $('body').on('click' , '.lm-back-btn' , function () {
            $.lmParam.state = 1;
            tr = $(this).parent().parent();
            $('.msg-container').remove();
            module.exports.changeTr(tr);
        });
    };

    exports.changeTr = function (tr) {
        tr.attr('class' , 'lm-tr');
        //只修改2，3，4的值
        for (var i = 1 ; i < 4 ; i++ ) {
            var ele = $(tr.children()[i]);
            var content = $(ele.children()[0]);
            ele.empty();
            ele.append($('<p>'+$.lmParam.tmpRecord[i]+'</p>'));
        }
        //修改最后的操作
        lastTd = $(tr.children()[tr.children().length - 1]);
        lastTd.empty();
        lastTd.append($('<a href="javascript:void(0)" class="lm-edit-btn">修改</a><a href="javascript:void(0)" class="lm-delete-btn">删除</a>'));
    };
}) ;



define('delColumn' , function (require , exports , module) {

    exports.init = function () {
        $('body').on('click' , '.lm-delete-btn' ,function () {
            if (confirm('您确定要删除吗？')) {
                var tr = $(this).parent().parent();
                $.ajax({
                    url:$.lmParam.deleteDnsRecordUrl,
                    method:"post",
                    data: {
                        id:$($(tr.children()[0]).children()[0]).val(),
                        domainId:$.lmParam.domainId
                    },
                    success: function (data) {
                        tr.remove();
                    }
                });
            }
        });
    };

    exports.del = function (tr) {

        tr.remove();

    };
});

define ( 'help' , function (require , exports , module) {

    var selectData = '<p>搭建网站： 要将域名指向主机服务商提供的IP地址，请选择「A记录」；要将域名指向主机服务商提供的另一个域名，请选择「CNAME记录」。</p>' +
        '<p>A记录：将域名指向一个IPv4地址（例如：10.10.10.10），需要增加A记录</p>' +
        '<p>CNAME记录：如果将域名指向一个域名，实现与被指向域名相同的访问效果，需要增加CNAME记录</p>';

    var typeData = '<p>温馨提示：要将域名example.com解析为www.example.com，在主机记录(RR)处填写www即可。主机记录就是域名前缀，常见用法有：</p>' +
    '<p>www ：将域名解析为www.example.com，填写www；</p>' +
    '<p>@ ：将域名解析为example.com（不带www），填写@或者不填写；</p>' +
    '<p>二级域名 ：如：mail.example.com或abc.example.com，填写mail或abc；</p>' +
    '<p>手机网站 ：如：m.example.com，填写m。</p>';

    var valueData = '<p>温馨提示：A记录值请填写您的服务器IP地址（必须为IPv4地址，例如：202.106.0.20），若不清楚IP，请您咨询您的空间服务商。如果IP地址的格式中带有端口，如：202.106.0.20:8080，则只添加202.106.0.20即可。</p>' +
    '<p>CNAME记录值请填写空间服务商提供给您的域名（例如：hichina.com）。</p>';

    exports.init = function () {

        $('body').on('click' , '.lm-edit-base-btn' , function () {
            module.exports.helpStart();
        });

        $('body').on('click' , '.lm-edit-btn' , function () {
            module.exports.helpStart();
        });

        $('body').on('click' , '.lm-add-dns-record' , function () {
            module.exports.helpStart();
        });

    };

    /**
     *  创建msgContainer
     */
    exports.helpStart = function () {

        var container = $('<tr class="lm-tr msg-container"><td colspan="5"><div class="lm-help-msg"></div></td></tr>');

        var ele = $('.lm-edit-tr');

        ele.after(container);

        $(".lm-help-msg").append(selectData);

        $('body').on('mouseenter' , 'select[class=lm-edit-type]' ,function () {

            module.exports.selectFocus($(this));

        });

        $('body').on('mouseenter' , 'input[class=lm-edit-subdomain]' , function () {

            module.exports.typeFocus($(this));

        });

        $('body').on('mouseenter' , 'input[class=lm-edit-value]' , function () {

            module.exports.valueFocus($(this));

        });

    };



    exports.selectFocus = function (ele) {

        $('.lm-help-msg').attr('class' , 'lm-help-msg onSelect');
        $('.lm-help-msg').empty();
        $('.lm-help-msg').append(selectData);

    };

    exports.typeFocus = function (ele) {

        $('.lm-help-msg').attr('class' , 'lm-help-msg onType');
        $('.lm-help-msg').empty();
        $('.lm-help-msg').append(typeData);

    };

    exports.valueFocus = function (ele) {

        $('.lm-help-msg').attr('class' , 'lm-help-msg onValue');
        $('.lm-help-msg').empty();
        $('.lm-help-msg').append(valueData);

    };

});


define('initColumn' , function (require , exports , module) {

    exports.init = function () {
        window.onload = function () {
            var titleTr = $(".lm-title-tr");
            $.ajax({
                'url': $.lmParam.initDataUrl,
                'method': 'post',
                'data': {
                    domainId: $.lmParam.domainId
                },
                success : function (data) {
                    data = eval(data);
                    if (data.length == 0) {
                        //要求用户对@记录进行填写
                        titleTr.after(module.exports.baseRecord());
                    } else {
                        $(data).each (function (){
                            if (this.type == 'A' && this.subdomain == '@') {
                                titleTr.after(module.exports.baseColumn(this));
                            } else {
                                titleTr.after(module.exports.dataColumn(this));
                            }
                        });
                    }
                }
            });
        };
    };

    exports.baseRecord = function () {
        $.lmParam.state = 2;
        var td0=$('<td></td>'),td1=$('<td></td>'),td2=$('<td></td>'),td3=$('<td></td>'),td4=$('<td></td>'),td5=$('<td></td>');
        var tr = $('<tr class="lm-edit-tr"></tr>');
        td0.append($('<input type="checkbox">'));
        td1.append($('<p>A</p>'));
        td2.append($('<p>@</p>'));
        td3.append($('<input type="text" class="lm-edit-value">'));
        td4.append('');
        td5.append('<a href="javascript:void(0)" class="lm-save-base-btn">保存</a>');
        tr.append(td0);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        return tr;
    };

    exports.updateBaseRecord = function () {
        $.lmParam.state = 2;
        var td0=$('<td></td>'),td1=$('<td></td>'),td2=$('<td></td>'),td3=$('<td></td>'),td4=$('<td></td>'),td5=$('<td></td>');
        var tr = $('<tr class="lm-edit-tr"></tr>');
        td0.append($('<input type="checkbox">'));
        td1.append($('<p>A</p>'));
        td2.append($('<p>@</p>'));
        td3.append($('<input type="text" class="lm-edit-value">'));
        td4.append('');
        td5.append('<a href="javascript:void(0)" class="lm-confirmEdit-base-btn">保存</a>');
        tr.append(td0);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        return tr;
    };

     exports.dataColumn = function (data) {
        //正常记录
        var td0=$('<td></td>'),td1=$('<td></td>'),td2=$('<td></td>'),td3=$('<td></td>'),td4=$('<td></td>'),td5=$('<td></td>');
        var tr = $('<tr class="lm-tr"></tr>');
        td0.append($('<input type="checkbox" value="'+data.id+'">'));
        td1.append($('<p>'+data.type+'</p>'));
        td2.append($('<p>'+data.subdomain+'</p>'));
        td3.append($('<p>'+data.value+'</p>'));
        td4.append('');
        td5.append($('<a href="javascript:void(0)" class="lm-edit-btn">修改</a><a href="javascript:void(0)" class="lm-delete-btn">删除</a>'));
        tr.append(td0);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        return tr;
    };

     exports.baseColumn = function (data) {
         var td0=$('<td></td>'),td1=$('<td></td>'),td2=$('<td></td>'),td3=$('<td></td>'),td4=$('<td></td>'),td5=$('<td></td>');
         var tr = $('<tr class="lm-tr"></tr>');
         td0.append($('<input type="checkbox" value="'+data.id+'">'));
         td1.append($('<p>'+data.type+'</p>'));
         td2.append($('<p>'+data.subdomain+'</p>'));
         td3.append($('<p>'+data.value+'</p>'));
         td4.append('');
         td5.append($('<a href="javascript:void(0)" class="lm-edit-base-btn">修改</a>'));
         tr.append(td0);
         tr.append(td1);
         tr.append(td2);
         tr.append(td3);
         tr.append(td4);
         tr.append(td5);
         return tr;
     }

});

define('main',function (require , exports ) {

    var initColumn = require('initColumn');

    var addColumn = require('addColumn');

    var cancelColumn = require('cancelColumn');

    var delColumn = require('delColumn');

    var saveColumn = require('saveColumn');

    var updateColumn = require('updateColumn');

    var info = require ('info');

    var help = require('help');

    exports.init = function () {

        initColumn.init();

        addColumn.init();

        cancelColumn.init();

        delColumn.init();

        saveColumn.init();

        updateColumn.init();

        info.init();

        help.init();

    }

});
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
define('saveColumn' , function (require , exports , module) {
    var saveBtn = $('.lm-save-btn');

    exports.init = function () {
        $('body').on('click' , '.lm-save-btn' , function (){
            //here is your logic code by ajax
            var tr = $(this).parent().parent();
            $.ajax(
                {
                    url:$.lmParam.addDnsRecordUrl,
                    data:{
                        domainId:$.lmParam.domainId,
                        type:$('.lm-edit-type').val(),
                        subdomain:$('.lm-edit-subdomain').val(),
                        value:$('.lm-edit-value').val()
                    },
                    method:'post',
                    success:function(data){
                        $.lmParam.state = 1;
                        $('.msg-container').remove();
                        module.exports.changeTr(tr,data);
                    },
                    error:function(data){
                        $.lmParam.state = 2;
                    }
                });
        });

        $('body').on('click' , '.lm-save-base-btn' , function () {
            var tr = $(this).parent().parent();
            var dataValue = $('.lm-edit-value').val();
            $.ajax(
                {
                    url:$.lmParam.updateDnsBaseRecordUrl,
                    data:{
                        id:$.lmParam.tmpRecord[0],
                        domainId:$.lmParam.domainId,
                        type:'A',
                        subdomain:'@',
                        value:dataValue
                    },
                    method:'post',
                    success:function(index) {
                        $.lmParam.state = 1;
                        $('.msg-container').remove();
                        module.exports.changeBaseTr(tr , dataValue,index);
                    },
                    error:function(data){
                        $.lmParam.state = 2;
                    }
                });
        });

    };

    exports.changeBaseTr = function (tr , data , index) {
        tr.attr('class' , 'lm-tr');
        td0 = $(tr.children()[0]);
        td0.empty();
        td0.append($('<input type="checkbox" value="'+index+'">'));
        td3 = $(tr.children()[3]);
        td3.empty();
        td3.append($('<p>'+data+'</p>'));
        //修改最后的操作
        lastTd = $(tr.children()[tr.children().length - 1]);
        lastTd.empty();
        lastTd.append($('<a href="javascript:void(0)" class="lm-edit-base-btn">修改</a>'));

    };

    exports.changeTr = function (tr , index) {
        tr.attr('class' , 'lm-tr');
        //只修改1,2，3，4的值
        td0 = $(tr.children()[0]);
        td0.empty();
        td0.append($('<input type="checkbox" value="'+index+'">'));
        for (var i = 1 ; i < 4 ; i++ ) {
            var ele = $(tr.children()[i]);
            var content = $(ele.children()[0]);
            ele.empty();
            ele.append($('<p>'+content.val()+'</p>'));
        }
        //修改最后的操作
        lastTd = $(tr.children()[tr.children().length - 1]);
        lastTd.empty();
        lastTd.append($('<a href="javascript:void(0)" class="lm-edit-btn">修改</a><a href="javascript:void(0)" class="lm-delete-btn">删除</a>'));
    };
});

define ('updateColumn' , function (require , exports , module){
    exports.init = function () {

        $('body').on('click' , '.lm-edit-btn' , function (){
            if ($.lmParam.state == 1) {
                var tr = $(this).parent().parent();
                module.exports.saveOldData(tr);
                module.exports.updateableView(tr);
            } else {
                alert('请先保存您正在修改的解析记录');
            }
        });

        $('body').on('click' , '.lm-update-btn' , function () {
            var tr = $(this).parent().parent();
            $.ajax(
                {
                    url:$.lmParam.updateDnsRecordUrl,
                    data:{
                        domainId:$.lmParam.domainId,
                        id:$($(tr.children()[0]).children()[0]).val(),
                        type:$('.lm-edit-type').val(),
                        subdomain:$('.lm-edit-subdomain').val(),
                        value:$('.lm-edit-value').val()
                    },
                    method:'post',
                    success:function(data){
                        $('.msg-container').remove();
                        $.lmParam.state = 1;
                        module.exports.changeTr(tr);
                    },
                    error:function(data){
                        $.lmParam.state = 2;
                    }
                });
        });

        $('body').on('click' , '.lm-edit-base-btn' , function () {
            var tr = $(this).parent().parent();
            module.exports.saveOldData(tr);
            var title_tr = $('.lm-title-tr');
            var init = require('initColumn');
            var delColumn = require('delColumn');
            delColumn.del($(this).parent().parent());
            title_tr.after(init.baseRecord());
        });

        $('body').on('click' , '.lm-confirmEdit-base-btn' , function () {
            var tr = $(this).parent().parent();
            $.ajax(
                {
                    url:$.lmParam.updateDnsBaseRecordUrl,
                    data:{
                        domainId:$.lmParam.domainId,
                        id:$($(tr.children()[0]).children()[0]).val(),
                        type:'A',
                        subdomain:'@',
                        value:$('.lm-edit-value').val()
                    },
                    method:'post',
                    success:function(data){
                        $('.msg-container').remove();
                        $.lmParam.state = 1;
                        var saveColumn = require('saveColumn');
                        saveColumn.changeBaseTr(tr , this.data , data);
                    },
                    error:function(data){
                        $.lmParam.state = 2;
                    }
                });
        });
    };

    exports.changeTr = function (tr) {
        tr.attr('class' , 'lm-tr');
        //只修改2，3，4的值
        for (var i = 1 ; i < 4 ; i++ ) {
            var ele = $(tr.children()[i]);
            var content = $(ele.children()[0]);
            ele.empty();
            ele.append($('<p>'+content.val()+'</p>'));
        }
        //修改最后的操作
        lastTd = $(tr.children()[tr.children().length - 1]);
        lastTd.empty();
        lastTd.append($('<a href="javascript:void(0)" class="lm-edit-btn">修改</a><a href="javascript:void(0)" class="lm-delete-btn">删除</a>'));
    };

    exports.updateableView = function (tr) {
        tr.attr('class' , 'lm-edit-tr');
        $.lmParam.state = 2;//保存前不可新增
        //只修改2，3，4的值
        for (var i = 1 ; i < 4 ; i++ ) {
            var ele = $(tr.children()[i]);
            var content = $(ele.children()[0]);
            var html = content.html();
            ele.empty();
            switch (i) {
                case 1 :
                    var select = $('<select class="lm-edit-type"></select>');
                    $($.lmParam.recordType).each (function (n , ele) {
                        select.append($('<option value="'+ele.value+'" '+ ((ele.value == html) ? "selected='selected'" : '') +'>'+ele.text+'</option>'));
                    });
                    ele.append(select);
                    break;
                case 2:
                    ele.append($('<input type="text" value="'+html+'" class="lm-edit-subdomain">'));
                    break;
                case 3:
                    ele.append($('<input type="text" value="'+html+'" class="lm-edit-value">'));
                    break;
            }

        }
        //修改最后的操作
        lastTd = $(tr.children()[tr.children().length - 1]);
        lastTd.empty();
        lastTd.append($('<a href="javascript:void(0)" class="lm-update-btn">保存</a>&nbsp;<a href="javascript:void(0)" class="lm-back-btn">取消</a>'));
    };

    exports.saveOldData = function (tr) {
        $.lmParam.tmpRecord[0] = $($(tr.children()[0]).children()[0]).val();
        for (var i = 1 ; i < 4 ; i ++) {
            var ele = $(tr.children()[i]);
            var content = $(ele.children()[0]);
            var html = content.html();
            $.lmParam.tmpRecord[i] = html;
        }
    }

});
