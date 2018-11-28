setInterval(updateUsersOnline, 15000);

var onlineObj;
var virtObj;

window.onclick = function(event) {
	console.log(event.target);
	// if (event.target == document.getElementById('jungendhaus_container')) { document.getElementById('jugendhaus_activities_container').style.display="none"; }
}

function getJugendhaus() {
	shtml='<div id="jungendhaus_container">';
	shtml+='<div class="jugendhaus_image_container">';
	shtml+='<img id="jugendhaus_image" src="res/bg/juki_background.png" usemap="#image-map-jugend"/>';
	shtml+='<map name="image-map-jugend" id="image-map-jugend">';
	shtml+='   <area target="" alt="activities" title="activities" href="#activities" coords="3862,189,4315,465,4303,859,3849,587" shape="poly">';
	shtml+='</map></div>';
	shtml+='</div>';
	shtml+='<div id="back_handler" class="backicon"></div>';
	shtml+='<div class="bubble_container" id ="bubble_container">';
	shtml+='<div id="bubble_online_container"><span class="online-icon"></span><div class="bubble_online" id ="bubble_online">3</div></div>';
	shtml+='<div style="width:100%;"></div>';
	shtml+='<div id="bubble_virtual_container"><span class="virtonline-icon"></span><div class="bubble_virt_online" id ="bubble_virt_online">34</div></div>';
	shtml+='</div>';
	shtml+=showActivities();
	shtml+=showUsersPopupList();
	return shtml;
}

function initJugendhaus() {
	//$('img#jugendhaus_image[usemap]').rwdImageMaps();
	$('map').imageMapResize();
	//$('img[usemap]').maphilight({ stroke: true,strokeColor: 'FF0000',strokeWidth:3, fillColor: '009DDF', fillOpacity: 0 ,alwaysOn: true});
	$('area').on('click', function() {
		var clickeditem = $(this).attr('alt');
		/*
		if (clickeditem=="wecker")
		{
			alert("Hey ass de Wecker");
		}
		*/
		console.log($(this).attr('alt'));
		$('#jugendhaus_'+clickeditem+'_container').css("display", "block");
		var mySwiper = new Swiper ('.swiper-container', {
			mode:'horizontal',
			loop: true,
			pagination: {
			  el: '.swiper-pagination',
			  clickable: true,
			}
		});
		//pageLoader(clickeditem);
	})
	$('#back_handler').on('click', function() {pageLoader('map');});
	$('#swiper-close').on('click', function() {$('#jugendhaus_activities_container').css("display", "none");});
	
	$('#bubble_online_container').on('click', function() {juki_showOnline(onlineObj,"real"); } );
	$('#bubble_virtual_container').on('click', function() {juki_showOnline(virtObj,"virt"); } );
	
	updateUsersOnline();
}

function showActivities() {
	shtml='<div id="jugendhaus_activities_container">';
	shtml+='';
	shtml+='<link rel="stylesheet" href="css/swiper.min.css">';
	shtml+='<div id="jugendhaus_activities">';
	shtml+=' <div class="swiper-container">';
	shtml+='  <div class="swiper-wrapper">';
	shtml+='      <div class="swiper-slide" style="background-color:#d5ffd5;">'+slide1Content()+'</div>';
	shtml+='      <div class="swiper-slide" style="background-color:#d3d3f9;">'+slide2Content()+'</div>';
	shtml+='      <div class="swiper-slide" style="background-color:#f7d4d4;">'+slide3Content()+'</div>';
	shtml+='  </div>';
	shtml+='<div class="swiper-pagination"></div>';
	shtml+='<div class="closer" id="swiper-close"></div>';
	shtml+=' </div>';
	shtml+='</div>';
	shtml+='</div>';
	return shtml;
}


function juki_showOnline(theObj,plc) {
	console.log(theObj);
	if (theObj.length===0)
	{
		if (plc=="real") { alert("Sorry keen matt der App do"); }
		if (plc=="virt") { alert("Sorry keen an der App do"); }
		return;
	}
	$('#userpopuplist').css("display", "block");
}



function updateUsersOnline() {
	$.ajax({
		type: "POST",
		url: "https://gamerest.jsdev.online/web/ajax/ajaxhandler.ajax.php",
		data: { request: 'getonlineusers', location: 4 },
		success: function (result) {
			console.log(result);
			$('#bubble_online').text(result.real);
			$('#bubble_virt_online').text(result.virtual);
			onlineObj = result.realobj;
			virtObj = result.virtobj;
		}
	});
}
function slide1Content() {
	return '<h1 style="text-align:center;margin-top:50px;">Aktivitéiten fir haut:</h1><ul style="font-size: large;"><li style="padding: 10px 2px;">zesummen akaafe goen</li><li style="padding: 10px 2px;">baaken</li><li style="padding: 10px 2px;">de JuKi opraumen</li></ul>';
}
function slide2Content() {
	return '<h1 style="text-align:center;margin-top:50px;">Juki-Punkten:</h1><ul style="font-size: large;"><li style="padding: 10px 2px;">Jeff: 32</li><li style="padding: 10px 2px;">Paul: 23</li><li style="padding: 10px 2px;">Thierry: 7</li></ul>';
}
function slide3Content() {
	return '<h1 style="text-align:center;margin-top:50px;">Juki-Regelen:</h1><ul style="font-size: large;"><li style="padding: 10px 2px;">héifflesch sinn</li><li style="padding: 10px 2px;">Material vum Juki gehéiert dem Juki</li><li style="padding: 10px 2px;">Spaass hunn</li></ul>';
}