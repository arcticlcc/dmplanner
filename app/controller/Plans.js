Ext.define('DMPlanner.controller.Plans', {
    extend : 'Ext.app.Controller',
    requires: ['DMPlanner.util.UUID'],

    models : [//
    'Plan', //
    'Section',//
    'LocalPlan'//
    ],
    stores : [//
    'Plans', //
    //'Sections',//
    'LocalPlans'//
    ],
    views : [//
    'PlanList', //
    'SectionList'//, //
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
            },
            'planlist tool[type=help]':{
                click: this.onHelpClick
            },
            'planlist templatecolumn[action=deleteplan]':{
                click: this.onDeleteClick
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
                    update: this.onDataUpdate,
                    remove: this.onDataRemove
                },
                '#Sections': {
                    update: this.onDataUpdate
                },
                '#Groups': {
                    update: this.onDataUpdate
                },
                '#Questions': {
                    update: this.onDataUpdate
                },
                '#LocalPlans': {
                    load: this.onLoadLocalPlans
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
     * Fires whenever the {@link DMPlanner.store.LocalPlans LocalPlans} store
     * is loaded from a remote data source. Loads the records into the
     * {@link DMPlanner.store.Plans Plans store}.
     * @param {Ext.data.Store} store
     * @param {Ext.data.Model[]} records An array of records
     * @param {Boolean} success True if the load operation was successful.
     */
    onLoadLocalPlans: function(store, records, success) {
        var plans = this.getPlansStore();

        Ext.each(records, function(record){
            var raw = record.get('plan');
            plans.loadRawData(raw, true);
        });
    },

    /**
     * Click event handler for delete button.
     */
    onDeleteClick: function(view, td, rowIdx, cellIdx, e, rec) {
        Ext.Msg.show({
             title:'Delete Plan?',
             msg: 'Are you sure you want to delete plan: ' + rec.get('name'),
             buttons: Ext.Msg.YESNO,
             icon: Ext.Msg.QUESTION,
             fn: function(btn) {
                 if(btn === 'yes') {
                     view.getStore().remove(rec);
                 }
             }
        });
    },

    /**
     * Click event handler for help button.
     */
    onHelpClick: function(btn) {
        var err = 'I wish I could help, but the help section hasn\'t been implemented. :-(';
        DMPlanner.app.showError(err);
    },

    /**
     * Add new plan event handler.
     * TODO: Show window to allow edit of code and name?
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
        var local = this.getLocalPlansStore(),
            planid = record.get('plan_id') || record.getId(),
            plan = this.getPlansStore().getById(planid),
            localRec = local.findRecord('planid',planid,0,true,true,true),
            data = plan.getWriteData();

            localRec.set('plan', data);
            local.sync();
    },

    /**
     * Fired when a Plan record is removed.
     * @param {Ext.data.Store} store The store
     * @param {Ext.data.Model} record The Model instance that was removed
     */
    onDataRemove: function(store, record) {
        var local = this.getLocalPlansStore(),
            planid = record.get('plan_id') || record.getId(),
            localRec = local.findRecord('planid',planid,0,true,true,true);

            local.remove(localRec);
            if(store.count()) {
                this.getPlanList().getSelectionModel().select(0);
            }
            local.sync();
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

                Ext.each(group.questions, function(question) {
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
                    planid: data.id,
                    plan: data
                });

            newPlan.setDirty();
            local.add(newPlan);
            local.sync();
        });
    }
});
