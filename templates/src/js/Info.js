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