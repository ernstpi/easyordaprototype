define([
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'views/categoriesview',
  'views/menuview',
  'views/orderssummaryview',
  'views/itemoverviewview',
  ], function($, _, Backbone, Handlebars, CategoriesView, MenuView, OrdersSummaryView, ItemOverviewView){
  
  var MainView = Backbone.View.extend({
	
	el: $("body"),
	
	initialize: function() {
	
	},
	
	events: {
    },
	
	render: function(){
			
		var categoriesView = new CategoriesView();
		categoriesView.render();
		
		var menuView = new MenuView();
		menuView.render();
		
		var ordersSummaryView = new OrdersSummaryView();
		ordersSummaryView.render();
		
		var itemOverviewView = new ItemOverviewView();
		
	},
	
  });
  
  return MainView;
  
});