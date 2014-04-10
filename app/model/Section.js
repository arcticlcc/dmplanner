Ext.define('DMPlanner.model.Section', {
    extend: 'Ext.ux.data.DeepModel',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo', 'Ext.ux.data.DeepModel'],
    uses: ['DMPlanner.model.Plan', 'DMPlanner.model.Group'],

    fields: [{
        name: 'id',
        type: 'auto'
    }, {
        name: 'planId',
        type: 'auto'
    }, {
        name: 'groupId',
        type: 'auto'
    }, {
        name: 'sectionId',
        type: 'auto'
    }, {
        name: 'name',
        type: 'auto'
    }, {
        name: 'config',
        type: 'auto'
    }, {
        name: 'data',
        type: 'auto'
    }],

    associations: [{
        type: 'belongsTo',
        model: 'DMPlanner.model.Plan',
        primaryKey: 'id',
        foreignKey: 'planId',
        getterName: 'getDMPPlan'
    }, {
        type: 'belongsTo',
        model: 'DMPlanner.model.Group',
        primaryKey: 'id',
        foreignKey: 'groupId',
        getterName: 'getDMPGroup'
    }, {
        type: 'hasMany',
        model: 'DMPlanner.model.Group',
        primaryKey: 'id',
        foreignKey: 'sectionId',
        autoLoad: true,
        associationKey: 'groups',
        name: 'groups',
        storeConfig: {
            storeId: 'Groups'
        }
    }],

    proxy: {
        type: 'memory'
    }
});
