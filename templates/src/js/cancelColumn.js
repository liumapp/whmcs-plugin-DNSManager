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


