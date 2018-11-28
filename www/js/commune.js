function getCommune() {
	var shtml='';
	shtml+='<div id="commune_container">';
	shtml+='</div>';
	shtml+='<div class="backicon" id="commune_back"></div>';
	return shtml;
}

function initCommune() {
	$('#commune_back').bind("click", function() { pageLoader('map'); });
}