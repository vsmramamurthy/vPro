Ext.define('verizon.view.homeForm', {
	extend: 'Ext.form.FormPanel',
    alias : 'widget.homeform',
    name: 'homeform',
    frame: true,
    bodyPadding: 10,
    defaults: {
        anchor: '100%'
    },
    layout: {
        type: 'border',
        padding: 5
    },
    items: [{
        region: 'west',
        title: 'Navigation',
        width: 200,
        split: true,
        collapsible: true,
        floatable: false
    }, {
        region: 'center',
        xtype: 'tabpanel',
        items: [{
            // LTR even when example is RTL so that the code can be read
            rtl: false,
            title: 'Bogus Tab',
            html: '<p>Window configured with:</p><pre style="margin-left:20px"><code>header: {\n    titlePosition: 2,\n    titleAlign: "center"\n},\nmaximizable: true,\ntools: [{type: "pin"}],\nclosable: true</code></pre>'
        }, {
            title: 'Another Tab',
            html: 'Hello world 2'
        }, {
            title: 'Closable Tab',
            html: 'Hello world 3',
            closable: true
        }
    
    ]
	}]

});