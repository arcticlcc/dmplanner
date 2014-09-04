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
            '<div id="DMP-print-wrapper" id="{id}">',
                '<h1>{name}</h1>',
                '<p><span class="label">Code: </span>{code}</p>',
                '<section>',
                '<h2><span class="label">Sections</span></h2>',
                '<tpl for="sections">',
                    '<h3 id="{id}">{name}</h3>',
                    '<tpl if="data">',
                        '<div>{[this.printObject(values.data, values.config)]}</div>',
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
                                        '<p>{name}:</p>',
                                            '<div>{[this.printObject(values.data, values.config)]}</div>',
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
            printObject: function(data, config){
                var printer, out;

                if(config && config.xtype) {
                    printer = Ext.widget(config.xtype);

                    if(printer && Ext.isFunction(printer.dmpPrint)) {
                        out = printer.dmpPrint(data);
                        printer.destroy();
                    } else {
                        out = false; //'Printing not supported.';
                        printer.destroy();
                    }
                }

                if(!out) {
                    if(Ext.isString(data) && data !=='') {
                        out = '<span style="white-space:pre">' + Ext.htmlEncode(JSON.stringify(JSON.parse(unescape(data)), undefined, 2)) + '</span>';
                    } else if(Ext.isObject(data)||Ext.isArray(data)) {
                        out = '<span style="white-space:pre">' + Ext.htmlEncode(JSON.stringify(data, undefined, 2)) + '</span>';
                    } else {
                        out = 'No Data Provided';
                    }
                }

                return out;
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
                iconCls: 'x-tool-img dmp-tool-print',
                data: cloned,
                tpl: this.template,
                height: dim,
                width: dim,
                layout: 'fit',
                closeAction: 'hide',
                tbar:[{
                    xtype: 'button',
                    text: 'Save as PDF',
                    handler: function(btn){
                        var pdf = new jsPDF('p','mm','letter'),
                            margin = 12.7, // inches on a 8.5 x 11 inch sheet.
                            el = btn.up('window').getEl().getById('DMP-print-wrapper'),
                            name = this.name,
                            cb = function(){
                                pdf.save(name.replace(/\s+/g, '-') + '.pdf');
                            },
                            specialElementHandlers = {
                                //TODO:this is a hack, jsPDF isn't rendering the images correctly
                                '#dmp-print-img': function(element, renderer) {
                                    var img = element.firstChild,
                                    h =  img.height/ pdf.internal.scaleFactor,
                                    w =  img.width / pdf.internal.scaleFactor;

                                    pdf.addImage(img.src, 'PNG', renderer.x, renderer.y, w, h);
                                    renderer.y += h;
                                    return true;
                                }
                            };


                        pdf.fromHTML(el.dom, margin, margin, {
                            'width': 190.5,
                            'elementHandlers': specialElementHandlers
                        }, cb, {
                            top: margin,
                            bottom: margin
                        });


                        //pdf.output('dataurlnewwindow');
                    },
                    scope: cloned
                }]

            }).show();

            me.previewWindow = pw;
        }
    }
});