Ext.onReady(function () {
    Ext.tip.QuickTipManager.init();

    // create some portlet tools using built in Ext tool ids
    var tools = [{
        type: 'gear',
        handler: function () {
            Ext.Msg.alert('Message', 'The Settings tool was clicked.');
        }
    }, {
        type: 'close',
        handler: function (e, target, panel) {
            panel.ownerCt.remove(panel, true);
        }
    }];
	
	
	var rating = new Ext.ux.widget.Rating({
				fieldLabel	:	'rating',
				allowBlank	: false,
				disabled	: true,
				//readOnly	: true,
				value 		: 3.6,
				titles: {
						'0': 'poor', 
						'1.4': 'medium',
						'3': 'excellent',
						'5': 'perfect'
					},
				allowBlank	:	false
		    });

	
	var orgin = Ext.create('Ext.data.Store', {
    fields: ['position', 'name'],
    data : [
        {"position":"chicago, il", "name":"Chicago"},
        {"position":"st louis, mo", "name":"St Louis"},
        {"position":"joplin, mo", "name":"Joplin, MO"},
		{"position":"amarillo, tx", "name":"Amarillo"},
		{"position":"New York, NY", "name":"New York"},
		{"position":"Dupont Circle, Dupont Circle Northwest, Washington, DC 20036", "name":"Dupont Circle"}
    ]
	});

	var destination = Ext.create('Ext.data.Store', {
    fields: ['position', 'name'],
    data : [
        {"position":"chicago, il", "name":"Chicago"},
        {"position":"st louis, mo", "name":"St Louis"},
        {"position":"joplin, mo", "name":"Joplin, MO"},
		{"position":"amarillo, tx", "name":"Amarillo"},
		{"position":"Tribeca, New York, NY", "name":"Tribeca"},
		{"position":"American Geophysical Union, 2000 Florida Avenue Northwest, Washington, DC 20009", "name":"American Geophysical Union"}
    ]
	});
	
	var category = Ext.create('Ext.data.Store', {
    fields: ['position', 'name'],
    data : [
        {"value":"All", "name":"All"},
        {"value":"Restaurant", "name":"Restaurant"},
        {"value":"Cafe", "name":"Cafe"},
		{"value":"Shopping", "name":"Shopping"}
    ]
	});
	
	var directionsService = null;
	var directionsDisplay = null;
	var cogmap = null;
	var infowindow = null;
	
	var setaddress = function(address,marker)
	{
		return function()
		{
			
			if (infowindow) {
				infowindow.close();
			}
    		infowindow = new google.maps.InfoWindow({
			content: address
			});
			infowindow.open(cogmap, marker);
		}
	};

    Ext.create('Ext.Viewport', {
        layout: 'fit',
        items: [{
					xtype: 'grouptabpanel',
					activeGroup: 0,
					activeItem: 2,
					items: [{
								mainItem: 1,
								
								items: [{
											title: 'MyHub Stats',
											iconCls: 'x-icon-tickets',
											tabTip: 'Tickets tabtip',
											//border: false,
											xtype: 'gridportlet',
											margin: '10',
											height: null
										}, {
											xtype: 'portalpanel',
											title: 'Verizon Hub',
											tabTip: 'Dashboard tabtip',
											border: false,
											items: [{
												flex: 1,
												items: [rating,{
													xtype:'image',
													src: 'extjs/resources/vHub.png',
												    width: 1000,
												    height: 700

												}]
											}]
										}, {
												title: 'vTrack',
												iconCls: 'x-icon-subscriptions',
												tabTip: 'Subscriptions tabtip',
												style: 'padding: 10px;',
												active : true,
												border: false,
												layout: 'fit',
												items: [{
								title: 'VerizonHub Dashboard',
								bodyPadding: 10,
								
								items : {
					                layout: 'fit',
					                frame: true,
					                border: false,
					                height : 800,
					                
					                items: {
					                    xtype: 'form',
					                    layout:'border',
					                    url:'',
					                    padding: '5 5 0 5',
					                    border: false,
					                    items: [{
						                title: 'Navigation',
						                region:'west',
						                floatable: false,
										collapsible: true,
						                margins: '5 0 0 0',
						                width: 500,
						                items : [
										{
									    xtype:'panel',
										layout: {
															type: 'vbox'
														},
										padding:'10 10 10 10',
										border : false,
										frame : false,
										items:[
										{
											xtype:'fieldset',
											
											height:150,
												padding:'10 10 10 10',
											items:[{
												xtype:'container',
												layout: {
													type: 'hbox'
												},
												width: 450,
												height:120,
												padding:'10 10 10 10',
												
												items: [
													 {
														xtype:'container',
														layout: {
															type: 'vbox'
														},
														width: 300,
														padding:'20 20 20 20',
														//renderTo: Ext.getBody(),
														//border: 1,
														//style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
														/*defaults: {
															labelWidth: 80,
															// implicitly create Container by specifying xtype
															xtype: 'datefield',
															flex: 1,
															style: {
																padding: '10px'
															}
														},*/
														items: [
															{
															xtype:'combobox',
															fieldLabel: 'Orgin',
															id:'orgin',
															store: orgin,
															//queryMode: 'local',
															displayField: 'name',
															valueField: 'position'
															//renderTo: Ext.getBody()	
															},
															{
															xtype:'combobox',
															fieldLabel: 'Destination',
															id:'destination',
															store: destination,
															//queryMode: 'local',
															displayField: 'name',
															valueField: 'position'
															//renderTo: Ext.getBody()	
															},
															{
															xtype:'combobox',
															fieldLabel: 'Category',
															id:'category',
															store: category,
															//queryMode: 'local',
															displayField: 'name',
															valueField: 'value',
															listeners: {
															change: function() {
																Ext.Msg.alert('Chosen book', 'Buying ISBN: '+ this.getValue());
																}
															}

															//renderTo: Ext.getBody()	
															}
														]

													},
													
													{
														xtype:'container',
														layout: {
															type: 'vbox'
														},
														width: 150,
														padding:'20 20 20 20',
														
														items: [
															{
															xtype:'button',
															text: 'Search',
															width:100,
															listeners: {
																	click: function() {
																		
																		Ext.Ajax.request({ // 5
																		url : '/vPro/VHubService',
																		scope : this,
																		params : {
																		verizonPhoneNumber:'7299988899'
																		//key:Ext.MessageBox.alert(recordsToInsertUpdate)
																		},
																		success:    function(result,request){
																				//alert(result.responseText)
																				var data = JSON.parse(result.responseText).data;
																				Ext.getCmp("rgrid").getStore().loadData(data);
																				
																				 //var stepDisplay = new google.maps.InfoWindow;
																				 //var markerArray = [];
																				var request = {
																					origin : Ext.getCmp("orgin").getValue() ,//'chicago, il',
																					destination : Ext.getCmp("destination").getValue() ,//'st louis, mo',
																					travelMode : google.maps.TravelMode.DRIVING
																				};																			 																			
																				
																				directionsService.route(request, function(result, status) {
																					if (status == google.maps.DirectionsStatus.OK) {
																						directionsDisplay.setDirections(result);
																						
																						for (i = 0; i < data.length; i++) {																							 
																							// var marker = new google.maps.Marker;
																							
																							var iconpng = 'extjs/resources/resturanticon.png';
																							if(data[i].cat == 'Shopping')
																								iconpng = 'extjs/resources/shoppingicon.png';
																							else if (data[i].cat == 'Cafe')
																								iconpng = 'extjs/resources/cafeicon.png';
																							
																							
																							 var marker = new google.maps.Marker({																					
																								
																								icon: iconpng
																							});
																							
																							marker.setMap(cogmap);
																							var position = new google.maps.LatLng(data[i].lat,data[i].lon);
																							marker.setPosition(position);																							
																							
																							/*google.maps.event.addListener(marker, 'click', function() {
																								var infowindow = new google.maps.InfoWindow({
																								content: data[i].adress
																									});
																								infowindow.open(cogmap, marker);
																									});	*/

																							google.maps.event.addListener(marker, 'click', setaddress(data[i].adress,marker));
																							
																						 }
																						
																		
																					}
																				});
																			}
																		});
																		
																	}
															}
								
															},
															{
																xtype:'tbfill',
																height:5
															},
															{
															xtype:'button',
															text: 'Clear',
															width:100,
															handler:function() {
																
															}
															
															}
														]

													}
													
													
												]
												
										}]
										
										},
										{
											xtype:'fieldset',
											height:500,
											padding:'10 10 10 10',
											items:[{
												xtype:'container',
												layout: {
													type: 'vbox'
												},
												width: 450,
												height:440,
												padding:'10 10 10 10',
												
												items: [
													 {
														 xtype:'grid',
														 id:'rgrid',
														 title: 'Top 5 Restaurants',
															store:Ext.create('Ext.data.Store', {
															     fields:['name','adress','rating','url','msc','lat','lon','cat']
															  }),
															columns: [
																{ text: 'Name',  dataIndex: 'name' },
																{ text: 'Address', dataIndex: 'adress', flex: 1 },
																{ text: 'Rating', dataIndex: 'rating'},
																{ text: 'Category', dataIndex: 'cat'}
															],
															height: 200,
															width: 430

													 },
													 
															{
																xtype:'tbfill',
																height:2
															},
													 {
														 xtype:'grid',
														 title: 'Top 5 Msc',
															//store: Ext.data.StoreManager.lookup('simpsonsStore'),
															columns: [
																{ text: 'Name',  dataIndex: 'name' },
																{ text: 'Address', dataIndex: 'email', flex: 1 },
							
															],
															height: 200,
															width: 430

													 }
													 ]
											}
											]
										}
										
										//vsmramamurthy
										//r^mgithub83
										
										]}
										
										
										]
										
						            },{
						                title: 'GMAP',
						                collapsible: false,
						                region: 'center',
						                xtype:'form', 
						                margins: '5 0 0 0',
						                items : {
		                                    autoShow: true,
		                                    layout: 'fit',
		                                    closeAction: 'hide',
		                                    //width:555,
		                                    height:700,
		                                    border: false,
		                                    x: 0,
		                                    y: 0, 
		                                    items: {
		                                        xtype: 'gmappanel',
												id:'gmappanel',
												//gmapType: 'map',
												zoomLevel: 14,
												center: {
		                                            geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
		                                            marker: {title: 'Fenway Park'}
		                                        },
								
												mapOptions : {
													mapTypeId: google.maps.MapTypeId.TERRAIN
												},

		                                        listeners: {
														mapready: function(ux, gmap){
														//alert(99);
															 directionsService = new google.maps.DirectionsService();
																		 directionsDisplay = new google.maps.DirectionsRenderer();
																		//var start = 'chicago, il',//document.getElementById("start").value;
																		//var end = 'st louis, mo',//document.getElementById("end").value;
																		cogmap = gmap;
																		directionsDisplay.setMap(cogmap);
																	
																		
																		
														} 
													}
		                                    }
		                                }
						            }
										
										
										
										]
										}
								}
							}]
										}, {
											title: 'Upgrade Eligiblity',
											iconCls: 'x-icon-users',
											tabTip: 'Users tabtip',
											style: 'padding: 10px;',
											items : []
										}]
						}]
					}]
    });
});
