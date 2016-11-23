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
                    let self = this;
                    WinJS.UI.Fragments.render('./app/templates/track-editor.html', this.element)
                        .done((html) => {

                            WinJS.UI.processAll().done(() => {
                                self.zoombar = html.querySelector("#zoombar").winControl;
                                self.samples = html.querySelector("#track-samples").winControl;

                                self.zoombar.addEventListener("dragCompleted", (e) => {
                                   self.samples.updatePan(e.detail.startPosition);
                                   self.samples.updateScale(e.detail.scale);
                                })
                            })
                        });
                }
            })
    });

    WinJS.Class.mix(jsaw.ui.trackEditor, WinJS.Utilities.eventMixin);
})();