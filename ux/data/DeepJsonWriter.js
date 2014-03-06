/**
 * @class Ext.ux.data.DeepJsonWriter
 * @author Aaron Smith (http://moduscreate.com/expert-ext-js-reading-and-writing-structured-data/)
 * @author Josh Bradley (jbradley@arcticlcc.org)
 * Writer which adds support for writing out associations.
 * Should be used in conjunction with {@link Ext.ux.data.DeepModel}.
 */

Ext.define('Ext.ux.data.DeepJsonWriter', {
    extend: 'Ext.data.writer.Json',
    alias: 'writer.json',

    getRecordData: function(record, operation) {
        if (record.writeStructuredData) {
            return record.getWriteData();
        } else {
            return this.callParent(arguments);
        }
    }
});