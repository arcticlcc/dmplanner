Ext.define('DMPlanner.controller.Settings', {
    extend: 'Ext.app.Controller',

    views: ['Settings'],

    refs: [],

    init: function(application) {
        this.control({
            'dmpsettings #levelCombo': {
                select: this.updateLevel
            }
        });
    },

    /**
     * Fired when the level combo is changed.
     * @param {Ext.form.field.ComboBox} combo This combo box
     * @param {Array} records The selected records
     */
    updateLevel: function(combo, records) {
        var val = records[0].get('field1');

        DMPlanner.util.LevelFilter.value = val;
        this.fireEvent('changelevel', val);
    }
});
