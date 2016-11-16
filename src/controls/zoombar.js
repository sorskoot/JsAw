(function () {
    WinJS.Namespace.define('jsaw.ui', {
        zoombar: WinJS.Class.define(
            function (element, options) {
                this.element = element || document.createElement('div');
                this.element.classList.add('zoombar-control');
                this.element.winControl = this;
                this.options = options || {};

                this.startPosition = 0.2//0.0; 
                this.endPosition = 0.7;//1.0;

                this.createControl();
            }, {
                createControl: function () {
                    WinJS.UI.Fragments.render('./app/templates/zoombar.html', this.element)
                        .done(
                        html => {

                            this.zoombarCanvas = html.querySelector(".zoombar-canvas");
                            this.zoombarOverlayCanvas = html.querySelector(".zoombar-overlayCanvas");

                            this.setupEvents();
                            // this.canvas.width = this.options.width || 100;
                            // this.canvas.height = this.options.height || 100;                    
                            // this.overlayCanvas.width = this.options.width || 100;
                            // this.overlayCanvas.height = this.options.height || 100;         
                            this.drawBackground();
                            this.redrawOverlay();
                        }
                        );
                },
                setupEvents: function () {
                    this.zoombarOverlayCanvas.onmousemove = (e) => {
                        let currentPos = {x:e.offsetX,y:e.offsetY};
                        let startAndEnd =
                            calculateStartAndEnd(this.zoombarOverlayCanvas.width, this.startPosition, this.endPosition);

                        if (currentPos.x > startAndEnd.start &&
                            currentPos.x < startAndEnd.end)
                            this.zoombarOverlayCanvas.style.cursor = 'pointer';
                        else{
                            this.zoombarOverlayCanvas.style.cursor = 'default';
                        }
                    };
                },
                drawBackground: function () {
                    // draw the tracks on the zoombar
                    let zoombarCtx = this.zoombarCanvas.getContext('2d');
                    zoombarCtx.clearRect(0, 0, this.zoombarCanvas.width, this.zoombarCanvas.height);
                    zoombarCtx.fillStyle = "rgba(255, 0, 255, 1)";
                    zoombarCtx.fillRect(0, 0, this.zoombarCanvas.width, this.zoombarCanvas.height);
                },
                redrawOverlay: function () {
                    // draw draggable overlay
                    let overlayCtx = this.zoombarOverlayCanvas.getContext('2d');

                    let startAndEnd =
                        calculateStartAndEnd(this.zoombarOverlayCanvas.width, this.startPosition, this.endPosition);

                    overlayCtx.clearRect(0, 0, this.zoombarOverlayCanvas.width, this.zoombarOverlayCanvas.height);
                    overlayCtx.fillStyle = "rgba(255, 255, 255, 0.1)";
                    overlayCtx.fillRect(startAndEnd.start, 0, startAndEnd.end - startAndEnd.start, this.zoombarOverlayCanvas.height);
                    overlayCtx.strokeStyle = "rgba(255, 255, 255, 0.7)";
                    overlayCtx.strokeRect(startAndEnd.start, 0, startAndEnd.end - startAndEnd.start, this.zoombarOverlayCanvas.height);
                }

            })
    });

    function calculateStartAndEnd(canvasWidth, startPos, endPostion) {
        let start = canvasWidth * startPos;
        let end = canvasWidth * endPostion;

        return { start: start, end: end };
    }

    WinJS.Class.mix(jsaw.ui.zoombar, WinJS.Utilities.eventMixin);
})();