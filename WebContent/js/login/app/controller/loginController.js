Ext.define('verizon.controller.loginController', {
    extend: 'Ext.app.Controller',
    views: [ 'loginForm'],
    refs: [
           {
               ref: 'loginForm',
               selector: 'form'
           },
           {
        	   ref: 'loginButton',
        	   selector: 'loginform button[action=login]'
           }
       ],
    
    init: function() {
        this.control({
        'loginform button[action=login]': {
            click: function(button) {
            var loginButton = button;
            var loginForm = this.getLoginForm();
            
            
            console.log('loginForm',loginForm.getForm());
            
        	Ext.Ajax.request({ // 5
				url : '/VerizonBusinessPrj/loginsession',
				scope : this,
				params : {
				verizonPhoneNumber:Ext.getCmp('verizonPhoneNumber').getValue()
				//key:Ext.MessageBox.alert(recordsToInsertUpdate)
			},
			success:    function(result,request){
				alert('Success');
			}
			});
        	
        	
            //detailedEdit_Gridcontact.getForm().getEl().dom.action = './detailedEditContact';
			//detailedEdit_Gridcontact.getForm().getEl().dom.method = 'POST';
            
            
            
           /* this.getLoginForm().form.submit({
                        waitMsg:'Loading...',
                        url: '/VerizonBusinessPrj/loginsession',
                        method: 'POST',
                        success: function(form,action) {
                            loginButton.setVisible(false);
                            logoutButton.setVisible(true);
                        },
                        failure: function(form,action){
                            Ext.MessageBox.alert('Error', "Invalid username/password");
                        },
                        params: {
                           view: 'sencha',
                           json: true
                        }
               });*/
            }
            }
        });
    }
});