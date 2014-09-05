DMPlanner
===

##About

The DMPlanner is a JavaScript application for creating data management plans. The DMPlanner is primarily built using the [ExtJS framework](http://docs.sencha.com/extjs/4.2.1/#). See the [CREDITS](https://github.com/arcticlcc/dmplanner/blob/master/CREDIT.md) for a list of other open source libraries used.

The DMPlanner is a *client-side* application. By default, no data is sent to a remote server, but is
stored in the browser cache (local storage). Data will persist until the browser cache is cleared.
When the DMPlanner loads, it checks local storage for cached data.

Data may also be saved to or loaded from a (JSON) file. This allows data to be stored indefinitely or transferred between systems.

The DMPlanner is configured using a [JSON file](https://github.com/arcticlcc/dmplanner/blob/master/data.json). The config file serves as both template for generating new plans and the storage format. The "saved" output contains both the configuration as well as the data for each plan.

By default, any of the native ExtJS form [field widgets](http://docs.sencha.com/extjs/4.2.1/extjs-build/examples/themes/index.html) (or sub-classes) may be used when defining a plan. To supplement the basic form widgets, custom plug-ins may also be created, such as maps or drag-n-drop lists.

---

##Development/Installation

###Option 1: Using the JSON config

Creating a new (or editing an existing) JSON config file is the easiest way to customize the DMPlanner. Use this option, if you're not interested in creating new plugins or modifying the application source.

**Steps**:

 1. [Fork](https://help.github.com/articles/fork-a-repo) or clone the repository.
 2. The production code is in the [gh-pages branch](https://github.com/arcticlcc/dmplanner/tree/gh-pages).
 3. Customize
    - Edit the [data.json](https://github.com/arcticlcc/dmplanner/blob/gh-pages/data.json) file or one of the [examples](https://github.com/arcticlcc/dmplanner/tree/gh-pages/resources/examples).
    - Update the [documentation files](https://github.com/arcticlcc/dmplanner/tree/gh-pages/resources/doc).    
 4. If you push the changes to GitHub, you'll have a DMPlanner instance hosted at *{username}*.github.io/dmplanner/

**Alternative**: [Download the gh-pages branch](https://github.com/arcticlcc/dmplanner/archive/gh-pages.zip) and use with any web server.  

###Option 2: Modifying the source

*TODO*

---

##License

Unless otherwise noted, the contents of this repository are released into the public domain, see the [LICENSE](https://github.com/arcticlcc/dmplanner/blob/master/LICENSE).

*Note*: ExtJS is [licensed](http://www.sencha.com/products/extjs/licensing/) under the terms of the Open Source GPL 3.0 license. See additional licensing info included with other [external libraries](https://github.com/arcticlcc/dmplanner/blob/master/CREDIT.md).

---

##Directory Layout

### dmplanner/.sencha

This folder contains files used in the build process.

### dmplanner/app

This folder contains the javascript files for the application.

### dmplanner/ext/cmd

This folder contains files used in the build process.

### dmplanner/lib

This folder contains external JavaScript libraries and git sub-modules.

### dmplanner/overrides

This folder contains override classes. All overrides in this folder will be
automatically included in application builds if the target class of the override
is loaded.

### dmplanner/resources

This folder contains static resources (typically an `"images"` folder as well).

### dmplanner/sass/etc

This folder contains misc. support code for sass builds (global functions,
mixins, etc.)

### dmplanner/sass/src

This folder contains sass files defining css rules corresponding to classes
included in the application's javascript code build.  By default, files in this
folder are mapped to the application's root namespace, 'dmplanner'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in dmplanner/.sencha/app/sencha.cfg.

### dmplanner/sass/var

This folder contains sass files defining sass variables corresponding to classes
included in the application's javascript code build.  By default, files in this
folder are mapped to the application's root namespace, 'dmplanner'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in dmplanner/.sencha/app/sencha.cfg.

### dmplanner/ux

This folder contains ExtJS user extensions.
