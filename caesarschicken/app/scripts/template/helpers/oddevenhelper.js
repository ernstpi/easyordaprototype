define(['handlebars'], function ( Handlebars ){
  function oddevenhelper(array, even, odd, options) {
	  var fn = options.fn,
      elseFn = options.inverse;

    if (array && array.length > 0) {
      var buffer = "";
      for (var i = 0, j = array.length; i < j; i++) {
          var item = array[i];

          // we'll just put the appropriate stripe class name onto the item for now
          item.stripeClass = (i % 2 == 0 ? odd : even);

          // show the inside of the block
          buffer += fn(item);
      }

      // return the finished buffer
      return buffer;
    } else {
      return elseFn();
    }
  };

  Handlebars.registerHelper( 'oddevenhelper', oddevenhelper );
  return oddevenhelper;
});