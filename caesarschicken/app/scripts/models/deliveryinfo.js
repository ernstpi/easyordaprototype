define(['underscore', 'backbone'], function(_, Backbone) {
  var DeliveryInfoModel = Backbone.Model.extend({

    // Default attributes for the item.
    defaults: {
      "di_customername": "",
      "di_customersuburb": "",
	  "di_deliverytime": "",
	  "di_deliverycollectionoptions": "",
	  "di_customeraddress": "",
	  "di_cardholdername": "",
	  "di_cardholderemail": "",
	  "di_cardnumber": "",
	  "di_cardtype": "",
	  "di_cardexpirymonth": "",
	  "di_cardexpiryyear": "",
	  "di_cardverificationcode": "",
	  "item_calorie": "",
	  "item_description": "",
    },
	
	initialize: function(e){
	},

  });
  
  return deliveryInfoModel = new DeliveryInfoModel();
  
});
