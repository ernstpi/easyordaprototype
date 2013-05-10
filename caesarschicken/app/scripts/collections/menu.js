define([
  'underscore', 
  'backbone', 
  'models/item'
  ], function(_, Backbone, Item){
	  
	var Menu = Backbone.Collection.extend({
 
		model: Item,
		url: 'json/items',
		parse: function(response){ return response.items },
		comparator: function(item){
			return item.get("item_category")
		},
		
		initialize: function(){
			this.reset();
		},	

  });
  
  return menu = new Menu();
  
});
