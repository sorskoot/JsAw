(function () {
    WinJS.Namespace.define('jsaw.ui', {
        trackProperties: WinJS.Class.define(
            function (element, options) {
                this.element = element || document.createElement('div');
                this.element.winControl = this;
                this.options = options;
                this.createControl();
            }, {
                createControl: function () {
                    WinJS.UI.Fragments.render('./app/templates/track-properties.html', this.element)
                    .done(
                         /* Your success and error handlers */ 
                    
                    );
                }
            })
    });

    WinJS.Class.mix(jsaw.ui.trackProperties, WinJS.Utilities.eventMixin);
})();

