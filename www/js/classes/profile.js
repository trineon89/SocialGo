class Profile {
    constructor(id="0",myhouseid="003") {
        this._container = document.querySelector('#overlay');
        this._id = id;
        this._myhouseid = myhouseid;
        this._title = "Profil";
        this.generateHtml();
    }
    generateHtml()
    {
        this._html='<div class="innerProfile">\
        <div id="backhandler" class="backicon"></div>\
        <div class="title-container"><div class="title">'+this._title+'</div></div>\
        <div class="mahouse house-'+this._myhouseid+'"></div>\
        <div class="txt underline" id="swap_house_image">Bild wiesselen</div>\
        </div>';
    }
    show(backhandler=null) {
        this._myhouseid=config.getHouse();
        this.generateHtml();
        this._container.innerHTML=this._html;
		//this._parent = document.querySelector('#home_container');
		this._container.style.display="block";
		this.init(backhandler);
    }

    init(backhandler=null) {
        let that=this;
        $('#backhandler').on('click', function() { 
            if (backhandler==null) { 
                that._container.style.display="none"; 
                return;
            }
            switch (backhandler)
            {
                case 'config': config.show();
                break;
            }
        });
        $('#swap_house_image').on('click', function() { 
            if($("#house_selector").length<1){
                $('<div />',{id:'house_selector',class:'inneroverlay-container'}).appendTo(that._container);
                $('<div />',{class:'inneroverlay'}).appendTo("#house_selector");
            } 
            that.showHouseSelector(that._myhouseid);
        });
    }
    showHouseSelector(currentselection=null) {
        let houses = ['house-001', 'house-002', 'house-003', 'house-004', 'house-005', 'house-006', 'house-007', 'house-008'];
        let that=this;
        $('<p />',{class:'text',text:'Wiel en Haus aus'}).appendTo(".inneroverlay");

        houses.forEach(element => {
            $('<div />',{class:'houseselector '+element}).appendTo(".inneroverlay");
        });
        $(".houseselector").each( function() {
            $(this).on('click', function() { 
                let tmp = $(this).attr('class').split(' ')[1].split('-')[1];
                config.setHouse(tmp);
                profile.show();
            });
        });
    }
}