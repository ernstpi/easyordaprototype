define([
  'underscore', 
  'backbone',
  'backbone.localStorage',
  'models/order'
  ], function(_, Backbone, Store, Order){
	  
	var Orders = Backbone.Collection.extend({
		
		model: Order,
		comparator: function(item){
			return item.get("item_category")
		},
		
		localStorage: new Store('orders'),
		
		initialize: function(){
			this.reset();
		},
		
		addOrder: function(item, id){
			console.log( _.where(JSON.parse( JSON.stringify(this.models) ), {"id": id}) );
		}

  });
  
  return orders = new Orders();
  
});
