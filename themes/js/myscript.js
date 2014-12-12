
$(document).bind("mobileinit",function() {

	$( document ).on( "pageshow", "#acelerometro", function( event ) {
		alert('asda');
		$("#resultado").html("PhoneGap esta en marcha");	
		//navigator.accelerometer.getCurrentAcceleration(onInfo, onError);
		//var watch = navigator.accelerometer.watchAcceleration(onInfo,OnError,{frequency: 3000 });
		var watchID= navigator.accelerometer.watchAcceleration(onSuccess, onError, {frequency: 3000 });
	});

});

//Custom functions
function onSuccess(acceleration) {
    $("#resultado").html('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
};

function onError() {
    alert('onError!');
};
