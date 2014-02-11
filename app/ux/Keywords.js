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
    'Ext.tree.plugin.TreeViewDragDrop',
    'Ext.grid.column.Template',
    'Ext.data.Model',
    'Ext.data.Store'
    ],

    layout: {
        type: 'border'
    },
    title: 'Keywords',

    initComponent: function() {
        var me = this, keywordtree;

        Ext.define('DMPlanner.model.KeywordNode', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'keywordid',
                type: 'string'
            }, {
                name: 'text',
                type: 'mystring',
                useNull: true
            }, {
                name: 'definition',
                type: 'mystring',
                useNull: true
            }, {
                name: 'fullname',
                type: 'mystring',
                useNull: true
            }],
            idProperty: 'keywordid',

            proxy: {
                type: 'rest',
                url: 'http://localhost/keyword/tree',
                reader: {
                    type: 'json'
                },
                appendId: true
            }
        });

        keywordtree = {
            xtype: 'treepanel',
            itemId: 'keywordTree',
            title: 'Keyword Tree',
            rootVisible: false,
            store: Ext.create('Ext.data.TreeStore', {
                model: 'KeywordNode',
                storeId: 'Keywords'
            }),
            multiSelect: true,
            singleExpand: true,
            cls: 'pts-keyword-tree',
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
                width: 20,
                text: '',
                hideable: false,
                cls: 'x-action-col-cell',
                tpl: '<tpl if="definition"><div data-qtip="{[Ext.htmlEncode(values.definition)]}" class="pts-col-info"></div></tpl>'
            }]
        };

        Ext.applyIf(me, {
            items: [{
                xtype: 'gridpanel',
                itemId: 'projectKeywords',
                region: 'center',
                multiSelect: true,
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
                //store: 'ProjectKeywords',
                columns: [{
                    text: "Keyword",
                    flex: 1,
                    sortable: true,
                    dataIndex: 'text'
                }],
                title: 'Project Keywords',
                dockedItems: [{
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
                    }/*,
                     {
                     xtype: 'image',
                     itemId: 'delImage',
                     src: 'http://www.sencha.com/img/20110215-feat-html5.png'
                     }*/
                    ]
                }/*,
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
                tabPosition: 'bottom',
                items: [keywordtree, {
                    xtype: 'gridpanel',
                    itemId: 'keywordSearch',
                    title: 'Search',
                    store: Ext.create('Ext.data.TreeStore', {
                        //model: 'Keyword',
                        storeId: 'Keywords'
                    }),
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
                        tpl: '<tpl if="definition"><div data-qtip="{[Ext.htmlEncode(values.definition)]}" class="pts-col-info"></div></tpl>'
                    }, {
                        xtype: 'templatecolumn',
                        width: 28,
                        text: '',
                        hideable: false,
                        cls: 'x-action-col-cell',
                        tpl: '<tpl if="text"><div data-qtip="Add: {[Ext.htmlEncode(values.text)]}" class="pts-col-add"></div></tpl>',
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
