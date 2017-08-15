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

