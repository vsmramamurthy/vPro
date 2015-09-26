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
					                height : 900,
					                
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
						                width: 800,
						                items : {
						                    xtype: 'button',
						                    text : 'My Button',
						                    	listeners: {
						                            click: function() {
						                            	
						                            	var mapwin = Ext.create('Ext.window.Window', {
						                                    autoShow: true,
						                                    layout: 'fit',
						                                    title: 'GMap Window',
						                                    closeAction: 'hide',
						                                    width:450,
						                                    height:450,
						                                    border: false,
						                                    x: 40,
						                                    y: 60,
						                                    items: {
						                                        xtype: 'gmappanel',
						                                        center: {
						                                            geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
						                                            marker: {title: 'Fenway Park'}
						                                        },
						                                        markers: [{
						                                            lat: 42.339641,
						                                            lng: -71.094224,
						                                            title: 'Boston Museum of Fine Arts',
						                                            listeners: {
						                                                click: function(e){
						                                                    Ext.Msg.alert('It\'s fine', 'and it\'s art.');
						                                                }
						                                            }
						                                        },{
						                                            lat: 42.339419,
						                                            lng: -71.09077,
						                                            title: 'Northeastern University'
						                                        }]
						                                    }
						                                });
						                            	
						                            }
						                    	}
						                }
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
		                                    width:900,
		                                    height:900,
		                                    border: false,
		                                    x: 0,
		                                    y: 0, 
		                                    items: {
		                                        xtype: 'gmappanel',
		                                        center: {}, 
		                                        markers: []
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