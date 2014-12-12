
$(document).bind("mobileinit",function() {

	$( document ).on( "pageshow", "#acelerometro", function( event ) {
		$("#resultado").html("PhoneGap esta en marcha");	
		//navigator.accelerometer.getCurrentAcceleration(onInfo, onError);
		//var watch = navigator.accelerometer.watchAcceleration(onInfo,OnError,{frequency: 3000 });
		var watchID= navigator.accelerometer.watchAcceleration(onSuccess, onError, {frequency: 3000 });
		//navigator.accelerometer.clearWatch(watchID);
	});
	
	$( document ).on( "pageshow", "#notification", function( event ) {
		//navigator.notification.alert(message, alertCallback, [title], [buttonName])
		$("#alerta").click(function(){
			navigator.notification.alert("Esto es una Alerta", alertCallback, "Alerta!", "cierrame");
		});
		
		$("#confirmacion").click(function(){
			navigator.notification.confirm(
				'You are the winner!', // message
				 onConfirm,            // callback to invoke with index of button pressed
				'Game Over',           // title
				['Restart','Exit']     // buttonLabels
			);
		});
		
		$("#promt").click(function(){
			navigator.notification.prompt(
				'Please enter your name',  // message
				onPrompt,                  // callback to invoke
				'Registration',            // title
				['Ok','Exit'],             // buttonLabels
				'Jane Doe'                 // defaultText
			);
		});
		$("#ruido").click(function(){
			navigator.notification.beep(2);
			navigator.notification.vibrate(1000);
		});
	});

});



//Acelerometter
function onSuccess(acceleration) {
    $("#resultado").html('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
};

function onError() {
    alert('onError!');
};


//Notifications
function alertCallback(){
	$("#resultado2").append("La ventana se ha cerrado<br>");
}
function onConfirm(buttonIndex) {
    $("#resultado2").append("Ha habido una confirmación y se a pulsado el boton"+ buttonIndex +" <br>");
}
function onPrompt(results) {
    $("#resultado2").append("You selected button number " + results.buttonIndex + " and entered " + results.input1+"<br>");
}

