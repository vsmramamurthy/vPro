Ext.define('verizon.view.loginForm' ,{
    extend: 'Ext.form.FormPanel',
    alias : 'widget.loginform',
    name: 'loginform',
    frame: true,
    title: 'Verizon Wireless Verification',
    frame:true,
    width: 500,
    bodyPadding: 10,
    
    defaultType: 'textfield',
    defaults: {
        anchor: '100%'
    },
    
    items: [
        {
            allowBlank: false,
            fieldLabel: 'Verizon Phone Number',
            name: 'verizonPhoneNumber',
            labelWidth: 150,
            id: 'verizonPhoneNumber'
        }
    ],
    
    buttons: [ { text:'Login',
          		 name: 'loginButton',
          		 action: 'login'
          		 
          	}
    ]
});
/*Ext.define('verizon.view.loginForm' ,{
    extend: 'Ext.form.FormPanel',
    extend: 'Ext.form.FormPanel',
    alias : 'widget.loginform',
    name: 'loginform',
    frame: true,
    title: 'Verizon Wireless Verification',
    bodyPadding: '5px 5px 0',
    width: 450,
    height: 150,
    
    fieldDefaults: {
        labelWidth: 150,
        msgTarget: 'side',
        autoFitErrors: false
    },
    defaults: {
        width: 300,
        inputType: 'password'
    },
    defaultType: 'textfield',
    
    initComponent: function() {
        this.buttons = [
        {
        name: 'loginButton',
            text: 'Login',
            action: 'login'
        }
        ];
        
        this.items = [
        {
            fieldLabel: 'Verizon Phone Number',
            name: 'verizonPhoneNumber',
            id: 'verizonPhoneNumber',
            inputType: 'text'
        }
        ];
        
        this.callParent(arguments);
    }
});*/