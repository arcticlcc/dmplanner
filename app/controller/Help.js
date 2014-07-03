Ext.define('DMPlanner.controller.Help', {
    extend: 'Ext.app.Controller',

    //views: [],

    refs: [{
        ref: 'help',
        selector: '#mainContainer>#helpSection'
    }],

    init: function(application) {
        //event domains
        this.listen({
            controller: {
                '*': {
                    showhelp: this.onShowHelp
                }
            }
        });
    },

    /**
     * Updates help section content and visibility.
     * @param {string} url The url of the markdown file.
     * @param {string} title The title to display in the help header
     * @param {boolean} expand If true, expand the help panel
     */
    onShowHelp: function(url, title, expand) {
        var help = this.getHelp(),
            loader =  help.getLoader(),
            fTitle = title ? 'Help: ' + title : 'Help',
            noHelp = '<div style="text-align:center;margin-top:3em;"><b>No help is available for this section.</b></div>';

        help.setTitle(fTitle);

        if(!!url) {
            //load the docs
            loader.load({
                url: url,
                /*success: function() {
                    help.expand();
                },*/
                failure: function() {
                    help.update(noHelp);
                }
            });
        } else{
            help.update(noHelp);
        }

        if (expand) {
            help.expand();
        }
    }
});
