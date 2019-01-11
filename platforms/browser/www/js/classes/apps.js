class AppHandler {
    constructor() {
        this._Apps = [];
    }

    Init() {
        this.AddApp("fbm","http://m.me/");
    }

    AddApp(AppName, Caller) {
        this._Apps.push(new App(AppName, Caller));
    }

    show(parent)
    {
        $(parent).html('<div class="title">Meng Apps</div>');
        this._Apps.forEach(function(anApp) {
            $('<span />',{class:'apps '+anApp._Appname}).appendTo(parent);
        });
        parent.style.display="block";
        this.AppendHandlers();
    }
    AppendHandlers()
    {
        $('.fbm').on('click', function() {
            console.log('fbm clicked');
            window.plugins.launcher.canLaunch({uri:'http://m.me/'}, function() {
                window.plugins.launcher.launch({uri:'http://m.me/'}, function() {}, function() {});
            }, function() {alert('FB-messenger not found')});
        });
    }
}

class App {
    constructor(appname,caller) {
        this._Appname = appname;
        this._caller = caller;
    }
}