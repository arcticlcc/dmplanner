Ext.define("DMPlanner.view.SectionList", {
    extend : 'Ext.grid.Panel',
    alias : 'widget.sectionlist',
    requires : ['Ext.button.Cycle'],


    title : 'Sections',
    columnLines : false,
    hideHeaders : true,
    store : null,//'Sections',
    cls : 'sectionList',
    header:{
        titlePosition: 0,
        items:[{
            itemId: 'levelButton',
            xtype:'cycle',
            showText: true,
            prependText: 'Plan Level: ',
            menu: {
                items:[{
                    text: 'Default',
                    level: 0
                }]
            },
            hidden: true
        }]
    },
    tools : [{
        type : 'home',
        tooltip : 'Home',
        width: 'auto',
        renderTpl: [
            '<span class="fa">&#xf015;</span>'
        ]
    }],

    columns : [{
        flex : 1,
        dataIndex : 'name',
        text : 'Section'
    }]
});