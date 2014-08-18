##DMPlanner Help

---

###About

The DMPlanner is a *client-side* application. By default, no data is sent to a remote server, but is
stored in the browser cache (local storage). Data will persist until the browser cache is cleared.
When the DMPlanner loads, it checks local storage for data.

Data may also be saved to or loaded from a file. This allows data to be stored indefinitely or transferred
between systems. Load a file using the toolbar (see below), or by dragging and dropping onto the DMPlanner window.

###Application layout

![DMPlanner layout](resources/doc/images/layout.png "DMPlanner layout")

1. ###Main Toolbar
  <div class="x-tool x-panel-header-light" style="vertical-align:middle;width:20px;height:20px;text-align:center;padding-top:1px;display:inline-block;border:0;background-color:inherit"><img style="opacity:1;background-color:inherit" role="presentation" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-img x-tool-plus"></div>
  **Add Plan**: Click this button to create a new plan. The new plan will appear in the *Plan List* (see #2) and be selected automatically.

  <div class="x-tool x-panel-header-light" style="vertical-align:middle;width:20px;height:20px;text-align:center;padding-top:1px;display:inline-block;border:0;background-color:inherit"><img style="opacity:1;background-color:inherit" role="presentation" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-img x-tool-print"></div>
  **Print Plan to PDF**: Click this button to print the currently selected plan to a PDF file. The *Print Preview* window will
  display the selected plan. If no plan is selected, the first plan is printed.

  <div style="vertical-align:middle;width:20px;height:20px;text-align:center;display:inline-block;border:0;background-color:inherit"><span style="font-family:FontAwesome;font-size:16px;color:#666;">&#xf0c7;</span></div>
  **Save to Local File**: Click to save *all* plans to a file on your local system. The file is saved as plain-text in JSON format.

  <div style="vertical-align:middle;width:20px;height:20px;text-align:center;display:inline-block;border:0;background-color:inherit"><span style="font-family:FontAwesome;font-size:16px;color:#666;">&#xf093;</span></div>
  **Load from Local File**: Click to show the open file window. Select a previously saved file to load. You may also drag and drop a
  file anywhere on the DMPlanner window. **Warning**: any existing plans will be overwritten!

  <div class="x-tool x-panel-header-light" style="vertical-align:middle;width:20px;height:20px;text-align:center;padding-top:1px;display:inline-block;border:0;background-color:inherit"><img style="opacity:1;background-color:inherit" role="presentation" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-img x-tool-help"></div>
  **Help**: Display this help panel.

  <div class="x-tool x-panel-header-light" style="vertical-align:middle;width:20px;height:20px;text-align:center;padding-top:1px;display:inline-block;border:0;background-color:inherit"><img style="opacity:1;background-color:inherit" role="presentation" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-tool-img x-tool-gear"></div>
  **Plan Settings**: Click to display the *Settings* dialog.

  ---

2. ###Plan List

  Click a row in the *Plan List* to select and load a plan. *Double-click* a field (e.g. plan name or code) to edit the contents.
  Click the <span class="fa">&#xf00d;</span> to delete the corresponding plan.

  When a plan is selected, the section titles for the plan will display in the *Section List*. The *Main Panel* will display
  the instructions for the plan, or the first section if no instructions are available.

  ---

3. ###Section List

  The *Section List* is the primary means of navigating a plan. Select a section title to display the section in the *Main Panel*.
  Click the "home" button <span  style="font-family:FontAwesome;">&#xf015;</span> to display the plan instructions, if available.

  *Levels*  are a way to selectively display questions and sections based on the plan's status, e.g. "proposed" or "funded". This
  For plans that support levels, the *Plan Level* button in the *Section List* title bar allows switching between levels. The button
  will not be displayed for plans that do not support this feature (Plan level selection is also accessible using the *Settings* button
  <span  style="font-family:FontAwesome;">&#xf013;</span> in the main toolbar.).

  ---

4. ###Main Panel

  The *Main Panel* displays content for the currently selected section as well as any instructions for the current plan. Click the
  "home" button <span  style="font-family:FontAwesome;">&#xf015;</span> in the *Section List* title bar to display the plan instructions.

  Each section contains one or more questions. Questions are usually displayed as fields in a typical form layout. However, the question
  may be represented by a customized "widget", such as a interactive map or drag-n-drop list. Help for each section is displayed in the *Help*
  panel. Form fields may have associated "tips" - hover over the <span class="fa dmp-icon-guidance sup" data-qtip="This is an example">&#xf059;</span>
  to show the tip.

  ---

5. ###Navigation Bar

  Use the *Navigation Bar* to progress through plan sections sequentially, in either direction.

  ---

6. ###Help

  The *Help* section displays on-line help: either the main application overview or help for the currently selected section.
  Click the help button <span  style="font-family:FontAwesome;">&#xf059;</span> in the *Main Toolbar* to display the application overview.

  The *Help* "panel" is collapsible. use the collaspe <span  style="font-family:FontAwesome;">&#xf138;</span> and expand <span  style="font-family:FontAwesome;">&#xf137;</span> tool
  in the *Help* title bar to hide/show the panel. Clicking the title bar when collapsed will cause the panel to temporarily slide out.
