const { app, BrowserWindow, ipcMain, nativeTheme, Notification, shell } = require('electron');
if (require('electron-squirrel-startup')) app.quit();
const path = require('path');
const { dialog } = require('electron');
const {execFile} = require('child_process');
const pngquant = require('pngquant-bin');
const fs = require('fs');
const pfs = require('fs/promises');
const dirname = "png-compressor";

try {
    require('electron-reloader')(module)
} catch (_) {}

// ⬛☑️

// Partie 1 :

// Bouton qui déclenche l’ouverture d’un dialog pour sélectionner plusieurs fichier .png : ☑️
// Compresser les fichiers sélectionnés, avec le package pngquant-bin : ☑️
// Choix de l'enregistrement (dossier Temp `png-compressor` ou ailleurs) : ⬛
// Mettre les fichiers compressés dans le dossier tchoisi (créer si dossier n’existe pas) : ☑️
// Ouvrir le dossier choisi : ☑️

// Partie 2 :

// Mettre en plein écran : ☑️
// Mettre le logiciel en dark mode : ☑️
// Faire une barre de progression jusqu’à la fin de progression des fichiers : ☑️
// Créer une notification quand les images ont été compressé : ☑️
// Build le projet pour créer un installer : ☑️

// let progressInterval

function showNotification (title, body) {
    new Notification({ title: title, body: body }).show()
}

async function createWindow () {
    let tempPath = app.getPath('temp');
    if(!fs.existsSync(path.join(tempPath, dirname))){
        console.log("create Folder");
        try {
            fs.mkdir(path.join(tempPath, dirname), (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Directory created successfully!');
            });
        } catch (err) {
        console.error(err.message);
        }
    }
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Notifications

  // Compression PNG
  ipcMain.on('openfolders', () => {
    dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [
            { name: 'Images', extensions: ['png'] }
          ]
    })
    .then(data => {
        data.filePaths.forEach((file, count) => {
          // Progress bar
          let cMax = data.filePaths.length;
          let pPos = count / cMax;
          mainWindow.setProgressBar(pPos);

          let name = file.split('\\');
          name = name[name.length-1];
          let pathFile = path.join(tempPath, dirname,name);
          execFile(pngquant, ['-o', pathFile, file], err => err ? console.log(err) : "");
        })
        let pPos = -1;
        mainWindow.setProgressBar(pPos);
        showNotification("Opération terminée", data.filePaths.length+" Images compressées")
        shell.openPath(path.join(tempPath, dirname))
    })
    .catch(err => {
        console.log("error :")
        console.log(err)
    })
  })

  mainWindow.loadFile('index.html')
  // Plein écran
  mainWindow.maximize()

  // Dark mode
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })

}

app.on('before-quit', () => {
  clearInterval(progressInterval)
})

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})