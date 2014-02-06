Ext.define('DMPlanner.store.Groups', {
    extend: 'Ext.data.Store',

    requires: ['DMPlanner.model.Group'],

    storeId: 'Groups',
    model: 'DMPlanner.model.Group'
});