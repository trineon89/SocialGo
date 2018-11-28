/*   tc5U-2jGTQic:APA91bGIvRrzbQhbOyEugxN8bk31_Id-sMvY_WEfQ97nfFRJBmnM3ERWdC_of0Yg_lWhFS-zBqVI_OaqH5yReNIzy7X2SVRT3qDT49_q0iEGUHIxzMarYCzil1LtKXJaUhfFQ4cudVAV

fArSRX0bi10:APA91bE1EmQ60_fWVpaQAqUdLt3zODvAQ0eTZpNj_jtjBSpxyh-q8BSFbA3Iqtzrd-D006lqbqNWAt86sZMlkqzGN9b6XZlXAXrf6uUIXKEgbirf8m1dQscEmNgwLfEyi9Dvv7uAm031

 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var storage;
var ttoken = null;
var apstoken =null;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		userid=1;
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
		getWeather();
		console.log("storage init");
		storage = window.localStorage;
		console.log("init notif");
		setNotifEvents();
		//navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
       
    }
};

app.initialize();
var pagecontent, userid;
var uemail, uname, usurname;
var weather;
pageLoader('start');

function pageLoader(page)
{
	switch (page)
	{
		case 'start': 
			includeScript('./js/start.js', function() {
				pagecontent=getStartContent();
				//console.log(pagecontent);
				document.getElementById('appcontent').innerHTML=pagecontent;
				start_appendEventHandlers();
			});
			break;
		case 'map': 
			setLocation('map');
				includeScript('./js/map.js', function() {
					//includeScript('./js/jquery.maphilight.min.js', function () {} );
					includeScript('./js/location_service.js', function () {} );
					includeScript('./res/leaflet/leaflet.js', function () {
						includeScript('./js/mapbox-gl.js', function () { 
							includeScript('./js/leaflet-mapbox-gl.js', function () {
								pagecontent=getMap();
								console.log(pagecontent);
								document.getElementById('appcontent').innerHTML=pagecontent;
								initMap();
								appendMapEventHandlers();
							});
						});
						
					});
				});
				break;
			case 'commune' :
				includeScript('./js/commune.js', function() {
					pagecontent=getCommune();
					document.getElementById('appcontent').innerHTML=pagecontent;
					initCommune();
				});
				break;
			case 'school' :
				includeScript('./js/school.js', function() {
					pagecontent=getSchool();
					document.getElementById('appcontent').innerHTML=pagecontent;
					initSchool();
				});
				break;
			case 'home':
				includeScript('./js/home.js', function() {
					pagecontent=getHome();
					document.getElementById('appcontent').innerHTML=pagecontent;
					initHome();
				});
				break;
			case 'jugendhaus':
				setLocation('juki');
				includeScript('./js/jugendhaus.js', function() {
					includeScript('js/swiper.min.js', function (){});
					pagecontent=getJugendhaus();
					document.getElementById('appcontent').innerHTML=pagecontent;
					initJugendhaus();
				});
				break;
			case 'pc':
					//alert('Hei kennt de PC');
				break;
			case 'wecker':
					//alert('Hei kennt de Wecker');
				break;
	}
}

function setNotifEvents()
{
	cordova.plugins.notification.local.requestPermission(function (granted) { 
		console.log("grantig local notif: "+granted);
	 });
	 
	if (cordova.platformId!="browser")
	{
		cordova.plugins.firebase.messaging.requestPermission().then(function(token) {
			console.log("APNS device token: "+ token);
			apstoken = token;
		});
		/*
		window.FirebasePlugin.getToken(function(token) {
			console.log('FirebaseToken: ' + token);
			ttoken=token;
			
		}, function (error) {
			console.log('FirebaseError: ' + error);
		});
		*/
		
		cordova.plugins.firebase.messaging.getToken().then(function(token) {
			console.log("Got device token: "+ token);
			ttoken=token;
		});
		
		//ForeGround
		cordova.plugins.firebase.messaging.onMessage(function(payload) {
			console.log("New foreground FCM message: "+ payload);
		});
		//Backgorund
		cordova.plugins.firebase.messaging.onBackgroundMessage(function(payload) {
			console.log("New background FCM message: "+ payload);
		});
	}
}

