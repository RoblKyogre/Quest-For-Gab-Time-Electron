const { app, BrowserWindow, autoUpdater, dialog } = require('electron')

if (require('electron-squirrel-startup')) return app.quit();

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html');

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('ready', () => {

  const server = "https://hazel.roblkyogre.vercel.app"
  const feed = `${server}/update/${process.platform}/${app.getVersion()}`

  autoUpdater.setFeedURL(feed);

  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 60000)

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {

    console.log('Update Downloaded!')
    console.log(releaseName)
    console.log(releaseNotes)

    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  })

  autoUpdater.on('error', message => {
    console.error('There was a problem updating the application')
    console.error(message)
  })

  autoUpdater.on('checking-for-update', () => console.log('Checking for Updates...', autoUpdater.getFeedURL()))
  autoUpdater.on('update-available', () => console.log('Update Available'))
  autoUpdater.on('update-not-available', () => console.log('No Updates Available'))

  autoUpdater.checkForUpdates()

})
