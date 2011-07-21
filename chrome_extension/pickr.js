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


(function(libraries){ libraries.forEach(function(lib){ document.write("<script type=\"text/javascript\" src=\"/javascripts/" + lib + ".js\"></scri"+"pt>"); }); })
([
   "pickr/localStorage",
   "pickr/picture",
   "pickr/auth"
]);
