import LoadingScreen from './components/LoadingScreen';
import Unity from "react-unity-webgl";
import { useUnity } from './utils/UnityInterface';

function App () {
	const gameWindow = useUnity();
	
    return (
		<div>
		{!gameWindow.isLoaded && <LoadingScreen progression={gameWindow.progression}/>}
		<Unity unityContext={gameWindow.unityContext} devicePixelRatio={1}
			style={{height: "100%", width: "100%", 
			position: "absolute", overflow: "hidden"}}/>
	</div>
    );
}
export default App;