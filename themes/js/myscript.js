var $path = 'http://services.gumonet.com/PrimerApp/Serv_PrimerApp.php'
//var $path = 'http://localhost/servicesApp/PrimerApp/Serv_PrimerApp.php'
var $idPersonal;
$(document).bind("mobileinit",function() {
	$.mobile.defaultPageTransition = "slideDown";
	$.mobile.loadingMessage = "Inicializando...";

	$( document ).on( "pageshow", "#index", function( event ) {
			loadData();
			$("#loadData").click(function(event) {
				loadData();
			});
	});

	$( document ).on( "pageinit", "#created", function( event ) {
		$("#btnSaveData").click(function(event) {
			saveData(true);
		});

	});

	$( document ).on( "pageshow", "#edit", function( event ) {
		$.getJSON($path, {option: 'getEdit', idData:$idPersonal}, function(json, textStatus) {				
			$("#idData").val($idPersonal);
			$("#nombreE").val(json[0].nombre);
			$("#apellidoE").val(json[0].apellido);
			$("#cargoE").val(json[0].cargo);
			$("#nacimientoE").val(json[0].nacimiento);
		});

		$("#btnSaveEditData").click(function(event) {
			saveData(false);
		});

	});

});

//Funciones
function loadData(){
	$table = $(".personal-table");
	$tableBody = $("#body-data");
	$tableBody.empty();
	$.getJSON($path, {option: 'getAll'}, function(json, textStatus) {
	  var $html = '';
	  $.each(json, function(i, item) {
	  	 $html+='<tr>';
		     $html+='<td>'+item.nombre_completo+'</td>';
		     $html+='<td>'+item.cargo+'</td>';
		     $html+='<td>'+item.nacimiento+'</td>';
		     $html+='<td align="center"> <button id="'+item.id_personal+'" class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-notext ui-custom-btn btnDelete" data-mini="true" >Icon only</button> <span style="margin: 0px 5dpi;"></span>';
		     $html+='<button id="'+item.id_personal+'" class="ui-btn ui-btn-inline ui-icon-edit ui-btn-icon-notext ui-custom-btn btnEdit" data-mini="true" >Icon only</button>';
		  $html+='</td></tr>';
	  });	 
	  $tableBody.html($html);
	  $table.table("refresh");	  
	  $(".btnDelete").click(function(event) {
	  	var $idData = $(this).attr('id');
	  	deleteData($idData);
	  });
	  $(".btnEdit").click(function(event) {
	  	$idPersonal = $(this).attr('id');
	  	$.mobile.changePage("#edit",{transition: "slideup"});
	  });


	});
	
}
function saveData($type){
	var $url; 
	var $form;
	if($type){
		$url = $path+'?option=create'
		$form = $("#create-form");
	}else{
		$url = $path+'?option=update'
		$form = $("#edit-form");
	}	
	$.ajax({
		url: $url,
		type: 'POST',
		data: $form.serialize(),
	})
	.done(function(data) {
		if(data != "0"){
			console.log(data)
			formReset();
			$.mobile.changePage("#index",{transition: "slideup"});
		}		
	})
	.fail(function() {
		console.log("error");
	})
}

function formReset(){
	$('input').not('[type="button"]').val('');
    $('select').val('');
    $('textarea').val('');
}

function deleteData($idData){
	$.get($path,{option:'delete',idData:$idData}, function(data) {
		if(data === '1'){
			alert('Registro eliminado correctamente');
			loadData();
		}
		else{
			alert('Ocurrio un Error al intentar eliminar el registro');
		}
	});
}
