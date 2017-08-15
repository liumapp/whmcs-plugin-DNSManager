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
