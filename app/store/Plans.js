Ext.define('DMPlanner.store.Plans', {
    extend: 'Ext.data.Store',

    requires: ['DMPlanner.model.Plan'],

    storeId: 'Plans',
    autoLoad: true,
    model: 'DMPlanner.model.Plan'
});