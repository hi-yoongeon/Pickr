
var ddd = function(){

};

if( typeof pickr )



/*
var pickr = {
    picking : {
	_bool : false,
	on : function(){
	    this._bool = true;
	},
	off : function(){
	    this._bool = false;
	},
	toggle : function(ba){
	    if(this._bool){
		this._bool = false;

		chrome.browserAction.setBadgeText({text: "off"});
		chrome.browserAction.setBadgeBackgroundColor({color: [255,0,0,200]});
	    }else{
		this._bool = true;

		chrome.browserAction.setBadgeText({text: "on"});
		chrome.browserAction.setBadgeBackgroundColor({color: [0,0,255,200]});
	    }
	}
    }

};

*/



/*
chrome.extension.onRequest.addListener(
    function(){
	alert("test");
    }
);


var test = function(){
    console.log("test");
};


chrome.tabs.sendRequest(test);
*/



/*
chrome.browserAction.onClicked.addListener(function(tab){
    pickr.picking.toggle();

});
*/
/*
chrome.tabs.onUpdated.addListener(function(tabId, obj){

//    chrome.pageAction.show(tabId);
});

*/
