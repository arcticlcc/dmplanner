/**
 * Plan map with optional toolbar.
 */

Ext.define('DMPlanner.ux.PlanMap', {
    extend: 'GeoExt.panel.Map',
    alias: 'widget.dmpmap',
    requires: [
        'GeoExt.panel.Map',//
        'GeoExt.slider.Zoom',//
        'GeoExt.slider.Tip',//
        'GeoExt.slider.LayerOpacity',//
        'Ext.toolbar.Toolbar',//
        'DMPlanner.ux.MapToolbar'//
    ],

    title: 'Map',

    /**
     * @property {OpenLayers.Layer.Vector} planVectors
     * The map layer containing the plan vector features.
     */

    /**
     * @cfg {boolean} showTools
     * True to show the map toolbar.
     */
    displayTools: true,

    /**
     * @cfg {string} commonStore
     * The store to use for the add feature menu,
     * passed to the toolbar. Only applicable if displayTools is true.
     */
    commonStore: false,

    /**
     * @cfg {OpenLayers.Layer.Vector} planVectors
     * The vector layer containing plan features.
     */

    /**
     * @cfg {boolean} zoomOnLoad
     * Whether to zoom to the extent of the features
     * in the planVectors layer on the next map load.
     * This property is set to false after the load completes.
     */
     zoomOnLoad: true,

    /**
     * @cfg {number} maxZoomOnLoad
     * The maximum zoom level for {@link #property-zoomOnLoad}
     */
     maxZoomOnLoad: 6,

    /**
     * @cfg {Ext.toolbar.Toolbar} mapToolbar
     * The map toolbar.
     */
    mapToolbar: undefined,

    initComponent: function() {
        var me = this,
            wms = new OpenLayers.Layer.WMS(
                "OpenLayers WMS",
                "http://vmap0.tiles.osgeo.org/wms/vmap0?",
                {layers: 'basic'}
            ),
            bdl = new OpenLayers.Layer.TMS("SDMI BDL(Alaska Albers)", "http://swmha.gina.alaska.edu/tilesrv/bdl/tile/",{
                    type: 'jpeg',
                    wrapDateLine: true,
                    isBaseLayer: true,
                    getURL:function(bounds) {
                        var res = this.map.getResolution();
                        var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
                        var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
                        var z = this.map.getZoom();
                        var tileCount = (1 << z);

                        //Wrap the X value
                        var X = (x % tileCount);
                        //Check for JS modulo operator possibly returning negative values
                        if(X < 0) { X += tileCount; }

                        var path = X + "/" + y + "/" + z;
                        var url = this.url;
                        if (url instanceof Array) {
                            url = this.selectUrl(path, url);
                        }
                        return url + path;
                }}),
            saveStrategy = new OpenLayers.Strategy.Save(),
            fixedStrategy = new OpenLayers.Strategy.Fixed(),
            refreshStrategy = new OpenLayers.Strategy.Refresh(),
            vector = new OpenLayers.Layer.Vector("Plan Features",{
                visibility: true/*,
                strategies: [
                    refreshStrategy,
                    fixedStrategy,
                    saveStrategy
                ],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: '../projectfeature',
                    format: new OpenLayers.Format.GeoJSON({
                        ignoreExtraDims: true
                    }),
                    deleteWithPOST: true
                })*/
            });//,
            /*protoCallBack = function(resp) {
                //console.info(arguments);
                if(resp.code !== OpenLayers.Protocol.Response.SUCCESS) {
                    DMPlanner.app.showError('There was an error processing the features.</br>Error: ' + Ext.decode(resp.priv.responseText).message);
                } else if(resp.requestType.toLowerCase() !== 'delete'){
                //custom event called when successful
                    this.planVectors.events.triggerEvent("ptsfeaturesupdated", resp);
                }
            };

        //TODO: better error handling, specific to type of operation
        vector.protocol.options.update = { callback: protoCallBack, scope: this };
        vector.protocol.options.create = { callback: protoCallBack, scope: this };
        vector.protocol.options["delete"] = { callback: protoCallBack, scope: this };*/

        var layerInfo = {
          "currentVersion" : 10.01,
          "mapName" : "Layers",
          "copyrightText" : "Sources: Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
          "spatialReference" : {
            "wkid" : 102100
          },
          "singleFusedMapCache" : true,
          "tileInfo" : {
            "rows" : 256,
            "cols" : 256,
            "dpi" : 96,
            "format" : "JPEG",
            "compressionQuality" : 90,
            "origin" : {
              "x" : -20037508.342787,
              "y" : 20037508.342787
            },
            "spatialReference" : {
              "wkid" : 102100
            },
            "lods" : [
              {"level" : 0, "resolution" : 156543.033928, "scale" : 591657527.591555},
              {"level" : 1, "resolution" : 78271.5169639999, "scale" : 295828763.795777},
              {"level" : 2, "resolution" : 39135.7584820001, "scale" : 147914381.897889},
              {"level" : 3, "resolution" : 19567.8792409999, "scale" : 73957190.948944},
              {"level" : 4, "resolution" : 9783.93962049996, "scale" : 36978595.474472},
              {"level" : 5, "resolution" : 4891.96981024998, "scale" : 18489297.737236},
              {"level" : 6, "resolution" : 2445.98490512499, "scale" : 9244648.868618},
              {"level" : 7, "resolution" : 1222.99245256249, "scale" : 4622324.434309},
              {"level" : 8, "resolution" : 611.49622628138, "scale" : 2311162.217155},
              {"level" : 9, "resolution" : 305.748113140558, "scale" : 1155581.108577},
              {"level" : 10, "resolution" : 152.874056570411, "scale" : 577790.554289},
              {"level" : 11, "resolution" : 76.4370282850732, "scale" : 288895.277144},
              {"level" : 12, "resolution" : 38.2185141425366, "scale" : 144447.638572},
              {"level" : 13, "resolution" : 19.1092570712683, "scale" : 72223.819286},
              {"level" : 14, "resolution" : 9.55462853563415, "scale" : 36111.909643},
              {"level" : 15, "resolution" : 4.77731426794937, "scale" : 18055.954822},
              {"level" : 16, "resolution" : 2.38865713397468, "scale" : 9027.977411},
              {"level" : 17, "resolution" : 1.19432856685505, "scale" : 4513.988705},
              {"level" : 18, "resolution" : 0.597164283559817, "scale" : 2256.994353},
              {"level" : 19, "resolution" : 0.298582141647617, "scale" : 1128.497176}
            ]
          },
          "initialExtent" : {
            "xmin" : -20037507.0671618,
            "ymin" : -19971868.8804086,
            "xmax" : 20037507.0671618,
            "ymax" : 19971868.8804086,
            "spatialReference" : {
              "wkid" : 102100
            }
          },
          "fullExtent" : {
            "xmin" : -20037507.0671618,
            "ymin" : -19971868.8804086,
            "xmax" : 20037507.0671618,
            "ymax" : 19971868.8804086,
            "spatialReference" : {
              "wkid" : 102100
            }
          },
          "units" : "esriMeters"
        };
        //The max extent for spherical mercator
        var maxExtent = new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34);
        //Max extent from layerInfo above
        var layerMaxExtent = new OpenLayers.Bounds(
            layerInfo.fullExtent.xmin,
            layerInfo.fullExtent.ymin,
            layerInfo.fullExtent.xmax,
            layerInfo.fullExtent.ymax
        );

        var resolutions = [];
        for (var i=0; i<layerInfo.tileInfo.lods.length; i++) {
            resolutions.push(layerInfo.tileInfo.lods[i].resolution);
        }
        var topo = new OpenLayers.Layer.ArcGISCache( "Topo",
            "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer", {
                isBaseLayer: false,
                wrapDateLine: false,
                visibility: true,
                displayInLayerSwitcher:false,
                attribution: 'World Topo Map by <a href="http://www.arcgis.com/home/item.html?id=30e5fe3149c34df1ba922e6f5bbf808f">ESRI</a>',
                //From layerInfo above
                resolutions: resolutions,
                tileSize: new OpenLayers.Size(layerInfo.tileInfo.cols, layerInfo.tileInfo.rows),
                tileOrigin: new OpenLayers.LonLat(layerInfo.tileInfo.origin.x , layerInfo.tileInfo.origin.y),
                maxExtent: layerMaxExtent,
                projection: 'EPSG:' + layerInfo.spatialReference.wkid
            });
        var nmap = new OpenLayers.Layer.ArcGISCache( "National Map Vector",
            "http://basemap.nationalmap.gov/ArcGIS/rest/services/TNM_Vector_Small/MapServer", {
                isBaseLayer: false,
                wrapDateLine: false,
                visibility: false,
                attribution: '<a href="http://nationalmap.gov">National Map</a>',
                //From layerInfo above
                resolutions: resolutions,
                tileSize: new OpenLayers.Size(layerInfo.tileInfo.cols, layerInfo.tileInfo.rows),
                tileOrigin: new OpenLayers.LonLat(layerInfo.tileInfo.origin.x , layerInfo.tileInfo.origin.y),
                //maxExtent: layerMaxExtent,
                projection: 'EPSG:' + layerInfo.spatialReference.wkid
            });
        var bdlMerc = new OpenLayers.Layer.XYZ( "GINA BDL",
                    "http://tiles.gina.alaska.edu/tilesrv/bdl/tile/${x}/${y}/${z}",
                    {sphericalMercator: true,isBaseLayer: false,wrapDateLine: true, displayInLayerSwitcher:false,
                        attribution: 'Best Data Layer provided by <a href="http://www.gina.alaska.edu">GINA</a>'});

        var topoBdl = new OpenLayers.Layer( "Topo/Imagery",
                    {sphericalMercator: true,isBaseLayer: false,wrapDateLine: true, displayInLayerSwitcher:true});

        topoBdl.events.on({
            "visibilitychanged": function(evt) {
                var vis = evt.object.visibility,
                    slider = this.down('#topoSlider');

                slider.setVisible(vis);
                slider.complementaryLayer.setVisibility(vis);
                slider.layer.setVisibility(vis);
            },
            scope: this
        });

        var plain = new OpenLayers.Layer( "Empty",
                    {sphericalMercator: true,isBaseLayer: true,wrapDateLine: true, displayInLayerSwitcher:false});

        me.map = new OpenLayers.Map('map', {
            maxExtent: maxExtent,
            //StartBounds: layerMaxExtent,
            units: (layerInfo.units == "esriFeet") ? 'ft' : 'm',
            resolutions: resolutions,
            tileSize: new OpenLayers.Size(layerInfo.tileInfo.cols, layerInfo.tileInfo.rows),
            projection: 'EPSG:' + layerInfo.spatialReference.wkid,
            layers: [plain,topoBdl,bdlMerc,topo,nmap,vector]
        });

        //prevent selection of feature with state === 'Deleted'
        vector.events.on({
            "beforefeatureselected": function(evt) {
                if(evt.feature.state === OpenLayers.State.DELETE) {
                    return false;
                }
            }
        });

        Ext.applyIf(me, {
//            center: '12.3046875,51.48193359375',
//            zoom: 6,
//            stateful: true,
//            stateId: 'mappanel',
//            extent: '12.87,52.35,13.96,52.66',
            items:[],
            planVectors: vector
        });

        me.callParent(arguments);

        var sliders = {
                xtype: 'panel',
                header:false,
                constrainTo: me.getEl(),
                floating: true,
                x: 15,
                y: me.displayTools ? 95 : 75,
                unstyled:true,
                layout: {
                    type: 'vbox',
                    padding: '10, 0, 15',
                    align: 'center'
                },
                autoShow: true,
                shadow: false,

                items: [{
                    xtype: "gx_zoomslider",
                    map: me.map,
                    vertical: true,
                    aggressive: false,
                    height: 100,
                    plugins: Ext.create('GeoExt.SliderTip', {
                        getText: function(thumb) {
                            var slider = thumb.slider,
                             out = '<div>Zoom Level: {0}</div>' +
                            '<div>Resolution: {1}</div>' +
                            '<div>Scale: 1 : {2}</div>';
                            return Ext.String.format(out, slider.getZoom(),
                                slider.getResolution(), Ext.util.Format.round(slider.getScale(),0));
                        }
                    })
                }, {
                    xtype: 'gx_opacityslider',
                    itemId: 'topoSlider',
                    layer: topo,
                    complementaryLayer: bdlMerc,
                    changeVisibility: true,
                    aggressive: true,
                    vertical: true,
                    height: 120,
                    margin: '20, 0, 0, 0',
                    plugins: Ext.create("GeoExt.slider.Tip", {
                        getText: function(thumb) {
                            return Ext.String.format('Topo Layer {0}%', thumb.value);
                        }
                    })
                }]
            };

        me.on('render', function(){this.up('sectionpanel').add(sliders);});


        me.map.addControl(new OpenLayers.Control.LayerSwitcher());
        me.map.addControl(new OpenLayers.Control.Attribution());

        if(me.displayTools) {
           me.mapToolbar =  {
                xtype: 'maptoolbar',
                map: me.map,
                vectorLayer: vector,
                saveStrategy: saveStrategy,
                refreshStrategy: refreshStrategy,
                commonStore: me.commonStore,
                maskCmp: true,
                dock: 'top'
            };
            me.addDocked(me.mapToolbar);
        }
    },

    /**
     * Add features to the plan vector layer.
     */

    addVector: function(wkt) {
        var me = this,
            vectors = me.planVectors,
            format = new OpenLayers.Format.WKT(),
            bounds, features;

        features = format.read(wkt);

        if(features) {
            if(features.constructor != Array) {
                features = [features];
            }
            for(var i=0; i<features.length; ++i) {

                features[i].state = OpenLayers.State.INSERT;

                if (!bounds) {
                    bounds = features[i].geometry.getBounds();
                } else {
                    bounds.extend(features[i].geometry.getBounds());
                }

            }
            vectors.addFeatures(features);
            me.map.zoomToExtent(bounds);
        }
    }
});
