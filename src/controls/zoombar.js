
(function () {
    WinJS.Namespace.define('jsaw.ui', {
        zoombar: WinJS.Class.define(
            function (element, options) {
                this.element = element || document.createElement('div');
                this.element.classList.add('zoombar');
                this.element.winControl = this;
                this.options = options || {};
                this.createControl();
            }, {
                createControl: function () {
                  let self = this;
                  this.canvas = document.createElement('canvas');
                  this.canvas.className = 'zoombar-canvas';

                  //TODO: Render the audiotracks as lines in the canvas
                  this.canvas.width = this.options.width || 100;
                  this.canvas.height = this.options.height || 100;
                  this.overlayCanvas = document.createElement('canvas');
                  this.overlayCanvas.className = 'zoombar-overlayCanvas';
                  
                  this.overlayCanvas.width = this.options.width || 100;
                  this.overlayCanvas.height = this.options.height || 100;

                  this.element.appendChild(this.canvas);
                  this.element.appendChild(this.overlayCanvas);
                  this.redrawOverlay();

                },
                redrawOverlay:function(){

                }

            })
    });

    WinJS.Class.mix(jsaw.ui.zoombar, WinJS.Utilities.eventMixin);
})();