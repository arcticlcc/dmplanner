Ext.define('DMPlanner.model.Question', {
    extend : 'Ext.data.Model',

    requires : ['Ext.data.association.BelongsTo'],

    uses : ['DMPlanner.model.Group'],

    fields : [{
        name : 'id'
    }, {
        name : 'group_id'
    }, {
        name : 'plan_id'
    }, {
        name : 'index'
    }, {
        name : 'question'
    }, {
        name : 'guidance'
    }, {
        name : 'answer'
    }, {
        name : 'config'
    }],

    belongsTo : [{
        model : 'DMPlanner.model.Group',
        foreignKey : 'group_id',
        getterName: 'getDMPGroup'
    }],

    proxy : {
        type : 'memory'

    }
});
