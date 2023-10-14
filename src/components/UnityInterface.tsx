import { createContext, useContext, useEffect, useState } from "react";
import Unity, { IUnityConfig, UnityContext } from "react-unity-webgl";
import AddUnityFunctions from "../unity/UnityFunctions";


const defaultUnityConfig = {
	loaderUrl: "Build/unity_build.loader.js",
	dataUrl: "Build/unity_build.data",
	frameworkUrl: "Build/unity_build.framework.js",
	codeUrl: "Build/unity_build.wasm",
	streamingAssetsUrl: "StreamingAssets",
	companyName: "ICVR",
	productName: "ICVR Template",
	productVersion: "0.1.0",
}

type UnityProviderProps = {
	children: React.ReactElement;
}
  
interface UnityInterface {
contextConfig: IUnityConfig,
unityContext: UnityContext,
isLoaded: boolean,
progression: number
}

export const unityInterface = createContext<UnityInterface>({
	contextConfig: defaultUnityConfig,
	unityContext: new UnityContext(defaultUnityConfig),
	isLoaded: false,
	progression: 0
})

function useUnityInterface(unityConfig): UnityInterface {
	const [contextConfig, setcontextConfig] = useState<IUnityConfig | undefined>(defaultUnityConfig);
	const [progression, setProgression] = useState(0);
  	const [isLoaded, setIsLoaded] = useState(false);

	const unityContext = new UnityContext(unityConfig);

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
		contextConfig,
		unityContext,
		isLoaded,
		progression
	  }
}

interface UnityContextProps {
    unityContext: UnityContext
}

export const AppWindowInternal: React.FC<UnityContextProps> = ({ unityContext }) => {
	return (
		<Unity unityContext={unityContext} devicePixelRatio={1}
				style={{height: "100%", width: "100%", 
				position: "absolute", overflow: "hidden",
				margin: 0}}/>
	  );
}

export const UnityProvider = (props: UnityProviderProps) => {
	const { children } = props;	  
	const unity = useUnityInterface(defaultUnityConfig);
	return <unityInterface.Provider value={unity}>{children}</unityInterface.Provider>;
}

export const useUnity = () => {
	return useContext(unityInterface);
};

export default unityInterface;