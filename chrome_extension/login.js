var background = chrome.extension.getBackgroundPage();

window.addEventListener("load", function(){

			  document.getElementById("login_form").addEventListener("submit", function(){
										   var userid = $("userid").value;
										   var passwd = $("password").value;

										   background.signin( userid, passwd, window );



//										   pickr.auth.login(userid, passwd, function(res){
//												      window.close();
//												    });

										   return false;
										 });

			});

