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

