var pickr ={};

pickr._libs = [
  "/libs/FormData.js",
  "/libs/errors.js"
];


(function(){
   pickr._libs.forEach(function( src ){
     document.write("<script type='text/javascript' src='/javascripts"+ src +"'><" + "/script>");
   });
})();


/*
pickr.user.signup = function(login_form, callback){
  var options = {
  };
  new daum.Ajax(options).request();
};
*/







window.addEventListener("load", function(){
//    document.body.style.height = daum.Browser.getWindowSize().height + "px";
});


