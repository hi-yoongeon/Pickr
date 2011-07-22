var pickingButton = undefined;
var show_event = null;
var hide_event = null;


window.onload = function(){

  chrome.extension.sendRequest( { type : "documentReady" } );
  chrome.extension.onRequest.addListener( function( request, sender, sendResponse ){
					    if( typeof request.pickrOption !== "undefined" ){
					      this.pickr = { option : request.pickrOption };
					      if( request.onPicking )  readyPicking();
					    }
					  });

};

function readyPicking(){
  var images = getImagesOfPage();
  setupPickingEvent( images );
}

function getImagesOfPage(){
  return Array.prototype.slice.call(document.images);
}

function addEventShowPickingButton( image ){
  image.addEventListener("mouseover", function(){

			   chrome.extension.sendRequest( {
			     type : "is_bookmark",
			     url : image.src
			   });

			   chrome.extension.onRequest.addListener( function(request, sender, sendResponse){

								     if( request.type === "is_bookmark_callback" ){
								       var json = eval("(" + request.response.responseText + ")");
								       pickingButton = createPickingButton( image, !json.is_bookmark );
								       image.parentNode.insertBefore( pickingButton );
								     }

								   });


			 });
}

function addEventHidePickingButton( image ){
  image.addEventListener("mouseout", function(){
			   pickingButton.parentNode.removeChild( pickingButton );
			   pickingButton = undefined;
			   console.log("onMouseout");
			 });
}


function createPickingButton( image, bool ){
  var button = ( typeof pickingButton === "undefined" ) ? new Image() : pickingButton;
  var image_url = image.src;

  button = setPickingButtonAttributesAndClickEvent( button, image, bool );
  return button;
}

function setPickingButtonAttributesAndClickEvent( button, image, bool ){
  button = setPickingButtonAttributes( button, image, bool );
  button = setPickingButtonClickEvent( button, image );
  return button;
}

function setPickingButtonAttributes( button, image, bool ){
  button.src = pickr.option.URL + "/images/bookmark_off.png";
  if( bool )   button.src = pickr.option.URL + "/images/bookmark_on.png";
  button.style.position = "absolute";
  button.style.marginTop = "5px";
  button.style.cursor = "pointer";
  button.style.marginLeft = "-"+ (Number(image.width) - 5) +"px";
  return button;
}

function setPickingButtonClickEvent( button, image ){
  button.onclick = function(){
    chrome.extension.sendRequest({
				   type : "bookmark",
				   url : image.src
				 });

    pickingButtonImageToggle( button );
    return false;
  };
  return button;
}


function pickingButtonImageToggle( button ){
  if( button.src === pickr.option.URL + "/images/bookmark_off.png" )
    button.src = pickr.option.URL + "/images/bookmark_on.png";
  else
    button.src = pickr.option.URL + "/images/bookmark_off.png";
}

function setupPickingEvent( images ){
  images.forEach( function(image){
		    if( checkImageSize( image ) ){
		      addEventShowPickingButton( image );
//		      addEventHidePickingButton( image );
		    }
		  });
}

function checkImageSize( image ){
  var image_width = Number(image.width);
  var image_height = Number(image.height);
  var min_width = Number(pickr.option.LEAST_IMAGE_SIZE.WIDTH);
  var min_height = Number(pickr.option.LEAST_IMAGE_SIZE.HEIGHT);

  if( min_width > 0 && image_width < min_width ) return false;
  if( min_height > 0 && image_height < min_height ) return false;

  return true;
}

function chromeTest(){

  alert("test");

}