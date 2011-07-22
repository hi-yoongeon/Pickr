(function( scripts ){
  scripts.forEach( function( script ){ document.write("<script type=\"text/javascript\" src=\"/javascripts/"+ script  +".js\"></s"+"cript>"); });
 })([
      "core/jigu",
      "core/require"
]);