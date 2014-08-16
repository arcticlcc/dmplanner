Ext.define("DMPlanner.view.PlanList", {
    extend : 'Ext.grid.Panel',
    alias : 'widget.planlist',

    requires : ['Ext.Button', 'Ext.util.*', 'Ext.selection.RowModel', 'Ext.grid.plugin.RowEditing'],

    title : 'Plans',
    columnLines : true,
    store : 'Plans',
    cls : 'planlist',
    selType : 'rowmodel',
    plugins : [{
        ptype : 'rowediting',
        clicksToEdit : 2,
        clicksToMoveEditor: 1
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
        tooltip : 'Save to local file',
        width: 'auto',
        renderTpl: [
            //'<img id="{id}-toolEl" src="{blank}" class="{baseCls}-{type}" role="presentation"/>',
            '<span class="fa">&#xf0c7;</span>'
        ]
    }, {
        type : 'loadfile',
        xtype: 'filebutton',
        glyph: 'xf093@FontAwesome',
        margin: '0 0 0 6',
        cls: 'x-tool',
        ui: 'plain',
        renderTpl: [
            '<span id="{id}-btnWrap" class="{baseCls}-wrap',
                '<tpl if="splitCls"> {splitCls}</tpl>',
                '{childElCls}" unselectable="on">',
                '<span id="{id}-btnEl" class="{baseCls}-button">',
                    '<span id="{id}-btnInnerEl" class="{baseCls}-inner {innerCls}',
                        '{childElCls}" unselectable="on">',
                        '{text}',
                    '</span>',
                    '<span role="img" id="{id}-btnIconEl" class="{baseCls}-icon-el {iconCls} fa',
                        '{childElCls} {glyphCls}" unselectable="on" style="',
                        '<tpl if="iconUrl">background-image:url({iconUrl});</tpl>',
                        '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">',
                        '<tpl if="glyph">&#{glyph};</tpl><tpl if="iconCls || iconUrl">&#160;</tpl>',
                    '</span>',
                '</span>',
            '</span>',
            '<input id="{id}-fileInputEl" class="{childElCls} {inputCls} x-tool-filebutton" type="file" size="1" name="{inputName}">'
        ],
        tooltip : 'Load a local file',
        width: 16
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
            //'<img id="{id}-toolEl" src="{blank}" class="{baseCls}-{type}" role="presentation"/>',
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
    }],

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {

            selModel: {
                listeners : {
                    select : function(sm, record, rowIndex) {
                        this.getView().addRowCls(rowIndex, 'dmp-row-hilite');
                    },
                    deselect : function(sm, record, rowIndex) {
                        this.getView().removeRowCls(rowIndex, 'dmp-row-hilite');
                    },
                    scope :me
                }
            }

        });

        me.callParent(arguments);
    }
});
