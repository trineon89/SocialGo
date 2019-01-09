class Home {
	constructor() {
		this._container = document.querySelector('#overlay');
		this._html='<div id="home_container"><div class="home_image_container">\
		<img id="home_image" src="res/bg/home_background.png" usemap="#image-map"/>\
		<map name="image-map" id="image-map">\
		   <area target="" alt="pc" title="pc" href="#pc" onmouseover="this.style.backgroundColor=\'#00FF00\';" coords="442,916,94,654" shape="rect">\
		   <area target="" alt="wecker" title="wecker" href="#wecker" coords="1894,677,100" shape="circle">\
		</map></div>\
		</div>\
		<div id="back_handler" class="backicon"></div>';
		this._apps=new AppHandler();
		this._wecker=new Wecker();
	}

	show() {
		this._container.innerHTML=this._html;
		this._parent = document.querySelector('#home_container');
		this._container.style.display="block";
		this.init();
	}

	init() {
		console.log("init");
		$('map').imageMapResize();
		this._apps.Init();
		let that = this;
		$('area').on('click', function() {
			var clickeditem = $(this).attr('alt');
			that.onclick(clickeditem);
		});
		$('#back_handler').on('click', function() { that._container.style.display="none"; });
		window.onclick = function(event) {
			if (event.target == document.getElementById('home_image')) { document.getElementById('home_pc').style.display="none"; }
		}
	}

	onclick(item=null) {
		console.log(item);
		if (item==null) return;
		if($("#home_"+item).length<1) $('<div />',{id:'home_'+item}).appendTo(this._parent);
		parent=document.querySelector('#home_'+item);
		if(item=='pc') this._apps.show(parent);
		if(item=='wecker') this._wecker.show(parent);
	}
}

class Clock {
	constructor() {
		this.hourHand   = document.querySelector('.hour.hand');
	    this.minuteHand = document.querySelector('.minute.hand');
		this.timer();
		setInterval(() => this.timer(), 1000);
	}
	timer() {
	    this.sethandRotation('hour');
	    this.sethandRotation('minute');
	  }
	  sethandRotation(hand) {
	      let date = new Date(), hours, minutes, percentage, degree;
    
	      switch (hand) {
	        case 'hour':
	          hours       = date.getHours();
	          hand        = this.hourHand;
			  minutes	  = date.getMinutes();
	          percentage  = this.numberToPercentage(hours, 12, minutes);
	          break;
	        case 'minute':
	          minutes     = date.getMinutes();
	          hand        = this.minuteHand;
	          percentage  = this.numberToPercentage(minutes, 60);
	          break;
	      }
  
	      degree                = this.percentageToDegree(percentage);
	      hand.style.transform  = `rotate(${degree}deg) translate(-50%, -50%)`;
	}
	numberToPercentage(number = 0, max = 60, minutes=0) {
		let rmin=(minutes / 60);
		let res= ( (number+rmin) / max) * 100;
		//console.log("numbertoperc: "+res+" rmin: "+rmin);
		return res;
	}
	percentageToDegree(percentage = 0) {
		let res = (percentage * 360) / 100;
		//console.log("perctodeg: "+res);
		return res;
	}
}