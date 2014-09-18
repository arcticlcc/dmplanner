Ext.define('DMPlanner.controller.Start', {
    extend: 'Ext.app.Controller',

    stores: [//
    'LocalPlans',//
    'Plans'
    ],
    views: ['Start'],

    refs : [{
        ref: 'editBtn',
        selector: 'button#startEditBtn'
    }, {
        ref: 'newBtn',
        selector: 'button#startNewBtn'
    }],

    init: function(application) {
        this.control({
            "button#startNewBtn": {
                click: this.onStartNewClick
            },
            "button#startEditBtn": {
                click: this.onStartEditClick
            },
            "filefield#startLoadBtn": {
                render: this.onRenderLoadBtn
            }
        });

        //event domains
        this.listen({
            store: {
                '#LocalPlans': {
                    load: this.onLoadLocalPlans
                }
            },
            controller: {
                '*': {
                    loadtemplate: this.onLoadTemplate
                }
            }
        });
    },

    onStartNewClick: function(button) {

        var west = button.up('vp').down('container[region=west]'),
            win = Ext.create('Ext.window.Window', {
                title: 'Hello',
                html: 'Please take a moment to read the documentation before continuing.',
                bodyPadding: 10,
                bodyStyle: 'text-align:center;',
                width: 200,
                plain: true,
                closable: false,
                buttonAlign: 'center',
                titleAlign: 'center',
                modal: true,
                buttons: [{
                    text: 'OK',
                    handler: function(b) {
                        b.up('window').close();
                    }
                }]
            });

        west.add(win);
        button.up('vp').getLayout().setActiveItem(1);
        this.fireEvent("clickaddplanbtn");
        win.show();
    },

    onStartEditClick: function(button) {
        button.up('vp').getLayout().setActiveItem(1);
    },

    onLoadLocalPlans: function(store, records) {
        var button = this.getEditBtn();

        if (records.length > 0) {
            button.setText(button.getText() + ' (' + records.length + ')');
            button.enable();
        }
    },

    onRenderLoadBtn: function(btn) {
        FileReaderJS.setupInput(btn.fileInputEl.dom, DMPlanner.app.fileReaderCfg);
    },

    onLoadTemplate: function() {
        this.getNewBtn().enable();
    }

});
