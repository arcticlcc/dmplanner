/*
 * @requires jsPDF
 */
Ext.define('DMPlanner.controller.Plans', {
    extend : 'Ext.app.Controller',
    requires: ['DMPlanner.util.UUID', 'DMPlanner.util.LevelFilter','DMPlanner.util.Printer'],

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
    }, {
        ref: 'sectionPanel',
        selector: 'sectionpanel'
    }, {
        ref: 'homeDoc',
        selector: 'sectionpanel #homeDoc'
    }],

    init : function() {
        this.control({
            planlist : {
                select: this.onSelectPlan
            },
            /*'planlist gridview': {
                beforeitemmousedown: this.onBeforeCellMousedown
            },*/
            'planlist tool#addPlan':{
                click: this.onAddNewPlan
            },
            'planlist tool[type=help]':{
                click: this.onHelpClick
            },
            'planlist tool[type=save]':{
                click: this.onSaveClick
            },
            'planlist filebutton[type=loadfile]':{
                render: this.onRenderLoadBtn
            },
            'planlist tool[type=print]':{
                click: this.onPrintClick
            },
            'planlist templatecolumn[action=deleteplan]':{
                click: this.onDeleteClick
            }
        });

        //event domains
        this.listen({
            controller: {
                '*': {
                    clickaddplanbtn: this.onAddNewPlan,
                    planupdate: this.onPlanUpdate,
                    loadfile: this.onLoadFile
                },
                '#Settings': {
                    changelevel: this.onChangeLevel
                }
            },

            store: {
                '#Plans': {
                    update: this.onDataUpdate,
                    remove: this.onPlanRemove
                },
                '#Sections': {
                    update: this.onDataUpdate
                },
                '#Groups': {
                    update: this.onDataUpdate,
                    remove: this.onDataUpdate
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

    onSelectPlan: function(grid, record) {
        this.fireEvent('selectplan', record);
        //this.loadSections(record);
    },

    loadSections: function(record, section) {
        var layout = this.getSectionPanel().getLayout(),
            sections = this.getSectionList(),
            store = record.sections(),
            docBase = record.get('docBase') || DMPlanner.data.PlanTemplate.docBase,
            homeDoc = record.get('homeDoc'),
            loader =  this.getHomeDoc().getLoader(),
            loadSection = function() {
                //no docs found or provided so we just load the first section
                //TODO handle this with event listener on Questions controller
                var sectionRec = sections.getStore().getAt(0);

                if (sectionRec) {
                    sections.getSelectionModel().select([sectionRec]);
                    layout.setActiveItem('sectionContainer');
                }
            },
            questions;

        sections.show();

        store.filter(DMPlanner.util.LevelFilter);
        sections.reconfigure(store);

        //select the passed section
        if (sections.getStore().indexOf(section) > -1) {
            sections.getSelectionModel().select(section);
        }


        if (homeDoc) {
            //load the docs
            loader.load({
                url: docBase + homeDoc,
                success: function() {
                    //only go home if a section is not selected
                    if(sections.getSelectionModel().selected.length === 0) {
                        layout.setActiveItem('homeDoc');
                    }
                },
                failure: function() {
                    //only go home if a section is not selected
                    if(sections.getSelectionModel().selected.length === 0) {
                        loadSection();
                    }
                }
            });
        } else {
            loadSection();
        }
    },

    /**
     * Handle change to DMP level, re-select current section, if applicable.
     * Set the plan defaultLevel value(Defaults 0).
     * @param {Integer} level
     */
    onChangeLevel: function(level) {
        var store = this.getPlansStore(),
            secSm = this.getSectionList().getSelectionModel(),
            plan = this.getPlanList().getSelectionModel().getSelection(),
            sec = secSm.getSelection();

        secSm.deselectAll();
        if(store.count()) {
            this.loadSections(plan[0], sec[0]);
        }

        plan[0].set('defaultLevel',level);
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
     * Fires when plans are loaded from a file.
     */
    onLoadFile: function(records) {
        this.addLocalPlan(records);
    },

    /**
     * Set up the file load button.
     */
    onRenderLoadBtn: function(btn) {
        FileReaderJS.setupInput(btn.fileInputEl.dom, DMPlanner.app.fileReaderCfg);
    },

    /**
     * Prevent grid selection on templatecolumn mousedown.
     */
    /*onBeforeCellMousedown: function(view, td, cellIdx) {
        return false;
    },*/
    /**
     * Click event handler for delete button.
     */
    onDeleteClick: function(view, td, rowIdx, cellIdx, e, rec) {
        if (view.getStore().count() < 2) {
            DMPlanner.app.showInfo('Cannot delete, there must be at least one plan.');
        } else {
            Ext.Msg.show({
                title: 'Delete Plan?',
                msg: 'Are you sure you want to delete plan: ' + rec.get('name'),
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if (btn === 'yes') {
                        view.getStore().remove(rec);
                    }
                }
            });
        }
    },

    /**
     * Click event handler for help button.
     */
    onHelpClick: function(btn) {
        var sm = btn.up('gridpanel').getSelectionModel(),
            plan = sm.selected.first() || sm.getStore().first(),
            docBase = plan.get('docBase') || DMPlanner.data.PlanTemplate.docBase,
            helpDoc = plan.get('helpDoc')  || DMPlanner.data.PlanTemplate.helpDoc;

        this.fireEvent('showhelp', docBase + helpDoc ,'Overview', true);
    },

    /**
     * Click event handler for help button.
     */
    onPrintClick: function(btn) {
        var sm = btn.up('gridpanel').getSelectionModel(),
            plan = sm.selected.first() || sm.getStore().first(),
            planId = plan.get('id'),
            data = Ext.getStore('LocalPlans').findRecord('planid', planId).get('plan');

        DMPlanner.util.Printer.previewHtml(data);
    },

    /**
     * Click event handler for save button.
     */
    onSaveClick: function(btn) {
        var store = this.getPlansStore(),
            plans = [],
            blob;

        store.each(function(plan){
            plans.push(store.getProxy().getWriter().getRecordData(plan));

        });

        blob = new Blob([JSON.stringify(plans, undefined, 2)], {type: "text/plain;charset=utf-8"});

        saveAs(blob, "MyDMPlans_" + Ext.Date.format(new Date(), 'Ymd') + ".json");
    },

    /**
     * Add new plan event handler.
     * TODO: Show window to allow edit of code and name?
     */
    onAddNewPlan: function() {
        this.addPlan();
    },

    /**
     * Update plan event handler.
     * @param {string} planid The id of the plan to update
     */
    onPlanUpdate: function(planid) {
        this.updatePlan(planid);
    },

    /**
     * Fired when any updates are made to a Plan record.
     * @param {Ext.data.Store} store The store
     * @param {Ext.data.Model} record The Model instance that was updated
     */
    onDataUpdate: function(store, record) {
        var planid = record.get('planId') || record.getId();

        this.updatePlan(planid);
    },

    /**
     * Fired when a Plan record is removed.
     * @param {Ext.data.Store} store The store
     * @param {Ext.data.Model} record The Model instance that was removed
     */
    onPlanRemove: function(store, record) {
        var local = this.getLocalPlansStore(),
            planid = record.get('planId') || record.getId(),
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
            section.planId = plan.id;

            Ext.each(section.groups, function(group, index) {
                group.id = uuid();
                group.index = index;
                group.planId = plan.id;
                group.sectionId = section.id;

                Ext.each(group.questions, function(question, index) {
                    question.id = uuid();
                    question.index = index;
                    question.planId = plan.id;
                    question.sectionId = section.id;
                    question.groupId = group.id;
                });

                Ext.each(group.sections, function(gsection, index) {
                    gsection.id = uuid();
                    gsection.index = index;
                    gsection.planId = plan.id;
                    gsection.sectionId = section.id;
                    gsection.groupId = group.id;
                });
            });

        });

        return plan;
    },

    /**
     * Adds a new plan.
     * @param {String} [planName] The plan name
     * @param {String} [planCode] The plan code
     * @param {String} [templateIdx=0] The index of the template to use for new Plan
     */
    addPlan: function(planName, planCode, templateIdx) {
        var ctr = this, newRec,
            plans = DMPlanner.data.PlanTemplate.templates,
            store = ctr.getPlansStore(),
            count = store.count() + 1,
            tidx = templateIdx || 0,
            template = Ext.clone(plans[tidx]);

        //set name and code
        template.name = planName || template.name + ' ' + count || 'My Plan ' + count;
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
     * Updates the local store.
     * @param {string} planid The id of the plan to update
     */
    updatePlan: function(planid) {
        var local = this.getLocalPlansStore(),
            plan = this.getPlansStore().getById(planid),
            localRec = local.findRecord('planid',planid,0,true,true,true),
            data = plan.getWriteData();

            localRec.set('plan', data);
            local.sync();
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
