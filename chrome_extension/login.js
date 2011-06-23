var pickr = chrome.extension.getBackgroundPage().pickr;

window.addEventListener("load", function(){

    document.getElementById("login_form").addEventListener("submit", function(){
	var userid = "ygmaster";
	var passwd = "djflejfl";
	
	pickr.auth.login(userid, passwd, function(res){
	    window.close();
	});

	return false;
    });

});

