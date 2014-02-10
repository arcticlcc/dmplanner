Ext.define('DMPlanner.model.Plan', {
    extend: 'Ext.data.Model',

    requires: ['Ext.data.association.HasMany'],

    uses: ['DMPlanner.model.Section'],

    associations: [{
        type: 'hasMany',
        model: 'DMPlanner.model.Section',
        primaryKey: 'id',
        foreignKey: 'plan_id',
        autoLoad: true,
        associationKey: 'sections',
        name: 'sections'
    }],

    proxy: {
        type: 'ajax',
        url: 'data.json',
        reader: {
            type: 'json'
        }
    },

    fields: [{
        name: 'id'
    }, {
        name: 'name'
    }, {
        name: 'code'
    }]
});