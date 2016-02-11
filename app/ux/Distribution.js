/**
 * Distribution.
 */

Ext.define('DMPlanner.ux.Distribution', {
    extend: 'DMPlanner.ux.Attributes',
    alias: 'widget.dmpdistribution',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*'
    ],
    //title: 'Edit Plants',
    //frame: true,
    addText: 'Add Row',

    dmpSerialize: function(records) {
        var obj = [];

        Ext.each(records, function(record) {
            var s = Ext.data.writer.Json.prototype.getRecordData(record);
            //don't want to save these
            delete s.leaf;
            delete s.parentId;

            obj.push(s);
        });

        return obj;
    },

    printTemplate: Ext.create('Ext.XTemplate',
        '<div>',
        '<tpl for=".">',
        '{[values.name]}',
                '<ul>',
                '<li>{[values.description]}</li>',
                '<li>{[values.uri]}</li>',
                '<li>{[values.format]}</li>',
                '</ul>',
        '</tpl>',
        '</div>',
        {
            format: function(full, text){
                return full.replace(new RegExp(text + '$'), '<b>' + text + '</b>');
            }
        }
    ),

    dmpPrint: function(data) {
        return this.printTemplate.apply(data);
    },

    initComponent: function() {
        var me = this;
        var removeTpl =
        '<div data-qtip="Delete Attribute" class="fa dmp-col-delete">&#xf00d;</div>';

        me.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });

        if (!Ext.ModelManager.getModel('Distribution')) {
            Ext.define('Distribution', {
                extend: 'Ext.data.Model',
                fields: [{
                    name: 'distributionid',
                    type: 'string'
                }, {
                    name: 'contactid',
                    type: 'string'
                }, {
                    name: 'name',
                    type: 'string',
                    useNull: true
                }, {
                    name: 'format',
                    type: 'string',
                    useNull: true
                }, {
                    name: 'url',
                    type: 'string',
                    useNull: true
                }, {
                    name: 'descritpion',
                    type: 'string',
                    useNull: true
                }, {
                    name: 'function',
                    type: 'string',
                    useNull: true
                }],
                idProperty: 'distributionid'
            });
        }

        Ext.applyIf(me, {
            store: new Ext.data.Store({
                // destroy the store if the grid is destroyed
                autoDestroy: true,
                model: 'Distribution',
                sorters: [{
                    property: 'name',
                    direction:'ASC'
                }],
                listeners: {
                    datachanged: function(store) {
                        var me = this, recs = store.getRange(), data = me.dmpSerialize(recs);

                        me.fireEvent('plugindatachanged', me, data);
                    },
                    scope: me
                }
            }),
            listeners: {
              edit: function(editor, e) {
                var me = this,
                  recs = e.grid.getStore()
                  .getRange(),
                  data = me.dmpSerialize(recs);

                // commit the changes right after editing finished
                e.record.commit();
                me.fireEvent('plugindatachanged', me, data);
              },
              scope: me
            },
            columns: [{
                header: 'Name',
                dataIndex: 'name',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            },{
                header: 'Link',
                dataIndex: 'uri',
                flex: 1,
                editor: {
                    vtype: 'url',
                    allowBlank: false
                }
            },{
                header: 'Description',
                dataIndex: 'description',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            }, {
                header: 'Distributor',
                dataIndex: 'contactid',
                flex: 1,
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
                header: 'Format',
                dataIndex: 'format',
                width: 150,
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    store: [
                      ['documentDigital', 'documentDigital'],
                      ['documentHardcopy', 'documentHardcopy'],
                      ['imageDigital', 'imageDigital'],
                      ['imageHardcopy', 'imageHardcopy'],
                      ['mapDigital', 'mapDigital'],
                      ['mapHardcopy', 'mapHardcopy'],
                      ['modelDigital', 'modelDigital'],
                      ['modelHardcopy', 'modelHardcopy'],
                      ['profileDigital', 'profileDigital'],
                      ['profileHardcopy', 'profileHardcopy'],
                      ['tableDigital', 'tableDigital'],
                      ['tableHardcopy', 'tableHardcopy'],
                      ['videoDigital', 'videoDigital'],
                      ['videoHardcopy', 'videoHardcopy'],
                      ['audioDigital', 'audioDigital'],
                      ['audioHardcopy', 'audioHardcopy'],
                      ['multimediaDigitial', 'multimediaDigitial'],
                      ['multimediaHardcopy', 'multimediaHardcopy'],
                      ['physicalObject', 'physicalObject'],
                      ['diagramDigital', 'diagramDigital'],
                      ['diagramHardcopy', 'diagramHardcopy'],
                      ['webSite', 'webSite'],
                      ['webService', 'webService'],
                      ['databaseDigital', 'databaseDigital']
                    ]
                })
            }, {
                header: 'Function',
                dataIndex: 'function',
                width: 120,
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    store: [
                      ['download', 'download'],
                      ['information', 'information'],
                      ['offlineAccess', 'offlineAccess'],
                      ['order', 'order'],
                      ['search', 'search'],
                      ['completeMetadata', 'completeMetadata'],
                      ['browseGraphic', 'browseGraphic'],
                      ['upload', 'upload'],
                      ['emailService', 'emailService'],
                      ['browsing', 'browsing'],
                      ['fileAccess', 'fileAccess'],
                      ['webApplication', 'webApplication']
                    ]
                })
            }, {
                xtype: 'templatecolumn',
                width: 28,
                text: '',
                hideable: false,
                tpl: removeTpl,
                listeners: {
                    click: {
                        fn: me.onRemoveClick,
                        scope: me
                    }
                }
            }]
        });

        this.callParent();
    },

    onAddClick: function(){
        // Create a model instance
        var rec = Ext.ModelManager.getModel('Distribution').create({
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
    }
});
