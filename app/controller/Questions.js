Ext.define('DMPlanner.controller.Questions', {
  extend : 'Ext.app.Controller',

  //stores : [//
  //'Sections'//
  //],
  views : ['QuestionsForm', 'SectionList'],

  refs : [{
    ref : 'form',
    selector : 'questions'
  }, {
    ref : 'sections',
    selector : 'sectionlist'
  }],

  init : function(application) {
    this.control({
      sectionlist : {
        select : this.showSection
      }/*,

       '#sectionNext' : {
       click : this.showNextSection
       },

       '#surveyFinish' : {
       click : this.finishSurvey
       },

       'questions field' : {
       change : this.saveItem
       }*/
    });

    /*this.listen({
     store : {
     '#Sections' : {
     baz : this.onStore
     }
     }
     });*/
  },

  showSection : function(grid, record, index) {
    //@format:off
    var groups = record.groups(),
      form = this.getForm(),
      config = record.get('config'),
      groups = record.groups(),
      isLastSection = (grid.getStore().getCount() - index) === 1,
      fields = [];
    //@format:on

    //set title
    form.setTitle(record.get('name'));

    //check for config
    if(Ext.isObject(config)) {
        form.setTitle(record.get('name')+': config');

    }
  },

  showSectionQuestions : function(grid, record, index) {
    //@format:off
    var groups = record.groups(),
      form = this.getForm(),
      store = record.groups(),
      isLastGroup = (store.getCount() - index) === 1,
      fields = [];
    //@format:on

    form.setTitle(record.get('name'));

    questions.each(function(question) {
      var field = Ext.apply({
        fieldLabel : question.get('question'),
        value : question.get('answer'),
        question : question,
        anchor : '100%',
        xtype : 'textfield'
      }, question.get('config'));

      fields.push(field);
    });

    form.removeAll();
    form.add({
      xtype : 'fieldset',
      title : record.get('name'),
      items : fields,
      width : '100%'
    });

    form.add({
      xtype : 'button',
      text : isLastGroup ? 'Save' : 'Next',
      itemId : isLastGroup ? 'surveyFinish' : 'groupNext',
      width : 200
    });
  }/*,
   showNextGroup : function() {
   var grid = this.getGroups(),
   store = grid.getStore(),
   selModel = grid.getSelectionModel(),
   selected = selModel.getLastSelected(),
   curIndex = store.indexOf(selected),
   next = store.getAt(curIndex + 1);

   if (next) {
   selModel.select([next]);
   }
   },

   finishSurvey : function() {
   var groups = this.getGroups();
   this.getForm().removeAll();
   groups.getSelectionModel().deselectAll();
   groups.hide();
   groups.up().down('surveylist').getSelectionModel().deselectAll();

   },

   saveItem : function(field) {
   var question = field.question;

   if (!question) {
   field = field.up('[question]');
   question = field.question;
   }

   if (question) {
   question.set('answer', field.getValue());
   }
   }*/
});
