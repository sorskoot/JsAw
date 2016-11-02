(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("app/pages/track-editor.html", {
        // This function is called after the page control contents
        // have been loaded, controls have been activated, and
        // the resulting elements have been parented to the DOM.
        ready: function (element, options) {
            options = options || {};
            this._data = WinJS.Binding.as({ controlText: options.controlText, message: options.message });
            // Data bind to the child tree to set the control text
            WinJS.Binding.processAll(element, this._data);
       },    
    });

    // The following lines expose this control constructor as a global.
    // This lets you use the control as a declarative control inside the
    // data-win-control attribute.
    WinJS.Namespace.define("Controls_TrackEditor", {
        TrackEditor: ControlConstructor
    });

})();