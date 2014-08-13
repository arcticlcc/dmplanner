/**
 * Generic combobox with custom listConfig.
 *
 * Expects a 2-dimensional array : (e.g., `[['f','Foo'],['b','Bar']]`) as the store config.
 * The value in index 0 of each item will be assumed to be the combo valueField and displayField,
 * while the value at index 1 is assigned as a qtip.
 */
Ext.define('DMPlanner.util.MyCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.mycombo',
    requires: ['Ext.form.field.ComboBox'],

    listConfig: {
        getInnerTpl: function() {
            return '<div data-qtip="{field2}">{field1}</div>';
        }
    }
});
