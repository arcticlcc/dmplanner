Ext.define('DMPlanner.store.LocalPlans', {
    extend: 'Ext.data.Store',

    requires: ['DMPlanner.model.LocalPlan'],

    storeId: 'LocalPlans',
    autoLoad: false,
    model: 'DMPlanner.model.LocalPlan'
});