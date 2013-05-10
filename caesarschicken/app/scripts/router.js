// Filename: router.js
define([
  'jquery',
  'underscore', 
  'backbone',
  'views/mainview',
], function($, _, Backbone, MainView) {  
  
  var AppRouter = Backbone.Router.extend({
    routes: {
	
	  '*path':  'showMainView',
	  
    },
	
	initialize: function(){
		
		try{
			Backbone.history.start();
		} catch(e) {
			console.log('Backbone history has been started')
		}

	},
	
	
	showMainView : function(path){
		var mainView = new MainView();
		mainView.render();
	},	
	
  });
  
  return appRouter = new AppRouter();
  
});
