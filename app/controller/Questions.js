Ext.define('DMPlanner.controller.Questions', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.tab.Panel','Ext.form.FieldContainer','Ext.form.FieldSet','DMPlanner.util.UUID', 'Ext.layout.container.Accordion'],

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
    }, {
        ref: 'sectionPanel',
        selector: 'sectionpanel'
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
            '#sectionContainer component[dmpPlugin]': {
                plugindatachanged: this.onPluginDataChanged
            },
            'sectionlist tool[type=home], #planFinish':{
                click: this.onHomeClick
                //beforerender:
            },
            'questions field, questions htmleditor, #sectionContainer container[hasQuestions] field, #sectionContainer container[hasQuestions] htmleditor' : {
                change :this.saveItem
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
     * @param {Array} Array of all data records for this section.
     */
    onPluginDataChanged: function(plugin, data) {
        var planId = plugin.planId,
            store = this.getPlansStore().getById(planId).sections(),
            gsections,
            section;

        if(plugin.groupId) {
            gsections = store.getById(plugin.sectionId).groups().getById(plugin.groupId).sections();
            section = gsections.getById(plugin.itemId);
            section.set('data', data);
            //the controller only listens to the primary Section store update event
            store.fireEvent('update', store, section);
        } else {
           section = store.getById(plugin.itemId);
           section.set('data', data);
        }
    },

    onHomeClick: function(btn) {
        this.getSectionPanel().getLayout().setActiveItem('homeDoc');
        this.getSections().getSelectionModel().deselectAll();
    },

    createSection: function(record, config) {
        var cfg = config || record.get('config'),
            clone = Ext.clone(cfg);

        //do config stuff, add sectionId(itemId), planId
        Ext.applyIf(clone, {
            itemId: record.getId(),
            planId: record.get('planId'),
            data: record.get('data')
        });

        return clone;
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
            help = record.get('helpDoc'),
            docBase = record.getDMPPlan().get('docBase') || DMPlanner.data.PlanTemplate.docBase,
            url = help ? docBase + help : false,
            buttons = [],
            questions, clone;
        //@format:on

        //filter on level
        groups.filter(DMPlanner.util.LevelFilter);

        cont.removeAll();
        bbar.removeAll();

        if(header) {header.hide();}

        //check for config
        if (Ext.isObject(config)) {
            //do config stuff, add sectionId(itemId), planId
            clone = this.createSection(record, config);
            questions = clone;

        } else if (groups.max('index') > 0) {
            //create questions form
            questions = {
                xtype: 'questions',
                //itemId: 'questionCont',
                bodyPadding: 15,
                flex: 1,
                width: '100%',
                title: record.get('name'),
                items: this.getGroupQuestions(groups) //get an array of fieldsets
            };

        } else {
            questions = this.getGroupQuestions(groups, true); //add directly to section

            //fix padding
            if(questions.length === 1 && questions[0].xtype === 'tabpanel' && !groups.first().sections().count()) {
                questions[0].bodyPadding = questions[0].bodyPadding || 15;
            }

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

        cont.up('sectionpanel').getLayout().setActiveItem(cont);

        this.fireEvent('showhelp', url, record.get('name'));

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
            var num =  sections ? sections.count() : 0,
                cfg = {
                    xtype: num ? 'panel' : 'fieldcontainer',
                    hasQuestions: true,
                    bodyPadding: num ? 15 : undefined,
                    padding: num ? undefined : 15,
                    title: num ? 'Questions' : title,
                    width: width || 600,
                    defaults: {
                        anchor: '100%'
                    },
                    layout: 'anchor',
                    items: fields
                },
                acc;

            if (num) {
                acc = {
                    xtype: 'panel',
                    title: title,
                    layout: {
                        type: 'accordion'//,
                        //titleCollapse: false,
                        //animate: true,
                        //activeOnTop: true
                    },
                    items: [cfg]
                };

                sections.each(function(sec) {
                    var config = cntrl.createSection(sec, sec.get('config'));

                    //do config stuff, need to set groupId, sectionId
                    Ext.applyIf(config, {
                        title: sec.get('name'),
                        groupId: sec.get('groupId'),
                        sectionId: sec.get('sectionId')
                    });

                    acc.items.push(config);
                });

                return acc;
            }

            return cfg;
        };

        createFields = function(group) {
            var fields = [],
                questions = group.questions();

            //filter on level
            questions.filter(DMPlanner.util.LevelFilter);

            questions.each(function(question) {
                var info = question.get('guidance'),
                    field = Ext.apply({
                        fieldLabel : question.get('question'),
                        value : question.get('answer') || question.get('defAnswer'),
                        question : question,
                        anchor : '100%',
                        xtype : 'textfield',
                        emptyText: question.get('emptyText') ? info : undefined,
                        //overCls: 'dmp-question-over',
                        //padding: "5px 0px",
                        afterLabelTextTpl : !!info ? '<span class="fa dmp-icon-guidance sup" data-qtip="' + info + '">&#xf059;</span>' : undefined,
                        //afterSubTpl: !!info ? '<span class="dmp-icon-guidance"
                        // data-qtip="' + info + '">?</span>' : undefined,
                        //afterBodyEl: !!info ? '<span class="dmp-icon-guidance"
                        // data-qtip="' + info + '">?</span>' : undefined,
                        //msgTarget         : 'side',
                        labelAttrTpl : 'data-qtip="' + info + '"'
                    }, question.get('config'));

                    //set formId for radio and checkbox groups
                    //TODO: need a better solution to pickup sub-classes, probably an override
                    if(field.xtype === 'radiogroup' || field.xtype === 'checkboxgroup') {

                        Ext.each(field.items, function(item){
                           item.getFormId = function(){return field.question.get('groupId');};
                        });
                    }

                fields.push(field);
            });

            return fields;
        };

        groups.group('index', 'ASC');
        grouped = groups.getGroups();

        Ext.each(grouped, function(g, idx){
            var children = g.children,
                repeat = !!children[0].get('repeatable'),
                tabs;

            tabs = !repeat ? undefined : {
                xtype: 'tabpanel',
                itemId: 'questionTabs-' + idx,
                //width: 500,
                //height: 400,
                plain: !plain,
                autoScroll: true,
                //bodyPadding: 15,
                bodyCls: plain ? '' : 'dmp-group-tab',
                defaults: {
                    closable: false
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
                                newGroup,
                                insTab;

                            template.id = groupId;
                            template.repeatIdx = pos;

                            Ext.each(template.questions, function(q){
                                q.id = uuid();
                                q.groupId = groupId;
                                q.answer = q.defAnswer;

                                //fix name for radio and checkbox groups
                                //TODO: need a better solution to pick sub-classes, probably an override
                                /*if(q.config && (q.config.xtype === 'radiogroup' || q.config.xtype === 'checkboxgroup')) {
                                    if (Ext.isObject(q.defAnswer)) {
                                        Ext.Object.each(q.defAnswer, function(key, val, obj) {
                                            var newKey = key + pos;

                                            obj[newKey] = val;
                                            delete obj[key];
                                        });
                                    }

                                    Ext.each(q.config.items, function(item){
                                       item.name += pos;
                                    });
                                }*/
                            });

                            Ext.each(template.sections, function(q){
                                q.id = uuid();
                                q.groupId = groupId;
                            });

                            store.loadRawData(template, true);
                            cntrl.fireEvent('planupdate', template.planId);
                            newGroup = store.getById(groupId);

                            insTab = createTab(
                                createFields(newGroup),
                                Ext.String.format('{0} {1}',template.name, tabs.items.length + 1),
                                template.width,
                                newGroup.sections()
                            );
                            tabs.setActiveTab(tabs.add(insTab));

                            b.nextSibling('#removeTab').enable();
                        }
                    }, {
                        xtype: 'button',
                        itemId: 'removeTab',
                        text: plain ? 'Remove' : '',
                        glyph: 'xf00d@FontAwesome',
                        tooltip: 'Remove',
                        disabled: children.length > 1 ? false : true,
                        handler: function(b) {
                            var tabs = b.up('tabpanel'),
                                remTab = tabs.getActiveTab(),
                                template= tabs.groupTemplate,
                                store = Ext.getStore('Plans').getById(template.planId).sections().getById(template.sectionId).groups(),
                                groupId = remTab.down('field[question]').question.get('groupId');

                            store.remove(store.getById(groupId));
                            tabs.remove(remTab);

                            if(tabs.query('tab').length < 2) {
                                b.disable();
                            }
                        }
                    }]
                }],
                items: []
            };

            Ext.each(children, function(group, idx) {
                var fields = createFields(group),
                    single = grouped.length === 1,
                    sections = group.sections(),
                    fieldCont, tab;

                //filter on level
                sections.filter(DMPlanner.util.LevelFilter);

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
                        single ? sections : false
                    );

                    tabs.items.push(tab);
                    tabs.bodyPadding = single ? undefined : 15;

                }else {
                    if(plain) {
                        fieldCont = createTab(fields, group.get('name'), group.get('width'), sections);
                        if(sections) {
                            fieldCont.header = false;
                            fieldsets = [fieldCont];
                        }
                    } else {
                        fieldCont = {
                            xtype : 'fieldset',
                            title : group.get('name'),
                            padding: 15,
                            items : fields,
                            maxWidth : group.get('width') || 600,
                            width : '100%'
                        };

                        fieldsets.push(fieldCont);
                    }
                }
            });

            if(tabs) {fieldsets.push(tabs);}
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
            question = field ? field.question : false;
        }

        if (question) {
            question.set('answer', field.getValue());
        }
    }

});
