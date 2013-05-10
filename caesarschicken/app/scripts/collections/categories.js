define([
  'underscore', 
  'backbone', 
  'models/category'
  ], function(_, Backbone, Category){
	  
	var Categories = Backbone.Collection.extend({
 
		model: Category,
		url: 'json/categories',
		parse: function(response){ return response.categories },
		
		comparator: function(category){
			return category.get("item_category")
		},
		
		initialize: function(){
			this.reset();
		},	

  });
  
  return categories = new Categories();
  
});
