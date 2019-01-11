function getHome() {
	shtml='<div id="home_container">';
	shtml+='<div class="home_image_container">';
	shtml+='<img id="home_image" src="res/bg/home_background.png" usemap="#image-map"/>';
	shtml+='<map name="image-map" id="image-map">';
	shtml+='   <area target="" alt="pc" title="pc" href="#pc" onmouseover="this.style.backgroundColor=\'#00FF00\';" coords="442,916,94,654" shape="rect">';
	shtml+='   <area target="" alt="wecker" title="wecker" href="#wecker" coords="1894,677,100" shape="circle">';
	shtml+='</map></div>';
	shtml+='</div>';
	shtml+='<div id="back_handler" class="backicon"></div>';
	shtml+=showPC();
	shtml+=showWecker();
	return shtml;
}

function initHome() {
	//$('img#home_image[usemap]').rwdImageMaps();
	$('map').imageMapResize();
	$('area').on('click', function() {
		var clickeditem = $(this).attr('alt');
		$('#home_'+clickeditem).css("display", "block");
		//pageLoader(clickeditem);
	})
	$('#back_handler').on('click', function() {pageLoader('map');});
	initAppHandlers();
}

window.onclick = function(event) {
	if (event.target == document.getElementById('home_image')) { document.getElementById('home_pc').style.display="none"; }
}

function showPC() {
	shtml='<div id="home_pc">';
	shtml+='<div class="title">Meng Apps</div>';
	shtml+='<span class="apps fbm"></span>';
	shtml+='<span class="apps snch"></span>';
	shtml+='<span class="apps whtsp"></span>';
	shtml+='<span class="apps istgr"></span>';
	shtml+='<span class="apps pntrs"></span>';
	shtml+='</div>';
	return shtml;
}

function showWecker() {
	shtml='<div id="home_wecker">';
	shtml+='<div class="title-container"><div class="title">alarm clock</div><div id="home_wecker_closer" class="closer"></div></div>';
	
	shtml+=showClock();
	shtml+='<div>';
	shtml+='<form>';
	shtml+='<div class="relative-sel"><span class="clock-select">8:00</span>';
	shtml+='<label for="flip-clock-set" class="ui-hidden-accessible">Flip toggle switch:</label>';
	shtml+='<div class="alignright"><select data-role="flipswitch" name="flip-clock-set" id="flip-clock-set"> <option value="0">Aus</option>\
                <option value="1">Un</option></select></div></div>';
	shtml+='<div class="relative-sel"><span class="text-inline">Juki News</span>';
	shtml+='<label for="flip-clock-set" class="ui-hidden-accessible">Flip toggle switch:</label>';
	shtml+='<div class="alignright"><select data-role="flipswitch" name="flip-jukinews-set" id="flip-jukinews-set"> <option value="0">Aus</option>\
                <option value="1">Un</option></select></div></div>';
	shtml+='<div class="relative-sel"><span class="text-inline">Meteo</span>';
	shtml+='<label for="flip-clock-set" class="ui-hidden-accessible">Flip toggle switch:</label>';
	shtml+='<div class="alignright"><select data-role="flipswitch" name="flip-meteo-set" id="flip-meteo-set"> <option value="0">Aus</option>\
                <option value="1">Un</option></select></div></div>';
	shtml+='</form>';
	shtml+='</div>';
	shtml+='</div>';
	return shtml;
}

function showClock() {
	let shtml='<div class="clock">';
	shtml+='<div class="inner">';
	shtml+='<div class="hour hand"></div>';
    shtml+='<div class="minute hand"></div>';
	shtml+='<div class="graduations">';
	shtml+='<div class="graduation"></div>';
	shtml+='<div class="graduation"></div>';
	shtml+='<div class="graduation"></div>';
	shtml+='<div class="graduation"></div>';
	shtml+='<div class="graduation"></div>';
	shtml+='<div class="graduation"></div>';
	shtml+='<div class="graduation"></div>';
	shtml+='<div class="graduation"></div>';
	shtml+='<div class="graduation"></div>';
	shtml+='<div class="graduation"></div>';
	shtml+='<div class="graduation"></div>';
	shtml+='<div class="graduation"></div>';
	shtml+='</div>';
	shtml+='</div>';
	shtml+='</div>';
	return shtml;
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

function firstInitWecker() {
	if (storage.getItem('clock') == null)
	{
		storage.setItem('clock', 0);
		var d = new Date();
		d.setHours(8);
		storage.setItem('clock-time',d);
	}
	if (storage.getItem('juki-news') == null)
		{ storage.setItem('juki-news', 1); }
	if (storage.getItem('meteo') == null)
		{ storage.setItem('meteo', 0); }
}

function onSuccess(date) {
    //alert('Selected date: ' + date);
	//console.log(date.getHours());
	var rmin=date.getMinutes();
	if (rmin <= 9) {rmin="0"+rmin;}
	var time=date.getHours()+":"+rmin;
	
	$('.clock-select').text(time);
	storage.setItem('clock-time',time);
}

function onError(error) { // Android only
    alert('Error: ' + error);
}

function flipClockChanged(e) {
        var id = this.id,
            value = this.value;
			console.log(this);
        console.log(id + " has been changed! " + value);
		storage.setItem('clock',value);
		if (value==1)
		{
			cordova.plugins.notification.local.schedule({
			        id: 1,
			        title: "Wecker",
			        text: "kill the batman ",
			        at: new Date(storage.getItem('clock-time')),
			        //icon: 'res://icon',
			        //smallIcon: 'res://icon',
			        every: 'day'
			    });
		} else {
			let scope;
			cordova.plugins.notification.local.cancel(1, function () {
			    // Notification was cancelled
			}, scope);
		}
    }

function initAppHandlers() {
	//$('img[usemap]').maphilight({ stroke: true,strokeColor: 'FF0000',strokeWidth:3, fillColor: '009DDF', fillOpacity: 0 ,alwaysOn: true});
	firstInitWecker();
	$('#home_wecker_closer').on("click", function() {$('#home_wecker').css("display", "none");});
	$('#flip-clock-set').flipswitch({});
	$('#flip-jukinews-set').flipswitch({});
	$('#flip-meteo-set').flipswitch({});
	 $("#flip-clock-set").on("change", flipClockChanged);
	
	$('.clock-select').on("click", function(){
		console.log("open DateTimePicker");
		var options = {
			date : new Date(),
			mode : 'time'
		};
		
		datePicker.show(options, onSuccess, onError);
		/*
		window.DateTimePicker.pick(options, function (timestamp) {
		    $('#clock-select').text(timestamp);
		});
		*/
	});
	
	$('.fbm').on('click', function() {
		console.log('fbm clicked');
		window.plugins.launcher.canLaunch({uri:'http://m.me/'}, function() {
			window.plugins.launcher.launch({uri:'http://m.me/'}, function() {}, function() {});
		}, function() {alert('FB-messenger not found')});
	});
	
	let clock = new Clock();
}