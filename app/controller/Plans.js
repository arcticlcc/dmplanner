Ext.define('DMPlanner.controller.Plans', {
    extend : 'Ext.app.Controller',
    requires: ['Ext.app.domain.Store'],

    models : [//
    'Plan', //
    'Section',//
    'LocalPlan'//
    ],
    stores : [//
    'Plans', //
    'Sections',//
    'LocalPlans'//
    ],
    views : [//
    'PlanList', //
    'SectionList'//, //
    //'QuestionsForm'//
    ],

    refs : [{
        ref: 'planList',
        selector: 'planlist'
    }, {
        ref: 'sectionList',
        selector: 'sectionlist'
    }],

    init : function() {
        this.control({
            planlist : {
                select: this.loadSections
            },
            'planlist tool#addPlan':{
                click: this.onAddNewPlan
            }
        });

        //event domains
        this.listen({
            controller: {
                '*': {
                    clickAddPlanBtn: this.onAddNewPlan
                }
            },

            store: {
                '#Plans': {
                    //add: this.onAddPlan,
                    //load: this.onAddPlan,
                    update: this.onDataUpdate
                },
                '#Questions': {
                    update: this.onDataUpdate
                }
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
    },

    /**
     * Add new plan event handler.
     */
    onAddNewPlan: function() {
        this.addPlan();
    },

    /**
     * Fired when any updates are made to a Plan record.
     * @param {Ext.data.Store} store The store
     * @param {Ext.data.Model} record The Model instance that was updated
     */
    onDataUpdate: function(store, record) {
        var local = this.getLocalPlansStore();
    },

    /**
     * Creates a DMP template.
     * Assigns UUIDs to ensure uniqueness.
     * @param {Object} plan The plan template to use.
     */
    getPlanTemplate: function(plan) {
        var uuid = DMPlanner.util.UUID.uuid;

        //assign plan id
        plan.id = uuid();
        //loop sections
        Ext.each(plan.sections, function(section) {
            section.id = uuid();
            section.plan_id = plan.id;

            Ext.each(section.groups, function(group) {
                group.id = uuid();
                group.plan_id = plan.id;
                group.section_id = section.id;

                Ext.each(section.questions, function(question) {
                    question.id = uuid();
                    question.plan_id = plan.id;
                    question.section_id = section.id;
                    question.group_id = group.id;
                });
            });

        });

        return plan;
    },

    /**
     * Adds a new plan.
     * @param {String} [planName] The plan name
     * @param {String} [planCode] The plan code
     * @param {String} [templateId='default'] The id of the template to use for new Plan
     */
    addPlan: function(planName, planCode, templateId) {
        var ctr = this,
            plans = DMPlanner.data.PlanTemplate.plans,
            store = ctr.getPlansStore(),
            count = store.count() + 1,
            template = Ext.clone(templateId ? plans[templateId] : plans['default']);

        //set name and code
        template.name = planName || template.name || 'My Plan ' + count;
        template.code = planCode || template.code || 'Id for Plan #' + count;
        //add plan using the template
        store.loadRawData(ctr.getPlanTemplate(template), true);
        //add to localstorage
        newRec = store.getById(template.id);
        ctr.addLocalPlan(newRec);
        //select in grid
        ctr.getPlanList().getSelectionModel().select(newRec);
    },

    /**
     * Add Plans to localstorage.
     * @param {Ext.data.Model[]} records The Plan Model instances to add
     */
    addLocalPlan: function(records) {
        var ctr = this,
            local = this.getLocalPlansStore();

        //add each plan to localstorage
        Ext.each(records, function(rec) {
            var data = rec.getWriteData(),
                newPlan = ctr.getLocalPlanModel().create({
                    //id: data.id,
                    plan: Ext.encode(data)
                });

            newPlan.setDirty();
            local.add(newPlan);
            local.sync();
        });
    },
});
