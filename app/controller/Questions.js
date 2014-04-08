Ext.define('DMPlanner.controller.Questions', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.tab.Panel','DMPlanner.util.UUID'],

    stores : [//
        'Plans'//
    ],
    views: ['QuestionsForm', 'SectionList', 'Section'],

    refs: [{
        ref: 'container',
        selector: '#sectionContainer'
    }, {
        ref: 'form',
        selector: 'questions'
    }, {
        ref: 'sections',
        selector: 'sectionlist'
    }],

    init: function(application) {
        this.control({
            sectionlist: {
                select: this.showSection
            },
            '#sectionNext' : {
                click : this.showNextSection
            },
            '#sectionPrev' : {
                click : this.showPrevSection
            },
            'sectionpanel>component': {
                plugindatachanged: this.onPluginDataChanged
            },
             /*'#planFinish' : {
             click : this.finishPlsn
             },*/

             'questions field, questions htmleditor, #sectionContainer>#questionTabs field, #sectionContainer>#questionTabs htmleditor' : {
                change : this.saveItem
             }
        });

        /*this.listen({
         store : {
         '#Sections' : {
         baz : this.onStore
         }
         }
         });*/
    },

    /**
     * Fired when any updates are made to a Section's data.
     * @param {String} sectionId
     * @param {String} planId
     * @param {Array} Array of all data records for this section.
     */
    onPluginDataChanged: function(plugin, planId, data) {
        var section = this.getPlansStore().getById(planId).sections().getById(plugin.itemId);

        section.set('data', data);

    },

    showSection: function(grid, record, index) {
        //@format:off
        var groups = record.groups(),
            cont = this.getContainer(),
            bbar = cont.down('toolbar#bottomNavBar'),
            header = cont.getHeader(),
            config = record.get('config'),
            count = grid.getStore().getCount(),
            isLastSection = (count - index) === 1,
            isFirstSection = (count - index) === count,
            buttons = [],
            questions;
        //@format:on

        cont.removeAll();
        bbar.removeAll();

        if(header) {header.hide();}

        //check for config
        if (Ext.isObject(config)) {
            //do config stuff, add sectionId(itemId), planId
            clone = Ext.clone(config);
            Ext.applyIf(clone, {
                itemId: record.getId(),
                planId: record.get('planId'),
                data: record.get('data')//,
                //header: record.get('title') ? undefined : false
            });
            questions = clone;

        } else if (groups.max('index') > 0) {
            //create questions form
            questions = {
                xtype: 'questions',
                bodyPadding: 20,
                flex: 1,
                width: '100%',
                title: record.get('name'),
                items: this.getGroupQuestions(groups) //get an array of fieldsets
            };

        } else {
            questions = this.getGroupQuestions(groups, true); //add directly to section

            if(!groups.first().get('repeatable')) {
                cont.setTitle(groups.first().get('name') || record.get('name'));
                if(header) {header.show();}
            }
        }

        if (!!questions) {
            cont.add(questions);
        }

        if(!isFirstSection){
            buttons.push({
                xtype : 'button',
                text : 'Previous',
                itemId : 'sectionPrev',
                glyph: 'xf060@FontAwesome'
            });
        }

        buttons.push({
            xtype : 'button',
            text : isLastSection ? 'Finished' : 'Next',
            itemId : isLastSection ? 'planFinish' : 'sectionNext',
            glyph : isLastSection ? 'xf164@FontAwesome' : 'xf061@FontAwesome',
            iconAlign: 'right'
        });

        bbar.add(buttons);

    },

    /**
     * Creates the questions from a groups store.
     * @param {Ext.data.Store} store The store
     * @param {boolean} plain If true, fieldcontainers will be created instead of fieldsets.
     * Any tabpanels will be rendered with plan = false and a normal background.
     */
    getGroupQuestions: function(groups, plain) {
        var fieldsets = [],
            cntrl = this,
            grouped, createTab, createFields;

        createTab = function(fields, title, width, sections) {
            var cfg = {
                xtype : sections ? 'panel' : 'fieldcontainer',
                title : 'Questions',
                width : width || 600,
                defaults : {
                    anchor : '100%'
                },
                layout : 'anchor',
                items : fields
            };

            if (sections) {
                return {
                    xtype: 'panel',
                    title: title,
                    layout: {
                        type: 'accordion'//,
                        //titleCollapse: false,
                        //animate: true,
                        //activeOnTop: true
                    },
                    items: [cfg,{xtype:'dmpkeywords'}]
                };
            }

            return cfg;
        };

        createFields = function(group) {
            var fields = [];

            group.questions().each(function(question) {
                var info = question.get('guidance'),
                    field = Ext.apply({
                        fieldLabel : question.get('question'),
                        value : question.get('answer') || question.get('defAnswer'),
                        question : question,
                        anchor : '100%',
                        xtype : 'textfield',
                        afterLabelTextTpl : !!info ? '<span class="fa dmp-icon-guidance sup" data-qtip="' + info + '">&#xf059;</span>' : undefined,
                        //afterSubTpl: !!info ? '<span class="dmp-icon-guidance"
                        // data-qtip="' + info + '">?</span>' : undefined,
                        //afterBodyEl: !!info ? '<span class="dmp-icon-guidance"
                        // data-qtip="' + info + '">?</span>' : undefined,
                        //msgTarget         : 'side',
                        labelAttrTpl : 'data-qtip="' + info + '"'
                    }, question.get('config'));

                fields.push(field);
            });

            return fields;
        };

        groups.group('index', 'ASC');
        grouped = groups.getGroups();

        Ext.each(grouped, function(g){
            var children = g.children,
                repeat = !!children[0].get('repeatable'),
                tabs;

            tabs = !repeat ? undefined : {
                xtype: 'tabpanel',
                itemId: 'questionTabs',
                //width: 500,
                //height: 400,
                plain: !plain,
                //bodyPadding: 15,
                bodyCls: plain ? '' : 'dmp-group-tab',
                defaults: {
                    //closable: false
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: plain ? 'top' : 'right',
                    cls: 'dmp-group-toolbar',
                    items: [{
                        xtype: 'button',
                        tooltip: 'Add',
                        glyph: 'xf067@FontAwesome',
                        text: plain ? 'Add' : '',
                        handler: function(b) {
                            var tabs = b.up('tabpanel'),
                                pos = tabs.items.length,
                                uuid = DMPlanner.util.UUID.uuid,
                                groupId = uuid(),
                                template= tabs.groupTemplate,
                                store = Ext.getStore('Plans').getById(template.planId).sections().getById(template.sectionId).groups(),
                                insTab;

                            template.id = groupId;
                            template.repeatIdx = pos;

                            Ext.each(template.questions, function(q){
                                q.id = uuid();
                                q.groupId = groupId;
                                q.answer = q.defAnswer;
                            });

                            store.loadRawData(template, true);
                            cntrl.fireEvent('planupdate', template.planId);

                            insTab = createTab(
                                createFields(store.getById(groupId)),
                                Ext.String.format('{0} {1}',template.name, tabs.items.length + 1),
                                template.width
                            );
                            tabs.setActiveTab(tabs.add(insTab));
                        }
                    }, {
                        xtype: 'button',
                        text: plain ? 'Remove' : '',
                        glyph: 'xf00d@FontAwesome',
                        tooltip: 'Remove',
                        handler: function(b) {
                            var tabs = b.up('tabpanel'),
                                remTab = tabs.getActiveTab(),
                                template= tabs.groupTemplate,
                                store = Ext.getStore('Plans').getById(template.planId).sections().getById(template.sectionId).groups(),
                                groupId = remTab.down('field[question]').question.get('groupId');

                            store.remove(store.getById(groupId));
                            tabs.remove(remTab);
                        }
                    }]
                }],
                items: []
            };

            Ext.each(children, function(group, idx) {
                var fields = createFields(group),
                    fieldCont, tab;

                if(repeat) {
                    //set the index based on order of appearance
                    group.set('repeatIdx', idx);

                    //set the template for new groups
                    if(idx === 0) {
                        tabs.groupTemplate = Ext.clone(group.raw);
                    }

                    tab = createTab(fields,
                        Ext.String.format('{0} {1}',group.get('name'), group.get('repeatIdx') + 1),
                        group.get('width'),
                        grouped.length === 1
                    );

                    tabs.items.push(tab);

                }else {
                    if(plain) {
                        fieldCont = createTab(fields, group.get('name'), group.get('width'));
                        fieldCont.padding = 15;
                    } else {
                        fieldCont = {
                            xtype : 'fieldset',
                            title : group.get('name'),
                            items : fields,
                            maxWidth : group.get('width') || 600,
                            width : '100%'
                        };
                    }

                    fieldsets.push(fieldCont);
                }
            });

            fieldsets.push(tabs);
        });

        return fieldsets;
    },
     showNextSection: function() {
         var grid = this.getSections(),
             store = grid.getStore(),
             selModel = grid.getSelectionModel(),
             selected = selModel.getLastSelected(),
             curIndex = store.indexOf(selected),
             next = store.getAt(curIndex + 1);

         if (next) {
            selModel.select([next]);
         }
     },
     showPrevSection: function() {
         var grid = this.getSections(),
             store = grid.getStore(),
             selModel = grid.getSelectionModel(),
             selected = selModel.getLastSelected(),
             curIndex = store.indexOf(selected),
             prev = store.getAt(curIndex - 1);

         if (prev) {
            selModel.select([prev]);
         }
     },

     /*finishSurvey : function() {
     var groups = this.getGroups();
     this.getForm().removeAll();
     groups.getSelectionModel().deselectAll();
     groups.hide();
     groups.up().down('surveylist').getSelectionModel().deselectAll();

     },*/

    saveItem : function(field) {
        var question = field.question;

        if (!question) {
            field = field.up('[question]');
            question = field.question;
        }

        if (question) {
            question.set('answer', field.getValue());
        }
    }

});
