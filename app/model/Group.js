Ext.define('DMPlanner.model.Group', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo'],
    uses: ['DMPlanner.model.Section', 'DMPlanner.model.Question'],

    fields: [{
        name: 'id'
    }, {
        name: 'section_id'
    }, {
        name: 'name'
    }, {
        name: 'index'
    }, {
        name: 'data',
        type: 'auto'
    }, {
        name: 'width'
    }],

    associations: [{
        type: 'belongsTo',
        model: 'DMPlanner.model.Section',
        primaryKey: 'id',
        foreignKey: 'section_id',
        getterName: 'getDMPSection'
    }, {
        type: 'hasMany',
        model: 'DMPlanner.model.Question',
        primaryKey: 'id',
        foreignKey: 'group_id',
        autoLoad: true,
        associationKey: 'questions',
        name: 'questions'
    }],

    proxy: {
        type: 'memory'
    }
});
