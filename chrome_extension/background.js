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
  pickingDisplayOff();
  pickr.localStorage.setPickingOption("OFF");

  chrome.browserAction.setPopup({ popup : "" });
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

function signin( userid, password, win ){
  pickr.auth.signin( userid, password, win );
}


function initBrowserAction(){
    if( typeof pickr.localStorage.getAccessToken() !== "undefined" ){
	setBrowserActionEventPicking();
    }else{
	setBrowserActionEventSignin();
    }
}


initBrowserAction();

chrome.extension.onRequest.addListener(function( request, sender, sendResponse ){
					 if( request.type === "documentReady" ){
					   var data = {
					     pickrOption : pickr._option,
					     onPicking : true
					   };
					   chrome.tabs.sendRequest( sender.tab.id, data );
					 }else if( request.type === "bookmark" ){
					   pickr.picture.bookmark( request.url );
					 }else if( request.type === "is_bookmark" ){
					   pickr.picture.isBookmarked( request.url, function(res){
									 console.log("calle");
									 console.log( res );
									 chrome.tabs.sendRequest( sender.tab.id ,{ type: "is_bookmark_callback", response : res });
								       } );
					 }
				       });
