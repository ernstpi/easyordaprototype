define([
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'collections/categories',
  'collections/orders',
  'hbs!template/categoryTemplate',
  ], function($, _, Backbone, Handlebars, CategoriesCollection, OrdersCollection, CategoryTemplate){
  
  var CategoriesView = Backbone.View.extend({
	
	el: $("#categoriesview"),
	firstTime: true,
	
	initialize: function() {
		CategoriesCollection.fetch();
		
		this.listenTo(CategoriesCollection, 'change', this.changeCategory);
		this.listenTo(CategoriesCollection, 'add', this.render);
		this.listenTo(CategoriesCollection, 'updateCategoriesCollection', this.updateChangeCategory);
		
		this.listenTo(OrdersCollection, 'updateCategoriesMenu', this.updateChangeCategory);
		this.listenTo(OrdersCollection, 'updateFirstCategory', this.render);
	},
	
	events: {
		'click a': 'changeCategoryClick',
    },
    
    
    changeCategoryClick: function(e){
    	e.preventDefault();
    	
    	CategoriesCollection.forEach(function(model, index) {
    	    model.set('active', false);
    	});
    	CategoriesCollection.get( $(e.target).parent('li').attr('id') ).set({'active': true})
    	CategoriesCollection.trigger('updateCategoriesCollection');
    	
    },
    
    updateChangeCategory: function(){
    	
		try{
			
			if(this.firstTime){
				CategoriesCollection.at(0).set({'active': true})
				this.firstTime = false;
			}
			
			var activeCategory =  JSON.parse(JSON.stringify(_.first(CategoriesCollection.where({'active': true}))));
			
			$('#categoriesview li').removeClass('active');
	    	$('#categoriesview li#' + activeCategory.id).addClass('active');
	    	
	    	$('#menuview .menu-item').each(function(){
	    		if($(this).data('menu-category') == activeCategory.category_name){
	    			$(this).removeClass('hide');
	    		} else {
	    			$(this).addClass('hide');
	    		}
	    	});
		} catch(e) {
			console.log('Categories collection is empty (possible not yet fetched)');
		}
    	
    	
    },
	
	render: function(){
	
		console.log('Rendering CategoriesView');
		
		var items = JSON.parse( JSON.stringify(CategoriesCollection) );
		
		var output = CategoryTemplate({categories: items});
		
		this.$el.html(output);
		
		CategoriesCollection.trigger('updateFirstCategory');
				
	},
	
  });
  
  return CategoriesView;
  
});