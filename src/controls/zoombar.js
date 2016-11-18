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
                        let currentPos = { x: e.offsetX, y: e.offsetY };
                        let startAndEnd =
                            calculateStartAndEnd(this.zoombarOverlayCanvas.width, this.startPosition, this.endPosition);

                        if (currentPos.x > startAndEnd.start &&
                            currentPos.x < startAndEnd.end) {

                            this.zoombarOverlayCanvas.style.cursor = 'pointer';

                            if (this.dragging) {
                                var mousePos = (1.0 / this.zoombarOverlayCanvas.width) * (this.draggingStartPos - currentPos.x);
                                if (this.oldStartPosition - mousePos > 0 && this.oldEndPosition - mousePos < 1) {

                                    if (this.oldStartPosition - mousePos < 0.05) {
                                        mousePos = this.oldStartPosition;
                                    }
                                    if (this.oldEndPosition - mousePos > 0.95) {
                                        mousePos = -1 + this.oldEndPosition;
                                    }
                                    this.startPosition = this.oldStartPosition - mousePos;
                                    this.endPosition = this.oldEndPosition - mousePos;



                                    this.redrawOverlay();
                                }
                            }
                        }
                        else {
                            this.zoombarOverlayCanvas.style.cursor = 'default';
                        }
                    };

                    this.zoombarOverlayCanvas.onmousedown = e => {
                        this.dragging = true;
                        this.draggingStartPos = e.offsetX;
                        this.oldStartPosition = this.startPosition;
                        this.oldEndPosition = this.endPosition;
                    }

                    this.zoombarOverlayCanvas.onmouseup = e => {
                        this.dragging = false;
                    }
                    this.zoombarOverlayCanvas.onmouseout = e => {
                        this.dragging = false;
                    }
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
                    overlayCtx.fillStyle = "rgba(0, 255, 0, 0.5)";
                    overlayCtx.fillRect(startAndEnd.start, 0, startAndEnd.end - startAndEnd.start, this.zoombarOverlayCanvas.height);
                    overlayCtx.strokeStyle = "rgba(0, 255, 0, 1)";
                    overlayCtx.strokeRect(startAndEnd.start, 0, startAndEnd.end - startAndEnd.start, this.zoombarOverlayCanvas.height);
                }

            })
    });

    function calculateStartAndEnd(canvasWidth, startPos, endPosition) {
        let start = canvasWidth * startPos;
        let end = canvasWidth * endPosition;

        return { start: start, end: end };
    }

    WinJS.Class.mix(jsaw.ui.zoombar, WinJS.Utilities.eventMixin);
})();