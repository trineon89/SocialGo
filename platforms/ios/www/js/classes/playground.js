class Playground {
    constructor() {
        this._container = document.querySelector('#overlay');
        this._html='<div id="playground_container"><div class="playground_image_container">\
		<img id="playground_image" src="res/bg/market_background.png" usemap="#playground-map"/>\
		<map name="image-map" id="image-map">\
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