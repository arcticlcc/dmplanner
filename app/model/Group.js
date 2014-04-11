Ext.define('DMPlanner.model.Group', {
    extend: 'Ext.ux.data.DeepModel',
    requires: ['Ext.data.association.HasMany', 'Ext.data.association.BelongsTo', 'Ext.ux.data.DeepModel'],
    uses: ['DMPlanner.model.Section', 'DMPlanner.model.Question'],

    fields: [{
        name: 'id'
    }, {
        name: 'sectionId'
    }, {
        name : 'planId'
    }, {
        name: 'name'
    }, {
        name: 'index'
    }, {
        name: 'level',
        type: 'int',
        defaultValue: 0
    }, {
        name: 'repeatable'
    }, {
        name: 'repeatIdx'
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
        foreignKey: 'sectionId',
        getterName: 'getDMPSection'
    }, {
        type: 'hasMany',
        model: 'DMPlanner.model.Question',
        primaryKey: 'id',
        foreignKey: 'groupId',
        autoLoad: true,
        associationKey: 'questions',
        name: 'questions',
        storeConfig: {
            storeId: 'Questions'
        }
    }, {
        type: 'hasMany',
        model: 'DMPlanner.model.Section',
        primaryKey: 'id',
        foreignKey: 'groupId',
        autoLoad: true,
        associationKey: 'sections',
        name: 'sections',
        storeConfig: {
            storeId: 'GroupSections'
        }
    }],

    proxy: {
        type: 'memory'
    }
});
