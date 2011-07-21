console.log("Loaded Picture module");

if( typeof pickr === "undefined" ) var pickr = {};
pickr.picture = {};

pickr.picture.bookmark = function( url ){
  if( this.isBookmarked( url ) ){
    this.remove( url );
  }else{
    this.add( url );
  }
};

pickr.picture.isBookmarked = function( url ){
  return false;
};


pickr.picture.add = function( url ){
  console.log(url + " add bookmark");

};

pickr.picture.remove = function( url ){
  console.log(url + " remove bookmark");

};

