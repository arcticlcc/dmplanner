Ext.define('DMPlanner.controller.Settings', {
    extend: 'Ext.app.Controller',

    views: ['Settings'],

    refs: [{
        ref: 'combo',
        selector: 'dmpsettings #levelCombo'
    }],

    init: function(application) {
        this.control({
            'dmpsettings #levelCombo': {
                select: this.updateLevel
            }
        });

        //event domains
        this.listen({
            controller: {
                '#Plans': {
                    selectplan: this.onSelectPlan
                }
            }
        });
    },

    /**
     * Fired when a plan is selected. Updates level combo.
     * @param {DMPlanner.model.Plan} record The plan record
     */
    onSelectPlan: function(record) {
        var levels = [], //
            combo = this.getCombo(),//
            data = record.data.levels || DMPlanner.data.PlanTemplate.levels;

        Ext.each(data, function(l, i) {
            levels.push([i, l]);
        });

        combo.getStore().loadData(levels);
        combo.setDisabled(!levels.length);
        combo.setValue(record.get('defaultLevel') || 0);

        this.updateLevel(combo, [combo.findRecordByValue(combo.getValue())]);
    },

    /**
     * Fired when the level combo is changed.
     * @param {Ext.form.field.ComboBox} combo This combo box
     * @param {Array} records The selected records
     */
    updateLevel: function(combo, records) {
        var val = records ? records[0].get('field1') : 0;

        DMPlanner.util.LevelFilter.value = val;
        this.fireEvent('changelevel', val);
    }
});
