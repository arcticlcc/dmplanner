/**
 * @class Ext.ux.grid.FilterBar
 * @author Josh Bradley (jbradley@arcticlcc.org)
 * Toolbar which adds support for filtering grids
 */
Ext.define("Ext.ux.grid.FilterBar", {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.filterbar',
    requires: [
        'Ext.ux.form.SearchField',
        'Ext.form.field.ComboBox',
        'Ext.data.ArrayStore'
    ],

    /**
     * @cfg {Ext.data.Store} searchStore (required)
     * The store to search.
     */
    searchStore: null,

    /**
     * @cfg array comboData
     * The data for the search combobox store.
     */
    comboData: null,

    initComponent: function() {
        var me = this,
            store = me.searchStore;

        if (store) {
            store = Ext.data.StoreManager.lookup(store);
            //TODO: add exception handling???
            /*store.on({
                scope: me,
                exception: me.onLoadError
            });*/
        }
        me.searchStore = store;

        Ext.applyIf(me, {
            items: [{
                xtype: 'combobox',
                itemId: 'searchCombo',
                fieldLabel: 'Search',
                labelWidth: 50,
                store: Ext.create('Ext.data.ArrayStore', {
                    fields:[ 'fieldId', 'fieldName' ]
                }),
                queryMode: 'local',
                valueField: 'fieldId',
                displayField: 'fieldName',
                triggerAction: 'all',
                editable: false,
                emptyText: 'Select a field',
                listeners: {
                    change: function(cbx, newVal, oldVal) {
                        var disable = newVal === '';
                        cbx.ownerCt.down('searchfield').setDisabled(disable);
                    }
                }
            }, {
                xtype: 'searchfield',
                //width: 250,
                paramName: 'filter',
                flex: 1,
                disabled: true,
                store: me.searchStore,
                onTrigger1Click : function(){
                    var me = this,
                        store = me.store,
                        //proxy = store.getProxy(),
                        val;

                    if (me.hasSearch) {
                        me.setValue('');
                        //proxy.extraParams[me.paramName] = '';
                        //proxy.extraParams.start = 0;
                        store.clearFilter();
                        //store.load();
                        me.hasSearch = false;
                        me.triggerEl.item(0).setDisplayed('none');
                        me.doComponentLayout();
                    }
                },

                onTrigger2Click : function(){
                    var me = this,
                        store = me.store,
                        field = me.ownerCt.down('#searchCombo').getValue(),
                        //proxy = store.getProxy(),
                        value = me.getValue();

                    if (value.length < 1) {
                        me.onTrigger1Click();
                        return;
                    }
                    //proxy.extraParams[me.paramName] = value;
                    //proxy.extraParams.start = 0;
                    store.clearFilter(true);
                    store.filter({
                        "property": field,
                        "value":['ilike', value]
                     });
                    //store.load();
                    me.hasSearch = true;
                    me.triggerEl.item(0).setDisplayed('block');
                    me.doComponentLayout();
                },
                listeners: {
                    render: function(c) {
                    Ext.tip.QuickTipManager.register({
                         target: c.triggerEl,
                         title: "Search Hint",
                         text: "Wildcards % and _ are allowed."
                        });
                    }
                }

            }],
            listeners: {
                added: function(c) {
                    var cols = c.ownerCt.columns,
                        data = [],
                        store = c.down('#searchCombo').getStore();

                    Ext.each(cols, function(c){
                        if(c.dataIndex) {
                            data.push([c.dataIndex, c.text]);
                        }
                    });

                    store.loadData(data);
                },
                removed: function(c, ownerCt) {
                    c.searchStore.clearFilter();
                }
            }
        });

        me.callParent(arguments);
    }

});
