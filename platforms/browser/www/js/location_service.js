function onError(error) {
    console.error("The following error occurred: " + error);
}

function handleLocationAuthorizationStatus(cb, status) {
    switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            cb(true);
            break;
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            requestLocationAuthorization(cb);
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:
            cb(false);
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            // Android only
            cb(false);
            break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
            // iOS only
            cb(true);
            break;
    }
}

function requestLocationAuthorization(cb) {
    cordova.plugins.diagnostic.requestLocationAuthorization(handleLocationAuthorizationStatus.bind(this, cb), onError);
}

function ensureLocationAuthorization(cb) {
    cordova.plugins.diagnostic.getLocationAuthorizationStatus(handleLocationAuthorizationStatus.bind(this, cb), onError);
}

function requestLocationAccuracy(){
    ensureLocationAuthorization(function(isAuthorized){
        if(isAuthorized){
            cordova.plugins.locationAccuracy.canRequest(function(canRequest){
                if (canRequest) {
                    cordova.plugins.locationAccuracy.request(function () {
                            console.log("Request successful");
                        }, function (error) {
                            onError("Error requesting location accuracy: " + JSON.stringify(error));
                            if (error) {
                                // Android only
                                onError("error code=" + error.code + "; error message=" + error.message);
                                if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                                    if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                                        cordova.plugins.diagnostic.switchToLocationSettings();
                                    }
                                }
                            }
                        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY // iOS will ignore this
                    );
                } else {
                    // On iOS, this will occur if Location Services is currently on OR a request is currently in progress.
                    // On Android, this will occur if the app doesn't have authorization to use location.
                    onError("Cannot request location accuracy");
                }
            });
        }else{
            onError("User denied permission to use location");
        }
    });
}

// Make the request
requestLocationAccuracy();