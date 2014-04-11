/*
 * Filter to set the plan level.
 */
Ext.define('DMPlanner.util.LevelFilter', {
    singleton: true,

    id: 'dmplevelfilter',
    property: 'level',
    value: 0,
    operator: '<='
});
