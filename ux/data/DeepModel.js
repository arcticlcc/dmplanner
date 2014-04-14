/**
 * @class Ext.ux.data.DeepModel
 * @author Aaron Smith (http://moduscreate.com/expert-ext-js-reading-and-writing-structured-data/)
 * @author Josh Bradley (jbradley@arcticlcc.org)
 * Model which adds support for writing out associations.
 * Will recursively write out records from model with {@link #getWriteData} method.
 */

Ext.define('Ext.ux.data.DeepModel', {
    extend: 'Ext.data.Model',

    writeStructuredData: true,

    /**
     * @cfg {Boolean} [clearFilters=false]
     * `true` if any filters on associated stores should be cleared before writing data.
     * If set to `false`, only filtered data will be written.
     */
    clearFilters: false,

    getWriteData: function() {
        var data = this.getRecordWriteData(this),
            associations = this.associations.items,
            association, type, name, associatedStore, filters,
            associatedRecords, associatedRecord,
            a, aLen, r, rLen;

        for (a=0, aLen=associations.length; a<aLen; a++) {

            association = associations[a];
            type = association.type;
            name = association.name;

            if (type === 'hasMany') {

                associatedStore = this[association.storeName];
                // Initialize the array for this association
                data[name] = [];

                // If the association's loaded, process its records
                if (associatedStore && associatedStore.getCount() > 0) {
                    //clear the filters
                    if(this.clearFilters) {
                        //copy for later
                        filters = associatedStore.filters.clone();

                        associatedStore.clearFilter(true);
                    }

                    associatedRecords = associatedStore.data.items;

                    // Append data for each record
                    for (r=0, rLen=associatedRecords.length; r<rLen; r++) {
                        //recursively call for models with getWriteData method
                        data[name][r] = associatedRecords[r] instanceof Ext.ux.data.DeepModel ? this.getWriteData.call(associatedRecords[r]) : this.getRecordWriteData(associatedRecords[r]);
                    }

                    //re-apply the filters
                    if(this.clearFilters) {
                        associatedStore.filters = filters;
                        associatedStore.filter();
                    }
                }


            } else if (type === 'hasOne') {
                associatedRecord = this[association.instanceName];
                // If the record exists, append its data
                if (associatedRecord !== undefined) {
                    data[name] = this.getRecordWriteData(associatedRecord);
                }
            }

        }

        return data;
    },

    getRecordWriteData: function(record) {
        var isPhantom = record.phantom === true,
            writeAllFields = record.getProxy().getWriter().writeAllFields, //modified to use the writer setting
            fields = record.fields,
            fieldItems = fields.items,
            data = {},
            changes = record.getChanges(),
            field,
            key,
            f, fLen;

        for (f=0, fLen=fieldItems.length; f<fLen; f++) {
            field = fieldItems[f];

            if (field.forcePersist || (field.persist && (writeAllFields || isPhantom))) {
                this.setFieldWriteData(data, record, field, record.get(field.name));
            }
        }

        for (key in changes) {
            if (changes.hasOwnProperty(key)) {
                field = fields.get(key);
                if (field.persist) {
                    this.setFieldWriteData(data, record, field, changes[key]);
                }
            }
        }
        return data;
    },

    setFieldWriteData: function(data, record, field, value) {
        var name = field[this.nameProperty] || field.name,
            path, i, len, curr;

        if (field.name === record.idProperty && record.phantom) {
            return;
        }

        if (field.mapping) {
            if (field.mapping.indexOf('.')) {
                path = field.mapping.split('.');
                curr = data;
                for (i=0, len=path.length-1; i<len; i++) {
                    if (!curr[path[i]]) {
                        curr[path[i]] = {};
                    }
                    curr = curr[path[i]];
                }
                curr[path[i]] = value;
            }
        } else {
            data[name] = value;
        }
    }

});