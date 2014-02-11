Ext.define("DMPlanner.view.QuestionsForm", {
    //extend : 'Ext.Component',
    extend : 'Ext.form.Panel',
    alias : 'widget.questions',

    requires : [//
    'Ext.form.field.*', //
    'Ext.form.RadioGroup', //
    'Ext.form.FieldContainer', //
    'Ext.form.FieldSet', //
    'Ext.form.CheckboxGroup'//
    ],

    layout : {
        type : 'vbox',
        align : 'left'
    },
    autoScroll: true,
    bodyPadding : 10
});
