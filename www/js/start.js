function getStartContent() {
	var shtml='';
	shtml+='<div id="start_weathercontainer"><p id="temperature"></p></div>';
	shtml+='<div id="start_buttonscontainer">';
	shtml+='<p class="mod">Don\'t forget your umbrella!</p>';
	shtml+='<input type="button" class="button btn-trans" id="start_login" value="LOGIN" />';
	shtml+='<input type="button" class="button btn-green" id="start_register" value="REGISTER" />';
	shtml+='</div>';
	shtml+=getLoginWindow();
	shtml+=getRegisterWindow();
	return shtml;
}

function getLoginWindow() {
	var shtml='';
	shtml+='<div id="login_window">';
	shtml+='<label for="username" class="button login-elements login-label">Username (Email)</label>';
	shtml+='<input type="email" id="username" name="username" class="button login-elements" />';
	shtml+='<label for="password" class="button login-elements login-label">Password</label>';
	shtml+='<input type="password" id="password" name="password" class="button login-elements" />';
	shtml+='<input type="submit" id="subm" name="subm" value="LOGIN" class="button login-elements" />';
	shtml+='<div class="backicon" id="login_back"></div>';
	shtml+='</div>';
	return shtml;
}

function getRegisterWindow() {
	var shtml='';
	shtml+='<div id="register_window">';
	shtml+='<label for="rusername" class="button login-elements login-label">Email</label>';
	shtml+='<input type="email" id="rusername" name="rusername" class="button login-elements" />';
	shtml+='<label for="name" class="button login-elements login-label">Numm</label>';
	shtml+='<input type="text" id="name" name="name" class="button login-elements" />';
	shtml+='<label for="surname" class="button login-elements login-label">Virnumm</label>';
	shtml+='<input type="text" id="surname" name="surname" class="button login-elements" />';
	shtml+='<label for="rpassword" class="button login-elements login-label">Password</label>';
	shtml+='<input type="password" id="rpassword" name="rpassword" class="button login-elements" />';
	shtml+='<input type="submit" id="regis" name="regis" value="REGISTER" class="button login-elements" />';
	shtml+='<div class="backicon" id="register_back"></div>';
	shtml+='</div>';
	return shtml;
}

function start_appendEventHandlers() {
	$('#start_login').bind("click", function() { 
		if ((config.getEmail()!=null) && (config.getId()!=null))
		{
			console.log("quicklogin launch");
			quicklogin();
		} else {
			console.log("no quicklogin available");
			$('#login_window').css("display","block"); 
		}
	});
	$('#login_back').bind("click", function() { $('#login_window').css("display","none"); });
	$('#start_register').bind("click", function() { $('#register_window').css("display","block"); });
	$('#register_back').bind("click", function() { $('#register_window').css("display","none"); });
	$('#subm').bind("click", function() { start_login($('#username').val(), $('#password').val()) });
	$('#regis').bind("click", function() { start_register(); });
}

function quicklogin()
{
	let mail=config.getEmail();
	let id=config.getId();
	$.ajax({
		type: "POST",
		url: "https://gamerest.jsdev.online/web/ajax/ajaxhandler.ajax.php",
		data: { request: 'quicklogin', mail:mail, id:id },
		success: function (result) {
			if(result.success==true)
			{
				config.setEmail(result.email);
				config.setName(result.name);
				config.setSurname(result.surname);
				config.setId(result.id);
				console.log(result);
				pageLoader('map');
			} else {
				alert('Automatësch aloggen huet net geklappt!');
			}
		}
	});
}

function start_login(mail,pw)
{
	$.ajax({
		type: "POST",
		url: "https://gamerest.jsdev.online/web/ajax/ajaxhandler.ajax.php",
		data: { request: 'login', email:mail, pass:pw },
		success: function (result) {
			if(result.success==true)
			{
				config.setEmail(result.email);
				config.setName(result.name);
				config.setSurname(result.surname);
				config.setId(result.id);
				storage.setItem('mail', uemail);
				storage.setItem('id', userid);
				console.log(result);
				pageLoader('map');
			} else {
				alert('Ups, do ass wuel eppes schief gelaf...');
			}
		}
	});
}

function start_register()
{
	let uname=$('#rusername').val();
	pw=$('#rpassword').val();
	nme=$('#name').val();
	surnme=$('#surname').val();
	$.ajax({
		type: "POST",
		url: "https://gamerest.jsdev.online/web/ajax/ajaxhandler.ajax.php",
		data: { request: 'register', name: nme, surname: surnme, email:uname, pass:pw },
		success: function (result) {
			if(result.success==true)
			{
				config.setName(uname);
				start_login(config.getName(), $('#rpassword').val());
			} else {
				alert('Ups, do ass wuel eppes schief gelaf...');
			}
		}
	});
}