Ext.define('DMPlanner.controller.Start', {
    extend : 'Ext.app.Controller',

    views : ['Start'],

    init : function(application) {
        this.control({
            "button#startNewBtn" : {
                click : this.onStartNewClick
            }
        });
    },

    onStartNewClick : function(button) {
        // process authentication...
        button.up('vp').getLayout().setActiveItem(1);
    }
});
