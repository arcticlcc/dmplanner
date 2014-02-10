Ext.define('DMPlanner.controller.Plans', {
    extend : 'Ext.app.Controller',

    models : [//
    'Plan', //
    'Section'//
    ],
    stores : [//
    'Plans', //
    'Sections'//
    ],
    views : [//
    'PlanList', //
    'SectionList'//, //
    //'QuestionsForm'//
    ],

    refs : [{
        ref : 'sectionList',
        selector : 'sectionlist'
    }],

    init : function() {
        this.control({
            planlist : {
                select : this.loadSections
            }
        });
    },

    loadSections : function(grid, record) {
        var sections = this.getSectionList(), sectionRec, questions;

        sections.show();

        sections.reconfigure(record.sections());

        sectionRec = sections.getStore().getAt(0);
        if (sectionRec) {
            sections.getSelectionModel().select([sectionRec]);
        }
    }
});
