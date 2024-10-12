const { app, BrowserWindow } = require("electron");
const contextMenu = require('electron-context-menu');

contextMenu({
	showSaveImageAs: false,
  showSearchWithGoogle: false,
  showInspectElement: false,
  showCopyLink: true
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + "/icon.png",
    frame: true,
  });

  mainWindow.loadURL("https://to-do.live.com/tasks/");

  var css = `
  .o365sx-appName,
  #ShellAboutMe,
  #ShellSettings,
  #O365_HeaderLeftRegion,
  #todoWhatsNewBtn,
  .officeApps {
    display: none !important;
  }
  
  #toDoSearchBox {
    padding: 0 10px;
  }
`;
  mainWindow.webContents.on("did-finish-load", function () {
    mainWindow.webContents.insertCSS(css);
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("browser-window-created", function (e, window) {
  window.setMenu(null);
});

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
