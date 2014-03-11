/**
 * Grid for use with GeoExt map panels.
 */
Ext.define('DMPlanner.ux.MapFeatureGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.featuregrid',
    requires: [
        'Ext.grid.Panel',//
        'Ext.data.Model',//
        'GeoExt.data.FeatureStore',//
        'GeoExt.selection.FeatureModel',//
        'Ext.grid.plugin.CellEditing'//
    ],

    layer: undefined,

    /**
     * @cfg {GeoExt.data.FeatureStore} store (required)
     * The {@link GeoExt.data.FeatureStore Store} the grid should use as its data source.
     */
    store: undefined,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            itemId: 'featureGrid',
            store: Ext.create('GeoExt.data.FeatureStore', {
                storeId: 'PlanFeatures',
                layer: me.layer,
                autoLoad: false,
                autoDestroy: true,
                fields: [
                    {
                        name: 'fid',
                        convert: function(value, record) {
                            // record.raw a OpenLayers.Feature.Vector instance
                            if (record.raw instanceof OpenLayers.Feature.Vector) {
                                return record.raw.fid;
                            } else {
                                return "This is not a Feature";
                            }
                        }
                    },
                    {name: 'projectid', type: 'int', useNull: true},
                    {name: 'name', type: 'mystring', useNull: true},
                    {name: 'comment', type: 'mystring', useNull: true}
                ],
                sorters: [
                    'name'
                ]
            }),
            height: 250,
            split: true,
            autoScroll: true,
            title: 'Feature List',
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    flex: 1,
                    text: 'Name',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'comment',
                    flex: 2,
                    text: 'Description',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                }
            ],
            selModel: {
                //autoPanMapOnSelection: true,
                selectControl: {
                    id: 'dmplanner-select-row'
                }
            },
            selType: 'featuremodel',
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    pluginId: 'cellEdit',
                    clicksToEdit: 1
                })
            ]
        });
        me.callParent(arguments);

        me.on('viewready',function(view) {
            var ctl,
                addId,
                sel  = view.getSelectionModel().selectControl,
                hover = this.up('dmpmap').map.getControlsBy('id','dmp-select-hover')[0],
                store = view.getStore(),
                edit = view.getPlugin('cellEdit');

            sel.onSelect = function(feature) {
                ctl = this.map.getControlsBy('id','dmp-modify-feature')[0];

                if(ctl.active) {
                    ctl.selectFeature(feature);
                }
            };

            //add the plan_id to new records
            addId = function(store, records) {
                    Ext.each(records, function(r) {
                        r.beginEdit();
                        r.set('planid',view.up('dmpmap').planId);
                        r.endEdit();
                    });
                };

            //register listeners to update records
            store.on({
                add: addId,
                load: addId
            });
            //don't allow editing or selecting records marked for deletion
            edit.on({
                beforeedit: function(editor, e) {
                    if(e.record.raw.state === OpenLayers.State.DELETE) {
                        return false;
                    }
                }
            });

            view.ownerCt.on({
                beforeselect: function(grid, rec) {
                    if(rec.raw.state === OpenLayers.State.DELETE) {
                        return false;
                    }
                }
            });

            view.on({
                //view listeners to highlight features on mouse over/out
                itemmouseenter: function(view, rec) {
                    if(view.ownerCt.getPlugin('cellEdit').activeRecord !== rec) {
                        var ctl = rec.raw.layer.map.getControlsBy('id','dmp-select-hover')[0];
                        ctl.overFeature(rec.raw, true);
                    }
                },
                itemmouseleave: function(view, rec) {
                    var ctl,
                        layer = rec.raw.layer,
                        map = layer.map;

                    if(view.ownerCt.getPlugin('cellEdit').activeRecord !== rec) {
                        ctl = map.getControlsBy('id','dmp-select-hover')[0];
                        ctl.outFeature(rec.raw);
                    } else{
                        //map.getControlsBy('id','dmp-select-hover')[0].highlight(rec.raw);
                        layer.drawFeature(rec.raw, 'select');
                    }
                },
                //remove the add/load listeners from the store
                destroy: function(view) {
                    store.un('add',addId, store);
                    store.un('load',addId, store);
                },
                scope: this
            });
        });

        me.on('deselect', function(rm, rec, idx) {
            var cell = rm.view.ownerCt.getPlugin('cellEdit');

            cell.completeEdit();
            rm.selectControl.unselect(rec.raw);
        });
    }
});
