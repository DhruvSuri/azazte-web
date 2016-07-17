define(function () {
    return {
        styles: function ( styleContent, id, ignoreIfExist ) {
      var jStyles, style, rules;

      ignoreIfExist = _.isBoolean( ignoreIfExist ) ? ignoreIfExist : false;

      jStyles = $( "#" + (id || "sprStyles") );
      if ( ignoreIfExist && jStyles[ 0 ] ) {
        return;
      }

      style = document.createElement( "style" );
      style.id = id || "sprStyles";
      style.type = "text/css";
      style.media = "all";
      if ( style.styleSheet ) {
        style.styleSheet.cssText = styleContent;
      } else {
        rules = document.createTextNode( styleContent );
        style.appendChild( rules );
      }

      jStyles[ 0 ] && jStyles.remove();
      document.getElementsByTagName( "head" )[ 0 ].appendChild( style );
    }
    };
});
 

