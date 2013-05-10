define(['underscore', 'backbone'], function(_, Backbone) {
  var ItemModel = Backbone.Model.extend({

    // Default attributes for the item.
    defaults: {
      "item_name": "",
      "item_price": "",
	  "item_calorie": "",
	  "item_description": "",
    },
	
	initialize: function(e){
		console.log('Created item ', e);
	},

  });
  
  return ItemModel;
  
});
