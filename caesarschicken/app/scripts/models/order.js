define(['underscore', 'backbone', 'models/item'], function(_, Backbone, Item) {
  var OrderModel = Item.extend({

    // Default attributes for the item.
    defaults: {
      "item_name": "",
      "item_price": "",
	  "item_calorie": "",
	  "item_description": "",
	  "quantity": 0,
	  "total": 0,
    },
	
	initialize: function(e){
	},
	
  });
  
  return OrderModel;
  
});
