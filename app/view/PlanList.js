Ext.define("DMPlanner.view.PlanList", {
    extend : 'Ext.grid.Panel',
    alias : 'widget.planlist',

    requires : ['Ext.Button', 'Ext.util.*', 'Ext.selection.CellModel', 'Ext.grid.plugin.CellEditing'],

    title : 'Plans',
    columnLines : true,
    store : 'Plans',
    cls : 'planlist',
    selType : 'cellmodel',
    plugins : [{
        ptype : 'cellediting',
        clicksToEdit : 2
    }],

    columns : [{
        xtype : 'gridcolumn',
        flex : 2,
        dataIndex : 'name',
        text : 'Plans',
        editor : {
            xtype : 'textfield',
            allowBlank : false
        }
    }, {
        xtype : 'gridcolumn',
        flex : 1,
        dataIndex : 'code',
        text : 'Code',
        editor : {
            xtype : 'textfield',
            allowBlank : true
        }
    }, {
        xtype: 'templatecolumn',
        width: 28,
        text: '',
        hideable: false,
        style: {cursor: 'pointer'},
        action: 'deleteplan',
        tpl: '<tpl><div data-qtip="Delete Plan: {[values.name]}" class="fa">&#xf00d;</div></tpl>'
    }],
    collapseFirst : false,
    tools : [{
        type : 'plus',
        tooltip : 'Add a New Plan',
        itemId : 'addPlan'
    }, {
        type : 'print',
        tooltip : 'Print to PDF'
    }, {
        type : 'save',
        tooltip : 'Save to local file'
    }, {
        type : 'help',
        tooltip : 'Get Help'
    }]/*,

     tbar : [{
     text : 'Add Plan'
     }]*/
});
