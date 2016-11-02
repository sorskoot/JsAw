(function () {
    WinJS.Namespace.define('jsaw.ui', {
        mixer: WinJS.Class.define(
            function (element, options) {
                this.element = element || document.createElement('div');
                this.element.winControl = this;
                this.options = options;
                this.createControl();
            }, {
                createControl: function () {
                    WinJS.UI.Fragments.render('./app/templates/mixer.html', this.element)
                    .done(
                         /* Your success and error handlers */ 
                    
                    );
                }
            })
    });

    WinJS.Class.mix(jsaw.ui.mixer, WinJS.Utilities.eventMixin);
})();

