require('./track-samples');
require('./zoombar');

(function () {
    WinJS.Namespace.define('jsaw.ui', {
        trackEditor: WinJS.Class.define(
            function (element, options) {
                this.element = element || document.createElement('div');
                this.element.winControl = this;
                this.options = options;
                this.createControl();
            }, {
                createControl: function () {
                    WinJS.UI.Fragments.render('./app/templates/track-editor.html', this.element)
                                      .done( ()=>WinJS.UI.processAll());
                }
            })
    });

    WinJS.Class.mix(jsaw.ui.trackEditor, WinJS.Utilities.eventMixin);
})();