function setLocation(loc)
{
	$.ajax({
		type: "POST",
		url: "https://gamerest.jsdev.online/web/ajax/ajaxhandler.ajax.php",
		data: { request: 'setpredef', id: userid, location: loc },
		success: function (result) {
			console.log(result);
		}
	});
}

function includeScript(path, cb) {
    var node = document.createElement("script"), 
        okHandler,
        errHandler;
        
    node.src = path;

    okHandler = function () {
        this.removeEventListener("load", okHandler);
        this.removeEventListener("error", errHandler);
        cb();
    };
    errHandler = function (error) {
        this.removeEventListener("load", okHandler);
        this.removeEventListener("error", errHandler);
        cb("Error loading script: " + path);
    };

    node.addEventListener("load", okHandler);
    node.addEventListener("error", errHandler);

    document.body.appendChild(node);
}

function getWeather() {
	apikey='f4157c3bbb844ae723c48e42d99a2422';
	adress='http://api.openweathermap.org/data/2.5/weather?q=Kehlen,lu&units=metric&APPID='+apikey;
	$.ajax({
		type: "GET",
		url: adress,
		//data: { request: 'setpredef', id: userid, location: loc },
		success: function (result) {
			console.log(result);
			weather=result;
			var wid=weather.weather[0].id.toString();
			showWeatherIcon(wid);
			var tmp=weather.main.temp.toString();
			showWeatherTemp(tmp);
		}
	});
}

function showWeatherTemp(temp)
{
	$('#temperature').html(temp+'°C');
}

function showWeatherIcon(wid)
{
  var code=wid.charAt(0);
  var icon="";
  switch (code)
    {
      case '2':
      case '3':
      case '5':
        icon = "./res/weather/weather5.png";
        break;
      case '6':
        icon = "./res/weather/weather7.png";
        break;
      case '7':
        icon = "./res/weather/weather2.png";
        break;
       case '8':
        if (wid=="800")
          icon = "./res/weather/weather1.png";
        else if (wid=="801")
          icon = "./res/weather/weather4.png";
        else if(wid=="802")
          icon = "./res/weather/weather2.png";
        else if(wid=="803")
          icon = "./res/weather/weather3.png";
        else if(wid=="804")
          icon = "./res/weather/weather3.png";
        break;
    }
	console.log("icon: "+icon);
	$('#start_weathercontainer').css('background-image','url('+icon+')');
}

function showUsersPopupList() {
	shtml='<div id="userpopuplist"></div>';
	return shtml;
}

function showOverlay(sel="config",selid=0)
{
	switch (sel)
	{
	case "config" :
		$(".overlay").html(getConfigOverlay());
		$('#backhandler').bind("click", function() { $(".overlay").css("display","none"); });
		$('#cfg-show-my-profile').bind("click", function() { showOverlay("profile"); });
		break;
	case "profile" :
		$(".overlay").html(getProfileOverlay(selid));
		$('#backhandler').bind("click", function() { showOverlay("config"); });
		break;
	}
	
	$(".overlay").css("display","block");
}

function getConfigOverlay()
{
	shtml='<div class="innerConfig">';
	shtml+='<div id="backhandler" class="backicon"></div>';
	shtml+='<div class="configlistitem">Poubelle</div>';
	shtml+='<div class="configlistitem">Bus</div>';
	shtml+='<div id="cfg-show-my-profile" class="configlistitem">Mäi Profil</div>';
	shtml+='<div class="configlistitem">Meng Punkten</div>';
	shtml+='</div>';
	return shtml;
}

function getProfileOverlay(selid)
{
	shtml='<div class="innerProfile">';
	shtml+='<div id="backhandler" class="backicon"></div>';
	let title="";
	if (selid>0)
	{
		console.log("selid > 0: "+selid);
		title="Profil";
	} else {
		console.log("selid < 0: "+selid);
		title="Mäi Profil";
		//myProfile
	}
	let myhouseid="003";
	shtml+='<div class="title-container"><div class="title">'+title+'</div></div>';
	shtml+='<div class="mahouse house-'+myhouseid+'"></div>';
	shtml+='<div class="txt underline">Bild wiesselen</div>';
	shtml+='</div>';
	return shtml;
}