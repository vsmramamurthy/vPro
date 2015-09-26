Ext.define('verizon.controller.homeController', {
    extend: 'Ext.app.Controller',
    views: [ 'homeForm'],
    refs: [
           {
               ref: 'homeForm',
               selector: 'form'
           }
       ],
    
    init: function() {
    	
    }
});