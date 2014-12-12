
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
			navigator.notification.confirm("Esto es una Confirmación", confirmCallback, "Confirmación!", ["Si","No"]);
		});
		$("#promt").click(function(){
			navigator.notification.prompt("Esto es un Promt", promptCallback, "Promt!", ["Si","Cancelar"], "Tu diras...");
		});
		$("#ruido").click(function(){
			navigator.notification.beeb(1);
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
function confirmCallback(butonIndex){
	$("#resultado2").append("Ha habido una confirmación y se a pulsado el boton"+ butonIndex +" <br>");
}
function promptCallback(buttonIndex, input){
	$("#resultado2").append("Ha habido un promt y Se ha pulsado el boton: "+buttonIndex+" y se ha escrito el texto : "+input+"<br>");
}
