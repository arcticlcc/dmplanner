Ext.define('DMPlanner.model.LocalPlan', {
    extend: 'Ext.data.Model',

    fields: ['id', 'plan','planid'],
    proxy: {
        type: 'localstorage',
        id: 'dmp-plans'
    }
});