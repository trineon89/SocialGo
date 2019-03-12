class AppHandler {
    
    constructor() {
        this._Apps = [];
        this._parent = null;
    }

    ContainsApp(AppName)
    {
        let _i = this._Apps.length;
        while (_i--) {
            if (this._Apps[_i]._Appname == AppName)
            {
               console.log("Exists");
               return true;
            }
        }
        console.log(AppName+" does not exists in Apps");
        return false;
    }

    Init() {
        //this.AddApp("fbm","http://m.me/");
    }

    AddApp(AppName, Caller) {
        
        if (!this.ContainsApp(AppName) && this.AppName != "")
        {
            this._Apps.push(new App(AppName, Caller));
        } else {
            alert("Ass schon an dengen Apps");
        }
    }

    AppSelector()
    {
        $('<div />',{id:'appappendselector'}).appendTo(this._parent);
        $('#appappendselector').html('<select id="selectappid"><option value="fbm">Facebook Messenger</option>\
         <option value="snch">Snapchat</option>\
         <option value="whtsp">Whatsapp</option>\
         <option value="istgr">Instagram</option>\
         <option value="pntrs">Pinterest</option></select><button id="btnAddApp">Add</button>');

         let that = this;
         $('#btnAddApp').on('click', function() {
            that.AddCustomApp($('#selectappid').val());
            that.reload();
        });
    }

    AddCustomApp(AppName) {
        switch (AppName)
        {
            case 'fbm' : this.AddApp("fbm","http://m.me/"); break;
            case 'snch' : this.AddApp("snch","snapchat://"); break;
            case 'whtsp' : this.AddApp("whtsp","whatsapp://"); break;
            case 'istgr' : this.AddApp("istgr","instagram://"); break;
            case 'pntrs' : this.AddApp("pntrs","pinterest://"); break;

            default: return;
        }
    }

    reload()
    {
        let that = this;
        $(this._parent).html('<div class="title">Meng Apps</div>');
        this._Apps.forEach(function(anApp) {
            $('<span />',{class:'apps '+anApp._Appname}).appendTo(that._parent);
        });
        $('<span />',{class:'apps addnew'}).appendTo(this._parent);
        this.AppendHandlers();
    }

    show(parent)
    {
        this._parent = parent;
        $(parent).html('<div class="title">Meng Apps</div>');
        this._Apps.forEach(function(anApp) {
            $('<span />',{class:'apps '+anApp._Appname}).appendTo(parent);
        });
        $('<span />',{class:'apps addnew'}).appendTo(parent);
        parent.style.display="block";
        this.AppendHandlers();
    }
    AppendHandlers()
    {
        this._Apps.forEach(function(anApp) {
            $('.'+anApp._Appname).on('click', function() {
                console.log(anApp._Appname+' clicked');
                window.plugins.launcher.canLaunch({uri: anApp._caller}, function() {
                    window.plugins.launcher.launch({uri:anApp._caller}, function() {}, function() {});
                }, function() {alert(anApp._Appname+'-app not launchable not found')});
            });
        });

        let that = this;

        $('.addnew').on('click', function() {
            console.log('addnew clicked');
            /*
           that.AddCustomApp('snch');
           that.AddCustomApp('whtsp');
           that.AddCustomApp('istgr');
           that.AddCustomApp('pntrs');
           */
          that.AppSelector();
        });
        /*
        $('.fbm').on('click', function() {
            console.log('fbm clicked');
            window.plugins.launcher.canLaunch({uri:'http://m.me/'}, function() {
                window.plugins.launcher.launch({uri:'http://m.me/'}, function() {}, function() {});
            }, function() {alert('FB-messenger not found')});
        });
        */
    }
}

class App {
    constructor(appname,caller) {
        this._Appname = appname;
        this._caller = caller;
    }
}