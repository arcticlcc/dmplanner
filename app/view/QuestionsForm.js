Ext.define("DMPlanner.view.QuestionsForm", {
    //extend : 'Ext.Component',
    extend : 'Ext.form.Panel',
    alias : 'widget.questions',

    requires : [//
    'Ext.form.field.*', //
    'Ext.form.RadioGroup', //
    'Ext.form.FieldContainer', //
    'Ext.form.FieldSet', //
    'Ext.form.CheckboxGroup', //
    'DMPlanner.util.MyCombo'
    ],

    layout : {
        type : 'vbox',
        align : 'left'
    },
    defaults: {
        margin: '5 0 10 0'
    },
    autoScroll: true,
    bodyPadding : 10
});
