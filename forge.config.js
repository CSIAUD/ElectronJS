const path = require('path');

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname,'icons/icon')
  },
  // rebuildConfig: {},
  // makers: [
  //   {
  //     name: '@electron-forge/maker-squirrel',
  //     config: {
  //       // An URL to an ICO file to use as the application icon (displayed in Control Panel > Programs and Features).
  //       iconUrl: 'https://github.com/CSIAUD/ElectronJS/blob/main/icons/icon.ico',
  //       // The ICO file to use as the icon for the generated Setup.exe
  //       setupIcon: '/icons/icon.ico',
  //     },
  //   },
  //   {
  //     name: '@electron-forge/maker-zip',
  //     platforms: ['darwin'],
  //   },
  //   {
  //     name: '@electron-forge/maker-deb',
  //     config: {
  //       options: {
  //         icon: '/icons/icon.png',
  //       },
  //     },
  //   },
  //   {
  //     name: '@electron-forge/maker-rpm',
  //     config: {},
  //   },
  //   {
  //     // Path to the icon to use for the app in the DMG window
  //     name: '@electron-forge/maker-dmg',
  //     config: {
  //       icon: '/icons/icon.icns',
  //     },
  //   },
  //   {
  //     name: '@electron-forge/maker-wix',
  //     config: {
  //       icon: '/icons/icon.ico',
  //     },
  //   },
  // ],
};