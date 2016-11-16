(function () {
    WinJS.Namespace.define('jsaw.ui', {
        trackSamples: WinJS.Class.define(
            function (element, options) {
                this.element = element || document.createElement('div');
                this.element.winControl = this;
                this.options = options;
                this.createControl();
            }, {
                createControl: function () {
                    WinJS.UI.Fragments.render('./app/templates/track-samples.html', this.element)
                    .done(
                         /* Your success and error handlers */ 
                    
                    );
                }
            })
    });

    WinJS.Class.mix(jsaw.ui.trackSamples, WinJS.Utilities.eventMixin);
})();

