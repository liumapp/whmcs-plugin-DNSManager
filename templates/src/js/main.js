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