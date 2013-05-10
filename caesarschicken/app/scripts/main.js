require.config({
	paths: {
		'jquery': '../vendor/jquery/jquery',
		'underscore': '../vendor/underscore-amd/underscore',
		'backbone': '../vendor/backbone-amd/backbone',
		'backbone.localStorage': '../vendor/backbone.localStorage/backbone.localStorage',
		'text': '../vendor/text/text',
		'hbs': '../vendor/hbs/hbs',
		'handlebars': '../vendor/hbs/Handlebars',
		'json2': '../vendor/hbs/hbs/json2',
		'i18nprecompile': '../vendor/hbs/hbs/i18nprecompile',
		'bootstrap': '../vendor/bootstrap/build/js/bootstrap',
		'jquerynicescroll': '../vendor/jquery-nicescroll/jquery.nicescroll',
	},
	
	pragmasOnSave: {
        //removes Handlebars.Parser code (used to compile template strings) set
        //it to `false` if you need to parse template strings even after build
        excludeHbsParser : true,
        // kills the entire plugin set once it's built.
        excludeHbs: true,
        // removes i18n precompiler, handlebars and json2
        excludeAfterBuild: true
    },
	
	// default plugin settings, listing here just as a reference
    hbs : {
        templateExtension : 'hbs',
        // if disableI18n is `true` it won't load locales and the i18n helper
        // won't work as well.
        disableI18n : false
    },
});

require(['app'], function(AppView) {
	AppView.initialize();
});