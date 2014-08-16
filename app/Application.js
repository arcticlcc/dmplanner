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

    /*
     * @requires FileReader
     */
    requires:['Ext.ux.window.Notification','DMPlanner.util.LevelFilter','DMPlanner.util.Printer'],

    views: [
    // TODO: add views here
    ],

    controllers: [
    // TODO: add controllers here
        'Start',//
        'Help',//
        'Plans',//
        'Questions',//
        'Settings'
    ],

    stores: [
    // TODO: add stores here
        'Plans',//
        'LocalPlans'
    ],

     refs: [{
         ref: 'viewport',
         selector: 'viewport'
     }, {
         ref: 'startDoc',
         selector: 'start #startDoc'
     }],

    /**
     * @cfg {Integer} dmpLevel (required)
     * The default level at which to filter plan elements.
     * The value is used to filter plan store, see {@link DMPlanner.util.LevelFilter LevelFilter}
     */
    dmpLevel: 0,

    /**
     * @cfg {Object} fileReaderCfg (required)
     * The default config for FileReader instances.
     */
    fileReaderCfg: {
        dragClass: 'dmp-drag-file',
        readAsDefault: 'Text',
        on: {
            load: function(e, file) {
                var data = Ext.decode(e.currentTarget.result, true),
                    store = Ext.getStore('Plans');

                if (data === null) {
                    DMPlanner.app.showError('Failed to load ' + file.name + '. The file is not valid JSON.');
                } else {
                    store.loadRawData(data);
                    Ext.getStore('LocalPlans').removeAll();
                    DMPlanner.app.fireEvent('loadfile', store.data.items);
                    DMPlanner.app.getViewport().getLayout().setActiveItem(1);
                }
            },
            error: function(e, file) {
                var msg = 'Failed to load ' + file.name + '. ' + e.currentTarget.error.message;

                DMPlanner.app.showError(msg);
            }
        }
    },

    launch: function() {
        var me = this,
            myRenderer = new marked.Renderer();

        //configure marked for external links

        myRenderer.link = function(href, title, text) {
            var external, newWindow, out;

            external = /^https?:\/\/.+$/.test(href);
            newWindow = external || title === 'newWindow';
            out = "<a href=\"" + href + "\"";

            if (newWindow) {
                out += ' target="_blank"';
                text += '<span  class="fa dmp-external-link" title="External link, opens in new window">&#xf08e;</span>';
            }

            if (title && title !== 'newWindow') {
                out += " title=\"" + title + "\"";
            }

            out += ">" + text + "</a>";

            return out;
        };

        marked.setOptions({renderer: myRenderer});

        //set default level
        DMPlanner.util.LevelFilter.value = me.dmpLevel;

        //Use Notifications for Ext errors
        Ext.Error.handle = function(err) {
            DMPlanner.app.showError(err.msg);
        };

        //setup dropzone
        FileReaderJS.setupDrop(Ext.getBody().dom, {
            dragClass: 'dmp-drag-file'
        });
        FileReaderJS.setupDrop(Ext.get('Dmp-drop-mask').dom, me.fileReaderCfg);

        //get plan template
        Ext.Ajax.request({
            url: me.getPlanUrl(),
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText),
                    loader =  this.getStartDoc().getLoader();

                Ext.applyIf(obj, {
                    docBase: 'resources/doc/',
                    startDoc: 'Start.md',
                    homeDoc: 'Home.md',
                    helpDoc: 'Help.md'
                });

                Ext.define('DMPlanner.data.PlanTemplate', {
                    singleton: true
                }, function() {
                    Ext.apply(DMPlanner.data.PlanTemplate, obj);
                });

                //load the start docs
                loader.load({
                    url: obj.docBase + obj.startDoc
                });

                //load the default help docs
                this.fireEvent('showhelp', obj.docBase + obj.helpDoc ,'Main Help', true);

                //instantiate the settings window
                this.Settings = Ext.create('DMPlanner.view.Settings', {
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

                                if(Ext.isIE9m) {
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

                DMPlanner.app.fireEvent('loadtemplate');

            },
            failure: function(response, opts) {
                var err = 'Could not load the plan template: ' + response.request.options.url + '<br />' +
                        '. Code: ' + response.status + ' - ' + response.statusText;

                Ext.get('loading').remove();
                Ext.get('loading-mask').fadeOut({
                    remove: true
                });
                DMPlanner.app.showError(err);
            },
            scope: me
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
            html: txt,
            position: 'tr',
            maxWidth: 400
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
            html: txt,
            position: 'tr',
            maxWidth: 400
        }).show();
    },

    /**
     * Returns the plan URL. Check the window location.
     * Defaults to data.json
     * @return {String} The plan URL.
     */
    getPlanUrl: function(txt) {
        var href = window.location.href,
            i = href.indexOf("#"),
            hash = i >= 0 ? href.substr(i + 1) : false;

            return hash || 'data.json';
    }
});
