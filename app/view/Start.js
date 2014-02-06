Ext.define("DMPlanner.view.Start", {
    extend : 'Ext.container.Container',
    alias : 'widget.start',

    requires : ['Ext.Button'],

    layout : {
        align : 'center',
        pack : 'center',
        type : 'vbox'
    },

    items : [{
        xtype : 'button',
        anchor : '100%',
        itemId : 'startBtn',
        text : 'Start a New Plan',
        scale   : 'large'
    }]
});
