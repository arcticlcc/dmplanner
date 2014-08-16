Ext.define('DMPlanner.controller.Settings', {
    extend: 'Ext.app.Controller',

    views: ['Settings'],

    refs: [{
        ref: 'combo',
        selector: 'dmpsettings #levelCombo'
    }, {
        ref: 'button',
        selector: 'sectionlist #levelButton'
    }],

    init: function(application) {
        this.control({
            'dmpsettings #levelCombo': {
                select: this.onLevelComboSelect
            },
            'sectionlist #levelButton': {
                change: this.onLevelButtonChange
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
            button = this.getButton(), //
            val = record.get('defaultLevel') || 0, //
            data = record.data.levels || DMPlanner.data.PlanTemplate.levels;

        button.menu.removeAll();

        //setup combo and button
        Ext.each(data, function(l, i) {
            levels.push([i, l]);
            button.menu.add({
                group        : button.id,
                itemIndex    : i,
                checkHandler : button.checkHandler,
                scope        : button,
                checked      : i === val,
                xtype: 'menucheckitem',
                text: l,
                level: i
            });
        });

        combo.getStore().loadData(levels);
        combo.setDisabled(!levels.length);
        combo.setValue(val);


        button.setActiveItem(button.menu.items.findBy(function(i) {
            return i.checked;
        }));

        button.setVisible(!!levels.length);

        this.updateLevel(combo.getValue());
    },

    /**
     * Fired when the level combo is changed.
     * @param {Ext.form.field.ComboBox} combo This combo box
     * @param {Array} records The selected records
     */
    onLevelComboSelect: function(combo, records) {
        var val = records ? records[0].get('field1') : 0,
            btn = this.getButton();

        this.updateLevel(val);

        if(val !== btn.getActiveItem().level) {
            btn.setActiveItem(btn.menu.items.findBy(function(i) {
                return i.level === val;
            }), true);
        }
    },

    /**
     * Fired when the level button is changed.
     * @param {Ext.button.Cycle} btn This button
     * @param {Ext.menu.Item} itm The selected menu item
     */
    onLevelButtonChange: function(btn, itm) {
        var val = itm.level ||  0,
            combo = this.getCombo();

        this.updateLevel(val);

        combo.setValue(itm.level);
    },

    /**
     * Set the plan level..
     * @param {Integer} level The level
     */
    updateLevel: function(level) {
        var val = level ? level : 0;

        DMPlanner.util.LevelFilter.value = val;
        this.fireEvent('changelevel', val);
    }
});
