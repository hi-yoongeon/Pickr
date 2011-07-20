var pickr = {};

pickr._option = {
    URL : "http://localhost:3000",
    ACCESS_TOKEN_FIELD_NAME : "accessToken",
    PICKING_VALUE_FIELD_NAME : "picking",
    IMAGE_MIN_WIDTH : 200,
    IMAGE_MIN_HEIGHT : 200
};




pickr.user = {};
pickr.picture = {};
pickr.localStorage = {};


pickr.picking = {
    getValue : function(){
	return localStorage.getItem(pickr._option.PICKING_VALUE_FIELD_NAME) || "off";
    },
    setValue : function(v){
	localStorage.setItem(pickr._option.PICKING_VALUE_FIELD_NAME, v);
    },
    toggle : function(tab){
	var picking = pickr.picking.getValue();
	if( picking == "on" ) pickr.picking.set("off");
	else pickr.picking.set("on");
	chrome.tabs.sendRequest(tab.id, {
	    "picking" : pickr.picking.getValue(),
	    "img_width" : pickr._option.IMAGE_MIN_WIDTH,
	    "img_height" : pickr._option.IMAGE_MIN_HEIGHT
	});
    },
    set : function(sw){
	if( typeof sw === "undefined" ) sw = pickr.picking.getValue();
	var color = [0,0,255,200];
	if( sw != "on" && sw != "" ){ color = [255,0,0,200]; sw = "off"; }

	this.setValue(sw);
	chrome.browserAction.setBadgeText({ "text" : sw });
	chrome.browserAction.setBadgeBackgroundColor({"color" : color });
    },
    setup : function(){
	if(pickr.auth.getAccessToken() == null ){
	    chrome.browserAction.setPopup({ popup : "login.html" });
	    this.set("");
	}else{
	    chrome.browserAction.setPopup({ popup : "" });
	    this.set();

	    chrome.browserAction.onClicked.removeListener(pickr.picking.event);
	    chrome.browserAction.onClicked.addListener(function(tab){
		pickr.picking.event = arguments.callee;
		pickr.picking.toggle(tab);
	    });
	}
    },
    reset : function(){
	localStorage.removeItem(pickr._option.ACCESS_TOKEN_FIELD_NAME);
	localStorage.removeItem(pickr._option.PICKING_VALUE_FIELD_NAME);
	this.setup();
    }
};

pickr.auth = {
    setAccessToken : function(token){
	localStorage.setItem(pickr._option.ACCESS_TOKEN_FIELD_NAME, token);
	return token;
    },
    getAccessToken : function(){
	return localStorage.getItem(pickr._option.ACCESS_TOKEN_FIELD_NAME);
    },
    login : function(userid, passwd, callback){
	var _this = this;
	new daum.Ajax({
	    "url" : pickr._option.URL + "/user/login",
	    "method" : "POST",
	    "onsuccess" : function(res){
		_this.setAccessToken("token");
		pickr.picking.setup();
		callback(res);
	    }
	}).request();
    },
    logout : function(){
	new daum.Ajax({
	    "url" : pickr._option.URL + "/user/logout",
	    "method" : "GET",
	    "onsuccess" : function(res){
		// 실패와 성공 분기문 필요
		pickr.picking.reset();
		//pickr.picking.set();
	    }
	}).request();
    }
};

// 로그인이 되어있는지!
pickr.picking.setup();