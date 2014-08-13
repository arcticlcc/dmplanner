Ext.define("DMPlanner.view.Section", {
    extend: 'Ext.Panel',
    alias: 'widget.sectionpanel',

    items: [{
        itemId: 'homeDoc',
        padding: 15,
        bodyStyle: {overflowY: 'auto'},
        html: '<div style="text-align:center;margin-top:3em;"><b>Please select a plan from the list on the left.</b></div>',
        loader: {
            autoLoad: false,
            loadMask: true,
            renderer: function(loader, response, active) {
                var markup = '<div class="dmp-marked">' + marked(response.responseText) + '</div>';
                loader.getTarget().update(markup);
                return true;
            }
        }
    }, {
        xtype: 'panel',
        itemId: 'sectionContainer',
        dockedItems: [{
            xtype: 'toolbar',
            itemId: 'bottomNavBar',
            height: 50,
            padding: 10,
            defaults: {
                minWidth: 60
            },
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'left'
            },
            dock: 'bottom'
        }],
        layout: {
            type: 'fit'
        }
    }],
    layout: {
        type: 'card'
    }
});
