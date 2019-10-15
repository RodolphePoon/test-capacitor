import React, { useState } from 'react';
import { Plugins, CameraResultType, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import logo from './logo.svg';
import './App.css';
const { Device, Modals, Camera, Browser, Share, Filesystem, Geolocation, SplashScreen } = Plugins;


function App() {

  const [src, setSrc] = useState('')

  const showDeviceInfo = async () => {
    let info = await Device.getInfo();
    await Modals.alert({
      title: 'Info',
      message: `UUID: ${info.uuid};
        Model: ${info.model}`
    });
  }

  const getPos = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
  }

  const testWriteFile = () => {
    try {
      Filesystem.writeFile({
        path: 'secrets/text.txt',
        data: "This is a test",
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      })
    } catch (e) {
      console.error('Unable to write file', e);
    }

  }

  const splash = () => {
    SplashScreen.show({
      autoHide: false
    });
  }

  const takePicture = async () => {
    const CameraPhoto = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
    });



    console.log({ CameraPhoto })
    // image.webPath will contain a path that can be set as an image src. 
    // You can access the original file using image.path, which can be 
    // passed to the Filesystem API to read the raw data of the image, 
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = CameraPhoto.webPath;
    // Can be set to the src of an image now
    setSrc(imageUrl)
    //imageElement.src = imageUrl;
  }
  const OpenBrowser = async () => {
    await Browser.open({ url: 'http://capacitor.ionicframework.com/' });

  }
  const shareTest = async () => {

    let shareRet = await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies'
    });

    console.log({ shareRet })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={takePicture}> takePicture
        </button>
        <button onClick={OpenBrowser}> OpenBrowser</button>
        <button onClick={shareTest}> shareTest</button>
        <button onClick={testWriteFile}> testWriteFile</button>
        <button onClick={getPos}> getPos</button>
        <button onClick={splash}> splash</button>





        <button onClick={showDeviceInfo}> Show Device Info</button>
        <img src={src} height={200} width={200} alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
