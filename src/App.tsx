import { useEffect, useState } from "react";
import Unity, { UnityContext  } from "react-unity-webgl";

import LoadingScreen from './components/LoadingScreen';
import * as UnityContextUtils from './utils/UnityContextUtils';
import { useAuth } from "./auth/auth";

const unityContext = new UnityContext({
  loaderUrl: "Build/unity_build.loader.js",
  dataUrl: "Build/unity_build.data",
  frameworkUrl: "Build/unity_build.framework.js",
  codeUrl: "Build/unity_build.wasm",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "ICVR",
  productName: "ICVR Template",
  productVersion: "0.1",
});

const App = () => {
	const [progression, setProgression] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const auth = useAuth();

  function handleLoaded() {
    setIsLoaded(true);
  }

  function handleProgress() {
    setProgression(Math.round(progression * 100));
  }

  useEffect(() => {
    window.addEventListener('loaded', handleLoaded);
    return () => {
      window.removeEventListener("loaded", handleLoaded); 
  };
  }, [Unity]);

  useEffect(() => {
    window.addEventListener('progress', handleProgress);
    return () => {
      window.removeEventListener("progress", handleProgress); 
  };
  }, [Unity]);

	
	UnityContextUtils.AddUnityListeners(unityContext, auth);
	
    return (
      <div>
        {!isLoaded && <LoadingScreen value={progression}/>}
		    <Unity unityContext={unityContext} devicePixelRatio={1}
			  style={{height: "100%", width: "100%", 
        position: "absolute", overflow: "hidden"}}/>
      </div>
    );
}

export default App;