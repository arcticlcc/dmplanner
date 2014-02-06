Ext.define('DMPlanner.store.Sections', {
    extend: 'Ext.data.Store',

    requires: ['DMPlanner.model.Section'],

    storeId: 'Groups',
    model: 'DMPlanner.model.Section'
});