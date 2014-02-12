/**
 * GCMD keywords.
 */

Ext.define('DMPlanner.ux.Keywords', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dmpkeywords',
    requires: [
    //'PTS.view.controls.KeywordTree',
    'Ext.ux.grid.FilterBar',
    'Ext.grid.plugin.DragDrop',
    'Ext.grid.column.Template',
    'Ext.tree.plugin.TreeViewDragDrop',
    'Ext.data.Model',
    'Ext.data.Store',
    'Ext.data.TreeStore',
    'Ext.data.proxy.Rest',
    'Ext.data.proxy.JsonP',
    'Ext.layout.container.Border',
    'Ext.tab.Panel',
    'Ext.tree.Panel'
    ],

    layout: {
        type: 'border'
    },
    title: 'Keywords',

    initComponent: function() {
        var me = this, keywordtree;

        if(!Ext.ModelManager.getModel('KeywordNode')){
          Ext.define('KeywordNode', {
              extend: 'Ext.data.Model',
              fields: [{
                  name: 'keywordid',
                  type: 'string'
              }, {
                  name: 'text',
                  type: 'string',
                  useNull: true
              }, {
                  name: 'definition',
                  type: 'string',
                  useNull: true
              }, {
                  name: 'fullname',
                  type: 'string',
                  useNull: true
              }],
              idProperty: 'keywordid',

              proxy: {
                  type: 'jsonp',
                  //url: 'resources/kw.json',
                  url: 'http://localhost:8088/keyword/tree',
                  reader: {
                      type: 'json'
                  },
                  appendId: true
              }
          });
        }

        if(!Ext.getStore('KeywordNodes')){
            Ext.create('Ext.data.TreeStore', {
                    model: 'KeywordNode',
                    storeId: 'KeywordNodes',
                    clearOnLoad: true,
                    autoLoad: false,
                    defaultRootId: ''
            }).load();
        }
        if(!Ext.getStore('Keywords')){
            Ext.create('Ext.data.Store', {
                model: 'KeywordNode',
                storeId: 'Keywords',
                autoLoad: false,
                remoteSort: true,
                remoteFilter: true,
                sorters: { property: 'text', direction : 'ASC' },

                proxy: {
                    type: 'jsonp',
                    //url : 'resources/kwlist.json',
                    url : 'http://localhost:8088/keywordlist',
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                }
            }).load();
        }

        keywordtree = {
            xtype: 'treepanel',
            itemId: 'keywordTree',
            title: 'Keyword Tree',
            rootVisible: false,
            store: 'KeywordNodes',
            multiSelect: true,
            singleExpand: true,
            cls: 'dmp-keyword-tree',
            hideHeaders: true,
            viewConfig: {
                copy: true,
                plugins: {
                    ptype: 'treeviewdragdrop',
                    dragGroup: 'keywords'
                }
            },
            columns: [{
                xtype: 'treecolumn',
                text: 'Keyword',
                dataIndex: 'text',
                flex: 1
            }, {
                xtype: 'templatecolumn',
                width: 28,
                text: '',
                hideable: false,
                cls: 'x-action-col-cell',
                tpl: '<tpl if="definition"><div data-qtip="{[Ext.htmlEncode(values.definition)]}" class="dmp-col-info">?</div></tpl>'
            }]
        };

        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                itemId: 'projectKeywords',
                region: 'center',
                multiSelect: true,
                hideHeaders: true,
                viewConfig: {
                    stripeRows: false,
                    plugins: {
                        ptype: 'gridviewdragdrop',
                        dropGroup: 'keywords',
                        dragGroup: 'deletekeywords'
                    },
                    getRowClass: function(record, rowIndex, rowParams, store) {
                        return record.phantom ? 'pts-grid-row-phantom' : '';
                    }
                },
                //store: 'PlanKeywords',
                columns: [{
                    text: "Keyword",
                    flex: 1,
                    sortable: true,
                    dataIndex: 'text'
                }],
                title: 'Keywords',
                dockedItems: [/*{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'button',
                        iconCls: 'pts-menu-deletebasic',
                        text: 'Remove',
                        action: 'removekeywords'
                    }, {
                        xtype: 'button',
                        iconCls: 'pts-menu-savebasic',
                        text: 'Save',
                        action: 'savekeywords'
                    }, {
                        xtype: 'button',
                        iconCls: 'pts-menu-refresh',
                        text: 'Refresh',
                        action: 'refreshkeywords'
                    }
                    ]
                },
                 {
                 xtype: 'pagingtoolbar',
                 store: 'ProjectKeywords',
                 displayInfo: true
                 }*/
                ]
            }, {
                xtype: 'tabpanel',
                flex: 1,
                title: 'Keywords',
                preventHeader: true,
                region: 'west',
                split: true,
                activeTab: 0,
                tabPosition: 'top',
                items: [
                  keywordtree,
                  {
                    xtype: 'gridpanel',
                    itemId: 'keywordSearch',
                    title: 'Search',
                    store: 'Keywords',
                    hideHeaders: true,
                    columns: [{
                        xtype: 'gridcolumn',
                        dataIndex: 'text',
                        flex: 1,
                        text: 'Keyword',
                        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                            var fullname = record.get('fullname');

                            if (fullname) {
                                return '<span data-qtip="' + fullname + '">' + value + '</span>';
                            }
                            return value;
                        }
                    }, {
                        xtype: 'gridcolumn',
                        hidden: true,
                        dataIndex: 'fullname',
                        flex: 2,
                        text: 'Full Path'
                    }, {
                        xtype: 'templatecolumn',
                        width: 28,
                        text: '',
                        hideable: false,
                        cls: 'x-action-col-cell',
                        tpl: '<tpl if="definition"><div data-qtip="{[Ext.htmlEncode(values.definition)]}" class="dmp-col-info">?</div></tpl>'
                    }, {
                        xtype: 'templatecolumn',
                        width: 28,
                        text: '',
                        hideable: false,
                        cls: 'x-action-col-cell',
                        tpl: '<tpl if="text"><div data-qtip="Add: {[Ext.htmlEncode(values.text)]}" class="pts-col-add">&gt;</div></tpl>',
                        action: 'addkeyword'
                    }],
                    viewConfig: {
                        copy: true,
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            dragGroup: 'keywords'
                        }
                    },
                    dockedItems: [{
                        xtype: 'filterbar',
                        searchStore: 'Keywords',
                        dock: 'top'
                    }/*, {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: 'Keywords',
                        dock: 'top'
                    }*/]
                }]
            }]
        });

        me.callParent(arguments);
    }
});
