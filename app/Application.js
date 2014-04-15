Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': '../ux',
        'DMPlanner.ux': 'app/ux',
        'GeoExt': './lib/geoext2/src/GeoExt'
    }
});

Ext.define('DMPlanner.Application', {
    name: 'DMPlanner',

    extend: 'Ext.app.Application',

    requires:['Ext.ux.window.Notification','DMPlanner.util.LevelFilter'],

    views: [
    // TODO: add views here
    ],

    controllers: [
    // TODO: add controllers here
        'Start',//
        'Plans',//
        'Questions',//
        'Settings'
    ],

    stores: [
    // TODO: add stores here
        'Plans',//
        'LocalPlans'
    ],

    /**
     * @cfg {Integer} dmpLevel (required)
     * The default level at which to filter plan elements.
     * The value is used to filter plan store, see {@link DMPlanner.util.LevelFilter LevelFilter}
     */
    dmpLevel: 0,

    launch: function() {
        //set default level
        DMPlanner.util.LevelFilter.value = this.dmpLevel;

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

                    plans: obj.templates,
                    levels: obj.levels
                });

                //instantiate the settings window
                Ext.define('DMPlanner.app.Settings', {
                    extend: 'DMPlanner.view.Settings',
                    singleton: true
                });

                this.getLocalPlansStore().load({
                    callback: function(records, op, success) {
                        if (!success) {
                            var err = 'Failed to load local data.';
                            DMPlanner.app.showError(err);
                        } else {
                            setTimeout(function() {
                                Ext.get('loading').remove();
                                Ext.get('loading-mask').fadeOut({
                                    remove: true
                                });

                                if(Ext.isIE9p) {
                                    Ext.Msg.show({
                                        title: 'Old browser!',
                                        msg: 'You\'re using an older version of Internet Explorer(' + Ext.ieVersion + '). ' +
                                            'Saving to local files and printing is <b>not</b> supported. ' +
                                            'Please upgrade to IE10+(or another modern browser) for full support.',
                                        width: 350,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.window.MessageBox.WARNING
                                    });
                                }
                            }, 250);

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
    },

    /**
     * Creates an info notification.
     * @param {String} txt The error string.
     */
    showInfo: function(txt, title) {
        Ext.create('widget.uxNotification', {
            title: title || 'Info',
            glyph: 'xf129@FontAwesome',
            html: txt
        }).show();
    }
});
