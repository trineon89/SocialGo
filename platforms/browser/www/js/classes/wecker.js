class Wecker {
    constructor(){

    }
    generateHtml()
    {
        this._html='<div class="title-container"><div class="title">alarm clock</div><div id="home_wecker_closer" class="closer"></div></div><div class="clock"><div class="inner"><div class="hour hand"></div><div class="minute hand"></div><div class="graduations"><div class="graduation"></div><div class="graduation"></div><div class="graduation"></div><div class="graduation"></div><div class="graduation"></div><div class="graduation"></div><div class="graduation"></div><div class="graduation"></div><div class="graduation"></div><div class="graduation"></div><div class="graduation"></div><div class="graduation"></div></div></div></div>\
        <div><form><div class="relative-sel"><span class="clock-select">8:00</span><label for="flip-clock-set" class="ui-hidden-accessible">Flip toggle switch:</label><div class="alignright"><select data-role="flipswitch" name="flip-clock-set" id="flip-clock-set"> <option value="0">Aus</option>\
        <option value="1">Un</option></select></div></div><div class="relative-sel"><span class="text-inline">Juki News</span><label for="flip-clock-set" class="ui-hidden-accessible">Flip toggle switch:</label><div class="alignright"><select data-role="flipswitch" name="flip-jukinews-set" id="flip-jukinews-set"> <option value="0">Aus</option>\
        <option value="1">Un</option></select></div></div><div class="relative-sel"><span class="text-inline">Meteo</span><label for="flip-clock-set" class="ui-hidden-accessible">Flip toggle switch:</label><div class="alignright"><select data-role="flipswitch" name="flip-meteo-set" id="flip-meteo-set"> <option value="0">Aus</option>\
        <option value="1">Un</option></select></div></div></form></div></div>';
    }
    show(parent) {
        this.generateHtml();
        $(parent).html(this._html);
        this._clock = new Clock();
        //$('<span />',{class:'apps '+anApp._Appname}).appendTo(parent);
        parent.style.display="block";
        this.AppendHandlers();
    }
    AppendHandlers() {
        $('#home_wecker_closer').on("click", function() {$('#home_wecker').css("display", "none");});
        $('#flip-clock-set').flipswitch({});
        $('#flip-jukinews-set').flipswitch({});
        $('#flip-meteo-set').flipswitch({});
        $("#flip-clock-set").on("change", this.flipClockChanged);

        $('.clock-select').on("click", function(){
            console.log("open DateTimePicker");
            var options = {
                date : new Date(),
                mode : 'time'
            };
            datePicker.show(options, this.onSuccess, this.onError);
            /*
            window.DateTimePicker.pick(options, function (timestamp) {
                $('#clock-select').text(timestamp);
            });
            */
        });
    }

    flipClockChanged() {
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
    onSuccess(date) {
        //alert('Selected date: ' + date);
        //console.log(date.getHours());
        var rmin=date.getMinutes();
        if (rmin <= 9) {rmin="0"+rmin;}
        var time=date.getHours()+":"+rmin;
        
        $('.clock-select').text(time);
        storage.setItem('clock-time',time);
    }
    
    onError(error) { // Android only
        alert('Error: ' + error);
    }
    
}