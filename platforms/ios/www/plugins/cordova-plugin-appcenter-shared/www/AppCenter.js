cordova.define("cordova-plugin-appcenter-shared.AppCenter", function(require, exports, module) {
var exec = require('cordova/exec');

var AppCenter = {
    getInstallId: function (success, error) {
        exec(success, error, "AppCenterShared", "getInstallId", []);
    }
};

module.exports = AppCenter;

});
