Ext.define('DMPlanner.store.Plans', {
    extend: 'Ext.data.Store',

    requires: ['DMPlanner.model.Plan'],

    storeId: 'Plans',
    autoLoad: false,
    autoSync: true,
    model: 'DMPlanner.model.Plan'
});