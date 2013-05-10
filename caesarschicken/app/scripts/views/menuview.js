define([
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'collections/menu',
  'collections/orders',
  'collections/categories',
  'hbs!template/menuTemplate',
  ], function($, _, Backbone, Handlebars, MenuCollection, OrdersCollection, CategoriesCollection, MenuTemplate){
  
  var MenuView = Backbone.View.extend({
	
	el: $("#menuview"),
	
	initialize: function() {
		MenuCollection.fetch({success: function(){ console.log('fetching'); } });
		this.listenTo(MenuCollection, 'add', this.render);
		
		this.listenTo(OrdersCollection, 'add', this.render);
		this.listenTo(OrdersCollection, 'set', this.render);
		this.listenTo(OrdersCollection, 'remove', this.render);
	},
	
	events: {
		'click a.addone'	: 'addOne',
		'click a.minusone'	: 'minusOne',
		'click img'			: 'showItemOverview',
    },
    
    showItemOverview: function(e) {
    	$('#modalitem').attr('data-menu-item-id', $(e.target).closest('.menu-item').data('menu-item-id'));
    	$('#modalitem').removeClass('hide');
    	MenuCollection.trigger('showMenuItem');
    },
    
    addOne: function(e){
    	
    	var menuItemAddOne = JSON.parse(JSON.stringify(MenuCollection.get( $(e.target).closest('.menu-item').data('menu-item-id') )));
    	console.log('Add to order: ' , menuItemAddOne);
    	
    	// check if it exists
		if(  OrdersCollection.get(menuItemAddOne.id) ){
			var addQuantityOrderItem = OrdersCollection.get(menuItemAddOne.id);
			addQuantityOrderItem.set({'quantity': addQuantityOrderItem.get('quantity') + 1, 'total': ((addQuantityOrderItem.get('quantity') + 1) * parseFloat(addQuantityOrderItem.get('item_price'))).toFixed(2) });
			console.log( 'Oder Item: ', OrdersCollection.get(menuItemAddOne.id) );
			OrdersCollection.trigger('set');
			OrdersCollection.trigger('updateCategoriesMenu');
		}
		else {
			OrdersCollection.add( _.extend(menuItemAddOne, {'quantity': 1, 'total': (parseFloat(menuItemAddOne.item_price)).toFixed(2) }) );
			console.log( 'Oder Item: ', OrdersCollection.get( $(e.target).closest('.menu-item').data('menu-item-id') ) );
			OrdersCollection.trigger('add');
			OrdersCollection.trigger('updateCategoriesMenu');
		}
		
    },
    
    minusOne: function(e){
    	
    	var menuItemMinusOne = JSON.parse(JSON.stringify(MenuCollection.get( $(e.target).closest('.menu-item').data('menu-item-id') )));
    	
    	// check if it exists
		if(  OrdersCollection.get(menuItemMinusOne.id) ){
			var minusQuantityOrderItem = OrdersCollection.get(menuItemMinusOne.id);
			minusQuantityOrderItem.set({'quantity': minusQuantityOrderItem.get('quantity') - 1, 'total': ((minusQuantityOrderItem.get('quantity') - 1) * parseFloat(minusQuantityOrderItem.get('item_price'))).toFixed(2) });
			OrdersCollection.trigger('set');
			OrdersCollection.trigger('updateCategoriesMenu');
			// If quantity == 0
			if( minusQuantityOrderItem.get('quantity') == 0 ){
				OrdersCollection.remove(menuItemMinusOne.id);
				OrdersCollection.trigger('remove');
				OrdersCollection.trigger('updateCategoriesMenu');
				console.log('Removed to order: ' , menuItemMinusOne);
				return true;
			}
			
			console.log('Minus 1 to order: ' , menuItemMinusOne);
		} else {
			console.log('Nothing to removed from order: ' , menuItemMinusOne);
		}
    },
	
	render: function(){
		
		console.log('Rendering MenuView')
		
		var items = JSON.parse( JSON.stringify(MenuCollection) );

		var merged = MenuCollection.map(function(menu) {
		    var order = OrdersCollection.get(menu.get('id'));
		    if (!order) return menu.toJSON();
		    
		    return _.extend(menu.toJSON(), order.toJSON());
		});
		
		var output = MenuTemplate({items: merged});
		
		console.log('Merged', merged);
		
		this.$el.html(output);
		
		MenuCollection.trigger('finishedRender');
		CategoriesCollection.trigger('updateCategoriesCollection');
		
	},
	
  });
  
  return MenuView;
  
});