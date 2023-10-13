import React from 'react';
import { useState, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";

//import { createBrowserHistory } from "history";
//import { useHistory } from "react-router-dom";
//import toast, { Toaster } from "react-hot-toast";

import LoadingScreen from './components/LoadingScreen';
import * as UnityContextUtils from './utils/UnityContextUtils';
//import { useAuth } from "../utils/auth/";


const App = () => {

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "Build/unity_build.loader.js",
    dataUrl: "Build/unity_build.data",
    frameworkUrl: "Build/unity_build.framework.js",
    codeUrl: "Build/unity_build.wasm",
    streamingAssetsUrl: "StreamingAssets",
    productName: "Island Bowling",
    productVersion: "0.9.0",
    companyName: "OxforDigitaLab",
  });

  //const auth = useAuth();
	//UnityContextUtils.AddUnityListeners(unityProvider, auth);
	
    return (
      <div>
        {!isLoaded && <LoadingScreen value={loadingProgression}/>}
		    <Unity unityProvider={unityProvider} devicePixelRatio={1}
			  style={{height: "100%", width: "100%", 
        position: "absolute", overflow: "hidden"}}/>
      </div>
    );
}

export default App;
