define(['underscore', 'backbone'], function(_, Backbone) {
  var CategoryModel = Backbone.Model.extend({

    // Default attributes for the item.
    defaults: {
      "category_name": "",
    },
	
	initialize: function(e){
		console.log('Created category ', e);
	},

  });
  
  return CategoryModel;
  
});
