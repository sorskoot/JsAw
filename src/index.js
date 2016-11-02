require('./controls/track-editor');
var greet = require('./greet');

//document.querySelector(".main").innerHTML = greet();

WinJS.UI.processAll().done(function () {
    var splitView = document.querySelector(".splitView").winControl;
    new WinJS.UI._WinKeyboard(splitView.paneElement); // Temporary workaround: Draw keyboard focus visuals on NavBarCommands
});
