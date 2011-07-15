function doSignup( formData ){

  formData.reload();

  var option = {
    url : formData.getURL(),
    method : formData.getMethod(),
    paramString : formData.getQueryString(),
    onsuccess: function( response ){ endSignup( response );  }
  };

  console.log( option );
  console.log( formData );

  new daum.Ajax( option ).request();
}


function endSignup( response ){

  alert(response);

}


pickr.require( ["lib/FormData"] ).run( function(){
					 signup = new FormData("signup_form");
					 signup.getForm().addEventListener("submit", function(){
									     doSignup( signup );
									   });
			      } );