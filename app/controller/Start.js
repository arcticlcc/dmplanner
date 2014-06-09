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
        this.fireEvent("clickaddplanbtn");
        button.up('vp').getLayout().setActiveItem(1);
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
