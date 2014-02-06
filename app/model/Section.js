Ext.define('DMPlanner.model.Section', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],
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
    }],

    associations: [{
        type: 'belongsTo',
        model: 'DMPlanner.model.Plan',
        primaryKey: 'id',
        foreignKey: 'plan_id'
    }, {
        type: 'hasMany',
        model: 'DMPlanner.model.Group',
        primaryKey: 'id',
        foreignKey: 'section_id',
        autoLoad: true,
        associationKey: 'groups',
        name: 'groups'
    }],

    proxy: {
        type: 'memory'
    }
});
