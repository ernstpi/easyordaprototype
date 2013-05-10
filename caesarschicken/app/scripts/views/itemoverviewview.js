define([
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'collections/menu',
  'collections/orders',
  'hbs!template/itemOverviewTemplate',
  ], function($, _, Backbone, Handlebars, MenuCollection, OrdersCollection, ItemOverviewTemplate){
	
  var ItemOverviewView = Backbone.View.extend({
	
	el: $("#modalitem"),
	
	initialize: function() {
		this.listenTo(MenuCollection, 'showMenuItem', this.render);
	},
	
	events: {
		'click .addone' 				:	'addOne',
		'click .minusone' 				:	'minusOne',
		
		'click .close'			:	'closeModal',
    },

    closeModal : function(e){
    	$('#modalitem').addClass('hide');
    },
    
	render: function(){
		
		console.log('Render ItemOverviewView');
		
		var items = JSON.parse( JSON.stringify(MenuCollection) );

		var merged = MenuCollection.map(function(menu) {
		    var order = OrdersCollection.get(menu.get('id'));
		    if (!order) return menu.toJSON();
		    
		    return _.extend(menu.toJSON(), order.toJSON());
		});
		
		item = JSON.parse( JSON.stringify($.grep(merged, function(e){ return e.id == $('#modalitem').attr('data-menu-item-id'); })));
		console.log(item);
		var output = ItemOverviewTemplate({'item': item});
		
		this.$el.html(output);
		
	},
	
  });
  
  return ItemOverviewView;
  
});