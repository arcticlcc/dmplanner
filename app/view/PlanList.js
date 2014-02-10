Ext.define("DMPlanner.view.PlanList", {
    extend : 'Ext.grid.Panel',
    alias : 'widget.planlist',

    requires : ['Ext.Button', 'Ext.util.*'],

    title : 'Plans',
    columnLines : true,
    store : 'Plans',
    cls : 'planlist',

    columns : [{
        xtype : 'gridcolumn',
        flex : 2,
        dataIndex : 'name',
        text : 'Plans'
    }, {
        xtype : 'gridcolumn',
        flex : 1,
        dataIndex : 'code',
        text : 'Code'
    }],

    tbar : [{
        text : 'Add Plan'
    }]
});
