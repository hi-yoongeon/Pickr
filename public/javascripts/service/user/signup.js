function doSignup( formData ){

    var option = {
	url : formData.getURL(),
	method : formData.getMethod(),
	paramString : formData.getQueryString(),
	onsuccess: function( response ){ endSignup( response );  }
    };

    new daum.Ajax( option ).request();
}


function endSignup( response ){

    for ( r in response ){
	console.log( r + " => " +   );
    }
    
    if( response.statusText !== "OK" ){

	
	
    }else{
	
	throw new Error( "회원가입 실패 다시 시도해주세요" );
    }
}

function confirmPassword( formData ){
    var data = formData.getFormData();
    var password = data["data[User][password]"];
    var password_confirm = data["password_confirm"];

    if( password == password_confirm ){
	return true;
    }else{
	return false;
    }
}

pickr.require( ["lib/FormData"] ).run( function(){
    var formData = new FormData("signup_form");
    formData.getFormElement().addEventListener("submit", function(){
	formData.reload();

	if( !confirmPassword( formData ) ){
	    alert("입력한 비밀번호가 일치하지 않습니다.");
	    formData.clearPasswordFieldsValue();
	    return false;
	}	
	
	doSignup( formData );

	
	
    });
} );