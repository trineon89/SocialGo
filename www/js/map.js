var map;
var HomeIcon;
var HomeLocationLat, HomeLocationLong;
var firstrun;

setInterval(locate, 60000);

function locate() {
	map.locate();
}

function initMap() {
	map = L.map('mapcontainer').fitWorld();

	L.tileLayer('res/mapdata/{z}/{x}/{y}.png',
  {    maxZoom: 16  }).addTo(map);
/*
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);
*/
	/*
	L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
	//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18
	}).addTo(map);
	*/
	/*
	var gl = L.mapboxGL({
        attribution: '<a href="https://www.maptiler.com/license/maps/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
        accessToken: 'not-needed',
        style: 'https://maps.tilehosting.com/c/5000d791-e0b4-4048-8506-95d2c5d70a20/styles/closer/style.json?key=faSMrAuBms00D6cuc3ZC'
      }).addTo(map);
	*/
	map.locate({setView: true, maxZoom: 16});
	map.on('locationfound', onLocationFound);
	map.setView(new L.LatLng(49.6770297, 6.0017405), 13);
	defineIcons();
	setDefinedMarkers();
	firstrun=true;
	$('#burgericon').on("click", function(e) { showOverlay('config'); } );
}

function getMap() {
	shtml='<div id="mapcontainer"></div>';
	shtml+='<div id="homeicon" class="homeicon"></div>';
	shtml+='<div id="burgericon" class="burgericon"></div>';
	//shtml+='<div id="homesettings" class="homesettings">';
	//shtml+=getSettingsMenu();
	//shtml+='</div>';
	//shtml+='<div id="communechat" class="layer w-100 fxg-1 bgc-grey-200 scrollable pos-r ps"></div>';
	return shtml;
}

function setDefinedMarkers() {
	HomeLocationLat=49.6565574;
	HomeLocationLong=5.9912824;
	L.marker([HomeLocationLat, HomeLocationLong], {icon: HomeIcon, alt: "_home_"}).addTo(map);
	L.marker([49.671669, 6.034062], {icon: SchoolIcon, alt: "_school_"}).addTo(map);
	L.marker([49.667418, 6.034672], {icon: CommuneIcon, alt: "_commune_"}).addTo(map);
	L.marker([49.665673, 6.030050], {icon: PlaygroundIcon, alt: "_playground_"}).addTo(map);
	L.marker([49.672954, 6.034673], {icon: JukiIcon, alt: "_juki_"}).addTo(map);
	/* MINISTERES */
	L.marker([49.609550, 6.132113], {icon: MinistIcon, alt: "_minist_etat_"}).addTo(map);
	L.marker([49.601776, 6.132867], {icon: MinistIcon, alt: "_minist_fonc_pub_"}).addTo(map);
	L.marker([49.611840, 6.135106], {icon: MinistIcon, alt: "_minist_aff_etr_"}).addTo(map);
	L.marker([49.605657, 6.138994], {icon: MinistIcon, alt: "_office_nat_enfance"}).addTo(map);
	L.marker([49.611186, 6.122878], {icon: MinistIcon, alt: "_minist_sante_"}).addTo(map);
	L.marker([49.612560, 6.125399], {icon: MinistIcon, alt: "_minist_fam_integ_"}).addTo(map);
	L.marker([49.608558, 6.131831], {icon: MinistIcon, alt: "_minist_cult_"}).addTo(map);
	L.marker([49.608384, 6.132055], {icon: MinistIcon, alt: "_minist_egal_"}).addTo(map);

	$('img[alt="_home_"]').on("click", function(e) {
		console.log(e);
		pageLoader("home");
	});
	$('img[alt="_school_"]').on("click", function(e) {
		pageLoader("school");
	});
	$('img[alt="_juki_"]').on("click", function(e) {
		pageLoader("jugendhaus");
	});
	$('img[alt="_commune_"]').on("click", function(e) { 
		//pageLoader("commune"); 
		var ref = cordova.InAppBrowser.open('http://www.kehlen.lu', '_system', 'location=yes');
	});
	$('img[alt="_playground_"]').on("click", function(e) {pageLoader("playground");});
	
	$('img[alt="_home_"]').bind("taphold", tapholdHandler);
	
	$('#settings_close').bind("click", function() {  $('#homesettings').css("display", "none"); });
}

function getCommuneChat() {
	$.ajax({
		type: "POST",
		url: "https://gamerest.jsdev.online/web/ajax/ajaxhandler.ajax.php",
		data: { request: 'getContentForPlaceJson', id: userid },
		success: function (result) {
			console.log(result.html);
			var thehtml=result.html;
			$('#communechat').html(thehtml);
		}
	});
}

function tapholdHandler(ev) {
	var target=ev.currentTarget;
	console.log("tapholdHandler");
	console.log(target);
	showOverlay("config");
}

function appendMapEventHandlers() {
	$("div.homeicon").bind("click", function(ev) {
		map.setView(new L.LatLng(HomeLocationLat, HomeLocationLong), 17);
	})
}

