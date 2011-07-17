function FormData( id ) {
    this._id = id;
    this._element = $(id);
    if( this._element == null ){ return undefined; }
}


FormData.prototype = {
    _formData : {},
    _passwordFields : [],
    getFormData : function(){
	return this._formData;
    },
    reload: function(){
	this.setURL();
	this.setMethod();
	this.retrieveFormElementAndSaveValue();
    },
    setURL : function(){
	this._formData["action"] = this._element.getAttribute("action") || "" ;
    },
    setMethod : function(){
	this._formData["method"] = this._element.getAttribute("method") || "get" ;
    },
    getURL : function(){
	return this._formData["action"];
    },
    getMethod : function(){
	return this._formData["method"];
    },
    getFormElement : function(){
	return this._element;
    },  
    getQueryString : function(){
	var values = [];
	for( key in this._formData ){
	    if( ["METHOD", "ACTION"].indexOf( key.toUpperCase() ) < 0 ) {
		var value = this._formData[key] || "";
		values.push( key + "=" + value );
	    }
	}
	return values.join("&");
    },
    clearInputField : function( id ){},
    clearPasswordFieldsValue : function(){
	for( var i = 0; i < this._passwordFields.length; i++ ){
	    this._passwordFields[i].value = "";
	}
	this._passwordFields[0].focus();
    },
    retrieveFormElementAndSaveValue : function(){
	var _this = this;
	var addElementValue = function( node ){
	    var name = node.getAttribute("name");
	    var value = node.value;
	    if( name != null && name !== "" ) _this._formData[name] = value;
	};
	var addPasswordField = function( node ){
	    _this._passwordFields.push( node );
	}
	var retrieveFormElement = function( parent ){
	    var children = $E(parent).getChildElements();
	    if( children.length > 0 ){
		for( var i = 0; i < children.length; i++ ){
		    var node = children[i];
		    if( ["INPUT", "SELECT"].indexOf( node.tagName.toUpperCase() ) > -1 ){
			addElementValue( node );
			if( node.tagName.toUpperCase() == "INPUT" &&
			    node.getAttribute( "type" ).toUpperCase() == "PASSWORD" ){
			    addPasswordField( node );
			}
		    }
		    arguments.callee( node );
		}
	    }else{ return undefined; }
	};
	retrieveFormElement( this._element );
    }
};