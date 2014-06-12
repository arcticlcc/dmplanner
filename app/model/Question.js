Ext.define('DMPlanner.model.Question', {
    extend : 'Ext.data.Model',

    requires : ['Ext.data.association.BelongsTo'],

    uses : ['DMPlanner.model.Group'],

    fields : [{
        name : 'id'
    }, {
        name : 'groupId'
    }, {
        name : 'planId'
    }, {
        name : 'index'
    }, {
        name: 'level',
        type: 'int',
        defaultValue: 0
    }, {
        name : 'question'
    }, {
        name : 'guidance'
    }, {
        name : 'emptyText',
        type: 'bool',
        defaultValue: true
    }, {
        name : 'defAnswer'
    }, {
        name : 'answer',
        convert: function(value, record) {
            return value || record.get('defAnswer');
        }
    }, {
        name : 'config'
    }],

    belongsTo : [{
        model : 'DMPlanner.model.Group',
        foreignKey : 'groupId',
        getterName: 'getDMPGroup'
    }],
    clearFilters: true,

    proxy : {
        type : 'memory'

    }
});
