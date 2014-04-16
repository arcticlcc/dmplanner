/*
 * Prints plans.
 */
Ext.define('DMPlanner.util.Printer', {
    singleton: true,
    requires: ['Ext.XTemplate', 'Ext.window.Window'],

    /**
     * @property {Ext.window.Window} previewWindow
     * The window that displays the print preview HTML.
     * @readonly
     */

    template: Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '<div class="dmp-print-container" id="{id}">',
                '<h1>{name}</h1>',
                '<p><span class="label">Code: </span>{code}</p>',
                '<section>',
                '<h2><span class="label">Sections</span></h2>',
                '<tpl for="sections">',
                    '<h3 id="{id}">{name}</h3>',
                    '<tpl if="data">',
                        '<pre>{[this.printObject(values.data)]}</pre>',
                    '<tpl elseif="groups.length &gt; 0">',
                        '<tpl for="this.formatGroups(groups)">',
                            '<h4>{name}</h4>',
                            '<tpl if="questions.length &gt; 0">',
                                    '<h5>Questions</h5>',
                                '<tpl for="questions">',
                                    '<p>{question}: {[this.formatAnswer(values.answer)]}</p>',
                                '</tpl>',
                            '</tpl>',
                            '<tpl if="sections.length &gt; 0">',
                                    '<h5>Sections</h5>',
                                    '<tpl for="sections">',
                                        '<p>{name}: ',
                                            '<span style="white-space:pre">{[this.printObject(values.data)]}</span>',
                                        '</p>',
                                    '</tpl>',
                            '</tpl>',
                        '</tpl>',
                    '<tpl else>',
                        '<p>No Data Provided</p>',
                    '</tpl>',
                '</tpl>',
                '</section>',
            '</div>',
        '</tpl>',
        {
            // XTemplate configuration:
            //disableFormats: true,
            // member functions:
            formatAnswer: function(value){

                if(Ext.isObject(value)) {
                    value = Ext.Object.getValues(value).join(", ");
                }

                if(Ext.isEmpty(value) ){
                    return 'No Data Provided';
                }

                return Ext.htmlEncode(value);
            },
            printObject: function(data){
                if(Ext.isString(data) && data !=='') {
                    return Ext.htmlEncode(JSON.stringify(JSON.parse(unescape(data)), undefined, 2));
                } else if(Ext.isObject(data)||Ext.isArray(data)) {
                    return Ext.htmlEncode(JSON.stringify(data, undefined, 2));
                } else {
                    return 'No Data Provided';
                }
            },
            formatGroups: function(groups) {
                groups.sort(function(a,b){return (a.index + (a.repeatIdx * 0.1) - (b.index + (b.repeatIdx * 0.1)));});

                Ext.each(groups, function(group){
                    group.name = group.repeatable ? group.name + ' ' + (group.repeatIdx+1) : group.name;
                });

                return groups;
            }
        }
    ),
    getHtml: function(plan) {
        var cloned = Ext.clone(plan); //so we don't corrupt the data

        return this.template.apply(cloned);
    },
    previewHtml: function(plan) {
        var me = this,
            pw = me.previewWindow,
            dim = Ext.getBody().getHeight() * 0.75,
            cloned = Ext.clone(plan); //so we don't corrupt the data

        if(pw) {
            pw.update(cloned);
            pw.show();
        }else {
            pw = Ext.create('Ext.window.Window', {
                title: 'Print Preview',
                autoScroll: true,
                bodyPadding: 15,
                data: cloned,
                tpl: this.template,
                height: dim,
                width: dim,
                layout: 'fit',
                closeAction: 'hide'
            }).show();

            me.previewWindow = pw;
        }
    }
});