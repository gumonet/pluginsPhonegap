function onBodyLoad(){
	document.addEventListener("deviceready",onDeviceReady,false);
}

function onDeviceReady(){
	$("#resultado").html("PhoneGap esta en marcha");
	
	navigator.accelerometer.getCurrentAcceleration(onInfo, onError);
	var watch = navigator.accelerometer.watchAcceleration(onInfo,OnError,{frequency:1000});
}

function onInfo(acceleration) {
    $("#resultado").html('Acceleration X: ' + acceleration.x + '<br>' +
          'Acceleration Y: ' + acceleration.y + '<br>' +
          'Acceleration Z: ' + acceleration.z + '<br>' +
          'Timestamp: '      + acceleration.timestamp + '<br>');
};

function onError() {
    alert('onError!');
};