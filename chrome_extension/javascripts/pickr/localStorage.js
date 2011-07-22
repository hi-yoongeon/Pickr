console.log("Loaded localStorage module");

if( typeof pickr === "undefined" ) var pickr = {};
pickr.localStorage = {};


pickr.localStorage.getAccessToken = function(){
    return localStorage.getItem( pickr._option.ACCESS_TOKEN_FIELD_NAME ) || undefined;
};

pickr.localStorage.setAccessToken = function( accessToken ){
    localStorage.setItem( pickr._option.ACCESS_TOKEN_FIELD_NAME, accessToken );
};

pickr.localStorage.getPickingOption = function(){
    var setInitData = function(){ pickr.localStorage.setPickingOption( "OFF" );  };
    var value =  localStorage.getItem( pickr._option.PICKING_VALUE_FIELD_NAME ) || undefined ;

  console.log( value );

    if( typeof value === "undefined" ){
	setInitData();
	value = arguments.callee();
    }
    return value;
};

pickr.localStorage.setPickingOption = function( value ){
    localStorage.setItem( pickr._option.PICKING_VALUE_FIELD_NAME, value );
};

pickr.localStorage.clearAll = function(){
  localStorage.removeItem( pickr._option.PICKING_VALUE_FIELD_NAME );
  localStorage.removeItem( pickr._option.ACCESS_TOKEN_FIELD_NAME );
};