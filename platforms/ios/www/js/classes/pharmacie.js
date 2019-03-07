class Pharmacie {
    constructor() {
        this._container = document.querySelector('#overlay');
        this._html='<div id="pharmacie_container"><div class="pharmacie_image_container">\
		<img id="pharmacie_image" src="res/bg/health_background.png" usemap="#pharmacie-map"/>\
		<map name="pharmacie-map" id="pharmacie-map">\
		   <!--<area target="" alt="pc" title="pc" href="#pc" onmouseover="this.style.backgroundColor=\'#00FF00\';" coords="442,916,94,654" shape="rect">\
		   <area target="" alt="wecker" title="wecker" href="#wecker" coords="1894,677,100" shape="circle">-->\
		</map></div>\
		</div>\
		<div id="back_handler" class="backicon"></div>';
    }
    show() {
		this._container.innerHTML=this._html;
		//this._parent = document.querySelector('#home_container');
		this._container.style.display="block";
		this.init();
    }
    init() {
        let that = this;
        $('#back_handler').on('click', function() { that._container.style.display="none"; });
    }
}