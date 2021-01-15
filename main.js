const { app, BrowserWindow, autoUpdater, dialog, Notification } = require('electron')
const isDev = require('electron-is-dev');

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


function showNotification (title, body) {
  const notification = {
    title: title,
    body: body
  }
  new Notification(notification).show()
}

function setupUpdates () {
  if (!isDev) {
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

      showNotification(
        "Application Update",
        "This application has been updated to " + releaseName
        + ". Restart the application to apply the updates."
      )
      
    })

    autoUpdater.on('error', message => {
      console.error('There was a problem updating the application')
      console.error(message)
    })

    autoUpdater.on('checking-for-update', () => console.log('Checking for Updates...', autoUpdater.getFeedURL()))
    autoUpdater.on('update-available', () => console.log('Update Available'))
    autoUpdater.on('update-not-available', () => console.log('No Updates Available'))

    autoUpdater.checkForUpdates()
  }
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
   setupUpdates()
})
