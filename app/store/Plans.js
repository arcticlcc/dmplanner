Ext.define('DMPlanner.store.Plans', {
    extend: 'Ext.data.Store',

    requires: ['DMPlanner.model.Plan'],

    storeId: 'Plans',
    autoLoad: false,
    model: 'DMPlanner.model.Plan'
});