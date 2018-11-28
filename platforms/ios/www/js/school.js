function getSchool() {
	var shtml='';
	shtml+='<div id="school_container">';
	shtml+='<div id="school_top_container"><div id="school_top"></div></div>';
	shtml+='<div id="school_bottom_container"><div id="school_bottom"><div class="ico ico-type"></div><div class="ico ico-emoji"></div>';
	shtml+='<div><textarea type="text" id="typebox"></textarea><div class="outertextarea"></div></div></div>';
	shtml+='</div>';
	shtml+='<div class="backicon" id="school_back"></div>';
	return shtml;
}

function initSchool() {
	$('#school_back').bind("click", function() { pageLoader('map'); });
	$('.ico-type').bind("click", function() { $('#typebox').css('height','auto'); $('#typebox').css('padding','5px'); $('#typebox').focus(); });
	$('textarea').each(function () {
	  this.setAttribute('style', 'height:' + (this.scrollHeight-20) + 'px;overflow-y:hidden;');
		}).on('input', function () {
		  this.style.height = 'auto';
		  this.style.height = (this.scrollHeight) + 'px';
	});	
	$('.outertextarea').bind("click", function(){
		sendMessageSchool();
		$('#typebox').css('height','0');
		$('#typebox').css('padding','0px');
		$('#typebox').val('');
	});
	getMessages();
}

var messages;

function scrollToBottom() {
    var element = document.getElementById("school_top");
    element.scrollTop = element.scrollHeight;
}

function getMessages()
{
	$.ajax({
		type: "POST",
		url: "https://gamerest.jsdev.online/web/ajax/ajaxhandler.ajax.php",
		data: { request: 'getschoolchat', myid: userid },
		success: function (result) {
			console.log(result);
			messages=result;
			var messageoutput="";
			$.each(messages, function(i, item) {
				//console.log("i:"+i+"item:"+item);
				let classsel="msg-default";
				if (item.self) {classsel="msg-self";}
				messageoutput+="<div class='message "+classsel+"'>";
				messageoutput+="<span class='messagetext'>"+item.message+"</span><span class='messagetime'>"+item.timestamp+"</span>";
				messageoutput+="</div>";
			});
			
			$('#school_top').html(messageoutput);
			scrollToBottom();
		}
	});
}

function sendMessageSchool()
{
	if ($('#typebox').val().length>0)
	{
		console.log( $('#typebox').val() );
		let msg=$('#typebox').val();
		
		$.ajax({
			type: "POST",
			url: "https://gamerest.jsdev.online/web/ajax/ajaxhandler.ajax.php",
			data: { request: 'sendschoolchat', id: userid, message: msg },
			success: function (result) {
				console.log(result);
				getMessages();
			}
		});
	}
}