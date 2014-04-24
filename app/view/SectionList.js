Ext.define("DMPlanner.view.SectionList", {
    extend : 'Ext.grid.Panel',
    alias : 'widget.sectionlist',

    title : 'Sections',
    columnLines : false,
    hideHeaders : true,
    store : null,//'Sections',
    cls : 'sectionList',
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