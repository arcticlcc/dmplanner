/**
 * WARNING: The dmpmappanel widget has been cobbled together by hacking
 * code from another project based on older APIs(GeoExt, ExtJs, OpenLayers).
 * It needs to be refactored, so please don't spend a lot of time
 * adding to it, unless you refactor first. The components
 * need to be decoupled, i.e. you should be able to
 * instantiate the PlanMap without the MapFeatureGrid.
 *
 * Toolbar for use with GeoExt map panels.
 */
Ext.define('DMPlanner.ux.map.MapPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dmpmappanel',
    requires: [//
        'DMPlanner.ux.map.PlanMap', //
        'DMPlanner.ux.map.MapFeatureGrid', //
        'DMPlanner.ux.map.PrintBase'
    ],

    layout: 'border',


    /**
     * @cfg {OpenLayers.Format} format
     * The format to use when serializing features.
     */

    /**
     * @cfg {string} data
     * Serialized vector features to load into the map.
     */


    /**
     * Generate output for printing.
     * @param {string} data Serialized vector features.
     */
    dmpPrint: function(data) {
        var out;

        if(data) {
            var format = new OpenLayers.Format[this.format]({
                    'internalProjection': new OpenLayers.Projection("EPSG:4326"),
                    'externalProjection': new OpenLayers.Projection("EPSG:900913")
                }),
                read = format.read(data);

            format.externalProjection = new OpenLayers.Projection("EPSG:4326");
            out = this.printMap(read);
            out += '<h6>GeoJSON source: </h6><p style="white-space:pre;font-size:90%">' + format.write(read, true) + '</p>';
            format.destroy();
        } else {
            out = false;
        }

        return out;
    },

    /**
     * Generate output for printing.
     * @param {string} data Serialized vector features.
     */
    printMap: function(data) {
        var base = new OpenLayers.Format.GeoJSON().read(DMPlanner.ux.map.PrintBase.json),
            baseLayer = new OpenLayers.Layer.Vector("Base", {
                renderers: ["Canvas"],
                style: {
                  'fillColor': '#fff',
                  'strokeOpacity': 0
                }
            }),
            oLayer = new OpenLayers.Layer.Vector("OL", {
                renderers: ["Canvas"]
            }),
            temp = Ext.DomHelper.append(Ext.getBody(),
                '<div id="dmp-tempmap" style="width:500px;height:250px;position: absolute;top:-100000px;left:-100000px;"></div>'),
            map = new OpenLayers.Map({
                div: "dmp-tempmap",
                zoomMethod: null,
                panMethod: null,
                theme: null
                //projection: new OpenLayers.Projection("EPSG:900913"),
                ///displayProjection: new OpenLayers.Projection("EPSG:4326")
            }),
            canvas = document.createElement("canvas"),
            canvasContext = canvas.getContext('2d');

            baseLayer.addFeatures(base);
            oLayer.addFeatures(data);
            map.addLayers([new OpenLayers.Layer("",{isBaseLayer: true}), baseLayer, oLayer]);
            map.zoomToExtent(oLayer.getDataExtent());

            if(map.getZoom() > 3) {
                map.zoomTo(3);
            }

            canvas.width = temp.clientWidth;
            canvas.height = temp.clientHeight;
            canvasContext.fillStyle   = '#b3d1ff'; // set canvas background color
            canvasContext.fillRect  (0,   0, canvas.width, canvas.height);  // now fill the canvas
            canvasContext.drawImage(baseLayer.renderer.canvas.canvas, 0, 0,
                                canvas.width, canvas.height);
            canvasContext.drawImage(oLayer.renderer.canvas.canvas, 0, 0,
                                canvas.width, canvas.height);
            Ext.removeNode(temp);

            //TODO:this is a hack, jsPDF fromHTML isn't rendering the images correctly.
            //We have to wrap the img in a span with an id (yes, it's repeated)
            return '<span id="dmp-print-img"><img src="' + canvas.toDataURL("image/png") + '" width="'+ canvas.width +'" height="'+ canvas.height +'"/></span>';
    },

    initComponent: function() {
        var me = this,
            vec = new OpenLayers.Layer.Vector("Plan Features", {
                visibility: true
            });

        Ext.applyIf(me, {
            dmpPlugin: true,
            format: 'GeoJSON',
            items: [{
                xtype: 'dmpmap',
                region: 'center',
                header: false,
                vector: vec
            }, {
                xtype: 'dmpfeaturegrid',
                layer: vec,
                region: 'south',
                collapsible: true
            }]
        });

        me.callParent(arguments);
    }
});
