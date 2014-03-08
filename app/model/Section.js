Ext.define('DMPlanner.model.Section', {
    extend: 'Ext.ux.data.DeepModel',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo', 'Ext.ux.data.DeepModel'],
    uses: ['DMPlanner.model.Plan', 'DMPlanner.model.Group'],

    fields: [{
        name: 'id',
        type: 'auto'
    }, {
        name: 'plan_id',
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
        foreignKey: 'plan_id',
        getterName: 'getDMPPlan'
    }, {
        type: 'hasMany',
        model: 'DMPlanner.model.Group',
        primaryKey: 'id',
        foreignKey: 'section_id',
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
