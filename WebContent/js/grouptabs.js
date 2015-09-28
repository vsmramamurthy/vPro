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
	
	var orgin = Ext.create('Ext.data.Store', {
    fields: ['position', 'name'],
    data : [
        {"position":"chicago, il", "name":"Chicago"},
        {"position":"st louis, mo", "name":"St Louis"},
        {"position":"joplin, mo", "name":"Joplin, MO"},
		{"position":"amarillo, tx", "name":"Amarillo"}
    ]
	});

	var destination = Ext.create('Ext.data.Store', {
    fields: ['position', 'name'],
    data : [
        {"position":"chicago, il", "name":"Chicago"},
        {"position":"st louis, mo", "name":"St Louis"},
        {"position":"joplin, mo", "name":"Joplin, MO"},
		{"position":"amarillo, tx", "name":"Amarillo"}
    ]
	});
	
	var directionsService = null;
	var directionsDisplay = null;
	var cogmap = null;
	
    Ext.create('Ext.Viewport', {
        layout: 'fit',
        items: [{
					xtype: 'grouptabpanel',
					activeGroup: 0,
					items: [{
								mainItem: 1,
								items: [{
											title: 'Usage',
											iconCls: 'x-icon-tickets',
											tabTip: 'Tickets tabtip',
											//border: false,
											xtype: 'gridportlet',
											margin: '10',
											height: null
										}, {
											xtype: 'portalpanel',
											title: 'Account Info',
											tabTip: 'Dashboard tabtip',
											border: false,
											items: [{
												flex: 1,
												items: []
											}]
										}, {
												title: 'Bills',
												iconCls: 'x-icon-subscriptions',
												tabTip: 'Subscriptions tabtip',
												style: 'padding: 10px;',
												border: false,
												layout: 'fit',
												items: [{
													xtype: 'tabpanel',
													activeTab: 0,
													items: [{
														title: 'Nested Tabs',
														html: Ext.example.shortBogusMarkup
													}]
												}]
										}, {
											title: 'Upgrade Eligiblity',
											iconCls: 'x-icon-users',
											tabTip: 'Users tabtip',
											style: 'padding: 10px;',
											html: Ext.example.shortBogusMarkup
										}]
						}, {
							expanded: true,
							items: [{
								title: 'Tech Info',
								iconCls: 'x-icon-configuration',
								tabTip: 'Configuration tabtip',
								style: 'padding: 10px;',
								html:  Ext.example.shortBogusMarkup
							}, {
								title: 'Send Email',
								iconCls: 'x-icon-templates',
								tabTip: 'Templates tabtip',
								style: 'padding: 10px;',
								border: false,
								items: {
					                title: 'New Email',
					                layout: 'fit',
					                frame: true,
					                border: false,
					                height : 875,
					                
					                items: {
					                    xtype: 'form',
					                    layout:'absolute',
					                    url:'',
					                    padding: '5 5 0 5',
					                    border: false,
					                    cls: 'absolute-form-panel-body',
					                    
					                    defaultType: 'textfield',
					                    items: [{
					                        x: 0,
					                        y: 5,
					                        xtype: 'label',
					                        text: 'From:'
					                    },{
					                        x: 55,
					                        y: 0,
					                        name: 'from',
					                        hideLabel: true,
					                        anchor:'100%'  // anchor width by %
					                    },{
					                        x: 0,
					                        y: 32,
					                        xtype: 'label',
					                        text: 'To:'
					                    },{
					                        x: 55,
					                        y: 27,
					                        width: 69,
					                        xtype: 'button',
					                        text: 'Contacts'
					                    },{
					                        x: 127,
					                        y: 27,
					                        name: 'to',
					                        hideLabel: true,
					                        anchor: '100%'  // anchor width by %
					                    },{
					                        x: 0,
					                        y: 59,
					                        xtype: 'label',
					                        text: 'Subject:'
					                    },{
					                        x: 55,
					                        y: 54,
					                        name: 'subject',
					                        hideLabel: true,
					                        anchor: '100%'  // anchor width by %
					                    },{
					                        x: 0,
					                        y: 81,
					                        hideLabel: true,
					                        xtype: 'textarea',
					                        name: 'msg',
					                        anchor: '100% 100%'  // anchor width and height
					                    }]
					                },

					                dockedItems: [
					                    {
					                        xtype: 'toolbar',
					                        border: false,
					                        cls: 'absolute-form-panel-body',
					                        items: [
					                            {
					                                 text: 'Send',
					                                 iconCls: 'icon-send'
					                            },'-',{
					                                 text: 'Save',
					                                 iconCls: 'icon-save'
					                            },{
					                                 text: 'Check Spelling',
					                                 iconCls: 'icon-spell'
					                            },'-',{
					                                 text: 'Print',
					                                 iconCls: 'icon-print'
					                            },'->',{
					                                 text: 'Attach a File',
					                                 iconCls: 'icon-attach'
					                            }
					                        ]
					                    }
					                ]
					            }
							} ]
						}, {
							expanded: false,
							items: {
								title: 'Track',
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
															queryMode: 'local',
															displayField: 'name',
															valueField: 'position'
															//renderTo: Ext.getBody()	
															},
															{
															xtype:'combobox',
															fieldLabel: 'Destination',
															id:'destination',
															store: destination,
															queryMode: 'local',
															displayField: 'name',
															valueField: 'position'
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
																		var request = {
																			origin : Ext.getCmp("orgin").getValue() ,//'chicago, il',
																			destination : Ext.getCmp("destination").getValue() ,//'st louis, mo',
																			travelMode : google.maps.TravelMode.DRIVING
																		};
																		
																		directionsService.route(request, function(result, status) {
																			if (status == google.maps.DirectionsStatus.OK) {
																				directionsDisplay.setDirections(result);
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
															width:100
															
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
														 title: 'Top 5 Restaurants',
															//store: Ext.data.StoreManager.lookup('simpsonsStore'),
															columns: [
																{ text: 'Name',  dataIndex: 'name' },
																{ text: 'Address', dataIndex: 'email', flex: 1 },
							
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
		                                    width:555,
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
							}
						}]
					}]
    });
});