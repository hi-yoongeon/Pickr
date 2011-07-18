$("userid").focus();


function doSignin( formData ){

  var option = {
    url : formData.getURL(),
    method : formData.getMethod(),
    paramString : formData.getQueryString(),
    onsuccess : function( response ){ callback( response );  }
  };
  new daum.Ajax(option).request();
}


function callback( res ){
    var json = eval( "(" + res.responseText + ")" );
    if( json.code == 200 ){
	window.location.reload();
    }else{
	alert(json.message);
    }
}

pickr.require("lib/FormData").run( function(){

				     var formData = new FormData("signin_form");
				     formData.reload();

				     formData.getFormElement().addEventListener("submit", function(){
										  formData.reload();
										  doSignin( formData );
										});

				   } );