function onLocationFound(e) {
    //var radius = e.accuracy / 2;
	//console.log(e);
	if (firstrun)
	{
		L.marker(e.latlng).addTo(map);
		firstrun=false;
	}
        //.bindPopup("<script>togglePopup('home');</script>");
/*
    L.circle(e.latlng, radius).addTo(map);
	*/
	clearOld();
	setPosition(e.latitude, e.longitude, e);
//	L.on('click', function () {
	/*map.on('popupopen', function(f, e){
		togglePopup(f, e);
	});*/
}

function setPosition(thelat, thelong, e)
{
	console.log('Set position');
	$.ajax({
		type: "POST",
		url: "https://gamerest.jsdev.online/web/ajax/ajaxhandler.ajax.php",
		data: { request: 'setlastposition', id: userid, lat: thelat, long:thelong },
		success: function (result) {
			console.log(result);
			L.marker(e.latlng).addTo(map);
			getPlayersOnMap();
		}
	});
}

function getPlayersOnMap()
{
	console.log('getPlayersOnMap');
	$.ajax({
		type: "POST",
		url: "https://gamerest.jsdev.online/web/ajax/ajaxhandler.ajax.php",
		data: { request: 'getliveusers', id: userid },
		success: function (result) {
			console.log(result.positions);
			
			$.each(result.positions, function (ev) {
				console.log("inserting "+ev);
				L.marker([result.positions[ev].lat, result.positions[ev].long]).addTo(map).bindPopup(result.positions[ev].virnumm);
			});
			//L.marker(e.latlng).addTo(map);
		}
	});
}

function clearOld(home=false) {
	$.each(map._layers, function (ev) {
		var str = map._layers[ev].options.alt;
		if (str == undefined) {str="";}
		if (str.match(/_minist_/) || (str.match(/_office_/)))
		{
			console.log(str);
		} else {
			switch (map._layers[ev].options.alt)
			{
				case '_home_': 
					if (home) map._layers[ev].remove();
					break;
				case '_school_': 
					break;
				case '_commune_': 
					break;
				case '_playground_': 
					break;
				case '_juki_': 
					break;
				default: 
					if (map._layers[ev].options.alt != undefined)
					{
						map._layers[ev].remove();
					}
					break;
			}
		}
	});
}

function togglePopup(f, e) {
	if (document.getElementById('overlay').style.display == "none")
	{
		document.getElementById('overlay').style.display = "block";
	} else {
		document.getElementById('overlay').style.display = "none";
	}
	console.log("toggle");
	console.log(f);
	console.log(e);
}
/*
function MenuPopup() {
	$('#homesettings').css("display", "block");
}
function getSettingsMenu() {
	shtml='<div id="settings_close">X</div>';
	shtml+='<div id="settings_trash" class="settings_icon">Trash</div>';
	shtml+='<div id="settings_bus" class="settings_icon">Bus</div>';
	shtml+='<div id="settings_profile" class="settings_text">My Profile</div>';
	shtml+='<div id="settings_points" class="settings_text">My Points</div>';
	return shtml;
}
*/
function defineIcons() {
	HomeIcon = L.icon({
	    iconUrl: 'res/icons/home_house.png',
	    shadowUrl: 'res/icons/home_house_shadow.png',

	    iconSize:     [75, 75], // size of the icon
	    shadowSize:   [32, 32], // size of the shadow
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    shadowAnchor: [18, 90],  // the same for the shadow
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
	SchoolIcon = L.icon({
	    iconUrl: 'res/icons/school.png',
	    shadowUrl: 'res/icons/home_house_shadow.png',

	    iconSize:     [75, 75], // size of the icon
	    shadowSize:   [32, 32], // size of the shadow
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    shadowAnchor: [18, 90],  // the same for the shadow
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
	CommuneIcon = L.icon({
	    iconUrl: 'res/icons/commune.png',
	    shadowUrl: 'res/icons/home_house_shadow.png',

	    iconSize:     [75, 75], // size of the icon
	    shadowSize:   [32, 32], // size of the shadow
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    shadowAnchor: [18, 90],  // the same for the shadow
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
	PlaygroundIcon = L.icon({
	    iconUrl: 'res/icons/playground.png',
	    shadowUrl: 'res/icons/home_house_shadow.png',

	    iconSize:     [75, 75], // size of the icon
	    shadowSize:   [32, 32], // size of the shadow
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    shadowAnchor: [18, 90],  // the same for the shadow
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
	JukiIcon = L.icon({
	    iconUrl: 'res/icons/juki.png',
	    shadowUrl: 'res/icons/home_house_shadow.png',

	    iconSize:     [75, 75], // size of the icon
	    shadowSize:   [32, 32], // size of the shadow
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    shadowAnchor: [18, 90],  // the same for the shadow
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
	MinistIcon = L.icon({
	    iconUrl: 'res/icons/minist.png',
	    shadowUrl: 'res/icons/home_house_shadow.png',

	    iconSize:     [32, 32], // size of the icon
	    shadowSize:   [32, 32], // size of the shadow
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    shadowAnchor: [18, 90],  // the same for the shadow
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});
}