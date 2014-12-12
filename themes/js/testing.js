function onBodyLoad(){
	document.addEventListener("deviceready",onDeviceReady,false);
}

function onDeviceReady(){
	$("#resultado").html("PhoneGap esta en marcha");
}