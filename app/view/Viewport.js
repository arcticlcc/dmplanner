Ext.define('DMPlanner.view.Viewport', {
    extend : 'Ext.container.Viewport',
    requires : [//
    'Ext.layout.container.Card',//
    'DMPlanner.view.Start'//
    ],
    alias : 'widget.vp',

    layout : {
        type : 'card'
    },
    items : [{
        xtype : 'start'
    }]
});
