console.log("Loaded Auth module");

if( typeof pickr === "undefined" ) var pickr = {};
pickr.auth = {};

pickr.auth.signin = function(userid, password, win){

  var opt = {
    "url" : pickr._option.URL + "/user/signin",
    "method" : "POST",
    "paramString" : "user[userid]=" + userid + "&user[password]=" + password,
    "onsuccess" : function(res){
      var json = eval("(" + res.responseText + ")" );
      if( json.code == 200 ){
	pickr.localStorage.setAccessToken( json.data.user.access_token  );
	window.location.reload();
	win.close();
      }
      else{
	alert( json.message );
      }
    }
  };

  new daum.Ajax(opt).request();

};

pickr.auth.signout = function(){

};


