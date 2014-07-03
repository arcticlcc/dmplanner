Ext.define('DMPlanner.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [//
        'Ext.resizer.Splitter', //
        'Ext.layout.container.Card', //
        'DMPlanner.view.Start', //
        'DMPlanner.view.Section', //
        'DMPlanner.ux.*'//
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
            type: 'border'
        },
        defaults: {
            split: true
        },
        items: [{
            xtype: 'container',
            region: 'west',
            minWidth: 200,
            width: '20%',
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
            xtype: 'sectionpanel',
            region: 'center'
        }, {
            xtype: 'panel',
            itemId: 'helpSection',
            region: 'east',
            autoScroll: true,
            title: 'Help',
            bodyPadding: 15,
            html: '<div style="text-align:center;"><b>No help is available for this section.</b></div>',
            collapsible: true,
            collapsed: true,
            width: '20%',
            bodyStyle: {
                background: '#fefefe' //TODO: SASS this
            },
            loader: {
                autoLoad: false,
                loadMask: true,
                renderer: function(loader, response, active) {
                    var markup = marked(response.responseText);
                    loader.getTarget().update(markup);
                    return true;
                }
            }
        }]
    }]
});
