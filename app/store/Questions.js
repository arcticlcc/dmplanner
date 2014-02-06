Ext.define('DMPlanner.store.Questions', {
    extend: 'Ext.data.Store',

    requires: ['DMPlanner.model.Question'],

    autoSync: true,
    storeId: 'Questions',
    model: 'DMPlanner.model.Question'
});