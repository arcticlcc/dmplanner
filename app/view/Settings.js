Ext.define('DMPlanner.view.Settings', {
    extend: 'Ext.window.Window',
    requires: ['Ext.grid.Panel'],
    alias: 'widget.dmpsettings',

    title: 'Settings',
    height: 200,
    width: 400,
    layout: 'anchor',
    bodyPadding: 15,
    closeAction: 'hide',

    initComponent: function() {
        var me = this, levels = [], levelCombo;

        Ext.each(DMPlanner.data.PlanTemplate.levels, function(l, i) {
            levels.push([i, l]);
        });

        levelCombo = Ext.create('Ext.form.ComboBox', {
            itemId: 'levelCombo',
            fieldLabel: 'Choose Level',
            store: {
                fields: ['field1', 'field2'],
                data: levels
            },
            displayField: 'field2',
            valueField: 'field1',
            disabled: !levels.length,
            queryMode: 'local',
            forceSelection: true,
            editable: false,
            value: DMPlanner.util.LevelFilter.value
        });

        Ext.applyIf(me, {
            items: [levelCombo]
        });

        me.callParent(arguments);
    }
});
