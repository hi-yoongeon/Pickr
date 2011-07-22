function doSignup( formData ){

  var option = {
    url : formData.getURL(),
    method : formData.getMethod(),
    paramString : formData.getQueryString(),
    onsuccess : function( response ){ endSignup( response );  },
    onfailure : function( resposne ){ endSignup( response );  }
  };

  new daum.Ajax( option ).request();
}


function endSignup( response ){
  for ( r in response ){
    console.log( r + " => " + response[r] );
  }

  if( response.status === 200 ){

    var json = eval("(" + response.responseText + ")");

    if( json.code != 200 ){
      alert( json.message );
    }else{
      alert("회원가입 완료");
      window.location.href = "/";
    }

  }else{
    throw new Error( "회원가입 실패 다시 시도해주세요" );
  }
}

function confirmPassword( formData ){
  var data = formData.getFormData();
  var password = data["user[password]"];
  var password_confirm = data["password_confirmation"];

  if( password != password_confirm )  return false;
  return true;
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
										      return undefined;
										    });
				       });