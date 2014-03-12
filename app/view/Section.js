Ext.define("DMPlanner.view.Section", {
    extend: 'Ext.Panel',
    alias: 'widget.sectionpanel',

    html: '<div style="text-align:center;margin-top:3em;"><b>Please select a plan from the '
            + 'list on the left.</b><br/><br/>This is a demo.</div>',
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
});