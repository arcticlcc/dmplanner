/*
 * Prints plans.
 */
Ext.define('DMPlanner.util.Printer', {
    singleton: true,
    requires: ['Ext.XTemplate'],

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
                                            '<pre>{[this.printObject(values.data)]}</pre>',
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
        return this.template.apply(plan);
    },
    previewHtml: function(plan) {
        //var html = this.getHtml(plan);

        Ext.create('Ext.window.Window', {
            title: 'Print Preview',
            autoScroll: true,
            bodyPadding: 15,
            data: plan,
            tpl: this.template,
            height: 600,
            width: 600,
            layout: 'fit'
        }).show();

    }
});