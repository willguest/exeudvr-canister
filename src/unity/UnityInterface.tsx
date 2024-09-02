import { createContext, useContext, useEffect, useState } from "react";
import Unity, { IUnityConfig, UnityContext } from "react-unity-webgl";
import AddUnityFunctions from "./UnityFunctions";
import unityBuildInfo from './UnityBuildInfo.json';

const { buildName, compressionExt } = unityBuildInfo;

const defaultUnityContext = new UnityContext({
	loaderUrl: `Build/${buildName}.loader.js`,
	dataUrl: `Build/${buildName}.data${compressionExt}`,
	frameworkUrl: `Build/${buildName}.framework.js${compressionExt}`,
	codeUrl: `Build/${buildName}.wasm${compressionExt}`,
	streamingAssetsUrl: "StreamingAssets",
	companyName: "Exeuδ",
	productName: "ExeuδVR Template",
	productVersion: "0.1.0",
});

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
	contextConfig: null,
	unityContext: defaultUnityContext,
	isLoaded: false,
	progression: 0
})

function useUnityInterface(unityContext): UnityInterface {
	const [contextConfig, setcontextConfig] = useState<IUnityConfig | undefined>();
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
				position: "absolute", margin: 0}}/>
	  );
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