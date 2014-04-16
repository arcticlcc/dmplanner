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
        tooltip : 'Print Plan'
    }, {
        type : 'save',
        tooltip : 'Save to local file'
    }, {
        type : 'help',
        tooltip : 'Get Help'
    }, {
        type : 'gear',
        tooltip : 'Settings',
        handler: function() {
            DMPlanner.app.Settings.show();
        }
    },{
        type: 'mytool',
        tooltip: 'GitHub',
        width: 'auto',
        renderTpl: [
            '<img id="{id}-toolEl" src="{blank}" class="{baseCls}-{type}" role="presentation"/>',
            '<span class="fa">&#xf09b;</span>'
        ],
        handler: function() {
            var ico = '<span class="fa" style="font-size:30px;margin-right:5px;">&#xf09b;</span>';
            Ext.Msg.show({
                 title:'Fork Me!',
                 target: this.getEl(),
                 msg: 'I\'m an open source project.<br /><br />' +
                    '<a href="https://github.com/arcticlcc/dmplanner" class="" target="_blank">' + ico +
                      'Fork me on Github.</a>',
                 buttons: Ext.Msg.OK,
                 glyph: 'xf09b@FontAwesome'
            });
        }
    }]/*,

     tbar : [{
     text : 'Add Plan'
     }]*/
});
