require('./controls/track-editor');
require('./controls/track-properties');
require('./controls/mixer');
require('./controls/menubar');

window.$ = (selector) => document.querySelectorAll(selector);

WinJS.UI.processAll().done(function () {
    var splitView = document.querySelector(".splitView").winControl;
    new WinJS.UI._WinKeyboard(splitView.paneElement); // Temporary workaround: Draw keyboard focus visuals on NavBarCommands
});
