const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(__dirname, 'icons', 'icons/appicon/ElecDisplayicon256*208.png'), // Change this path to your actual icon
    transparent: true, // Transparent background
    frame: false, // No window frame
    alwaysOnTop: false, // Initially stays above
    skipTaskbar: true, // Does not appear in taskbar
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html');
  mainWindow.setIgnoreMouseEvents(true)

  mainWindow.once('ready-to-show', () => {
    console.log("Electron window is ready!, name is : "+mainWindow.getTitle());
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
