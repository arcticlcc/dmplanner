Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': '../ux',
        'DMPlanner.ux': 'app/ux'
    }
});

Ext.define('DMPlanner.Application', {
    name: 'DMPlanner',

    extend: 'Ext.app.Application',

    requires:['Ext.ux.window.Notification', 'DMPlanner.util.UUID'],

    views: [
    // TODO: add views here
    ],

    controllers: [
    // TODO: add controllers here
        'Start',//
        'Plans',//
        'Questions'
    ],

    stores: [
    // TODO: add stores here
        'Plans'//
    ],

    launch: function() {
        //Use Notifications for Ext errors
        Ext.Error.handle = function(err) {
            DMPlanner.app.showError(err.msg);
        };

        //get plan template
        Ext.Ajax.request({
            url: 'data.json',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);

                Ext.define('DMPlanner.data.PlanTemplate', {
                    singleton: true,

                    plans: obj
                });

            },
            failure: function(response, opts) {
                var err = 'Server-side failure with status code ' + response.status;
                DMPlanner.app.showError(err);
            }
        });
    },

    /**
     * Store the last application error.
     * @param {String} txt The error string.
     */
    setError: function(txt) {
        this.lastError = txt;
    },

    /**
     * Retrieve the last application error.
     * @return {String} The last recorded error.
     */
    getError: function() {
        return this.lastError;
    },

    /**
     * Creates an error notification.
     * @param {String} txt The error string.
     */
    showError: function(txt) {
        Ext.create('widget.uxNotification', {
            title: 'Error',
            glyph: 'xf12a@FontAwesome',
            html: txt
        }).show();
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
    }
});
