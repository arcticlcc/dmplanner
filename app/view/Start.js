Ext.define("DMPlanner.view.Start", {
    extend : 'Ext.container.Container',
    alias : 'widget.start',

    requires : ['Ext.Button','Ext.form.field.File'],

    layout : {
        align : 'center',
        pack : 'center',
        type : 'vbox'
    },

    defaults: {
        margin: 5
    },
    items : [{
        xtype : 'button',
        anchor : '100%',
        itemId : 'startNewBtn',
        text : 'Start a New Plan',
        glyph: 'xf067@FontAwesome',
        scale   : 'large'
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
            text : 'Load Plan from File',
            glyph: 'xf093@FontAwesome',
            scale   : 'large'
        },
        disabled: false
    }]
});
