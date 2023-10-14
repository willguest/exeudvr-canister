import { createContext, useContext, useEffect, useState } from "react";
import { UnityContext } from "react-unity-webgl";
import AddUnityFunctions from "../unity/UnityFunctions";


const defaultUnityContext = new UnityContext({
	loaderUrl: "Build/unity_build.loader.js",
	dataUrl: "Build/unity_build.data",
	frameworkUrl: "Build/unity_build.framework.js",
	codeUrl: "Build/unity_build.wasm",
	streamingAssetsUrl: "StreamingAssets",
	companyName: "ICVR",
	productName: "ICVR Template",
	productVersion: "0.1.0",
  });

type UnityProviderProps = {
	children: React.ReactElement;
};

type ContextData = {
	loaderUrl: string;
	dataUrl: string;
	frameworkUrl: string;
	codeUrl: string;
	streamingAssetsUrl: string;
	companyName: string;
	productName: string;
	productVersion: string;
};
  
export interface UnityInterface {
unityContext: UnityContext,
isLoaded: boolean,
progression: number
}

export const unityInterface = createContext<UnityInterface>({
	unityContext: defaultUnityContext,
	isLoaded: false,
	progression: 0
})

function useUnityInterface(unityContext): UnityInterface {

	const [progression, setProgression] = useState(0);
  	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(function () {
      unityContext.on("progress", function (progression) {
        setProgression(Math.round(progression * 100));
      });
    }, [unityContext, progression]);
		
	useEffect(function () {
		unityContext.on("loaded", function () {
        setIsLoaded(true);
      });
    }, [unityContext]);
	
	AddUnityFunctions(unityContext);
	
	return {
		unityContext,
		isLoaded,
		progression
	  };
}

export const UnityProvider = (props: UnityProviderProps) => {
	const { children } = props;	  
	const unity = useUnityInterface(defaultUnityContext);
	return <unityInterface.Provider value={unity}>{children}</unityInterface.Provider>;
}

export const useUnity = () => {
	return useContext(unityInterface);
};

export default unityInterface;