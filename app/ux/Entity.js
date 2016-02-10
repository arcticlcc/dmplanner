Ext.define("DMPlanner.ux.Entity", {
  extend: 'Ext.form.Panel',
  alias: 'widget.dmpentity',

  requires: [ //
    'Ext.form.field.*', //
    'Ext.form.RadioGroup', //
    'Ext.form.FieldContainer', //
    'Ext.form.FieldSet', //
    'Ext.form.CheckboxGroup', //
    'DMPlanner.ux.Attributes',
    'DMPlanner.util.UUID'
  ],

  layout: 'anchor',
  defaultType: 'textfield',
  defaults: {
    margin: '5 0 10 0',
    anchor: '100%'
  },
  autoScroll: true,
  bodyPadding: 10,

  initComponent: function () {
    var me = this;

    var getTemp = function (info) {
      return '<span class="fa dmp-icon-guidance sup" data-qtip="' +
        info + '">&#xf059;</span>';
    };

    Ext.applyIf(me, {
      dmpPlugin: true,
      items: [{
        fieldLabel: 'Name',
        name: 'codename',
        allowBlank: false,
        afterLabelTextTpl: getTemp('Enter the entity name.')
      }, {
        fieldLabel: 'Entity Id',
        grow: true,
        name: 'entityid',
        allowBlank: false,
        afterLabelTextTpl: getTemp(
          'Enter a unique identifier for the entity.'),
        value: DMPlanner.util.UUID.uuid()
      }, {
        fieldLabel: 'Definition',
        xtype: 'textarea',
        name: 'definition',
        allowBlank: false
      }, {
        xtype: 'dmpattributes',
        title: null,
        frame: false,
        margin: '25 0 10 0',
        padding: '0 0 15 0',
        style: {
          border: '1px solid #DDD'
        }
      }]
    });

    me.callParent(arguments);
  }
});
