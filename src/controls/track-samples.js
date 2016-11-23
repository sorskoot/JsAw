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
                },
                updatePan: function (startPos) {
                    var timelines = $('.timeline');
                    var scrollLeft = startPos * (timelines[0].scrollWidth - timelines[0].clientWidth);
                    for(var i = 0; i < timelines.length;i++){
                        timelines[i].scrollLeft = scrollLeft;
                    }                    
                },
                updateScale: function (scale) {

                }
            })
    });

    WinJS.Class.mix(jsaw.ui.trackSamples, WinJS.Utilities.eventMixin);
})();

