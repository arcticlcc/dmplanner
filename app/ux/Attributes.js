/**
 * GCMD keywords.
 */

Ext.define('DMPlanner.ux.Atttibutes', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dmpattributes',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*'
    ],
    //title: 'Edit Plants',
    //frame: true,

    initComponent: function() {
        var removeTpl =
        '<div data-qtip="Delete Attribute" class="fa dmp-col-delete">&#xf00d;</div>';

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        if (!Ext.ModelManager.getModel('Entity')) {
            Ext.define('Entity', {
                extend: 'Ext.data.Model',
                fields: [{
                    name: 'entityid',
                    type: 'string'
                }, {
                    name: 'codename',
                    type: 'string',
                    useNull: true
                }, {
                    name: 'definition',
                    type: 'string',
                    useNull: true
                }],
                idProperty: 'entityid'
            });
        }

        if (!Ext.ModelManager.getModel('Attribute')) {
            Ext.define('Attribute', {
                extend: 'Ext.data.Model',
                fields: [{
                    name: 'attributeid',
                    type: 'string'
                }, {
                    name: 'codename',
                    type: 'string',
                    useNull: true
                }, {
                    name: 'definition',
                    type: 'string',
                    useNull: true
                }, {
                    name: 'datatype',
                    type: 'string',
                    useNull: true
                }, {
                    name: 'allownull',
                    type: 'boolean',
                    defaultValue: true
                }],
                idProperty: 'attributeid'
            });
        }

        Ext.apply(this, {
            dmpPlugin: true,
            //width: 680,
            //height: 350,
            plugins: [this.cellEditing],
            store: new Ext.data.Store({
                // destroy the store if the grid is destroyed
                autoDestroy: true,
                model: 'Attribute',
                sorters: [{
                    property: 'codename',
                    direction:'ASC'
                }]
            }),
            columns: [{
                header: 'Name',
                dataIndex: 'codeName',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            },{
                header: 'Definition',
                dataIndex: 'definition',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            }, {
                header: 'Data Type',
                dataIndex: 'datatype',
                width: 130,
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    store: [
                        ['Shade','Shade'],
                        ['Mostly Shady','Mostly Shady'],
                        ['Sun or Shade','Sun or Shade'],
                        ['Mostly Sunny','Mostly Sunny'],
                        ['Sunny','Sunny']
                    ]
                })
            }, {
                xtype: 'checkcolumn',
                header: 'Allow Null?',
                dataIndex: 'allownull',
                width: 90,
                stopSelection: false
            }, {
                xtype: 'templatecolumn',
                width: 28,
                text: '',
                hideable: false,
                tpl: removeTpl,
                action: 'removeattribute',
                listeners: {
                    click: {
                        fn: this.onRemoveClick,
                        scope: this
                    }
                }
            }],
            selType: 'cellmodel',
            tbar: [{
                text: 'Add Attribute',
                scope: this,
                handler: this.onAddClick
            }]
        });

        this.callParent();

        /*this.on('afterlayout', this.loadStore, this, {
            delay: 1,
            single: true
        });*/
    },

    loadStore: function() {
        this.getStore().load({
            // store loading is asynchronous, use a load listener or callback to handle results
            callback: this.onStoreLoad
        });
    },

    onStoreLoad: function(){
        Ext.Msg.show({
            title: 'Store Load Callback',
            msg: 'store was loaded, data available for processing',
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
    },

    onAddClick: function(){
        // Create a model instance
        var rec = Ext.ModelManager.getModel('Attribute').create({
            /*common: 'New Plant 1',
            light: 'Mostly Shady',
            price: 0,
            availDate: Ext.Date.clearTime(new Date()),
            indoor: false*/
        });

        this.getStore().insert(0, rec);
        this.cellEditing.startEditByPosition({
            row: 0,
            column: 0
        });
    },

    onRemoveClick: function(view, el, idx, col) {
        var sel = view.getSelectionModel().getSelection();
        view.getStore().remove(sel);
    }
});
