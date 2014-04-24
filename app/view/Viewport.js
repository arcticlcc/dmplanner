Ext.define('DMPlanner.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [//
    'Ext.resizer.Splitter', //
    'Ext.layout.container.Card', //
    'DMPlanner.view.Start',//
    'DMPlanner.view.Section',//
    'DMPlanner.ux.*'
    ],
    alias: 'widget.vp',

    layout: {
        type: 'card'
    },
    items: [{
        xtype: 'start'
    }, {
        xtype: 'container',
        itemId: 'mainContainer',
        layout: {
            align: 'stretch',
            type: 'hbox'
        },
        items: [{
            xtype: 'container',
            minWidth: 200,
            flex: 1,
            layout: {
                align: 'stretch',
                type: 'vbox'
            },
            items: [{
                xtype: 'planlist',
                flex: 1,
                collapsible: true,
                collapseDirection: 'top'
            }, {
                xtype: 'splitter'//,
                //collapsible: true,
                //collapseTarget: 'prev'
            }, {
                xtype: 'sectionlist',
                flex: 2,
                hidden: true
            }]
        }, {
            xtype: 'splitter'
        }, {
            xtype: 'sectionpanel',
            flex: 3
        }]
    }]
});
