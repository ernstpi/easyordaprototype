define([
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'collections/menu',
  'collections/categories',
  'collections/orders',
  'hbs!template/orderSummaryTemplate',
  ], function($, _, Backbone, Handlebars, MenuCollection, CategoriesCollection, OrdersCollection, OrderSummaryTemplate){
  
	
  function checkIfContained(){ 
	  if( $('.orderssummary-list').length ){
		  if($('.orderssummary-list').hasClass('hide')){ 
			  return 'hide'; 
		  } else { 
			  return ' '; 
		  } 
	  } else { 
		  console.log('wala')
		  return 'hide'; 
	  }
  };
	
  var OrdersSummaryView = Backbone.View.extend({
	
	el: $("#orderssummaryview"),
	
	initialize: function() {
		
		this.listenTo(MenuCollection, 'finishedRender', this.render);
	},
	
	events: {
		'click .orderssummary-more'		:	'showHideOrdersSummaryList',
		'click .addone' 				:	'addOne',
		'click .minusone' 				:	'minusOne',
    },
    
    addOne: function(e){
    	
    	console.log('addone');
    	var menuItemAddOne = JSON.parse(JSON.stringify( OrdersCollection.get($(e.target).closest('.ordersummary-list-item').data('menu-item-id')) ));
    	console.log('Add one from order: ' , menuItemAddOne);
    	
    	// check if it exists
    	var addQuantityOrderItem = OrdersCollection.get(menuItemAddOne.id);
		addQuantityOrderItem.set({'quantity': addQuantityOrderItem.get('quantity') + 1, 'total': ((addQuantityOrderItem.get('quantity') + 1) * parseFloat(addQuantityOrderItem.get('item_price'))).toFixed(2) });
		console.log( 'Oder Item: ', OrdersCollection.get(menuItemAddOne.id) );
		OrdersCollection.trigger('set');
		OrdersCollection.trigger('updateCategoriesMenu');
		
    },
    
    minusOne: function(e){
    	
    	var menuItemMinusOne = JSON.parse(JSON.stringify( OrdersCollection.get($(e.target).closest('.ordersummary-list-item').data('menu-item-id')) ));
    	
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
			
			console.log('Minus 1 from order: ' , menuItemMinusOne);
		} else {
			console.log('Nothing to removed from order: ' , menuItemMinusOne);
		}
    },
    
    showHideOrdersSummaryList: function(){
    	if($('.orderssummary-list').hasClass('hide')){ $('.orderssummary-list').removeClass('hide'); } else {$ ('.orderssummary-list').addClass('hide');}
    },
	
	render: function(){
		
		console.log('Render OrdersSummaryView')
		
		var total = _.reduce(OrdersCollection.pluck('total'), function(memo, num){ return parseFloat(memo) + parseFloat(num); }, 0);
		var orderlistState = checkIfContained();
		console.log( orderlistState);
		var output = OrderSummaryTemplate({'orderssummary': JSON.parse(JSON.stringify(OrdersCollection)), 'showHide': orderlistState,  'total': total.toFixed(2)});
		
		this.$el.html(output);
	},
	
  });
  
  return OrdersSummaryView;
  
});