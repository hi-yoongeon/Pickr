var pickr = ( typeof pickr === "undefined" ) ? {} : pickr;
pickr._option = {
    URL : "http://localhost:3000",
    ACCESS_TOKEN_FIELD_NAME : "accessToken",
    PICKING_VALUE_FIELD_NAME : "picking",
    LEAST_IMAGE_SIZE : {
      WIDTH : 100,
      HEIGHT : 100
    }
};


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