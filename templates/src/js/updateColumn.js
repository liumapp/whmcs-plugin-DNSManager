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
