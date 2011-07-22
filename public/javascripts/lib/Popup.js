function Popup(option){

  var _this = this;

  var factoryElement = function(element){
    element = $(element);
    if( !element ){ element = daum.createElement("<div></div>"); }
    return element;
  };

  this._option = option;
  this._element = factoryElement( option.id );
}

Popup.prototype.on = function(){
  document.body.insertBefore(this._element);
  this._element.popup( this._option );
};

(function(){

   var _option = {
     width : 400,
     height : 200
   };


   Element.prototype.popup = function(){
     var _this = this;
     var option = daum.extend( _option, arguments[0] );
     var ajaxCall = function(url){
       var ajax = {
	 url : url,
	 method : "get",
	 onsuccess : function( res ){
	   console.log( res.responseText );
	   _this.innerHTML = res.responseText;
	 }
       };
       new daum.Ajax(ajax).request();
     };

     $E(this).setCssText("position: absolute; z-index : 100; background-color: #fff; top: 0; left: 0; width: " + option.width + "px; height: " + option.height + "px;");
     if( typeof option.url !== "undefined" ) ajaxCall( option.url );
   };


})();


