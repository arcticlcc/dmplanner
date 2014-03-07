Ext.define('DMPlanner.model.LocalPlan', {
    extend: 'Ext.data.Model',

    fields: ['id', 'plan'],
    proxy: {
        type: 'localstorage',
        id: 'dmp-plans'
    }
});