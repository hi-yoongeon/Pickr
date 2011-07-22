console.log("Loaded Picture module");

if( typeof pickr === "undefined" ) var pickr = {};
pickr.picture = {};

pickr.picture.bookmark = function( url ){
  var _this = this;
  this.isBookmarked( url, function( res ){
		       var json = eval("(" + res.responseText + ")");

		       if( json.is_bookmark === true ){
			 _this.remove( url );
		       }else{
			 _this.add( url );
		       }

		     });


};

pickr.picture.isBookmarked = function( url, callback ){

  var opt = {
    method : "GET",
    url : pickr._option.URL + "/picture/is_bookmark",
    paramString : "picture[url]=" + url  + "&access_token=" + pickr.localStorage.getAccessToken(),
    onsuccess : function(res){
      callback( res );
    }
  };
  new daum.Ajax(opt).request();

  return false;

};


pickr.picture.add = function( url ){
  console.log(url + " add bookmark");

  var opt = {
    method : "POST",
    url : pickr._option.URL + "/picture/add",
    paramString : "picture[url]=" + url  + "&access_token=" + pickr.localStorage.getAccessToken()
  };

  new daum.Ajax(opt).request();

};

pickr.picture.remove = function( url ){
  console.log(url + " remove bookmark");

  var opt = {
    method : "POST",
    url : pickr._option.URL + "/picture/del",
    paramString : "picture[url]=" + url  + "&access_token=" + pickr.localStorage.getAccessToken()
  };

  new daum.Ajax(opt).request();

};

