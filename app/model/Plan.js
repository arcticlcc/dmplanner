Ext.define('DMPlanner.model.Plan', {
    extend: 'Ext.ux.data.DeepModel',

    requires: [//
    'Ext.data.association.HasMany', //
    'Ext.ux.data.DeepJsonWriter', //
    'Ext.ux.data.DeepModel'//
    ],

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
        //type: 'ajax',
        //url: 'data.json',
        type: 'memory',
        //id: 'dmp-plans',
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