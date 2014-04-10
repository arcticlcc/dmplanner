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
        'DMPlanner.ux.map.Map', //
        'DMPlanner.ux.map.MapFeatureGrid'//
    ],

    layout: 'border',


    /**
     * @cfg {OpenLayers.Format} format
     * The format to use when serializing features.
     */

    initComponent: function() {
        var me = this;

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
