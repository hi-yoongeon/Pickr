pickr.FormData = function(id){
  this.element = $E(id);
  if( this.element == null ) throw new pickr.errors.Error("Fail initialize");

  this.extract();
};


pickr.FormData.prototype = {
  formData : {},
  getFormData : function(){
    return this.formData;
  },
  extract: function(){
    this.saveActionToFormData();
    this.saveMethodToFormData();
    this.saveChildrenValueToFormData();
  },
  saveActionToFormData : function(){
    this.formData.action = this.element.getAttribute("action");
  },
  savetMethodToFormData : function(){
    this.formData.method = this.element.getAttribute("method");
  },
  saveChildrenValueToFormData : function(){
    var root = $E(this.element);
    nodes = root.getChildElements();


    (function travelChild(nodes){

       nodes.forEach( function(node){

			var children = $E(node).getChildElements();

			if( children.length > 0 )
			  travelChild(children);
			else{

			  return undefined;

			}


       });

     })(nodes);

  },
  onSubmit : function( submit ){
    this.elemnt.addEventListener("submit", submit );
  }
};