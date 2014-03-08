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

    requires:['Ext.ux.window.Notification'],

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
        'Plans',//
        'LocalPlans'
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

                this.getLocalPlansStore().load({
                    callback: function(records, op, success) {
                        if(!success) {
                            var err = 'Failed to load local data.';
                            DMPlanner.app.showError(err);
                        }
                    }
                });

            },
            failure: function(response, opts) {
                var err = 'Server-side failure with status code ' + response.status;
                DMPlanner.app.showError(err);
            },
            scope: this
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
    }
});
