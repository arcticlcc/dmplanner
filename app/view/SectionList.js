Ext.define("DMPlanner.view.SectionList", {
    extend : 'Ext.grid.Panel',
    alias : 'widget.sectionlist',

    title : 'Sections',
    columnLines : false,
    hideHeaders : true,
    store : null,//'Sections',
    cls : 'sectionList',

    columns : [{
        flex : 1,
        dataIndex : 'name',
        text : 'Section'
    }]
});