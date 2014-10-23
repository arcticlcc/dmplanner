Ext.define("DMPlanner.view.Start", {
    extend : 'Ext.container.Container',
    alias : 'widget.start',

    requires : ['Ext.Button','Ext.form.field.File'],

    layout : {
        align : 'center',
        pack : 'center',
        type : 'vbox'
    },
    html:'<span id="forkongithub"><a href="https://github.com/arcticlcc/dmplanner">Fork me on GitHub</a></span>',
    defaults: {
        margin: 5
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items : [{
                xtype: 'box',
                itemId: 'startDoc',
                minHeight: 200,
                maxWidth: 600,
                loader: {
                    autoLoad: false,
                    loadMask: true,
                    renderer: function(loader, response, active) {
                        var markup = marked(response.responseText);
                        loader.getTarget().update(markup);
                        return true;
                    }
                }
            }, {
                xtype : 'button',
                anchor : '100%',
                itemId : 'startNewBtn',
                text : 'Start a New Plan',
                glyph: 'xf067@FontAwesome',
                scale   : 'large',
                disabled: true
            }, {
                xtype : 'button',
                anchor : '100%',
                itemId : 'startEditBtn',
                text : 'Edit Existing Plan',
                glyph: 'xf044@FontAwesome',
                scale   : 'large',
                disabled: true
            }, {
                xtype : 'filefield',
                anchor : '100%',
                itemId : 'startLoadBtn',
                buttonOnly: true,
                buttonConfig: {
                    text : 'Load Plan from File*',
                    glyph: 'xf093@FontAwesome',
                    scale   : 'large'
                },
                disabled: false
            }, {
                xtype: 'box',
                html: '*Or drag-n-drop a file anywhere on this window.'
            }]
        });

        me.callParent(arguments);
    }
});
