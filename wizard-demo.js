
Ext.onReady(function () {

    Ext.QuickTips.init();


    var cards = new Array();

    // first card with welcome message 
    cards.push(Ext.create('Ext.ux.wizard.Card', {
        title: 'Sign Up',
        showTitle: true,
        titleCls: '',
        titleStyle: 'font-size: 2.5em;',
        baseCls: 'rnd1',
        items: [{
            border: false,
            bodyStyle: 'background:none;',
            html: 'Welcome to the example for <strong>Ext.ux.Wiz</string>, ' +
                'an Ext JS user extension for creating wizards.<br/><br/>' +
                'Please click the "next"-button and fill out all form values.'
        }]
    }));

    // second card with input fields last/firstname 
    cards.push(new Ext.ux.wizard.Card({
        title: 'Your name',
        showTitle: true,
        titleCls: '',
        titleStyle: 'font-size: 2.5em;',
        monitorValid: true,
        baseCls: 'rnd1',
        defaults: {
            labelStyle: 'font-size:12px'
        },
        fieldDefaults: {
            labelAlign: 'right',
            msgTarget: 'none',
            invalidCls: '' //unset the invalidCls so individual fields do not get styled as invalid
        },
        items: [{
            border: false,
            bodyStyle: 'background:none;padding-bottom:30px;',
            html: 'Please enter your first- and your lastname. <br/><br/>Only letters, underscores and hyphens are allowed.'
        }, { bodyStyle: 'background:lightblue;padding-bottom:30px;' }, 
        new Ext.form.TextField({
            name: 'firstname',
            fieldLabel: 'Firstname',
            allowBlank: false,
            anchor: '50%',
            validator: function (v) {
                var t = /^[a-zA-Z_\- ]+$/;
                return t.test(v);
            }
        }),
        new Ext.form.TextField({
            name: 'lastname',
            fieldLabel: 'Lastname',
            allowBlank: false,
            anchor: '60%',
            validator: function (v) {
                var t = /^[a-zA-Z_\- ]+$/;
                return t.test(v);
            }
        }),
        new Ext.form.TextField({
            name: 'company',
            fieldLabel: 'Company/Group Name',
            allowBlank: true,
            anchor: '80%',
            validator: function (v) {
                var t = /^[a-zA-Z_\- ]+$/;
                return t.test(v);
            }
        }), { bodyStyle: 'background:lightblue;padding-bottom:30px;'}]
    }));

    // third card with input field email-address 
    cards.push(new Ext.ux.wizard.Card({
        title: 'User Identification',
        showTitle: true,
        titleCls: '',
        titleStyle: 'font-size: 2.5em;',
        monitorValid: true,
        baseCls: 'rnd1',
        margins: '10 10 10 10',
        defaults: {
            labelStyle: 'font-size:11px'
        },
        items: [{
            border: false,
            bodyStyle: 'background:none;padding-bottom:30px;',
            html: ' Provide user login information.<br/><br/>Please pick username and <br/> enter your contact email-address to confirm.'
        }, { bodyStyle: 'background:lightblue;padding-bottom:30px;' }, 
        new Ext.form.TextField({
            name: 'username',
            fieldLabel: 'Username',
            allowBlank: false
        }),
        new Ext.form.TextField({
            name: 'password',
            fieldLabel: 'Password',
            allowBlank: false
        }),
        new Ext.form.TextField({
            name: 'cpassword',
            fieldLabel: 'Confirm Password',
            allowBlank: false,
            /**
            * Custom validator implementation - checks that the value matches what was entered into
            * the password1 field.
            */
            validator: function (value) {
                var password1 = this.previousSibling('[name=password]');
                return (value === password1.getValue()) ? true : 'Passwords do not match.'
            }
        }), {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email-Address',
            allowBlank: false,
            vtype: 'email'
        },{bodyStyle: 'background:lightblue;padding-bottom:30px;'}, {
            xtype: 'checkboxfield',
            name: 'receive',
            checked: true,
            fieldLabel: '',
            boxLabel: 'I\'d like to receive communications about product information and<br/> services including tips and FAQs',
            allowBlank: false
        }]
    }));

    // fourth card with finish-message 
    cards.push(new Ext.ux.wizard.Card({
        title: 'Finished!',
        showTitle: true,
        titleCls: '',
        titleStyle: 'font-size: 2.5em;',
        monitorValid: true,
        baseCls: 'rnd1',
        items: [{
            border: false,
            bodyStyle: 'background:none;',
            html: 'Thank you for testing this wizard. Your data has been collected ' +
                'and can be accessed via a call to <pre><code>this.getWizardData</code></pre>' +
                'When you click on the "finish"-button, the "finish"-event will be fired.<br/>' +
                'If no attached listener for this event returns "false", this dialog will be ' +
                'closed. <br />'
        }]
    }));


    var wizard = new Ext.ux.Wizard({

        // title: 'A simple example for a wizard'

        // no headConfig suplied no header will be shown.
        headConfig: {
            // title: 'Simple Wizard Head title Example',
            headerPosition: 'top',
            position: 'top'         // or bottom
            , stepText: "<center>Step {0} of {1}: {2}</center>"
        },

        // no sideConfig suplied no header will be shown.
        sideConfig: {
            // title: 'Simple Wizard Side title Example',
            headerPosition: 'left',
            position: 'left'         // or right
        },

        width: 850, height: 800,
        closable: false,

        includeHeaderPanel: true,
        includeSidePanel: true,

        cardPanelConfig: {
            defaults: {
                baseCls: 'x-small-editor',
                bodyStyle: 'padding:40px 15px 5px 120px;background-color:#F6F6F6;',
                border: false
            },
            layout: 'card'
        },

        cards: cards
    });

    wizard.on(
        'finish',
        function (me, data) {
            alert("done. Thanks for enterring the following data\n" + Ext.encode(data));
        }
    );

    wizard.on(
        'cancel',
        function (me, data) {
            alert("Sorry you cancelled.\nYou enterred\n" + Ext.encode(data));
        }
    );

    // show the wizard 
    wizard.show();
});  
