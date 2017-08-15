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
