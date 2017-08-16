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
                    url:$.lmParam.addDnsBaseUrl,
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
