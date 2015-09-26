Ext.Loader.setConfig({enabled:true});
 
Ext.application({
    name: 'verizon',
    appFolder: 'js/login/app',  /* this appears to NOT be a relative path */    
    controllers: ['homeController'],   
    
    launch: function() {    
    	console.log("init");
    	Ext.create('Ext.container.Viewport', {
	    		layout:'border',
	    		layoutConfig : {
    		    	align : 'middle',
    		    	pack : 'center'
    		    },
	    		defaults: {
	    		    collapsible: true,
	    		    split: true,
	    		    bodyStyle: 'padding:15px'
	    		},
	    		items: [{
	    		    collapsible: false,
	    		    region:'center',
	    		    margins: '5 0 0 0',
	    		    items: [
	    	                {
	    	                    xtype: 'homeform'                
	    	                }
	    	            ]
	    		}]
    		
            
        });
       
    }
});