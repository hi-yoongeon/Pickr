function pickingDisplayOn(){
    chrome.browserAction.setBadgeText({text: "on"});
    chrome.browserAction.setBadgeBackgroundColor({color: [0,0,255,200]});
}

function pickingDisplayOff(){
    chrome.browserAction.setBadgeText({text: "off"});
    chrome.browserAction.setBadgeBackgroundColor({color: [255,0,0,200]});
}

function pickingToggle(){
    if( pickr.localStorage.getPickingOption() === "OFF" ){
	pickingDisplayOn();
	pickr.localStorage.setPickingOption("ON");
    }else{
	pickingDisplayOff();
	pickr.localStorage.setPickingOption("OFF");
    }
}

function setBrowserActionEventPicking(){
    chrome.browserAction.onClicked.addListener(function(tab){
	pickingToggle();	
    });
}

function setBrowserActionEventSignin(){
    console.log("signin popup");
    chrome.browserAction.setPopup({
	"popup" : "login.html"
    });
}


(function(){

    if( typeof pickr.localStorage.getAccessToken() !== "undefined" ){	
	setBrowserActionEventPicking();
    }else{
	setBrowserActionEventSignin();
    }
})();



chrome.extension.onRequest.addListener(function( request, sender, sendResponse ){
					 if( request.type === "documentReady" ){
					   var data = {
					     pickrOption : pickr._option,
					     onPicking : true
					   };
					   chrome.tabs.sendRequest( sender.tab.id, data );
					 }else if( request.type === "bookmark" ){
					   pickr.picture.bookmark( request.url );
					 }
				       });
